<?php

/*
 * dependencies
 */
require_once "qcl/db/XmlSchemaModel.php";

/**
 * model for messages stored in a database
 */
class qcl_session_Message extends qcl_db_XmlSchemaModel 
{
  /**
   * the path to the model schema xml file
   * @see qcl_db_XmlSchemaModel::getSchmemaXmlPath()
   * @var string
   */
  var $schemaXmlPath = "qcl/session/Message.model.xml";    
}

?>