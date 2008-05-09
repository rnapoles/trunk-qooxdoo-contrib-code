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

import java.util.ArrayList;
import java.util.Collection;

import org.eclipse.core.runtime.CoreException;
import org.eclipse.swt.graphics.Image;
import org.eclipse.wst.jsdt.core.IJavaScriptUnit;
import org.eclipse.wst.jsdt.core.JavaScriptModelException;
import org.eclipse.wst.jsdt.core.dom.AST;
import org.eclipse.wst.jsdt.core.dom.ASTNode;
import org.eclipse.wst.jsdt.core.dom.ArrayInitializer;
import org.eclipse.wst.jsdt.core.dom.Assignment;
import org.eclipse.wst.jsdt.core.dom.BodyDeclaration;
import org.eclipse.wst.jsdt.core.dom.CastExpression;
import org.eclipse.wst.jsdt.core.dom.JavaScriptUnit;
import org.eclipse.wst.jsdt.core.dom.Expression;
import org.eclipse.wst.jsdt.core.dom.FieldAccess;
import org.eclipse.wst.jsdt.core.dom.IBinding;
import org.eclipse.wst.jsdt.core.dom.IFunctionBinding;
import org.eclipse.wst.jsdt.core.dom.ITypeBinding;
import org.eclipse.wst.jsdt.core.dom.IVariableBinding;
import org.eclipse.wst.jsdt.core.dom.MemberValuePair;
import org.eclipse.wst.jsdt.core.dom.FunctionDeclaration;
import org.eclipse.wst.jsdt.core.dom.FunctionInvocation;
import org.eclipse.wst.jsdt.core.dom.Name;
import org.eclipse.wst.jsdt.core.dom.SingleMemberAnnotation;
import org.eclipse.wst.jsdt.core.dom.SuperFieldAccess;
import org.eclipse.wst.jsdt.core.dom.SuperMethodInvocation;
import org.eclipse.wst.jsdt.core.dom.Type;
import org.eclipse.wst.jsdt.core.dom.VariableDeclarationFragment;
import org.eclipse.wst.jsdt.core.dom.rewrite.ASTRewrite;
import org.eclipse.wst.jsdt.core.dom.rewrite.ImportRewrite;
import org.eclipse.wst.jsdt.internal.corext.dom.ASTNodes;
import org.eclipse.wst.jsdt.internal.corext.dom.Bindings;
import org.eclipse.wst.jsdt.internal.corext.util.Messages;
import org.eclipse.wst.jsdt.internal.ui.JavaPluginImages;
import org.eclipse.wst.jsdt.internal.ui.text.correction.ChangeMethodSignatureProposal.ChangeDescription;
import org.eclipse.wst.jsdt.internal.ui.text.correction.ChangeMethodSignatureProposal.InsertDescription;
import org.eclipse.wst.jsdt.internal.ui.text.correction.ChangeMethodSignatureProposal.RemoveDescription;
import org.eclipse.wst.jsdt.internal.ui.viewsupport.BindingLabelProvider;
import org.eclipse.wst.jsdt.ui.JavaScriptElementLabels;
import org.eclipse.wst.jsdt.ui.text.java.IInvocationContext;
import org.eclipse.wst.jsdt.ui.text.java.IProblemLocation;


public class TypeMismatchSubProcessor {

	private TypeMismatchSubProcessor() {
	}

	public static void addTypeMismatchProposals(IInvocationContext context, IProblemLocation problem, Collection proposals) throws CoreException {
		String[] args= problem.getProblemArguments();
		if (args.length != 2) {
			return;
		}

		IJavaScriptUnit cu= context.getCompilationUnit();

		JavaScriptUnit astRoot= context.getASTRoot();
		AST ast= astRoot.getAST();
		
		ASTNode selectedNode= problem.getCoveredNode(astRoot);
		if (!(selectedNode instanceof Expression)) {
			return;
		}
		Expression nodeToCast= (Expression) selectedNode;
		Name receiverNode= null;
		ITypeBinding castTypeBinding= null;

		int parentNodeType= selectedNode.getParent().getNodeType();
		if (parentNodeType == ASTNode.ASSIGNMENT) {
			Assignment assign= (Assignment) selectedNode.getParent();
			Expression leftHandSide= assign.getLeftHandSide();
			if (selectedNode.equals(leftHandSide)) {
				nodeToCast= assign.getRightHandSide();
			}
			castTypeBinding= assign.getLeftHandSide().resolveTypeBinding();
			if (leftHandSide instanceof Name) {
				receiverNode= (Name) leftHandSide;
			} else if (leftHandSide instanceof FieldAccess) {
				receiverNode= ((FieldAccess) leftHandSide).getName();
			}
		} else if (parentNodeType == ASTNode.VARIABLE_DECLARATION_FRAGMENT) {
			VariableDeclarationFragment frag= (VariableDeclarationFragment) selectedNode.getParent();
			if (selectedNode.equals(frag.getName()) || selectedNode.equals(frag.getInitializer())) {
				nodeToCast= frag.getInitializer();
				castTypeBinding= ASTNodes.getType(frag).resolveBinding();
				receiverNode= frag.getName();
			}
		} else if (parentNodeType == ASTNode.MEMBER_VALUE_PAIR) {
			receiverNode= ((MemberValuePair) selectedNode.getParent()).getName();
			castTypeBinding= ASTResolving.guessBindingForReference(nodeToCast);
		} else if (parentNodeType == ASTNode.SINGLE_MEMBER_ANNOTATION) {
			receiverNode= ((SingleMemberAnnotation) selectedNode.getParent()).getTypeName(); // use the type name
			castTypeBinding= ASTResolving.guessBindingForReference(nodeToCast);
		} else {
			// try to find the binding corresponding to 'castTypeName'
			castTypeBinding= ASTResolving.guessBindingForReference(nodeToCast);
		}
		if (castTypeBinding == null) {
			return;
		}

		if (!(nodeToCast instanceof ArrayInitializer)) {
			ITypeBinding binding= nodeToCast.resolveTypeBinding();
			if (binding == null || binding.isCastCompatible(castTypeBinding) || nodeToCast instanceof CastExpression) {
				proposals.add(createCastProposal(context, castTypeBinding, nodeToCast, 7));
			}
		}

		ITypeBinding currBinding= nodeToCast.resolveTypeBinding();

		boolean nullOrVoid= currBinding == null || "void".equals(currBinding.getName()); //$NON-NLS-1$

		// change method return statement to actual type
		if (!nullOrVoid && parentNodeType == ASTNode.RETURN_STATEMENT) {
			BodyDeclaration decl= ASTResolving.findParentBodyDeclaration(selectedNode);
			if (decl instanceof FunctionDeclaration) {
				FunctionDeclaration methodDeclaration= (FunctionDeclaration) decl;


				currBinding= Bindings.normalizeTypeBinding(currBinding);
				if (currBinding == null) {
					currBinding= ast.resolveWellKnownType("java.lang.Object"); //$NON-NLS-1$
				}
				if (currBinding.isWildcardType()) {
					currBinding= ASTResolving.normalizeWildcardType(currBinding, true, ast);
				}

				ASTRewrite rewrite= ASTRewrite.create(ast);

				String label= Messages.format(CorrectionMessages.TypeMismatchSubProcessor_changereturntype_description, currBinding.getName());
				Image image= JavaPluginImages.get(JavaPluginImages.IMG_CORRECTION_CHANGE);
				LinkedCorrectionProposal proposal= new LinkedCorrectionProposal(label, cu, rewrite, 6, image);

				ImportRewrite imports= proposal.createImportRewrite(astRoot);

				Type newReturnType= imports.addImport(currBinding, ast);
				rewrite.replace(methodDeclaration.getReturnType2(), newReturnType, null);

				String returnKey= "return"; //$NON-NLS-1$
				proposal.addLinkedPosition(rewrite.track(newReturnType), true, returnKey);
				ITypeBinding[] typeSuggestions= ASTResolving.getRelaxingTypes(ast, currBinding);
				for (int i= 0; i < typeSuggestions.length; i++) {
					proposal.addLinkedPositionProposal(returnKey, typeSuggestions[i]);
				}
				proposals.add(proposal);
			}
		}

		if (!nullOrVoid && receiverNode != null) {
			currBinding= Bindings.normalizeTypeBinding(currBinding);
			if (currBinding == null) {
				currBinding= ast.resolveWellKnownType("java.lang.Object"); //$NON-NLS-1$
			}
			if (currBinding.isWildcardType()) {
				currBinding= ASTResolving.normalizeWildcardType(currBinding, true, ast);
			}
			addChangeSenderTypeProposals(context, receiverNode, currBinding, true, 6, proposals);
		}

		addChangeSenderTypeProposals(context, nodeToCast, castTypeBinding, false, 5, proposals);
	}

	public static void addChangeSenderTypeProposals(IInvocationContext context, Expression nodeToCast, ITypeBinding castTypeBinding, boolean isAssignedNode, int relevance, Collection proposals) throws JavaScriptModelException {
		IBinding callerBinding= null;
		switch (nodeToCast.getNodeType()) {
			case ASTNode.FUNCTION_INVOCATION:
				callerBinding= ((FunctionInvocation) nodeToCast).resolveMethodBinding();
				break;
			case ASTNode.SUPER_METHOD_INVOCATION:
				callerBinding= ((SuperMethodInvocation) nodeToCast).resolveMethodBinding();
				break;
			case ASTNode.FIELD_ACCESS:
				callerBinding= ((FieldAccess) nodeToCast).resolveFieldBinding();
				break;
			case ASTNode.SUPER_FIELD_ACCESS:
				callerBinding= ((SuperFieldAccess) nodeToCast).resolveFieldBinding();
				break;
			case ASTNode.SIMPLE_NAME:
			case ASTNode.QUALIFIED_NAME:
				callerBinding= ((Name) nodeToCast).resolveBinding();
				break;
		}

		IJavaScriptUnit cu= context.getCompilationUnit();
		JavaScriptUnit astRoot= context.getASTRoot();

		IJavaScriptUnit targetCu= null;
		ITypeBinding declaringType= null;
		IBinding callerBindingDecl= callerBinding;
		if (callerBinding instanceof IVariableBinding) {
			IVariableBinding variableBinding= (IVariableBinding) callerBinding;

			if (variableBinding.isEnumConstant()) {
				return;
			}
			if (!variableBinding.isField()) {
				targetCu= cu;
			} else {
				callerBindingDecl= variableBinding.getVariableDeclaration();
				ITypeBinding declaringClass= variableBinding.getDeclaringClass();
				if (declaringClass == null) {
					return; // array length
				}
				declaringType= declaringClass.getTypeDeclaration();
			}
		} else if (callerBinding instanceof IFunctionBinding) {
			IFunctionBinding methodBinding= (IFunctionBinding) callerBinding;
			if (!methodBinding.isConstructor()) {
				declaringType= methodBinding.getDeclaringClass().getTypeDeclaration();
				callerBindingDecl= methodBinding.getMethodDeclaration();
			}
		} else if (callerBinding instanceof ITypeBinding && nodeToCast.getLocationInParent() == SingleMemberAnnotation.TYPE_NAME_PROPERTY) {
			declaringType= (ITypeBinding) callerBinding;
			callerBindingDecl= Bindings.findMethodInType(declaringType, "value", (String[]) null); //$NON-NLS-1$
			if (callerBindingDecl == null) {
				return;
			}
		}

		if (declaringType != null && declaringType.isFromSource()) {
			targetCu= ASTResolving.findCompilationUnitForBinding(cu, astRoot, declaringType);
		}
		if (targetCu != null && ASTResolving.isUseableTypeInContext(castTypeBinding, callerBindingDecl, false)) {
			proposals.add(new TypeChangeCompletionProposal(targetCu, callerBindingDecl, astRoot, castTypeBinding, isAssignedNode, relevance));
		}

		// add interface to resulting type
		if (!isAssignedNode) {
			ITypeBinding nodeType= nodeToCast.resolveTypeBinding();
			if (castTypeBinding.isInterface() && nodeType != null && nodeType.isClass() && !nodeType.isAnonymous() && nodeType.isFromSource()) {
				ITypeBinding typeDecl= nodeType.getTypeDeclaration();
				IJavaScriptUnit nodeCu= ASTResolving.findCompilationUnitForBinding(cu, astRoot, typeDecl);
				if (nodeCu != null && ASTResolving.isUseableTypeInContext(castTypeBinding, typeDecl, true)) {
					proposals.add(new ImplementInterfaceProposal(nodeCu, typeDecl, astRoot, castTypeBinding, relevance - 1));
				}
			}
		}
	}

	public static ASTRewriteCorrectionProposal createCastProposal(IInvocationContext context, ITypeBinding castTypeBinding, Expression nodeToCast, int relevance) {
		IJavaScriptUnit cu= context.getCompilationUnit();

		String label;
		String castType= BindingLabelProvider.getBindingLabel(castTypeBinding, JavaScriptElementLabels.ALL_DEFAULT);
		if (nodeToCast.getNodeType() == ASTNode.CAST_EXPRESSION) {
			label= Messages.format(CorrectionMessages.TypeMismatchSubProcessor_changecast_description, castType);
		} else {
			label= Messages.format(CorrectionMessages.TypeMismatchSubProcessor_addcast_description, castType);
		}
		return new CastCompletionProposal(label, cu, nodeToCast, castTypeBinding, relevance);
	}

	public static void addIncompatibleReturnTypeProposals(IInvocationContext context, IProblemLocation problem, Collection proposals) throws JavaScriptModelException {
		JavaScriptUnit astRoot= context.getASTRoot();
		ASTNode selectedNode= problem.getCoveringNode(astRoot);
		if (selectedNode == null) {
			return;
		}
		FunctionDeclaration decl= ASTResolving.findParentMethodDeclaration(selectedNode);
		if (decl == null) {
			return;
		}
		IFunctionBinding methodDeclBinding= decl.resolveBinding();
		if (methodDeclBinding == null) {
			return;
		}

		IFunctionBinding overridden= Bindings.findOverriddenMethod(methodDeclBinding, false);
		if (overridden == null || overridden.getReturnType() == methodDeclBinding.getReturnType()) {
			return;
		}


		IJavaScriptUnit cu= context.getCompilationUnit();
		IFunctionBinding methodDecl= methodDeclBinding.getMethodDeclaration();
		proposals.add(new TypeChangeCompletionProposal(cu, methodDecl, astRoot, overridden.getReturnType(), false, 8));

		IJavaScriptUnit targetCu= cu;

		IFunctionBinding overriddenDecl= overridden.getMethodDeclaration();
		ITypeBinding overridenDeclType= overriddenDecl.getDeclaringClass();

		ITypeBinding returnType= methodDeclBinding.getReturnType();
		if (overridenDeclType.isFromSource()) {
			targetCu= ASTResolving.findCompilationUnitForBinding(cu, astRoot, overridenDeclType);
		}
		if (targetCu != null && ASTResolving.isUseableTypeInContext(returnType, overriddenDecl, false)) {
			TypeChangeCompletionProposal proposal= new TypeChangeCompletionProposal(targetCu, overriddenDecl, astRoot, returnType, false, 7);
			if (overridenDeclType.isInterface()) {
				proposal.setDisplayName(Messages.format(CorrectionMessages.TypeMismatchSubProcessor_changereturnofimplemented_description, overriddenDecl.getName()));
			} else {
				proposal.setDisplayName(Messages.format(CorrectionMessages.TypeMismatchSubProcessor_changereturnofoverridden_description, overriddenDecl.getName()));
			}
			proposals.add(proposal);
		}
	}

	public static void addIncompatibleThrowsProposals(IInvocationContext context, IProblemLocation problem, Collection proposals) throws JavaScriptModelException {
		JavaScriptUnit astRoot= context.getASTRoot();
		ASTNode selectedNode= problem.getCoveringNode(astRoot);
		if (!(selectedNode instanceof FunctionDeclaration)) {
			return;
		}
		FunctionDeclaration decl= (FunctionDeclaration) selectedNode;
		IFunctionBinding methodDeclBinding= decl.resolveBinding();
		if (methodDeclBinding == null) {
			return;
		}

		IFunctionBinding overridden= Bindings.findOverriddenMethod(methodDeclBinding, false);
		if (overridden == null) {
			return;
		}

		IJavaScriptUnit cu= context.getCompilationUnit();

		ITypeBinding[] methodExceptions= methodDeclBinding.getExceptionTypes();
		ITypeBinding[] definedExceptions= overridden.getExceptionTypes();

		ArrayList undeclaredExceptions= new ArrayList();
		{
			ChangeDescription[] changes= new ChangeDescription[methodExceptions.length];

			for (int i= 0; i < methodExceptions.length; i++) {
				if (!isDeclaredException(methodExceptions[i], definedExceptions)) {
					changes[i]= new RemoveDescription();
					undeclaredExceptions.add(methodExceptions[i]);
				}
			}
			String label= Messages.format(CorrectionMessages.TypeMismatchSubProcessor_removeexceptions_description, methodDeclBinding.getName());
			Image image= JavaPluginImages.get(JavaPluginImages.IMG_CORRECTION_REMOVE);
			proposals.add(new ChangeMethodSignatureProposal(label, cu, astRoot, methodDeclBinding, null, changes, 8, image));
		}

		ITypeBinding declaringType= overridden.getDeclaringClass();	
		IJavaScriptUnit targetCu= cu;
		if (declaringType.isFromSource()) {
			targetCu= ASTResolving.findCompilationUnitForBinding(cu, astRoot, declaringType);
		}
		if (targetCu != null) {
			ChangeDescription[] changes= new ChangeDescription[definedExceptions.length + undeclaredExceptions.size()];

			for (int i= 0; i < undeclaredExceptions.size(); i++) {
				changes[i + definedExceptions.length]= new InsertDescription((ITypeBinding) undeclaredExceptions.get(i), ""); //$NON-NLS-1$
			}
			IFunctionBinding overriddenDecl= overridden.getMethodDeclaration();
			String[] args= {  declaringType.getName(), overridden.getName() };
			String label= Messages.format(CorrectionMessages.TypeMismatchSubProcessor_addexceptions_description, args);
			Image image= JavaPluginImages.get(JavaPluginImages.IMG_CORRECTION_ADD);
			proposals.add(new ChangeMethodSignatureProposal(label, targetCu, astRoot, overriddenDecl, null, changes, 7, image));
		}
	}

	private static boolean isDeclaredException(ITypeBinding curr, ITypeBinding[] declared) {
		for (int i= 0; i < declared.length; i++) {
			if (Bindings.isSuperType(declared[i], curr)) {
				return true;
			}
		}
		return false;
	}


}
