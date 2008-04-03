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

import java.io.IOException;

import org.qooxdoo.sushi.util.IntBitSet;

import org.qooxdoo.sushi.scanner.Position;

/**
 * <code>Mapper.run()</code> reports errors by taking the registered error handler and
 * invoking the respective method of this inteferace.
 */
public interface ErrorHandler {
    void lexicalError(Position pos);
    void syntaxError(Position pos, IntBitSet shiftable);
    void semanticError(Position pos, Exception e);
    void ioError(String position, String message, IOException e);
}
