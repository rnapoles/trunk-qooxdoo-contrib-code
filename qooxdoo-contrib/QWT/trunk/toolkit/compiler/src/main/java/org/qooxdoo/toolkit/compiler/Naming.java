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

package org.qooxdoo.toolkit.compiler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.eclipse.jdt.core.dom.AbstractTypeDeclaration;
import org.eclipse.jdt.core.dom.IBinding;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.IVariableBinding;
import org.eclipse.jdt.core.dom.Modifier;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.toolkit.repository.Module;
import org.qooxdoo.toolkit.repository.Repository;

public class Naming {
    /**
     * A dependency to this module is added to the object module. Thus, code in this module
     * is available everywhere, it's the first code loaded.
     */
    public static final String ROOT = "toolkit.root";
    /** 
     * A dependency to this module is added to all classes without explicit superclass.
     */
    public static final String OBJECT = "java.lang.Object";

    public static final String STRING = "java.lang.String";

    public static final String CINIT = "cinit";

    public static Repository createRootRepository(IO io) {
        Repository result;
        Module root;

        result = new Repository();
        try {
            root = Module.fromString(Module.getNode(io.node("resource:"), ROOT).readString());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        result.add(root);
        return result;
    }
    
    
    /* Object is IMethodBinding or IVariableBinding */
    private Map<ITypeBinding, Map<IBinding, String>> map;

    public Naming() {
        map = new HashMap<ITypeBinding, Map<IBinding, String>>();
    }

    public static String variable(IVariableBinding variable) {
        return createName(variable.getName());
    }

    //--
    
    /** @return name as used in references */
    public String typeQualified(ITypeBinding type) {
        if (isIgnored(type)) {
            return null;
        }
        return Naming.module(type);
    }

    /** @return name as used in JavaScript */
    public static String type(AbstractTypeDeclaration typeDecl) {
        return type(typeDecl.resolveBinding());
    }

    /** @return name as used in JavaScript */
    public static String type(ITypeBinding type) {
        return module(type);
    }

    // TODO: dump?
    /** @return name as used in JavaScript */
    public static String module(String type) {
        return type;
    }
    //--
    
    public String fieldSimple(IVariableBinding field) {
        if (field.getDeclaringClass() == null) {
            // "TODO: is this a native field");
            return field.getName();
        }
        return member(field.getDeclaringClass().getErasure(), field);
    }

    public String fieldQualified(IVariableBinding binding) {
        ITypeBinding type;
        
        type = binding.getDeclaringClass();
        if (type == null) {
            // TODO: is this always the array length?
            return null;
        }
        if (isIgnored(type)) {
            return null;
        }
        return Naming.module(type) + Module.SEP + fieldSimple(binding);
    }

    //--
    
    public String methodSimple(IMethodBinding method) {
        return member(method.getDeclaringClass().getErasure(), method);
    }

    public String methodQualified(IMethodBinding binding) {
        return Naming.module(binding.getDeclaringClass()) + Module.SEP + methodSimple(binding);
    }

    
    //--

    private static String module(ITypeBinding type) {
        return createName(type.getBinaryName());
    }

    private String member(ITypeBinding type, IBinding member) {
        Map<IBinding, String> names;

        names = names(type);
        for (IBinding key : names.keySet()) {
            if (eq(key, member)) {
                return names.get(key);
            }
        }
        throw new IllegalStateException(member.toString() + " in " + names);
    }

    private Map<IBinding, String> names(ITypeBinding type) {
        Map<IBinding, String> names;

        names = map.get(type);
        if (names == null) {
            names = createNames(type);
            map.put(type, names);
        }
        return names;
    }

    private static boolean eq(IBinding left, IBinding right) {
        IMethodBinding mleft;
        IMethodBinding mright;
        ITypeBinding[] pleft;
        ITypeBinding[] pright;
        
        if (left.getKind() != right.getKind()) {
            return false;
        }
        if (!stripTypeParameter(left.getName()).equals(stripTypeParameter(right.getName()))) {
            return false;
        }
        if (left instanceof IVariableBinding) {
            return true;
        }
        mleft = (IMethodBinding) left;
        mright = (IMethodBinding) right;
        if (!eq(mleft.getReturnType(), mright.getReturnType())) {
            return false;
        }
        pleft = mleft.getParameterTypes();
        pright = mright.getParameterTypes();
        if (pleft.length != pright.length) {
            return false;
        }
        for (int i = 0; i < pleft.length; i++) {
            if (!eq(pleft[i], pright[i])) {
                return false;
            }
        }
        return true;
    }

    private static boolean eq(ITypeBinding left, ITypeBinding right) {
        while (left.isArray()) {
            if (!right.isArray()) {
                return false;
            }
            left = left.getComponentType();
            right = right.getComponentType();
        }
        if ((left.isTypeVariable() && !right.isPrimitive()) || (right.isTypeVariable() && !left.isPrimitive())) {
            // TODO
            return true;
        }
        return left.getErasure().isEqualTo(right.getErasure());
    }
    
    private Map<IBinding, String> createNames(ITypeBinding type) {
        Map<IBinding, String> names;
        List<String> existing;
        String name;
        
        existing = new ArrayList<String>();
        existingNames(type, existing, new ArrayList<ITypeBinding>());
        names = new HashMap<IBinding, String>();
        for (IBinding obj : type.getDeclaredMethods()) {
            name = basename(anchestors(type), (IMethodBinding) obj);
            if (name != null) {
                names.put(obj, name);
                existing.add(name);
            }
        }
        for (IBinding obj : type.getDeclaredFields()) {
            name = createName(obj, existing);
            existing.add(name);
            names.put(obj, name);
        }
        for (IBinding obj : type.getDeclaredMethods()) {
            name = basename(anchestors(type), (IMethodBinding) obj);
            if (name == null) {
                
                if (/* TODO: */ !obj.getName().equals("length") 
                        && Modifier.isNative(((IMethodBinding) obj).getModifiers())) {
                    name = obj.getName();
                } else {
                    name = createName(obj, existing);
                }
                existing.add(name);
                names.put(obj, name);
            }
        }
        return names;
    }
    
    private void existingNames(ITypeBinding type, List<String> existing, List<ITypeBinding> done) {
        ITypeBinding superclass;
        
        if (done.contains(type)) {
            return;
        }
        done.add(type);
        superclass = type.getSuperclass();
        if (superclass != null) {
            existing.addAll(names(superclass).values());
            existingNames(superclass, existing, done);
        }
        for (ITypeBinding ifc : type.getInterfaces()) {
            existing.addAll(names(ifc).values());
            existingNames(ifc, existing, done);
        }
    }

    /** @return null if method does not override */
    private String basename(List<ITypeBinding> all, IMethodBinding method) {
        IMethodBinding orig;
        String name;
        
        for (ITypeBinding type : all) {
            for (IBinding obj : type.getDeclaredMethods()) {
                orig = (IMethodBinding) obj;
                if (method.overrides(orig) || method.isSubsignature(orig)) {
                    return member(type, orig);
                }
            }
            name = basename(anchestors(type), method);
            if (name != null) {
                return name;
            }
        }
        return null;
    }

    private List<ITypeBinding> anchestors(ITypeBinding type) {
        List<ITypeBinding> result;
        ITypeBinding superclass;
        
        result = new ArrayList<ITypeBinding>();
        superclass = type.getSuperclass();
        if (superclass != null) {
            result.add(superclass);
        }
        result.addAll(Arrays.asList(type.getInterfaces()));
        return result;
    }
    
    private static String createName(Object obj, Collection<String> existing) {
        String original;
        
        if (obj instanceof IMethodBinding) {
            original = getOrig((IMethodBinding) obj);
        } else {
            original = getOrig((IVariableBinding) obj);
        }
        return createName(original, existing);
    }

    private static String createName(String original) {
        return createName(original, Collections.<String>emptyList());
    }

    private static String createName(String original, Collection<String> existing) {
        String name;
        
        if (validName(original, existing)) {
            return original;
        }
        for (int i = 1; true; i++) {
            name = original + i;
            if (!existing.contains(name)) {
                return name;
            }
        }
    }
    
    // keywords, null literal, boolean literals
    // as of ecma-262, 3rd edition
    private static final List<String> KEYWORDS = Arrays.asList("abstract",
            "boolean", "break", "byte", "case", "catch", "char", "class",
            "const", "continue", "default", "delete", "do", "debugger", "double", "else",
            "enum", "export", "extends", "false", "final", "finally", "float", "for", "function",
            "goto", "if", "implements", "import", "in", "instanceof" + "int",
            "interface", "long", "native", "new", "null", "package", "private",
            "protected", "public", "return", "short", "static", "super",
            "switch", "synchronized", "this", "throw", "throws", "transient",
            "true", "try", "typeof", "var", "void", "volatile", "while", "with",
            
            // names reserved for QWT
            CINIT
    );
    
    private static boolean validName(String original, Collection<String> existing) {
        if (existing.contains(original)) {
            return false;
        }
        if (KEYWORDS.contains(original)) {
            return false;
        }
        return true;
    }

    private static String getOrig(IMethodBinding method) {
        return method.isConstructor() ? "init" : ("length".equals(method.getName())? "length1" : method.getName());
    }

    private static String getOrig(IVariableBinding var) {
        return var.getName();
    }
    
    // --
    
    // cannot be private to allow method testing
    protected static String stripTypeParameter(String name) {
        StringBuffer buffer;
        int last;
        int idx;
        
        last = 0;
        buffer = new StringBuffer();
        while (true) {
            idx = name.indexOf('<', last);
            if (idx == -1) {
                buffer.append(name.substring(last));
                return buffer.toString();
            }
            buffer.append(name.substring(last, idx));
            last = end(name, idx);
            if (last == -1) {
                throw new IllegalArgumentException(name);
            }
            last++;
        }
    }

    private static int end(String str, int idx) {
        int count;
        int max;

        max = str.length();
        count = 0;
        while (idx < max) {
            switch (str.charAt(idx)) {
            case '<':
                count++;
                break;
            case '>':
                count--;
                if (count == 0) {
                    return idx;
                }
            default:
                // nothing
            }
            idx++;
        }
        return -1;
    }
    
    private static boolean isIgnored(ITypeBinding type) {
        return type.isArray() || type.isPrimitive() || type.isTypeVariable();
    }

}
