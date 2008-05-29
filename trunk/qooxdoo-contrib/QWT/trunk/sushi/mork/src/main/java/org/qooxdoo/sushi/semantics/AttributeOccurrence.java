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

public class AttributeOccurrence {
    public final Attribute attr;

    /** references the respective symbol in the production; -1 for left hand side */
    public final int ofs;

    public AttributeOccurrence(Attribute attr, int ofs) {
        this.attr = attr;
        this.ofs = ofs;
    }

    @Override
    public String toString() {
        return attr.toString() + '[' + ofs + ']';
    }

    public String toString(StringArrayList symbolTable) {
        return symbolTable.getOrIndex(attr.symbol) + '[' + ofs + "]." + attr.hashCode();
    }

    public boolean matches(AttributeOccurrence ao) {
        return attr == ao.attr && ((ofs == -1 && ao.ofs != -1) || (ofs != -1 && ao.ofs == -1));
    }

    public boolean sameSymbolOccurrence(AttributeOccurrence ao) {
        return attr.symbol == ao.attr.symbol && ofs == ao.ofs;
    }

    @Override
    public boolean equals(Object obj) {
        AttributeOccurrence ao;

        if (obj instanceof AttributeOccurrence) {
            ao = (AttributeOccurrence) obj;
            return attr == ao.attr && ofs == ao.ofs;
        } else {
            return false;
        }
    }
    
    @Override
    public int hashCode() {
        return ofs;
    }
}
