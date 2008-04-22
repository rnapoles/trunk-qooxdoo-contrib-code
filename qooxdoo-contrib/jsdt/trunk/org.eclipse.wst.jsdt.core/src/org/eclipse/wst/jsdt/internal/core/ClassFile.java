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

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import org.eclipse.core.resources.IContainer;
import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IWorkspace;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.Path;
import org.eclipse.wst.jsdt.core.JsGlobalScopeContainerInitializer;
import org.eclipse.wst.jsdt.core.CompletionRequestor;
import org.eclipse.wst.jsdt.core.IBuffer;
import org.eclipse.wst.jsdt.core.IClassFile;
import org.eclipse.wst.jsdt.core.ICompilationUnit;
import org.eclipse.wst.jsdt.core.ICompletionRequestor;
import org.eclipse.wst.jsdt.core.IField;
import org.eclipse.wst.jsdt.core.IJavaElement;
import org.eclipse.wst.jsdt.core.IJavaModelStatus;
import org.eclipse.wst.jsdt.core.IJavaModelStatusConstants;
import org.eclipse.wst.jsdt.core.IJavaProject;
import org.eclipse.wst.jsdt.core.IMethod;
import org.eclipse.wst.jsdt.core.IPackageFragment;
import org.eclipse.wst.jsdt.core.IPackageFragmentRoot;
import org.eclipse.wst.jsdt.core.IParent;
import org.eclipse.wst.jsdt.core.IProblemRequestor;
import org.eclipse.wst.jsdt.core.ISourceRange;
import org.eclipse.wst.jsdt.core.IType;
import org.eclipse.wst.jsdt.core.ITypeRoot;
import org.eclipse.wst.jsdt.core.JavaConventions;
import org.eclipse.wst.jsdt.core.JavaCore;
import org.eclipse.wst.jsdt.core.JavaModelException;
import org.eclipse.wst.jsdt.core.LibrarySuperType;
import org.eclipse.wst.jsdt.core.WorkingCopyOwner;
import org.eclipse.wst.jsdt.core.compiler.IProblem;
import org.eclipse.wst.jsdt.internal.compiler.IProblemFactory;
import org.eclipse.wst.jsdt.internal.compiler.SourceElementParser;
import org.eclipse.wst.jsdt.internal.compiler.ast.CompilationUnitDeclaration;
import org.eclipse.wst.jsdt.internal.compiler.env.IBinaryType;
import org.eclipse.wst.jsdt.internal.compiler.impl.CompilerOptions;
import org.eclipse.wst.jsdt.internal.compiler.problem.DefaultProblemFactory;
import org.eclipse.wst.jsdt.internal.compiler.util.SuffixConstants;
import org.eclipse.wst.jsdt.internal.core.util.MementoTokenizer;
import org.eclipse.wst.jsdt.internal.core.util.Util;

/**
 * @see IClassFile
 */

public class ClassFile extends Openable implements IClassFile, SuffixConstants, org.eclipse.wst.jsdt.internal.compiler.env.ICompilationUnit, IVirtualParent {

	protected String name;
	protected IPath filePath;
	protected BinaryType binaryType = null;
	private static final IField[] NO_FIELDS = new IField[0];
	private static final IMethod[] NO_METHODS = new IMethod[0];

/*
 * Creates a handle to a class file.
 */
protected ClassFile(PackageFragment parent, String path) {
	super(parent);
	this.filePath = Path.fromOSString(path);
	if (filePath.getFileExtension()!=null)
	{
		String lastSegment = filePath.lastSegment();
		this.name=lastSegment.substring(0,lastSegment.length()-(filePath.getFileExtension().length()+1));
	}
	else
		this.name=path;
}

/*
 * @see IClassFile#becomeWorkingCopy(IProblemRequestor, WorkingCopyOwner, IProgressMonitor)
 */
public ICompilationUnit becomeWorkingCopy(IProblemRequestor problemRequestor, WorkingCopyOwner owner, IProgressMonitor monitor) throws JavaModelException {
	JavaModelManager manager = JavaModelManager.getJavaModelManager();
	CompilationUnit workingCopy = new ClassFileWorkingCopy(this, owner == null ? DefaultWorkingCopyOwner.PRIMARY : owner);
	JavaModelManager.PerWorkingCopyInfo perWorkingCopyInfo = manager.getPerWorkingCopyInfo(workingCopy, false/*don't create*/, true /*record usage*/, null/*no problem requestor needed*/);
	if (perWorkingCopyInfo == null) {
		// close cu and its children
		close();

		BecomeWorkingCopyOperation operation = new BecomeWorkingCopyOperation(workingCopy, problemRequestor);
		operation.runOperation(monitor);

		return workingCopy;
	}
	return perWorkingCopyInfo.workingCopy;
}



/**
 * Creates the children elements for this class file adding the resulting
 * new handles and info objects to the newElements table. Returns true
 * if successful, or false if an error is encountered parsing the class file.
 *
 * @see Openable
 * @see org.eclipse.wst.jsdt.core.Signature
 */
protected boolean buildStructure(OpenableElementInfo info, IProgressMonitor pm, Map newElements, IResource underlyingResource) throws JavaModelException {
	// check whether the class file can be opened
	IStatus status = validateClassFile();
	if (!status.isOK()) throw newJavaModelException(status);
	if (underlyingResource != null && !underlyingResource.isAccessible()) {
		throw newNotPresentException();
	}



	CompilationUnitElementInfo unitInfo = new CompilationUnitElementInfo();

	// get buffer contents

	// generate structure and compute syntax problems if needed
	CompilationUnitStructureRequestor requestor = new CompilationUnitStructureRequestor(this, unitInfo, newElements);
	IJavaProject project = getJavaProject();

	boolean createAST;
	boolean resolveBindings;
	int reconcileFlags;
//	HashMap problems;
	if (info instanceof ASTHolderCUInfo) {
		ASTHolderCUInfo astHolder = (ASTHolderCUInfo) info;
		createAST = astHolder.astLevel != ICompilationUnit.NO_AST;
		resolveBindings = astHolder.resolveBindings;
		reconcileFlags = astHolder.reconcileFlags;
//		problems = astHolder.problems;
	} else {
		createAST = false;
		resolveBindings = false;
		reconcileFlags = 0;
//		problems = null;
	}

	boolean computeProblems = false;//perWorkingCopyInfo != null && perWorkingCopyInfo.isActive() && project != null && JavaProject.hasJavaNature(project.getProject());
	IProblemFactory problemFactory = new DefaultProblemFactory();
	Map options = project == null ? JavaCore.getOptions() : project.getOptions(true);
	if (!computeProblems) {
		// disable task tags checking to speed up parsing
		options.put(JavaCore.COMPILER_TASK_TAGS, ""); //$NON-NLS-1$
	}
	SourceElementParser parser = new SourceElementParser(
		requestor,
		problemFactory,
		new CompilerOptions(options),
		true/*report local declarations*/,
		!createAST /*optimize string literals only if not creating a DOM AST*/);
	parser.reportOnlyOneSyntaxError = !computeProblems;
	parser.setStatementsRecovery((reconcileFlags & ICompilationUnit.ENABLE_STATEMENTS_RECOVERY) != 0);

//	if (!computeProblems && !resolveBindings && !createAST) // disable javadoc parsing if not computing problems, not resolving and not creating ast
//		parser.javadocParser.checkDocComment = false;
	requestor.parser = parser;
	CompilationUnitDeclaration unit =
		parser.parseCompilationUnit(
			this,
		true /*full parse to find local elements*/);

	// update timestamp (might be IResource.NULL_STAMP if original does not exist)
	if (underlyingResource == null) {
		underlyingResource = getResource();
	}
	// underlying resource is null in the case of a working copy on a class file in a jar
	if (underlyingResource != null)
		unitInfo.timestamp = ((IFile)underlyingResource).getModificationStamp();

	// compute other problems if needed
//	CompilationUnitDeclaration compilationUnitDeclaration = null;
	info.setChildren(unitInfo.children);
	try {

		if (createAST) {
//			int astLevel = ((ASTHolderCUInfo) info).astLevel;
//			org.eclipse.wst.jsdt.core.dom.CompilationUnit cu = AST.convertCompilationUnit(astLevel, unit, contents, options, computeProblems, this, pm);
//			((ASTHolderCUInfo) info).ast = cu;
			throw new RuntimeException("Implement this"); //$NON-NLS-1$
		}
	} finally {
	    if (unit != null) {
	        unit.cleanUp();
	    }
	}




//	IBinaryType typeInfo = getBinaryTypeInfo((IFile) underlyingResource);
//	if (typeInfo == null) {
//		// The structure of a class file is unknown if a class file format errors occurred
//		//during the creation of the diet class file representative of this ClassFile.
//		info.setChildren(new IJavaElement[] {});
//		return false;
//	}
//
//	// Make the type
//	IType type = getType();
//	info.setChildren(new IJavaElement[] {type});
//	newElements.put(type, typeInfo);
//	// Read children
//	((ClassFileInfo) info).readBinaryChildren(this, (HashMap) newElements, typeInfo);
	return true;
}
/**
 * @see org.eclipse.wst.jsdt.core.ICodeAssist#codeComplete(int, ICompletionRequestor)
 * @deprecated
 */
public void codeComplete(int offset, ICompletionRequestor requestor) throws JavaModelException {
	codeComplete(offset, requestor, DefaultWorkingCopyOwner.PRIMARY);
}
/**
 * @see org.eclipse.wst.jsdt.core.ICodeAssist#codeComplete(int, ICompletionRequestor, WorkingCopyOwner)
 * @deprecated
 */
public void codeComplete(int offset, ICompletionRequestor requestor, WorkingCopyOwner owner) throws JavaModelException {
	if (requestor == null) {
		throw new IllegalArgumentException("Completion requestor cannot be null"); //$NON-NLS-1$
	}
	codeComplete(offset, new org.eclipse.wst.jsdt.internal.codeassist.CompletionRequestorWrapper(requestor), owner);
}

/* (non-Javadoc)
 * @see org.eclipse.wst.jsdt.core.ICodeAssist#codeComplete(int, org.eclipse.wst.jsdt.core.CompletionRequestor)
 */
public void codeComplete(int offset, CompletionRequestor requestor) throws JavaModelException {
	codeComplete(offset, requestor, DefaultWorkingCopyOwner.PRIMARY);
}

/* (non-Javadoc)
 * @see org.eclipse.wst.jsdt.core.ICodeAssist#codeComplete(int, org.eclipse.wst.jsdt.core.CompletionRequestor, org.eclipse.wst.jsdt.core.WorkingCopyOwner)
 */
public void codeComplete(int offset, CompletionRequestor requestor, WorkingCopyOwner owner) throws JavaModelException {
	String source = getSource();
	if (source != null) {
		BinaryType type = (BinaryType) getType();
		BasicCompilationUnit cu =
			new BasicCompilationUnit(
				getSource().toCharArray(),
				null,
				type.sourceFileName((IBinaryType) type.getElementInfo()),
				getJavaProject()); // use project to retrieve corresponding .js IFile
		codeComplete(cu, cu, offset, requestor, owner);
	}
}

/**
 * @see org.eclipse.wst.jsdt.core.ICodeAssist#codeSelect(int, int)
 */
public IJavaElement[] codeSelect(int offset, int length) throws JavaModelException {
	return codeSelect(offset, length, DefaultWorkingCopyOwner.PRIMARY);
}
/**
 * @see org.eclipse.wst.jsdt.core.ICodeAssist#codeSelect(int, int, WorkingCopyOwner)
 */
public IJavaElement[] codeSelect(int offset, int length, WorkingCopyOwner owner) throws JavaModelException {
	IBuffer buffer = getBuffer();
	char[] contents;
	if (buffer != null && (contents = buffer.getCharacters()) != null) {
		//	    BinaryType type = (BinaryType) getType();
//		BasicCompilationUnit cu = new BasicCompilationUnit(contents, null, type.sourceFileName((IBinaryType) type.getElementInfo()));
		PackageFragment packageFragment =(PackageFragment)getParent();
		String[] names = packageFragment.names;
		char [][] pkgNames=new char[names.length][];
		for (int i = 0; i < names.length; i++) {
			pkgNames[i]=names[i].toCharArray();
		}
		BasicCompilationUnit cu = new BasicCompilationUnit(contents, pkgNames, filePath.toOSString());
		return super.codeSelect(cu, offset, length, owner);
	} else {
		//has no associated souce
		return new IJavaElement[] {};
	}
}
/**
 * Returns a new element info for this element.
 */
protected Object createElementInfo() {
	return new ClassFileInfo();
}
public boolean equals(Object o) {
	if (!(o instanceof ClassFile)) return false;
	ClassFile other = (ClassFile) o;
	return this.name.equals(other.name) && this.parent.equals(other.parent);
}
public boolean exists() {
	return super.exists() && validateClassFile().isOK();
}

/**
 * Finds the deepest <code>IJavaElement</code> in the hierarchy of
 * <code>elt</elt>'s children (including <code>elt</code> itself)
 * which has a source range that encloses <code>position</code>
 * according to <code>mapper</code>.
 */
protected IJavaElement findElement(IJavaElement elt, int position, SourceMapper mapper) {
	SourceRange range = mapper.getSourceRange(elt);
	if (range == null || position < range.getOffset() || range.getOffset() + range.getLength() - 1 < position) {
		return null;
	}
	if (elt instanceof IParent) {
		try {
			IJavaElement[] children = ((IParent) elt).getChildren();
			for (int i = 0; i < children.length; i++) {
				IJavaElement match = findElement(children[i], position, mapper);
				if (match != null) {
					return match;
				}
			}
		} catch (JavaModelException npe) {
			// elt doesn't exist: return the element
		}
	}
	return elt;
}
/**
 * @see ITypeRoot#findPrimaryType()
 */
public IType findPrimaryType() {
	IType primaryType= getType();
	if (primaryType.exists()) {
		return primaryType;
	}
	return null;
}
public String getAttachedJavadoc(IProgressMonitor monitor) throws JavaModelException {
	return this.getType().getAttachedJavadoc(monitor);
}


public byte[] getBytes() throws JavaModelException {
	JavaElement pkg = (JavaElement) getParent();
	if (pkg instanceof JarPackageFragment) {
		JarPackageFragmentRoot root = (JarPackageFragmentRoot) pkg.getParent();
		ZipFile zip = null;
		try {
			zip = root.getJar();
			String entryName = Util.concatWith(((PackageFragment) pkg).names, getElementName(), '/');
			ZipEntry ze = zip.getEntry(entryName);
			if (ze != null) {
				return org.eclipse.wst.jsdt.internal.compiler.util.Util.getZipEntryByteContent(ze, zip);
			}
			throw new JavaModelException(new JavaModelStatus(IJavaModelStatusConstants.ELEMENT_DOES_NOT_EXIST, this));
		} catch (IOException ioe) {
			throw new JavaModelException(ioe, IJavaModelStatusConstants.IO_EXCEPTION);
		} catch (CoreException e) {
			if (e instanceof JavaModelException) {
				throw (JavaModelException)e;
			} else {
				throw new JavaModelException(e);
			}
		} finally {
			JavaModelManager.getJavaModelManager().closeZipFile(zip);
		}
	} else {
		IFile file = (IFile) getResource();
		return Util.getResourceContentsAsByteArray(file);
	}
}
public IBuffer getBuffer() throws JavaModelException {
	IStatus status = validateClassFile();
	if (status.isOK()) {
		return super.getBuffer();
	} else {
		throw new JavaModelException((IJavaModelStatus) status);
	}
}
/**
 * @see org.eclipse.wst.jsdt.core.IMember
 */
public IClassFile getClassFile() {
	return this;
}
/**
 * @see org.eclipse.wst.jsdt.core.IMember#getTypeRoot()
 */
public ITypeRoot getTypeRoot() {
	return this;
}
/**
 * A class file has a corresponding resource unless it is contained
 * in a jar.
 *
 * @see IJavaElement
 */
public IResource getCorrespondingResource() throws JavaModelException {
	IPackageFragmentRoot root= (IPackageFragmentRoot)getParent().getParent();
	if (root.isArchive()) {
		return null;
	} else {
		return getUnderlyingResource();
	}
}
/**
 * @see IClassFile
 */
public IJavaElement getElementAt(int position) throws JavaModelException {
	IJavaElement parentElement = getParent();
	while (parentElement.getElementType() != IJavaElement.PACKAGE_FRAGMENT_ROOT) {
		parentElement = parentElement.getParent();
	}
	PackageFragmentRoot root = (PackageFragmentRoot) parentElement;
	SourceMapper mapper = root.getSourceMapper();
	if (mapper == null) {
		return null;
	} else {
		// ensure this class file's buffer is open so that source ranges are computed
		getBuffer();

//		IType type = getType();
		return findElement(this, position, mapper);
	}
}
public IJavaElement getElementAtConsideringSibling(int position) throws JavaModelException {
	IPackageFragment fragment = (IPackageFragment)getParent();
	PackageFragmentRoot root = (PackageFragmentRoot) fragment.getAncestor(IJavaElement.PACKAGE_FRAGMENT_ROOT);
	SourceMapper mapper = root.getSourceMapper();
	if (mapper == null) {
		return null;
	} else {
		int index = this.name.indexOf('$');
		int prefixLength = index < 0 ? this.name.length() : index;

		IType type = null;
		int start = -1;
		int end = Integer.MAX_VALUE;
		IJavaElement[] children = fragment.getChildren();
		for (int i = 0; i < children.length; i++) {
			String childName = children[i].getElementName();

			int childIndex = childName.indexOf('$');
			int childPrefixLength = childIndex < 0 ? childName.indexOf('.') : childIndex;
			if (prefixLength == childPrefixLength && this.name.regionMatches(0, childName, 0, prefixLength)) {
				IClassFile classFile = (IClassFile) children[i];

				// ensure this class file's buffer is open so that source ranges are computed
				classFile.getBuffer();

				SourceRange range = mapper.getSourceRange(classFile.getType());
				if (range == SourceMapper.UNKNOWN_RANGE) continue;
				int newStart = range.offset;
				int newEnd = newStart + range.length - 1;
				if(newStart > start && newEnd < end
						&& newStart <= position && newEnd >= position) {
					type = classFile.getType();
					start = newStart;
					end = newEnd;
				}
			}
		}
		if(type != null) {
			return findElement(type, position, mapper);
		}
		return null;
	}
}
public String getElementName() {
	/* check if the name already has the .js extension */
	if(this.name!=null && this.name.toUpperCase().endsWith(SuffixConstants.SUFFIX_STRING_java.toUpperCase())){
		return this.name;
	}
	
	return this.name + SuffixConstants.SUFFIX_STRING_java;
}
/**
 * @see IJavaElement
 */
public int getElementType() {
	return CLASS_FILE;
}
/*
 * @see JavaElement
 */
public IJavaElement getHandleFromMemento(String token, MementoTokenizer memento, WorkingCopyOwner owner) {
	switch (token.charAt(0)) {
		case JEM_TYPE:
			if (!memento.hasMoreTokens()) return this;
			String typeName = memento.nextToken();
			JavaElement type = new BinaryType(this, typeName);
			return type.getHandleFromMemento(memento, owner);
	}
	return null;
}
/**
 * @see JavaElement#getHandleMemento()
 */
protected char getHandleMementoDelimiter() {
	return JavaElement.JEM_CLASSFILE;
}

protected void getHandleMemento(StringBuffer buff) {
	((JavaElement)getParent()).getHandleMemento(buff);
	buff.append(getHandleMementoDelimiter());
	escapeMementoName(buff, getPath().toPortableString());
}
/*
 * @see IJavaElement
 */

protected boolean resourceExists() {
	IWorkspace workspace = ResourcesPlugin.getWorkspace();
	if (workspace == null) return false; // workaround for http://bugs.eclipse.org/bugs/show_bug.cgi?id=34069
	Object me = JavaModel.getTarget(workspace.getRoot(), this.getPath(), true) ;
	if(me!=null) return true;
	me = JavaModel.getTarget(workspace.getRoot(), this.getPath().makeRelative(), true);
	return (me!=null);

}
public IPath getPath() {
	PackageFragmentRoot root = getPackageFragmentRoot();
	if (root.isArchive() || (root instanceof LibraryFragmentRoot && root.getPath().lastSegment().equalsIgnoreCase(getElementName()))) {
		return root.getPath();
	} else {
		return getParent().getPath().append(getElementName());
	}
}
/*
 * @see IJavaElement
 */
public IResource getResource() {
	PackageFragmentRoot root = this.getPackageFragmentRoot();
	if (!root.isResourceContainer()) {
		return root.getResource();
	} else {
		return ((IContainer)this.getParent().getResource()).getFile(new Path(this.getElementName()));
	}
}
/**
 * @see org.eclipse.wst.jsdt.core.ISourceReference
 */
public String getSource() throws JavaModelException {
	IBuffer buffer = getBuffer();
	if (buffer == null) {
		return null;
	}
	return buffer.getContents();
}
/**
 * @see org.eclipse.wst.jsdt.core.ISourceReference
 */
public ISourceRange getSourceRange() throws JavaModelException {
	IBuffer buffer = getBuffer();
	if (buffer != null) {
		String contents = buffer.getContents();
		if (contents == null) return null;
		return new SourceRange(0, contents.length());
	} else {
		return null;
	}
}
/*
 * Returns the name of the toplevel type of this class file.
 */
public String getTopLevelTypeName() {
    String topLevelTypeName = getElementName();
    int firstDollar = topLevelTypeName.indexOf('$');
    if (firstDollar != -1) {
        topLevelTypeName = topLevelTypeName.substring(0, firstDollar);
    } else {
        topLevelTypeName = topLevelTypeName.substring(0, topLevelTypeName.length()-SUFFIX_JAVA.length);
    }
    return topLevelTypeName;
}
/**
 * @see IClassFile
 */
public IType getType() {
	if (this.binaryType == null) {
		this.binaryType = new BinaryType(this, getTypeName());
	}
	return this.binaryType;
}
public String getTypeName() {
	// Internal class file name doesn't contain ".class" file extension
	int lastDollar = this.name.lastIndexOf('$');
	return lastDollar > -1 ? Util.localTypeName(this.name, lastDollar, this.name.length()) : this.name;
}
/*
 * @see IClassFile
 */
public ICompilationUnit getWorkingCopy(WorkingCopyOwner owner, IProgressMonitor monitor) throws JavaModelException {
	CompilationUnit workingCopy = new ClassFileWorkingCopy(this, owner == null ? DefaultWorkingCopyOwner.PRIMARY : owner);
	JavaModelManager manager = JavaModelManager.getJavaModelManager();
	JavaModelManager.PerWorkingCopyInfo perWorkingCopyInfo =
		manager.getPerWorkingCopyInfo(workingCopy, false/*don't create*/, true/*record usage*/, null/*not used since don't create*/);
	if (perWorkingCopyInfo != null) {
		return perWorkingCopyInfo.getWorkingCopy(); // return existing handle instead of the one created above
	}
	BecomeWorkingCopyOperation op = new BecomeWorkingCopyOperation(workingCopy, null);
	op.runOperation(monitor);
	return workingCopy;
}
/**
 * @see IClassFile
 * @deprecated
 */
public IJavaElement getWorkingCopy(IProgressMonitor monitor, org.eclipse.wst.jsdt.core.IBufferFactory factory) throws JavaModelException {
	return getWorkingCopy(BufferFactoryWrapper.create(factory), monitor);
}
/**
 * @see Openable
 */
protected boolean hasBuffer() {
	return true;
}
public int hashCode() {
	return Util.combineHashCodes(this.name.hashCode(), this.parent.hashCode());
}
/**
 * @see IClassFile
 */
public boolean isClass() throws JavaModelException {
	return getType().isClass();
}
/**
 * @see IClassFile
 */
public boolean isInterface() throws JavaModelException {
	return getType().isInterface();
}
/**
 * Returns true - class files are always read only.
 */
public boolean isReadOnly() {
	return true;
}
private IStatus validateClassFile() {
	IPackageFragmentRoot root = getPackageFragmentRoot();
	try {
		if (root.getKind() != IPackageFragmentRoot.K_BINARY)
			return new JavaModelStatus(IJavaModelStatusConstants.INVALID_ELEMENT_TYPES, root);
	} catch (JavaModelException e) {
		return e.getJavaModelStatus();
	}
	IJavaProject project = getJavaProject();
	return JavaConventions.validateClassFileName(getElementName(), project.getOption(JavaCore.COMPILER_SOURCE, true), project.getOption(JavaCore.COMPILER_COMPLIANCE, true));
}
/**
 * Opens and returns buffer on the source code associated with this class file.
 * Maps the source code to the children elements of this class file.
 * If no source code is associated with this class file,
 * <code>null</code> is returned.
 *
 * @see Openable
 */
protected IBuffer openBuffer(IProgressMonitor pm, Object info) throws JavaModelException {
	SourceMapper mapper = getSourceMapper();
	if (mapper != null) {
		return mapSource(mapper, info instanceof IBinaryType ? (IBinaryType) info : null);
	}
	return null;
}
private IBuffer mapSource(SourceMapper mapper, IBinaryType info) {
	char[] contents =null;
	try {
		contents=org.eclipse.wst.jsdt.internal.compiler.util.Util.getFileCharContent(new File(filePath.toOSString()),null);
	} catch (IOException ex){}
	//mapper.findSource(getType(), info);
	if (contents != null) {
		// create buffer
		IBuffer buffer = BufferManager.createBuffer(this);
		if (buffer == null) return null;
		BufferManager bufManager = getBufferManager();
		bufManager.addBuffer(buffer);

		// set the buffer source
		if (buffer.getCharacters() == null){
			buffer.setContents(contents);
		}

		// listen to buffer changes
		buffer.addBufferChangedListener(this);

		// do the source mapping
//		mapper.mapSource(getType(), contents, info);

		return buffer;
	} else {
		// create buffer
		IBuffer buffer = BufferManager.createNullBuffer(this);
		if (buffer == null) return null;
		BufferManager bufManager = getBufferManager();
		bufManager.addBuffer(buffer);

		// listen to buffer changes
		buffer.addBufferChangedListener(this);
		return buffer;
	}
}
/* package */ static String simpleName(char[] className) {
	if (className == null)
		return null;
	String simpleName = new String(unqualifiedName(className));
	int lastDollar = simpleName.lastIndexOf('$');
	if (lastDollar != -1)
		return Util.localTypeName(simpleName, lastDollar, simpleName.length());
	else
		return simpleName;
}
/**
 * Returns the Java Model representation of the given name
 * which is provided in diet class file format, or <code>null</code>
 * if the given name is <code>null</code>.
 *
 * <p><code>ClassFileReader</code> format is similar to "java/lang/Object",
 * and corresponding Java Model format is "java.lang.Object".
 */

public static char[] translatedName(char[] name) {
	if (name == null)
		return null;
	int nameLength = name.length;
	char[] newName= new char[nameLength];
	for (int i= 0; i < nameLength; i++) {
		if (name[i] == '/') {
			newName[i]= '.';
		} else {
			newName[i]= name[i];
		}
	}
	return newName;
}
/**
 * Returns the Java Model representation of the given names
 * which are provided in diet class file format, or <code>null</code>
 * if the given names are <code>null</code>.
 *
 * <p><code>ClassFileReader</code> format is similar to "java/lang/Object",
 * and corresponding Java Model format is "java.lang.Object".
 */

/* package */ static char[][] translatedNames(char[][] names) {
	if (names == null)
		return null;
	int length = names.length;
	char[][] newNames = new char[length][];
	for(int i = 0; i < length; i++) {
		newNames[i] = translatedName(names[i]);
	}
	return newNames;
}
/**
 * Returns the Java Model format of the unqualified class name for the
 * given className which is provided in diet class file format,
 * or <code>null</code> if the given className is <code>null</code>.
 * (This removes the package name, but not enclosing type names).
 *
 * <p><code>ClassFileReader</code> format is similar to "java/lang/Object",
 * and corresponding Java Model simple name format is "Object".
 */

/* package */ static char[] unqualifiedName(char[] className) {
	if (className == null)
		return null;
	int count = 0;
	for (int i = className.length - 1; i > -1; i--) {
		if (className[i] == '/') {
			char[] name = new char[count];
			System.arraycopy(className, i + 1, name, 0, count);
			return name;
		}
		count++;
	}
	return className;
}

/**
 * @see org.eclipse.wst.jsdt.core.ICodeAssist#codeComplete(int, org.eclipse.wst.jsdt.core.ICodeCompletionRequestor)
 * @deprecated - should use codeComplete(int, ICompletionRequestor) instead
 */
public void codeComplete(int offset, final org.eclipse.wst.jsdt.core.ICodeCompletionRequestor requestor) throws JavaModelException {

	if (requestor == null){
		codeComplete(offset, (ICompletionRequestor)null);
		return;
	}
	codeComplete(
		offset,
		new ICompletionRequestor(){
			public void acceptAnonymousType(char[] superTypePackageName,char[] superTypeName, char[][] parameterPackageNames,char[][] parameterTypeNames,char[][] parameterNames,char[] completionName,int modifiers,int completionStart,int completionEnd, int relevance) {
				// ignore
			}
			public void acceptClass(char[] packageName, char[] className, char[] completionName, int modifiers, int completionStart, int completionEnd, int relevance) {
				requestor.acceptClass(packageName, className, completionName, modifiers, completionStart, completionEnd);
			}
			public void acceptError(IProblem error) {
				// was disabled in 1.0
			}
			public void acceptField(char[] declaringTypePackageName, char[] declaringTypeName, char[] fieldName, char[] typePackageName, char[] typeName, char[] completionName, int modifiers, int completionStart, int completionEnd, int relevance) {
				requestor.acceptField(declaringTypePackageName, declaringTypeName, fieldName, typePackageName, typeName, completionName, modifiers, completionStart, completionEnd);
			}
			public void acceptInterface(char[] packageName,char[] interfaceName,char[] completionName,int modifiers,int completionStart,int completionEnd, int relevance) {
				requestor.acceptInterface(packageName, interfaceName, completionName, modifiers, completionStart, completionEnd);
			}
			public void acceptKeyword(char[] keywordName,int completionStart,int completionEnd, int relevance){
				requestor.acceptKeyword(keywordName, completionStart, completionEnd);
			}
			public void acceptLabel(char[] labelName,int completionStart,int completionEnd, int relevance){
				requestor.acceptLabel(labelName, completionStart, completionEnd);
			}
			public void acceptLocalVariable(char[] localVarName,char[] typePackageName,char[] typeName,int modifiers,int completionStart,int completionEnd, int relevance){
				// ignore
			}
			public void acceptMethod(char[] declaringTypePackageName,char[] declaringTypeName,char[] selector,char[][] parameterPackageNames,char[][] parameterTypeNames,char[][] parameterNames,char[] returnTypePackageName,char[] returnTypeName,char[] completionName,int modifiers,int completionStart,int completionEnd, int relevance){
				// skip parameter names
				requestor.acceptMethod(declaringTypePackageName, declaringTypeName, selector, parameterPackageNames, parameterTypeNames, returnTypePackageName, returnTypeName, completionName, modifiers, completionStart, completionEnd);
			}
			public void acceptMethodDeclaration(char[] declaringTypePackageName,char[] declaringTypeName,char[] selector,char[][] parameterPackageNames,char[][] parameterTypeNames,char[][] parameterNames,char[] returnTypePackageName,char[] returnTypeName,char[] completionName,int modifiers,int completionStart,int completionEnd, int relevance){
				// ignore
			}
			public void acceptModifier(char[] modifierName,int completionStart,int completionEnd, int relevance){
				requestor.acceptModifier(modifierName, completionStart, completionEnd);
			}
			public void acceptPackage(char[] packageName,char[] completionName,int completionStart,int completionEnd, int relevance){
				requestor.acceptPackage(packageName, completionName, completionStart, completionEnd);
			}
			public void acceptType(char[] packageName,char[] typeName,char[] completionName,int completionStart,int completionEnd, int relevance){
				requestor.acceptType(packageName, typeName, completionName, completionStart, completionEnd);
			}
			public void acceptVariableName(char[] typePackageName,char[] typeName,char[] varName,char[] completionName,int completionStart,int completionEnd, int relevance){
				// ignore
			}
		});
}

/*
 * @see IType#getField(String name)
 */
public IField getField(String fieldName) {
	return new SourceField(this, fieldName);

}
/*
 * @see IType#getFields()
 */
public IField[] getFields() throws JavaModelException {
	ArrayList list = getChildrenOfType(FIELD);
	int size;
	if ((size = list.size()) == 0) {
		return NO_FIELDS;
	} else {
		IField[] array= new IField[size];
		list.toArray(array);
		return array;
	}
}
public IMethod getMethod(String selector, String[] parameterTypeSignatures) {
	return new SourceMethod(this, selector, parameterTypeSignatures);
}

public IType getType(String typeName) {
	return new SourceType(this, typeName);
}

/*
 * @see IType#getMethods()
 */
public IMethod[] getMethods() throws JavaModelException {
	ArrayList list = getChildrenOfType(METHOD);
	int size;
	if ((size = list.size()) == 0) {
		return NO_METHODS;
	} else {
		IMethod[] array= new IMethod[size];
		list.toArray(array);
		return array;
	}
}

public IType[] getTypes() throws JavaModelException {
	ArrayList list = getChildrenOfType(TYPE);
	IType[] array= new IType[list.size()];
	list.toArray(array);
	return array;
}

 	public char[] getContents() {
		char [] chars=null;
		try {
			chars=org.eclipse.wst.jsdt.internal.compiler.util.Util.getFileCharContent(new File(filePath.toOSString()),null);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return chars;
	}
	public char[] getMainTypeName() {
		return name.toCharArray();
	}
	public char[][] getPackageName() {
		return new char[][] {getParent().getElementName().toCharArray()};
	}
	public char[] getFileName() {
		//return getElementName().toCharArray();
		return this.filePath!=null?this.filePath.toString().toCharArray():getElementName().toCharArray();
	}

	/* (non-Javadoc)
	 * @see org.eclipse.wst.jsdt.internal.core.JavaElement#getDisplayName()
	 */
	public String getDisplayName() {
		if(isVirtual()) {

			JsGlobalScopeContainerInitializer init = ((IVirtualParent)parent).getContainerInitializer();
			if(init==null) return super.getDisplayName();
			return init.getDescription(new Path(getElementName()), getJavaProject());
		}
		return super.getDisplayName();
	}

	public URI getHostPath() {
		if(isVirtual()) {
			JsGlobalScopeContainerInitializer init = ((IVirtualParent)parent).getContainerInitializer();
			if(init!=null) return init.getHostPath(new Path(getElementName()), getJavaProject());
		}
		return null;
	}
	public LibrarySuperType getCommonSuperType() {
		return null;
		//return getJavaProject().getCommonSuperType();
	}
	public JsGlobalScopeContainerInitializer getContainerInitializer() {
		JsGlobalScopeContainerInitializer init = ((IVirtualParent)parent).getContainerInitializer();
		return init;
	}

	public String getInferenceID() {
		JsGlobalScopeContainerInitializer containerInitializer = getContainerInitializer();
		if (containerInitializer!=null)
			return containerInitializer.getInferenceID();
		return null;
	}

	public SearchableEnvironment newSearchableNameEnvironment(WorkingCopyOwner owner) throws JavaModelException {
		SearchableEnvironment env=super.newSearchableNameEnvironment(owner);
		env.setCompilationUnit(this);
		return env;
	}
}
