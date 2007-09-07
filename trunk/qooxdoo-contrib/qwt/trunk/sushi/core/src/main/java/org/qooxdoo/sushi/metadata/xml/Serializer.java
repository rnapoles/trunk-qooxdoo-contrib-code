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

package org.qooxdoo.sushi.metadata.xml;

import java.io.IOException;
import java.io.Writer;
import java.util.List;

import org.qooxdoo.sushi.metadata.ComplexType;
import org.qooxdoo.sushi.metadata.Item;
import org.qooxdoo.sushi.metadata.SimpleType;
import org.qooxdoo.sushi.metadata.Type;

/** You'll normally not use this class directly, use Data.toXml instead */
public class Serializer {
    private final Writer dest;
    
    public Serializer(Writer dest) {
        this.dest = dest;
    }

    public void run(int indent, String name, Type type, Object obj) throws IOException {
        if (type instanceof SimpleType) {
            run(indent, name, (SimpleType) type, obj);
        } else {
            run(indent, name, (ComplexType) type, obj);
        }
    }

    private void run(int indent, String name, ComplexType type, Object obj) throws IOException {
        List<Item> items;

        if (obj == null) {
            return;
        }
        indent(indent);
        dest.write("<");
        dest.write(name);
        items = type.items();
        if (items.size() == 0) {
            dest.write("/>\n");
        } else {
            dest.write(">\n");
            for (Item item : items) {
                for (Object itemObj : item.get(obj)) {
                    run(indent + 1, item.getXmlName(), item.getType(), itemObj);
                }
            }
            indent(indent);
            dest.write("</");
            dest.write(name);
            dest.write(">\n");
        }
    }

    private void run(int indent, String name, SimpleType type, Object obj) throws IOException {
        String str;
        
        if (obj == null) {
            return;
        }
        str = org.qooxdoo.sushi.xml.Serializer.escapeEntities(type.valueToString(obj));
        indent(indent);
        dest.write('<');
        dest.write(name);
        dest.write('>');
        dest.write(str);
        dest.write("</");
        dest.write(name);
        dest.write(">\n");
    }

    private void indent(int indent) throws IOException {
        for (int i = 0; i < indent; i++) {
            dest.write("  ");
        }
    }
}
