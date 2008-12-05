package org.eclipse.wst.jsdt.qooxdoo.validation.internal.typeassembling;

import org.eclipse.wst.jsdt.core.ast.IObjectLiteralField;
import org.eclipse.wst.jsdt.core.infer.InferredType;

interface ITypeConfigurationVisitor {

  public void visit( IObjectLiteralField field,
                     InferredType currentClassDefinition );
}
