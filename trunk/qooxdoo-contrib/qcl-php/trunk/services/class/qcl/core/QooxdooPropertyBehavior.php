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
 * Qooxdoo-style property behvior. Not implemented yet.
 * @todo implement
 */
class qcl_core_QooxdooPropertyBehavior
  extends qcl_core_PropertyBehavior
{

  /**
   * Constructor.
   * @param qcl_core_Object $object Object affected by this behavior
   * @return unknown_type
   */
  function __construct( $object )
  {
    throw new Exception("Not implemented");
  }

  /**
   * Checks if the object has a public property of this type or if the object
   * has a getter and setter method for this property.
   * @param $property
   * @return bool
   */
  public function has( $property )
  {

  }

  /**
   * Checks if property exists and throws an error if not.
   * @param $property
   * @return bool
   */
  public function check( $property )
  {

  }

  /**
   * Generic getter for properties
   * @param $property
   * @return unknown_type
   */
  public function get( $property )
  {

  }

  /**
   * Setter for properties.
   * @param string|array $property If string, set the corresponding property
   *  to $value. If array, assume it is a map and set each key-value pair.
   *  Returns the object to allow chained setting.
   * @param mixed $value
   * @return qcl_core_BaseClass
   */
  public function set( $property, $value=null )
  {

  }

}
?>