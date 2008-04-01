// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/MethodRef.java,
// Mork version 0.5  Copyright © 1998-2002  Michael Hartmeier
// 
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
// 
// §.

package de.mlhartme.mork.classfile;

import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

/**
 * Reference of a class or interface method.
 * I don't distinguish class and interface methods by different
 * types - in parallel to Java's treatment of primitive types
 * as Class objects.
 */

public class MethodRef {
    public final ClassRef owner;
    public final boolean ifc;
    public final String name;
    public final ClassRef[] argumentTypes;
    public final ClassRef returnType;

    public static final String INIT = "<init>";

    public MethodRef(Method m) {
        Class[] args;
        int i;

        owner = new ClassRef(m.getDeclaringClass());
        ifc = false;
        name = m.getName();
        args = m.getParameterTypes();
        argumentTypes = new ClassRef[args.length];
        for (i = 0; i < args.length; i++) {
            argumentTypes[i] = new ClassRef(args[i]);
        }
        returnType = new ClassRef(m.getReturnType());
    }
    public MethodRef(Constructor c) {
        Class[] args;
        int i;

        owner = new ClassRef(c.getDeclaringClass());
        ifc = false;
        name = MethodRef.INIT;
        args = c.getParameterTypes();
        argumentTypes = new ClassRef[args.length];
        for (i = 0; i < args.length; i++) {
            argumentTypes[i] = new ClassRef(args[i]);
        }
        returnType = ClassRef.VOID;
    }


    public MethodRef(ClassRef owner, boolean ifc, ClassRef returnType,
        String name, ClassRef[] argumentTypes)
    {
        this.owner = owner;
        this.ifc = ifc;
        this.name = name;
        this.argumentTypes = argumentTypes;
        this.returnType = returnType;
    }

    //------------------------------------------------------------------
    // convinience methods to create references

    public static MethodRef meth(ClassRef owner, ClassRef returnType,
        String name)
    {
        return new MethodRef(owner, false, returnType, name,
            ClassRef.NONE);
    }
    public static MethodRef meth(ClassRef owner, ClassRef returnType,
        String name, ClassRef arg0)
    {
        return new MethodRef(owner, false, returnType, name,
            new ClassRef[] { arg0 });
    }
    public static MethodRef meth(ClassRef owner, ClassRef returnType,
        String name, ClassRef arg0, ClassRef arg1)
    {
        return new MethodRef(owner, false, returnType, name,
            new ClassRef[] { arg0, arg1 });
    }
    public static MethodRef meth(ClassRef owner, ClassRef returnType,
        String name, ClassRef arg0, ClassRef arg1, ClassRef arg2)
    {
        return new MethodRef(owner, false, returnType, name,
            new ClassRef[] { arg0, arg1, arg2 });
    }
    public static MethodRef meth(ClassRef owner, ClassRef returnType,
        String name,
        ClassRef arg0, ClassRef arg1, ClassRef arg2, ClassRef arg3)
    {
        return new MethodRef(owner, false, returnType, name,
            new ClassRef[] { arg0, arg1, arg2, arg3 });
    }

    public static MethodRef ifc(ClassRef owner, ClassRef returnType,
        String name)
    {
        return new MethodRef(owner, true, returnType, name,
            ClassRef.NONE);
    }
    public static MethodRef ifc(ClassRef owner, ClassRef returnType,
        String name, ClassRef arg0)
    {
        return new MethodRef(owner, true, returnType, name,
            new ClassRef[] { arg0 });
    }
    public static MethodRef ifc(ClassRef owner, ClassRef returnType,
        String name, ClassRef arg0, ClassRef arg1)
    {
        return new MethodRef(owner, true, returnType, name,
            new ClassRef[] { arg0, arg1 });
    }
    public static MethodRef ifc(ClassRef owner, ClassRef returnType,
        String name, ClassRef arg0, ClassRef arg1, ClassRef arg2)
    {
        return new MethodRef(owner, true, returnType, name,
            new ClassRef[] { arg0, arg1, arg2 });
    }
    public static MethodRef ifc(ClassRef owner, ClassRef returnType,
        String name,
        ClassRef arg0, ClassRef arg1, ClassRef arg2, ClassRef arg3)
    {
        return new MethodRef(owner, true, returnType, name,
            new ClassRef[] { arg0, arg1, arg2, arg3 });
    }

    public static MethodRef constr(ClassRef cl, ClassRef[] args) {
        return new MethodRef(cl, false, ClassRef.VOID, INIT, args);
    }
    public static MethodRef constr(ClassRef cl) {
        return constr(cl, ClassRef.NONE);
    }
    public static MethodRef constr(ClassRef cl, ClassRef arg0) {
        return constr(cl, new ClassRef[] { arg0 });
    }
    public static MethodRef constr(ClassRef cl, ClassRef arg0, ClassRef arg1)
    {
        return constr(cl, new ClassRef[] { arg0, arg1 });
    }
    public static MethodRef constr(ClassRef cl,
        ClassRef arg0, ClassRef arg1, ClassRef arg2)
    {
        return constr(cl, new ClassRef[] { arg0, arg1, arg2 });
    }
    public static MethodRef constr(ClassRef cl,
        ClassRef arg0, ClassRef arg1, ClassRef arg2, ClassRef arg3)
    {
        return constr(cl, new ClassRef[] { arg0, arg1, arg2, arg3 });
    }

    //-------------------------------------------------------------------

    public int argSize() {
        int result;
        int i;

        result = 0;
        for (i = 0; i < argumentTypes.length; i++) {
            result += argumentTypes[i].operandSize();
        }
        return result;
    }

    public boolean equals(Object obj) {
        MethodRef ref;
        int i;

        if (!(obj instanceof MethodRef)) {
            return false;
        }
        ref = (MethodRef) obj;
        if (!(owner.equals(ref.owner)
              && (ifc == ref.ifc)
              && name.equals(ref.name)
              && returnType.equals(ref.returnType)
              && (argumentTypes.length == ref.argumentTypes.length)))
        {
            return false;
        }
        for (i = 0; i < argumentTypes.length; i++) {
            if (!argumentTypes[i].equals(ref.argumentTypes[i])) {
                return false;
            }
        }
        return true;
    }

    public String toDescriptor() {
        return toDescriptor(argumentTypes, returnType);
    }

    public static String toDescriptor(ClassRef[] args, ClassRef result) {
        StringBuffer buffer;
        int i;

        buffer = new StringBuffer();
        buffer.append('(');
        for (i = 0; i < args.length; i++) {
            buffer.append(args[i].toFieldDescriptor());
        }
        buffer.append(')');
        buffer.append(result.toFieldDescriptor());
        return buffer.toString();
    }

    public static ClassRef forReturnType(String descriptor) {
        int i;

        i = descriptor.indexOf(')');
        if (i == -1) {
            throw new RuntimeException();
        }
        return ClassRef.forFieldDescriptor(descriptor, i + 1,
                                          descriptor.length());
    }

    public static ClassRef[] forArgumentTypes(String descriptor) {
        int ofs, length;
        List lst;
        ClassRef[] result;

        length = descriptor.length();
        if ((length < 2) || (descriptor.charAt(0) != '(')) {
            throw new RuntimeException();
        }
        ofs = 1;
        lst = new ArrayList();
        while ((ofs < length) && (descriptor.charAt(ofs) != ')')) {
            lst.add(ClassRef.forFieldDescriptor(descriptor, ofs, length));
            ofs = ClassRef.nextOfs;
        }
        result = new ClassRef[lst.size()];
        lst.toArray(result);
        return result;
    }


    public String toString() {
        StringBuffer result;
        int i;

        result = new StringBuffer();
        result.append(returnType);
        result.append(' ');
        result.append(owner);
        result.append('.');
        result.append(name);
        result.append('(');
        for (i = 0; i < argumentTypes.length; i++) {
            if (i > 0) {
                result.append(' ');
            }
            result.append(argumentTypes[i]);
        }
        result.append(')');
        return result.toString();
    }
}
