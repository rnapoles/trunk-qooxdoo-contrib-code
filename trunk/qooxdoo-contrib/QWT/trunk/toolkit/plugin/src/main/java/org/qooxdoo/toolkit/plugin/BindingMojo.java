/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2007 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package org.qooxdoo.toolkit.plugin;

import java.io.IOException;
import java.io.OutputStream;

import org.apache.maven.project.MavenProject;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;

import org.qooxdoo.toolkit.plugin.doctree.Doctree;
import org.qooxdoo.toolkit.plugin.patch.PatchSet;
import org.qooxdoo.sushi.filter.Filter;
import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.util.Program;
import org.qooxdoo.sushi.xml.XmlException;

/**
 * @goal binding
 * @phase generate-sources
 * @description Generates Binding classes, i.e. Java classes that compile to a given JavaScript class.
 */
public class BindingMojo extends OrigBase {
    private static final String CLASS = "frontend/framework/source/class";

    /**
     * @description always generate, don't reuse existing stuff
     * @parameter expression="${all}"
     */
    private boolean all = false;

    /**
     * @description directory where to place the bindings
     * @parameter
     * @required
     */
    private Node bindings;

    public void setBindings(String path) {
        bindings = io.node(path);
    }

    /**
     * @description class added manually to the doctree. Comma-separated list of include patterns.
     * @parameter expression="nothing"
     */
    private Filter undocumented = io.filter();
    
    public void setUndocumented(String undoc) {
        undocumented.include(split(undoc));
    }
    
    /**
     * @description patches to apply
     * @parameter
     * @required
     */
    private Node patches;
    
    public void setPatches(String path) {
        patches = io.node(path);
    }

    /**
     * The Maven Project Object
     *
     * @parameter expression="${project}"
     * @required
     */
    private MavenProject project;
   
    @Override
    public void doExecuteWithOrig() throws IOException, SAXException, XmlException {
        Node doctree;
        Node output;
        
        doctree = origDir.join("doctree.xml");
        output = origDir.join("doctree.out");
        doctree(doctree, output);
        binding(doctree, output);
    }

    protected void doctree(Node doctree, Node output) throws IOException {
        Node generator;
        OutputStream dest;
        Program p;
        
        if (!all && doctree.isFile() && output.isFile()) {
            getLog().info(doctree + " and " + output + " exists, generation skipped.");
        } else {
            origDir.checkDirectory();
            generator = (FileNode) origDir.join("frontend/framework/tool/generator.py");
            generator.checkFile();
            dest = output.createOutputStream();
            p = new Program((FileNode) origDir, generator.getAbsolute(),
                "--cache-directory", ".cache",
                "--print-dependencies",
                "--generate-api", "--add-new-lines", "--class-path=" + CLASS, 
                "--api-documentation-xml-file=" + doctree.getAbsolute());
            getLog().info("executing " + p);
            p.exec(dest);
            dest.close();
            getLog().info("doctree written to " + doctree + ", output to " + output);
        }
    }
    
    protected void binding(Node src, Node output) throws IOException, SAXException, XmlException {
        Doctree doctree;
        PatchSet patchSet;
        
        patchSet = PatchSet.load(patches);
        bindings.deleteOpt();
        bindings.mkdirs();
        try {
            doctree = Doctree.loadAll(src, output, origDir.join(CLASS), undocumented);
        } catch (SAXParseException e) {
            throw new SAXException(e.getSystemId() + ":" + e.getLineNumber() + ":" + e.getMessage(), e); 
        }
        info(doctree.size() + " class docs loaded from " + src);
        doctree.toJava(bindings);
        info(doctree.size() + " Java classes written to " + bindings);
        patchSet.apply(bindings);
        info(patchSet.size() + " files patched");
        project.addCompileSourceRoot(bindings.getAbsolute());
    }
}
