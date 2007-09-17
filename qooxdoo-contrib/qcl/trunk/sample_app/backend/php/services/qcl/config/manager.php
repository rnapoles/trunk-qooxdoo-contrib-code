<?php

// dependencies
require_once SERVICE_PATH . "qcl/jsonrpc/object.php";
require_once SERVICE_PATH . "qcl/locale/manager.php";
require_once SERVICE_PATH . "qcl/config/config.php";

/**
 * Service class providing data to the config manager on the client
 */

class qcl_config_manager extends qcl_jsonrpc_object
{

	//-------------------------------------------------------------
   	// internal methods
	//------------------------------------------------------------- 
   
   	/**
   	 * constructor 
     */
   	function __construct()
   	{
		parent::__construct();
		$this->config 	= qcl_config::getSubclass($this->ini);
	}
	
	//-------------------------------------------------------------
   	// public rpc methods 
   	//-------------------------------------------------------------   
   
   	/**
   	 * default update client method: retrieves all accessible config keys
   	 * @param string $params[0] retrieve only subset starting with $params[0]
   	 */
   	function method_updateClient($params)
   	{
   		$mask 	= $params[0];
   		$rows 	= $this->config->getAll( $mask );
   		$result	= array();
   		foreach ( $rows as $row )
   		{
   			unset($row[$this->config->key_id]);
   			$result[$row[$this->config->key_name]] = $row;
   		}
   		$this->set( "configMap", $result );
   		return $this->getResult(); 
   	}
   	
   	/**
   	 * default update server method: updates selected config keys
   	 * @param object $params[1] map of configuration key values to update 
   	 */
   	function method_updateServer($params)
   	{
		$map = $params[1];
		foreach( get_object_vars( $map ) as $key => $value )
		{
			$this->config->set( $key, $value );
		}   		
   		return $this->getResult(); 
   	}

   	
	/**
	 * creates a config property, overwriting any previous entry
	 * requires permission "qcl.config.permissions.manage"
	 * 
	 * @param string $params[1]->name The name of the property (i.e., myapplication.config.locale)
	 * @param string $params[1]->type The type of the property (string|number|object|boolean)
	 * @param string $params[1]->permissionRead The permission name that is needed to access 
	 * 		  and read this property (optional)
	 * @param string $params[1]->permissionWrite The permission name that is needed to access 
	 * 		  and read this property (optional)
	 * @param boolean $params[1]->allowUserVariants If true, allow users to create their 
	 * 		  own variant of the configuration setting 
	 * @return true if success 
	 */
	function method_create($params)
	{
		$id = $this->config->create(
			$params[1]->name, 
			$params[1]->type, 
			$params[1]->permissionRead, 
			$params[1]->permissionWrite,
			$params[1]->allowUserVariants
		);
		$this->addMessage( "qcl.config.messages.key.created", $id );
		return $this->getResult();
	} 
	
	/**
	 * updates a config property
	 * requires permission "qcl.config.permissions.manage"
	 * 
	 * @param mixed  $params[1] ID of property
	 * @param string $params[2] Key to update
	 * @param mixed  $params[3] Value
	 * @return true if success 
	 */
	function method_update( $params )
	{
		$id 	= $params[1];
		$key	= $params[2];
		$value	= $params[3];
		
		$this->config->update($id,$key,$value);
		$this->addMessage( "qcl.config.messages.key.updated", $id );
		
		if ( $key == "value" )
		{
			$row = $this->config->getRowById($id);
			$data = array();
			$data[$row[$this->config->key_name]] = $row[$this->config->key_value]; 
			$this->addMessage( "qcl.config.messages.server.changeConfigKey", $data );	
		}
		return $this->getResult();
	}
	
	
	/**
	 * deletes a config property completely or only its user variant 
	 * requires permission qcl.config.permissions.manage
	 * 
	 * @param mixed $params[1] Id or name of the property (i.e., myapplication.config.locale)
	 * @return true if success 
	 */
	function method_delete( $params )
	{ 
		$this->config->delete($params[1]);
		return $this->getResult();
	} 
 
	/**
	 * sets config property
	 * @param string  $params[0] The name of the property (i.e., myapplication.config.locale)
	 * @param string  $params[1] The value of the property. 
	 * @param boolean $params[3] If true, set the key's default value for keys that allow
	 *  	user variants. This is necessary so that the admin can change the defaults instead
	 * 		of editing her/his own variant.
	 * @return true if success 
	 */
	function method_set( $params )
	{
		$this->config->set( $params[0], $params[1], $params[2] );
		$data = array();
		$data[$params[0]] = $params[1];
		$this->addMessage( "qcl.config.messages.server.changeConfigKey", $data );
		return $this->getResult();
	}
	
	/**
	 * gets all config property value that are readable by the active user
	 * @param string $param[0] return only a subset of entries that start with $mask
	 * @return array tabledatamodel
	 */
	function method_getAll( $params )
	{
		$rows = $this->config->getAll( $params[0] );
		$table = array();
		
		foreach( $rows as $row )
		{
			$userId  	= $row[$this->config->key_userId];
			$user		= $userId ? $this->user->getById($userId) : null;
			$userName  	= $user ? $user[$this->user->key_namedId] : $userId ;
			$row[$this->config->key_userId] = $userName;
			$table[] = array_values($row);
		}
		$this->set( "tabledatamodel", $table );
		return $this->getResult();
	}
}

?>