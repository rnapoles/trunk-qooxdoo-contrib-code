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

/**
 * Local variable reference.
 */
public class VariableReference extends LValue {
    private Variable var;
    private int store;  // store opcode
    private int load; // load opcode

    public VariableReference(Declarations decls, String name) throws SemanticError {
        if (decls == null) {
            throw new IllegalArgumentException();
        }
        var = decls.lookup(name);
        if (var.getType() == Int.TYPE) {
            store = ISTORE;
            load = ILOAD;
        } else {
            store = ASTORE;
            load = ALOAD;
        }
    }

    @Override
    public Type getType() {
        return var.getType();
    }

    @Override
    public void translateAssign(Code dest) {
        dest.emit(store, var.getAddress());
    }

    @Override
    public void translate(Code dest) {
        dest.emit(load, var.getAddress());
    }
}
