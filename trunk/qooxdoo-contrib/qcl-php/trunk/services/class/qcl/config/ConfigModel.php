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
qcl_import( "qcl_data_model_db_NamedActiveRecord" );
//qcl_import( "qcl_config_IConfigModel" );

/**
 * Configuration management class, using a database backend
 *
 */
class qcl_config_ConfigModel
  extends qcl_data_model_db_NamedActiveRecord
//  implements qcl_config_IConfigModel
{

  /**
   * The table storing model data
   */
  protected $tableName = "data_Config";

  /**
   * Properties
   */
  private $properties = array(
    'type'  => array(
      'check'     => "integer",
      'sqltype'   => "smallint"
    ),
    'default'  => array(
      'check'     => "string",
      'sqltype'   => "varchar(255)",
      'nullable'  => true
    ),
    'customize' => array(
      'check'     => "boolean",
      'sqltype'   => "int(11)",
      'nullable'  => false,
      'init'      => false
    )

  );

  /**
   * The foreign key of this model
   */
  protected $foreignKey = "ConfigId";

  /**
   * Relations
   */
  private $relations = array(
//    'Permission_Config' => array(
//      'type'        => QCL_RELATIONS_HAS_ONE,
//      'target'      => array( 'class' => "qcl_access_model_Permission" )
//    ),
    'Config_UserConfig' => array(
      'type'        => QCL_RELATIONS_HAS_MANY,
      'target'      => array(
        'class'       => "qcl_config_UserConfigModel",
        'dependent'   => true
      )
    ),
  );

  /**
   * types that config values may have
   * @var array
   */
  protected $types = array("string","number","boolean","list");

  /**
   * Results are cached for faster access
   * @var array
   */
  private $cache = array();

  /**
   * Constructor
   */
  function __construct()
  {
    $this->addRelations( $this->relations, __CLASS__ );
    $this->addProperties( $this->properties );
    parent::__construct();
  }

  /**
   * Returns singleton instance.
   * @return qcl_config_ConfigModel
   */
  public static function getInstance()
  {
    return qcl_getInstance( __CLASS__  );
  }

  //-------------------------------------------------------------
  // model getters
  //-------------------------------------------------------------

  /**
   * Gets the user data model
   * @param int[optional] $id Load record if given
   * @return qcl_access_model_User
   */
  protected function getUserModel( $id=null )
  {
    static $userModel = null;
    if ( $userModel === null )
    {
      $userModel = qcl_access_model_User::getInstance();
    }
    if ( $id ) $userModel->load( $id );
    return $userModel;
  }

  /**
   * Returns the active user object
   * @return qcl_access_model_User
   */
  protected function getActiveUser()
  {
    return $this->getApplication()->getAccessController()->getActiveUser();
  }

  /**
   * Returns the user config model
   * @return qcl_config_UserConfigModel
   */
  protected function getUserConfigModel()
  {
    return $this->getRelationBehavior()->getTargetModel("Config_UserConfig");
  }

  /**
   * Given a user id, return the user model. If the id is boolean
   * false, return the active user model object
   * @param $userId
   * @return qcl_access_model_User
   */
  protected function getUserFromId( $userId )
  {
    if ( $userId === false )
    {
      return $this->getActiveUser();
    }
    elseif ( is_numeric( $userId ) and $userId > 0 )
    {
      return $this->getUserModel( $userId );
    }
    else
    {
      $this->raiseError( "Invalid user id '$userId'");
    }
  }

  //-------------------------------------------------------------
  // helper methods
  //-------------------------------------------------------------

  /**
   * Casts the given config value to given value type
   * @param mixed $value
   * @param string $type
   * @param bool $phpType If false, convert the value for saving in the database,
   *   if true (default), convert them into the corresponding php type
   * @return mixed $value
   */
  protected function castType( $value, $type, $phpType = true )
  {
    switch ( $type )
    {
      case "number"  :
        if ( $phpType ) return floatval($value);
        return (string) $value;
      case "boolean" :
        if ( $phpType ) return $value == "true" ? true : false;
        return boolString($value);
      case "list" :
        if ( $phpType ) return explode(",", $value);
        return implode( ",", $value );
      case "string":
        if ( $phpType ) return strval($value);
        return (string) $value;
      default:
        $this->raiseError("Invalid type '$type'");
    }
  }

  /**
   * Checks if the type of the configuration value is correct
   * @param mixed $value
   * @param string $type
   * @return bool True if correct
   */
  protected function isType( $value, $type )
  {
    switch ( $type )
    {
      case "number"  :
        return is_numeric($value);
      case "boolean" :
        return is_bool( $value );
      case "list" :
        return is_array( $value );
      case "string":
        return is_string( $value );
      default:
        $this->raiseError("Invalid type '$type'");
    }
  }

  /**
   * Checks if value is of the correct type and throws an exception if not
   * @param mixed $value
   * @param string $type
   * @return void
   * @throws qcl_config_Exception
   */
  protected function checkType( $value, $type )
  {
    if ( ! $this->isType( $value, $type ) )
    {
      throw new qcl_config_Exception( sprintf(
        "Incorrect type. Expected '%s', got '%s'", $type, typeof( $value )
      ) );
    }
  }

  /**
   * Returns the index code of the config key type
   * @param $type
   * @return unknown_type
   */
  protected function getTypeIndex( $type )
  {
    return array_search( $type, $this->types );
  }

  protected function getTypeString( $index )
  {
    return $this->types[$index];
  }

  /**
   * Checks if a configuration key exists and throws an exception if not.
   * FIXME This is inefficient. Methods should try to load the record and
   * abort if not found.
   * @param $key
   * @return void
   */
  protected function checkKey( $key )
  {
    if ( ! $this->keyExists( $key ) )
    {
      throw new qcl_config_Exception( sprintf(
        "Configuration key '%s' does not exist.", $key
      ) );
    }
  }

  /**
   * Checks if the config key exists
   * @param string $key
   * @return bool True if it does.
   */
  public function keyExists( $key, $userId=null )
  {
    return ($this->namedIdExists( $key ) > 0);
  }

  /**
   * Returns a valid qcl_access_model_User object.
   * @param qcl_access_model_User|int|false $user User id or user object or false.
   *   If false, return active user object
   * @return qcl_access_model_User
   */
  protected function checkUserModel( $user )
  {
    /*
     * use active user if no user Id
     */
    if ( $user === false )
    {
      $userModel = $this->getActiveUser();
    }

    /*
     * user model
     */
    elseif ( $user instanceof qcl_access_model_User )
    {
      $userModel = $user;
    }

    /*
     * user id
     */
    elseif ( is_int( $user ) and $user > 0 )
    {
      $userModel = $this->getUserModel( $user );
    }

    /*
     * invalid
     */
    else
    {
      $this->raiseError("Invalid argument");
    }
    return $userModel;
  }


  //-------------------------------------------------------------
  // qcl_config_IConfigModel interface
  //-------------------------------------------------------------

	/**
	 * Creates a config property, overwriting any previous entry
	 * requires permission "qcl.config.permissions.manage"
	 *
	 * @param string $key The name of the property (i.e., myapplication.config.locale)
	 * @param string $type The type of the property (string|number|object|boolean)
	 * @param boolean $customize If true, allow users to create their
	 * 		  own variant of the configuration setting
	 * @param mixed|null $default If not null, set a default value
	 * @return id of created config entry
	 */
	public function createKey( $key, $type, $customize=false, $default=null )
	{

		/*
		 * Check type
		 */
		if ( ! in_array( $type, $this->types ) )
		{
			throw new qcl_config_Exception("Invalid type '$type' for key '$key'");
		}

    /*
     * check if key exists
     */
    if ( $this->keyExists( $key ) )
    {
      throw new qcl_config_Exception("Config key '$key' already exists.");
    }

    /*
     * create new entry
     */
		return $this->create( $key, array(
		  'type'      => $this->getTypeIndex( $type ),
		  'default'   => $this->castType( $default, $type, false ),
		  'customize' => $customize
		));
	}

	/**
	 * Create a config key if it doesn't exist already
	 * @param $key
	 * @param $type
   * @param boolean $customize If true, allow users to create their
   *      own variant of the configuration setting
   * @param mixed|null $default If not null, set a default value
	 * @return int|bool  Returns the id of the newly created record, or false if
	 * key was not created.
	 */
	public function createKeyIfNotExists( $key, $type, $customize=false, $default=null )
	{
    if ( ! $this->keyExists( $key ) )
    {
      return $this->createKey( $key, $type, $customize, $default );
    }
    else
    {
      return false;
    }
  }

  /**
   * Returns an array of all config keys
   * @return array
   */
  public function keys()
  {
    return $this->getQueryBehavior()->fetchValues( "namedId" );
  }

  /**
   * Sets a default value for a config key
   * @param string $key
   * @param mixed $value
   * @return void
   */
  public function setKeyDefault( $key, $value )
  {
    $this->checkKey( $key );
    $this->load( $key );
    $this->setDefault( $this->castType( $value, $this->getType(), false ) );
  }

  /**
   * Gets the default value for a config key
   * @param $key
   * @return mixed
   */
  public function getKeyDefault( $key )
  {
    $this->checkKey( $key );
    $this->load( $key );
    return $this->castType( $this->getDefault(), $this->getType(), true );
  }

  /**
   * Returns config property value. Raises an error if key does not exist.
   * @param string $key The name of the property (i.e., myapplication.config.locale)
   * @param qcl_access_model_User|int|false $user Optional user (id). If not given,
   *   get the config key for the current user. If no custom value exists for the given
   *   user, return the default value.
   * @return value of property.
   */
  public function getKey( $key, $user=false )
  {
    $this->checkKey( $key );
    $userModel = $this->checkUserModel( $user );
    $userId    = $userModel? $userModel->getId() : null;

    /*
     * are the results cached?
     */
    if ( isset( $this->cache[$key][$userId] ) )
    {
      return $this->cache[$key][$userId];
    }

    /*
     * load record
     */
    $this->load( $key );

    /*
     * look for user variant
     */
    $userConfigModel = $this->getUserConfigModel();
    $userConfigModel->findWhere( array(
      $userModel->foreignKey()   => $userId,
      $this->foreignKey()        => $this->id()
    ) );
    if ( $userConfigModel->foundSomething() )
    {
      $userConfigModel->loadNext();
      $value = $userConfigModel->getValue();
    }
    else
    {
      $value = $this->getDefault();
    }
    $value = $this->castType( $value, $this->getType(), true );

    /*
     * retrieve, cache and return value
     */
    if ( ! isset( $this->cache[$key] ) )
    {
      $this->cache[$key] = array();
    }
    $this->cache[$key][$userId] = $value;
    return $value;
  }

  /**
   * Sets config property
   * @param string $key The name of the config key  (i.e., myapplication.config.locale)
   * @param string $value The value of the property.
   * @param qcl_access_model_User|int|false $user Optional user (id). If given, create
   *   or set a custom user value for that key.
   * @return qcl_config_ConfigModel
   * @todo permissions
   */
  public function setKey( $key, $value, $user=false)
  {

    $this->checkKey( $key );
    $userModel = $this->checkUserModel( $user );
    $userId = $userModel? $userModel->id() : null;

    /*
     * load record and look for custom user value and check
     * whether this model allows customized values
     */
    $this->load( $key );
    if( ! $this->getCustomize() )
    {
      throw new qcl_config_Exception( sprintf(
        "Config key '%s' does not allow user values.", $key
      ) );
    }

    /*
     * look for custom user value
     */
    $userConfigModel = $this->getUserConfigModel();
    $userConfigModel->findWhere( array(
      $userModel->foreignKey()   => $userId,
      $this->foreignKey()        => $this->id()
    ) );

    /*
     * convert value into format that can be stored into
     * the database
     */
    $storeValue = $this->castType( $value, $this->getType(), false );

    /*
     * if the custom user value exists, update it,
     * otherwise create it
     */
    if ( $userConfigModel->foundSomething() )
    {
      $userConfigModel->loadNext();
      $userConfigModel->setValue( $storeValue );
      $userConfigModel->save();
    }
    else
    {
      $userConfigModel->create( array(
        $userModel->foreignKey()  => $userId,
        $this->foreignKey()       => $this->id(),
        "value"                   => $storeValue
      ));
    }

    /*
     * update cache
     */
    if ( ! isset( $this->cache[$key] ) )
    {
      $this->cache[$key] = array();
    }
    $this->cache[$key][$userId] = $value;
    return $this;
  }

	/**
	 * Deletes the user data of a config key. In order to delete
	 * the key itself, use delete()
	 *
	 * @param string $key
	 * @param int $userId Optional id of the user to whom the custom value
	 *   belongs or false if current user
	 * @return void
	 */
	public function deleteKey( $key, $userId= false )
	{
	  $this->checkKey( $key );
	  $userModel = $this->getUserFromId( $userId );

	  $this->load( $key );

	  $userConfigModel = $this->getUserConfigModel();
    $userConfigModel->deleteWhere( array(
      $this->foreignKey()      => $this->id(),
      $userModel->foreignKey() => $userModel->id()
    ) );
	}

  /**
   * Resets the user variant of a config value to the default value.
   * @param string $key
   * @param int $userId Optional id of the user to whom the custom value
   *   belongs or false if current user
   * @return void
   */
  public function resetKey( $key, $userId = false )
  {
    $this->checkKey( $key );
    $this->setKey( $key, $this->getDefault( $key ), $userId );
  }

  /**
   * Returns the type of a key
   * @param string $key
   * @return string
   */
  public function keyType( $key )
  {
    $this->checkKey( $key );
    $this->load( $key );
    return $this->getType();
  }


  /**
   * Returns the type of the currently loaded config key
   * @return string
   */
  public function getType()
  {
    return $this->getTypeString( $this->get("type") );
  }

	/**
	 * Returns the data of config keys that are readable by the active user.
	 *
	 * @param string $mask return only a subset of entries that start with $mask
   * @param int $userId Optional id of the user to whom the custom value
   *   belongs or false if current user
	 * @return array Map with the keys 'keys', 'types' and 'values', each
	 * having an index array with all the values.
	 */
	public function getAccessibleKeys( $mask=null, $userId = false  )
	{
    /*
     * no accessible keys if no active user
     */
    $userModel = $this->getUserFromId( $userId );
    if ( ! $userModel ) return array();

    /*
     * iterate through all keys and return either the
     * user custom value or the default value
     */
    $keys   = array();
    $typs   = array();
    $values = array();

    foreach ( $this->keys() as $key )
    {
      $keys[]   = $key;
      $values[] = $this->getKey( $key, $userId );
      $types[]  = $this->getType();
    }

		return array(
		  'keys'    => $keys,
		  'values'  => $values,
		  'types'   => $types
		);
	}
}
?>