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
require_once "qcl/access/Behavior.php";
require_once "qcl/data/model/xmlSchema/DbModel.php";
require_once "qcl/config/IConfigModel.php";

/**
 * Configuration management class, using a database backend
 *
 */
class qcl_config_DbModel
  extends qcl_data_model_xmlSchema_DbModel
  implements qcl_config_IConfigModel
{
  /**
   * Path to the xml file containing the model schema
   * @var strign
   */
  public $schemaXmlPath  = "qcl/config/Db.model.xml";

  /**
   * types that config values may have
   * @var array
   */
  private $types = array("string","number","boolean","list");

  /**
   * Results are cached for faster access
   * @var array
   */
  private $_cache = array();

  /**
   * Returns singleton instance.
   * @return qcl_config_DbModel
   */
  public static function getInstance()
  {
    return qcl_getInstance( __CLASS__  );
  }

  /**
   * Gets the user data model
   * @param int[optional] $id Load record if given
   * @return qcl_access_model_User
   */
  private function getUserModel( $id=null )
  {
    $userModel = $this->getApplication()->getAccessBehavior()->getUserModel();
    if ( $id ) $userModel->load( $id );
    return $userModel;
  }

  /**
   * Returns the active user object
   * @return qcl_access_model_User
   */
  private function getActiveUser()
  {
    return $this->getApplication()->getAccessBehavior()->getActiveUser();
  }

  ////// API FUNCTIONS

	/**
	 * Creates a config property, overwriting any previous entry
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
	public function createKey(
	   $namedId,
	   $type,
	   $permissionWrite=null,
	   $allowUserVariants=false
	) {

		/*
		 * check permission
		 */
    $activeUser  = $this->getApplication()->getAccessBehavior()->getActiveUser();

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
    if ( $this->hasKey( $namedId ) )
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
	 * @see qcl_config_DbModel::create()
	 * @param $namedId
	 * @param $type
	 * @param $permissionWrite
	 * @param $allowUserVariants
	 * @return int|bool  Returns the id of the newly created record, or false if
	 * key was not created.
	 */
	public function createKeyIfNotExists(
     $namedId,
     $type,
     $permissionWrite=null,
     $allowUserVariants=false
  ) {
    if ( ! $this->hasKey( $namedId ) )
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
   * Returns config property value. Raises an error if key does not exist.
   * @param string $namedId The name of the property (i.e., myapplication.config.locale)
   * @param int|null[optional] $userId Optional user id. If not given, get the config
   * key for the current user.
   * @return value of property.
   */
  public function getKey( $namedId, $userId=false )
  {

    /*
     * use active user if no user Id
     */
    if ( $userId === false )
    {
      $userModel = $this->getApplication()->getAccessBehavior()->getActiveUser();
      $userId    = $userModel? $userModel->getId() : null;
    }

    /*
     * user id given, this is usually only the
     * case if a manager edits the configuration
     */
    else
    {
      $userModel = $this->getUserModel( $userId );
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
        $this->raiseError("Config key '$namedId' does not exist.");
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
          $this->warn("'$namedId' does not exist for user '$username' (get)");
          return null;
        }
      }
    }

    /*
     * return value
     */
    return $this->getValue();
  }

  /**
   * Checks if the config entry exists (optional: for a specific user)
   * @param string $name
   * @param int $userId
   */
  public function hasKey( $nameId, $userId=null )
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
  public function setKey( $namedId, $value, $userId=false)
  {
    /*
     * check if key exists
     */
    if ( ! $this->hasKey( $namedId ) )
    {
      $this->raiseError("Config key '$namedId' does not exist.");
    }

    /*
     * user model
     */
    if ( (int) $userId > 0 )
    {
      $userModel = $this->getUserModel( $userId );
    }
    elseif ( $userId === false )
    {
      $userModel = $this->getActiveUser();
      if ( $userModel )
      {
        $userId = $userModel->getId();
      }
      else
      {
        $this->raiseError("No active user!");
      }
    }
    elseif ( $userId === null )
    {
      $userModel = $this->getActiveUser();
    }
    elseif ( $userId !== 0)
    {
      $this->raiseError("Invalid userId `$userId`");
    }

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
      $data = array(
        'namedId' => $namedId,
        'type'    => $this->getType(),
        'permissionWrite' => $this->getProperty("permissionWrite"),
        'userId'  => $userId
      );
      $id = $this->insert( $data );
      if ( ! $id )
      {
        $this->raiseError("Could not create user variant for key '$namedId', user #$userId.");
      }

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
      if( ! $userModel->hasPermission( $permissionWrite ) )
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
	 * Deletes a config key dependent on permissions
	 * @todo call statically with id parameters
	 * @return void
	 */
	public function deleteKey( $ids=null )
	{
    $activeUser = $this->getActiveUser();

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
	public function deleteByUserId( $userId )
	{
	  $this->deleteWhere(array(
	   'userId' => $userId
	  ));
	}

  /**
   * Returns the type of the current config record
   * @return string
   */
  public function getType()
  {
    return $this->getProperty("type");
  }

  /**
   * Returns the value of the current record in the correct variable type
   * @return mixed $value
   */
  public function getValue()
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
   * Sets a default value for a config key
   * @param $namedId
   * @param $value
   * @return void
   */
  public function setDefault( $namedId, $value )
  {
    $this->setKey( $namedId, $value, 0 );
  }

  /**
   * Gets the default value for a config key
   * @param $namedId
   * @return mixed
   */
  public function getDefault( $namedId )
  {
    return $this->getKey( $namedId, 0 );
  }

  /**
   * Resets the user variant of a config value to the default value.
   * @param $namedId
   * @return void
   */
  public function reset( $namedId )
  {
    $this->setKey( $namedId, $this->getDefault( $namedId ) );
  }

	/**
	 * Returns all config property value that are readable by the active user
	 * @param string $mask return only a subset of entries that start with $mask
	 * @return array Array
	 */
	public function getAccessibleKeys( $mask=null )
	{
    $activeUser = $this->getActiveUser();

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

		$table = $this->table();
		$where .= "
		   `userId`=$userId OR `userId` IS NULL
  		  OR ( `userId`=0 AND NOT EXISTS (
      		    SELECT * FROM `$table` t2
      		    WHERE t2.`userId` = $userId
      		    AND   t2.`namedId` = t1.`namedId` )
      		)
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