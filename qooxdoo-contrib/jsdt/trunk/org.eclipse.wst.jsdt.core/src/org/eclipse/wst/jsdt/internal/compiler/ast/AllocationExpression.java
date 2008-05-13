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
package org.eclipse.wst.jsdt.internal.compiler.ast;

import org.eclipse.wst.jsdt.core.ast.IASTNode;
import org.eclipse.wst.jsdt.core.ast.IAllocationExpression;
import org.eclipse.wst.jsdt.core.ast.IExpression;
import org.eclipse.wst.jsdt.internal.compiler.ASTVisitor;
import org.eclipse.wst.jsdt.internal.compiler.classfmt.ClassFileConstants;
import org.eclipse.wst.jsdt.internal.compiler.flow.FlowContext;
import org.eclipse.wst.jsdt.internal.compiler.flow.FlowInfo;
import org.eclipse.wst.jsdt.internal.compiler.impl.Constant;
import org.eclipse.wst.jsdt.internal.compiler.lookup.Binding;
import org.eclipse.wst.jsdt.internal.compiler.lookup.BlockScope;
import org.eclipse.wst.jsdt.internal.compiler.lookup.InvocationSite;
import org.eclipse.wst.jsdt.internal.compiler.lookup.LocalTypeBinding;
import org.eclipse.wst.jsdt.internal.compiler.lookup.LocalVariableBinding;
import org.eclipse.wst.jsdt.internal.compiler.lookup.MethodBinding;
import org.eclipse.wst.jsdt.internal.compiler.lookup.NestedTypeBinding;
import org.eclipse.wst.jsdt.internal.compiler.lookup.ProblemMethodBinding;
import org.eclipse.wst.jsdt.internal.compiler.lookup.ProblemReasons;
import org.eclipse.wst.jsdt.internal.compiler.lookup.ReferenceBinding;
import org.eclipse.wst.jsdt.internal.compiler.lookup.SourceTypeBinding;
import org.eclipse.wst.jsdt.internal.compiler.lookup.SyntheticArgumentBinding;
import org.eclipse.wst.jsdt.internal.compiler.lookup.TagBits;
import org.eclipse.wst.jsdt.internal.compiler.lookup.TypeBinding;
import org.eclipse.wst.jsdt.internal.compiler.lookup.TypeConstants;

public class AllocationExpression extends Expression implements InvocationSite, IAllocationExpression {
		
	public TypeReference type;
	public Expression[] arguments;
	public MethodBinding binding;							// exact binding resulting from lookup
	protected MethodBinding codegenBinding;	// actual binding used for code generation (if no synthetic accessor)
	MethodBinding syntheticAccessor;						// synthetic accessor for inner-emulation
	public TypeReference[] typeArguments;	
	public TypeBinding[] genericTypeArguments;
	public FieldDeclaration enumConstant; // for enum constant initializations
    public Expression member;
	public boolean isShort;
	
	
public FlowInfo analyseCode(BlockScope currentScope, FlowContext flowContext, FlowInfo flowInfo) {
	// check captured variables are initialized in current context (26134)
//	checkCapturedLocalInitializationIfNecessary((ReferenceBinding)this.binding.declaringClass.erasure(), currentScope, flowInfo);

	if (this.member!=null)
		flowInfo =
			this.member
				.analyseCode(currentScope, flowContext, flowInfo)
				.unconditionalInits();
	// process arguments
	if (arguments != null) {
		for (int i = 0, count = arguments.length; i < count; i++) {
			flowInfo =
				arguments[i]
					.analyseCode(currentScope, flowContext, flowInfo)
					.unconditionalInits();
		}
	}
	// record some dependency information for exception types
	ReferenceBinding[] thrownExceptions;
	if (((thrownExceptions = this.binding.thrownExceptions).length) != 0) {
		// check exception handling
		flowContext.checkExceptionHandlers(
			thrownExceptions,
			this,
			flowInfo.unconditionalCopy(),
			currentScope);
	}
//	manageEnclosingInstanceAccessIfNecessary(currentScope, flowInfo);
//	manageSyntheticAccessIfNecessary(currentScope, flowInfo);
	
	return flowInfo;
}

public void checkCapturedLocalInitializationIfNecessary(ReferenceBinding checkedType, BlockScope currentScope, FlowInfo flowInfo) {
	if (checkedType.isLocalType() 
			&& !checkedType.isAnonymousType()
			&& !currentScope.isDefinedInType(checkedType)) { // only check external allocations
		NestedTypeBinding nestedType = (NestedTypeBinding) checkedType;
		SyntheticArgumentBinding[] syntheticArguments = nestedType.syntheticOuterLocalVariables();
		if (syntheticArguments != null) 
			for (int i = 0, count = syntheticArguments.length; i < count; i++){
				SyntheticArgumentBinding syntheticArgument = syntheticArguments[i];
				LocalVariableBinding targetLocal;
				if ((targetLocal = syntheticArgument.actualOuterLocalVariable) == null) continue;
				if (targetLocal.declaration != null && !flowInfo.isDefinitelyAssigned(targetLocal)){
					currentScope.problemReporter().uninitializedLocalVariable(targetLocal, this);
				}
			}
	}
}

public Expression enclosingInstance() {
	return null;
}

/**
 * @see org.eclipse.wst.jsdt.internal.compiler.lookup.InvocationSite#genericTypeArguments()
 */
public TypeBinding[] genericTypeArguments() {
	return this.genericTypeArguments;
}

public boolean isSuperAccess() {
	return false;
}

public boolean isTypeAccess() {
	return true;
}

/* Inner emulation consists in either recording a dependency 
 * link only, or performing one level of propagation.
 *
 * Dependency mechanism is used whenever dealing with source target
 * types, since by the time we reach them, we might not yet know their
 * exact need.
 */
public void manageEnclosingInstanceAccessIfNecessary(BlockScope currentScope, FlowInfo flowInfo) {
	if ((flowInfo.tagBits & FlowInfo.UNREACHABLE) != 0) return;
	ReferenceBinding allocatedTypeErasure = (ReferenceBinding) binding.declaringClass.erasure();

	// perform some emulation work in case there is some and we are inside a local type only
	if (allocatedTypeErasure.isNestedType()
		&& currentScope.enclosingSourceType().isLocalType()) {

		if (allocatedTypeErasure.isLocalType()) {
			((LocalTypeBinding) allocatedTypeErasure).addInnerEmulationDependent(currentScope, false);
			// request cascade of accesses
		} else {
			// locally propagate, since we already now the desired shape for sure
			currentScope.propagateInnerEmulation(allocatedTypeErasure, false);
			// request cascade of accesses
		}
	}
}

public void manageSyntheticAccessIfNecessary(BlockScope currentScope, FlowInfo flowInfo) {
	if ((flowInfo.tagBits & FlowInfo.UNREACHABLE) != 0) return;
	// if constructor from parameterized type got found, use the original constructor at codegen time
	this.codegenBinding = this.binding.original();

	ReferenceBinding declaringClass;
	if (this.codegenBinding.isPrivate() && currentScope.enclosingSourceType() != (declaringClass = this.codegenBinding.declaringClass)) {

		// from 1.4 on, local type constructor can lose their private flag to ease emulation
		if ((declaringClass.tagBits & TagBits.IsLocalType) != 0 	&& currentScope.compilerOptions().complianceLevel >= ClassFileConstants.JDK1_4) {
			// constructor will not be dumped as private, no emulation required thus
			this.codegenBinding.tagBits |= TagBits.ClearPrivateModifier;
		} else {
			syntheticAccessor = ((SourceTypeBinding) declaringClass).addSyntheticMethod(this.codegenBinding, isSuperAccess());
			currentScope.problemReporter().needToEmulateMethodAccess(this.codegenBinding, this);
		}
	}
}

public StringBuffer printExpression(int indent, StringBuffer output) {
//	if (this.type != null) { // type null for enum constant initializations
		output.append("new "); //$NON-NLS-1$
		member.print(indent, output);
//	}
	if (typeArguments != null) {
		output.append('<');
		int max = typeArguments.length - 1;
		for (int j = 0; j < max; j++) {
			typeArguments[j].print(0, output);
			output.append(", ");//$NON-NLS-1$
		}
		typeArguments[max].print(0, output);
		output.append('>');
	}
	if (type != null) { // type null for enum constant initializations
		type.printExpression(0, output); 
	}
	if (!isShort)
	{
		output.append('(');
		if (arguments != null) {
			for (int i = 0; i < arguments.length; i++) {
				if (i > 0) output.append(", "); //$NON-NLS-1$
				arguments[i].printExpression(0, output);
			}
		}
		output.append(')');
	} 
	return output;
}

public TypeBinding resolveType(BlockScope scope) {
	// Propagate the type checking to the arguments, and check if the constructor is defined.
	constant = Constant.NotAConstant;
	if (this.member!=null) {
		this.resolvedType=this.member.resolveForAllocation(scope, this);
		if (this.resolvedType!=null && !this.resolvedType.isValidBinding()) {
			scope.problemReporter().invalidType(this, this.resolvedType);
		}
	}
	else if (this.type == null) {
		// initialization of an enum constant
		this.resolvedType = scope.enclosingReceiverType();
	}
	else {
		this.resolvedType = this.type.resolveType(scope, true /* check bounds*/);
		checkParameterizedAllocation: {
			if (this.type instanceof ParameterizedQualifiedTypeReference) { // disallow new X<String>.Y<Integer>()
				ReferenceBinding currentType = (ReferenceBinding)this.resolvedType;
				if (currentType == null) return null;
				do {
					// isStatic() is answering true for toplevel types
					if ((currentType.modifiers & ClassFileConstants.AccStatic) != 0) break checkParameterizedAllocation;
					if (currentType.isRawType()) break checkParameterizedAllocation;
				} while ((currentType = currentType.enclosingType())!= null);
				ParameterizedQualifiedTypeReference qRef = (ParameterizedQualifiedTypeReference) this.type;
				for (int i = qRef.typeArguments.length - 2; i >= 0; i--) {
					if (qRef.typeArguments[i] != null) {
						scope.problemReporter().illegalQualifiedParameterizedTypeAllocation(this.type, this.resolvedType);
						break;
					}
				}
			}
		}
	}
	// will check for null after args are resolved

	// resolve type arguments (for generic constructor call)
	if (this.typeArguments != null) {
		int length = this.typeArguments.length;
		boolean argHasError = false; // typeChecks all arguments
		this.genericTypeArguments = new TypeBinding[length];
		for (int i = 0; i < length; i++) {
			if ((this.genericTypeArguments[i] = this.typeArguments[i].resolveType(scope, true /* check bounds*/)) == null) {
				argHasError = true;
			}
		}
		if (argHasError) {
			return null;
		}
	}
	
	// buffering the arguments' types
	boolean argsContainCast = false;
	TypeBinding[] argumentTypes = Binding.NO_PARAMETERS;
	if (arguments != null) {
		boolean argHasError = false;
		int length = arguments.length;
		argumentTypes = new TypeBinding[length];
		for (int i = 0; i < length; i++) {
			Expression argument = this.arguments[i];
			if (argument instanceof CastExpression) {
				argument.bits |= DisableUnnecessaryCastCheck; // will check later on
				argsContainCast = true;
			}
			if ((argumentTypes[i] = argument.resolveType(scope)) == null) {
				argHasError = true;
				argumentTypes[i]=TypeBinding.UNKNOWN;
			}
		}
//		if (argHasError) {
//			if (this.resolvedType instanceof ReferenceBinding) {
//				// record a best guess, for clients who need hint about possible contructor match
//				TypeBinding[] pseudoArgs = new TypeBinding[length];
//				for (int i = length; --i >= 0;)
//					pseudoArgs[i] = argumentTypes[i] == null ? this.resolvedType : argumentTypes[i]; // replace args with errors with receiver
//				this.binding = scope.findMethod((ReferenceBinding) this.resolvedType, TypeConstants.INIT, pseudoArgs, this);
//			}
//			return this.resolvedType;
//		}
	}
	if (this.resolvedType == null || this.resolvedType.isAnyType())
	{
		this.binding= new ProblemMethodBinding(
				TypeConstants.INIT,
				Binding.NO_PARAMETERS,
				ProblemReasons.NotFound);
		this.resolvedType=TypeBinding.UNKNOWN;
		return this.resolvedType;
		 
	}

	// null type denotes fake allocation for enum constant inits
	if (this.type != null && !this.resolvedType.canBeInstantiated()) {
		scope.problemReporter().cannotInstantiate(type, this.resolvedType);
		return this.resolvedType;
	}
	if (!this.resolvedType.isValidBinding())
		return null;
	if (this.resolvedType instanceof ReferenceBinding )
	{
		ReferenceBinding allocationType = (ReferenceBinding) this.resolvedType;
		if (!(binding = scope.getConstructor(allocationType, argumentTypes, this)).isValidBinding()) {
			if (binding.declaringClass == null)
				binding.declaringClass = allocationType;
			scope.problemReporter().invalidConstructor(this, binding);
			return this.resolvedType;
		}
		if (argumentTypes.length!=binding.parameters.length)
			scope.problemReporter().wrongNumberOfArguments(this, binding);
		if (isMethodUseDeprecated(binding, scope, true))
			scope.problemReporter().deprecatedMethod(binding, this);
		checkInvocationArguments(scope, null, allocationType, this.binding, this.arguments, argumentTypes, argsContainCast, this);
	}

	return this.resolvedType;
}

public void setActualReceiverType(ReferenceBinding receiverType) {
	// ignored
}

public void setDepth(int i) {
	// ignored
}

public void setFieldIndex(int i) {
	// ignored
}

public void traverse(ASTVisitor visitor, BlockScope scope) {
	if (visitor.visit(this, scope)) {
		if (this.typeArguments != null) {
			for (int i = 0, typeArgumentsLength = this.typeArguments.length; i < typeArgumentsLength; i++) {
				this.typeArguments[i].traverse(visitor, scope);
			}
		}
		if (this.member!=null)
			this.member.traverse(visitor, scope);
		else if (this.type != null) { // enum constant scenario
			this.type.traverse(visitor, scope);
		}
		if (this.arguments != null) {
			for (int i = 0, argumentsLength = this.arguments.length; i < argumentsLength; i++)
				this.arguments[i].traverse(visitor, scope);
		}
	}
	visitor.endVisit(this, scope);
}
public int getASTType() {
	return IASTNode.ALLOCATION_EXPRESSION;

}

public IExpression getMember() {
	return this.member;
}
}
