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
import org.qooxdoo.sushi.archive.Archive;
import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.HttpNode;

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

    @Override
    public void doExecute() throws MojoExecutionException, IOException {
        final String MAVEN = "maven-2.0.7"; 
        HttpNode src;

        info("home: " + System.getProperty("maven.home"));
        dest.mkdirsOpt();
        dest.join("repository").mkdir();
        src = new HttpNode(io, new URL("http://archive.apache.org/dist/maven/binaries/" + MAVEN + "-bin.zip"));
        Archive.loadZip(src).data.copy(dest);
        ((FileNode) dest.join(MAVEN, "bin", "mvn")).setMode(0755);
        dest.join(MAVEN, "conf", "settings.xml").writeString(
                "<settings>\n" + 
                "  <localRepository>${maven.home}/../repository</localRepository>\n" +
                "</settings>\n");
    }
}
