<?php

/**
 * wrapper around native PHP5 simpleXML implementation and
 * PHP4 IsterXmlSimpleXML pure php4 backport (see http://www.ister.org/code/simplexml44/index.html)
 * this class also provides caching of the object that is parsed from the xml, and a simple locking mechanism
 * that ensures that several users can access the xml at the same time and changes in the xml will be written consecutively.
 * The object will have the lock on its corresponding xml file until it is disposed at the script end (or if you call
 * $obj->__destruct() manually)
 **/
class qcl_xml_simpleXML extends qcl_jsonrpc_object
{

  var $file      = null; // file path if xml is in a file
  var $__impl    = null; // simple xml php4 implementation
  var $cacheId   = null;
  var $filectime = null; // modification date of xml file

  /**
   * constructor
   * @param mixed   $xml see qcl_xml_simpleXML::load() 
   * @param mixed   $cache see qcl_xml_simpleXML::load() 
   * @param boolean $createIfNotExists if the file doesn't exist, create it
   **/
  function __construct( $xml=null, $cache=false, $createIfNotExists=false )
  {
    if ( $xml )
    {
      if ( $createIfNotExists )
      {
        if ( ! is_valid_file($xml) )
        {
          file_put_contents($xml,'<?xml version="1.0" encoding="utf-8"?><root/>');
        }
      }
      $this->load( $xml, $cache );
    } 
  }
  
  /**
   * constructor
   * @param mixed  $xml xml string or file name
   * @param mixed[optional, default false] $cache if not false, cache the result. 
   * if $xml is a file, reuse cached data if file timestamp hasn't changed. If $xml is a string, 
   * reuse cache with an id supplied by $cache if it exists.
   **/
  function &load( $xml, $cache=false )
  {
    /*
     * when reusing the object, make sure the lock is freed
     */
    if ( $this->cacheId )
    {
      $this->removeLock($cacheId);  
    }
    
    /*
     * is the xml a string or a file name?
     */
    $isFile = is_valid_file($xml);
    
    /*
     * check if document object has been cached
     */
    if ( $cache )
    {
      if ( $isFile )
      {
        /*
         * save file path
         */
        $this->file = $xml;
        
        /*
         * cache id
         */
        $cacheId         = "qcl_xml_simpleXML_" . md5($xml); 
        $this->filectime = filectime($xml);
        $this->cacheId   = $cacheId;
        
        /*
         * get lock because some other process could be just writing the cache
         */
        $this->getLock($cacheId);
        
        /*
         * use cached object if exists and if the file modification date matches the signature in the cached object
         */
        $doc = $this->retrieve($cacheId);
        if ( is_object($doc) and $filectime == $doc->__filectime )
        {
          $this->info("Getting xml document object from cache...");
          $this->doc =& $doc;
          return;
        }
        
        /*
         * discard cache because file modification doesn't match
         */ 
        $doc = null;     
      }    
      else
      {
        /*
         * cache id
         */
        $this->cacheId = $cache;
        
        /*
         * get lock because some other process could be just writing the cache
         */
        $this->getLock( $this->cacheId );
        
        /*
         * get document
         */
        $doc = $this->retrieve($cache);
        if ( is_object($doc) )
        {
          $this->doc =& $doc;
          return;
        }
      }
    }
    
    /*
     * object not cached, create it from xml file
     */
    if ( PHP_VERSION < 5 )
    {
      require_once('qcl/lib/simplexml44/class/IsterXmlSimpleXMLImpl.php');
      $this->__impl =& new IsterXmlSimpleXMLImpl;
      if ( $isFile )
      {
        //$this->info("Loading document from file $xml...");
        $this->doc =& $this->__impl->load_file($xml);
      }
      elseif ( is_string ( $xml ) )
      {
        //$this->info("Loading document from string...");
        $this->doc =& $this->__impl->load_string($xml);
      }
      else
      {
        $this->raiseError("Invalid parameter " . $xml );
      }
    }
    else
    {
      if ( $isFile )
      {
        //$this->info("Loading document from file $xml...");
        $this->doc = simplexml_load_file($xml);
      }
      elseif ( is_string ( $xml ) )
      {
        //$this->info("Loading document from string...");
        $this->doc = simplexml_load_string($xml);
      }
      else
      {
        $this->raiseError("Invalid parameter " . $xml );
      }      
    }

    /*
     * cache document object
     */
    if ( $cache and !$doc )
    {
      $this->_saveToCache();
    }      
     
    return $this->doc;
  }
  
  /**
   * saves parse xml object tree to cache
   * @access private
   */
  function _saveToCache()
  {
    // store modification date
    if ( $this->filectime )
    {
      $this->doc->__filectime = $this->filectime;
    }
    
    //$this->info("Saving xml document object to the cache...");
    $this->store($this->cacheId, $this->doc);    
  }
  
  /**
   * get the root of the document, use this for cross-version compatibility
   */
  function &getRoot()
  {
    if ( $this->__impl )
    {
      return $this->doc->root;
    }
    else
    {
      return $this->doc;
    }
  }  
  
  function &getDocument()
  {
    return $this->doc;
  }

  /**
   * cross-version method to get CDATA content of a node
   * @param mixed $pathOrNode (string) simplified xpath (only tag names and tag[3], no queries) or (object) node 
   * @return CDATA content or NULL if path does not exist 
   */
  function &getNode($pathOrNode)
  {
    /*
     * if the passed var is a node, return it
     */
    if ( is_object($pathOrNode) )
    {
      return $pathOrNode; 
    }
    
    /*
     * check if document has already been parsed 
     */
    if (! is_object ($this->doc) )
    {
      $this->raiseError("qcl_xml_simpleXML::getNode : No xml document available.");
    } 
    
    $tmp =& $this->getRoot();
    
    /*
     * traverse object tree along the path
     * @todo: php5 simpleXML has native xpath support
     */
    $parts = explode("/",$pathOrNode);
    foreach ( $parts as $part )
    {
      if ( !trim($part) ) continue; // ignore initial "//"

      if ( ! strstr($part,"[") )
      {
        $n = 1;
      }
      else
      {
        preg_match("/(\w+)\[([0-9]+)\]/",$part,$matches);
        $part = (string) $matches[1];
        $n    = (int)    $matches[2];
      }
      
      /*â
       * get node object
       */
      $tmp =& $tmp->$part;
      
      /*
       * result is nodeset
       */
      if ( is_array($tmp) )
      {
        $tmp =& $tmp[$n-1];
      }      
      
      /*
       * no result
       */
      if (! is_object ($tmp) )
      {
        $this->error = "Path '$pathOrNode' stuck at '$part' (". gettype($tmp) . ").";
        return null;
      }
    }
    return $tmp;
  }  
  
  
  /**
   * cross-version method to get CDATA content of a node
   * @param mixed $pathOrNode (string) path (only unique tag names, not a XPATH query) or (object) node 
   * @return CDATA content or NULL if path does not exist 
   */
  function getData($pathOrNode)
  {
    $node =& $this->getNode($pathOrNode);
    
    if ( ! $node )
    {
      return null;
    }
    
    /*
     * get node data cross-version
     */
    if ( phpversion() < 5 )
    {
      $cdata = $node->CDATA();
      
    }
    else
    {
      $cdata = (string) $node;
    }
    //$this->info("$pathOrNode : $cdata");
    return $cdata;
  }
  
  /**
   * cross-version method to set CDATA content of a node
   * @param mixed $pathOrNode (string) path (only unique tag names, not a XPATH query) or (object) node 
   * @return void
   */
  function setData($pathOrNode,$value)
  {
    $node =& $this->getNode($pathOrNode);
    
    if ( ! $node )
    {
      $this->warn($this->error);
      return null;
    }
    
    /*
     * get node data cross-version
     */
    if ( $this->__impl )
    {
      $cdata = $node->setCDATA($value);
    }
    else
    {
      eval('$node->{0} = $value'); // PHP4 throws an error otherwise
    }
    
        
  }

  /**
   * cross-version method to set an attribute of a node
   * @param mixed $pathOrNode (string) path (only unique tag names, not a XPATH query) or (object) node 
   * @return 
   */
  function setAttribute($pathOrNode,$name, $value)
  {
    $node =& $this->getNode($pathOrNode);
    
    if ( ! $node )
    {
      $this->warn($this->error);
      return null;
    }
    
    /*
     * get node data cross-version
     */
    if ( $this->__impl )
    {
      $cdata = $node->setAttribute($name,$value);
    }
    else
    {
      eval('$node[$name] = $value'); // PHP4 throws an error otherwise
    }
  
        
  }  
  
  /**
   * save current xml object tree and the cache
   */
  function save()
  {
    $xml = $this->doc->asXML();
    file_put_contents($this->file,$xml);
    $this->filectime = filectime($this->file);     
    $this->_saveToCache();
  }
  
  /**
   * destructor: removes the lock on the xmlfile, so that other processes can read or write it.
   */
  function __destruct()
  {
    $this->removeLock($this->cacheId);
  }
  
}


?>