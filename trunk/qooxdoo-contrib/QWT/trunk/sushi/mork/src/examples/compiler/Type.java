// §{{header}}:
//
// This is file examples/compiler/Type.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package compiler;

import de.mlhartme.mork.classfile.Bytecodes;
import de.mlhartme.mork.classfile.Code;

public abstract class Type implements Bytecodes {
    private String name;

    public Type(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public abstract boolean isAssignableFrom(Type type);

    public boolean isEquiv(Type type) {
        return isAssignableFrom(type) && type.isAssignableFrom(this);
    }

    public abstract Type getUnaryType(int op) throws SemanticError;
    public abstract Type getBinaryType(int op, Type second) throws SemanticError;
    public abstract void translateBinary(int op, Code dest);
    public abstract void translateUnary(int op, Code dest);
}
