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
package org.eclipse.wst.jsdt.internal.corext.refactoring.code;

import java.util.List;

import org.eclipse.wst.jsdt.core.dom.ASTNode;
import org.eclipse.wst.jsdt.core.dom.ClassInstanceCreation;
import org.eclipse.wst.jsdt.core.dom.IMethodBinding;
import org.eclipse.wst.jsdt.core.dom.ITypeBinding;
import org.eclipse.wst.jsdt.core.dom.MethodInvocation;
import org.eclipse.wst.jsdt.core.dom.SimpleName;
import org.eclipse.wst.jsdt.core.dom.SuperMethodInvocation;
import org.eclipse.wst.jsdt.core.dom.ThrowStatement;
import org.eclipse.wst.jsdt.internal.corext.refactoring.util.AbstractExceptionAnalyzer;

/* package */ class ExceptionAnalyzer extends AbstractExceptionAnalyzer {

	public static ITypeBinding[] perform(ASTNode[] statements) {
		ExceptionAnalyzer analyzer= new ExceptionAnalyzer();
		for (int i= 0; i < statements.length; i++) {
			statements[i].accept(analyzer);
		}
		List exceptions= analyzer.getCurrentExceptions();
		return (ITypeBinding[]) exceptions.toArray(new ITypeBinding[exceptions.size()]);
	}

	public boolean visit(ThrowStatement node) {
		ITypeBinding exception= node.getExpression().resolveTypeBinding();
		if (exception == null)		// Safety net for null bindings when compiling fails.
			return true;
		
		addException(exception);
		return true;
	}
	
	public boolean visit(MethodInvocation node) {
		SimpleName name = node.getName();
		if (name!=null)
			return handleExceptions((IMethodBinding)name.resolveBinding());
		else
			return true;
	}
	
	public boolean visit(SuperMethodInvocation node) {
		return handleExceptions((IMethodBinding)node.getName().resolveBinding());
	}
	
	public boolean visit(ClassInstanceCreation node) {
		return handleExceptions(node.resolveConstructorBinding());
	}
	
	private boolean handleExceptions(IMethodBinding binding) {
		if (binding == null)
			return true;
		addExceptions(binding.getExceptionTypes());
		return true;
	}	
}
