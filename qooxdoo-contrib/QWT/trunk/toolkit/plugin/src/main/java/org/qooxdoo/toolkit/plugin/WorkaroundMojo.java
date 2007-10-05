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
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.maven.artifact.repository.ArtifactRepository;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.settings.Settings;
import org.qooxdoo.sushi.io.Node;

/**
 * Installs a Maven-bug-workaround in your local repository
 * @goal workaround
 */
public class WorkaroundMojo extends SettingsMojo {
    /**
     * @parameter expression="${localRepository}"
     * @required
     */
    private ArtifactRepository localRepository;
    
    /** 
     * Bug 3099: Maven 2.0.7 does not load profiles when executed without pom.xml.
     * Install defines repositories in a profile in the user settings, there's no 
     * way to define them outside of projects and profiles, not even in the system settings. 
     * Thus, qx:new wouldn't find the qwt plugin which makes it quite useless.
     * As a work-around, I generate maven-metadata-local.xml files: local is always
     * search for plugins.    
     */ 
    @Override
    public boolean doExecute(Settings settings) throws MojoExecutionException, IOException {
        Node repo;
        String version;
        String timestamp;

        info("installing workaround for http://jira.codehaus.org/browse/MNG-3099 in your local repository");
        version = getVersion();
        timestamp = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
        repo = io.node(localRepository.getBasedir()).join("org/qooxdoo/toolkit");
        write(repo.join("maven-metadata-local.xml"), 
                "<?xml version='1.0' encoding='UTF-8'?>\n" +
                "<metadata>\n" +
                "  <plugins>\n" +
                "    <plugin>\n" +
                "      <name>Toolkit Maven Plugin</name>\n" +
                "      <prefix>qx</prefix>\n" + 
                "      <artifactId>plugin</artifactId>\n" +
                "    </plugin>\n" +
                "  </plugins>\n" + 
                "</metadata>\n");
        write(repo.join("plugin/maven-metadata-local.xml"), 
                "<?xml version='1.0' encoding='UTF-8'?>\n" +
                "<metadata>\n" + 
                "  <groupId>org.qooxtoo.toolkit</groupId>\n" +
                "  <artifactId>plugin</artifactId>\n" +
                "  <version>" + version + "</version>\n" +
                "  <versioning>\n" +
                "    <latest>" + version + "</latest>\n" + 
                "    <versions>\n" + 
                "      <version>" + version + "</version>\n" + 
                "    </versions>\n" +
                "    <lastUpdated>" + timestamp + "</lastUpdated>\n" + 
                "  </versioning>\n" + 
                "</metadata>\n");
        return false;
    }
    
    private void write(Node file, String content) throws IOException {
        info("* " + file);
        file.writeString(content);
    }
}
