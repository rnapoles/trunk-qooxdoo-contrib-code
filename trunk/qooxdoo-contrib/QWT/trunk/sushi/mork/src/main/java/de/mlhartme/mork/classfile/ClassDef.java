// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/ClassDef.java,
// Mork version 0.5  Copyright © 1998-2002  Michael Hartmeier
// 
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
// 
// §.

package de.mlhartme.mork.classfile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * A class file. A class file defines a Java class.
 */

public class ClassDef {
    public char accessFlags;
    public ClassRef thisClass;
    public ClassRef superClass;
    public final List interfaces;   // List of ClassRef
    public final List fields;       // List of Field;
    public final List methods;      // List of Method;
    public final List attributes;   // List of Attribute;

    /**
     * Create a new class file with the specified name and
     * super class name. Add interfaces, fields, methods and attributes
     * my modifying the respective public fields.
     */
    public ClassDef(ClassRef thisClassInit, ClassRef superClassInit) {
        accessFlags = Access.PUBLIC | Access.SUPER;
        thisClass = thisClassInit;
        superClass = superClassInit;
        interfaces = new ArrayList();
        fields = new ArrayList();
        methods = new ArrayList();
        attributes = new ArrayList();
    }

    /**
     * Create a class file from the specified input stream.
     */
    public ClassDef(Input src) throws IOException {
        int i, max;
        int u4;

        interfaces = new ArrayList();
        fields = new ArrayList();
        methods = new ArrayList();
        attributes = new ArrayList();

        accessFlags = src.readU2();
        thisClass = src.readClassRef();
        try {
            superClass = src.readClassRef();
        } catch (NullPointerException e) {
            if (!thisClass.isJavaLangObject()) {
                throw new RuntimeException(
                    "missing base class for " + thisClass);
            }
            superClass = null;
        }
        max = src.readU2();
        for (i = 0; i < max; i++) {
            interfaces.add(src.readClassRef());
        }
        max = src.readU2();
        for (i = 0; i < max; i++) {
            fields.add(new FieldDef(src));
        }
        max = src.readU2();
        for (i = 0; i < max; i++) {
            methods.add(new MethodDef(src));
        }
        max = src.readU2();
        for (i = 0; i < max; i++) {
            attributes.add(Attribute.create(src));
        }
    }

    //-------------------------------------------------------------

    /**
     * Write this class file to the specified output stream.
     */
    public void write(Output dest) throws IOException {
        int i, max;
        byte[] array;

        dest.writeU2(accessFlags);
        dest.writeClassRef(thisClass);
        if (superClass != null) {
            dest.writeClassRef(superClass);
        } else {
            dest.writeU2(0);
        }

        max = interfaces.size();
        dest.writeU2(max);
        for (i = 0; i < max; i++) {
            dest.writeClassRef((ClassRef) interfaces.get(i));
        }
        max = fields.size();
        dest.writeU2(max);
        for (i = 0; i < max; i++) {
            ((FieldDef) fields.get(i)).write(dest);
        }
        max = methods.size();
        dest.writeU2(max);
        for (i = 0; i < max; i++) {
            ((MethodDef) methods.get(i)).write(dest);
        }
        max = attributes.size();
        dest.writeU2(max);
        for (i = 0; i < max; i++) {
            ((Attribute) attributes.get(i)).write(dest);
        }
    }

    //------------------------------------------------------------------

    public FieldDef addField(int access, ClassRef type, String name) {
        FieldDef f;

        if (((char) access) != access) {
            throw new IllegalArgumentException("invalid access mask");
        }
        f = new FieldDef((char) access, name, type);
        fields.add(f);
        return f;
    }

    public static char checkAccess(int access) {
        if (((char) access) != access) {
            throw new IllegalArgumentException("invalid access mask");
        }
        return (char) access;
    }

    public MethodDef addMethod(int access, ClassRef result, String name, ClassRef[] args, Code code)
    {
        MethodDef m;

        m = new MethodDef();
        m.name = name;
        m.accessFlags = checkAccess(access);
        m.attributes.add(code);
        m.argumentTypes = args;
        m.returnType = result;
        methods.add(m);
        return m;
    }

    public MethodDef addConstructor(int access, ClassRef[] args, Code code)
    {
        MethodDef m;

        m = new MethodDef();
        m.name = MethodRef.INIT;
        m.accessFlags = checkAccess(access);
        m.attributes.add(code);
        m.argumentTypes = args;
        m.returnType = ClassRef.VOID;
        methods.add(m);
        return m;
    }

    //------------------------------------------------------------------

    public String toString() {
        StringBuffer result;
        int i, max;

        result = new StringBuffer();
        result.append("thisClass: " + thisClass + "\n");
        result.append("superClass: " + superClass + "\n");
        max = interfaces.size();
        for (i = 0; i < max; i++) {
            result.append("implements: " + interfaces.get(i) + "\n");
        }
        max = fields.size();
        for (i = 0; i < max; i++) {
            result.append("field: " + fields.get(i) + "\n");
        }
        max = methods.size();
        for (i = 0; i < max; i++) {
            result.append("method: " + methods.get(i) + "\n");
        }
        return result.toString();
    }
}
