/*******************************************************************************
 * Copyright (c) 2000, 2008 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.wst.jsdt.ui.text;

import org.eclipse.jface.text.source.ISharedTextColors;
import org.eclipse.swt.graphics.Color;


/**
 * Manages SWT color objects for the given color keys and
 * given <code>RGB</code> objects. Until the <code>dispose</code>
 * method is called, the same color object is returned for
 * equal keys and equal <code>RGB</code> values.
 * <p>
 * In order to provide backward compatibility for clients of <code>IColorManager</code>, extension
 * interfaces are used to provide a means of evolution. The following extension interfaces exist:
 * <ul>
 * <li>{@link org.eclipse.wst.jsdt.ui.text.IColorManagerExtension} since version 2.0 introducing
 * 		the ability to bind and un-bind colors.</li>
 * </ul>
 * </p>
 * <p>
 * This interface may be implemented by clients.
 * </p>
 *
 * Provisional API: This class/interface is part of an interim API that is still under development and expected to
 * change significantly before reaching stability. It is being made available at this early stage to solicit feedback
 * from pioneering adopters on the understanding that any code that uses this API will almost certainly be broken
 * (repeatedly) as the API evolves.
 *
 * @see org.eclipse.wst.jsdt.ui.text.IColorManagerExtension
 * @see org.eclipse.wst.jsdt.ui.text.IJavaScriptColorConstants
 *
 */
public interface IColorManager extends ISharedTextColors {

	/**
	 * Returns a color object for the given key. The color objects
	 * are remembered internally; the same color object is returned
	 * for equal keys.
	 *
	 * @param key the color key
	 * @return the color object for the given key
	 */
	Color getColor(String key);
}
