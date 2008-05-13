/*******************************************************************************
 * Copyright (c) 2005, 2008 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.wst.jsdt.internal.core;

import java.util.Map;

import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.IPath;
import org.eclipse.wst.jsdt.core.IJavaScriptElement;
import org.eclipse.wst.jsdt.core.IJsGlobalScopeContainer;
import org.eclipse.wst.jsdt.core.IPackageFragmentRoot;
import org.eclipse.wst.jsdt.core.JavaScriptModelException;
import org.eclipse.wst.jsdt.core.JsGlobalScopeContainerInitializer;



public class LibraryFragmentRoot extends PackageFragmentRoot{

	protected final IPath libraryPath;
	protected boolean[] fLangeRuntime= new boolean[] {false,false};

	protected LibraryFragmentRoot(IPath jarPath, JavaProject project) {
		super(null, project);
		this.libraryPath = jarPath;
	}

	/**
	 * Constructs a package fragment root which is the root of the Java package directory hierarchy
	 * based on a JAR file.
	 */
	protected LibraryFragmentRoot(IResource resource, JavaProject project) {
		super(resource, project);
		this.libraryPath = resource.getFullPath();
	}

	public PackageFragment getPackageFragment(String[] pkgName) {
		return new LibraryPackageFragment(this, pkgName);
	}


	public IPath getPath() {
		if (isExternal()) {
			return this.libraryPath;
		} else {
			return super.getPath();
		}
	}

	public IPath getLocation() {
		if (isExternal()) {
			return this.libraryPath;
		} else {
			return super.getLocation();
		}
	}

	public IResource getUnderlyingResource() throws JavaScriptModelException {
		if (isExternal()) {
			if (!exists()) throw newNotPresentException();
			return null;
		} else {
			return super.getUnderlyingResource();
		}
	}
	public IResource getResource() {
		if (this.resource == null) {
			this.resource = JavaModel.getTarget(ResourcesPlugin.getWorkspace().getRoot(), this.libraryPath, false);
		}
		if (this.resource instanceof IResource) {
			return super.getResource();
		} else {
			// external jar
			return null;
		}
	}

	protected boolean computeChildren(OpenableElementInfo info, Map newElements) throws JavaScriptModelException {

		String name[]={""};//libraryPath.lastSegment()}; //$NON-NLS-1$
		LibraryPackageFragment packFrag=  new LibraryPackageFragment(this, name);
		LibraryPackageFragmentInfo fragInfo= new LibraryPackageFragmentInfo();

 		packFrag.computeChildren(fragInfo);


		newElements.put(packFrag, fragInfo);

		IJavaScriptElement[] children= new IJavaScriptElement[]{packFrag};
		info.setChildren(children);
		return true;
	}

	protected Object createElementInfo() {
		return new LibraryFragmentRootInfo();
	}


	protected int determineKind(IResource underlyingResource) {
		return IPackageFragmentRoot.K_BINARY;
	}
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o instanceof LibraryFragmentRoot) {
			LibraryFragmentRoot other= (LibraryFragmentRoot) o;
			return this.libraryPath.equals(other.libraryPath);
		}
		return false;
	}
	public String getElementName() {
		//return "";
		return this.libraryPath.lastSegment();
	}


	public int hashCode() {
		return this.libraryPath.hashCode();
	}

	public boolean isExternal() {
		return getResource() == null;
	}
	/**
	 * Jars and jar entries are all read only
	 */
	public boolean isReadOnly() {
		return true;
	}

	/**
 * Returns whether the corresponding resource or associated file exists
 */
protected boolean resourceExists() {
	if (this.isExternal()) {
		return
			JavaModel.getTarget(
				ResourcesPlugin.getWorkspace().getRoot(),
				this.getPath(), // don't make the path relative as this is an external archive
				true) != null;
	} else {
		return super.resourceExists();
	}
}

//private ClassFile getLibraryClassFile(){
//	try {
//		ArrayList childrenOfType = getChildrenOfType(IJavaScriptElement.PACKAGE_FRAGMENT);
//		if (!childrenOfType.isEmpty())
//		{
//			IPackageFragment child=(IPackageFragment)childrenOfType.get(0);
//			IClassFile[] classFiles = child.getClassFiles();
//			if (classFiles!=null && classFiles.length>0)
//				return (ClassFile)classFiles[0];
//		}
//	} catch (JavaScriptModelException e) {
//		// TODO Auto-generated catch block
//		e.printStackTrace();
//	}
//	return null;
//}

	protected void toStringAncestors(StringBuffer buffer) {
		if (isExternal())
			// don't show project as it is irrelevant for external jar files.
			// also see https://bugs.eclipse.org/bugs/show_bug.cgi?id=146615
			return;
		super.toStringAncestors(buffer);
	}

	public boolean isResourceContainer() {
		return false;
	}
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.internal.core.JavaElement#getDisplayName()
	 */
	public String getDisplayName() {

		JsGlobalScopeContainerInitializer containerInitializer = getContainerInitializer();
		if(containerInitializer!=null) return containerInitializer.getDescription(getPath(), getJavaScriptProject());
		return super.getDisplayName();

	}



	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.internal.core.JavaElement#isVirtual()
	 */
	public boolean isVirtual() {
		return true;
	}

	public boolean isLanguageRuntime() {
		if(fLangeRuntime[0]) {
			return fLangeRuntime[1];
		}

		JsGlobalScopeContainerInitializer init = getContainerInitializer();
		if(init==null) {
			fLangeRuntime[0]=true;
			fLangeRuntime[1]=false;
			return fLangeRuntime[1];
		}
		fLangeRuntime[1]= init.getKind()==IJsGlobalScopeContainer.K_SYSTEM ||init.getKind()==IJsGlobalScopeContainer.K_DEFAULT_SYSTEM ;
		fLangeRuntime[0]=true;
		return fLangeRuntime[1];
	}

	public boolean isLibrary() {
		return true;
	}
}
