// §{{header}}:
//
// This is file src/de/mlhartme/mork/mapping/ToArray.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.mapping;

import de.mlhartme.mork.classfile.Bytecodes;
import de.mlhartme.mork.classfile.ClassRef;
import de.mlhartme.mork.classfile.Code;
import de.mlhartme.mork.classfile.MethodRef;
import de.mlhartme.mork.classfile.Util;
import de.mlhartme.mork.reflect.Arrays;
import de.mlhartme.mork.reflect.Function;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.lang.reflect.Array;
import java.util.List;

/**
 * Invokation creates an array initialized with the List passed as an
 * argument.
 * TODO: replace this by an ArrayConstructor constructor (that returns
 * an empty array) and some composition? Move into reflect package?
 */

public class ToArray extends Function implements Bytecodes {
    /** Component type of the array. */
    private Class componentType;

    public ToArray(Class componentType) {
        this.componentType = componentType;
    }


    /*
     * Gets the Function name.
     * @return  the function name
     */
    public String getName() {
        return "To" + componentType.getName() + "Array";
    }

    /**
     * Gets the result type of this Function.
     * @return  the result type
     */
    public Class getReturnType() {
        return Arrays.getArrayClass(componentType);
    }

    /**
     * Gets the argument count of this Function.
     * @return  the argument count
     */
    public Class[] getParameterTypes() {
        return new Class[] { List.class };
    }

    public Class[] getExceptionTypes() {
        return NO_CLASSES;
    }

    public Object invoke(Object[] vals) {
        int i, max;
        Object result; // not Object[] because of arrays of primitive types
        List lst;

        lst = (List) vals[0];
        max = lst.size();
        result = Array.newInstance(componentType, max);
        for (i = 0; i < max; i++) {
            Array.set(result, i, lst.get(i));
        }
        return result;
    }

    //----------------------------------------------------------------------
    // Manual serialization. Automatic Serialization is not possible
    // because Java Constructors are not serializable.

    /**
     * Writes this Constructor.
     * @param  out  target to write to
     */
    private void writeObject(ObjectOutputStream out) throws IOException {
        ClassRef.write(out, componentType);
    }

    /**
     * Reads this Constructor.
     * @param  in  source to read from
     */
    private void readObject(ObjectInputStream in)
        throws IOException, ClassNotFoundException, NoSuchMethodException
    {
        componentType = ClassRef.read(in);
    }

    public void translate(Code dest) {
        int lstVar; // the list, which is turned into an array
        int maxVar; // local variable for upper bound
        int iVar; // loop variable
        int arrayVar;
        int startLabel;
        int endLabel;
        ClassRef type;
        ClassRef listRef;

        listRef = new ClassRef(java.util.List.class);

        type = new ClassRef(componentType);

        lstVar = dest.allocate(listRef);
        maxVar = dest.allocate(ClassRef.INT);
        iVar = dest.allocate(ClassRef.INT);
        arrayVar = dest.allocate(ClassRef.OBJECT);

        dest.emit(CHECKCAST, listRef);
        dest.emit(DUP);
        dest.emit(ASTORE, lstVar);
        dest.emit(INVOKEINTERFACE,
                  MethodRef.ifc(listRef, ClassRef.INT, "size"));
        dest.emit(DUP);
        dest.emit(ISTORE, maxVar);
        type.emitArrayNew(dest);
        dest.emit(ASTORE, arrayVar);
        dest.emit(LDC, 0);
        dest.emit(ISTORE, iVar);
        startLabel = dest.currentLabel();
        endLabel = dest.declareLabel();
        dest.emit(ILOAD, iVar);
        dest.emit(ILOAD, maxVar);
        dest.emit(IF_ICMPGE, endLabel);
        dest.emit(ALOAD, arrayVar);
        dest.emit(ILOAD, iVar);
        dest.emit(ALOAD, lstVar);
        dest.emit(ILOAD, iVar);
        dest.emit(INVOKEINTERFACE,
            MethodRef.ifc(listRef, ClassRef.OBJECT, "get", ClassRef.INT));
        Util.unwrap(componentType, dest);
        if (!type.isPrimitive()) {
            dest.emit(CHECKCAST, type);
        }
        type.emitArrayStore(dest);
        dest.emit(IINC, iVar, 1);
        dest.emit(GOTO, startLabel);
        dest.defineLabel(endLabel);
        dest.emit(ALOAD, arrayVar);
    }
}
