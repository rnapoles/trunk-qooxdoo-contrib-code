<?php
  /*
   * QxTransformer
   */

/*
 * this is the server - side logic for the qxtransformer databinding features
 */

class class_showcase
{
   
    /**
     * returns server time
     */
    function method_getServerTime($params, $error)
    {
       $result = array();
       $result["text"] = date("H:i:s"); 
       return $result;
    }

	 /**
     * returns listItems for list
     */
    function method_getListItems($params, $error)
    {
       $result = array();
       $result["children"] = array();
       for ( $i=0; $i<35; $i++)
       {
       		$result["children"][$i] = array(
       			classname => "qx.ui.form.ListItem",
       			label	  => "Item " . $i . " - " . rand(1,100)
       		);
       } 
       return $result;
    }
    
    /**
     * echos client message
     */
     function method_echo($params,$error)
     {
     	$result = "You said: ''" . $params[0]->value . "'!'";
     	return $result;
     }

    /**
     * saves form data
     */
     function method_saveFormData($params,$error)
     {
     	$result = object2array($params[0]);
     	$_SESSION['formdata'] = $result;
     	return "Data saved on Server. Now clear form and retrieve data.";
     }

	/**
     * retrieves form data
     */
     function method_getFormData()
     {
     	return $_SESSION['formdata'];
     }
     
     /**
      * echos messages dispatched from client
      * simply adds a "server." before the message name and returns the data.
      */
     function method_echoClientMessage($params,$error)
     {
     	$type = $params[0];
     	$data = $params[1];
     	$response = array();
     	$response['__messages'][ 'server.' . $type ] = $data;
     	return $response;
     }
     
    /**
     * returns server messages
     * example: setTime message
     */
    function method_getServerMessages($params, $error)
    {
       $result = array();
       $result["__messages"] = array( "showcase.setTime" => date("H:i:s") ); 
       return $result;
    }
     
    /**
     * get values for autocomplete
     */
    function method_getAutoCompleteValues($params, $error)
    {
       $result 		= array();
       $input 		= $params[0];
       $hasOptions  = $params[1];
       $length 		= strlen($input);
       
       if ( !$length) return array();
       
       // sample autocomplete data: countries and flags
       $options = array();
       $countries = file(dirname(__FILE__)."/country-codes.txt");
       foreach ( $countries as $country )
       {
       		$c = explode("\t",$country);
       		$code = strtolower($c[0]);
       		$name = trim($c[1]);
       		$url = "http://www.photius.com/flags/thumbnails/" . $code . "-t.gif";
       		if ( strtolower( substr( $name, 0, $length ) ) == strtolower( $input ) )
       		{
	       		$options[] = array(
	       			value 	=> $code, 
	       			text	=> $name, 
	       			icon	=> $url 
	       		);
       		}
       }
       $suggest = $options[0]['text'];
       $result = array(
       		input	=> $input,
       		options => $hasOptions ? $options : null,
       		suggest	=> $suggest
       );
       return $result;
    }


}

function object2array($obj)
{
	if (! is_object($obj)) return (array) $obj;
	$arr=array();
	foreach (get_object_vars($obj) as $key => $val) {
        $arr[$key]= is_object($val) ? object2array($val) : $val;
    }
    return $arr;
}

?>