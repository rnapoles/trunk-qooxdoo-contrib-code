package org.eclipse.wst.jsdt.qooxdoo.validation;

import org.eclipse.wst.jsdt.core.ast.IFunctionExpression;
import org.eclipse.wst.jsdt.core.ast.IObjectLiteralField;
import org.eclipse.wst.jsdt.core.ast.ISingleNameReference;
import org.eclipse.wst.jsdt.core.infer.InferredAttribute;
import org.eclipse.wst.jsdt.core.infer.InferredMember;
import org.eclipse.wst.jsdt.core.infer.InferredMethod;
import org.eclipse.wst.jsdt.core.infer.InferredType;
import org.eclipse.wst.jsdt.internal.compiler.ast.MethodDeclaration;
import org.eclipse.wst.jsdt.internal.compiler.classfmt.ClassFileConstants;

public class AttributesModifier extends ClassModifier {

  private final InferredType type;
  private boolean isStatic;

  public AttributesModifier( InferredType type, boolean isStatic ) {
    this.type = type;
    this.isStatic = isStatic;
  }

  public void visit( IObjectLiteralField literal ) {
    if( literal.getInitializer() instanceof IFunctionExpression ) {
      addMethod( literal,
                 ( ( IFunctionExpression )literal.getInitializer() ).getMethodDeclaration() );
    } else {
      addAttribute( literal,
                    ( ( ISingleNameReference )literal.getFieldName() ).getToken() );
    }
  }

  protected InferredMethod addMethod( IObjectLiteralField literal,
                                      MethodDeclaration methodDeclaration )
  {
    char[] name = ( ( ISingleNameReference )literal.getFieldName() ).getToken();
    InferredMethod result = type.addMethod( name, methodDeclaration, false );
    result.isStatic = isStatic;
    setPosition( literal, result );
    setVisibility( name, methodDeclaration );
    return result;
  }

  protected InferredAttribute addAttribute( IObjectLiteralField literal,
                                            char[] attrName )
  {
    InferredAttribute result = type.addAttribute( attrName, literal );
    result.isStatic = isStatic;
    setPosition( literal, result );
    return result;
  }

  private void setVisibility( char[] name, MethodDeclaration methodDeclaration )
  {
    int result = ClassFileConstants.AccPublic;
    if( name.length > 0 && name[ 0 ] == '_' ) {
      result = ClassFileConstants.AccProtected;
      if( name.length > 1 && name[ 1 ] == '_' ) {
        result = ClassFileConstants.AccPrivate;
      }
    }
    // methodDeclaration.selector = name;
    methodDeclaration.modifiers = result;
  }

  private void setPosition( IObjectLiteralField literal, InferredMember im ) {
    im.nameStart = literal.getFieldName().sourceStart();
  }
}
