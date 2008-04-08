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
package org.eclipse.wst.jsdt.internal.corext.codemanipulation;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.core.resources.IWorkspaceRunnable;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.core.runtime.SubProgressMonitor;
import org.eclipse.core.runtime.jobs.ISchedulingRule;
import org.eclipse.text.edits.MultiTextEdit;
import org.eclipse.text.edits.TextEdit;
import org.eclipse.wst.jsdt.core.ICompilationUnit;
import org.eclipse.wst.jsdt.core.dom.AST;
import org.eclipse.wst.jsdt.core.dom.ASTNode;
import org.eclipse.wst.jsdt.core.dom.AbstractTypeDeclaration;
import org.eclipse.wst.jsdt.core.dom.AnonymousClassDeclaration;
import org.eclipse.wst.jsdt.core.dom.ChildListPropertyDescriptor;
import org.eclipse.wst.jsdt.core.dom.CompilationUnit;
import org.eclipse.wst.jsdt.core.dom.IMethodBinding;
import org.eclipse.wst.jsdt.core.dom.ITypeBinding;
import org.eclipse.wst.jsdt.core.dom.MethodDeclaration;
import org.eclipse.wst.jsdt.core.dom.rewrite.ASTRewrite;
import org.eclipse.wst.jsdt.core.dom.rewrite.ImportRewrite;
import org.eclipse.wst.jsdt.core.dom.rewrite.ListRewrite;
import org.eclipse.wst.jsdt.core.dom.rewrite.ImportRewrite.ImportRewriteContext;
import org.eclipse.wst.jsdt.internal.corext.util.JavaModelUtil;
import org.eclipse.wst.jsdt.internal.ui.preferences.JavaPreferencesSettings;

/**
 * Workspace runnable to add unimplemented methods.
 * 
 * @since 3.1
 */
public final class AddUnimplementedMethodsOperation implements IWorkspaceRunnable {

	/** Should the resulting edit be applied? */
	private final boolean fApply;

	/** The qualified names of the generated imports */
	private String[] fCreatedImports;

	/** The method binding keys for which a method was generated */
	private final List fCreatedMethods= new ArrayList();

	/** Should the import edits be applied? */
	private final boolean fImports;

	/** The insertion point, or <code>-1</code> */
	private final int fInsertPos;

	/** The method bindings to implement */
	private final IMethodBinding[] fMethodsToImplement;

	/** Should the compilation unit content be saved? */
	private final boolean fSave;

	/** Specified if comments should be created */
	private boolean fDoCreateComments;

	/** The type declaration to add the methods to */
	private final ITypeBinding fType;

	/** The compilation unit AST node */
	private final CompilationUnit fASTRoot;

	/**
	 * Creates a new add unimplemented methods operation.
	 * 
	 * @param astRoot the compilation unit AST node
	 * @param type the type to add the methods to
	 * @param methodsToImplement the method bindings to implement or <code>null</code> to implement all unimplemented methods
	 * 	@param insertPos the insertion point, or <code>-1</code>
	 * @param imports <code>true</code> if the import edits should be applied, <code>false</code> otherwise
	 * @param apply <code>true</code> if the resulting edit should be applied, <code>false</code> otherwise
	 * @param save <code>true</code> if the changed compilation unit should be saved, <code>false</code> otherwise
	 */
	public AddUnimplementedMethodsOperation(CompilationUnit astRoot, ITypeBinding type, IMethodBinding[] methodsToImplement, int insertPos, final boolean imports, final boolean apply, final boolean save) {
		if (astRoot == null || !(astRoot.getJavaElement() instanceof ICompilationUnit)) {
			throw new IllegalArgumentException("AST must not be null and has to be created from a ICompilationUnit"); //$NON-NLS-1$
		}
		if (type == null) {
			throw new IllegalArgumentException("The type must not be null"); //$NON-NLS-1$
		}
		ASTNode node= astRoot.findDeclaringNode(type);
		if (!(node instanceof AnonymousClassDeclaration || node instanceof AbstractTypeDeclaration)) {
			throw new IllegalArgumentException("type has to map to a type declaration in the AST"); //$NON-NLS-1$
		}
		
		fType= type;
		fInsertPos= insertPos;
		fASTRoot= astRoot;
		fMethodsToImplement= methodsToImplement;
		fSave= save;
		fApply= apply;
		fImports= imports;
		
		fDoCreateComments= StubUtility.doAddComments(astRoot.getJavaElement().getJavaProject());
	}
	
	public void setCreateComments(boolean createComments) {
		fDoCreateComments= createComments;
	}
	
	
	/**
	 * Returns the qualified names of the generated imports.
	 * 
	 * @return the generated imports
	 */
	public final String[] getCreatedImports() {
		if (fCreatedImports != null) {
			return fCreatedImports;
		}
		return new String[0];
	}

	/**
	 * Returns the method binding keys for which a method has been generated.
	 * 
	 * @return the method binding keys
	 */
	public final String[] getCreatedMethods() {
		final String[] keys= new String[fCreatedMethods.size()];
		fCreatedMethods.toArray(keys);
		return keys;
	}

	/**
	 * Returns the scheduling rule for this operation.
	 * 
	 * @return the scheduling rule
	 */
	public final ISchedulingRule getSchedulingRule() {
		return ResourcesPlugin.getWorkspace().getRoot();
	}

	/*
	 * @see org.eclipse.core.resources.IWorkspaceRunnable#run(org.eclipse.core.runtime.IProgressMonitor)
	 */
	public final void run(IProgressMonitor monitor) throws CoreException {
		if (monitor == null)
			monitor= new NullProgressMonitor();
		try {
			monitor.beginTask("", 2); //$NON-NLS-1$
			monitor.setTaskName(CodeGenerationMessages.AddUnimplementedMethodsOperation_description);
			fCreatedMethods.clear();
			ICompilationUnit cu= (ICompilationUnit) fASTRoot.getJavaElement();
			
			AST ast= fASTRoot.getAST();
			
			ASTRewrite astRewrite= ASTRewrite.create(ast);
			ImportRewrite importRewrite= StubUtility.createImportRewrite(fASTRoot, true);
			
			ITypeBinding currTypeBinding= fType;
			ListRewrite memberRewriter= null;
			
			ASTNode node= fASTRoot.findDeclaringNode(currTypeBinding);
			if (node instanceof AnonymousClassDeclaration) {
				memberRewriter= astRewrite.getListRewrite(node, AnonymousClassDeclaration.BODY_DECLARATIONS_PROPERTY);
			} else if (node instanceof AbstractTypeDeclaration) {
				ChildListPropertyDescriptor property= ((AbstractTypeDeclaration) node).getBodyDeclarationsProperty();
				memberRewriter= astRewrite.getListRewrite(node, property);
			} else {
				throw new IllegalArgumentException();
				// not possible, we checked this in the constructor
			}
			
			final CodeGenerationSettings settings= JavaPreferencesSettings.getCodeGenerationSettings(cu.getJavaProject());
			settings.createComments= fDoCreateComments;

			ASTNode insertion= getNodeToInsertBefore(memberRewriter);
			
			IMethodBinding[] methodsToImplement= fMethodsToImplement;
			if (methodsToImplement == null) {
				methodsToImplement= StubUtility2.getUnimplementedMethods(currTypeBinding);
			}
			
			ImportRewriteContext context= null;
			int insertionPosition= fInsertPos;
			if (insertionPosition == -1 && fASTRoot.types().size() > 0) {
				AbstractTypeDeclaration firstTypeDecl= (AbstractTypeDeclaration)fASTRoot.types().get(0);
				insertionPosition= firstTypeDecl.getStartPosition();
				if (insertionPosition != -1) {
					 context= new ContextSensitiveImportRewriteContext(fASTRoot, insertionPosition, importRewrite);
				}
			}

			for (int i= 0; i < methodsToImplement.length; i++) {
				IMethodBinding curr= methodsToImplement[i];
				MethodDeclaration stub= StubUtility2.createImplementationStub(cu, astRewrite, importRewrite, ast, curr, currTypeBinding.getName(), settings, currTypeBinding.isInterface(), context);
				if (stub != null) {
					fCreatedMethods.add(curr.getKey());
					if (insertion != null)
						memberRewriter.insertBefore(stub, insertion, null);
					else
						memberRewriter.insertLast(stub, null);
				}
			}
			MultiTextEdit edit= new MultiTextEdit();
			
			TextEdit importEdits= importRewrite.rewriteImports(new SubProgressMonitor(monitor, 1));
			fCreatedImports= importRewrite.getCreatedImports();
			if (fImports) {
				edit.addChild(importEdits);
			}
			edit.addChild(astRewrite.rewriteAST());
			
			if (fApply) {
				JavaModelUtil.applyEdit(cu, edit, fSave, new SubProgressMonitor(monitor, 1));
			}
		} finally {
			monitor.done();
		}
	}
		
	private ASTNode getNodeToInsertBefore(ListRewrite rewriter) {
		if (fInsertPos != -1) {
			List members= rewriter.getOriginalList();
			for (int i= 0; i < members.size(); i++) {
				ASTNode curr= (ASTNode) members.get(i);
				if (curr.getStartPosition() >= fInsertPos) {
					return curr;
				}
			}
		}
		return null;
	}
		
}
