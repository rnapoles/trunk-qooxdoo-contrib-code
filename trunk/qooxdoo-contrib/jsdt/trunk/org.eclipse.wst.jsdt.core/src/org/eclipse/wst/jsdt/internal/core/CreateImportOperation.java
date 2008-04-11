/*******************************************************************************
 * Copyright (c) 2000, 2007 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.wst.jsdt.internal.core;

import java.util.Iterator;

import org.eclipse.core.runtime.IStatus;
import org.eclipse.jface.text.IDocument;
import org.eclipse.wst.jsdt.core.Flags;
import org.eclipse.wst.jsdt.core.ICompilationUnit;
import org.eclipse.wst.jsdt.core.IImportDeclaration;
import org.eclipse.wst.jsdt.core.IJavaElement;
import org.eclipse.wst.jsdt.core.IJavaModelStatus;
import org.eclipse.wst.jsdt.core.IJavaModelStatusConstants;
import org.eclipse.wst.jsdt.core.IJavaProject;
import org.eclipse.wst.jsdt.core.IType;
import org.eclipse.wst.jsdt.core.JavaConventions;
import org.eclipse.wst.jsdt.core.JavaCore;
import org.eclipse.wst.jsdt.core.JavaModelException;
import org.eclipse.wst.jsdt.core.compiler.CharOperation;
import org.eclipse.wst.jsdt.core.dom.AST;
import org.eclipse.wst.jsdt.core.dom.ASTNode;
import org.eclipse.wst.jsdt.core.dom.CompilationUnit;
import org.eclipse.wst.jsdt.core.dom.ImportDeclaration;
import org.eclipse.wst.jsdt.core.dom.Name;
import org.eclipse.wst.jsdt.core.dom.StructuralPropertyDescriptor;
import org.eclipse.wst.jsdt.core.dom.rewrite.ASTRewrite;
import org.eclipse.wst.jsdt.internal.core.util.Messages;

/**
 * <p>This operation adds an import declaration to an existing compilation unit.
 * If the compilation unit already includes the specified import declaration,
 * the import is not generated (it does not generate duplicates).
 * Note that it is valid to specify both a single-type import and an on-demand import
 * for the same package, for example <code>"java.io.File"</code> and
 * <code>"java.io.*"</code>, in which case both are preserved since the semantics
 * of this are not the same as just importing <code>"java.io.*"</code>.
 * Importing <code>"java.lang.*"</code>, or the package in which the compilation unit
 * is defined, are not treated as special cases.  If they are specified, they are
 * included in the result.
 *
 * <p>Required Attributes:<ul>
 *  <li>Compilation unit
 *  <li>Import name - the name of the import to add to the
 *      compilation unit. For example: <code>"java.io.File"</code> or <code>"java.awt.*"</code>
 * </ul>
 */
public class CreateImportOperation extends CreateElementInCUOperation {

	/*
	 * The name of the import to be created.
	 */
	protected String importName;

	/*
	 * The flags of the import to be created (either Flags#AccDefault or Flags#AccStatic)
	 */
	protected int flags;

/**
 * When executed, this operation will add an import to the given compilation unit.
 */
public CreateImportOperation(String importName, ICompilationUnit parentElement, int flags) {
	super(parentElement);
	this.importName = importName;
	this.flags = flags;
}
protected StructuralPropertyDescriptor getChildPropertyDescriptor(ASTNode parent) {
	return CompilationUnit.IMPORTS_PROPERTY;
}
protected ASTNode generateElementAST(ASTRewrite rewriter, IDocument document, ICompilationUnit cu) throws JavaModelException {
	// ensure no duplicate
	Iterator imports = this.cuAST.imports().iterator();
	boolean onDemand = this.importName.endsWith(".*"); //$NON-NLS-1$
	String importActualName = this.importName;
	if (onDemand) {
		importActualName = this.importName.substring(0, this.importName.length() - 2);
	}
	while (imports.hasNext()) {
		ImportDeclaration importDeclaration = (ImportDeclaration) imports.next();
		if (importActualName.equals(importDeclaration.getName().getFullyQualifiedName())
				&& (onDemand == importDeclaration.isOnDemand())
				&& (Flags.isStatic(this.flags) == importDeclaration.isStatic())) {
			this.creationOccurred = false;
			return null;
		}
	}

	AST ast = this.cuAST.getAST();
	ImportDeclaration importDeclaration = ast.newImportDeclaration();
	importDeclaration.setStatic(Flags.isStatic(this.flags));
	// split import name into individual fragments, checking for on demand imports
	char[][] charFragments = CharOperation.splitOn('.', importActualName.toCharArray(), 0, importActualName.length());
	int length = charFragments.length;
	String[] strFragments = new String[length];
	for (int i = 0; i < length; i++) {
		strFragments[i] = String.valueOf(charFragments[i]);
	}
	Name name = ast.newName(strFragments);
	importDeclaration.setName(name);
	if (onDemand) importDeclaration.setOnDemand(true);
	return importDeclaration;
}
/**
 * @see CreateElementInCUOperation#generateResultHandle
 */
protected IJavaElement generateResultHandle() {
	return getCompilationUnit().getImport(this.importName);
}
/**
 * @see CreateElementInCUOperation#getMainTaskName()
 */
public String getMainTaskName(){
	return Messages.operation_createImportsProgress;
}
/**
 * Sets the correct position for the new import:<ul>
 * <li> after the last import
 * <li> if no imports, before the first type
 * <li> if no type, after the package statement
 * <li> and if no package statement - first thing in the CU
 */
protected void initializeDefaultPosition() {
	try {
		ICompilationUnit cu = getCompilationUnit();
		IImportDeclaration[] imports = cu.getImports();
		if (imports.length > 0) {
			createAfter(imports[imports.length - 1]);
			return;
		}
		IType[] types = cu.getTypes();
		if (types.length > 0) {
			createBefore(types[0]);
			return;
		}
		IJavaElement[] children = cu.getChildren();
		//look for the package declaration
		for (int i = 0; i < children.length; i++) {
			if (children[i].getElementType() == IJavaElement.PACKAGE_DECLARATION) {
				createAfter(children[i]);
				return;
			}
		}
	} catch (JavaModelException e) {
		// cu doesn't exit: ignore
	}
}
/**
 * Possible failures: <ul>
 *  <li>NO_ELEMENTS_TO_PROCESS - the compilation unit supplied to the operation is
 * 		<code>null</code>.
 *  <li>INVALID_NAME - not a valid import declaration name.
 * </ul>
 * @see IJavaModelStatus
 * @see JavaConventions
 */
public IJavaModelStatus verify() {
	IJavaModelStatus status = super.verify();
	if (!status.isOK()) {
		return status;
	}
	IJavaProject project = getParentElement().getJavaProject();
	if (JavaConventions.validateImportDeclaration(this.importName, project.getOption(JavaCore.COMPILER_SOURCE, true), project.getOption(JavaCore.COMPILER_COMPLIANCE, true)).getSeverity() == IStatus.ERROR) {
		return new JavaModelStatus(IJavaModelStatusConstants.INVALID_NAME, this.importName);
	}
	return JavaModelStatus.VERIFIED_OK;
}
}
