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
package org.eclipse.wst.jsdt.internal.corext.refactoring.changes;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.runtime.Assert;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.SubProgressMonitor;
import org.eclipse.ltk.core.refactoring.Change;
import org.eclipse.ltk.core.refactoring.NullChange;
import org.eclipse.ltk.core.refactoring.RefactoringStatus;
import org.eclipse.ui.ide.undo.ResourceDescription;
import org.eclipse.wst.jsdt.core.ICompilationUnit;
import org.eclipse.wst.jsdt.core.IJavaElement;
import org.eclipse.wst.jsdt.core.IPackageFragment;
import org.eclipse.wst.jsdt.core.ISourceManipulation;
import org.eclipse.wst.jsdt.core.JavaCore;
import org.eclipse.wst.jsdt.internal.corext.refactoring.RefactoringCoreMessages;
import org.eclipse.wst.jsdt.internal.corext.refactoring.util.JavaElementUtil;
import org.eclipse.wst.jsdt.internal.corext.util.Messages;

/**
 * Caveat: undo of package fragment deletes is provided by a wrapping
 * UndoablePackageDeleteChange. This change returns a NullChange as undo for package fragments.
 */
public class DeleteSourceManipulationChange extends AbstractDeleteChange {

	private final String fHandle;
	private final boolean fIsExecuteChange;
	
	public DeleteSourceManipulationChange(ISourceManipulation sm, boolean isExecuteChange) { 
		Assert.isNotNull(sm);
		fHandle= getJavaElement(sm).getHandleIdentifier();
		fIsExecuteChange= isExecuteChange;
	}

	/*
	 * @see IChange#getName()
	 */
	public String getName() {
		return Messages.format(RefactoringCoreMessages.DeleteSourceManipulationChange_0, getElementName()); 
	}
	
	public RefactoringStatus isValid(IProgressMonitor pm) throws CoreException {
		ISourceManipulation element= getSourceManipulation();
		if (fIsExecuteChange) {
			if (element instanceof ICompilationUnit) {
				// don't check anything in this case. We have a warning dialog
				// already presented to the user that the file is dirty.
				return super.isValid(pm, NONE);
			} else {
				return super.isValid(pm, DIRTY);
			}
		} else {
			return super.isValid(pm, READ_ONLY | DIRTY);
		}
	}

	private String getElementName() {
		IJavaElement javaElement= getJavaElement(getSourceManipulation());
		if (JavaElementUtil.isDefaultPackage(javaElement))
			return RefactoringCoreMessages.DeleteSourceManipulationChange_1; 
		return javaElement.getElementName();
	}

	/*
	 * @see IChange#getModifiedLanguageElement()
	 */
	public Object getModifiedElement() {
		return JavaCore.create(fHandle);
	}
	
	/*
	 * @see DeleteChange#doDelete(IProgressMonitor)
	 */
	protected Change doDelete(IProgressMonitor pm) throws CoreException {
		ISourceManipulation element= getSourceManipulation();
		// we have to save dirty compilation units before deleting them. Otherwise
		// we will end up showing ghost compilation units in the package explorer
		// since the primary working copy still exists.
		if (element instanceof ICompilationUnit) {
			pm.beginTask("", 2); //$NON-NLS-1$
			ICompilationUnit unit= (ICompilationUnit)element;
			saveCUnitIfNeeded(unit, new SubProgressMonitor(pm, 1));
			
			IResource resource= unit.getResource();
			ResourceDescription resourceDescription = ResourceDescription.fromResource(resource);
			element.delete(false, new SubProgressMonitor(pm, 1));
			resourceDescription.recordStateFromHistory(resource, new SubProgressMonitor(pm, 1));
			return new UndoDeleteResourceChange(resourceDescription);
			
		} else if (element instanceof IPackageFragment) {
			ICompilationUnit[] units= ((IPackageFragment)element).getCompilationUnits();
			pm.beginTask("", units.length + 1); //$NON-NLS-1$
			for (int i = 0; i < units.length; i++) {
				// fix https://bugs.eclipse.org/bugs/show_bug.cgi?id=66835
				saveCUnitIfNeeded(units[i], new SubProgressMonitor(pm, 1));
			}
			element.delete(false, new SubProgressMonitor(pm, 1));
			return new NullChange(); // caveat: real undo implemented by UndoablePackageDeleteChange
			
		} else {
			element.delete(false, pm);
			return null; //should not happen
		}
	}
		
	private ISourceManipulation getSourceManipulation() {
		return (ISourceManipulation) getModifiedElement();
	}

	private static IJavaElement getJavaElement(ISourceManipulation sm) {
		//all known ISourceManipulations are IJavaElements
		return (IJavaElement)sm;
	}
	
	private static void saveCUnitIfNeeded(ICompilationUnit unit, IProgressMonitor pm) throws CoreException {
		saveFileIfNeeded((IFile)unit.getResource(), pm);
	}
}

