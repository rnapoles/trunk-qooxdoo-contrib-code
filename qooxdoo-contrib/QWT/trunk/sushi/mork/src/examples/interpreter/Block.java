// §{{header}}:
//
// This is file examples/interpreter/Block.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package interpreter;

public class Block extends Statement {
    private Statement[] stmts;

    public Block(Statement[] stmts) {
        this.stmts = stmts;
    }

    public static Block createNop() {
        return new Block(new Statement[0]);
    }

    public void execute() {
        int i;

        for (i = 0; i < stmts.length; i++) {
            stmts[i].execute();
        }
    }
}
