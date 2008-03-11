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

package org.qooxdoo.toolkit.plugin.qul;

import java.io.File;
import java.io.IOException;

import org.apache.maven.project.MavenProject;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.io.ResourceNode;
import org.qooxdoo.sushi.xml.XmlException;
import org.qooxdoo.toolkit.plugin.Base;
import org.qooxdoo.toolkit.plugin.binding.java.Set;
import org.xml.sax.SAXException;

/**
 * Generates create methods to instantiate Qooxdoo classes.
 * 
 * @goal qul
 * @phase generate-sources
 */
public class QulMojo extends Base {
    /**
     * Qul source directory.
     * 
     * @parameter expression="${basedir}/src/main/java"
     * @required
     */
    private Node src;
    
    public void setSrc(String path) {
        src = io.node(path);
    }

    /**
     * Java destination directory.
     * 
     * @parameter expression="${project.build.directory}/qul"
     * @required
     */
    private Node dest;

    public void setDest(String path) {
        dest = io.node(path);
    }

    /**
     * The Maven Project Object
     *
     * @parameter expression="${project}"
     * @required
     */
    private MavenProject project;
   
    @Override
    public void doExecute() throws IOException, SAXException, XmlException {
        Set doctree;
        Loader loader;
        Node out;
        
        debug("loading doctree ...");
        doctree = (Set) new ResourceNode(io, "doctree.ser").readObject();
        debug("done: " + doctree.size() + " classes");
        loader = Loader.create(io, doctree);
        for (Node in : src.find("**/*.qul")) {
            out = dest.join(in.getRelative(src).replace(".qul", ".java")); 
            info("qul: " + in + " -> " + out);
            out.getParent().mkdirsOpt();
            loader.run(in, out, out.getParent().getRelative(dest).replace(File.separator, "."));
        }
        project.addCompileSourceRoot(dest.getAbsolute());
    }
}
