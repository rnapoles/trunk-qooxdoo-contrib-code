/*******************************************************************************
 * Copyright (c) 2000, 2006 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.wst.jsdt.internal.corext.dom;

import org.eclipse.core.runtime.Assert;
import org.eclipse.wst.jsdt.core.dom.ASTNode;
import org.eclipse.wst.jsdt.core.dom.ASTVisitor;
import org.eclipse.wst.jsdt.core.dom.BodyDeclaration;
import org.eclipse.wst.jsdt.core.dom.IVariableBinding;
import org.eclipse.wst.jsdt.core.dom.Initializer;
import org.eclipse.wst.jsdt.core.dom.MethodDeclaration;
import org.eclipse.wst.jsdt.core.dom.SingleVariableDeclaration;
import org.eclipse.wst.jsdt.core.dom.VariableDeclarationFragment;


public class LocalVariableIndex extends ASTVisitor {
	
	private int fTopIndex;
	
	/**
	 * Computes the maximum number of local variable declarations in the 
	 * given body declaration.
	 *  
	 * @param declaration the body declaration. Must either be a method
	 *  declaration or an initializer.
	 * @return the maximum number of local variables
	 */
	public static int perform(BodyDeclaration declaration) {
		Assert.isTrue(declaration != null);
		switch (declaration.getNodeType()) {
			case ASTNode.METHOD_DECLARATION:
				return internalPerform((MethodDeclaration)declaration);
			case ASTNode.INITIALIZER:
				return internalPerform((Initializer)declaration);
			default:
				Assert.isTrue(false);
		}
		return -1;
	}
	
	private static int internalPerform(MethodDeclaration method) {
		// we have to find the outermost method declaration since a local or anonymous
		// type can reference final variables from the outer scope.
		MethodDeclaration target= method;
		while (ASTNodes.getParent(target, ASTNode.METHOD_DECLARATION) != null) {
			target= (MethodDeclaration)ASTNodes.getParent(target, ASTNode.METHOD_DECLARATION);
		}
		return doPerform(target);
	}

	private static int internalPerform(Initializer initializer) {
		return doPerform(initializer);
	}

	private static int doPerform(BodyDeclaration node) {
		LocalVariableIndex counter= new LocalVariableIndex();
		node.accept(counter);
		return counter.fTopIndex;
	}

	public boolean visit(SingleVariableDeclaration node) {
		handleVariableBinding(node.resolveBinding());
		return true;
	}
	
	public boolean visit(VariableDeclarationFragment node) {
		handleVariableBinding(node.resolveBinding());
		return true;
	}
	
	private void handleVariableBinding(IVariableBinding binding) {
		if (binding == null)
			return;
		fTopIndex= Math.max(fTopIndex, binding.getVariableId());
	}
}
