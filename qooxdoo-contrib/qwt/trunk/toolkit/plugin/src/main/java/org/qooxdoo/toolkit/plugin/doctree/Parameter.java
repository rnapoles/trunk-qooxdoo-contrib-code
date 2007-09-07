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

package org.qooxdoo.toolkit.plugin.doctree;

import org.w3c.dom.Element;

import org.qooxdoo.sushi.xml.Dom;
import org.qooxdoo.sushi.xml.XmlException;


public class Parameter {
    public static Parameter fromXml(Parser parser, Element node) throws XmlException {
        return new Parameter(parser.paramType(node), Dom.getAttribute(node, "name"));
    }

    private final Type type;
    private final String name;
    
    public Parameter(Type type, String name) {
        this.type = type;
        this.name = name;
    }

    public Parameter(Parameter orig) {
        this(orig.type, orig.name);
    }

    public Type getType() {
        return type;
    }
    
    public String getName() {
        return name;
    }
    
    public void toJava(StringBuilder builder) {
        builder.append(type.getJavaName());
        builder.append(' ');
        builder.append(name);
    }
}
