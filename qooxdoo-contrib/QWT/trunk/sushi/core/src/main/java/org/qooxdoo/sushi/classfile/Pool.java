/* Copyright (c) 1&1. All Rights Reserved. */

package org.qooxdoo.sushi.classfile;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * Constant pool of a Java classfile. Can be read from and written to
 * a class file.
 */

public class Pool implements Constants {
    /**
     * Public representation of constant pool entries.
     * List of Objects. Corresponds to the bytes field.
     */
    private List objects;

    /**
     * Private representation of constant pool entries. Same decoding
     * as used in the class file. List of byte[].
     */
    private List bytes;


    public Pool() {
        bytes = new ArrayList();
        objects = new ArrayList();
        // idx 0 is reserved:
        bytes.add(null);
        objects.add(null);
    }

    public int size() {
        return objects.size();
    }

    public void load(InputStream src) throws IOException {
        int i, max;
        byte[] tmp;

        max = IO.readU2(src);
        for (i = 1; i < max; i++) { // start with i = 1
            tmp = readBytes(src);
            bytes.add(tmp);
            if (isFat(tmp[0])) {
                i++;
                bytes.add(null);
            }
        }
        for (i = 1; i < max; i++) {
            if (bytes.get(i) != null) {
                objects.add(createObject(i));
            } else {
                objects.add(null);
            }
        }
    }

    public void write(OutputStream dest) throws IOException {
        int i, max;
        byte[] info;

        max = objects.size();
        IO.writeU2(dest, max);
        for (i = 1; i < max; i++) {
            info = (byte[]) bytes.get(i);
            if (info != null) {
                IO.write(dest, info, 0, info.length);
            } else {
                // long or double; skip
            }
        }
    }

    public Object get(int idx) {
        return objects.get(idx);
    }

    //---------------------------------------------------------------
    // write, add constants

    // if could determin id via obj.getClass(), but the caller known
    // the id and and int id is easier to handle than a reference.
    public int write(OutputStream dest, int id, Object obj)
        throws IOException
    {
        int idx;

        if (obj == null) {
            throw new NullPointerException("write null");
        }
        idx = addIfNew(id, obj);
        IO.writeU2(dest, idx);
        return idx;
    }

    // if could determin id via obj.getClass(), but the caller known
    // the id and and int id is easier to handle than a reference.
    public int writeShort(OutputStream dest, int id, Object obj)
        throws IOException
    {
        int idx;

        idx = addIfNew(id, obj);
        if (idx >>> 8 != 0) {
            throw new RuntimeException("idx not short " + idx);
        }
        IO.writeU1(dest, idx);
        return idx;
    }

    public int indexOf(Object obj) {
        return objects.indexOf(obj);
    }

    public int indexOf(int id, Object obj) {
        int i, max;
        byte[] info;

        max = bytes.size();
        for (i = 0; i < max; i++) {
            info = (byte[]) bytes.get(i);
            if ((info != null) && (info[0] == id)) {
                if (obj.equals(objects.get(i))) {
                    return i;
                }
            }
        }
        return -1;
    }

    //------------------------------------------------------------------

    public int addIfNew(int id, Object obj) {
        int result;

        result = indexOf(id, obj);
        if (result == -1) {
            result = add(id, obj);
        }
        return result;
    }

    private int add(int id, Object obj) {
        byte[] tmp;
        int result;

        tmp = createBytes(id, obj);
        result = objects.size();
        objects.add(obj);
        bytes.add(tmp);
        if (isFat(id)) {
            objects.add(null);
            bytes.add(null);
        }
        return result;
    }

    //------------------------------------------------------------------
    // object -> bytes.
    // Methods here can not be static because they
    // may recursively add other constants.

    // dispatch method
    private byte[] createBytes(int id, Object obj) {
        byte[] l;
        int i;

        switch (id) {
        case CONSTANT_Class:
            return createClassRefBytes((ClassRef) obj);
        case CONSTANT_Fieldref:
            return createFieldRefBytes((FieldRef) obj);
        case CONSTANT_Methodref:
        case CONSTANT_InterfaceMethodref:
            return createMethodRefBytes((MethodRef) obj);
        case CONSTANT_String:
            return createStringBytes((String) obj);
        case CONSTANT_Integer:
            return createIntegerBytes((Integer) obj);
        case CONSTANT_Float:
            return createFloatBytes((Float) obj);
        case CONSTANT_Long:
            return createLongBytes((Long) obj);
        case CONSTANT_Double:
            return createDoubleBytes((Double) obj);
        case CONSTANT_NameAndType:
            return createNameAndTypeBytes((NameAndType) obj);
        case CONSTANT_Utf8:
            return createUtf8Bytes((String) obj);
        default:
            throw new RuntimeException();
        }
    }

    private byte[] createClassRefBytes(ClassRef ref) {
        int i;

        i = addIfNew(CONSTANT_Utf8, ref.toDescriptor());
        return new byte[] { CONSTANT_Class,
                                (byte) (i >> 8), (byte) i };
    }

    private byte[] createFieldRefBytes(FieldRef ref) {
        int a, b;
        NameAndType tmp;

        tmp = new NameAndType(ref.name, ref);
        a = addIfNew(CONSTANT_Class, ref.owner);
        b = addIfNew(CONSTANT_NameAndType, tmp);
        return new byte[] { CONSTANT_Fieldref,
                                (byte) (a >> 8), (byte) a,
                                (byte) (b >> 8), (byte) b };
    }

    private byte[] createMethodRefBytes(MethodRef ref) {
        int a, b;
        NameAndType tmp;

        tmp = new NameAndType(ref.name, ref);
        a = addIfNew(CONSTANT_Class, ref.owner);
        b = addIfNew(CONSTANT_NameAndType, tmp);
        return new byte[] { ref.ifc?
                            CONSTANT_InterfaceMethodref : CONSTANT_Methodref,
                            (byte) (a >> 8), (byte) a,
                            (byte) (b >> 8), (byte) b };
    }

    private byte[] createStringBytes(String value) {
        byte[] result;
        int a;

        a = addIfNew(CONSTANT_Utf8, value);
        return new byte[] { CONSTANT_String, (byte) (a >> 8), (byte) a };
    }

    private byte[] createIntegerBytes(Integer value) {
        int i;

        i = value.intValue();
        return new byte[] { CONSTANT_Integer,
                                (byte) (i >> 24), (byte) (i >> 16),
                                (byte) (i >>  8), (byte) (i >>  0) };
    }

    private byte[] createFloatBytes(Float value) {
        int i;

        i = Float.floatToIntBits(value.floatValue());
        return new byte[] { CONSTANT_Float,
                                (byte) (i >> 24), (byte) (i >> 16),
                                (byte) (i >>  8), (byte) (i >>  0) };
    }

    private byte[] createLongBytes(Long value) {
        long l;

        l = value.longValue();
        return new byte[] { CONSTANT_Long,
                                (byte) (l >> 56), (byte) (l >> 48),
                                (byte) (l >> 40), (byte) (l >> 32),
                                (byte) (l >> 24), (byte) (l >> 16),
                                (byte) (l >>  8), (byte) (l >>  0) };
    }

    private byte[] createDoubleBytes(Double value) {
        long l;

        l = Double.doubleToLongBits(value.doubleValue());
        return new byte[] { CONSTANT_Double,
                                (byte) (l >> 56), (byte) (l >> 48),
                                (byte) (l >> 40), (byte) (l >> 32),
                                (byte) (l >> 24), (byte) (l >> 16),
                                (byte) (l >>  8), (byte) (l >>  0) };
    }

    private byte[] createNameAndTypeBytes(NameAndType nt) {
        int a, b;

        a = addIfNew(CONSTANT_Utf8, nt.name);
        b = addIfNew(CONSTANT_Utf8, nt.descriptor);
        return new byte[] { CONSTANT_NameAndType,
                                (byte) (a >> 8), (byte) a,
                                (byte) (b >> 8), (byte) b };
    }

    /**
     * This implementation differs from String.getBytes("UFT-8"), e.g.
     * when decoding 0.
     */
    private byte[] createUtf8Bytes(String str) {
        int i, max;
        char c;
        int len;
        byte[] result;

        max = str.length();
        len = 0;
        for (i = 0; i < max; i++) {
            c = str.charAt(i);
            if ((c >= 0x0001) && (c <= 0x007f)) {
                len += 1;
            } else {
                if ((c == 0) || ((c >= 0x0080) && (c <= 0x07ff))) {
                    len += 2;
                } else {
                    len += 3;
                }
            }
        }
        result = new byte[1 + 2 + len];
        result[0] = CONSTANT_Utf8;
        result[1] = (byte) (len >> 8);
        result[2] = (byte) (len >> 0);
        len = 3;  // used for current position
        for (i = 0; i < max; i++) {
            c = str.charAt(i);
            if ((c >= 0x0001) && (c <= 0x007f)) {
                result[len] = (byte) c;
                len += 1;
            } else {
                if ((c == 0) || ((c >= 0x0080) && (c <= 0x07ff))) {
                    result[len + 0] = (byte) ((c >> 6) | 0xc0);
                    result[len + 1] = (byte) ((c & 0x3f) | 0x80);
                    len += 2;
                } else {
                    result[len + 0] = (byte) ((c >> 12) | 0xe0);
                    result[len + 1] = (byte) (((c >> 6) & 0x3f) | 0x80);
                    result[len + 2] = (byte) ((c & 0x3f) | 0x80);
                    len += 3;
                }
            }
        }
        return result;
    }

    //-------------------------------------------------------------
    // read

    private static byte[] readBytes(InputStream src) throws IOException {
        int id;
        int size;
        byte[] bytes;

        id = src.read();
        if (id == -1) {
            return null;
        } else {
            size = getData(id);
            if (size == -1) {
                size = IO.readU2(src);
                bytes = new byte[1 + 2 + size];
                bytes[1] = (byte) (size >> 8);
                bytes[2] = (byte) size;
                IO.read(src, bytes, 3, size);
            } else {
                bytes = new byte[1 + size];
                IO.read(src, bytes, 1, size);
            }
            bytes[0] = (byte) id;
        }
        return bytes;
    }

    private Object createObject(int no) {
        byte[] info;
        Object o1, o2;
        NameAndType nt;
        String str;

        info = (byte[]) bytes.get(no);

        switch (info[0]) {
        case CONSTANT_Class:
            str = (String) createObject(bytesToU2(info, 1));
            return ClassRef.forDescriptor(str);
        case CONSTANT_String:
            return createObject(bytesToU2(info, 1));
        case CONSTANT_Integer:
            return new Integer(bytesToU4(info, 1));
        case CONSTANT_Long:
            return new Long(bytesToU8(info, 1));
        case CONSTANT_Float:
            return new Float(Float.intBitsToFloat(bytesToU4(info, 1)));
        case CONSTANT_Double:
            return new Double(Double.longBitsToDouble(bytesToU8(info, 1)));
        case CONSTANT_Fieldref:
            o1 = createObject(bytesToU2(info, 1));
            nt = (NameAndType) createObject(bytesToU2(info, 3));
            return new FieldRef((ClassRef) o1, nt.name,
                                ClassRef.forFieldDescriptor(nt.descriptor));
        case CONSTANT_Methodref:
            o1 = createObject(bytesToU2(info, 1));
            nt = (NameAndType) createObject(bytesToU2(info, 3));
            return new MethodRef((ClassRef) o1, false,
                 MethodRef.forReturnType(nt.descriptor), nt.name,
                 MethodRef.forArgumentTypes(nt.descriptor));

        case CONSTANT_InterfaceMethodref:
            o1 = createObject(bytesToU2(info, 1));
            nt = (NameAndType) createObject(bytesToU2(info, 3));
            return new MethodRef((ClassRef) o1, true,
                 MethodRef.forReturnType(nt.descriptor), nt.name,
                 MethodRef.forArgumentTypes(nt.descriptor));
        case CONSTANT_NameAndType:
            o1 = createObject(bytesToU2(info, 1));
            o2 = createObject(bytesToU2(info, 3));
            return new NameAndType((String) o1, (String) o2);
        case CONSTANT_Utf8:
            return bytesToChars(info, 3, bytesToU2(info, 1));
        default:
            throw new RuntimeException("unkown id: " + info[0]);
        }
    }

    private static char bytesToU2(byte[] bytes, int ofs) {
        return (char) (((bytes[ofs] & 0xff) << 8) | (bytes[ofs + 1] & 0xff));
    }

    private static int bytesToU4(byte[] bytes, int ofs) {
        return ((bytes[ofs + 0] & 0xff) << 24)
             | ((bytes[ofs + 1] & 0xff) << 16)
             | ((bytes[ofs + 2] & 0xff) <<  8)
             | ((bytes[ofs + 3] & 0xff) <<  0);
    }

    private static long bytesToU8(byte[] bytes, int ofs) {
        return (((long) bytesToU4(bytes, ofs)) << 32)
            | (((long) bytesToU4(bytes, ofs + 4)) & 0xffffffff);
    }

    //----------------------------------------------------------------

    private static int getData(int id) {
        switch (id) {
        case CONSTANT_Class:
        case CONSTANT_String:
            return 2;
        case CONSTANT_Integer:
        case CONSTANT_Float:
        case CONSTANT_Fieldref:
        case CONSTANT_Methodref:
        case CONSTANT_InterfaceMethodref:
        case CONSTANT_NameAndType:
            return 4;
        case CONSTANT_Long:
        case CONSTANT_Double:
            return 8;
        case CONSTANT_Utf8:
            return -1;
        default:
            throw new RuntimeException("unkown id: " + id);
        }
    }

    private static boolean isFat(int id) {
        switch (id) {
        case CONSTANT_Class:
        case CONSTANT_String:
        case CONSTANT_Integer:
        case CONSTANT_Float:
        case CONSTANT_Fieldref:
        case CONSTANT_Methodref:
        case CONSTANT_InterfaceMethodref:
        case CONSTANT_NameAndType:
        case CONSTANT_Utf8:
            return false;
        case CONSTANT_Long:
        case CONSTANT_Double:
            return true;
        default:
            throw new RuntimeException("unkown id: " + id);
        }
    }


    //----------------------------------------------------------------
    // utf encode/decode

    private static String bytesToChars(byte[] info, int ofs, int len) {
        StringBuilder result;
        int i, max;
        int c;

        result = new StringBuilder();
        i = ofs;
        max = len + ofs;
        while (i < max) {
            c = info[i];
            if ((c & 0x80) == 0) {
                i += 1;
            } else {
                switch (c & 0xe0) {
                case 0xc0:
                    // 2 bytes for 0x0000 or 0x0080 .. 0x07ff
                    c = ((info[i + 0] & 0x1f) << 6) |
                        ((info[i + 1] & 0x3f) << 0);
                    i += 2;
                    break;
                case 0xe0:
                    // 3 bytes for 0x0800 .. 0xffff
                    c = ((info[i + 0] & 0x1f) << 12) |
                        ((info[i + 1] & 0x3f) <<  6) |
                        ((info[i + 2] & 0x3f) <<  0);
                    i += 3;
                    break;
                default:
                    throw new RuntimeException("illegal utf byte: " + c);
                }
            }
            result.append((char) c);
        }
        return result.toString();
    }
}
