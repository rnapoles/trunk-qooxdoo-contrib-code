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

import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.codehaus.plexus.archiver.ArchiverException;
import org.codehaus.plexus.archiver.zip.ZipArchiver;
import org.qooxdoo.sushi.archive.Archive;
import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.HttpNode;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.ssh.Connection;
import org.qooxdoo.sushi.ssh.SshNode;
import org.qooxdoo.sushi.ssh.User;
import org.qooxdoo.sushi.svn.SvnNode;
import org.qooxdoo.sushi.util.Program;
import org.qooxdoo.sushi.util.Strings;
import org.tmatesoft.svn.core.SVNException;

import com.jcraft.jsch.JSchException;

/**
 * Creates a distribution file.
 *
 * @requiresProject false
 * @goal dist
 */
public class DistributionMojo extends AbstractMojo {
    private final IO io = new IO();
    
    /**
     * Reuse existing unzipped directory.
     *
     * @parameter expression="${reuse}" default-value="false"
     */
    private boolean reuse;

    /**
     * Upload distribution to Sourceforge
     *
     * @parameter expression="${upload}" default-value="false"
     */
    private boolean upload;

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
     * Where to assemble distribution file
     *
     * @parameter expression="${toolkit.version}"
     * @required
     */
    private String version;

    // can't use Sushi because I need executable flags
    /**
     * @parameter expression="${component.org.codehaus.plexus.archiver.Archiver#zip}"
     */
    private ZipArchiver archiver;

    public void execute() throws MojoExecutionException {
        try {
            doExecute();
        } catch (IOException e) {
            throw new MojoExecutionException("io failure", e);
        } catch (SVNException e) {
            throw new MojoExecutionException("svn failure", e);
        } catch (JSchException e) {
            throw new MojoExecutionException("ssh failure", e);
        }
    }
    
    public void doExecute() throws IOException, SVNException, JSchException {
        Node zip;
        
        if (reuse) {
            unzipped.checkExists();
        } else {
            unzipped.deleteOpt();
            unzipped.mkdirsOpt();

            mvn();
            qwt();
            bin();
            xFlags();
            build();
        }
        zip = pack();
        if (upload) {
            upload(zip);
        }
    }

    private void bin() throws IOException {
        unzipped.join("qwt", "toolkit", "dist", "src", "dist").copyDirectory(unzipped);
        unzipped.join("bin", "settings.xml").writeString(
                        "<settings>\n"
                      + "  <pluginGroups>\n"
                      + "    <pluginGroup>org.qooxdoo.toolkit</pluginGroup>\n"
                      + "  </pluginGroups>\n" + "</settings>\n");
    }

    private void mvn() throws IOException {
        HttpNode download;

        download = new HttpNode(io, new URL("http://archive.apache.org/dist/maven/binaries/apache-maven-2.0.8-bin.zip"));
        Archive.loadZip(download).data.copy(unzipped);
    }

    // Fetch qwt source code. Get from svn, don't copy source:
    // + well-defined
    // + no ide files to take care of
    // - no uncommitted dists
    // - slow
    private void qwt() throws IOException, SVNException {
        String url;
        SvnNode src;
        Node qwt;
        long revision;

        url = "https://qooxdoo-contrib.svn.sourceforge.net/svnroot/qooxdoo-contrib/trunk/qooxdoo-contrib/QWT/trunk";
        qwt = unzipped.join("qwt").mkdir();
        info("creating " + qwt);
        src = SvnNode.create(io, url);
        revision = src.export(qwt);
        qwt.join("svninfo").writeLines("url=" + url, "revision=" + revision);
    }

    /**
     * The main purpose it to build the repository. I don't want to copy an
     * existing repository because it might contain old qwt versions.
     */
    private void build() throws IOException {
        mvn((FileNode) unzipped.join("qwt"), "clean", "install");
    }

    // --

    private void xFlags() throws IOException {
        for (Node node : unzipped.find("**/bin/*")) {
            ((FileNode) node).setMode(0755);
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
        info("create " + zip);
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
        info("done: " + zip + ", " + zip.length() + " bytes");
        return zip;
    }

    private String getName() {
        String name;
        
        name = this.version;
        if (name.endsWith("-SNAPSHOT")) {
            name = version.substring(0, version.length() - 8)
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

    private void upload(Node zip) throws JSchException, IOException {
        Connection connection;
        Node dest;

        info("uploading ...");
        connection = Connection.create("shell.sourceforge.net", User.withUserKey(io, "mlhartme"));
        try {
            dest = new SshNode(io, connection.open(), "home/groups/q/qo/qooxdoo-contrib/htdocs/distributions/qwt/nightly");
            zip.copy(dest.join(zip.getName()));
        } finally {
            connection.close();
        }
        info("done");
    }
    
    private void info(String msg) {
        getLog().info(msg);
    }
}
