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

import org.qooxdoo.sushi.classfile.Code;

import org.qooxdoo.sushi.reflect.Function;

public abstract class CompiledFunctionBase extends Function {
    @Override
    public String getName() {
        return "fn" + hashCode();
    }
    @Override
    public Class<?> getReturnType() {
        throw new UnsupportedOperationException();
    }
    @Override
    public Class<?>[] getParameterTypes() {
        throw new UnsupportedOperationException();
    }
    @Override
    public Class<?>[] getExceptionTypes() {
        throw new UnsupportedOperationException();
    }

    // commenting in
    //    public abstract Object invoke(Object[] vals);
    // causes javap (sun jdk 1.3.1 and 1.4 beta 2) to fail with a NullPointerException
    // when called for a class derived from this class!?

    @Override
    public void translate(Code dest) {
        throw new UnsupportedOperationException();
    }
}
