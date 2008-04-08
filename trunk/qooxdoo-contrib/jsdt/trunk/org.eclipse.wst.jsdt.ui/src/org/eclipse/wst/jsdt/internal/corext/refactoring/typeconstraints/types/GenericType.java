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
package org.eclipse.wst.jsdt.internal.corext.refactoring.typeconstraints.types;

import org.eclipse.core.runtime.Assert;
import org.eclipse.wst.jsdt.core.IType;
import org.eclipse.wst.jsdt.core.dom.ITypeBinding;


public final class GenericType extends HierarchyType {
	
	private TypeVariable[] fTypeParameters;
	
	protected GenericType(TypeEnvironment environment) {
		super(environment);
	}

	protected void initialize(ITypeBinding binding, IType javaElementType) {
		Assert.isTrue(binding.isGenericType());
		super.initialize(binding, javaElementType);
		TypeEnvironment environment= getEnvironment();
		ITypeBinding[] typeParameters= binding.getTypeParameters();
		fTypeParameters= new TypeVariable[typeParameters.length];
		for (int i= 0; i < typeParameters.length; i++) {
			fTypeParameters[i]= (TypeVariable) environment.create(typeParameters[i]);
		}
	}
	
	public int getKind() {
		return GENERIC_TYPE;
	}
	
	public TypeVariable[] getTypeParameters() {
		return (TypeVariable[]) fTypeParameters.clone();
	}
	
	public boolean doEquals(TType type) {
		return getJavaElementType().equals(((GenericType)type).getJavaElementType());
	}
	
	public int hashCode() {
		return getJavaElementType().hashCode();
	}
	
	protected boolean doCanAssignTo(TType type) {
		return false;
	}
	
	protected boolean isTypeEquivalentTo(TType other) {
		int otherElementType= other.getKind();
		if (otherElementType == RAW_TYPE || otherElementType == PARAMETERIZED_TYPE)
			return getErasure().isTypeEquivalentTo(other.getErasure());
		return super.isTypeEquivalentTo(other);
	}
	
	public String getName() {
		return getJavaElementType().getElementName();
	}
	
	protected String getPlainPrettySignature() {
		StringBuffer result= new StringBuffer(getJavaElementType().getFullyQualifiedName('.'));
		result.append("<"); //$NON-NLS-1$
		result.append(fTypeParameters[0].getPrettySignature());
		for (int i= 1; i < fTypeParameters.length; i++) {
			result.append(", "); //$NON-NLS-1$
			result.append(fTypeParameters[i].getPrettySignature());
		}
		result.append(">"); //$NON-NLS-1$
		return result.toString();
	}
}
