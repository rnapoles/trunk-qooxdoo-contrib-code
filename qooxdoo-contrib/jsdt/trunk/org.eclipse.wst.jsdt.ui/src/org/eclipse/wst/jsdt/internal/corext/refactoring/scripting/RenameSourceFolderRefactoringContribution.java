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

import org.eclipse.ltk.core.refactoring.Refactoring;
import org.eclipse.ltk.core.refactoring.RefactoringDescriptor;
import org.eclipse.wst.jsdt.core.refactoring.IJavaRefactorings;
import org.eclipse.wst.jsdt.core.refactoring.descriptors.RenameJavaElementDescriptor;
import org.eclipse.wst.jsdt.internal.corext.refactoring.JDTRefactoringContribution;
import org.eclipse.wst.jsdt.internal.corext.refactoring.rename.JavaRenameRefactoring;
import org.eclipse.wst.jsdt.internal.corext.refactoring.rename.RenameSourceFolderProcessor;

/**
 * Refactoring contribution for the rename source folder refactoring.
 * 
 * @since 3.2
 */
public final class RenameSourceFolderRefactoringContribution extends JDTRefactoringContribution {

	/**
	 * {@inheritDoc}
	 */
	public Refactoring createRefactoring(final RefactoringDescriptor descriptor) {
		return new JavaRenameRefactoring(new RenameSourceFolderProcessor(null));
	}
	
	/**
	 * {@inheritDoc}
	 */
	public RefactoringDescriptor createDescriptor() {
		return new RenameJavaElementDescriptor(IJavaRefactorings.RENAME_SOURCE_FOLDER);
	}
}
