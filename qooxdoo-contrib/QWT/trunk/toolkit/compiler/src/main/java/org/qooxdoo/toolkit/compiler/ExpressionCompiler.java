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

import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.ArrayAccess;
import org.eclipse.jdt.core.dom.ArrayCreation;
import org.eclipse.jdt.core.dom.ArrayInitializer;
import org.eclipse.jdt.core.dom.Assignment;
import org.eclipse.jdt.core.dom.BooleanLiteral;
import org.eclipse.jdt.core.dom.CastExpression;
import org.eclipse.jdt.core.dom.CharacterLiteral;
import org.eclipse.jdt.core.dom.ClassInstanceCreation;
import org.eclipse.jdt.core.dom.ConditionalExpression;
import org.eclipse.jdt.core.dom.Expression;
import org.eclipse.jdt.core.dom.FieldAccess;
import org.eclipse.jdt.core.dom.IBinding;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.IVariableBinding;
import org.eclipse.jdt.core.dom.InfixExpression;
import org.eclipse.jdt.core.dom.InstanceofExpression;
import org.eclipse.jdt.core.dom.MethodInvocation;
import org.eclipse.jdt.core.dom.Modifier;
import org.eclipse.jdt.core.dom.NullLiteral;
import org.eclipse.jdt.core.dom.NumberLiteral;
import org.eclipse.jdt.core.dom.ParenthesizedExpression;
import org.eclipse.jdt.core.dom.PostfixExpression;
import org.eclipse.jdt.core.dom.PrefixExpression;
import org.eclipse.jdt.core.dom.QualifiedName;
import org.eclipse.jdt.core.dom.SimpleName;
import org.eclipse.jdt.core.dom.StringLiteral;
import org.eclipse.jdt.core.dom.SuperMethodInvocation;
import org.eclipse.jdt.core.dom.ThisExpression;
import org.eclipse.jdt.core.dom.TypeLiteral;
import org.eclipse.jdt.core.dom.VariableDeclarationExpression;
import org.eclipse.jdt.core.dom.VariableDeclarationFragment;

import org.qooxdoo.toolkit.repository.Dependencies;

public class ExpressionCompiler extends Util {
    protected final Context context;
    protected final JavaScript js;
    private final Dependencies deps;

    protected ExpressionCompiler(Context context) {
        this.context = context;
        this.js = new JavaScript();
        this.deps = new Dependencies();
    }

    public void referMethod(IMethodBinding binding) {
        deps.addOpt(context.getNaming().methodQualified(binding));
    }

    public void referField(IVariableBinding binding) {
        deps.addOpt(context.getNaming().fieldQualified(binding));
    }

    public void referType(ITypeBinding binding) {
        deps.addOpt(context.getNaming().typeQualified(binding));
    }

    public Dependencies deps() {
        return deps;
    }

    //--
    
    public void expr(Expression expr) {
        if (expr instanceof BooleanLiteral) {
            booleanLiteral((BooleanLiteral) expr);
        } else if (expr instanceof NullLiteral) {
            nullLiteral((NullLiteral) expr);
        } else if (expr instanceof NumberLiteral) {
            numberLiteral((NumberLiteral) expr);
        } else if (expr instanceof CharacterLiteral) {
            characterLiteral((CharacterLiteral) expr);
        } else if (expr instanceof StringLiteral) {
            stringLiteral((StringLiteral) expr);
        } else if (expr instanceof TypeLiteral) {
            typeLiteral((TypeLiteral) expr);
            
        } else if (expr instanceof ClassInstanceCreation) {
            classInstanceCreation((ClassInstanceCreation) expr);
        } else if (expr instanceof ArrayCreation) {
            arrayCreation((ArrayCreation) expr);
        } else if (expr instanceof ArrayInitializer) {
            arrayInitializer((ArrayInitializer) expr);
        } else if (expr instanceof ArrayAccess) {
            arrayAccess((ArrayAccess) expr);
        } else if (expr instanceof MethodInvocation) {
            methodInvocation((MethodInvocation) expr);
        } else if (expr instanceof Assignment) {
            assignment((Assignment) expr);
        } else if (expr instanceof InfixExpression) {
            infixExpression((InfixExpression) expr);
        } else if (expr instanceof PostfixExpression) {
            postfix((PostfixExpression) expr);
        } else if (expr instanceof PrefixExpression) {
            prefix((PrefixExpression) expr);
        } else if (expr instanceof VariableDeclarationExpression) {
            variableDeclarationExpr((VariableDeclarationExpression) expr);
        } else if (expr instanceof ParenthesizedExpression) {
            parathesized((ParenthesizedExpression) expr);
        } else if (expr instanceof CastExpression) {
            cast((CastExpression) expr);
        } else if (expr instanceof FieldAccess) {
            fieldAccess((FieldAccess) expr);
        } else if (expr instanceof ThisExpression) {
            thiS((ThisExpression) expr);
        } else if (expr instanceof SimpleName) {
            simpleName((SimpleName) expr);
        } else if (expr instanceof QualifiedName) {
            qualifiedName((QualifiedName) expr);
        } else if (expr instanceof ConditionalExpression) {
            conditional((ConditionalExpression) expr);
        } else if (expr instanceof InstanceofExpression) {
            instanceoF((InstanceofExpression) expr);
        } else if (expr instanceof SuperMethodInvocation) {
            superMethodInvocation((SuperMethodInvocation) expr);
        } else {
            throw new IllegalArgumentException(expr.getClass().getName());
        }
    }

    public void expressionsTail(List<?> lst) {
        for (Object obj : lst) {
            js.append(", ");
            expr((Expression) obj);
        }
    }

    public void expressions(List<?> lst) {
        boolean first;
        
        first = true;
        for (Object obj : lst) {
            if (first) {
                first = false;
            } else {
                js.append(", ");
            }
            expr((Expression) obj);
        }
    }
    
    //-- literals
    
    private void typeLiteral(TypeLiteral literal) {
        ITypeBinding type;
        
        type = literal.getType().resolveBinding();
        referType(type);
        js.append(Naming.type(type) + ".metadata");
    }

    private void nullLiteral(NullLiteral literal) {
        js.append("null");
    }
    
    private void booleanLiteral(BooleanLiteral literal) {
        js.append(literal.booleanValue() ? "true" : "false");
    }
    
    private void numberLiteral(NumberLiteral literal) {
        js.append(literal.resolveConstantExpressionValue().toString());
    }
    
    private void characterLiteral(CharacterLiteral literal) {
        Character ch;
        
        ch = (Character) literal.resolveConstantExpressionValue();
        js.append("" + (int) ch.charValue());
    }
    
    private void stringLiteral(StringLiteral literal) {
        deps.add(Naming.STRING);
        // do not create an Objekt - JavaScript will do this on demand
        js.append(literal.getEscapedValue());
    }
    
    //--
    
    private void parathesized(ParenthesizedExpression p) {
        js.append('(');
        expr(p.getExpression());
        js.append(')');
    }

    private void instanceoF(InstanceofExpression i) {
        ITypeBinding type;
        String name;
        
        type = i.getRightOperand().resolveBinding();
        if (type.isArray()) {
            throw new UnsupportedOperationException("TODO: " + type.toString());
        }
        referType(type);
        name = Naming.type(type);
        if (type.isInterface()) {
            js.append("instanceofInterface(");
            expr(i.getLeftOperand());
            js.append(", ");
            js.append(name);
            js.append(")");
        } else if (name.equals("java.lang.String")) {
            // TODO
            js.append('(');
            js.append('(');
            js.append("typeof ");
            expr(i.getLeftOperand());
            js.append(')');
            js.append(" === ");
            js.append("'string'");
            js.append(')');
        } else if (name.equals("java.lang.Object")) {
            js.append("true");
        } else {
            expr(i.getLeftOperand());
            js.append(" instanceof ");
            js.append(name);
        }
    }
    private void conditional(ConditionalExpression c) {
        expr(c.getExpression());
        js.append(" ? ");
        expr(c.getThenExpression());
        js.append(" : ");
        expr(c.getElseExpression());
    }

    private void thiS(ThisExpression t) {
        js.append("this");
    }

    private void simpleName(SimpleName name) {
        IBinding tmp;
        IVariableBinding binding;
        
        tmp = name.resolveBinding();
        if (!(tmp instanceof IVariableBinding)) {
            throw new UnsupportedOperationException(name.toString() + ": " + tmp.getClass().getName());
        }
        binding = (IVariableBinding) name.resolveBinding();
        if (binding.isField()) {
            referField(binding);
            if (Modifier.isStatic(binding.getModifiers())) {
                js.append(Naming.type(binding.getDeclaringClass()));
            } else {
                thisRef(binding.getDeclaringClass(), name);
            }
            js.append(".", context.getNaming().fieldSimple(binding));
        } else {
            js.append(Naming.variable(binding));
        }
    }
        
    private void qualifiedName(QualifiedName qn) {
        IBinding left;
        IVariableBinding right;
        
        left = qn.getQualifier().resolveBinding();
        if (left instanceof ITypeBinding) {
            referType((ITypeBinding) left);
            js.append(Naming.type((ITypeBinding) left));
        } else if (left instanceof IVariableBinding) {
            IVariableBinding vb = (IVariableBinding) left;
            if (vb.isField()) {
                referField(vb);
            }
            if (Modifier.isStatic(vb.getModifiers())) {
                js.append(Naming.type(vb.getDeclaringClass()));
                js.append('.');
            } else if (vb.isField()) {
                thisRef(vb.getDeclaringClass(), qn);
                js.append('.');
            } else {
                // nothing
            }
            js.append(Naming.variable(vb));
        } else {
            throw new UnsupportedOperationException(qn + ":" + left.getClass().getName());
        }
        js.append('.');
        right = (IVariableBinding) qn.resolveBinding();
        if (right.isField()) {
            referField(right);
            js.append(context.getNaming().fieldSimple(right));
        } else {
            js.append(Naming.variable(right));
        }
    }

    private void cast(CastExpression c) {
        // because the type literal is needed
        referType(c.getType().resolveBinding());
        // TODO: convert primitives?
        expr(c.getExpression());
    }
    
    private void fieldAccess(FieldAccess fa) {
        IVariableBinding vb;
        
        vb = fa.resolveFieldBinding();
        referField(vb);
        if (Modifier.isStatic(vb.getModifiers())) {
            js.append(Naming.type(vb.getDeclaringClass()));
        } else {
            expr(fa.getExpression());
        }
        js.append(".");
        js.append(context.getNaming().fieldSimple(vb));
    }

    private void classInstanceCreation(ClassInstanceCreation c) {
        ITypeBinding type;
        IMethodBinding binding;
        String typeName;

        if (c.getAnonymousClassDeclaration() != null) {
            Problem.attach(c, "anonymous class declaration is not supported");
        }
        if (c.getExpression() != null) {
            throw new UnsupportedOperationException(c.toString());
        }
        type = c.getType().resolveBinding();
        referType(type);
        typeName = Naming.type(type);
        if (typeName.equals("java.lang.String")) { // TODO
            js.append('(');
            expressions(c.arguments());
            js.append(')');
        } else if (context.isDirect(type)) {
            js.append("new ");
            js.append(typeName);
            js.append("(");
            if (hasParentThis(type)) {
                // TODO
                js.append("this");  // NOT thisRef(type, c) !
                expressionsTail(c.arguments());
            } else {
                expressions(c.arguments());
            }
            js.append(')');
        } else {
            js.append("newObject(");
            js.append(typeName);
            js.append(", ");
            binding = c.resolveConstructorBinding();
            referMethod(binding);
            js.append(typeName + "." + context.getNaming().methodSimple(binding));
            js.append(", ");
            js.append('[');
            expressions(c.arguments());
            js.append(']');
            js.append(')');
        }
    }

    private void arrayCreation(ArrayCreation ac) {
        ArrayInitializer init;
        
        init = ac.getInitializer();
        if (init == null) {
            js.append("newEmptyArray(");
            expressions(ac.dimensions());
            js.append(")");
        } else {
            arrayInitializer(init);
        }
    }
    
    private void arrayInitializer(ArrayInitializer init) {
        boolean first;
        
        first = true;
        js.append("newInitializedArray(");
        for (Object obj : init.expressions()) {
            if (first) {
                first = false;
            } else {
                js.append(", ");
            }
            expr((Expression) obj);
        }
        js.append(")");
    }

    private void arrayAccess(ArrayAccess a) {
        // TODO: index out of bounds
        expr(a.getArray());
        js.append('[');
        expr(a.getIndex());
        js.append(']');
    }

    private void methodInvocation(MethodInvocation m) {
        IMethodBinding binding;
        ITypeBinding declaringClass;
        Expression expr;
        
        expr = m.getExpression();
        binding = m.resolveMethodBinding();
        referMethod(binding);
        declaringClass = binding.getDeclaringClass();
        if (Modifier.isStatic(binding.getModifiers())) {
            // ignore expr, use static type
            js.append(Naming.type(binding.getDeclaringClass()));
            js.append('.');
        } else {
            if (expr != null) {
                expr(expr);
            } else {
                thisRef(declaringClass, m);
            }
            js.append('.');
        }
        js.append(context.getNaming().methodSimple(binding));
        js.append('(');
        expressions(m.arguments());
        js.append(')');
    }

    private void thisRef(ITypeBinding referenced, ASTNode currentNode) {
        ITypeBinding current;
        ITypeBinding parent;
        
        current = getType(currentNode).resolveBinding();
        parent = current.getDeclaringClass();
        if (parent != null && isSuperclassStar(parent, referenced)) {
            // TODO: nested member types ...
            js.append("this.", PARENT_THIS);
        } else {
            js.append("this");
        }
    }
    
    private void superMethodInvocation(SuperMethodInvocation m) {
        IMethodBinding binding;
        
        binding = m.resolveMethodBinding();
        js.append("this.constructor.superclass.prototype.");
        js.append(context.getNaming().methodSimple(binding));
        js.append(".call(this");
        if (m.arguments().size() > 0) {
            js.append(", ");
        }
        expressions(m.arguments());
        js.append(")");
    }
    
    private void infixExpression(InfixExpression infix) {
        if (infix.getOperator() == InfixExpression.Operator.PLUS && hasString(infix)) {
            infixString(infix);
        } else {
            infixNormal(infix);
        }
    }
    private static boolean hasString(InfixExpression infix) {
        if (isString(infix.getLeftOperand())) {
            return true;
        }
        if (isString(infix.getRightOperand())) {
            return true;
        }
        for (Object obj : infix.extendedOperands()) {
            if (isString((Expression) obj)) {
                return true;
            }
        }
        return false;
    }
    
    private static boolean isString(Expression expr) {
        return expr.resolveTypeBinding().getQualifiedName().equals("java.lang.String");
    }
    private static boolean isChar(Expression expr) {
        return expr.resolveTypeBinding().getQualifiedName().equals("char");
    }
    
    private void infixNormal(InfixExpression infix) {
        String op;
        boolean floor;
        
        floor = false;
        op = infix.getOperator().toString();
        if (op.equals("==")) {
            // JavaScript's == performs conversion
            op = "===";
        } else if (op.equals("!=")) {
            op = "!==";
        } else if ("/".equals(op) && isInteger(infix.resolveTypeBinding())) {
            js.append("Math.floor(");
            floor = true;
        }
        expr(infix.getLeftOperand());
        js.append(' ');
        js.append(op);
        js.append(' ');
        expr(infix.getRightOperand());
        for (Object obj : infix.extendedOperands()) {
            js.append(' ');
            js.append(op);
            js.append(' ');
            expr((Expression) obj);
        }
        if (floor) {
            js.append(')');
        }
    }

    private boolean isInteger(ITypeBinding type) {
        return type.isPrimitive() && "int".equals(type.getName());
    }
    
    private void infixString(InfixExpression infix) {
        js.append("stringConcat(");
        infixStringOp(infix.getLeftOperand());
        js.append(", ");
        infixStringOp(infix.getRightOperand());
        for (Object obj : infix.extendedOperands()) {
            js.append(", ");
            infixStringOp((Expression) obj);
        }
        js.append(')');
    }
    
    private void infixStringOp(Expression op) {
        boolean fromChar;
        
        fromChar = isChar(op);
        if (fromChar) {
            js.append("String.fromCharCode(");
        }
        expr(op);
        if (fromChar) {
            js.append(")");
        }
    }

    private void variableDeclarationExpr(VariableDeclarationExpression decl) {
        VariableDeclarationFragment f;
        boolean first;
        
        first = true;
        referType(decl.resolveTypeBinding());
        for (Object obj : decl.fragments()) {
            if (first) {
                js.append("var ");
                first = false;
            } else {
                js.append(", ");
            }
            f = (VariableDeclarationFragment) obj;
            // ok to have extra dimensions - it's just a declaration 
            js.append(Naming.variable(f.resolveBinding()));
            js.append(" = ");
            expr(f.getInitializer());
        }
    }

    private void postfix(PostfixExpression postfix) {
        expr(postfix.getOperand());
        js.append(postfix.getOperator().toString());
    }

    private void prefix(PrefixExpression prefix) {
        js.append(prefix.getOperator().toString());
        expr(prefix.getOperand());
    }

    private void assignment(Assignment assign) {
        expr(assign.getLeftHandSide());
        js.append(' ');
        js.append(assign.getOperator().toString());
        js.append(' ');
        expr(assign.getRightHandSide());
    }
}
