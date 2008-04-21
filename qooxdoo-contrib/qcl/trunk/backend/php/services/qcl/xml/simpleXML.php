<?php

/**
 * wrapper around native PHP5 simpleXML implementation and
 * PHP4 IsterXmlSimpleXML pure php4 backport (see http://www.ister.org/code/simplexml44/index.html)
 * be aware of the differences:
 * <ul>
 * <li>The access to the root node has to be explicit in IsterXmlSimpleXMLImpl, not implicit as with PHP5. Write $doc->root->node instead of $doc->node</li>
 * <li>You cannot access CDATA using array syntax. Use methods CDATA() and setCDATA() instead.</li>
 * <li>You cannot access attributes directly with array syntax. Always use attributes() to read and setAttribute() to write attributes.</li>
 * <li>Comments are ignored.</li>
 * <li>Last and least, this is not as fast as PHP5 SimpleXML--it's pure PHP4.</li>
 * </ul>
 **/
class qcl_xml_simpleXML extends qcl_object
{

  var $__impl = null; // simple xml implementation
  
  /**
   * constructor
   **/
  function __construct( $xml )
  {
    if ( PHP_VERSION < 5 )
    {
      require_once('qcl/lib/simplexml44/class/IsterXmlSimpleXMLImpl.php');
      $this->__impl =& new IsterXmlSimpleXMLImpl;
      if ( is_valid_file( $xml ) )
      {
        $this->doc =& $this->__impl->load_file($xml);
      }
      elseif ( is_string ( $xml ) )
      {
        $this->doc =& $this->__impl->load_string($xml);
      }
      else
      {
        $this->raiseError("Invalid parameter " . $xml );
      }
    }
    else
    {
      if ( is_valid_file( $xml ) )
      {
        $this->doc = simplexml_load_file($xml);
      }
      elseif ( is_string ( $xml ) )
      {
        $this->doc = simplexml_load_string($xml);
      }
      else
      {
        $this->raiseError("Invalid parameter " . $xml );
      }      
    }
  }
  
  
  /**
   * get the root of the document, use this for cross-version compatibility
   */
  function &getRoot()
  {
    if ( $this->__imp )
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
   * @param mixed $pathOrNode (string) path (only unique tag names, not a XPATH query) or (object) node 
   * @return CDATA content or NULL if path does not exist 
   */
  function getData($pathOrNode)
  {
    if ( is_object($pathOrNode) )
    {
      $tmp =& $pathOrNode;
    }
    else
    {
      if (! is_object ($this->doc) )
      {
        $this->raiseError("No xml document available.");
      }
      
      $tmp =& $this->doc;
      
      foreach ( explode("/",$path) as $part )
      {
        if ( !$path ) continue; // ignore initial "//"
  
        $tmp =& $tmp->$part;
        if (! is_object ($tmp) )
        {
          $this->error = "Path '$path' stuck at '$part'.";
          return null;
        }
      }
    }
        
    if ( $this->__impl )
    {
      return $tmp->CDATA();
    }
    else
    {
      return (string) $tmp;
    }
  }
  
  
}


?>