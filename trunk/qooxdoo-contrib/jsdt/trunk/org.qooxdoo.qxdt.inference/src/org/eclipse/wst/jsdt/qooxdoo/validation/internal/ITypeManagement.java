package org.eclipse.wst.jsdt.qooxdoo.validation.internal;

import org.eclipse.wst.jsdt.core.infer.InferredType;
import org.eclipse.wst.jsdt.qooxdoo.validation.internal.mixins.Mixin;

public interface ITypeManagement {

  public InferredType addType( char[] name );

  public Mixin getMixin( InferredType type );
}
