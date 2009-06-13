<?php

require_once "qcl/core/StaticClass.php";

/**
 * Static class for convenient and global access to actual server singleton object
 */
class qcl_server_Server extends qcl_core_StaticClass
{

  /**
   * The actual server object
   * @var AbstractServer
   */
  var $serverObject;

  /**
   * Returns the singleton instance of this class
   * @return qcl_server_Server
   */
  function &getInstance( )
  {
    if ( ! is_object( $GLOBALS[__CLASS__] ) )
    {
      $GLOBALS[__CLASS__] =& new qcl_server_Server;
    }
    return $GLOBALS[__CLASS__];
  }

  /**
   * Returns the current server object
   * @return qcl_server_JsonRpc
   */
  function &getServerObject()
  {
    $_this =& qcl_server_Server::getInstance();
    if ( ! is_a( $_this->serverObject, "AbstractServer") )
    {
      trigger_error("No server object set.");
    }
    return $_this->serverObject;
  }

  /**
   * Returns the current controller object
   * @return unknown_type
   */
  function &getController()
  {
    $serverObj =& qcl_server_Server::getServerObject();
    return $serverObj->getController();
  }

  /**
   * Returns the current server data sent by the client
   * @param string $key If given, return only the value of the given key
   * @return string
   */
  function getServerData( $key=null )
  {
    $serverObj =& qcl_server_Server::getServerObject();
    return $serverObj->getServerData( $key );
  }

  /**
   * Return the url of the server, which is the URL of the
   * top including script.
   * @return string
   */
  function getUrl()
  {
    return "http://" . $_SERVER["HTTP_HOST"] . $_SERVER["SCRIPT_NAME"];
  }

  /**
   * Aborts the request with an error message
   * @param $message
   * @return unknown_type
   */
  function abort( $message )
  {
    $serverObj =& qcl_server_Server::getServerObject();
    $serverObj->setError( null, $message );
    $serverObj->sendErrorAndExit();
    exit;
  }

}
?>