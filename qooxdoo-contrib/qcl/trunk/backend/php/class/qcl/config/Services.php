<?php



/*
 * dependencies
 */

require_once "qcl/core/Mixin.php";

require_once "qcl/config/config.php";



/**

 * Mixin providing methods to edit configuration data

 */

class qcl_config_services extends qcl_core_Mixin

{

  

  //-------------------------------------------------------------

  // public rpc methods 

  //-------------------------------------------------------------   

   

  /**

   * default update client method: retrieves all accessible config keys

   * @param string $params[0] retrieve only subset starting with $params[0]

   */

  function method_updateClient($params)

  {

    /*
     * @todo security
     */

    /*
     * arguments
     */
    $mask = $params[0];
    
    /*
     * config model
     */

    $configModel =& $this->getConfigModel();
    
    /*
     * read config data into table
     */

    $accessibleKeys = $configModel->accessibleKeys();

    foreach ( $accessibleKeys as $row )

    {

      $key   = $row['namedId'];
      $type  = $row['type'];
      $value = $configModel->getValue($row);
      $configMap[$key] = array(

        'name'  => $key,

        'type'  => $type,

        'value' => $value

      );

    }
    
    /*
     * return client data
     */

    $this->set( "configMap", $configMap );

    return $this->response(); 

  }

  

  /**

   * default update server method: updates selected config keys

   * @param object $params[1] map of configuration key values to update 

   */

  function method_updateServer($params)

  {

    /*
     * @todo Security
     */
    
    /*
     * arguments
     */
    $map =  (array) $params[1];

    
    /*
     * config model
     */
    $configModel  =& $this->getConfigModel();

    
    /*
     * set each config key data and dispatch an update message
     * for each data change
     */

    foreach( $map as $key => $value )

    {

      $result = $configModel->set( $key, $value );

      if ( $result !== false )

      {

        $this->dispatchMessage( "qcl.config.messages.key.updated", $key );      

      }

    } 
    
    /*
     * return client data
     */

    return $this->response(); 

  }

    

  /**

   * creates a config property, overwriting any previous entry

   * requires permission "qcl.config.permissions.manage"

   * 

   * @param string $params[1]->name The name of the property (i.e., myapplication.config.locale)

   * @param string $params[1]->type The type of the property (string|number|object|boolean)

   * @param string $params[1]->permissionRead The permission name that is needed to access 

   *      and read this property (optional)

   * @param string $params[1]->permissionWrite The permission name that is needed to access 

   *      and read this property (optional)

   * @param boolean $params[1]->allowUserVariants If true, allow users to create their 

   *      own variant of the configuration setting 

   * @return true if success 

   */

  function method_create($params)

  {

    $configModel  =& $this->getConfigModel();

    

    $id = $configModel->create(

      $params[1]->name, 

      $params[1]->type, 

      $params[1]->permissionRead, 

      $params[1]->permissionWrite,

      $params[1]->allowUserVariants

    );

    $this->dispatchMessage( "qcl.config.messages.key.created", $id );

    return $this->response();

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

    $id           =  $params[1];

    $key          =  $params[2];

    $value        =  $params[3];

    $configModel  =& $this->getConfigModel();

    

    $configModel->updateById($id,$key,$value);

    $this->dispatchMessage( "qcl.config.messages.key.updated", $id );

    

    if ( $key == "value" )

    {

      $row = $configModel->findById($id);

      $data = array();

      $data[$row[$configModel->col_name]] = $row[$configModel->col_value]; 

      $this->dispatchMessage( "qcl.config.messages.server.changeConfigKey", $data );  

    }

    return $this->response();

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

    $configModel =& $this->getConfigModel();

    $configModel->delete($params[1]);

    return $this->response();

  } 

 

  /**

   * sets config property

   * @param string  $params[0] The name of the property (i.e., myapplication.config.locale)

   * @param string  $params[1] The value of the property. 

   * @param boolean $params[3] If true, set the key's default value for keys that allow

   *    user variants. This is necessary so that the admin can change the defaults instead

   *    of editing her/his own variant.

   * @return true if success 

   */

  function method_set( $params )

  {

    $configModel =& $this->getConfigModel();

    $configModel->set( $params[0], $params[1], $params[2] );

    $data = array();

    $data[$params[0]] = $params[1];

    $this->dispatchMessage( "qcl.config.messages.server.changeConfigKey", $data );

    return $this->response();

  }

  

  /**

   * gets all config property value that are readable by the active user

   * @param string $param[0] return only a subset of entries that start with $mask

   * @return array tabledatamodel

   * @todo encrypt data?

   */

  function method_getAll( $params )

  {

    $mask         =  $params[0];

    $userModel    =& $this->getUserModel();

    $configModel  =& $this->getConfigModel(); 

    $rows         =  $configModel->getAll( $mask );

    

    $table = array();

    

    foreach( $rows as $row )

    {

      $table[]  = array (

        $row['id'], 
        $row['namedId'], 
        $row['type'],  
        $row['value'],  
        $row['permissionRead'],  
        $row['permissionWrite'],  
        $row['user'] 

      );

    }

    $this->set( "tabledatamodel", $table );

    return $this->response();

  }
  
  /**
   * export to xml
   */
  function method_exportXML()
  {
    /*
     * models
     */
    $configModel =& $this->getConfigModel();
    
    require_once("qcl/xml/model.php");
    $path = "../var/tmp/config.xml"; 
    unlink($path);
    
    $xmlModel = new qcl_xml_model($this);
    $xmlModel->load($path);
    $doc =& $xmlModel->getDocument();
    
    $keysNode =& $doc->addChild("keys");
    foreach( $configModel->getAll() as $record )
    {
      $keyNode =& $keysNode->addChild("key");
      foreach( $record as $key => $value )
      {
        if( $key=="id" )
        {
          continue;
        }
        elseif ( $key == "namedId" )
        {
          $keyNode->addAttribute("name",$record['namedId']);
        }
        elseif ( $key != "value" && $value ) 
        {
          $keyNode->addAttribute($key,$value);
        }
      }
      $keyNode->setCDATA(htmlentities($record['value']));
    }
    $this->Info($doc->asXml());
  }
  
  function method_logFileSize()
  {
    $this->set("text", "Log file size: " . byteConvert( filesize( QCL_LOG_FILE) ) );
    return $this->response(); 
  }
  
  function method_deleteLogFile()
  {
    unlink( QCL_LOG_FILE );
    touch ( QCL_LOG_FILE );
    return $this->alert($this->tr("Log file deleted."));
  }
  

}



?>