/*******************************************************************************
 * Copyright (c) 2000, 2005 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.wst.jsdt.internal.corext.dom;

import org.eclipse.wst.jsdt.core.dom.ASTNode;
import org.eclipse.wst.jsdt.core.dom.ASTVisitor;
import org.eclipse.wst.jsdt.core.dom.AnnotationTypeDeclaration;
import org.eclipse.wst.jsdt.core.dom.AnnotationTypeMemberDeclaration;
import org.eclipse.wst.jsdt.core.dom.AnonymousClassDeclaration;
import org.eclipse.wst.jsdt.core.dom.ArrayAccess;
import org.eclipse.wst.jsdt.core.dom.ArrayCreation;
import org.eclipse.wst.jsdt.core.dom.ArrayInitializer;
import org.eclipse.wst.jsdt.core.dom.ArrayType;
import org.eclipse.wst.jsdt.core.dom.AssertStatement;
import org.eclipse.wst.jsdt.core.dom.Assignment;
import org.eclipse.wst.jsdt.core.dom.Block;
import org.eclipse.wst.jsdt.core.dom.BlockComment;
import org.eclipse.wst.jsdt.core.dom.BooleanLiteral;
import org.eclipse.wst.jsdt.core.dom.BreakStatement;
import org.eclipse.wst.jsdt.core.dom.CastExpression;
import org.eclipse.wst.jsdt.core.dom.CatchClause;
import org.eclipse.wst.jsdt.core.dom.CharacterLiteral;
import org.eclipse.wst.jsdt.core.dom.ClassInstanceCreation;
import org.eclipse.wst.jsdt.core.dom.CompilationUnit;
import org.eclipse.wst.jsdt.core.dom.ConditionalExpression;
import org.eclipse.wst.jsdt.core.dom.ConstructorInvocation;
import org.eclipse.wst.jsdt.core.dom.ContinueStatement;
import org.eclipse.wst.jsdt.core.dom.DoStatement;
import org.eclipse.wst.jsdt.core.dom.EmptyStatement;
import org.eclipse.wst.jsdt.core.dom.EnhancedForStatement;
import org.eclipse.wst.jsdt.core.dom.EnumConstantDeclaration;
import org.eclipse.wst.jsdt.core.dom.EnumDeclaration;
import org.eclipse.wst.jsdt.core.dom.ExpressionStatement;
import org.eclipse.wst.jsdt.core.dom.FieldAccess;
import org.eclipse.wst.jsdt.core.dom.FieldDeclaration;
import org.eclipse.wst.jsdt.core.dom.ForInStatement;
import org.eclipse.wst.jsdt.core.dom.ForStatement;
import org.eclipse.wst.jsdt.core.dom.FunctionExpression;
import org.eclipse.wst.jsdt.core.dom.IfStatement;
import org.eclipse.wst.jsdt.core.dom.ImportDeclaration;
import org.eclipse.wst.jsdt.core.dom.InfixExpression;
import org.eclipse.wst.jsdt.core.dom.Initializer;
import org.eclipse.wst.jsdt.core.dom.InstanceofExpression;
import org.eclipse.wst.jsdt.core.dom.Javadoc;
import org.eclipse.wst.jsdt.core.dom.LabeledStatement;
import org.eclipse.wst.jsdt.core.dom.LineComment;
import org.eclipse.wst.jsdt.core.dom.ListExpression;
import org.eclipse.wst.jsdt.core.dom.MarkerAnnotation;
import org.eclipse.wst.jsdt.core.dom.MemberRef;
import org.eclipse.wst.jsdt.core.dom.MemberValuePair;
import org.eclipse.wst.jsdt.core.dom.MethodDeclaration;
import org.eclipse.wst.jsdt.core.dom.MethodInvocation;
import org.eclipse.wst.jsdt.core.dom.MethodRef;
import org.eclipse.wst.jsdt.core.dom.MethodRefParameter;
import org.eclipse.wst.jsdt.core.dom.Modifier;
import org.eclipse.wst.jsdt.core.dom.NormalAnnotation;
import org.eclipse.wst.jsdt.core.dom.NullLiteral;
import org.eclipse.wst.jsdt.core.dom.NumberLiteral;
import org.eclipse.wst.jsdt.core.dom.ObjectLiteral;
import org.eclipse.wst.jsdt.core.dom.ObjectLiteralField;
import org.eclipse.wst.jsdt.core.dom.PackageDeclaration;
import org.eclipse.wst.jsdt.core.dom.ParameterizedType;
import org.eclipse.wst.jsdt.core.dom.ParenthesizedExpression;
import org.eclipse.wst.jsdt.core.dom.PostfixExpression;
import org.eclipse.wst.jsdt.core.dom.PrefixExpression;
import org.eclipse.wst.jsdt.core.dom.PrimitiveType;
import org.eclipse.wst.jsdt.core.dom.QualifiedName;
import org.eclipse.wst.jsdt.core.dom.QualifiedType;
import org.eclipse.wst.jsdt.core.dom.RegularExpressionLiteral;
import org.eclipse.wst.jsdt.core.dom.ReturnStatement;
import org.eclipse.wst.jsdt.core.dom.SimpleName;
import org.eclipse.wst.jsdt.core.dom.SimpleType;
import org.eclipse.wst.jsdt.core.dom.SingleMemberAnnotation;
import org.eclipse.wst.jsdt.core.dom.SingleVariableDeclaration;
import org.eclipse.wst.jsdt.core.dom.StringLiteral;
import org.eclipse.wst.jsdt.core.dom.SuperConstructorInvocation;
import org.eclipse.wst.jsdt.core.dom.SuperFieldAccess;
import org.eclipse.wst.jsdt.core.dom.SuperMethodInvocation;
import org.eclipse.wst.jsdt.core.dom.SwitchCase;
import org.eclipse.wst.jsdt.core.dom.SwitchStatement;
import org.eclipse.wst.jsdt.core.dom.TagElement;
import org.eclipse.wst.jsdt.core.dom.TextElement;
import org.eclipse.wst.jsdt.core.dom.ThisExpression;
import org.eclipse.wst.jsdt.core.dom.ThrowStatement;
import org.eclipse.wst.jsdt.core.dom.TryStatement;
import org.eclipse.wst.jsdt.core.dom.TypeDeclaration;
import org.eclipse.wst.jsdt.core.dom.TypeDeclarationStatement;
import org.eclipse.wst.jsdt.core.dom.TypeLiteral;
import org.eclipse.wst.jsdt.core.dom.TypeParameter;
import org.eclipse.wst.jsdt.core.dom.UndefinedLiteral;
import org.eclipse.wst.jsdt.core.dom.VariableDeclarationExpression;
import org.eclipse.wst.jsdt.core.dom.VariableDeclarationFragment;
import org.eclipse.wst.jsdt.core.dom.VariableDeclarationStatement;
import org.eclipse.wst.jsdt.core.dom.WhileStatement;
import org.eclipse.wst.jsdt.core.dom.WildcardType;
import org.eclipse.wst.jsdt.core.dom.WithStatement;

public class GenericVisitor extends ASTVisitor {
	
	public GenericVisitor() {
		super();
	}

	/**
	 * @param visitJavadocTags <code>true</code> if doc comment tags are
	 * to be visited by default, and <code>false</code> otherwise
	 * @see Javadoc#tags()
	 * @see #visit(Javadoc)
	 * @since 3.0
	 */
	public GenericVisitor(boolean visitJavadocTags) {
		super(visitJavadocTags);
	}
	
	//---- Hooks for subclasses -------------------------------------------------

	protected boolean visitNode(ASTNode node) {
		return true;
	}
	
	protected void endVisitNode(ASTNode node) {
		// do nothing
	}

	public boolean visit(AnonymousClassDeclaration node) {
		return visitNode(node);
	}
	public boolean visit(ArrayAccess node) {
		return visitNode(node);
	}
	public boolean visit(ArrayCreation node) {
		return visitNode(node);
	}
	public boolean visit(ArrayInitializer node) {
		return visitNode(node);
	}
	public boolean visit(ArrayType node) {
		return visitNode(node);
	}
	public boolean visit(AssertStatement node) {
		return visitNode(node);
	}
	public boolean visit(Assignment node) {
		return visitNode(node);
	}
	public boolean visit(Block node) {
		return visitNode(node);
	}
	public boolean visit(BooleanLiteral node) {
		return visitNode(node);
	}
	public boolean visit(BreakStatement node) {
		return visitNode(node);
	}
	public boolean visit(CastExpression node) {
		return visitNode(node);
	}
	public boolean visit(FunctionExpression node) {
		return visitNode(node);
	}
	public boolean visit(ObjectLiteral node) {
		return visitNode(node);
	}
	public boolean visit(ObjectLiteralField node) {
		return visitNode(node);
	}
	public boolean visit(CatchClause node) {
		return visitNode(node);
	}
	public boolean visit(CharacterLiteral node) {
		return visitNode(node);
	}
	public boolean visit(RegularExpressionLiteral node) {
		return visitNode(node);
	}
	public boolean visit(ClassInstanceCreation node) {
		return visitNode(node);
	}
	public boolean visit(CompilationUnit node) {
		return visitNode(node);
	}
	public boolean visit(ConditionalExpression node) {
		return visitNode(node);
	}
	public boolean visit(ConstructorInvocation node) {
		return visitNode(node);
	}
	public boolean visit(ContinueStatement node) {
		return visitNode(node);
	}
	public boolean visit(DoStatement node) {
		return visitNode(node);
	}
	public boolean visit(EmptyStatement node) {
		return visitNode(node);
	}
	public boolean visit(ExpressionStatement node) {
		return visitNode(node);
	}
	public boolean visit(FieldAccess node) {
		return visitNode(node);
	}
	public boolean visit(FieldDeclaration node) {
		return visitNode(node);
	}
	public boolean visit(ForStatement node) {
		return visitNode(node);
	}
	public boolean visit(ForInStatement node) {
		return visitNode(node);
	}
	public boolean visit(IfStatement node) {
		return visitNode(node);
	}
	public boolean visit(ImportDeclaration node) {
		return visitNode(node);
	}
	public boolean visit(InfixExpression node) {
		return visitNode(node);
	}
	public boolean visit(InstanceofExpression node) {
		return visitNode(node);
	}
	public boolean visit(Initializer node) {
		return visitNode(node);
	}
	public boolean visit(Javadoc node) {
		if (super.visit(node))
			return visitNode(node);
		else
			return false;
	}
	public boolean visit(LabeledStatement node) {
		return visitNode(node);
	}
	public boolean visit(ListExpression node) {
		return visitNode(node);
	}
	public boolean visit(MethodDeclaration node) {
		return visitNode(node);
	}
	public boolean visit(MethodInvocation node) {
		return visitNode(node);
	}
	public boolean visit(NullLiteral node) {
		return visitNode(node);
	}
	public boolean visit(UndefinedLiteral node) {
		return visitNode(node);
	}
	public boolean visit(NumberLiteral node) {
		return visitNode(node);
	}
	public boolean visit(PackageDeclaration node) {
		return visitNode(node);
	}
	public boolean visit(ParenthesizedExpression node) {
		return visitNode(node);
	}
	public boolean visit(PostfixExpression node) {
		return visitNode(node);
	}
	public boolean visit(PrefixExpression node) {
		return visitNode(node);
	}
	public boolean visit(PrimitiveType node) {
		return visitNode(node);
	}
	public boolean visit(QualifiedName node) {
		return visitNode(node);
	}
	public boolean visit(ReturnStatement node) {
		return visitNode(node);
	}
	public boolean visit(SimpleName node) {
		return visitNode(node);
	}
	public boolean visit(SimpleType node) {
		return visitNode(node);
	}
	public boolean visit(StringLiteral node) {
		return visitNode(node);
	}
	public boolean visit(SuperConstructorInvocation node) {
		return visitNode(node);
	}
	public boolean visit(SuperFieldAccess node) {
		return visitNode(node);
	}
	public boolean visit(SuperMethodInvocation node) {
		return visitNode(node);
	}
	public boolean visit(SwitchCase node) {
		return visitNode(node);
	}
	public boolean visit(SwitchStatement node) {
		return visitNode(node);
	}

	public boolean visit(ThisExpression node) {
		return visitNode(node);
	}
	public boolean visit(ThrowStatement node) {
		return visitNode(node);
	}
	public boolean visit(TryStatement node) {
		return visitNode(node);
	}
	public boolean visit(TypeDeclaration node) {
		return visitNode(node);
	}
	public boolean visit(TypeDeclarationStatement node) {
		return visitNode(node);
	}
	public boolean visit(TypeLiteral node) {
		return visitNode(node);
	}
	public boolean visit(SingleVariableDeclaration node) {
		return visitNode(node);
	}
	public boolean visit(VariableDeclarationExpression node) {
		return visitNode(node);
	}
	public boolean visit(VariableDeclarationStatement node) {
		return visitNode(node);
	}
	public boolean visit(VariableDeclarationFragment node) {
		return visitNode(node);
	}
	public boolean visit(WhileStatement node) {
		return visitNode(node);
	}
	public boolean visit(WithStatement node) {
		return visitNode(node);
	}

	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#visit(org.eclipse.wst.jsdt.core.dom.AnnotationTypeDeclaration)
	 */
	public boolean visit(AnnotationTypeDeclaration node) {
		return visitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#visit(org.eclipse.wst.jsdt.core.dom.AnnotationTypeMemberDeclaration)
	 */
	public boolean visit(AnnotationTypeMemberDeclaration node) {
		return visitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#visit(org.eclipse.wst.jsdt.core.dom.BlockComment)
	 */
	public boolean visit(BlockComment node) {
		return visitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#visit(org.eclipse.wst.jsdt.core.dom.EnhancedForStatement)
	 */
	public boolean visit(EnhancedForStatement node) {
		return visitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#visit(org.eclipse.wst.jsdt.core.dom.EnumConstantDeclaration)
	 */
	public boolean visit(EnumConstantDeclaration node) {
		return visitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#visit(org.eclipse.wst.jsdt.core.dom.EnumDeclaration)
	 */
	public boolean visit(EnumDeclaration node) {
		return visitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#visit(org.eclipse.wst.jsdt.core.dom.LineComment)
	 */
	public boolean visit(LineComment node) {
		return visitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#visit(org.eclipse.wst.jsdt.core.dom.MarkerAnnotation)
	 */
	public boolean visit(MarkerAnnotation node) {
		return visitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#visit(org.eclipse.wst.jsdt.core.dom.MemberRef)
	 */
	public boolean visit(MemberRef node) {
		return visitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#visit(org.eclipse.wst.jsdt.core.dom.MemberValuePair)
	 */
	public boolean visit(MemberValuePair node) {
		return visitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#visit(org.eclipse.wst.jsdt.core.dom.MethodRef)
	 */
	public boolean visit(MethodRef node) {
		return visitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#visit(org.eclipse.wst.jsdt.core.dom.MethodRefParameter)
	 */
	public boolean visit(MethodRefParameter node) {
		return visitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#visit(org.eclipse.wst.jsdt.core.dom.Modifier)
	 */
	public boolean visit(Modifier node) {
		return visitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#visit(org.eclipse.wst.jsdt.core.dom.NormalAnnotation)
	 */
	public boolean visit(NormalAnnotation node) {
		return visitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#visit(org.eclipse.wst.jsdt.core.dom.ParameterizedType)
	 */
	public boolean visit(ParameterizedType node) {
		return visitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#visit(org.eclipse.wst.jsdt.core.dom.QualifiedType)
	 */
	public boolean visit(QualifiedType node) {
		return visitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#visit(org.eclipse.wst.jsdt.core.dom.SingleMemberAnnotation)
	 */
	public boolean visit(SingleMemberAnnotation node) {
		return visitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#visit(org.eclipse.wst.jsdt.core.dom.TagElement)
	 */
	public boolean visit(TagElement node) {
		return visitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#visit(org.eclipse.wst.jsdt.core.dom.TextElement)
	 */
	public boolean visit(TextElement node) {
		return visitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#visit(org.eclipse.wst.jsdt.core.dom.TypeParameter)
	 */
	public boolean visit(TypeParameter node) {
		return visitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#visit(org.eclipse.wst.jsdt.core.dom.WildcardType)
	 */
	public boolean visit(WildcardType node) {
		return visitNode(node);
	}
	
	public void endVisit(AnonymousClassDeclaration node) {
		endVisitNode(node);
	}
	public void endVisit(ArrayAccess node) {
		endVisitNode(node);
	}
	public void endVisit(ArrayCreation node) {
		endVisitNode(node);
	}
	public void endVisit(ArrayInitializer node) {
		endVisitNode(node);
	}
	public void endVisit(ArrayType node) {
		endVisitNode(node);
	}
	public void endVisit(AssertStatement node) {
		endVisitNode(node);
	}
	public void endVisit(Assignment node) {
		endVisitNode(node);
	}
	public void endVisit(Block node) {
		endVisitNode(node);
	}
	public void endVisit(BooleanLiteral node) {
		endVisitNode(node);
	}
	public void endVisit(BreakStatement node) {
		endVisitNode(node);
	}
	public void endVisit(CastExpression node) {
		endVisitNode(node);
	}
	public void endVisit(FunctionExpression node) {
		endVisitNode(node);
	}
	public void endVisit(ObjectLiteral node) {
		endVisitNode(node);
	}
	public void endVisit(ObjectLiteralField node) {
		endVisitNode(node);
	}

	public void endVisit(CatchClause node) {
		endVisitNode(node);
	}
	public void endVisit(CharacterLiteral node) {
		endVisitNode(node);
	}
	public void endVisit(RegularExpressionLiteral node) {
		endVisitNode(node);
	}
	public void endVisit(ClassInstanceCreation node) {
		endVisitNode(node);
	}
	public void endVisit(CompilationUnit node) {
		endVisitNode(node);
	}
	public void endVisit(ConditionalExpression node) {
		endVisitNode(node);
	}
	public void endVisit(ConstructorInvocation node) {
		endVisitNode(node);
	}
	public void endVisit(ContinueStatement node) {
		endVisitNode(node);
	}
	public void endVisit(DoStatement node) {
		endVisitNode(node);
	}
	public void endVisit(EmptyStatement node) {
		endVisitNode(node);
	}
	public void endVisit(ExpressionStatement node) {
		endVisitNode(node);
	}
	public void endVisit(FieldAccess node) {
		endVisitNode(node);
	}
	public void endVisit(FieldDeclaration node) {
		endVisitNode(node);
	}
	public void endVisit(ForStatement node) {
		endVisitNode(node);
	}
	public void endVisit(ForInStatement node) {
		endVisitNode(node);
	}
	public void endVisit(IfStatement node) {
		endVisitNode(node);
	}
	public void endVisit(ImportDeclaration node) {
		endVisitNode(node);
	}
	public void endVisit(InfixExpression node) {
		endVisitNode(node);
	}
	public void endVisit(InstanceofExpression node) {
		endVisitNode(node);
	}
	public void endVisit(Initializer node) {
		endVisitNode(node);
	}
	public void endVisit(Javadoc node) {
		endVisitNode(node);
	}
	public void endVisit(LabeledStatement node) {
		endVisitNode(node);
	}
	public void endVisit(ListExpression node) {
		endVisitNode(node);
	}
	public void endVisit(MethodDeclaration node) {
		endVisitNode(node);
	}
	public void endVisit(MethodInvocation node) {
		endVisitNode(node);
	}
	public void endVisit(NullLiteral node) {
		endVisitNode(node);
	}
	public void endVisit(UndefinedLiteral node) {
		endVisitNode(node);
	}
	public void endVisit(NumberLiteral node) {
		endVisitNode(node);
	}
	public void endVisit(PackageDeclaration node) {
		endVisitNode(node);
	}
	public void endVisit(ParenthesizedExpression node) {
		endVisitNode(node);
	}
	public void endVisit(PostfixExpression node) {
		endVisitNode(node);
	}
	public void endVisit(PrefixExpression node) {
		endVisitNode(node);
	}
	public void endVisit(PrimitiveType node) {
		endVisitNode(node);
	}
	public void endVisit(QualifiedName node) {
		endVisitNode(node);
	}
	public void endVisit(ReturnStatement node) {
		endVisitNode(node);
	}
	public void endVisit(SimpleName node) {
		endVisitNode(node);
	}
	public void endVisit(SimpleType node) {
		endVisitNode(node);
	}
	public void endVisit(StringLiteral node) {
		endVisitNode(node);
	}
	public void endVisit(SuperConstructorInvocation node) {
		endVisitNode(node);
	}
	public void endVisit(SuperFieldAccess node) {
		endVisitNode(node);
	}
	public void endVisit(SuperMethodInvocation node) {
		endVisitNode(node);
	}
	public void endVisit(SwitchCase node) {
		endVisitNode(node);
	}
	public void endVisit(SwitchStatement node) {
		endVisitNode(node);
	}

	public void endVisit(ThisExpression node) {
		endVisitNode(node);
	}
	public void endVisit(ThrowStatement node) {
		endVisitNode(node);
	}
	public void endVisit(TryStatement node) {
		endVisitNode(node);
	}
	public void endVisit(TypeDeclaration node) {
		endVisitNode(node);
	}
	public void endVisit(TypeDeclarationStatement node) {
		endVisitNode(node);
	}
	public void endVisit(TypeLiteral node) {
		endVisitNode(node);
	}
	public void endVisit(SingleVariableDeclaration node) {
		endVisitNode(node);
	}
	public void endVisit(VariableDeclarationExpression node) {
		endVisitNode(node);
	}
	public void endVisit(VariableDeclarationStatement node) {
		endVisitNode(node);
	}
	public void endVisit(VariableDeclarationFragment node) {
		endVisitNode(node);
	}
	public void endVisit(WhileStatement node) {
		endVisitNode(node);
	}

	public void endVisit(WithStatement node) {
		endVisitNode(node);
	}

	
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#endVisit(org.eclipse.wst.jsdt.core.dom.AnnotationTypeDeclaration)
	 */
	public void endVisit(AnnotationTypeDeclaration node) {
		endVisitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#endVisit(org.eclipse.wst.jsdt.core.dom.AnnotationTypeMemberDeclaration)
	 */
	public void endVisit(AnnotationTypeMemberDeclaration node) {
		endVisitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#endVisit(org.eclipse.wst.jsdt.core.dom.BlockComment)
	 */
	public void endVisit(BlockComment node) {
		endVisitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#endVisit(org.eclipse.wst.jsdt.core.dom.EnhancedForStatement)
	 */
	public void endVisit(EnhancedForStatement node) {
		endVisitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#endVisit(org.eclipse.wst.jsdt.core.dom.EnumConstantDeclaration)
	 */
	public void endVisit(EnumConstantDeclaration node) {
		endVisitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#endVisit(org.eclipse.wst.jsdt.core.dom.EnumDeclaration)
	 */
	public void endVisit(EnumDeclaration node) {
		endVisitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#endVisit(org.eclipse.wst.jsdt.core.dom.LineComment)
	 */
	public void endVisit(LineComment node) {
		endVisitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#endVisit(org.eclipse.wst.jsdt.core.dom.MarkerAnnotation)
	 */
	public void endVisit(MarkerAnnotation node) {
		endVisitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#endVisit(org.eclipse.wst.jsdt.core.dom.MemberRef)
	 */
	public void endVisit(MemberRef node) {
		endVisitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#endVisit(org.eclipse.wst.jsdt.core.dom.MemberValuePair)
	 */
	public void endVisit(MemberValuePair node) {
		endVisitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#endVisit(org.eclipse.wst.jsdt.core.dom.MethodRef)
	 */
	public void endVisit(MethodRef node) {
		endVisitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#endVisit(org.eclipse.wst.jsdt.core.dom.MethodRefParameter)
	 */
	public void endVisit(MethodRefParameter node) {
		endVisitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#endVisit(org.eclipse.wst.jsdt.core.dom.Modifier)
	 */
	public void endVisit(Modifier node) {
		endVisitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#endVisit(org.eclipse.wst.jsdt.core.dom.NormalAnnotation)
	 */
	public void endVisit(NormalAnnotation node) {
		endVisitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#endVisit(org.eclipse.wst.jsdt.core.dom.ParameterizedType)
	 */
	public void endVisit(ParameterizedType node) {
		endVisitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#endVisit(org.eclipse.wst.jsdt.core.dom.QualifiedType)
	 */
	public void endVisit(QualifiedType node) {
		endVisitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#endVisit(org.eclipse.wst.jsdt.core.dom.SingleMemberAnnotation)
	 */
	public void endVisit(SingleMemberAnnotation node) {
		endVisitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#endVisit(org.eclipse.wst.jsdt.core.dom.TagElement)
	 */
	public void endVisit(TagElement node) {
		endVisitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#endVisit(org.eclipse.wst.jsdt.core.dom.TextElement)
	 */
	public void endVisit(TextElement node) {
		endVisitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#endVisit(org.eclipse.wst.jsdt.core.dom.TypeParameter)
	 */
	public void endVisit(TypeParameter node) {
		endVisitNode(node);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.dom.ASTVisitor#endVisit(org.eclipse.wst.jsdt.core.dom.WildcardType)
	 */
	public void endVisit(WildcardType node) {
		endVisitNode(node);
	}

}
