<?php
/*
 * Dependencies 
 */
require_once dirname(__FILE__) . "/JsonRpcServer.php";

/*
 * This is a simple extension to the JsonRpcServer to allow to test
 * the methods with post data instead of Json data. You can also
 * allow GET data.
 */
class PostRpcServer extends JsonRpcServer
{
 
  /**
   * Whether the server can also use GET parameters for the
   * request. 
   * @var boolean
   */
  var $allowGetParams = true;
  
  /**
   * @override
   * @see JsonRpcServer::getInput()
   */
  function getInput()
  {
    $input = $this->allowGetParams ? (object) $_REQUEST : (object) $_POST;
    $input->params = $this->json->decode( "[" . stripslashes( $input->params ). "]" );
    $this->debug("Getting input from post data: " . print_r($input,true) );
    return $input;
  }
 
  /**
   * Format the response string. If we get a scalar value, just output it,
   * otherwise jsonify it. 
   * @override
   * @param mixded $output
   * @return string
   */
  function formatOutput( $output )
  {
    if ( ! is_scalar($output) )
    {
      $output = $this->json->encode($output);
    }
    return $output;
  }  
}
?>