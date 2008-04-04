/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2008 1&1 Internet AG, Germany, http://www.1and1.org
   
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
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.fs.file.FileNode;

/**
 * Base class for Mojos that modify settings.
 *
 * @requiresProject false
 */
public abstract class SettingsMojo extends Base {
    protected static final String PROFILE = "qooxdoo";
    protected static final String GROUP = "org.qooxdoo.toolkit";

    // CAUTION: don't use expression "${settings}", it's predefined
    // Note: I checked Maven's startup code (in 2.0.7): there's no way
    // to obtain the user settings from Maven :(
    /**
     * Settings to be adjusted. 
     * 
     * @parameter expression="${user.settings}"
     *            default-value="${user.home}/.m2/settings.xml"
     */
    protected Node node;
    
    public void setNode(String path) {
        node = io.node(path);
    }
    
    @Override
    public void doExecute() throws MojoExecutionException, IOException {
        FileNode old;
        SettingsXpp3Reader reader;
        Settings settings;
        Writer dest;

        old = (FileNode) node.getParent().join("settings.xml.old");
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
        if (doExecute(settings)) { 
            if (node.exists()) {
                node.copyFile(old);
                info(old + " contains the original file.");
            }
            dest = node.createWriter();
            new SettingsXpp3Writer().write(dest, settings);
            dest.close();
            info(node + " has been modified.");
        }
    }

    protected abstract boolean doExecute(Settings settings) throws MojoExecutionException, IOException;

}
