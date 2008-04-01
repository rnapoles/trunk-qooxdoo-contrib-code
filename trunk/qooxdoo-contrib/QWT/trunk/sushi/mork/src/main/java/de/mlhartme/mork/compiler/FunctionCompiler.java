// §{{header}}:
//
// This is file src/de/mlhartme/mork/compiler/FunctionCompiler.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.compiler;

import de.mlhartme.mork.classfile.Bytecodes;
import de.mlhartme.mork.classfile.Code;
import de.mlhartme.mork.classfile.CustomCompiler;
import de.mlhartme.mork.reflect.Function;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public boolean matches(Class type) {
        return Function.class.isAssignableFrom(type);
    }

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

    public void endTranslation(Object obj, Code dest) {
        // do nothing
    }

    public Class[] getFieldTypes() {
        return new Class[] {};
    }

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
