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

package org.qooxdoo.toolkit.rhino;

import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.xml.Xml;
import org.qooxdoo.sushi.xml.XmlException;

public class Document extends Node<org.w3c.dom.Document> {
    private final Xml xml;

    public Object onselectionchange; // TODO
    public Object onselectstart; // TODO
    public Object documentElement; // TODO
    public Location location = new Location();
    
    public Document(Xml xml, String doc) {
        this(xml, xml.builder.literal(doc));
    }

    public Document(Xml xml, org.w3c.dom.Document doc) {
        super(doc);
        this.xml = xml;
        this.documentElement = doc;
    }

    public Text createTextNode(String data) {
        return new Text(peer.createTextNode(data));
    }
    
    public Element createElement(String name) {
        return new Element(this, peer.createElement(name));
    }

    public StyleSheet createStyleSheet() {
        return new StyleSheet();
    }
    
    public Element[] getElementsByTagName(String name) {
        List<Element> result;
        
        result = new ArrayList<Element>();
        for (org.w3c.dom.Element e : xml.selector.elements(peer, "//" + name.toLowerCase())) {
            result.add(new Element(this, e));
        }
        return result.toArray(new Element[result.size()]);
    }

    public Element getElementById(String id) throws XmlException {
        return new Element(this, xml.selector.element(peer, "//*[@id='" + id + "']"));
    }

    public Element getBody() throws XmlException {
        return new Element(this, xml.selector.element(peer, "/html/body"));
    }

    @Override
    public String toString() {
        return xml.serializer.serialize(peer);
    }
}
