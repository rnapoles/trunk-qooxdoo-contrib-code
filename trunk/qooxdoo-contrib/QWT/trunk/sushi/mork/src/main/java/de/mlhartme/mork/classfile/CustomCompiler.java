// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/CustomCompiler.java,
// Mork version 0.5  Copyright © 1998-2002  Michael Hartmeier
// 
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
// 
// §.

package de.mlhartme.mork.classfile;

import org.qooxdoo.sushi.classfile.Code;

public abstract class CustomCompiler {
    public abstract boolean matches(Class type);

    /**
     * The custom compile is allowed to generate at most MIN_INSTRUCTIONS
     */
    public abstract void beginTranslation(Object obj, Code dest);

    /**
     * The custom compiler is allowed to generate at most MIN_INSTRUCTUINS.
     */
    public abstract void endTranslation(Object obj, Code dest);

    public abstract Class[] getFieldTypes();
    public abstract Object[] getFieldObjects(Object obj);
}
