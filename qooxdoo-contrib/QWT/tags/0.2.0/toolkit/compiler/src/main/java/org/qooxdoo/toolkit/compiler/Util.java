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

package org.qooxdoo.toolkit.compiler;

import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.AbstractTypeDeclaration;
import org.eclipse.jdt.core.dom.BodyDeclaration;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.Javadoc;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.Modifier;
import org.eclipse.jdt.core.dom.TagElement;
import org.eclipse.jdt.core.dom.TypeDeclaration;

import org.qooxdoo.toolkit.repository.Importer;

public abstract class Util {
    public static boolean isDirect(AbstractTypeDeclaration typeDecl) {
        return getAnnotationAugment(typeDecl) != null || !hasConstructor(typeDecl);
    }

    public static boolean hasConstructor(AbstractTypeDeclaration typeDecl) {
        MethodDeclaration methodDecl;

        for (Object decl : typeDecl.bodyDeclarations()) {
            if (decl instanceof MethodDeclaration) {
                methodDecl = (MethodDeclaration) decl;
                if (methodDecl.isConstructor()) {
                    return true;
                }
            }
        }
        return false;
    }
    
    public static boolean getAnnotationAlias(BodyDeclaration decl) {
        return getAnnotation(decl, "@alias") != null;
    }

    public static String getAnnotationAugment(BodyDeclaration decl) {
        return getAnnotation(decl, "@augment");
    }

    public static Importer getAnnotationNative(BodyDeclaration decl) {
        String code;
        
        code = getAnnotation(decl, "@native");
        return code == null ? null : new Importer(code);
    }
    
    public static String getAnnotation(BodyDeclaration decl, String annotation) {
        Javadoc javadoc;
        TagElement tag;
        String src;
        int idx;
        
        javadoc = decl.getJavadoc();
        if (javadoc == null) {
            return null;
        }
        for (Object obj : javadoc.tags()) {
            tag = (TagElement) obj;
            if (annotation.equals(tag.getTagName())) {
                src = Problem.getSource(tag);
                idx = src.indexOf(annotation);
                if (idx == -1) {
                    throw new IllegalStateException(annotation);
                }
                src = src.substring(idx + annotation.length());
                return annotationUnescape(src);
            }
        }
        return null;
    }

    
    public static AbstractTypeDeclaration getType(ASTNode node) {
        while (true) {
            if (node == null) {
                return null;
            } else if (node instanceof AbstractTypeDeclaration) {
                return (AbstractTypeDeclaration) node;
            } else {
                node = node.getParent();
            }
        }
    }

    public static boolean isStatic(BodyDeclaration fieldDecl) {
        AbstractTypeDeclaration typeDecl;
        
        if (Modifier.isStatic(fieldDecl.getModifiers())) {
            return true;
        }
        typeDecl = getType(fieldDecl);
        if ((typeDecl instanceof TypeDeclaration) && ((TypeDeclaration) typeDecl).isInterface()) {
            return true;
        }
        return false;
    }
    
    public static boolean isAbstract(MethodDeclaration methodDecl) {
        AbstractTypeDeclaration typeDecl;
        
        if (Modifier.isAbstract(methodDecl.getModifiers())) {
            return true;
        }
        typeDecl = getType(methodDecl);
        if ((typeDecl instanceof TypeDeclaration) && ((TypeDeclaration) typeDecl).isInterface()) {
            return true;
        }
        return false;
    }
    
    public static final String PARENT_THIS = "__parent_this";

    public static boolean hasParentThis(ITypeBinding type) {
        return type.isMember() && !Modifier.isStatic(type.getModifiers());        
    }

    public static boolean isSuperclassStar(ITypeBinding parent, ITypeBinding child) {
        while (parent != null) {
            if (parent.getErasure().equals(child.getErasure())) {
                return true;
            }
            parent = parent.getSuperclass();
        }
        return false;
    }
    
    public static String getDefaultValue(ITypeBinding type) {
        String name;
        
        if (!type.isPrimitive()) {
            return "null";
        }
        name = type.getQualifiedName();
        if (name.equals("int") || name.equals("long") || name.equals("byte") || name.equals("double") || name.equals("fload")) {
            return "0";
        } else if (name.equals("boolean")) {
            return "true";
        } else if (name.equals("char")) {
            return "'\\u0000'";
        } else if (name.equals("float") || name.equals("double")) {
            return "0.0";
        } else {
            throw new IllegalStateException("unkown primitive type: " + name);
        }
    }
    
    //--
    
    public static String annotationEscape(String str) {
        StringBuilder builder;
        int max;
        char c;
        
        max = str.length();
        builder = new StringBuilder(max);
        for (int i = 0; i < max; i++) {
            c = str.charAt(i);
            switch (c) {
            case '$':
                builder.append("$$");
                break;
            case '@':
                builder.append("$a");
                break;
            case '/':
                builder.append("$s");
                break;
            case '<':
                builder.append("$l");
                break;
            default:
                builder.append(c);
                break;
            }
        }
        return builder.toString();
    }
    
    public static String annotationUnescape(String str) {
        StringBuilder builder;
        int max;
        char c;
        
        max = str.length();
        builder = new StringBuilder(max);
        for (int i = 0; i < max; i++) {
            c = str.charAt(i);
            if (c == '$') {
                c = str.charAt(++i);
                switch (c) {
                case '$':
                    builder.append('$');
                    break;
                case 'a':
                    builder.append('@');
                    break;
                case 's':
                    builder.append('/');
                    break;
                case 'l':
                    builder.append('<');
                    break;
                default:
                    throw new IllegalArgumentException("" + c);
                }
            } else {
                builder.append(c);
            }
        }
        return builder.toString();
    }
}
