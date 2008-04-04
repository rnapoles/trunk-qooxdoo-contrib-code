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

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.toolkit.repository.Dependencies;

public class Clazz extends Item {
    private boolean linked = false;
    public final ClazzType type;
    private final boolean isAbstract;
    private final String fullName;

    private final String superClassFullName;
    private Clazz superClass; // resolved superClassName

    private final List<String> interfaceNames;
    private final List<Clazz> interfaces;
    
    public final List<Method> methods;

    public final Dependencies loadtime;
    public final Dependencies runtime;
    
    public final List<Field> fields;

    private String nativ;
    
    public Clazz(ClazzType type, String fullName, String superClass, String description) {
        this(type, false, fullName, superClass, new ArrayList<String>(), description);
    }
    
    public Clazz(ClazzType type, boolean isAbstract, String fullName, String superClass, List<String> interfaceNames, String description) {
        super(description);
        if (fullName.indexOf('.') == -1) {
            throw new IllegalArgumentException();
        }
        this.type = type;
        this.isAbstract = isAbstract;
        this.fullName = fullName;
        this.superClassFullName = superClass;
        this.interfaceNames = interfaceNames;
        this.interfaces = new ArrayList<Clazz>();
        this.methods = new ArrayList<Method>();
        this.loadtime = new Dependencies();
        this.runtime = new Dependencies();
        this.fields = new ArrayList<Field>();
        this.nativ = null;
        setExtra("@augment " + fullName);
    }

    public boolean isObject() {
        return "Object".equals(fullName);
    }
    
    public String getFullName() {
        return fullName;
    }

    public String getPackage() {
        return fullName.substring(0, fullName.lastIndexOf('.'));
    }
    
    public String getName() {
        return fullName.substring(fullName.lastIndexOf('.') + 1);
    }

    public String getRelativeName(String currentPackage) {
        return currentPackage.equals(getPackage()) ? getName() : getFullName();
    }
    
    public void link(Set doctree) {
        String fullName;
        Clazz c;
        
        if (linked) {
            return;
        }
        linked = true;
        fullName = getSuperClassFullName();
        if (fullName != null) {
            c = doctree.get(fullName);
            c.link(doctree);
            setSuperClass(c);
        }
        for (String s : getInterfaceNames()) {
            c = doctree.get(s);
            c.link(doctree);
            addInterface(c);
        }
        for (Method m : methods) {
            m.link(doctree, this);
        }
    }

    public void addBaseConstructors() {
        List<Method> cs;
        
        cs = getConstructors();
        if (cs.size() > 0 || superClass == null) {
            return;
        }
        superClass.addBaseConstructors();
        cs = superClass.getConstructors();
        for (Method c : cs) {
            add(c.duplicate(this.getName()));
        }
    }

    public List<Method> getConstructors() {
        List<Method> result;
        
        result = new ArrayList<Method>();
        for (Method m : methods) {
            if (m.isConstructor()) {
                result.add(m);
            }
        }
        return result;
    }
    
    public Clazz getSuperClass() {
        return superClass;
    }

    public void setSuperClass(Clazz superClass) {
        if (this.superClass != null) {
            throw new IllegalStateException();
        }
        this.superClass = superClass;
    }
    
    public List<String> getInterfaceNames() {
        return interfaceNames;
    }

    public List<Clazz> getInterfaces() {
        return interfaces;
    }

    public void addInterface(Clazz ifc) {
        interfaces.add(ifc);
    }
    
    public String getSuperClassFullName() {
        return superClassFullName;
    }

    public String getNative() {
        return nativ;
    } 
    
    public void setNative(String nativ) {
        this.nativ = nativ;
    }
    
    public List<Method> methods() {
        return Collections.unmodifiableList(methods);
    }

    public List<Field> fields() {
        return Collections.unmodifiableList(fields);
    }

    public void add(Method method) {
        if (!method.isConstructor() && findMethod(method.getName(), method.isStatic()) != null) {
            throw new IllegalArgumentException(getFullName() + ": duplicate method: " + method.getName());
        }
        methods.add(method);
    }
    
    public Field findField(String name) {
        for (Field p : fields) {
            if (p.getName().equals(name)) {
                return p;
            }
        }
        return null;
    }
    
    public Method findMethod(String name, boolean isStatic) {
        for (Method m : methods) {
            if (m.getName().equals(name) && m.isStatic() == isStatic) {
                return m;
            }
        }
        return null;
    }
    
    public void add(Field property) {
        fields.add(property);
    }

    public void addWithMethods(Field property) {
        add(property);
        if (type == ClazzType.INTERFACE) {
            methods.add(property.createInterfaceGetter());
            methods.add(property.createInterfaceSetter());
        } else {
            methods.add(property.createClassGetter());
            methods.add(property.createClassSetter());
        }
    }

    //--
    
    public void toJava(Node dir) throws IOException {
        StringBuilder builder;
        Node file;
        
        file = getJavaFile(dir);
        file.getParent().mkdirsOpt();
        builder = new StringBuilder(1000);
        toJava(builder);
        file.writeString(builder.toString());
    }

    @Override
    protected void moreExtra(StringBuilder builder) { 
        if (nativ != null) {
            builder.append(" * @native ");
            // put native code first to preserve line numbers! 
            builder.append(nativ);
            builder.append('\n');
            add("require", loadtime, builder);
            add("post", runtime, builder);
        }
    }

    private static void add(String name, Dependencies deps, StringBuilder dest) {
        for (String dep : deps.names()) {
            dest.append("// #").append(name).append("(");
            dest.append(dep);
            dest.append(")\n");
        }
    }

    public String toJava() {
        StringBuilder builder;
        
        builder = new StringBuilder();
        toJava(builder);
        return builder.toString();
    }

    public void toJava(StringBuilder builder) {
        boolean ifc;
        boolean first;
        
        ifc = (type == ClazzType.INTERFACE);
        builder.append("/* Copyright (c) 1&1. All Rights Reserved. */\n");
        builder.append("\n");
        builder.append("// DO NOT EDIT - this file was generated by QWT. \n\n");
        builder.append("package ").append(getPackage()).append(";\n\n");
        builder.append(comment(false));
        builder.append("public ");
        if (isAbstract) {
            builder.append("abstract ");
        }
        builder.append(type.keyword);
        builder.append(' ').append(getName());
        if (superClass != null && !superClass.isObject()) {
            builder.append(" extends ").append(superClass.getRelativeName(getPackage()));
        }
        if (interfaces.size() > 0) {
            builder.append(ifc ? " extends " : " implements ");
            first = true;
            for (Clazz i : interfaces) {
                if (first) {
                    first = false;
                } else {
                    builder.append(", ");
                }
                builder.append(i.getRelativeName(getPackage()));
            }
        }
        builder.append(" {\n");
        if (!ifc) {
            for (Field prop : fields) {
                if (prop.getOverriddenFrom() == null) {
                    prop.toJava(builder);
                    builder.append('\n');
                }
            }
        }            
        first = true;
        for (Method m : methods) {
            if (!m.isStatic() && !m.isAbstract()) {
                if (first) {
                    first = false;
                } else {
                    builder.append('\n');
                }
                m.toJava(builder);
            }
        }
        builder.append("}\n");
    }
    
    public Node getJavaFile(Node dest) {
        return dest.join((getFullName()).replace('.', '/') + ".java");
    }
}
