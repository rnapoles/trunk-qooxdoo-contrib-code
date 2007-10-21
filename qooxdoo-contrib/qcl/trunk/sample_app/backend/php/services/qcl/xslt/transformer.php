<?php
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
	 * @return string transformed xml
	 */
    function transform($xml,$xsl,$params=null,$debugfile=null)
    {
        
		if ( function_exists( "domxml_open_file" ) )
		{
			// php-domxml-extension
			
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
		else
		{
			$this->raiseError("dom_xml extension is not installed.");
		}

    }


}