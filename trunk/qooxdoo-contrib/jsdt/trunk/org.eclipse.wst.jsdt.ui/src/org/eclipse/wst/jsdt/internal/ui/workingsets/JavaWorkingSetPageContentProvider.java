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
package org.eclipse.wst.jsdt.internal.ui.workingsets;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.wst.jsdt.core.IJavaModel;
import org.eclipse.wst.jsdt.core.IPackageFragment;
import org.eclipse.wst.jsdt.core.IPackageFragmentRoot;
import org.eclipse.wst.jsdt.core.JavaModelException;
import org.eclipse.wst.jsdt.ui.StandardJavaElementContentProvider;

class JavaWorkingSetPageContentProvider extends StandardJavaElementContentProvider {
	
	public boolean hasChildren(Object element) {

		if (element instanceof IProject && !((IProject)element).isAccessible())
			return false;

		if (element instanceof IPackageFragment) {
			IPackageFragment pkg= (IPackageFragment)element;
			try {
				if (pkg.getKind() == IPackageFragmentRoot.K_BINARY)
					return pkg.getChildren().length > 0;
			} catch (JavaModelException ex) {
				// use super behavior
			}
		}
		return super.hasChildren(element);
	}

	public Object[] getChildren(Object parentElement) {
		try {
			if (parentElement instanceof IJavaModel) 
				return concatenate(super.getChildren(parentElement), getNonJavaProjects((IJavaModel)parentElement));
			
			if (parentElement instanceof IProject) 
				return ((IProject)parentElement).members();

			return super.getChildren(parentElement);
		} catch (CoreException e) {
			return NO_CHILDREN;
		}
	}

	private Object[] getNonJavaProjects(IJavaModel model) throws JavaModelException {
		return model.getNonJavaResources();
	}
}
