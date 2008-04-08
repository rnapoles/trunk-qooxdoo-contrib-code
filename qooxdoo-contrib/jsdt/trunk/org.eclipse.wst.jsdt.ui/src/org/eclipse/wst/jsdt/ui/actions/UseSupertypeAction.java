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
package org.eclipse.wst.jsdt.ui.actions;

import java.io.CharConversionException;

import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.jface.text.ITextSelection;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.ui.IWorkbenchSite;
import org.eclipse.ui.PlatformUI;
import org.eclipse.wst.jsdt.core.ICompilationUnit;
import org.eclipse.wst.jsdt.core.IType;
import org.eclipse.wst.jsdt.core.JavaModelException;
import org.eclipse.wst.jsdt.internal.corext.refactoring.RefactoringAvailabilityTester;
import org.eclipse.wst.jsdt.internal.corext.refactoring.RefactoringExecutionStarter;
import org.eclipse.wst.jsdt.internal.corext.refactoring.util.JavaElementUtil;
import org.eclipse.wst.jsdt.internal.corext.util.JavaModelUtil;
import org.eclipse.wst.jsdt.internal.ui.IJavaHelpContextIds;
import org.eclipse.wst.jsdt.internal.ui.JavaPlugin;
import org.eclipse.wst.jsdt.internal.ui.actions.ActionUtil;
import org.eclipse.wst.jsdt.internal.ui.actions.SelectionConverter;
import org.eclipse.wst.jsdt.internal.ui.javaeditor.JavaEditor;
import org.eclipse.wst.jsdt.internal.ui.javaeditor.JavaTextSelection;
import org.eclipse.wst.jsdt.internal.ui.refactoring.RefactoringMessages;
import org.eclipse.wst.jsdt.internal.ui.refactoring.actions.RefactoringActions;
import org.eclipse.wst.jsdt.internal.ui.util.ExceptionHandler;

/**
 * Tries to use a super type of a class where possible.
 *  
 * <p>
 * This class may be instantiated; it is not intended to be subclassed.
 * </p>
 * 
 * @since 2.1
 */
// Note: The disclaimer about instantiating and subclassing got added in 3.1.
// Don't make this class final or remove a constructor!
public class UseSupertypeAction extends SelectionDispatchAction{
	
	private JavaEditor fEditor;
	
	/**
	 * Note: This constructor is for internal use only. Clients should not call this constructor.
	 * @param editor the java editor
	 */
	public UseSupertypeAction(JavaEditor editor) {
		this(editor.getEditorSite());
		fEditor= editor;
		setEnabled(SelectionConverter.canOperateOn(fEditor));
	}

	/**
	 * Creates a new <code>UseSupertypeAction</code>. The action requires
	 * that the selection provided by the site's selection provider is of type <code>
	 * org.eclipse.jface.viewers.IStructuredSelection</code>.
	 * 
	 * @param site the site providing context information for this action
	 */
	public UseSupertypeAction(IWorkbenchSite site) {
		super(site);
		setText(RefactoringMessages.UseSupertypeAction_use_Supertype); 
		PlatformUI.getWorkbench().getHelpSystem().setHelp(this, IJavaHelpContextIds.USE_SUPERTYPE_ACTION);
	}
	
	//---- structured selection ---------------------------------------------------

	/*
	 * @see SelectionDispatchAction#selectionChanged(IStructuredSelection)
	 */
	public void selectionChanged(IStructuredSelection selection) {
		try {
			setEnabled(RefactoringAvailabilityTester.isUseSuperTypeAvailable(selection));
		} catch (JavaModelException e) {
			// http://bugs.eclipse.org/bugs/show_bug.cgi?id=19253
			if (!(e.getException() instanceof CharConversionException) && JavaModelUtil.isExceptionToBeLogged(e))
				JavaPlugin.log(e);
			setEnabled(false);// no UI - happens on selection changes
		}
	}

	/*
	 * @see SelectionDispatchAction#run(IStructuredSelection)
	 */
	public void run(IStructuredSelection selection) {
		try {
			if (RefactoringAvailabilityTester.isUseSuperTypeAvailable(selection)) {
				IType singleSelectedType= getSingleSelectedType(selection);
				if (! ActionUtil.isEditable(getShell(), singleSelectedType))
					return;
				RefactoringExecutionStarter.startUseSupertypeRefactoring(singleSelectedType, getShell());
			}
		} catch (JavaModelException e) {
			ExceptionHandler.handle(e, RefactoringMessages.OpenRefactoringWizardAction_refactoring, RefactoringMessages.OpenRefactoringWizardAction_exception); 
		}
	}

	private static IType getSingleSelectedType(IStructuredSelection selection) throws JavaModelException{
		if (selection.isEmpty() || selection.size() != 1) 
			return null;
		
		Object first= selection.getFirstElement();
		if (first instanceof IType)
			return (IType)first;
		if (first instanceof ICompilationUnit)	
			return JavaElementUtil.getMainType((ICompilationUnit)first);
		return null;
	}
	
	//---- text selection ------------------------------------------------------
	
    /*
     * @see SelectionDispatchAction#selectionChanged(ITextSelection)
     */
	public void selectionChanged(ITextSelection selection) {
		setEnabled(true);
	}
	
	/**
	 * Note: This method is for internal use only. Clients should not call this method.
	 */
	public void selectionChanged(JavaTextSelection selection) {
		try {
			setEnabled(RefactoringAvailabilityTester.isUseSuperTypeAvailable(selection));
		} catch (JavaModelException e) {
			setEnabled(false);
		}
	}
	
	/*
     * @see SelectionDispatchAction#run(ITextSelection)
     */
	public void run(ITextSelection selection) {
		try {
			IType type= RefactoringActions.getEnclosingOrPrimaryType(fEditor);
			if (RefactoringAvailabilityTester.isUseSuperTypeAvailable(type)) {
				if (! ActionUtil.isEditable(fEditor, getShell(), type))
					return;
				RefactoringExecutionStarter.startUseSupertypeRefactoring(type, getShell());
			} else {
				MessageDialog.openInformation(getShell(), RefactoringMessages.OpenRefactoringWizardAction_unavailable, RefactoringMessages.UseSupertypeAction_to_activate); 
			}
		} catch (JavaModelException e) {
			ExceptionHandler.handle(e, RefactoringMessages.OpenRefactoringWizardAction_refactoring, RefactoringMessages.OpenRefactoringWizardAction_exception); 
		}
	}
}