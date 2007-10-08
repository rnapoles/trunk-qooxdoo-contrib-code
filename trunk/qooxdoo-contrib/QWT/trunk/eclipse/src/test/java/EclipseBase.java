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

import java.io.IOException;

import org.qooxdoo.sushi.cli.Command;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.util.Program;

public class EclipseBase {
    private static final IO io = new IO();
    
    public static void main(String[] args) throws IOException {
        eclipse(args[0], args[1]);
    }
    
    public static void eclipse(String dir, String version) throws IOException {
        FileNode root = io.node(dir + "/plugins");
        FileNode dest = io.createTempFile();
        merge(dest, root, 
                "org.eclipse.osgi_*.jar",
                "org.eclipse.equinox.common_*.jar",
                "org.eclipse.equinox.preferences_*.jar",
                "org.eclipse.core.runtime_*.jar",
                "org.eclipse.core.resources_*.jar",
                "org.eclipse.core.jobs_*.jar"
                );
        System.out.println("installing " + dest.getName());
        new Program(io.getWorking(), "mvn", "install:install-file", 
                "-Dversion=" + version, 
                "-DgroupId=org.eclipse", 
                "-DartifactId=base", 
                "-Dfile=" + dest.getAbsolute(), 
                "-Dpackaging=jar").exec(System.out);
    }
    
    public static void merge(FileNode dest, FileNode dir, String... files) throws IOException {
        FileNode tmp = io.createTempDirectory();
        FileNode jar;
        
        for (String file : files) {
            jar = (FileNode) dir.findOne(file);
            new Program(tmp, "jar", "xf", jar.getAbsolute()).exec(System.out);
        }
        new Program(tmp, "jar", "cf", dest.getAbsolute(), ".").exec(System.out);
    }
}
