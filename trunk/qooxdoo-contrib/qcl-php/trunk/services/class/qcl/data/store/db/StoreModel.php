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
require_once "qcl/data/model/xmlSchema/DbModel.php";

/**
 * model for messages stored in a database
 */
class qcl_data_store_db_StoreModel
  extends qcl_data_model_xmlSchema_DbModel
{
  /**
   * the path to the model schema xml file
   * @see qcl_data_model_xmlSchema_DbModel::getSchmemaXmlPath()
   * @var string
   */
  var $schemaXmlPath = "qcl/data/store/db/StoreModel.xml";


  /**
   * Returns singleton instance.
   * @static
   * @return qcl_data_store_db_StoreModel
   */
  public static function getInstance()
  {
    return qcl_getInstance( __CLASS__ );
  }
}
?>