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
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.settings.Activation;
import org.apache.maven.settings.Profile;
import org.apache.maven.settings.Repository;
import org.apache.maven.settings.Settings;
import org.qooxdoo.sushi.io.Node;

/**
 * Adds Maven user settings for Qwt.
 *
 * @goal install
 */
public class InstallMojo extends SettingsMojo {
    @Override
    public void doExecute(Settings settings) throws MojoExecutionException, IOException {
        Profile p;
        Activation activation;
        
        info("adding qwt setting to " + node +":");
        p = (Profile) settings.getProfilesAsMap().get(PROFILE);
        if (p != null) {
            throw new MojoExecutionException("profile already exists: " + PROFILE);
        }
        info("+ adding profile: " + PROFILE);
        p = new Profile();
        p.setId(PROFILE);
        settings.getProfiles().add(p);
        activation = new Activation();
        activation.setActiveByDefault(true);
        p.setActivation(activation);
        p.setPluginRepositories(repos());
        p.setRepositories(repos());
        info("+ adding pluginGroup: " + GROUP);
        if (settings.getPluginGroups().contains(GROUP)) {
            throw new MojoExecutionException("pluginGroup already exists: " + GROUP);
        }
        settings.addPluginGroup(GROUP);
        workaround3099();
    }

    private List<Repository> repos() {
        List<Repository> lst;
        Repository r;
        
        r = new Repository();
        r.setId("qooxdoo");
        r.setUrl("http://qooxdoo-contrib.sourceforge.net/maven/repository");
        lst = new ArrayList<Repository>();
        lst.add(r);
        return lst;
    }

    /** 
     * Bug 3099: Maven 2.0.7 does not load profiles when executed without pom.xml.
     * Install defines repositories in a profile in the user settings, there's no 
     * way to define them outside of projects and profiles, not even in the system settings. 
     * Thus, qx:new wouldn't find the qwt plugin which makes it quite useless.
     * As a work-around, I generate maven-metadata-local.xml files: local is always
     * search for plugins.    
     */ 
    private void workaround3099() throws IOException {
        Node repo;
        String version;
        String timestamp;

        info("adding workaround for http://jira.codehaus.org/browse/MNG-3099");
        version = getVersion();
        timestamp = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
        repo = io.getHome().join(".m2/repository/org/qooxdoo/toolkit");
        repo.join("maven-metadata-local.xml").writeString(
                "<?xml version='1.0' encoding='UTF-8'?>\n" +
                "<metadata>\n" +
                "  <plugins>\n" +
                "    <plugin>\n" +
                "      <name>QWT Plugin</name>\n" +
                "      <prefix>qwt</prefix>\n" + 
                "      <artifactId>plugin</artifactId>\n" +
                "    </plugin>\n" +
                "  </plugins>\n" + 
                "</metadata>\n");
        repo.join("plugin/maven-metadata-local.xml").writeString(
                "<?xml version='1.0' encoding='UTF-8'?>\n" +
                "<metadata>\n" + 
                "  <groupId>org.apache.maven.plugins</groupId>\n" +
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
    }
}
