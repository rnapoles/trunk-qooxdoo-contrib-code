// §{{header}}:
//
// This is file src/de/mlhartme/mork/mapping/Internal.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.mapping;

import de.mlhartme.mork.grammar.Grammar;
import de.mlhartme.mork.semantics.Attribute;
import de.mlhartme.mork.semantics.Ag;
import de.mlhartme.mork.semantics.NodeFactory;
import de.mlhartme.mork.semantics.Type;
import de.mlhartme.mork.util.GenericException;

/**
 * Reference to internal constructor.
 */
public class Internal {
    /** reference to the internal constructor */
    private int no;

    public static final String NO_SUCH_INTERNAL = "internal constructor not found";

    public Internal(int no) {
        this.no = no;
    }

    public Internal(String name) throws GenericException {
        no = NodeFactory.lookupAttribute(name);
        if (no == -1) {
            throw new GenericException(NO_SUCH_INTERNAL, name);
        }
    }

    public Attribute translate(int symbol, Grammar grm) throws GenericException {
        Attribute attr;
        Type type;

        type = new Type(NodeFactory.getDeclaration(no), Type.VALUE);
        attr = new Attribute(symbol, null, type); // null: anonymous attr
        return attr;
    }

    public void declare(Attribute attr, Ag sems) {
        sems.add(attr, no);
    }

    @Override
    public String toString() {
        return "internal constructor " + no;
    }
}
