// §{{header}}:
//
// This is file src/de/mlhartme/mork/mapping/Conversion.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.mapping;

import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.classfile.ClassRef;

import de.mlhartme.mork.reflect.Composition;
import de.mlhartme.mork.reflect.Function;
import de.mlhartme.mork.reflect.Option;
import de.mlhartme.mork.reflect.Selection;
import de.mlhartme.mork.semantics.Attribute;
import de.mlhartme.mork.semantics.Type;
import de.mlhartme.mork.util.GenericException;

/**
 * Convert, wrap/unwrap, re-arrange.
 */
public class Conversion {
    public static final String ARGUMENT_TYPE_MISMATCH =
        "Argument type mismatch";
    public static final String AMBIGUOUS_CONSTRUCTOR_NAME =
        "Ambiguous constructor name";

    private static void throwIllegalCall(
        String kind, Selection selection, Definition def, List args)
        throws GenericException
    {
        StringBuffer msg;
        int max;
        int i;
        Argument arg;

        msg = new StringBuffer();
        msg.append("for attribute ");
        msg.append(def.getName());
        msg.append(":\n");
        msg.append("  constructors:\n");
        max = selection.size();
        for (i = 0; i < max; i++) {
            msg.append("    " + selection.getFunction(i) + "\n");
        }
        msg.append("  arguments:\n");
        max = args.size();
        for (i = 0; i < max; i++) {
            arg = (Argument) args.get(i);
            msg.append("    " + arg.getAttribute().type + " " + arg.getSourcesString() + "\n");
        }
        throw new GenericException(kind, msg.toString());
    }

    public static Function find(Selection selection, Definition def, List args, List outAttrs)
        throws GenericException
    {
        int i;
        int max;
        Function tmp;
        Function resultFn;
        List resultArgs;
        List tmpInArgs;
        List tmpOutArgs;

        resultFn = null;
        resultArgs = null;
        max = selection.size();
        for (i = 0; i < max; i++) {
            tmpInArgs = getAttributes(args);
            tmpOutArgs = new ArrayList();
            tmp = arrange(selection.getFunction(i), tmpInArgs, tmpOutArgs);
            if (tmp != null) {
                if (resultFn != null) {
                    throwIllegalCall(AMBIGUOUS_CONSTRUCTOR_NAME, selection, def, args);
                }
                resultFn = tmp;
                resultArgs = tmpOutArgs;
            }
        }
        if (resultFn == null) {
            throwIllegalCall(ARGUMENT_TYPE_MISMATCH, selection, def, args);
        }

        outAttrs.addAll(resultArgs);
        return resultFn;
    }

    public static List getAttributes(List args) {
        int i;
        int max;
        List lst;

        max = args.size();
        lst = new ArrayList();
        for (i = 0; i < max; i++) {
            lst.add(((Argument) args.get(i)).getAttribute());
        }
        return lst;
    }

    private static Function arrange(Function fn, List inArgs, List outArgs) {
        int i;
        int max;

        max = fn.getParameterTypes().length;
        for (i = 0; i < max; i++) {
            fn = arrangeArg(fn, i, inArgs, outArgs);
            if (fn == null) {
                return null;
            }
        }
        if (inArgs.size() == 0) {
            return fn;
        } else {
            return null;
        }
    }

    private static Function arrangeArg(Function fn, int idx, List inArgs, List outArgs) {
        Class type;
        Attribute attr;

        type = fn.getParameterTypes()[idx];
        attr = removeAssignable(type, inArgs);
        if (attr == null) {
            return null;
        }
        outArgs.add(attr);
        if (type.isArray()) {
            // List -> <reference>[]
            //  or
            // List -> <primitive>[]
            return new Composition(fn, idx, new ToArray(type.getComponentType()));
        } else if (List.class.isAssignableFrom(type)) {
            // List -> List
            // no conversion required:
            return fn;
        } else {
            // <reference> -> <reference>
            // <reference> -> <primitive>
            if ((attr.type.card == Type.OPTION) || type.isPrimitive()) {
                // Option is used to unwrap into primitive arguments;
                // if not an OPTION, the optional test inside is never true.
                fn = new Option(fn, idx);
            } else {
                // no conversion
            }
            return fn;
        }
    }

    private static Attribute removeAssignable(Class type, List inArgs) {
        int i;
        int max;
        Attribute current;

        max = inArgs.size();
        for (i = 0; i < max; i++) {
            current = (Attribute) inArgs.get(i);
            if (isAssignableFrom(type, current.type)) {
                inArgs.remove(i);
                return current;
            }
        }
        return null;
    }

    public static boolean hasFormalArgument(Selection sel, Type type) {
        int i;
        int max;

        if (sel == null) {
            // do nothing - internal constructor has no formal argumets
        } else {
            max = sel.size();
            for (i = 0; i < max; i++) {
                if (hasFormalArgument(sel.getFunction(i), type)) {
                    return true;
                }
            }
        }
        return false;
    }

    public static boolean hasFormalArgument(Function fn, Type type) {
        Class[] formalTypes;
        int i;

        formalTypes = fn.getParameterTypes();
        for (i = 0; i < formalTypes.length; i++) {
            if (isAssignableFrom(formalTypes[i], type)) {
                return true;
            }
        }
        return false;
    }

    public static boolean isAssignableFrom(Class formalType, Type actual) {
        boolean found;
        Class compType;
        Attribute attr;
        boolean primitive;

        if (actual.card == Type.SEQUENCE) {
            if (List.class.isAssignableFrom(formalType)) {
                return true;
            }
            if (!formalType.isArray()) {
                return false;
            }
            if (formalType.isAssignableFrom(actual.type)) {
                return true;
            }
            compType = formalType.getComponentType();
        } else {
            compType = formalType;
        }
        if (compType.isAssignableFrom(actual.type)) {
            return true;
        }
        if (compType.isPrimitive()) {
            if (ClassRef.wrappedType(compType).isAssignableFrom(actual.type)) {
                return true;
            }
        }
        return false;
    }
}
