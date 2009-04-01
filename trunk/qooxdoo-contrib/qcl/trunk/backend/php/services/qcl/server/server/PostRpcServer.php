<?php
/*
 * Dependencies 
 */
require_once dirname(__FILE__) . "/JsonRpcServer.php";

/*
 * This is a simple extension to the JsonRpcServer to allow to test
 * the methods with post data instead of Json data.
 */
class PostRpcServer extends JsonRpcServer
{
 
  function getInput()
  {
    $input = (object) $_POST;
    $input->params = $this->json->decode( "[" . stripslashes( $input->params ). "]" );
    $this->debug("Getting input from post data: " . print_r($input,true) );
    return $input;
  }
 
  /**
   * Format the response string. If we get a scalar value, just output it,
   * otherwise jsonify it. 
   * @param mixded $output
   * @return string
   */
  function formatOutput( $output )
  {
    if ( ! is_scalar($output) )
    {
      $json  =& new JsonWrapper();
      $output = $json->encode($output);
    }
    return $output;
  }  
}
?>