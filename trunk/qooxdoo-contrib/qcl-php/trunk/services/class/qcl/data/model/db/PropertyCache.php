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
 * Cache for property setup
 */
class qcl_data_model_db_PropertyCache
  extends qcl_core_PersistentObject
{
  public $tables     = array();
  public $properties = array();

  public function reset()
  {
    $this->tables = array();
    $this->properties = array();
    $this->savePersistenceData();
  }
}


?>