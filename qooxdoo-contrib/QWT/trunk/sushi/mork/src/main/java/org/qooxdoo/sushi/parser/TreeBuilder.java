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

package org.qooxdoo.sushi.parser;

import org.qooxdoo.sushi.scanner.Scanner;
import org.qooxdoo.sushi.semantics.SemanticError; // TODO: ugly dependency
import java.io.IOException;

/**
 * TreeBuilder for Parsers.
 */
public interface TreeBuilder {
    void open(Scanner scanner, Parser parser);

    Object createTerminal(int terminal) throws IOException;

    Object createNonterminal(int production) throws SemanticError, IOException;
}
