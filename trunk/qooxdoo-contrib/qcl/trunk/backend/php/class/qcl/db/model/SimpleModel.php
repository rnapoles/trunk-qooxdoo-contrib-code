<?php
/*
 * dependencies
 */
require_once "qcl/db/model/AbstractModel.php";
require_once "qcl/db/IModel.php";

/**
 * Simpler ORM Mmechanism than the qcl_db_model_xml_XmlSchemaModel way that uses xml
 * documents for a schema. In this model type, declare public properties
 * with QCL_DB_PROPERTY_* constants. However, there is be no automatic
 * setup and maintenance of tables (at least for now). This system is
 * probably a bit faster than the other.
 * @todo change inheritance order: this class should have all methods from
 * qcl_db_model_xml_XmlSchemaModel that do not rely on the xml schema system,
 * and qcl_db_model_xml_XmlSchemaModel should inherit from it.
 * Caution: you cannot access the object properties directly, but need to
 * use getter and setter methods (for now).
 *
 * The simple model will be completely rewritten using a qooxdoo-class-like
 * property system, so don't use it.
 *
 * @todo is SimpleModel the right name?
 * @todo Implement automatic getter and setter access to properties that
 * are saved in the database
 */
class qcl_db_model_SimpleModel
  extends qcl_db_model_AbstractModel
  implements qcl_db_IModel
{
  /**
   * This model does not have a schema xml document but
   * manages its properties directly
   * @todo property definition should be like
   * $properties = array(
   *  'foo' => array(
   *    'type'     => "qcl_db_property_varchar32",
   *    'nullable' => true,
   *    'init'     => 'foo'
   *  )
   * ):
   */
  var $schemaXmlPath = false;

  /**
   * The id column
   */
  var $id = QCL_DB_PROPERTY_INT;

  /**
   * The created column
   */
  var $created = QCL_DB_PROPERTY_TIMESTAMP;

  /**
   * The modified column
   */
  var $modified = QCL_DB_PROPERTY_TIMESTAMP;


  /**
   * simplyfied method that does not rely on the property system
   * @param string $property
   */
  function getColumnName( $property )
  {
    return $property;
  }

  function getIdColumn()
  {
    return "id";
  }

  /**
   * Simplyfied method that does not rely on the property system.
   *
   * @param string $where
   * @param string $orderBy
   * @param string $properties
   */
  function findWhere( $where, $orderBy=null, $properties=null, $link=null, $conditions=null, $distict=false)
  {

    if ( is_null($properties) ) $properties = "*";
    $sql = "SELECT $properties FROM {$this->table} WHERE " . $this->toSql($where);
    if ( $orderBy ) $sql .= " ORDER BY `$orderBy`";

    /*
     * execute query
     */
    //$this->debug($sql);
    $result = $this->db->getAllRecords($sql);

    /*
     * store and return result
     */
    $this->currentRecord = count($result) ? $result[0] : null;
    $this->_lastResult   = $result;
    return $result;
  }

  function getPropertyType( $property )
  {
    if ( ! $this->hasProperty( $property ) )
    {
      $this->raiseError("Model does not have a property '$property'.");
    }

    switch ( $this->$property )
    {
      case QCL_DB_PROPERTY_INT: return "int";
      case QCL_DB_PROPERTY_BOOLEAN: return "bool";
      default: return "string";
    }
  }

  function unschematize($data)
  {
    return $data;
  }

  function schematize($data)
  {
    return $data;
  }

  function hasProperty( $property )
  {
    if ( ! is_string($property) )
    {
      $this->raiseError("Invalid property '$property'.");
    }
    return (
      substr($this->$property,0,strlen(QCL_DB_PROPERTY)) == QCL_DB_PROPERTY
    );
  }

}
?>