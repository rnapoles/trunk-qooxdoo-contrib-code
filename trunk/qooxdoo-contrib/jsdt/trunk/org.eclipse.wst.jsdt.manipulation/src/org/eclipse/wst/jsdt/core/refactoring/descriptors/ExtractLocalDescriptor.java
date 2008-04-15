/*******************************************************************************
 * Copyright (c) 2006 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.wst.jsdt.core.refactoring.descriptors;

import org.eclipse.wst.jsdt.core.refactoring.IJavaRefactorings;

/**
 * Refactoring descriptor for the extract local variable refactoring.
 * <p>
 * An instance of this refactoring descriptor may be obtained by calling
 * contribution requested by invoking
 * {@link org.eclipse.ltk.core.refactoring.RefactoringCore#getRefactoringContribution(String)} with the
 * appropriate refactoring id.
 * </p>
 * <p>
 * Note: this class is not intended to be instantiated by clients.
 * </p>
 * 
 * @since 3.3
 */
public final class ExtractLocalDescriptor extends JavaRefactoringDescriptor {

	/**
	 * Creates a new refactoring descriptor.
	 */
	public ExtractLocalDescriptor() {
		super(IJavaRefactorings.EXTRACT_LOCAL_VARIABLE);
	}
}