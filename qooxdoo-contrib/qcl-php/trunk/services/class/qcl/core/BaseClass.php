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
 *
 */
class qcl_core_BaseClass
{

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
   * Checks if class has this property.
   * Alias for $this->getPropertyBehavior()->has()
   * @param $property
   * @return bool
   */
  public function has( $property )
  {
    return $this->getPropertyBehavior()->has( $property );
  }

  /**
   * Checks if property exists and throws an error if not,
   * @param $property
   * @return bool
   */
  public function check( $property )
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
     * findBy...
     */
    $accessor = strtolower( substr( $method, 0, 6 ) );
    $property = strtolower( substr( $method, 6 ) );

    if ( $accessor == "findby" and method_exists( $this,"findBy" ) )
    {
      array_unshift( $arguments, $property);
      $result = call_user_func_array(array($this, "findBy" ), $arguments);
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
   * Raise an error by triggering a user error.
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
   * Serializes the object to an array
   * @return array
   * @todo deep serialization, i.e. convert objects in member variables
   */
  function toArray()
  {
    return qcl_getPublicObjectVars( $this );
  }
}

function qcl_getPublicObjectVars($obj) {
  return get_object_vars($obj);
}

?>