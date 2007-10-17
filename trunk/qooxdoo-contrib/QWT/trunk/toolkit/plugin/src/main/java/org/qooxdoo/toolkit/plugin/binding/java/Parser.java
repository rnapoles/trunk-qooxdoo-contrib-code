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

import org.qooxdoo.sushi.xml.Dom;
import org.qooxdoo.sushi.xml.Selector;
import org.qooxdoo.sushi.xml.Serializer;
import org.qooxdoo.sushi.xml.XmlException;
import org.qooxdoo.toolkit.plugin.binding.doctree.Entry;
import org.qooxdoo.toolkit.plugin.binding.doctree.Return;
import org.w3c.dom.Element;

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
}
