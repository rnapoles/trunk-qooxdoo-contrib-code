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
require_once "qcl/data/persistence/model/Abstract.php";
require_once "qcl/data/persistence/db/Model.php";
require_once "qcl/data/model/xmlSchema/DbModel.php";

/**
 * Class that is persisted in the database
 * By default, all public properties are saved.
 */
class qcl_data_persistence_db_Object
  extends qcl_data_persistence_model_Abstract
{

  /**
   * model object
   * @acces private
   * @var qcl_data_persistence_db_Model
   */
  var $_dbModel;

  /**
   * Initializes the object. to
   * initialize the persistence system
   * @override
   */
  function initialize()
  {
    /*
     * create the actual model object that will be used to store
     * the data
     */
    $this->_dbModel = new qcl_data_persistence_db_Model;
  }

  /**
   * Needed for the migration to the behavior pattern
   */
  function getPersistenceBehavior()
  {
    require_once "qcl/data/persistence/behavior/Dummy.php";
    return qcl_data_persistence_behavior_Dummy::getInstance();
  }

  /**
   * Reconstructs the object from the model data.
   * @param string $id the id of the object
   * @return null|false|array If null, no model data exists. If false, model data doesn't
   * exist or is invalid. If valid data exists, return array.
   */
  function _load( $id )
  {
    /*
     * get or create model record
     */
    //$this->debug("Loading " . $this->className() . " [$id].");
    $instanceId = strlen($this->instanceId) > 100 ? md5($this->instanceId) : $this->instanceId;
    $this->_dbModel->findWhere(array(
      'class'      => $this->className(),
      'instanceId' => $instanceId,
      'userId'     => $this->_userId,
      'sessionId'  => $this->_sessionId
    ));

    /*
     * Check if model data was found. If nul, return null
     */
    if ( $this->_dbModel->foundNothing() )
    {
      return null;
    }

    /*
     * unserialize model object
     */
    $objData = $this->_dbModel->getProperty("data");
    //$this->debug($objData);
    $data = unserialize( $objData );
    //$this->debug($data);

    return $data;
  }

  /**
   * Creates a new record in the database that will hold the information for
   * this instance
   */
  function create()
  {
    $instanceId = strlen($this->instanceId) > 100 ? md5($this->instanceId) : $this->instanceId;

    /*
     * create new record in database
     */
    $this->_dbModel->create();
    $this->_dbModel->set( array(
      'class'      => $this->className(),
      'instanceId' => $instanceId,
      'userId'     => $this->_userId,
      'sessionId'  => $this->_sessionId
    ) );

    $this->_dbModel->save();
  }

  /*
   * clean up objects that refer to nonexisting users or sessions, but only once
   */
  function cleanUp()
  {
    require_once "qcl/data/model/xmlSchema/DbRegistry.php";
    if ( qcl_data_model_xmlSchema_DbRegistry::isInitialized( null, "sessions" )
         and qcl_data_model_xmlSchema_DbRegistry::isInitialized( null, "users" ) )
    {
      $prefix = $this->_dbModel->getTablePrefix();
      $this->_dbModel->deleteWhere("
        ( sessionId IS NOT NULL AND sessionId NOT IN ( SELECT sessionId FROM {$prefix}sessions ) )
          OR
        ( userId IS NOT NULL AND userId NOT IN ( SELECT id FROM {$prefix}users ) )
      ");
    }
  }


  /**
   * Saves the object to the storage
   */
  function save()
  {
    $this->log("Saving object data for '" . $this->className() . "' [$this->instanceId].","persistence");

    if ( $this->_isDeleted )
    {
      $this->warn("Cannot save a deleted object.");
      return;
    }

    if ( $this->isLocked
         and $this->lockMode == $this->WRITE_LOCK
         and ! $this->_lockIsMine )
    {
      $this->warn("Cannot save " . $this->className()  . " [$this->instanceId]." . " because of write lock." );
      return;
    }

    /*
     * save object data
     */
    $data = array();
    $properties = $this->persistedProperties();

    foreach( $properties as $property )
    {
      $data[$property] = $this->$property;
      //$this->debug(" Saving '$property' with value '$data[$property]'");
    }
    $this->_dbModel->setData( serialize( $data ) );

    $this->_dbModel->save();
    $this->_hasChanged = false;
  }

  /**
   * Deletes object properties and persistent data
   * @return void
   */
  function delete()
  {
    $id = $this->_dbModel->getId();
    $this->_dbModel->delete($id);
    foreach( $this->persistedProperties() as $key )
    {
      $this->$key = null;
    }

    $this->_isDeleted = true;
  }
}
?>