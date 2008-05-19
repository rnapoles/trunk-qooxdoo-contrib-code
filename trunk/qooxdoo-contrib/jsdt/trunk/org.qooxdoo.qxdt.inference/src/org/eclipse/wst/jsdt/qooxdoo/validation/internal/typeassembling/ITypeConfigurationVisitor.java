package org.eclipse.wst.jsdt.qooxdoo.validation.internal.typeassembling;

import org.eclipse.wst.jsdt.core.ast.IObjectLiteralField;
import org.eclipse.wst.jsdt.core.infer.InferredType;
import org.eclipse.wst.jsdt.qooxdoo.validation.internal.mixins.Mixin;

interface ITypeConfigurationVisitor {

  public void visit( IObjectLiteralField field,
                     InferredType currentClassDefinition );

  public void visit( IObjectLiteralField field, Mixin type );
}
