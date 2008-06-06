<?php

/**
 * class providing a cross-version (php4/5) simple xml representation as a php object
 * this class also provides caching of the object that is parsed from the xml, and a simple locking mechanism
 * that ensures that several users can access the xml at the same time and changes in the xml will be written consecutively.
 * The object will have the lock on its corresponding xml file until it is disposed at the script end (or if you call
 * $obj->__destruct() manually)
 **/
class qcl_xml_simpleXML extends qcl_jsonrpc_object
{
 
  /**
   * file path if xml is in a file
   */
  var $file; 

  /**
   * php4-backport of simplexml API
   * @var XMLParser
   */
  var $__impl;
  
  /**
   * tag names prohibited by the php4 backport
   * @var array
   */
  var $invalidTags = array();
  
  /**
   * id that is used to identify file with cached xml object
   * @var string
   */
  var $cacheId;
  
  /**
   * modification date of xml file
   * @var string
   */
  var $filectime;
  
  /**
   * flag for indicating if the xml source for the document
   * has changed or if we are using a copy from cache
   * @var bool
   */
  var $hasChanged;
  
  /**
   * constructor
   * @param mixed   $xml see qcl_xml_simpleXML::load() 
   * @param mixed   $cache see qcl_xml_simpleXML::load() 
   **/
  function __construct( $xml=null, $cache=true )
  {
    if ( $xml )
    {
      $this->load( $xml, $cache );
    } 
  }
  
  /**
   * creates a new file with optional content but only if it
   * doesn't exist already
   */
  function createIfNotExists($path,$xml="")
  {
     
    if ( is_valid_file($path) ) 
    {
      $this->info("'$path' exists. No need to create it.");
      return false;
    }
    
    if ( ! $xml )
    {
      $xml = '<?xml version="1.0" encoding="utf-8"?><root/>';
    }
    
    if ( file_put_contents($path,$xml) )
    {
      $this->info("Created root node in '$path'...");
      return true;
    }

    $this->raiseError("Could not create '$path'.");
  }
  
  /**
   * loads xml from string or file
   * @param mixed  $xml xml string or file name
   * @param mixed[optional, default false] $cache if not false, cache the result. 
   * if $xml is a file, reuse cached data if file timestamp hasn't changed. If $xml is a string, 
   * reuse cache with an id supplied by $cache if it exists.
   * @param array $atrributeIndexed array of atrributes which will be indexed (PHP4)
   **/
  function &load( $xml, $cache=false, $indexedAttributes=array() )
  {
    /*
     * when reusing the object, make sure the lock is freed
     */
    if ( $this->cacheId )
    {
      $this->removeLock($cacheId);  
    }
    
    /*
     * if xml is a file name, store location
     */
    $isFile = is_valid_file($xml);
    
    if ( $isFile )
    {
        $this->file = $xml;      
    }
    
    /*
     * check if document object has been cached
     */
    if ( $cache )
    {
      if ( $isFile )
      {
        
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
        $doc =& $this->retrieve($cacheId);
        if ( is_object($doc) and $filectime == $doc->__filectime )
        {
          $this->info("Getting xml document object ($xml) from cache ($cacheId)...");
          $this->doc =& $doc;
          $this->hasChanged = false;
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
        $doc =& $this->retrieve($cache);
        if ( is_object($doc) )
        {
          $this->doc =& $doc;
          $this->hasChanged = false;
          $this->info("Getting xml document object from cache (#$cache)...");
          return;
        }
      }
    }
    
    $this->info("No cache available. Parsing document...");
    
    /*
     * object not cached, create it from xml file
     */
    $this->hasChanged = true;
    
    if ( PHP_VERSION < 5 )
    {
      /*
       * use simplexml backport library
       */
      require_once('qcl/xml/lib/parser_php4.php');
      $this->__impl =& new XMLParser;
      
      $this->invalidTags = $this->__impl->invalidTags;
      /*
       * index attributes
       */
      $this->__impl->indexedAttributes = $indexedAttributes;
      
      /*
       * parse xml from file or string
       */
      if ( $isFile )
      {
        $this->info("Loading document from file $xml...");
        $this->doc =& $this->__impl->load_file($xml);
      }
      elseif ( is_string ( $xml ) )
      {
        $this->info("Loading document from string...\n$xml");
        $this->doc =& $this->__impl->load_string($xml);
        //$this->info($this->doc->asXML()); die;
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
    $this->hasChanged = true;
  }
  
  /**
   * get the root of the document alias for getDocument
   * return XMLTag (php4) or SimpleXMLElement (php5)
   */
  function &getRoot()
  {
    return $this->getDocument();
  }  
  
  /**
   * get document root node
   * return XMLTag (php4) or SimpleXMLElement (php5)
   */
  function &getDocument()
  {
    return $this->doc;
  }

  /**
   * get array of nodes that contain an attribute with the given value
   */
  function getNodesByAttributeValue($name,$value)
  {
    if ( phpversion() < 5 )
    {
      return $this->__impl->getNodesByAttributeValue($name,$value);
    }
    else
    {
      //@todo: implement
      trigger_error("Not implemented");
    }
  }
  
  /**
   * cross-version method to get CDATA content of a node
   * @param mixed $pathOrNode (string) simplified xpath (only tag names and tag[3], no queries) or (object) node 
   * @return object node object or NULL if path does not exist 
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
    
    if ( phpversion() < 5 )
    { 
      $tmp =& $this->doc;
      
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
    }
    else
    {
      trigger_error("Implement!");
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
    if ( ! is_valid_file($this->file) )
    {
      $this->raiseError("No valid file name stored ('{$this->file}').");
    }
    
    $xml = $this->doc->asXML();
    file_put_contents($this->file,$xml);
    $this->filectime = filectime($this->file);     
    $this->_saveToCache();
  }
  
  
  /**
   * checks whether the xml document has changed 
   */
  function hasChanged()
  {
    return $this->hasChanged;  
  }
  
  
  /**
   * checks whether a tag name is legal
   * @param string $tag
   */
  function isValidTag($tag)
  {
    if (phpversion()<5)
    {
      return ( ! in_array($tag,$this->invalidTags));
    }
    return true;
  }
  
  /**
   * extends a simple xml object tree
   * @see qcl_xml_simpleXML::_extend
   * @param qcl_xml_simpleXML 
   */
  function extend($parentXml)
  {
    if ( is_a($parentXml,"qcl_xml_simpleXML") )
    {
      $doc       =& $this->getDocument();
      $parentDoc =& $parentXml->getDocument();  
      $this->_extend(&$doc, &$parentDoc);
      if ( $parentXml->hasChanged )
      {
        $this->hasChanged = true;
      }
    }
    else
    {
      $this->raiseError("Argument must be a qcl_xml_simpleXml object.");
    }
  }
  
  /**
   * extends one simple xml object tree with a second one
   * currently, all nodes from the source tree are appended to
   * the corresponding notes in the target tree. in a later version,
   * the "extends" attribute will be used to selectively
   * extend branches.
   * @param object $target simple xml object (target)
   * @param object $source simple xml object (source)
   */
  function _extend($target,$source)
  {
    $childTags = array_keys(get_object_vars($source));
    foreach($childTags as $tag)
    {
      if ( !$this->isValidTag($tag) ) continue;
      
      $sourceChild =& $source->$tag;
      $targetChild =& $target->$tag;
      
      if ( is_object($sourceChild) and is_object($targetChild) )
      {
        // unique node present in both nodes, just recurse
        $this->_extend(&$targetChild,&$sourceChild);  
      }
      else
      {
        /*
         * node to be copied over is a single node
         */
        if ( is_object($sourceChild) )
        {
          /*
           * add new child to target node
           */
          $targetChild =& $target->addChild($tag,$sourceChild->CDATA());
          foreach($sourceChild->attributes() as $key => $value )
          {
            $targetChild->addAttribute($key,$value);
          }
          $this->_extend(&$targetChild,&$sourceChild);
        }

        elseif ( is_array( $sourceChild ) )
        {
          /*
           * we need to copy over an array of nodes
           */
          while ( list(,$s) = each( $sourceChild ) )
          {
            /*
             * replace target node with source node, using
             * replace="foo" to replace name="foo"
             */          
            $sAttr = $s->attributes();
            $tRepl = $sAttr['replace'];
            if ( $tRepl )
            {
              foreach ( $target->children() as $i => $t )
              {
                $tAttr = $t->attributes();
                if ( $tAttr['name'] == $tRepl )
                {
                  if (phpversion() < 5)
                  {
                    $target->removeChild($t);
                  }
                  else
                  {
                    /*
                     * there is no removeChild implementation
                     * in SimpleXML
                     */                    
                    unset($target[$i]);  
                  }
                  
                }
              }
            }
            
            /*
             * add new child to target node 
             */
            $targetChild =& $target->addChild($tag,$s->CDATA());
            foreach($s->attributes() as $key => $value )
            {
              $targetChild->addAttribute($key,$value);
            }
            $this->_extend(&$targetChild,&$s);
          }
        }
        else
        {
          /*
           * invalid source element
           */
          $this->raiseError("Invalid source element:" . gettype($sourceChild));          
        }
      }
    }
  }
  
  /**
   * returns the current document as xml
   * @return string
   */
  function asXML()
  {
    return $this->doc->asXML();
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