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

package org.qooxdoo.toolkit.plugin.binding;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;

import org.apache.maven.project.MavenProject;
import org.qooxdoo.sushi.filter.Filter;
import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.io.OS;
import org.qooxdoo.sushi.metadata.xml.LoaderException;
import org.qooxdoo.sushi.util.Program;
import org.qooxdoo.sushi.xml.XmlException;
import org.qooxdoo.toolkit.plugin.FrameworkBase;
import org.qooxdoo.toolkit.plugin.binding.java.Set;
import org.qooxdoo.toolkit.plugin.binding.patch.PatchSet;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;

/**
 * Generates Binding classes, i.e. Java classes that compile to a given JavaScript class.
 * @goal binding
 * @phase generate-sources
 */
public class BindingMojo extends FrameworkBase {
    private static final String CLASS = "source" + File.separator + "class";

    /**
     * Always generate, don't reuse existing stuff
     * @parameter expression="${all}"
     */
    private boolean all = false;

    /**
     * Directory where to place the bindings
     * @parameter
     * @required
     */
    private Node bindings;

    public void setBindings(String path) {
        bindings = io.node(path);
    }

    /**
     * Classes added manually to the doctree. Comma-separated list of include patterns.
     * 
     * @parameter expression="nothing"
     */
    private Filter undocumented = io.filter();
    
    public void setUndocumented(String undoc) {
        undocumented.include(split(undoc));
    }
    
    /**
     * Patches to apply
     * 
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
        
        doctree = frameworkDir.join("doctree.xml");
        output = frameworkDir.join("doctree.out");
        doctree(doctree, output);
        binding(doctree, output);
    }

    protected void doctree(Node doctree, Node output) throws IOException {
        Node generator;
        OutputStream dest;
        Program p;
        
        if (!all && doctree.isFile() && output.isFile() && isFrameworkOlder(Math.min(doctree.lastModified(), output.lastModified()))) {
            info(doctree + " and " + output + " up-to-date, generation skipped.");
        } else {
            frameworkDir.checkDirectory();
            generator = (FileNode) frameworkDir.join("tool", "generator.py");
            generator.checkFile();
            dest = output.createOutputStream();
            p = new Program((FileNode) frameworkDir);
            if (OS.CURRENT == OS.WINDOWS) {
                p.add("cmd", "/C");
            }
            p.add(generator.getAbsolute());
            p.add(
                "--cache-directory", ".cache",
                "--print-dependencies",
                "--generate-api", "--add-new-lines", "--class-path=" + CLASS, 
                "--api-documentation-xml-file=" + doctree.getName());
            info("executing " + p);
            p.exec(dest);
            dest.close();
            info("doctree written to " + doctree + ", output to " + output);
        }
    }

    private boolean isFrameworkOlder(long modified) throws IOException {
        debug("check modified");
        for (Node node : frameworkDir.join(CLASS).find("**/*.js")) {
            if (modified <= node.lastModified()) {
                debug("modified: " + node);
                return false;
            }
        }
        debug("done");
        return true;
    }
    
    protected void binding(Node src, Node output) throws IOException, SAXException, XmlException {
        Set doctree;
        PatchSet patchSet;
        
        patchSet = PatchSet.load(patches);
        bindings.deleteOpt();
        bindings.mkdirs();
        try {
            doctree = Set.loadAll(src, output, frameworkDir.join(CLASS), undocumented);
        } catch (SAXParseException e) {
            throw new SAXException(e.getSystemId() + ":" + e.getLineNumber() + ":" + e.getMessage(), e); 
        } catch (LoaderException e) {
            throw new IOException(src.getName() + ": " + e.getMessage());
        }
        info(doctree.size() + " class docs loaded from " + src);
        doctree.toJava(bindings);
        info(doctree.size() + " Java classes written to " + bindings);
        patchSet.apply(bindings);
        info(patchSet.size() + " files patched");
        project.addCompileSourceRoot(bindings.getAbsolute());
    }
}
