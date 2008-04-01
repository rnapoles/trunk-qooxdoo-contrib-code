// §{{header}}:
//
// This is file examples/compiler/StringLiteral.java,
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
import de.mlhartme.mork.semantics.BuiltIn;
import de.mlhartme.mork.semantics.IllegalLiteral;

public class StringLiteral extends Expression {
    private String str;

    public StringLiteral(String str) throws IllegalLiteral {
        this.str = BuiltIn.parseString(str);
    }

    public Type getType() {
        return Str.TYPE;
    }

    public void translate(Code dest) {
        dest.emit(LDC, str);
    }
}
