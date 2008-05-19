package org.eclipse.wst.jsdt.qooxdoo.validation.internal.typeassembling;

import java.util.Iterator;

import org.eclipse.wst.jsdt.core.ast.IExpression;
import org.eclipse.wst.jsdt.core.ast.IFieldReference;
import org.eclipse.wst.jsdt.core.ast.IObjectLiteralField;
import org.eclipse.wst.jsdt.core.ast.ISingleNameReference;
import org.eclipse.wst.jsdt.core.infer.InferredAttribute;
import org.eclipse.wst.jsdt.core.infer.InferredMethod;
import org.eclipse.wst.jsdt.core.infer.InferredType;
import org.eclipse.wst.jsdt.qooxdoo.validation.internal.ITypeManagement;
import org.eclipse.wst.jsdt.qooxdoo.validation.internal.mixins.Mixin;

public class IncludeHandler extends AbstractTypeConfigurationHandler {

  private final ITypeManagement typeManager;

  public IncludeHandler( ITypeManagement typeManager ) {
    super( "include" );
    this.typeManager = typeManager;
  }

  public void visit( IObjectLiteralField field,
                     InferredType currentClassDefinition )
  {
    IExpression initializer = field.getInitializer();
    char[] name = getMixinName( initializer );
    InferredType mixinType = typeManager.addType( name );
    addMixinMethodsToClass( mixinType, currentClassDefinition );
    addMixinAttributesToClass( mixinType, currentClassDefinition );
    typeManager.getMixin( mixinType ).mixedIn( currentClassDefinition );
  }

  public void visit( IObjectLiteralField field, Mixin type ) {
    // FIXME m_kempka IMPLEMENT ME May 15, 2008
  }

  private void addMixinAttributesToClass( InferredType mixinType,
                                          InferredType classType )
  {
    if( mixinType.attributes != null ) {
      for( InferredAttribute each : mixinType.attributes ) {
        if( each != null ) {
          if( !hasAttribute( classType, each ) ) {
            classType.addAttribute( each );
          }
        }
      }
    }
  }

  private boolean hasAttribute( InferredType classType,
                                InferredAttribute attribute )
  {
    boolean result = false;
    for( InferredAttribute each : classType.attributes ) {
      if( attribute.equals( each ) ) {
        result = true;
        break;
      }
    }
    return result;
  }

  private void addMixinMethodsToClass( InferredType mixinType,
                                       InferredType classType )
  {
    if( mixinType.methods != null ) {
      Iterator<InferredMethod> iter = mixinType.methods.iterator();
      while( iter.hasNext() ) {
        InferredMethod each = iter.next();
        classType.addMethod( each.name, each.getFunctionDeclaration(), false );
      }
    }
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
