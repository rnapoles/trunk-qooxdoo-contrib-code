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
 * Interface for property behaviors
 */
interface qcl_core_IPropertyBehavior
{

  /**
   * Checks if class has a public property of this type.
   * @param $property
   * @return bool
   */
  public function has( $property );

  /**
   * Checks if property exists and throws an error if not.
   * @param $property
   * @return bool
   */
  public function check( $property );

  /**
   * Generic getter for properties
   * @param $property
   * @return mixed
   */
  public function get( $property );

  /**
   * Setter for properties.
   * @param string|array $property If string, set the corresponding property
   *  to $value. If array, assume it is a map and set each key-value pair.
   *  Returns the object to allow chained setting.
   * @param mixed $value
   * @return qcl_core_BaseClass
   */
  public function set( $property, $value=null );

  /**
   * Returns the name of the getter method for a property
   * @param string $property
   * @return string
   */
  public function getterMethod( $property );

  /**
   * Returns the name of the setter method for a property
   * @param string $property
   * @return string
   */
  public function setterMethod( $property );

  /**
   * Checks if the object has a getter method for this property
   * @param string $property
   * @return bool
   */
  public function hasGetter( $property );

  /**
   * Checks if the object has a setter method for this property
   * @param string $property
   * @return bool
   */
  public function hasSetter( $property );
}
?>