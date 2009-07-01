<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2009 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */
require_once "qcl/io/remote/HttpRequest.php";

/**
 * Class to launch a jsonrpc request from php
 */
class qcl_io_remote_JsonRpc
  extends qcl_io_remote_HttpRequest
{

  /**
   * Request content type
   */
  var $contentType ="application/json";

  /**
   * Constructor
   * @param qcl_data_controller_Controller|string $arg Either a controller object or a string URL
   */
  function __construct( $arg )
  {
    if ( is_a( $arg, "qcl_data_controller_Controller" ) )
    {
      parent::__construct( &$arg );
      $this->setUrl( $arg->getServerUrl() );
    }
    elseif ( is_string( $arg ) )
    {
      $this->setUrl( $arg );
    }
  }

  /**
   * sets the data in json format for jsonrpc request
   * @var mixed $data
   */
  function setJsonData($data)
  {
    $this->data = json_encode($data);
  }

  /**
   * Call JSONRPC service
   * @param string $service
   * @param string $method
   * @param array  $params
   * @param array $serverData
   * return string Response content without header data
   */
  function callService( $service, $method, $params, $serverData )
  {
    //$this->debug("Calling $service.$method with " .  count($params) . " parameter(s).");
    //$this->debug($this->getUrl());

    $this->setJsonData( array(
      'service'     => $service,
      'method'      => $method,
      'params'      => $params,
      'id'          => floor(((float) microtime() )*1000000),
      'server_data' => $serverData
    ));

    $this->send();

    return $this->getResponseContent();
  }

  /**
   * Shorthand method to call JSONRPC service. The difference to
   * @see qcl_http_JsonRpcRequest::callService is that the first
   * parameter is the full service path including the method name,
   * that the method can take a variable number of parameters
   * and that the result json string is parsed into a PHP array.
   *
   * @param string $path The service including the method name
   * @param  mixed $param1
   * @param  mixed $param2
   * @param  mixed $param3 etc
   * return array
   */
  function call($path)
  {
    /*
     * service and method
     */
    $p = new String($path);
    $service = $p->substring(0,$p->lastIndexOf("."));
    $method  = $p->substr($p->lastIndexOf(".")+1);

    /*
     * parameters
     */
    $params = func_get_args();
    array_shift($params);

    /*
     * call service
     */
    $result = $this->callService($service,$method,$params);

    /*
     * return decoded result
     */
    return json_decode($result);
  }
}
?>