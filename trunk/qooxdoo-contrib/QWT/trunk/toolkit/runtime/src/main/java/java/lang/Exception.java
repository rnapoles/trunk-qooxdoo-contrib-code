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

package java.lang;

public class Exception extends Throwable {
    public Exception() {
        super();
    }
    
    public Exception(String msg) {
        super(msg);
    }
    
    public Exception(Throwable cause) {
        super(cause);
    }
    
    public Exception(String msg, Throwable cause) {
        super(msg, cause);
    }
}