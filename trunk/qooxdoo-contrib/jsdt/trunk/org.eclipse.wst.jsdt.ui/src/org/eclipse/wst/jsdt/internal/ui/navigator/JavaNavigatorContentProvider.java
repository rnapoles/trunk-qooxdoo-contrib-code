/*******************************************************************************
 * Copyright (c) 2003, 2008 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.wst.jsdt.internal.ui.navigator;

import java.util.Arrays;
import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.Vector;

import org.eclipse.core.resources.IContainer;
import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IFolder;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IWorkspaceRoot;

import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.jface.util.IPropertyChangeListener;
import org.eclipse.jface.util.PropertyChangeEvent;
import org.eclipse.jface.viewers.Viewer;
import org.eclipse.ui.IMemento;
import org.eclipse.ui.navigator.ICommonContentExtensionSite;
import org.eclipse.ui.navigator.IExtensionStateModel;
import org.eclipse.ui.navigator.IPipelinedTreeContentProvider;
import org.eclipse.ui.navigator.PipelinedShapeModification;
import org.eclipse.ui.navigator.PipelinedViewerUpdate;
import org.eclipse.wst.jsdt.core.IJavaScriptElement;
import org.eclipse.wst.jsdt.core.IJavaScriptModel;
import org.eclipse.wst.jsdt.core.IJavaScriptProject;
import org.eclipse.wst.jsdt.core.IPackageFragment;
import org.eclipse.wst.jsdt.core.IPackageFragmentRoot;
import org.eclipse.wst.jsdt.core.JavaScriptCore;
import org.eclipse.wst.jsdt.core.JavaScriptModelException;
import org.eclipse.wst.jsdt.internal.ui.navigator.IExtensionStateConstants.Values;
import org.eclipse.wst.jsdt.internal.ui.packageview.PackageExplorerContentProvider;
import org.eclipse.wst.jsdt.ui.PreferenceConstants;

public class JavaNavigatorContentProvider extends
		PackageExplorerContentProvider implements IPipelinedTreeContentProvider {

	public JavaNavigatorContentProvider() {
		super(false);
	}

	public JavaNavigatorContentProvider(boolean provideMembers) {
		super(provideMembers);
	}

	public static final String JDT_EXTENSION_ID = "org.eclipse.wst.jsdt.ui.javaContent"; //$NON-NLS-1$ 

	private IExtensionStateModel fStateModel;

	private Object fRealInput;

	private IPropertyChangeListener fLayoutPropertyListener;

	public void init(ICommonContentExtensionSite commonContentExtensionSite) {
		IExtensionStateModel stateModel = commonContentExtensionSite
				.getExtensionStateModel();
		IMemento memento = commonContentExtensionSite.getMemento();

		fStateModel = stateModel; 
		restoreState(memento);
		fLayoutPropertyListener = new IPropertyChangeListener() {
			public void propertyChange(PropertyChangeEvent event) {
				if (Values.IS_LAYOUT_FLAT.equals(event.getProperty())) {
					if (event.getNewValue() != null) {
						boolean newValue = ((Boolean) event.getNewValue())
								.booleanValue() ? true : false;
						setIsFlatLayout(newValue);
					}
				}

			}
		};
		fStateModel.addPropertyChangeListener(fLayoutPropertyListener);

		IPreferenceStore store = PreferenceConstants.getPreferenceStore();
		boolean showCUChildren = store
				.getBoolean(PreferenceConstants.SHOW_CU_CHILDREN);
		setProvideMembers(showCUChildren);
	}
	
	public void dispose() { 
		super.dispose();
		fStateModel.removePropertyChangeListener(fLayoutPropertyListener);
	}

	public void inputChanged(Viewer viewer, Object oldInput, Object newInput) { 
		fRealInput = newInput;
		super.inputChanged(viewer, oldInput, findInputElement(newInput));
	}
	
	public Object getParent(Object element) {
		Object parent= super.getParent(element);
		if (parent instanceof IJavaScriptModel) {
			return getViewerInput() != null ? fRealInput : parent;
		}
		return parent;
	}

	public Object[] getElements(Object inputElement) {
		if (inputElement instanceof IWorkspaceRoot) {
			IWorkspaceRoot root = (IWorkspaceRoot) inputElement;
			return root.getProjects();
		} else if (inputElement instanceof IJavaScriptModel) {
			return ((IJavaScriptModel)inputElement).getWorkspace().getRoot().getProjects();
		}
		if (inputElement instanceof IProject) {
			return super.getElements(JavaScriptCore.create((IProject)inputElement));
		}
		return super.getElements(inputElement);
	}
	
	public Object[] getChildren(Object parentElement) {
		if (parentElement instanceof IWorkspaceRoot) {
			IWorkspaceRoot root = (IWorkspaceRoot) parentElement;
			return root.getProjects();
		} 
		if (parentElement instanceof IProject) {
			return super.getChildren(JavaScriptCore.create((IProject)parentElement));
		}
		return super.getChildren(parentElement);
	}

	private Object findInputElement(Object newInput) {
		if (newInput instanceof IWorkspaceRoot) {
			return JavaScriptCore.create((IWorkspaceRoot) newInput);
		}
		return newInput;
	}

	public void restoreState(IMemento memento) {

	}

	public void saveState(IMemento memento) {

	}

	public void getPipelinedChildren(Object parent, Set currentChildren) { 
		customize(getChildren(parent), currentChildren);
	}

	public void getPipelinedElements(Object input, Set currentElements) {
		customize(getElements(input), currentElements);
	}

	public Object getPipelinedParent(Object object, Object suggestedParent) {
		return getParent(object);
	}

	public PipelinedShapeModification interceptAdd(
			PipelinedShapeModification addModification) {
		
		if(addModification.getParent() instanceof IJavaScriptProject) {
			addModification.setParent(((IJavaScriptProject)addModification.getParent()).getProject());
		} else if(addModification.getParent() instanceof IWorkspaceRoot || 
				addModification.getParent() instanceof IJavaScriptProject){
		
			deconvertJavaProjects(addModification);
		}
		
		convertToJavaElements(addModification);
		return addModification;
	}
 
	public PipelinedShapeModification interceptRemove(
			PipelinedShapeModification removeModification) {
		deconvertJavaProjects(removeModification);
		convertToJavaElements(removeModification.getChildren());
		return removeModification;
	}
	
	private void deconvertJavaProjects(PipelinedShapeModification modification) {
		Set convertedChildren = new LinkedHashSet();
		for (Iterator iterator = modification.getChildren().iterator(); iterator.hasNext();) {
			Object added = iterator.next(); 
			if(added instanceof IJavaScriptProject) {
				iterator.remove();
				convertedChildren.add(((IJavaScriptProject)added).getProject());
			}			
		}
		modification.getChildren().addAll(convertedChildren);
	}

	/**
	 * Converts the shape modification to use Java elements.
	 * 
	 * 
	 * @param modification
	 *            the shape modification to convert
	 * @return returns true if the conversion took place
	 */
	private boolean convertToJavaElements(PipelinedShapeModification modification) {
		Object parent = modification.getParent();
		// As of 3.3, we no longer re-parent additions to IProject.
		if (parent instanceof IContainer) {
			IJavaScriptElement element = JavaScriptCore.create((IContainer) parent);
			if (element != null && element.exists()) {
				// we don't convert the root
				if( !(element instanceof IJavaScriptModel) && !(element instanceof IJavaScriptProject))
					modification.setParent(element);
				return convertToJavaElements(modification.getChildren());
				
			}
		}
		return false;
	}

	/**
	 * Converts the shape modification to use Java elements.
	 * 
	 * 
	 * @param currentChildren
	 *            The set of current children that would be contributed or refreshed in the viewer.
	 * @return returns true if the conversion took place
	 */
	private boolean convertToJavaElements(Set currentChildren) {

		LinkedHashSet convertedChildren = new LinkedHashSet();
		IJavaScriptElement newChild;
		for (Iterator childrenItr = currentChildren.iterator(); childrenItr
				.hasNext();) {
			Object child = childrenItr.next();
			// only convert IFolders and IFiles
			if (child instanceof IFolder || child instanceof IFile) {
				if ((newChild = JavaScriptCore.create((IResource) child)) != null
						&& newChild.exists()) {
					childrenItr.remove();
					convertedChildren.add(newChild);
				}
			} else if (child instanceof IJavaScriptProject) {
				childrenItr.remove();
				convertedChildren.add( ((IJavaScriptProject)child).getProject());
			}
		}
		if (!convertedChildren.isEmpty()) {
			currentChildren.addAll(convertedChildren);
			return true;
		}
		return false;

	}
	
	/**
	 * Adapted from the C Navigator Content Provider
	 * @param javaElements
	 * @param proposedChildren
	 */
	private void customize(Object[] javaElements, Set proposedChildren) {
	//	List elementList= Arrays.asList(javaElements);
//		IResource[] javaElementResources;
//		for(int i = 0;i<javaElements.length;i++) {
//			if(javaElements[i] instanceof IJavaScriptElement) {
//				
//			}
//		}
		
		
//		for (Iterator iter= proposedChildren.iterator(); iter.hasNext();) {
//			Object element= iter.next();
//			IResource resource= null;
//			if (element instanceof IResource) {
//				resource= (IResource)element;
//			} else if (element instanceof IAdaptable) {
//				resource= (IResource)((IAdaptable)element).getAdapter(IResource.class);
//			}
//			if (resource != null) {
//				int i= elementList.indexOf(resource);
//				if (i >= 0) {
//					javaElements[i]= null;
//				}
//			}
//		}
		
		
			
		proposedChildren.removeAll(Arrays.asList(javaElements));
		proposedChildren.addAll(Arrays.asList(javaElements));
			
			
		
		Vector allJavaElements = new Vector(Arrays.asList(javaElements));
		boolean addedPfRoot = false;
		while(allJavaElements.size()>0) {
			Object element=null;
			try {
				element = allJavaElements.remove(0);
			}
			catch (Exception e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			
			if (element instanceof IJavaScriptElement) {
				IJavaScriptElement cElement= (IJavaScriptElement)element;
				IResource resource= cElement.getResource();
				proposedChildren.remove(resource);
				if(cElement instanceof IPackageFragmentRoot) {
					IPackageFragmentRoot root = (IPackageFragmentRoot)cElement;
					try {
						Object[] nonJava = root.getNonJavaScriptResources();
						allJavaElements.addAll(Arrays.asList(root.getChildren()));
						proposedChildren.removeAll(Arrays.asList(nonJava));
					}
					catch (JavaScriptModelException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}else if(cElement instanceof IPackageFragment) {
						IPackageFragment root = (IPackageFragment)cElement;
						
						if(root.isDefaultPackage()) {
							IPackageFragmentRoot pfRoot = (IPackageFragmentRoot)root.getParent();
							if(!addedPfRoot) allJavaElements.add(pfRoot);
							addedPfRoot = true;
						}
						
						try {
							Object[] nonJava = root.getNonJavaScriptResources();
							Object[] children = root.getChildren();
							allJavaElements.addAll(Arrays.asList(children));
							proposedChildren.removeAll(Arrays.asList(nonJava));
						}
						catch (Exception e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
				}
			}
		}
		
	}



	public boolean interceptRefresh(PipelinedViewerUpdate refreshSynchronization) {		
		return convertToJavaElements(refreshSynchronization.getRefreshTargets());

	}

	public boolean interceptUpdate(PipelinedViewerUpdate updateSynchronization) {		
		return convertToJavaElements(updateSynchronization.getRefreshTargets());
	}

	protected void postAdd(final Object parent, final Object element, Collection runnables) {
		if (parent instanceof IJavaScriptModel)
			super.postAdd(((IJavaScriptModel) parent).getWorkspace(), element, runnables);
		else
			super.postAdd(parent, element, runnables);
	}
	

	protected void postRefresh(final List toRefresh, final boolean updateLabels, Collection runnables) {
		for (Iterator iter = toRefresh.iterator(); iter.hasNext();) {
			Object element = iter.next();
			if(element instanceof IJavaScriptModel) {
				iter.remove();
				toRefresh.add(fRealInput);
				super.postRefresh(toRefresh, updateLabels, runnables);
				return;
			}
		} 
		super.postRefresh(toRefresh, updateLabels, runnables);		
	}

}
