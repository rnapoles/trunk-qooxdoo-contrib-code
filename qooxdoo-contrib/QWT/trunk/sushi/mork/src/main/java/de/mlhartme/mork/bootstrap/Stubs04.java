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
