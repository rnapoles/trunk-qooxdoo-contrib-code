package org.eclipse.wst.jsdt.qooxdoo.validation.internal;

import java.util.HashMap;
import java.util.Map;
import java.util.Stack;

import org.eclipse.wst.jsdt.core.ast.IExpression;
import org.eclipse.wst.jsdt.core.ast.IFieldReference;
import org.eclipse.wst.jsdt.core.ast.IFunctionExpression;
import org.eclipse.wst.jsdt.core.ast.IObjectLiteralField;
import org.eclipse.wst.jsdt.core.ast.IReference;
import org.eclipse.wst.jsdt.core.ast.ISingleNameReference;
import org.eclipse.wst.jsdt.core.infer.InferredType;
import org.eclipse.wst.jsdt.internal.compiler.ast.MethodDeclaration;
import org.eclipse.wst.jsdt.internal.compiler.classfmt.ClassFileConstants;
import org.eclipse.wst.jsdt.qooxdoo.validation.AttributesModifier;
import org.eclipse.wst.jsdt.qooxdoo.validation.ClassModifier;
import org.eclipse.wst.jsdt.qooxdoo.validation.IClassModifier;
import org.eclipse.wst.jsdt.qooxdoo.validation.ITypeManagement;
import org.eclipse.wst.jsdt.qooxdoo.validation.PleaseOpenBugException;
import org.eclipse.wst.jsdt.qooxdoo.validation.PropertiesModifier;

public class TypeAssembler {

  private final Map<String, IKeyReaction> configurationTypeMap;
  private final Stack<IClassModifier> classModificationStack;
  private final ITypeManagement typeManager;

  public TypeAssembler( ITypeManagement typeManager ) {
    this.typeManager = typeManager;
    this.configurationTypeMap = createConfigurationTypeMap();
    this.classModificationStack = new Stack<IClassModifier>();
  }

  public void endQooxdooClassDefinition( IObjectLiteralField field ) {
    if( classModificationStack.size() > 0 ) {
      classModificationStack.pop();
    }
  }

  public void addToType( final IObjectLiteralField field, InferredType classDef )
  {
    int prevClassModStackSize = classModificationStack.size();
    if( classModificationStack.size() > 0 ) {
      IClassModifier mod = classModificationStack.peek();
      mod.add( field );
      classModificationStack.push( mod.getDetailsModifier( field ) );
    }
    if( field.getFieldName() instanceof ISingleNameReference ) {
      handleTypeConfiguration( field, classDef );
    }
    if( prevClassModStackSize == classModificationStack.size() ) {
      classModificationStack.push( new ClassModifier() );
    }
  }

  private Map<String, IKeyReaction> createConfigurationTypeMap() {
    Map<String, IKeyReaction> map = new HashMap<String, IKeyReaction>();
    map.put( "statics", new StaticsHandler() );
    map.put( "members", new MembersHandler() );
    map.put( "properties", new PropertiesHandler() );
    map.put( "construct", new ConstructHandler() );
    map.put( "extend", new ExtendHandler() );
    return map;
  }

  private void handleTypeConfiguration( final IObjectLiteralField field,
                                        InferredType currentClassDef )
  {
    String configTypeKey = getName( ( ISingleNameReference )field.getFieldName() );
    if( configurationTypeMap.containsKey( configTypeKey ) ) {
      configurationTypeMap.get( configTypeKey ).react( field, currentClassDef );
    }
  }

  private String getName( ISingleNameReference expression ) {
    return new String( expression.getToken() );
  }
  private final class ExtendHandler implements IKeyReaction {

    public void react( IObjectLiteralField field, InferredType currentClassDef )
    {
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
  private final class ConstructHandler implements IKeyReaction {

    public void react( IObjectLiteralField field, InferredType classDef ) {
      if( field.getInitializer() instanceof IFunctionExpression ) {
        MethodDeclaration md = ( ( IFunctionExpression )field.getInitializer() ).getMethodDeclaration();
        md.modifiers = ClassFileConstants.AccPublic;
        InferredType theType = classDef;
        theType.addMethod( theType.getName(), md, true );
      }
    }
  }
  private final class PropertiesHandler implements IKeyReaction {

    public void react( IObjectLiteralField field, InferredType classDef ) {
      classModificationStack.push( new PropertiesModifier( classDef ) );
    }
  }
  private final class MembersHandler implements IKeyReaction {

    public void react( IObjectLiteralField field, InferredType classDef ) {
      classModificationStack.push( new AttributesModifier( classDef, false ) );
    }
  }
  private final class StaticsHandler implements IKeyReaction {

    public void react( IObjectLiteralField field, InferredType classDef ) {
      classModificationStack.push( new AttributesModifier( classDef, true ) );
    }
  }
  public interface IKeyReaction {

    public void react( IObjectLiteralField field,
                       InferredType currentClassDefinition );
  }
}
