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
import java.util.List;

import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.OS;
import org.qooxdoo.sushi.io.ResourceNode;
import org.qooxdoo.sushi.util.Strings;
import org.qooxdoo.sushi.xml.XmlException;
import org.xml.sax.SAXException;

public abstract class Base extends AbstractMojo {
    protected final IO io = new IO();
    
    
        
    /**
     * TODO: Internal parameter to work-around http://jira.codehaus.org/browse/MPLUGIN-31 
     * @parameter expression="foo"
     * @required
     * @readonly
     */
    private String workaround;

    public void execute() throws MojoExecutionException {
        try {
            doExecute();
        } catch (IOException e) {
            throw new MojoExecutionException(e.getMessage(), e);
        } catch (SAXException e) {
            throw new MojoExecutionException("xml error", e);
        } catch (XmlException e) {
            throw new MojoExecutionException("xml error", e);
        }
    }
    
    protected abstract void doExecute() throws MojoExecutionException, IOException, XmlException, SAXException;
    
    private String version = null;
    
    protected String getVersion() {
        if (version == null) {
            version = getVersion(io);
        }
        return version;
    }

    public static String getVersion(IO io) {
        try {
            return new ResourceNode(io, "toolkit.version").readString().trim();
        } catch (IOException e) {
            throw new RuntimeException("unkown version");
        }
    }
    
    protected void warn(String msg, Exception e) {
        getLog().warn(msg, e);
    }

    protected void warn(String msg) {
        getLog().warn(msg);
    }

    protected void info(String msg) {
        getLog().info(msg);
    }

    protected void debug(String str) {
        getLog().debug(str);
    }

    public static List<String> split(String str) {
        return Strings.trim(Strings.split(",", str));
    }

    //--
    
    public static void linkOrCopy(FileNode src, FileNode dest) throws IOException {
        if (OS.CURRENT == OS.WINDOWS) {
            src.copy(dest);
        } else {
            src.link(dest);
        }
    }
}

