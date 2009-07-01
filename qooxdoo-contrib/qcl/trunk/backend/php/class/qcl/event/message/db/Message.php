<?php
/*
 * dependencies
 */
require_once "qcl/db/model/xmlSchema/Model.php";

/**
 * model for messages stored in a database
 */
class qcl_event_message_db_Message
  extends qcl_db_model_xmlSchema_Model
{
  /**
   * the path to the model schema xml file
   * @see qcl_db_model_xmlSchema_Model::getSchmemaXmlPath()
   * @var string
   */
  var $schemaXmlPath = "qcl/event/message/db/Message.model.xml";


  /**
   * Returns singleton instance.
   * @static
   * @return qcl_event_message_db_Message
   */
  function &getInstance( $class=__CLASS__ )
  {
    return parent::getInstance( $class );
  }
}
?>