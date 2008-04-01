// §{{header}}:
//
// This is file examples/calc/Main.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package calc;

import de.mlhartme.mork.mapping.Mapper;
import de.mlhartme.mork.util.GenericException;

/**
 * Calculate simple expression.
 * A kind of Hello-World example for tools like Mork.
 */

public class Main {
    public static void main(String[] args) {
        Mapper mapper;

        mapper = new Mapper("calc.Mapper");
        System.out.println("(press ctrl-c to quit)");
        mapper.repl("> ", null);
    }

    public static int expr(int result) {
        return result;
    }

    public static int add(int left, int right) {
        return left + right;
    }

    public static int sub(int left, int right) {
        return left - right;
    }

    public static int mult(int left, int right) {
        return left * right;
    }

    public static int div(int left, int right) throws GenericException {
        if (right == 0) {
            throw new GenericException("division by zero");
        }
        return left / right;
    }
}
