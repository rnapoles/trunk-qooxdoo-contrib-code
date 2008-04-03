package org.eclipse.wst.jsdt.qooxdoo.validation;

import java.util.Stack;

import org.eclipse.core.runtime.Assert;
import org.eclipse.wst.jsdt.core.ast.IASTNode;
import org.eclipse.wst.jsdt.core.ast.IExpression;
import org.eclipse.wst.jsdt.core.ast.IFunctionCall;
import org.eclipse.wst.jsdt.core.ast.IFunctionExpression;
import org.eclipse.wst.jsdt.core.ast.IObjectLiteralField;
import org.eclipse.wst.jsdt.core.ast.ISingleNameReference;
import org.eclipse.wst.jsdt.core.ast.IStringLiteral;
import org.eclipse.wst.jsdt.core.ast.IThisReference;
import org.eclipse.wst.jsdt.core.infer.InferEngine;
import org.eclipse.wst.jsdt.core.infer.InferredAttribute;
import org.eclipse.wst.jsdt.core.infer.InferredType;
import org.eclipse.wst.jsdt.internal.compiler.ast.CompilationUnitDeclaration;
import org.eclipse.wst.jsdt.internal.compiler.ast.Expression;
import org.eclipse.wst.jsdt.internal.compiler.ast.MethodDeclaration;
import org.eclipse.wst.jsdt.internal.compiler.classfmt.ClassFileConstants;

public class QooxdooInferrenceSupport extends InferEngine {

  private CompilationUnitDeclaration compilationUnit;
  private Stack<InferredType> classDefinitionStack = new Stack<InferredType>();
  private Stack<IObjectLiteralField> memberTypeStack = new Stack<IObjectLiteralField>();
  private Stack<IClassModifier> classModificationStack = new Stack<IClassModifier>();

  public QooxdooInferrenceSupport() {
  }

  @Override
  public void setCompilationUnit( CompilationUnitDeclaration compilationUnit ) {
    this.compilationUnit = compilationUnit;
    super.setCompilationUnit( compilationUnit );
  }

  @Override
  protected boolean handleFunctionCall( IFunctionCall messageSend ) {
    if( isQxClassDefined( messageSend ) ) {
      IExpression firstArg = messageSend.getArguments()[ 0 ];
      String name = getTrimmedName( ( IStringLiteral )firstArg );
      InferredType type = null;
      if( name.contains( "." ) ) {
        type = getTypeWithNamespace( name, firstArg );
      } else {
        type = addType( name.toCharArray() );
        type.isDefinition = true;
      }
      classDefinitionStack.push( type );
    }
    return true;
  }

  private InferredType getTypeWithNamespace( String fullName, IASTNode definiter )
  {
    String[] split = fullName.split( "\\." );
    InferredType parent = null;
    for( String each : split ) {
      InferredType child;
      if( parent == null ) {
        child = addType( each.toCharArray() );
        child.isDefinition = true;
      } else {
        String fullQualifiedName = new String( parent.getName() ) + "." + each;
        child = addType( fullQualifiedName.toCharArray() );
        child.isDefinition = true;
        InferredAttribute attribute = parent.addAttribute( each.toCharArray(),
                                                           definiter );
        attribute.isStatic = true;
      }
      parent = child;
    }
    return parent;
  }

  @Override
  public void endVisit( IFunctionCall messageSend ) {
    if( isQxClassDefined( messageSend ) ) {
      InferredType obj = classDefinitionStack.pop();
      Assert.isNotNull( obj );
    }
    super.endVisit( messageSend );
  }

  @Override
  public boolean visit( IObjectLiteralField field ) {
    memberTypeStack.push( field );
    int prevClassModStackSize = classModificationStack.size();
    if( classModificationStack.size() > 0 ) {
      classModificationStack.peek().add( field );
      classModificationStack.push( classModificationStack.peek()
        .getDetailsModifier( field ) );
    }
    if( "statics".equals( getName( field.getFieldName() ) ) ) {
      classModificationStack.push( new AttributesModifier( classDefinitionStack.peek(),
                                                           true ) );
    } else if( "members".equals( getName( field.getFieldName() ) ) ) {
      classModificationStack.push( new AttributesModifier( classDefinitionStack.peek(),
                                                           false ) );
    } else if( "properties".equals( getName( field.getFieldName() ) ) ) {
      classModificationStack.push( new PropertiesModifier( classDefinitionStack.peek() ) );
    } else if( "construct".equals( getName( field.getFieldName() ) ) ) {
      MethodDeclaration md = ( ( IFunctionExpression )field.getInitializer() ).getMethodDeclaration();
      md.modifiers = ClassFileConstants.AccPublic;
      InferredType theType = classDefinitionStack.peek();
      theType.addMethod( theType.getName(), md, true );
    } else if( "extend".equals( getName( field.getFieldName() ) ) ) {
      // TODO Button has a FieldReference
      if( field.getInitializer() instanceof ISingleNameReference ) {
        ISingleNameReference initializer = ( ISingleNameReference )field.getInitializer();
        classDefinitionStack.peek().superClass = addType( initializer.getToken() );
      }
    }
    if( prevClassModStackSize == classModificationStack.size() ) {
      classModificationStack.push( new ClassModifier() );
    }
    return true;
  }

  @Override
  public boolean visit( IThisReference qualifiedThisReference ) {
    return true;
  }
  
  
  @Override
  public void endVisit( IObjectLiteralField field ) {
    IObjectLiteralField pop = memberTypeStack.pop();
    if( classModificationStack.size() > 0 ) {
      classModificationStack.pop();
    }
    Assert.isLegal( field.equals( pop ),
                    field+ " is not " + pop );
    super.endVisit( field );
  }

  private boolean isQxClassDefined( IFunctionCall messageSend ) {
    return messageSend.getReceiver() != null
           && "qx.Class".equals( messageSend.getReceiver().toString() )
           && "define".equals( new String( messageSend.getSelector() ) );
  }

  private String getTrimmedName( IStringLiteral firstArg ) {
    return new String( firstArg.source());
  }

  private static void printExpression( IExpression expression, StringBuffer out )
  {
    ( ( Expression )expression ).printExpression( 0, out );
  }

  static String getName( IExpression expression ) {
    ISingleNameReference nameref = (ISingleNameReference) expression;
    return new String( nameref.getToken() );
  }
}
