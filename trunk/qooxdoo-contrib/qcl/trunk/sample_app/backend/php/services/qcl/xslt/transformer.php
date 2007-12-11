<?php

// dependencies
require_once ("qcl/jsonrpc/model.php");
require_once ("qcl/java/shell.php");

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
        $this->controller 	=& $controller;
    }

	/**
	 * transforms xml data with xsl stylesheet
	 * @param mixed 	$xml 		string or filename of xml file to transform
	 * @param mixed 	$xsl 		string or filename of xslt file to transform xml with
	 * @param array 	$params 	an associated array to pass to the xsl as top-level parameters
	 * @param string	$version	XSLT version ("1.0" or "2.0"). XSLT 2.0 conversions require the java saxon library
	 * @return string transformed xml
	 */
    function transform ($xml,$xsl,$params=null,$version="1.0")
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
    		return $this->_useSaxonViaShell($xml,$xsl,$params=null,$debugfile=null);
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
	 * through the shell
	 * @param mixed 	$xml 		string or filename of xml file to transform
	 * @param mixed 	$xsl 		string or filename of xslt file to transform xml with
	 * @param array 	$params 	an associated array to pass to the xsl as top-level parameters
	 * @param string 	$debugfile 	file to write debug information to 
	 * @return string transformed xml
	 */ 
    function _useSaxonViaShell($xml,$xsl,$params=null,$debugfile=null)
	{	 		
		// write xml to file if string
		if ( !@is_file($xmlFile=$xml) )
		{
			$xmlFile = $this->store(".xml",$xml);  
		}
		
		// write xsl to file if string
		if ( !@is_file($xslFile=$xsl) )
		{
			$xslFile = $this->store(".xsl",$xsl);  
		}
		
		$descriptorspec = array (
		   1 => array("pipe", "w"),  // stdout is a pipe that the child will write to
		   2 => array("pipe", "w")   // stderr is a pipe that the child will write to
		);

		// start process
		$saxoncmd = "java -jar " . SAXON_DIR . "saxon8.jar";
		$cmd	  = "$saxoncmd -s $xmlFile $xslFile"; 
		$process  = proc_open($cmd, $descriptorspec, $pipes);		
		
		// get results from process
		if (is_resource($process)) 
		{
		    $stdout = $pipes[1];
		    $stderr = $pipes[2];
		    $result = ""; 
		    $error  = ""; 
		    
		    // output
		    while ( !feof($stdout) ) $result .= fgets($stdout,1024);
			fclose($stdout);
			
			// error
			while ( !feof($stderr) ) $error .= fgets($stderr,1024);
			fclose($stderr);
			
			$this->error = $cmd . "=>" . $error; 
		    
			proc_close($process);
		}
		else
		{
			$this->error ="Could not start process";
			return false;
		}
		
		// Delete temporary files
		if ($xml != $xmlFile) unlink ($xmlFile);
		if ($xsl != $xslFile) unlink ($xslFile);

		// Done!
		return $result;
	}
    
	/**
	 * transforms xml data with xsl stylesheet using the java saxon package (XSLT 2.0)
	 * by way of the JavaBridge extension
	 * @param mixed 	$xml 		string or filename of xml file to transform
	 * @param mixed 	$xsl 		string or filename of xslt file to transform xml with
	 * @param array 	$params 	an associated array to pass to the xsl as top-level parameters
	 * @param string 	$debugfile 	file to write debug information to 
	 * @return string transformed xml
	 */ 
    function _useSaxonViaJavaBridge($xml,$xsl,$params=null,$debugfile=null)
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
		
		$xslFile = SERVICE_PATH . "qcl/java/java/oaimarc_to_marcxml.xsl";
		$xmlFile = "qcl/java/java/oai_marc.xml";
		if (
			$oXslSource = new java("javax.xml.transform.stream.StreamSource", "file://".$xslFile) and
			$oXmlSource = new java("javax.xml.transform.stream.StreamSource", "file://".$xmlFile) and
			$oFeatureKeys = new JavaClass("net.sf.saxon.FeatureKeys") and
			$oTransformerFactory = new java("net.sf.saxon.TransformerFactoryImpl")
		) {} else 
		{
			return $this->javaError();
		}
		
		//Disable source document validation
		//$oTransformerFactory->setAttribute($oFeatureKeys->SCHEMA_VALIDATION, 4);
		
		// Create a new Transformer
		if ( ! $oTransFormer = $oTransformerFactory->newTransformer($oXslSource) )
		{
			$this->log($xslFile);
			return $this->javaError();
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
	function javaError()
	{
		$ex = java_last_exception_get();
		if ( is_object($ex) )
		{
			$trace = new java("java.io.ByteArrayOutputStream");
	   		$ex->printStackTrace(new java("java.io.PrintStream", $trace));
			$this->error = java_cast($trace,"string");		
			return false;			
		}
	}
}