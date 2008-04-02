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

import org.eclipse.jdt.core.dom.AssertStatement;
import org.eclipse.jdt.core.dom.Block;
import org.eclipse.jdt.core.dom.BreakStatement;
import org.eclipse.jdt.core.dom.CatchClause;
import org.eclipse.jdt.core.dom.ConstructorInvocation;
import org.eclipse.jdt.core.dom.ContinueStatement;
import org.eclipse.jdt.core.dom.DoStatement;
import org.eclipse.jdt.core.dom.EmptyStatement;
import org.eclipse.jdt.core.dom.EnhancedForStatement;
import org.eclipse.jdt.core.dom.Expression;
import org.eclipse.jdt.core.dom.ExpressionStatement;
import org.eclipse.jdt.core.dom.ForStatement;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.IfStatement;
import org.eclipse.jdt.core.dom.LabeledStatement;
import org.eclipse.jdt.core.dom.ReturnStatement;
import org.eclipse.jdt.core.dom.Statement;
import org.eclipse.jdt.core.dom.SuperConstructorInvocation;
import org.eclipse.jdt.core.dom.SwitchCase;
import org.eclipse.jdt.core.dom.SwitchStatement;
import org.eclipse.jdt.core.dom.SynchronizedStatement;
import org.eclipse.jdt.core.dom.ThrowStatement;
import org.eclipse.jdt.core.dom.TryStatement;
import org.eclipse.jdt.core.dom.VariableDeclarationFragment;
import org.eclipse.jdt.core.dom.VariableDeclarationStatement;
import org.eclipse.jdt.core.dom.WhileStatement;

import org.qooxdoo.toolkit.repository.Module;

public class StatementCompiler extends ExpressionCompiler {
    protected StatementCompiler(Context context) {
        super(context);
    }
    
    public void statement(Statement stmt) {
        if (stmt instanceof Block) {
            block((Block) stmt);
        } else if (stmt instanceof EmptyStatement) {
            empty((EmptyStatement) stmt);
        } else if (stmt instanceof ReturnStatement) {
            returN((ReturnStatement) stmt);
        } else if (stmt instanceof WhileStatement) {
            whilE((WhileStatement) stmt);
        } else if (stmt instanceof ForStatement) {
            foR((ForStatement) stmt);
        } else if (stmt instanceof EnhancedForStatement) {
            enhancedFor((EnhancedForStatement) stmt);
        } else if (stmt instanceof DoStatement) {
            dO((DoStatement) stmt);
        } else if (stmt instanceof IfStatement) {
            iF((IfStatement) stmt);
        } else if (stmt instanceof BreakStatement) {
            breaK((BreakStatement) stmt);
        } else if (stmt instanceof ContinueStatement) {
            continuE((ContinueStatement) stmt);
        } else if (stmt instanceof SwitchStatement) {
            switcH((SwitchStatement) stmt);
        } else if (stmt instanceof SwitchCase) {
            switchCase((SwitchCase) stmt);
        } else if (stmt instanceof VariableDeclarationStatement) {
            variableDeclaration((VariableDeclarationStatement) stmt);
        } else if (stmt instanceof TryStatement) {
            trY((TryStatement) stmt);
        } else if (stmt instanceof ThrowStatement) {
            throW((ThrowStatement) stmt);
        } else if (stmt instanceof ExpressionStatement) {
            expression((ExpressionStatement) stmt);
        } else if (stmt instanceof ConstructorInvocation) {
            constructorInvocation((ConstructorInvocation) stmt);
        } else if (stmt instanceof SuperConstructorInvocation) {
            superConstructorInvocation((SuperConstructorInvocation) stmt);
        } else if (stmt instanceof SynchronizedStatement) {
            synchronizeD((SynchronizedStatement) stmt);
        } else if (stmt instanceof LabeledStatement) {
            labeled((LabeledStatement) stmt);
        } else if (stmt instanceof AssertStatement) {
            // ignored
            asserT((AssertStatement) stmt);
        } else {
            throw new UnsupportedOperationException(stmt.getClass().toString());
        }
    }

    private void asserT(AssertStatement notUsed) {
        // ignored
    }

    private void block(Block block) {
        js.open();
        for (Object obj : block.statements()) {
            statement((Statement) obj);
        }
        js.close();
    }

    private void synchronizeD(SynchronizedStatement stmt) {
        // js is single threaded - thus, we can ignore synchronized statements
        
        // keep the expression, it might have side-effects
        expr(stmt.getExpression());
        js.append(";");
        js.newline();
        block(stmt.getBody());
    }

    private void labeled(LabeledStatement stmt) {
        // ignores label
        statement(stmt.getBody());
    }

    private void constructorInvocation(ConstructorInvocation ci) {
        callConstructor(ci.resolveConstructorBinding(), ci.arguments());
    }

    private void superConstructorInvocation(SuperConstructorInvocation ci) {
        callConstructor(ci.resolveConstructorBinding(), ci.arguments());
    }

    private void callConstructor(IMethodBinding binding, List<?> arguments) {
        ITypeBinding type;
        
        type = binding.getDeclaringClass();
        js.append(Naming.type(type));
        if (context.isDirect(type)) {
            // no init function
        } else {
            js.append('.');
            js.append(context.getNaming().methodSimple(binding));
        }
        js.append(".call(this");
        expressionsTail(arguments);
        js.append(");");
        js.newline();
    }


    private void empty(EmptyStatement empty) {
        js.append(";");
        js.newline();
    }
    
    private void expression(ExpressionStatement expr) {
        expr(expr.getExpression());
        js.append(";");
        js.newline();
    }

    private void returN(ReturnStatement ret) {
        Expression expr;
        
        expr = ret.getExpression();
        if (expr != null) {
            js.append("return ");
            expr(expr);
            js.append(";");
            js.newline();
        } else {
            js.append("return;");
            js.newline();
        }
    }
    
    private void breaK(BreakStatement brk) {
        if (brk.getLabel() != null) {
            throw new UnsupportedOperationException(brk.getLabel().toString());
        }
        js.append("break;");
        js.newline();
    }
    
    private void continuE(ContinueStatement cont) {
        if (cont.getLabel() != null) {
            throw new UnsupportedOperationException(cont.getLabel().toString());
        }
        js.append("continue;");
        js.newline();
    }
    
    private void whilE(WhileStatement wh) {
        js.append("while (");
        expr(wh.getExpression());
        js.append(") ");
        statement(wh.getBody());
    }

    private void foR(ForStatement f) {
        js.append("for (");
        expressions(f.initializers());
        js.append("; ");
        if (f.getExpression() != null) {
            expr(f.getExpression());
        }
        js.append("; ");
        expressions(f.updaters());
        js.append(") ");
        statement(f.getBody());
    }

    private void enhancedFor(EnhancedForStatement f) {
        String parameter;
        String iterator;
        
        if (f.getParameter().getInitializer() != null) {
            throw new IllegalStateException();
        }
        parameter = f.getParameter().getName().getIdentifier();
        iterator = "iter_" + parameter;
        if (f.getExpression().resolveTypeBinding().isArray()) {
            enhancedForArray(iterator, parameter, f);
        } else {
            enhancedForIterable(iterator, parameter, f);
        }
    }
    private void enhancedForArray(String iterator, String parameter, EnhancedForStatement f) {
        js.append("for (var ", iterator, " = 0; ", iterator, " < ");
        expr(f.getExpression());
        js.append(".length; ", iterator, "++) ");
        js.open();
        js.append("var ", parameter, " = ");
        expr(f.getExpression());
        js.append("[", iterator, "];\n");
        statement(f.getBody());
        js.close();
    }

    private void enhancedForIterable(String iterator, String parameter, EnhancedForStatement f) {
        deps().add("java.lang.Iterable" + Module.SEP + "iterator");
        deps().add("java.util.Iterator" + Module.SEP + "next");
        js.append("for (var ", iterator, " = ");
        expr(f.getExpression());
        js.append(".iterator(); ", iterator, ".hasNext(); ) ");
        js.open();
        if (f.getParameter().getInitializer() != null) {
            throw new IllegalStateException();
        }
        js.append("var ", parameter, " = ", iterator, ".next();\n");
        statement(f.getBody());
        js.close();
    }
    
    private void trY(TryStatement t) {
        String name;
        boolean first;
        ITypeBinding type;
        
        js.append("try ");
        block(t.getBody());
        if (t.catchClauses().size() > 0) {
            name = "ex"; // TODO
            js.append(" catch (");
            js.append(name);
            js.append(") ");
            js.open();
            first = true;
            for (Object obj : t.catchClauses()) {
                CatchClause cc = (CatchClause) obj;
                if (first) {
                    js.append("if (");
                    first = false;
                } else {
                    js.append("else if (");
                }
                js.append(name);
                js.append(" instanceof ");
                type = cc.getException().getType().resolveBinding();
                referType(type);
                // no need to take care about interfaces - type always extends Exception
                js.append(Naming.type(type));
                js.append(") ");
                js.open();
                js.append("var ");
                js.append(Naming.variable(cc.getException().resolveBinding()));
                js.append(" = ");
                js.append(name);
                js.append(";");
                js.newline();
                block(cc.getBody());
                js.close();
            }
            js.append("else ");
            js.open();
            js.append("throw ");
            js.append(name);
            js.append(";");
            js.newline();
            js.close(); // else
            js.close(); // catch
        }
        if (t.getFinally() != null) {
            js.append("finally ");
            block(t.getFinally());
        }
    }

    private void throW(ThrowStatement t) {
        js.append("throw ");
        expr(t.getExpression());
        js.append(";");
        js.newline();
    }

    private void switchCase(SwitchCase c) {
        js.dec();
        if (c.isDefault()) {
            js.append("default:");
            js.newline();
        } else {
            js.append("case ");
            expr(c.getExpression());
            js.append(":");
            js.newline();
        }
        js.inc();
    }

    private void variableDeclaration(VariableDeclarationStatement d) {
        VariableDeclarationFragment f;
        Expression expr;
        
        for (Object obj : d.fragments()) {
            js.append("var ");
            f = (VariableDeclarationFragment) obj;
            js.append(Naming.variable(f.resolveBinding()));
            expr = f.getInitializer();
            if (expr != null) {
                js.append(" = ");
                expr(expr);
            }
            js.append(";");
            js.newline();
        }
    }

    private void dO(DoStatement d) {
        js.append("do ");
        statement(d.getBody());
        js.append(" while (");
        expr(d.getExpression());
        js.append(");");
        js.newline();
    }

    private void iF(IfStatement i) {
        js.append("if (");
        expr(i.getExpression());
        js.append(") ");
        statement(i.getThenStatement());
        if (i.getElseStatement() != null) {
            js.append(" else ");
            statement(i.getElseStatement());
        }
    }

    private void switcH(SwitchStatement sw) {
        js.append("switch (");
        expr(sw.getExpression());
        js.append(") ");
        js.open();
        for (Object obj : sw.statements()) {
            statement((Statement) obj);
        }
        js.close();
    }
}
