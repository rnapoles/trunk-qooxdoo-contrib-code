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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.maven.plugin.MojoExecutionException;
import org.qooxdoo.sushi.archive.Archive;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.fs.file.FileNode;
import org.qooxdoo.sushi.fs.filter.Filter;

/**
 * Generates a new application.
 * 
 * @requiresProject false
 * @goal new
 */
public class NewMojo extends Base {
    /**
     * Package name.
     *
     * @parameter expression="${package}" 
     *            default-value="org.qooxdoo.sample"
     */
    private String pkg;
    
    
    /**
     * Application to be generated.
     *
     * @parameter expression="${application}" 
     *            default-value="hello"
     */
    private String application;
    
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
        dest = io.file(artifact);
        unpack(dest);
        renameFiles(dest, "PACKAGE", pkg.replace('.', '/'));
        map = new HashMap<String, String>();
        map.put(Skeleton.PACKAGE, pkg);
        map.put(Skeleton.ARTIFACT, artifact);
        map.put(Skeleton.GROUP, group);
        map.put(Skeleton.TOOLKIT_VERSION, getVersion());
        replaceContent(dest, map);
        info("SUCCESS: new application written to " + dest.getAbsolute());
        info("Run 'mvn qx:help' for help");
    }

    private void unpack(FileNode dest) throws IOException, MojoExecutionException {
        Archive archive;
        Node src;
        List<String> apps;
        
        archive = Archive.loadZip(io.node("resource:" + Skeleton.NAME));
        src = archive.data.join(application); 
        if (!src.isDirectory()) {
            apps = new ArrayList<String>();
            for (Node child : archive.data.list()) {
                if (child.isDirectory()) {
                    apps.add(child.getName());
                }
            }
            throw new MojoExecutionException("unkown application '" + application + "', choose one of " + apps);
        }
        dest.mkdir();
        src.copyDirectory(dest);
    }

    private void replaceContent(Node dest, Map<String, String> props) throws IOException {
        Filter filter;
        String orig;
        String changed;
        
        filter = io.filter();
        filter.include("src/**/*.java", "pom.xml");
        for (Node file : dest.find(filter)) {
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
}
