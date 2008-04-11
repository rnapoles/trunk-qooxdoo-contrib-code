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
package org.eclipse.wst.jsdt.core.jdom;

/**
 * Unchecked exception thrown when an illegal manipulation of the JDOM is
 * performed, or when an attempt is made to access/set an attribute of a
 * JDOM node that source indexes cannot be determined for (in case the source
 * was syntactically incorrect).
 *
 * @deprecated The JDOM was made obsolete by the addition in 2.0 of the more
 * powerful, fine-grained DOM/AST API found in the
 * org.eclipse.wst.jsdt.core.dom package.
 */
public class DOMException extends RuntimeException {

	private static final long serialVersionUID = 2536853590795032028L; // backward compatible
/**
 * Creates a new exception with no detail message.
 */
public DOMException() {
	// just create a new DOMException with no detail message
}
/**
 * Creates a new exception with the given detail message.
 *
 * @param message the detail message
 */
public DOMException(String message) {
	super(message);
}
}
