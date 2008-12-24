<?php
/*
 * depemdencies
 */
require_once ("qcl/jsonrpc/model.php");

/**
 * http request model
 * @todo rename into qcl_net_httpRequest
 */
class qcl_http_Request extends qcl_jsonrpc_model
{

  /**
   * Request method, only POST implemented so far
   */
  var $method  = "POST";    
  
  /**
   * Request data
   */
  var $data = null;
  
  /**
   * Optional headers to send with the request
   */
  var $headers  = array ();
  
  /**
   * Request timeout
   */
  var $timeout  = 3;

  /**
   * Request content type
   */
  var $contentType ="application/x-www-form-urlencoded";
  
  
  /**
   * constructor
   * @return
   * @param $controller Object
   * @param $method string[optional]
   * @param $data array[optional]
   */
  function __construct($controller, $url=null, $method = "POST")
  {
    parent::__construct(& $controller);
    $this->setUrl($url);
    $this->setMethod($method);
  }

  /**
   * setter for method
   * @param $method string
   * @return void
   */
  function setMethod($method)
  {
    if ($method != "POST")
    {
      $this->raiseError("Method $method not implemented.");
    }
    $this->method = $method;
  }

  /**
   * getter for method
   * @return string
   */
  function getMethod()
  {
    return $this->method;
  }

  /**
   * Sets the POST data, which must be an associative array
   * @param $method array
   * @return void
   */
  function setData($data)
  {
    if ( is_array( $data ) )
    {
      $this->data = $data;
    }
    else
    {
      $this->raiseError("qcl_http_request::setData : argument must be associative array.");
    }
  }
  
  
  /**
   * getter for data
   * @return array
   */
  function getData()
  {
    return $this->data;
  }

  /**
   * setter for url
   * @param $method string
   * @return void
   */
  function setUrl($url)
  {
    $this->url = $url;
  }

  /**
   * getter for url
   * @return string
   */
  function getUrl()
  {
    return $this->url;
  }

  function setTimeout( $timeout )
  {
    $this->timeout = $timeout;
  }
  
  /**
   * add a http header
   * @param $header string
   */
  function addHeader($header)
  {
    $this->headers[] = $header;
  }

  /**
   * sends the request depending on method and PHP version
   * @return string
   */
  function send()
  {
    /*
     * check url
     */
    if ( ! $this->url )
    {
      $this->raiseError("qcl_http_request::send : No url provided.");
    }

    /*
     * create header string from array
     */
    $headers = count($this->headers) > 0 ? 
                    implode("\n\r", $this->headers) : null;

    /*
     * encode data
     */
    $data = "\n\r";
    if ( is_array( $this->data ) )
    {
      foreach ( $this->data as $key => $value )
      {        
        $data .= urlencode($key) . "=" . $this->safe_urlencode($value). "&";
      }
      
      /*
       * save for debugging
       */
      $this->data = $data;
    }
    else
    {
      $data = $this->data;
    }
    
    /*
     * send request
     * FIXME Does this work in PHP5 also? It should
     */
    if ($this->method == "POST")
    {
       $response = $this->post($this->url, $data, $this->timeout, $headers);
    }
    else
    {
      $this->raiseError("Request method {$this->method} not yet supported.");
    }
    
    /*
     * save response
     */
    $this->response = $response;
    
    return $this->response;
  }
  
  function safe_urlencode($value)
  {
    /*
     * urlencode
     */
    $value = urlencode( $value );
    
    /*
     * double-encode ampersands
     */
    $value = str_replace("%26","%2526", $value );
    
    /*
     * encode hash sign
     */
    $value = str_replace("#", "%23", $value);
        
    return $value;
  }
  
  function safe_urldecode($value)
  {
    /*
     * decode
     */
    $value = urldecode( $value );
    
    return $value;
  }  

  /**
   * Get the raw response data including http headers
   * @return string
   */
  function getResponse()
  {
    return $this->response;
  }

  /**
   * Get response content without http headers
   * @return string
   */
  function getResponseContent()
  {
    $content = str_replace("\r\n", "\n", $this->response );
    return substr( $content, strpos($content,"\n\n") +1 );
  }


  /**
   * PHP4/PHP5 POST request
   * taken from http://www.enyem.com/wiki/index.php/Send_POST_request_(PHP)
   * 
   * @param string $url 
   * @param string $data
   * @param array[optional] $optional_headers
   * @return string
   * @todo use curl if available 
   */
  function post($url, $data, $timeout=10, $optional_headers = null)
  {
    $start    = strpos($url, '//') + 2;
    $end      = either(strpos($url,"/",$start),strlen($url));
    $portPos  = strpos($url,":",$start);

    if (  $portPos > 0 )
    {
      $port   = (int) substr($url,$portPos+1, ($end-$portPos) -1 );
      $host   = substr($url, $start, $portPos - $start);
      $domain = substr($url, $end);
    }
    else
    {
      $host   = substr($url, $start, $end - $start);
      $port   = 80;
      $domain = substr($url, $end);
    }

    /*
     * Connect
     */
    //$this->debug("Connecting to $host, port $port, path $domain.");
    $errno = ""; $errstr="";
    $fp = fsockopen($host, $port, $errno, $errstr, $timeout );
    
    /*
     * handle errors
     */
    if ( ! $fp )
    {
      $this->setError("Cannot connect to $host, port $port, path $domain: $errstr");
      return false;
    }

    /*
     * connection successful, write headers
     */
    fputs($fp, "POST $domain HTTP/1.1\r\n");
    fputs($fp, "Host: $host\r\n");
    if ($optional_headers)
    {
      fputs($fp, $optional_headers);
    }
    
    /*
     * content type
     */
    if ( $this->contentType )
    {
      fputs($fp, "Content-type: {$this->contentType}\r\n");  
    }
    
    fputs($fp, "Content-length: " . strlen($data) . "\r\n\r\n");
    fputs($fp, "$data\r\n\r\n");

    $response = "";
    $time = time();

    /*
     * Get response. Badly behaving servers might not maintain or close the stream properly, 
     * we need to check for a timeout if the server doesn't send 
     * anything.
     */
    stream_set_blocking ( $fp, 0 );
    while ( ! feof( $fp )  and ( time() - $time <  $timeout ) )
    {
      $r = fgets($fp, 1024*8);
      if ( $r )
      {
        $response .= $r;
        $time = time();
      }
    }
    
    /*
     * Close stream and return response data.
     */
    fclose($fp);
    return $response;
  }
}
?>