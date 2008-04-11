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
package org.eclipse.wst.jsdt.internal.core;

import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.wst.jsdt.core.JsGlobalScopeContainerInitializer;
import org.eclipse.wst.jsdt.core.IJsGlobalScopeContainer;
import org.eclipse.wst.jsdt.core.IJavaProject;
import org.eclipse.wst.jsdt.core.JavaCore;
import org.eclipse.wst.jsdt.core.UnimplementedException;
import org.eclipse.wst.jsdt.core.compiler.libraries.LibraryLocation;

/**
 *
 */
public class UserLibraryJsGlobalScopeContainerInitializer extends JsGlobalScopeContainerInitializer {

	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.JsGlobalScopeContainerInitializer#initialize(org.eclipse.core.runtime.IPath, org.eclipse.wst.jsdt.core.IJavaProject)
	 */
	public void initialize(IPath containerPath, IJavaProject project) throws CoreException {
		if (isUserLibraryContainer(containerPath)) {
			String userLibName= containerPath.segment(1);

			UserLibrary entries= UserLibraryManager.getUserLibrary(userLibName);
			if (entries != null) {
				UserLibraryJsGlobalScopeContainer container= new UserLibraryJsGlobalScopeContainer(userLibName);
				JavaCore.setJsGlobalScopeContainer(containerPath, new IJavaProject[] { project }, 	new IJsGlobalScopeContainer[] { container }, null);
			}
		}
	}

	private boolean isUserLibraryContainer(IPath path) {
		return path != null && path.segmentCount() == 2 && JavaCore.USER_LIBRARY_CONTAINER_ID.equals(path.segment(0));
	}

	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.JsGlobalScopeContainerInitializer#canUpdateJsGlobalScopeContainer(org.eclipse.core.runtime.IPath, org.eclipse.wst.jsdt.core.IJavaProject)
	 */
	public boolean canUpdateJsGlobalScopeContainer(IPath containerPath, IJavaProject project) {
		return isUserLibraryContainer(containerPath);
	}

	/**
	 * @see org.eclipse.wst.jsdt.core.JsGlobalScopeContainerInitializer#requestJsGlobalScopeContainerUpdate(org.eclipse.core.runtime.IPath, org.eclipse.wst.jsdt.core.IJavaProject, org.eclipse.wst.jsdt.core.IJsGlobalScopeContainer)
	 */
	public void requestJsGlobalScopeContainerUpdate(IPath containerPath, IJavaProject project, IJsGlobalScopeContainer containerSuggestion) throws CoreException {
		if (isUserLibraryContainer(containerPath)) {
			String name= containerPath.segment(1);
			if (containerSuggestion != null) {
				UserLibrary library= new UserLibrary(containerSuggestion.getClasspathEntries(), containerSuggestion.getKind() == IJsGlobalScopeContainer.K_SYSTEM);
				UserLibraryManager.setUserLibrary(name, library, null); // should use a real progress monitor
			} else {
				UserLibraryManager.setUserLibrary(name, null, null); // should use a real progress monitor
			}
		}
	}

	/**
	 * @see org.eclipse.wst.jsdt.core.JsGlobalScopeContainerInitializer#getDescription(org.eclipse.core.runtime.IPath, org.eclipse.wst.jsdt.core.IJavaProject)
	 */
	public String getDescription(IPath containerPath, IJavaProject project) {
		if (isUserLibraryContainer(containerPath)) {
			return containerPath.segment(1);
		}
		return super.getDescription(containerPath, project);
	}

	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.core.JsGlobalScopeContainerInitializer#getComparisonID(org.eclipse.core.runtime.IPath, org.eclipse.wst.jsdt.core.IJavaProject)
	 */
	public Object getComparisonID(IPath containerPath, IJavaProject project) {
		return containerPath;
	}

	public LibraryLocation getLibraryLocation() {
throw new UnimplementedException();
	}
}
