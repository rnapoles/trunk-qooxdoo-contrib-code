/*******************************************************************************
 * Copyright (c) 2000, 2008 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/

package org.eclipse.wst.jsdt.internal.ui.text.correction;

import org.eclipse.core.runtime.CoreException;
import org.eclipse.wst.jsdt.core.IJavaScriptUnit;
import org.eclipse.wst.jsdt.core.dom.AST;
import org.eclipse.wst.jsdt.core.dom.ASTNode;
import org.eclipse.wst.jsdt.core.dom.CastExpression;
import org.eclipse.wst.jsdt.core.dom.JavaScriptUnit;
import org.eclipse.wst.jsdt.core.dom.Expression;
import org.eclipse.wst.jsdt.core.dom.FieldAccess;
import org.eclipse.wst.jsdt.core.dom.IBinding;
import org.eclipse.wst.jsdt.core.dom.ITypeBinding;
import org.eclipse.wst.jsdt.core.dom.FunctionInvocation;
import org.eclipse.wst.jsdt.core.dom.ParenthesizedExpression;
import org.eclipse.wst.jsdt.core.dom.QualifiedName;
import org.eclipse.wst.jsdt.core.dom.Type;
import org.eclipse.wst.jsdt.core.dom.rewrite.ASTRewrite;
import org.eclipse.wst.jsdt.core.dom.rewrite.ImportRewrite;
import org.eclipse.wst.jsdt.internal.corext.dom.ASTNodeFactory;
import org.eclipse.wst.jsdt.internal.ui.JavaPluginImages;

public class CastCompletionProposal extends LinkedCorrectionProposal {

	public static final String ADD_CAST_ID= "org.eclipse.wst.jsdt.ui.correction.addCast"; //$NON-NLS-1$

	private Expression fNodeToCast;
	private final Object fCastType; // String or ITypeBinding or null: Should become ITypeBinding

	public CastCompletionProposal(String label, IJavaScriptUnit targetCU, Expression nodeToCast, String castType, int relevance) {
		super(label, targetCU, null, relevance, JavaPluginImages.get(JavaPluginImages.IMG_CORRECTION_CAST)); 
		fNodeToCast= nodeToCast;
		fCastType= castType;
		setCommandId(ADD_CAST_ID);
	}

	public CastCompletionProposal(String label, IJavaScriptUnit targetCU, Expression nodeToCast, ITypeBinding castType, int relevance) {
		super(label, targetCU, null, relevance, JavaPluginImages.get(JavaPluginImages.IMG_CORRECTION_CAST)); 
		fNodeToCast= nodeToCast;
		fCastType= castType;
		setCommandId(ADD_CAST_ID);
	}

	private Type getNewCastTypeNode(ASTRewrite rewrite, ImportRewrite importRewrite) throws CoreException {
		AST ast= rewrite.getAST();
		if (fCastType != null) {
			if (fCastType instanceof ITypeBinding) {
				return importRewrite.addImport((ITypeBinding) fCastType, ast);
			} else {
				String string= importRewrite.addImport((String) fCastType);
				return ASTNodeFactory.newType(ast, string);
			}
		}

		ASTNode node= fNodeToCast;
		ASTNode parent= node.getParent();
		if (parent instanceof CastExpression) {
			node= parent;
			parent= parent.getParent();
		}
		while (parent instanceof ParenthesizedExpression) {
			node= parent;
			parent= parent.getParent();
		}
		if (parent instanceof FunctionInvocation) {
			FunctionInvocation invocation= (FunctionInvocation) node.getParent();
			if (invocation.getExpression() == node) {
				IBinding targetContext= ASTResolving.getParentMethodOrTypeBinding(node);
				ITypeBinding[] bindings= ASTResolving.getQualifierGuess(node.getRoot(), invocation.getName().getIdentifier(), invocation.arguments(), targetContext);
				if (bindings.length > 0) {
					ITypeBinding first= getCastFavorite(bindings, fNodeToCast.resolveTypeBinding());

					Type newTypeNode= importRewrite.addImport(first, ast);
					addLinkedPosition(rewrite.track(newTypeNode), true, "casttype"); //$NON-NLS-1$
					for (int i= 0; i < bindings.length; i++) {
						addLinkedPositionProposal("casttype", bindings[i]); //$NON-NLS-1$
					}
					return newTypeNode;
				}
			}
		}
		Type newCastType= ast.newSimpleType(ast.newSimpleName("Object")); //$NON-NLS-1$
		addLinkedPosition(rewrite.track(newCastType), true, "casttype"); //$NON-NLS-1$
		return newCastType;
	}

	private ITypeBinding getCastFavorite(ITypeBinding[] suggestedCasts, ITypeBinding nodeToCastBinding) {
		if (nodeToCastBinding == null) {
			return suggestedCasts[0];
		}
		ITypeBinding favourite= suggestedCasts[0];
		for (int i = 0; i < suggestedCasts.length; i++) {
			ITypeBinding curr= suggestedCasts[i];
			if (nodeToCastBinding.isCastCompatible(curr)) {
				return curr;
			}
			if (curr.isInterface()) {
				favourite= curr;
			}
		}
		return favourite;
	}


	protected ASTRewrite getRewrite() throws CoreException {
		AST ast= fNodeToCast.getAST();
		ASTRewrite rewrite= ASTRewrite.create(ast);
		ImportRewrite importRewrite= createImportRewrite((JavaScriptUnit) fNodeToCast.getRoot());

		Type newTypeNode= getNewCastTypeNode(rewrite, importRewrite);

		if (fNodeToCast.getNodeType() == ASTNode.CAST_EXPRESSION) {
			CastExpression expression= (CastExpression) fNodeToCast;
			rewrite.replace(expression.getType(), newTypeNode, null);
		} else {
			Expression expressionCopy= (Expression) rewrite.createCopyTarget(fNodeToCast);
			if (needsInnerParantheses(fNodeToCast)) {
				ParenthesizedExpression parenthesizedExpression= ast.newParenthesizedExpression();
				parenthesizedExpression.setExpression(expressionCopy);
				expressionCopy= parenthesizedExpression;
			}

			CastExpression castExpression= ast.newCastExpression();
			castExpression.setExpression(expressionCopy);
			castExpression.setType(newTypeNode);

			ASTNode replacingNode= castExpression;
			if (needsOuterParantheses(fNodeToCast)) {
				ParenthesizedExpression parenthesizedExpression= ast.newParenthesizedExpression();
				parenthesizedExpression.setExpression(castExpression);
				replacingNode= parenthesizedExpression;
			}

			rewrite.replace(fNodeToCast, replacingNode, null);
		}
		return rewrite;
	}

	private static boolean needsInnerParantheses(ASTNode nodeToCast) {
		int nodeType= nodeToCast.getNodeType();

		// nodes have weaker precedence than cast
		return nodeType == ASTNode.INFIX_EXPRESSION || nodeType == ASTNode.CONDITIONAL_EXPRESSION
		|| nodeType == ASTNode.ASSIGNMENT || nodeType == ASTNode.INSTANCEOF_EXPRESSION;
	}

	private static boolean needsOuterParantheses(ASTNode nodeToCast) {
		ASTNode parent= nodeToCast.getParent();
		if (parent instanceof FunctionInvocation) {
			if (((FunctionInvocation)parent).getExpression() == nodeToCast) {
				return true;
			}
		} else if (parent instanceof QualifiedName) {
			if (((QualifiedName)parent).getQualifier() == nodeToCast) {
				return true;
			}
		} else if (parent instanceof FieldAccess) {
			if (((FieldAccess)parent).getExpression() == nodeToCast) {
				return true;
			}
		}
		return false;
	}


}
