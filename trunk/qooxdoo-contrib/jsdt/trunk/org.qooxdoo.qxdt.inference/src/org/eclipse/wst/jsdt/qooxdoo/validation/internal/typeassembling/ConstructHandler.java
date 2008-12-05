package org.eclipse.wst.jsdt.qooxdoo.validation.internal.typeassembling;

import org.eclipse.wst.jsdt.core.ast.IFunctionExpression;
import org.eclipse.wst.jsdt.core.ast.IObjectLiteralField;
import org.eclipse.wst.jsdt.core.infer.InferredType;
import org.eclipse.wst.jsdt.internal.compiler.ast.MethodDeclaration;
import org.eclipse.wst.jsdt.internal.compiler.classfmt.ClassFileConstants;

final class ConstructHandler extends AbstractTypeConfigurationHandler {

  public ConstructHandler() {
    super( "construct" );
  }

  public void visit( IObjectLiteralField field, InferredType classDef ) {
    if( field.getInitializer() instanceof IFunctionExpression ) {
      MethodDeclaration md = ( ( IFunctionExpression )field.getInitializer() ).getMethodDeclaration();
      md.modifiers = ClassFileConstants.AccPublic;
      InferredType theType = classDef;
      theType.addMethod( theType.getName(), md, true );
    }
  }

}
