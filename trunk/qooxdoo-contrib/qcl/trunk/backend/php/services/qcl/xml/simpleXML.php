<?php

/**
 * Class providing a cross-version (php4/5) simple xml 
 * representation as a php object. This class also provides 
 * caching of the object that is parsed from the xml, and a 
 * simple locking mechanism that ensures that several users 
 * can access the xml at the same time and changes in the xml
 * will be written consecutively. The object will have the 
 * lock on its corresponding xml file until it is disposed 
 * at the script end (or if you call $obj->removeLock() manually)
 * 
 **/
class qcl_xml_simpleXML extends qcl_jsonrpc_object
{
 
  /**
   * file path if xml is in a file
   */
  var $file; 

  /**
   * PHP4-backport of simplexml API
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
   * the document object
   * @var SimpleXmlElement or SimpleXmlTag object
   */
  var $doc;
  
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
   * Creates a new file with optional content but only if it
   * doesn't exist already
   * @return boolean True if file was created
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
   * @return SimpleXmlElement
   **/
  function &load( $xml, $cache=false, $indexedAttributes=array() )
  {
    if ( PHP_VERSION < 5 )
    {
      /*
       * use simplexml backport library
       */
      require_once('qcl/xml/lib/parser_php4.php');
    }
    
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
        
        //$this->info("Cache Id is: $cacheId");
        
        /*
         * get lock because some other process could be just writing the cache
         */
        $this->getLock($cacheId);
        
        /*
         * use cached object if exists and if the file modification date matches the signature in the cached object
         */
        $doc =& $this->retrieve($cacheId);
        
        if ( is_object($doc) )
        { 
          //$this->info( "Cache file exists with timestamp " . $doc->__filectime );
        
          if ( $this->filectime == $doc->__filectime )
          {
            //$this->info("Timestamp matches. Getting xml document object ($xml) from cache ($cacheId)...");
            $this->doc =& $doc;
            $this->hasChanged = false;
            return;
          }
          else
          {
            //$this->info("Timestamp doesn't match:" .$this->filectime );
          }
        }
        elseif ( ! is_bool( $object) )
        {
          $this->warn("Invalid cache '$doc' (" . gettype($doc) . ").");
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
          //$this->info("Getting xml document object from cache (#$cache)...");
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
      $this->__impl =& new XMLParser;
      
      /*
       * prohibited tag names
       */
      $xmlTag =& new SimpleXmlElement;
      $this->invalidTags = $xmlTag->invalidTags;
      
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
   * saves parsed xml object tree to cache
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
   * return SimpleXmlElement
   */
  function &getRoot()
  {
    return $this->getDocument();
  }  
  
  /**
   * get document root node
   * return SimpleXmlElement
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
   * make sure node is the right datatype
   * method can be called statically.
   * @param mixed $node
   * @return boolean
   */
  function isNode($node,$raiseError=true)
  {
    $class = strtolower( get_class($node) );
    return ( $class == "simplexmlelement" );
  }
  
  /**
   * cross-version method to get to a node. if a valid node object is
   * passed, return it. if a string is passed, treat it as a path to the
   * node. careful, path is not real xpath expression!
   * cannot be called statically.
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
    
    /*
     * traverse object tree along the path
     * @todo: php5 simpleXML has native xpath support
     */    
    if ( phpversion() < 5 )
    { 
      $tmp =& $this->getDocument();      

      $parts = explode("/",$pathOrNode);
      foreach ( $parts as $part )
      {
        /*
         * ignore initial or double slashes
         */
        if ( !trim($part) ) 
        {
          continue;  
        }
         
        /*
         * ignore root tag 
         */
        if ( key($parts) == 0 and $part == $tmp->getName() )
        {
          continue;
        }
        
        
        /*
         * parse content in square brackets
         */
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
   * cross-version method to get CDATA content of a node.
   * method can be called statically only if a valid node is passed
   * @param mixed $pathOrNode (string) path (only unique tag names, not a XPATH query) or (object) node 
   * @return CDATA content or NULL if path does not exist 
   */
  function getData($pathOrNode)
  {
    if ( is_string($pathOrNode) )
    {
      $node =& $this->getNode(&$pathOrNode);
      if ( ! $node )
      {
        return null;
      }
    }
    elseif ( qcl_xml_simpleXML::isNode($pathOrNode) )
    {
      $node =& $pathOrNode;
    }
    else
    {
      qcl_xml_simpleXML::raiseError("qcl_simpleXML::getData: invalid parameter.");
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
    $node =& $this->getNode(&$pathOrNode);
    
    if ( ! $node )
    {
      $this->warn($this->error);
      return null;
    }
    
    /*
     * get node data cross-version
     */
    if ( phpversion() < 5 )
    {
      $node->setCDATA($value);
    }
    else
    {
      eval('$node->{0} = $value'); // we need to use eval here or PHP4 throws an error otherwise
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
   * gets the first child of a node that matches an attribute-value pair.
   * can be called statically
   * @param object $node
   * @param string $name
   * @param string $value
   * @return SimpleXmlElement or null if not found;
   */
  function &getChildNodeByAttribute( $node, $name, $value )
  {
    if ( ! qcl_xml_simpleXML::isNode($node) )
    {
      qcl_xml_simpleXML::raiseError("qcl_xml_simpleXML::getChildNodeByAttribute : invalid node.");
    }
    
    $children =& $node->children();
    while ( list(,$child) = each($children) )
    {
      $attr = $child->attributes();
      $tag  = $child->getName();
      //if ($GLOBALS['debug']==true) $this->info("<$tag $name='{$attr[$name]}' =='$value'? >");
      if ( $attr[$name] == $value )
      {
        return $child;
      }
    }
    return null;
  }
  
  /**
   * removes a child node that that matches an attribute-value pair
   * can be called statically
   * @param object $node
   * @param string $name
   * @param string $value
   * @return boolean True if node was found and removed, false if not found
   */
  function removeChildNodeByAttribute($node,$name,$value)
  {
    if ( ! qcl_xml_simpleXML::isNode($node) )
    {
      qcl_xml_simpleXML::raiseError("qcl_xml_simpleXML::removeChildNodeByAttribute : invalid node.");
    }
   
    /*
     * remove target node
     */      
    $found = false;
    foreach ( $node->children() as $i => $child )
    {
      $childAttrs = $child->attributes();
      if ( $childAttrs[$name] == $value )
      {
        $found = true;
        $this->info("Removed node containing $name = $value...");
        if (phpversion() < 5)
        {
          $node->removeChild($child);
        }
        else
        {
          /*
           * there is no removeChild implementation
           * in SimpleXML
           */                    
          unset($node[$i]);  
        }
      }
    }
    return $found;
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
      
      //$this->info("Extending \n\n" . $doc->asXml() . "\n\nwith\n\n". $parentDoc->asXml());
      
      $this->_extend(&$doc, &$parentDoc);
      
      //$this->info("Result: \n\n". $doc->asXml() );
      
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
    /*
     * iterate through source children and populate matching
     * target children
     */
    
    $sourceChildren =& $source->children();
    
    for($i=0; $i<count($sourceChildren); $i++ )
    {
      $sourceChild =& $sourceChildren[$i];
      
      if ( ! is_object($sourceChild) )
      {
        $this->warn("Invalid source child:" . gettype($sourceChild));
        continue;
      }
      
      $tag = $sourceChild->getName();
      $targetChild =& $target->$tag;      
      //$this->info("$tag -> " . gettype($targetChild) );

      $doCopyNode  = true;      
      
      /*
       * check if we have to copy or extend the node if we have
       * two individual nodes
       */
      if ( is_object($sourceChild) and is_object($targetChild)  )
      {
        /*
         * get attributes
         */
        $srcChildAttrs = $sourceChild->attributes();
        $tgtChildAttrs = $targetChild->attributes();      
  
        if ( count($tgtChildAttrs) and count($srcChildAttrs) )
        {
          /*
           * check if source 'extends' or 'name' attribute matches target 'name' attribute
           */
          if (
            $tgtChildAttrs['extends'] == $srcChildAttrs['name'] or
            $tgtChildAttrs['name']    == $srcChildAttrs['name']
          )
          {
            /*
             * extend the node
             */
            //$this->info("Extending tag $tag '{$tgtChildAttrs['extends']}'' with '{$tgtChildAttrs['name']}'.");
            
            $this->_extend(&$targetChild,&$sourceChild);
            
            /*
             * add missing attributes
             */
            foreach($srcChildAttrs as $key => $value )
            {
              if ( ! isset($tgtChildAttrs[$key]) )
              {
                $targetChild->addAttribute($key,$value);
              }
            }
            $doCopyNode = false;          
          }
        }
        elseif ( $tgtChildAttrs == $srcChildAttrs)
        {
          //$this->info("Identical tag '$tag'' exists in target and source.");
          /*
           * unique node present in both nodes, just recurse
           */
          $this->_extend(&$targetChild,&$sourceChild);
          $doCopyNode = false;
        }
        else
        {
          //$this->info("Tag $tag exists in target and source but is not identical");
        }
      }
      
      /*
       * copy source node(s) to target node
       */
      if ($doCopyNode)
      {
        /*
         * node to be copied over is a single node
         */
        if ( is_object($sourceChild) )
        {
          /*
           * source child attributes
           */
          $srcChildAttrs = $sourceChild->attributes();
          
          /*
           * skip child node if target has a node that replaces 
           * this node
           */
          $srcChildName = $srcChildAttrs['name'];
          if ( $srcChildName and $this->getChildNodeByAttribute(&$target, "replace", $srcChildName ) )
          {
            //$this->info("$srcChildName exists, not adding node...");
            continue;
          }
          
          /*
           * add new child to target node
           */
          $cdata = $this->getData(&$sourceChild);
          $targetChild =& $target->addChild($tag,$cdata);
          
          //$this->info("Creating single node $tag.");
          
          foreach( $srcChildAttrs as $key => $value )
          {
            $targetChild->addAttribute($key,$value);
          }
          
          /*
           * extend new node with possible source node children
           */
          $this->_extend(&$targetChild,&$sourceChild);
        }

        elseif ( is_array( $sourceChild ) )
        {
          //$this->info( count($sourceChild) . " nodes.");
          /*
           * we need to copy over an array of nodes
           */
          foreach ( $sourceChild as $s )
          {
            /*
             * ignore non-object array members
             */
            if ( !is_object($s) )
            {
              $this->warn("No valid child node: " . gettype($s));
              continue;
            }

            /*
             * source node attributes
             */
            $sAttr = $s->attributes();
            
            /*
             * skip child node if target has a node that replaces 
             * this node
             */
            $srcChildName = $sAttrs['name'];
            //$this->info("<$tag name='$name'>");
            if ( $srcChildName and $this->getChildNodeByAttribute(&$target, "replace", $srcChildName ) )
            {
              //$this->info("$srcChildName exists, not adding node...");
              continue;
            }
            
            /*
             * add new child to target node 
             */
            $cdata = $this->getData(&$s);
            //$this->info("Creating sibling node $tag");
            $targetChild =& $target->addChild($tag,$cdata);
            
            /*
             * copy attributes to new node
             */
            foreach($s->attributes() as $key => $value )
            {
              $targetChild->addAttribute($key,$value);
            }
            
            /*
             * extend this new node with children of source
             * node, if any
             */
            $this->_extend(&$targetChild,&$s);
          }
        }
        else
        {
          /*
           * ignore invalid source element
           */ 
          $this->warn("Invalid source element: " . gettype($sourceChild));
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
   * removes the lock of the present xml file
   * @return void
   */
  function removeLock()
  {
    parent::removeLock($this->cacheId);
  }
  
  /**
   * destructor: removes the lock on the xmlfile, so that other processes can read or write it.
   */
  function __destruct()
  {
    $this->removeLock();
    parent::__destruct();
  }
  
}


?>