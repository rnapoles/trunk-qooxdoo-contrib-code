// §{{header}}:
//
// This is file examples/interpreter/Main.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package interpreter;

import de.mlhartme.mork.mapping.Mapper;

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
