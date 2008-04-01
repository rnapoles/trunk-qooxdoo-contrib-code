// §{{header}}:
//
// This is file examples/command/Main.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package command;

import de.mlhartme.mork.mapping.Mapper;

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
