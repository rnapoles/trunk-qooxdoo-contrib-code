<?php
/**
 * page to test jsonrpc php backend
 * @author Christian Boulanger (cboulanger)
 */

if ( $_POST )
{
  require_once "./global_settings.php";
  require_once "qcl/server/JsonRpcServer.php";
  require_once "qcl/registry/Session.php"; 
  require_once "qcl/jsonrpc/controller.php";
  require_once "qcl/server/JsonWrapper.php";
  require_once "qcl/http/JsonRpcRequest.php";
  
  class Debug_Controller extends qcl_jsonrpc_controller 
  {
    function configureService(){}
      
    function sendRequest()
    {
      /*
       * session id
       */
      $sessionId = $_POST['sessionid'];
      if ( $sessionId )
      {
        $this->setSessionId($sessionId);
      }
            
      /*
       * request object
       */
      $request = new qcl_http_JsonRpcRequest( &$this );
      
      /*
       * timeout
       */
      $timeout = $_POST['timeout'];
      if ( ! $timeout or ! is_numeric($timeout ) )
      {
        echo "<p style='color:red'>Invalid timeout.</p>";
        exit;
      }
      $request->setTimeout($timeout);
      
      /*
       * request parameters
       */
      $service = $_POST['service'];
      if ( ! trim($service) )
      {
        echo "<p style='color:red'>Missing service name.</p>";
        exit;
      }      
      
      $json   = new JsonWrapper( &$this );
      $params = $json->decode( "[" . stripslashes( $_POST['data'] ) . "]" ); 
      if ( ! is_array($params) )
      {
        echo "<p style='color:red'>Invalid JSON data.</p>";
        exit;
      }
      
      /*
       * request parameters
       */
      $methodPos = strrpos($service,".");
      $name      = substr( $service,0, $methodPos );
      $method    = substr( $service, $methodPos+1 );
      
      /*
       * send request and return result data
       */
      $request->callService( $name, $method, $params );
      $response = $request->getResponseContent();
      
      /*
       * if response contains session id, use this
       */
      $data = $json->decode($response);
      if( is_object($data) )
      {
        $data = object2array($data);
        foreach ( (array) $data['result']['messages'] as $msg )
        {
          
          /*
           * set session id in form
           */
          if ( $msg['name'] == "qcl.commands.setSessionId" )
          {
            $sessionId = $msg['data'];
           //$this->debug("Setting Session Id to $sessionId ... ");
            $this->setSessionId($sessionId);
            echo "
              <script>
                 top.setSessionId('$sessionId');
              </script>
            ";
          }
          
           /*
            * automatically resubmit form
            */
            if (  $msg['name'] == "qcl.commands.repeatLastRequest" )
            echo "
              <script>
                 top.resubmit('" . addslashes($msg['data'] ) . "');
              </script>
            ";
        }
      }
      return $response;
    }
  }
  
  /*
   * run debug controller
   */
  $debugController = new Debug_Controller( new JsonRpcServer );
  echo $debugController->sendRequest();
  exit;
}

?>

<html>
<head>
  <title>QCL JsonRpc Backend Debug Console</title>
  <script type="text/javascript">
    function setSessionId(sessionId)
    {
      document.forms[0].sessionid.value = sessionId;
    }
    
    function resubmit( msg )
    {
      if ( document.forms[0].autoresubmit.checked ) 
      {
        window.setTimeout(function(){
          document.forms[0].submit();
        },500);
      }
    }
  </script>
</head>
<body>

  <h1>qooxdoo JsonRpc Backend Debug Console</h1>
  <form  target="responseIframe" 
      method="post">
    
  <table width="100%">
    <tbody>
      <tr>
        <td style="width:60%"><b>Full Service name (including method)</b></td>
        <td style="width:40%"><b>Timeout in seconds</b></td>
      </tr>
      <tr>
        <td>
          <input style="width:100%" type="text" name="service" />
        </td>
        <td>
          <input  type="text" name="timeout" value="3" />
        </td>       
      </tr>    
      <tr>
        <td><b>JSON request parameters (in JSON format), separated by comma. <br />Remember to properly escape strings.</b></td>
        <td><b>Authentication</b></td>
      </tr>  
      <tr>
        <td >
        <textarea style="width:100%;height:100px" name="data" ></textarea>
        </td>
        <td>
          <table>
            <tr>
              <td>
                <label for="username"><b>Username</b></label>
              </td>
              <td>
                <input id="username" disabled="true" name="username" />
              </td>
            </tr>
            <tr>
              <td>
                <label for="password"><b>Password</b></label>
              </td>
              <td>
                <input id="password" disabled="true" name="password" />
              </td>
             </tr>
             <tr>
              <td>
                <b>Session Id</b>
              </td>
              <td>
                <input name="sessionid" />
              </td>
            </tr>
             <tr>
              <td>
                <input type="checkbox" name="autoresubmit" value="on" /> Allow auto-resubmit
              </td>
            </tr>
          </table>
        </td>  
      </tr>
    </tbody>
  </table>
  
  <input type="submit" value="Submit"/>
  
  </form>
  
  <iframe name="responseIframe" height="200" width="100%" scrolling="yes"/> 

</body>
</html>