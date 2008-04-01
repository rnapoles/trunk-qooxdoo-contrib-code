// §{{header}}:
//
// This is file examples/compiler/VariableReference.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package compiler;

import de.mlhartme.mork.classfile.Code;

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

    public Type getType() {
        return var.getType();
    }

    public void translateAssign(Code dest) {
        dest.emit(store, var.getAddress());
    }
    public void translate(Code dest) {
        dest.emit(load, var.getAddress());
    }
}
