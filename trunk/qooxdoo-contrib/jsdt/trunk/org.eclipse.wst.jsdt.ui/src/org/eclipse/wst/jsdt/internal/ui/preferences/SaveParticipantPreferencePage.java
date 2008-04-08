/*******************************************************************************
 * Copyright (c) 2006 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.wst.jsdt.internal.ui.preferences;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.ProjectScope;
import org.eclipse.core.runtime.preferences.IScopeContext;
import org.eclipse.wst.jsdt.internal.ui.IJavaHelpContextIds;
import org.eclipse.wst.jsdt.internal.ui.JavaPlugin;

/**
 * Configures Java Editor save participant preferences.
 * 
 * @since 3.3
 */
public final class SaveParticipantPreferencePage extends AbstractConfigurationBlockPreferenceAndPropertyPage {
	
	public static final String PROPERTY_PAGE_ID= "org.eclipse.wst.jsdt.ui.propertyPages.SaveParticipantPreferencePage"; //$NON-NLS-1$
	public static final String PREFERENCE_PAGE_ID= "org.eclipse.wst.jsdt.ui.preferences.SaveParticipantPreferencePage"; //$NON-NLS-1$

	/**
	 * {@inheritDoc}
	 */
	protected String getHelpId() {
		return IJavaHelpContextIds.JAVA_EDITOR_PREFERENCE_PAGE;
	}
	
	/**
	 * {@inheritDoc}
	 */
	protected IPreferenceAndPropertyConfigurationBlock createConfigurationBlock(IScopeContext context) {
		return new SaveParticipantConfigurationBlock(context, this);
	}
	
	/**
	 * {@inheritDoc}
	 */
	protected String getPreferencePageID() {
		return PREFERENCE_PAGE_ID;
	}
	
	/**
	 * {@inheritDoc}
	 */
	protected String getPropertyPageID() {
		return PROPERTY_PAGE_ID;
	}
	
	/**
	 * {@inheritDoc}
	 */
	protected boolean hasProjectSpecificOptions(IProject project) {
		return JavaPlugin.getDefault().getSaveParticipantRegistry().hasSettingsInScope(new ProjectScope(project));
	}
}
