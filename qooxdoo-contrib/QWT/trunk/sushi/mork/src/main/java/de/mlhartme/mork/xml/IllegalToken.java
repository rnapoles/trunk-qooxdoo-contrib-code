// §{{header}}:
//
// This is file src/de/mlhartme/mork/xml/IllegalToken.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.xml;

import de.mlhartme.mork.scanner.Position;
import java.io.IOException;

// TODO
public class IllegalToken extends IOException {
    public final Position pos;
    public final String text;

    public IllegalToken(Position pos, String text) {
        this.pos = pos;
        this.text = text;
    }
}
