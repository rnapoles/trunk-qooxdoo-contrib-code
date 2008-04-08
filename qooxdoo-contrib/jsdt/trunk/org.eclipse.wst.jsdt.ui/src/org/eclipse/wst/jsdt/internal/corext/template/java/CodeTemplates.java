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
package org.eclipse.wst.jsdt.internal.corext.template.java;

import java.io.File;

import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.jface.text.templates.Template;
import org.eclipse.wst.jsdt.internal.ui.JavaPlugin;

/**
 * <code>CodeTemplates</code> gives access to the available code templates.
 * @since 3.0
 * @deprecated use {@link org.eclipse.wst.jsdt.internal.ui.JavaPlugin#getCodeTemplateStore()} instead 
 */
public class CodeTemplates extends org.eclipse.wst.jsdt.internal.corext.template.java.TemplateSet {

	private static final String TEMPLATE_FILE= "codetemplates.xml"; //$NON-NLS-1$

	/** Singleton. */
	private static CodeTemplates fgTemplates;

	public static Template getCodeTemplate(String name) {
		return getInstance().getFirstTemplate(name);
	}

	/**
	 * Returns an instance of templates.
	 */
	public static CodeTemplates getInstance() {
		if (fgTemplates == null)
			fgTemplates= new CodeTemplates();
		
		return fgTemplates;
	}
	
	private CodeTemplates() {
		super("codetemplate", JavaPlugin.getDefault().getCodeTemplateContextRegistry()); //$NON-NLS-1$
		create();
	}
	
	private void create() {
		
		try {
			File templateFile= getTemplateFile();
			if (templateFile.exists()) {
				addFromFile(templateFile, false);
			}

		} catch (CoreException e) {
			JavaPlugin.log(e);
			clear();
		}

	}	
	
	/**
	 * Resets the template set.
	 */
	public void reset() throws CoreException {
	}

	/**
	 * Resets the template set with the default templates.
	 */
	public void restoreDefaults() throws CoreException {
	}

	/**
	 * Saves the template set.
	 */
	public void save() throws CoreException {					
	}

	private static File getTemplateFile() {
		IPath path= JavaPlugin.getDefault().getStateLocation();
		path= path.append(TEMPLATE_FILE);
		
		return path.toFile();
	}

}
