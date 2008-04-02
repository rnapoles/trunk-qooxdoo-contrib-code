/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2007 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

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
