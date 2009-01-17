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

package org.qooxdoo.sushi.regexpr;

/** stores the result from visiting a node */

public abstract class Action {
    public abstract Object range(char first, char last);
    public abstract Object symbol(int symbol);

    public abstract Object choice(Object[] body);
    public abstract Object sequence(Object[] body);
    public abstract Object loop(Object body);
    public abstract Object without(Object left, Object right);
}
