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
	
  /**
   * the path to the model schema xml file
   * @see qcl_db_model_xml_XmlSchemaModel::getSchmemaXmlPath()
   * @var string
   */
  var $schemaXmlPath = "qcl/config/db.model.xml";  
  
  
	//-------------------------------------------------------------
  // public methods 
	//-------------------------------------------------------------    
	
	/**
	 * overridden, because not allowed in this model
	 */
	function create()
	{
    $this->raiseError("Creating config key not supported in this config model"); 
	} 
  
	/**
	 * overridden, because not allowed in this model
	 */
	function delete( )
	{
	  $this->raiseError("Deleting config key not supported in this config model"); 
	} 

	/**
	 * checks if config property exists
	 * @param string $key
	 * @return boolean
	 */
	function exists($key) 
	{
		$value = $this->get( $key);
		return ! empty( $value );
	}	
	
	/**
	 * gets config property value
	 * @param string $name The name of the property (i.e., myapplication.config.locale) 
	 * @return value of property or null if value does not exist.
	 */
	function get( $name )
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
	 */
	function has( $name )  
  {
    if ( $this->hasSessionVar($name) ) return true;
    return parent::has($name);
  }
 
	/**
	 * sets config property
	 * @param string $name The name of the property (i.e., myapplication.config.locale)
	 * @param string $value The value of the property. 
	 * @return true if success or false if there was an error
	 */
	function set( $name, $value )
	{
    //$this->info("Setting temporary config value $name to $value");
    $this->setSessionVar( $name, $value );
	}

}

