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
package org.eclipse.wst.jsdt.internal.compiler.ast;

import org.eclipse.wst.jsdt.core.ast.IASTNode;
import org.eclipse.wst.jsdt.core.ast.IQualifiedSuperReference;
import org.eclipse.wst.jsdt.internal.compiler.ASTVisitor;
import org.eclipse.wst.jsdt.internal.compiler.lookup.BlockScope;
import org.eclipse.wst.jsdt.internal.compiler.lookup.ClassScope;
import org.eclipse.wst.jsdt.internal.compiler.lookup.TypeBinding;

public class QualifiedSuperReference extends QualifiedThisReference implements IQualifiedSuperReference {

	public QualifiedSuperReference(TypeReference name, int pos, int sourceEnd) {
		super(name, pos, sourceEnd);
	}

	public boolean isSuper() {

		return true;
	}

	public boolean isThis() {

		return false;
	}

	public StringBuffer printExpression(int indent, StringBuffer output) {

		return qualification.print(0, output).append(".super"); //$NON-NLS-1$
	}

	public TypeBinding resolveType(BlockScope scope) {

		if ((this.bits & ParenthesizedMASK) != 0) {
			scope.problemReporter().invalidParenthesizedExpression(this);
			return null;
		}
		super.resolveType(scope);
		if (currentCompatibleType == null)
			return null; // error case

		if (currentCompatibleType.id == T_JavaLangObject) {
			scope.problemReporter().cannotUseSuperInJavaLangObject(this);
			return null;
		}
		return this.resolvedType = currentCompatibleType.superclass();
	}

	public void traverse(
		ASTVisitor visitor,
		BlockScope blockScope) {

		if (visitor.visit(this, blockScope)) {
			qualification.traverse(visitor, blockScope);
		}
		visitor.endVisit(this, blockScope);
	}
	public void traverse(
			ASTVisitor visitor,
			ClassScope blockScope) {

		if (visitor.visit(this, blockScope)) {
			qualification.traverse(visitor, blockScope);
		}
		visitor.endVisit(this, blockScope);
	}
	public int getASTType() {
		return IASTNode.QUALIFIED_SUPER_REFERENCE;
	
	}
}
