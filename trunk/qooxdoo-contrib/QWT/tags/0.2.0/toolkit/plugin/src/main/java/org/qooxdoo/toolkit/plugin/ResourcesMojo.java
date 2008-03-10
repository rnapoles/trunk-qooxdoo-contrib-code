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
        final String nuvola = "icon/Nuvola/16";
        FileNode src;
        FileNode dest;
        Node icon;
        FileNode destNuvola;
        
        src = (FileNode) frameworkDir.join("source/resource");
        dest = (FileNode) classes().join(src.getName());
        dest.deleteOpt();
        dest.mkdirs();
        icon = null;
        for (Node srcChild : src.list()) {
            if (srcChild.getName().equals(".svn")) {
                // ignore
            } else if (srcChild.getName().equals("icon")) {
                icon = (FileNode) srcChild;
            } else {
                linkOrCopy((FileNode) srcChild, (FileNode) dest.join(srcChild.getName()));
            }
        }
        if (icon == null) {
            throw new IOException(src + ": missing 'icon' directory");
        }
        
        destNuvola = (FileNode) dest.join(nuvola);
        destNuvola.getParent().mkdirs();
        linkOrCopy((FileNode) src.join(nuvola), destNuvola);
    }

    private FileNode classes() {
        return io.node(project.getBuild().getDirectory() + "/classes");
    }

    private void log() throws MojoExecutionException, IOException {
        Node log;
        
        log = classes().join("log");
        log.mkdirOpt();
        log(log.join("info.log"), "info", NON_INTERACTIVE);
        log(log.join("status.log"), "status", NON_INTERACTIVE, "-v", "-N");
        log(log.join("diff.log"), "diff", NON_INTERACTIVE);
    }

    private void log(Node file, String ... cmd) throws IOException {
        file.writeString(svn(cmd).exec());
    }
}
