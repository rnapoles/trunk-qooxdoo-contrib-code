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
import org.eclipse.wst.jsdt.core.ast.IAnnotationFunctionDeclaration;
import org.eclipse.wst.jsdt.internal.compiler.ASTVisitor;
import org.eclipse.wst.jsdt.internal.compiler.CompilationResult;
import org.eclipse.wst.jsdt.internal.compiler.lookup.ClassScope;
import org.eclipse.wst.jsdt.internal.compiler.lookup.TypeBinding;
import org.eclipse.wst.jsdt.internal.compiler.parser.Parser;

public class AnnotationMethodDeclaration extends MethodDeclaration implements IAnnotationFunctionDeclaration {

	public Expression defaultValue;
	public int extendedDimensions;

	/**
	 * FunctionDeclaration constructor comment.
	 */
	public AnnotationMethodDeclaration(CompilationResult compilationResult) {
		super(compilationResult);
	}



	public boolean isAnnotationMethod() {

		return true;
	}

	public boolean isMethod() {

		return false;
	}

	public void parseStatements(Parser parser, CompilationUnitDeclaration unit) {
		// nothing to do
		// annotation type member declaration don't have any body
	}

	public StringBuffer print(int tab, StringBuffer output) {

		printIndent(tab, output);
		printModifiers(this.modifiers, output);
		if (this.annotations != null) printAnnotations(this.annotations, output);

		TypeParameter[] typeParams = typeParameters();
		if (typeParams != null) {
			output.append('<');
			int max = typeParams.length - 1;
			for (int j = 0; j < max; j++) {
				typeParams[j].print(0, output);
				output.append(", ");//$NON-NLS-1$
			}
			typeParams[max].print(0, output);
			output.append('>');
		}

		printReturnType(0, output).append(this.selector).append('(');
		if (this.arguments != null) {
			for (int i = 0; i < this.arguments.length; i++) {
				if (i > 0) output.append(", "); //$NON-NLS-1$
				this.arguments[i].print(0, output);
			}
		}
		output.append(')');
		if (this.thrownExceptions != null) {
			output.append(" throws "); //$NON-NLS-1$
			for (int i = 0; i < this.thrownExceptions.length; i++) {
				if (i > 0) output.append(", "); //$NON-NLS-1$
				this.thrownExceptions[i].print(0, output);
			}
		}

		if (this.defaultValue != null) {
			output.append(" default "); //$NON-NLS-1$
			this.defaultValue.print(0, output);
		}

		printBody(tab + 1, output);
		return output;
	}

	public void resolveStatements() {

		super.resolveStatements();
		if (this.arguments != null) {
			scope.problemReporter().annotationMembersCannotHaveParameters(this);
		}
		if (this.typeParameters != null) {
			scope.problemReporter().annotationMembersCannotHaveTypeParameters(this);
		}
		if (this.extendedDimensions != 0) {
			scope.problemReporter().illegalExtendedDimensions(this);
		}
		if (this.binding == null) return;
		TypeBinding returnTypeBinding = this.binding.returnType;
		if (returnTypeBinding != null) {

			// annotation methods can only return base types, String, Class, enum type, annotation types and arrays of these
			checkAnnotationMethodType: {
				TypeBinding leafReturnType = returnTypeBinding.leafComponentType();
				if (returnTypeBinding.dimensions() <= 1) { // only 1-dimensional array permitted
					switch (leafReturnType.erasure().id) {
						case T_byte :
						case T_short :
						case T_char :
						case T_int :
						case T_long :
						case T_float :
						case T_double :
						case T_boolean :
						case T_JavaLangString :
						case T_JavaLangClass :
							break checkAnnotationMethodType;
					}
					if (leafReturnType.isEnum() || leafReturnType.isAnnotationType())
						break checkAnnotationMethodType;
				}
				scope.problemReporter().invalidAnnotationMemberType(this);
			}
			if (this.defaultValue != null) {
				MemberValuePair pair = new MemberValuePair(this.selector, this.sourceStart, this.sourceEnd, this.defaultValue);
				pair.binding = this.binding;
				pair.resolveTypeExpecting(scope, returnTypeBinding);
				this.binding.setDefaultValue(org.eclipse.wst.jsdt.internal.compiler.lookup.ElementValuePair.getValue(this.defaultValue));
			} else { // let it know it does not have a default value so it won't try to find it
				this.binding.setDefaultValue(null);
			}
		}
	}

	public void traverse(
		ASTVisitor visitor,
		ClassScope classScope) {

		if (visitor.visit(this, classScope)) {
			if (this.annotations != null) {
				int annotationsLength = this.annotations.length;
				for (int i = 0; i < annotationsLength; i++)
					this.annotations[i].traverse(visitor, scope);
			}
			if (this.returnType != null) {
				this.returnType.traverse(visitor, scope);
			}
			if (this.defaultValue != null) {
				this.defaultValue.traverse(visitor, scope);
			}
		}
		visitor.endVisit(this, classScope);
	}
	public int getASTType() {
		return IASTNode.ANNOTATION_FUNCTION_DECLARATION;
	
	}
}
