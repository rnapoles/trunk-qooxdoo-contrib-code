/*******************************************************************************
 * Copyright (c) 2000, 2008 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.wst.jsdt.ui;

import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IResourceDelta;
import org.eclipse.jface.viewers.IBasicPropertyConstants;
import org.eclipse.jface.viewers.ITreeContentProvider;
import org.eclipse.jface.viewers.TreeViewer;
import org.eclipse.jface.viewers.Viewer;
import org.eclipse.swt.widgets.Control;
import org.eclipse.wst.jsdt.core.ElementChangedEvent;
import org.eclipse.wst.jsdt.core.IClassFile;
import org.eclipse.wst.jsdt.core.IJavaScriptUnit;
import org.eclipse.wst.jsdt.core.IElementChangedListener;
import org.eclipse.wst.jsdt.core.IJavaScriptElement;
import org.eclipse.wst.jsdt.core.IJavaScriptElementDelta;
import org.eclipse.wst.jsdt.core.IJavaScriptProject;
import org.eclipse.wst.jsdt.core.IPackageFragment;
import org.eclipse.wst.jsdt.core.IPackageFragmentRoot;
import org.eclipse.wst.jsdt.core.JavaScriptCore;
import org.eclipse.wst.jsdt.core.JavaScriptModelException;
import org.eclipse.wst.jsdt.internal.corext.util.JavaModelUtil;
import org.eclipse.wst.jsdt.internal.ui.JavaScriptPlugin;
 
/**
 * A tree content provider for Java elements. It extends the 
 * StandardJavaScriptElementContentProvider with support for listening to changes.
 * <p>
 * This class may be instantiated; it is not intended to be subclassed.
 * </p>
 *  * Provisional API: This class/interface is part of an interim API that is still under development and expected to
 * change significantly before reaching stability. It is being made available at this early stage to solicit feedback
 * from pioneering adopters on the understanding that any code that uses this API will almost certainly be broken
 * (repeatedly) as the API evolves.
 * @deprecated use the StandardJavaScriptElementContentProvider instead
 * @see StandardJavaScriptElementContentProvider
 */
public class JavaScriptElementContentProvider extends StandardJavaScriptElementContentProvider implements ITreeContentProvider, IElementChangedListener {
	
	/** The tree viewer */
	protected TreeViewer fViewer;
	/** The input object */
	protected Object fInput;
	
	/* (non-Javadoc)
	 * Method declared on IContentProvider.
	 */
	public void dispose() {
		super.dispose();
		JavaScriptCore.removeElementChangedListener(this);
	}

	/* (non-Javadoc)
	 * Method declared on IContentProvider.
	 */
	public void inputChanged(Viewer viewer, Object oldInput, Object newInput) {
		super.inputChanged(viewer, oldInput, newInput);
		fViewer= (TreeViewer)viewer;
		if (oldInput == null && newInput != null) {
			JavaScriptCore.addElementChangedListener(this); 
		} else if (oldInput != null && newInput == null) {
			JavaScriptCore.removeElementChangedListener(this); 
		}
		fInput= newInput;
	}
	/**
	 * Creates a new content provider for Java elements.
	 */
	public JavaScriptElementContentProvider() {
	}

	/**
	 * Creates a new content provider for Java elements.
	 * 
	 * @param provideMembers if <code>true</code> members below compilation units
	 * and class files are provided. 
	 * @param provideWorkingCopy if <code>true</code> the element provider provides
	 * working copies for members of compilation units which have an associated working 
	 * copy. Otherwise only original elements are provided.
	 * 
	 * @since 2.0
	 */
	public JavaScriptElementContentProvider(boolean provideMembers, boolean provideWorkingCopy) {
		super(provideMembers, provideWorkingCopy);
	}
	
	/* (non-Javadoc)
	 * Method declared on IElementChangedListener.
	 */
	public void elementChanged(final ElementChangedEvent event) {
		try {
			processDelta(event.getDelta());
		} catch(JavaScriptModelException e) {
			JavaScriptPlugin.log(e);
		}
	}
	
	/**
	 * Processes a delta recursively. When more than two children are affected the
	 * tree is fully refreshed starting at this node. The delta is processed in the
	 * current thread but the viewer updates are posted to the UI thread.
	 * 
	 * @param delta the delta to be processed
	 * 
	 * @throws JavaScriptModelException if an error occurs while processing the delta
	 */
	protected void processDelta(IJavaScriptElementDelta delta) throws JavaScriptModelException {
		int kind= delta.getKind();
		int flags= delta.getFlags();
		IJavaScriptElement element= delta.getElement();

		if (element instanceof IJavaScriptUnit) {
			if (!getProvideWorkingCopy())
				return;
		
			IJavaScriptUnit cu= (IJavaScriptUnit) element;
			if (!JavaModelUtil.isPrimary(cu) || !isOnIncludePath((IJavaScriptUnit)element)) {
				return;
			}
		}
			 
		// handle open and closing of a solution or project
		if (((flags & IJavaScriptElementDelta.F_CLOSED) != 0) || ((flags & IJavaScriptElementDelta.F_OPENED) != 0)) {			
			postRefresh(element);
			return;
		}

		if (kind == IJavaScriptElementDelta.REMOVED) {
			Object parent= internalGetParent(element);			
			postRemove(element);
			if (parent instanceof IPackageFragment) 
				updatePackageIcon((IPackageFragment)parent);
			// we are filtering out empty subpackages, so we
			// a package becomes empty we remove it from the viewer. 
			if (isPackageFragmentEmpty(element.getParent())) {
				if (fViewer.testFindItem(parent) != null)
					postRefresh(internalGetParent(parent));
			}  
			return;
		}

		if (kind == IJavaScriptElementDelta.ADDED) { 
			Object parent= internalGetParent(element);
			// we are filtering out empty subpackages, so we
			// have to handle additions to them specially. 
			if (parent instanceof IPackageFragment) {
				Object grandparent= internalGetParent(parent);
				// 1GE8SI6: ITPJUI:WIN98 - Rename is not shown in Packages View
				// avoid posting a refresh to an invisible parent
				if (parent.equals(fInput)) {
					postRefresh(parent);
				} else {
					// refresh from grandparent if parent isn't visible yet
					if (fViewer.testFindItem(parent) == null)
						postRefresh(grandparent);
					else {
						postRefresh(parent);
					}	
				}
			} else {  
				postAdd(parent, element);
			}
		}

		if (element instanceof IJavaScriptUnit) {
			if (kind == IJavaScriptElementDelta.CHANGED) {
				postRefresh(element);
				return;
			}
		}
		// we don't show the contents of a compilation or IClassFile, so don't go any deeper
		if ((element instanceof IJavaScriptUnit) || (element instanceof IClassFile))
			return;
			
		// the contents of an external JAR has changed
		if (element instanceof IPackageFragmentRoot && ((flags & IJavaScriptElementDelta.F_ARCHIVE_CONTENT_CHANGED) != 0))
			postRefresh(element);
			
		if (isClassPathChange(delta)) {
			 // throw the towel and do a full refresh of the affected java project. 
			postRefresh(element.getJavaScriptProject());
		}
		
		if (delta.getResourceDeltas() != null) {
			IResourceDelta[] rd= delta.getResourceDeltas();
			for (int i= 0; i < rd.length; i++) {
				processResourceDelta(rd[i], element);
			}
		}
		
		IJavaScriptElementDelta[] affectedChildren= delta.getAffectedChildren();
		if (affectedChildren.length > 1) {
			// a package fragment might become non empty refresh from the parent
			if (element instanceof IPackageFragment) {
				IJavaScriptElement parent= (IJavaScriptElement)internalGetParent(element);
				// 1GE8SI6: ITPJUI:WIN98 - Rename is not shown in Packages View
				// avoid posting a refresh to an invisible parent
				if (element.equals(fInput)) {
					postRefresh(element);
				} else {
					postRefresh(parent);
				}
				return;
			}
			// more than one child changed, refresh from here downwards
			if (element instanceof IPackageFragmentRoot)
				postRefresh(skipProjectPackageFragmentRoot((IPackageFragmentRoot)element));
			else
				postRefresh(element);
			return;
		}
		for (int i= 0; i < affectedChildren.length; i++) {
			processDelta(affectedChildren[i]);
		}
	}

	private boolean isOnIncludePath(IJavaScriptUnit element) {
		IJavaScriptProject project= element.getJavaScriptProject();
		if (project == null || !project.exists())
			return false;
		return project.isOnIncludepath(element);
	}

	
	/*
	 * Updates the package icon
	 */
	 private void updatePackageIcon(final IJavaScriptElement element) {
	 	postRunnable(new Runnable() {
			public void run() {
				// 1GF87WR: ITPUI:ALL - SWTEx + NPE closing a workbench window.
				Control ctrl= fViewer.getControl();
				if (ctrl != null && !ctrl.isDisposed()) 
					fViewer.update(element, new String[]{IBasicPropertyConstants.P_IMAGE});
			}
		});
	 }

	/*
	 * Process resource deltas
	 */
	private void processResourceDelta(IResourceDelta delta, Object parent) {
		int status= delta.getKind();
		IResource resource= delta.getResource();
		// filter out changes affecting the output folder
		if (resource == null) 
			return;
			
		// this could be optimized by handling all the added children in the parent
		if ((status & IResourceDelta.REMOVED) != 0) {
			if (parent instanceof IPackageFragment) 
				// refresh one level above to deal with empty package filtering properly
				postRefresh(internalGetParent(parent));
			else 
				postRemove(resource);
		}
		if ((status & IResourceDelta.ADDED) != 0) {
			if (parent instanceof IPackageFragment) 
				// refresh one level above to deal with empty package filtering properly
				postRefresh(internalGetParent(parent));
			else
				postAdd(parent, resource);
		}
		IResourceDelta[] affectedChildren= delta.getAffectedChildren();
		
		if (affectedChildren.length > 1) {
			// more than one child changed, refresh from here downwards
			postRefresh(resource);
			return;
		}

		for (int i= 0; i < affectedChildren.length; i++)
			processResourceDelta(affectedChildren[i], resource);
	}
	
	private void postRefresh(final Object root) {
		postRunnable(new Runnable() {
			public void run() {
				// 1GF87WR: ITPUI:ALL - SWTEx + NPE closing a workbench window.
				Control ctrl= fViewer.getControl();
				if (ctrl != null && !ctrl.isDisposed()) 
					fViewer.refresh(root);
			}
		});
	}
	
	private void postAdd(final Object parent, final Object element) {
		postRunnable(new Runnable() {
			public void run() {
				// 1GF87WR: ITPUI:ALL - SWTEx + NPE closing a workbench window.
				Control ctrl= fViewer.getControl();
				if (ctrl != null && !ctrl.isDisposed()) 
					fViewer.add(parent, element);
			}
		});
	}

	private void postRemove(final Object element) {
		postRunnable(new Runnable() {
			public void run() {
				// 1GF87WR: ITPUI:ALL - SWTEx + NPE closing a workbench window.
				Control ctrl= fViewer.getControl();
				if (ctrl != null && !ctrl.isDisposed()) 
					fViewer.remove(element);
			}
		});
	}

	private void postRunnable(final Runnable r) {
		Control ctrl= fViewer.getControl();
		if (ctrl != null && !ctrl.isDisposed()) {
			ctrl.getDisplay().asyncExec(r); 
		}
	}
}
