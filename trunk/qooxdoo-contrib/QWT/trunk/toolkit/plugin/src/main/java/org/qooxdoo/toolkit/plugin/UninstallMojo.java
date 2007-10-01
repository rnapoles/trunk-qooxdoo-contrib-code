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

import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.settings.Profile;
import org.apache.maven.settings.Settings;

/**
 * Removes qooxdoo settings from Maven's user settings.
 * 
 * @goal uninstall
 */
public class UninstallMojo extends SettingsMojo {
    @Override
    public boolean doExecute(Settings settings) throws MojoExecutionException {
        Profile p;
        boolean modified;
        
        modified = false;
        info("removing qooxdoo settings from " + node);
        info("- profile: " + PROFILE);
        p = (Profile) settings.getProfilesAsMap().get(PROFILE);
        if (p == null) {
            warn("profile not found: " + PROFILE);
        } else {
            modified = true;
            settings.removeProfile(p);
        }
        info("- pluginGroup: " + PROFILE);
        if (!settings.getPluginGroups().contains(GROUP)) {
            warn("pluginGroup not found: " + GROUP);
        } else {
            modified = true;
            settings.removePluginGroup(GROUP);
        }
        return modified;
    }
}
