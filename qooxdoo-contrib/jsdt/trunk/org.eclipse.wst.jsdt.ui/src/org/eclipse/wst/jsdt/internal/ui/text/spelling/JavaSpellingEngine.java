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

package org.eclipse.wst.jsdt.internal.ui.text.spelling;

import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.jface.text.BadLocationException;
import org.eclipse.jface.text.IDocument;
import org.eclipse.jface.text.IRegion;
import org.eclipse.jface.text.ITypedRegion;
import org.eclipse.jface.text.TextUtilities;
import org.eclipse.ui.texteditor.spelling.ISpellingProblemCollector;
import org.eclipse.wst.jsdt.internal.ui.JavaScriptPlugin;
import org.eclipse.wst.jsdt.internal.ui.text.spelling.engine.ISpellChecker;
import org.eclipse.wst.jsdt.internal.ui.text.spelling.engine.ISpellEventListener;
import org.eclipse.wst.jsdt.ui.PreferenceConstants;
import org.eclipse.wst.jsdt.ui.text.IJavaScriptPartitions;

/**
 * Java spelling engine
 *
 * @since 3.1
 */
public class JavaSpellingEngine extends SpellingEngine {
	
	/*
	 * XXX: To be made public in 3.4,
	 * see https://bugs.eclipse.org/bugs/show_bug.cgi?id=186117
	 */
	public static final String SPELLING_IGNORE_JAVA_STRINGS= "spelling_ignore_java_stringsr"; //$NON-NLS-1$;

	/*
	 * @see org.eclipse.wst.jsdt.internal.ui.text.spelling.SpellingEngine#check(org.eclipse.jface.text.IDocument, org.eclipse.jface.text.IRegion[], org.eclipse.wst.jsdt.internal.ui.text.spelling.engine.ISpellChecker, org.eclipse.ui.texteditor.spelling.ISpellingProblemCollector, org.eclipse.core.runtime.IProgressMonitor)
	 */
	protected void check(IDocument document, IRegion[] regions, ISpellChecker checker, ISpellingProblemCollector collector, IProgressMonitor monitor) {
		ISpellEventListener listener= new SpellEventListener(collector, document);
		boolean isIgnoringJavaStrings= PreferenceConstants.getPreferenceStore().getBoolean(SPELLING_IGNORE_JAVA_STRINGS);
		try {
			checker.addListener(listener);
			try {
				for (int i= 0; i < regions.length; i++) {
					IRegion region= regions[i];
					ITypedRegion[] partitions= TextUtilities.computePartitioning(document, IJavaScriptPartitions.JAVA_PARTITIONING, region.getOffset(), region.getLength(), false);
					for (int index= 0; index < partitions.length; index++) {
						if (monitor != null && monitor.isCanceled())
							return;

						ITypedRegion partition= partitions[index];
						final String type= partition.getType();
						
						if (isIgnoringJavaStrings && type.equals(IJavaScriptPartitions.JAVA_STRING))
							continue;
						
						if (!type.equals(IDocument.DEFAULT_CONTENT_TYPE) && !type.equals(IJavaScriptPartitions.JAVA_CHARACTER))
							checker.execute(new SpellCheckIterator(document, partition, checker.getLocale()));
					}
				}
			} catch (BadLocationException x) {
				JavaScriptPlugin.log(x);
			}
		} finally {
			checker.removeListener(listener);
		}
	}
}
