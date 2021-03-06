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
package org.eclipse.wst.jsdt.internal.ui.refactoring;

import java.util.Arrays;
import java.util.List;

import org.eclipse.jface.dialogs.Dialog;
import org.eclipse.jface.dialogs.IDialogSettings;
import org.eclipse.jface.viewers.ArrayContentProvider;
import org.eclipse.jface.viewers.CheckStateChangedEvent;
import org.eclipse.jface.viewers.CheckboxTableViewer;
import org.eclipse.jface.viewers.ICheckStateListener;
import org.eclipse.jface.viewers.ILabelProvider;
import org.eclipse.jface.wizard.IWizardPage;
import org.eclipse.ltk.core.refactoring.RefactoringStatus;
import org.eclipse.ltk.ui.refactoring.RefactoringWizard;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Text;
import org.eclipse.ui.PlatformUI;
import org.eclipse.wst.jsdt.core.IJavaScriptElement;
import org.eclipse.wst.jsdt.core.IMember;
import org.eclipse.wst.jsdt.core.JavaScriptModelException;
import org.eclipse.wst.jsdt.internal.corext.refactoring.structure.ExtractInterfaceProcessor;
import org.eclipse.wst.jsdt.internal.corext.refactoring.structure.ExtractInterfaceRefactoring;
import org.eclipse.wst.jsdt.internal.corext.refactoring.structure.constraints.SuperTypeRefactoringProcessor;
import org.eclipse.wst.jsdt.internal.corext.util.Messages;
import org.eclipse.wst.jsdt.internal.ui.IJavaHelpContextIds;
import org.eclipse.wst.jsdt.internal.ui.JavaScriptPlugin;
import org.eclipse.wst.jsdt.internal.ui.util.ExceptionHandler;
import org.eclipse.wst.jsdt.internal.ui.util.SWTUtil;
import org.eclipse.wst.jsdt.internal.ui.viewsupport.AppearanceAwareLabelProvider;
import org.eclipse.wst.jsdt.internal.ui.viewsupport.DecoratingJavaLabelProvider;
import org.eclipse.wst.jsdt.ui.JavaScriptElementComparator;
import org.eclipse.wst.jsdt.ui.JavaScriptElementLabels;

public class ExtractInterfaceWizard extends RefactoringWizard {
	
	public ExtractInterfaceWizard(ExtractInterfaceRefactoring refactoring) {
		super(refactoring, DIALOG_BASED_USER_INTERFACE); 
		setDefaultPageTitle(RefactoringMessages.ExtractInterfaceWizard_Extract_Interface); 
	}

	/* non java-doc
	 * @see RefactoringWizard#addUserInputPages
	 */ 
	protected void addUserInputPages(){
		addPage(new ExtractInterfaceInputPage());
	}
	
	private static class ExtractInterfaceInputPage extends TextInputWizardPage {

		private Button fReplaceAllCheckbox;
		private Button fDeclarePublicCheckbox;
		private Button fDeclareAbstractCheckbox;
		private Button fGenerateCommentsCheckbox;
		private Button fInstanceofCheckbox;
		private CheckboxTableViewer fTableViewer;
		private static final String DESCRIPTION = RefactoringMessages.ExtractInterfaceInputPage_description; 
		private static final String SETTING_PUBLIC= 		"Public";//$NON-NLS-1$
		private static final String SETTING_ABSTRACT= 		"Abstract";//$NON-NLS-1$
		private static final String SETTING_REPLACE= "Replace"; //$NON-NLS-1$
		private static final String SETTING_COMMENTS= "Comments"; //$NON-NLS-1$
		private static final String SETTING_INSTANCEOF= "InstanceOf"; //$NON-NLS-1$
		private Button fSelectAllButton;
		private Button fDeselectAllButton;

		public ExtractInterfaceInputPage() {
			super(DESCRIPTION, true);
		}

		public void createControl(Composite parent) {
			initializeDialogUnits(parent);
			Composite result= new Composite(parent, SWT.NONE);
			setControl(result);
			GridLayout layout= new GridLayout();
			layout.numColumns= 2;
			result.setLayout(layout);
		
			Label label= new Label(result, SWT.NONE);
			label.setText(RefactoringMessages.ExtractInterfaceInputPage_Interface_name); 
		
			Text text= createTextInputField(result);
			text.selectAll();
			text.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
				
			addReplaceAllCheckbox(result);
			addInstanceofCheckbox(result, layout.marginWidth);
			fReplaceAllCheckbox.addSelectionListener(new SelectionAdapter() {
				
				public void widgetSelected(SelectionEvent e) {
					fInstanceofCheckbox.setEnabled(fReplaceAllCheckbox.getSelection());
				}
			});
			addDeclareAsPublicCheckbox(result);
			addDeclareAsAbstractCheckbox(result);

			Label separator= new Label(result, SWT.NONE);
			GridData gd= new GridData();
			gd.horizontalSpan= 2;
			separator.setLayoutData(gd);

			Label tableLabel= new Label(result, SWT.NONE);
			tableLabel.setText(RefactoringMessages.ExtractInterfaceInputPage_Members); 
			tableLabel.setEnabled(anyMembersToExtract());
			gd= new GridData();
			gd.horizontalSpan= 2;
			tableLabel.setLayoutData(gd);
		
			addMemberListComposite(result);
			addGenerateCommentsCheckbox(result);
			Dialog.applyDialogFont(result);
			initializeCheckboxes();
			updateUIElementEnablement();
			PlatformUI.getWorkbench().getHelpSystem().setHelp(getControl(), IJavaHelpContextIds.EXTRACT_INTERFACE_WIZARD_PAGE);
		}

		private void addGenerateCommentsCheckbox(Composite result) {
			final ExtractInterfaceProcessor processor= getExtractInterfaceRefactoring().getExtractInterfaceProcessor();
			String title= RefactoringMessages.ExtractInterfaceWizard_generate_comments; 
			fGenerateCommentsCheckbox= createCheckbox(result,  title, false);
			processor.setComments(fGenerateCommentsCheckbox.getSelection());
			fGenerateCommentsCheckbox.addSelectionListener(new SelectionAdapter(){
				public void widgetSelected(SelectionEvent e) {
					processor.setComments(fGenerateCommentsCheckbox.getSelection());
				}
			});		
		}

		private void addInstanceofCheckbox(Composite result, int margin) {
			final SuperTypeRefactoringProcessor processor= getExtractInterfaceRefactoring().getExtractInterfaceProcessor();
			String title= RefactoringMessages.ExtractInterfaceWizard_use_supertype;
			fInstanceofCheckbox= new Button(result, SWT.CHECK);
			fInstanceofCheckbox.setSelection(false);
			GridData gd= new GridData();
			gd.horizontalIndent= (margin + fInstanceofCheckbox.computeSize(SWT.DEFAULT, SWT.DEFAULT).x);
			gd.horizontalSpan= 2;
			fInstanceofCheckbox.setLayoutData(gd);
			fInstanceofCheckbox.setText(title);
			processor.setInstanceOf(fInstanceofCheckbox.getSelection());
			fInstanceofCheckbox.addSelectionListener(new SelectionAdapter(){
				public void widgetSelected(SelectionEvent e) {
					processor.setInstanceOf(fInstanceofCheckbox.getSelection());
				}
			});		
		}
		
		private void addMemberListComposite(Composite result) {
			Composite composite= new Composite(result, SWT.NONE);
			GridLayout layout= new GridLayout();
			layout.numColumns= 2;
			layout.marginWidth= 0;
			layout.marginHeight= 0;
			composite.setLayout(layout);
			GridData gd= new GridData(GridData.FILL_BOTH);
			gd.heightHint= convertHeightInCharsToPixels(12);
			gd.horizontalSpan= 2;
			composite.setLayoutData(gd);
		
			fTableViewer= CheckboxTableViewer.newCheckList(composite, SWT.BORDER | SWT.V_SCROLL | SWT.H_SCROLL);
			fTableViewer.getTable().setLayoutData(new GridData(GridData.FILL_BOTH));
			fTableViewer.setLabelProvider(createLabelProvider());
			fTableViewer.setContentProvider(new ArrayContentProvider());
			try {
				fTableViewer.setInput(getExtractableMembers());
			} catch (JavaScriptModelException e) {
				ExceptionHandler.handle(e, RefactoringMessages.ExtractInterfaceInputPage_Extract_Interface, RefactoringMessages.ExtractInterfaceInputPage_Internal_Error); 
				fTableViewer.setInput(new IMember[0]);
			}
			fTableViewer.addCheckStateListener(new ICheckStateListener(){
				public void checkStateChanged(CheckStateChangedEvent event) {
					ExtractInterfaceInputPage.this.updateUIElementEnablement();
				}
			});
			fTableViewer.setComparator(new JavaScriptElementComparator());
			fTableViewer.getControl().setEnabled(anyMembersToExtract());

			createButtonComposite(composite);
		}

		private IMember[] getExtractableMembers() throws JavaScriptModelException {
			return getExtractInterfaceRefactoring().getExtractInterfaceProcessor().getExtractableMembers();
		}

		protected void updateUIElementEnablement() {
			final IMember[] checked= getCheckedMembers();
			IMember[] extractable;
			try {
				extractable= getExtractableMembers();
			} catch (JavaScriptModelException exception) {
				extractable= new IMember[0];
				JavaScriptPlugin.log(exception);
			}
			final boolean enabled= containsMethods(checked);
			fDeclarePublicCheckbox.setEnabled(enabled);
			fDeclareAbstractCheckbox.setEnabled(enabled);
			fGenerateCommentsCheckbox.setEnabled(enabled);
			fInstanceofCheckbox.setEnabled(fReplaceAllCheckbox.getSelection());
			fSelectAllButton.setEnabled(checked.length < extractable.length);
			fDeselectAllButton.setEnabled(checked.length > 0);
		}

		private static boolean containsMethods(IMember[] members) {
			for (int i= 0; i < members.length; i++) {
				if (members[i].getElementType() == IJavaScriptElement.METHOD)
					return true;
			}
			return false;
		}

		private ILabelProvider createLabelProvider(){
			AppearanceAwareLabelProvider lprovider= new AppearanceAwareLabelProvider(
				AppearanceAwareLabelProvider.DEFAULT_TEXTFLAGS |  JavaScriptElementLabels.F_APP_TYPE_SIGNATURE,
				AppearanceAwareLabelProvider.DEFAULT_IMAGEFLAGS
			);
		
			return new DecoratingJavaLabelProvider(lprovider);
		}

		private void createButtonComposite(Composite composite) {
			GridData gd;
			Composite buttonComposite= new Composite(composite, SWT.NONE);
			GridLayout gl= new GridLayout();
			gl.marginHeight= 0;
			gl.marginWidth= 0;
			buttonComposite.setLayout(gl);
			gd= new GridData(GridData.FILL_VERTICAL);
			buttonComposite.setLayoutData(gd);
		
			fSelectAllButton= new Button(buttonComposite, SWT.PUSH);
			fSelectAllButton.setText(RefactoringMessages.ExtractInterfaceInputPage_Select_All); 
			fSelectAllButton.setEnabled(anyMembersToExtract());
			fSelectAllButton.setLayoutData(new GridData());
			SWTUtil.setButtonDimensionHint(fSelectAllButton);
			fSelectAllButton.addSelectionListener(new SelectionAdapter(){
				public void widgetSelected(SelectionEvent e) {
					fTableViewer.setAllChecked(true);
					ExtractInterfaceInputPage.this.updateUIElementEnablement();
				}
			});
		
			fDeselectAllButton= new Button(buttonComposite, SWT.PUSH);
			fDeselectAllButton.setText(RefactoringMessages.ExtractInterfaceInputPage_Deselect_All); 
			fDeselectAllButton.setEnabled(anyMembersToExtract());
			fDeselectAllButton.setLayoutData(new GridData());
			SWTUtil.setButtonDimensionHint(fDeselectAllButton);
			fDeselectAllButton.addSelectionListener(new SelectionAdapter(){
				public void widgetSelected(SelectionEvent e) {
					fTableViewer.setAllChecked(false);
					ExtractInterfaceInputPage.this.updateUIElementEnablement();
				}
			});
		}

		private boolean anyMembersToExtract() {
			try {
				return getExtractableMembers().length > 0;
			} catch (JavaScriptModelException e) {
				return false;
			}
		}

		private void addReplaceAllCheckbox(Composite result) {
			final ExtractInterfaceProcessor processor= getExtractInterfaceRefactoring().getExtractInterfaceProcessor();
			String title= RefactoringMessages.ExtractInterfaceInputPage_change_references;  
			boolean defaultValue= processor.isReplace();
			fReplaceAllCheckbox= createCheckbox(result,  title, defaultValue);
			processor.setReplace(fReplaceAllCheckbox.getSelection());
			fReplaceAllCheckbox.addSelectionListener(new SelectionAdapter(){
				public void widgetSelected(SelectionEvent e) {
					processor.setReplace(fReplaceAllCheckbox.getSelection());
				}
			});		
		}
		
		private void addDeclareAsPublicCheckbox(Composite result) {
			final ExtractInterfaceProcessor processor= getExtractInterfaceRefactoring().getExtractInterfaceProcessor();
			String[] keys= {RefactoringMessages.ExtractInterfaceWizard_public_label};
			String title= Messages.format(RefactoringMessages.ExtractInterfaceWizard_12, keys); 
			boolean defaultValue= processor.getPublic();
			fDeclarePublicCheckbox= createCheckbox(result,  title, defaultValue);
			processor.setPublic(fDeclarePublicCheckbox.getSelection());
			fDeclarePublicCheckbox.addSelectionListener(new SelectionAdapter(){
				public void widgetSelected(SelectionEvent e) {
					processor.setPublic(fDeclarePublicCheckbox.getSelection());
				}
			});		
		}

		private void addDeclareAsAbstractCheckbox(Composite result) {
			final ExtractInterfaceProcessor processor= getExtractInterfaceRefactoring().getExtractInterfaceProcessor();
			String[] keys= {RefactoringMessages.ExtractInterfaceWizard_abstract_label};
			String title= Messages.format(RefactoringMessages.ExtractInterfaceWizard_12, keys); 
			boolean defaultValue= processor.getAbstract();
			fDeclareAbstractCheckbox= createCheckbox(result,  title, defaultValue);
			processor.setAbstract(fDeclareAbstractCheckbox.getSelection());
			fDeclareAbstractCheckbox.addSelectionListener(new SelectionAdapter(){
				public void widgetSelected(SelectionEvent e) {
					processor.setAbstract(fDeclareAbstractCheckbox.getSelection());
				}
			});		
		}
		
		private static Button createCheckbox(Composite parent, String title, boolean value){
			Button checkBox= new Button(parent, SWT.CHECK);
			checkBox.setText(title);
			checkBox.setSelection(value);
			GridData layoutData= new GridData();
			layoutData.horizontalSpan= 2;

			checkBox.setLayoutData(layoutData);
			return checkBox;		
		}

		/*
		 * @see org.eclipse.wst.jsdt.internal.ui.refactoring.TextInputWizardPage#validateTextField(String)
		 */
		protected RefactoringStatus validateTextField(String text) {
			final ExtractInterfaceProcessor processor= getExtractInterfaceRefactoring().getExtractInterfaceProcessor();
			processor.setTypeName(text);
			return processor.checkTypeName(text);
		}

		private ExtractInterfaceRefactoring getExtractInterfaceRefactoring() {
			return (ExtractInterfaceRefactoring) getRefactoring();
		}
	
		/*
		 * @see org.eclipse.jface.wizard.IWizardPage#getNextPage()
		 */
		public IWizardPage getNextPage() {
			try {
				initializeRefactoring();
				storeDialogSettings();
				return super.getNextPage();
			} catch (JavaScriptModelException e) {
				JavaScriptPlugin.log(e);
				return null;
			}
		}

		/*
		 * @see org.eclipse.wst.jsdt.internal.ui.refactoring.RefactoringWizardPage#performFinish()
		 */
		public boolean performFinish(){
			try {
				initializeRefactoring();
				storeDialogSettings();
				return super.performFinish();
			} catch (JavaScriptModelException e) {
				JavaScriptPlugin.log(e);
				return false;
			}
		}

		private void initializeRefactoring() throws JavaScriptModelException {
			final ExtractInterfaceProcessor processor= getExtractInterfaceRefactoring().getExtractInterfaceProcessor();
			processor.setTypeName(getText());
			processor.setReplace(fReplaceAllCheckbox.getSelection());
			processor.setExtractedMembers(getCheckedMembers());
			processor.setAbstract(fDeclareAbstractCheckbox.getSelection());
			processor.setPublic(fDeclarePublicCheckbox.getSelection());
			processor.setComments(fGenerateCommentsCheckbox.getSelection());
			processor.setInstanceOf(fInstanceofCheckbox.getSelection());
		}
		
		private IMember[] getCheckedMembers() {
			List checked= Arrays.asList(fTableViewer.getCheckedElements());
			return (IMember[]) checked.toArray(new IMember[checked.size()]);
		}

		public void dispose() {
			fInstanceofCheckbox= null;
			fGenerateCommentsCheckbox= null;
			fReplaceAllCheckbox= null;
			fTableViewer= null;
			super.dispose();
		}

		private void initializeCheckboxes() {
			initializeCheckBox(fDeclarePublicCheckbox, SETTING_PUBLIC, true);
			initializeCheckBox(fDeclareAbstractCheckbox, SETTING_ABSTRACT, true);
			initializeCheckBox(fReplaceAllCheckbox, SETTING_REPLACE, true);
			initializeCheckBox(fGenerateCommentsCheckbox, SETTING_COMMENTS, true);
			initializeCheckBox(fInstanceofCheckbox, SETTING_INSTANCEOF, false);
		}

		private void initializeCheckBox(Button checkbox, String property, boolean def) {
			String s= JavaScriptPlugin.getDefault().getDialogSettings().get(property);
			if (s != null)
				checkbox.setSelection(new Boolean(s).booleanValue());
			else
				checkbox.setSelection(def);
		}

		private void storeDialogSettings() {
			final IDialogSettings settings= JavaScriptPlugin.getDefault().getDialogSettings();
			settings.put(SETTING_PUBLIC, fDeclarePublicCheckbox.getSelection());
			settings.put(SETTING_ABSTRACT, fDeclareAbstractCheckbox.getSelection());
			settings.put(SETTING_REPLACE, fReplaceAllCheckbox.getSelection());
			settings.put(SETTING_COMMENTS, fGenerateCommentsCheckbox.getSelection());
			settings.put(SETTING_INSTANCEOF, fInstanceofCheckbox.getSelection());
		}
	}
}
