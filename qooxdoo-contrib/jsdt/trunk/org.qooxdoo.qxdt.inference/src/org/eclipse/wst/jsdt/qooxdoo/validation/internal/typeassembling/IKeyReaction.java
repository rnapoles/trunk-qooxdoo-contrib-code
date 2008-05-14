package org.eclipse.wst.jsdt.qooxdoo.validation.internal.typeassembling;

import org.eclipse.wst.jsdt.core.ast.IObjectLiteralField;
import org.eclipse.wst.jsdt.core.infer.InferredType;

public interface IKeyReaction {

  public void react( IObjectLiteralField field,
                     InferredType currentClassDefinition );
}
