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
class qcl_event_message_db_Message
  extends qcl_data_model_xmlSchema_DbModel
{
  /**
   * the path to the model schema xml file
   * @see qcl_data_model_xmlSchema_DbModel::getSchmemaXmlPath()
   * @var string
   */
  public $schemaXmlPath = "qcl/event/message/db/Message.model.xml";


  /**
   * Returns singleton instance.
   * @static
   * @return qcl_event_message_db_Message
   */
  public static function getInstance()
  {
    return qcl_getInstance( __CLASS__ );
  }
}
?>