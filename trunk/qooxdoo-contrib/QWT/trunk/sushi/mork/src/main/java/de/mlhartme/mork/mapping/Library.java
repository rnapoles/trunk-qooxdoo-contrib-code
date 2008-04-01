// §{{header}}:
//
// This is file src/de/mlhartme/mork/mapping/Library.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.mapping;

import de.mlhartme.mork.reflect.Selection;
import de.mlhartme.mork.util.GenericException;

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
