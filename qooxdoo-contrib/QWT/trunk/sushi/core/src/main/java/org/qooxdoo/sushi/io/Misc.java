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

package org.qooxdoo.sushi.io;

import java.io.IOException;

public class Misc {
    public static IOException exception(Throwable cause) {
        return exception(cause.getMessage(), cause);
    }

    public static IOException exception(String msg, Throwable cause) {
        IOException e;
        
        e = new IOException(msg);
        e.initCause(cause);
        return e;
    }
}
