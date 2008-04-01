// §{{header}}:
//
// This is file src/de/mlhartme/mork/bootstrap/Stubs04.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.bootstrap;

import de.mlhartme.mork.compiler.Syntax;
import de.mlhartme.mork.semantics.BuiltIn;
import de.mlhartme.mork.semantics.IllegalLiteral;
import de.mlhartme.mork.util.GenericException;

/**
 * Helper functions referred by bootstrap mappers.
 */
public class Stubs04 {
    public static Syntax loadGrammar(String fileName)
        throws GenericException, IllegalLiteral
    {
        return Loader.loadGrammar(BuiltIn.parseString(fileName));
    }

    public static Syntax loadDtd(String fileName) throws GenericException {
        throw new GenericException("DTD syntax not supported in bootstrap version");
    }
}
