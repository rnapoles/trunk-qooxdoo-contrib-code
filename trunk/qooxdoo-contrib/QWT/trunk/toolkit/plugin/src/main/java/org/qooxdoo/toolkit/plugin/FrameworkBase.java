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
import java.util.Arrays;

import org.apache.maven.plugin.MojoExecutionException;
import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.util.Program;
import org.qooxdoo.sushi.xml.XmlException;
import org.xml.sax.SAXException;

public abstract class FrameworkBase extends Base {
    /**
     * Svn url
     * @parameter
     * @required
     */
    protected String frameworkUrl;
    
    /**
     * Svn revision. Optional - latest revision is used if not specified  
     * @parameter
     */
    protected String frameworkRevision;

    /**
     * Qooxdoo source directory
     * 
     * @parameter expression="${basedir}/src/framework"
     */
    protected Node frameworkDir;
    
    public void setFrameworkDir(String path) {
        frameworkDir = io.node(path);
    }

    @Override
    public void doExecute() throws IOException, SAXException, XmlException, MojoExecutionException {
        Program p;
        String output;
        String workspaceRevision;
        String workspaceUrl;
        
        if (frameworkRevision == null || frameworkRevision.trim().length() == 0) {
            p = svn((FileNode) frameworkDir.getParent(), "info", NON_INTERACTIVE, frameworkUrl);
            frameworkRevision = extract(p.exec(), "Revision:");
            info("frameworkRevision: " + frameworkRevision);
        }
        if (!frameworkDir.isDirectory()) {
            p = svn((FileNode) frameworkDir.getParent(), "co", NON_INTERACTIVE, "-r", frameworkRevision, 
                    frameworkUrl, frameworkDir.getName());
            p.exec(System.out);
        } else {
            p = svn("info", NON_INTERACTIVE);
            output = p.exec();
            workspaceRevision = extract(output, "Revision:");
            workspaceUrl = extract(output, "URL:");
            if (workspaceRevision.equals(frameworkRevision) && workspaceUrl.equals(frameworkUrl)) {
                info("workspace used without changes");
            } else {
                info("switching workspace:");
                info("  old: " + workspaceUrl + "@" + workspaceRevision);
                info("  new: " + frameworkUrl + "@" + frameworkRevision);
                p = svn("switch", NON_INTERACTIVE, "-r", frameworkRevision, frameworkUrl);
                p.exec(System.out);
            }
        }
        doExecuteWithOrig();
    }

    private static String extract(String str, String key) {
        int start;
        int end;
        
        start = str.indexOf(key);
        if (start == - 1) {
            throw new IllegalArgumentException("missing " + key + " in " + str);
        }
        start += key.length();
        end = str.indexOf('\n', start);
        if (end == -1) {
            throw new IllegalArgumentException("missing newline in " + str);
        }
        return str.substring(start, end).trim();
    }

    public static final String NON_INTERACTIVE = "--non-interactive";
    
    public Program svn(String ... args) {
        return svn((FileNode) frameworkDir, args);
    }
    
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

    public abstract void doExecuteWithOrig() throws MojoExecutionException, IOException, SAXException, XmlException;
}

