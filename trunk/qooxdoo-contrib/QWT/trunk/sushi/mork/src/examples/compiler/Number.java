// §{{header}}:
//
// This is file examples/compiler/Number.java,
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

public class Number extends Expression {
    private int num;

    public Number(String str) {
        // throws an unchecked exception if str is not a number.
        // That's fine since this would indicate a bug: the grammar has to ensure a number
        num = Integer.parseInt(str);
    }

    public Number(int num) {
        this.num = num;
    }

    public Type getType() {
        return Int.TYPE;
    }

    public String toString() {
        return "" + num;
    }

    public void translate(Code code) {
        code.emit(LDC, num);
    }
}
