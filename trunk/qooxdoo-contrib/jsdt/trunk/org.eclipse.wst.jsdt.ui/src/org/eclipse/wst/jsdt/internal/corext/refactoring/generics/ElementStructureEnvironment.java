/*******************************************************************************
 * Copyright (c) 2000, 2007 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Robert M. Fuhrer (rfuhrer@watson.ibm.com), IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.wst.jsdt.internal.corext.refactoring.generics;

import java.util.LinkedHashMap;
import java.util.Map;

import org.eclipse.wst.jsdt.internal.corext.refactoring.generics.ParametricStructureComputer.ParametricStructure;
import org.eclipse.wst.jsdt.internal.corext.refactoring.typeconstraints2.ConstraintVariable2;

/*package*/ final class ElementStructureEnvironment {
	private final Map/*<ConstraintVariable, IType>*/ fElemStructure;

	public ElementStructureEnvironment(){
		fElemStructure= new LinkedHashMap();
	}
	
	public void setElemStructure(ConstraintVariable2 v, ParametricStructure t) {
		fElemStructure.put(v, t);
	}

	public ParametricStructure elemStructure(ConstraintVariable2 v) {
		return (ParametricStructure) fElemStructure.get(v);
	}
}
