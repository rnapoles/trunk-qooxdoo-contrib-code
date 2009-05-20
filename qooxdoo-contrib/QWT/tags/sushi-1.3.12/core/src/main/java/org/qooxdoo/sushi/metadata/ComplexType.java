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

package org.qooxdoo.sushi.metadata;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/** A list of items */
public class ComplexType extends Type {
    private final List<Item<?>> items;

    public ComplexType(Schema schema, Class<?> type, String name) {
        super(schema, type, name);

        this.items = new ArrayList<Item<?>>();
    }

    public List<Item<?>> items() {
        return items;
    }

    public Item<?> lookupXml(String name) {
        for (Item<?> item : items) {
            if (item.getXmlName().equals(name)) {
                return item;
            }
        }
        return null;
    }
    
    public Item<?> lookup(String name) {
        for (Item<?> item : items) {
            if (item.getName().equals(name)) {
                return item;
            }
        }
        return null;
    }

    @Override
    public Object newInstance() {
        try {
            return type.newInstance();
        } catch (InstantiationException e) {
            throw new RuntimeException(e);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }


    //-- xsd schema generation

    @Override
    public String getSchemaTypeName() {
        return getName();
    }

    @Override
    public void addSchemaType(Set<Type> done, StringBuilder dest) {
        if (done.contains(this)) {
            return;
        }
        done.add(this);

        dest.append("  <xs:complexType name='" + getName() + "'>\n");
        dest.append("    <xs:sequence minOccurs='0'>\n");
        for (Item<?> item : items) {
            dest.append("      <xs:element name='" + item.getXmlName()
                    + "' type='" + item.getType().getSchemaTypeName()
                    + "'" + item.getCardinality().forSchema() + "/>\n");
        }
        dest.append("    </xs:sequence>\n");
        dest.append("    <xs:attributeGroup ref='ids'/>\n");
        dest.append("  </xs:complexType>\n");

        for (Item<?> item : items) {
            item.getType().addSchemaType(done, dest);
        }
    }
}
