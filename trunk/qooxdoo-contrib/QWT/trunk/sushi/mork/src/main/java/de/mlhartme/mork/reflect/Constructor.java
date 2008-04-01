// §{header}:
// 
// This is file src/de/mlhartme/mork/reflect/Constructor.java,
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
import java.io.ObjectInput;
import java.io.ObjectInputStream;
import java.io.ObjectOutput;
import java.io.ObjectOutputStream;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.classfile.Bytecodes;
import org.qooxdoo.sushi.classfile.ClassRef;
import org.qooxdoo.sushi.classfile.Code;
import org.qooxdoo.sushi.classfile.MethodRef;

/**
 * Wraps a Java Constructor to make it useable as a Function.
 * Java Constructor means java.lang.reflect.Constructor.
 */
public class Constructor extends Function implements Bytecodes {
    /** Java Constructor wrapped by this Function. */
    private java.lang.reflect.Constructor constr;

    public static Selection forName(String name) {
        Class cl;

        cl = ClassRef.classFind(name);
        if (cl == null) {
            return new Selection();
        }
        return forClass(cl);
    }

    /**
     * Gets all valid Constructors for the specified Class.
     * @param  cl  the clase whose constructors are searched
     * @param  result  retrieves all valid Constructors found.
     */
    public static Selection forClass(Class cl) {
        java.lang.reflect.Constructor[] constrs;
        int i;
        List lst;
        Function fn;

        lst = new ArrayList();
        constrs = cl.getConstructors();
        for (i = 0; i < constrs.length; i++) {
            fn = create(constrs[i]);
            if (fn != null) {
                lst.add(fn);
            }
        }
        return new Selection(lst);
    }

    /**
     * Creates a new Constructor.
     * @param  constrInit  Java constructor to be wrapped
     */
    public Constructor(java.lang.reflect.Constructor constrInit) {
        int modif;

        modif = constrInit.getModifiers();
        if (Modifier.isAbstract(modif) || !Modifier.isPublic(modif)) {
            throw new IllegalArgumentException();
        }

        constr = constrInit;
    }

    public static Constructor create
        (  java.lang.reflect.Constructor constr  )
    {
        try {
            return new Constructor(constr);
        }
        catch (IllegalArgumentException e) {
            return null;
        }
    }


    //------------------------------------------------------------------

    /**
     * Gets the Function name.
     * @return  the function name
     */
    public String getName() {
        return constr.getName();
    }

    /**
     * Gets the result type of this Function.
     * @return  the result type
     */
    public Class getReturnType() {
        return constr.getDeclaringClass();
    }

    /**
     * Gets the argument count of this Function.
     * @return  the argument count
     */
    public Class[] getParameterTypes() {
        return constr.getParameterTypes();
    }

    public Class[] getExceptionTypes() {
        return constr.getExceptionTypes();
    }

    /**
     * Invokes the Java constructor.
     * @param   vals  arguments to the Java constructor
     * @return  the Object returned by the Java constructor
     */
    public Object invoke(Object[] vals) throws InvocationTargetException {
        try {
            return constr.newInstance(vals);
        } catch (InvocationTargetException e) {
            throw e;
        } catch (IllegalArgumentException e) {
            throw e;
        } catch (IllegalAccessException e) {
            // runtime exception, isValid should prevent this case
            throw new RuntimeException("can't access constructor");
        } catch (InstantiationException e) {
            // runtime excpetion, because the constructor of constructor
            // has to prevent this situation.
            throw new RuntimeException("can't instantiate");
        }
    }

    //----------------------------------------------------------------------
    // Manual serialization. Automatic Serialization is not possible
    // because Java Constructors are not serializable.

    /**
     * Writes this Constructor.
     * @param  out  target to write to
     */
    private void writeObject(ObjectOutputStream out) throws IOException {
        write(out, constr);
    }

    /**
     * Reads this Constructor.
     * @param  in  source to read from
     */
    private void readObject(ObjectInputStream in)
        throws IOException, ClassNotFoundException, NoSuchMethodException
    {
        constr = read(in);
    }

    //-----------------------------------------------------------------------
    // additional functionality for Java Methods

    /**
     * Writes a Java Constructor.
     * @param  out     target to write to
     * @param  constr  the Java Construtor to be written
     */
    public static void write
        (  ObjectOutput out, java.lang.reflect.Constructor constr  )
        throws IOException
    {
        Class cl;

        if (constr == null) {
            ClassRef.write(out, null);
        } else {
            cl = constr.getDeclaringClass();
            ClassRef.write(out, cl);
            ClassRef.writeClasses(out, constr.getParameterTypes());
        }
    }

    /**
     * Reads a Java Constructor.
     * @param   in  source to read from
     * @return  the Java Constructor read
     */
    public static java.lang.reflect.Constructor read(ObjectInput in)
        throws ClassNotFoundException, IOException, NoSuchMethodException
    {
        Class cl;
        Class[] types;

        cl = ClassRef.read(in);
        if (cl == null) {
            return null;
        } else {
            types = ClassRef.readClasses(in);
            return cl.getConstructor(types);
        }
    }

    public void translate(Code dest) {
        int max;
        int ofs;
        int var;
        int[] vars;
        ClassRef type;
        ClassRef[] types;
        Class[] tmp;
        int i;

        // remove all arguments from the stack to the reference to
        // the new object

        tmp = getParameterTypes();
        max = tmp.length;
        vars = new int[max];
        types = new ClassRef[max];
        for (i = max - 1; i >= 0; i--) {
            type = new ClassRef(tmp[i]);
            types[i] = type;
            var = dest.allocate(type);
            vars[i] = var;
            type.emitStore(dest, var);
        }

        dest.emit(NEW, new ClassRef(constr.getDeclaringClass()));
        dest.emit(DUP);  // this will be the result
        for (i = 0; i < max; i++) {
            types[i].emitLoad(dest, vars[i]);
            if (Method.isCastType(tmp[i])) {
                dest.emit(CHECKCAST, types[i]);
            }
        }
        dest.emit(INVOKESPECIAL, new MethodRef(constr));
    }
}
