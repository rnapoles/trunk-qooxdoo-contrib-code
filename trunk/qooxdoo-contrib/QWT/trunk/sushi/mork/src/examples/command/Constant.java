// §{{header}}:
//
// This is file examples/command/Constant.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package command;

public class Constant extends Expression {
    private String str;

    public Constant(String str) {
        this.str = str;
    }

    public String eval() {
        return str;
    }
}
