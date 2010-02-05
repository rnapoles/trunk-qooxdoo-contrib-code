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

import java.io.Serializable;

/**
 * Regular Expression. All derived classes shall be immutable, it has
 * to be safe to share instances. Anything that can read from a buffer
 * and that can be visited is considered a regular expression.
 */

public abstract class RegExpr implements Serializable {
    /**
     * Visit this expressions and its sub-expression and perform
     * some action.
     */
    public abstract Object visit(Action action);
}
