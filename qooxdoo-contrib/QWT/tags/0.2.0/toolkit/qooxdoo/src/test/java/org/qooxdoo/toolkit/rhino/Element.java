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

public class Element extends Node<org.w3c.dom.Element> {
    private static final String CLASS = "class";
    
    private String type;
    private final Document owner;
    private final Style style;
    public Object _QxWidget;
    public Object tabIndex;
    public Object onclick;
    public Object onselect;
    public String innerHTML;
    public Object readOnly;
    public Object scrollTop;
    public Object left;
    
    public Element(Document owner, org.w3c.dom.Element peer) {
        super(peer);
        this.owner = owner;
        this.type = "";
        this.style = new Style();
    }

    public void setAttribute(String name, String value) {
        // TODO
    }
    
    public void addEventListener(Object str, Object fn, Object bool) {
        // TODO
    }
    public Style getStyle() {
        return style;
    }
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }

    public String getClassName() {
        return peer.getAttribute(CLASS);
    }

    public void setClassName(String className) {
        peer.setAttribute(CLASS, className);
    }

    public Element appendChild(Node<?> node) {
        peer.appendChild(node.peer);
        return null; // TODO
    }
    
    public void removeChild(Node<?> old) {
        peer.removeChild(old.peer);
    }
    
    public Document getOwnerDocument() {
        return owner;
    }
}
