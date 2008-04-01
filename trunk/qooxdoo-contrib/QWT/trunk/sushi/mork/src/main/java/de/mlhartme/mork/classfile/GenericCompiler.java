// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/GenericCompiler.java,
// Mork version 0.5  Copyright © 1998-2002  Michael Hartmeier
// 
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
// 
// §.

package de.mlhartme.mork.classfile;

import de.mlhartme.mork.reflect.Field;
import de.mlhartme.mork.reflect.Function;
import de.mlhartme.mork.reflect.Method;
import de.mlhartme.mork.reflect.Selection;
import java.lang.reflect.InvocationTargetException;

/**
 * Compiling an object compiles it fields. The reverse process
 * creates objects from fields.   This is like serializing into a class file instead of an
 * ObjectOutputStream. Instantiate the resulting class to "deserialize" an
 * "bytecode"-serialized object.
 */

public class GenericCompiler extends CustomCompiler implements Bytecodes {
    static {
        if (ObjectCompiler.MIN_INSTRUCTIONS < 3) {
            // I need three statements
            throw new IllegalArgumentException();
        }
    }
    private final Class type;

    /**
     * Reader methods to obtain a field value. Methods have
     * to take one argument of type "type".
     */
    private final Function[] fields;

    private final Class[] fieldTypes;

    /** Reference to constructor function. */
    private final MethodRef constr;

    /** Bytecode to invoke constructor. */
    private final int constrType;

    public GenericCompiler(Class typeInit, String[] fieldNames) {
        this(typeInit, fieldNames, null);
    }

    /**
     * @param constrName  name of constructor function or null for
     *        real constructor.
     */
    public GenericCompiler(Class typeInit, String[] fieldNames, String constrName) {
        int i;
        ClassRef[] tmp;

        type = typeInit;
        fields = new Function[fieldNames.length];
        fieldTypes = new Class[fields.length];
        for (i = 0; i < fields.length; i++) {
            fields[i] = findField(fieldNames[i]);
            fieldTypes[i] = fields[i].getReturnType();
        }

        if (constrName == null) {
            tmp = new ClassRef[fields.length];
            for (i = 0; i < fields.length; i++) {
                tmp[i] = new ClassRef(fields[i].getReturnType());
            }
            constr = MethodRef.constr(new ClassRef(type), tmp);
            constrType = INVOKESPECIAL;
        } else {
            constr = new MethodRef(findConstr(constrName));
            constrType = INVOKESTATIC;
        }
    }

    public boolean matches(Class c) {
        return type.equals(c);
    }

    public Class[] getFieldTypes() {
        return fieldTypes;
    }

    public Object[] getFieldObjects(Object obj) {
        Object[] result;
        int i;

        result = new Object[fieldTypes.length];
        for (i = 0; i < result.length; i++) {
            try {
                result[i] = fields[i].invokeN(obj);
            } catch (InvocationTargetException e) {
                throw new RuntimeException("can't get field: " + fields[i]
                        + ": " + e);
            }
        }
        return result;
    }


    //------------------------------------------------------------------

    // helper method for constructor
    private Function findField(String name) {
        Selection slkt;
        Function f;

        if (name.indexOf('.') == -1) {
            name = type.getName() + "." + name;
        }
        slkt = Method.forName(name);
        if (slkt.size() == 0) {
            f = Field.forName(name);
            if (f != null) {
                slkt = slkt.add(new Selection(f));
            }
        }
        slkt = slkt.restrictArgumentCount(1);
        slkt = slkt.restrictArgumentType(0, type);
        switch (slkt.size()) {
        case 0:
            throw new RuntimeException("no such field: " + name);
        case 1:
            return slkt.getFunction();
        default:
            throw new RuntimeException("ambiguous field: " + name);
        }
    }

    /** Helper method for the constructor. */
    private java.lang.reflect.Method findConstr(String name) {
        Selection slkt;
        int i;

        slkt = Method.forName(name);
        slkt = slkt.restrictArgumentCount(fields.length);
        for (i = 0; i < fields.length; i++) {
            slkt.restrictArgumentType(i, fields[i].getReturnType());
        }
        switch (slkt.size()) {
        case 0:
            throw new RuntimeException("no such constructor: " + name);
        case 1:
            return ((Method) slkt.getFunction()).getRaw();
        default:
            throw new RuntimeException("constructor ambiguous: " + name);
        }
    }

    /** called before prepareing the arguments. **/
    public void beginTranslation(Object obj, Code dest) {
        if (constrType == INVOKESPECIAL) {
            dest.emit(NEW, new ClassRef(type));
            dest.emit(DUP);
            // save reference that remains on the stack
            // when object() is finished
        }
    }

    /** actually invoke. **/
    public void endTranslation(Object obj, Code dest) {
        dest.emit(constrType, constr);
    }
}
