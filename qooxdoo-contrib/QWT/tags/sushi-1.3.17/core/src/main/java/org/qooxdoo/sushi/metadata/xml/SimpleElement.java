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

import org.xml.sax.Locator;
import org.xml.sax.SAXException;

import org.qooxdoo.sushi.metadata.Item;
import org.qooxdoo.sushi.metadata.SimpleType;
import org.qooxdoo.sushi.metadata.SimpleTypeException;
import org.qooxdoo.sushi.metadata.Type;

public class SimpleElement extends Element {
    private final StringBuilder builder;
    private final SimpleType type;

    public SimpleElement(Item<?> owner, SimpleType type) {
        super(owner);

        this.builder = new StringBuilder();
        this.type = type;
    }

    @Override
    public Type getType() {
        return type;
    }

    @Override
    public Item<?> lookup(String name) {
        return null;
    }

    @Override
    public void addChild(Item<?> item, Object child) {
        throw new IllegalStateException();
    }

    @Override
    public boolean addContent(char[] ch, int ofs, int len) {
        builder.append(ch, ofs, len);
        return true;
    }

    @Override
    public boolean isEmpty() {
        return builder.length() == 0;
    }

    @Override
    public Object create(List<SAXException> exceptions, Locator locator) {
        String str;
        
        str = builder.toString();
        try {
            return type.stringToValue(str);
        } catch (SimpleTypeException e) {
            exceptions.add(new SAXLoaderException("cannot set simple value '" + str + "': " + e.getMessage(), locator));
            return type.newInstance();
        }
    }
}
