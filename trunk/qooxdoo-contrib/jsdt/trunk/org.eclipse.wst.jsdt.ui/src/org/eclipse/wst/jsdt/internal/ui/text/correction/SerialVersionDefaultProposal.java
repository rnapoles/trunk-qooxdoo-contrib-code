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
package org.eclipse.wst.jsdt.internal.ui.text.correction;

import org.eclipse.swt.graphics.Image;
import org.eclipse.wst.jsdt.internal.corext.fix.IFix;
import org.eclipse.wst.jsdt.internal.ui.fix.ICleanUp;
import org.eclipse.wst.jsdt.ui.text.java.IInvocationContext;

public final class SerialVersionDefaultProposal extends FixCorrectionProposal {
	
	public SerialVersionDefaultProposal(IFix fix, ICleanUp up, int relevance, Image image, IInvocationContext context) {
		super(fix, up, relevance, image, context);
	}

	/**
	 * {@inheritDoc}
	 */
	public String getAdditionalProposalInfo() {
		return CorrectionMessages.SerialVersionDefaultProposal_message_default_info;
	}
}
