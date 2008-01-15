<?php

// dependencies
require_once ("qcl/jsonrpc/model.php");

/**
 * Component to do XSLT - Transformations
 **/
class qcl_xml_reader extends qcl_jsonrpc_model
{
    var $error;
    
  /**
	 * constructor
	 **/
  function __construct( $controller )
  {
    if ( ! function_exists("domxml_open_mem") )
    {
      $this->raiseError("Cannot parse xml document: domxml-extension is not installed!");
    }
    parent::__construct( &$controller);
  }

  /**
   * loads an xml document from a string
   * @return boolean
   * @param $xmlstr string
   */
  function loadFromString ( $xmlstr )
  {
    if ( ! $dom = domxml_open_mem($xmlstr, DOMXML_LOAD_RECOVERING, &$error ) ) 
    {
      $this->error = "qcl_xml_reader::loadFromString: Error while parsing the document:" . print_r( $error, true );
      return false;
    }
    $this->dom =& $dom;
    return true;
  }

  /**
   * 
   * @return boolean
   * @param $file string
   */
  function loadFromFile ( $file )
  {
    if ( ! $dom = domxml_open_file( $file, DOMXML_LOAD_RECOVERING, &$error ) ) 
    {
      $this->error = "qcl_xml_reader::loadFromFile: Error while parsing the document: " . print_r( $error, true );
      return false;
    }
    $this->dom =& $dom;
    return true;
  }

  /**
   * 
   * @return boolean
   * @param $doc DomDocument
   */
  function loadDocument ( $doc )
  {
    if ( ! stristr( $doc, "DomDocument" ) ) 
    {
      $this->error = "qcl_xml_reader::loadDocument: Passed argument is not a DomDocument";
      return false;
    }
    $this->dom =& $doc;
    return true;
  }
  
  /**
   * gets the current DomDocument
   * @return DomDocument
   */
  function &getDocument()
  {
    return $this->dom;
  }

  /**
   * executes an xpath (1.0) query on the current document
   * @return XPathObject
   */
	function evalXpath( $expr) 
  {
    $xpCxt =& $this->dom->xpath_new_context();
    $xpObj =& $xpCxt->xpath_eval_expression($expr);
    return $xpObj;
  }
  
  /**
   * gets the value of the first element an xpath query
   * @return 
   * @param $xpObj XPathObject
   * @param $attrName string
   */
  function &getXpathValue( $expr )
  {
    $xpObj     =& $this->evalXpath( $expr );
    $firstNode =& $xpObj->nodeset[0];
    //$this->info(array( $xpObj, $firstNode, $firstNode->get_content() ) );
    if ( is_object( $firstNode )  )
    {
      return $firstNode->get_content();
    }
    return null;
  }

  /**
   * gets the string content of the first element an xpath query
   * @return 
   * @param $xpObj XPathObject
   * @param $attrName string
   */
  function &getXpathDump( $expr, $withContainingElement=true )
  {
    $xpObj     =& $this->evalXpath( $expr );
    $firstNode =& $xpObj->nodeset[0];
    //$this->info(array( $xpObj, $firstNode ) );
    //$this->info($this->dom->dump_mem( 2,"utf-8"));
    if ( is_object( $firstNode )  )
    {
      $doc =& domxml_new_doc("1.0");
      $doc->append_child( $firstNode->clone_node( true ) );
      $xmlString = $doc->dump_mem( 2,"utf-8");
      return $xmlString;
    }
    return null;
  }


}