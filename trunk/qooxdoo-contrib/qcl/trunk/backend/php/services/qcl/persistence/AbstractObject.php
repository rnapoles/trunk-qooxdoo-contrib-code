<?php
/*
 * dependencies
 */
require_once "qcl/mvc/AbstractModel.php";
require_once "qcl/persistence/__init__.php";

/*
 * constants
 */
 
/**
 * Lock mode constant: no lock (default)
 */
define("QCL_PERSISTENCE_NO_LOCK", 0);

/**
 * Lock mode constant: other objects can read the object, but 
 * cannot change it
 */
define("QCL_PERSISTENCE_WRITE_LOCK", 1);

/**
 * Lock mode constant: other objects cannot read or change the object
 * until the lock is released
 */
define("QCL_PERSISTENCE_READ_LOCK", 2);

/**
 * Abstract sub class for persistent objects 
 * By default, all public properties are saved (PHP4: all
 * properties that do not start with an underscore).
 */
class qcl_persistence_AbstractObject extends qcl_mvc_AbstractModel
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
   * The id of the instance 
   * @var string
   */
  var $instanceId;
  
  /**
   * The id of the user that this object belongs to.
   * @var int
   */
  var $_userId = null;
  
  /**
   * The id of the session that this object belongs to
   * @var string
   */
  var $_sessionId = null;
  
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
   * Timeout in seconds before trying to get the lock is aborted
   * @var int 
   */
  var $_lockTimeout = 3;

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
  var $_staleLockTimeout = 10;  
  
  /**
   * Constructor. Reconstructs object properties
   * @param qcl_mvc_Controller $controller
   * @param string[optional] $id Optional id if several objects of
   * the same class are to be persisted. If you don't provide an id,
   * the UUID-style object id is used. This means that you need to retrieve
   * the instanceId in order to access the persistent object in a later
   * request. If you want only one instance of this object to exist, pass
   * the class name of the inheriting class in its constructor to this 
   * parent constructor. 
   * @param int $userId If given, create/retrieve a persistent object that belongs
   * to the user. It will be deleted when the user is deleted.
   * @param string $sessionId If given, create/retrieve a persistent object that belongs
   * to the session. It will be deleted when the session expires or is deleted.
   */  
  function __construct( $controller, $id=null, $userId=null, $sessionId=null )
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
    * id of the object, identifying it among all the other saved instances of 
    * the class of the object. Use given id or object id 
    */ 
   if ( ! $id )
   {
     $id = $this->objectId();
   }  
   $this->instanceId = $id;
   
   /*
    * set user and session id
    */
    $this->_userId    = $userId;
    $this->_sessionId = $sessionId;
    
    /*
     * initialize the object
     */
    $this->initialize();
   
    /*
     * synchronize object and model data
     */
    $this->load( $id );
    
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
   * Reconstructs the object from the model data or creates it 
   * if it does not exist.
   * @param string $id the id of the object
   */
  function load( $id )
  {
    /*
     * id
     */
    if ( ! $id )
    {
      $this->raiseError("No id given");
    }
    
    /*
     * get data from implementing method
     */       
    $data = $this->_load( $id );
    
    /*
     * If no data was found, create new object
     */
    if ( $data === null )
    {
      $this->log($this->className() . " [$id] was not found. Creating it...","persistence");
      $this->create();
    }
    elseif ( is_array( $data ) )
    { 
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
        $seconds = $this->_dbModel->getSecondsSince( $this->_dbModel->getModified() );
        $timeout = $this->_staleLockTimeout;
        //$this->debug("Seconds since modified: $seconds, timeout $timeout.");
        
        if ( $seconds > $timeout )
        {
          $this->warn("Lock is older than $timeout. Removing it on " . $this->className() );
          $data['isLocked'] = false;
        }
      }
      
      //$this->debug("Object was found. Copying properties ...");
      
      /*
       * attach object properties to this object
       */
      //$d = array();
      foreach ( $this->persistedProperties() as $key)
      {
        $this->$key = $data[$key];
        //$d[] = $data[$key];
        //$this->debug(" Setting  '$key' to '{$this->$key}''");
      }
      //$this->debug(implode(",",$d));
      
      /*
       * set flag that this is a reconstructed object
       */
      $this->isNew = false;   

    }
    else
    {
      $this->log("Persisted object data is invalid.","persistence");
    }
    
    
    /*
     * object id
     */
    $this->instanceId = $id;    
  }
  
  /**
   * Implementing method to create a new record in the database 
   * that will hold the information for this instance
   */
  function create()
  {
    $this->notImplemented(__CLASS__); 
  }  
  
  /**
   * Reconstructs the object from the model data. Implementing method for load(). 
   * @param string $id the id of the object
   * @return null|false|array If null, no model data exists. If false, model data is
   * invalid. If valid data exists, return array. 
   */
  function _load( $id )
  {
    $this->notImplemented(__CLASS__);
  }
  
  /**
   * Reload object data
   */
  function reload()
  {
    $this->load( $this->instanceId );
  }
  
  /**
   * Tries to get a write lock. I am sure we have a race condition
   * here but don't know how to avoid it.
   */
  function getWriteLock()
  {
    
    /*
     * Reload object to get newest data, but only if the object is newly 
     * initialized. ??
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
      $this->warn("Object is already locked.");
      return;
    }
    
    /*
     * Check for lock
     */
    $timestamp = time();
    while ( $this->isLocked && $this->lockMode == QCL_PERSISTENCE_WRITE_LOCK )
    {
      /*
       * sleep a bit and try again if timeout hasn't
       * been reached
       */
      sleep(0.1);
      if ( time() - $timestamp > $this->_lockTimeout )
      {
        $this->raiseError("Cannot get write lock " . $this->className() . " [{$this->instanceId}]" );
      }
      $this->reload();
    }
    $this->_lockIsMine = true;
    $this->isLocked = true;
    $this->lockMode = QCL_PERSISTENCE_WRITE_LOCK;
    $this->save();
  }
  
  /**
   * Force remove a lock
   */
  function removeLock()
  {
    $this->isLocked = false;
    $this->lockMode = QCL_PERSISTENCE_NO_LOCK;
    $this->save();
  }
  
  /**
   * Releases a lock if it is owned. This saves the object.
   */
  function releaseLock()
  {
    //$this->debug("Trying to release Lock ...");
    if ( $this->isLocked and $this->_lockIsMine )
    {
      $this->removeLock();
    }
    elseif ( $this->isLocked )
    {
      $this->raiseError("Cannot release lock on ". $this->className() . " [{$this->instanceId}] : do not own lock.");
    }
    else
    {
       $this->warn("No need to release lock on " . $this->className() . " [{$this->instanceId}]: not locked.");
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
    $this->notImplemented(__CLASS__);
  }
  
  /**
   * Deletes object properties and persistent data
   * @return void
   */
  function delete()
  {
    $this->notImplemented(__CLASS__);
  }
  
  /**
   * Returns the unique label of this instance ( class name plus instance id)
   * @return string
   */
  function instanceLabel()
  {
    return $this->className() . " [$this->instanceId]";
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
      //$this->debug( $key . ": " . $this->$key . " <-> " . $this->_original[$key] );
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
    
    if ( $this->_isDeleted )
    {
      return;
    }
    
    /*
     * save if data has changed
     */   
    if ( $this->hasChanged() )
    {
      
      //$this->debug($this->className() . " [{$this->instanceId}] has changed, saving ... ");
      //$this->debug( $this->persistedProperties(true) );
      
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
      //$this->debug( $this->className() . " [{$this->instanceId}] has not changed.");
      //$this->debug( $this->persistedProperties(true) );
      if ( $this->isLocked and $this->_lockIsMine )
      {
        $this->releaseLock();     
      }
    }
  }
  

}
?>