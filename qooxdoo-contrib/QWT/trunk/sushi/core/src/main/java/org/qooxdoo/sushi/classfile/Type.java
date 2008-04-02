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

package org.qooxdoo.sushi.classfile;

/**
 * Stupid data container for ClassRef.
 */

public class Type implements Bytecodes, Constants {
    public final int id; // T_ constant
    public final String name;
    public final char descriptor;
    public final Class<?> type;
    public final Class<?> wrapper;
    public final Object zero;
    public final Object zeroLdc;
    public final int size;
    public final int load;
    public final int store;
    public final int arrayLoad;
    public final int arrayStore;

    private Type(int id, char descriptor,
                 Class<?> type, Class<?> wrapper,
                 Object zero, Object zeroLdc, int size,
                 int load, int store, int arrayLoad, int arrayStore) {
        this.id = id;
        this.name = (type == null ? null : type.getName());
        this.descriptor = descriptor;
        this.type = type;
        this.wrapper = wrapper;
        this.zero = zero;
        this.zeroLdc = zeroLdc;
        this.size = size;
        this.load = load;
        this.store = store;
        this.arrayLoad = arrayLoad;
        this.arrayStore = arrayStore;
    }

    private static final Integer ZERO = new Integer(0);

    public static final Type[] PRIMITIVES = {
        // primitive types
        new Type(T_VOID,      'V', Void.TYPE,      Void.class,
            null,                    null,          0,
            -1, -1, -1, -1),

        new Type(T_BOOLEAN,   'Z', Boolean.TYPE,   Boolean.class,
            new Boolean(false),      ZERO,          1,
            ILOAD, ISTORE, BALOAD, BASTORE),
            // bytecode has no instruction to access boolean arrays,
            // they are accessed as byte arrays

        new Type(T_CHAR,      'C', Character.TYPE, Character.class,
            new Character((char) 0), ZERO,          1,
            ILOAD, ISTORE, CALOAD, CASTORE),

        new Type(T_FLOAT,     'F', Float.TYPE,     Float.class,
            new Float(0),            new Float(0),  1,
            FLOAD, FSTORE, FALOAD, FASTORE),

        new Type(T_DOUBLE,    'D', Double.TYPE,    Double.class,
            new Double(0),           new Double(0), 2,
            DLOAD, DSTORE, DALOAD, DASTORE),

        new Type(T_BYTE,      'B', Byte.TYPE,      Byte.class,
            new Byte((byte) 0),      ZERO,          1,
            ILOAD, ISTORE, BALOAD, BASTORE),

        new Type(T_SHORT,     'S', Short.TYPE,     Short.class,
            new Short((short) 0),    ZERO,          1,
            ILOAD, ISTORE, SALOAD, SASTORE),

        new Type(T_INT,       'I', Integer.TYPE,   Integer.class,
            ZERO,                    ZERO,          1,
            ILOAD, ISTORE, IALOAD, IASTORE),

        new Type(T_LONG,      'J', Long.TYPE,      Long.class,
            new Long(0),             new Long(0),   2,
            LLOAD, LSTORE, LALOAD, LASTORE),
    };

    public static final Type REFERENCE =
        new Type(T_REFERENCE, 'L', null,           null,
                 null,                    null,          1,
                 ALOAD, ASTORE, AALOAD, AASTORE);
}
