<?php

/*
 * dependencies
 */
require_once "qcl/db/model.php";

/**
 * model for messages stored in a database
 */
class qcl_message_db_model extends qcl_db_model 
{
  /**
   * the path to the model schema xml file
   * @see qcl_db_model::getSchmemaXmlPath()
   * @var string
   */
  var $schemaXmlPath = "qcl/message/db.model.xml";    
}

?>