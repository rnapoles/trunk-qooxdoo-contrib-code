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
import java.util.HashMap;
import java.util.Map;

import org.apache.maven.plugin.MojoExecutionException;

import org.qooxdoo.sushi.filter.Filter;
import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.io.ResourceNode;
import org.qooxdoo.sushi.util.Program;

/**
 * @description Generates a new QWT application.
 * @requiresProject false
 * @goal new
 */
public class NewMojo extends Base {
    /**
     * Package name.
     *
     * @parameter expression="${package}"
     * @required
     */
    private String pkg;
    
    @Override
    public void doExecute() throws IOException, MojoExecutionException {
        int idx;
        String artifact;
        String group;
        FileNode dest;
        Map<String, String> map;
        
        idx = pkg.lastIndexOf('.');
        if (idx <= 0) {
            throw new MojoExecutionException("package name must contain one (or more) '.': " + pkg);
        }
        artifact = pkg.substring(idx + 1); // ok for -1
        group = pkg.substring(0, idx);
        dest = io.node(artifact);
        unpack(dest);
        renameFiles(dest, "PACKAGE", pkg.replace('.', '/'));
        map = new HashMap<String, String>();
        map.put("%PACKAGE%", pkg);
        map.put("%ARTIFACT%", artifact);
        map.put("%GROUP%", group);
        // TODO:
        map.put("%QWT_VERSION%", getVersion());
        replaceContent(dest, map);
        info("SUCCESS: new application written to " + dest.getAbsolute());
        info("Run 'mvn qwt:help' for help");
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
