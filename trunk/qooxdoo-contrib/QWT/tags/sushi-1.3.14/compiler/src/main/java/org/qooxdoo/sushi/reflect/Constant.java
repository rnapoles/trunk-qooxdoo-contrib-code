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

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

import org.qooxdoo.sushi.classfile.Bytecodes;
import org.qooxdoo.sushi.classfile.ClassRef;
import org.qooxdoo.sushi.classfile.Code;

/**
 * Wraps an Object to make is useable as a constant Function, i.e.
 * a function always returning this Object.
 */

public class Constant extends Function implements Bytecodes {
    /** The result type. */
    private Class type;

    /** The Function name. */
    private String name;

    /** The value to be returned by all invokations. */
    private Object val;

    /**
     * Creates a new Constant.
     * @param typeInit  the result type
     * @param nameInit  the Function name
     * @param valInit   the value to be returned by all invokations
     */
    public Constant(Class typeInit, String nameInit, Object valInit) {
        if (!Serializable.class.isAssignableFrom(typeInit)) {
             throw new IllegalArgumentException("not serializable " +
                                                typeInit);
        }
        type = typeInit;
        name = nameInit;
        val = valInit;
    }

    /**
     * Replaces arguments to Functions by Constant Functions. Results in
     * Functions with fewer arguments.
     * @param  func  Functions whose arguments are filled in
     * @param  ofs   first argument to be filled
     * @param  paras Values for Constants used to fill arguments
     * @return       Function with filled arguments.
     */
    public static Function fillParas(Function func, int ofs, Object[] paras) {
        int i;

        if (func == null) {
            throw new NullPointerException();
        }

        for (i = 0; i < paras.length; i++) {
            // ofs is not changed!
            func = Composition.create(func, ofs,
                                      new Constant(paras[i].getClass(),
                                                   "arg"+i, paras[i]));
            if (func == null) {
                throw new RuntimeException();
            }
        }
        return func;

    }

    //-----------------------------------------------------------------------

    /**
     * Gets the Function name.
     * @return  the Function name
     */
    @Override
    public String getName() {
        return name;
    }

    /**
     * Gets the result type.
     * @return  the result type.
     */
    @Override
    public Class getReturnType() {
        return type;
    }

    @Override
    public Class[] getParameterTypes() {
        return NO_CLASSES;
    }

    @Override
    public Class[] getExceptionTypes() {
        return NO_CLASSES;
    }

    /**
     * Gets the constant.
     * @param   paras   an Array of length 0
     * @return  the constant
     */
    @Override
    public Object invoke(Object[] paras) {
        return val;
    }

    //--------------------------------------------------------------------
    // Manual serialization. Automatic serialization is not possible because
    // Java Methods are not serializable.

    /**
     * Writes this Function.
     * @param  out  target to write to
     */
    private void writeObject(ObjectOutputStream out) throws IOException {
        ClassRef.write(out, type);
        out.writeUTF(name);
        out.writeObject(val);
    }

    /**
     * Reads this Function.
     * @param   in  source to read from
     */
    private void readObject(ObjectInputStream in) throws ClassNotFoundException, NoSuchMethodException, IOException {
        type = ClassRef.read(in);
        name = in.readUTF();
        val = in.readObject();
    }

    @Override
    public void translate(Code dest) {
        dest.emitGeneric(LDC, new Object[] { val });
    }
}
