<?php

/**
 * class to convert from one text encoding to another
 */

require_once("qcl/jsonrpc/model.php");

class qcl_encoding_converter extends qcl_jsonrpc_model 
{

  var $method   = "POST";  // only post is implemented so far
  var $data     = null;
  var $headers  = array();
 
 /**
  * constructor
  * @return 
  * @param $controller Object
  * @param $method Object[optional]
  * @param $data Object[optional]
  */
  function __construct ( $controller, $method="POST", $data=null )
  {
    parent::__construct( &$controller );
    $this->setData($data);
    $this->setMethod($method);
  }
  
  function setMethod( $method )
  {
    if ( $method != "POST" )
    {
      $this->raiseError("Method $method not implemented.");
    }
    $this->method = $method;
  }
  
  function getMethod()
  {
    return $this->method;
  }
  
  function setData( $data )
  {
    $this->data = $data;
  }
  
  function getData()
  {
    return $this->data;
  }

  function setUrl( $url )
  {
    $this->url = $url;
  }
  
  function getUrl()
  {
    return $this->url;
  }
  
  
  function addHeader ( $header )
  {
    $this->headers[] = $header;
  }
  
  /**
   * sends the request depending on method and PHP version
   * @return 
   */
  function send()
  {
    $headers = implode( "\n", $this->headers );
    if ( ! count( $headers ) ) $headers = null;
    
    if ( $method == "POST" )
    {
      if ( PHP_VERSION >= 5 )
      {
        $this->post_request_php5( $this->url, $this->data, $headers );
      } 
      else
      {
        $this->post_request_php4( $this->url, $this->data, $headers );
      } 
    }
    
  }
  
  /**
   * post request using php5 functions 
   * taken from http://netevil.org/blog/2006/nov/http-post-from-php-without-curl
   * @return 
   * @param $url Object
   * @param $data Object
   * @param $optional_headers Object[optional]
   */
  function post_request_php5($url, $data, $optional_headers = null)
  {
    $params = array(
      'http' => array(
        'method' => 'POST',
        'content' => $data
    ));
    if ($optional_headers !== null) {
       $params['http']['header'] = $optional_headers;
    }
    $ctx = stream_context_create($params);
    $fp = @fopen($url, 'rb', false, $ctx);
    if (!$fp) {
       throw new Exception("Problem with $url, $php_errormsg");
    }
    $response = @stream_get_contents($fp);
    if ($response === false) {
       throw new Exception("Problem reading data from $url, $php_errormsg");
    }
    return $response;
 }


  /**
   * post request using php4 functions
   * taken from http://www.enyem.com/wiki/index.php/Send_POST_request_(PHP)
   * @return 
   * @param $url Object
   * @param $data Object
   * @param $optional_headers Object[optional]
   */
  function do_post_request_php4($url, $data, $optional_headers = null) 
  {
  	$start = strpos($url,'//')+2;
  	$end = strpos($url,'/',$start);
  	$host = substr($url, $start, $end-$start);
  	$domain = substr($url,$end);
  	$fp = pfsockopen($host, 80);
  	if(!$fp) return null;
  	fputs ($fp,"POST $domain HTTP/1.1\n");
  	fputs ($fp,"Host: $host\n");
  	if ($optional_headers) {
  		fputs($fp, $optional_headers);
  	}
  	fputs ($fp,"Content-type: application/x-www-form-urlencoded\n");
  	fputs ($fp,"Content-length: ".strlen($data)."\n\n");
  	fputs ($fp,"$data\n\n");
  	$response = "";
  	while(!feof($fp)) {
  		$response .= fgets($fp, 1024);
  	}
  	fclose ($fp);
  	return $response;
  } 
  
}

?>