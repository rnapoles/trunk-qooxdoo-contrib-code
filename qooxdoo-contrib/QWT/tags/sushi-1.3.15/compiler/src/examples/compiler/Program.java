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

package compiler;

import org.qooxdoo.sushi.classfile.Bytecodes;
import org.qooxdoo.sushi.classfile.Code;

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
