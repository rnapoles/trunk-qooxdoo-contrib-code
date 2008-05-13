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
import org.eclipse.wst.jsdt.core.ast.IFloatLiteral;
import org.eclipse.wst.jsdt.internal.compiler.ASTVisitor;
import org.eclipse.wst.jsdt.internal.compiler.impl.FloatConstant;
import org.eclipse.wst.jsdt.internal.compiler.lookup.BlockScope;
import org.eclipse.wst.jsdt.internal.compiler.lookup.TypeBinding;
import org.eclipse.wst.jsdt.internal.compiler.util.FloatUtil;

public class FloatLiteral extends NumberLiteral implements IFloatLiteral {
	float value;
	final static float Float_MIN_VALUE = Float.intBitsToFloat(1); // work-around VAJ problem 1F6IGUU
	public FloatLiteral(char[] token, int s, int e) {
		super(token, s, e);
	}
	public void computeConstant() {
		Float computedValue;
		try {
			computedValue = Float.valueOf(String.valueOf(source));
		} catch (NumberFormatException e) {
			// hex floating point literal
			// being rejected by 1.4 libraries where Float.valueOf(...) doesn't handle hex decimal floats
			try {
				float v = FloatUtil.valueOfHexFloatLiteral(source);
				if (v == Float.POSITIVE_INFINITY) {
					// error: the number is too large to represent
					return;
				}
				if (Float.isNaN(v)) {
					// error: the number is too small to represent
					return;
				}
				value = v;
				constant = FloatConstant.fromValue(v);
			} catch (NumberFormatException e1) {
				// if the computation of the constant fails
			}
			return;
		}

		final float floatValue = computedValue.floatValue();
		if (floatValue > Float.MAX_VALUE) {
			// error: the number is too large to represent
			return;
		}
		if (floatValue < Float.MIN_VALUE) {
			// see 1F6IGUU
			// a true 0 only has '0' and '.' in mantissa
			// 1.0e-5000d is non-zero, but underflows to 0
			boolean isHexaDecimal = false;
			label : for (int i = 0; i < source.length; i++) { //it is welled formated so just test against '0' and potential . D d
				switch (source[i]) {
					case '0' :
					case '.' :
						break;
					case 'x' :
					case 'X' :
						isHexaDecimal = true;
						break;
					case 'e' :
					case 'E' :
					case 'f' :
					case 'F' :
					case 'd' :
					case 'D' :
						if (isHexaDecimal) {
							return;
						}
						// starting the exponent - mantissa is all zero
						// no exponent - mantissa is all zero
						break label;
					case 'p' :
					case 'P' :
						break label;
					default :
						// error: the number is too small to represent
						return;
				}
			}
		}
		value = floatValue;
		constant = FloatConstant.fromValue(value);
	}
	public TypeBinding literalType(BlockScope scope) {
		return TypeBinding.FLOAT;
	}
	public void traverse(ASTVisitor visitor, BlockScope scope) {
		visitor.visit(this, scope);
		visitor.endVisit(this, scope);
	}
	public int getASTType() {
		return IASTNode.FLOAT_LITERAL;
	
	}
}
