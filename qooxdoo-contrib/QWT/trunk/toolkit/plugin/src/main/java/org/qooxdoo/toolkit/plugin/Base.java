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
import java.util.Arrays;
import java.util.List;

import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.fs.file.FileNode;
import org.qooxdoo.sushi.io.OS;
import org.qooxdoo.sushi.util.Program;
import org.qooxdoo.sushi.util.Strings;
import org.qooxdoo.sushi.xml.XmlException;
import org.xml.sax.SAXException;

public abstract class Base extends AbstractMojo {
    protected final IO io = new IO();
    
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
            return io.node("resource:toolkit.version").readString().trim();
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
    
    //--
    
    public static final String NON_INTERACTIVE = "--non-interactive";
    
    public Program svn(FileNode dir, String ... args) {
        Program p;
        
        p = new Program((FileNode) dir);
        // force output in english:
        p.builder.environment().put("LANG", "C");
        p.builder.environment().put("LC_ALL", "C");
        p.add("svn");
        p.addAll(Arrays.asList(args));
        debug("svn command: " + p.toString());
        return p;
    }
    
    public void svninfo(FileNode dir, Node log) throws MojoExecutionException, IOException {
        log.mkdirsOpt();
        svnlog(dir, log.join("info.log"), "info", NON_INTERACTIVE);
        svnlog(dir, log.join("status.log"), "status", NON_INTERACTIVE);
        svnlog(dir, log.join("diff.log"), "diff", NON_INTERACTIVE);
    }

    private void svnlog(FileNode dir, Node file, String ... cmd) throws IOException {
        file.writeString(svn(dir, cmd).exec());
    }
}

