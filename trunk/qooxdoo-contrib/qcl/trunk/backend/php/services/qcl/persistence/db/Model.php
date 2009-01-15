<?php
/*
 * dependencies
 */
require_once "qcl/db/model.php";

/**
 * Model storing complete and arbitrarily structured 
 * objects for easy object persistence.
 */
class qcl_persistence_db_Model extends qcl_db_model 
{
  var $schemaXmlPath = "qcl/persistence/db/Model.xml";
}
?>