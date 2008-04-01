// §{{header}}:
//
// This is file examples/compiler/Variable.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package compiler;

public class Variable {
    private Type type;
    private String name;
    private int address;

    public Variable(Type type, String name) {
        this.type = type;
        this.name = name;
        address = -1;
    }

    public int allocate(int no) {
        address = no;
        return no + 1;
    }

    public int getAddress() {
        return address;
    }

    public String getName() {
        return name;
    }

    public Type getType() {
        return type;
    }
}
