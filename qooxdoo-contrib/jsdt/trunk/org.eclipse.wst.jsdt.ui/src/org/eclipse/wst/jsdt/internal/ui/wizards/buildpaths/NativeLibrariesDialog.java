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

package org.eclipse.wst.jsdt.internal.ui.wizards.buildpaths;

import org.eclipse.core.runtime.IStatus;
import org.eclipse.jface.dialogs.StatusDialog;
import org.eclipse.swt.SWT;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Control;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.wst.jsdt.core.IClasspathEntry;
import org.eclipse.wst.jsdt.internal.ui.preferences.NativeLibrariesConfigurationBlock;
import org.eclipse.wst.jsdt.internal.ui.wizards.IStatusChangeListener;
import org.eclipse.wst.jsdt.internal.ui.wizards.NewWizardMessages;

/**
 * 
 */
public class NativeLibrariesDialog extends StatusDialog {

	private final NativeLibrariesConfigurationBlock fConfigurationBlock;
	
	public NativeLibrariesDialog(Shell parent, String nativeLibPath, IClasspathEntry parentEntry) {
		super(parent);
		setTitle(NewWizardMessages.NativeLibrariesDialog_title);
		
		setShellStyle(getShellStyle() | SWT.RESIZE);
		
		IStatusChangeListener listener= new IStatusChangeListener() {
			public void statusChanged(IStatus status) {
				updateStatus(status);
			}
		};	
		
		fConfigurationBlock= new NativeLibrariesConfigurationBlock(listener, parent, nativeLibPath, parentEntry);
		setHelpAvailable(false);
	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.jface.dialogs.Dialog#createDialogArea(org.eclipse.swt.widgets.Composite)
	 */
	protected Control createDialogArea(Composite parent) {
		Composite composite= (Composite) super.createDialogArea(parent);
		Control inner= fConfigurationBlock.createContents(composite);
		inner.setLayoutData(new GridData(GridData.FILL_BOTH));
		applyDialogFont(composite);		
		return composite;
	}

	public String getNativeLibraryPath() {
		return fConfigurationBlock.getNativeLibraryPath();
	}

}
