// §{{header}}:
//
// This is file src/de/mlhartme/mork/mapping/ErrorHandler.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.mapping;

import java.io.IOException;

import org.qooxdoo.sushi.util.IntBitSet;

import de.mlhartme.mork.scanner.Position;

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
