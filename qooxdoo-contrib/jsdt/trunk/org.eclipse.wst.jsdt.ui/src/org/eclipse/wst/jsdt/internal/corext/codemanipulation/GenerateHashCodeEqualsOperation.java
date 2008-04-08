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
package org.eclipse.wst.jsdt.internal.corext.codemanipulation;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.eclipse.core.filebuffers.ITextFileBuffer;
import org.eclipse.core.resources.IWorkspaceRunnable;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.Assert;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.core.runtime.OperationCanceledException;
import org.eclipse.core.runtime.Status;
import org.eclipse.core.runtime.SubProgressMonitor;
import org.eclipse.core.runtime.jobs.ISchedulingRule;
import org.eclipse.jface.text.Document;
import org.eclipse.jface.text.IDocument;
import org.eclipse.ltk.core.refactoring.Change;
import org.eclipse.text.edits.TextEdit;
import org.eclipse.wst.jsdt.core.ICompilationUnit;
import org.eclipse.wst.jsdt.core.IJavaElement;
import org.eclipse.wst.jsdt.core.IMethod;
import org.eclipse.wst.jsdt.core.dom.AST;
import org.eclipse.wst.jsdt.core.dom.ASTNode;
import org.eclipse.wst.jsdt.core.dom.AbstractTypeDeclaration;
import org.eclipse.wst.jsdt.core.dom.ArrayAccess;
import org.eclipse.wst.jsdt.core.dom.Assignment;
import org.eclipse.wst.jsdt.core.dom.Block;
import org.eclipse.wst.jsdt.core.dom.BodyDeclaration;
import org.eclipse.wst.jsdt.core.dom.CastExpression;
import org.eclipse.wst.jsdt.core.dom.CompilationUnit;
import org.eclipse.wst.jsdt.core.dom.ConditionalExpression;
import org.eclipse.wst.jsdt.core.dom.Expression;
import org.eclipse.wst.jsdt.core.dom.FieldAccess;
import org.eclipse.wst.jsdt.core.dom.ForStatement;
import org.eclipse.wst.jsdt.core.dom.IMethodBinding;
import org.eclipse.wst.jsdt.core.dom.ITypeBinding;
import org.eclipse.wst.jsdt.core.dom.IVariableBinding;
import org.eclipse.wst.jsdt.core.dom.IfStatement;
import org.eclipse.wst.jsdt.core.dom.InfixExpression;
import org.eclipse.wst.jsdt.core.dom.InstanceofExpression;
import org.eclipse.wst.jsdt.core.dom.Javadoc;
import org.eclipse.wst.jsdt.core.dom.MethodDeclaration;
import org.eclipse.wst.jsdt.core.dom.MethodInvocation;
import org.eclipse.wst.jsdt.core.dom.Modifier;
import org.eclipse.wst.jsdt.core.dom.Name;
import org.eclipse.wst.jsdt.core.dom.ParenthesizedExpression;
import org.eclipse.wst.jsdt.core.dom.PostfixExpression;
import org.eclipse.wst.jsdt.core.dom.PrefixExpression;
import org.eclipse.wst.jsdt.core.dom.PrimitiveType;
import org.eclipse.wst.jsdt.core.dom.ReturnStatement;
import org.eclipse.wst.jsdt.core.dom.SingleVariableDeclaration;
import org.eclipse.wst.jsdt.core.dom.Statement;
import org.eclipse.wst.jsdt.core.dom.SuperMethodInvocation;
import org.eclipse.wst.jsdt.core.dom.TagElement;
import org.eclipse.wst.jsdt.core.dom.TextElement;
import org.eclipse.wst.jsdt.core.dom.VariableDeclarationExpression;
import org.eclipse.wst.jsdt.core.dom.VariableDeclarationFragment;
import org.eclipse.wst.jsdt.core.dom.VariableDeclarationStatement;
import org.eclipse.wst.jsdt.core.dom.InfixExpression.Operator;
import org.eclipse.wst.jsdt.core.dom.Modifier.ModifierKeyword;
import org.eclipse.wst.jsdt.core.dom.rewrite.ListRewrite;
import org.eclipse.wst.jsdt.internal.corext.dom.ASTNodeFactory;
import org.eclipse.wst.jsdt.internal.corext.dom.ASTNodes;
import org.eclipse.wst.jsdt.internal.corext.dom.Bindings;
import org.eclipse.wst.jsdt.internal.corext.dom.NodeFinder;
import org.eclipse.wst.jsdt.internal.corext.refactoring.changes.CompilationUnitChange;
import org.eclipse.wst.jsdt.internal.corext.refactoring.structure.CompilationUnitRewrite;
import org.eclipse.wst.jsdt.internal.corext.refactoring.util.RefactoringFileBuffers;
import org.eclipse.wst.jsdt.internal.corext.util.JavaModelUtil;
import org.eclipse.wst.jsdt.internal.ui.JavaPlugin;
import org.eclipse.wst.jsdt.ui.CodeGeneration;

/**
 * <p>
 * Workspace runnable to add implementations for
 * <code>{@link java.lang.Object#equals(java.lang.Object)}</code> and
 * <code>{@link java.lang.Object#hashCode()}</code>.
 * </p>
 * 
 * <p>
 * This implementation creates a hashCode() and an equals() method intended to
 * be used in value types: The implementation assumes that two objects are equal
 * (and provide the same hashCode) if all values of all fields are equal.
 * </p>
 * 
 * <p>
 * About the implementation:
 * <ul>
 * <li>To deal with reference types of fields and with supertypes, the
 * implementation calls hashCode() and equals() on reference types of fields and
 * on the superclass (except if the superclass is Object). It is an error if
 * these types do not provide an equals() and hashCode() implementation and the
 * comparison or hash code creation <strong>will fail</strong> if these methods
 * are not correctly implemented.</li>
 * <li>The implementation for primitive typed fields is the same as in the JDK
 * implementations in the wrapper types (and the java.util.Arrays class).</li>
 * <li>The equals() implementation uses equality of the declaring class instead
 * of an instanceof check.</li>
 * <li>A test for null in equals() is only implemented in direct subclasses of
 * Object. This is only sufficient if every subimplementation calls
 * super.equals() before any argument checks.</li>
 * <li>Both equals() and hashCode() use methods from java.util.Arrays to test
 * for equality and to generate a hash code for arrays. Note that this has an
 * implication for Double and Float values (consider values -0.0 and 0.0 as well
 * as border values like NaN and their equality in bit patterns) - however, the
 * implementation is consistent with the wrapper types java.lang.Float and
 * java.lang.Double.</li>
 * </ul>
 * </p>
 * 
 * @since 3.2
 */
public final class GenerateHashCodeEqualsOperation implements IWorkspaceRunnable {

	private interface IHashCodeAccessProvider {

		public Expression getThisAccess(String name);
	}

	private static final String JAVA_UTIL_ARRAYS= "java.util.Arrays"; //$NON-NLS-1$

	private static final String BOOLEAN_TRUE_CONSTANT= "1231"; //$NON-NLS-1$

	private static final String BOOLEAN_FALSE_CONSTANT= "1237"; //$NON-NLS-1$

	private static final String JAVA_LANG_OBJECT= "java.lang.Object"; //$NON-NLS-1$

	private static final String METHODNAME_GETCLASS= "getClass"; //$NON-NLS-1$

	private static final String METHODNAME_EQUALS= "equals"; //$NON-NLS-1$

	private static final String METHODNAME_HASH_CODE= "hashCode"; //$NON-NLS-1$

	private static final String PRIME_NUMBER= "31"; //$NON-NLS-1$

	private static final String INITIAL_HASHCODE_VALUE= "1"; //$NON-NLS-1$

	private static final String VARIABLE_NAME_DOUBLE_TEMPORARY= "temp"; //$NON-NLS-1$

	private static final String VARIABLE_NAME_PRIME= "prime"; //$NON-NLS-1$

	private static final String VARIABLE_NAME_RESULT= "result"; //$NON-NLS-1$

	private static final String VARIABLE_NAME_EQUALS_PARAM= "obj"; //$NON-NLS-1$

	private static final String VARIABLE_NAME_HASHCODE_PARAM= "array"; //$NON-NLS-1$

	private static final String VARIABLE_NAME_EQUALS_CASTED= "other"; //$NON-NLS-1$

	private static final String VARIABLE_NAME_INDEX= "index"; //$NON-NLS-1$

	/** Should the resulting edit be applied? */
	private final boolean fApply;

	/** The resulting text edit */
	private TextEdit fEdit= null;

	/** The insertion point, or <code>null</code> */
	private final IJavaElement fInsert;

	/** The variable binding keys to implement */
	private final IVariableBinding[] fFields;

	/** Should the regeneration of the methods be enforced? */
	private final boolean fForce;

	/** Should the compilation unit content be saved? */
	private final boolean fSave;

	/** The code generation settings to use */
	private final CodeGenerationSettings fSettings;

	/** The type declaration to add the methods to */
	private final ITypeBinding fType;

	/** The compilation unit ast node */
	private final CompilationUnit fUnit;

	/** The CURewrite to be used */
	private final CompilationUnitRewrite fRewrite;

	/** The ast to be used. Convenience accessor field */
	private final AST fAst;

	/** The number of double-typed fields handled so far */
	private int fDoubleCount;

	/** The primitive types to generate custom hashCode() methods for */
	private Set fCustomHashCodeTypes= new HashSet();

	/** <code>true</code> to use 'instanceof' to compare types, <code>false</code> otherwise */
	private final boolean fUseInstanceOf;

	/**
	 * Creates a new add hash code equals operation.
	 * 
	 * @param type the type to add the methods to
	 * @param fields the method binding keys to implement
	 * @param unit the compilation unit ast node
	 * @param insert the insertion point, or <code>null</code>
	 * @param settings the code generation settings to use
	 * @param useInstanceof <code>true</code> to use 'instanceof' to compare types, <code>false</code> otherwise
	 * @param force <code>true</code> to force the regeneration of existing methods,
	 *            <code>false</code> otherwise
	 * @param apply <code>true</code> if the resulting edit should be applied,
	 *            <code>false</code> otherwise
	 * @param save <code>true</code> if the changed compilation unit should be
	 *            saved, <code>false</code> otherwise
	 */
	public GenerateHashCodeEqualsOperation(final ITypeBinding type, final IVariableBinding[] fields, final CompilationUnit unit,
			final IJavaElement insert, final CodeGenerationSettings settings, final boolean useInstanceof, final boolean force, final boolean apply, final boolean save) {
		Assert.isNotNull(type);
		Assert.isNotNull(fields);
		Assert.isNotNull(unit);
		Assert.isNotNull(settings);
		fType= type;
		fInsert= insert;
		fUnit= unit;
		fFields= fields;
		fSettings= settings;
		fUseInstanceOf= useInstanceof;
		fSave= save;
		fApply= apply;
		fDoubleCount= 0;
		fRewrite= new CompilationUnitRewrite((ICompilationUnit) fUnit.getJavaElement(), fUnit);
		fForce= force;
		fAst= fRewrite.getAST();
	}

	/**
	 * Returns the resulting text edit.
	 * 
	 * @return the resulting edit
	 */
	public final TextEdit getResultingEdit() {
		return fEdit;
	}

	/**
	 * Returns the scheduling rule for this operation.
	 * 
	 * @return the scheduling rule
	 */
	public final ISchedulingRule getSchedulingRule() {
		return ResourcesPlugin.getWorkspace().getRoot();
	}

	/*
	 * @see org.eclipse.core.resources.IWorkspaceRunnable#run(org.eclipse.core.runtime.IProgressMonitor)
	 */
	public final void run(IProgressMonitor monitor) throws CoreException {
		if (monitor == null)
			monitor= new NullProgressMonitor();
		try {
			monitor.beginTask("", 1); //$NON-NLS-1$
			monitor.setTaskName(CodeGenerationMessages.GenerateHashCodeEqualsOperation_description);

			fCustomHashCodeTypes.clear();

			// get the declaration and the rewrite
			AbstractTypeDeclaration declaration= (AbstractTypeDeclaration) ASTNodes.findDeclaration(fType, fRewrite.getRoot());
			ListRewrite rewriter= fRewrite.getASTRewrite().getListRewrite(declaration, declaration.getBodyDeclarationsProperty());

			if (fType != null && rewriter != null) {

				ICompilationUnit cu= (ICompilationUnit) fUnit.getJavaElement();

				ITextFileBuffer buffer= null;
				IDocument document= null;
				try {
					if (!JavaModelUtil.isPrimary(cu))
						document= new Document(cu.getBuffer().getContents());
					else {
						buffer= RefactoringFileBuffers.acquire(cu);
						document= buffer.getDocument();
					}
					ASTNode insertion= null;
					if (fInsert instanceof IMethod)
						insertion= ASTNodes.getParent(NodeFinder.perform(fRewrite.getRoot(), ((IMethod) fInsert).getNameRange()),
								MethodDeclaration.class);

					BodyDeclaration toReplace= null;
					if (fForce) {
						final List list= (List) declaration.getStructuralProperty(declaration.getBodyDeclarationsProperty());
						for (final Iterator iterator= list.iterator(); iterator.hasNext();) {
							final BodyDeclaration bodyDecl= (BodyDeclaration) iterator.next();
							if (bodyDecl instanceof MethodDeclaration) {
								final MethodDeclaration method= (MethodDeclaration) bodyDecl;
								final IMethodBinding binding= method.resolveBinding();
								if (binding != null && binding.getName().equals(METHODNAME_EQUALS)) {
									final ITypeBinding[] bindings= binding.getParameterTypes();
									if (bindings.length == 1 && bindings[0].getQualifiedName().equals(JAVA_LANG_OBJECT)) {
										toReplace= bodyDecl;
										break;
									}
								}
							}
						}
					}
					// equals(..)
					MethodDeclaration equalsMethod= createEqualsMethod();
					addMethod(rewriter, insertion, equalsMethod, toReplace);

					if (monitor.isCanceled())
						throw new OperationCanceledException();

					toReplace= null;
					if (fForce) {
						final List list= (List) declaration.getStructuralProperty(declaration.getBodyDeclarationsProperty());
						for (final Iterator iterator= list.iterator(); iterator.hasNext();) {
							final BodyDeclaration bodyDecl= (BodyDeclaration) iterator.next();
							if (bodyDecl instanceof MethodDeclaration) {
								final MethodDeclaration method= (MethodDeclaration) bodyDecl;
								final IMethodBinding binding= method.resolveBinding();
								if (binding != null && binding.getName().equals(METHODNAME_HASH_CODE)) {
									final ITypeBinding[] bindings= binding.getParameterTypes();
									if (bindings.length == 0) {
										toReplace= bodyDecl;
										break;
									}
								}
							}
						}
					}
					// hashCode()
					MethodDeclaration hashCodeMethod= createHashCodeMethod();
					addMethod(rewriter, equalsMethod, hashCodeMethod, toReplace);

					// helpers
					MethodDeclaration previous= null;
					for (final Iterator iterator= fCustomHashCodeTypes.iterator(); iterator.hasNext();) {
						boolean found= false;
						final ITypeBinding binding= (ITypeBinding) iterator.next();
						final ITypeBinding typeBinding= declaration.resolveBinding();
						if (typeBinding != null) {
							final IMethodBinding[] bindings= typeBinding.getDeclaredMethods();
							for (int index= 0; index < bindings.length; index++) {
								final IMethodBinding method= bindings[index];
								final ITypeBinding[] parameters= method.getParameterTypes();
								if (method.getName().equals(METHODNAME_HASH_CODE) && parameters.length == 1) {
									final ITypeBinding parameter= parameters[0];
									if (!parameter.isPrimitive()) {
										found= parameter.getQualifiedName().equals(JAVA_LANG_OBJECT);
									} else
										found= parameter.isEqualTo(binding);
									if (found)
										break;
								}
							}
						}
						if (!found) {
							final MethodDeclaration helperDecl= createHashCodeHelper(binding);
							addHelper(rewriter, previous, helperDecl);
						}
					}

					// add 'em
					final Change result= fRewrite.createChange();
					if (result instanceof CompilationUnitChange) {
						final CompilationUnitChange change= (CompilationUnitChange) result;
						final TextEdit edit= change.getEdit();
						if (edit != null) {
							try {
								fEdit= edit;
								if (fApply)
									edit.apply(document, TextEdit.UPDATE_REGIONS);
								if (fSave) {
									if (buffer != null)
										buffer.commit(new SubProgressMonitor(monitor, 1), true);
									else
										cu.getBuffer().setContents(document.get());
								}
							} catch (Exception exception) {
								throw new CoreException(new Status(IStatus.ERROR, JavaPlugin.getPluginId(), 0, exception.getLocalizedMessage(),
										exception));
							}
						}
					}
				} finally {
					if (buffer != null)
						RefactoringFileBuffers.release(cu);
				}
			}
		} finally {
			monitor.done();
		}
	}

	private void addHelper(ListRewrite rewriter, ASTNode insertion, MethodDeclaration stub) {
		if (insertion != null)
			rewriter.insertBefore(stub, insertion, null);
		else
			rewriter.insertFirst(stub, null);
	}

	private void addMethod(ListRewrite rewriter, ASTNode insertion, MethodDeclaration stub, BodyDeclaration replace) {
		if (replace != null) {
			rewriter.replace(replace, stub, null);
		} else {
		if (insertion != null)
			rewriter.insertBefore(stub, insertion, null);
		else
			rewriter.insertLast(stub, null);
		}
	}

	// ******************* HASHCODE *******************

	private MethodDeclaration createHashCodeMethod() throws CoreException {

		MethodDeclaration hashCodeMethod= fAst.newMethodDeclaration();
		hashCodeMethod.modifiers().addAll(ASTNodeFactory.newModifiers(fAst, Modifier.PUBLIC));
		hashCodeMethod.setName(fAst.newSimpleName(METHODNAME_HASH_CODE));
		hashCodeMethod.setConstructor(false);
		hashCodeMethod.setReturnType2(fAst.newPrimitiveType(PrimitiveType.INT));

		Block body= fAst.newBlock();
		hashCodeMethod.setBody(body);

		// PRIME NUMBER
		VariableDeclarationFragment frag= fAst.newVariableDeclarationFragment();
		frag.setName(fAst.newSimpleName(VARIABLE_NAME_PRIME));
		frag.setInitializer(fAst.newNumberLiteral(PRIME_NUMBER));

		VariableDeclarationStatement primeNumberDeclaration= fAst.newVariableDeclarationStatement(frag);
		primeNumberDeclaration.modifiers().add(fAst.newModifier(ModifierKeyword.FINAL_KEYWORD));
		primeNumberDeclaration.setType(fAst.newPrimitiveType(PrimitiveType.INT));
		body.statements().add(primeNumberDeclaration);

		// RESULT
		VariableDeclarationFragment fragment= fAst.newVariableDeclarationFragment();
		fragment.setName(fAst.newSimpleName(VARIABLE_NAME_RESULT));

		VariableDeclarationStatement resultDeclaration= fAst.newVariableDeclarationStatement(fragment);
		resultDeclaration.setType(fAst.newPrimitiveType(PrimitiveType.INT));
		body.statements().add(resultDeclaration);

		if (needsNoSuperCall(fType, METHODNAME_HASH_CODE, new ITypeBinding[0])) {
			fragment.setInitializer(fAst.newNumberLiteral(INITIAL_HASHCODE_VALUE));
		} else {
			SuperMethodInvocation invoc= fAst.newSuperMethodInvocation();
			invoc.setName(fAst.newSimpleName(METHODNAME_HASH_CODE));
			fragment.setInitializer(invoc);
		}

		for (int i= 0; i < fFields.length; i++) {
			if (fFields[i].getType().isPrimitive()) {
				Statement[] sts= createAddSimpleHashCode(fFields[i].getType(), new IHashCodeAccessProvider() {
				
					public Expression getThisAccess(String name) {
						return getThisAccessForHashCode(name);
					}
				
				}, fFields[i].getName(), false);
				for (int j= 0; j < sts.length; j++) {
					body.statements().add(sts[j]);
				}
			} else if (fFields[i].getType().isArray())
				body.statements().add(createAddArrayHashCode(fFields[i]));
			else
				body.statements().add(createAddQualifiedHashCode(fFields[i]));
		}

		// the last return:
		ReturnStatement endReturn= fAst.newReturnStatement();
		endReturn.setExpression(fAst.newSimpleName(VARIABLE_NAME_RESULT));
		body.statements().add(endReturn);

		// method comment
		if (fSettings != null) {
			ITypeBinding object= fAst.resolveWellKnownType(JAVA_LANG_OBJECT);
			IMethodBinding[] objms= object.getDeclaredMethods();
			IMethodBinding objectMethod= null;
			for (int i= 0; i < objms.length; i++) {
				if (objms[i].getName().equals(METHODNAME_HASH_CODE) && objms[i].getParameterTypes().length == 0)
					objectMethod= objms[i];
			}
			createMethodComment(hashCodeMethod, objectMethod);
		}

		return hashCodeMethod;
	}


	private Statement[] createAddSimpleHashCode(ITypeBinding type, IHashCodeAccessProvider provider, String name, boolean singleTemp) {

		List statements= new ArrayList();

		if (!type.isPrimitive()) {
			// (element == null ? 0 : element.hashCode())
			ConditionalExpression ce= fAst.newConditionalExpression();
			InfixExpression exp= fAst.newInfixExpression();
			ArrayAccess access= fAst.newArrayAccess();
			access.setArray(fAst.newSimpleName(VARIABLE_NAME_HASHCODE_PARAM));
			access.setIndex(fAst.newSimpleName(VARIABLE_NAME_INDEX));
			exp.setLeftOperand(access);
			exp.setOperator(Operator.EQUALS);
			exp.setRightOperand(fAst.newNullLiteral());
			ce.setExpression(exp);
			ce.setThenExpression(fAst.newNumberLiteral("0")); //$NON-NLS-1$
			MethodInvocation invoc= fAst.newMethodInvocation();
			access= fAst.newArrayAccess();
			access.setArray(fAst.newSimpleName(VARIABLE_NAME_HASHCODE_PARAM));
			access.setIndex(fAst.newSimpleName(VARIABLE_NAME_INDEX));
			invoc.setExpression(access);
			invoc.setName(fAst.newSimpleName(METHODNAME_HASH_CODE));
			ce.setElseExpression(invoc);
			statements.add(prepareAssignment(parenthesize(ce)));
		} else if (isPrimitiveType(type, PrimitiveType.BOOLEAN)) {
			ConditionalExpression ce= fAst.newConditionalExpression();
			ce.setExpression(provider.getThisAccess(name));
			// see Boolean.hashCode(boolean)
			ce.setThenExpression(fAst.newNumberLiteral(BOOLEAN_TRUE_CONSTANT));
			ce.setElseExpression(fAst.newNumberLiteral(BOOLEAN_FALSE_CONSTANT));
			statements.add(prepareAssignment(parenthesize(ce)));
		} else if (isPrimitiveType(type, new PrimitiveType.Code[] { PrimitiveType.CHAR, PrimitiveType.INT, PrimitiveType.SHORT })) {
			statements.add(prepareAssignment(provider.getThisAccess(name)));
		} else if (isPrimitiveType(type, PrimitiveType.FLOAT)) {
			// Float.floatToIntBits(aFloat)
			statements.add(prepareAssignment(createFloatInvocation(provider.getThisAccess(name))));
		} else if (isPrimitiveType(type, PrimitiveType.LONG)) {
			statements.add(prepareAssignment(createShiftAssignment(provider.getThisAccess(name), provider.getThisAccess(name))));
		} else if (isPrimitiveType(type, PrimitiveType.DOUBLE)) {

			VariableDeclarationFragment fragment= null;
			if (singleTemp || fDoubleCount == 0) {
				fragment= fAst.newVariableDeclarationFragment();
				fragment.setName(fAst.newSimpleName(VARIABLE_NAME_DOUBLE_TEMPORARY));

				VariableDeclarationStatement st2= fAst.newVariableDeclarationStatement(fragment);
				st2.setType(fAst.newPrimitiveType(PrimitiveType.LONG));
				statements.add(st2);
			}
			fDoubleCount++;

			// Double.doubleToIntBits(aDouble)
			Expression comparison= createDoubleInvocation(provider.getThisAccess(name));

			if (singleTemp)
				fragment.setInitializer(comparison);
			else {
				Assignment ass= fAst.newAssignment();
				ass.setLeftHandSide(fAst.newSimpleName(VARIABLE_NAME_DOUBLE_TEMPORARY));
				ass.setRightHandSide(comparison);
				statements.add(fAst.newExpressionStatement(ass));
			}
			statements.add(prepareAssignment(createShiftAssignment(fAst.newSimpleName(VARIABLE_NAME_DOUBLE_TEMPORARY), fAst.newSimpleName(VARIABLE_NAME_DOUBLE_TEMPORARY))));
		}

		return (Statement[]) statements.toArray(new Statement[statements.size()]);
	}

	private Statement createAddArrayHashCode(IVariableBinding binding) {
		MethodInvocation invoc= fAst.newMethodInvocation();
		if (JavaModelUtil.is50OrHigher(fRewrite.getCu().getJavaProject())) {
			invoc.setName(fAst.newSimpleName(METHODNAME_HASH_CODE));
			invoc.setExpression(getQualifiedName(JAVA_UTIL_ARRAYS));
			invoc.arguments().add(getThisAccessForHashCode(binding.getName()));
		} else {
			invoc.setName(fAst.newSimpleName(METHODNAME_HASH_CODE));
			final IJavaElement element= fType.getJavaElement();
			if (element != null && !"".equals(element.getElementName())) //$NON-NLS-1$
				invoc.setExpression(fAst.newSimpleName(element.getElementName()));
			invoc.arguments().add(getThisAccessForHashCode(binding.getName()));
			final ITypeBinding type= binding.getType().getElementType();
			if (!Bindings.isVoidType(type)) {
				if (type.isPrimitive() && binding.getType().getDimensions() < 2)
					fCustomHashCodeTypes.add(type);
				else
					fCustomHashCodeTypes.add(fAst.resolveWellKnownType(JAVA_LANG_OBJECT));
			}
		}
		return prepareAssignment(invoc);
	}

	private MethodDeclaration createHashCodeHelper(ITypeBinding binding) {
		Assert.isTrue(!binding.isArray());

		MethodDeclaration hashCodeMethod= fAst.newMethodDeclaration();
		hashCodeMethod.modifiers().addAll(ASTNodeFactory.newModifiers(fAst, Modifier.PRIVATE | Modifier.STATIC));
		hashCodeMethod.setName(fAst.newSimpleName(METHODNAME_HASH_CODE));
		hashCodeMethod.setConstructor(false);
		hashCodeMethod.setReturnType2(fAst.newPrimitiveType(PrimitiveType.INT));

		// ARGUMENTS
		List parameters= hashCodeMethod.parameters();
		SingleVariableDeclaration hashCodeParam= fAst.newSingleVariableDeclaration();
		if (!binding.isPrimitive())
			hashCodeParam.setType(fAst.newArrayType(fAst.newSimpleType(getQualifiedName(JAVA_LANG_OBJECT)), 1));
		else
			hashCodeParam.setType(fAst.newArrayType(fAst.newPrimitiveType(PrimitiveType.toCode(binding.getName())), 1));
		hashCodeParam.setName(fAst.newSimpleName(VARIABLE_NAME_HASHCODE_PARAM));
		parameters.add(hashCodeParam);

		Block body= fAst.newBlock();
		hashCodeMethod.setBody(body);

		// PRIME NUMBER
		VariableDeclarationFragment frag= fAst.newVariableDeclarationFragment();
		frag.setName(fAst.newSimpleName(VARIABLE_NAME_PRIME));
		frag.setInitializer(fAst.newNumberLiteral(PRIME_NUMBER));

		VariableDeclarationStatement primeNumberDeclaration= fAst.newVariableDeclarationStatement(frag);
		primeNumberDeclaration.modifiers().add(fAst.newModifier(ModifierKeyword.FINAL_KEYWORD));
		primeNumberDeclaration.setType(fAst.newPrimitiveType(PrimitiveType.INT));
		body.statements().add(primeNumberDeclaration);

		// IF STATEMENT
		IfStatement ifStatement= fAst.newIfStatement();
		final InfixExpression newInfixExpression= fAst.newInfixExpression();
		newInfixExpression.setLeftOperand(fAst.newSimpleName(VARIABLE_NAME_HASHCODE_PARAM));
		newInfixExpression.setRightOperand(fAst.newNullLiteral());
		newInfixExpression.setOperator(Operator.EQUALS);
		ifStatement.setExpression(newInfixExpression);
		final ReturnStatement returnStatement= fAst.newReturnStatement();
		returnStatement.setExpression(fAst.newNumberLiteral("0")); //$NON-NLS-1$
		ifStatement.setThenStatement(returnStatement);
		body.statements().add(ifStatement);

		// RESULT
		VariableDeclarationFragment resultFragment= fAst.newVariableDeclarationFragment();
		resultFragment.setName(fAst.newSimpleName(VARIABLE_NAME_RESULT));
		resultFragment.setInitializer(fAst.newNumberLiteral(INITIAL_HASHCODE_VALUE));
		VariableDeclarationStatement resultDeclaration= fAst.newVariableDeclarationStatement(resultFragment);
		resultDeclaration.setType(fAst.newPrimitiveType(PrimitiveType.INT));
		body.statements().add(resultDeclaration);

		// FOR LOOP
		ForStatement forStatement= fAst.newForStatement();
		
		VariableDeclarationFragment indexDeclaration= fAst.newVariableDeclarationFragment();
		indexDeclaration.setName(fAst.newSimpleName(VARIABLE_NAME_INDEX));
		indexDeclaration.setInitializer(fAst.newNumberLiteral("0")); //$NON-NLS-1$
		final VariableDeclarationExpression declExpression= fAst.newVariableDeclarationExpression(indexDeclaration);
		declExpression.setType(fAst.newPrimitiveType(PrimitiveType.INT));
		forStatement.initializers().add(declExpression);
		InfixExpression infixExpr= fAst.newInfixExpression();
		infixExpr.setLeftOperand(fAst.newSimpleName(VARIABLE_NAME_INDEX));
		FieldAccess access= fAst.newFieldAccess();
		access.setExpression(fAst.newSimpleName(VARIABLE_NAME_HASHCODE_PARAM));
		access.setName(fAst.newSimpleName("length")); //$NON-NLS-1$
		infixExpr.setRightOperand(access);
		infixExpr.setOperator(Operator.LESS);
		forStatement.setExpression(infixExpr);
		PostfixExpression postfixExpr= fAst.newPostfixExpression();
		postfixExpr.setOperand(fAst.newSimpleName(VARIABLE_NAME_INDEX));
		postfixExpr.setOperator(org.eclipse.wst.jsdt.core.dom.PostfixExpression.Operator.INCREMENT);
		forStatement.updaters().add(postfixExpr);
		body.statements().add(forStatement);
		
		Block forBody= fAst.newBlock();
		Statement[] statements= createAddSimpleHashCode(binding, new IHashCodeAccessProvider() {
		
			public Expression getThisAccess(String name) {
				ArrayAccess a= fAst.newArrayAccess();
				a.setArray(fAst.newSimpleName(VARIABLE_NAME_HASHCODE_PARAM));
				a.setIndex(fAst.newSimpleName(name));
				return a;
			}
		}, VARIABLE_NAME_INDEX, true);
		for (int index= 0; index < statements.length; index++) {
			forBody.statements().add(statements[index]);
		}
		forStatement.setBody(forBody);
		
		// END RETURN
		ReturnStatement endReturn= fAst.newReturnStatement();
		endReturn.setExpression(fAst.newSimpleName(VARIABLE_NAME_RESULT));
		body.statements().add(endReturn);

		// COMMENT
		if (fSettings != null && fSettings.createComments) {
			Javadoc javadoc= fAst.newJavadoc();
			final TagElement tagComment= fAst.newTagElement();
			TextElement text= fAst.newTextElement();
			text.setText(CodeGenerationMessages.GenerateHashCodeEqualsOperation_hash_code_comment);
			tagComment.fragments().add(text);
			javadoc.tags().add(tagComment);
			final TagElement tagParam= fAst.newTagElement();
			tagParam.setTagName(CodeGenerationMessages.GenerateHashCodeEqualsOperation_tag_param);
			tagParam.fragments().add(fAst.newSimpleName(VARIABLE_NAME_HASHCODE_PARAM));
			text= fAst.newTextElement();
			text.setText(CodeGenerationMessages.GenerateHashCodeEqualsOperation_hash_code_argument);
			tagParam.fragments().add(text);
			javadoc.tags().add(tagParam);
			final TagElement tagReturn= fAst.newTagElement();
			tagReturn.setTagName(CodeGenerationMessages.GenerateHashCodeEqualsOperation_tag_return);
			text= fAst.newTextElement();
			text.setText(CodeGenerationMessages.GenerateHashCodeEqualsOperation_return_comment);
			tagReturn.fragments().add(text);
			javadoc.tags().add(tagReturn);
			hashCodeMethod.setJavadoc(javadoc);
		}
		return hashCodeMethod;
	}

	private Statement createAddQualifiedHashCode(IVariableBinding binding) {

		MethodInvocation invoc= fAst.newMethodInvocation();
		invoc.setExpression(getThisAccessForHashCode(binding.getName()));
		invoc.setName(fAst.newSimpleName(METHODNAME_HASH_CODE));

		InfixExpression expr= fAst.newInfixExpression();
		expr.setOperator(Operator.EQUALS);
		expr.setLeftOperand(getThisAccessForHashCode(binding.getName()));
		expr.setRightOperand(fAst.newNullLiteral());

		ConditionalExpression cexpr= fAst.newConditionalExpression();
		cexpr.setThenExpression(fAst.newNumberLiteral("0")); //$NON-NLS-1$
		cexpr.setElseExpression(invoc);
		cexpr.setExpression(parenthesize(expr));

		return prepareAssignment(parenthesize(cexpr));
	}

	private Expression createShiftAssignment(Expression shift1, Expression shift2) {
		// (int)(element ^ (element >>> 32));
		// see implementation in Arrays.hashCode(), Double.hashCode() and
		// Long.hashCode()
		CastExpression ce= fAst.newCastExpression();
		ce.setType(fAst.newPrimitiveType(PrimitiveType.INT));

		InfixExpression unsignedShiftRight= fAst.newInfixExpression();
		unsignedShiftRight.setLeftOperand(shift1);
		unsignedShiftRight.setRightOperand(fAst.newNumberLiteral("32")); //$NON-NLS-1$
		unsignedShiftRight.setOperator(Operator.RIGHT_SHIFT_UNSIGNED);

		InfixExpression xor= fAst.newInfixExpression();
		xor.setLeftOperand(shift2);
		xor.setRightOperand(parenthesize(unsignedShiftRight));
		xor.setOperator(InfixExpression.Operator.XOR);

		ce.setExpression(parenthesize(xor));
		return ce;
	}

	private Statement prepareAssignment(Expression rightHand) {
		// result = PRIME*result + (...)
		InfixExpression mul= fAst.newInfixExpression();
		mul.setLeftOperand(fAst.newSimpleName(VARIABLE_NAME_PRIME));
		mul.setRightOperand(fAst.newSimpleName(VARIABLE_NAME_RESULT));
		mul.setOperator(Operator.TIMES);

		Assignment ass= fAst.newAssignment();
		ass.setLeftHandSide(fAst.newSimpleName(VARIABLE_NAME_RESULT));

		InfixExpression plus= fAst.newInfixExpression();
		plus.setLeftOperand(mul);
		plus.setOperator(Operator.PLUS);
		plus.setRightOperand(rightHand);

		ass.setRightHandSide(plus);

		return fAst.newExpressionStatement(ass);
	}

	// *************** EQUALS ***************

	private MethodDeclaration createEqualsMethod() throws CoreException {

		MethodDeclaration equalsMethodDeclaration= fAst.newMethodDeclaration();
		equalsMethodDeclaration.modifiers().addAll(ASTNodeFactory.newModifiers(fAst, Modifier.PUBLIC));
		equalsMethodDeclaration.setName(fAst.newSimpleName(METHODNAME_EQUALS));
		equalsMethodDeclaration.setConstructor(false);
		equalsMethodDeclaration.setReturnType2(fAst.newPrimitiveType(PrimitiveType.BOOLEAN));

		List parameters= equalsMethodDeclaration.parameters();
		SingleVariableDeclaration equalsParam= fAst.newSingleVariableDeclaration();
		equalsParam.setType(fAst.newSimpleType(fAst.newSimpleName("Object"))); //$NON-NLS-1$
		equalsParam.setName(fAst.newSimpleName(VARIABLE_NAME_EQUALS_PARAM));
		parameters.add(equalsParam);

		Block body= fAst.newBlock();
		equalsMethodDeclaration.setBody(body);

		// if (this == obj) return true;
		body.statements().add(
				createReturningIfStatement(fAst.newThisExpression(), fAst.newSimpleName(VARIABLE_NAME_EQUALS_PARAM), Operator.EQUALS, true));

		if (needsNoSuperCall(fType, METHODNAME_EQUALS, new ITypeBinding[] {fAst.resolveWellKnownType(JAVA_LANG_OBJECT)})) {
			// if (obj == null) return false;
			body.statements().add(
					createReturningIfStatement(fAst.newSimpleName(VARIABLE_NAME_EQUALS_PARAM), fAst.newNullLiteral(), Operator.EQUALS, false));

		} else {
			// if (!super.equals(obj)) return false;
			SuperMethodInvocation superEqualsCall= fAst.newSuperMethodInvocation();
			superEqualsCall.setName(fAst.newSimpleName(METHODNAME_EQUALS));
			superEqualsCall.arguments().add(fAst.newSimpleName(VARIABLE_NAME_EQUALS_PARAM));

			PrefixExpression pe= fAst.newPrefixExpression();
			pe.setOperator(PrefixExpression.Operator.NOT);
			pe.setOperand(superEqualsCall);

			IfStatement superEqualsIf= fAst.newIfStatement();
			superEqualsIf.setExpression(pe);
			superEqualsIf.setThenStatement(getReturnFalse());

			body.statements().add(superEqualsIf);
		}

		if (fUseInstanceOf) {
			// if (!(obj instanceof Type)) return false;
			InstanceofExpression expression= fAst.newInstanceofExpression();
			expression.setLeftOperand(fAst.newSimpleName(VARIABLE_NAME_EQUALS_PARAM));
			expression.setRightOperand(fRewrite.getImportRewrite().addImport(fType, fAst));

			PrefixExpression notExpression= fAst.newPrefixExpression();
			notExpression.setOperator(org.eclipse.wst.jsdt.core.dom.PrefixExpression.Operator.NOT);
			
			ParenthesizedExpression parenthesizedExpression= fAst.newParenthesizedExpression();
			parenthesizedExpression.setExpression(expression);
			
			notExpression.setOperand(parenthesizedExpression);

			body.statements().add(createReturningIfStatement(false, notExpression));
		} else {
			// if (getClass() != obj.getClass()) return false;
			MethodInvocation thisClass= fAst.newMethodInvocation();
			thisClass.setName(fAst.newSimpleName(METHODNAME_GETCLASS));

			MethodInvocation objGetClass= fAst.newMethodInvocation();
			objGetClass.setExpression(fAst.newSimpleName(VARIABLE_NAME_EQUALS_PARAM));
			objGetClass.setName(fAst.newSimpleName(METHODNAME_GETCLASS));

			body.statements().add(createReturningIfStatement(thisClass, objGetClass, Operator.NOT_EQUALS, false));
		}
		
		// Type other= (Type) obj;
		VariableDeclarationFragment sd= fAst.newVariableDeclarationFragment();
		sd.setName(fAst.newSimpleName(VARIABLE_NAME_EQUALS_CASTED));

		CastExpression cast= fAst.newCastExpression();
		cast.setType(fAst.newSimpleType(fAst.newSimpleName(fType.getName())));
		cast.setExpression(fAst.newSimpleName(VARIABLE_NAME_EQUALS_PARAM));
		sd.setInitializer(cast);

		VariableDeclarationStatement otherDeclaration= fAst.newVariableDeclarationStatement(sd);
		otherDeclaration.setType(fAst.newSimpleType(fAst.newSimpleName(fType.getName())));
		otherDeclaration.modifiers().add(fAst.newModifier(ModifierKeyword.FINAL_KEYWORD));

		body.statements().add(otherDeclaration);

		for (int i= 0; i < fFields.length; i++) {
			if (fFields[i].getType().isPrimitive())
				body.statements().add(createSimpleComparison(fFields[i]));
			else if (fFields[i].getType().isArray())
				body.statements().add(createArrayComparison(fFields[i].getName()));
			else
				body.statements().add(createQualifiedComparison(fFields[i].getName()));
		}

		// the last return true:
		ReturnStatement endReturn= fAst.newReturnStatement();
		endReturn.setExpression(fAst.newBooleanLiteral(true));

		body.statements().add(endReturn);

		// method comment
		if (fSettings != null) {
			ITypeBinding object= fAst.resolveWellKnownType(JAVA_LANG_OBJECT);
			IMethodBinding[] objms= object.getDeclaredMethods();
			IMethodBinding objectMethod= null;
			for (int i= 0; i < objms.length; i++) {
				if (objms[i].getName().equals(METHODNAME_EQUALS) && objms[i].getParameterTypes().length == 1
						&& objms[i].getParameterTypes()[0].getQualifiedName().equals(JAVA_LANG_OBJECT))
					objectMethod= objms[i];
			}
			createMethodComment(equalsMethodDeclaration, objectMethod);
		}

		return equalsMethodDeclaration;
	}

	private Statement createSimpleComparison(IVariableBinding binding) {
		if (isPrimitiveType(binding.getType(), PrimitiveType.FLOAT)) {
			return createReturningIfStatement(createFloatInvocation(getThisAccessForEquals(binding.getName())), createFloatInvocation(getOtherAccess(binding
					.getName())), Operator.NOT_EQUALS, false);
		} else if (isPrimitiveType(binding.getType(), PrimitiveType.DOUBLE)) {
			return createReturningIfStatement(createDoubleInvocation(getThisAccessForEquals(binding.getName())), createDoubleInvocation(getOtherAccess(binding
					.getName())), Operator.NOT_EQUALS, false);
		} else
			return createReturningIfStatement(getThisAccessForEquals(binding.getName()), getOtherAccess(binding.getName()), Operator.NOT_EQUALS, false);
	}

	private Statement createArrayComparison(String name) {
		MethodInvocation invoc= fAst.newMethodInvocation();
		invoc.setName(fAst.newSimpleName(METHODNAME_EQUALS));
		invoc.setExpression(getQualifiedName(JAVA_UTIL_ARRAYS));
		invoc.arguments().add(getThisAccessForEquals(name));
		invoc.arguments().add(getOtherAccess(name));

		PrefixExpression pe= fAst.newPrefixExpression();
		pe.setOperator(PrefixExpression.Operator.NOT);
		pe.setOperand(invoc);

		IfStatement ifSt= fAst.newIfStatement();
		ifSt.setExpression(pe);
		ifSt.setThenStatement(getReturnFalse());

		return ifSt;
	}

	/**
	 * Creates a comparison of reference types.
	 * 
	 * <pre>
	 * if (this.a == null) {
	 * 	if (other.a != null)
	 * 		return false;
	 * } else {
	 * 	if (!this.a.equals(other.a))
	 * 		return false;
	 * }
	 * </pre>
	 */
	private Statement createQualifiedComparison(String name) {
		InfixExpression newCondition= fAst.newInfixExpression();
		newCondition.setOperator(Operator.EQUALS);
		newCondition.setLeftOperand(getThisAccessForEquals(name));
		newCondition.setRightOperand(fAst.newNullLiteral());

		// THEN
		InfixExpression notEqNull= fAst.newInfixExpression();
		notEqNull.setOperator(Operator.NOT_EQUALS);
		notEqNull.setLeftOperand(getOtherAccess(name));
		notEqNull.setRightOperand(fAst.newNullLiteral());

		IfStatement thenPart= fAst.newIfStatement();
		thenPart.setExpression(notEqNull);
		thenPart.setThenStatement(getReturnFalse());

		Block thenPart2= fAst.newBlock();
		thenPart2.statements().add(thenPart);

		// ELSE
		MethodInvocation invoc= fAst.newMethodInvocation();
		invoc.setName(fAst.newSimpleName(METHODNAME_EQUALS));
		invoc.setExpression(getThisAccessForEquals(name));
		invoc.arguments().add(getOtherAccess(name));

		PrefixExpression pe= fAst.newPrefixExpression();
		pe.setOperator(PrefixExpression.Operator.NOT);
		pe.setOperand(invoc);

		IfStatement elsePart= fAst.newIfStatement();
		elsePart.setExpression(pe);
		elsePart.setThenStatement(getReturnFalse());

		// ALL
		IfStatement isNull= fAst.newIfStatement();
		isNull.setExpression(newCondition);
		isNull.setThenStatement(thenPart2);
		isNull.setElseStatement(elsePart);

		return isNull;
	}

	// ************************ HELPERS **************************

	private Statement createReturningIfStatement(Expression left, Expression right, Operator operator, boolean whatToReturn) {
		InfixExpression newCondition= fAst.newInfixExpression();
		newCondition.setOperator(operator);
		newCondition.setLeftOperand(left);
		newCondition.setRightOperand(right);
		return createReturningIfStatement(whatToReturn, newCondition);
	}

	private Statement createReturningIfStatement(boolean result, Expression condition) {
		IfStatement firstIf= fAst.newIfStatement();
		firstIf.setExpression(condition);

		ReturnStatement returner= fAst.newReturnStatement();
		returner.setExpression(fAst.newBooleanLiteral(result));
		firstIf.setThenStatement(returner);
		return firstIf;
	}

	private void createMethodComment(MethodDeclaration newDeclaration, IMethodBinding copyFrom) throws CoreException {
		if (fSettings.createComments) {
			String string= CodeGeneration.getMethodComment(fRewrite.getCu(), fType.getQualifiedName(), newDeclaration, copyFrom, StubUtility.getLineDelimiterUsed(fRewrite.getCu()));
			if (string != null) {
				Javadoc javadoc= (Javadoc) fRewrite.getASTRewrite().createStringPlaceholder(string, ASTNode.JAVADOC);
				newDeclaration.setJavadoc(javadoc);
			}
		}
		if (fSettings.overrideAnnotation && JavaModelUtil.is50OrHigher(fUnit.getJavaElement().getJavaProject()))
			StubUtility2.addOverrideAnnotation(fRewrite.getASTRewrite(), newDeclaration, copyFrom);
	}

	private boolean needsNoSuperCall(ITypeBinding typeBinding, String name, ITypeBinding[] parameters) {
		Assert.isNotNull(typeBinding);
		IMethodBinding binding= findMethodInHierarchy(typeBinding, name, parameters);
		if (binding != null) {
			final ITypeBinding declaring= binding.getDeclaringClass();
			if (Bindings.equals(typeBinding, declaring))
				return true;
			return declaring.getQualifiedName().equals(JAVA_LANG_OBJECT);
		}
		return true;
	}

	// Adapted from Bindings
	public static IMethodBinding findMethodInType(ITypeBinding type, String methodName, ITypeBinding[] parameters) {
		if (type.isPrimitive())
			return null;
		IMethodBinding[] methods= type.getDeclaredMethods();
		for (int i= 0; i < methods.length; i++) {
			if (parameters == null) {
				if (methodName.equals(methods[i].getName()) && !Modifier.isAbstract(methods[i].getModifiers()))
					return methods[i];
			} else {
				if (Bindings.isEqualMethod(methods[i], methodName, parameters) && !Modifier.isAbstract(methods[i].getModifiers()))
					return methods[i];
			}
		}
		return null;
	}

	// Adapted from Bindings
	public static IMethodBinding findMethodInHierarchy(ITypeBinding type, String methodName, ITypeBinding[] parameters) {
		IMethodBinding method= findMethodInType(type, methodName, parameters);
		if (method != null)
			return method;
		ITypeBinding superClass= type.getSuperclass();
		if (superClass != null) {
			method= findMethodInHierarchy(superClass, methodName, parameters);
			if (method != null)
				return method;			
		}
		ITypeBinding[] interfaces= type.getInterfaces();
		for (int i= 0; i < interfaces.length; i++) {
			method= findMethodInHierarchy(interfaces[i], methodName, parameters);
			if (method != null)
				return method;
		}
		return null;
	}

	private Expression getThisAccessForEquals(String name) {
		return getThisAccess(name, false);
	}

	private Expression getThisAccessForHashCode(String name) {
		return getThisAccess(name, true);
	}

	private Expression getThisAccess(String name, boolean forHashCode) {
		if (fSettings.useKeywordThis || needsThisQualification(name, forHashCode)) {
			FieldAccess fa= fAst.newFieldAccess();
			fa.setExpression(fAst.newThisExpression());
			fa.setName(fAst.newSimpleName(name));
			return fa;
		}
		return fAst.newSimpleName(name);
	}

	private Expression getOtherAccess(String name) {
		return fAst.newQualifiedName(fAst.newSimpleName(VARIABLE_NAME_EQUALS_CASTED), fAst.newSimpleName(name));
	}

	private boolean isPrimitiveType(ITypeBinding binding, PrimitiveType.Code code) {
		return (binding.getName().equals(code.toString()));
	}

	private boolean isPrimitiveType(ITypeBinding type, PrimitiveType.Code[] codes) {
		for (int i= 0; i < codes.length; i++) {
			PrimitiveType.Code code= codes[i];
			if (isPrimitiveType(type, code))
				return true;
		}
		return false;
	}

	private Name getQualifiedName(String name) {
		String importedType= fRewrite.getImportRewrite().addImport(name);
		return ASTNodeFactory.newName(fAst, importedType);
	}

	private ReturnStatement getReturnFalse() {
		ReturnStatement falseReturn= fAst.newReturnStatement();
		falseReturn.setExpression(fAst.newBooleanLiteral(false));
		return falseReturn;
	}

	private Expression parenthesize(Expression expression) {
		ParenthesizedExpression pe= fAst.newParenthesizedExpression();
		pe.setExpression(expression);
		return pe;
	}

	private Expression createFloatInvocation(Expression access) {
		return createMethodInvocation(access, "java.lang.Float", "floatToIntBits"); //$NON-NLS-1$ //$NON-NLS-2$
	}

	private Expression createDoubleInvocation(Expression access) {
		return createMethodInvocation(access, "java.lang.Double", "doubleToLongBits"); //$NON-NLS-1$ //$NON-NLS-2$
	}

	private Expression createMethodInvocation(Expression access, String qualifiedClassName, String methodName) {
		MethodInvocation invoc= fAst.newMethodInvocation();
		invoc.setExpression(getQualifiedName(qualifiedClassName));
		invoc.setName(fAst.newSimpleName(methodName));
		invoc.arguments().add(access);
		return invoc;
	}

	private boolean needsThisQualification(String name, boolean isHashCode) {
		if (isHashCode)
			return ( (fDoubleCount > 0 && name.equals(VARIABLE_NAME_DOUBLE_TEMPORARY)) || (name.equals(VARIABLE_NAME_PRIME)) || (name
					.equals(VARIABLE_NAME_RESULT)));
		return ( (name.equals(VARIABLE_NAME_EQUALS_CASTED)) || (name.equals(VARIABLE_NAME_EQUALS_PARAM)));
	}

}
