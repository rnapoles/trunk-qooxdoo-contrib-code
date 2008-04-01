// §{{header}}:
//
// This is file examples/command/Line.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package command;

/**
 * A command line is a sequence of expression.
 */

public class Line {
    /**
     * Concatenating these expressions forms the command line
     * to be executed.
     */
    private Expression[] expressions;

    public Line(Expression[] expressions) {
        this.expressions = expressions;
    }

    public String eval() {
        StringBuffer buffer;
        int i;

        buffer = new StringBuffer();
        for (i = 0; i < expressions.length; i++) {
            buffer.append(expressions[i].eval());
        }
        return buffer.toString();
    }
}
