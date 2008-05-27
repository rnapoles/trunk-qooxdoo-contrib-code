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

package org.qooxdoo.sushi.compiler;

import java.lang.reflect.InvocationTargetException;

import org.qooxdoo.sushi.classfile.Bytecodes;
import org.qooxdoo.sushi.classfile.ClassRef;
import org.qooxdoo.sushi.classfile.Code;
import org.qooxdoo.sushi.classfile.MethodRef;
import org.qooxdoo.sushi.reflect.Field;
import org.qooxdoo.sushi.reflect.Function;
import org.qooxdoo.sushi.reflect.Method;
import org.qooxdoo.sushi.reflect.Selection;

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
    private final Class<?> type;

    /**
     * Reader methods to obtain a field value. Methods have
     * to take one argument of type "type".
     */
    private final Function[] fields;

    private final Class<?>[] fieldTypes;

    /** Reference to constructor function. */
    private final MethodRef constr;

    /** Bytecode to invoke constructor. */
    private final int constrType;

    public GenericCompiler(Class<?> typeInit, String[] fieldNames) {
        this(typeInit, fieldNames, null);
    }

    /**
     * @param constrName  name of constructor function or null for
     *        real constructor.
     */
    public GenericCompiler(Class<?> typeInit, String[] fieldNames, String constrName) {
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

    @Override
    public boolean matches(Class<?> c) {
        return type.equals(c);
    }

    @Override
    public Class<?>[] getFieldTypes() {
        return fieldTypes;
    }

    @Override
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
    @Override
    public void beginTranslation(Object obj, Code dest) {
        if (constrType == INVOKESPECIAL) {
            dest.emit(NEW, new ClassRef(type));
            dest.emit(DUP);
            // save reference that remains on the stack
            // when object() is finished
        }
    }

    /** actually invoke. **/
    @Override
    public void endTranslation(Object obj, Code dest) {
        dest.emit(constrType, constr);
    }
}
