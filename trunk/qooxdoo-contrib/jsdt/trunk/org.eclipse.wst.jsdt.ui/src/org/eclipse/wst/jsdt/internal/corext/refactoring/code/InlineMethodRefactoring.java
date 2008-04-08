/*******************************************************************************
 * Copyright (c) 2000, 2007 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *     Dmitry Stalnov (dstalnov@fusionone.com) - contributed fixes for:
 *       o inline call that is used in a field initializer 
 *         (see https://bugs.eclipse.org/bugs/show_bug.cgi?id=38137)
 *       o Allow 'this' constructor to be inlined  
 *         (see https://bugs.eclipse.org/bugs/show_bug.cgi?id=38093)
 *******************************************************************************/
package org.eclipse.wst.jsdt.internal.corext.refactoring.code;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.runtime.Assert;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.OperationCanceledException;
import org.eclipse.core.runtime.SubProgressMonitor;
import org.eclipse.ltk.core.refactoring.Change;
import org.eclipse.ltk.core.refactoring.RefactoringDescriptor;
import org.eclipse.ltk.core.refactoring.RefactoringStatus;
import org.eclipse.ltk.core.refactoring.TextChange;
import org.eclipse.ltk.core.refactoring.participants.RefactoringArguments;
import org.eclipse.ltk.core.refactoring.participants.ResourceChangeChecker;
import org.eclipse.text.edits.MultiTextEdit;
import org.eclipse.text.edits.TextEdit;
import org.eclipse.text.edits.TextEditGroup;
import org.eclipse.wst.jsdt.core.Flags;
import org.eclipse.wst.jsdt.core.IClassFile;
import org.eclipse.wst.jsdt.core.ICompilationUnit;
import org.eclipse.wst.jsdt.core.IJavaElement;
import org.eclipse.wst.jsdt.core.IJavaProject;
import org.eclipse.wst.jsdt.core.IMethod;
import org.eclipse.wst.jsdt.core.IType;
import org.eclipse.wst.jsdt.core.ITypeHierarchy;
import org.eclipse.wst.jsdt.core.ITypeRoot;
import org.eclipse.wst.jsdt.core.JavaModelException;
import org.eclipse.wst.jsdt.core.dom.AST;
import org.eclipse.wst.jsdt.core.dom.ASTNode;
import org.eclipse.wst.jsdt.core.dom.BodyDeclaration;
import org.eclipse.wst.jsdt.core.dom.CompilationUnit;
import org.eclipse.wst.jsdt.core.dom.ConstructorInvocation;
import org.eclipse.wst.jsdt.core.dom.ExpressionStatement;
import org.eclipse.wst.jsdt.core.dom.IMethodBinding;
import org.eclipse.wst.jsdt.core.dom.ITypeBinding;
import org.eclipse.wst.jsdt.core.dom.MethodDeclaration;
import org.eclipse.wst.jsdt.core.dom.MethodInvocation;
import org.eclipse.wst.jsdt.core.dom.Modifier;
import org.eclipse.wst.jsdt.core.dom.SuperMethodInvocation;
import org.eclipse.wst.jsdt.core.dom.rewrite.ImportRewrite;
import org.eclipse.wst.jsdt.core.refactoring.IJavaRefactorings;
import org.eclipse.wst.jsdt.core.refactoring.descriptors.JavaRefactoringDescriptor;
import org.eclipse.wst.jsdt.internal.corext.dom.NodeFinder;
import org.eclipse.wst.jsdt.internal.corext.refactoring.Checks;
import org.eclipse.wst.jsdt.internal.corext.refactoring.JDTRefactoringDescriptor;
import org.eclipse.wst.jsdt.internal.corext.refactoring.JDTRefactoringDescriptorComment;
import org.eclipse.wst.jsdt.internal.corext.refactoring.JavaRefactoringArguments;
import org.eclipse.wst.jsdt.internal.corext.refactoring.RefactoringCoreMessages;
import org.eclipse.wst.jsdt.internal.corext.refactoring.base.JavaStatusContext;
import org.eclipse.wst.jsdt.internal.corext.refactoring.changes.CompilationUnitChange;
import org.eclipse.wst.jsdt.internal.corext.refactoring.changes.DynamicValidationRefactoringChange;
import org.eclipse.wst.jsdt.internal.corext.refactoring.changes.TextChangeCompatibility;
import org.eclipse.wst.jsdt.internal.corext.refactoring.util.JavaElementUtil;
import org.eclipse.wst.jsdt.internal.corext.refactoring.util.RefactoringASTParser;
import org.eclipse.wst.jsdt.internal.corext.refactoring.util.TextChangeManager;
import org.eclipse.wst.jsdt.internal.corext.util.Messages;
import org.eclipse.wst.jsdt.internal.ui.viewsupport.BindingLabelProvider;
import org.eclipse.wst.jsdt.ui.JavaElementLabels;

/*
 * Open items:
 *  - generate import statements for newly generated local variable declarations.
 *  - forbid cases like foo(foo(10)) when inlining foo().
 *  - case ref.foo(); and we want to inline foo. Inline a method in a different context;
 *  - optimize code when the method to be inlined returns an argument and that one is
 *    assigned to a parameter again. No need for a separate local (important to be able
 *    to reverse extract method correctly).
 */
public class InlineMethodRefactoring extends ScriptableRefactoring {

	private static final String ATTRIBUTE_MODE= "mode"; //$NON-NLS-1$
	private static final String ATTRIBUTE_DELETE= "delete";	 //$NON-NLS-1$

	public static class Mode {
		private Mode() {
		}
		public static final Mode INLINE_ALL= new Mode();
		public static final Mode INLINE_SINGLE= new Mode();
	}

	private ITypeRoot fInitialTypeRoot;
	private ASTNode fInitialNode;
	private TextChangeManager fChangeManager;
	private SourceProvider fSourceProvider;
	private TargetProvider fTargetProvider;
	/**
	 * must never be true if fInitialUnit instanceof IClassFile
	 */
	private boolean fDeleteSource;
	private Mode fCurrentMode;
	private Mode fInitialMode;
	private int fSelectionStart;
	private int fSelectionLength;

	private InlineMethodRefactoring(ITypeRoot typeRoot, ASTNode node, int offset, int length) {
		Assert.isNotNull(typeRoot);
		Assert.isTrue(JavaElementUtil.isSourceAvailable(typeRoot));
		Assert.isNotNull(node);
		fInitialTypeRoot= typeRoot;
		fInitialNode= node;
		fSelectionStart= offset;
		fSelectionLength= length;
	}

	private InlineMethodRefactoring(ICompilationUnit unit, MethodInvocation node, int offset, int length) {
		this(unit, (ASTNode)node, offset, length);
		fTargetProvider= TargetProvider.create(unit, node);
		fInitialMode= fCurrentMode= Mode.INLINE_SINGLE;
		fDeleteSource= false;
	}

	private InlineMethodRefactoring(ICompilationUnit unit, SuperMethodInvocation node, int offset, int length) {
		this(unit, (ASTNode)node, offset, length);
		fTargetProvider= TargetProvider.create(unit, node);
		fInitialMode= fCurrentMode= Mode.INLINE_SINGLE;
		fDeleteSource= false;
	}

	private InlineMethodRefactoring(ICompilationUnit unit, ConstructorInvocation node, int offset, int length) {
		this(unit, (ASTNode)node, offset, length);
		fTargetProvider= TargetProvider.create(unit, node);
		fInitialMode= fCurrentMode= Mode.INLINE_SINGLE;
		fDeleteSource= false;
	}

	private InlineMethodRefactoring(ITypeRoot typeRoot, MethodDeclaration node, int offset, int length) {
		this(typeRoot, (ASTNode)node, offset, length);
		fSourceProvider= new SourceProvider(typeRoot, node);
		fTargetProvider= TargetProvider.create(node);
		fInitialMode= fCurrentMode= Mode.INLINE_ALL;
		fDeleteSource= canEnableDeleteSource();
	}
	
	/**
	 * Creates a new inline method refactoring
	 * @param unit the compilation unit or class file
	 * @param node the compilation unit node
	 * @param selectionStart
	 * @param selectionLength
	 */
	public static InlineMethodRefactoring create(ITypeRoot unit, CompilationUnit node, int selectionStart, int selectionLength) {
		ASTNode target= getTargetNode(unit, node, selectionStart, selectionLength);
		if (target == null)
			return null;
		if (target.getNodeType() == ASTNode.METHOD_DECLARATION) {
			
			return new InlineMethodRefactoring(unit, (MethodDeclaration)target, selectionStart, selectionLength);
		} else {
			ICompilationUnit cu= (ICompilationUnit) unit;
			if (target.getNodeType() == ASTNode.METHOD_INVOCATION) {
				return new InlineMethodRefactoring(cu, (MethodInvocation)target, selectionStart, selectionLength);
			} else if (target.getNodeType() == ASTNode.SUPER_METHOD_INVOCATION) {
				return new InlineMethodRefactoring(cu, (SuperMethodInvocation)target, selectionStart, selectionLength);
			} else if (target.getNodeType() == ASTNode.CONSTRUCTOR_INVOCATION) {
				return new InlineMethodRefactoring(cu, (ConstructorInvocation)target, selectionStart, selectionLength);
			}
		}
		return null;
	}
	
	public String getName() {
		return RefactoringCoreMessages.InlineMethodRefactoring_name; 
	}
	
	public boolean canEnableDeleteSource() {
		return ! (fSourceProvider.getTypeRoot() instanceof IClassFile);
	}
	
	public boolean getDeleteSource() {
		return fDeleteSource;
	}

	public void setDeleteSource(boolean remove) {
		if (remove)
			Assert.isTrue(canEnableDeleteSource());
		fDeleteSource= remove;
	}
	
	public Mode getInitialMode() {
		return fInitialMode;
	}
	
	public RefactoringStatus setCurrentMode(Mode mode) throws JavaModelException {
		if (fCurrentMode == mode)
			return new RefactoringStatus();
		Assert.isTrue(getInitialMode() == Mode.INLINE_SINGLE);
		fCurrentMode= mode;
		if (mode == Mode.INLINE_SINGLE) {
			if (fInitialNode instanceof MethodInvocation)
				fTargetProvider= TargetProvider.create((ICompilationUnit) fInitialTypeRoot, (MethodInvocation)fInitialNode);
			else if (fInitialNode instanceof SuperMethodInvocation)
				fTargetProvider= TargetProvider.create((ICompilationUnit) fInitialTypeRoot, (SuperMethodInvocation)fInitialNode);
			else if (fInitialNode instanceof ConstructorInvocation)
				fTargetProvider= TargetProvider.create((ICompilationUnit) fInitialTypeRoot, (ConstructorInvocation)fInitialNode);
			else
				throw new IllegalStateException(String.valueOf(fInitialNode));
		} else {
			fTargetProvider= TargetProvider.create(fSourceProvider.getDeclaration());
		}
		return fTargetProvider.checkActivation();
	}
	
	public RefactoringStatus checkInitialConditions(IProgressMonitor pm) throws CoreException {
		RefactoringStatus result= new RefactoringStatus();
		if (fSourceProvider == null && Invocations.isInvocation(fInitialNode)) {
			fSourceProvider= resolveSourceProvider(result, fInitialTypeRoot, fInitialNode);
			if (result.hasFatalError())
				return result;
		}
		fTargetProvider.setSourceProvider(fSourceProvider);
		result.merge(fSourceProvider.checkActivation());
		result.merge(fTargetProvider.checkActivation());
		return result;
	}
	
	public RefactoringStatus checkFinalConditions(IProgressMonitor pm) throws CoreException {
		pm.beginTask("", 20); //$NON-NLS-1$
		fChangeManager= new TextChangeManager();
		RefactoringStatus result= new RefactoringStatus();
		fSourceProvider.initialize();
		fTargetProvider.initialize();
		pm.setTaskName(RefactoringCoreMessages.InlineMethodRefactoring_searching);
		RefactoringStatus searchStatus= new RefactoringStatus();
		ICompilationUnit[] units= fTargetProvider.getAffectedCompilationUnits(searchStatus, new SubProgressMonitor(pm, 1));
		if (searchStatus.hasFatalError()) {
			result.merge(searchStatus);
			return result;
		}
		IFile[] filesToBeModified= getFilesToBeModified(units);
		result.merge(Checks.validateModifiesFiles(filesToBeModified, getValidationContext()));
		if (result.hasFatalError())
			return result;
		result.merge(ResourceChangeChecker.checkFilesToBeChanged(filesToBeModified, new SubProgressMonitor(pm, 1)));
		checkOverridden(result, new SubProgressMonitor(pm, 4));
		IProgressMonitor sub= new SubProgressMonitor(pm, 15);
		sub.beginTask("", units.length * 3); //$NON-NLS-1$
		for (int c= 0; c < units.length; c++) {
			ICompilationUnit unit= units[c];
			sub.subTask(Messages.format(RefactoringCoreMessages.InlineMethodRefactoring_processing,  unit.getElementName())); 
			CallInliner inliner= null;
			try {
				boolean added= false;
				MultiTextEdit root= new MultiTextEdit();
				CompilationUnitChange change= (CompilationUnitChange)fChangeManager.get(unit);
				change.setEdit(root);
				BodyDeclaration[] bodies= fTargetProvider.getAffectedBodyDeclarations(unit, new SubProgressMonitor(pm, 1));
				if (bodies.length == 0)
					continue;
				inliner= new CallInliner(unit, (CompilationUnit) bodies[0].getRoot(), fSourceProvider);
				for (int b= 0; b < bodies.length; b++) {
					BodyDeclaration body= bodies[b];
					inliner.initialize(body);
					RefactoringStatus nestedInvocations= new RefactoringStatus();
					ASTNode[] invocations= removeNestedCalls(nestedInvocations, unit, 
						fTargetProvider.getInvocations(body, new SubProgressMonitor(sub, 2)));
					for (int i= 0; i < invocations.length; i++) {
						ASTNode invocation= invocations[i];
						result.merge(inliner.initialize(invocation, fTargetProvider.getStatusSeverity()));
						if (result.hasFatalError())
							break;
						if (result.getSeverity() < fTargetProvider.getStatusSeverity()) {
							added= true;
							TextEditGroup group= new TextEditGroup(RefactoringCoreMessages.InlineMethodRefactoring_edit_inline); 
							change.addTextEditGroup(group);
							result.merge(inliner.perform(group)); 
						} else {
							fDeleteSource= false;
						}
					}
					// do this after we have inlined the method calls. We still want
					// to generate the modifications.
					if (!nestedInvocations.isOK()) {
						result.merge(nestedInvocations);
						fDeleteSource= false;
					}
				}
				if (!added) {
					fChangeManager.remove(unit);
				} else {
					root.addChild(inliner.getModifications());
					ImportRewrite rewrite= inliner.getImportEdit();
					if (rewrite.hasRecordedChanges()) {
						TextEdit edit= rewrite.rewriteImports(null);
						if (edit instanceof MultiTextEdit ? ((MultiTextEdit)edit).getChildrenSize() > 0 : true) {
							root.addChild(edit);
							change.addTextEditGroup(
								new TextEditGroup(RefactoringCoreMessages.InlineMethodRefactoring_edit_import, new TextEdit[] {edit})); 
						}
					}
				}
			} finally {
				if (inliner != null)
					inliner.dispose();
			}
			sub.worked(1);
			if (sub.isCanceled())
				throw new OperationCanceledException();
		}
		result.merge(searchStatus);
		sub.done();
		pm.done();
		return result;
	}

	public Change createChange(IProgressMonitor pm) throws CoreException {
		if (fDeleteSource && fCurrentMode == Mode.INLINE_ALL) {
			TextChange change= fChangeManager.get((ICompilationUnit) fSourceProvider.getTypeRoot());
			TextEdit delete= fSourceProvider.getDeleteEdit();
			TextEditGroup description= new TextEditGroup(
				RefactoringCoreMessages.InlineMethodRefactoring_edit_delete, new TextEdit[] { delete }); 
			TextEdit root= change.getEdit();
			if (root != null) {
				// TODO instead of finding the right insert position the call inliner should
				// reuse the AST & rewriter of the source provide and we should rewrite the
				// whole AST at the end. However, since recursive calls aren't allowed there
				// shouldn't be a text edit overlap.
				// root.addChild(delete);
				TextChangeCompatibility.insert(root, delete);
			} else {
				change.setEdit(delete);
			}
			change.addTextEditGroup(description);
		}
		final Map arguments= new HashMap();
		String project= null;
		IJavaProject javaProject= fInitialTypeRoot.getJavaProject();
		if (javaProject != null)
			project= javaProject.getElementName();
		int flags= RefactoringDescriptor.STRUCTURAL_CHANGE | JavaRefactoringDescriptor.JAR_REFACTORING | JavaRefactoringDescriptor.JAR_SOURCE_ATTACHMENT;
		final IMethodBinding binding= fSourceProvider.getDeclaration().resolveBinding();
		final ITypeBinding declaring= binding.getDeclaringClass();
		if (!Modifier.isPrivate(binding.getModifiers()))
			flags|= RefactoringDescriptor.MULTI_CHANGE;
		final String description= Messages.format(RefactoringCoreMessages.InlineMethodRefactoring_descriptor_description_short, binding.getName());
		final String header= Messages.format(RefactoringCoreMessages.InlineMethodRefactoring_descriptor_description, new String[] { BindingLabelProvider.getBindingLabel(binding, JavaElementLabels.ALL_FULLY_QUALIFIED), BindingLabelProvider.getBindingLabel(declaring, JavaElementLabels.ALL_FULLY_QUALIFIED)});
		final JDTRefactoringDescriptorComment comment= new JDTRefactoringDescriptorComment(project, this, header);
		comment.addSetting(Messages.format(RefactoringCoreMessages.InlineMethodRefactoring_original_pattern, BindingLabelProvider.getBindingLabel(binding, JavaElementLabels.ALL_FULLY_QUALIFIED)));
		if (fDeleteSource)
			comment.addSetting(RefactoringCoreMessages.InlineMethodRefactoring_remove_method);
		if (fCurrentMode == Mode.INLINE_ALL)
			comment.addSetting(RefactoringCoreMessages.InlineMethodRefactoring_replace_references);
		final JDTRefactoringDescriptor descriptor= new JDTRefactoringDescriptor(IJavaRefactorings.INLINE_METHOD, project, description, comment.asString(), arguments, flags);
		arguments.put(JDTRefactoringDescriptor.ATTRIBUTE_INPUT, descriptor.elementToHandle(fInitialTypeRoot));
		arguments.put(JDTRefactoringDescriptor.ATTRIBUTE_SELECTION, new Integer(fSelectionStart).toString() + " " + new Integer(fSelectionLength).toString()); //$NON-NLS-1$
		arguments.put(ATTRIBUTE_DELETE, Boolean.valueOf(fDeleteSource).toString());
		arguments.put(ATTRIBUTE_MODE, new Integer(fCurrentMode == Mode.INLINE_ALL ? 1 : 0).toString());
		return new DynamicValidationRefactoringChange(descriptor, RefactoringCoreMessages.InlineMethodRefactoring_edit_inlineCall, fChangeManager.getAllChanges());
	}
	
	private static SourceProvider resolveSourceProvider(RefactoringStatus status, ITypeRoot typeRoot, ASTNode invocation) throws JavaModelException {
		CompilationUnit root= (CompilationUnit)invocation.getRoot();
		IMethodBinding methodBinding= Invocations.resolveBinding(invocation);
		if (methodBinding == null) {
			status.addFatalError(RefactoringCoreMessages.InlineMethodRefactoring_error_noMethodDeclaration); 
			return null;
		}
		MethodDeclaration declaration= (MethodDeclaration)root.findDeclaringNode(methodBinding);
		if (declaration != null) {
			return new SourceProvider(typeRoot, declaration);
		}
		IMethod method= (IMethod)methodBinding.getJavaElement();
		if (method != null) {
			CompilationUnit methodDeclarationAstRoot;
			ICompilationUnit methodCu= method.getCompilationUnit();
			if (methodCu != null) {
				methodDeclarationAstRoot= new RefactoringASTParser(AST.JLS3).parse(methodCu, true);
			} else {
				IClassFile classFile= method.getClassFile();
				if (! JavaElementUtil.isSourceAvailable(classFile)) {
					String methodLabel= JavaElementLabels.getTextLabel(method, JavaElementLabels.M_FULLY_QUALIFIED | JavaElementLabels.M_PARAMETER_TYPES);
					status.addFatalError(Messages.format(RefactoringCoreMessages.InlineMethodRefactoring_error_classFile, methodLabel)); 
					return null;
				}				
				methodDeclarationAstRoot= new RefactoringASTParser(AST.JLS3).parse(classFile, true);
			}
			ASTNode node= methodDeclarationAstRoot.findDeclaringNode(methodBinding.getMethodDeclaration().getKey());
			if (node instanceof MethodDeclaration) {
				return new SourceProvider(methodDeclarationAstRoot.getTypeRoot(), (MethodDeclaration) node);
			}
		}
		status.addFatalError(RefactoringCoreMessages.InlineMethodRefactoring_error_noMethodDeclaration); 
		return null;
	}
	
	private static ASTNode getTargetNode(ITypeRoot typeRoot, CompilationUnit root, int offset, int length) {
		ASTNode node= null;
		try {
			node= checkNode(NodeFinder.perform(root, offset, length, typeRoot), typeRoot);
		} catch(JavaModelException e) {
			// Do nothing
		}
		if (node != null)
			return node;
		return checkNode(NodeFinder.perform(root, offset, length), typeRoot);
	}

	private static ASTNode checkNode(ASTNode node, IJavaElement unit) {
		if (node == null)
			return null;
		if (node.getNodeType() == ASTNode.SIMPLE_NAME) {
			node= node.getParent();
		} else if (node.getNodeType() == ASTNode.EXPRESSION_STATEMENT) {
			node= ((ExpressionStatement)node).getExpression();
		}
		switch(node.getNodeType()) {
			case ASTNode.METHOD_DECLARATION:
					return node;
			case ASTNode.METHOD_INVOCATION:
			case ASTNode.SUPER_METHOD_INVOCATION:
			case ASTNode.CONSTRUCTOR_INVOCATION:
				return unit instanceof ICompilationUnit ? node : null; // don't start on invocations in binary
		}
		return null;
	}
	
	private IFile[] getFilesToBeModified(ICompilationUnit[] units) {
		List result= new ArrayList(units.length + 1);
		IFile file;
		for (int i= 0; i < units.length; i++) {
			file= getFile(units[i]);
			if (file != null)
				result.add(file);
		}
		if (fDeleteSource) {
			file= getFile((ICompilationUnit) fSourceProvider.getTypeRoot());
			if (file != null && !result.contains(file))
				result.add(file);
		}
		return (IFile[])result.toArray(new IFile[result.size()]);
	}
	
	private IFile getFile(ICompilationUnit unit) {
		unit= unit.getPrimary();
		IResource resource= unit.getResource();
		if (resource != null && resource.getType() == IResource.FILE)
			return (IFile)resource;
		return null;
	}
	
	private void checkOverridden(RefactoringStatus status, IProgressMonitor pm) throws JavaModelException {
		pm.beginTask("", 9); //$NON-NLS-1$
		pm.setTaskName(RefactoringCoreMessages.InlineMethodRefactoring_checking_overridden); 
		MethodDeclaration decl= fSourceProvider.getDeclaration();
		IMethod method= (IMethod) decl.resolveBinding().getJavaElement();
		if (method == null || Flags.isPrivate(method.getFlags())) {
			pm.worked(8);
			return;
		}
		IType type= method.getDeclaringType();
		if (type==null) {
			pm.worked(8);
			return;
		}
		ITypeHierarchy hierarchy= type.newTypeHierarchy(new SubProgressMonitor(pm, 6));
		checkSubTypes(status, method, hierarchy.getAllSubtypes(type), new SubProgressMonitor(pm, 1));
		checkSuperClasses(status, method, hierarchy.getAllSuperclasses(type), new SubProgressMonitor(pm, 1));
		checkSuperInterfaces(status, method, hierarchy.getAllSuperInterfaces(type), new SubProgressMonitor(pm, 1));
		pm.setTaskName(""); //$NON-NLS-1$
	}

	private void checkSubTypes(RefactoringStatus result, IMethod method, IType[] types, IProgressMonitor pm) {
		checkTypes(
			result, method, types, 
			RefactoringCoreMessages.InlineMethodRefactoring_checking_overridden_error,
			pm);
	}
	
	private void checkSuperClasses(RefactoringStatus result, IMethod method, IType[] types, IProgressMonitor pm) {
		checkTypes(
			result, method, types, 
			RefactoringCoreMessages.InlineMethodRefactoring_checking_overrides_error,
			pm);
	}

	private void checkSuperInterfaces(RefactoringStatus result, IMethod method, IType[] types, IProgressMonitor pm) {
		checkTypes(
			result, method, types, 
			RefactoringCoreMessages.InlineMethodRefactoring_checking_implements_error,
			pm);
	}
	private void checkTypes(RefactoringStatus result, IMethod method, IType[] types, String key, IProgressMonitor pm) {
		pm.beginTask("", types.length); //$NON-NLS-1$
		for (int i= 0; i < types.length; i++) {
			pm.worked(1);
			IMethod[] overridden= types[i].findMethods(method);
			if (overridden != null && overridden.length > 0) {
				result.addError(
					Messages.format(key, types[i].getElementName()), 
					JavaStatusContext.create(overridden[0]));
			}
		}
	}
	
	private ASTNode[] removeNestedCalls(RefactoringStatus status, ICompilationUnit unit, ASTNode[] invocations) {
		if (invocations.length <= 1)
			return invocations;
		ASTNode[] parents= new ASTNode[invocations.length];
		for (int i= 0; i < invocations.length; i++) {
			parents[i]= invocations[i].getParent();
		}
		for (int i= 0; i < invocations.length; i++) {
			removeNestedCalls(status, unit, parents, invocations, i);
		}
		List result= new ArrayList();
		for (int i= 0; i < invocations.length; i++) {
			if (invocations[i] != null)
				result.add(invocations[i]);
		}
		return (ASTNode[])result.toArray(new ASTNode[result.size()]);
	}
	
	private void removeNestedCalls(RefactoringStatus status, ICompilationUnit unit, ASTNode[] parents, ASTNode[] invocations, int index) {
		ASTNode invocation= invocations[index];
		for (int i= 0; i < parents.length; i++) {
			ASTNode parent= parents[i];
			while (parent != null) {
				if (parent == invocation) {
					status.addError(RefactoringCoreMessages.InlineMethodRefactoring_nestedInvocation,  
						JavaStatusContext.create(unit, parent));
					invocations[index]= null;
				}
				parent= parent.getParent();
			}
		}
	}

	public RefactoringStatus initialize(final RefactoringArguments arguments) {
		if (arguments instanceof JavaRefactoringArguments) {
			final JavaRefactoringArguments generic= (JavaRefactoringArguments) arguments;
			final String delete= generic.getAttribute(ATTRIBUTE_DELETE);
			if (delete != null) {
				fDeleteSource= Boolean.valueOf(delete).booleanValue();
			} else
				return RefactoringStatus.createFatalErrorStatus(Messages.format(RefactoringCoreMessages.InitializableRefactoring_argument_not_exist, ATTRIBUTE_DELETE));
			final String value= generic.getAttribute(ATTRIBUTE_MODE);
			if (value != null && !"".equals(value)) {//$NON-NLS-1$
				int mode= 0;
				try {
					mode= Integer.parseInt(value);
				} catch (NumberFormatException exception) {
					return RefactoringStatus.createFatalErrorStatus(Messages.format(RefactoringCoreMessages.InitializableRefactoring_argument_not_exist, ATTRIBUTE_MODE));
				}
				try {
					setCurrentMode(mode == 1 ? Mode.INLINE_ALL : Mode.INLINE_SINGLE);
				} catch (JavaModelException exception) {
					return RefactoringStatus.createFatalErrorStatus(exception.getLocalizedMessage());
				}
			}
		} else
			return RefactoringStatus.createFatalErrorStatus(RefactoringCoreMessages.InitializableRefactoring_inacceptable_arguments);
		return new RefactoringStatus();
	}
}