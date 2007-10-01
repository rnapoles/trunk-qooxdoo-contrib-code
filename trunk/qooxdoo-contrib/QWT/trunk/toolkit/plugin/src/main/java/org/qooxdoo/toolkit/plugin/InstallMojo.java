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
import java.util.ArrayList;
import java.util.List;

import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.settings.Activation;
import org.apache.maven.settings.Profile;
import org.apache.maven.settings.Repository;
import org.apache.maven.settings.Settings;

/**
 * Adds Qooxdoo settings to Maven's user settings.
 * 
 * @goal install
 */
public class InstallMojo extends WorkaroundMojo {
    @Override
    public boolean doExecute(Settings settings) throws MojoExecutionException, IOException {
        Profile p;
        Activation activation;
        
        info("installing qooxdoo settings to " + node +":");
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
        super.doExecute(settings);
        return true;
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
}
