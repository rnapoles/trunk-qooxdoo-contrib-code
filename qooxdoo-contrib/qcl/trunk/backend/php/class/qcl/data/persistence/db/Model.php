<?php
/*
 * dependencies
 */
require_once "qcl/db/model/SimpleModel.php";

/**
 * Model storing complete and arbitrarily structured
 * objects for easy object persistence. We need to use
 * the qcl_db_SimpleModel instead of qcl_db_model_xmlSchema_Model because the extending class
 * might be used in the property system (like qcl_xml_SimpleXmlStorage)
 * which would cause a recursion error.
 */
class qcl_data_persistence_db_Model
  extends qcl_db_model_SimpleModel
{
  /**
   * The class name
   * @var string
   */
  var $class = QCL_DB_PROPERTY_VARCHAR_250;

  /**
   * The id of the class instance
   * @var string
   */
  var $instanceId = QCL_DB_PROPERTY_VARCHAR_32;

  /**
   * The user id that owns this instance, if any
   * @var int
   */
  var $userId = QCL_DB_PROPERTY_INT;

  /**
   * The session id that owns this instance, if any
   * @var string
   */
   var $sessionId = QCL_DB_PROPERTY_VARCHAR_32;

  /**
   * The serialized data of this instance
   * @var blob
   */
  var $data = QCL_DB_PROPERTY_BLOB;

  /**
   * The name of the table
   *
   */
  var $table = "persistentObjects";

}
?>