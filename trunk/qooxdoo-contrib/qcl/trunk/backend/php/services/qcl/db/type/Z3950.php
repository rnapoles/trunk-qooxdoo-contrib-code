<?php
/*
 * dependencies
 */
require_once "qcl/db/type/Abstract.php";

/**
 * Z39.50 database connection wrapper
 *
 * Dependencies: 
 * - php_yaz extension  
 * - php_domxml exenstion
 * - PEAR 
 */
class qcl_db_type_Z3950 extends qcl_db_type_Abstract 
{
    
  
  var $error;			// error message
  var $handle;		// yaz resource handle
  var $connection;	// current connection data

	//-------------------------------------------------------------
  // internal methods
  //-------------------------------------------------------------
  
  /**
   * constructor
   */
  function __construct($controller)
  {
      // check for yaz
      if ( ! function_exists( "yaz_connect" ) ) 
      {
          $this->raiseError("PHP/YAZ is not available.");
      }
      parent::__construct(&$controller);
  }

	
	/**
	 * build rpn query with query data
   * @param object 	$queryData 	data to construct the query. Needs at least the following properties:
   * 								(string) datasource name of datasource
   * 								(array) query [[field,operator,value,boolean operator],...]   	 * 
	 */
  function _buildRpnQuery($queryData)
  {
    if ( is_array($queryData->query) )
    {
      $rpn = "";
      $queryParts = $queryData->query; 
      foreach ( $queryParts as $index => $part )
      {
    		$field 		  = (string) $part[0];
    		$operator 	= (string) $part[1];
    		$value		  = (string) trim($part[2]);
    		$bool		    = (string) $part[3];
    		
    		if ( ! $value ) continue;
    		
    		if ( $bool and $queryParts[$index+1][2] )
    		{
    			$rpn = "@" . strtolower($bool) . " " . $rpn;
    		}
    		
    		$rpn .= " @attr 1=" . $field . ' "' . str_replace("###", $value, $operator) . '"';
      }
    }
    else
    {
        $controller  =& $this->getController();
        $schemaModel =& $controller->schemaModel;
        $query = preg_replace("/='([^']*)'/","=$1",$queryData->query);
        
        $fields = array();
        foreach( $schemaModel->getFields() as $index )
        {
          $fields["`" . ($index) . "`"] = "1=$index";
        }
        yaz_ccl_conf( $this->handle, $fields);
        yaz_ccl_parse( $this->handle, $query, $result );
        if ( $result['rpn'] )
        {
          $rpn = $result['rpn'];
        }
        else
        {
          $errmsg = "Invalid ccl query: " . $result['errorstring'] . " at position " . $result['errorpos'];
          $controller->dispatchEvent("displayMessage", $errmsg );
          $this->info($errmsg);  
          return array();          
        }
        
    }
    return trim($rpn);    
	}
  
 	//-------------------------------------------------------------
 	// public methods for generic access 
	//-------------------------------------------------------------   
	
  
  /**
   * check connection
   * @return boolen success
   * @param mixed $data array connection data or string datasource name
   */
 	function checkConnection ( $data )
  {

    if ( is_array( $data ) )
    {
      $this->connection = $data;
    }  
   
    $this->connectByArray( $this->connection );
    $error = $this->search ( "rpn", "@1=1 shakespeare" );
    if ( $error )
    {
      $this->setError($error);
      return false;
    }
    else
    {
      $this->setError(null);
      return true;
    }
  }
  
	/**
	 * gets row count for a given query
	 */
	function getRowCount($queryData)
	{
    $controller =& $this->getController();
    $requestId = $queryData->requestId; 
    
    $this->connectByArray($this->connection);
    $this->log("Received row count request $requestId.") ;
    
    // execute query
		$query = $this->_buildRpnQuery($queryData);
		$this->log("Sending query '$query'.");     
    yaz_search ($this->handle, "rpn", $query );
    yaz_wait();
    
    // error? 
    $error = yaz_error ( $this->handle ); 
    if ( $error )
    {
      $errmsg = "YAZ error: $error" . yaz_addinfo($this->handle); 
      $controller->dispatchEvent("displayMessage", $errmsg );
      $this->log($errmsg);  
      return array();
    }
    
    $rowCount = yaz_hits($this->handle) ;
    $this->setSessionVar("hits", $rowCount);
    $this->setSessionVar("resultcache",array());

    $this->log("$rowCount hits.");
    $controller->dispatchEvent( "displayMessage", $this->tr("Found %s records...", array($rowCount) ) );
    
    $rowCountInfo = array(
    	'rowCount'	=> $rowCount,
    	'requestId'	=> $requestId
    );
		return $rowCountInfo;
	}

	/**
	 * overridden
	 */
	function getById($id)
	{
		$dsModel    = $this->getDatasourceModel();
    $datasource = $dsModel->getDatasourceName();
	  
	  $cache = $this->getSessionVar( "resultcache_" . $datasource );
		return $cache[$id];
	}
	
	/**
	 * gets row data for a given query
     * @param object 	$queryData 	data to construct the query. Needs at least the following properties:
     * 								(string) datasource name of datasource
     * 								(string) field	* or field names (comma-separated)
     * 								(array)  query [[field,operator,value,boolean operator],...] 
     * 								(string) orderBy	field by which query result should be ordered
     * @param integer 	$firstRow 	first row of queried data
     * @param integer 	$lastRow 	last row of queried data 	 
	 */
	function getRowData( $queryData, $firstRow=null, $lastRow=null )
	{        
    $controller       =& $this->getController();
    $datasourceModel 	=& $this->getDatasourceModel();
    $recordInfo   		=& $datasourceModel->getRecordInfo();

    $requestId			  = $queryData->requestId; 
    $encoding  			  = either ( strtolower ( $this->connection['encoding'] ), "marc-8" );
    $number				    = ($lastRow - $firstRow) + 1;
		$hits 				    = $this->getSessionVar("hits");
		
    if ( $number > $hits )
    {
      $number = $hits;
      $lastRow = $firstRow + ( $hits -1 );
    }
    
		// turn off time limits because this might take a long time
		set_time_limit(0);
		
    $this->connectByArray($this->connection);

   	// request id
		if ( $requestId )
		{
			$this->log("Received data request $requestId.") ;				
		}       
       	
    // prepare results    
    yaz_range  ($this->handle, $firstRow+1, $number );
    yaz_syntax ($this->handle, $recordInfo[0][0]); 
    yaz_element($this->handle, $recordInfo[0][1]);			
		
    // sending query
		$query = $this->_buildRpnQuery($queryData);  
		$this->log("Sending query '$query'.");     
     
    yaz_search ($this->handle, "rpn", $query );
    yaz_wait();
    $this->log("Retrieving $number records ($firstRow - $lastRow).") ;
        
    // error? 
    $error = yaz_error ( $this->handle ); 
    if ( $error )
    {
      $errmsg = "YAZ error retrieving rows $firstRow-$lastRow of $hits : $error" . yaz_addinfo($this->handle); 
      $controller->dispatchEvent("displayMessage", $errmsg );
      $controller->dispatchEvent("endRequest" );
      $this->log($errmsg);  
      return array(array());
    }
    
   	$this->log("$hits hits. Retrieving records $firstRow - $lastRow...");
   	
   	// process resultset
   	$xslt 		  =& $controller->getSingleton("qcl_xml_transformer");
   	$xsltpath 	= realpath( SERVICE_PATH . "../../xslt/bibliographic" );
   	$tmppath	  = QCL_TMP_PATH;
    $p			    =  (int) $firstRow +1;
    $i			    = 0;
    $result 	  = "";
    $debug		  = true;

		yaz_present($this->handle); // whatever this is for        
        
    // get all record sets
    for ($i=1; $i <= $number; $i++ )
    {     
   		$record = yaz_record($this->handle, $p, "xml");
      $this->log( "Retrieving record $p ($i/$number).");
      $p++;
      $result .= $record;                
    }
    
		if ($debug) file_put_contents($tmppath . "1_result.xml", $result); 
		
		$this->log("Formatting results..."  );
		
		// convert to utf-8
		
		if ( $encoding=="marc-8" )
		{
			$converter 	=& $controller->getSingleton("bibliograph_plugins_z3950_converter");
			$result 	  = $converter->toUtf8($result);	
		}
		else
		{
			$result = utf8_encode($result);
		}
        
    $utf8xml = (
    	'<?xml version="1.0" encoding="UTF-8"?>' . "\n" . 
			'<xml>' . "\n" .  
				$result . "\n" . 
			'</xml>'
		);
    	
		if ($debug) file_put_contents($tmppath . "2_result-utf8.xml", $utf8xml);
		
 		// convert oai marc into marc21/slim 
    if ( strstr($result,"oai_marc") )
    { 
    	$marcxml = $xslt->transform($utf8xml, "$xsltpath/oaimarc_to_marcxml.xsl");
    	if ( $marcxml == false )
    	{
    		$this->warn($xslt->error);
        return $this->abortGetRowData($number);
    	} 
    } 
    else
    {
      $marcxml = $utf8xml;
    }
		if ($debug) file_put_contents($tmppath . "3_marc21.xml", $marcxml); 

    // convert to dublin core
    $dcxml = $xslt->transform($marcxml, "$xsltpath/marcxml_to_dublincore.xsl");
    if ( $dcxml === false )
    {
    	$this->warn($xslt->error);
    	return $this->abortGetRowData($number);
    }
        
		if ($debug) file_put_contents($tmppath . "4_dc.xml", $dcxml); 
		
    // convert dc-xml into array
    $records = $this->dublincore_to_array($dcxml,$firstRow +1 );

    $dsModel    = $this->getDatasourceModel();
    $datasource = $dsModel->getDatasourceName();
    
 		// save in session for later retrieval
		$cache = (array) $this->getSessionVar( "resultcache_" . $datasource );
		foreach( $records as $index => $record )
		{
			$cache[$firstRow  + $index + 1 ] = $record;
		}
    
		

    		
    $this->setSessionVar( "resultcache_" . $datasource, $cache);
		
    
    // return records
     $controller->dispatchEvent(
      "displayMessage",  
      $this->tr("Retrieved records %s - %s of %s ..." , array ($firstRow+1,$lastRow+1,$hits) )
     );  	

		$this->log("Returning records " . $firstRow+1 . " - ".  $lastRow +1 . " of $hits...");
		return $records;
	}

	 /**
	 * whether this record model supports autocompleting on the client
	 * @return boolean
	 */
	 function supportsAutocomplete()
	 {
	 	return false;
	 }
	
 	//-------------------------------------------------------------
 	// public methods 
	//-------------------------------------------------------------   

		
  /**
   * @param $url URL of database interface, including port, for example z3950.library.net:234
   * @param $user user name (optional)
   * @param $password password (optional)
   * @param $group group (optional)
   */
  function connect($url,$username="",$password="",$options=array())
  {
    if(!$url) 
    {
        $this->raiseError("No URL provided.");
    }
    
    // authentication
    
    if( $username )
    {
        $options['user']            = $username;
        $options['password']        = $password;
    } 
    
    // try to create connection
    $this->log("Connecting to '$url'.");      
    $this->handle = yaz_connect($url, $options);
    
    if( ! $this->handle )
    {
        return false;
    }
    
    return true;
  }

  /**
   * connects to z3950 datasource by an array of connection information
   * @param array $connection
   */    
  function connectByArray($connection)
  {
		$url 	    = $connection['host'] . ":" . $connection['port'] . "/" . $connection['database'];
		$username = $connection['username'];
    $password = $connection['password'];
    return $this->connect( $url, $username, $password );
  }
  
  
  /**
   * searches a z39.50 datasource which has been connected to before
   * @return 
   * @param $syntax query syntax (rpn etc.)
   * @param $query
   * @return mixed string error message or empty string if query was successful
   */
  function search ( $syntax, $query )
  {
    if ( ! $this->handle )
    {
      $this->raiseError("YAZ Plugin :: search: no connection!");
    }
    yaz_search ( $this->handle, $syntax, $query );
    yaz_wait();
    return yaz_error ( $this->handle );
  }
  
	/**
	 * aborts a row data request gracefully
	 * @param string 	$requestId
	 * @param int		$number		number of empty rows to return
	 */
	function abortGetRowData($number)
	{
    $controller =& $this->getController();
    
	  $controller->dispatchEvent(
      "displayMessage", "An error occurred."
		); 
		return array_fill(0,$number,array('title'=>"Error"));
	}
    
  /**
   * converts utf-8 dubin core xml to an associate array
   * keys are bibtex fields plus an "id" field
   * stream with string functions for speed
   * @param string 	$dcxml		dublin core xml
   * @param int		  $firstRow	(optional) offset for id
   */
	function dublincore_to_array ($dcxml,$firstRow=1)
	{
		$records 	= array();
		$lines  	= explode("\n",$dcxml);
		$index		= 0;
		
    foreach ($lines as $i => $line)
    {
    	// general clean up
    	
    	$line = html_entity_decode($line);
    	
    	// start of record
    	if ( strstr($line,"<rdf:Description") )
    	{
    		$records[$index] = array(
    			'id'		=> $firstRow + $index,
    			'reftype'	=> "book"
    		);
    	}
    	
    	// end of record
    	elseif ( strstr($line,"</rdf:Description") )
    	{
    		//$this->log("Record $index:" . print_r($records[$index],true));
    		$index++;
    	}
    	
    	
    	// build full xml line
    	$j=1;
    	while ( strstr($line,"<dc:") and ! strstr($line,"</dc:") )
    	{
    		$line .= $lines[$i + $j];
    		$j++;
    		if ( $j > count($lines) ) break;
    		
    	}
    	
    	//$this->log("Line $i:" . $line);
    	
    	// creator
    	if ( strstr($line,"<dc:creator") )
    	{        		
    		$author = (
    			( $records[$index]['author'] ? $records[$index]['author'] . "; " : "" ) .
    			trim(strip_tags($line))
    		);
    		if ( substr($author,-1,1) == "." )
    		{
    			$s = substr($author,-3,1) ;
    			if ( $s != " " and $s != "." )
    			{
    				$author = substr($author,0,strlen($author)-1);
    			}
    		}
    		$records[$index]['author'] = $author;
    	}

	    // title
    	elseif ( strstr($line,"<dc:title") )
    	{        		
    		$title = trim(strip_tags($line));
    		if ( substr($title,-1,1) == "/" )
    		{
    			$title = substr($title ,0,strlen($title)-1);
    		}        		
    		$records[$index]['title'] = $title;
    	}

	    // date
    	elseif ( strstr($line,"<dc:date") )
    	{        		
    		$records[$index]['year'] = str_replace(
    			array(".","c","(",")","[","]","p"),"",
    			trim(strip_tags($line))
    		);
    	}

	    // type
    	elseif ( strstr($line,"<dc:type") )
    	{        		
    		$reftype = trim(strip_tags($line)); 
    		if ( $reftype )
    		{
    			// todo: map reftypes
    			//$records[$index]['reftype'] = $reftype; 	
    		}
    	}        	

    	// language
    	elseif ( strstr($line,"<dc:language") )
    	{        		
    		$records[$index]['language'] = (
    			( $records[$index]['language'] ? $records[$index]['language'] . "; " : "" ) .
    			trim(strip_tags($line))
    		);
    	}

    	// description
    	elseif ( strstr($line,"<dc:description") )
    	{        		
    		$records[$index]['contents'] = (
    			( $records[$index]['contents'] ? $records[$index]['contents'] . "\n" : "" ) .
    			trim(strip_tags($line))
    		);
    	}
    	
    	// keywords
    	elseif ( strstr($line,"<dc:subject") )
    	{        		
    		$dcsubject = trim(strip_tags($line));
    		if ( ! strstr( $records[$index]['keywords'],$dcsubject) )
    		{
      		$records[$index]['keywords'] = (
      			( $records[$index]['keywords'] ? $records[$index]['keywords'] . "; " : "" ) .
      			$dcsubject
      		);
    		}
    	}        	
    	
    	// identifier
    	elseif ( strstr($line,"<dc:identifier") )
    	{        		
    		$dcIdentifier = trim(strip_tags($line));
    		if ( ! strstr( $records[$index]['note'],$dcIdentifier ) )
    		{
      		if ( substr($dcIdentifier,0,7) == "http://")
      		{
      			$records[$index]['url'] = (
        			( $records[$index]['url'] ? $records[$index]['url'] . "; " : "" ) .
        			$dcIdentifier 
        		);
      		}
      		elseif ( substr($dcIdentifier,0,9) == "URN:ISBN:" and trim(substr($dcIdentifier,9)) )
      		{
      			$records[$index]['ISBN'] = (
        			( $records[$index]['ISBN'] ? $records[$index]['ISBN'] . "; " : "" ) .
        			substr($dcIdentifier,9)
        		);
      		}
      		else
      		{
        		$records[$index]['note'] = (
        			( $records[$index]['note'] ? $records[$index]['note'] . "\n" : "" ) .
        			$dcIdentifier 
        		);	        			
      		}
    		}
    	}
    	
    	// publisher
    	elseif ( strstr($line,"<dc:publisher") )
    	{        		
    		$dcPublisher = trim(strip_tags($line));
    		if ( strstr($dcPublisher,":"))
    		{
    			$p = strpos($dcPublisher,":");
    			$records[$index]['address']   = trim( substr( $dcPublisher, 0, $p-1 ) );
    			$records[$index]['publisher'] = trim( substr( $dcPublisher, $p+1 ) );
    		}
    		else
    		{
    			$records[$index]['publisher'] = $dcPublisher;
    		}
    	}  
      
      // publisher
    	elseif ( strstr($line,"<dc:source") )
    	{        		
    		$dcsource = trim(strip_tags($line));
        $records[$index]['LCCN'] = ( $records[$index]['LCCN'] ? $records[$index]['LCCN'] . "; " : "" ) . $dcsource;
    	}  
    }

    return $records;
	}
  
	/**
	 * closes database connection
	 */
  function close()
  {
    if($this->handle)
    {
    	yaz_close( $this->handle );
    }
    $this->handle = false;
    $this->database = false;
  }
}


?>
