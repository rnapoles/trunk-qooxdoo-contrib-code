<?php
/*
 * dependencies
 */
require_once "qcl/access/Manager.php";
require_once "qcl/db/model/xmlSchema/Model.php";

/**
 * Configuration management class, using a database backend
 *
 */

class qcl_config_Db
  extends qcl_db_model_xmlSchema_Model
{

  /**
   * types that config values may have
   * @var array
   */
  var $types = array("string","number","boolean","list");

  /**
   * Results are cached for faster access
   * @var array
   */
  var $_cache = array();

  /**
   * Returns singleton instance.
   * @static
   * @return qcl_config_Db
   */
  function &getInstance( $class=__CLASS__ )
  {
    return parent::getInstance( $class );
  }

	/**
	 * creates a config property, overwriting any previous entry
	 * requires permission "qcl.config.permissions.manage"
	 *
	 * @param string $nameId The name of the property (i.e., myapplication.config.locale)
	 * @param string $type The type of the property (string|number|object|boolean)
	 * @param string $permissionRead The permission name that is needed to access
	 * 		  and read this property (optional)
	 * @param string $permissionWrite The permission name that is needed to access
	 * 		  and read this property (optional)
	 * @param boolean $allowUserVariants If true, allow users to create their
	 * 		  own variant of the configuration setting
	 * @return id of created config entry
	 */
	function createKey(
	   $namedId,
	   $type,
	   $permissionWrite=null,
	   $allowUserVariants=false
	) {

		/*
		 * check permission
		 */
    $activeUser  =& qcl_access_Manager::getActiveUser();

    //$activeUser->requirePermission("qcl.config.permissions.manage");


		/*
		 * Check type
		 */
		if ( ! in_array( $type, $this->types ) )
		{
			$this->raiseError("Invalid type '$type'");
		}

    /*
     * check if key exists
     */
    if ( $this->has( $namedId ) )
    {
      $this->userNotice("Config key '$namedId' already exists.");
      // never gets here
    }

		/*
		 * The user id is 0 for default valus and null for global
		 * values which cannot have a user variant
		 */
		$userId = $allowUserVariants ? 0 : null;

		return $this->insert( array(
		  'namedId'         => $namedId,
		  'type'            => $type,
		  'userId'          => $userId,
		  'permissionWrite' => $permissionWrite,
		  'userId'          => $userId
		));
	}

	/**
	 * Create a config key if it doesn't exist already
	 * @see qcl_config_Db::create()
	 * @param $namedId
	 * @param $type
	 * @param $permissionWrite
	 * @param $allowUserVariants
	 * @return int|bool  Returns the id of the newly created record, or false if
	 * key was not created.
	 */
	function createKeyIfNotExists(
     $namedId,
     $type,
     $permissionWrite=null,
     $allowUserVariants=false
  ) {
    if ( ! $this->has( $namedId ) )
    {
      return $this->createKey(
       $namedId,
       $type,
       $permissionWrite,
       $allowUserVariants
      );
    }
    else
    {
      return false;
    }
  }

  /**
   * Gets the user data model
   * @param int[optional] $id Load record if given
   * @return qcl_access_model_User
   */
  function &getUserModel( $id=null )
  {
    $userModel =& qcl_access_model_User::getInstance();
    if ( $id ) $userModel->load( $id );
    return $userModel;
  }

  /**
   * Returns active user object instance
   * @return qcl_access_model_User
   */
  function &getActiveUser()
  {
    return qcl_access_Manager::getActiveUser();
  }

	/**
	 * Deletes a config key dependent on permissions
	 * @todo call statically with id parameters
	 * @return void
	 */
	function delete( $ids=null )
	{
    $activeUser =& qcl_access_Manager::getActiveUser();

    /*
     * get key name
     */
    $namedId = $this->getNamedId();

    /*
     * delete if permissions allow it
     */
    if ( $activeUser->hasPermission("qcl.config.permissions.manage")
          or $this->getUser() == $activeUser->getNamedId() )
    {
      parent::delete();
      $this->info("Deleted config record '$namedId' (#$id)" );
    }

    /*
     * or raise error
     */
		else
		{
		  $this->userNotice("Current user doesn't have permission to delete '$namedId'");
		}
	}

	/**
	 * Delete all records that belong to a userId
	 * @param int $userId
	 * @return void
	 */
	function deleteByUserId( $userId )
	{
	  $this->deleteWhere(array(
	   'userId' => $userId
	  ));
	}

	/**
	 * Returns config property value. Raises an error if key does not exist.
	 * @param string $namedId The name of the property (i.e., myapplication.config.locale)
	 * @param int|null[optional] $userId Optional user id. If not given, get the config
	 * key for the current user.
 	 * @return value of property.
	 */
	function get( $namedId, $userId=false )
	{

	  /*
     * use active user if no user Id
     */
	  if ( $userId === false )
	  {
      $userModel =& $this->getActiveUser();
      $userId = $userModel->getId();

	  }

    /*
     * user id given, this is usually only the
     * case if a manager edits the configuration
     */
	  else
	  {
	    $userModel =& $this->getUserModel( $userId );
	  }

	  /*
	   * @todo cache results
	   */

    /*
     * find config key for given user id
     */
	  $this->findWhere( array(
      'namedId' => $namedId,
      'userId'  => $userId
    ));

    /*
     * raise error if no entry exists for the user
     */
    if ( $this->foundNothing() )
    {
      if ( is_null( $userId ) )
      {
        $this->raiseError("No global value exists for '$namedId'.");
      }
      elseif ( $userId === 0)
      {
        $this->raiseError("No default value exists for '$namedId'.");
      }
      else
      {
        /*
         * no entry for user id, try default or global value
         */
        $this->findWhere("
          `namedId` = '$namedId' AND ( `userId` IS NULL OR `userId` = 0 )
        ");

        /*
         * raise error if no config value exists for the key
         */
        if ( $this->foundNothing() )
        {
          $username = $userModel->username();
          $this->raiseError("'$namedId' does not exist for user '$username' (get)");
        }
      }
    }

    /*
     * return value
     */
    return $this->getValue();
	}

  /**
   * Returns the type of the current config record
   * @return string
   */
  function getType()
  {
    return $this->getProperty("type");
  }

  /**
   * Returns the value of the current record in the correct variable type
   * @return mixed $value
   */
  function getValue()
  {
    $value = $this->getProperty("value");
    $type  = $this->getType();

    /*
     * return value as correct type
     */
    switch ( $type )
    {
      case "number"  :
        return floatval($value);
      case "boolean" :
        return (bool) $value;
      case "list" :
        return explode(",", $value);
      default:
        return strval($value);
    }
  }

	/**
	 * Checks if the config entry exists (optional: for a specific user)
	 * @param string $name
	 * @param int $userId
	 */
	function has( $nameId, $userId=null )
  {
    if ( $userId )
    {
      return ( $this->exists( array(
        'namedId' => $nameId,
        'userId'  => $userId
      ) ) );
    }
    else
    {
      return ( $this->exists( array(
        'namedId' => $nameId
      ) ) );
    }
  }

  /**
   * Sets config property
   * @param string $namedId The name of the property (i.e., myapplication.config.locale)
   * @param string $value The value of the property.
   * @param int|boolean $userId[optional] If 0, set the default value
   * @return true if success or false if there was an error
   */
  function set( $namedId, $value, $userId=false)
  {
    /*
     * check if key exists
     */
    if ( ! $this->has( $namedId ) )
    {
      $this->raiseError("Config key '$namedId' does not exist.");
    }

    /*
     * user model
     */
    if ( $userId )
    {
      $userModel =& $this->getUserModel( $id );
    }
    elseif ( $userId === false )
    {
      $userModel =& $this->getActiveUser();
      $userId = $userModel->getId();
    }
    else
    {
      $userModel =& $this->getActiveUser();
    }
    $username = $userModel->username();

    /*
     * find config key
     */
    $this->findWhere(array(
      'namedId' => $namedId,
      'userId'  => $userId
    ));

    $foundUserVariant = $this->foundSomething();
    $trySetGlobal = is_null( $userId );
    $trySetDefault = ($userId === 0);

    /*
     * raise error if no entry exists for the user
     */
    if ( ! $foundUserVariant  )
    {
      if ( $trySetGlobal )
      {
        $this->raiseError("No global value exists for '$namedId'.");
      }
      elseif ( $trySetDefault )
      {
        $this->raiseError("No default value exists for '$namedId'.");
      }
      else
      {
        /*
         * no entry for user id, try default or global value
         */
        $this->findWhere("
          `namedId` = '$namedId' AND ( `userId` IS NULL OR `userId` = 0 )
        ");

        /*
         * create new entry config value exists for the key
         */
        if ( $this->foundNothing() )
        {
          $username = $userModel->username();
          $this->raiseError("'$namedId' has no default or global value! (set)");
        }
      }
    }

    /*
     * check if we're allowed to set that key
     */
    $configUserId = $this->getRawProperty("userId");
    $isGlobalKey  = is_null( $configUserId );

    /*
     * trying to set global value
     */
    if ( $trySetGlobal )
    {
      if ( ! $isGlobalKey )
      {
        $this->raiseError("You cannot set a global value for the non-global key '$namedId'.");
      }
    }

    /*
     * trying to set default value
     */
    elseif ( $trySetDefault )
    {
      if ( $isGlobalKey )
      {
        $this->raiseError("You cannot set a default value for the global key '$namedId'.");
      }
    }

    /*
     * create new user variant for non-global values if no matching
     * user variant has been found
     */
    elseif ( ! $foundUserVariant and ! $isGlobalKey  )
    {
      $id = $this->insert(array(
        'namedId' => $namedId,
        'type'    => $this->getType(),
        'permissionWrite' => $this->getProperty("permissionWrite"),
        'userId'  => $userId
      ) );
      $this->load( $id );
    }


    /*
     * if the value is protected by a write permission,
     * check permission and abort if not granted, unless
     * the config entry belongs to the user itself
     */
    $permissionWrite = $this->getProperty("permissionWrite");
    if( $permissionWrite )
    {
      if( ! $userModel->hasPermisson($permissionWrite) )
      {
        $this->userNotice("User '$username' has no permission to change config key '$namedId'");
      }
    }

    /*
     * type checking
     */
    if ( is_bool ( $value) )
    {
      $type = "boolean";
    }
    elseif ( is_numeric( $value ) )
    {
      $type = "number";
    }
    elseif ( is_array( $value ) )
    {
      $type = "list";
      $value = implode(",",$value );
    }
    else
    {
      $type = "string";
    }
    $keyType = $this->getType();

    if ( $type != $keyType )
    {
      $this->raiseError("Wrong type. Config key requires '$keyType', got '$type'.");
    }

    /*
     * now we're finally ready to set that key.
     */
    $this->setProperty("value", $value );
    $this->save();

    $this->log("'$name' set to '$value' for user '$owner'.", "config");

    return true;
  }

  /**
   * Sets a default value for a config key
   * @param $namedId
   * @param $value
   * @return void
   */
  function setDefault( $namedId, $value )
  {
    $this->set( $namedId, $value, 0 );
  }

  /**
   * Gets the default value for a config key
   * @param $namedId
   * @return mixed
   */
  function getDefault( $namedId )
  {
    return $this->get( $namedId, 0 );
  }

  /**
   * Resets the user variant of a config value to the default value.
   * @param $namedId
   * @return void
   */
  function reset( $namedId )
  {
    $this->set( $namedId, $this->getDefault( $namedId ) );
  }

	/**
	 * Returns all config property value that are readable by the active user
	 * @param string $mask return only a subset of entries that start with $mask
	 * @return array Array
	 */
	function getAccessibleKeys( $mask=null )
	{
    $activeUser =& qcl_access_Manager::getActiveUser();

    /*
     * no accessible keys if no active user
     */
    if ( ! $activeUser ) return array();
    $username = $activeUser->username();
    $userId = $activeUser->getId();

		/*
		 * where condition
		 */
    $where = "";

    if ( $mask )
		{
			/*
			 * get all rows containing mask
			 */
      $where .= "`namedId` LIKE '$mask%' AND " ;
		}

		$where .= "
		  ( `userId`=$userId OR `userId` IS NULL
		  OR (`userId`=0 AND NOT EXISTS (
		    SELECT * FROM `config` WHERE `userId` = $userId
		  ) ) )
		";

		$this->findWhere( $where, "namedId", "namedId,type,value" );
    $result = array();
    if ($this->foundSomething() ) do
    {
      $result[$this->getNamedId()] = $this->getValue();
    }
		while( $this->nextRecord() );
		return $result;
	}
}
?>