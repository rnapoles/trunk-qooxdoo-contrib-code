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

public class Block extends Statement {
    private Statement[] stmts;

    public Block(Statement[] stmts) {
        this.stmts = stmts;
    }

    public static Block createNop() {
        return new Block(new Statement[0]);
    }

    @Override
    public void execute() {
        int i;

        for (i = 0; i < stmts.length; i++) {
            stmts[i].execute();
        }
    }
}
