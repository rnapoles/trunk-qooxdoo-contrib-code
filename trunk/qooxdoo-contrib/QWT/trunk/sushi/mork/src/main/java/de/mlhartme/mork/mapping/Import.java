// §{{header}}:
//
// This is file src/de/mlhartme/mork/mapping/Import.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.mapping;

import org.qooxdoo.sushi.classfile.ClassRef;

import de.mlhartme.mork.reflect.Constructor;
import de.mlhartme.mork.reflect.Field;
import de.mlhartme.mork.reflect.Method;
import de.mlhartme.mork.reflect.Selection;
import de.mlhartme.mork.util.GenericException;

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
    public static Import create(String packageName, String className, String name)
        throws GenericException
    {
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
