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
package org.eclipse.wst.jsdt.internal.ui.packageview;

import org.eclipse.jface.action.Action;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.jface.viewers.StructuredSelection;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.ui.PlatformUI;
import org.eclipse.ui.dialogs.SelectionDialog;
import org.eclipse.ui.progress.IProgressService;
import org.eclipse.wst.jsdt.core.IPackageFragment;
import org.eclipse.wst.jsdt.core.JavaModelException;
import org.eclipse.wst.jsdt.core.search.IJavaSearchScope;
import org.eclipse.wst.jsdt.core.search.SearchEngine;
import org.eclipse.wst.jsdt.internal.corext.util.Messages;
import org.eclipse.wst.jsdt.internal.ui.IJavaHelpContextIds;
import org.eclipse.wst.jsdt.internal.ui.JavaPlugin;
import org.eclipse.wst.jsdt.internal.ui.dialogs.PackageSelectionDialog;

class GotoPackageAction extends Action {
	
	private PackageExplorerPart fPackageExplorer;
	
	GotoPackageAction(PackageExplorerPart part) {
		super(PackagesMessages.GotoPackage_action_label); 
		setDescription(PackagesMessages.GotoPackage_action_description); 
		fPackageExplorer= part;
		PlatformUI.getWorkbench().getHelpSystem().setHelp(this, IJavaHelpContextIds.GOTO_PACKAGE_ACTION);
	}
 
	public void run() { 
		try {
			Shell shell= JavaPlugin.getActiveWorkbenchShell();
			SelectionDialog dialog= createAllPackagesDialog(shell);
			dialog.setTitle(getDialogTitle());
			dialog.setMessage(PackagesMessages.GotoPackage_dialog_message); 
			dialog.open();		
			Object[] res= dialog.getResult();
			if (res != null && res.length == 1) 
				gotoPackage((IPackageFragment)res[0]); 
		} catch (JavaModelException e) {
		}
	}
	
	private SelectionDialog createAllPackagesDialog(Shell shell) throws JavaModelException{
		IProgressService progressService= PlatformUI.getWorkbench().getProgressService();
		IJavaSearchScope scope= SearchEngine.createWorkspaceScope();
		int flag= PackageSelectionDialog.F_HIDE_EMPTY_INNER;
		PackageSelectionDialog dialog= new PackageSelectionDialog(shell, progressService, flag, scope);
		dialog.setFilter(""); //$NON-NLS-1$
		dialog.setIgnoreCase(false);
		dialog.setMultipleSelection(false);		
		return dialog;
	}
				
	private void gotoPackage(IPackageFragment p) {
		fPackageExplorer.selectReveal(new StructuredSelection(p));
		if (!p.equals(getSelectedElement())) {
			MessageDialog.openInformation(fPackageExplorer.getSite().getShell(), 
				getDialogTitle(), 
				Messages.format(PackagesMessages.PackageExplorer_element_not_present, p.getElementName())); 
		}
	}
	
	private Object getSelectedElement() {
		return ((IStructuredSelection)fPackageExplorer.getSite().getSelectionProvider().getSelection()).getFirstElement();
	}	
	
	private String getDialogTitle() {
		return PackagesMessages.GotoPackage_dialog_title; 
	}
	
}
