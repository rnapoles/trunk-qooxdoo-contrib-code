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

package org.qooxdoo.sushi.reflect;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import org.qooxdoo.sushi.classfile.ClassRef;

/**
 * A collection of functions. Immutable. Argument- and return-types
 * of functions are automatically wrapped/unwrapped.
 */

public class Selection {
    private Function[] functions;

    public Selection() {
        functions = new Function[0];
    }

    public Selection(Function fn) {
        functions = new Function[] { fn };
    }

    public Selection(Collection fns) {
        int i;
        Iterator iterator;

        functions = new Function[fns.size()];
        iterator = fns.iterator();
        i = 0;
        while (iterator.hasNext()) {
            functions[i] = (Function) iterator.next();
            i++;
        }
    }

    public Selection(Function[] functionsInit) {
        functions = functionsInit;
    }

    //------------------------------------------------------------------

    /**
     * @return null for empty selections; otherwise, result is != null.
     */
    public Class calcResult() {
        int i;
        Class result;
        Class tmp;

        result = null;
        for (i = 0; i < functions.length; i++) {
            tmp = functions[i].getReturnType();
            tmp = ClassRef.wrappedType(tmp);
            result = ClassRef.commonBase(result, tmp);
            if (result == null) {
                throw new RuntimeException();
            }
        }
        return result;
    }

    public boolean isEmpty() {
        return size() == 0;
    }

    public int size() {
        return functions.length;
    }

    public Function getFunction(int i) {
        return functions[i];
    }

    /**
     * @return null if not a function
     */
    public Function getFunction() {
        if (functions.length == 1) {
            return functions[0];
        } else {
            return null;
        }
    }

    //------------------------------------------------------------------

    public Selection add(Selection operand) {
        Function[] fns;

        if (operand.isEmpty()) {
            return this;
        } else if (this.isEmpty()) {
            return operand;
        } else {
            fns = new Function[size() + operand.size()];
            System.arraycopy(functions, 0, fns, 0, size());
            System.arraycopy(operand.functions, 0, fns, size(), operand.size());
            return new Selection(fns);
        }
    }

    //----------------------------------------------------------------------

    public Selection restrictArgumentType(int arg, Class type) {
        List lst;
        int i;
        Class tmp;
        Class[] paras;

        lst = new ArrayList();
        for (i = 0; i < functions.length; i++) {
            paras = functions[i].getParameterTypes();
            if (arg < paras.length) {
                tmp = paras[arg];
                tmp = ClassRef.wrappedType(tmp);
                if (tmp.isAssignableFrom(type)) {
                    lst.add(functions[i]);
                }
            }
        }
        return new Selection(lst);
    }

    public Selection restrictArgumentCount(int count) {
        List lst;
        int i;

        lst = new ArrayList();
        for (i = 0; i < functions.length; i++) {
            if (functions[i].getParameterTypes().length == count) {
                lst.add(functions[i]);
            }
        }
        return new Selection(lst);
    }

    //-------------------------------------------------------------------

    @Override
    public String toString() {
        StringBuilder buffer;
        int i;

        buffer = new StringBuilder();
        buffer.append("selection " + "{\n");
        for (i = 0; i < functions.length; i++) {
            buffer.append("  ");
            buffer.append(functions[i].toString());
            buffer.append('\n');
        }
        buffer.append("}");

        return buffer.toString();
    }
}
