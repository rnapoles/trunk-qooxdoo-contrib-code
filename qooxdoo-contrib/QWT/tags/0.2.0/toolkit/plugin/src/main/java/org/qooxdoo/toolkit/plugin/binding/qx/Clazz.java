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

package org.qooxdoo.toolkit.plugin.binding.qx;

import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.util.Strings;
import org.qooxdoo.sushi.xml.XmlException;
import org.qooxdoo.toolkit.plugin.binding.java.ClazzType;

public class Clazz {
    public String name;
    public String interfaces;
    public String superClass;
    public String fullName;
    public String type;
    public String packageName;

    public String access;
    public String mixins;
    public String includer;
    public String childClasses;
    public String implementations;
    public boolean isAbstract;
    public boolean isInternal;
    public boolean isStatic;
    public boolean isSingleton;

    public Desc desc;
    public See see;
    public Deprecated deprecated;
    public Constructor constructor;
    public List<Constant> constants;
    public List<Event> events;
    public List<Method> methods;
    public List<Appearance> appearances;
    public List<Property> properties;
    public List<Error> errors;
    
    //--
    
    public org.qooxdoo.toolkit.plugin.binding.java.Clazz createJava() throws XmlException {
        org.qooxdoo.toolkit.plugin.binding.java.Clazz clazz;
        org.qooxdoo.toolkit.plugin.binding.java.Method m;
        boolean ifc;
        
        try {
            clazz = new org.qooxdoo.toolkit.plugin.binding.java.Clazz(
                    ClazzType.valueOf(type.toUpperCase()),
                    isAbstract, fullName, superClass, 
                    interfaces(), Desc.toJava(desc));
            for (org.qooxdoo.toolkit.plugin.binding.qx.Property p : properties) {
                clazz.add(p.createJava());
            }
            ifc = (clazz.type == ClazzType.INTERFACE);
            if (constructor != null) {
                m = constructor.method.createJava(name, ifc);
                if (m.isStatic()) {
                    throw new XmlException("unexpected static method: " + m);
                }
                if (!m.isConstructor()) {
                    throw new XmlException("constructor method expected: " + m);
                }
                if (!m.getName().equals("ctor")) {
                    // TODO throw new XmlException("unexpected method name: " + m.getName());
                }
                m.addPrefixes(clazz);
                clazz.add(m);
            }
            for (org.qooxdoo.toolkit.plugin.binding.qx.Method child : methods) {
                m = child.createJava(name, ifc);
                if (m.isConstructor()) {
                    throw new XmlException("unexpected constructor method: " + m);
                }
                try {
                    clazz.add(m);
                } catch (IllegalArgumentException e) {
                    System.out.println("TODO: " + e.getMessage());
                }
            }
        } catch (XmlException e) {
            throw new XmlException("class " + fullName + ": " + e.getMessage(), e);
        }
        return clazz;
    }
    
    private List<String> interfaces() {
        if (interfaces == null) {
            return new ArrayList<String>();
        } else {
            return Strings.trim(Strings.split(",", interfaces));
        }
    }
}
