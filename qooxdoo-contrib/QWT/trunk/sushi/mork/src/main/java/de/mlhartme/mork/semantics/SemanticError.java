// §{{header}}:
//
// This is file src/de/mlhartme/mork/semantics/SemanticError.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.semantics;

import de.mlhartme.mork.scanner.Position;

public class SemanticError extends Exception {
    public final Position position;
    public final Exception exception;

    public SemanticError(Position position, Exception exception) {
        this.position = position;
        this.exception = exception;
    }
}
