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

qcl_import( "qcl_data_model_db_ActiveRecord" );

/**
 * Class that is used to model the join tables
 */
class qcl_data_model_db_JoinModel
  extends qcl_data_model_db_ActiveRecord
{
  /**
   * Constructor, allows to set the table name externally
   * @param qcl_data_datasource_DbModel $datasourceModel
   * @param string $tableName
   * @return void
   */
  public function __construct( $datasourceModel, $tableName )
  {
    $this->tableName = $tableName;
    parent::__construct( $datasourceModel );
  }
}
?>