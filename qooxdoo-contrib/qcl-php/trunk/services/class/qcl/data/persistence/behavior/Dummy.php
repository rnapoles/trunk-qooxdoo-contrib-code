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
require_once "qcl/data/persistence/behavior/IBehavior.php";

/**
 * This is a dummy class  needed for the
 * migration to the "behavior" design pattern.
 */
class qcl_data_persistence_behavior_Dummy
  implements qcl_data_persistence_behavior_IBehavior
{

  /**
   * Return singleton instance of this class
   * @return qcl_data_persistence_behavior_Dummy
   */
  public static function getInstance()
  {
    return qcl_getInstance( __CLASS__ );
  }

  /**
   * Do nothing
   */
  public function restore( $object, $id ){}

  /**
   * Do nothing
   */
  public function persist( $object, $id ){}

  /**
   * Do nothing
   */
  public function clear( $object, $id ){}

}
?>