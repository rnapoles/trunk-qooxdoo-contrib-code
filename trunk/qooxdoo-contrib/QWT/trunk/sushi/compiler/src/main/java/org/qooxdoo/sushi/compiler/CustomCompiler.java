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

public abstract class CustomCompiler {
    public abstract boolean matches(Class<?> type);

    /**
     * The custom compile is allowed to generate at most MIN_INSTRUCTIONS
     */
    public abstract void beginTranslation(Object obj, Code dest);

    /**
     * The custom compiler is allowed to generate at most MIN_INSTRUCTUINS.
     */
    public abstract void endTranslation(Object obj, Code dest);

    public abstract Class<?>[] getFieldTypes();
    public abstract Object[] getFieldObjects(Object obj);
}
