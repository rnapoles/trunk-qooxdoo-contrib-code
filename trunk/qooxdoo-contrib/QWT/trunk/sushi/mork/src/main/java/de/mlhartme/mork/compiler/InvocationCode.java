// §{{header}}:
//
// This is file src/de/mlhartme/mork/compiler/InvocationCode.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.compiler;

import de.mlhartme.mork.classfile.Access;
import de.mlhartme.mork.classfile.Bytecodes;
import de.mlhartme.mork.classfile.ClassDef;
import de.mlhartme.mork.classfile.ClassRef;
import de.mlhartme.mork.classfile.Code;
import de.mlhartme.mork.classfile.ExceptionInfo;
import de.mlhartme.mork.classfile.Exceptions;
import de.mlhartme.mork.classfile.FieldRef;
import de.mlhartme.mork.classfile.MethodDef;
import de.mlhartme.mork.classfile.MethodRef;
import de.mlhartme.mork.classfile.ObjectCompiler;
import de.mlhartme.mork.classfile.Output;
import de.mlhartme.mork.classfile.Util;
import de.mlhartme.mork.reflect.Function;
import de.mlhartme.mork.util.IntArrayList;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.Map;

/**
 * Generates bytecode for invoke methods. Must not be saved without functions.
 *
 * Java bytecode does not offer pointers to code. For that reason, there are three
 * ways for functions to refer to the code to be executed when invoking the function
 * (1) store a string and use reflection to refer to some generated method
 * (2) generate a new class for every functions and store a pointer to an instance
 * (3) use invocationCode
 * Solution (1) is to slow. Solution (2) generates to many classes.
 */

public class InvocationCode implements Bytecodes {
    private Code code;
    private IntArrayList labels;
    private int switchFixup;

    private ClassRef destRef;
    private MethodRef destConstr;

    private final ClassRef THROWABLE_REF = new ClassRef(Throwable.class);
    private final ClassRef EXCEPT_REF = new ClassRef(InvocationTargetException.class);

    private final int LV_ARGS = 1;
    private final int LV_THROWABLE = 2;

    public InvocationCode(String className) {
        destRef = new ClassRef(className);
        destConstr = MethodRef.constr(destRef, ClassRef.INT);
        labels = new IntArrayList();
        code = new Code();
        code.locals = 3;  // this, LV_ARGS, LV_THROWABLE
        code.emit(ALOAD, 0); // load this
        code.emit(GETFIELD, new FieldRef(destRef, "id", ClassRef.INT));
        switchFixup = code.declareFixup(); // to be defined in save()
    }

    public int size() {
        return labels.size();
    }

    public boolean reuse(Function fn, Code dest, Map done) {
        Object[] obj;

        obj = (Object[]) done.get(fn);
        if (obj == null) {
            return false;
        }
        emitNew(dest, (ClassRef) obj[0], (MethodRef) obj[1], ((Integer) obj[2]).intValue());
        return true;
    }

    public void translate(Function fn, Code dest, Map done) {
        Class[] tmp;
        int i;
        int id;

        id = labels.size();
        labels.add(code.currentLabel());
        tmp = fn.getParameterTypes();
        // push parameter array and unwrap if necessary
        for (i = 0; i < tmp.length; i++) {
            code.emit(ALOAD, LV_ARGS);
            code.emit(LDC, i);
            code.emit(AALOAD);
            Util.unwrap(tmp[i], code);
        }
        fn.translate(code);
        wrap(fn.getReturnType());
        code.emit(ARETURN);

        emitNew(dest, destRef, destConstr, id);
        done.put(fn, new Object[] { destRef, destConstr, new Integer(id) });
    }

    static {
        if (ObjectCompiler.MIN_INSTRUCTIONS < 4) {
            // I need 4 instructions -- see emitNew
            throw new IllegalArgumentException();
        }
    }

    private static void emitNew(Code dest, ClassRef destRef, MethodRef destConstr, int id) {
        dest.emit(NEW, destRef);
        dest.emit(DUP);
        dest.emit(LDC, id);
        dest.emit(INVOKESPECIAL, destConstr);
    }

    //-----------------------------------------------------------------

    public void save(File file) throws IOException {
        int deflt;

        if (labels.size() == 0) {
            throw new IllegalStateException("no functions defined");
        }

        deflt = code.currentLabel();
        illegalId();
        code.fixup(switchFixup, TABLESWITCH, deflt, 0, labels.size() - 1, labels);
        exceptionHandler();
        save(code, file);
    }

    private void illegalId() {
        ClassRef except;

        except = new ClassRef(RuntimeException.class);
        code.emit(NEW, except);
        code.emit(DUP);
        code.emit(LDC, "illegal function id");
        code.emit(INVOKESPECIAL,
                        MethodRef.constr(except, new ClassRef[] { ClassRef.STRING } ));
        code.emit(ATHROW);
    }

    private void exceptionHandler() {
        int pc;
        ExceptionInfo info;

        pc = code.currentLabel();
        code.emit(ASTORE, LV_THROWABLE);
        code.emit(NEW, EXCEPT_REF);
        code.emit(DUP);
        code.emit(ALOAD, LV_THROWABLE);
        code.emit(LDC, "function invocation failed");
        code.emit(INVOKESPECIAL, MethodRef.constr(EXCEPT_REF, THROWABLE_REF, ClassRef.STRING));
        code.emit(ATHROW);

        info = new ExceptionInfo(0, pc, pc, THROWABLE_REF);
        code.exceptions.add(info);
    }

    private void wrap(Class cl) {
        ClassRef wrapper;

        if (cl.isPrimitive()) {
            wrapper = new ClassRef(ClassRef.wrappedType(cl));
            code.emit(NEW, wrapper);
            // stack is
            //   type1 obj
            // | type2 obj
            if ((new ClassRef(cl)).operandSize() == 1) {
                code.emit(DUP_X1);
                code.emit(DUP_X1);
            } else {
                code.emit(DUP_X2);
                code.emit(DUP_X2);
            }
            // stack is
            //   obj obj type1 obj
            //   obj obj type2 obj
            code.emit(POP);
            code.emit(INVOKESPECIAL, MethodRef.constr(wrapper, new ClassRef[] { new ClassRef(cl) }));
        } else {
            // reference type, nothing to wrap
            //   no need to cast because the return type it object
        }
    }

    private void save(Code code, File file) throws IOException {
        ClassDef c;
        MethodDef m;
        Exceptions e;

        c = new ClassDef(destRef, new ClassRef(CompiledFunctionBase.class));
        c.addField(Access.PRIVATE | Access.FINAL, ClassRef.INT, "id");
        addConstr(c);
        m = c.addMethod(Access.PUBLIC, ClassRef.OBJECT, "invoke",
                    new ClassRef[] { new ClassRef("java.lang.Object", 1) }, code);
        e = new Exceptions();
        e.exceptions.add(EXCEPT_REF);
        m.attributes.add(e);
        Output.save(c, file);
    }

    private void addConstr(ClassDef c) {
        Code code;

        code = new Code();
        code.emit(ALOAD, 0);
        code.emit(INVOKESPECIAL,
             MethodRef.constr(new ClassRef(CompiledFunctionBase.class), ClassRef.NONE ));
        code.emit(ALOAD, 0);
        code.emit(ILOAD, 1); // idInit
        code.emit(PUTFIELD, new FieldRef(destRef, "id", ClassRef.INT));
        code.emit(RETURN);
        code.locals = 2; // this + idInit

        c.addConstructor(Access.PUBLIC, new ClassRef[] { ClassRef.INT }, code);
    }
}
