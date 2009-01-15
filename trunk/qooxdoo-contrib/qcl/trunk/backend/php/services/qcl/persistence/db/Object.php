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
   * Reconstructs the object from the model data. This _must_ set $this->_original
   * FIXME: we have ::objectId and ::_objectId/::objectId() (object uuid) now 
   * -> needs to be integrated
   */
  function load( $id=null )
  {
    
    /*
     * get or create model record
     */
    //$this->info("Loading " . $this->className() . " [$id].");
    $this->_dbModel->findWhere(array(
      'class'    => $this->className(),
      'objectId' => $id,
      'userId'   => $this->_userId,
      'sessionId'=> $this->_sessionId
    ));         

    
    /*
     * Check if model data was found
     */
    if ( $this->_dbModel->foundNothing() )
    {
      //$this->info($this->className() . " [$id] was not found. Creating it...");
      
      /*
       * create new record in database
       */
      $this->_dbModel->create();
      $this->_dbModel->set( array( 
        'class'     => $this->className(),
        'objectId' => $id,
        'userId'   => $this->_userId,
        'sessionId'=> $this->_sessionId
      ) );

      if ( $id )
      {
        $this->_dbModel->setProperty("objectId",$id);
      }
      $this->_dbModel->save();
      
      /*
       * use the opportunity to clean up
       */
      $this->cleanUp();
    }
    else
    {
      /*
       * unserialize model object
       */
      //$this->info($this->_dbModel->getRecord());
      $objData = $this->_dbModel->getProperty("data");
      //$this->info($objData);
      $data = unserialize( $objData );
      //$this->info($data);
      
      /*
       * save original data against which to check
       * for modifications
       */
      $this->_original = $data;
      
      /*
       * check for lock
       */
      if ( $data['isLocked'] )
      {
        /*
         * check timestamp to break locks by aborted
         * processes
         */
        $seconds = $this->_dbModel->getSecondsSince($this->_dbModel->getModified());
        //$this->info("Seconds since modified: $seconds");
        
        if ( $seconds > $this->staleLockTimeout )
        {
          $this->warn("Removing stale lock on " . $this->className() );
          $data['isLocked'] = false;
        }
      }
      
      //$this->info("Object was found. Copying properties ...");
      
      /*
       * attach object properties to this object
       */
      //$d = array();
      foreach ( $this->persistedProperties() as $key)
      {
        $this->$key = $data[$key];
        //$d[] = $data[$key];
        //$this->info(" Setting  '$key' to '{$this->$key}''");
      }
      //$this->info(implode(",",$d));
      
      /*
       * set flag that this is a reconstructed object
       */
      $this->isNew = false;   

    }
    
    /*
     * object id
     */
    $this->objectId = $id;    
  }
  
  /*
   * clean up objects that refer to nonexisting users or sessions
   */
  function cleanUp()
  {
    $this->deleteWhere("
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
      $this->raiseError("Cannot save " . $this->className()  . " [$this->objectId]." . " because of write lock." );
      return; 
    }
    
    //$this->info("Saving object data for '" . $this->className() . "' [$this->objectId].");
    
    /*
     * save object data
     */
    $data = array();
    $properties = $this->persistedProperties();
    
    foreach( $properties as $property )
    {
      $data[$property] = $this->$property;
      //$this->info(" Saving '$property' with value '$data[$property]'");
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