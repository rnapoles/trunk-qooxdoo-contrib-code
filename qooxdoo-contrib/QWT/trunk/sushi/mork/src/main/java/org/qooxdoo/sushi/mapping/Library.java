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

import org.qooxdoo.sushi.misc.GenericException;
import org.qooxdoo.sushi.reflect.Selection;

/**
 * A set of types.
 * Purpose:
 *  o abbreviate function names
 *  o declare external dependencies
 *
 * Remarks
 * + good error messages
 * + extendable, e.g. modifier
 * - allows renaming in both the library and the translation section ...
 * - much typing
 *
 * Types must have a name that can be used for attribute names;
 * otherwise, I could define anonymous types together with their symbols.
 *
 * TODO:
 * o check for multiple definitions.
 * o move into reflect package? merge Type and Selection?
 */
public class Library {
    private Import[] body;

    public Library(Import[] body) {
        this.body = body;
    }

    public static final String NO_CLASS = "no such class";

    public Selection lookupClass(String name) throws GenericException {
        Import ref;

        ref = lookupRaw(name);
        return ref.getConstructors();
    }

    public Selection lookupMember(String name, String member) throws GenericException {
        Import imp;

        imp = lookupRaw(name);
        return imp.lookup(member);
    }

    private Import lookupRaw(String name) throws GenericException {
        int i;

        for (i = 0; i < body.length; i++) {
            if (body[i].name.equals(name)) {
                return body[i];
            }
        }
        throw new GenericException(NO_CLASS, name);
    }
}
