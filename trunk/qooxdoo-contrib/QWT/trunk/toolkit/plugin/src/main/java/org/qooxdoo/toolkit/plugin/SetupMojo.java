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

import java.util.ArrayList;
import java.util.List;

import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.settings.Activation;
import org.apache.maven.settings.Profile;
import org.apache.maven.settings.Repository;
import org.apache.maven.settings.Settings;

/**
 * Adds a Qwt Profile to the Maven User Settings.
 *
 * @goal setup
 */
public class SetupMojo extends SettingsMojo {
    @Override
    public void doExecute(Settings settings) throws MojoExecutionException {
        Profile p;
        Activation activation;
        
        p = (Profile) settings.getProfilesAsMap().get(PROFILE);
        if (p != null) {
            throw new MojoExecutionException("qwt profile already exists, run qwt:remove to remove");
        }
        info("creating profile");
        p = new Profile();
        p.setId("qwt");
        settings.getProfiles().add(p);
        activation = new Activation();
        activation.setActiveByDefault(true);
        p.setActivation(activation);
        p.setPluginRepositories(repos());
        p.setRepositories(repos());
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
