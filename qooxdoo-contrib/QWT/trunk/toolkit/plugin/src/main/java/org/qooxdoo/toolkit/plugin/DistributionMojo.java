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
import java.net.URL;
import java.util.List;

import org.apache.maven.plugin.MojoExecutionException;
import org.qooxdoo.sushi.archive.Archive;
import org.qooxdoo.sushi.filter.Filter;
import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.HttpNode;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.util.Program;

/**
 * Creates a distribution.
 * 
 * @goal dist
 */
public class DistributionMojo extends Base {
    /**
     * WAR file to be generated.
     *
     * @parameter expression="${project.build.directory}/qwt-${toolkit.version}"
     * @required
     */
    private FileNode dest;
    
    public void setDest(String path) {
        dest = io.node(path);
    }

    /**
     * Basedir.
     *
     * @parameter expression="${basedir}"
     * @required
     */
    private FileNode basedir;
    
    public void setBasedir(String path) {
        basedir = io.node(path);
    }

    @Override
    public void doExecute() throws MojoExecutionException, IOException {
        if (!basedir.getName().contains("qwt")) {
            throw new MojoExecutionException("call this from plugin module!");
        }
        dest();
        qwt();
        mvn();
        repo();
        sample();
    }

    private void dest() throws IOException {
        info("creating distribution: " + dest);
        dest.deleteOpt();
        dest.mkdirsOpt();
        basedir.join("src", "dist").copyDirectory(dest);
        dest.join("bin", "settings.xml").writeString(
                "<settings>\n" +  
                "  <pluginGroups>\n" + 
                "    <pluginGroup>org.qooxdoo.toolkit</pluginGroup>\n" +
                "  </pluginGroups>\n" +
                "</settings>\n");
        for (Node node : dest.find("**/bin/*")) {
            xFlag((FileNode) node);
        }
    }

    private void mvn() throws IOException {
        final String MAVEN = "maven-2.0.7"; 
        HttpNode download;
        FileNode mvn;
        
        download = new HttpNode(io, new URL("http://archive.apache.org/dist/maven/binaries/" + MAVEN + "-bin.zip"));
        Archive.loadZip(download).data.copy(dest);
        mvn = (FileNode) dest.join(MAVEN, "bin", "mvn");
        xFlag(mvn);
    }

    private void qwt() throws IOException {
        Node qwt;
        Filter filter;
        List<Node> lst;
        
        qwt = dest.join("qwt").mkdir();
        info("creating " + qwt);
        filter = io.filter().include("**/*").exclude("**/target/**/*", "**/.classpath", "**/.project", "**/src/framework/**/*");
        lst = basedir.copyDirectory(filter, qwt);
        info("done, " + lst.size() + " files and directories");
    }

    private void repo() throws IOException {
        Node repository;
        Filter filter;
        List<Node> lst;
        
        repository = dest.join("repository").mkdir();
        info("creating " + repository);
        filter = io.filter().include("org/qooxdoo/**/*", "org/eclipse/base/**/*");
        lst = io.getHome().join(".m2", "repository").copyDirectory(filter, repository);
        info("done, " + lst.size() + " files and directories");
    }

    private void sample() throws IOException {
        Program p;
        
        p = new Program((FileNode) dest.getParent());
        p.add(dest.join("bin", "qwt").getAbsolute());
        p.add("qx:help", "qx:new");
        p.exec(System.out);

        p = new Program((FileNode) dest.getParent().join("sample"));
        p.add(dest.join("bin", "qwt").getAbsolute());
        p.add("clean", "package");
        p.exec(System.out);
    }
    //--
    
    private void xFlag(FileNode node) throws IOException {
        node.setMode(0755);
    }
}
