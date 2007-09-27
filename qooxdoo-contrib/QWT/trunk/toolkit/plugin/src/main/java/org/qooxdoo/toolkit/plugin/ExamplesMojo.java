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
import java.util.Map;

import org.apache.maven.plugin.MojoExecutionException;
import org.qooxdoo.sushi.filter.Filter;
import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.io.ResourceNode;
import org.qooxdoo.sushi.svn.SvnNode;
import org.qooxdoo.sushi.util.Program;
import org.tmatesoft.svn.core.SVNException;

/**
 * @description Create an examples directory
 * @requiresProject false
 * @goal examples
 */
public class ExamplesMojo extends Base {
    @Override
    public void doExecute() throws IOException, MojoExecutionException {
        SvnNode src;
        Node dest;
        
        dest = io.getWorking().join("examples");
        dest.mkdir();
        try {
            src = SvnNode.create(io, "https://qooxdoo-contrib.svn.sourceforge.net/svnroot/qooxdoo-contrib/trunk/qooxdoo-contrib/QWT/trunk/application");
            src.export(dest);
        } catch (SVNException e) {
            throw new MojoExecutionException("svn failure", e);
        }
    }

    private void unpack(FileNode dest) throws IOException {
        FileNode skel;
        
        skel = io.createTempFile();
        new ResourceNode(io, "skel.tar.gz").copyFile(skel);
        dest.mkdir();
        untar(skel, dest);
    }

    private void untar(FileNode src, FileNode dest) throws IOException {
        debug("cd " + dest + " && tar zxf " + src);
        exec(dest, "tar", "zxf", src.getAbsolute());
        
    }
    private void replaceContent(FileNode dest, Map<String, String> props) throws IOException {
        Filter filter;
        FileNode file;
        String orig;
        String changed;
        
        filter = io.filter();
        filter.include("src/**/*.java", "pom.xml", "**/*.sh");
        for (Node node : dest.find(filter)) {
            file = (FileNode) node;
            orig = file.readString();
            changed = orig;
            for (Map.Entry<String, String> entry : props.entrySet()) {
                changed = changed.replace(entry.getKey(), entry.getValue());
            }
            if (!changed.equals(orig)) {
                debug("patch " + file);
                file.writeString(changed);
            }
        }
    }
    
    private void renameFiles(FileNode dest, String name, String to) throws IOException {
        FileNode file;
        
        for (Node node : dest.find("**/" + name)) {
            file = (FileNode) node;
            mv(file, (FileNode) file.getParent().join(to));
        }
    }

    private void mv(FileNode src, FileNode dest) throws IOException {
        FileNode destDir;
        
        destDir = (FileNode) dest.getParent();
        debug("mkdir " + destDir.getAbsolute());
        destDir.mkdirsOpt();
        debug("mv " + src.getAbsolute() + " " + dest.getName());
        src.move(dest);
    }

    private void exec(FileNode dest, String ... cmd) throws IOException {
        new Program(dest, cmd).execNoOutput();
    }
}
