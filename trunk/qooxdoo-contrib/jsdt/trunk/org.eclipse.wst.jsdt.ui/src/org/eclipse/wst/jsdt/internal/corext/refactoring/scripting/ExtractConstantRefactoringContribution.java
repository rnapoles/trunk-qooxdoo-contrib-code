/*******************************************************************************
 * Copyright (c) 2005, 2006 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.wst.jsdt.internal.corext.refactoring.scripting;

import org.eclipse.core.runtime.CoreException;
import org.eclipse.ltk.core.refactoring.Refactoring;
import org.eclipse.ltk.core.refactoring.RefactoringDescriptor;
import org.eclipse.wst.jsdt.core.ICompilationUnit;
import org.eclipse.wst.jsdt.internal.corext.refactoring.JDTRefactoringContribution;
import org.eclipse.wst.jsdt.internal.corext.refactoring.code.ExtractConstantRefactoring;

/**
 * Refactoring contribution for the extract constant refactoring.
 * 
 * @since 3.2
 */
public final class ExtractConstantRefactoringContribution extends JDTRefactoringContribution {

	/**
	 * {@inheritDoc}
	 */
	public final Refactoring createRefactoring(final RefactoringDescriptor descriptor) throws CoreException {
		return new ExtractConstantRefactoring((ICompilationUnit) null, 0, 0);
	}
}
