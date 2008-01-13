<?php

require_once ("qcl/config/db.php");

/**
 * configuration management class, using a database backend for retrieving
 * but a simple session storage for overriding config values during a session,
 * for example for anonmyous guest users
 * 
 */

class qcl_config_session extends qcl_config_db
{    

	//-------------------------------------------------------------
  // class variables
	//------------------------------------------------------------- 
	

	//-------------------------------------------------------------
  // internal methods
	//------------------------------------------------------------- 
   
 	/**
 	 * constructor
 	 * @param object reference $controller
   */
 	function __construct($controller)
 	{
    parent::__construct(&$controller);
	}
	
	//-------------------------------------------------------------
  // public methods 
	//-------------------------------------------------------------    
 
	/**
	 * creates a config property, overwriting any previous entry
	 * requires permission "qcl.config.permissions.manage"
	 * 
	 * @param string $name The name of the property (i.e., myapplication.config.locale)
	 * @param string $type The type of the property (string|number|object|boolean)
	 * @param string $permissionRead The permission name that is needed to access 
	 * 		  and read this property (optional)
	 * @param string $permissionWrite The permission name that is needed to access 
	 * 		  and read this property (optional)
	 * @param boolean $allowUserVariants If true, allow users to create their 
	 * 		  own variant of the configuration setting 
	 * @return id of created config entry
	 */
	function create($name, $type, $permissionRead=null, $permissionWrite=null, $allowUserVariants=false )
	{
    $this->raiseError("Creating config key not supported in this config model"); 
	} 
  
	/**
	 * deletes a config property completely or only its user variant 
	 * requires permission qcl.config.permissions.manage
	 * 
	 * @param mixed $ref Id or name of the property (i.e., myapplication.config.locale)
	 * @return true if success 
	 */
	function delete( $ref )
	{
	  $this->raiseError("Deleting config key not supported in this config model"); 
	} 
	 
	/**
	 * gets config property value
	 * @param string $name The name of the property (i.e., myapplication.config.locale) 
	 * @return value of property or null if value does not exist.
	 */
	function get($name)
	{
		if ( $this->hasSessionVar($name) ) 
    {
      return $this->getSessionVar($name);
    }
    return parent::get($name);
	} 
  
	/**
	 * checks if the config entry exists (optional: for a specific user)
	 * @param string $name
	 * @param mixed $userRef
	 */
	function has($name,$user=null)  
  {
    if ( $this->hasSessionVar($name) ) return true;
    return parent::has($name,$user);
  }
  
 
	/**
	 * sets config property
	 * @param string $name The name of the property (i.e., myapplication.config.locale)
	 * @param string $value The value of the property. 
	 * @param boolean $defaultValue If true, set the key's default value for keys that allow
	 *  	user variants. This is necessary so that the admin can change the defaults instead
	 * 		of editing her/his own variant.
	 * @return true if success or false if there was an error
	 */
	function set( $name, $value, $defaultValue=false)
	{
    $this->info("Setting temporary config value $name to $value");
    $this->setSessionVar( $name, $value );
	}

}

