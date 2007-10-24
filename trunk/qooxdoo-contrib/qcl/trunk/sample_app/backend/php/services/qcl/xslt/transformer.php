<?php

// dependencies
require_once ("qcl/jsonrpc/model.php");

// Directory where the jar files are located
define("SAXON_DIR", SERVICE_PATH . "qcl/xslt/saxon/" );

/**
 * Component to do XSLT - Transformations
 **/
class qcl_xslt_transformer extends qcl_jsonrpc_model
{
    var $error;
    
    /**
	 * constructor
	 **/
    function __construct( &$controller )
    {
        $this->controller 	= &$controller;
    }

	/**
	 * transforms xml data with xsl stylesheet
	 * @param mixed 	$xml 		string or filename of xml file to transform
	 * @param mixed 	$xsl 		string or filename of xslt file to transform xml with
	 * @param array 	$params 	an associated array to pass to the xsl as top-level parameters
	 * @param string 	$debugfile 	file to write debug information to 
	 * @param string	$version	XSLT version ("1.0" or "2.0"). XSLT 2.0 conversions require the javabridge extension
	 * @return string transformed xml
	 */
    function transform ($xml,$xsl,$params=null,$debugfile=null,$version="1.0")
    {
    	if ( $version < 2 )
    	{
    		if ( PHP_VERSION < 5 )
    		{
    			if ( function_exists( "domxml_open_file" ) )
    			{
    				return $this->_useDomXml($xml,$xsl,$params=null,$debugfile=null);	
    			}
				else
				{
					$this->raiseError("dom_xml extension is not installed.");
				}	
    		}
    		else
    		{
    			return $this->_useLibxslt($xml,$xsl,$params=null,$debugfile=null);
    		}
    	}
    	else
    	{
    		$this->_useSaxon($xml,$xsl,$params=null,$debugfile=null);
    	}
    }
    
	/**
	 * transforms xml data with xsl stylesheet using the php domxml extension (XSLT 1.0, PHP4 only)
	 * @param mixed 	$xml 		string or filename of xml file to transform
	 * @param mixed 	$xsl 		string or filename of xslt file to transform xml with
	 * @param array 	$params 	an associated array to pass to the xsl as top-level parameters
	 * @param string 	$debugfile 	file to write debug information to 
	 * @return string transformed xml
	 */
    function _useDomXml($xml,$xsl,$params=null,$debugfile=null)
    {
		$domXmlObj 	= @is_file($xml) ? 
			domxml_open_file($xml): 
			domxml_open_mem ($xml);
		if ( ! is_object($domXmlObj) )
		{
			file_put_contents($debugfile,$xml);
			$this->error = ("Invalid xml data");
			return false;
			
		}
		
		$domXsltObj = @is_file($xsl) ? 
			domxml_xslt_stylesheet_file($xsl) : 
			domxml_xslt_stylesheet_doc(domxml_open_mem ($xsl));
		
		if ( ! is_object($domXmlObj) )
		{
			file_put_contents($debugfile,$xsl);
			$this->error = ("Invalid xsl data");
			return false;
		}
		
		$domTranObj = $domXsltObj->process($domXmlObj,$params,false,$debugfile);
		
		// process
		if ( is_object ($domTranObj) )
		{
			return $domXsltObj->result_dump_mem($domTranObj);		
		}
		else
		{
			$message = "Transformation failed";
			$this->error = ($message);	
			return false;
		}	
    }
    
   	/**
	 * transforms xml data with xsl stylesheet using the php libxslt extension (XSLT 1.0, PHP5 only) 
	 * this requires the presence of the JavaBridge extension
	 * @param mixed 	$xml 		string or filename of xml file to transform
	 * @param mixed 	$xsl 		string or filename of xslt file to transform xml with
	 * @param array 	$params 	an associated array to pass to the xsl as top-level parameters
	 * @param string 	$debugfile 	file to write debug information to 
	 * @return string transformed xml
	 */
    function _useLibxslt($xml,$xsl,$params=null,$debugfile=null)
    {
		$this->raiseError("Not yet implemented");
		/*
		$doc = new DOMDocument();
		$xsl = new XSLTProcessor();
		
		$doc->load($xsl_filename);
		$xsl->importStyleSheet($doc);
		
		$doc->load($xml_filename);
		$xsl->setParameter('', 'name', $value);
		return  $xsl->transformToXML($doc);
		 */    	
    }
    
	/**
	 * transforms xml data with xsl stylesheet using the java saxon package (XSLT 2.0)
	 * this requires the presence of the JavaBridge extension
	 * @param mixed 	$xml 		string or filename of xml file to transform
	 * @param mixed 	$xsl 		string or filename of xslt file to transform xml with
	 * @param array 	$params 	an associated array to pass to the xsl as top-level parameters
	 * @param string 	$debugfile 	file to write debug information to 
	 * @return string transformed xml
	 */ 
    function _useSaxon($xml,$xsl,$params=null,$debugfile=null)
	{
		// include the jars
		java_require(
			SAXON_DIR . 	"saxon8.jar;" . 
			SAXON_DIR . 	"saxon8-dom.jar;"  . 
			SERVICE_PATH . 	"qcl/java/java/ErrorListener.jar"
		);
		 		
		// write xml to file if string
		if ( !@is_file($xmlFile=$xml) )
		{
			$xmlFile = $this->store(microtime().".xml",$xml);  
		}
		
		// write xsl to file if string
		if ( !@is_file($xslFile=$xsl) )
		{
			$xslFile = $this->store(microtime().".xsl",$xsl);  
		}
		
		if (
			$oXslSource = new java("javax.xml.transform.stream.StreamSource", "file://".$xslFile) and
			$oXmlSource = new java("javax.xml.transform.stream.StreamSource", "file://".$xmlFile) and
			$oFeatureKeys = new JavaClass("net.sf.saxon.FeatureKeys") and
			$oTransformerFactory = new java("net.sf.saxon.TransformerFactoryImpl") and
			$oErrorListenerStringWriter = new java("java.io.StringWriter") and
			$oErrorListener	= new java("ErrorListenerImpl",&$oErrorListenerStringWriter)
		) {} else 
		{
			return $this->javaError();
		}
					
		//Disable source document validation
		$oTransformerFactory->setAttribute($oFeatureKeys->SCHEMA_VALIDATION, 4);
		$oTransformerFactory->setErrorListener($oErrorListener);
		
		// Create a new Transformer
		if ( ! $oTransFormer = $oTransformerFactory->newTransformer($oXslSource) )
		{
			$this->log($xslFile);
			return $this->javaError($oErrorListenerStringWriter);
		}
				   
		// Create a StreamResult to store the output
		$oResultStringWriter = new java("java.io.StringWriter");
		$oResultStream = new java("javax.xml.transform.stream.StreamResult", $oResultStringWriter);
		 
		// Transform
		$oTransFormer->transform($oXmlSource, $oResultStream);
		
		// Echo the output from the transformation
		$result = java_cast($oResultStringWriter->toString(), "string");

		// Delete temporary files
		if ($xml != $xmlFile) unlink ($xmlFile);
		if ($xsl != $xslFile) unlink ($xslFile);
		
		// Done!
		return $result;
	}
	 

	/**
	 * log a java error
	 */
	function javaError($oErrorListenerStringWriter=null)
	{
		$ex = java_last_exception_get();
		$trace = new java("java.io.ByteArrayOutputStream");
   		$ex->printStackTrace(new java("java.io.PrintStream", $trace));
		$this->error = java_cast($trace,"string");
		
		if ( $oErrorListenerStringWriter )
		{
			$this->error .= "Error Listener says:" . java_cast($oErrorListenerStringWriter->toString(), "string");
		}
		
		return false;
	}
}