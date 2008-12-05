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
import org.eclipse.wst.jsdt.qooxdoo.validation.PropertiesModifier;
import org.eclipse.wst.jsdt.qooxdoo.validation.internal.ITypeManagement;

public class TypeAssembler {

  private final Stack<IClassModifier> classModificationStack;
  private final ITypeManagement typeManager;

  public TypeAssembler( ITypeManagement typeManager ) {
    this.typeManager = typeManager;
    this.classModificationStack = new Stack<IClassModifier>();
  }

  public void endVisit( IObjectLiteralField field ) {
    if( classModificationStack.size() > 0 ) {
      classModificationStack.pop();
    }
    if( classModificationStack.size() > 0 ) {
      classModificationStack.peek().endVisit( field );
    }
  }

  public void visit( final IObjectLiteralField field, InferredType classDef ) {
    doVisit( field, new TypeConfigurationDelegator( typeManager, classDef ) );
  }

  private void doVisit( final IObjectLiteralField field, AbstractDelegator tch )
  {
    int prevClassModStackSize = classModificationStack.size();
    if( classModificationStack.size() > 0 ) {
      modifyTypeBasedOn( field, classModificationStack.peek() );
      prepareForSubsequentObjectLiterals( field, classModificationStack.peek() );
    }
    if( field.getFieldName() instanceof ISingleNameReference ) {
      tch.handleTypeConfiguration( field );
    }
    // in endQooxdooClassDefinition() there is always a pop,
    // thus we have to push a new ClassModifier even for the same behavior
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

  private void addToMap( Map<String, ITypeConfigurationVisitor> map,
                         AbstractTypeConfigurationHandler handler )
  {
    map.put( handler.getKey(), handler );
  }

  private String getName( ISingleNameReference expression ) {
    return new String( expression.getToken() );
  }

  // internal helper classes.
  // //////////////////////////////
  private abstract class AbstractDelegator {

    private final Map<String, ITypeConfigurationVisitor> configurationTypeMap;

    public AbstractDelegator() {
      this.configurationTypeMap = createConfigurationTypeMap( typeManager );
    }

    public abstract void handleTypeConfiguration( final IObjectLiteralField field );

    private Map<String, ITypeConfigurationVisitor> createConfigurationTypeMap( ITypeManagement typeManager )
    {
      Map<String, ITypeConfigurationVisitor> map = new HashMap<String, ITypeConfigurationVisitor>();
      addToMap( map, new StaticsHandler() );
      addToMap( map, new MembersHandler() );
      addToMap( map, new PropertiesHandler() );
      addToMap( map, new ConstructHandler() );
      addToMap( map, new ExtendHandler( typeManager ) );
      addToMap( map, new IncludeHandler( typeManager ) );
      return map;
    }

    public Map<String, ITypeConfigurationVisitor> getConfigurationTypeMap() {
      return configurationTypeMap;
    }
  }

  private class TypeConfigurationDelegator extends AbstractDelegator {

    private final InferredType classDef;

    public TypeConfigurationDelegator( ITypeManagement typeManager,
                                       InferredType classDef )
    {
      super();
      this.classDef = classDef;
    }

    public void handleTypeConfiguration( final IObjectLiteralField field ) {
      String configTypeKey = getName( ( ISingleNameReference )field.getFieldName() );
      if( getConfigurationTypeMap().containsKey( configTypeKey ) ) {
        getConfigurationTypeMap().get( configTypeKey ).visit( field, classDef );
      }
    }
  }

  private class MixinConfigurationDelegator extends AbstractDelegator {

    private InferredType type;

    public MixinConfigurationDelegator( ITypeManagement typeManager,
        InferredType classDef )
    {
      super();
      this.type = classDef;
    }

    public void handleTypeConfiguration( final IObjectLiteralField field ) {
      String configTypeKey = getName( ( ISingleNameReference )field.getFieldName() );
      if( getConfigurationTypeMap().containsKey( configTypeKey ) ) {
        getConfigurationTypeMap().get( configTypeKey ).visit( field, type );
      }
    }
  }

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
