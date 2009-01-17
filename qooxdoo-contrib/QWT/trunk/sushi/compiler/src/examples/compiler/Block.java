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

import org.qooxdoo.sushi.classfile.Code;

public class Block extends Statement {
    private Statement[] body;

    public Block() {
        this(new Statement[0]);
    }

    public Block(Statement[] body) {
        this.body = body;
    }

    @Override
    public void translate(Code dest) {
        int i;

        for (i = 0; i < body.length; i++) {
            body[i].translate(dest);
        }
    }
}
