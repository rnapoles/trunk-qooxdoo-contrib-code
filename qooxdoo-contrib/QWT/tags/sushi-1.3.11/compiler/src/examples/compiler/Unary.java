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

package compiler;

import org.qooxdoo.sushi.classfile.Code;

public class Unary extends Expression {
    private Type type;
    private int op;
    private Expression body;

    public Unary(int op, Expression body) throws SemanticError {
        this.op = op;
        this.body = body;
        this.type = body.getType().getUnaryType(op);
    }

    @Override
    public Type getType() {
        return type;
    }

    @Override
    public void translate(Code code) {
        body.translate(code);
        body.getType().translateUnary(op, code);
    }
}
