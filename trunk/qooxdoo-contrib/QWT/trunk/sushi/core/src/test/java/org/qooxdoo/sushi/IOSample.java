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

package org.qooxdoo.sushi;

import java.io.IOException;

import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;

public class IOSample {
    /** print all Java files in your src/main/java directory */
    public static void main(String[] args) throws IOException {
        IO io;
        Node dir;
        
        io = new IO();
        dir = io.node("src/main/java");
        for (Node node : dir.find("**/*.java")) {
            System.out.println(node.readString());
        }
    }
}
