// §{header}:
// 
// This is file src/de/mlhartme/mork/reflect/Option.java,
// Mork version 0.5  Copyright © 1998-2002  Michael Hartmeier
// 
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
// 
// §.

package de.mlhartme.mork.reflect;

import java.lang.reflect.InvocationTargetException;

import org.qooxdoo.sushi.classfile.Bytecodes;
import org.qooxdoo.sushi.classfile.ClassRef;
import org.qooxdoo.sushi.classfile.Code;
import org.qooxdoo.sushi.classfile.FieldRef;

import de.mlhartme.mork.classfile.Util;

/**
 * I can't implement Option by feeding an Option-Value because I want to offer explicit definitions
 * like If(Expression), If(Expression,Expression)
 */

public class Option extends Function implements Bytecodes {
    // could be anything unique
    public static final Object TAG = new Integer(27);


    /** Java Method wrapped by this Function. */
    private int optional;
    private Function with;
    private Class[] parameterTypes;

    //------------------------------------------------------------
    // creation

    public Option(Function with, int optional) {
        Class[] tmp;

        this.with = with;
        this.optional = optional;

        tmp = this.with.getParameterTypes();
        parameterTypes = new Class[tmp.length];
        System.arraycopy(tmp, 0, parameterTypes, 0, tmp.length);

        // to have the same stack size when compiling, the optional
        // argument has to be a reference type
        parameterTypes[this.optional] = ClassRef.wrappedType(parameterTypes[this.optional]);
    }

    //----------------------------------------------------------------------

    public String getName() {
        return with.getName();
    }

    public Class getReturnType() {
        return with.getReturnType();
    }

    public Class[] getParameterTypes() {
        return parameterTypes;
    }

    public Class[] getExceptionTypes() {
        return with.getExceptionTypes();
    }

    //-----------------------------------------------------------------------

    public Object invoke(Object[] vals) throws InvocationTargetException {
        if (vals[optional] == TAG) {
            // TODO: primitive types!!
            // TODO: side effects on "vals"?
            vals[optional] =
                new ClassRef(getParameterTypes()[optional]).getDefault();
        }
        return with.invoke(vals);
    }

    // TODO: drop the parameter wrapping?
    public void translate(Code dest) {
        int max;
        int ofs;
        int var;
        int[] vars;
        ClassRef type;
        ClassRef[] types;
        Class[] tmp;
        Class optType;
        int i;
        int unwrapOptionLabel;
        int pushTailingLabel;

        tmp = getParameterTypes();
        ofs = optional + 1;
        max = tmp.length - ofs;
        vars = new int[max];
        types = new ClassRef[max];
        // pop tailing args
        for (i = max - 1; i >= 0; i--) {
            type = new ClassRef(tmp[i + ofs]);
            types[i] = type;
            var = dest.allocate(type);
            vars[i] = var;
            type.emitStore(dest, var);
        }
        optType = with.getParameterTypes()[optional];// ask "with", not tmp!

        unwrapOptionLabel = dest.declareLabel();
        pushTailingLabel = dest.declareLabel();

        // optional argument is on top of the stack now
        dest.emit(DUP); // optional argument is always a refenrence
        dest.emit(GETSTATIC,
                  new FieldRef(new ClassRef(Option.class), "TAG",
                                                    ClassRef.OBJECT));
        dest.emit(IF_ACMPNE, unwrapOptionLabel);

        // remove TAG, push constant
        dest.emit(POP); // discard TAG, always a reference
        new ClassRef(optType).emitDefault(dest);
        dest.emit(GOTO, pushTailingLabel);

        dest.defineLabel(unwrapOptionLabel);
        // optional value has to be a reference type!
        Util.unwrap(optType, dest);

        dest.defineLabel(pushTailingLabel);
        for (i = 0; i < max; i++) {
            types[i].emitLoad(dest, vars[i]);
        }
        with.translate(dest);
    }
}
