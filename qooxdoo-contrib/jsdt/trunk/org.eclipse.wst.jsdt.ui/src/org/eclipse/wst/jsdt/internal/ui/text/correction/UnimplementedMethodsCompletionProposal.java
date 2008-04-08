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

import org.eclipse.core.runtime.CoreException;
import org.eclipse.wst.jsdt.core.ICompilationUnit;
import org.eclipse.wst.jsdt.core.dom.AST;
import org.eclipse.wst.jsdt.core.dom.ASTNode;
import org.eclipse.wst.jsdt.core.dom.AbstractTypeDeclaration;
import org.eclipse.wst.jsdt.core.dom.AnonymousClassDeclaration;
import org.eclipse.wst.jsdt.core.dom.CompilationUnit;
import org.eclipse.wst.jsdt.core.dom.IMethodBinding;
import org.eclipse.wst.jsdt.core.dom.ITypeBinding;
import org.eclipse.wst.jsdt.core.dom.MethodDeclaration;
import org.eclipse.wst.jsdt.core.dom.rewrite.ASTRewrite;
import org.eclipse.wst.jsdt.core.dom.rewrite.ImportRewrite;
import org.eclipse.wst.jsdt.core.dom.rewrite.ListRewrite;
import org.eclipse.wst.jsdt.core.dom.rewrite.ImportRewrite.ImportRewriteContext;
import org.eclipse.wst.jsdt.internal.corext.codemanipulation.CodeGenerationSettings;
import org.eclipse.wst.jsdt.internal.corext.codemanipulation.ContextSensitiveImportRewriteContext;
import org.eclipse.wst.jsdt.internal.corext.codemanipulation.StubUtility2;
import org.eclipse.wst.jsdt.internal.corext.util.Messages;
import org.eclipse.wst.jsdt.internal.ui.JavaPlugin;
import org.eclipse.wst.jsdt.internal.ui.JavaPluginImages;
import org.eclipse.wst.jsdt.internal.ui.preferences.JavaPreferencesSettings;
import org.eclipse.wst.jsdt.internal.ui.viewsupport.BindingLabelProvider;
import org.eclipse.wst.jsdt.ui.JavaElementLabels;

public class UnimplementedMethodsCompletionProposal extends ASTRewriteCorrectionProposal {

	private ASTNode fTypeNode;
	private IMethodBinding[] fMethodsToOverride;

	public UnimplementedMethodsCompletionProposal(ICompilationUnit cu, ASTNode typeNode, int relevance) {
		super("", cu, null, relevance, null); //$NON-NLS-1$
		setDisplayName(CorrectionMessages.UnimplementedMethodsCompletionProposal_description);
		setImage(JavaPluginImages.get(JavaPluginImages.IMG_CORRECTION_CHANGE));

		fTypeNode= typeNode;
		fMethodsToOverride= null;
	}


	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.internal.ui.text.correction.ASTRewriteCorrectionProposal#getRewrite()
	 */
	protected ASTRewrite getRewrite() throws CoreException {
		ITypeBinding binding;
		AST ast= fTypeNode.getAST();

		ASTRewrite rewrite= ASTRewrite.create(ast);
		ListRewrite listRewrite;
		if (fTypeNode instanceof AnonymousClassDeclaration) {
			AnonymousClassDeclaration decl= (AnonymousClassDeclaration) fTypeNode;
			binding= decl.resolveBinding();
			listRewrite= rewrite.getListRewrite(decl, AnonymousClassDeclaration.BODY_DECLARATIONS_PROPERTY);
		} else {
			AbstractTypeDeclaration decl= (AbstractTypeDeclaration) fTypeNode;
			binding= decl.resolveBinding();
			listRewrite= rewrite.getListRewrite(decl, decl.getBodyDeclarationsProperty());
		}
		IMethodBinding[] methods= StubUtility2.getUnimplementedMethods(binding);
		fMethodsToOverride= methods;

		CodeGenerationSettings settings= JavaPreferencesSettings.getCodeGenerationSettings(getCompilationUnit().getJavaProject());
		if (binding.isAnonymous()) {
			settings.createComments= false;
		}
		ImportRewrite imports= createImportRewrite((CompilationUnit) fTypeNode.getRoot());
		ImportRewriteContext context= new ContextSensitiveImportRewriteContext((CompilationUnit) fTypeNode.getRoot(), fTypeNode.getStartPosition(), imports);
		for (int i= 0; i < methods.length; i++) {
			MethodDeclaration newMethodDecl= StubUtility2.createImplementationStub(getCompilationUnit(), rewrite, imports, ast, methods[i], binding.getName(), settings, binding.isInterface(), context);
			listRewrite.insertLast(newMethodDecl, null);
		}
		return rewrite;
	}

	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.internal.ui.text.correction.CUCorrectionProposal#getAdditionalProposalInfo()
	 */
	public String getAdditionalProposalInfo() {
		try {
			getChange(); // force the creation of the rewrite
			StringBuffer buf= new StringBuffer();
			buf.append("<b>"); //$NON-NLS-1$
			buf.append(Messages.format(CorrectionMessages.UnimplementedMethodsCompletionProposal_info, String.valueOf(fMethodsToOverride.length)));
			buf.append("</b><ul>"); //$NON-NLS-1$
			for (int i= 0; i < fMethodsToOverride.length; i++) {
				buf.append("<li>"); //$NON-NLS-1$
				buf.append(BindingLabelProvider.getBindingLabel(fMethodsToOverride[i], JavaElementLabels.ALL_FULLY_QUALIFIED));
				buf.append("</li>"); //$NON-NLS-1$
			}
			buf.append("</ul>"); //$NON-NLS-1$
			return buf.toString();
		} catch (CoreException e) {
			JavaPlugin.log(e);
		}
		return null;
	}
}
