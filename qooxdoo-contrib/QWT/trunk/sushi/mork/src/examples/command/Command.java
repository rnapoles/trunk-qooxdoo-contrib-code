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
