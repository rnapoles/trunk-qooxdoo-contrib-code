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

import org.apache.maven.plugin.MojoExecutionException;
import org.codehaus.plexus.archiver.ArchiverException;
import org.codehaus.plexus.archiver.zip.ZipArchiver;
import org.qooxdoo.sushi.archive.Archive;
import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.HttpNode;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.svn.SvnNode;
import org.qooxdoo.sushi.util.Program;
import org.qooxdoo.sushi.util.Strings;
import org.tmatesoft.svn.core.SVNException;

/**
 * Creates a distribution.
 * 
 * @goal dist
 */
public class DistributionMojo extends Base {
    /*
     * @parameter expression="0.7.3-alpha1"
     * @required
     */
    private String version;
    
    /**
     * Distribution directory.
     *
     * @parameter expression="${project.build.directory}/distribution"
     * @required
     */
    private FileNode distribution;
    
    public void setDistribution(String path) {
        distribution = io.node(path);
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
        build();
        pack();
    }

    private void dest() throws IOException {
        info("creating distribution: " + distribution);
        distribution.deleteOpt();
        distribution.mkdirsOpt();
        basedir.join("src", "dist").copyDirectory(distribution);
        distribution.join("bin", "settings.xml").writeString(
                "<settings>\n" +  
                "  <pluginGroups>\n" + 
                "    <pluginGroup>org.qooxdoo.toolkit</pluginGroup>\n" +
                "  </pluginGroups>\n" +
                "</settings>\n");
    }

    private void mvn() throws IOException {
        HttpNode download;
        
        download = new HttpNode(io, new URL("http://archive.apache.org/dist/maven/binaries/apache-maven-2.0.8-bin.zip"));
        Archive.loadZip(download).data.copy(distribution);
    }

    // Fetch qwt source code. Get from svn, don't copy source:
    // + well-defined
    // + no ide files to take care of
    // - no uncommitted dists
    // - slow
    private void qwt() throws IOException, MojoExecutionException {
        SvnNode src;
        Node qwt;
        
        qwt = distribution.join("qwt").mkdir();
        info("creating " + qwt);
        try {
            src = SvnNode.create(io, "https://qooxdoo-contrib.svn.sourceforge.net/svnroot/qooxdoo-contrib/trunk/qooxdoo-contrib/QWT/trunk");
            src.export(qwt);
        } catch (SVNException e) {
            throw new MojoExecutionException("svn failure", e);
        }
    }

    private void build() throws IOException {
        mvn((FileNode) distribution.join("qwt"), "clean", "install");
    }

    //--
    
    private void xFlags() throws IOException {
        for (Node node : distribution.find("**/bin/*")) {
            ((FileNode) node).setMode(0755);
        }
    }

    private static final String[] SCRIPTS = { "**/bin/mvn" };
    private static final String[] FRAMEWORK = { 
        "qwt/toolkit/qooxdoo/src/framework", "qwt/toolkit/qooxdoo/src/framework/**/*" };
    private static final String[] REPOSITORY_ALL = { 
        "qwt/repository", "qwt/repository/**/*" };
    private static final String[] REPOSITORY_DIST = { 
        "org/qooxdoo/sushi/**/*", "org/qooxdoo/qooxdoo/**/*", "org/qooxdoo/toolkit/**/*", "org/eclipse/base/**/*" };
    private static final String[] GENERATED = {
        "**/target/**/*" 
    };

    private void pack() throws IOException {
        FileNode zip;
        String name;
        
        name = "qwt-" + version;
        zip = (FileNode) distribution.getParent().join(name + ".zip");
        info("create " + zip);
        try {
            zipArchiver.addDirectory(distribution.getFile(), name + "/", new String[] { "**/*" }, 
                    Strings.append(SCRIPTS, FRAMEWORK, GENERATED, REPOSITORY_ALL));
            zipArchiver.addDirectory(distribution.getFile(), name + "/", REPOSITORY_DIST, new String[] {});
            for (Node script : distribution.find(io.filter().include(SCRIPTS))) {
                zipArchiver.addFile(((FileNode) script).getFile(), name + "/" + script.getRelative(distribution), 0755);
            }
            zipArchiver.setDestFile(zip.getFile());
            zipArchiver.createArchive();
        } catch (ArchiverException e) {
            throw new RuntimeException("cannot create zip", e);
        }
        info("done: " + zip + ", " + zip.length() + " bytes");
    }

    //--
    
    private void mvn(FileNode dir, String ... args) throws IOException {
        Program p;
        
        p = new Program(dir);
        p.add(distribution.join("bin", "mvn").getAbsolute());
        p.add(args);
        info(p.toString());
        p.exec(System.out);
    }

}
