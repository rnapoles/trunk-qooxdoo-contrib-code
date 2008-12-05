package org.eclipse.wst.jsdt.qooxdoo.validation;

import java.util.Stack;

import org.eclipse.core.runtime.Assert;
import org.eclipse.wst.jsdt.core.ast.IASTNode;
import org.eclipse.wst.jsdt.core.ast.IExpression;
import org.eclipse.wst.jsdt.core.ast.IFunctionCall;
import org.eclipse.wst.jsdt.core.ast.IObjectLiteralField;
import org.eclipse.wst.jsdt.core.ast.IStringLiteral;
import org.eclipse.wst.jsdt.core.ast.IThisReference;
import org.eclipse.wst.jsdt.core.infer.InferEngine;
import org.eclipse.wst.jsdt.core.infer.InferredAttribute;
import org.eclipse.wst.jsdt.core.infer.InferredType;
import org.eclipse.wst.jsdt.qooxdoo.validation.internal.ITypeManagement;
import org.eclipse.wst.jsdt.qooxdoo.validation.internal.typeassembling.TypeAssembler;

public class QooxdooInferrenceSupport extends InferEngine
  implements ITypeManagement
{

  private TypeAssembler typeassembler = new TypeAssembler( this );
  private Stack<InferredType> classDefinitionStack = new Stack<InferredType>();
  private Stack<IObjectLiteralField> memberTypeStack = new Stack<IObjectLiteralField>();

  public QooxdooInferrenceSupport() {
  }

  @Override
  public InferredType addType( char[] className ) {
    return super.addType( className );
  }

  // interface methods from InferEngine
  // /////////////////////////////////////////////////

  @Override
  protected boolean handleFunctionCall( IFunctionCall messageSend ) {
    if( isClassDefinition( messageSend ) ) {
      handleQxClassDefinition( messageSend );
    }
    return true;
  }

  @Override
  public void endVisit( IFunctionCall messageSend ) {
    if( isInQooxdooClass() && isClassDefinition( messageSend ) ) {
      InferredType obj = classDefinitionStack.pop();
      Assert.isNotNull( obj );
    }
    super.endVisit( messageSend );
  }

  @Override
  public boolean visit( final IObjectLiteralField field ) {
    boolean result = false;
    if( isInQooxdooClass() ) {
      InferredType classDef = classDefinitionStack.peek();
      memberTypeStack.push( field );
      typeassembler.visit( field, classDef );
      result = true;
    }
    return result;
  }

  @Override
  public boolean visit( IThisReference tr ) {
    boolean result = super.visit( tr );
    if( isInQooxdooClass() ) {
      result = false;
      InferredType type = getTypeOf( tr );
      if( !type.equals( classDefinitionStack.peek() ) ) {
        type.superClass = classDefinitionStack.peek();
      }
    }
    return result;
  }

  @Override
  public void endVisit( IObjectLiteralField field ) {
    if( isInQooxdooClass() ) {
      IObjectLiteralField pop = memberTypeStack.pop();
      Assert.isLegal( field.equals( pop ), field + " is not " + pop );
      typeassembler.endVisit( field );
    }
  }

  private boolean isInQooxdooClass() {
    return !classDefinitionStack.isEmpty();
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
    if( hasQxClassDefineArguments( messageSend ) ) {
      startClassDefinition( messageSend.getArguments()[ 0 ] );
    }
  }

  private boolean hasQxClassDefineArguments( IFunctionCall messageSend ) {
    return messageSend.getArguments() != null
           && messageSend.getArguments().length == 2
           && messageSend.getArguments()[ 0 ] instanceof IStringLiteral;
  }

  private boolean isClassDefinition( IFunctionCall messageSend ) {
    return isQxClassDefine( messageSend ) || isMixinDefine( messageSend );
  }

  private boolean isMixinDefine( IFunctionCall messageSend ) {
    return messageSend.getReceiver() != null
           && "qx.Mixin".equals( messageSend.getReceiver().toString() )
           && "define".equals( new String( messageSend.getSelector() ) );
  }

  private boolean isQxClassDefine( IFunctionCall messageSend ) {
    return messageSend.getReceiver() != null
           && "qx.Class".equals( messageSend.getReceiver().toString() )
           && "define".equals( new String( messageSend.getSelector() ) );
  }
}
