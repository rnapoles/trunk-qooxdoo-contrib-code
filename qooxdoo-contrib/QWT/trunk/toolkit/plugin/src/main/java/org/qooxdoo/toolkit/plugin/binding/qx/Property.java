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

package org.qooxdoo.toolkit.plugin.binding.qx;

import java.util.List;

import org.qooxdoo.sushi.xml.XmlException;
import org.qooxdoo.toolkit.plugin.binding.java.Field;
import org.qooxdoo.toolkit.plugin.binding.java.GroupType;
import org.qooxdoo.toolkit.plugin.binding.java.SimpleType;
import org.qooxdoo.toolkit.plugin.binding.java.Type;

public class Property {
    public Desc desc;
    public Deprecated deprecated;
    public List<Entry> entries;
    public List<Error> errors;
    
    public String propertyType;
    public String inheritable;
    public String mode;
    public String type;
    public String defaultValue;
    public String event;
    public String group;
    public String apply;
    public String docFrom;
    public String name;
    public String overriddenFrom;
    public String oldProperty;
    public boolean allowNull;
    public boolean isMixin;
    public String check;
    public String possibleValues;
    public String refine;
    public boolean themeable;
    
    public Type propertyType() throws XmlException {
        if (group != null) {
            return GroupType.parse(group);
        } else if (check == null) {
            return SimpleType.OBJECT;
        } else {
            return Entry.type(check);
        }
    }
    
    public Field createJava() throws XmlException {
        return new Field(name, propertyType(), overriddenFrom, Desc.toJava(desc));
    }
}
