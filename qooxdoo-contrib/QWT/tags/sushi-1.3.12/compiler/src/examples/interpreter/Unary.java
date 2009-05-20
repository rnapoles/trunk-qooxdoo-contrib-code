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

public class Unary extends Expression {
    private int type;
    private int op;
    private Expression body;

    public static final int[][] OPS = {
        { NONE, INT, NONE },  // add   <=
        { NONE, INT, NONE },  // sub   <=
        { NONE, NONE, NONE }, // mul
        { NONE, NONE, NONE }, // div
        { NONE, NONE, NONE }, // rem

        { NONE, NONE, NONE }, // and
        { NONE, NONE, NONE }, // or
        { BOOL, NONE, NONE }, // not   <=

        { NONE, NONE, NONE }, // eq
        { NONE, NONE, NONE }, // ne

        { NONE, NONE, NONE }, // LT
        { NONE, NONE, NONE }, // GT
        { NONE, NONE, NONE }, // LE
        { NONE, NONE, NONE }, // GE

        { NONE, NONE, NONE },
        { NONE, NONE, NONE }
    };

    public Unary(int opInit, Expression bodyInit) throws SemanticError {
        op = opInit;
        body = bodyInit;
        type = OPS[op][body.getType()];
        if (type == NONE) {
            throw new SemanticError("type missmatch");
        }
    }

    @Override
    public int getType() {
        return type;
    }

    @Override
    public Object eval() {
        switch (op) {
        case ADD:
            return body.eval();
        case SUB:
            return new Integer(-body.evalInt());
        case NOT:
            return new Boolean(!body.evalBool());
        default:
            throw new RuntimeException("evalBool: unknown op: " + op);
        }
    }
}
