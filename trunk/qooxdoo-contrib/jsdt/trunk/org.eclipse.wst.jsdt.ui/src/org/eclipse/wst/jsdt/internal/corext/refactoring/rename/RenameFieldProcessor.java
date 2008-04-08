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
package org.eclipse.wst.jsdt.internal.corext.refactoring.rename;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.runtime.Assert;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.core.runtime.SubProgressMonitor;
import org.eclipse.ltk.core.refactoring.Change;
import org.eclipse.ltk.core.refactoring.GroupCategorySet;
import org.eclipse.ltk.core.refactoring.RefactoringDescriptor;
import org.eclipse.ltk.core.refactoring.RefactoringStatus;
import org.eclipse.ltk.core.refactoring.TextChange;
import org.eclipse.ltk.core.refactoring.participants.CheckConditionsContext;
import org.eclipse.ltk.core.refactoring.participants.RefactoringArguments;
import org.eclipse.ltk.core.refactoring.participants.RenameArguments;
import org.eclipse.text.edits.ReplaceEdit;
import org.eclipse.text.edits.TextEdit;
import org.eclipse.wst.jsdt.core.Flags;
import org.eclipse.wst.jsdt.core.ICompilationUnit;
import org.eclipse.wst.jsdt.core.IField;
import org.eclipse.wst.jsdt.core.IJavaElement;
import org.eclipse.wst.jsdt.core.IJavaProject;
import org.eclipse.wst.jsdt.core.IMethod;
import org.eclipse.wst.jsdt.core.ISourceRange;
import org.eclipse.wst.jsdt.core.IType;
import org.eclipse.wst.jsdt.core.ITypeHierarchy;
import org.eclipse.wst.jsdt.core.JavaModelException;
import org.eclipse.wst.jsdt.core.WorkingCopyOwner;
import org.eclipse.wst.jsdt.core.dom.FieldDeclaration;
import org.eclipse.wst.jsdt.core.dom.MethodDeclaration;
import org.eclipse.wst.jsdt.core.dom.VariableDeclarationFragment;
import org.eclipse.wst.jsdt.core.refactoring.IJavaRefactorings;
import org.eclipse.wst.jsdt.core.refactoring.descriptors.JavaRefactoringDescriptor;
import org.eclipse.wst.jsdt.core.refactoring.descriptors.RenameJavaElementDescriptor;
import org.eclipse.wst.jsdt.core.search.IJavaSearchConstants;
import org.eclipse.wst.jsdt.core.search.IJavaSearchScope;
import org.eclipse.wst.jsdt.core.search.SearchEngine;
import org.eclipse.wst.jsdt.core.search.SearchMatch;
import org.eclipse.wst.jsdt.core.search.SearchPattern;
import org.eclipse.wst.jsdt.internal.corext.codemanipulation.GetterSetterUtil;
import org.eclipse.wst.jsdt.internal.corext.refactoring.Checks;
import org.eclipse.wst.jsdt.internal.corext.refactoring.CollectingSearchRequestor;
import org.eclipse.wst.jsdt.internal.corext.refactoring.JDTRefactoringDescriptor;
import org.eclipse.wst.jsdt.internal.corext.refactoring.JDTRefactoringDescriptorComment;
import org.eclipse.wst.jsdt.internal.corext.refactoring.JavaRefactoringArguments;
import org.eclipse.wst.jsdt.internal.corext.refactoring.RefactoringAvailabilityTester;
import org.eclipse.wst.jsdt.internal.corext.refactoring.RefactoringCoreMessages;
import org.eclipse.wst.jsdt.internal.corext.refactoring.RefactoringScopeFactory;
import org.eclipse.wst.jsdt.internal.corext.refactoring.RefactoringSearchEngine;
import org.eclipse.wst.jsdt.internal.corext.refactoring.SearchResultGroup;
import org.eclipse.wst.jsdt.internal.corext.refactoring.base.JavaStatusContext;
import org.eclipse.wst.jsdt.internal.corext.refactoring.changes.CompilationUnitChange;
import org.eclipse.wst.jsdt.internal.corext.refactoring.changes.DynamicValidationRefactoringChange;
import org.eclipse.wst.jsdt.internal.corext.refactoring.changes.TextChangeCompatibility;
import org.eclipse.wst.jsdt.internal.corext.refactoring.code.ScriptableRefactoring;
import org.eclipse.wst.jsdt.internal.corext.refactoring.delegates.DelegateCreator;
import org.eclipse.wst.jsdt.internal.corext.refactoring.delegates.DelegateFieldCreator;
import org.eclipse.wst.jsdt.internal.corext.refactoring.delegates.DelegateMethodCreator;
import org.eclipse.wst.jsdt.internal.corext.refactoring.participants.JavaProcessors;
import org.eclipse.wst.jsdt.internal.corext.refactoring.structure.ASTNodeSearchUtil;
import org.eclipse.wst.jsdt.internal.corext.refactoring.structure.CompilationUnitRewrite;
import org.eclipse.wst.jsdt.internal.corext.refactoring.tagging.IDelegateUpdating;
import org.eclipse.wst.jsdt.internal.corext.refactoring.tagging.IReferenceUpdating;
import org.eclipse.wst.jsdt.internal.corext.refactoring.tagging.ITextUpdating;
import org.eclipse.wst.jsdt.internal.corext.refactoring.util.JavaElementUtil;
import org.eclipse.wst.jsdt.internal.corext.refactoring.util.ResourceUtil;
import org.eclipse.wst.jsdt.internal.corext.refactoring.util.TextChangeManager;
import org.eclipse.wst.jsdt.internal.corext.util.JavaModelUtil;
import org.eclipse.wst.jsdt.internal.corext.util.JdtFlags;
import org.eclipse.wst.jsdt.internal.corext.util.Messages;
import org.eclipse.wst.jsdt.internal.corext.util.SearchUtils;
import org.eclipse.wst.jsdt.internal.ui.JavaPlugin;
import org.eclipse.wst.jsdt.internal.ui.refactoring.RefactoringSaveHelper;
import org.eclipse.wst.jsdt.ui.JavaElementLabels;

public class RenameFieldProcessor extends JavaRenameProcessor implements IReferenceUpdating, ITextUpdating, IDelegateUpdating {

	protected static final String ATTRIBUTE_TEXTUAL_MATCHES= "textual"; //$NON-NLS-1$
	private static final String ATTRIBUTE_RENAME_GETTER= "getter"; //$NON-NLS-1$
	private static final String ATTRIBUTE_RENAME_SETTER= "setter"; //$NON-NLS-1$
	private static final String ATTRIBUTE_DELEGATE= "delegate"; //$NON-NLS-1$
	private static final String ATTRIBUTE_DEPRECATE= "deprecate"; //$NON-NLS-1$

	protected IField fField;
	private SearchResultGroup[] fReferences;
	private TextChangeManager fChangeManager;
	protected boolean fUpdateReferences;
	protected boolean fUpdateTextualMatches;
	private boolean fRenameGetter;
	private boolean fRenameSetter;
	private boolean fIsComposite;
	private GroupCategorySet fCategorySet;
	private boolean fDelegateUpdating;
	private boolean fDelegateDeprecation;

	public static final String IDENTIFIER= "org.eclipse.wst.jsdt.ui.renameFieldProcessor"; //$NON-NLS-1$

	/**
	 * Creates a new rename field processor.
	 * @param field the field, or <code>null</code> if invoked by scripting
	 */
	public RenameFieldProcessor(IField field) {
		this(field, new TextChangeManager(true), null);
		fIsComposite= false;
	}
	
	/**
	 * Creates a new rename field processor.
	 * <p>
	 * This constructor is only used by <code>RenameTypeProcessor</code>.
	 * </p>
	 * @param field the field
	 * @param manager the change manager
	 * @param categorySet the group category set
	 */
	RenameFieldProcessor(IField field, TextChangeManager manager, GroupCategorySet categorySet) {
		initialize(field);
		fChangeManager= manager;
		fCategorySet= categorySet;
		fDelegateUpdating= false;
		fDelegateDeprecation= true;
		fIsComposite= true;
	}

	private void initialize(IField field) {
		fField= field;
		if (fField != null)
			setNewElementName(fField.getElementName());
		fUpdateReferences= true;
		fUpdateTextualMatches= false;
		
		fRenameGetter= false;
		fRenameSetter= false;
	}

	public String getIdentifier() {
		return IDENTIFIER;
	}
	
	public boolean isApplicable() throws CoreException {
		return RefactoringAvailabilityTester.isRenameFieldAvailable(fField);
	}
	
	public String getProcessorName() {
		return RefactoringCoreMessages.RenameFieldRefactoring_name;
	}
	
	protected String[] getAffectedProjectNatures() throws CoreException {
		return JavaProcessors.computeAffectedNatures(fField);
	}

	public IField getField() {
		return fField;
	}

	public Object[] getElements() {
		return new Object[] { fField};
	}
	
	protected RenameModifications computeRenameModifications() throws CoreException {
		RenameModifications result= new RenameModifications();
		result.rename(fField, new RenameArguments(getNewElementName(), getUpdateReferences()));
		if (fRenameGetter) {
			IMethod getter= getGetter();
			if (getter != null) {
				result.rename(getter, new RenameArguments(getNewGetterName(), getUpdateReferences()));
			}
		}
		if (fRenameSetter) {
			IMethod setter= getSetter();
			if (setter != null) {
				result.rename(setter, new RenameArguments(getNewSetterName(), getUpdateReferences()));
			}
		}
		return result;
	}
	
	protected IFile[] getChangedFiles() {
		return ResourceUtil.getFiles(fChangeManager.getAllCompilationUnits());
	}
	
	//---- IRenameProcessor -------------------------------------
	
	public final String getCurrentElementName(){
		return fField.getElementName();
	}
	
	public final String getCurrentElementQualifier(){
		return JavaModelUtil.getFullyQualifiedName(fField.getDeclaringType());
	}
	
	public RefactoringStatus checkNewElementName(String newName) throws CoreException {
		Assert.isNotNull(newName, "new name"); //$NON-NLS-1$
		RefactoringStatus result= Checks.checkFieldName(newName);

		if (isInstanceField(fField) && (!Checks.startsWithLowerCase(newName)))
			result.addWarning(fIsComposite
					? Messages.format(RefactoringCoreMessages.RenameFieldRefactoring_should_start_lowercase2, new String[] { newName, fField.getDeclaringType().getElementName() })
					: RefactoringCoreMessages.RenameFieldRefactoring_should_start_lowercase);

		if (Checks.isAlreadyNamed(fField, newName))
			result.addError(fIsComposite
					? Messages.format(RefactoringCoreMessages.RenameFieldRefactoring_another_name2, new String[] { newName, fField.getDeclaringType().getElementName() })
					: RefactoringCoreMessages.RenameFieldRefactoring_another_name,
					JavaStatusContext.create(fField));
		
		boolean exists = (fField.getDeclaringType()!=null) ?
				fField.getDeclaringType().getField(newName).exists() :
				fField.getCompilationUnit().getField(newName).exists() ;
		if (exists)
			result.addError(fIsComposite 
					? Messages.format(RefactoringCoreMessages.RenameFieldRefactoring_field_already_defined2, new String[] { newName, fField.getDeclaringType().getElementName() }) 
					: RefactoringCoreMessages.RenameFieldRefactoring_field_already_defined,
					JavaStatusContext.create(fField.getDeclaringType().getField(newName)));
		return result;
	}
	
	public Object getNewElement() {
		return (fField.getDeclaringType()!=null) ?
		 fField.getDeclaringType().getField(getNewElementName()):
		 fField.getCompilationUnit().getField(getNewElementName());
	}
	
	//---- ITextUpdating2 ---------------------------------------------
	
	public boolean canEnableTextUpdating() {
		return true;
	}
	
	public boolean getUpdateTextualMatches() {
		return fUpdateTextualMatches;
	}
	
	public void setUpdateTextualMatches(boolean update) {
		fUpdateTextualMatches= update;
	}
	
	//---- IReferenceUpdating -----------------------------------

	public boolean canEnableUpdateReferences() {
		return true;
	}

	public void setUpdateReferences(boolean update) {
		fUpdateReferences= update;
	}
	
	public boolean getUpdateReferences(){
		return fUpdateReferences;
	}
		
	//-- getter/setter --------------------------------------------------
	
	/**
	 * @return Error message or <code>null</code> if getter can be renamed.
	 * @throws CoreException 
	 */
	public String canEnableGetterRenaming() throws CoreException{
		if (fField.getDeclaringType()!=null && fField.getDeclaringType().isInterface())
			return getGetter() == null ? "": null; //$NON-NLS-1$
			
		IMethod getter= getGetter();
		if (getter == null) 
			return ""; //$NON-NLS-1$
		final NullProgressMonitor monitor= new NullProgressMonitor();
		if (MethodChecks.isVirtual(getter)) {
			final ITypeHierarchy hierarchy= getter.getDeclaringType().newTypeHierarchy(monitor);
			if (MethodChecks.isDeclaredInInterface(getter, hierarchy, monitor) != null || MethodChecks.overridesAnotherMethod(getter, hierarchy) != null)
				return RefactoringCoreMessages.RenameFieldRefactoring_declared_in_supertype;
		}
		return null;	
	}
	
	/**
	 * @return Error message or <code>null</code> if setter can be renamed.
	 * @throws CoreException 
	 */
	public String canEnableSetterRenaming() throws CoreException{
		if (fField.getDeclaringType()!=null && fField.getDeclaringType().isInterface())
			return getSetter() == null ? "": null; //$NON-NLS-1$
			
		IMethod setter= getSetter();
		if (setter == null) 
			return "";	 //$NON-NLS-1$
		final NullProgressMonitor monitor= new NullProgressMonitor();
		if (MethodChecks.isVirtual(setter)) {
			final ITypeHierarchy hierarchy= setter.getDeclaringType().newTypeHierarchy(monitor);
			if (MethodChecks.isDeclaredInInterface(setter, hierarchy, monitor) != null || MethodChecks.overridesAnotherMethod(setter, hierarchy) != null)
				return RefactoringCoreMessages.RenameFieldRefactoring_declared_in_supertype;
		}
		return null;	
	}
	
	public boolean getRenameGetter() {
		return fRenameGetter;
	}

	public void setRenameGetter(boolean renameGetter) {
		fRenameGetter= renameGetter;
	}

	public boolean getRenameSetter() {
		return fRenameSetter;
	}

	public void setRenameSetter(boolean renameSetter) {
		fRenameSetter= renameSetter;
	}
	
	public IMethod getGetter() throws CoreException {
		return GetterSetterUtil.getGetter(fField);
	}
	
	public IMethod getSetter() throws CoreException {
		return GetterSetterUtil.getSetter(fField);
	}

	public String getNewGetterName() throws CoreException {
		IMethod primaryGetterCandidate= JavaModelUtil.findMethod(GetterSetterUtil.getGetterName(fField, new String[0]), new String[0], false, fField.getDeclaringType());
		if (! JavaModelUtil.isBoolean(fField) || (primaryGetterCandidate != null && primaryGetterCandidate.exists()))
			return GetterSetterUtil.getGetterName(fField.getJavaProject(), getNewElementName(), fField.getFlags(), JavaModelUtil.isBoolean(fField), null);
		//bug 30906 describes why we need to look for other alternatives here	
		return GetterSetterUtil.getGetterName(fField.getJavaProject(), getNewElementName(), fField.getFlags(), false, null);
	}

	public String getNewSetterName() throws CoreException {
		return GetterSetterUtil.getSetterName(fField.getJavaProject(), getNewElementName(), fField.getFlags(), JavaModelUtil.isBoolean(fField), null);
	}
	
	// ------------------- IDelegateUpdating ----------------------

	public boolean canEnableDelegateUpdating() {
		return (getDelegateCount() > 0);
	}

	public boolean getDelegateUpdating() {
		return fDelegateUpdating;
	}

	public void setDelegateUpdating(boolean update) {
		fDelegateUpdating= update;
	}

	public void setDeprecateDelegates(boolean deprecate) {
		fDelegateDeprecation= deprecate;
	}

	public boolean getDeprecateDelegates() {
		return fDelegateDeprecation;
	}

	/**
	 * Returns the maximum number of delegates which can
	 * be created for the input elements of this refactoring.
	 * 
	 * @return maximum number of delegates
	 */
	public int getDelegateCount() {
		int count= 0;
		try {
			if (RefactoringAvailabilityTester.isDelegateCreationAvailable(getField()))
				count++;
			if (fRenameGetter && getGetter() != null)
				count++;
			if (fRenameSetter && getSetter() != null)
				count++;
		} catch (CoreException e) {
			// no-op
		}
		return count;
	}

	public int getSaveMode() {
		return RefactoringSaveHelper.SAVE_NON_JAVA_UPDATES;
	}
	
	public RefactoringStatus checkInitialConditions(IProgressMonitor pm) throws CoreException {
		IField primary= (IField) fField.getPrimaryElement();
		if (primary == null || !primary.exists()) {
			String message= Messages.format(RefactoringCoreMessages.RenameFieldRefactoring_deleted, fField.getCompilationUnit().getElementName());
			return RefactoringStatus.createFatalErrorStatus(message);
		}
		fField= primary;

		return Checks.checkIfCuBroken(fField);
	}

	protected RefactoringStatus doCheckFinalConditions(IProgressMonitor pm, CheckConditionsContext context) throws CoreException {
		try{
			pm.beginTask("", 18); //$NON-NLS-1$
			pm.setTaskName(RefactoringCoreMessages.RenameFieldRefactoring_checking); 
			RefactoringStatus result= new RefactoringStatus();
			result.merge(Checks.checkIfCuBroken(fField));
			if (result.hasFatalError())
				return result;
			result.merge(checkNewElementName(getNewElementName()));
			pm.worked(1);
			result.merge(checkEnclosingHierarchy());
			pm.worked(1);
			result.merge(checkNestedHierarchy(fField.getDeclaringType()));
			pm.worked(1);
			
			if (fUpdateReferences){
				pm.setTaskName(RefactoringCoreMessages.RenameFieldRefactoring_searching);	 
				fReferences= getReferences(new SubProgressMonitor(pm, 3), result);
				pm.setTaskName(RefactoringCoreMessages.RenameFieldRefactoring_checking); 
			} else {
				fReferences= new SearchResultGroup[0];
				pm.worked(3);
			}	
			
			if (fUpdateReferences)
				result.merge(analyzeAffectedCompilationUnits());
			else
				Checks.checkCompileErrorsInAffectedFile(result, fField.getResource());
				
			if (getGetter() != null && fRenameGetter){
				result.merge(checkAccessor(new SubProgressMonitor(pm, 1), getGetter(), getNewGetterName()));
				result.merge(Checks.checkIfConstructorName(getGetter(), getNewGetterName(), fField.getDeclaringType().getElementName()));
			} else {
				pm.worked(1);
			}
				
			if (getSetter() != null && fRenameSetter){
				result.merge(checkAccessor(new SubProgressMonitor(pm, 1), getSetter(), getNewSetterName()));
				result.merge(Checks.checkIfConstructorName(getSetter(), getNewSetterName(), fField.getDeclaringType().getElementName()));
			} else {
				pm.worked(1);
			}
			
			result.merge(createChanges(new SubProgressMonitor(pm, 10)));
			if (result.hasFatalError())
				return result;
			
			return result;
		} finally{
			pm.done();
		}
	}
	
	//----------
	private RefactoringStatus checkAccessor(IProgressMonitor pm, IMethod existingAccessor, String newAccessorName) throws CoreException{
		RefactoringStatus result= new RefactoringStatus();
		result.merge(checkAccessorDeclarations(pm, existingAccessor));
		result.merge(checkNewAccessor(existingAccessor, newAccessorName));
		return result;
	}
	
	private RefactoringStatus checkNewAccessor(IMethod existingAccessor, String newAccessorName) throws CoreException{
		RefactoringStatus result= new RefactoringStatus();
		IMethod accessor= JavaModelUtil.findMethod(newAccessorName, existingAccessor.getParameterTypes(), false, fField.getDeclaringType());
		if (accessor == null || !accessor.exists())
			return null;
	
		String message= Messages.format(RefactoringCoreMessages.RenameFieldRefactoring_already_exists, 
				new String[]{JavaElementUtil.createMethodSignature(accessor), JavaModelUtil.getFullyQualifiedName(fField.getDeclaringType())});
		result.addError(message, JavaStatusContext.create(accessor));
		return result;
	}
	
	private RefactoringStatus checkAccessorDeclarations(IProgressMonitor pm, IMethod existingAccessor) throws CoreException{
		RefactoringStatus result= new RefactoringStatus();
		SearchPattern pattern= SearchPattern.createPattern(existingAccessor, IJavaSearchConstants.DECLARATIONS, SearchUtils.GENERICS_AGNOSTIC_MATCH_RULE);
		IJavaSearchScope scope= SearchEngine.createHierarchyScope(fField.getDeclaringType());
		SearchResultGroup[] groupDeclarations= RefactoringSearchEngine.search(pattern, scope, pm, result);
		Assert.isTrue(groupDeclarations.length > 0);
		if (groupDeclarations.length != 1){
			String message= Messages.format(RefactoringCoreMessages.RenameFieldRefactoring_overridden, 
								JavaElementUtil.createMethodSignature(existingAccessor));
			result.addError(message);
		} else {
			SearchResultGroup group= groupDeclarations[0];
			Assert.isTrue(group.getSearchResults().length > 0);
			if (group.getSearchResults().length != 1){
				String message= Messages.format(RefactoringCoreMessages.RenameFieldRefactoring_overridden_or_overrides, 
									JavaElementUtil.createMethodSignature(existingAccessor));
				result.addError(message);
			}	
		}	
		return result;
	}
	
	private static boolean isInstanceField(IField field) throws CoreException{
		if (JavaModelUtil.isInterfaceOrAnnotation(field.getDeclaringType()))
			return false;
		else 
			return ! JdtFlags.isStatic(field);
	}
	
	private RefactoringStatus checkNestedHierarchy(IType type) throws CoreException {
		if (type==null)
			return null;
		IType[] nestedTypes= type.getTypes();
		if (nestedTypes == null)
			return null;
		RefactoringStatus result= new RefactoringStatus();	
		for (int i= 0; i < nestedTypes.length; i++){
			IField otherField= nestedTypes[i].getField(getNewElementName());
			if (otherField.exists()){
				String msg= Messages.format(
					RefactoringCoreMessages.RenameFieldRefactoring_hiding, 
					new String[]{fField.getElementName(), getNewElementName(), JavaModelUtil.getFullyQualifiedName(nestedTypes[i])});
				result.addWarning(msg, JavaStatusContext.create(otherField));
			}									
			result.merge(checkNestedHierarchy(nestedTypes[i]));	
		}	
		return result;
	}
	
	private RefactoringStatus checkEnclosingHierarchy() {
		IType current= fField.getDeclaringType();
		if (current==null || Checks.isTopLevel(current))
			return null;
		RefactoringStatus result= new RefactoringStatus();
		while (current != null){
			IField otherField= current.getField(getNewElementName());
			if (otherField.exists()){
				String msg= Messages.format(RefactoringCoreMessages.RenameFieldRefactoring_hiding2, 
				 															new String[]{getNewElementName(), JavaModelUtil.getFullyQualifiedName(current), otherField.getElementName()});
				result.addWarning(msg, JavaStatusContext.create(otherField));
			}									
			current= current.getDeclaringType();
		}
		return result;
	}
	
	/*
	 * (non java-doc)
	 * Analyzes all compilation units in which type is referenced
	 */
	private RefactoringStatus analyzeAffectedCompilationUnits() throws CoreException{
		RefactoringStatus result= new RefactoringStatus();
		fReferences= Checks.excludeCompilationUnits(fReferences, result);
		if (result.hasFatalError())
			return result;
		
		result.merge(Checks.checkCompileErrorsInAffectedFiles(fReferences));	
		return result;
	}
	
	private SearchPattern createSearchPattern(){
		return SearchPattern.createPattern(fField, IJavaSearchConstants.REFERENCES);
	}
	
	private IJavaSearchScope createRefactoringScope() throws CoreException{
		return RefactoringScopeFactory.create(fField);
	}
	
	private SearchResultGroup[] getReferences(IProgressMonitor pm, RefactoringStatus status) throws CoreException{
		return RefactoringSearchEngine.search(createSearchPattern(), createRefactoringScope(), pm, status);
	}

	public Change createChange(IProgressMonitor monitor) throws CoreException {
		try {
			monitor.beginTask(RefactoringCoreMessages.RenameFieldRefactoring_checking, 1);
			final TextChange[] changes= fChangeManager.getAllChanges();
			final List list= new ArrayList(changes.length);
			list.addAll(Arrays.asList(changes));
			String project= null;
			IJavaProject javaProject= fField.getJavaProject();
			if (javaProject != null)
				project= javaProject.getElementName();
			int flags= JavaRefactoringDescriptor.JAR_MIGRATION | JavaRefactoringDescriptor.JAR_REFACTORING | RefactoringDescriptor.STRUCTURAL_CHANGE;
			try {
				if (!Flags.isPrivate(fField.getFlags()))
					flags|= RefactoringDescriptor.MULTI_CHANGE;
			} catch (JavaModelException exception) {
				JavaPlugin.log(exception);
			}
			final IType declaring= fField.getDeclaringType();
			try {
				if ( declaring!=null && (declaring.isAnonymous() || declaring.isLocal()))
					flags|= JavaRefactoringDescriptor.JAR_SOURCE_ATTACHMENT;
			} catch (JavaModelException exception) {
				JavaPlugin.log(exception);
			}
			final String description= Messages.format(RefactoringCoreMessages.RenameFieldRefactoring_descriptor_description_short, fField.getElementName());
			final String header= Messages.format(RefactoringCoreMessages.RenameFieldProcessor_descriptor_description, new String[] { fField.getElementName(), JavaElementLabels.getElementLabel(fField.getParent(), JavaElementLabels.ALL_FULLY_QUALIFIED), getNewElementName()});
			final JDTRefactoringDescriptorComment comment= new JDTRefactoringDescriptorComment(project, this, header);
			if (fRenameGetter)
				comment.addSetting(RefactoringCoreMessages.RenameFieldRefactoring_setting_rename_getter);
			if (fRenameSetter)
				comment.addSetting(RefactoringCoreMessages.RenameFieldRefactoring_setting_rename_settter);
			final RenameJavaElementDescriptor descriptor= new RenameJavaElementDescriptor(IJavaRefactorings.RENAME_FIELD);
			descriptor.setProject(project);
			descriptor.setDescription(description);
			descriptor.setComment(comment.asString());
			descriptor.setFlags(flags);
			descriptor.setJavaElement(fField);
			descriptor.setNewName(getNewElementName());
			descriptor.setUpdateReferences(fUpdateReferences);
			descriptor.setUpdateTextualOccurrences(fUpdateTextualMatches);
			descriptor.setRenameGetters(fRenameGetter);
			descriptor.setRenameSetters(fRenameSetter);
			descriptor.setKeepOriginal(fDelegateUpdating);
			descriptor.setDeprecateDelegate(fDelegateDeprecation);
			return new DynamicValidationRefactoringChange(descriptor, RefactoringCoreMessages.RenameFieldRefactoring_change_name, (Change[]) list.toArray(new Change[list.size()]));
		} finally {
			monitor.done();
		}
	}

	private RefactoringStatus createChanges(IProgressMonitor pm) throws CoreException {
		pm.beginTask(RefactoringCoreMessages.RenameFieldRefactoring_checking, 10); 
		RefactoringStatus result= new RefactoringStatus();
		if (!fIsComposite)
			fChangeManager.clear();

		// Delegate creation requires ASTRewrite which
		// creates a new change -> do this first.
		if (fDelegateUpdating)
			result.merge(addDelegates());
		
		addDeclarationUpdate();
		
		if (fUpdateReferences) {
			addReferenceUpdates(new SubProgressMonitor(pm, 1));
			result.merge(analyzeRenameChanges(new SubProgressMonitor(pm, 2)));
			if (result.hasFatalError())
				return result;
		} else {
			pm.worked(3);
		}
		
		if (getGetter() != null && fRenameGetter) {
			addGetterOccurrences(new SubProgressMonitor(pm, 1), result);
		} else {
			pm.worked(1);
		}
					
		if (getSetter() != null && fRenameSetter) {
			addSetterOccurrences(new SubProgressMonitor(pm, 1), result);
		} else {
			pm.worked(1);
		}

		if (fUpdateTextualMatches) {
			addTextMatches(new SubProgressMonitor(pm, 5));
		} else {
			pm.worked(5);
		}
		pm.done();
		return result;
	}

	private void addDeclarationUpdate() throws CoreException { 
		ISourceRange nameRange= fField.getNameRange();
		TextEdit textEdit= new ReplaceEdit(nameRange.getOffset(), nameRange.getLength(), getNewElementName());
		ICompilationUnit cu= fField.getCompilationUnit();
		String groupName= RefactoringCoreMessages.RenameFieldRefactoring_Update_field_declaration; 
		addTextEdit(fChangeManager.get(cu), groupName, textEdit);
	}

	private RefactoringStatus addDelegates() throws JavaModelException, CoreException {

		RefactoringStatus status= new RefactoringStatus();
		CompilationUnitRewrite rewrite= new CompilationUnitRewrite(fField.getCompilationUnit());
		rewrite.setResolveBindings(true);

		// add delegate for the field
		if (RefactoringAvailabilityTester.isDelegateCreationAvailable(fField)) {
			FieldDeclaration fieldDeclaration= ASTNodeSearchUtil.getFieldDeclarationNode(fField, rewrite.getRoot());
			if (fieldDeclaration.fragments().size() > 1) {
				status.addWarning(Messages.format(RefactoringCoreMessages.DelegateCreator_cannot_create_field_delegate_more_than_one_fragment, fField
						.getElementName()), JavaStatusContext.create(fField));
			} else if (((VariableDeclarationFragment) fieldDeclaration.fragments().get(0)).getInitializer() == null) {
				status.addWarning(Messages.format(RefactoringCoreMessages.DelegateCreator_cannot_create_field_delegate_no_initializer, fField
						.getElementName()), JavaStatusContext.create(fField));
			} else {
				DelegateFieldCreator creator= new DelegateFieldCreator();
				creator.setDeclareDeprecated(fDelegateDeprecation);
				creator.setDeclaration(fieldDeclaration);
				creator.setNewElementName(getNewElementName());
				creator.setSourceRewrite(rewrite);
				creator.prepareDelegate();
				creator.createEdit();
			}
		}

		// add delegates for getter and setter methods
		// there may be getters even if the field is static final
		if (getGetter() != null && fRenameGetter)
			addMethodDelegate(getGetter(), getNewGetterName(), rewrite);
		if (getSetter() != null && fRenameSetter)
			addMethodDelegate(getSetter(), getNewSetterName(), rewrite);

		final CompilationUnitChange change= rewrite.createChange();
		if (change != null) {
			change.setKeepPreviewEdits(true);
			fChangeManager.manage(fField.getCompilationUnit(), change);
		}

		return status;
	}

	private void addMethodDelegate(IMethod getter, String newName, CompilationUnitRewrite rewrite) throws JavaModelException {
		MethodDeclaration declaration= ASTNodeSearchUtil.getMethodDeclarationNode(getter, rewrite.getRoot());
		DelegateCreator creator= new DelegateMethodCreator();
		creator.setDeclareDeprecated(fDelegateDeprecation);
		creator.setDeclaration(declaration);
		creator.setNewElementName(newName);
		creator.setSourceRewrite(rewrite);
		creator.prepareDelegate();
		creator.createEdit();
	}

	private void addTextEdit(TextChange change, String groupName, TextEdit textEdit) {
		if (fIsComposite)
			TextChangeCompatibility.addTextEdit(change, groupName, textEdit, fCategorySet);
		else
			TextChangeCompatibility.addTextEdit(change, groupName, textEdit);

	}

	private void addReferenceUpdates(IProgressMonitor pm) {
		pm.beginTask("", fReferences.length); //$NON-NLS-1$
		String editName= RefactoringCoreMessages.RenameFieldRefactoring_Update_field_reference; 
		for (int i= 0; i < fReferences.length; i++){
			ICompilationUnit cu= fReferences[i].getCompilationUnit();
			if (cu == null)
				continue;
			SearchMatch[] results= fReferences[i].getSearchResults();
			for (int j= 0; j < results.length; j++){
				addTextEdit(fChangeManager.get(cu), editName, createTextChange(results[j]));
			}
			pm.worked(1);			
		}
	}
	
	private TextEdit createTextChange(SearchMatch match) {
		return new ReplaceEdit(match.getOffset(), match.getLength(), getNewElementName());
	}
	
	private void addGetterOccurrences(IProgressMonitor pm, RefactoringStatus status) throws CoreException {
		addAccessorOccurrences(pm, getGetter(), RefactoringCoreMessages.RenameFieldRefactoring_Update_getter_occurrence, getNewGetterName(), status); 
	}
	
	private void addSetterOccurrences(IProgressMonitor pm, RefactoringStatus status) throws CoreException {
		addAccessorOccurrences(pm, getSetter(), RefactoringCoreMessages.RenameFieldRefactoring_Update_setter_occurrence, getNewSetterName(), status); 
	}

	private void addAccessorOccurrences(IProgressMonitor pm, IMethod accessor, String editName, String newAccessorName, RefactoringStatus status) throws CoreException {
		Assert.isTrue(accessor.exists());
		
		IJavaSearchScope scope= RefactoringScopeFactory.create(accessor);
		SearchPattern pattern= SearchPattern.createPattern(accessor, IJavaSearchConstants.ALL_OCCURRENCES, SearchUtils.GENERICS_AGNOSTIC_MATCH_RULE);
		SearchResultGroup[] groupedResults= RefactoringSearchEngine.search(
			pattern, scope, new MethodOccurenceCollector(accessor.getElementName()), pm, status);
		
		for (int i= 0; i < groupedResults.length; i++) {
			ICompilationUnit cu= groupedResults[i].getCompilationUnit();
			if (cu == null)
				continue;
			SearchMatch[] results= groupedResults[i].getSearchResults();
			for (int j= 0; j < results.length; j++){
				SearchMatch searchResult= results[j];
				TextEdit edit= new ReplaceEdit(searchResult.getOffset(), searchResult.getLength(), newAccessorName);
				addTextEdit(fChangeManager.get(cu), editName, edit);
			}
		}
	}
	
	private void addTextMatches(IProgressMonitor pm) throws CoreException {
		TextMatchUpdater.perform(pm, createRefactoringScope(), this, fChangeManager, fReferences);
	}	
	
	//----------------
	private RefactoringStatus analyzeRenameChanges(IProgressMonitor pm) throws CoreException {
		ICompilationUnit[] newWorkingCopies= null;
		WorkingCopyOwner newWCOwner= new WorkingCopyOwner() { /* must subclass */ };
		try {
			pm.beginTask("", 2); //$NON-NLS-1$
			RefactoringStatus result= new RefactoringStatus();
			SearchResultGroup[] oldReferences= fReferences;

			List compilationUnitsToModify= new ArrayList();
			if (fIsComposite) {
				// limited change set, no accessors.
				for (int i= 0; i < oldReferences.length; i++) 
					compilationUnitsToModify.add(oldReferences[i].getCompilationUnit());
				compilationUnitsToModify.add(fField.getCompilationUnit());
			} else {
				// include all cus, including accessors
				compilationUnitsToModify.addAll(Arrays.asList(fChangeManager.getAllCompilationUnits()));
			}
			
			newWorkingCopies= RenameAnalyzeUtil.createNewWorkingCopies((ICompilationUnit[]) compilationUnitsToModify.toArray(new ICompilationUnit[compilationUnitsToModify.size()]),
					fChangeManager, newWCOwner, new SubProgressMonitor(pm, 1));
			
			SearchResultGroup[] newReferences= getNewReferences(new SubProgressMonitor(pm, 1), result, newWCOwner, newWorkingCopies);
			result.merge(RenameAnalyzeUtil.analyzeRenameChanges2(fChangeManager, oldReferences, newReferences, getNewElementName()));
			return result;
		} finally{
			pm.done();
			if (newWorkingCopies != null){
				for (int i= 0; i < newWorkingCopies.length; i++) {
					newWorkingCopies[i].discardWorkingCopy();
				}
			}
		}
	}

	private SearchResultGroup[] getNewReferences(IProgressMonitor pm, RefactoringStatus status, WorkingCopyOwner owner, ICompilationUnit[] newWorkingCopies) throws CoreException {
		pm.beginTask("", 2); //$NON-NLS-1$
		ICompilationUnit declaringCuWorkingCopy= RenameAnalyzeUtil.findWorkingCopyForCu(newWorkingCopies, fField.getCompilationUnit());
		if (declaringCuWorkingCopy == null)
			return new SearchResultGroup[0];
		
		IField field= getFieldInWorkingCopy(declaringCuWorkingCopy, getNewElementName());
		if (field == null || ! field.exists())
			return new SearchResultGroup[0];
		
		CollectingSearchRequestor requestor= null;
		if (fDelegateUpdating && RefactoringAvailabilityTester.isDelegateCreationAvailable(getField())) {
			// There will be two new matches inside the delegate (the invocation
			// and the javadoc) which are OK and must not be reported.
			final IField oldField= getFieldInWorkingCopy(declaringCuWorkingCopy, getCurrentElementName());
			requestor= new CollectingSearchRequestor() {
				public void acceptSearchMatch(SearchMatch match) throws CoreException {
					if (!oldField.equals(match.getElement()))
						super.acceptSearchMatch(match);
				}
			};
		} else
			requestor= new CollectingSearchRequestor();
		
		SearchPattern newPattern= SearchPattern.createPattern(field, IJavaSearchConstants.REFERENCES);			
		return RefactoringSearchEngine.search(newPattern, owner, createRefactoringScope(), requestor, new SubProgressMonitor(pm, 1), status);
	}
	
	private IField getFieldInWorkingCopy(ICompilationUnit newWorkingCopyOfDeclaringCu, String elementName) throws CoreException{
		IType type= fField.getDeclaringType();
		IType typeWc= (IType) JavaModelUtil.findInCompilationUnit(newWorkingCopyOfDeclaringCu, type);
		if (typeWc == null)
			return null;
		
		return typeWc.getField(elementName);
	}

	public RefactoringStatus initialize(RefactoringArguments arguments) {
		if (arguments instanceof JavaRefactoringArguments) {
			final JavaRefactoringArguments extended= (JavaRefactoringArguments) arguments;
			final String handle= extended.getAttribute(JDTRefactoringDescriptor.ATTRIBUTE_INPUT);
			if (handle != null) {
				final IJavaElement element= JDTRefactoringDescriptor.handleToElement(extended.getProject(), handle, false);
				if (element == null || !element.exists() || element.getElementType() != IJavaElement.FIELD)
					return ScriptableRefactoring.createInputFatalStatus(element, getRefactoring().getName(), IJavaRefactorings.RENAME_FIELD);
				else
					fField= (IField) element;
			} else
				return RefactoringStatus.createFatalErrorStatus(Messages.format(RefactoringCoreMessages.InitializableRefactoring_argument_not_exist, JDTRefactoringDescriptor.ATTRIBUTE_INPUT));
			final String name= extended.getAttribute(JDTRefactoringDescriptor.ATTRIBUTE_NAME);
			if (name != null && !"".equals(name)) //$NON-NLS-1$
				setNewElementName(name);
			else
				return RefactoringStatus.createFatalErrorStatus(Messages.format(RefactoringCoreMessages.InitializableRefactoring_argument_not_exist, JDTRefactoringDescriptor.ATTRIBUTE_NAME));
			final String references= extended.getAttribute(JDTRefactoringDescriptor.ATTRIBUTE_REFERENCES);
			if (references != null) {
				fUpdateReferences= Boolean.valueOf(references).booleanValue();
			} else
				return RefactoringStatus.createFatalErrorStatus(Messages.format(RefactoringCoreMessages.InitializableRefactoring_argument_not_exist, JDTRefactoringDescriptor.ATTRIBUTE_REFERENCES));
			final String matches= extended.getAttribute(ATTRIBUTE_TEXTUAL_MATCHES);
			if (matches != null) {
				fUpdateTextualMatches= Boolean.valueOf(matches).booleanValue();
			} else
				return RefactoringStatus.createFatalErrorStatus(Messages.format(RefactoringCoreMessages.InitializableRefactoring_argument_not_exist, ATTRIBUTE_TEXTUAL_MATCHES));
			final String getters= extended.getAttribute(ATTRIBUTE_RENAME_GETTER);
			if (getters != null)
				fRenameGetter= Boolean.valueOf(getters).booleanValue();
			else
				fRenameGetter= false;
			final String setters= extended.getAttribute(ATTRIBUTE_RENAME_SETTER);
			if (setters != null)
				fRenameSetter= Boolean.valueOf(setters).booleanValue();
			else
				fRenameSetter= false;
			final String delegate= extended.getAttribute(ATTRIBUTE_DELEGATE);
			if (delegate != null) {
				fDelegateUpdating= Boolean.valueOf(delegate).booleanValue();
			} else
				fDelegateUpdating= false;
			final String deprecate= extended.getAttribute(ATTRIBUTE_DEPRECATE);
			if (deprecate != null) {
				fDelegateDeprecation= Boolean.valueOf(deprecate).booleanValue();
			} else
				fDelegateDeprecation= false;
		} else
			return RefactoringStatus.createFatalErrorStatus(RefactoringCoreMessages.InitializableRefactoring_inacceptable_arguments);
		return new RefactoringStatus();
	}

	/**
	 * {@inheritDoc}
	 */
	public String getDelegateUpdatingTitle(boolean plural) {
		if (plural)
			return RefactoringCoreMessages.DelegateFieldCreator_keep_original_renamed_plural;
		else
			return RefactoringCoreMessages.DelegateFieldCreator_keep_original_renamed_singular;
	}
}
