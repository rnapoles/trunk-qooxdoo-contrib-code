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

package org.qooxdoo.toolkit.plugin.binding;

import java.io.IOException;

import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.project.MavenProject;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.fs.file.FileNode;

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
        svninfo();
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
        return io.file(project.getBuild().getDirectory() + "/classes");
    }

    private void svninfo() throws MojoExecutionException, IOException {
        svninfo(frameworkDir, classes().join("log"));
    }
}
