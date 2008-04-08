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
package org.eclipse.wst.jsdt.ui.actions;

import org.eclipse.ui.IWorkbenchSite;
import org.eclipse.ui.PlatformUI;
import org.eclipse.wst.jsdt.core.ICompilationUnit;
import org.eclipse.wst.jsdt.core.IField;
import org.eclipse.wst.jsdt.core.IImportDeclaration;
import org.eclipse.wst.jsdt.core.IJavaElement;
import org.eclipse.wst.jsdt.core.ILocalVariable;
import org.eclipse.wst.jsdt.core.IMethod;
import org.eclipse.wst.jsdt.core.IPackageDeclaration;
import org.eclipse.wst.jsdt.core.IPackageFragment;
import org.eclipse.wst.jsdt.core.IType;
import org.eclipse.wst.jsdt.core.ITypeParameter;
import org.eclipse.wst.jsdt.core.JavaModelException;
import org.eclipse.wst.jsdt.core.search.IJavaSearchScope;
import org.eclipse.wst.jsdt.internal.ui.IJavaHelpContextIds;
import org.eclipse.wst.jsdt.internal.ui.JavaPluginImages;
import org.eclipse.wst.jsdt.internal.ui.javaeditor.JavaEditor;
import org.eclipse.wst.jsdt.internal.ui.search.JavaSearchScopeFactory;
import org.eclipse.wst.jsdt.internal.ui.search.SearchMessages;
import org.eclipse.wst.jsdt.ui.search.ElementQuerySpecification;
import org.eclipse.wst.jsdt.ui.search.QuerySpecification;

/**
 * Finds references to the selected element in the enclosing project 
 * of the selected element.
 * The action is applicable to selections representing a Java element.
 * 
 * <p>
 * This class may be instantiated; it is not intended to be subclassed.
 * </p>
 * 
 * @since 3.0
 */
public class FindReferencesInProjectAction extends FindReferencesAction {

	/**
	 * Creates a new <code>FindReferencesInProjectAction</code>. The action 
	 * requires that the selection provided by the site's selection provider is of type 
	 * <code>IStructuredSelection</code>.
	 * 
	 * @param site the site providing context information for this action
	 */
	public FindReferencesInProjectAction(IWorkbenchSite site) {
		super(site);
	}

	/**
	 * Note: This constructor is for internal use only. Clients should not call this constructor.
	 * @param editor the Java editor
	 */
	public FindReferencesInProjectAction(JavaEditor editor) {
		super(editor);
	}
	
	Class[] getValidTypes() {
		return new Class[] { IField.class, IMethod.class, IType.class, ICompilationUnit.class, IPackageDeclaration.class, IImportDeclaration.class, IPackageFragment.class, ILocalVariable.class, ITypeParameter.class };
	}
	
	void init() {
		setText(SearchMessages.Search_FindReferencesInProjectAction_label); 
		setToolTipText(SearchMessages.Search_FindReferencesInProjectAction_tooltip); 
		setImageDescriptor(JavaPluginImages.DESC_OBJS_SEARCH_REF);
		PlatformUI.getWorkbench().getHelpSystem().setHelp(this, IJavaHelpContextIds.FIND_REFERENCES_IN_PROJECT_ACTION);
	}

	QuerySpecification createQuery(IJavaElement element) throws JavaModelException {
		JavaSearchScopeFactory factory= JavaSearchScopeFactory.getInstance();
		JavaEditor editor= getEditor();
		
		IJavaSearchScope scope;
		String description;
		boolean isInsideJRE= factory.isInsideJRE(element);
		if (editor != null) {
			scope= factory.createJavaProjectSearchScope(editor.getEditorInput(), isInsideJRE);
			description= factory.getProjectScopeDescription(editor.getEditorInput(), isInsideJRE);
		} else {
			scope= factory.createJavaProjectSearchScope(element.getJavaProject(), isInsideJRE);
			description=  factory.getProjectScopeDescription(element.getJavaProject(), isInsideJRE);
		}
		return new ElementQuerySpecification(element, getLimitTo(), scope, description);
	}
	
}
