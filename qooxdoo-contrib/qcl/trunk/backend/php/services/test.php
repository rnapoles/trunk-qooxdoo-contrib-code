<?php

/**
 * page to test jsonrpc php backend
 * @author Christian Boulanger (cboulanger)
 */

if ( $_POST )
{
	$url  ="index.php?_ScriptTransport_id=1&_ScriptTransport_data={";
	$url .="%22service%22:%22" . $_POST['service'] . "%22,%22method%22:%22" . $_POST['method']. "%22,";
	$url .="%22id%22:3,%22params%22:[";
	$params = array();
	foreach ( $_POST['params'] as $param )
	{
		if ( $param !== "" )
		{
			if( is_numeric($param) or strstr("true false null", $param) 
				or preg_match("/^[{[].*[}\]]$/",$param) )
			{
				$params[] = stripslashes($param);
			}
			else
			{
				$params[] = '"' . $param . '"';
			}
		}
	}
	$url .= implode(",", $params) . "],%22server_data%22}";
	header("location: $url");
	exit;	
}
?>

<html>
<head>
<title>qooxdoo JSONRPC Backend Test</title>
</head>
<body>

  <h1>qooxdoo JSONRPC Backend Test</h1>
  <form action="test.php" target="responseIframe" 
  		method="post">
  	
  <table>
    <tr>
      <td><b>Service name</b></td>
      <td>
  		<input type="text" name="service" />
 	  </td>
    </tr>
    <tr>
      <td><b>Method name</b></td>
      <td>
  		<input type="text" name="method" />
 	  </td>      
    </tr>
    <tr>
      <td><b>Parameter 1</b></td>
      <td>
  		<input type="text" name="params[]" />
 	  </td>      
    </tr>
    <tr>
      <td><b>Parameter 2</b></td>
      <td>
  		<input type="text" name="params[]" />
 	  </td>      
    </tr>
    <tr>
      <td><b>Parameter 3</b></td>
      <td>
  		<input type="text" name="params[]" />
 	  </td>      
    </tr>
     <tr>
      <td><b>Parameter 4</b></td>
      <td>
  		<input type="text" name="params[]" />
 	  </td>      
    </tr>   
  </table>
  
  <input type="submit" value="Submit"/>
  
  </form>
  
  <iframe name="responseIframe" height="200" width="100%" scrolling="yes"/> 

</body>
</html>
  