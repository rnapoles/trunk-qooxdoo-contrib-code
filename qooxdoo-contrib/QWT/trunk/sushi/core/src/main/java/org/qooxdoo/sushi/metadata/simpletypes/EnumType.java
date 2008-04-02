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

package org.qooxdoo.sushi.metadata.simpletypes;

import java.util.Set;

import org.qooxdoo.sushi.metadata.Schema;
import org.qooxdoo.sushi.metadata.SimpleType;
import org.qooxdoo.sushi.metadata.SimpleTypeException;
import org.qooxdoo.sushi.metadata.Type;
import org.qooxdoo.sushi.util.Reflect;
import org.qooxdoo.sushi.xml.Serializer;


public class EnumType extends SimpleType {
    public static EnumType create(Schema schema, Class<? extends Enum> clazz) {
        return new EnumType(schema, clazz, Schema.typeName(clazz), Reflect.getValues(clazz));
    }

    private final Enum[] values;
    
    public EnumType(Schema schema, Class<?> clazz, String name, Enum[] values) {
        super(schema, clazz, name);
        this.values = values;
    }
    
    @Override
    public Object newInstance() {
        return values[0];
    }

    @Override
    public String valueToString(Object obj) {
        return normalizeEnum(obj.toString());
    }
    
    @Override
    public Object stringToValue(String str) throws SimpleTypeException {
        StringBuilder msg;
        String name;
        
        str = normalizeEnum(str);
        msg = new StringBuilder();
        for (Enum e : values) {
            name = normalizeEnum(e.name());
            if (name.equals(str)) {
                return e;
            }
            msg.append(" '");
            msg.append(name);
            msg.append('\'');
        }
        throw new SimpleTypeException("unkown value '" + str + "', expected one of" + msg);
    }

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

        dest.append("  <xs:simpleType name='" + getName() + "'>\n");
        dest.append("    <xs:restriction base='xs:string' >\n");
        for (Enum e : values) {
            dest.append("    <xs:enumeration value='" + Serializer.escapeEntities(normalizeEnum(e.toString())) + "'/>\n");
        }
        dest.append("    </xs:restriction>\n");
        dest.append("  </xs:simpleType>\n");
    }

    private static String normalizeEnum(String value) {
        value = value.toLowerCase();
        return value.replace('_', '-');
    }
}
