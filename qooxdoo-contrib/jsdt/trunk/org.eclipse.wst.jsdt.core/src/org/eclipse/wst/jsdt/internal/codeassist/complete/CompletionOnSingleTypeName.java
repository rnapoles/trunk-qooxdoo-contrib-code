package org.eclipse.wst.jsdt.internal.codeassist.complete;

import org.eclipse.wst.jsdt.internal.compiler.ast.ASTNode;
import org.eclipse.wst.jsdt.internal.compiler.ast.SingleNameReference;
import org.eclipse.wst.jsdt.internal.compiler.lookup.BlockScope;
import org.eclipse.wst.jsdt.internal.compiler.lookup.Scope;
import org.eclipse.wst.jsdt.internal.compiler.lookup.TypeBinding;

public class CompletionOnSingleTypeName extends SingleNameReference  {

	public CompletionOnSingleTypeName(char[] source, long pos) {
		super(source, pos);
	}

	public StringBuffer printExpression(int indent, StringBuffer output) {

		output.append("<CompleteOnType:"); //$NON-NLS-1$
		return output.append(token).append('>');
	}
	public void aboutToResolve(Scope scope) {
		throw new CompletionNodeFound(this, scope);
	}

	public boolean isSpecialNode()
	{
		return true;
	}

	public TypeBinding resolveType(BlockScope scope) {
		throw new CompletionNodeFound(this, scope);
	}

	public TypeBinding resolveForAllocation(BlockScope scope, ASTNode location)
	{
		throw new CompletionNodeFound(this, scope);
	}
}
