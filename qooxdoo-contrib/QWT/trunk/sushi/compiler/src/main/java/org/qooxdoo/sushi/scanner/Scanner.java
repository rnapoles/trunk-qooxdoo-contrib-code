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

package org.qooxdoo.sushi.scanner;

import java.io.IOException;

/**
 * A token stream, input for parsers.
 * regular expressions.
 */

public interface Scanner {
    /** scans the next terminal and returns it. */
    int eat(int mode) throws IOException;

    /** assigns the position of the last terminal returned by eat. */
    void getPosition(Position result);

    /** returns the text of the last terminal returned by eat. */
    String getText();
}
