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

/**
 * Base class providing property management and method overloading
 * @todo merge this with qcl_core_Object
 */
class qcl_core_BaseClass
{

  //-------------------------------------------------------------
  // Main property API
  //-------------------------------------------------------------

  /**
   * Returns the behavior object responsible for maintaining the object
   * properties and providing access to them.
   * @return qcl_core_PropertyBehavior
   */
  public function getPropertyBehavior()
  {
    static $propertyBehavior = null;
    if ( $propertyBehavior === null )
    {
      require_once "qcl/core/PropertyBehavior.php";
      $propertyBehavior = new qcl_core_PropertyBehavior( $this );
    }
    return $propertyBehavior;
  }

  /**
   * Extending classes use this method to add their
   * property definitions to the basic one in
   * $this->properties
   * @param array $properties
   * @return void
   */
  public function addProperties( $properties )
  {
    $this->getPropertyBehavior()->add( $properties );
  }

  /**
   * Return the names of all properties of this object.
   * @return array
   */
  public function properties()
  {
    return $this->getPropertyBehavior()->names();
  }

  /**
   * Checks if class has this property.
   * Alias for $this->getPropertyBehavior()->has()
   * @param $property
   * @return bool
   */
  public function hasProperty( $property )
  {
    return $this->getPropertyBehavior()->has( $property );
  }

  /**
   * Checks if property exists and throws an error if not,
   * @param $property
   * @return bool
   */
  public function checkProperty( $property )
  {
    return $this->getPropertyBehavior()->check( $property );
  }

  /**
   * Generic getter for properties
   * @param $property
   * @return mixed
   */
  public function get( $property )
  {
    return $this->getPropertyBehavior()->get( $property );
  }

  /**
   * Generic setter for properties.
   * @param string|array $property If string, set the corresponding property to $value.
   *   If array, assume it is a map and set each key-value pair. Returns the object.
   * @param mixed $value
   * @return qcl_core_BaseClass
   */
  public function set( $property, $value=null )
  {
    return $this->getPropertyBehavior()->set( $property, $value );
  }

  /**
   * Gets the values of all properties as an associative
   * array, keys being the property names.
   * @return array
   */
  public function data()
  {
    return $this->getPropertyBehavior()->data();
  }

  /**
   * Returns a array of property values according to the
   * array of property names that were passes as arguments.
   * @param $prop1
   * @param $prop2
   * @param $prop3 ...
   * @return array
   */
  public function listProperties()
  {
    $result = array();
    foreach ( func_get_args() as $property )
    {
      $result[] = $this->get($property);
    }
    return $result;
  }

  //-------------------------------------------------------------
  // helper methods to compare and copy properties
  //-------------------------------------------------------------

  /**
   * Gets the data as an associated array from the data provided
   * @param array|stdClass|qcl_data_model_xmlSchema_DbModel $data
   * @return array
   */
  protected function getArrayData( $data )
  {
    if ( $data instanceof qcl_core_BaseClass )
    {
      $array = $data->data();
    }
    elseif ( is_object( $data ) )
    {
      $array = (array) $data;
    }
    elseif ( ! is_array( $data ) )
    {
      $this->raiseError("Invalid parameter");
    }
    return $array;
  }

  /**
   * Compare current record with array. This will only compare
   * the keys existing in the array or the fields that are
   * provided as second argument.
   *
   * @param object|array $compare Model object or array data
   * @param array $fields
   * @return bool whether the values are equal or not
   */
  public function compareWith( $compare, $fields=null )
  {
    /*
     * check arguments to get what we should compare with
     */
    $array = $this->getArrayData( $compare );

    /*
     * assume data is equal as default and change this to false
     * as difference is found
     */
    $isEqual = true;

    /*
     * do the comparison
     */
    if ( is_array($fields) )
    {
      foreach ( $fields as $key  )
      {
        if ( $this->get($key) !== $array[$key] )
        {
          $isEqual = false;
        }
      }
    }
    else
    {
      foreach ( $array as $key => $value )
      {
        if ( $this->get($key) !== $value )
        {
          $isEqual = false;
        }
      }
    }

    /*
     * return the result
     */
    //$this->debug("The data is " . ($isEqual ? "equal" : "not equal") );
    return $isEqual;
  }

  /**
   * Returns all property values that exists in both models.
   * @param qcl_data_model_xmlSchema_DbModel $model
   * @return array
   */
  public function getSharedPropertyValues ( $model )
  {
    $myProperties    = $this->properties();
    $data            = $model->data();

    foreach( $data as $key => $value )
    {
      if ( ! in_array($key, $myProperties) )
      {
        unset($data[$value]);
      }
    }
    return $data;
  }

  /**
   * Copies all properties that exists in both models except the 'id' property.
   * @param qcl_data_model_xmlSchema_DbModel $model
   * @return void
   */
  public function copySharedProperties ( $model, $exclude=array() )
  {
    $myProperties    = $this->properties();
    $data            = $model->data();

    foreach( $data as $key => $value )
    {
      if ( $key != "id" and in_array( $key, $myProperties ) and ! in_array( $key, $exclude ) )
      {
        $this->set($key,$value);
      }
    }
  }


  /**
   * Compares all properties that exists in both models.
   * @param qcl_data_model_xmlSchema_DbModel $that Other model
   * @param array[optional] $diff Array that needs to be passed by reference that will contain a list of parameters that differ
   * @return bool True if all property values are identical, false if not
   */
  public function compareSharedProperties ( $that, $diff )
  {
    $diff = array();
    $properties = array_intersect(
      $this->properties(),
      $that->properties()
    );

    $isEqual = true;
    foreach( $properties as $name )
    {
      $prop1 = trim($this->get( $name ));
      $prop2 = trim($that->get( $name ));
      //$this->debug("$prop1 => $prop2");

      if ( $prop1 !== $prop2  )
      {
        $isEqual = false;
        $diff[$name] = array($prop1,$prop2);
      }
    }
    return $isEqual;
  }

  //-------------------------------------------------------------
  // 'magic' methods providing virtual accessor methods
  //-------------------------------------------------------------

//  /**
//   * Property write access. Allows to intercept direct access to the properties.
//   * @param $name
//   * @param $value
//   * @return void
//   */
//  public function __set( $name, $value )
//  {
//    /*
//     * if the object has a property of this name, set this first
//     */
//    if ( isset( $this->$name ) or
//         in_array( $name, array_keys( get_object_vars( $this ) ) ) )
//    {
//      $this->$name = $value;
//    }
//    elseif ( $this->getPropertyBehavior()->has( $name ) )
//    {
//      $this->getPropertyBehavior()->set( $name, $value );
//    }
//    else
//    {
//      $this->raiseError("Object has no property '$name" );
//      return null;
//    }
//  }
//
//  /**
//   * Property read access. Allows to intercept direct access to the properties.
//   * @param $name
//   * @return mixed
//   */
//  public function __get($name)
//  {
//    /*
//     * if the object has a property of this name, get this first
//     */
//    if ( isset( $this->$name ) or
//         in_array( $name, array_keys( get_object_vars( $this ) ) ) )
//    {
//      return $this->$name;
//    }
//    elseif ( $this->getPropertyBehavior()->has( $name ) )
//    {
//      return $this->getPropertyBehavior()->get( $name, $value );
//    }
//    else
//    {
//      $this->raiseError("Object has no property '$name" );
//      return null;
//    }
//  }

  /**
   * Method called when called method does not exist. (PHP5)
   * This will check whether method name is
   *
   * - getXxx or setXxx and then call get("xxx")
   *    or setProperty("xxx", $arguments[0] ).
   * - findByXxx to call findBy("xxx",...)
   *
   * Otherwise, raise an error.
   * @param string $method  Method name
   * @param array  $arguments Array or parameters passed to the method
   * @return mixed return value.
   */
  function __call( $method, $arguments )
  {
    /*
     * if the method exists, it is has precedence
     */
    if ( method_exists( $this, $method ) )
    {
      return call_user_func_array( array($this, $method ), $arguments);
    }

    /*
     * accessor methods
     */
    $accessorMethodExists = false;
    $result = null;

    $accessor = strtolower( substr( $method, 0, 3 ) );
    $property = strtolower( substr( $method, 3 ) );

    if ( $accessor == "set" )
    {
      array_unshift( $arguments, $property);
      $result = call_user_func_array( array($this, "set" ), $arguments);
      $accessorMethodExists = true;
    }
    elseif ( $accessor == "get" )
    {
      array_unshift( $arguments, $property);
      $result = call_user_func_array( array($this, "get" ), $arguments);
      $accessorMethodExists = true;
    }

    /*
     * raise error if method does not exist
     */
    if ( ! $accessorMethodExists )
    {
      $this->raiseError( "Overload error: Unknown method " . get_class($this) . "::$method().");
    }
    return $result;
  }

  /**
   * Simple error handling: raise an error by triggering a user error.
   * @param $msg
   * @return void
   */
  public function raiseError( $msg )
  {
    $trace = debug_backtrace();
    trigger_error(
        $msg . ': In ' . $trace[0]['file'] .
        ' on line ' . $trace[0]['line'], E_USER_NOTICE
    );
  }

  /**
   * Serializes the object to an array. This
   * @return array
   * @todo this is the same as data(), consolidate API!
   */
  function toArray()
  {
    return $this->getPropertyBehavior()->data();
  }

  /**
   * Serializes an array of public properties of this object into a string
   * that can be used by the unserialize() method to populate the object
   * properties.
   * @return string
   */
  public function serialize()
  {
    return serialize( $this->getPropertyBehavior()->data() );
  }

  /**
   * Serializes an array of public properties of this object into a string
   * that can be used by the unserialize() method to populate the object
   * properties.
   * @return string
   */
  public function unserialize( $data )
  {
    $map = unserialize( $data );
    if ( ! is_array( $map ) )
    {
      $this->warn("Data cannot be unserialized!");
    }
    else
    {
      $this->set( $map );
    }
  }

}

?>