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
import org.qooxdoo.toolkit.plugin.binding.java.Modifier;
import org.qooxdoo.toolkit.plugin.binding.java.Type;

public class Method {
    public Deprecated deprecated;
    public Desc desc;
    public List<Param> params;
    public Return returN;
    public See see;
    public List<Error> errors;
    
    public String access;
    public String fromProperty;
    public String overriddenFrom;
    public String apply;
    public String name;
    public String docFrom;
    public boolean isInternal;
    public boolean isMixin;
    public boolean isStatic;
    public boolean isAbstract;
    public boolean isCtor;
    
    //--
    
    public org.qooxdoo.toolkit.plugin.binding.java.Method createJava(String simpleClass, boolean forInterface) throws XmlException {
        org.qooxdoo.toolkit.plugin.binding.java.Method method;
        Modifier a;
        Type returnType;
        
        a = access(this);
        if (a == Modifier.PROTECTED) {
            if (name.startsWith("init") || overriddenFrom != null) {
                // TODO: System.out.println("TODO: changing visibility to
                // PUBLIC: " + name);
                a = Modifier.PUBLIC;
            } else if (forInterface) {
                // TODO: 
                // System.out.println("TODO: changing visibility to PUBLIC: " + simpleClass + "." + name);
                a = Modifier.PUBLIC;
            } else {
                // TODO: overriddenFrom not always assigned properly:
                a = Modifier.PUBLIC;
                // System.out.println("not for interface: " + simpleClass + "." + name + " " + qx.overriddenFrom);
            }
        }
        
        returnType = isCtor ? null : Entry.methodType(this);
        method = new org.qooxdoo.toolkit.plugin.binding.java.Method(a, isAbstract,
                !forInterface && !isCtor, isStatic, isCtor, returnType,
                isCtor ? simpleClass : name, Desc.toJava(desc), docFrom, fromProperty,
                isCtor ? "" : null);
        for (Error e: errors) {
            method.errors.add(e.msg);
        }
        for (Param p : params) {
            method.add(p.toJava());
        }
        return method;
    }

    
    private static Modifier access(org.qooxdoo.toolkit.plugin.binding.qx.Method qx) throws XmlException {
        String access;

        access = qx.access;
        if (access == null) {
            return Modifier.PUBLIC;
        } else {
            return Modifier.valueOf(access.toUpperCase());
        }
    }

}
