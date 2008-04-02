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
import org.eclipse.jdt.core.dom.AnnotationTypeDeclaration;
import org.eclipse.jdt.core.dom.AnnotationTypeMemberDeclaration;
import org.eclipse.jdt.core.dom.EnumDeclaration;
import org.eclipse.jdt.core.dom.Expression;
import org.eclipse.jdt.core.dom.FieldDeclaration;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.Initializer;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.Modifier;
import org.eclipse.jdt.core.dom.SingleVariableDeclaration;
import org.eclipse.jdt.core.dom.TypeDeclaration;
import org.eclipse.jdt.core.dom.VariableDeclarationFragment;

import org.qooxdoo.toolkit.repository.Chunk;
import org.qooxdoo.toolkit.repository.Importer;
import org.qooxdoo.toolkit.repository.Module;

/** Translates a Java Type into a JavaScript modules, creates new-instances to translate nested types. */
public class TypeCompiler {
    public static void run(Context context, AbstractTypeDeclaration type) {
        Module module;
        
        module = context.lookup(type);
        if (module == null) {
            throw new IllegalStateException();
        }
        new TypeCompiler(context, module).abstractTypeDeclaration(type);
    }

    //--

    private final Context context;
    private final Module module;
    
    private TypeCompiler(Context context, Module module) {
        this.context = context;
        this.module = module;
    }
    
    /** main method, this is where the module is generated */
    public void abstractTypeDeclaration(AbstractTypeDeclaration type) {
        ITypeBinding superclass;
        Chunk head;
        MethodCompiler c;
        
        c = new MethodCompiler(context);
        if (type instanceof TypeDeclaration) {
            c.defineClass((TypeDeclaration) type);
        } else if (type instanceof EnumDeclaration) {
            c.defineEnum((EnumDeclaration) type);
        } else if (type instanceof AnnotationTypeDeclaration) {
            // do nothing
        } else {
            throw new UnsupportedOperationException(type.getClass().getName());
        }
        head = module.head();
        addChunk(head, c);
        superclass = type.resolveBinding().getSuperclass();
        if (superclass != null) {
            head.deps.add(context.getNaming().typeQualified(superclass));
        } else if (module.getName().equals(Naming.OBJECT)) {
            head.deps.add(Naming.ROOT);
        } else {
            // implicit base
            head.deps.add(Naming.OBJECT);
        }
        for (ITypeBinding ifc : type.resolveBinding().getInterfaces()) {
            head.deps.add(context.getNaming().typeQualified(ifc));
        }

        bodyDeclarationsNormal(type);
        bodyDeclarationsInitializer(type);
    }

    private void bodyDeclarationsNormal(AbstractTypeDeclaration typeDecl) {
        for (Object decl : typeDecl.bodyDeclarations()) {
            if (decl instanceof FieldDeclaration) {
                fieldDeclaration((FieldDeclaration) decl, true, module.head());
            } else if (decl instanceof Initializer) {
                // skipped
            } else if (decl instanceof MethodDeclaration) {
                methodDeclaration((MethodDeclaration) decl);
            } else if (decl instanceof AnnotationTypeMemberDeclaration) {
                // ignored
            } else if (decl instanceof AbstractTypeDeclaration) {
                TypeCompiler.run(context, (AbstractTypeDeclaration) decl);
            } else {
                throw new UnsupportedOperationException(decl.getClass().toString());
            }
        }
    }

    private void bodyDeclarationsInitializer(AbstractTypeDeclaration typeDecl) {
        boolean empty;
        Chunk tmp;
        String name;
        Chunk cinit;
        
        empty = true;
        tmp = module.createCinit();
        name = Naming.type(typeDecl.resolveBinding());
        tmp.addCode(name + "." + Naming.CINIT + "= function() {\n");
        for (Object decl : typeDecl.bodyDeclarations()) {
            if (decl instanceof FieldDeclaration) {
                if (fieldDeclaration((FieldDeclaration) decl, false, tmp)) {
                    empty = false;
                }
            } else if (decl instanceof Initializer) {
                empty = false;
                initializer((Initializer) decl, tmp);
            }
        }
        if (!empty) {
            tmp.addCode("}\n");
            cinit = module.getCinit();
            if (cinit == null) {
                module.add(tmp);
            } else {
                cinit.addCode(tmp.getCode());
            }
        }
    }

    public void initializer(Initializer init, Chunk dest) {
        StatementCompiler c;
        
        c = new StatementCompiler(context);
        c.statement(init.getBody());
        c.deps().remove(module.getName());
        addChunk(dest, c);
    }

    public void methodDeclaration(MethodDeclaration methodDecl) {
        String name;
        StatementCompiler c;
        Chunk chunk;
        IMethodBinding b;
        
        b = methodDecl.resolveBinding();
        // one chunk for every method, even for native methods without code!
        c = doMethodDeclaration(methodDecl);
        name = context.getNaming().methodQualified(b);
        chunk = new Chunk(name, "");
        addOverridden(b.getDeclaringClass(), b, chunk.vnames);
        chunk.vnames.remove(name);
        module.add(chunk);
        addChunk(chunk, c);
    }

    private void addOverridden(ITypeBinding type, IMethodBinding method, List<String> result) {
        ITypeBinding superclass;
        String name;
        
        for (IMethodBinding baseMethod : type.getDeclaredMethods()) {
            if (method.overrides(baseMethod) || method.isSubsignature(baseMethod)) {
                name = context.getNaming().methodQualified(baseMethod);
                if (!result.contains(name)) {
                    result.add(name);
                }
            }
        }
        superclass = type.getSuperclass();
        if (superclass != null) {
            addOverridden(superclass, method, result);
        }
        for (ITypeBinding base : type.getInterfaces()) {
            addOverridden(base, method, result);
        }
    }

    private StatementCompiler doMethodDeclaration(MethodDeclaration methodDecl) {
        StatementCompiler c;
        AbstractTypeDeclaration typeDecl;
        boolean first;
        Importer importer;
        
        c = new StatementCompiler(context);
        if (Util.getAnnotationAlias(methodDecl)) {
            if (methodDecl.isConstructor()) {
                Problem.attach(methodDecl, "constructor cannot alias");
            } else {
                if (!Modifier.isNative(methodDecl.getModifiers())) {
                    Problem.attach(methodDecl, "native expected");
                }
            }
            // do not generate code
            return c;
        }
        typeDecl = Util.getType(methodDecl);
        if ((methodDecl.isConstructor() || Util.isAbstract(methodDecl)) && Util.getAnnotationAugment(typeDecl) != null) {
            // do not generate code
            return c;
        }
        c.referType(methodDecl.resolveBinding().getReturnType());
        c.js.append(Naming.type(typeDecl));
        if (methodDecl.isConstructor() || Modifier.isStatic(methodDecl.getModifiers())) {
            c.js.append('.');
        } else {
            c.js.append(".prototype.");
        }
        c.js.append(context.getNaming().methodSimple(methodDecl.resolveBinding()));
        if (Util.isAbstract(methodDecl)) {
            c.js.append(" = ABSTRACT;");
        } else {
            c.js.append(" = function(");
            first = true;
            for (Object arg : methodDecl.parameters()) {
                if (first) {
                    first = false;
                } else {
                    c.js.append(", ");
                }
                c.js.append(Naming.variable(((SingleVariableDeclaration) arg).resolveBinding()));
            }
            c.js.append(") ");
            importer = Util.getAnnotationNative(methodDecl);
            if (importer != null) {
                importer.require(module.head().deps.names());
                importer.post(c.deps().names());
                c.js.open();
                c.js.append(importer.content);
                c.js.close();
            } else {
                if (methodDecl.getBody() == null) {
                    throw new IllegalStateException("empty body " + methodDecl.getName());
                }
                c.statement(methodDecl.getBody());
            }
        }
        return c;
    }
    
    /**
     * @param declare false -> define 
     * @return true if code was generated 
     */
    public boolean fieldDeclaration(FieldDeclaration fieldDecl, boolean declare, Chunk dest) {
        String ref;
        VariableDeclarationFragment vdf;
        Expression expr;
        ExpressionCompiler ec;
        String name;
        boolean result;
        
        result = false;
        if (Util.getAnnotationAlias(fieldDecl)) {
            if (declare) {
                for (Object f: fieldDecl.fragments()) {
                    vdf = (VariableDeclarationFragment) f;
                    if (vdf.getInitializer() != null) {
                        Problem.attach(vdf, "alias field cannot have initializer");
                    }
                }
            } else {
                // nothing - to not perform checks twice
            }
            // do not generate code
            return result;
        }
        ref = Naming.type(Util.getType(fieldDecl)) + ".";
        if (!Util.isStatic(fieldDecl)) {
            ref = ref + "prototype.";
        }
        for (Object f: fieldDecl.fragments()) {
            vdf = (VariableDeclarationFragment) f;
            expr = vdf.getInitializer();
            if (declare || expr != null) {
                result = true;
                ec = new ExpressionCompiler(context);
                name = context.getNaming().fieldSimple(vdf.resolveBinding());
                // extra dimensions ok -- it's just a declaration
                ec.js.append(ref);
                ec.js.append(name);
                ec.js.append(" = ");
                if (expr == null || declare) {
                    ec.js.append(Util.getDefaultValue(fieldDecl.getType().resolveBinding()));
                } else {
                    ec.expr(expr);
                }
                ec.js.append(";");
                ec.js.newline();
                addChunk(dest, ec);
            }
        }
        return result;
    }

    //--

    private Chunk addChunk(Chunk dest, ExpressionCompiler c) {
        dest.deps.addAll(c.deps());
        dest.addCode(c.js.toString());
        return dest;
    }
}
