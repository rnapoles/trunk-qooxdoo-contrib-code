<?php
/**
 * page to test jsonrpc php backend
 * @author Christian Boulanger (cboulanger)
 */
if ( $_POST )
{
  require dirname( __FILE__ ) . "/server/PostRpcServer.php";
  PostRpcServer::run();
  exit;
}

?>

<html>
<head>
<title>JsonRpc Server Test</title>
</head>
<body>

<h1>JsonRpc Server Test</h1>
<p>This script tests the jsonrpc services by overriding the jsonrpc server and transforming the POST request 
into a request that can be handled by the backend services. </p>
<form target="responseIframe" method="post">

<table width="100%">
	<tbody>
		<tr>
			<td style="width: 60%"><b>Service name</b></td>
			<td style="width: 40%"><b>Service Method</b></td>
		</tr>
		<tr>
			<td>
			 <input 
			   style="width: 100%" type="text" name="service"
				 value="qooxdoo.testPHP4" />
		  </td>
			<td>
			 <input type="text" name="method" 
			   value="echo" />
			 </td>
		</tr>
		<tr>
			<td><b> JSON request parameters (Separated by comma, remember to
			properly quote strings)<br />
			</b></td>
		</tr>
		<tr>
			<td>
			 <textarea style="width: 100%; height: 100px" name="params">"It works!","foo",true,1</textarea>
        </td>
		</tr>
	</tbody>
</table>

<input type="submit" value="Submit" /></form>

<iframe 
  name="responseIframe" 
  height="200" width="100%" scrolling="yes" />

</body>
</html>
