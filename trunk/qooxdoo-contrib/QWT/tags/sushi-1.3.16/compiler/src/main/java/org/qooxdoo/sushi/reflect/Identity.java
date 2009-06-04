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

import org.qooxdoo.sushi.classfile.ClassRef;
import org.qooxdoo.sushi.classfile.Code;

/**
 * Identity function. Invokation takes 1 argument and returns it unchanged.
 * Can be used to case a Value.
 */

public class Identity extends Function {
    /** result type. Wrapped for serialization. */
    private Class result;

    /** argument type. Wrapper for serialization. */
    private Class arg;

    /** The Function name */
    private String name;

    /**
     * Create an Identity. Without conversion
     * @param  nameInit   the Function name
     * @param  typeInit   the argument and result type
     */
    public Identity(String nameInit, Class typeInit) {
        this(nameInit, typeInit, typeInit);
    }

    /**
     * Create an Identity. With Conversion.
     * @param  nameInit    the Function name
     * @param  resultInit  the result type
     * @param  argInit     the argument type
     */
    public Identity(String nameInit, Class resultInit, Class argInit) {
        name = nameInit;
        result = resultInit;
        arg = argInit;
    }

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
     * @return  the result type
     */
    @Override
    public Class getReturnType() {
        return result;
    }

    @Override
    public Class[] getParameterTypes() {
        return new Class[] { arg };
    }

    @Override
    public Class[] getExceptionTypes() {
        return NO_CLASSES;
    }

    /**
     * Takes 1 argument and returns it. If this Identity is used to
     * case the value, a possible runtime exception is thrown by
     * java.lang.reflect.
     * @param   paras  array of length 1
     * @return  the array element supplied
     */
    @Override
    public Object invoke(Object[] paras) {
        return paras[0];
    }

    //--------------------------------------------------------------------
    // Manual serialization. Automatic serialization is not possible because
    // Java Methods are not serializable.

    /**
     * Writes this Function.
     * @param  out  target to write to
     */
    private void writeObject(ObjectOutputStream out) throws IOException {
        ClassRef.write(out, result);
        ClassRef.write(out, arg);
        out.writeUTF(name);
    }

    /**
     * Reads this Function.
     * @param   in  source to read from
     */
    private void readObject(ObjectInputStream in) throws ClassNotFoundException, NoSuchMethodException, IOException {
        result = ClassRef.read(in);
        arg = ClassRef.read(in);
        name = in.readUTF();
    }

    @Override
    public void translate(Code code) {
        // do nothing
    }
}
