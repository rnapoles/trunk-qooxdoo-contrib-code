// §{{header}}:
//
// This is file src/de/mlhartme/mork/semantics/AttributeOccurrence.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.semantics;

import de.mlhartme.mork.util.StringArrayList;

public class AttributeOccurrence {
    public final Attribute attr;

    /** ofs -1: left hand side */
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
        return symbolTable.getOrIndex(attr.symbol) + '[' + ofs + "]." + attr.name;
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
}
