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
	 * @param mixed $xml string or filename of xml file to transform
	 * @param mixed $xsl string or filename of xslt file to transform xml with
	 * @param array $parameters an associated array to pass to the xsl as top-level parameters
	 * @param string $fileBase file base for stylesheets 
	 * @param string $target optional filename to write xml to
	 * @return string transformed xml
	 */
    function transform($xml,$xsl,$parameters=null,$filebase=null,$target=null)
    {
        
		if ( function_exists( "domxml_open_file" ) )
		{
			// php-domxml-extension
			
			$domXmlObj 	= @is_file($xml) ? 
				domxml_open_file($xml): 
				domxml_open_mem ($xml);
			$domXsltObj = @is_file($xsl) ? 
				domxml_xslt_stylesheet_file($xsl) : 
				domxml_xslt_stylesheet_doc(domxml_open_mem ($xsl));
			
			// process
			$domTranObj = $domXsltObj->process($domXmlObj);
			return $domXsltObj->result_dump_mem($domTranObj);			
			
		}
		else
		{
	        // php-xslt extension with sablotron
	        // just a headache! install domxml extension!!
	        
	        // prepare arguments
	        $arguments = array();
	        if ( @is_file ($xml) )
	        {        
				$xml = join('', file($xml) );
	        }
	        
	        if ( @is_file ($xsl) )
	        {
	        	$xsl = join('', file($xsl) );
	        }
	
	        $arg_buffer = array('/xml' => $xml, '/xsl' => $xsl);
	        
	        // Allocate a new XSLT processor
	        $xh = xslt_create();
	        
	        // set file base
	        if ( $filebase )
	        { 
	        	xslt_set_base ( $xh, 'file://' . $filebase );
	        } 
	        
	        // Make $this object the callback resolver and set error handler
	       	xslt_set_object($xh, $this);
	        xslt_set_error_handler($xh, "error_handler");
	        
	        // logging
	        $this->logfile = SERVICE_PATH . "bibliograph/var/log/xslt.log";
	        @unlink ( $this->logfile );
	        
	        xslt_set_log($xh, true);
			xslt_set_log($xh, $this->logfile );
	        
	        // Process the document
	        $result = @xslt_process(
	        	$xh, 'arg:/xml', 'arg:/xsl', $target, $arg_buffer, $parameters 
	        );
	        
	        xslt_free($xh);
	        
	        return $result;			
		}

    }

	/**
	 * error handler for sablotron
	 */
	function error_handler($handler, $errno, $level, $info)
   	{
		$error = "XSLT error: \n";
		foreach ($info as $key => $value )
		{
			$error .= addslashes("$key: $value") . "\n";	
		}
		$error .= file_get_contents($this->logfile);
		$this->log($error);
		$this->raiseError($error);
	}
}