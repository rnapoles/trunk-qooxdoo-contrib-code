// §{{header}}:
//
// This is file src/de/mlhartme/mork/compiler/Syntax.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.compiler;

import de.mlhartme.mork.grammar.Grammar;
import de.mlhartme.mork.parser.Parser;
import de.mlhartme.mork.util.GenericException;

/** Scanner and parser specification. **/
public abstract class Syntax {
    public abstract Grammar getGrammar();
    public abstract Parser translate(Output output) throws GenericException;

    public static final String LALR_CONFLICT =
        "lalr(1) conflicts (use the -lst option to obtain a listing of the automaton):\n";

}
