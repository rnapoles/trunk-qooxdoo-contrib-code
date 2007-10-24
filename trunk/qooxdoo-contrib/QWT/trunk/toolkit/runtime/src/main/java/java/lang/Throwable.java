/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2007 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package java.lang;

public class Throwable {
    private final String msg;
    private Throwable cause;
    
    public Throwable() {
        this((String) null);
    }
    
    public Throwable(String msg) {
        this.msg = msg;
    }
    
    public Throwable(Throwable cause) {
        this.msg = null;
        initCause(cause);
    }
    
    public void initCause(Throwable cause) {
        this.cause = cause;
    }
    
    @Override
    public String toString() {
        return "" + msg;
    }
}
