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

import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.settings.Settings;
import org.apache.maven.settings.io.xpp3.SettingsXpp3Reader;
import org.apache.maven.settings.io.xpp3.SettingsXpp3Writer;
import org.codehaus.plexus.util.xml.pull.XmlPullParserException;
import org.qooxdoo.sushi.io.FileNode;

/**
 * Base class for Mojos that modify settings.
 *
 * @requiresProject false
 */
public abstract class SettingsMojo extends Base {
    protected static final String PROFILE = "qooxdoo";
    protected static final String GROUP = "org.qooxdoo.toolkit";

    protected FileNode node = (FileNode) io.getHome().join(".m2/settings.xml");

    @Override
    public void doExecute() throws MojoExecutionException, IOException {
        FileNode old;
        SettingsXpp3Reader reader;
        Settings settings;
        Writer dest;
        
        old = (FileNode) io.getHome().join(".m2/settings.xml.old");
        if (!node.exists()) {
            settings = new Settings();
        } else {
            reader = new SettingsXpp3Reader();
            try {
                settings = reader.read(node.createReader());
            } catch (XmlPullParserException e) {
                throw new MojoExecutionException("cannot read " + node, e);
            }
        }
        doExecute(settings);
        if (node.exists()) {
            node.copyFile(old);
            info(old + " contains the original file.");
        }
        dest = node.createWriter();
        new SettingsXpp3Writer().write(dest, settings);
        dest.close();
        info(node + " has been modified.");
    }

    protected abstract void doExecute(Settings settings) throws MojoExecutionException, IOException;
}
