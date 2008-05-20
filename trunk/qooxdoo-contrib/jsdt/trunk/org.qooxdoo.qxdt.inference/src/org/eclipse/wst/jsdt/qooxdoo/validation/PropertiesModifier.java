package org.eclipse.wst.jsdt.qooxdoo.validation;

import org.eclipse.wst.jsdt.core.ast.IExpression;
import org.eclipse.wst.jsdt.core.ast.IFunctionDeclaration;
import org.eclipse.wst.jsdt.core.ast.IObjectLiteral;
import org.eclipse.wst.jsdt.core.ast.IObjectLiteralField;
import org.eclipse.wst.jsdt.core.ast.ISingleNameReference;
import org.eclipse.wst.jsdt.core.ast.IStringLiteral;
import org.eclipse.wst.jsdt.core.infer.InferredMethod;
import org.eclipse.wst.jsdt.core.infer.InferredType;
import org.eclipse.wst.jsdt.internal.compiler.ast.Argument;
import org.eclipse.wst.jsdt.internal.compiler.ast.MethodDeclaration;
import org.eclipse.wst.jsdt.internal.compiler.classfmt.ClassFileConstants;
import org.eclipse.wst.jsdt.qooxdoo.validation.internal.MethodCreator;

public class PropertiesModifier implements IClassModifier {

  private final class DynamicPropertyModifier extends ClassModifier {

    private ISingleNameReference origName;

    public DynamicPropertyModifier( ISingleNameReference origName ) {
      this.origName = origName;
    }

    @Override
    public void visit( IObjectLiteralField field ) {
      if( field.getFieldName() instanceof ISingleNameReference ) {
        ISingleNameReference name = ( ISingleNameReference )field.getFieldName();
        if( "check".equals( new String( name.getToken() ) ) ) {
          if( "Boolean".equals( getValue( field.getInitializer() ) ) ) {
            createMethodNoArgs( "toggle", origName );
            createMethodNoArgs( "is", origName );
          }
        } else if( "inheritable".equals( new String( name.getToken() ) ) ) {
          createMethodNoArgs( "refresh", origName );
        } else if( "themeable".equals( new String( name.getToken() ) ) ) {
          createMethodNoArgs( "style", origName );
          createMethodNoArgs( "unstyle", origName );
        } else if( "init".equals( new String( name.getToken() ) ) ) {
          createMethodNoArgs( "init", origName );
        }
      }
    }

    private String getValue( IExpression initializer ) {
      String result = null;
      if( initializer instanceof IStringLiteral ) {
        IStringLiteral sl = ( IStringLiteral )initializer;
        result = new String( sl.source() );
      }
      return result;
    }
  }

  private final InferredType itype;
  private IClassModifier detailsModifier;

  public PropertiesModifier( InferredType itype ) {
    this.itype = itype;
  }

  public void visit( IObjectLiteralField field ) {
    ISingleNameReference name = ( ISingleNameReference )field.getFieldName();
    createSetter( "set", name );
    createGetter( name );
    createResetter( name );
    detailsModifier = new DynamicPropertyModifier( name );
  }

  public void endVisit( IObjectLiteralField field ) {
    ISingleNameReference name = ( ISingleNameReference )field.getFieldName();
    createSetter( "init", name ); // no effect if already added by the
                                  // detailsModifier.
  }

  public IClassModifier getDetailsModifier( IObjectLiteralField field ) {
    IClassModifier result = new ClassModifier();
    if( field.getInitializer() instanceof IObjectLiteral ) {
      result = detailsModifier;
    }
    return result;
  }

  // helper methods
  // //////////////////

  private void createGetter( ISingleNameReference name ) {
    createMethodNoArgs( "get", name );
  }

  private void createResetter( ISingleNameReference name ) {
    createMethodNoArgs( "reset", name );
  }

  /**
   * Creates a setter using the given prefix instead of just "set".
   * 
   * @param prefix
   * @param name
   */
  private void createSetter( String prefix, ISingleNameReference name ) {
    char[] methodName = getMethodName( prefix, name );
    IFunctionDeclaration fakeMd = createFakeSetter( name, methodName );
    InferredMethod md = itype.addMethod( methodName, fakeMd, false );
  }

  private void createMethodNoArgs( String prefix, ISingleNameReference name ) {
    char[] methodName = getMethodName( prefix, name );
    IFunctionDeclaration fakeMd = MethodCreator.createFakeMethodNoArgs( name,
                                                                        methodName );
    itype.addMethod( methodName, fakeMd, false );
  }

  private IFunctionDeclaration createFakeSetter( ISingleNameReference name,
                                                 char[] methodName )
  {
    MethodDeclaration fakeMd = MethodCreator.createFakeMethodNoArgs( name,
                                                                     methodName );
    fakeMd.arguments = new Argument[]{
      new Argument( name.getToken(), 0, null, ClassFileConstants.AccPublic )
    };

    // // no visible effect:
    // int modifiers = ClassFileConstants.AccPublic;
    // fakeMd.binding = new MethodBinding( modifiers,
    // methodName,
    // TypeBinding.VOID,
    // new TypeBinding[] { TypeBinding.BOOLEAN },
    // null,
    // itype.binding);
    return fakeMd;
  }

  private char[] getMethodName( String prefix, ISingleNameReference fieldName )
  {
    char[] postfix = capitalize( fieldName.getToken() );
    char[] result = new char[ prefix.length() + fieldName.getToken().length ];
    System.arraycopy( prefix.toCharArray(), 0, result, 0, prefix.length() );
    System.arraycopy( postfix, 0, result, prefix.length(), postfix.length );
    return result;
  }

  private char[] capitalize( char[] token ) {
    char[] result = new char[ token.length ];
    result[ 0 ] = Character.toUpperCase( token[ 0 ] );
    System.arraycopy( token, 1, result, 1, token.length - 1 );
    return result;
  }
}

/*******************************************************************************
 * $Log: PropertiesModifier.java,v $
 ******************************************************************************/
