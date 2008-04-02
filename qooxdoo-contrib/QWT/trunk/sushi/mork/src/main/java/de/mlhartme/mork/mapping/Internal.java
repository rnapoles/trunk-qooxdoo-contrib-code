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
