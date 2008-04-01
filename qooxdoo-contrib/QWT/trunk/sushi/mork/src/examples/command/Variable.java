// §{{header}}:
//
// This is file examples/command/Variable.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package command;

public class Variable {
    /** used to refer to the variable */
    private String name;

    /** used in the frontend to label the variable's input field. */
    private String label;

    /** contents */
    private String value;

    public Variable(String name, String label) {
        this.name = name;
        this.label = label;
        this.value = "";
    }

    public String getName() {
        return name;
    }

    public String getLabel() {
        return label;
    }

    public String get() {
        return value;
    }

    public void set(String obj) {
        value = obj;
    }
}
