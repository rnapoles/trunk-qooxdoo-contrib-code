<?php

// not functional and not integrated yet
// this will integrate behavior that is now in the server class

class AbstractRequest  
{
  
  /**
   * The server to which this object is attached
   * @var AbstractServer
   */
  var $server;
  
  
  /**
   * The IP of the client requesting the service
   * @var array
   */  
  var $ip;
  
  /**
   * Constructor
   * @param AbstractServer $server
   * @return unknown_type
   */
  function __construct( $server )
  {
    /*
     * server object
     */
    if ( ! is_a( $server,"AbstractServer" ) )
    {
      trigger_error("No valid server class.");
    }
    $this->server =& $server;

    /*
     * IP Address of the requesting client
     */
    $this->ip = $_SERVER['REMOTE_ADDR'];
  }

  /**
   * Getter for ip of requesting client
   * @return string
   */
  function getIp()
  {
    return $this->ip;
  }
}


?>