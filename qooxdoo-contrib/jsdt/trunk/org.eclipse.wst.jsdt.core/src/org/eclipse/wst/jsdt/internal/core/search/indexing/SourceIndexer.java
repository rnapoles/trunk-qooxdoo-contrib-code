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
package org.eclipse.wst.jsdt.internal.core.search.indexing;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.Path;
import org.eclipse.wst.jsdt.core.JavaCore;
import org.eclipse.wst.jsdt.core.search.SearchDocument;
import org.eclipse.wst.jsdt.internal.compiler.SourceElementParser;
import org.eclipse.wst.jsdt.internal.compiler.util.SuffixConstants;
import org.eclipse.wst.jsdt.internal.core.BasicCompilationUnit;
import org.eclipse.wst.jsdt.internal.core.JavaModelManager;
import org.eclipse.wst.jsdt.internal.core.search.JavaSearchDocument;
import org.eclipse.wst.jsdt.internal.core.search.processing.JobManager;

/**
 * A SourceIndexer indexes java files using a java parser. The following items are indexed:
 * Declarations of:
 * - Classes<br>
 * - Interfaces; <br>
 * - Methods;<br>
 * - Fields;<br>
 * References to:
 * - Methods (with number of arguments); <br>
 * - Fields;<br>
 * - Types;<br>
 * - Constructors.
 */
public class SourceIndexer extends AbstractIndexer implements SuffixConstants {

	public SourceIndexer(SearchDocument document) {
		super(document);
	}
	public void indexDocument() {
		// Create a new Parser
		SourceIndexerRequestor requestor = new SourceIndexerRequestor(this);
		String documentPath = this.document.getPath();
		SourceElementParser parser = ((InternalSearchDocument) this.document).parser;
		if (parser == null) {
			IPath path = new Path(documentPath);
			IProject project = ResourcesPlugin.getWorkspace().getRoot().getProject(path.segment(0));
			parser = JavaModelManager.getJavaModelManager().indexManager.getSourceElementParser(JavaCore.create(project), requestor);
		} else {
			parser.requestor = requestor;
		}

		// Launch the parser
		char[] source = null;
		char[] name = null;
		try {
			source = document.getCharContents();
			name = documentPath.toCharArray();
		} catch(Exception e){
			// ignore
		}
		if (source == null || name == null) return; // could not retrieve document info (e.g. resource was discarded)
		String pkgName=((JavaSearchDocument)document).getPackageName();
		char [][]packageName=null;
		if (pkgName!=null)
		{
			packageName=new char[1][];
			packageName[0]=pkgName.toCharArray();
		}
		BasicCompilationUnit compilationUnit = new BasicCompilationUnit(source, packageName, new String(name));
		try {
			parser.parseCompilationUnit(compilationUnit, true/*full parse*/);
		} catch (Exception e) {
			if (JobManager.VERBOSE) {
				e.printStackTrace();
			}
		}
	}
}
