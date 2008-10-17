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
   * Copy of object in its initial state (to check whether
   * it has been modified during runtime)
   * @var qcl_db_PersistentObject
   */
  var $_original;
  
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
   * the same class are to be persisted
   */  
  function __construct($controller, $id=null)
  {
    /*
     * call parent contructor
     */
    parent::__construct(&$controller);
    
    /*
     * check if class is subclassed
     */
    if ( $this->getClassName() == __CLASS__ )
    {
      $this->raiseError( __CLASS__ . " is abstract and cannot be used directly.");
    }
    
    /*
     * initialize the object
     */
    $this->initialize();
    
    /*
     * synchronize object and model data
     */
    $this->load($id);

    /*
     * save copy of object to be able to check for modifications
     * later
     */
    $this->_original = $this;
    
  }

  /**
   * Initializes the object
   */
  function initialize()
  {
    $this->raiseError("Not implemented");
  }
  
  
   /**
   * Method called when called method does not exist. 
   * This will check whether method name is 
   * 
   * - getXxx or setXxx and then return/set the public property xxx
   * Otherwise, raise an error.
   * @param string $function  Method name
   * @param array  $arguments Array or parameters passed to the method
   * @param mixed  $return    call-time reference to return value (PHP4-only)
   * @return mixed return value (PHP5 only) 
   */
  function __call( $function, $arguments, &$return) 
  {
    /*
     * we need to reimplement the mixin behavior from 
     * qcl_object because we cannot call the parent 
     * class method
     * @see qcl_object::__call()
     */
    if ( phpversion() >= 5 and isset($this->_mixinlookup[$method] ) )
    {
      $elems = array();
      for ($i=0, $_i=count($args); $i<$_i; $i++) $elems[] = "\$args[$i]";
      eval("\$result = ".$this->_mixinlookup[$method]."::"
          .$method."(".implode(',',$elems).");");
      return $result;
    }
    
    /*
     * php4 or no matching mixin methods found.
     * Now we intercept method calls
     */
    $startsWith = strtolower( substr( $function, 0, 3 ) );
    $endsWith   = strtolower( substr( $function, 3 ) );
    
    
    /*
     * get.. and set... for property access
     * @todo: correct calling of method with variable arguments
     */
    if ( $startsWith == "set" or $startsWith == "get"  )
    {
      if ( $startsWith == "set" )
      {
        $this->$endsWith = $arguments[0];
      }
      elseif ( $startsWith == "get" )
      { 
        $return = $this->$endsWith;
      }
    }
    
    /*
     * method not known, raise error
     */
    else
    {
      $this->raiseError("Unknown method " . get_class($this) . "::$function().");
    }
    
    /*
     * return result
     */
    if ( phpversion() < 5) 
    {
      return true; // PHP 4: return value is in &$return
    }
    else
    {
      return $return; // PHP 5  
    }
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
     * Reload object to get newest data
     */
    $this->reload();
    
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
        $this->raiseError("Cannot write read access to locked object " . $this->getClassName() );
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
      $this->raiseError("Cannot release lock on ". $this->getClassName() . "[{$this->objectId}] : do not own lock.");
    }
    else
    {
       $this->warn("No need to release lock on " . $this->getClassName() . "[{$this->objectId}]: not locked.");
    }
  }
  
  /**
   * Get all public property names of this class.
   * @return array
   */
  function getPropertyNames()
  {
    $propList = new ArrayList; 
    foreach ( array_keys( get_class_vars( $this->getClassName() ) ) as $key )
    {
      if ( $key{0} != "_" )
      {
        $propList->add($key);
      }
    }
    $keys = $propList->toArray();
    return $keys;
  }
  
  /**
   * Magic method which is called before object is 
   * serialized. Returns an array of object property names
   * that are to be serialized.
   * @return array
   */
  function __sleep()
  {
    return $this->getPropertyNames();
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
  
  /**
   * Deletes object properties and persistent data
   * @return void
   */
  function delete()
  {
    $id = $this->_dbModel->getId();
    $this->_dbModel->delete($id);
    foreach( $this->getPropertyNames() as $key )
    {
      $this->$key = null;
    }
  }
  
  /**
   * Destructor. Serializes object and saves it to database
   */
  function __destruct()
  {
    
    /*
     * Check if object has changed
     */
    $changed = false;
    foreach($this->getPropertyNames() as $key )
    {
      //$this->info( $key . ": " . $this->$key . " <-> " . $this->_original->$key );
      if ( $this->$key != $this->_original->$key )
      {
        $changed = true; 
        break;
      }
    }
    
    if ( $changed )
    {
      
      //$this->info($this->getClassName() . " [{$this->objectId}] has changed, saving ... ");
      
      if ( $this->isLocked )
      {
        /*
         * release lock and save object
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
      //$this->info($this->getClassName() . " [{$this->objectId}] has not changed.");
    }
  }
  
}
?>