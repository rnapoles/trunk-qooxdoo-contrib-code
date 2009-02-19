<?php

/*
 * dependencies
 */
require_once "qcl/xml/__init__.php";
require_once "qcl/jsonrpc/model.php";
require_once "qcl/io/filesystem/IFile.php";
require_once "qcl/io/filesystem/Resource.php";
require_once "qcl/io/filesystem/local/File.php";
require_once "qcl/db/SimpleModel.php";
// do not require_once "qcl/persistence/db/Object.php"; this results in a deadlock

/**
 * Persistent class to cache xml object data.
 * 
 * @todo
 * function enc($x){
 * return base64_encode(bzcompress(serialize($x),9));
}

function dec($x){
  return unserialize(bzdecompress(base64_decode($x)));
}
 */
class qcl_xml_simpleXmlCache extends qcl_persistence_db_Object
{
  /*
   * file modification timestamp
   * @var string
   */
  var $lastModified;
  
  /*
   * the xml document tree
   * @var simpleXMLDocument
   */
  var $doc;
}

/**
 * Class providing a cross-version (php4/5) simple xml 
 * representation as a php object. This class also provides 
 * caching of the object that is parsed from the xml and 
 * persisted on a per-file, per-user, or per-session basis. 
 * That is, differently manipulated copies of the original xml data
 * file data can coexist. By default, the caching is done by 
 * the qcl_persistence_db_Object class, which ensures that
 * data by no longer existing users or sessions is automatically
 * deleted. 
 * @see qcl_xml_SimpleXmlStorage::getCacheObject() for details
 * 
 **/
class qcl_xml_simpleXmlStorage extends qcl_jsonrpc_model
{
 
  /**
   * file object if xml is in a file
   * @var qcl_io_filesystem_IFile
   */
  var $file; 

  /**
   * XML string if loaded from string
   */
  var $xml;
  
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
   * If a separate copy for a user should be kept, set
   * this property to the user id
   */
  var $userId = null;
  
  /**
   * If a separate copy for a session should be kept, set
   * this property to the user id
   */
  var $sessionId = null;
  
  /**
   * modification date of xml file, if parsed from file
   * @var string
   */
  var $lastModified;
  
  /**
   * flag for indicating if the xml source for the document
   * has changed
   * @var bool
   */
  var $hasChanged = false;
  
  /**
   * the document object
   * @var SimpleXmlElement or SimpleXmlTag object
   */
  var $doc;
  
  /**
   * Array of atrributes which will be indexed for fast access (PHP4 only) 
   * @var array
   */
  var $indexedAttributes = array();
  
  /**
   * The cache object
   * @var qcl_xml_simpleXmlCache
   */
  var $_cacheObj;
   
  /**
   * Constructor
   * @param qcl_jsonrpc_controller $controller instance
   * @param qcl_io_filesystem_IFile|string $fileOrString Xml string, file name or object implementing 
   * qcl_io_filesystem_IFile 
   * @param string $cacheId Id with which to cache xml data, if it is a string (file cache ids are overwritten
   * internally).
   * @param array $indexedAttributes (PHP4 only) Array of atrributes which will be indexed for fast access
   **/
  function __construct( $controller, $fileOrString=null, $cacheId=null, $indexedAttributes=array() )
  { 
    /*
     * parent constructor
     */
    parent::__construct( &$controller );

    /*
     * If php4, use simplexml backport library
     */
    if ( PHP_VERSION < 5 )
    {
      require_once 'qcl/xml/parser_php4.php';
    }


    /*
     * Do we have an xml string?
     */
    if ( is_string($fileOrString) )
    {
      if ( substr($fileOrString,0,5) == "<?xml" )
      {
        /*
         * Yes, save it
         */
        $this->xml = $fileOrString;
        
        /*
         * Cache id, if given
         */
        $this->cacheId = $cacheId;    
      }
      
      /*
       * No, if string, convert string file name to qcl file object
       */
      else
      {
        $fileOrString =& qcl_io_filesystem_Resource::createInstance( &$controller, "file://" . $fileOrString );
      }
    }
    
    /*
     * If file, save it and generate cache id.
     */
    if ( ! $this->xml  )
    {
      if ( is_qcl_file( $fileOrString ) )
      { 
        $this->file =& $fileOrString;  
        $this->cacheId = $this->file->resourcePath(); 
      }
      else
      {
        $this->raiseError("Invalid xml data '" . get_var_type($fileOrString) .  "'");
      }
    }
        
    /*
     * indexed arrays (PHP4 only)
     */
    $this->indexedAttributes = $indexedAttributes;
    
  }
  
  /**
   * Make the cached copy of the xml data specific to a user
   *
   * @param int $userId
   */
  function setOwnedByUserId( $userId )
  {
    if ( ! $userId or ! is_integer( $userId ) )
    {
      $this->raiseError("Invalid user id '$userId'");
    }
    $this->userId = $userId;
    $this->sessionId = null;
  }
  
  /**
   * Make the cached copy of the xml data specific to a session
   *
   * @param unknown_type $userId
   */
  function setOwnedBySessionId( $sessionId )
  {
    if ( ! $sessionId or ! is_string( $sessionId ) )
    {
      $this->raiseError("Invalid session id '$sessionId'");
    }
    $this->userId = null;
    $this->sessionId = $sessionId;
  }  
  
  /**
   * Creates a new file with optional content but only if it
   * doesn't exist already, then load document.
   * @return void
   */
  function createFile( $xml="" )
  {
    $controller =& $this->getController();
    
    if ( ! is_object( $this->file ) )
    {
      $this->raiseError("No file object to create.");
    }
    
    $path = $this->file->resourcePath();
    if ( $this->file->exists() ) 
    {
      $this->raiseError("File exists!");
    }

    if ( ! $xml )
    {
      $xml = '<?xml version="1.0" encoding="utf-8"?><root/>';
    }
    
    /*
     * create file and save xml string
     */    
    if ( $this->file->create() and $this->file->save( $xml ) )
    {
      $this->log("Created root node in '$path'...","xml"); 
    }
    else 
    {
      $this->raiseError( $this->file->getError() );  
    }

    /*
     * delete cache
     */
    $this->delete();
    
    /*
     * load document
     */
    $this->load();
    
    
  }
  
  /**
   * Loads xml from  file
   * @return SimpleXmlElement
   **/
  function &load()
  {
    $controller =& $this->getController();
    $file       =& $this->file;
    $cacheId     = $this->cacheId;
    
    /*
     * xml document
     */
    $doc = null;

    /*
     * do we deal with a file or a string?
     */
    $isFile = is_object($file);

    /*
     * last modification timestamp, if from file
     */
    $lastModified  = $isFile ? $file->lastModified() : null;
        
    /*
     * get document from cache
     */
    if ( $cacheId )
    {

      $this->log("Cache Id is: $cacheId","xml");
      
      /*
       * get cached document
       */
      $cacheObj =& $this->getCacheObject( $cacheId );
     
    
      if ( ! $cacheObj->isNew() )
      {
        
        /*
         * copy from persistent object
         */
        $doc = $cacheObj->doc;
        
        /*
         * check modification date
         */
        if ( $lastModified )
        { 
          $this->lastModified = $lastModified;
          
          if ( $cacheObj->lastModified )
          {
            $this->log( "Cache file exists with timestamp " . $cacheObj->lastModified, "xml" );
            
            if ( $this->lastModified == $cacheObj->lastModified )
            {
              $this->log("Timestamp matches. Getting xml document object from cache ($cacheId)...","xml");
              
              /*
               * PHP 4: load serialized object
               */
              if ( phpversion() < 5 )
              {
                /*
                 * check if document is valid
                 */
                if ( ! is_object( $doc ) )
                {
                  $this->warn("Invalid cache '$doc' (" . gettype($doc) . ").");
                  $doc = null;   
                } 
              }
              
              /*
               * PHP5: load 
               */
              else
              {
                if ( strlen($doc) )
                {
                  $doc = simplexml_load_string( unserialize( $doc ) );
                }
              }
              
              /*
               * return object if valid
               */
              if ( is_object( $doc ) )
              {
                $this->hasChanged = false;
                $this->doc =& $doc;
                return $doc;
              }
            }
            else
            {
              $this->log("Timestamp doesn't match: Document: {$lastModified}, Cache: {$cacheObj->lastModified}.", "xml" );
            }
          }
          else
          {
            $this->log( "Cache doesn't have a timestamp.", "xml" );
          }
        }
      }
    }
    
    $this->log("No cache available. Parsing document...","xml");
    
    /*
     * object not cached, create it from xml file
     */
    $this->hasChanged = true;
    
    
    /*
     * PHP 4 implementation
     */
    if ( PHP_VERSION < 5 )
    {
      /*
       * use simplexml backport library
       */
      $this->__impl =& new XMLParser;
      
      /*
       * prohibited tag names
       */
      $xmlTag =& new SimpleXmlElement('dummy');
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
        $path = $file->filePath();
        $this->log("Loading document from file $path...","xml");
        $this->doc =& $this->__impl->load_file($path);
      }
      elseif ( is_string ( $this->xml ) )
      {
        $this->log("Loading document from string... " . substr( $this->xml,0,30) . "...", "xml" );
        $this->doc =& $this->__impl->load_string( $this->xml );
        //$this->log($this->doc->asXML()); die;
      }
      else
      {
        $this->raiseError("Cannot load xml data ");
      }
    }
    
    /*
     * PHP 5 implementation
     */
    else
    {
      if ( $isFile )
      {
        $path = $file->filePath();
        $this->log("Loading document from file $path...","xml");
        $this->doc = simplexml_load_file($path);
      }
      elseif ( is_string ( $this->xml ) )
      {
        $this->log("Loading document from string...","xml");
        $this->doc = simplexml_load_string( $this->xml );
      }
      else
      {
        $this->raiseError("Cannot load xml data ");
      }      
    }

    /*
     * cache document object
     */
    if ( $cacheId )
    {
      $this->save();
    }      
     
    return $this->doc;
  }
  
  /**
   * Returns the timestamp of the original xml source, if any.
   * Timestamp format depends on the source.
   * @returm string
   */
  function lastModified()
  {
    return $this->lastModified;
  }
  
  /**
   * Returns the persistent object which caches the xml document. Override
   * this method if you want to implement a different caching mechanism.
   * By default, and qcl_xml_simpleXmlCache instance, which subclasses 
   * qcl_persistence_db_Object, is used. If you provide a user id or session
   * id in the constructor, a separately cached copy will be kept for the user 
   * or the session.
   * @return qcl_xml_simpleXmlCache
   */
  function &getCacheObject( $cacheId )
  {
    if ( ! $cacheId )
    {
      $this->raiseError("No cache id!");
    }
    
    if ( ! $this->_cacheObj )
    {
      $controller =& $this->getController();
      $this->_cacheObj =& new qcl_xml_simpleXmlCache( &$controller, $cacheId, $this->userId, $this->sessionId );
    }
    return $this->_cacheObj; 
  }
  
  
  function deleteCachedObject()
  {
    $this->_cacheObj = null;  
  }
  
  /**
   * Saves parsed xml object tree to the caching storage
   */
  function save()
  {
    $cacheObj =& $this->getCacheObject( $this->cacheId );
    
    /*
     * store modification date
     */ 
    if ( $this->lastModified )
    {
      $cacheObj->lastModified = $this->lastModified;
    }
    
    /*
     * PHP 4: copy xml document tree to cache object
     */
    if ( phpversion() < 5)
    {
      $cacheObj->doc = $this->doc;
    }
    else
    {
      $cacheObj->doc = $this->doc->asXML();
    }
    
    $this->log("Saving xml document object to the cache...","xml");
    
    $cacheObj->save();
  }
  
  /**
   * Deletes the cached object
   */
  function delete()
  {
    $cacheObj =& $this->getCacheObject( $this->cacheId );
    $cacheObj->delete();
    $this->deleteCachedObject();
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
   * @return SimpleXmlElement
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
      //@todo implement
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
   * Cross-version method to get to a node. If a valid node object is
   * passed, return it. If a string is passed, treat it as a path to the
   * node. 
   * PHP4: Path is not real xpath expression (only tag names and tag[3], no queries)
   * Cannot be called statically.
   * @param mixed $pathOrNode (string) simplified xpath or (object) node 
   * @return object node object or NULL if path does not exist 
   */
  function &getNode( $pathOrNode )
  {

    /*
     * check if document has already been parsed 
     */
    if (! is_object ($this->doc) )
    {
      $this->raiseError("No xml document available.");
    } 
    
    /*
     * if the passed var is a node, return it
     */
    if ( is_object($pathOrNode) )
    {
      return $pathOrNode; 
    }
    elseif ( !is_string($pathOrNode) or ! $pathOrNode )
    {
      $this->raiseError("Invalid parameter");  
    }
    
    $path = $pathOrNode;
    
    /*
     * trim "/"
     */
    if ( $path[0] =="/" )
    {
      $path = substr($path,1);
    }
   
    /*
     * traverse object tree along the path
     * 
     */    
    if ( phpversion() >= 5 )
    { 
      $doc    = $this->getDocument();
      $result = $doc->xpath( $path );
      if ( is_array($result) )
      {
        return $result[0];  
      }
      return false;
    }
    
    /*
     * PHP 4
     */ 
    else
    {
      $tmp =& $this->getDocument();      

      $parts = explode("/", $path );
      foreach ( $parts as $part )
      {
        
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
          $this->error = "Path '$path' stuck at '$part' (". gettype($tmp) . ").";
          return null;
        }
      }
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
    elseif ( qcl_xml_SimpleXmlStorage::isNode($pathOrNode) )
    {
      $node =& $pathOrNode;
    }
    else
    {
      qcl_xml_SimpleXmlStorage::raiseError("qcl_simpleXML::getData: invalid parameter.");
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
      //$this->debug("$pathOrNode : $cdata");
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
    if ( ! qcl_xml_SimpleXmlStorage::isNode($node) )
    {
      qcl_xml_SimpleXmlStorage::raiseError("Invalid node.");
    }
    
    /*
     * iterate through children
     */
    $children =& $node->children();
    
    /*
     * PHP4
     */
    if ( phpversion() < 5 )
    {
      while ( list(,$child) = each($children) )
      {
        $attr = $child->attributes();
        $tag  = $child->getName();
          //$this->debug("<$tag $name='{$attr[$name]}' =='$value'? >");
        if ( $attr[$name] == $value )
        {
          return $child;
        }
      }
    }
    
    /*
     * PHP 5
     * @todo use xpath
     */
    else
    {
      foreach ( $children as $child )
      {
        $attr = $child->attributes();
        $tag  = $child->getName();
          //$this->debug("<$tag $name='{$attr[$name]}' =='$value'? >");
        if ( $child[$name] == $value )
        {
          return $child;
        }
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
   * @todo: is this used anywhere? if not, remove
   */
  function removeChildNodeByAttribute($node,$name,$value)
  {
    if ( ! qcl_xml_SimpleXmlStorage::isNode($node) )
    {
      qcl_xml_SimpleXmlStorage::raiseError("Invalid node.");
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
          //$this->debug("Removed node containing $name = $value...","xml");
        if ( phpversion() < 5)
        {
          $node->removeChild($child);
        }
        else
        {
          /*
           * there is no removeChild implementation
           * in SimpleXML
           */                    
          unset( $child );  
        }
      }
    }
    return $found;
  }
  
  
  
  /**
   * save current xml object tree and the cache
   */
  function saveToFile()
  {
    if ( ! is_object( $this->file ) )
    {
      $this->raiseError("No file object to save to.");
    }
    
    $xml = $this->doc->asXML();
    $this->file->save( $xml );
    $this->lastModified = $this->file->lastModified();
    $this->save();
  }
  
  function deleteFile()
  {
    if ( ! is_object( $this->file ) )
    {
      $this->raiseError("No file object to delete.");
    }    
    
    $this->file->delete();
    $this->lastModified = null;
    $this->delete();
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
   * @see qcl_xml_SimpleXmlStorage::_extend
   * @param qcl_xml_SimpleXmlStorage 
   */
  function extend($parentXml)
  {
    if ( is_a( $parentXml, "qcl_xml_SimpleXmlStorage" ) )
    {
      $doc       =& $this->getDocument();
      $parentDoc =& $parentXml->getDocument();  
      
      $this->log("Extending document ...","xml");
      ////$this->debug("Extending \n\n" . $doc->asXml() . "\n\nwith\n\n". $parentDoc->asXml());
      
      $this->_extend(&$doc, &$parentDoc);
      
        //$this->debug("Result: \n\n". $this->asXml() );
      
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
   * compares the attributes of two nodes
   * @param SimpleXmlElement $node1
   * @param SimpleXmlElement $node2
   * @return bool
   */
  function compareAttributes( $node1, $node2 )
  {
    if ( ! is_a( $node1,"SimpleXMLElement" ) or ! is_a( $node2,"SimpleXMLElement" ) )
    {
      $this->raiseError("Invalid parameters: " . gettype($node1) . "," . gettype($node2) );  
    }

    $attrs1 = $node1->attributes();
    $attrs2 = $node2->attributes();
    
    /*
     * if the number of attributes differ, they are not identical
     */ 
    if ( count( $attrs1) != count( $attrs2 ) ) return false;

    /*
     * if both nodes have no attributes, they are identical
     */ 
    if ( ! count( $attrs1) and ! count( $attrs2 ) ) return true;

    /*
     * if one of nodes has no attributes, they are not identical
     */ 
    if ( ! count( $attrs1) or ! count( $attrs2 ) ) return false;
    
    /*
     * check the attributes for differences
     */
    foreach( $attrs1 as $key => $value )
    {
      if ( (string) $attrs2[$key] != (string) $value ) return false;
    }
    foreach( $attrs2 as $key => $value )
    {
      if ( (string) $attrs1[$key] != (string) $value ) return false;
    }
    return true;
  }
  
  function serializeAttributes( $node )
  {
    $attrs = $node->attributes();
    $str   = "";
    foreach( $attrs as $key => $value )
    {
      $str .= $key . '="' . $value . '" ';
    }    
    return $str;
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
    $sourceChildren = $source->children();
    $sourceTag      = $source->getName();
    
      //$this->debug("*************");
      //$this->debug("Parent Node <$sourceTag " . $this->serializeAttributes($source) . ">" );
      //$this->debug(count($sourceChildren) . " children.");
    
    for( $i=0; $i<count($sourceChildren); $i++ )
    {
      
      /*
       * the current source child node to be
       * added to the parent
       */
      $sourceChild =& $sourceChildren[$i];
      
      /*
       * PHP4 hack
       */
      if ( phpversion()  < 5 and  ! is_object($sourceChild) ) continue;
      
      /*
       * the tag name of the source child node
       */
      $tag = $sourceChild->getName();
        //$this->debug("");
      //$this->debug("***** $i. source child node: <$tag " . $this->serializeAttributes($sourceChild) . "> ***" );
           
      /*
       * source child attributes
       */
      $srcChildAttrs = $sourceChild->attributes();
      $srcChildName  = (string) $srcChildAttrs['name'];

      /*
       * Does target child node(s) with same tag exist?
       */
      if ( ! $target->$tag )
      {
        /*
         * no, we can go ahead and add the source child node
         */
        $copy = true;
      }
      else
      {
        /*
         * else, we need to have a closer look
         */
        $targetChildren =& $target->$tag;
        $tChildren = array();
        
        /*
         * We need to create an array for PHP4
         */
        if( phpversion() < 5 and ! is_array($targetChildren) )
        {
          $tChildren[0] =& $targetChildren;
        }
        else
        {
          $tChildren =& $targetChildren;
        }
                
        /*
         * iterate over the target node's children
         */
        $copy = true;
        for ( $j=0; $j<count($tChildren); $j++ )
        {
          
          $targetChild =& $tChildren[$j];
          
            //$this->debug("*** $j. target child node <$tag " . $this->serializeAttributes($targetChild) . ">" );
          /*
           * get target attributes
           */
          $tgtChildAttrs = $targetChild->attributes();    
          
          /*
           * if there are attributes on both sides
           */ 
          if ( count( $tgtChildAttrs ) and count( $srcChildAttrs ) )
          {
            /*
             * skip source child node if a target child node replaces it
             */
            $replace = (string) $tgtChildAttrs['replace'];
            if ( $replace == $srcChildName ) 
            {
                //$this->debug("<$tag replace='$srcChildName' /> exists, not adding child node...");
              $copy=false; break;
            }
            
            /*
             * check if source 'extends' a 'name' attribute 
             */
            $extends = (string) $tgtChildAttrs['extends'];
            if ( $extends == $srcChildName )
            {
              /*
               * extend the node
               */
                //$this->debug("Extending <$tag extends='$extends'> with <$tag name='$srcChildName'>.");
              $this->_extend( &$targetChild, &$sourceChild );
              
              /*
               * add missing attributes
               */
              foreach( $srcChildAttrs as $key => $value )
              {
                if ( ! $tgtChildAttrs[$key] )
                {
                    //$this->debug("Adding attribute '$key' with value '$value'.");
                  $targetChild->addAttribute( $key, $value );
                }
              }
              $copy=false; break;
            }
            
            /*
             * or the attributes are identical
             */
            elseif ( $this->compareAttributes( $sourceChild, $targetChild ) )
            {
              /*
               * extend the node
               */
                //$this->debug("Extending <$tag> with tag with identical attributes.");
              $this->_extend( &$targetChild, &$sourceChild );
              $copy = false; break ;
            }
             
            /*
             * tags are not identical, copy node
             */
            else
            {
                //$this->debug("Tag <$tag /> exists in target and source but with different attributes");
            }          
          }
          
          /*
           * or there are no attributes 
           */
          elseif ( ! count($tgtChildAttrs) and ! count($srcChildAttrs) )
          {
            /*
             * extend node without attributes
             */
              //$this->debug("Extending <$tag>.");
            $this->_extend( &$targetChild, &$sourceChild );
            $copy = false; break;
          }
         
           /*
           * tags are not identical, copy node
           */
          else
          {
              //$this->debug("Tag <$tag /> exists in target and source but with different attributes");
          }
  
        } 
      }
      
      if ( $copy ) 
      {
        /*
         * end of iterating through target child nodes with the same tag.
         * we did not find a matching node, so we add our source child node
         * to the target parent
         */
               
        /*
         * add source child to target node 
         */
        $cdata = trim( $this->getData(&$sourceChild) );
        $newTargetChild =& $target->addChild( $tag, $cdata );
        
          //$this->debug("Creating single node <$tag>$cdata</$tag>.");
        
        foreach( $srcChildAttrs as $key => $value )
        {
            //$this->debug("Adding attribute '$key' with value '$value'.");
          $newTargetChild->addAttribute( $key, $value );
        }
        
        /*
         * extend new node with possible source node children
         */
        if ( count( $sourceChild->children() ) )
        {
            //$this->debug("Adding children to new node...");
          $this->_extend( &$newTargetChild, &$sourceChild );
        }
        else
        {
            //$this->debug("Next source child node ...");  
        }
      }
    }
    

      //$this->debug("End of child nodes of <$sourceTag " . $this->serializeAttributes($source) . ">" );
      //$this->debug("^^^^^^^^^^^^^^^^^^^^^");
  }
  
  /**
   * Returns the current document as (optionally pretty-printed) xml
   * @param bool $pretty Pretty-print result XML
   * @return string
   */
  function asXML($pretty=true)
  {
    if ( $pretty and phpversion() >5 )
    {
      $doc = new DOMDocument('1.0');
      $doc->preserveWhiteSpace = false;
      $doc->loadXML($this->doc->asXML());
      $doc->formatOutput = true;
      return $doc->saveXML();
    }
    return $this->doc->asXML();
  }

  
}
?>