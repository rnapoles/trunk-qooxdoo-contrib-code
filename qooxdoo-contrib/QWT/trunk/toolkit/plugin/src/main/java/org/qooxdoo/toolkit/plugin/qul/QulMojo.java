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
import java.net.URL;
import java.util.List;

import org.apache.maven.artifact.Artifact;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.project.MavenProject;
import org.qooxdoo.sushi.io.HttpNode;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.xml.XmlException;
import org.qooxdoo.toolkit.plugin.Base;
import org.qooxdoo.toolkit.plugin.binding.java.Set;
import org.qooxdoo.toolkit.plugin.qul.css.Css;
import org.xml.sax.SAXException;

/**
 * Generates create methods to instantiate Qooxdoo classes.
 * 
 * @goal qul
 * @phase generate-sources
 * @requiresDependencyResolution runtime
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
     * Css file.
     * 
     * @parameter expression="${basedir}/src/main/css/main.css"
     * @required
     */
    private Node css;
    
    public void setCss(String path) {
        css = io.node(path);
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
    public void doExecute() throws IOException, SAXException, XmlException, MojoExecutionException {
        Set doctree;
        Loader loader;
        Node out;
        
        doctree = loadDoctree();
        loader = Loader.create(io, doctree);
        info("style:\n" + Css.load(css).toString());
        for (Node in : src.find("**/*.qul")) {
            out = dest.join(in.getRelative(src).replace(".qul", ".java")); 
            info("qul: " + in + " -> " + out);
            out.getParent().mkdirsOpt();
            loader.run(in, out, out.getParent().getRelative(dest).replace(File.separator, "."));
        }
        project.addCompileSourceRoot(dest.getAbsolute());
    }
    
    private static final String DOCTREE_SER ="doctree.ser";
    
    private Set loadDoctree() throws IOException, MojoExecutionException {
        List<?> lst;
        Set result;
        Artifact artifact;
        HttpNode node;
        
        debug("loading doctree ...");
        lst = project.getRuntimeArtifacts();
        for (Object obj : lst) {
            artifact = (Artifact) obj;
            debug("checking " + artifact.getFile());
            node = new HttpNode(io, new URL("jar:file:" + artifact.getFile().getAbsolutePath() +"!/" + DOCTREE_SER));
            if (node.exists()) {
                result = (Set) node.readObject();
                debug("done: " + result.size() + " classes, loaded from " + node.getUrl());
                return result;
            }
        }
        throw new MojoExecutionException("cannot load " + DOCTREE_SER);
    }
}
