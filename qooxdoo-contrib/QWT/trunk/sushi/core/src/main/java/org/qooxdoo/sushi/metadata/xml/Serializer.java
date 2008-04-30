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

import java.io.IOException;
import java.util.ArrayList;
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
    private final List<Object> ids;
    private final List<Object> idrefs;
    
    public Serializer(Tree tree, List<Object> ids) {
        this.tree = tree;
        this.ids = ids;
        this.idrefs = new ArrayList<Object>();
    }

    public void run(String name, Type declaredType, Object obj) throws IOException {
        int id;
        List<Item<?>> items;
        boolean empty;
        Type actualType;
        String typeAttribute;
        
        if (obj == null) {
            return;
        }
        id = index(idrefs, obj);
        if (id != -1) {
            tree.ref(name, id);
        } else {
            actualType = declaredType.getSchema().type(obj.getClass());
            if (actualType.equals(declaredType)) {
                typeAttribute = null;
            } else {
                typeAttribute = actualType.getType().getName();
            }
            if (actualType instanceof SimpleType) {
                tree.text(name, typeAttribute, ((SimpleType) actualType).valueToString(obj));
            } else {
                id = getId(obj);
                items = ((ComplexType) actualType).items();
                empty = items.size() == 0;
                tree.begin(name, id, typeAttribute, empty);
                if (!empty) {
                    for (Item<?> item : items) {
                        for (Object itemObj : item.get(obj)) {
                            run(item.getXmlName(), item.getType(), itemObj);
                        }
                    }
                    tree.end(name);
                }
            }
        }
    }

    //--

    // TODO: visitor
    public static List<Object> ids(Type rootType, Object rootObject) {
        List<Object> result;
        List<Type> closureTypes;
        List<Object> closureObjects;
        Object obj;
        Type type;
        List<Item<?>> items;
        int idx;
        
        closureTypes = new ArrayList<Type>();
        closureTypes.add(rootType);
        closureObjects = new ArrayList<Object>();
        closureObjects.add(rootObject);
        result = new ArrayList<Object>();
        for (int i = 0; i < closureObjects.size(); i++) { // size grows
            obj = closureObjects.get(i);
            type = closureTypes.get(i);
            if (type instanceof ComplexType) {
                items = ((ComplexType) type).items();
                for (Item<?> item : items) {
                    for (Object itemObj : item.get(obj)) {
                        idx = index(closureObjects, itemObj);
                        if (idx != -1) {
                            result.add(itemObj);
                        } else {
                            closureObjects.add(itemObj);
                            closureTypes.add(item.getType());
                        }
                    }
                }
            } else {
                // simple type - nothing to check
            }
        }
        return result;
    }
    
    private int getId(Object obj) {
        int idx;
        
        idx = index(ids, obj);
        if (idx == -1) {
            return -1;
        } else {
            idrefs.add(ids.remove(idx));
            return idrefs.size() - 1;
        }
    }

    private static int index(List<Object> lst, Object obj) {
        int max;
        
        max = lst.size();
        for (int i = 0; i < max; i++) {
            if (obj == lst.get(i)) {
                return i;
            }
        }
        return -1;
    }
}
