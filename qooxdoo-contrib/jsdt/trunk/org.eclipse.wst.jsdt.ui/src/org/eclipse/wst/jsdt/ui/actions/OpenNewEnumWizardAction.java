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

import org.eclipse.core.runtime.CoreException;
import org.eclipse.ui.INewWizard;
import org.eclipse.ui.PlatformUI;
import org.eclipse.wst.jsdt.internal.ui.IJavaHelpContextIds;
import org.eclipse.wst.jsdt.internal.ui.JavaPluginImages;
import org.eclipse.wst.jsdt.internal.ui.actions.ActionMessages;
import org.eclipse.wst.jsdt.internal.ui.wizards.NewEnumCreationWizard;
import org.eclipse.wst.jsdt.ui.wizards.NewEnumWizardPage;

/**
* <p>Action that opens the new enum wizard. The action initialized the wizard with either the selection
 * as configured by {@link #setSelection(org.eclipse.jface.viewers.IStructuredSelection)} or takes a preconfigured
 * new enum wizard page, see {@link #setConfiguredWizardPage(NewEnumWizardPage)}.
 * </p>
 * 
 * <p>
 * This class may be instantiated; it is not intended to be subclassed.
 * </p>
 *  
 * @since 3.2 
 */
public class OpenNewEnumWizardAction extends AbstractOpenWizardAction {
	
	private NewEnumWizardPage fPage;
	private boolean fOpenEditorOnFinish;

	/**
	 * Creates an instance of the <code>OpenNewEnumWizardAction</code>.
	 */
	public OpenNewEnumWizardAction() {
		setText(ActionMessages.OpenNewEnumWizardAction_text); 
		setDescription(ActionMessages.OpenNewEnumWizardAction_description); 
		setToolTipText(ActionMessages.OpenNewEnumWizardAction_tooltip); 
		setImageDescriptor(JavaPluginImages.DESC_WIZBAN_NEWENUM);
		PlatformUI.getWorkbench().getHelpSystem().setHelp(this, IJavaHelpContextIds.OPEN_ENUM_WIZARD_ACTION);
		
		fPage= null;
		fOpenEditorOnFinish= true;
	}
	
	/**
	 * Sets a page to be used by the wizard or <code>null</code> to use a page initialized with values
	 * from the current selection (see {@link #getSelection()} and {@link #setSelection(org.eclipse.jface.viewers.IStructuredSelection)}).
	 * @param page the page to use or <code>null</code>
	 */
	public void setConfiguredWizardPage(NewEnumWizardPage page) {
		fPage= page;
	}
	
	/**
	 * Specifies if the wizard will open the created type with the default editor. The default behaviour is to open
	 * an editor.
	 * 
	 * @param openEditorOnFinish if set, the wizard will open the created type with the default editor
	 * 
	 * @since 3.3
	 */
	public void setOpenEditorOnFinish(boolean openEditorOnFinish) {
		fOpenEditorOnFinish= openEditorOnFinish;
	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.ui.actions.AbstractOpenWizardAction#createWizard()
	 */
	protected final INewWizard createWizard() throws CoreException {
		return new NewEnumCreationWizard(fPage, fOpenEditorOnFinish);
	}
}
