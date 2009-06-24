<?php

/*
 * dependencies
 */
require_once "qcl/db/model/xml/XmlSchemaModel.php";

/**
 * Model that stores the available Plugins in a database table
 */
class qcl_plugin_DbModel extends qcl_db_model_xml_XmlSchemaModel
{    

  /**
   * the path to the model schema xml file. ususally automatically resolved.
   * @see qcl_db_model_xml_XmlSchemaModel::getSchmemaXmlPath()
   * @var string
   */
  var $schemaXmlPath = "qcl/plugin/DbModel.xml";  
  
}
?>