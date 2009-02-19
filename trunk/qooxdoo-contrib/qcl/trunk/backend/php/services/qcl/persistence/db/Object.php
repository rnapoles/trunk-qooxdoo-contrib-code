<?php
/*
 * dependencies
 */
require_once "qcl/persistence/AbstractObject.php";
require_once "qcl/persistence/db/Model.php";

/**
 *  * @todo this can be removed once qcl_db_SimpleModel does
 * automatic table creation.
 */
require_once "qcl/db/model.php";
class qcl_persistence_db_Setup extends qcl_db_model 
{
  var $schemaXmlPath = "qcl/persistence/db/Model.xml";
}

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
   * @var qcl_persistence_db_Model
   */
  var $_dbModel;  
  
  /**
   * Initializes the object
   * @override
   */
  function initialize()
  {
    $controller     =& $this->getController();

    /*
     * Initialize a dummy qcl_db_model object to create tables
     * @todo this can be removed once qcl_db_SimpleModel does
     * automatic table creation.
     */
    if ( ! class_exists( "qcl_persistence_db_Setup" ) )
    {
      $dummy =& new qcl_persistence_db_Setup(&$controller);        
    }

    /*
     * create the actual model object that will be used to store
     * the data
     */
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
    
    /*
     * use the opportunity to clean up objects that refer
     * to non-existing users or sessions
     */
    $this->cleanUp();    
  }
  
  /*
   * clean up objects that refer to nonexisting users or sessions
   * FIXME disabled: this requires tables sessions and users created beforehand
   */
  function cleanUp()
  {
    /*
    $this->_dbModel->deleteWhere("
      sessionId NOT IN ( SELECT sessionId FROM sessions ) OR
      userId NOT IN ( SELECT id FROM users )
    ");
    */          
  }
  
  
  /**
   * Saves the object to the storage
   */
  function save()
  {
    $this->log("Saving object data for '" . $this->className() . "' [$this->instanceId].","persistence");
    
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