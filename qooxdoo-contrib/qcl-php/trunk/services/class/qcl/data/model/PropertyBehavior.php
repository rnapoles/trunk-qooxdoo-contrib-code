<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2009 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */
require_once "qcl/core/PropertyBehavior.php";

/**
 * Property behavior modelled on the qooxdoo property definition syntax.
 *
 * Define the properties the private $properties class member variable:
 *
 * <pre>
 * private $properties = array(
 *   "foo" => array(
 *     "check"    => "array",
 *     "init"     => "foo",
 *     "apply"    => "_applyFoo",
 *     "nullable" => true,
 *     "event"    => "changeFoo"
 *    ),
 *    "bar"  => array(
 *      "check"     => "integer",
 *      "init"      => 1,
 *      "nullable"  => false
 *    )
 * );
 * </pre>
 *
 * and add them to the property definition by using the "addProperties()"
 * method in the constructor:
 *
 * <pre>
 * function __construct()
 * {
 *   // properties must be declared BEFORE calling the parent constructor!
 *   $this->addProperties( $this->properties );
 *
 *   parent::__construct();
 * }
 * </pre>
 *
 * Since you use a private member, this works event when a "$properties"
 * property exists in the parent class.
 *
 * You can also *refine* properties by overriding them if you call the parent
 * constructor first and then add the properties. However, since the parent
 * constructor calls the init() method, make sure the code called in init()
 * does not rely on the presence of all the properties.
 */
class qcl_data_model_PropertyBehavior
  extends qcl_core_PropertyBehavior
{

  static $primitives = array("boolean", "integer", "double", "string", "array", "object","resource","NULL");

  /**
   * Cache of property definitions
   */
  private $properties = array();

  /**
   * The stored values for the managed properties
   * @var array
   */
  private $data = array();

  /**
   * Constructor
   * @param qcl_data_model_Model $model Model affected by this behavior
   * @return unknown_type
   */
  function __construct( $model )
  {
    parent::__construct( $model );
  }

  /**
   * Getter for managed model
   * @return qcl_data_model_Model
   */
  protected function getModel()
  {
    return parent::getObject();
  }

  /**
   * Getter for definition of properties in the managed model
   * @return array
   */
  protected function getPropertyDefinition()
  {
    return $this->properties;
  }

  /**
   * Checks if the object has a  property of this name.
   * @param $property
   * @return bool
   */
  public function has( $property )
  {
    return in_array( $property, $this->names() );
  }

  /**
   * Generic getter for properties
   * @param $property
   * @return unknown_type
   */
  public function get( $property )
  {
    return $this->data[$property];
  }


  /**
   * @see class/qcl/core/qcl_core_PropertyBehavior#_set()
   */
  public function _set( $property, $value )
  {

    $props    = $this->getPropertyDefinition();
    $def      = $props[$property];
    $type     = isset( $def['check'] )    ? $def['check']    : null;
    $nullable = isset( $def['nullable'] ) ? $def['nullable'] : null;
    $apply    = isset( $def['apply'] )    ? $def['apply']    : null;
    $event    = isset( $def['event'] )    ? $def['event']    : null;

    /*
     * check type/nullable
     */

    if ( $nullable and $value === null )
    {
      $fail = false;
    }
    elseif ( in_array( $type, self::$primitives ) )
    {
      if ( $type != gettype( $value ) )
      {
        $fail = true;
        $msg = ". Expected type '$type', got '" . gettype( $value ) . "'";
      }
    }
    elseif ( class_exists( $type ) and ! is_a( $value, $type ) )
    {
      $fail = true;
      $msg = ". Expected class '$type', got '" . typeof( $value, true ) . "'";
    }

    if ( $fail )
    {
      throw new qcl_core_PropertyBehaviorException(
        "Invalid value type for property '$property' of class " .
        get_class( $this->getModel() ) . ": $msg"
       );
    }

    /*
     * set value
     */
    $old = $this->data[$property];
    $this->data[$property] = $value;

    /*
     * apply method?
     */
    if ( $apply and $value !== $old )
    {
      if ( method_exists( $this->getModel(), $apply ) )
      {
        call_user_func( array( $this->getModel(), $apply ), $value, $old );
      }
      else
      {
        throw new qcl_core_PropertyBehaviorException(
          "Invalid property definition: apply method " .
          get_class( $this->getModel() ) .
          "::$apply() does not exist."
        );
      }
    }

    /*
     * dispatch event
     */
    if ( $event )
    {
      $this->getModel()->fireDataEvent( $event, $value );
    }

    return $this->object;
  }

  /**
   * Checks whether the property has a local or internal name (such as a
   * column name that is different from the property name).
   * @param $property
   * @return bool
   */
  public function hasLocalAlias( $property )
  {
    return false;
  }

  /**
   * Returns the type of the property as provided in the property
   * definition
   * @param $property
   * @return string
   */
  public function type( $property )
  {
    $this->check( $property );
    $properties = $this->getPropertyDefinition();
    return $properties[$property]['check'];
  }

  /**
   * The names of all the managed properties
   * @return array
   */
  public function names()
  {
    return array_keys( $this->getPropertyDefinition() );
  }


  /**
   * Adds a property definition. You can refine values in parent classes.
   * @param array $properties
   * @return void
   */
  public function add( $properties )
  {
    //$this->getModel()->debug("Adding " .print_r( $properties,true),__CLASS__,__LINE__);
    /**
     * add to property definition array
     */
    foreach ( $properties as $name => $map )
    {
      if ( ! is_array( $this->properties[ $name ] ) )
      {
        $this->properties[ $name ] = $map;
      }
      else
      {
        foreach( $map as $key => $value )
        {
           $this->properties[ $name ][ $key ] = $value;
        }
      }
    }
  }

  /**
   * Set initial values unless the model has been restored from persistent
   * data.
   * @param $properties
   * @return void
   */
  public function init()
  {
    $properties = $this->getPropertyDefinition();
    foreach( $properties as $property => $prop )
    {
      if ( isset( $prop['init'] )  )
      {
        $this->set( $property, $prop['init'] );
      }
      elseif ( isset( $prop['nullable'] ) )
      {
        if ( $prop['nullable'] )
        {
          $this->set( $property, null );
        }
      }
    }
  }

  /**
   * Cast the given value to the correct php type according to its
   * property type. If the type is a class name, instantiate a new
   * object with the value as the constructor argument.
   *
   * @param string $propertyName
   * @param mixed $value
   * @return mixed
   */
  public function typecast( $propertyName, $value)
  {
    $type = $this->type( $propertyName );
    //$this->getModel()->debug( "$propertyName=$value($type)");
    if ( in_array( $type, self::$primitives ) )
    {
      settype( $value, $type );
    }
    elseif ( class_exists( $type ) )
    {
      if ( is_scalar( $value) )
      {
        $value =  new $type( $value );
      }
    }
    return $value;
  }
}
?>