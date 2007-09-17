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
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.settings.Activation;
import org.apache.maven.settings.Profile;
import org.apache.maven.settings.Repository;
import org.apache.maven.settings.Settings;
import org.apache.maven.settings.io.xpp3.SettingsXpp3Reader;
import org.apache.maven.settings.io.xpp3.SettingsXpp3Writer;
import org.codehaus.plexus.util.xml.pull.XmlPullParserException;
import org.qooxdoo.sushi.io.FileNode;

/**
 * Creates Maven User Settings for QWT.
 *
 * @requiresProject false
 * @goal setup
 */
public class SetupMojo extends Base {
    @Override
    public void doExecute() throws MojoExecutionException, IOException {
        FileNode node;
        FileNode orig;
        SettingsXpp3Reader reader;
        Settings settings;
        Profile p;
        Activation activation;
        Writer dest;
        
        node = (FileNode) io.getHome().join(".m2/settings.xml");
        orig = (FileNode) io.getHome().join(".m2/settings.xml.orig");
        if (!node.exists()) {
            info("creating new settings");
            settings = new Settings();
        } else {
            reader = new SettingsXpp3Reader();
            try {
                settings = reader.read(node.createReader());
            } catch (XmlPullParserException e) {
                throw new MojoExecutionException("cannot read " + node, e);
            }
            if (!orig.exists()) {
                node.copyFile(orig);
            }
        }
        info("settings: ");
        p = (Profile) settings.getProfilesAsMap().get("qwt");
        if (p == null) {
            info("creating profile");
            p = new Profile();
            p.setId("qwt");
            settings.getProfiles().add(p);
        } 
        activation = new Activation();
        activation.setActiveByDefault(true);
        p.setActivation(activation);
        p.setPluginRepositories(repos());
        p.setRepositories(repos());
        dest = node.createWriter();
        new SettingsXpp3Writer().write(dest, settings);
        dest.close();
    }

    private List<Repository> repos() {
        List<Repository> lst;
        Repository r;
        
        r = new Repository();
        r.setId("sourceforge");
        r.setUrl("http://qooxdoo-contrib.sourceforge.net/maven/repository");
        lst = new ArrayList<Repository>();
        lst.add(r);
        return lst;
    }
}
