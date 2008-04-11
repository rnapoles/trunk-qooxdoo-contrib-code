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
package org.eclipse.wst.jsdt.internal.core;

import java.util.Iterator;
import java.util.List;

import org.eclipse.jface.text.IDocument;
import org.eclipse.wst.jsdt.core.ICompilationUnit;
import org.eclipse.wst.jsdt.core.IJavaElement;
import org.eclipse.wst.jsdt.core.IJavaModelStatus;
import org.eclipse.wst.jsdt.core.IJavaModelStatusConstants;
import org.eclipse.wst.jsdt.core.IType;
import org.eclipse.wst.jsdt.core.JavaModelException;
import org.eclipse.wst.jsdt.core.Signature;
import org.eclipse.wst.jsdt.core.dom.ASTNode;
import org.eclipse.wst.jsdt.core.dom.MethodDeclaration;
import org.eclipse.wst.jsdt.core.dom.SimpleName;
import org.eclipse.wst.jsdt.core.dom.SingleVariableDeclaration;
import org.eclipse.wst.jsdt.core.dom.rewrite.ASTRewrite;
import org.eclipse.wst.jsdt.internal.core.util.Messages;
import org.eclipse.wst.jsdt.internal.core.util.Util;

/**
 * <p>This operation creates an instance method.
 *
 * <p>Required Attributes:<ul>
 *  <li>Containing type
 *  <li>The source code for the method. No verification of the source is
 *      performed.
 * </ul>
 */
public class CreateMethodOperation extends CreateTypeMemberOperation {

	protected String[] parameterTypes;

/**
 * When executed, this operation will create a method
 * in the given type with the specified source.
 */
public CreateMethodOperation(IJavaElement parentElement, String source, boolean force) {
	super(parentElement, source, force);
}
/**
 * Returns the type signatures of the parameter types of the
 * current <code>MethodDeclaration</code>
 */
protected String[] convertASTMethodTypesToSignatures() {
	if (this.parameterTypes == null) {
		if (this.createdNode != null) {
			MethodDeclaration methodDeclaration = (MethodDeclaration) this.createdNode;
			List parameters = methodDeclaration.parameters();
			int size = parameters.size();
			this.parameterTypes = new String[size];
			Iterator iterator = parameters.iterator();
			// convert the AST types to signatures
			for (int i = 0; i < size; i++) {
				SingleVariableDeclaration parameter = (SingleVariableDeclaration) iterator.next();
				String typeSig = Util.getSignature(parameter.getType());
				int extraDimensions = parameter.getExtraDimensions();
				if (methodDeclaration.isVarargs() && i == size-1)
					extraDimensions++;
				this.parameterTypes[i] = Signature.createArraySignature(typeSig, extraDimensions);
			}
		}
	}
	return this.parameterTypes;
}
protected ASTNode generateElementAST(ASTRewrite rewriter, IDocument document, ICompilationUnit cu) throws JavaModelException {
	ASTNode node = super.generateElementAST(rewriter, document, cu);
	if (node.getNodeType() != ASTNode.METHOD_DECLARATION)
		throw new JavaModelException(new JavaModelStatus(IJavaModelStatusConstants.INVALID_CONTENTS));
	return node;
}
/**
 * @see CreateElementInCUOperation#generateResultHandle
 */
protected IJavaElement generateResultHandle() {
	String[] types = convertASTMethodTypesToSignatures();
	String name = getASTNodeName();
	if (getType()!=null)
		return getType().getMethod(name, types);
	return getCompilationUnit().getMethod(name,types);
}
private String getASTNodeName() {
	return ((MethodDeclaration) this.createdNode).getName().getIdentifier();
}
/**
 * @see CreateElementInCUOperation#getMainTaskName()
 */
public String getMainTaskName(){
	return Messages.operation_createMethodProgress;
}
protected SimpleName rename(ASTNode node, SimpleName newName) {
	MethodDeclaration method = (MethodDeclaration) node;
	SimpleName oldName = method.getName();
	method.setName(newName);
	return oldName;
}
/**
 * @see CreateTypeMemberOperation#verifyNameCollision
 */
	protected IJavaModelStatus verifyNameCollision() {
		if (this.createdNode != null) {
			IType type = getType();
			String name;
			if (((MethodDeclaration) this.createdNode).isConstructor())
				name = type.getElementName();
			else
				name = getASTNodeName();
			String[] types = convertASTMethodTypesToSignatures();
			if (type != null) {
				if (type.getMethod(name, types).exists())
					return new JavaModelStatus(
							IJavaModelStatusConstants.NAME_COLLISION, Messages
									.bind(Messages.status_nameCollision, name));
			} else {
				if (this.getCompilationUnit().getMethod(name, types).exists())
					return new JavaModelStatus(
							IJavaModelStatusConstants.NAME_COLLISION, Messages
									.bind(Messages.status_nameCollision, name));
			}

		}
		return JavaModelStatus.VERIFIED_OK;
	}
}
