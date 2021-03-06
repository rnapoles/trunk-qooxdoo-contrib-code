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
package org.eclipse.wst.jsdt.internal.ui.text.correction;

import java.util.List;
import java.util.Set;

import org.eclipse.core.runtime.Assert;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.wst.jsdt.core.IJavaScriptUnit;
import org.eclipse.wst.jsdt.core.dom.AST;
import org.eclipse.wst.jsdt.core.dom.ASTNode;
import org.eclipse.wst.jsdt.core.dom.JavaScriptUnit;
import org.eclipse.wst.jsdt.core.dom.IBinding;
import org.eclipse.wst.jsdt.core.dom.IFunctionBinding;
import org.eclipse.wst.jsdt.core.dom.ITypeBinding;
import org.eclipse.wst.jsdt.core.dom.JSdoc;
import org.eclipse.wst.jsdt.core.dom.FunctionDeclaration;
import org.eclipse.wst.jsdt.core.dom.TagElement;
import org.eclipse.wst.jsdt.core.dom.TextElement;
import org.eclipse.wst.jsdt.core.dom.Type;
import org.eclipse.wst.jsdt.core.dom.TypeDeclaration;
import org.eclipse.wst.jsdt.core.dom.TypeParameter;
import org.eclipse.wst.jsdt.core.dom.rewrite.ASTRewrite;
import org.eclipse.wst.jsdt.core.dom.rewrite.ListRewrite;
import org.eclipse.wst.jsdt.internal.corext.dom.Bindings;
import org.eclipse.wst.jsdt.internal.corext.util.Messages;
import org.eclipse.wst.jsdt.internal.ui.JavaPluginImages;

/**
 *
 */
public class AddTypeParameterProposal extends LinkedCorrectionProposal {

	private IBinding fBinding;
	private JavaScriptUnit fAstRoot;

	private final String fTypeParamName;
	private final ITypeBinding[] fBounds;

	public AddTypeParameterProposal(IJavaScriptUnit targetCU, IBinding binding, JavaScriptUnit astRoot, String name, ITypeBinding[] bounds, int relevance) {
		super("", targetCU, null, relevance, JavaPluginImages.get(JavaPluginImages.IMG_FIELD_PUBLIC)); //$NON-NLS-1$

		Assert.isTrue(binding != null && Bindings.isDeclarationBinding(binding));
		Assert.isTrue(binding instanceof IFunctionBinding || binding instanceof ITypeBinding);

		fBinding= binding;
		fAstRoot= astRoot;
		fTypeParamName= name;
		fBounds= bounds;

		if (binding instanceof IFunctionBinding) {
			boolean isSameCU= fAstRoot.findDeclaringNode(binding) != null;
			String[] args= { fTypeParamName, ASTResolving.getMethodSignature((IFunctionBinding) binding, isSameCU) };
			setDisplayName(Messages.format(CorrectionMessages.AddTypeParameterProposal_method_label, args));
		} else {
			String[] args= { fTypeParamName, ASTResolving.getTypeSignature((ITypeBinding) binding) };
			setDisplayName(Messages.format(CorrectionMessages.AddTypeParameterProposal_type_label, args));
		}
	}

	protected ASTRewrite getRewrite() throws CoreException {
		ASTNode boundNode= fAstRoot.findDeclaringNode(fBinding);
		ASTNode declNode= null;

		if (boundNode != null) {
			declNode= boundNode; // is same CU
			createImportRewrite(fAstRoot);
		} else {
			JavaScriptUnit newRoot= ASTResolving.createQuickFixAST(getCompilationUnit(), null);
			declNode= newRoot.findDeclaringNode(fBinding.getKey());
			createImportRewrite(newRoot);
		}
		AST ast= declNode.getAST();
		TypeParameter newTypeParam= ast.newTypeParameter();
		newTypeParam.setName(ast.newSimpleName(fTypeParamName));
		if (fBounds != null && fBounds.length > 0) {
			List typeBounds= newTypeParam.typeBounds();
			for (int i= 0; i < fBounds.length; i++) {
				Type newBound= getImportRewrite().addImport(fBounds[i], ast);
				typeBounds.add(newBound);
			}
		}
		ASTRewrite rewrite= ASTRewrite.create(ast);
		ListRewrite listRewrite;
		JSdoc javadoc;
		List otherTypeParams;
		if (declNode instanceof TypeDeclaration) {
			TypeDeclaration declaration= (TypeDeclaration) declNode;
			listRewrite= rewrite.getListRewrite(declaration, TypeDeclaration.TYPE_PARAMETERS_PROPERTY);
			otherTypeParams= declaration.typeParameters();
			javadoc= declaration.getJavadoc();
		} else {
			FunctionDeclaration declaration= (FunctionDeclaration) declNode;
			listRewrite= rewrite.getListRewrite(declNode, FunctionDeclaration.TYPE_PARAMETERS_PROPERTY);
			otherTypeParams= declaration.typeParameters();
			javadoc= declaration.getJavadoc();
		}
		listRewrite.insertLast(newTypeParam, null);

		if (javadoc != null && otherTypeParams != null) {
			ListRewrite tagsRewriter= rewrite.getListRewrite(javadoc, JSdoc.TAGS_PROPERTY);
			Set previousNames= JavadocTagsSubProcessor.getPreviousTypeParamNames(otherTypeParams, null);

			String name= '<' + fTypeParamName + '>';
			TagElement newTag= ast.newTagElement();
			newTag.setTagName(TagElement.TAG_PARAM);
			TextElement text= ast.newTextElement();
			text.setText(name);
			newTag.fragments().add(text);

			JavadocTagsSubProcessor.insertTag(tagsRewriter, newTag, previousNames);
		}
		return rewrite;
	}


}
