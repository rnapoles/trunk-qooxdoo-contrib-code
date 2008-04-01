// §{{header}}:
//
// This is file src/de/mlhartme/mork/semantics/Attribute.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.semantics;

import de.mlhartme.mork.util.StringArrayList;
import java.util.List;

/**
 * An attribute is the type of an attribute instance. Immutable,
 * one instance for each attribute - equal by pointer comparison.
 */

public class Attribute {
    /** An arbitrary value the user might wish to search for. May be null. */
    public final String name;

    public final int symbol;

    public final Type type;

    //------------------------------------------------------------

    public Attribute(int symbol, String name, Type type) {
        this.name = name;
        this.symbol = symbol;
        this.type = type;
    }

    /**
     * Creates Attribute with Object type. Usefull for test cases.
     */
    public Attribute(int symbol, String name) {
        this(symbol, name, new Type(Object.class));
    }

    public Attribute(Attribute orig) {
        this.name = orig.name;
        this.symbol = orig.symbol;
        this.type = orig.type;
    }

    public static Attribute find(List attrs, int symbol, String name) {
        int i;
        int max;
        Attribute attr;

        max = attrs.size();
        for (i = 0; i < max; i++) {
            attr = (Attribute) attrs.get(i);
            if (attr.symbol == symbol && name.equals(attr.name)) {
                return attr;
            }
        }
        return null;
    }

    public String toString() {
        return "symbol=" + symbol + ", name=" + name + ", " + type;
    }

    public String toString(StringArrayList symbolTable) {
        return symbolTable.get(symbol) + "." + name;
    }
}
