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
package org.eclipse.wst.jsdt.internal.corext.refactoring.structure;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.eclipse.core.filebuffers.ITextFileBuffer;
import org.eclipse.core.resources.IFile;
import org.eclipse.core.runtime.Assert;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.core.runtime.OperationCanceledException;
import org.eclipse.core.runtime.SubProgressMonitor;
import org.eclipse.jface.text.BadLocationException;
import org.eclipse.jface.text.Document;
import org.eclipse.jface.text.IDocument;
import org.eclipse.ltk.core.refactoring.Change;
import org.eclipse.ltk.core.refactoring.GroupCategory;
import org.eclipse.ltk.core.refactoring.GroupCategorySet;
import org.eclipse.ltk.core.refactoring.RefactoringDescriptor;
import org.eclipse.ltk.core.refactoring.RefactoringStatus;
import org.eclipse.ltk.core.refactoring.TextChange;
import org.eclipse.ltk.core.refactoring.TextEditBasedChange;
import org.eclipse.ltk.core.refactoring.participants.CheckConditionsContext;
import org.eclipse.ltk.core.refactoring.participants.RefactoringArguments;
import org.eclipse.ltk.core.refactoring.participants.RefactoringParticipant;
import org.eclipse.ltk.core.refactoring.participants.SharableParticipants;
import org.eclipse.text.edits.MalformedTreeException;
import org.eclipse.text.edits.TextEdit;
import org.eclipse.wst.jsdt.core.IJavaScriptUnit;
import org.eclipse.wst.jsdt.core.IField;
import org.eclipse.wst.jsdt.core.IJavaScriptElement;
import org.eclipse.wst.jsdt.core.IJavaScriptProject;
import org.eclipse.wst.jsdt.core.IMember;
import org.eclipse.wst.jsdt.core.IFunction;
import org.eclipse.wst.jsdt.core.IPackageFragment;
import org.eclipse.wst.jsdt.core.ISourceReference;
import org.eclipse.wst.jsdt.core.IType;
import org.eclipse.wst.jsdt.core.ITypeParameter;
import org.eclipse.wst.jsdt.core.JavaScriptCore;
import org.eclipse.wst.jsdt.core.JavaScriptModelException;
import org.eclipse.wst.jsdt.core.dom.AST;
import org.eclipse.wst.jsdt.core.dom.ASTNode;
import org.eclipse.wst.jsdt.core.dom.ASTParser;
import org.eclipse.wst.jsdt.core.dom.ASTRequestor;
import org.eclipse.wst.jsdt.core.dom.AbstractTypeDeclaration;
import org.eclipse.wst.jsdt.core.dom.Annotation;
import org.eclipse.wst.jsdt.core.dom.JavaScriptUnit;
import org.eclipse.wst.jsdt.core.dom.EnumDeclaration;
import org.eclipse.wst.jsdt.core.dom.FieldDeclaration;
import org.eclipse.wst.jsdt.core.dom.IBinding;
import org.eclipse.wst.jsdt.core.dom.IExtendedModifier;
import org.eclipse.wst.jsdt.core.dom.IFunctionBinding;
import org.eclipse.wst.jsdt.core.dom.ITypeBinding;
import org.eclipse.wst.jsdt.core.dom.IVariableBinding;
import org.eclipse.wst.jsdt.core.dom.FunctionDeclaration;
import org.eclipse.wst.jsdt.core.dom.Modifier;
import org.eclipse.wst.jsdt.core.dom.ParameterizedType;
import org.eclipse.wst.jsdt.core.dom.SingleVariableDeclaration;
import org.eclipse.wst.jsdt.core.dom.Type;
import org.eclipse.wst.jsdt.core.dom.TypeDeclaration;
import org.eclipse.wst.jsdt.core.dom.VariableDeclarationFragment;
import org.eclipse.wst.jsdt.core.dom.rewrite.ASTRewrite;
import org.eclipse.wst.jsdt.core.dom.rewrite.ITrackedNodePosition;
import org.eclipse.wst.jsdt.core.dom.rewrite.ListRewrite;
import org.eclipse.wst.jsdt.core.refactoring.IJavaScriptRefactorings;
import org.eclipse.wst.jsdt.core.refactoring.descriptors.JavaScriptRefactoringDescriptor;
import org.eclipse.wst.jsdt.internal.corext.codemanipulation.CodeGenerationSettings;
import org.eclipse.wst.jsdt.internal.corext.codemanipulation.StubUtility;
import org.eclipse.wst.jsdt.internal.corext.dom.Bindings;
import org.eclipse.wst.jsdt.internal.corext.dom.ModifierRewrite;
import org.eclipse.wst.jsdt.internal.corext.dom.NodeFinder;
import org.eclipse.wst.jsdt.internal.corext.refactoring.Checks;
import org.eclipse.wst.jsdt.internal.corext.refactoring.JDTRefactoringDescriptor;
import org.eclipse.wst.jsdt.internal.corext.refactoring.JDTRefactoringDescriptorComment;
import org.eclipse.wst.jsdt.internal.corext.refactoring.JavaRefactoringArguments;
import org.eclipse.wst.jsdt.internal.corext.refactoring.RefactoringCoreMessages;
import org.eclipse.wst.jsdt.internal.corext.refactoring.base.JavaStatusContext;
import org.eclipse.wst.jsdt.internal.corext.refactoring.changes.CreateCompilationUnitChange;
import org.eclipse.wst.jsdt.internal.corext.refactoring.changes.DynamicValidationRefactoringChange;
import org.eclipse.wst.jsdt.internal.corext.refactoring.code.ScriptableRefactoring;
import org.eclipse.wst.jsdt.internal.corext.refactoring.reorg.ASTNodeDeleteUtil;
import org.eclipse.wst.jsdt.internal.corext.refactoring.structure.constraints.SuperTypeConstraintsModel;
import org.eclipse.wst.jsdt.internal.corext.refactoring.structure.constraints.SuperTypeConstraintsSolver;
import org.eclipse.wst.jsdt.internal.corext.refactoring.structure.constraints.SuperTypeRefactoringProcessor;
import org.eclipse.wst.jsdt.internal.corext.refactoring.typeconstraints.CompilationUnitRange;
import org.eclipse.wst.jsdt.internal.corext.refactoring.typeconstraints.types.TType;
import org.eclipse.wst.jsdt.internal.corext.refactoring.typeconstraints2.ISourceConstraintVariable;
import org.eclipse.wst.jsdt.internal.corext.refactoring.typeconstraints2.ITypeConstraintVariable;
import org.eclipse.wst.jsdt.internal.corext.refactoring.util.RefactoringASTParser;
import org.eclipse.wst.jsdt.internal.corext.refactoring.util.RefactoringFileBuffers;
import org.eclipse.wst.jsdt.internal.corext.refactoring.util.ResourceUtil;
import org.eclipse.wst.jsdt.internal.corext.refactoring.util.TextEditBasedChangeManager;
import org.eclipse.wst.jsdt.internal.corext.util.JavaModelUtil;
import org.eclipse.wst.jsdt.internal.corext.util.JdtFlags;
import org.eclipse.wst.jsdt.internal.corext.util.Messages;
import org.eclipse.wst.jsdt.internal.corext.util.Strings;
import org.eclipse.wst.jsdt.internal.ui.JavaScriptPlugin;
import org.eclipse.wst.jsdt.internal.ui.preferences.JavaPreferencesSettings;
import org.eclipse.wst.jsdt.ui.CodeGeneration;
import org.eclipse.wst.jsdt.ui.JavaScriptElementLabels;

/**
 * Refactoring processor to extract interfaces.
 */
public final class ExtractInterfaceProcessor extends SuperTypeRefactoringProcessor {

	private static final String ATTRIBUTE_ABSTRACT= "abstract"; //$NON-NLS-1$

	private static final String ATTRIBUTE_COMMENTS= "comments"; //$NON-NLS-1$

	private static final String ATTRIBUTE_PUBLIC= "public"; //$NON-NLS-1$

	/** The identifier of this processor */
	public static final String IDENTIFIER= "org.eclipse.wst.jsdt.ui.extractInterfaceProcessor"; //$NON-NLS-1$

	/** The extract interface group category set */
	private static final GroupCategorySet SET_EXTRACT_INTERFACE= new GroupCategorySet(new GroupCategory("org.eclipse.wst.jsdt.internal.corext.extractInterface", //$NON-NLS-1$
			RefactoringCoreMessages.ExtractInterfaceProcessor_category_name, RefactoringCoreMessages.ExtractInterfaceProcessor_category_description));

	/**
	 * Is the specified member extractable from the type?
	 * 
	 * @param member
	 *            the member to test
	 * @return <code>true</code> if the member is extractable,
	 *         <code>false</code> otherwise
	 * @throws JavaScriptModelException
	 *             if an error occurs
	 */
	protected static boolean isExtractableMember(final IMember member) throws JavaScriptModelException {
		Assert.isNotNull(member);
		switch (member.getElementType()) {
			case IJavaScriptElement.METHOD:
				return JdtFlags.isPublic(member) && !JdtFlags.isStatic(member) && !((IFunction) member).isConstructor();
			case IJavaScriptElement.FIELD:
				return JdtFlags.isPublic(member) && JdtFlags.isStatic(member) && JdtFlags.isFinal(member) && !JdtFlags.isEnum(member);
			default:
				return false;
		}
	}

	/** Should extracted methods be declared as abstract? */
	private boolean fAbstract= true;

	/** The text edit based change manager */
	private TextEditBasedChangeManager fChangeManager= null;

	/** Should comments be generated? */
	private boolean fComments= true;

	/** The members to extract */
	private IMember[] fMembers= null;

	/** Should extracted methods be declared as public? */
	private boolean fPublic= true;

	/** The subtype where to extract the supertype */
	private IType fSubType;

	/** The supertype name */
	private String fSuperName;

	/** The source of the new supertype */
	private String fSuperSource= null;

	/**
	 * Creates a new extract interface processor.
	 * 
	 * @param type
	 *            the type where to extract the supertype, or <code>null</code>
	 *            if invoked by scripting
	 * @param settings
	 *            the code generation settings, or <code>null</code> if
	 *            invoked by scripting
	 */
	public ExtractInterfaceProcessor(final IType type, final CodeGenerationSettings settings) {
		super(settings);
		fSubType= type;
		if (fSubType != null)
			fSuperName= fSubType.getElementName();
	}

	/*
	 * @see org.eclipse.ltk.core.refactoring.participants.RefactoringProcessor#checkFinalConditions(org.eclipse.core.runtime.IProgressMonitor,org.eclipse.ltk.core.refactoring.participants.CheckConditionsContext)
	 */
	public final RefactoringStatus checkFinalConditions(final IProgressMonitor monitor, final CheckConditionsContext context) throws CoreException, OperationCanceledException {
		Assert.isNotNull(monitor);
		Assert.isNotNull(context);
		final RefactoringStatus status= new RefactoringStatus();
		fChangeManager= new TextEditBasedChangeManager();
		try {
			monitor.beginTask("", 1); //$NON-NLS-1$
			monitor.setTaskName(RefactoringCoreMessages.ExtractInterfaceProcessor_checking);
			status.merge(Checks.checkIfCuBroken(fSubType));
			if (!status.hasError()) {
				if (fSubType.isBinary() || fSubType.isReadOnly() || !fSubType.exists())
					status.merge(RefactoringStatus.createFatalErrorStatus(RefactoringCoreMessages.ExtractInterfaceProcessor_no_binary, JavaStatusContext.create(fSubType)));
				else if (fSubType.isAnonymous())
					status.merge(RefactoringStatus.createFatalErrorStatus(RefactoringCoreMessages.ExtractInterfaceProcessor_no_anonymous, JavaStatusContext.create(fSubType)));
				else if (fSubType.isAnnotation())
					status.merge(RefactoringStatus.createFatalErrorStatus(RefactoringCoreMessages.ExtractInterfaceProcessor_no_annotation, JavaStatusContext.create(fSubType)));
				else {
					status.merge(checkSuperType());
					if (!status.hasFatalError()) {
						if (!status.hasFatalError()) {
							fChangeManager= createChangeManager(new SubProgressMonitor(monitor, 1), status);
							if (!status.hasFatalError()) {
								final RefactoringStatus validation= Checks.validateModifiesFiles(ResourceUtil.getFiles(fChangeManager.getAllCompilationUnits()), getRefactoring().getValidationContext());
								if (!validation.isOK())
									return validation;
							}
						}
					}
				}
			}
		} finally {
			monitor.done();
		}
		return status;
	}

	/*
	 * @see org.eclipse.ltk.core.refactoring.participants.RefactoringProcessor#checkInitialConditions(org.eclipse.core.runtime.IProgressMonitor)
	 */
	public final RefactoringStatus checkInitialConditions(final IProgressMonitor monitor) throws CoreException, OperationCanceledException {
		Assert.isNotNull(monitor);
		final RefactoringStatus status= new RefactoringStatus();
		try {
			monitor.beginTask("", 1); //$NON-NLS-1$
			monitor.setTaskName(RefactoringCoreMessages.ExtractInterfaceProcessor_checking);
			status.merge(Checks.checkIfCuBroken(fSubType));
			monitor.worked(1);
		} finally {
			monitor.done();
		}
		return status;
	}

	/**
	 * Checks whether the supertype clashes with existing types.
	 * 
	 * @return the status of the condition checking
	 * @throws JavaScriptModelException
	 *             if an error occurs
	 */
	protected final RefactoringStatus checkSuperType() throws JavaScriptModelException {
		final IPackageFragment fragment= fSubType.getPackageFragment();
		final IType type= Checks.findTypeInPackage(fragment, fSuperName);
		if (type != null && type.exists()) {
			if (fragment.isDefaultPackage())
				return RefactoringStatus.createFatalErrorStatus(Messages.format(RefactoringCoreMessages.ExtractInterfaceProcessor_existing_default_type, new String[] { fSuperName }));
			else
				return RefactoringStatus.createFatalErrorStatus(Messages.format(RefactoringCoreMessages.ExtractInterfaceProcessor_existing_type, new String[] { fSuperName, fragment.getElementName() }));
		}
		return new RefactoringStatus();
	}

	/**
	 * Checks whether the type name is valid.
	 * 
	 * @param name
	 *            the name to check
	 * @return the status of the condition checking
	 */
	public final RefactoringStatus checkTypeName(final String name) {
		Assert.isNotNull(name);
		try {
			final RefactoringStatus result= Checks.checkTypeName(name);
			if (result.hasFatalError())
				return result;
			final String unitName= JavaModelUtil.getRenamedCUName(fSubType.getJavaScriptUnit(), name);
			result.merge(Checks.checkCompilationUnitName(unitName));
			if (result.hasFatalError())
				return result;
			final IPackageFragment fragment= fSubType.getPackageFragment();
			if (fragment.getJavaScriptUnit(unitName).exists()) {
				result.addFatalError(Messages.format(RefactoringCoreMessages.ExtractInterfaceProcessor_existing_compilation_unit, new String[] { unitName, fragment.getElementName() }));
				return result;
			}
			result.merge(checkSuperType());
			return result;
		} catch (JavaScriptModelException exception) {
			return RefactoringStatus.createFatalErrorStatus(RefactoringCoreMessages.ExtractInterfaceProcessor_internal_error);
		}
	}

	/*
	 * @see org.eclipse.ltk.core.refactoring.participants.RefactoringProcessor#createChange(org.eclipse.core.runtime.IProgressMonitor)
	 */
	public final Change createChange(final IProgressMonitor monitor) throws CoreException, OperationCanceledException {
		Assert.isNotNull(monitor);
		try {
			monitor.beginTask("", 1); //$NON-NLS-1$
			monitor.setTaskName(RefactoringCoreMessages.ExtractInterfaceProcessor_creating);
			final Map arguments= new HashMap();
			String project= null;
			final IJavaScriptProject javaProject= fSubType.getJavaScriptProject();
			if (javaProject != null)
				project= javaProject.getElementName();
			int flags= JavaScriptRefactoringDescriptor.JAR_MIGRATION | JavaScriptRefactoringDescriptor.JAR_REFACTORING | RefactoringDescriptor.STRUCTURAL_CHANGE | RefactoringDescriptor.MULTI_CHANGE;
			try {
				if (fSubType.isLocal() || fSubType.isAnonymous())
					flags|= JavaScriptRefactoringDescriptor.JAR_SOURCE_ATTACHMENT;
			} catch (JavaScriptModelException exception) {
				JavaScriptPlugin.log(exception);
			}
			final IPackageFragment fragment= fSubType.getPackageFragment();
			final IJavaScriptUnit cu= fragment.getJavaScriptUnit(JavaModelUtil.getRenamedCUName(fSubType.getJavaScriptUnit(), fSuperName));
			final IType type= cu.getType(fSuperName);
			final String description= Messages.format(RefactoringCoreMessages.ExtractInterfaceProcessor_description_descriptor_short, fSuperName);
			final String header= Messages.format(RefactoringCoreMessages.ExtractInterfaceProcessor_descriptor_description, new String[] { JavaScriptElementLabels.getElementLabel(type, JavaScriptElementLabels.ALL_FULLY_QUALIFIED), JavaScriptElementLabels.getElementLabel(fSubType, JavaScriptElementLabels.ALL_FULLY_QUALIFIED) });
			final JDTRefactoringDescriptorComment comment= new JDTRefactoringDescriptorComment(project, this, header);
			comment.addSetting(Messages.format(RefactoringCoreMessages.ExtractInterfaceProcessor_refactored_element_pattern, JavaScriptElementLabels.getElementLabel(type, JavaScriptElementLabels.ALL_FULLY_QUALIFIED)));
			final String[] settings= new String[fMembers.length];
			for (int index= 0; index < settings.length; index++)
				settings[index]= JavaScriptElementLabels.getElementLabel(fMembers[index], JavaScriptElementLabels.ALL_FULLY_QUALIFIED);
			comment.addSetting(JDTRefactoringDescriptorComment.createCompositeSetting(RefactoringCoreMessages.ExtractInterfaceProcessor_extracted_members_pattern, settings));
			addSuperTypeSettings(comment, true);
			final JDTRefactoringDescriptor descriptor= new JDTRefactoringDescriptor(IJavaScriptRefactorings.EXTRACT_INTERFACE, project, description, comment.asString(), arguments, flags);
			arguments.put(JDTRefactoringDescriptor.ATTRIBUTE_INPUT, descriptor.elementToHandle(fSubType));
			arguments.put(JDTRefactoringDescriptor.ATTRIBUTE_NAME, fSuperName);
			for (int index= 0; index < fMembers.length; index++)
				arguments.put(JDTRefactoringDescriptor.ATTRIBUTE_ELEMENT + (index + 1), descriptor.elementToHandle(fMembers[index]));
			arguments.put(ATTRIBUTE_ABSTRACT, Boolean.valueOf(fAbstract).toString());
			arguments.put(ATTRIBUTE_COMMENTS, Boolean.valueOf(fComments).toString());
			arguments.put(ATTRIBUTE_PUBLIC, Boolean.valueOf(fPublic).toString());
			arguments.put(ATTRIBUTE_REPLACE, Boolean.valueOf(fReplace).toString());
			arguments.put(ATTRIBUTE_INSTANCEOF, Boolean.valueOf(fInstanceOf).toString());
			final DynamicValidationRefactoringChange change= new DynamicValidationRefactoringChange(descriptor, RefactoringCoreMessages.ExtractInterfaceRefactoring_name, fChangeManager.getAllChanges());
			final IFile file= ResourceUtil.getFile(fSubType.getJavaScriptUnit());
			if (fSuperSource != null && fSuperSource.length() > 0)
				change.add(new CreateCompilationUnitChange(fSubType.getPackageFragment().getJavaScriptUnit(JavaModelUtil.getRenamedCUName(fSubType.getJavaScriptUnit(), fSuperName)), fSuperSource, file.getCharset(false)));
			monitor.worked(1);
			return change;
		} finally {
			monitor.done();
		}
	}

	/**
	 * Creates the text change manager for this processor.
	 * 
	 * @param monitor
	 *            the progress monitor to display progress
	 * @param status
	 *            the refactoring status
	 * @return the created text change manager
	 * @throws JavaScriptModelException
	 *             if the method declaration could not be found
	 * @throws CoreException
	 *             if the changes could not be generated
	 */
	protected final TextEditBasedChangeManager createChangeManager(final IProgressMonitor monitor, final RefactoringStatus status) throws JavaScriptModelException, CoreException {
		Assert.isNotNull(status);
		Assert.isNotNull(monitor);
		try {
			monitor.beginTask("", 300); //$NON-NLS-1$
			monitor.setTaskName(RefactoringCoreMessages.ExtractInterfaceProcessor_creating);
			resetEnvironment();
			final TextEditBasedChangeManager manager= new TextEditBasedChangeManager();
			final CompilationUnitRewrite sourceRewrite= new CompilationUnitRewrite(fSubType.getJavaScriptUnit());
			final AbstractTypeDeclaration declaration= ASTNodeSearchUtil.getAbstractTypeDeclarationNode(fSubType, sourceRewrite.getRoot());
			if (declaration != null) {
				createTypeSignature(sourceRewrite, declaration, status, new SubProgressMonitor(monitor, 20));
				final IField[] fields= getExtractedFields(fSubType.getJavaScriptUnit());
				if (fields.length > 0)
					ASTNodeDeleteUtil.markAsDeleted(fields, sourceRewrite, sourceRewrite.createCategorizedGroupDescription(RefactoringCoreMessages.ExtractInterfaceProcessor_remove_field_label, SET_EXTRACT_INTERFACE));
				if (fSubType.isInterface()) {
					final IFunction[] methods= getExtractedMethods(fSubType.getJavaScriptUnit());
					if (methods.length > 0)
						ASTNodeDeleteUtil.markAsDeleted(methods, sourceRewrite, sourceRewrite.createCategorizedGroupDescription(RefactoringCoreMessages.ExtractInterfaceProcessor_remove_method_label, SET_EXTRACT_INTERFACE));
				}
				final String name= JavaModelUtil.getRenamedCUName(fSubType.getJavaScriptUnit(), fSuperName);
				final IJavaScriptUnit original= fSubType.getPackageFragment().getJavaScriptUnit(name);
				final IJavaScriptUnit copy= getSharedWorkingCopy(original.getPrimary(), new SubProgressMonitor(monitor, 20));
				fSuperSource= createTypeSource(copy, fSubType, fSuperName, sourceRewrite, declaration, status, new SubProgressMonitor(monitor, 40));
				if (fSuperSource != null) {
					copy.getBuffer().setContents(fSuperSource);
					JavaModelUtil.reconcile(copy);
				}
				final Set replacements= new HashSet();
				if (fReplace)
					rewriteTypeOccurrences(manager, sourceRewrite, copy, replacements, status, new SubProgressMonitor(monitor, 220));
				createMethodComments(sourceRewrite, replacements);
				manager.manage(fSubType.getJavaScriptUnit(), sourceRewrite.createChange());
			}
			return manager;
		} finally {
			monitor.done();
		}
	}

	/*
	 * @see org.eclipse.wst.jsdt.internal.corext.refactoring.structure.constraints.SuperTypeRefactoringProcessor#createContraintSolver(org.eclipse.wst.jsdt.internal.corext.refactoring.structure.constraints.SuperTypeConstraintsModel)
	 */
	protected final SuperTypeConstraintsSolver createContraintSolver(final SuperTypeConstraintsModel model) {
		return new ExtractInterfaceConstraintsSolver(model, fSuperName);
	}

	/**
	 * Creates a target field declaration.
	 * 
	 * @param sourceRewrite
	 *            the source compilation unit rewrite
	 * @param targetRewrite
	 *            the target rewrite
	 * @param targetDeclaration
	 *            the target type declaration
	 * @param fragment
	 *            the source variable declaration fragment
	 * @throws CoreException
	 *             if a buffer could not be retrieved
	 */
	protected final void createFieldDeclaration(final CompilationUnitRewrite sourceRewrite, final ASTRewrite targetRewrite, final AbstractTypeDeclaration targetDeclaration, final VariableDeclarationFragment fragment) throws CoreException {
		Assert.isNotNull(targetDeclaration);
		Assert.isNotNull(sourceRewrite);
		Assert.isNotNull(targetRewrite);
		Assert.isNotNull(fragment);
		final FieldDeclaration field= (FieldDeclaration) fragment.getParent();
		ImportRewriteUtil.collectImports(fSubType.getJavaScriptProject(), field, fTypeBindings, fStaticBindings, false);
		final ASTRewrite rewrite= ASTRewrite.create(field.getAST());
		final ITrackedNodePosition position= rewrite.track(field);
		final ListRewrite rewriter= rewrite.getListRewrite(field, FieldDeclaration.FRAGMENTS_PROPERTY);
		VariableDeclarationFragment current= null;
		for (final Iterator iterator= field.fragments().iterator(); iterator.hasNext();) {
			current= (VariableDeclarationFragment) iterator.next();
			if (!current.getName().getIdentifier().equals(fragment.getName().getIdentifier()))
				rewriter.remove(current, null);
		}
		final IJavaScriptUnit unit= sourceRewrite.getCu();
		final ITextFileBuffer buffer= RefactoringFileBuffers.acquire(unit);
		try {
			final IDocument document= new Document(buffer.getDocument().get());
			try {
				rewrite.rewriteAST(document, unit.getJavaScriptProject().getOptions(true)).apply(document, TextEdit.UPDATE_REGIONS);
				targetRewrite.getListRewrite(targetDeclaration, targetDeclaration.getBodyDeclarationsProperty()).insertFirst(targetRewrite.createStringPlaceholder(normalizeText(document.get(position.getStartPosition(), position.getLength())), ASTNode.FIELD_DECLARATION), null);
			} catch (MalformedTreeException exception) {
				JavaScriptPlugin.log(exception);
			} catch (BadLocationException exception) {
				JavaScriptPlugin.log(exception);
			}
		} finally {
			RefactoringFileBuffers.release(unit);
		}
	}

	/**
	 * {@inheritDoc}
	 */
	protected final void createMemberDeclarations(final CompilationUnitRewrite sourceRewrite, final ASTRewrite targetRewrite, final AbstractTypeDeclaration targetDeclaration) throws CoreException {
		Assert.isNotNull(sourceRewrite);
		Assert.isNotNull(targetRewrite);
		Assert.isNotNull(targetDeclaration);
		Arrays.sort(fMembers, new Comparator() {

			public final int compare(final Object first, final Object second) {
				Assert.isNotNull(first);
				Assert.isNotNull(second);
				final ISourceReference predecessor= (ISourceReference) first;
				final ISourceReference successor= (ISourceReference) second;
				try {
					return predecessor.getSourceRange().getOffset() - successor.getSourceRange().getOffset();
				} catch (JavaScriptModelException exception) {
					return first.hashCode() - second.hashCode();
				}
			}
		});
		fTypeBindings.clear();
		fStaticBindings.clear();
		if (fMembers.length > 0) {
			IMember member= null;
			for (int index= fMembers.length - 1; index >= 0; index--) {
				member= fMembers[index];
				if (member instanceof IField) {
					createFieldDeclaration(sourceRewrite, targetRewrite, targetDeclaration, ASTNodeSearchUtil.getFieldDeclarationFragmentNode((IField) member, sourceRewrite.getRoot()));
				} else if (member instanceof IFunction) {
					createMethodDeclaration(sourceRewrite, targetRewrite, targetDeclaration, ASTNodeSearchUtil.getMethodDeclarationNode((IFunction) member, sourceRewrite.getRoot()));
				}
			}
		}
	}

	/**
	 * Creates the method comment for the specified declaration.
	 * 
	 * @param sourceRewrite
	 *            the compilation unit rewrite
	 * @param declaration
	 *            the method declaration
	 * @param replacements
	 *            the set of variable binding keys of formal parameters which
	 *            must be replaced
	 * @param javadoc
	 *            <code>true</code> if javadoc comments are processed,
	 *            <code>false</code> otherwise
	 * @throws CoreException
	 *             if an error occurs
	 */
	protected final void createMethodComment(final CompilationUnitRewrite sourceRewrite, final FunctionDeclaration declaration, final Set replacements, final boolean javadoc) throws CoreException {
		Assert.isNotNull(sourceRewrite);
		Assert.isNotNull(declaration);
		Assert.isNotNull(replacements);
		final IFunctionBinding binding= declaration.resolveBinding();
		if (binding != null) {
			IVariableBinding variable= null;
			SingleVariableDeclaration argument= null;
			final IPackageFragment fragment= fSubType.getPackageFragment();
			final String string= fragment.isDefaultPackage() ? fSuperName : fragment.getElementName() + "." + fSuperName; //$NON-NLS-1$
			final ITypeBinding[] bindings= binding.getParameterTypes();
			final String[] names= new String[bindings.length];
			for (int offset= 0; offset < names.length; offset++) {
				argument= (SingleVariableDeclaration) declaration.parameters().get(offset);
				variable= argument.resolveBinding();
				if (variable != null) {
					if (replacements.contains(variable.getKey()))
						names[offset]= string;
					else {
						if (binding.isVarargs() && bindings[offset].isArray() && offset == names.length - 1)
							names[offset]= Bindings.getFullyQualifiedName(bindings[offset].getElementType());
						else
							names[offset]= Bindings.getFullyQualifiedName(bindings[offset]);
					}
				}
			}
			final String comment= CodeGeneration.getMethodComment(fSubType.getJavaScriptUnit(), fSubType.getElementName(), declaration, false, binding.getName(), string, names, StubUtility.getLineDelimiterUsed(fSubType.getJavaScriptProject()));
			if (comment != null) {
				final ASTRewrite rewrite= sourceRewrite.getASTRewrite();
				if (declaration.getJavadoc() != null) {
					rewrite.replace(declaration.getJavadoc(), rewrite.createStringPlaceholder(comment, ASTNode.JSDOC), sourceRewrite.createCategorizedGroupDescription(RefactoringCoreMessages.ExtractInterfaceProcessor_rewrite_comment, SET_EXTRACT_INTERFACE));
				} else if (javadoc) {
					rewrite.set(declaration, FunctionDeclaration.JAVADOC_PROPERTY, rewrite.createStringPlaceholder(comment, ASTNode.JSDOC), sourceRewrite.createCategorizedGroupDescription(RefactoringCoreMessages.ExtractInterfaceProcessor_add_comment, SET_EXTRACT_INTERFACE));
				}
			}
		}
	}

	/**
	 * Creates the method annotations and comments of the extracted methods in
	 * the source type.
	 * 
	 * @param sourceRewrite
	 *            the source compilation unit rewrite
	 * @param replacements
	 *            the set of variable binding keys of formal parameters which
	 *            must be replaced
	 * @throws CoreException
	 *             if an error occurs
	 */
	protected final void createMethodComments(final CompilationUnitRewrite sourceRewrite, final Set replacements) throws CoreException {
		Assert.isNotNull(sourceRewrite);
		Assert.isNotNull(replacements);
		if (fComments && fMembers.length > 0) {
			final IJavaScriptProject project= fSubType.getJavaScriptProject();
			final boolean javadoc= project.getOption(JavaScriptCore.COMPILER_DOC_COMMENT_SUPPORT, true).equals(JavaScriptCore.ENABLED);
			IMember member= null;
			for (int index= 0; index < fMembers.length; index++) {
				member= fMembers[index];
				if (member instanceof IFunction)
					createMethodComment(sourceRewrite, ASTNodeSearchUtil.getMethodDeclarationNode((IFunction) member, sourceRewrite.getRoot()), replacements, javadoc);
			}
		}
	}

	/**
	 * Creates a target method declaration.
	 * 
	 * @param sourceRewrite
	 *            the source compilation unit rewrite
	 * @param targetRewrite
	 *            the target rewrite
	 * @param targetDeclaration
	 *            the target type declaration
	 * @param declaration
	 *            the source method declaration
	 * @throws CoreException
	 *             if a buffer could not be retrieved
	 */
	protected final void createMethodDeclaration(final CompilationUnitRewrite sourceRewrite, final ASTRewrite targetRewrite, final AbstractTypeDeclaration targetDeclaration, final FunctionDeclaration declaration) throws CoreException {
		Assert.isNotNull(targetDeclaration);
		Assert.isNotNull(sourceRewrite);
		Assert.isNotNull(targetRewrite);
		Assert.isNotNull(declaration);
		ImportRewriteUtil.collectImports(fSubType.getJavaScriptProject(), declaration, fTypeBindings, fStaticBindings, true);
		final ASTRewrite rewrite= ASTRewrite.create(declaration.getAST());
		final ITrackedNodePosition position= rewrite.track(declaration);
		if (declaration.getBody() != null)
			rewrite.remove(declaration.getBody(), null);
		final ListRewrite list= rewrite.getListRewrite(declaration, declaration.getModifiersProperty());
		boolean publicFound= false;
		boolean abstractFound= false;
		ITypeBinding binding= null;
		Modifier modifier= null;
		Annotation annotation= null;
		IExtendedModifier extended= null;
		for (final Iterator iterator= declaration.modifiers().iterator(); iterator.hasNext();) {
			extended= (IExtendedModifier) iterator.next();
			if (!extended.isAnnotation()) {
				modifier= (Modifier) extended;
				if (fPublic && modifier.getKeyword().equals(Modifier.ModifierKeyword.PUBLIC_KEYWORD)) {
					publicFound= true;
					continue;
				}
				if (fAbstract && modifier.getKeyword().equals(Modifier.ModifierKeyword.ABSTRACT_KEYWORD)) {
					abstractFound= true;
					continue;
				}
				list.remove(modifier, null);
			} else if (extended.isAnnotation()) {
				annotation= (Annotation) extended;
				binding= annotation.resolveTypeBinding();
				if (binding.getQualifiedName().equals("java.lang.Override")) //$NON-NLS-1$
					list.remove(annotation, null);
			}
		}
		final ModifierRewrite rewriter= ModifierRewrite.create(rewrite, declaration);
		if (fPublic && !publicFound)
			rewriter.setVisibility(Modifier.PUBLIC, null);
		if (fAbstract && !abstractFound)
			rewriter.setModifiers(Modifier.ABSTRACT, 0, null);
		final IJavaScriptUnit unit= sourceRewrite.getCu();
		final ITextFileBuffer buffer= RefactoringFileBuffers.acquire(unit);
		try {
			final IDocument document= new Document(buffer.getDocument().get());
			try {
				rewrite.rewriteAST(document, unit.getJavaScriptProject().getOptions(true)).apply(document, TextEdit.UPDATE_REGIONS);
				targetRewrite.getListRewrite(targetDeclaration, targetDeclaration.getBodyDeclarationsProperty()).insertFirst(targetRewrite.createStringPlaceholder(normalizeText(document.get(position.getStartPosition(), position.getLength())), ASTNode.FUNCTION_DECLARATION), null);
			} catch (MalformedTreeException exception) {
				JavaScriptPlugin.log(exception);
			} catch (BadLocationException exception) {
				JavaScriptPlugin.log(exception);
			}
		} finally {
			RefactoringFileBuffers.release(unit);
		}
	}

	/**
	 * Creates the new signature of the source type.
	 * 
	 * @param rewrite
	 *            the source compilation unit rewrite
	 * @param declaration
	 *            the type declaration
	 * @param status
	 *            the refactoring status
	 * @param monitor
	 *            the progress monitor to use
	 * @throws JavaScriptModelException
	 *             if the type parameters cannot be retrieved
	 */
	protected final void createTypeSignature(final CompilationUnitRewrite rewrite, final AbstractTypeDeclaration declaration, final RefactoringStatus status, final IProgressMonitor monitor) throws JavaScriptModelException {
		Assert.isNotNull(rewrite);
		Assert.isNotNull(declaration);
		Assert.isNotNull(status);
		Assert.isNotNull(monitor);
		try {
			monitor.beginTask("", 1); //$NON-NLS-1$
			monitor.setTaskName(RefactoringCoreMessages.ExtractInterfaceProcessor_creating);
			final AST ast= declaration.getAST();
			final ITypeParameter[] parameters= fSubType.getTypeParameters();
			Type type= ast.newSimpleType(ast.newSimpleName(fSuperName));
			if (parameters.length > 0) {
				final ParameterizedType parameterized= ast.newParameterizedType(type);
				for (int index= 0; index < parameters.length; index++)
					parameterized.typeArguments().add(ast.newSimpleType(ast.newSimpleName(parameters[index].getElementName())));
				type= parameterized;
			}
			final ASTRewrite rewriter= rewrite.getASTRewrite();
			if (declaration instanceof TypeDeclaration)
				rewriter.getListRewrite(declaration, TypeDeclaration.SUPER_INTERFACE_TYPES_PROPERTY).insertLast(type, rewrite.createCategorizedGroupDescription(RefactoringCoreMessages.ExtractInterfaceProcessor_add_super_interface, SET_EXTRACT_INTERFACE));
			else if (declaration instanceof EnumDeclaration)
				rewriter.getListRewrite(declaration, EnumDeclaration.SUPER_INTERFACE_TYPES_PROPERTY).insertLast(type, rewrite.createCategorizedGroupDescription(RefactoringCoreMessages.ExtractInterfaceProcessor_add_super_interface, SET_EXTRACT_INTERFACE));
			monitor.worked(1);
		} finally {
			monitor.done();
		}
	}

	/**
	 * Should extracted methods be declared as abstract?
	 * 
	 * @return <code>true</code> if the should be declared as abstract,
	 *         <code>false</code> otherwise
	 */
	public final boolean getAbstract() {
		return fAbstract;
	}

	/*
	 * @see org.eclipse.ltk.core.refactoring.participants.RefactoringProcessor#getElements()
	 */
	public final Object[] getElements() {
		return new Object[] { fSubType };
	}

	/**
	 * Returns the list of extractable members from the type.
	 * 
	 * @return the list of extractable members
	 * @throws JavaScriptModelException
	 *             if an error occurs
	 */
	public final IMember[] getExtractableMembers() throws JavaScriptModelException {
		final List list= new ArrayList();
		IJavaScriptElement[] children= fSubType.getChildren();
		for (int index= 0; index < children.length; index++) {
			if (children[index] instanceof IMember && isExtractableMember((IMember) children[index]))
				list.add(children[index]);
		}
		final IMember[] members= new IMember[list.size()];
		list.toArray(members);
		return members;
	}

	/**
	 * Returns the extracted fields from the compilation unit.
	 * 
	 * @param unit
	 *            the compilation unit
	 * @return the extracted fields
	 */
	protected final IField[] getExtractedFields(final IJavaScriptUnit unit) {
		Assert.isNotNull(unit);
		final List list= new ArrayList();
		for (int index= 0; index < fMembers.length; index++) {
			if (fMembers[index] instanceof IField) {
				final IJavaScriptElement element= JavaModelUtil.findInCompilationUnit(unit, fMembers[index]);
				if (element instanceof IField)
					list.add(element);
			}
		}
		final IField[] fields= new IField[list.size()];
		list.toArray(fields);
		return fields;
	}

	/**
	 * Returns the extracted methods from the compilation unit.
	 * 
	 * @param unit
	 *            the compilation unit
	 * @return the extracted methods
	 */
	protected final IFunction[] getExtractedMethods(final IJavaScriptUnit unit) {
		Assert.isNotNull(unit);
		final List list= new ArrayList();
		for (int index= 0; index < fMembers.length; index++) {
			if (fMembers[index] instanceof IFunction) {
				final IJavaScriptElement element= JavaModelUtil.findInCompilationUnit(unit, fMembers[index]);
				if (element instanceof IFunction)
					list.add(element);
			}
		}
		final IFunction[] methods= new IFunction[list.size()];
		list.toArray(methods);
		return methods;
	}

	/*
	 * @see org.eclipse.ltk.core.refactoring.participants.RefactoringProcessor#getIdentifier()
	 */
	public final String getIdentifier() {
		return IDENTIFIER;
	}

	/*
	 * @see org.eclipse.ltk.core.refactoring.participants.RefactoringProcessor#getProcessorName()
	 */
	public final String getProcessorName() {
		return RefactoringCoreMessages.ExtractInterfaceProcessor_name;
	}

	/**
	 * Should extracted methods be declared as public?
	 * 
	 * @return <code>true</code> if the should be declared as public,
	 *         <code>false</code> otherwise
	 */
	public final boolean getPublic() {
		return fPublic;
	}

	/**
	 * Returns the type where to extract an interface.
	 * 
	 * @return the type where to extract an interface
	 */
	public final IType getType() {
		return fSubType;
	}

	/**
	 * Returns the new interface name.
	 * 
	 * @return the new interface name
	 */
	public final String getTypeName() {
		return fSuperName;
	}

	/**
	 * {@inheritDoc}
	 */
	public final RefactoringStatus initialize(final RefactoringArguments arguments) {
		if (arguments instanceof JavaRefactoringArguments) {
			final JavaRefactoringArguments extended= (JavaRefactoringArguments) arguments;
			String handle= extended.getAttribute(JDTRefactoringDescriptor.ATTRIBUTE_INPUT);
			if (handle != null) {
				final IJavaScriptElement element= JDTRefactoringDescriptor.handleToElement(extended.getProject(), handle, false);
				if (element == null || !element.exists() || element.getElementType() != IJavaScriptElement.TYPE)
					return ScriptableRefactoring.createInputFatalStatus(element, getRefactoring().getName(), IJavaScriptRefactorings.EXTRACT_INTERFACE);
				else
					fSubType= (IType) element;
			} else
				return RefactoringStatus.createFatalErrorStatus(Messages.format(RefactoringCoreMessages.InitializableRefactoring_argument_not_exist, JDTRefactoringDescriptor.ATTRIBUTE_INPUT));
			final String name= extended.getAttribute(JDTRefactoringDescriptor.ATTRIBUTE_NAME);
			if (name != null) {
				fSuperName= name;
				final RefactoringStatus status= checkTypeName(name);
				if (status.hasError())
					return status;
			} else
				return RefactoringStatus.createFatalErrorStatus(Messages.format(RefactoringCoreMessages.InitializableRefactoring_argument_not_exist, JDTRefactoringDescriptor.ATTRIBUTE_NAME));
			final String deferred= extended.getAttribute(ATTRIBUTE_ABSTRACT);
			if (deferred != null) {
				fAbstract= Boolean.valueOf(deferred).booleanValue();
			} else
				return RefactoringStatus.createFatalErrorStatus(Messages.format(RefactoringCoreMessages.InitializableRefactoring_argument_not_exist, ATTRIBUTE_ABSTRACT));
			final String comment= extended.getAttribute(ATTRIBUTE_COMMENTS);
			if (comment != null) {
				fComments= Boolean.valueOf(comment).booleanValue();
			} else
				return RefactoringStatus.createFatalErrorStatus(Messages.format(RefactoringCoreMessages.InitializableRefactoring_argument_not_exist, ATTRIBUTE_COMMENTS));
			final String instance= extended.getAttribute(ATTRIBUTE_INSTANCEOF);
			if (instance != null) {
				fInstanceOf= Boolean.valueOf(instance).booleanValue();
			} else
				return RefactoringStatus.createFatalErrorStatus(Messages.format(RefactoringCoreMessages.InitializableRefactoring_argument_not_exist, ATTRIBUTE_INSTANCEOF));
			final String visibility= extended.getAttribute(ATTRIBUTE_PUBLIC);
			if (visibility != null) {
				fPublic= Boolean.valueOf(visibility).booleanValue();
			} else
				return RefactoringStatus.createFatalErrorStatus(Messages.format(RefactoringCoreMessages.InitializableRefactoring_argument_not_exist, ATTRIBUTE_PUBLIC));
			final String replace= extended.getAttribute(ATTRIBUTE_REPLACE);
			if (replace != null) {
				fReplace= Boolean.valueOf(replace).booleanValue();
			} else
				return RefactoringStatus.createFatalErrorStatus(Messages.format(RefactoringCoreMessages.InitializableRefactoring_argument_not_exist, ATTRIBUTE_REPLACE));
			int count= 1;
			final List elements= new ArrayList();
			String attribute= JDTRefactoringDescriptor.ATTRIBUTE_ELEMENT + count;
			final RefactoringStatus status= new RefactoringStatus();
			while ((handle= extended.getAttribute(attribute)) != null) {
				final IJavaScriptElement element= JDTRefactoringDescriptor.handleToElement(extended.getProject(), handle, false);
				if (element == null || !element.exists())
					status.merge(ScriptableRefactoring.createInputWarningStatus(element, getRefactoring().getName(), IJavaScriptRefactorings.EXTRACT_INTERFACE));
				else
					elements.add(element);
				count++;
				attribute= JDTRefactoringDescriptor.ATTRIBUTE_ELEMENT + count;
			}
			fMembers= (IMember[]) elements.toArray(new IMember[elements.size()]);
			fSettings= JavaPreferencesSettings.getCodeGenerationSettings(fSubType.getJavaScriptProject());
			if (!status.isOK())
				return status;
		} else
			return RefactoringStatus.createFatalErrorStatus(RefactoringCoreMessages.InitializableRefactoring_inacceptable_arguments);
		return new RefactoringStatus();
	}

	/*
	 * @see org.eclipse.ltk.core.refactoring.participants.RefactoringProcessor#isApplicable()
	 */
	public final boolean isApplicable() throws CoreException {
		return Checks.isAvailable(fSubType) && !fSubType.isBinary() && !fSubType.isReadOnly() && !fSubType.isAnnotation() && !fSubType.isAnonymous();
	}

	/**
	 * Should comments be generated?
	 * 
	 * @return <code>true</code> if comments should be generated,
	 *         <code>false</code> otherwise
	 */
	public final boolean isComments() {
		return fComments;
	}

	/*
	 * @see org.eclipse.ltk.core.refactoring.participants.RefactoringProcessor#loadParticipants(org.eclipse.ltk.core.refactoring.RefactoringStatus,org.eclipse.ltk.core.refactoring.participants.SharableParticipants)
	 */
	public final RefactoringParticipant[] loadParticipants(final RefactoringStatus status, final SharableParticipants sharedParticipants) throws CoreException {
		return new RefactoringParticipant[0];
	}

	/**
	 * Normalizes the indentation of the specified text.
	 * 
	 * @param code
	 *            the text to normalize
	 * @return the normalized text
	 * @throws JavaScriptModelException
	 *             if an error occurs
	 */
	protected final String normalizeText(final String code) throws JavaScriptModelException {
		Assert.isNotNull(code);
		final String[] lines= Strings.convertIntoLines(code);
		final IJavaScriptProject project= fSubType.getJavaScriptProject();
		Strings.trimIndentation(lines, project, false);
		return Strings.concatenate(lines, StubUtility.getLineDelimiterUsed(project));
	}

	/**
	 * Resets the environment.
	 */
	protected void resetEnvironment() {
		fSuperSource= null;
		resetWorkingCopies();
	}

	/**
	 * {@inheritDoc}
	 */
	protected final void rewriteTypeOccurrences(final TextEditBasedChangeManager manager, final ASTRequestor requestor, final CompilationUnitRewrite rewrite, final IJavaScriptUnit unit, final JavaScriptUnit node, final Set replacements, final IProgressMonitor monitor) throws CoreException {
		try {
			monitor.beginTask("", 100); //$NON-NLS-1$
			monitor.setTaskName(RefactoringCoreMessages.ExtractInterfaceProcessor_creating);
			CompilationUnitRewrite currentRewrite= null;
			final boolean isSubUnit= rewrite.getCu().equals(unit.getPrimary());
			if (isSubUnit)
				currentRewrite= rewrite;
			else
				currentRewrite= new CompilationUnitRewrite(unit, node);
			final Collection collection= (Collection) fTypeOccurrences.get(unit);
			if (collection != null && !collection.isEmpty()) {
				final IProgressMonitor subMonitor= new SubProgressMonitor(monitor, 100);
				try {
					subMonitor.beginTask("", collection.size() * 10); //$NON-NLS-1$
					subMonitor.setTaskName(RefactoringCoreMessages.ExtractInterfaceProcessor_creating);
					TType estimate= null;
					ISourceConstraintVariable variable= null;
					ITypeConstraintVariable constraint= null;
					for (final Iterator iterator= collection.iterator(); iterator.hasNext();) {
						variable= (ISourceConstraintVariable) iterator.next();
						if (variable instanceof ITypeConstraintVariable) {
							constraint= (ITypeConstraintVariable) variable;
							estimate= (TType) constraint.getData(SuperTypeConstraintsSolver.DATA_TYPE_ESTIMATE);
							if (estimate != null) {
								final CompilationUnitRange range= constraint.getRange();
								if (isSubUnit)
									rewriteTypeOccurrence(range, estimate, requestor, currentRewrite, node, replacements, currentRewrite.createCategorizedGroupDescription(RefactoringCoreMessages.SuperTypeRefactoringProcessor_update_type_occurrence, SET_SUPER_TYPE));
								else {
									final ASTNode result= NodeFinder.perform(node, range.getSourceRange());
									if (result != null)
										rewriteTypeOccurrence(estimate, currentRewrite, result, currentRewrite.createCategorizedGroupDescription(RefactoringCoreMessages.SuperTypeRefactoringProcessor_update_type_occurrence, SET_SUPER_TYPE));
								}
								subMonitor.worked(10);
							}
						}
					}
				} finally {
					subMonitor.done();
				}
			}
			if (!isSubUnit) {
				final TextChange change= currentRewrite.createChange();
				if (change != null)
					manager.manage(unit, change);
			}
		} finally {
			monitor.done();
		}
	}

	/**
	 * Creates the necessary text edits to replace the subtype occurrences by a
	 * supertype.
	 * 
	 * @param manager
	 *            the text change manager
	 * @param sourceRewrite
	 *            the compilation unit of the subtype (not in working copy mode)
	 * @param superUnit
	 *            the compilation unit of the supertype (in working copy mode)
	 * @param replacements
	 *            the set of variable binding keys of formal parameters which
	 *            must be replaced
	 * @param status
	 *            the refactoring status
	 * @param monitor
	 *            the progress monitor to display progress
	 * @throws CoreException
	 *             if an error occurs
	 */
	protected final void rewriteTypeOccurrences(final TextEditBasedChangeManager manager, final CompilationUnitRewrite sourceRewrite, final IJavaScriptUnit superUnit, final Set replacements, final RefactoringStatus status, final IProgressMonitor monitor) throws CoreException {
		Assert.isNotNull(manager);
		Assert.isNotNull(sourceRewrite);
		Assert.isNotNull(superUnit);
		Assert.isNotNull(replacements);
		Assert.isNotNull(status);
		Assert.isNotNull(monitor);
		try {
			monitor.beginTask("", 300); //$NON-NLS-1$
			monitor.setTaskName(RefactoringCoreMessages.ExtractInterfaceProcessor_creating);
			final IJavaScriptUnit subUnit= getSharedWorkingCopy(fSubType.getJavaScriptUnit().getPrimary(), new SubProgressMonitor(monitor, 20));
			final ITextFileBuffer buffer= RefactoringFileBuffers.acquire(fSubType.getJavaScriptUnit());
			final ASTRewrite rewrite= sourceRewrite.getASTRewrite();
			try {
				final IDocument document= new Document(buffer.getDocument().get());
				try {
					rewrite.rewriteAST(document, fSubType.getJavaScriptProject().getOptions(true)).apply(document, TextEdit.UPDATE_REGIONS);
				} catch (MalformedTreeException exception) {
					JavaScriptPlugin.log(exception);
				} catch (BadLocationException exception) {
					JavaScriptPlugin.log(exception);
				}
				subUnit.getBuffer().setContents(document.get());
			} finally {
				RefactoringFileBuffers.release(fSubType.getJavaScriptUnit());
			}
			JavaModelUtil.reconcile(subUnit);
			final IJavaScriptProject project= subUnit.getJavaScriptProject();
			final ASTParser parser= ASTParser.newParser(AST.JLS3);
			parser.setWorkingCopyOwner(fOwner);
			parser.setResolveBindings(true);
			parser.setProject(project);
			parser.setCompilerOptions(RefactoringASTParser.getCompilerOptions(project));
			parser.createASTs(new IJavaScriptUnit[] { subUnit}, new String[0], new ASTRequestor() {

				public final void acceptAST(final IJavaScriptUnit unit, final JavaScriptUnit node) {
					try {
						final IType subType= (IType) JavaModelUtil.findInCompilationUnit(unit, fSubType);
						final AbstractTypeDeclaration subDeclaration= ASTNodeSearchUtil.getAbstractTypeDeclarationNode(subType, node);
						if (subDeclaration != null) {
							final ITypeBinding subBinding= subDeclaration.resolveBinding();
							if (subBinding != null) {
								String name= null;
								ITypeBinding superBinding= null;
								final ITypeBinding[] superBindings= subBinding.getInterfaces();
								for (int index= 0; index < superBindings.length; index++) {
									name= superBindings[index].getName();
									if (name.startsWith(fSuperName) && superBindings[index].getTypeArguments().length == subBinding.getTypeParameters().length)
										superBinding= superBindings[index];
								}
								if (superBinding != null) {
									solveSuperTypeConstraints(unit, node, subType, subBinding, superBinding, new SubProgressMonitor(monitor, 80), status);
									if (!status.hasFatalError()) {
										rewriteTypeOccurrences(manager, this, sourceRewrite, unit, node, replacements, status, new SubProgressMonitor(monitor, 200));
										if (manager.containsChangesIn(superUnit)) {
											final TextEditBasedChange change= manager.get(superUnit);
											if (change instanceof TextChange) {
												final TextEdit edit= ((TextChange) change).getEdit();
												if (edit != null) {
													final IDocument document= new Document(superUnit.getBuffer().getContents());
													try {
														edit.apply(document, TextEdit.UPDATE_REGIONS);
													} catch (MalformedTreeException exception) {
														JavaScriptPlugin.log(exception);
														status.merge(RefactoringStatus.createFatalErrorStatus(RefactoringCoreMessages.ExtractInterfaceProcessor_internal_error));
													} catch (BadLocationException exception) {
														JavaScriptPlugin.log(exception);
														status.merge(RefactoringStatus.createFatalErrorStatus(RefactoringCoreMessages.ExtractInterfaceProcessor_internal_error));
													}
													fSuperSource= document.get();
													manager.remove(superUnit);
												}
											}
										}
									}
								}
							}
						}
					} catch (JavaScriptModelException exception) {
						JavaScriptPlugin.log(exception);
						status.merge(RefactoringStatus.createFatalErrorStatus(RefactoringCoreMessages.ExtractInterfaceProcessor_internal_error));
					}
				}

				public final void acceptBinding(final String key, final IBinding binding) {
					// Do nothing
				}
			}, new NullProgressMonitor());
		} finally {
			monitor.done();
		}
	}

	/**
	 * Determines whether extracted methods should be declared as abstract.
	 * 
	 * @param declare
	 *            <code>true</code> to declare them public, <code>false</code>
	 *            otherwise
	 */
	public final void setAbstract(final boolean declare) {
		fAbstract= declare;
	}

	/**
	 * Determines whether comments should be generated.
	 * 
	 * @param comments
	 *            <code>true</code> to generate comments, <code>false</code>
	 *            otherwise
	 */
	public final void setComments(final boolean comments) {
		fComments= comments;
	}

	/**
	 * Sets the members to be extracted.
	 * 
	 * @param members
	 *            the members to be extracted
	 * @throws JavaScriptModelException
	 *             if an error occurs
	 */
	public final void setExtractedMembers(final IMember[] members) throws JavaScriptModelException {
		fMembers= members;
	}

	/**
	 * Determines whether extracted methods should be declared as public.
	 * 
	 * @param declare
	 *            <code>true</code> to declare them public, <code>false</code>
	 *            otherwise
	 */
	public final void setPublic(final boolean declare) {
		fPublic= declare;
	}

	/**
	 * Sets the new interface name.
	 * 
	 * @param name
	 *            the new interface name
	 */
	public final void setTypeName(final String name) {
		Assert.isNotNull(name);
		fSuperName= name;
	}
}
