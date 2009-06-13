<?php


/**
 * Interface for classes that implement configuration management
 *
 * the idea of the class is the following:
 * - configuration entries (properties) have a name(key), a type, and a value
 * - types accepted currently are string, number and boolean (others might follow
 *   if there is a need)
 * - for each configuration entry, you can also set a read and a write permission.
 *   if set, the active user requesting an action must have the corresponding
 *   permission.
 * - each configuration entry can also have a user variant, i.e. users can,
 *   if allowed, create their own versions of the entry. When they edit
 *   this entry, they will all other variants will be left untouched including
 *   the default value, to which the user variant can be reset.
 * - on the client, a qcl.config.Manager singleton object takes care of retrieval
 *   and update of the config entries. on login, all or a subset of the configuration
 *   entries that an individual user has access to will be sent to the client and
 *   cached there.
 */

class qcl_config_Iconfig
{


	/**
	 * creates a config property, overwriting any previous entry
	 * requires permission qcl.config.permissions.manage
	 *
	 * @param string $name The name of the property (i.e., myapplication.config.locale)
	 * @param string $type The type of the property (string|number|object|boolean)
	 * @param string $permissionRead The permission name that is needed to access
	 * and read this property (optional)
	 * @param string $permissionWrite The permission name that is needed to access
	 * and read this property (optional)
	 * @param boolean $allowUserVariants If true, allow users to create their
	 * own variant of the configuration setting
	 * @return id of created config entry
	 */
	function create($name, $type, $permissionRead=null, $permissionWrite=null, $allowUserVariants=false );

	/**
	 * checks if config property exists
	 * @param string $key
	 * @return boolean
	 */
	function exists($key);

	/**
	 * updates a config property
	 * requires permission "qcl.config.permissions.manage"
	 *
	 * @param mixed $id ID of property
	 * @param string $key Key to update
	 * @param mixed $value Value
	 * @return true if success
	 */
	function update( $id, $key, $value );

	/**
	 * deletes a config property completely or only its user variant
	 * requires permission qcl.config.permissions.manage
	 *
	 * @param mixed $ref Id or name of the property (i.e., myapplication.config.locale)
	 * @return true if success
	 */
	function delete( $ref );

	/**
	 * gets all config property value that are readable by the active user
	 * @param string $mask return only a subset of entries that start with $mask
	 * @return array Array
	 */
	function getAll( $mask );

	/**
	 * gets config property value.
	 * raise an error if the active user does not have read permission for this property.
	 * @param string $name of the property (i.e., myapplication.config.locale)
	 * @return mixed value of property or null if value does not exist.
	 */
	function get( $name );

	/**
	 * sets config property
	 * @param string $name The name of the property (i.e., myapplication.config.locale)
	 * @param string $value The value of the property.
	 * @param boolean $defaultValue If true, set the key's default value for keys that allow
	 *  	user variants. This is necessary so that the admin can change the defaults instead
	 * 		of editing her/his own variant.
	 * @return true if success or false if there was an error
	 */
	function set($name,$value,$defaultValue=false);

	/**
	 * resets a property user variant to its original value
	 * raise an error if the active user does not have write permission for this property
	 * @param string $name The name of the property (i.e., myapplication.config.locale)
	 * @return true if success or false if there was an error
	 */
	function reset($name);

	/**
	 * gets required permission name for read access to config property
	 * @param string $name name of configuration key
	 */
	function getPermissionRead($name);

	/**
	 * gets required permission name for write access to config property
	 * @param string $name name of configuration key
	 */
	function getPermissionWrite($name);

	/**
	 * checks if current user has the right to access the configuration
	 * property with read priviledges
	 * @param string $name name of configuration key
	 */
	 function hasReadAccess($name);

	/**
	 * checks if current user has the right to access the configuration
	 * property with write priviledges
	 * @param string $name name of configuration key
	 */
	 function hasWriteAccess($name);
}
?>