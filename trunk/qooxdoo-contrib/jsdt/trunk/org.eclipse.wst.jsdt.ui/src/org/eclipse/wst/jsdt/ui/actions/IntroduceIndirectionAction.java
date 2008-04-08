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
package org.eclipse.wst.jsdt.ui.actions;

import org.eclipse.core.runtime.Assert;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.jface.text.ITextSelection;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.ui.IWorkbenchSite;
import org.eclipse.ui.PlatformUI;
import org.eclipse.wst.jsdt.core.IClassFile;
import org.eclipse.wst.jsdt.core.ICompilationUnit;
import org.eclipse.wst.jsdt.core.IMethod;
import org.eclipse.wst.jsdt.core.JavaModelException;
import org.eclipse.wst.jsdt.internal.corext.refactoring.RefactoringAvailabilityTester;
import org.eclipse.wst.jsdt.internal.corext.refactoring.RefactoringExecutionStarter;
import org.eclipse.wst.jsdt.internal.corext.util.JavaModelUtil;
import org.eclipse.wst.jsdt.internal.ui.IJavaHelpContextIds;
import org.eclipse.wst.jsdt.internal.ui.JavaPlugin;
import org.eclipse.wst.jsdt.internal.ui.actions.ActionUtil;
import org.eclipse.wst.jsdt.internal.ui.actions.SelectionConverter;
import org.eclipse.wst.jsdt.internal.ui.javaeditor.JavaEditor;
import org.eclipse.wst.jsdt.internal.ui.javaeditor.JavaTextSelection;
import org.eclipse.wst.jsdt.internal.ui.refactoring.RefactoringMessages;
import org.eclipse.wst.jsdt.internal.ui.util.ExceptionHandler;

/**
 * Action that introduces an indirection for a certain method. This action may be invoked
 * on source or binary methods or method invocations with or without attached source.
 * 
 * <p>
 * This class may be instantiated; it is not intended to be subclassed.
 * </p>
 * 
 * @since 3.2
 */
public class IntroduceIndirectionAction extends SelectionDispatchAction {

	private JavaEditor fEditor;

	/**
	 * Note: This constructor is for internal use only. Clients should not call this constructor.
	 * @param editor the compilation unit editor
	 */
	public IntroduceIndirectionAction(JavaEditor editor) {
		this(editor.getEditorSite());
		fEditor= editor;
		setEnabled(true);
	}

	/**
	 * Creates a new <code>IntroduceIndirectionAction</code>. 
	 * 
	 * @param site the site providing context information for this action
	 */
	public IntroduceIndirectionAction(IWorkbenchSite site) {
		super(site);
		setText(RefactoringMessages.IntroduceIndirectionAction_title);
		setToolTipText(RefactoringMessages.IntroduceIndirectionAction_tooltip);
		setDescription(RefactoringMessages.IntroduceIndirectionAction_description);
		PlatformUI.getWorkbench().getHelpSystem().setHelp(this, IJavaHelpContextIds.INTRODUCE_INDIRECTION_ACTION);
	}

	//---- structured selection --------------------------------------------------

	/*
	 * @see SelectionDispatchAction#selectionChanged(IStructuredSelection)
	 */
	public void selectionChanged(IStructuredSelection selection) {
		try {
			setEnabled(RefactoringAvailabilityTester.isIntroduceIndirectionAvailable(selection));
		} catch (JavaModelException e) {
			if (JavaModelUtil.isExceptionToBeLogged(e))
				JavaPlugin.log(e);
		}
	}

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
			setEnabled(RefactoringAvailabilityTester.isIntroduceIndirectionAvailable(selection));
		} catch (JavaModelException e) {
			setEnabled(false);
		}
	}

	/*
	 * @see SelectionDispatchAction#run(IStructuredSelection)
	 */
	public void run(IStructuredSelection selection) {
		try {
			Assert.isTrue(RefactoringAvailabilityTester.isIntroduceIndirectionAvailable(selection));
			Object first= selection.getFirstElement();
			Assert.isTrue(first instanceof IMethod);
			run((IMethod) first);
		} catch (CoreException e) {
			ExceptionHandler.handle(e, RefactoringMessages.IntroduceIndirectionAction_dialog_title, RefactoringMessages.IntroduceIndirectionAction_unknown_exception);
		}
	}

	/* (non-Javadoc)
	 * Method declared on SelectionDispatchAction
	 */
	public void run(ITextSelection selection) {
		try {
			Object editorInput= SelectionConverter.getInput(fEditor);
			if (editorInput instanceof ICompilationUnit)
				run(selection.getOffset(), selection.getLength(), (ICompilationUnit) editorInput);
			else if (editorInput instanceof IClassFile)
				run(selection.getOffset(), selection.getLength(), (IClassFile) editorInput);
		} catch (JavaModelException e) {
			ExceptionHandler.handle(e, getShell(), RefactoringMessages.IntroduceIndirectionAction_dialog_title, RefactoringMessages.IntroduceIndirectionAction_unknown_exception);
		}
	}

	private void run(int offset, int length, ICompilationUnit unit) throws JavaModelException {
		if (!ActionUtil.isEditable(fEditor, getShell(), unit))
			return;
		RefactoringExecutionStarter.startIntroduceIndirectionRefactoring(unit, offset, length, getShell());
	}

	private void run(int offset, int length, IClassFile file) throws JavaModelException {
		if (!ActionUtil.isEditable(fEditor, getShell(), file))
			return;
		RefactoringExecutionStarter.startIntroduceIndirectionRefactoring(file, offset, length, getShell());
	}

	private void run(IMethod method) throws JavaModelException {
		if (!ActionUtil.isEditable(fEditor, getShell(), method))
			return;
		RefactoringExecutionStarter.startIntroduceIndirectionRefactoring(method, getShell());
	}
}
