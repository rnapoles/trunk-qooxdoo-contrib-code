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
package org.eclipse.wst.jsdt.internal.ui.fix;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.eclipse.core.runtime.CoreException;
import org.eclipse.wst.jsdt.core.IJavaScriptUnit;
import org.eclipse.wst.jsdt.core.dom.JavaScriptUnit;
import org.eclipse.wst.jsdt.internal.corext.fix.CleanUpConstants;
import org.eclipse.wst.jsdt.internal.corext.fix.ControlStatementsFix;
import org.eclipse.wst.jsdt.internal.corext.fix.IFix;
import org.eclipse.wst.jsdt.ui.text.java.IProblemLocation;

public class ControlStatementsCleanUp extends AbstractCleanUp {
	
	public ControlStatementsCleanUp(Map options) {
		super(options);
    }
	
	public ControlStatementsCleanUp() {
		super();
	}
	
	/**
	 * {@inheritDoc}
	 */
	public boolean requireAST(IJavaScriptUnit unit) throws CoreException {
		boolean useBlocks= isEnabled(CleanUpConstants.CONTROL_STATEMENTS_USE_BLOCKS);
		
		if (!useBlocks)
			return false;
		
		return isEnabled(CleanUpConstants.CONTROL_STATMENTS_USE_BLOCKS_ALWAYS) ||
		       isEnabled(CleanUpConstants.CONTROL_STATMENTS_USE_BLOCKS_NEVER) ||
		       isEnabled(CleanUpConstants.CONTROL_STATMENTS_USE_BLOCKS_NO_FOR_RETURN_AND_THROW);
	}

	/**
	 * {@inheritDoc}
	 */
	public IFix createFix(JavaScriptUnit compilationUnit) throws CoreException {
		if (compilationUnit == null)
			return null;
		
		boolean useBlocks= isEnabled(CleanUpConstants.CONTROL_STATEMENTS_USE_BLOCKS);
		if (!useBlocks)
			return null;
		
		return ControlStatementsFix.createCleanUp(compilationUnit,
				isEnabled(CleanUpConstants.CONTROL_STATMENTS_USE_BLOCKS_ALWAYS),
				isEnabled(CleanUpConstants.CONTROL_STATMENTS_USE_BLOCKS_NEVER),
				isEnabled(CleanUpConstants.CONTROL_STATMENTS_USE_BLOCKS_NO_FOR_RETURN_AND_THROW));
	}

	/**
	 * {@inheritDoc}
	 */
	public IFix createFix(JavaScriptUnit compilationUnit, IProblemLocation[] problems) throws CoreException {
		//No warnings generated by the compiler
		return null;
	}

	/**
	 * {@inheritDoc}
	 */
	public Map getRequiredOptions() {
		return null;
	}

	/**
	 * {@inheritDoc}
	 */
	public String[] getDescriptions() {
		List result= new ArrayList();
		if (isEnabled(CleanUpConstants.CONTROL_STATEMENTS_USE_BLOCKS) && isEnabled(CleanUpConstants.CONTROL_STATMENTS_USE_BLOCKS_ALWAYS))
			result.add(MultiFixMessages.CodeStyleMultiFix_ConvertSingleStatementInControlBodeyToBlock_description);
		if (isEnabled(CleanUpConstants.CONTROL_STATEMENTS_USE_BLOCKS) && isEnabled(CleanUpConstants.CONTROL_STATMENTS_USE_BLOCKS_NEVER))
			result.add(MultiFixMessages.ControlStatementsCleanUp_RemoveUnnecessaryBlocks_description);
		if (isEnabled(CleanUpConstants.CONTROL_STATEMENTS_USE_BLOCKS) && isEnabled(CleanUpConstants.CONTROL_STATMENTS_USE_BLOCKS_NO_FOR_RETURN_AND_THROW))
			result.add(MultiFixMessages.ControlStatementsCleanUp_RemoveUnnecessaryBlocksWithReturnOrThrow_description);
		
		return (String[])result.toArray(new String[result.size()]);
	}
	
	public String getPreview() {
		StringBuffer buf= new StringBuffer();
		
		if (isEnabled(CleanUpConstants.CONTROL_STATEMENTS_USE_BLOCKS) && isEnabled(CleanUpConstants.CONTROL_STATMENTS_USE_BLOCKS_ALWAYS)) {
			buf.append("if (obj == null) {\n"); //$NON-NLS-1$
			buf.append("    throw ('some exception');\n"); //$NON-NLS-1$
			buf.append("}\n"); //$NON-NLS-1$
			
			buf.append("if (ids.length > 0) {\n"); //$NON-NLS-1$
			buf.append("    alert(ids[0]);\n"); //$NON-NLS-1$
			buf.append("} else {\n"); //$NON-NLS-1$
			buf.append("    return;\n"); //$NON-NLS-1$
			buf.append("}\n"); //$NON-NLS-1$
		} else if (isEnabled(CleanUpConstants.CONTROL_STATEMENTS_USE_BLOCKS) && isEnabled(CleanUpConstants.CONTROL_STATMENTS_USE_BLOCKS_NEVER)){
			buf.append("if (obj == null)\n"); //$NON-NLS-1$
			buf.append("    throw ('some exception');\n"); //$NON-NLS-1$
			buf.append("\n"); //$NON-NLS-1$
			
			buf.append("if (ids.length > 0)\n"); //$NON-NLS-1$
			buf.append("    alert(ids[0]);\n"); //$NON-NLS-1$
			buf.append("else\n"); //$NON-NLS-1$
			buf.append("    return;\n"); //$NON-NLS-1$
			buf.append("\n"); //$NON-NLS-1$
		} else if (isEnabled(CleanUpConstants.CONTROL_STATEMENTS_USE_BLOCKS) && isEnabled(CleanUpConstants.CONTROL_STATMENTS_USE_BLOCKS_NO_FOR_RETURN_AND_THROW)) {
			buf.append("if (obj == null)\n"); //$NON-NLS-1$
			buf.append("    throw ('some exception');\n"); //$NON-NLS-1$
			buf.append("\n"); //$NON-NLS-1$
			
			buf.append("if (ids.length > 0) {\n"); //$NON-NLS-1$
			buf.append("    alert(ids[0]);\n"); //$NON-NLS-1$
			buf.append("} else \n"); //$NON-NLS-1$
			buf.append("    return;\n"); //$NON-NLS-1$
			buf.append("\n"); //$NON-NLS-1$
		} else {
			buf.append("if (obj == null) {\n"); //$NON-NLS-1$
			buf.append("    throw ('some exception');\n"); //$NON-NLS-1$
			buf.append("}\n"); //$NON-NLS-1$
			
			buf.append("if (ids.length > 0) {\n"); //$NON-NLS-1$
			buf.append("    alert(ids[0]);\n"); //$NON-NLS-1$
			buf.append("} else \n"); //$NON-NLS-1$
			buf.append("    return;\n"); //$NON-NLS-1$
			buf.append("\n"); //$NON-NLS-1$
		}
		
		return buf.toString();
	}

	/**
	 * {@inheritDoc}
	 */
	public boolean canFix(JavaScriptUnit compilationUnit, IProblemLocation problem) throws CoreException {
		return false;
	}

	/**
	 * {@inheritDoc}
	 */
	public int maximalNumberOfFixes(JavaScriptUnit compilationUnit) {
		return -1;
	}
}
