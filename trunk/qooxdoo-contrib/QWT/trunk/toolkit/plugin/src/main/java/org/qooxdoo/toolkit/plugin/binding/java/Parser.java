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

package org.qooxdoo.toolkit.plugin.binding.java;

import java.util.List;

import org.w3c.dom.Element;

import org.qooxdoo.sushi.xml.Dom;
import org.qooxdoo.sushi.xml.Selector;
import org.qooxdoo.sushi.xml.Serializer;
import org.qooxdoo.sushi.xml.XmlException;

public class Parser {
    public final Selector selector;
    public final Serializer serializer;

    public Parser() {
        this.selector = new Selector();
        this.serializer = new Serializer();
    }
    
    public String description(Element element) throws XmlException {
        return selector.stringOpt(element, "desc/text");
    }
    
    public boolean getBoolean(Element element, String attribute, boolean dflt) {
        String str;
        
        str = Dom.getAttributeOpt(element, attribute);
        if (str == null) { 
            return dflt;
        } else if (str.equals("true")) {
            return true;
        } else if (str.equals("false")) {
            return false;
        } else {
            throw new IllegalArgumentException(str);
        }
    }
    //-- 
    
    public Type methodType(Element method) throws XmlException {
        Element ret;
        
        ret = selector.elementOpt(method, "return");
        if (ret == null) {
            return SimpleType.VOID;
        } else {
            return paramType(ret);
        }
    }
    
    public Type paramType(Element param) throws XmlException {
        List<Element> entries;
        
        param = selector.elementOpt(param, "types"); 
        if (param == null) {
            return SimpleType.OBJECT;
        }
        entries = selector.elements(param, "entry");
        switch (entries.size()) {
        case 0:
            throw new IllegalArgumentException(entries.toString());
        case 1:
            return type(Dom.getAttribute(entries.get(0), "type"));
        default:
            // multiple return values not supported
            return SimpleType.OBJECT;
        }
    }

    public Type propertyType(Element ele) throws XmlException {
        String name;
        
        name = Dom.getAttributeOpt(ele, "check");
        if (name == null) {
            return SimpleType.OBJECT;
        } else {
            return type(name);
        }
    }

    private Type type(String name) throws XmlException {
        if ("Event".equals(name)) {
            name = "qx.event.type.Event";
        } else if ("DOMDocument".equals(name)) {
            name = "Object";
        } else if ("DOMWindow".equals(name)) {
            name = "Object";
        } else if ("CellEditorFactory".equals(name)) {
            name = "Object";
        } else if ("DataCellRenderer".equals(name)) {
            name = "Object";
        } else if ("HeaderCellRenderer".equals(name)) {
            name = "Object";
        } else if ("arguments".equals(name)) {
            name = "Object";  // can append "..." because argument is not necessarily the last 
        } else if (name.equals("Theme")) {
            name = "qx.Theme";
        } else if (name.equalsIgnoreCase("widget")) { // TODO: Widget
            name = "qx.ui.core.Widget";
        } else if (name.equals("Border")) {
            name = "qx.ui.core.Border";
        } else if (name.equals("Font")) {
            name = "qx.ui.core.Font";
        } else if (name.equals("Label")) {
            name = "String";
        } else if (name.equals("Color")) {
            name = "String";
        } else if (name.equals("Node")) {
            name = "Object";
        } else if (name.equalsIgnoreCase("Array")) {
            name = "Object";
        } else if (name.equals("Set")) {
            name = "Object";
        } else if (name.equals("Hash")) {
            name = "Object";
        } else if (name.equalsIgnoreCase("Element")) {
            name = "Object";
        } else if (name.equals("Date")) {
            name = "Object";
        } else if (name.equals("Function")) {
            name = "Object";
        } else if (name.equals("")) { // TODO: for AbstractTreeElement
            name = "Object";
        } else if (name.equals("Appender")) {
            name = "Object";
        } else if (name.equals("var")) {
            name = "Object";
        } else if (name.equals("NonEmptyString")) {
            name = "String";
        } else if (name.equals("Custom check function.")) {
            name = "Object";
        } else if (name.equals("Integer, String")) {
            name = "Object";
        } else if (name.equals("Integer/Null")) {
            name = "Integer";
        } else if (name.contains("!")) {
            // a condition
            name = "Object";
        }
        try {
            return SimpleType.valueOf(name.toUpperCase());
        } catch (IllegalArgumentException e) {
            return new ComplexType(name);
        }
    }
}
