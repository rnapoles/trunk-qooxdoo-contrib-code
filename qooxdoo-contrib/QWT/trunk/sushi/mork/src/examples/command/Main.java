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

package command;

import org.qooxdoo.sushi.mapping.Mapper;

public class Main {
    public static void main(String[] args) {
        Mapper mapper;
        Object[] tmp;
        Command command;

        if (args.length != 1) {
            System.out.println("command: add frontends to command line tools");
            System.out.println("  usage: command.Main <command file>");
        } else {
            mapper = new Mapper("command.Mapper");
            tmp = mapper.run(args[0]);
            if (tmp == null) {
                // runOrMessage has issued an error message
                System.exit(1);
            }
            command = (Command) tmp[0];
            command.run();
        }
        System.exit(0);     // just returning doesn't kill the gui threads
    }
}
