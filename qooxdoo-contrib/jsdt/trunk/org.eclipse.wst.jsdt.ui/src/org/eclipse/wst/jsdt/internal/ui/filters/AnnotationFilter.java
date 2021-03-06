/*******************************************************************************
 * Copyright (c) 2005, 2008 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.wst.jsdt.internal.ui.filters;

import org.eclipse.jface.viewers.Viewer;
import org.eclipse.jface.viewers.ViewerFilter;
import org.eclipse.wst.jsdt.core.IType;
import org.eclipse.wst.jsdt.core.JavaScriptModelException;

/**
 * Filters annotations.
 */
public class AnnotationFilter extends ViewerFilter {

	/*
	 * @see ViewerFilter
	 */
	public boolean select(Viewer viewer, Object parent, Object element) {
		if (element instanceof IType) {
			try {
				return !((IType) element).isAnnotation();
			} catch (JavaScriptModelException ex) {
				return true;
			}
		}
		return true;
	}
}
