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

package org.qooxdoo.sushi.metadata.xml;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.qooxdoo.sushi.metadata.ComplexType;
import org.qooxdoo.sushi.metadata.Item;
import org.qooxdoo.sushi.metadata.ItemException;
import org.qooxdoo.sushi.metadata.Type;
import org.qooxdoo.sushi.metadata.Variable;
import org.xml.sax.Locator;
import org.xml.sax.SAXException;

public class ComplexElement extends Element {
    private final ComplexType type;
    private final Map<Item<?>, List<Object>> children;

    public ComplexElement(Item<?> owner, ComplexType type) {
        super(owner);
        
        if (owner != null && !owner.getType().getType().isAssignableFrom(type.getType())) {
            throw new IllegalArgumentException();
        }
        this.type = type;
        this.children = new HashMap<Item<?>, List<Object>>();
        for (Item<?> item : type.items()) {
            children.put(item, new ArrayList<Object>());
        }
    }

    @Override
    public Type getType() {
        return type;
    }
    
    @Override
    public void addChild(Item<?> item, Object obj) {
        children.get(item).add(obj);
    }
    
    @Override
    public boolean isEmpty() {
        for (List<Object> values : children.values()) {
            if (values.size() > 0) {
                return false;
            }
        }
        return true;
    }
    
    @Override
    public Object create(List<SAXException> exceptions, Locator locator) {
        Object object;
        Item item;
        
        object = type.newInstance();
        for (Map.Entry<Item<?>, List<Object>> entry : children.entrySet()) {
            item = entry.getKey();
            try {
                item.set(object, entry.getValue());
            } catch (ItemException e) {
                exceptions.add(new SAXVariableException(new Variable<Object>(object, item), locator, e));
            }            
        }
        return object;
    }

    @Override
    public boolean addContent(char[] ch, int ofs, int len) {
        int max;
        
        max = ofs + len;
        for (int i = ofs; i < max; i++) {
            if (!Character.isWhitespace(ch[i])) {
                return false;
            }
        }
        return true;
    }

    @Override
    public Item lookup(String child) {
        return type.lookupXml(child);
    }
}
