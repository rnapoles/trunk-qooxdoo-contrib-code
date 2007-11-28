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

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.List;

import org.apache.maven.plugin.MojoExecutionException;
import org.codehaus.plexus.archiver.ArchiverException;
import org.codehaus.plexus.archiver.zip.ZipArchiver;
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
    /*
     * @required
     */
    private String version;
    
    /**
     * WAR file to be generated.
     *
     * @parameter expression="${project.build.directory}/qwt-${version}"
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

    /**
     * @parameter expression="${component.org.codehaus.plexus.archiver.Archiver#zip}"
     */
    private ZipArchiver zipArchiver;

    
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
        xFlags();
        buildRepo();
        // copyRepo();
        // newSample();
        // buildSample();
        pack();
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
    }

    private void mvn() throws IOException {
        HttpNode download;
        
        download = new HttpNode(io, new URL("http://archive.apache.org/dist/maven/binaries/apache-maven-2.0.8-bin.zip"));
        Archive.loadZip(download).data.copy(dest);
    }

    private void qwt() throws IOException {
        Node qwt;
        Filter filter;
        List<Node> lst;
        
        qwt = dest.join("qwt").mkdir();
        info("creating " + qwt);
        filter = io.filter().include("**/*").exclude(
                "**/target/**/*", 
                "**/src/framework/**/*", "**/src/framework",
                "**/.classpath", "**/.project", "**/.settings/**/*", "**/.settings", 
                "**/nbproject/**/*", "**/nbproject");
        lst = basedir.copyDirectory(filter, qwt);
        info("done, " + lst.size() + " files and directories");
    }

    private void copyRepo() throws IOException {
        Node repository;
        Filter filter;
        List<Node> lst;
        
        repository = dest.join("repository").mkdir();
        info("creating " + repository);
        filter = io.filter().include("org/qooxdoo/sushi/**/*", "org/qooxdoo/qooxdoo/**/*", "org/qooxdoo/toolkit/**/*", "org/eclipse/base/**/*");
        lst = io.getHome().join(".m2", "repository").copyDirectory(filter, repository);
        info("done, " + lst.size() + " files and directories");
    }

    private void buildRepo() throws IOException {
        Program p;
        
        p = new Program((FileNode) dest.join("qwt"));
        p.add(dest.join("bin", "qwt").getAbsolute());
        p.add("clean", "install");
        p.exec(System.out);
        
    }

    private void newSample() throws IOException {
        Program p;
        
        p = new Program((FileNode) dest.getParent());
        p.add(dest.join("bin", "qwt").getAbsolute());
        p.add("qx:help", "qx:new");
        p.exec(System.out);
    }

    private void buildSample() throws IOException {
        Program p;
        
        p = new Program((FileNode) dest.getParent().join("sample"));
        p.add(dest.join("bin", "qwt").getAbsolute());
        p.add("clean", "package");
        p.exec(System.out);
    }
    //--
    
    private void xFlags() throws IOException {
        for (Node node : dest.find("**/bin/*")) {
            ((FileNode) node).setMode(0755);
        }
    }

    private static final String[] SCRIPTS = { "**/bin/qwt", "**/bin/mvn" };
    
    private void pack() throws IOException {
        FileNode zip;
        
        zip = (FileNode) dest.getParent().join(dest.getName() + ".zip");
        info("create " + zip);
        try {
            zipArchiver.addDirectory(dest.getFile(), dest.getName() + "/", new String[] { "**/*" }, SCRIPTS);
            for (Node script : dest.find(io.filter().include(SCRIPTS))) {
                zipArchiver.addFile(((FileNode) script).getFile(), dest.getName() + "/" + script.getRelative(dest), 0755);
            }
            zipArchiver.setDestFile(zip.getFile());
            zipArchiver.createArchive();
        } catch (ArchiverException e) {
            throw new RuntimeException("cannot create zip", e);
        }
    }
}
