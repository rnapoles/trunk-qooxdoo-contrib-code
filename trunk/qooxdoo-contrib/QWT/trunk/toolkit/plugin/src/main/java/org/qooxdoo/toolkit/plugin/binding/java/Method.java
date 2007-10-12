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

package org.qooxdoo.toolkit.plugin.binding.java;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.w3c.dom.Element;

import org.qooxdoo.sushi.xml.Dom;
import org.qooxdoo.sushi.xml.XmlException;

public class Method extends Item {
    public static Method fromXml(Parser parser, String simpleClass,
            Element element, boolean forInterface) throws XmlException {
        boolean isContructor;
        Method method;
        Access a;
        String name;
        Type returnType;
        String docFrom;
        String fromProperty;
        
        isContructor = parser.getBoolean(element, "isCtor", false);
        a = access(element);
        name = element.getAttribute("name");
        docFrom = Dom.getAttributeOpt(element, "docFrom");
        fromProperty = Dom.getAttributeOpt(element, "fromProperty");
        if (a == Access.PROTECTED) {
            if (name.startsWith("init")
                    || element.getAttribute("overriddenFrom") != null) {
                // TODO: System.out.println("TODO: changing visibility to
                // PUBLIC: " + name);
                a = Access.PUBLIC;
            }
        }
        
        returnType = isContructor ? null : parser.methodType(element);
        method = new Method(a, parser.getBoolean(element, "isAbstract", false),
                !forInterface && !isContructor, parser.getBoolean(element, "isStatic", false), 
                        isContructor, returnType,
                isContructor ? simpleClass : name, parser.description(element), docFrom, fromProperty,
                isContructor ? "" : null);
        for (Element e : parser.selector.elements(element, "errors/error")) {
            method.errors.add(Dom.getAttribute(e, "msg"));
        }
        for (Element e : parser.selector.elements(element, "params/param")) {
            method.add(Parameter.fromXml(parser, e));
        }
        return method;
    }

    
    private static Access access(Element element) throws XmlException {
        String access;

        access = Dom.getAttributeOpt(element, "access");
        if (access == null) {
            return Access.PUBLIC;
        } else {
            return Access.valueOf(access.toUpperCase());
        }
    }

    // --

    private final Access access;
    private final boolean isAbstract;
    private final boolean isNative;
    private final boolean isStatic;
    private final boolean isConstructor;
    private Type type;
    private final String name;
    private final String docFrom;
    private final String fromProperty;
    private final String body;
    private final List<Parameter> params;
    public final List<String> errors;
    
    public Method(Access access, boolean isAbstract, boolean isNative,
            boolean isStatic, boolean isConstructor, Type type, String name,
            String description, String docFrom, String fromProperty, String body) {
        super(description);
        this.access = access;
        this.isAbstract = isAbstract;
        this.isNative = isNative;
        this.isStatic = isStatic;
        this.isConstructor = isConstructor;
        this.type = type;
        this.name = name;
        this.docFrom = docFrom;
        this.fromProperty = fromProperty;
        this.body = body;
        this.params = new ArrayList<Parameter>();
        this.errors = new ArrayList<String>();
        if (isNative) {
            setExtra("@alias");
        }
    }

    /** add constructors with less arguments */
    public void addPrefixes(Clazz dest) {
        Method m;

        for (int count = 0; count < params.size(); count++) {
            m = new Method(access, isAbstract, isNative, isStatic,
                    isConstructor, type, name, getDescription(), null, null, body);
            for (int j = 0; j < count; j++) {
                m.params.add(new Parameter(params.get(j)));
            }
            dest.add(m);
        }
    }

    public void link(Doctree doctree, Clazz owner) {
        Clazz clazz;
        Method docFromMethod;
        Property prop;
        
        if (fromProperty != null) {
            prop = owner.findProperty(fromProperty);
            if (prop == null) {
                throw new IllegalArgumentException("fromProperty " + fromProperty + " not found.");
            }
            if (name.startsWith("set") || name.startsWith("init")) {
                params.clear();
                params.add(new Parameter(prop.getType(), "arg"));
                type = SimpleType.VOID;
            } else if (name.startsWith("get") || name.startsWith("is") || name.startsWith("toggle")) {
                params.clear();
                type = prop.getType();
            } else if (name.startsWith("reset")) {
                // do nothing
            } else {
                throw new IllegalArgumentException("unexpected method name: " + name);
            }
        } else {
            docFromMethod = null;
            if (docFrom != null) {
                clazz = doctree.get(docFrom);
                docFromMethod = clazz.findMethod(name, false);
                if (docFromMethod == null) {
                    throw new IllegalArgumentException(docFrom + "." + name + " not found.");
                }
            } else if (errors.contains("Documentation is missing.")) {
                for (Clazz i : owner.getInterfaces()) {
                    docFromMethod = i.findMethod(name, false);
                    if (docFromMethod != null) {
                        break;
                    }
                }
            }
            if (docFromMethod != null) {
                this.type = docFromMethod.type;
                this.params.clear();
                this.params.addAll(docFromMethod.params);
            }
        }
    }
    
    public Method duplicate(String newName) {
        Method m;

        m = new Method(access, isAbstract, isNative, isStatic, isConstructor,
                type, newName, getDescription(), docFrom, fromProperty, body);
        for (Parameter p : params) {
            m.params.add(new Parameter(p));
        }
        return m;
    }

    public Access getAccess() {
        return access;
    }

    public boolean isAbstract() {
        return isAbstract;
    }

    public boolean isStatic() {
        return isStatic;
    }

    public boolean isConstructor() {
        return isConstructor;
    }

    public String getName() {
        return name;
    }

    public List<Parameter> params() {
        return Collections.unmodifiableList(params);
    }

    public void add(Parameter parameter) {
        if (findParameter(parameter.getName()) != null) {
            throw new IllegalArgumentException(getName()
                    + ": duplicate parameter " + parameter.getName());
        }
        params.add(parameter);
    }

    public Parameter findParameter(String name) {
        for (Parameter p : params) {
            if (p.getName().equals(name)) {
                return p;
            }
        }
        return null;
    }

    public void toJava(StringBuilder builder) {
        final String indent = "    ";
        boolean first;

        builder.append(comment(true));
        builder.append(indent);
        if (access != Access.NONE && access != Access.INTERNAL) {
            builder.append(access.toString().toLowerCase());
            builder.append(' ');
        }
        if (isStatic) {
            builder.append("static ");
        }
        if (isNative) {
            builder.append("native ");
        }
        if (type != null) {
            builder.append(type.getJavaName());
            builder.append(' ');
        }
        builder.append(name);
        if (name.equals("toString")) { // TODO
            builder.append('_');
        }
        builder.append('(');
        first = true;
        for (Parameter p : params) {
            if (first) {
                first = false;
            } else {
                builder.append(", ");
            }
            p.toJava(builder);
        }
        if (body == null) {
            builder.append(");\n");
        } else {
            builder.append(") {\n");
            builder.append(body);
            builder.append("    }\n");
        }
    }
}
