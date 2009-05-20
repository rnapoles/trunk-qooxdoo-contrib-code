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

package org.qooxdoo.sushi.mapping;

import org.qooxdoo.sushi.classfile.ClassRef;

import org.qooxdoo.sushi.misc.GenericException;
import org.qooxdoo.sushi.reflect.Constructor;
import org.qooxdoo.sushi.reflect.Field;
import org.qooxdoo.sushi.reflect.Method;
import org.qooxdoo.sushi.reflect.Selection;

/**
 * Java class with a name.
 */
public class Import {
    public final String name;
    public final Class target;

    public static final String NO_CLASS = "no such class";
    public static final String NO_CONSTRUCTOR = "no public constructor";
    public static final String NO_MEMBER = "no such method or field";

    public Import(String name, Class target) {
        this.name = name;
        this.target = target;
    }

    /**
     * @param name may be null
     */
    public static Import create(String packageName, String className, String name) throws GenericException {
        String fullName;
        Class cls;

        if (name == null) {
            name = className;
        }
        fullName = packageName + "." + className;
        cls = new ClassRef(fullName).lookup();
        if (cls == null) {
            throw new GenericException(NO_CLASS, fullName);
        }
        return new Import(name, cls);
    }


    /**
     * Gets a String representation for this Reference
     *.
     * @return the String representation
     */
    @Override
    public String toString() {
        return "reference " + name + ":" + target;
    }

    public Selection lookup(String member) throws GenericException {
        Selection selection;
        Field f;

        selection = Method.forName(target, member);
        f = Field.forName(target, member);
        if (f != null) {
            selection = selection.add(new Selection(f));
        }
        if (selection.isEmpty()) {
            throw new GenericException(NO_MEMBER, name + "." + member);
        }
        return selection;
    }

    public Selection getConstructors() throws GenericException {
        Selection selection;

        selection = Constructor.forClass(target);
        if (selection.isEmpty()) {
            throw new GenericException(NO_CONSTRUCTOR, name);
        }
        return selection;
    }
}
