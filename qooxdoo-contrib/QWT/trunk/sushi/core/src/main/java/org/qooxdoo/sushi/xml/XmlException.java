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

package org.qooxdoo.sushi.xml;

public class XmlException extends Exception {
    private static final long serialVersionUID = 8847745909613374505L;
    
    public XmlException(String msg) {
        super(msg);
    }
    public XmlException(String msg, Throwable t) {
        super(msg, t);
    }
    public XmlException(Throwable t) {
        super(t);
    }
}
