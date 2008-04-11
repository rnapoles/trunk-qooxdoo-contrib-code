/*******************************************************************************
 * Copyright (c) 2005 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.wst.jsdt.internal.codeassist.complete;

import org.eclipse.wst.jsdt.internal.compiler.ast.MemberValuePair;
import org.eclipse.wst.jsdt.internal.compiler.ast.NormalAnnotation;
import org.eclipse.wst.jsdt.internal.compiler.ast.TypeReference;
import org.eclipse.wst.jsdt.internal.compiler.lookup.BlockScope;
import org.eclipse.wst.jsdt.internal.compiler.lookup.TypeBinding;

public class CompletionOnAnnotationMemberValuePair extends NormalAnnotation {
	public MemberValuePair completedMemberValuePair;
	public CompletionOnAnnotationMemberValuePair(TypeReference type, int sourceStart, MemberValuePair[] memberValuePairs, MemberValuePair completedMemberValuePair) {
		super(type, sourceStart);
		this.memberValuePairs = memberValuePairs;
		this.completedMemberValuePair = completedMemberValuePair;
	}

	public TypeBinding resolveType(BlockScope scope) {
		super.resolveType(scope);

		if (this.resolvedType == null || !this.resolvedType.isValidBinding()) {
			throw new CompletionNodeFound();
		} else {
			throw new CompletionNodeFound(this.completedMemberValuePair, scope);
		}
	}

	public StringBuffer printExpression(int indent, StringBuffer output) {
		output.append('@');
		this.type.printExpression(0, output);
		output.append('(');
		if (this.memberValuePairs != null) {
			for (int i = 0, max = this.memberValuePairs.length; i < max; i++) {
				if (i > 0) {
					output.append(',');
				}
				this.memberValuePairs[i].print(indent, output);
			}
			output.append(',');
		}
		this.completedMemberValuePair.print(indent, output);
		output.append(')');

		return output;
	}
}
