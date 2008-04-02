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

package command;

/**
 * A command line is a sequence of expression.
 */

public class Line {
    /**
     * Concatenating these expressions forms the command line
     * to be executed.
     */
    private Expression[] expressions;

    public Line(Expression[] expressions) {
        this.expressions = expressions;
    }

    public String eval() {
        StringBuffer buffer;
        int i;

        buffer = new StringBuffer();
        for (i = 0; i < expressions.length; i++) {
            buffer.append(expressions[i].eval());
        }
        return buffer.toString();
    }
}
