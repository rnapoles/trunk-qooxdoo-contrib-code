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

package interpreter;

import org.qooxdoo.sushi.mapping.Mapper;

/** Command line invokation. */

public class Main {
    public static void main(String[] args) {
        Mapper mapper;
        Object[] result;
        Script script;

        if (args.length != 1) {
            System.out.println("usage: interpreter.Main <filename>");
        } else {
            mapper = new Mapper("interpreter.Mapper");
            result = mapper.run(args[0]);
            if (result == null) {
                return;
            }
            script = (Script) result[0];
            script.run();
        }
    }
}
