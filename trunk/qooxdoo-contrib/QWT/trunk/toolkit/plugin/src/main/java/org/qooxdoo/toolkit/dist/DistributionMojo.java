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

package org.qooxdoo.toolkit.dist;

import java.io.IOException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.maven.artifact.repository.ArtifactRepository;
import org.apache.maven.plugin.MojoExecutionException;
import org.codehaus.plexus.archiver.ArchiverException;
import org.codehaus.plexus.archiver.zip.ZipArchiver;
import org.qooxdoo.sushi.archive.Archive;
import org.qooxdoo.sushi.filter.Filter;
import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.HttpNode;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.io.OS;
import org.qooxdoo.sushi.svn.SvnNode;
import org.qooxdoo.sushi.util.Program;
import org.qooxdoo.sushi.util.Strings;
import org.qooxdoo.toolkit.plugin.Base;
import org.tmatesoft.svn.core.SVNException;

import com.jcraft.jsch.JSchException;

/**
 * Creates a distribution file. To be attached to the engine module.
 * Similar to assembly plugin, but: 
 * * re-packages maven
 * * packs the local repository. 
 * 
 * To build a distributions reliably:
 * * use a fresh checkout
 * * wipe your local repository
 * * run mvn clean install -Ddist in the tolevel directory
 * 
 * If you want nightly builds:
 * * run the above build with in hudson
 * * actually upload the dist files via your private machine because you won't want
 *   to place your private key on the build machine. If you use cron to do this: make 
 *   sure it doesn't need a passphrase! 
 *
 * @goal dist
 */
public class DistributionMojo extends Base {
    /**
     * Build distribution.
     *
     * @parameter expression="${dist}" default-value="false"
     */
    private boolean dist;

    /**
     * Reuse existing unzipped directory.
     *
     * @parameter expression="${reuse}" default-value="false"
     */
    private boolean reuse;

    /**
     * Where to assemble distribution file
     *
     * @parameter expression="${project.build.directory}/distribution"
     * @required
     */
    private FileNode unzipped;

    public void setUnzipped(String path) {
        unzipped = io.node(path);
    }

    /**
     * QWT Source
     *
     * @parameter expression="${basedir}/../.."
     * @required
     */
    private FileNode qwtSource;

    public void setQwtSource(String path) {
        qwtSource = io.node(path);
    }

    // can't use Sushi because I need executable flags
    /**
     * @parameter expression="${component.org.codehaus.plexus.archiver.Archiver#zip}"
     */
    private ZipArchiver archiver;

    /**
     * @parameter expression="${localRepository}"
     * @required
     * @readonly
     */
    protected ArtifactRepository localRepositoryObject;

    private FileNode localRepository;
    
    @Override
    public void doExecute() throws MojoExecutionException, IOException {
        if (!dist) {
            info("distribution skipped");
            return;
        }
        localRepository = (FileNode) io.node(localRepositoryObject.getBasedir());
        if (!qwtSource.join("Manifest.js").isFile()) {
            throw new MojoExecutionException("qx:dist can only be called from qwt directory");
        }
        info("local repository: " + localRepository);
        try {
            doDoExecute();
        } catch (SVNException e) {
            throw new MojoExecutionException("svn failure", e);
        } catch (JSchException e) {
            throw new MojoExecutionException("ssh failure", e);
        }
    }
    
    public void doDoExecute() throws IOException, SVNException, JSchException {
        Node zip;
        
        if (reuse) {
            unzipped.checkExists();
        } else {
            unzipped.deleteOpt();
            unzipped.mkdirsOpt();

            info("+ mvn");
            mvn();
            info("+ qwt");
            qwt();
            info("+ bin");
            bin();
            xFlags();
            info("+ repository");
            repository();
        }
        zip = pack();
        info("= " + zip + ", " + zip.length() + " bytes");
    }

    private void bin() throws IOException {
        unzipped.join("qwt", "toolkit", "plugin", "src", "dist").copyDirectory(unzipped);
        unzipped.join("bin", "settings.xml").writeString(
                        "<settings>\n"
                      + "  <pluginGroups>\n"
                      + "    <pluginGroup>org.qooxdoo.toolkit</pluginGroup>\n"
                      + "  </pluginGroups>\n" 
                      + "</settings>\n");
    }

    private static final String MAVEN_NAME = "apache-maven-2.0.8-bin.zip";
    private void mvn() throws IOException {
        Node src;
        
        HttpNode download;

        src = io.getTemp().join(MAVEN_NAME);
        if (!src.isFile()) {
            download = new HttpNode(io, new URL("http://archive.apache.org/dist/maven/binaries/" + MAVEN_NAME));
            info("downloading " + download);
            download.copyFile(src);
        } else {
            info("reusing download: " + src);
        }
        Archive.loadZip(src).data.copy(unzipped);
    }

    //--
    
    private void qwt() throws IOException, SVNException {
        Node qwt;
        
        // Fetch qwt source code from svn. Get from svn, don't copy source:
        // + well-defined
        // + no ide files to take care of
        // - no uncommitted dists
        // - slow
        qwt = unzipped.join("qwt").mkdir();
        if (true) {
            qwtCopy(qwt);
        } else {
            qwtSvn(qwt);
        }
    }

    private void qwtCopy(Node dest) throws IOException {
        Filter filter;
        
        filter = io.filter();
        filter.include("**/*");
        filter.exclude("**/.svn");
        filter.exclude("**/.svn/*");
        filter.exclude("**/.classpath");
        filter.exclude("**/.project");
        filter.exclude("**/.settings");
        filter.exclude("**/.settings/**/*");
        filter.exclude("**/.checkstyle");
        filter.exclude("**/target");
        filter.exclude("**/target/**/*");
        filter.exclude("**/nbproject");
        filter.exclude("**/nbproject/**/*");
        filter.exclude("**/toolkit/qooxdoo/src/framework");
        filter.exclude("**/toolkit/qooxdoo/src/framework/**/*");

        // because I ask Hudson to place the local repository here
        filter.exclude("repository");
        filter.exclude("repository/**/*");

        qwtSource.copyDirectory(filter, dest);
    }

    private void qwtSvn(Node qwt) throws IOException, SVNException {
        String url;
        SvnNode src;
        long revision;

        url = "https://qooxdoo-contrib.svn.sourceforge.net/svnroot/qooxdoo-contrib/trunk/qooxdoo-contrib/QWT/trunk";
        src = SvnNode.create(io, url);
        revision = src.export(qwt);
        qwt.join("svninfo").writeLines("url=" + url, "revision=" + revision);
    }

    private void repository() throws IOException {
        if (true) {
            // fast
            localRepository.copyDirectory(unzipped.join("repository").mkdir());
        } else {
            // save
            mvn((FileNode) unzipped.join("qwt"), "clean", "install");
        }
    }

    // --

    private void xFlags() throws IOException {
        for (Node node : unzipped.find("**/bin/*")) {
            if (OS.CURRENT == OS.WINDOWS) {
                info(node + ": chmod skipped");
            } else {
                ((FileNode) node).setMode(0755);
            }
        }
    }

    private static final String[] SCRIPTS = { "**/bin/mvn" };
    private static final String[] FRAMEWORK = {
            "qwt/toolkit/qooxdoo/src/framework",
            "qwt/toolkit/qooxdoo/src/framework/**/*" };
    private static final String[] REPOSITORY_ALL = { "repository",
            "repository/**/*" };

    private static final String[] GENERATED = { "**/target/**/*" };

    private Node pack() throws IOException {
        FileNode zip;
        String name;

        name = getName();
        zip = (FileNode) unzipped.getParent().join(name + ".zip");
        try {
            archiver.addDirectory(unzipped.getFile(), name + "/",
                    new String[] { "**/*" }, Strings.append(SCRIPTS, FRAMEWORK,
                            GENERATED, REPOSITORY_ALL));
            archiver.addDirectory(unzipped.getFile(), name + "/",
                    REPOSITORY_ALL, repositoryExcludes());
            for (Node script : unzipped.find(io.filter().include(SCRIPTS))) {
                archiver.addFile(((FileNode) script).getFile(), name + "/"
                        + script.getRelative(unzipped), 0755);
            }
            archiver.setDestFile(zip.getFile());
            archiver.createArchive();
        } catch (ArchiverException e) {
            throw new RuntimeException("cannot create zip", e);
        }
        return zip;
    }

    private String getName() {
        String name;
        
        name = getVersion();
        if (name.endsWith("-SNAPSHOT")) {
            name = name.substring(0, name.length() - 8)
                    + new SimpleDateFormat("yyMMdd").format(new Date());
        }
        return "qwt-" + name;
    }

    // --

    private String[] repositoryExcludes() throws IOException {
        List<String> excludes;
        String prefix;

        excludes = new ArrayList<String>();
        for (Node dir : unzipped.join("qwt/application").find("*")) {
            prefix = "repository/org/qooxdoo/" + dir.getName();
            excludes.add(prefix);
            excludes.add(prefix + "/**/*");
        }
        return Strings.toArray(excludes);
    }

    //--

    private void mvn(FileNode dir, String... args) throws IOException {
        Program p;

        p = new Program(dir);
        p.add(unzipped.join("bin", "mvn").getAbsolute());
        p.add(args);
        info(p.toString());
        p.exec(System.out);
    }
}
