package org.eclipse.wst.jsdt.qooxdoo.validation;

import java.util.Stack;

import org.eclipse.core.runtime.Assert;
import org.eclipse.wst.jsdt.core.ast.IASTNode;
import org.eclipse.wst.jsdt.core.ast.IExpression;
import org.eclipse.wst.jsdt.core.ast.IFieldReference;
import org.eclipse.wst.jsdt.core.ast.IFunctionCall;
import org.eclipse.wst.jsdt.core.ast.IFunctionExpression;
import org.eclipse.wst.jsdt.core.ast.IObjectLiteralField;
import org.eclipse.wst.jsdt.core.ast.IReference;
import org.eclipse.wst.jsdt.core.ast.ISingleNameReference;
import org.eclipse.wst.jsdt.core.ast.IStringLiteral;
import org.eclipse.wst.jsdt.core.ast.IThisReference;
import org.eclipse.wst.jsdt.core.infer.InferEngine;
import org.eclipse.wst.jsdt.core.infer.InferredAttribute;
import org.eclipse.wst.jsdt.core.infer.InferredType;
import org.eclipse.wst.jsdt.internal.compiler.ast.CompilationUnitDeclaration;
import org.eclipse.wst.jsdt.internal.compiler.ast.MethodDeclaration;
import org.eclipse.wst.jsdt.internal.compiler.classfmt.ClassFileConstants;
import org.eclipse.wst.jsdt.qooxdoo.validation.internal.MethodCreator;

public class QooxdooInferrenceSupport extends InferEngine {

  private CompilationUnitDeclaration compilationUnit;
  private Stack<InferredType> classDefinitionStack = new Stack<InferredType>();
  private Stack<IObjectLiteralField> memberTypeStack = new Stack<IObjectLiteralField>();
  private Stack<IClassModifier> classModificationStack = new Stack<IClassModifier>();

  public QooxdooInferrenceSupport() {
  }

  // interface methods from InferEngine
  ///////////////////////////////////////////////////
  
  @Override
  public void setCompilationUnit( CompilationUnitDeclaration compilationUnit ) {
    this.compilationUnit = compilationUnit;
    super.setCompilationUnit( compilationUnit );
  }

  @Override
  protected boolean handleFunctionCall( IFunctionCall messageSend ) {
    if( isQxClassDefined( messageSend ) ) {
      handleQxClassDefinition( messageSend );
    }
    return true; 
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
      setSuperClass( field.getInitializer() );
    }
    if( prevClassModStackSize == classModificationStack.size() ) {
      classModificationStack.push( new ClassModifier() );
    }
    return true;
  }

  @Override
  public boolean visit( IThisReference tr ) {
    InferredType type = getTypeOf( tr );
    if( !type.equals( classDefinitionStack.peek())) {
      type.superClass = classDefinitionStack.peek();
    }
    return true;
  }

  @Override
  public void endVisit( IObjectLiteralField field ) {
    IObjectLiteralField pop = memberTypeStack.pop();
    if( classModificationStack.size() > 0 ) {
      classModificationStack.pop();
    }
    Assert.isLegal( field.equals( pop ), field + " is not " + pop );
    super.endVisit( field );
  }
  
  // helper methods
  ////////////////////

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

  private void startClassDefinition( IExpression firstArg ) {
    String name = new String( ( ( IStringLiteral )firstArg ).source() );
    InferredType type = null;
    if( name.contains( "." ) ) {
      type = getTypeWithNamespace( name, firstArg );
    } else {
      type = addType( name.toCharArray() );
      type.isDefinition = true;
    }
    classDefinitionStack.push( type );
  }

  private void handleQxClassDefinition( IFunctionCall messageSend ) {
    IExpression firstArg = messageSend.getArguments()[ 0 ];
    startClassDefinition( firstArg );
  }

  private boolean isQxClassDefined( IFunctionCall messageSend ) {
    return messageSend.getReceiver() != null
           && "qx.Class".equals( messageSend.getReceiver().toString() )
           && "define".equals( new String( messageSend.getSelector() ) );
  }

  private String getName( IExpression expression ) {
    ISingleNameReference nameref = ( ISingleNameReference )expression;
    return new String( nameref.getToken() );
  }

  private void setSuperClass( IExpression initializer ) {
    char[] name;
    if( initializer instanceof ISingleNameReference ) {
      ISingleNameReference snr = ( ISingleNameReference )initializer;
      name = snr.getToken();
      InferredType superType = addType( name );
      superType.addMethod( "base".toCharArray(),
                           MethodCreator.createFakeMethodNoArgs( snr,
                                                   "base".toCharArray() ),
                           false );
      classDefinitionStack.peek().superClass = superType;
    } else if( initializer instanceof IFieldReference ) {
      IFieldReference fr = ( IFieldReference )initializer;
      name = fr.toString().toCharArray();
    } else {
      throw new PleaseOpenBugException( "can't handle type (yet):"
                                               + initializer
                                                 .getClass()
                                               );
    }
    InferredType superType = addType( name );
    superType.addMethod( "base".toCharArray(),
                         MethodCreator.createFakeMethodNoArgs( ( IReference )initializer,
                                                 "base".toCharArray() ),
                         false );
    classDefinitionStack.peek().superClass = superType;
  }
}
