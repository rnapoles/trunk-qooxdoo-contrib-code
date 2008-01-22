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
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
 * Creates a distribution file.
 * 
 * @requiresProject false
 * @goal dist
 */
public class DistributionMojo extends Base {
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
     * @parameter expression="${component.org.codehaus.plexus.archiver.Archiver#zip}"
     */
    private ZipArchiver zipArchiver;

    @Override
    public void doExecute() throws MojoExecutionException, IOException {
        distribution.deleteOpt();
        distribution.mkdirsOpt();

        mvn();
        qwt();
        bin();
        xFlags();
        build();
        pack();
    }

    private void bin() throws IOException {
        distribution.join("qwt", "src", "dist").copyDirectory(distribution);
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
        String url;
        SvnNode src;
        Node qwt;
        long revision;
        
        url = "https://qooxdoo-contrib.svn.sourceforge.net/svnroot/qooxdoo-contrib/trunk/qooxdoo-contrib/QWT/trunk";
        qwt = distribution.join("qwt").mkdir();
        info("creating " + qwt);
        try {
            src = SvnNode.create(io, url);
            revision = src.export(qwt);
            qwt.join("svninfo").writeLines(
                    "url=" + url,
                    "revision=" + revision);
        } catch (SVNException e) {
            throw new MojoExecutionException("svn failure", e);
        }
    }

    /** 
     * The main purpose it to build the repository. I don't want to copy an existing 
     * repository because it might contain old qwt versions.
     */ 
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
        "repository", "repository/**/*" };

    private static final String[] GENERATED = {
        "**/target/**/*" 
    };

    private void pack() throws IOException {
        String version;
        FileNode zip;
        String name;
        
        version = this.getVersion();
        if (version.endsWith("-SNAPSHOT")) {
            version = version.substring(0, version.length() - 8)
                + new SimpleDateFormat("yyMMdd").format(new Date());
        }
        name = "qwt-" + version;
        zip = (FileNode) distribution.getParent().join(name + ".zip");
        info("create " + zip);
        try {
            zipArchiver.addDirectory(distribution.getFile(), name + "/", new String[] { "**/*" }, 
                    Strings.append(SCRIPTS, FRAMEWORK, GENERATED, REPOSITORY_ALL));
            zipArchiver.addDirectory(distribution.getFile(), name + "/", REPOSITORY_ALL,
                    repositoryExcludes());
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
    
    private String[] repositoryExcludes() throws IOException {
        List<String> excludes;
        String prefix;
        
        excludes = new ArrayList<String>();
        for (Node dir : distribution.join("qwt/application").find("*")) {
            prefix = "repository/org/qooxdoo/" + dir.getName();
            excludes.add(prefix);
            excludes.add(prefix + "/**/*");
        }
        return Strings.toArray(excludes);
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
