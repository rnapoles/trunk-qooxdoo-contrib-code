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

import java.util.List;
import java.util.Map;

import org.qooxdoo.sushi.metadata.ComplexType;
import org.qooxdoo.sushi.metadata.Item;
import org.qooxdoo.sushi.metadata.SimpleType;
import org.qooxdoo.sushi.metadata.Type;
import org.xml.sax.Locator;
import org.xml.sax.SAXException;

public abstract class Element {
    public static Element create(Item<?> owner, Type type) {
        if (type instanceof SimpleType) {
            return new SimpleElement(owner, (SimpleType) type);
        } else {
            return new ComplexElement(owner, (ComplexType) type);
        }
    }
    
    //--

    /** null for root element */
    private final Item<?> owner;

    public String id;
    public String idref;
    
    protected Element(Item<?> owner) {
        this.owner = owner;
        this.id = null;
        this.idref = null;
    }
    
    public Item<?> getOwner() {
        return owner;
    }
    
    public abstract Item<?> lookup(String child);
    public abstract boolean isEmpty();
    public Object done(Map<String, Object> storage, List<SAXException> exceptions, Locator locator) {
        Object result;
        
        if (idref != null) {
            result = storage.get(idref);
            if (result == null) {
                exceptions.add(new SAXException("idref not found: " + idref));
            }
            if (!isEmpty()) {
                exceptions.add(new SAXException("unexpected content in idref element: " + idref));
            }
        } else {
            result = create(exceptions, locator);
        }
        if (id != null) {
            if (storage.put(id, result) != null) {
                exceptions.add(new SAXException("duplicate id: " + id));
            }
        }
        return result;
    }

    public abstract Object create(List<SAXException> exceptions, Locator locator);

    public abstract Type getType();
    
    public abstract void addChild(Item<?> item, Object child);
    public abstract boolean addContent(char[] ch, int start, int end);
}
