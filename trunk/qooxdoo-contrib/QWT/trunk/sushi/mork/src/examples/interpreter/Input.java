// §{{header}}:
//
// This is file examples/interpreter/Input.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package interpreter;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Input extends Statement {
    private Variable var;

    public Input(Reference ref) {
        var = ref.getVar();
    }

    public void execute() {
        try {
            BufferedReader input;
            String str;

            input = new BufferedReader(new InputStreamReader(System.in));
            str = input.readLine();
            switch (var.getType()) {
            case Expression.BOOL:
                var.set(Boolean.valueOf(str));
                break;
            case Expression.INT:
                var.set(new Integer(str));
                break;
            case Expression.STR:
                var.set(str);
                break;
            default:
                throw new RuntimeException("unknown type: " + var.getType());
            }
        } catch (Exception e) {
            System.out.println("input failed: " + e);
            System.exit(1);
        }
    }
}
