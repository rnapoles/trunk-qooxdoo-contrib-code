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
 * Base class for PHP5
 *
 */
class qcl_core_BaseClass
{

  /**
   * internal cache for classes that have been mixed in
   */
  private $_mixinlookup = array();

  //-------------------------------------------------------------
  // Property system
  // @todo use behavior pattern to make property system pluggable
  //-------------------------------------------------------------

  /**
   * Data on the properties of this object, similar to qooxdoo properties
   * @var array
   */
  private $_properties;

  /**
   * Checks if class has this property
   * @param $property
   * @return unknown_type
   */
  public function has( $property )
  {
    return in_array( $property, array_keys( get_object_vars( $this ) ) );
  }

  /**
   * Checks if property exists and throws an error if not
   * @param $property
   * @return unknown_type
   */
  public function check( $property )
  {
    if ( ! $this->has( $property) )
    {
      $msg = "Class " . get_class($this) . " has no property '$property'";
      if ( is_a($this, "qcl_core_Object") )
      {
        $this->raiseError($msg);
      }
      else
      {
        trigger_error( $msg );
      }
    }
  }

  /**
   * Generic getter for properties
   * @param $property
   * @return unknown_type
   */
  public function get( $property )
  {
    $this->check( $property );
    return $this->$property;
  }

  /**
   * Generic setter for properties. Behaves like qooxdoo setter.
   * @param string|array $property If string, set the corresponding property to $value.
   *   If array, assume it is a map and set each key-value pair. Returns the object.
   * @param mixed $value
   * @return qcl_core_BaseClass
   */
  public function set( $property, $value=null )
  {
    if ( is_array($property) )
    {
      foreach ( $property as $key => $value )
      {
        $this->set( $key, $value );
      }
      return $this;
    }
    $this->check( $property );
    $this->$property = $value;
    return $this;
  }

  /**
   * Creates a property with information similar to the qooxdoo property system.
   * Simple implementation to be overridden by more complex
   * behavior. Currently, only "init" is supported.
   * @param string $name Name of the property
   * @param array $data Property data similar to qooxdoo 'properties' configuration
   * @return unknown_type
   * @todo backport to PHP4
   */
  public function createProperty( $name, $data )
  {
    $this->_properties[$name] = $data;
    $this->$name = $data['init'];
  }


  /**
   * Method called when called method does not exist. (PHP5)
   * This will check whether method name is
   *
   * - getXxx or setXxx and then call getProperty("xxx")
   *    or setProperty("xxx", $arguments[0]).
   * - findByXxx to call findBy("xxx",...)
   *
   * Otherwise, raise an error.
   * @param string $method  Method name
   * @param array  $arguments Array or parameters passed to the method
   * @return mixed return value (PHP5 only)
   */
  function __call( $method, $arguments )
  {
    /*
     * PHP5 mixins
     */
    $mthd = strtolower($method);
    if ( isset( $this->_mixinlookup[ $mthd ] ) )
    {
      $elems = array();
      for ($i=0; $i<count( $arguments ); $i++)
      {
        $elems[] = "\$arguments[$i]";
      }
      $evalCode =
        "\$result = " . $this->_mixinlookup[ $mthd ] . "::" .
         $method . "(".implode(',',$elems).");";
      eval($evalCode);
      return $result;
    }

    /*
     * accessor methods
     */
    $accessorMethodExists = false;
    $result = null;

    $accessor = strtolower( substr( $method, 0, 3 ) );
    $property = strtolower( substr( $method, 3 ) );

    if ( $accessor == "set" and method_exists( $this,"set" ) )
    {
      array_unshift( $arguments, $property);
      $result = call_user_func_array(array($this, "set" ), $arguments);
      $accessorMethodExists = true;
    }
    elseif ( $accessor == "get" and method_exists( $this,"get" ))
    {
      array_unshift( $arguments, $property);
      $result = call_user_func_array(array($this, "get" ), $arguments);
      $accessorMethodExists = true;
    }

    $accessor = strtolower( substr( $method, 0, 6 ) );
    $property = strtolower( substr( $method, 6 ) );

    /*
     * findBy...
     */
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
      trigger_error("Overload error: Unknown method " . get_class($this) . "::$method().");
    }

    return $result;
  }

  /**
   * include mixin methods from other classes.
   * @return void
   * @param $classname class name
   */
  function mixin ($classname)
  {
    /*
     * load class file
     */
    if ( ! class_exists( $classname ) )
    {
      $this->includeClassfile($classname);
    }

    /*
     * check class
     */
    if ( ! class_exists ( $classname ) )
    {
      $this->raiseError("Class $classname does not exist.");
    }

    /*
     * get methods of class
     */
    $methods = get_class_methods( $classname );
    if ( ! count( $methods) )
    {
      $this->raiseError("Class $classname has no methods.");
    }

    /*
     * register class methods
     */
    foreach( $methods as $method )
    {
      if ( ! method_exists( $this, $method ) )
      {
        $this->_mixinlookup[strtolower($method)] = strtolower($classname);
      }
    }
  }

  /**
   * Checks if mixin of this name has been included
   * @param $classname
   * @return boolean
   */
  function hasMixin ( $classname )
  {
    return in_array( strtolower($classname), $this->_mixinlookup );
  }

  /**
   * Checks if method has been included through a mixin
   * @param $method
   * @return boolean
   */
  function hasMixinMethod( $method )
  {
    return isset( $this->_mixinlookup[strtolower($method)] );
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