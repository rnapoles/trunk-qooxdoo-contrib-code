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

package org.qooxdoo.toolkit.rhino;

public class Window {
    public final Document document;
    public final Location location;
    public Object application;
    public Object _QxClientWindow;
    public Object parent;
    public Object qx;
    public Object console;
    public Object qxvariants;
    
    public Window(Document document) {
        this.document = document;
        this.location = new Location();
    }

    public void addEventListener(Object str, Object fn, Object bool) {
        // TODO
    }
    
    public void dump(String msg) {
    }
    
    public void clearInterval(Object obj) {
        // TODO
    }
}
