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
package org.eclipse.wst.jsdt.internal.ui;

import org.eclipse.wst.jsdt.ui.JavaUI;


public interface IUIConstants {
	
	public static final String KEY_OK= JavaUI.ID_PLUGIN + ".ok.label"; //$NON-NLS-1$
	public static final String KEY_CANCEL= JavaUI.ID_PLUGIN + ".cancel.label"; //$NON-NLS-1$
	
	public static final String P_ICON_NAME= JavaUI.ID_PLUGIN + ".icon_name"; //$NON-NLS-1$
	
	public static final String DIALOGSTORE_LASTEXTJAR= JavaUI.ID_PLUGIN + ".lastextjar"; //$NON-NLS-1$
	public static final String DIALOGSTORE_LASTJARATTACH= JavaUI.ID_PLUGIN + ".lastjarattach"; //$NON-NLS-1$
	public static final String DIALOGSTORE_LASTVARIABLE= JavaUI.ID_PLUGIN + ".lastvariable";	 //$NON-NLS-1$
	
	public static final String DIALOGSTORE_TYPECOMMENT_DEPRECATED= JavaUI.ID_PLUGIN + ".typecomment.deprecated";	 //$NON-NLS-1$
	
	public static final boolean SUPPORT_REFACTORING=false;
	
}
