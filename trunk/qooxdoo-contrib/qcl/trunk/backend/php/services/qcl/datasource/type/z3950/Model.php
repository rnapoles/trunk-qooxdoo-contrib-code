<?php
/*
 * dependencies
 */
require_once "qcl/datasource/type/db/Model.php";

trigger_error("Not functional!");

/*
 * constants
 */
define ('Z3950_XML_SERVERDATA_DIR', dirname(__FILE__) . "/servers/");

/**
 * Model for z3950 datasources
 * 
 * Dependencies: 
 * - php_yaz extension  
 * - php_domxml exenstion
 * - PEAR XML_XPath
 */
class qcl_datasource_type_z3950_Model  extends qcl_datasource_type_db_Model
{

  //-------------------------------------------------------------
  // class variables 
  //-------------------------------------------------------------
	
	/**
	 * records metadata
	 * @var array
	 */
	var $recordInfo = array();
	
	/**
	 * field metadata
	 * @var array
	 */
	var $indexInfo = array();
	

 /**
   * overridden. initializes all models that belong to this datasource
   */
  function initializeModels( $name )
  {
    $controller =& $this->getController();
            
    /*
     * this datasource has only a record model
     */
    $this->recordModel =& new bibliograph_models_record_default( &$controller, &$this);

    
    $this->getById($name);
    
    // @todo options?
    $data = unserialize( $this->getPropertyValue('data') );
    if ( ! is_array ( $data ) )
    {
      $this->raiseError("Cannot unserialize Z39.50 connection data." );
    }
    
    $this->recordInfo = $data['recordInfo'];
    $this->indexInfo  = $data['indexInfo'];     
    
  }    
  
  
	/**
	 * gets a list of datasources based on xml files with 
   * z39.50 'explain' information 
	 * @see bibliograph_models_datasource_abstract::getModelDatasourceList
	 */
  function getListFromXml()
  {
    require_once("qcl/xml/simpleXML.php");
   
    $list 	= array();
    $xmldir = Z3950_XML_SERVERDATA_DIR;
    $handle = opendir( $xmldir );
    
    while ($file = readdir($handle))
    { 
      if(!strstr($file,".xml")) continue;

      
      /*
       * load xml string from file
       */
      $path = "$xmldir/$file";
      $xml = file_get_contents($path); 
      
      /*
       * make sure this is utf-8
       */
      if ( !stristr($xml,'encoding="utf-8"') )
      {
        $xml = utf8_encode($xml);
        $xml = preg_replace("/encoding=\"([^\"]+)\"/",'encoding="UTF-8"',$xml);
      }
      
      /*
       * parse xml into an object tree
       */
      $cacheId = str_replace(".","_",$file."_".filectime($path));// use filename plus last modification date for caching 
      $controller =& $this->getController();
      $parser  =& new qcl_xml_simpleXML( &$controller, $xml,$cacheId);
     
      $connection = array(
        'name'     => $parser->getData("/databaseInfo/title"),      
        'database' => $parser->getData("/serverInfo/database"),
        'host'     => $parser->getData("/serverInfo/host"),
        'port'     => $parser->getData("/serverInfo/port"),
        'encoding' => $parser->getData("/serverInfo/encoding"),
        'username' => $parser->getData("/serverInfo/authentication/user"),
        'password' => $parser->getData("/serverInfo/authentication/password"),
      );
        
      $doc     =& $parser->getDocument();
      
      // query parameters
      $indexInfo = array();
      
      foreach ( $doc->indexInfo->index as $index)
      {
        if ( phpversion() < 5 )
        {
          $title = $index->title->CDATA();
          $attr  = $index->map->attr->CDATA();
        }
        else
        {
          $title = (string) $index->title;
          $attr  = (string) $index->map->attr;
        }
        $indexInfo[$attr] = $title;
      }
      
      // record syntax
      foreach ( $doc->recordInfo->recordSyntax as $syntax)
      {
        if ( is_object ($syntax) )
        {
          $syntaxAttr  = $syntax->attributes();
          if ( is_object ($syntax->elementSet) )
          {
            $elemSetAttr = $syntax->elementSet->attributes();
          } 
          $recordInfo[] = array( $syntaxAttr['name'], $elemSetAttr['name'] );
        }

      }
      
      // add other info
      $connection['namedId'] 			= str_replace(".","-",$connection['host'])."-".$connection['database'];
      $connection['schema']				= "z3950";
      $connection['type']				  = "z3950";
			$connection['readonly']			= true;
			
			// add data
			$connection['data']	= serialize(array(
				'indexInfo'		=> $indexInfo,
				'recordInfo'	=> $recordInfo
			));
			             	
      // store in database list
      $list[] = $connection;
    }
    
  	return $list;
  }

  
	//-------------------------------------------------------------
  // public methods 
  //-------------------------------------------------------------
	
 	/**
 	 * gets metadata on fields
 	 */	
  function getIndexInfo ( )
  {
  	return $this->indexInfo;
  }
    
	/**
 	 * gets metadata on records
 	 */	
  function getRecordInfo ()
  {
  	return $this->recordInfo;
  }    
}

?>
