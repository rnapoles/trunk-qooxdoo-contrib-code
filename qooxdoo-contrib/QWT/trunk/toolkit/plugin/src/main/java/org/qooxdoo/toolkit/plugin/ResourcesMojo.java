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

import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.project.MavenProject;
import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.util.Program;

/**
 * Packages Qooxdoo resources.
 *
 * @goal resources
 * @phase generate-resources
 */
public class ResourcesMojo extends FrameworkBase {
    /**
     * @parameter expression="${project}"
     * @required
     */
    private MavenProject project;

    @Override
    public void doExecuteWithOrig() throws MojoExecutionException, IOException {
        resource();
        log();
    }

    private void resource() throws IOException {
        FileNode src;
        FileNode dest;
        FileNode icon;
        
        src = (FileNode) frameworkDir.join("source/resource");
        dest = (FileNode) classes().join(src.getName());
        dest.deleteOpt();
        dest.mkdirs();
        icon = null;
        for (Node srcChild : src.children()) {
            if (srcChild.getName().equals(".svn")) {
                // ignore
            } else if (srcChild.getName().equals("icon")) {
                icon = (FileNode) srcChild;
            } else {
                ((FileNode) srcChild).link((FileNode) dest.join(srcChild.getName()));
            }
        }
        if (icon == null) {
            throw new IOException(src + ": missing 'icon' directory");
        }
    }

    private FileNode classes() {
        return io.node(project.getBuild().getDirectory() + "/classes");
    }

    private void log() throws MojoExecutionException, IOException {
        Node log;
        
        log = classes().join("log");
        log.mkdirOpt();
        log(log.join("info.log"), "svn", "info", frameworkDir.getAbsolute());
        log(log.join("status.log"), "svn", "status", "-v", "-N", frameworkDir.getAbsolute());
        log(log.join("diff.log"), "svn", "diff", frameworkDir.getAbsolute());
    }

    private void log(Node file, String ... cmd) throws IOException {
        Program p;
        
        p = new Program(io.getWorking(), cmd);
        // force output in english:
        p.builder.environment().put("LANG", "C");
        p.builder.environment().put("LC_ALL", "C");
        file.writeString(p.exec());
    }
}
