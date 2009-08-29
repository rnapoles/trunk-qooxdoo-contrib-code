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
require_once "qcl/data/model/db/Abstract.php";
require_once "qcl/data/db/IModel.php";

/**
 * Simpler ORM Mmechanism than the qcl_data_model_xmlSchema_DbModel way that uses xml
 * documents for a schema. In this model type, declare public properties
 * with qcl_data_db_PROPERTY_* constants. However, there is be no automatic
 * setup and maintenance of tables (at least for now). This system is
 * probably a bit faster than the other.
 * @todo change inheritance order: this class should have all methods from
 * qcl_data_model_xmlSchema_DbModel that do not rely on the xml schema system,
 * and qcl_data_model_xmlSchema_DbModel should inherit from it.
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
class qcl_data_model_db_Simple
  extends qcl_data_model_db_Abstract
  implements qcl_data_db_IModel
{
  /**
   * This model does not have a schema xml document but
   * manages its properties directly
   * @todo property definition should be like
   * $properties = array(
   *  'foo' => array(
   *    'type'     => "qcl_data_db_property_varchar32",
   *    'nullable' => true,
   *    'init'     => 'foo'
   *  )
   * ):
   */
  var $schemaXmlPath = false;

  /**
   * The id column
   */
  var $id = qcl_data_db_PROPERTY_INT;

  /**
   * The created column
   */
  var $created = qcl_data_db_PROPERTY_TIMESTAMP;

  /**
   * The modified column
   */
  var $modified = qcl_data_db_PROPERTY_TIMESTAMP;

  /**
   * Constructor. Automatically configures the table name
   * @return void
   */
  function __construct($controller=null)
  {
    if ( ! $this->table() )
    {
      $this->raiseError("No table name!");
    }
    $this->setTableName( $this->getTablePrefix() . $this->table() );

    parent::__construct(&$controller);
  }

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
  function findWhere( $where, $orderBy=null, $properties=null, $link=null, $conditions=null, $distinct=false)
  {

    if ( is_null($properties) ) $properties = "*";
    $table = $this->table();
    $sql = "SELECT $properties FROM `$table` WHERE " . $this->toSql($where);
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
      case qcl_data_db_PROPERTY_INT: return "int";
      case qcl_data_db_PROPERTY_BOOLEAN: return "bool";
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
      substr($this->$property,0,strlen(qcl_data_db_PROPERTY)) == qcl_data_db_PROPERTY
    );
  }

}
?>