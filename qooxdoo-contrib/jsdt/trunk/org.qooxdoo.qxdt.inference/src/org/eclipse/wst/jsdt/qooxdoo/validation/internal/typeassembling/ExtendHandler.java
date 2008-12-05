package org.eclipse.wst.jsdt.qooxdoo.validation.internal.typeassembling;

import org.eclipse.wst.jsdt.core.ast.IExpression;
import org.eclipse.wst.jsdt.core.ast.IFieldReference;
import org.eclipse.wst.jsdt.core.ast.IObjectLiteralField;
import org.eclipse.wst.jsdt.core.ast.IReference;
import org.eclipse.wst.jsdt.core.ast.ISingleNameReference;
import org.eclipse.wst.jsdt.core.infer.InferredType;
import org.eclipse.wst.jsdt.qooxdoo.validation.PleaseOpenBugException;
import org.eclipse.wst.jsdt.qooxdoo.validation.internal.ITypeManagement;
import org.eclipse.wst.jsdt.qooxdoo.validation.internal.MethodCreator;

final class ExtendHandler extends AbstractTypeConfigurationHandler {

  private final ITypeManagement typeManager;

  public ExtendHandler( ITypeManagement typeManager ) {
    super( "extend" );
    this.typeManager = typeManager;
  }

  public void visit( IObjectLiteralField field, InferredType currentClassDef ) {
    setSuperClass( field.getInitializer(), currentClassDef );
  }

  private void setSuperClass( IExpression initializer,
                              InferredType currentClassDef )
  {
    char[] name;
    if( initializer instanceof ISingleNameReference ) {
      ISingleNameReference snr = ( ISingleNameReference )initializer;
      name = snr.getToken();
    } else if( initializer instanceof IFieldReference ) {
      IFieldReference fr = ( IFieldReference )initializer;
      name = fr.toString().toCharArray();
    } else {
      throw new PleaseOpenBugException( "can't handle type (yet):"
                                        + initializer.getClass() );
    }
    InferredType superType = typeManager.addType( name );
    superType.addMethod( "base".toCharArray(),
                         MethodCreator.createFakeMethodNoArgs( ( IReference )initializer,
                                                               "base".toCharArray() ),
                         false );
    currentClassDef.superClass = superType;
  }
}
