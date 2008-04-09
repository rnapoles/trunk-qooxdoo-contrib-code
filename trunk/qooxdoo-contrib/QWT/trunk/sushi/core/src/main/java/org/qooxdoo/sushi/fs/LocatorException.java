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

package org.qooxdoo.sushi.fs;

/** TODO: checked exception? */
public class LocatorException extends RuntimeException {
    public LocatorException(String locator, String msg) {
        this(locator, msg, null);
    }
    
    public LocatorException(String locator, String msg, Throwable cause) {
        super(locator + ": " + msg);
        if (cause != null) {
            initCause(cause);
        }
    }
}
