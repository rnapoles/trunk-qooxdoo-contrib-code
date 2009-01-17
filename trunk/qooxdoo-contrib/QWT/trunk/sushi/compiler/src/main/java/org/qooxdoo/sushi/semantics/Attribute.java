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

package org.qooxdoo.sushi.semantics;

import org.qooxdoo.sushi.misc.StringArrayList;

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

    public static Attribute find(List<Attribute> attrs, int symbol, String name) {
        int i;
        int max;
        Attribute attr;

        max = attrs.size();
        for (i = 0; i < max; i++) {
            attr = attrs.get(i);
            if (attr.symbol == symbol && name.equals(attr.name)) {
                return attr;
            }
        }
        return null;
    }

    @Override
    public int hashCode() {
        return symbol;
    }
    
    @Override
    public String toString() {
        return "symbol=" + symbol + ", name=" + name + ", " + type;
    }

    public String toString(StringArrayList symbolTable) {
        return symbolTable.get(symbol) + "." + name;
    }
}
