// §{header}:
// 
// This is file src/de/mlhartme/mork/reflect/Identity.java,
// Mork version 0.5  Copyright © 1998-2002  Michael Hartmeier
// 
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
// 
// §.

package de.mlhartme.mork.reflect;

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
    private void readObject(ObjectInputStream in)
        throws ClassNotFoundException, NoSuchMethodException, IOException
    {
        result = ClassRef.read(in);
        arg = ClassRef.read(in);
        name = in.readUTF();
    }

    @Override
    public void translate(Code code) {
        // do nothing
    }
}
