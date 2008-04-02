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

package compiler;

import org.qooxdoo.sushi.classfile.Code;

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

    @Override
    public Type getType() {
        return Int.TYPE;
    }

    @Override
    public String toString() {
        return "" + num;
    }

    @Override
    public void translate(Code code) {
        code.emit(LDC, num);
    }
}
