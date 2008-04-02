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

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.eclipse.jdt.core.JavaCore;

/** Run this to generate eclipse properties for compile configuration */
public class GenerateOptions {
    public static void main(String[] args) throws IOException {
        String name;
        Map<String, String> opts;
        FileWriter out;
        List<String> keys;
        
        name = args[0];
        opts = JavaCore.getOptions();
        opts.put(JavaCore.COMPILER_SOURCE, "1.5");
        opts.put(JavaCore.COMPILER_PB_UNUSED_PARAMETER, JavaCore.IGNORE);
        opts.put(JavaCore.COMPILER_PB_UNUSED_LOCAL, JavaCore.IGNORE);
        opts.put(JavaCore.COMPILER_PB_UNUSED_LABEL, JavaCore.IGNORE);
        opts.put(JavaCore.COMPILER_PB_UNUSED_PRIVATE_MEMBER, JavaCore.IGNORE);
        opts.put(JavaCore.COMPILER_PB_MISSING_SERIAL_VERSION, JavaCore.IGNORE);
        opts.put(JavaCore.COMPILER_PB_STATIC_ACCESS_RECEIVER, JavaCore.IGNORE);
        opts.put(JavaCore.COMPILER_PB_UNCHECKED_TYPE_OPERATION, JavaCore.IGNORE);
        opts.put(JavaCore.COMPILER_PB_METHOD_WITH_CONSTRUCTOR_NAME, JavaCore.IGNORE);

        out = new FileWriter(name);
        keys = new ArrayList<String>(opts.keySet());
        Collections.sort(keys);
        for (String key : keys) {
            if (key.startsWith("org.eclipse.jdt.core.compiler.")) {
                out.write(key + "=" + opts.get(key) + "\n");
            }
        }
        out.close();
        System.out.println("options written to " + name);
    }
}
