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
package org.eclipse.wst.jsdt.internal.corext.refactoring.rename;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import org.eclipse.core.resources.IContainer;
import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.Assert;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.OperationCanceledException;
import org.eclipse.core.runtime.SubProgressMonitor;
import org.eclipse.ltk.core.refactoring.GroupCategory;
import org.eclipse.ltk.core.refactoring.GroupCategorySet;
import org.eclipse.text.edits.MalformedTreeException;
import org.eclipse.text.edits.ReplaceEdit;
import org.eclipse.wst.jsdt.core.ICompilationUnit;
import org.eclipse.wst.jsdt.core.IJavaElement;
import org.eclipse.wst.jsdt.core.JavaCore;
import org.eclipse.wst.jsdt.core.JavaModelException;
import org.eclipse.wst.jsdt.core.search.IJavaSearchScope;
import org.eclipse.wst.jsdt.core.search.SearchMatch;
import org.eclipse.wst.jsdt.internal.corext.refactoring.RefactoringCoreMessages;
import org.eclipse.wst.jsdt.internal.corext.refactoring.SearchResultGroup;
import org.eclipse.wst.jsdt.internal.corext.refactoring.changes.TextChangeCompatibility;
import org.eclipse.wst.jsdt.internal.corext.refactoring.rename.RefactoringScanner.TextMatch;
import org.eclipse.wst.jsdt.internal.corext.refactoring.tagging.ITextUpdating;
import org.eclipse.wst.jsdt.internal.corext.refactoring.util.TextChangeManager;

class TextMatchUpdater {
	
	private static final String TEXT_EDIT_LABEL= RefactoringCoreMessages.TextMatchUpdater_update; 
	
	private static final GroupCategorySet TEXTUAL_MATCHES= new GroupCategorySet(
		new GroupCategory("org.eclipse.wst.jsdt.internal.corext.textualMatches", //$NON-NLS-1$
			RefactoringCoreMessages.TextMatchUpdater_textualMatches_name, 
			RefactoringCoreMessages.TextMatchUpdater_textualMatches_description));
	
	private final IJavaSearchScope fScope;
	private final TextChangeManager fManager;
	private final SearchResultGroup[] fReferences;
	private final boolean fOnlyQualified;

	private final RefactoringScanner fScanner;
	private final String fNewName;
	private final int fCurrentNameLength;
	
	private TextMatchUpdater(TextChangeManager manager, IJavaSearchScope scope, String currentName, String currentQualifier, String newName, SearchResultGroup[] references, boolean onlyQualified){
		Assert.isNotNull(manager);
		Assert.isNotNull(scope);
		Assert.isNotNull(references);
		fManager= manager;
		fScope= scope;
		fReferences= references;
		fOnlyQualified= onlyQualified;

		fNewName= newName;
		fCurrentNameLength= currentName.length();
		fScanner= new RefactoringScanner(currentName, currentQualifier);
	}

	static void perform(IProgressMonitor pm, IJavaSearchScope scope, String currentName, String currentQualifier, String newName, TextChangeManager manager, SearchResultGroup[] references, boolean onlyQualified) throws JavaModelException{
		new TextMatchUpdater(manager, scope, currentName, currentQualifier, newName, references, onlyQualified).updateTextMatches(pm);
	}

	static void perform(IProgressMonitor pm, IJavaSearchScope scope, ITextUpdating processor, TextChangeManager manager, SearchResultGroup[] references) throws JavaModelException{
		new TextMatchUpdater(manager, scope, processor.getCurrentElementName(), processor.getCurrentElementQualifier(), processor.getNewElementName(), references, false).updateTextMatches(pm);
	}

	private void updateTextMatches(IProgressMonitor pm) throws JavaModelException {	
		try{
			IProject[] projectsInScope= getProjectsInScope();
			
			pm.beginTask("", projectsInScope.length); //$NON-NLS-1$
			
			for (int i =0 ; i < projectsInScope.length; i++){
				if (pm.isCanceled())
					throw new OperationCanceledException();
				addTextMatches(projectsInScope[i], new SubProgressMonitor(pm, 1));
			}
		} finally{
			pm.done();
		}		
	}

	private IProject[] getProjectsInScope() {
		IPath[] enclosingProjects= fScope.enclosingProjectsAndJars();
		Set enclosingProjectSet= new HashSet();
		enclosingProjectSet.addAll(Arrays.asList(enclosingProjects));
		
		ArrayList projectsInScope= new ArrayList();
		IProject[] projects = ResourcesPlugin.getWorkspace().getRoot().getProjects();
		for (int i =0 ; i < projects.length; i++){
			if (enclosingProjectSet.contains(projects[i].getFullPath()))
				projectsInScope.add(projects[i]);
		}
		
		return (IProject[]) projectsInScope.toArray(new IProject[projectsInScope.size()]);
	}

	private void addTextMatches(IResource resource, IProgressMonitor pm) throws JavaModelException{
		try{
			String task= RefactoringCoreMessages.TextMatchUpdater_searching + resource.getFullPath(); 
			if (resource instanceof IFile){
				IJavaElement element= JavaCore.create(resource);
				// don't start pm task (flickering label updates; finally {pm.done()} is enough)
				if (!(element instanceof ICompilationUnit))
					return;
				if (! element.exists())
					return;
				if (! fScope.encloses(element))
					return;
				addCuTextMatches((ICompilationUnit) element);
				
			} else if (resource instanceof IContainer){
				IResource[] members= ((IContainer) resource).members();
				pm.beginTask(task, members.length); 
				pm.subTask(task);
				for (int i = 0; i < members.length; i++) {
					if (pm.isCanceled())
						throw new OperationCanceledException();
					
					addTextMatches(members[i], new SubProgressMonitor(pm, 1));
				}	
			}
		} catch (JavaModelException e){
			throw e;	
		} catch (CoreException e){
			throw new JavaModelException(e);	
		} finally{
			pm.done();
		}	
	}
	
	private void addCuTextMatches(ICompilationUnit cu) throws JavaModelException{
		fScanner.scan(cu);
		Set matches= fScanner.getMatches(); //Set of TextMatch
		if (matches.size() == 0)
			return;

		removeReferences(cu, matches);
		if (matches.size() != 0)
			addTextUpdates(cu, matches); 
	}
	
	private void removeReferences(ICompilationUnit cu, Set matches) {
		for (int i= 0; i < fReferences.length; i++) {
			SearchResultGroup group= fReferences[i];
			if (cu.equals(group.getCompilationUnit())) {
				removeReferences(matches, group);
			}
		}
	}

	private void removeReferences(Set matches, SearchResultGroup group) {
		SearchMatch[] searchResults= group.getSearchResults();
		for (int r= 0; r < searchResults.length; r++) {
			//int start= searchResults[r].getStart(); // doesn't work for pack.ReferencedType
			int unqualifiedStart= searchResults[r].getOffset() + searchResults[r].getLength() - fCurrentNameLength;
			for (Iterator iter= matches.iterator(); iter.hasNext();) {
				TextMatch element= (TextMatch) iter.next();
				if (element.getStartPosition() == unqualifiedStart)
					iter.remove();
			}
		}
	}

	private void addTextUpdates(ICompilationUnit cu, Set matches) {
		for (Iterator resultIter= matches.iterator(); resultIter.hasNext();){
			TextMatch match= (TextMatch) resultIter.next();
			if (!match.isQualified() && fOnlyQualified)
				continue;
			int matchStart= match.getStartPosition();
			ReplaceEdit edit= new ReplaceEdit(matchStart, fCurrentNameLength, fNewName);
			try {
				TextChangeCompatibility.addTextEdit(fManager.get(cu), TEXT_EDIT_LABEL, edit, TEXTUAL_MATCHES);
			} catch (MalformedTreeException e) {
				// conflicting update -> omit text match
			}
		}
	}
}
