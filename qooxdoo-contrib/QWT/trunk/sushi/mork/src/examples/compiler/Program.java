// §{{header}}:
//
// This is file examples/compiler/Program.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package compiler;

import de.mlhartme.mork.classfile.Bytecodes;
import de.mlhartme.mork.classfile.Code;

public class Program implements Bytecodes {
    private Block body;
    private Declarations[] scopes;

    public Program(Declarations[] scopes, Block body) {
        this.scopes = scopes;
        this.body = body;
    }

    public Code translate() {
        Code result;
        int i;

        result = new Code();
        result.locals = 1; // 0 is reserved for this
        for (i = 0; i < scopes.length; i++) {
            result.locals = scopes[i].allocate(result.locals);
        }
        body.translate(result);
        result.emit(RETURN);
        return result;
    }
}
