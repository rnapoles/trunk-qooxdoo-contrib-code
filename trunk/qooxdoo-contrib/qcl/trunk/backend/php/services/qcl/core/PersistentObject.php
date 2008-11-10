<?php
/*
 * dependencies
 */
require_once "qcl/jsonrpc/model.php";

/**
 * Abstract class that is persisted in the filesystem
 * By default, all public properties are saved (PHP4: all
 * properties that do not start with an underscore).
 * FIXME: implement, this is currently still a copy
 * of qcl_db_PersistentObject
 */
class qcl_core_PersistentObject extends qcl_jsonrpc_model
{

  
  /**
   * Copy of object properties in its initial state (to check whether
   * it has been modified during runtime)
   * @var array
   */
  var $_original;
  
  /**
   * Flag to indicate if object has changed during runtime
   * @var bool
   */
  var $_hasChanged;

  /**
   * Flag to indicate that  object has been deleted
   * @var bool
   */
  var $_isDeleted;  
  
  /**
   * Indicates that this is a persistent object
   * @var bool
   */
  var $isPersistent = true;

  /**
   * The id of the object if several objects of the
   * same class are saved seperately
   * @var string
   */
  var $objectId;
  
  /**
   * Indicates that this is the first time the object
   * has been created, i.e. is has not been reconstructed
   * from the database
   * @var bool
   */
  var $isNew = true;
  
  /**
   * Whether a process has locked the object for exclusive
   * access. 
   * @var bool
   */
  var $isLocked;
  
  /**
   * The lock mode
   * @var int
   */
  var $lockMode = 0;
  
  /**
   * Lock mode constant: no lock (default)
   */
  var $NO_LOCK    = 0;
  
  /**
   * Lock mode constant: other objects can read the object, but 
   * cannot change it
   */
  var $WRITE_LOCK = 1;
  
  /**
   * Lock mode constant: other objects cannot read or change the object
   * until the lock is released
   */
  var $READ_LOCK  = 2;
  
  /**
   * Timeout in seconds before trying to get the lock is aborted
   * @var int 
   */
  var $lockTimeout = 3;

  /**
   * Flag indicating that the current lock is owned by the object
   * itself
   * @var bool
   */
  var $_lockIsMine = false;
  
  /**
   * Timeout in seconds before stale lock is broken
   * @var int 
   */
  var $staleLockTimeout = 10;  
  
  /**
   * Constructor. Reconstructs object properties
   * @param qcl_jsonrpc_controller $controller
   * @param string[optional] $id Optional id if several objects of
   * the same class are to be persisted. If you don't provide an id,
   * the UUID-style object id is used. This means that you need to retrieve
   * the objectId in order to access the persistent object in a later
   * request. If you want only one instance of this object to exist, pass
   * the class name of the inheriting class in its constructor to this 
   * parent constructor. 
   */  
  function __construct( $controller, $id=null)
  {
    /*
     * call parent contructor
     */
    parent::__construct( &$controller );
    
    /*
     * check if class is subclassed
     */
    if ( $this->className() == __CLASS__ )
    {
      $this->raiseError( __CLASS__ . " is abstract and cannot be used directly.");
    }
    
   /*
    * use object id as id if no id is given
    */ 
   if ( ! $id )
   {
     $id = $this->objectId();
   }
    
    /*
     * initialize the object
     */
    $this->initialize();
    
    /*
     * synchronize object and model data
     */
    $this->load($id);
    
  }

  /**
   * Empty stub for method that Initializes the object
   * @return void
   */
  function initialize() {}
  
  /**
   * Overrideable method to check if this is the first time the
   * object has been initialized
   * return bool 
   */
  function isNew()
  {
    return $this->isNew;
  }
  
  /**
   * Reconstructs the object from the model data. This _must_ set
   * $this->_original!
   */
  function load($id=null)
  {
    $this->raiseError("Not yet implemented");
  }
  
  /**
   * Reload object data
   */
  function reload()
  {
    $this->load($this->objectId);
  }
  
  /**
   * Tries to get a write lock. I am sure we have a race condition
   * here but don't know how to avoid it.
   */
  function getWriteLock()
  {
    
    /*
     * Reload object to get newest data, but only if the object is new
     */
    if ( ! $this->isNew() )
    {
      $this->reload();  
    }
    
    /*
     * check if we already have a lock
     */
    if ( $this->isLocked && $this->_lockIsMine )
    {
      $this->raiseError("Object is already locked.");
    }
    
    /*
     * Check for lock
     */
    $timestamp = time();
    while ( $this->isLocked && $this->lockMode == $this->WRITE_LOCK )
    {
      /*
       * sleep a bit and try again if timeout hasn't
       * been reached
       */
      sleep(0.1);
      if ( time() - $timestamp > $this->lockTimeout )
      {
        $this->raiseError("Cannot write read access to locked object " . $this->className() );
      }
      $this->load();
    }
    $this->_lockIsMine = true;
    $this->isLocked = true;
    $this->lockMode = $this->WRITE_LOCK;
    $this->save();
  }
  
  /**
   * Force remove a lock
   */
  function removeLock()
  {
    $this->isLocked = false;
    $this->lockMode = $this->NO_LOCK;
    $this->save();
  }
  
  /**
   * Releases a lock if it is owned
   */
  function releaseLock()
  {
    if ( $this->isLocked and $this->_lockIsMine )
    {
      $this->removeLock();
    }
    elseif ( $this->isLocked )
    {
      $this->raiseError("Cannot release lock on ". $this->className() . "[{$this->objectId}] : do not own lock.");
    }
    else
    {
       $this->warn("No need to release lock on " . $this->className() . "[{$this->objectId}]: not locked.");
    }
  }
  
  /**
   * Return the names of all properties that are to be persistent.
   * By default, this returns all public property names of this class.
   * FIXME: Adapt for PHP5
   * @return array
   */
  function persistedProperties( $withValues= false )
  {
    $properties = array(); 
    foreach ( array_keys( get_class_vars( $this->className() ) ) as $key )
    {
      if ( $key{0} != "_" )
      {
        $properties[$key] = $this->$key;
      }
    }
    return $withValues ? $properties : array_keys($properties);
  }
  
  
  /**
   * Saves the object to the storage
   * FIXME: the whole object seems to be serialized although the __sleep method returns 
   * only the property names...
   */
  function save()
  {
    $this->raiseError("Not yet implemented");
  }
  
  /**
   * Deletes object properties and persistent data
   * @return void
   */
  function delete()
  {
    $this->raiseError("Not yet implemented");
  }
  
  /**
   * Checks if object has changed during runtime by 
   * comparing the persisted properties to their
   * orginal state
   * @return bool
   */
  function hasChanged()
  {
    if ( $this->_hasChanged ) return true;
    
    foreach( $this->persistedProperties() as $key )
    {
      //$this->info( $key . ": " . $this->$key . " <-> " . $this->_original[$key] );
      if ( $this->$key != $this->_original[$key] )
      {
        /*
         * remember that something has changed
         */
        $this->_hasChanged  = true; 
        break;
      }
    }
    return $this->_hasChanged;
  }
  
  /**
   * Set the value for the object change flag
   * @param bool $value
   * @return void
   */
  function setChanged($value)
  {
    $this->_hasChanged = $value;
  }
  
  /**
   * Destructor. 
   */
  function __destruct()
  {
    /*
     * do not check for changes if deleted or there is no change
     */
    if ( $this->_isDeleted or $this->_hasChanged === false )
    {
      return;
    }
    
    /*
     * save if data has changed
     */   
    if ( $this->hasChanged() )
    {
      
      //$this->info($this->className() . " [{$this->objectId}] has changed, saving ... ");
      //$this->info( $this->persistedProperties(true) );
      
      if ( $this->isLocked )
      {
        /*
         * release lock, this implicitly saves object data
         */
        $this->releaseLock();
      }
      else
      {
        /*
         * Save object
         */
        $this->save();
      }
    }
    else
    {
      //$this->info($this->className() . " [{$this->objectId}] has not changed.");
      //$this->info( $this->persistedProperties(true) );
      if ( $this->isLocked and $this->_lockIsMine )
      {
        $this->releaseLock();     
      }
    }
  }
}
?>