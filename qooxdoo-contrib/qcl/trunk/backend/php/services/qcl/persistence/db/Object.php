<?php
/*
 * dependencies
 */
require_once "qcl/persistence/AbstractObject.php";
require_once "qcl/persistence/db/Model.php";

/**
 * Abstract class that is persisted in the database
 * By default, all public properties are saved (PHP4: all
 * properties that do not start with an underscore).
 */
class qcl_persistence_db_Object extends qcl_persistence_AbstractObject
{

  /**
   * model object
   * @acces private
   * @var qcl_db_PersistentModel
   */
  var $_dbModel;  
  
  /**
   * Initializes the object
   */
  function initialize()
  {
    /*
     * database model storing the object data
     */
    $controller     =& $this->getController();
    $this->_dbModel =& new qcl_persistence_db_Model(&$controller);    
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
    $this->_dbModel->findWhere(array(
      'class'      => $this->className(),
      'instanceId' => $id,
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
    
    /*
     * create new record in database
     */
    $this->_dbModel->create();
    $this->_dbModel->set( array( 
      'class'      => $this->className(),
      'instanceId' => $this->instanceId,
      'userId'     => $this->_userId,
      'sessionId'  => $this->_sessionId
    ) );
    
    $this->_dbModel->save();
    
    /*
     * use the opportunity to clean up objects that refer
     * to non-existing users or sessions
     */
    $this->cleanUp();    
  }
  
  /*
   * clean up objects that refer to nonexisting users or sessions
   */
  function cleanUp()
  {
    $this->_dbModel->deleteWhere("
      sessionId NOT IN ( SELECT sessionId FROM sessions ) OR
      userId NOT IN ( SELECT id FROM users )
    ");          
  }
  
  
  /**
   * Saves the object to the storage
   */
  function save()
  {
    if ( $this->_isDeleted )
    {
      $this->raiseError("Cannot save a deleted object.");
    }
    
    if ( $this->isLocked 
         and $this->lockMode == $this->WRITE_LOCK
         and ! $this->_lockIsMine )
    {
      $this->raiseError("Cannot save " . $this->className()  . " [$this->instanceId]." . " because of write lock." );
      return; 
    }
    
    //$this->debug("Saving object data for '" . $this->className() . "' [$this->instanceId].");
    
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