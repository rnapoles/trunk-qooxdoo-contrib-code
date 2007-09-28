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
import java.util.List;

import org.qooxdoo.sushi.metadata.ComplexType;
import org.qooxdoo.sushi.metadata.Item;
import org.qooxdoo.sushi.metadata.SimpleType;
import org.qooxdoo.sushi.metadata.Type;

/** 
 * You'll normally not use this class directly, use Data.toXml instead.
 * TODO: clearify name against DomSerializer. 
 */
public class Serializer {
    private final Tree tree;
    
    public Serializer(Tree tree) {
        this.tree = tree;
    }

    public void run(String name, Type type, Object obj) throws IOException {
        if (obj == null) {
            return;
        }
        if (type instanceof SimpleType) {
            simple(name, (SimpleType) type, obj);
        } else {
            complex(name, (ComplexType) type, obj);
        }
    }

    private void complex(String name, ComplexType type, Object obj) throws IOException {
        List<Item> items;

        items = type.items();
        tree.begin(name, items.size());
        for (Item item : items) {
            for (Object itemObj : item.get(obj)) {
                run(item.getXmlName(), item.getType(), itemObj);
            }
        }
        tree.end(name);
    }

    private void simple(String name, SimpleType type, Object obj) throws IOException {
        tree.text(name, type.valueToString(obj));
    }
}
