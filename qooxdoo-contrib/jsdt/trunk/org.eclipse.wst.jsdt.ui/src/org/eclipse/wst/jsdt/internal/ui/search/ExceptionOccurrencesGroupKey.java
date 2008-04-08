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

package org.eclipse.wst.jsdt.internal.ui.search;

import org.eclipse.wst.jsdt.core.IJavaElement;

public class ExceptionOccurrencesGroupKey extends JavaElementLine {
	private boolean fIsException;
	
	/**
	 * @param element either an ICompilationUnit or an IClassFile
	 */
	public ExceptionOccurrencesGroupKey(IJavaElement element, int line, String lineContents, boolean isException) {
		super(element, line, lineContents);
		fIsException= isException;
	}

	public boolean isException() {
		return fIsException;
	}

	public void setException(boolean isException) {
		fIsException= isException;
	}
}
