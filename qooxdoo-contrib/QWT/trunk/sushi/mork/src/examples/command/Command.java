// §{{header}}:
//
// This is file examples/command/Command.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package command;

public class Command {
    private String name;
    private String description;
    private Declarations decls;
    private Line line;

    public Command(String name, String desciption, Declarations decls, Line line) {
        this.name = name;
        this.description = desciption;
        this.decls = decls;
        this.line = line;
    }

    public void run() {
        String cmd;
        Console console;

        if (decls.runFrontend(name, description)) {
            cmd = line.eval();
            console = new Console();
            console.execute(cmd);
        } else {
            // dialog canceled - do nothing
        }
    }
}
