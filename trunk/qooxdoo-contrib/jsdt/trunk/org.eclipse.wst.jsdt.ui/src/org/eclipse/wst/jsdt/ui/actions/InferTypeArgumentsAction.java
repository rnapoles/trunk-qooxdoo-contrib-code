/*******************************************************************************
 * Copyright (c) 2004, 2005 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.wst.jsdt.ui.actions;

import java.util.List;

import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.jface.text.ITextSelection;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.ui.IWorkbenchSite;
import org.eclipse.wst.jsdt.core.IJavaElement;
import org.eclipse.wst.jsdt.core.JavaModelException;
import org.eclipse.wst.jsdt.internal.corext.refactoring.RefactoringAvailabilityTester;
import org.eclipse.wst.jsdt.internal.corext.refactoring.RefactoringExecutionStarter;
import org.eclipse.wst.jsdt.internal.corext.util.JavaModelUtil;
import org.eclipse.wst.jsdt.internal.ui.JavaPlugin;
import org.eclipse.wst.jsdt.internal.ui.actions.ActionUtil;
import org.eclipse.wst.jsdt.internal.ui.actions.SelectionConverter;
import org.eclipse.wst.jsdt.internal.ui.javaeditor.JavaEditor;
import org.eclipse.wst.jsdt.internal.ui.javaeditor.JavaTextSelection;
import org.eclipse.wst.jsdt.internal.ui.refactoring.RefactoringMessages;
import org.eclipse.wst.jsdt.internal.ui.util.ExceptionHandler;

/**
 * Infers type arguments for raw references to generic types.
 *  
 * <p>
 * This class may be instantiated; it is not intended to be subclassed.
 * </p>
 *
 * @since 3.1
 */
public class InferTypeArgumentsAction extends SelectionDispatchAction {

	private JavaEditor fEditor;

	/**
	 * Note: This constructor is for internal use only. Clients should not call this constructor.
	 * 
	 * @param editor the java editor
	 */
	public InferTypeArgumentsAction(JavaEditor editor) {
		this(editor.getEditorSite());
		fEditor= editor;
		setEnabled(SelectionConverter.canOperateOn(fEditor));
	}
	
	/**
	 * Creates a new {@link InferTypeArgumentsAction}. The action requires
	 * that the selection provided by the site's selection provider is of type 
	 * {@link org.eclipse.jface.viewers.IStructuredSelection}.
	 * 
	 * @param site the site providing context information for this action
	 */
	public InferTypeArgumentsAction(IWorkbenchSite site) {
		super(site);
		setText(RefactoringMessages.InferTypeArgumentsAction_label); 
	}
	
    /*
     * @see SelectionDispatchAction#selectionChanged(ITextSelection)
     */
	public void selectionChanged(ITextSelection selection) {
		setEnabled(true);
	}
	
	/*
	 * @see org.eclipse.wst.jsdt.ui.actions.SelectionDispatchAction#selectionChanged(org.eclipse.wst.jsdt.internal.ui.javaeditor.JavaTextSelection)
	 */
	public void selectionChanged(JavaTextSelection selection) {
		if (selection.getLength() != 0)
			setEnabled(false);
		else
			setEnabled(SelectionConverter.canOperateOn(fEditor));
	}

	/*
	 * @see org.eclipse.wst.jsdt.ui.actions.SelectionDispatchAction#selectionChanged(org.eclipse.jface.viewers.IStructuredSelection)
	 */
	public void selectionChanged(IStructuredSelection selection) {
		try {
			setEnabled(RefactoringAvailabilityTester.isInferTypeArgumentsAvailable(selection));
		} catch (JavaModelException e) {
			// http://bugs.eclipse.org/bugs/show_bug.cgi?id=19253
			if (JavaModelUtil.isExceptionToBeLogged(e))
				JavaPlugin.log(e);
			setEnabled(false);//no UI
		}
	}

	/*
	 * @see org.eclipse.wst.jsdt.ui.actions.SelectionDispatchAction#run(org.eclipse.jface.viewers.IStructuredSelection)
	 */
	public void run(IStructuredSelection selection) {
		IJavaElement[] elements= getSelectedElements(selection);
		try {
			if (! ActionUtil.areProcessable(getShell(), elements))
				return;

			if (RefactoringAvailabilityTester.isInferTypeArgumentsAvailable(elements)) {
				RefactoringExecutionStarter.startInferTypeArgumentsRefactoring(elements, getShell());
			} else {
				MessageDialog.openInformation(getShell(), RefactoringMessages.OpenRefactoringWizardAction_unavailable, RefactoringMessages.InferTypeArgumentsAction_unavailable); 
			}
		} catch (JavaModelException e) {
			ExceptionHandler.handle(e, RefactoringMessages.OpenRefactoringWizardAction_refactoring, RefactoringMessages.OpenRefactoringWizardAction_exception); 
		}
	}

	/*
	 * @see org.eclipse.wst.jsdt.ui.actions.SelectionDispatchAction#run(org.eclipse.jface.text.ITextSelection)
	 */
	public void run(ITextSelection selection) {
		if (!ActionUtil.isEditable(fEditor))
			return;
		IJavaElement element= SelectionConverter.getInput(fEditor);
		IJavaElement[] array= new IJavaElement[] {element};
		try {
			if (element != null && RefactoringAvailabilityTester.isInferTypeArgumentsAvailable(array)){
				RefactoringExecutionStarter.startInferTypeArgumentsRefactoring(array, getShell());	
			} else {
				MessageDialog.openInformation(getShell(), RefactoringMessages.OpenRefactoringWizardAction_unavailable, RefactoringMessages.InferTypeArgumentsAction_unavailable); 
			}
		} catch (JavaModelException e) {
			ExceptionHandler.handle(e, RefactoringMessages.OpenRefactoringWizardAction_refactoring, RefactoringMessages.OpenRefactoringWizardAction_exception); 
		}
	}
	
	private static IJavaElement[] getSelectedElements(IStructuredSelection selection){
		List list= selection.toList();
		IJavaElement[] elements= new IJavaElement[list.size()];
		for (int i= 0; i < list.size(); i++) {
			Object object= list.get(i);
			if (object instanceof IJavaElement)
				elements[i]= (IJavaElement) object;
			else
				return new IJavaElement[0];
		}
		return elements;
	}
}