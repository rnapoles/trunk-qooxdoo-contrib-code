<?php
  
/*
 * dependencies
 */
require_once "qcl/server/JsonRpcServer.php";

class qcl_jsonrpc_Server extends JsonRpcServer
{
  /**
   * @override
   * @see JsonRpcServer#getServiceObject($className)
   */
  function &getServiceObject( $className )
  {
    /*
     * get service object from parent method
     */
    $serviceObject =& parent::getServiceObject( $className );
    
    /*
     * Check if service has been aborted in the constructor. This allows
     * more fine-grained access control by the service object itself.
     */
    if ( method_exists( $serviceObject, "isAborted") 
        && $serviceObject->isAborted() )
    {
      /*
       * do not execute any method but skip to response
       * immediately
       */
      $this->debug("Aborted...");
      $this->sendReply(
        $this->formatOutput( $serviceObject->response() ), 
        $this->scriptTransportId
      );
      exit;
    }
    
    return $serviceObject;
  }
  
  /**
   * @override
   * @see bibliograph/trunk/backend/php/services/qcl/jsonrpc/server/JsonRpcServer#checkServiceMethod($serviceObject, $method)
   */
  function checkServiceMethod( $serviceObject, $method )
  {
    if ( phpversion() > 5 and $serviceObject->hasMixinMethod( $method ) )
    {
      return true;
    }  
    return parent::checkServiceMethod( &$serviceObject, $method );
  }  
  
  /**
   * (non-PHPdoc)
   * @see bibliograph/trunk/backend/php/services/qcl/jsonrpc/server/JsonRpcServer#debug($str)
   */
  function debug($str)
  {
    if ( $this->debug )
    {
      @error_log( "qcl_jsonrpc_Server: ".  $str . "\n",3,QCL_LOG_FILE);
    }
  }
  
  /**
   * Hook for subclasses to locally log the error message
   * @param $msg
   * @return unknown_type
   */
  function logError( $msg )
  {
    @error_log( $msg . "\n" . debug_get_backtrace(3) . "\n",3,QCL_LOG_FILE);
  }  
  
}

?>
