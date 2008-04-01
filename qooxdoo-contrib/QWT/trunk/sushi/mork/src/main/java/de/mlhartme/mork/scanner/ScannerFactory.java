// §{{header}}:
//
// This is file src/de/mlhartme/mork/scanner/ScannerFactory.java,
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

public interface ScannerFactory {
    Scanner newInstance(Position pos, Reader src) throws IOException;
}
