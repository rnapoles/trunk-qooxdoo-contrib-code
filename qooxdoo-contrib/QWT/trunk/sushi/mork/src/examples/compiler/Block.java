// §{{header}}:
//
// This is file examples/compiler/Block.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package compiler;

import de.mlhartme.mork.classfile.Code;

public class Block extends Statement {
    private Statement[] body;

    public Block() {
        this(new Statement[0]);
    }

    public Block(Statement[] body) {
        this.body = body;
    }

    public void translate(Code dest) {
        int i;

        for (i = 0; i < body.length; i++) {
            body[i].translate(dest);
        }
    }
}
