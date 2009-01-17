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

import org.qooxdoo.sushi.classfile.Bytecodes;
import org.qooxdoo.sushi.classfile.Code;

public abstract class Type implements Bytecodes {
    private String name;

    public Type(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public abstract boolean isAssignableFrom(Type type);

    public boolean isEquiv(Type type) {
        return isAssignableFrom(type) && type.isAssignableFrom(this);
    }

    public abstract Type getUnaryType(int op) throws SemanticError;
    public abstract Type getBinaryType(int op, Type second) throws SemanticError;
    public abstract void translateBinary(int op, Code dest);
    public abstract void translateUnary(int op, Code dest);
}
