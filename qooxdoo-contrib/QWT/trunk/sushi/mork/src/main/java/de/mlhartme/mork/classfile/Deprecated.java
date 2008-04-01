// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/Deprecated.java,
// Mork version 0.5  Copyright © 1998-2002  Michael Hartmeier
// 
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
// 
// §.

package de.mlhartme.mork.classfile;

import java.io.IOException;

public class Deprecated extends Empty {
    public static final String NAME = "Deprecated";

    public Deprecated(Input src) throws IOException {
        super(NAME, src);
    }
    public Deprecated() {
        super(NAME);
    }
}
