<?php
/**
 * Script to test qcl jsonrpc server backend
 * @author Christian Boulanger (cboulanger)
 */

if ( $_POST )
{
  require_once "qcl/server/JsonRpc.php";
  require_once "qcl/server/Server.php";
  require_once "qcl/http/JsonRpcRequest.php";
  require_once "qcl/log/FireCake.php";
  
  FireCake::enable();
  
  class Debug_Controller  
  {
    
    function sendRequest()
    {
      
      $serverUrl = qcl_server_Server::getUrl();
      
      /*
       * request object
       */
      $request = new qcl_http_JsonRpcRequest( $serverUrl );
            

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
       * forward headers from client
       */
      $request->addHeader("User-Agent: " . $_SERVER["HTTP_USER_AGENT"] );
      
      /*
       * request parameters
       */
      $service = $_POST['jsonrpcservice'];
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
       * session id
       */
      $sessionId = $_POST['sessionid'];
      if ( ! $sessionId )
      {
        $sessionId = session_id();
      }
      
      $serverData = array(
        "sessionId" => $sessionId
      );
      
      /*
       * send request and return result data
       */
      $request->callService( $name, $method, $params, $serverData );
      $response = $request->getResponseContent();
      
      /*
       * if response contains session id, use this
       */
      $data = $json->decode($response);
      
      //firecake($data);
      
      if( is_object($data) )
      {
        $data = object2array($data);

        /*
         * set session id in form
         */
        if ( isset( $data['result']['sessionId'] ) )
        {
          $sessionId = $data['result']['sessionId'];
         //$this->debug("Setting Session Id to $sessionId ... ");
          $response .= "
            <script>
               top.setSessionId('$sessionId');
            </script>
          ";
        }

        if ( false )
        {
           /*
            * automatically resubmit form
            */
            if (  $msg['name'] == "qcl.commands.repeatLastRequest" )
            $response .= "
              <script>
                 top.resubmit('" . addslashes($msg['data'] ) . "');
              </script>
            ";
        }
      }
      $headers = $request->getHeaders();
      
      //firecake($headers);
      return array($response,$headers);
    }
  }
  
  /*
   * run debug controller
   */
  $debugController = new Debug_Controller( new JsonRpcServer );
  list($response,$headers) = $debugController->sendRequest();
  foreach($headers as $header )
  {
    header($header);
  }
  echo $response;
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
          <input style="width:100%" type="text" name="jsonrpcservice" />
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