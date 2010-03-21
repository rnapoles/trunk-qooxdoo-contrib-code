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
qcl_import( "qcl_core_IPersistenceBehavior" );
qcl_import( "qcl_data_model_db_NamedActiveRecord" );

/**
 * Persistence behavior singleton which is bases on a db-based
 * ActiveRecord object. Saves the serialized object properties
 * into a blob column.
 */
class qcl_data_model_db_PersistenceBehavior
  extends    qcl_data_model_db_NamedActiveRecord
  implements qcl_core_IPersistenceBehavior
{

  //-------------------------------------------------------------
  // Static members
  //-------------------------------------------------------------

  /**
   * Return singleton instance of this class
   * @return qcl_data_model_db_PersistenceBehavior
   */
  public static function getInstance()
  {
    return qcl_getInstance( __CLASS__ );
  }

  //-------------------------------------------------------------
  // Properties
  //-------------------------------------------------------------

  private $properties = array(
    "data" => array(
      "check"   => "string",
      "sqltype" => "longblob" //FIXME this is mysql-specific!
    )
  );

  //-------------------------------------------------------------
  // Constructor
  //-------------------------------------------------------------

  /**
   * Constructor, adds properties
   * @return unknown_type
   */
  function __construct()
  {
    $this->addProperties( $this->properties );
    parent::__construct();
  }

  //-------------------------------------------------------------
  // API methods
  //-------------------------------------------------------------

  /**
   * Loads the object's public properties from the session
   * @param qcl_core_Object $object Persisted object
   * @param string $id The id of the saved object
   * @return void
   */
  public function restore( $object, $id )
  {
    $this->loadWhere( array(
      'namedId' => $id
    ));
    if ( $this->foundSomething() )
    {
      qcl_log_Logger::getInstance()->log( $object->className() . ": restoring properties from id '$id'","persistence");
      $object->unserialize( $this->get("data") );
      return true;
    }
    else
    {
      qcl_log_Logger::getInstance()->log( $object->className() . ": no cached data with id '$id'","persistence");
      return false;
    }
  }

  /**
   * Saves the object's public property to the session
   * @param qcl_core_Object $object Persisted object
   * @param string $id The id of the saved object
   */
  public function persist( $object, $id )
  {
    $this->createIfNotExists( $id );
    $this->set( "data", $object->serialize() );
    $this->save();
    qcl_log_Logger::getInstance()->log( $object->className() . " saved to cache with id '$id'", "persistence");
  }

  /**
   * Deletes the persistence data for the object with the given id.
   * @param qcl_core_Object $object Persisted object
   * @param string $id The id of the saved object
   */
  public function clear( $object, $id )
  {
    qcl_log_Logger::getInstance()->log( "Deleting persistence data for " . $object->className() . " (id '$id')", "persistence");
    unset( $_SESSION[ self::KEY ][ $id ] );
  }
}
?>