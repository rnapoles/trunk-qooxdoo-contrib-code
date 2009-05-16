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

package calc;

import org.qooxdoo.sushi.mapping.Mapper;
import org.qooxdoo.sushi.misc.GenericException;

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
