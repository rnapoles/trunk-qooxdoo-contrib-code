<?php

// not functional and not integrated yet
// this will integrate behavior that is now in the server class

class AbstractResponse
{
  
  /**
   * The result data returned to the client
   * @var mixed
   */
  var $data;
  
  /**
   * The response headers
   */
  var $headers = array();
  
  /**
   * Adds a header
   * @param string $header
   * @param string $value
   * @return void
   */
  function addHeader( $header, $value )
  {
    $this->headers[] = array( $header, $value );  
  }
  
  /**
   * Getter for header array
   * @return array
   */
  function getHeaders()
  {
    return $this->headers;
  }
  
  /**
   * Returns the header value if set, otherwise null
   * @param string $header
   * @return string|null
   */
  function getHeader( $header )
  {
    foreach( $this->headers as $headerArray )
    {
      if ( $headerArray[0] == $header )
      {
        return $headerArray[1];
      }
    }
    return null; 
  }
  
  /**
   * Sends the headers
   * @return void
   */
  function sendHeaders()
  {
    foreach ( $this->headers as $headerArray )
    {
      header( $headerArray[0], $headerArray[1] );
    }
  }
  
  /**
   * Sets the result data
   * @param mixed $data
   * @return void
   */
  function setData( $data )
  {
    $this->data = $data;
  }
  
  /**
   * Returns the result data
   *
   * @return mixed
   */
  function getData()
  {
    return $this->data;
  }
  
  /**
   * Sends the final response data, including headers
   * @return void
   */
  function sendResponse()
  {
    $this->sendHeaders();
    echo $this->data;
  }
  

}


?>