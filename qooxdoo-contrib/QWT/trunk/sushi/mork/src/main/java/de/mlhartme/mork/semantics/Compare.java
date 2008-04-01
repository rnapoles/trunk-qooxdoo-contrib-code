// §{{header}}:
//
// This is file src/de/mlhartme/mork/semantics/Compare.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.semantics;

public interface Compare {
    int EQ = 1;
    int LT = 2;
    int GT = 4;
    int NE = 8;
    int ALT = 16;
}
