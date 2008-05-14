package org.eclipse.wst.jsdt.qooxdoo.validation.internal.typeassembling;

import java.util.HashMap;
import java.util.Map;
import java.util.Stack;

import org.eclipse.wst.jsdt.core.ast.IObjectLiteralField;
import org.eclipse.wst.jsdt.core.ast.ISingleNameReference;
import org.eclipse.wst.jsdt.core.infer.InferredType;
import org.eclipse.wst.jsdt.qooxdoo.validation.AttributesModifier;
import org.eclipse.wst.jsdt.qooxdoo.validation.ClassModifier;
import org.eclipse.wst.jsdt.qooxdoo.validation.IClassModifier;
import org.eclipse.wst.jsdt.qooxdoo.validation.ITypeManagement;
import org.eclipse.wst.jsdt.qooxdoo.validation.PropertiesModifier;

public class TypeAssembler {

  private final Map<String, ITypeConfigurationHandler> configurationTypeMap;
  private final Stack<IClassModifier> classModificationStack;

  public TypeAssembler( ITypeManagement typeManager ) {
    this.configurationTypeMap = createConfigurationTypeMap( typeManager );
    this.classModificationStack = new Stack<IClassModifier>();
  }

  public void endVisit( IObjectLiteralField field ) {
    if( classModificationStack.size() > 0 ) {
      classModificationStack.pop();
    }
  }

  public void visit( final IObjectLiteralField field, InferredType classDef ) {
    int prevClassModStackSize = classModificationStack.size();
    if( classModificationStack.size() > 0 ) {
      modifyTypeBasedOn( field, classModificationStack.peek() );
      prepareForSubsequentObjectLiterals( field, classModificationStack.peek() );
    }
    if( field.getFieldName() instanceof ISingleNameReference ) {
      handleTypeConfiguration( field, classDef );
    }
    // in endQooxdooClassDefinition() there is always a pop,
    // thus we have to
    if( prevClassModStackSize == classModificationStack.size() ) {
      classModificationStack.push( new ClassModifier() );
    }
  }

  private void prepareForSubsequentObjectLiterals( final IObjectLiteralField field,
                                                   IClassModifier currentType )
  {
    classModificationStack.push( currentType.getDetailsModifier( field ) );
  }

  private void modifyTypeBasedOn( final IObjectLiteralField field,
                                  IClassModifier currentType )
  {
    currentType.visit( field );
  }

  private Map<String, ITypeConfigurationHandler> createConfigurationTypeMap( ITypeManagement typeManager )
  {
    Map<String, ITypeConfigurationHandler> map = new HashMap<String, ITypeConfigurationHandler>();
    addToMap( map, new StaticsHandler() );
    addToMap( map, new MembersHandler() );
    addToMap( map, new PropertiesHandler() );
    addToMap( map, new ConstructHandler() );
    addToMap( map, new ExtendHandler( typeManager ) );
    addToMap( map, new IncludeMixinHandler() );
    return map;
  }

  private void addToMap( Map<String, ITypeConfigurationHandler> map,
                         AbstractTypeConfigurationHandler handler )
  {
    map.put( handler.getKey(), handler );
  }

  private void handleTypeConfiguration( final IObjectLiteralField field,
                                        InferredType currentClassDef )
  {
    String configTypeKey = getName( ( ISingleNameReference )field.getFieldName() );
    if( configurationTypeMap.containsKey( configTypeKey ) ) {
      configurationTypeMap.get( configTypeKey ).visit( field, currentClassDef );
    }
  }

  private String getName( ISingleNameReference expression ) {
    return new String( expression.getToken() );
  }
  // internal helper classes.
  // //////////////////////////////
  private final class PropertiesHandler
    extends AbstractTypeConfigurationHandler
  {

    public PropertiesHandler() {
      super( "properties" );
    }

    public void visit( IObjectLiteralField field, InferredType classDef ) {
      classModificationStack.push( new PropertiesModifier( classDef ) );
    }
  }
  private final class MembersHandler extends AbstractTypeConfigurationHandler {

    public MembersHandler() {
      super( "members" );
    }

    public void visit( IObjectLiteralField field, InferredType classDef ) {
      classModificationStack.push( new AttributesModifier( classDef, false ) );
    }
  }
  private final class StaticsHandler extends AbstractTypeConfigurationHandler {

    public StaticsHandler() {
      super( "statics" );
    }

    public void visit( IObjectLiteralField field, InferredType classDef ) {
      classModificationStack.push( new AttributesModifier( classDef, true ) );
    }
  }
}
