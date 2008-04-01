// §{{header}}:
//
// This is file src/de/mlhartme/mork/scanner/Scanner.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.scanner;

import java.io.IOException;
import java.io.Reader;

/**
 * A token stream, input for parsers.
 * regular expressions.
 */

public interface Scanner {
    /** scans the next terminal and returns it. */
    int eat(int mode) throws IOException;

    /** assigns the position of the last terminal returned by eat. */
    void getPosition(Position result);

    /** returns the text of the last terminal returned by eat. */
    String getText();
}
