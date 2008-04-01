// §{{header}}:
//
// This is file src/de/mlhartme/mork/compiler/CompiledFunctionBase.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.compiler;

import org.qooxdoo.sushi.classfile.Code;

import de.mlhartme.mork.reflect.Function;

public abstract class CompiledFunctionBase extends Function {
    public String getName() {
        return "fn" + hashCode();
    }
    public Class getReturnType() {
        throw new UnsupportedOperationException();
    }
    public Class[] getParameterTypes() {
        throw new UnsupportedOperationException();
    }
    public Class[] getExceptionTypes() {
        throw new UnsupportedOperationException();
    }

    // commenting in
    //    public abstract Object invoke(Object[] vals);
    // causes javap (sun jdk 1.3.1 and 1.4 beta 2) to fail with a NullPointerException
    // when called for a class derived from this class!?

    public void translate(Code dest) {
        throw new UnsupportedOperationException();
    }
}
