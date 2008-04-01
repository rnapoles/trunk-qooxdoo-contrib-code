// §{{header}}:
//
// This is file examples/interpreter/Script.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package interpreter;

public class Script {
    private Declarations decls;
    private Statement stmt;

    public Script(Declarations declsInit, Statement stmtInit) {
        decls = declsInit;
        stmt = stmtInit;
    }

    public void run() {
        System.out.println("running script");
        stmt.execute();
    }
}
