package org.eclipse.wst.jsdt.qooxdoo.validation.internal.typeassembling;

import org.eclipse.wst.jsdt.core.ast.IExpression;
import org.eclipse.wst.jsdt.core.ast.IFieldReference;
import org.eclipse.wst.jsdt.core.ast.IObjectLiteralField;
import org.eclipse.wst.jsdt.core.ast.ISingleNameReference;
import org.eclipse.wst.jsdt.core.infer.InferredAttribute;
import org.eclipse.wst.jsdt.core.infer.InferredType;
import org.eclipse.wst.jsdt.qooxdoo.validation.internal.ITypeManagement;
import org.eclipse.wst.jsdt.qooxdoo.validation.internal.mixins.Mixin;

public class IncludeHandler extends AbstractTypeConfigurationHandler {

  public IncludeHandler( ITypeManagement typeManager ) {
    super( "include" );
  }

  public void visit( IObjectLiteralField field,
                     InferredType currentClassDefinition )
  {
    IExpression initializer = field.getInitializer();
    currentClassDefinition.addMixin( getMixinName( initializer ) );
	}  

  public void visit( IObjectLiteralField field, Mixin type ) {
    // FIXME m_kempka IMPLEMENT ME May 15, 2008
  }

  private char[] getMixinName( IExpression initializer ) {
    char[] result = "".toCharArray();
    if( initializer instanceof ISingleNameReference ) {
      result = ( ( ISingleNameReference )initializer ).getToken();
    } else if( initializer instanceof IFieldReference ) {
      IFieldReference fr = ( IFieldReference )initializer;
      result = fr.toString().toCharArray();
    }
    return result;
  }
}
