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

public class Node<T extends org.w3c.dom.Node> {
    protected final T peer;

    public Object styleRight;
    public Object setStyleRight;
    public Object getStyleRight;
    public Object resetStyleRight;

    Node(T peer) {
        this.peer = peer;
    }
    
    public T getPeer() {
        return peer;
    }
}
