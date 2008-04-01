// §{{header}}:
//
// This is file src/de/mlhartme/mork/parser/TreeBuilder.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.parser;

import de.mlhartme.mork.scanner.Scanner;
import de.mlhartme.mork.semantics.SemanticError; // TODO: ugly dependency
import java.io.IOException;

/**
 * TreeBuilder for Parsers.
 */
public interface TreeBuilder {
    void open(Scanner scanner, Parser parser);

    Object createTerminal(int terminal) throws IOException;

    Object createNonterminal(int production) throws SemanticError, IOException;
}
