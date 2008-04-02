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

import java.util.List;

import org.eclipse.jdt.core.dom.AbstractTypeDeclaration;
import org.eclipse.jdt.core.dom.Block;
import org.eclipse.jdt.core.dom.ConstructorInvocation;
import org.eclipse.jdt.core.dom.EnumConstantDeclaration;
import org.eclipse.jdt.core.dom.EnumDeclaration;
import org.eclipse.jdt.core.dom.IPackageBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.Statement;
import org.eclipse.jdt.core.dom.SuperConstructorInvocation;

import org.qooxdoo.sushi.util.Strings;

/** Translates a Java Type into a JavaScript modules, creates new-instances to translate nested types. */
public class MethodCompiler extends StatementCompiler {
    public MethodCompiler(Context context) {
        super(context);
    }
    
    public void defineEnum(EnumDeclaration enumDecl) {
        String name;
        EnumConstantDeclaration ec;
        
        // constructors first
        defineClass(enumDecl);
        name = Naming.type(enumDecl);
        for (Object decl : enumDecl.enumConstants()) {
            ec = (EnumConstantDeclaration) decl;
            js.append(name + "." + ec.getName().getIdentifier()); 
            js.append(" = new " + name + "(");
            expressions(ec.arguments());
            js.append(");");
            js.newline();
            // TODO: anonymous class decl
        }
    }

    private void touchPackage(IPackageBinding pkg) {
        List<String> segments;
        boolean first;
        
        segments = Strings.split(".", pkg.getName());
        if (segments.size() == 0) {
            return;
        }
        js.append("touchPackage(");
        first = true;
        for (String seg : segments) {
            if (first) {
                first = false;
            } else {
                js.append(", ");
            }
            js.append('"');
            js.append(seg);
            js.append('"');
        }
        js.append(");\n");
    }

    public void defineClass(AbstractTypeDeclaration typeDecl) {
        String augment;
        ITypeBinding thisclass;
        String name;
        ITypeBinding superclass;

        thisclass = typeDecl.resolveBinding();
        name = Naming.type(thisclass);
        augment = getAnnotationAugment(typeDecl);
        touchPackage(thisclass.getPackage());
        if (augment != null) {
            checkConstructorsWithoutLogic(typeDecl);
            augment = augment.trim();

            js.append(name);
            js.append(" = ");
            js.append(augment);
            js.append(';');
            js.newline();
        } else if (hasParentThis(thisclass)) {
            js.append(name, "= function(", PARENT_THIS, ") ");
            js.open();
            js.append("this.", PARENT_THIS, "=", PARENT_THIS, ";").newline();
            superCall(typeDecl);
            js.close();
        } else {
            js.append(name, "= function() ");
            js.open();
            superCall(typeDecl);
            js.close();
        }

        js.append("defineClass(");
        js.append(name);
        js.append(", '");
        js.append(context.getNaming().typeQualified(thisclass));
        js.append("', ");
        superclass = thisclass.getSuperclass();
        if (superclass == null) {
            // typeDecl is an interface or java.lang.Object 
            js.append("null");
        } else if (augment != null) {
            // augmented code takes card about base definition
            js.append("null");
        } else {
            js.append(Naming.type(superclass));
        }
        for (ITypeBinding ifc : typeDecl.resolveBinding().getInterfaces()) {
            js.append(", ");
            js.append(Naming.type(ifc));
        }
        js.append(");");
        js.newline();
    }
    
    private void superCall(AbstractTypeDeclaration typeDecl) {
        // TODO
    }

    private static void checkConstructorsWithoutLogic(AbstractTypeDeclaration typeDecl) {
        MethodDeclaration methodDecl;

        for (Object decl : typeDecl.bodyDeclarations()) {
            if (decl instanceof MethodDeclaration) {
                methodDecl = (MethodDeclaration) decl;
                if (methodDecl.isConstructor()) {
                    if (hasLogic(methodDecl.getBody())) {
                        Problem.attach(methodDecl, "constructor in augmenting class cannot have logic");
                    }
                }
            }
        }
    }
    
    private static boolean hasLogic(Block block) {
        Statement stmt;
        
        for (Object obj : block.statements()) {
            stmt = (Statement) obj;
            if (stmt instanceof ConstructorInvocation) {
                // ok
            } else if (stmt instanceof SuperConstructorInvocation) {
                // ok
            } else {
                return true;
            }
        }
        return false;
    }
}
