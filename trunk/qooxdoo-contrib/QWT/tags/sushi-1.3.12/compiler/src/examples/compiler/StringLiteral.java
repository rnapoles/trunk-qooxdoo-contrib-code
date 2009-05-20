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

import org.qooxdoo.sushi.semantics.BuiltIn;
import org.qooxdoo.sushi.semantics.IllegalLiteral;

public class StringLiteral extends Expression {
    private String str;

    public StringLiteral(String str) throws IllegalLiteral {
        this.str = BuiltIn.parseString(str);
    }

    @Override
    public Type getType() {
        return Str.TYPE;
    }

    @Override
    public void translate(Code dest) {
        dest.emit(LDC, str);
    }
}
