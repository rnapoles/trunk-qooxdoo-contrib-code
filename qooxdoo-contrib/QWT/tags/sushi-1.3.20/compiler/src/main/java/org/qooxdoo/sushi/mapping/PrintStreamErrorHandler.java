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
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.util.IntBitSet;

import org.qooxdoo.sushi.misc.GenericException;
import org.qooxdoo.sushi.scanner.Position;

/**
 * ErrorHandler that prints messages to the PrintStream specified in the constructor.
 */

public class PrintStreamErrorHandler implements ErrorHandler {
    /**
     * Where to send error messages.
     */
    private PrintStream dest;

    private List errors;

    /**
     * @param dest may be null
     */
    public PrintStreamErrorHandler(PrintStream dest) {
        this.dest = dest;
        this.errors = new ArrayList();
    }

    /**
     * This method is used by the various <code>error</code> methods to actually print
     * a message.
     *
     * @param pos      where the problem occurred
     * @param message  problem description
     */
    public void report(String pos, String message, Object error) {
        if (dest != null) {
            dest.println(pos + ": " + message);
        }
        errors.add(error);
    }

    public void lexicalError(Position pos) {
        report(pos.toString(), "illegal token", pos);
    }

    public void syntaxError(Position pos, IntBitSet shiftable) {
        report(pos.toString(), "syntax error", pos);
    }

    public void semanticError(Position pos, Exception e) {
        report(pos.toString(), e.getMessage(), pos);
    }

    public void ioError(String pos, String message, IOException e) {
        report(pos, message + ": " + e.getMessage(), message);
    }

    public void error(String pos, GenericException e) {
        report(pos, e.getMessage(), e);
    }

    public void error(String pos, String message) {
        report(pos, message, message);
    }

    public int getErrorCount() {
        return errors.size();
    }

    public Object getLastError() {
        return errors.get(errors.size() - 1);
    }
}
