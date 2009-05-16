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

import java.util.ArrayList;
import java.util.List;

import org.w3c.dom.Attr;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.w3c.dom.Text;

public class Dom {
    public static List<Element> getAllChildElements(Element parent) {
        List<Element> result;
        NodeList nodes;
        int i;
        int max;
        Node node;

        result = new ArrayList<Element>();
        nodes = parent.getChildNodes();
        max = nodes.getLength();
        for (i = 0; i < max; i++) {
            node = nodes.item(i);
            if (node instanceof Element) {
                result.add((Element) node);
            }
        }
        return result;
    }

    /** Steps may be empty strings */
    public static List<Element> getChildElements(Element root, String ... steps) {
        List<Element> lst;
        
        lst = new ArrayList<Element>();
        doGetChildElements(root, steps, 0, lst);
        return lst;
    }

    private static void doGetChildElements(Element root, String[] steps, int i, List<Element> result) {
        if (i == steps.length) {
            result.add(root);
        } else {
            for (Element child : doGetChildElements(root, steps[i])) {
                doGetChildElements(child, steps, i + 1, result);
            }
        }
    }

    private static List<Element> doGetChildElements(Element parent, String name) {
        List<Element> result;
        NodeList nodes;
        int i;
        int max;
        Node node;
        Element element;

        result = new ArrayList<Element>();
        nodes = parent.getChildNodes();
        max = nodes.getLength();
        for (i = 0; i < max; i++) {
            node = nodes.item(i);
            if (node instanceof Element) {
                element = (Element) node;
                if (name.equals(element.getTagName())) {
                    result.add((Element) node);
                }
            }
        }
        return result;
    }

    //--
    
    public static String getString(Node node) {
        if (node instanceof Attr) {
            return ((Attr) node).getValue();
        } else if (node instanceof Element) {
            return Dom.getString((Element) node);
        } else {
            throw new RuntimeException(node.getClass().getName());
        }
    }

    public static String getString(Element root) {
        StringBuilder buffer;
        NodeList nodes;
        int i;
        int max;
        Node node;
        
        buffer = new StringBuilder();
        nodes = root.getChildNodes();
        max = nodes.getLength();
        for (i = 0; i < max; i++) {
            node = nodes.item(i);
            if (node instanceof Text) {
                buffer.append(((Text) node).getNodeValue());
            } else {
                throw new IllegalArgumentException(node.getClass().getName());
            }
        }
        return buffer.toString();
    }
    
    //--
    
    public static String getAttribute(Element element, String name) {
        String attr;
        
        attr = getAttributeOpt(element, name);
        if (attr == null) {
            throw new DomException("missing attribute '" + name + "' in element '" + element.getTagName() + "'");
        }
        return attr;
    }

    public static String getAttributeOpt(Element element, String name) {
        Attr attr;
        
        attr = element.getAttributeNode(name);
        if (attr == null) {
            return null;
        }
        return attr.getValue();
    }
    
    //--
    
    public static void require(Element ele, String expected) {
        String got;
        
        got = ele.getTagName();
        if (!expected.equals(ele.getTagName())) {
            throw new DomException("'" + expected + "' element expected, got '" + got + "'");
        }
    }
}
