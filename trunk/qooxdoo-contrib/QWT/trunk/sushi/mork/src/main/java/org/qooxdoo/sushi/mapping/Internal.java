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

import org.qooxdoo.sushi.grammar.Grammar;
import org.qooxdoo.sushi.misc.GenericException;
import org.qooxdoo.sushi.semantics.Attribute;
import org.qooxdoo.sushi.semantics.Ag;
import org.qooxdoo.sushi.semantics.NodeFactory;
import org.qooxdoo.sushi.semantics.Type;

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
