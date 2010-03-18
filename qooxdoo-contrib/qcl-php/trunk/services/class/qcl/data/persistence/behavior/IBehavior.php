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

interface qcl_data_persistence_behavior_IBehavior
{

  /**
   * Returns a singleton instance of this class
   * @return qcl_core_Object
   */
  public static function getInstance();

  /**
   * Loads the persistent object, i.e populate the public
   * properties from the saved data.
   *
   * @param qcl_core_Object $object Persisted object
   * @param string $id The id of the saved object
   * @return void
   */
  public function load( $object, $id );

  /**
   * Saves the public properties of the object to the
   * behaviors's datasource
   *
   * @param qcl_core_Object $object Persisted object
   * @param string $id The id of the saved object
   * @return void
   */
  public function save( $object, $id );

  /**
   * Deletes the persistence data for the object with the given id.
   * @param qcl_core_Object $object Persisted object
   * @param string $id The id of the saved object
   */
  public function delete( $object, $id );

}
?>