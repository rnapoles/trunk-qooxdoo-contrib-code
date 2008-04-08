/*******************************************************************************
 * Copyright (c) 2005 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/

package org.eclipse.wst.jsdt.internal.corext.refactoring;

import org.eclipse.wst.jsdt.core.ICompilationUnit;

/**
 * 
 */
public abstract class RefactoringElementFilter {

	/**
	 * @param cu the ICompilationUnit under test
	 * @return <code>true</code> iff the given ICompilationUnit should be
	 *         filtered (i.e., refactorings should not touch the compilation
	 *         unit)
	 */
	public abstract boolean filter(ICompilationUnit cu);
}
