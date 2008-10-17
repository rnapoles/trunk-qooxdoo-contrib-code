<?php
/*
 * dependencies
 */
require_once "qcl/core/PersistentObject.php";
require_once "qcl/db/PersistentModel.php";

/**
 * Abstract class that is persisted in the database
 * By default, all public properties are saved (PHP4: all
 * properties that do not start with an underscore).
 */
class qcl_db_PersistentObject extends qcl_core_PersistentObject
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
    $this->_dbModel =& new qcl_db_PersistentModel(&$controller);    
  }
  
  /**
   * Reconstructs the object from the model data
   * FIXME: we have ::objectId and ::_objectId/::objectId() (object uuid) now -> needs to be integrated
   */
  function load($id=null)
  {
    /*
     * get or create model record
     */
    if ( $id )
    {
      //$this->info("Loading " . $this->getClassName() . " [$id].");
      
      $this->_dbModel->findWhere(array(
        'class'    => "= '" . $this->getClassName() . "' AND ",
        'objectId' => "= '$id'"
      )); 
    }
    else
    {
      $this->_dbModel->findByClass( $this->getClassName() );
    }
    
    /*
     * Check if model data was found
     */
    if ( $this->_dbModel->foundNothing() )
    {
      //$this->info($this->getClassName() . " [$id] was not found. Creating it...");
      
      /*
       * create new record in database
       */
      $this->_dbModel->create();
      $this->_dbModel->setClass( $this->getClassName() );
      if ( $id )
      {
        $this->_dbModel->setProperty("objectId",$id);
      }
      $this->_dbModel->save();
    }
    else
    {
      /*
       * unserialize model object
       */
      $object = unserialize( $this->_dbModel->getData() );
      
      /*
       * check for lock
       */
      if ( $object->isLocked )
      {
        /*
         * check timestamp to break locks by aborted
         * processes
         */
        $seconds = $this->_dbModel->getSecondsSince($this->_dbModel->getModified());
        //$this->info("Seconds since modified: $seconds");
        
        if ( $seconds > $this->staleLockTimeout )
        {
          $this->warn("Removing stale lock on " . $this->getClassName() );
          $object->removeLock();
        }
      }
      
      //$this->info("Object was found. Copying properties ...");
      
      /*
       * attach object properties to this object
       */
      foreach ( $this->getPropertyNames() as $key)
      {
        $this->$key =& $object->$key;
        //$this->info("  '$key' (" . gettype($object->$key) . ")");
      }
      
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
  
  /**
   * Saves the object to the storage
   */
  function save()
  {
    if ( $this->isLocked 
         and $this->lockMode == $this->WRITE_LOCK
         and ! $this->_lockIsMine )
    {
      $this->raiseError("Cannot save " . $this->getClassName() . " because of write lock." );
      return; 
    }
    $this->_dbModel->setData( serialize( $this ) );
    $this->_dbModel->save();
  }
  
  
}
?>