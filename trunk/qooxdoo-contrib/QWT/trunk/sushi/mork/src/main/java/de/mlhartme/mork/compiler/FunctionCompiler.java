/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2007 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package de.mlhartme.mork.compiler;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.qooxdoo.sushi.classfile.Bytecodes;
import org.qooxdoo.sushi.classfile.Code;

import de.mlhartme.mork.classfile.CustomCompiler;
import de.mlhartme.mork.reflect.Function;

/**
 * Generates classes derived from CompiledFunctionBase classes. Generates zero, one (or multiple
 * if the code attribute grows to big) instances of InvocationCode that perform the actual work.
 * Support multiple instances of InvocationCode is currently rarely used because it takes quite a
 * few functions to exceed InvocationCode's code attribute size. However, future versions might
 * generate more code into InvocationCode.
 */

public class FunctionCompiler extends CustomCompiler implements Bytecodes {
    /**
     * Max number of functions in a single InvocationCode instance.
     * (The average size of a compiled function in Mork 0.3.4 is 40 bytes)
     */
    private static final int MAX_SIZE = 800;

    private String className;

    /** Generated classes; list of InvocationCode instances. */
    private List classes;

    /** null or last element of classes. */
    private InvocationCode current;

    /**
     * Functions previously translated.
     * Prevents that the same copy functions is written multiple times.
     */
    private Map done;

    public FunctionCompiler(String className) {
        this.className = className;
        this.classes = new ArrayList();
        this.current = null;
        this.done = new HashMap();
    }

    @Override
    public boolean matches(Class type) {
        return Function.class.isAssignableFrom(type);
    }

    @Override
    public void beginTranslation(Object obj, Code dest) {
        Function fn;
        Class[] tmp;
        int i;
        int id;

        if (current == null) {
            current = new InvocationCode(className + (classes.size() + 1));
            classes.add(current);
        }

        if (!current.reuse((Function) obj, dest, done)) {
            current.translate((Function) obj, dest, done);
        }
        if (current.size() == MAX_SIZE) {
            // create a new class if for the next call to this method
            current = null;
        }
    }

    @Override
    public void endTranslation(Object obj, Code dest) {
        // do nothing
    }

    @Override
    public Class[] getFieldTypes() {
        return new Class[] {};
    }

    @Override
    public Object[] getFieldObjects(Object obj) {
        return new Object[0];
    }

    public void save(String fileBase) throws IOException {
        int i;
        int max;

        max = classes.size();
        for (i = 0; i < max; i++) {
            ((InvocationCode) classes.get(i)).save(new File(fileBase + (i + 1) + ".class"));
        }
        done = null;
    }
}
