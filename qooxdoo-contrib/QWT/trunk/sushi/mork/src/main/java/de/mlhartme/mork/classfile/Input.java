// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/Input.java,
// Mork version 0.5  Copyright © 1998-2002  Michael Hartmeier
// 
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
// 
// §.

package de.mlhartme.mork.classfile;

import java.io.EOFException;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.IOException;

import java.util.List;

/**
 * A context for read a class file. The context is comprised of a
 * input stream and a constant pool.
 */

public class Input implements Constants {
    private InputStream src;
    private Code context;
    private int ofs;  // only valid within code context

    public char minor;
    public char major;
    public Pool constants;

    public static ClassDef load(String name) throws IOException {
        FileInputStream file;
        Input input;
        ClassDef result;

        file = new FileInputStream(name);
        input = new Input(file);
        result = new ClassDef(input);
        input.close();
        return result;
    }

    public Input(InputStream src) throws IOException {
        int u4;

        this.src = src;
        this.context = null;

        u4 = readU4();
        if (u4 != MAGIC) {
            throw new IOException("not a class file (magic=" + u4 + ")");
        }
        minor = readU2();
        major = readU2();
        constants = new Pool();
        constants.load(src);
    }

    public void close() throws IOException {
        src.close();
    }

    //----------------------------------------------------------------
    // code context

    public void openCode(Code code) {
        if (context != null) {
            throw new RuntimeException("nested code attributes");
        }
        context = code;
        ofs = 0;
    }
    public void closeCode() {
        if (context == null) {
            throw new RuntimeException("nested close");
        }
        context = null;
    }
    public void requireCode() {
        if (context == null) {
            throw new RuntimeException("code context missing");
        }
    }

    public int readIdx() throws IOException {
        return context.findIdx(readU2());
    }

    public int readIdxOrLast() throws IOException {
        return context.findIdxOrLast(readU2());
    }

    public int readEndIdxOrLast(int startIdx) throws IOException {
        return context.findEndIdxOrLast(startIdx, readU2());
    }

    /** Undefined when not in code context. */
    public int getOfs() {
        return ofs;
    }

    //----------------------------------------------------------------
    // read primitives

    public void read(byte[] buffer) throws IOException {
        IO.read(src, buffer);
        ofs += buffer.length;
    }

    public int readU1() throws IOException {
        int result;

        result = IO.readU1(src);
        ofs += 1;
        return result;
    }

    public int readS1() throws IOException {
        int result;

        result = IO.readS1(src);
        ofs += 1;
        return result;
    }

    public char readU2() throws IOException {
        char result;

        result = IO.readU2(src);
        ofs += 2;
        return result;
    }

    public int readS2() throws IOException {
        int result;

        result = IO.readS2(src);
        ofs += 2;
        return result;
    }

    public int readU4() throws IOException {
        int result;

        result = IO.readU4(src);
        ofs += 4;
        return result;
    }

    //-------------------------------------------------------------------
    // read constant pool entries

    public ClassRef readClassRef() throws IOException {
        return (ClassRef) readConstant();
    }

    public FieldRef readFieldRef() throws IOException {
        return (FieldRef) readConstant();
    }

    public MethodRef readClassMethodRef() throws IOException {
        MethodRef result;

        result = (MethodRef) readConstant();
        if (result.ifc) {
            throw new RuntimeException("not a class method");
        }
        return result;
    }

    public MethodRef readInterfaceMethodRef() throws IOException {
        MethodRef result;

        result = (MethodRef) readConstant();
        if (!result.ifc) {
            throw new RuntimeException("not an interface method");
        }
        return result;
    }


    public String readString() throws IOException {
        return (String) readConstant();
    }

    public int readInt() throws IOException {
        return ((Integer) readConstant()).intValue();
    }

    public float readFloat() throws IOException {
        return ((Float) readConstant()).floatValue();
    }

    public long readLong() throws IOException {
        return ((Long) readConstant()).longValue();
    }

    public double readDouble() throws IOException {
        return ((Double) readConstant()).doubleValue();
    }

    // note: no readNameAndType

    public String readUtf8() throws IOException {
        return (String) readConstant();
    }

    public Object readConstant() throws IOException {
        int idx;

        idx = readU2();
        if (idx == 0) {
            throw new NullPointerException("null constant pool index");
        }
        return constants.get(idx);
    }

    public Object readShortConstant() throws IOException {
        int idx;

        idx = readU1();
        if (idx == 0) {
            throw new NullPointerException("null constant pool short index");
        }
        return constants.get(idx);
    }

    public void readPad() throws IOException {
        int count;
        int b;

        count = IO.padSize(ofs);
        while (count-- > 0) {
            b = readU1();
            if (b != 0) {
                throw new RuntimeException("illegal pad");
            }
        }
    }

    public int findConstant(Object obj) {
        return constants.indexOf(obj);
    }
}
