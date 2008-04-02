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

package interpreter;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Input extends Statement {
    private Variable var;

    public Input(Reference ref) {
        var = ref.getVar();
    }

    @Override
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
