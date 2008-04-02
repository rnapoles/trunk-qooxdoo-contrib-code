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

package org.qooxdoo.toolkit.plugin.binding.java;

public class Field extends Item {
    private final String name;
    private final Type type;
    private final String overriddenFrom;
    
    public Field(String name, Type type, String overriddenFrom, String description) {
        super(description);
        if (name == null || "".equals(name) || name.indexOf('.') != -1) {
            throw new IllegalArgumentException("" + name);
        }
        this.name = name;
        this.type = type;
        this.overriddenFrom = overriddenFrom;
        setExtra("@alias");
    }
    
    public String getName() {
        return name;
    }
    public Type getType() {
        return type;
    }
    public String getOverriddenFrom() {
        return overriddenFrom;
    }

    public void toJava(StringBuilder builder) {
        builder.append(comment(true));
        builder.append("    private ").append(type.getJavaName());
        builder.append(' ');
        builder.append(name);
        builder.append(";\n");
    }
    
    public Method createClassGetter() {
        Method method;
        
        method = new Method(Modifier.PUBLIC, false, true, false, false, type, "get" + capitalize(name), 
                opt("Getter: ",  getDescription()), null, null, null);
        method.setExtra("@alias");
        return method;
    }

    public Method createClassSetter() {
        Method method;
        
        method = new Method(Modifier.PUBLIC, false, true, false, false, SimpleType.VOID, setterName(),
                opt("Setter:", getDescription()), null, null, null);
        method.add(new Parameter(type, name));
        method.setExtra("@alias");
        return method;
    }

    public Method createInterfaceGetter() {
        Method method;
        
        method = new Method(Modifier.NONE, false, false, false, false, type, "get" + capitalize(name), 
                opt("Getter: ",  getDescription()), null, null, null);
        return method;
    }
    
    public Method createInterfaceSetter() {
        Method method;
        
        method = new Method(Modifier.NONE, false, false, false, false, SimpleType.VOID, setterName(), 
                opt("Setter:", getDescription()), null, null, null);
        method.add(new Parameter(type, name));
        return method;
    }

    public String setterName() {
        return "set" + capitalize(name);
    }
    
    private static String capitalize(String str) {
        return Character.toUpperCase(str.charAt(0)) + str.substring(1);
    }
    
    private String opt(String prefix, String msg) {
        if (msg == null) {
            return null;
        } else {
            return prefix + msg;
        }
    }
}
