<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2010 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */

class qcl_data_property_AbstractProperty
{
  protected $name;

  protected $type;

  protected $value;


  /**
   * Getter for name
   * @return unknown_type
   */
  public function getName()
  {
    return $this->name;
  }

  /**
   * Setter for name
   * @param string $name
   * @return void
   */
  public function setName( $name )
  {
    $this->name = $name;
  }

  /**
   * Getter for type
   * @return string
   */
  public function getType()
  {
    return $this->type;
  }

  /**
   * Setter for type
   * @param string $type
   * @return void
   */
  public function setType( $type )
  {
    $this->type = $type;
  }

  /**
   * Getter for value
   * @return mixed
   */
  public function getValue()
  {
    return $this->value;
  }

  /**
   * Setter for value
   * @param $value
   * @return void
   */
  public function setValue( $value )
  {
    $this->value = $value;
  }
}
?>