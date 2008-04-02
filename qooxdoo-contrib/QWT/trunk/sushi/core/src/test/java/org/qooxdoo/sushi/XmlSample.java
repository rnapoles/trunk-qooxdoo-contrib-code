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

package org.qooxdoo.sushi;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.xml.sax.SAXException;

import org.qooxdoo.sushi.xml.Xml;

public class XmlSample {
    private static final Xml XML = new Xml();
    
    public static void main(String[] args) throws SAXException {
        Document doc;
        
        doc = XML.builder.parseString(
                "<foo>" +
                "  <bar a='1'/>" +
                "  <bar b='2'/>" +
                "</foo>");
        for (Node node : XML.selector.nodes(doc, "//bar")) {
            System.out.println(XML.serializer.serialize(node));
        }
    }
}
