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

import java.io.IOException;

import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.util.Program;

/** Adjust the main method and run it generate the eclipse base jar file. */
public class EclipseBase {
    private static final IO io = new IO();
    
    public static void main(String[] args) throws IOException {
        eclipse("/usr/local/eclipse-3.2.2", "3.2.2");
    }
    
    public static void eclipse(String dir, String version) throws IOException {
        FileNode root = io.node(dir + "/plugins");
        Node dest = io.getWorking().join("org.eclipse-base-" + version + ".jar");
        merge(dest, root, 
                "org.eclipse.osgi_*.jar",
                "org.eclipse.equinox.common_*.jar",
                "org.eclipse.equinox.preferences_*.jar",
                "org.eclipse.core.runtime_*.jar",
                "org.eclipse.core.resources_*.jar",
                "org.eclipse.core.jobs_*.jar"
                );
    }
    
    public static void merge(Node dest, Node dir, String... files) throws IOException {
        FileNode tmp = io.createTempDirectory();
        FileNode jar;
        
        for (String file : files) {
            jar = (FileNode) dir.findOne(file);
            new Program(tmp, "jar", "xf", jar.getAbsolute()).exec(System.out);
        }
        new Program(tmp, "jar", "cf", dest.getAbsolute(), ".").exec(System.out);
    }
}
