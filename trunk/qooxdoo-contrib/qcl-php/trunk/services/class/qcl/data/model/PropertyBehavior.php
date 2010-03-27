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

  protected static $primitives = array("boolean", "integer", "double", "string", "array", "object","resource","NULL");

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
   * Implementation for model property setter
   * @param string $property Property name
   * @param mixed $value Propery value
   * @return qcl_data_model_db_Model
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
        $msg = ". Expected type '$type', got '$value' (" . gettype( $value ) . ").";
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
   * @return array The new property definition
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

    return $this->properties;
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
      /*
       * skip id column
       */
      if ( $property == "id" )
      {
        $this->properties[ "id" ][ 'nullable' ] = true; // FIXME Hack!
        $this->set( "id", null );
        continue;
      }

      /*
       * initial value is set
       */
      if ( isset( $prop['init'] )  )
      {
        $this->set( $property, $prop['init'] );
      }

      /*
       * no initial value, but nullability is set
       */
      elseif ( isset( $prop['nullable'] ) )
      {
        if ( $prop['nullable'] == true )
        {
          $this->set( $property, null );
        }
        else
        {
          throw new qcl_core_PropertyBehaviorException(
            "Property " . get_class( $this->getModel() ) . "::\${$property} must be nullable or have an init value:"
          );
        }
      }
      /*
       * if no initial value, make property implicitly nullable
       * and defaulting to null
       */
      else
      {
        $this->properties[ $property ][ 'nullable' ] = true;
        $this->properties[ $property ][ 'init' ] = null;
        $this->set( $property, null );
      }
    }
  }

  /**
   * Cast the given value to the correct php type according to its
   * property type. If the type is a class name, instantiate a new
   * object with the value as the constructor argument. If the
   * 'serialize' flag has been set, unserialize the value into
   * a string before saving it.
   * FIXME this is a mess. Typecasting and unserializing should be
   * dealt with separately.
   * @param string $propertyName
   * @param mixed $value
   * @return mixed
   */
  public function typecast( $propertyName, $value)
  {
    $type = $this->type( $propertyName );
    //$this->getModel()->debug( "$propertyName=$value($type)");

    if ( $type == "array"
          and isset( $this->properties[$propertyName]['serialize'] )
            and  $this->properties[$propertyName]['serialize'] === true)
    {
      $value = unserialize( $value );
      if ( ! is_array( $value ) )
      {
        $this->getModel()->raiseError("Serialized value is not an array!");
      }
    }
    elseif ( is_null( $value ) )
    {
      if ( $this->properties[$propertyName]['nullable' ] )
      {
        return null;
      }
      else
      {
        $this->getModel()->raiseError(
          "Non-nullable property '$propertyName' cannot take a null value"
        );
      }
    }
    elseif ( in_array( $type, self::$primitives ) )
    {
      settype( $value, $type );
    }
    elseif ( class_exists( $type ) )
    {
      if ( is_string( $value) )
      {
        if ( isset( $this->properties[$propertyName]['serialize'] )
            and  $this->properties[$propertyName]['serialize'] === true )
        {
          $value = unserialize( $value );
          if ( ! $value instanceof $type )
          {
            $this->getModel()->raiseError(
              "Invalid value class. Expected '$type', got '" .
              typeof( $value, true ) . "'."
            );
          }
        }
        else
        {
          $value =  new $type( $value );
        }
      }
    }
    return $value;
  }

  /**
   * Converts into a scalar value (a string, integer, boolean)
   * that can be saved into the database. NULL values are treated
   * as scalars for the purpose of this method.
   *
   * Objects and arrays are cast to a string value, depending on the
   * property definition. If the 'serialize' flag is set to true,
   * serialize the value. Otherwise, cast it to a string. This will
   * work only with objects that have a __toString() method.
   *
   *
   * @param string $propertyName Name of the property to scalarize
   * @param mixed $value Value to scalarize
   * @return string
   */
  public function scalarize( $propertyName, $value )
  {
    /*
     * scalar values and null need no conversion
     */
    if ( is_scalar( $value ) or is_null( $value ) )
    {
      return $value;
    }
    /*
     * serialize the property if so defined
     */
    if ( isset( $this->properties[$propertyName]['serialize'] )
            and  $this->properties[$propertyName]['serialize'] === true )
    {
      return serialize( $value );
    }
    elseif( ! is_object( $value) )
    {
      $this->getModel()->raiseError(
        "Unable to stringify '" . typeof( $value, true ) . "' type value. " .
        "Use the 'serialize' flag in the definition of property '$propertyName'."
      );
    }
    elseif ( method_exists( $value, "__toString" ) )
    {
      return (string) $value;
    }
    else
    {
      $this->getModel()->raiseError(
        "Unable to stringify a " . get_class( $value ) . " class object. " .
        "Use the 'serialize' flag in the definition of property '$propertyName'."
      );
    }
  }

  /**
   * Returns true if the php type passed as argument is a primitive type
   * @param string $type
   * @return bool
   */
  protected function isPrimitive( $type )
  {
    return in_array( $type, self::$primitives );
  }
}
?>