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
  var $error;
    
  /**
   * constructor
   **/
  function __construct( $xml )
  {
    if ( PHP_VERSION < 5 )
    {
      require_once('qcl/lib/class/IsterXmlSimpleXMLImpl.php');
      $this->doc = new IsterXmlSimpleXMLImpl;
      if ( str_len($xml) < 255 and @is_file( $xml ) )
      {
        $this->doc->load_file($xml);
      }
      else
      {
        $this->doc->load_string($xml);
      }
    }
    else
    {
      if ( str_len($xml) < 255 and @is_file( $xml ) )
      {
        $this->doc = simplexml_load_file($xml);
      }
      else
      {
        $this->doc = simplexml_load_string($xml);
      }
    }
  }
  
  /**
   * get the root of the document, use this for cross-version compatibility
   */
  function &getRoot()
  {
    if ( PHP_VERSION < 5 )
    {
      return $this->doc->root;
    }
    else
    {
      return $this->doc;
    }
  }  

}


?>