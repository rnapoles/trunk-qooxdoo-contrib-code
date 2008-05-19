package org.eclipse.wst.jsdt.qooxdoo.validation.internal.mixins;

import org.eclipse.wst.jsdt.core.ast.IObjectLiteralField;
import org.eclipse.wst.jsdt.core.infer.InferredAttribute;
import org.eclipse.wst.jsdt.core.infer.InferredMethod;
import org.eclipse.wst.jsdt.internal.compiler.ast.MethodDeclaration;
import org.eclipse.wst.jsdt.qooxdoo.validation.AttributesModifier;
import org.eclipse.wst.jsdt.qooxdoo.validation.IClassModifier;

public class MixinAttributesModifier extends AttributesModifier
  implements IClassModifier
{

  private final Mixin mixin;

  public MixinAttributesModifier( Mixin mixin ) {
    super( mixin.getType(), false );
    this.mixin = mixin;
  }

  @Override
  protected InferredMethod addMethod( IObjectLiteralField literal,
                                      MethodDeclaration methodDeclaration )
  {
    InferredMethod method = super.addMethod( literal, methodDeclaration );
    mixin.addMethod( method );
    return method;
  }

  @Override
  protected InferredAttribute addAttribute( IObjectLiteralField literal,
                                            char[] attrName )
  {
    InferredAttribute result = super.addAttribute( literal, attrName );
    mixin.addAttribute( result );
    return result;
  }
}
