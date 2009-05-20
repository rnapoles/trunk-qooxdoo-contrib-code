<?php

/**
 * Wrapper around php json-extension
 */
class JsonWrapper
{
  var $_json = null;
  
  /**
   * PHP 4 constructor
   */
  function Json()
	{
	  if ( ! function_exists("json_encode" ) )
	  {
	    require_once dirname(__FILE__) ."/JSON.php";
	    $this->_json = new JSON;
	  }
	}
  
  function encode ( $string )
	{
		if ( $this->_json )
		{
		  return $this->_json->encode( $string );
		}
	  return json_encode( $string );
	}
	
	function decode ( $string )
	{
	  if ( $this->_json )
    {
      return $this->_json->decode( $string );
    }		
	  return json_decode ( $string );
	}
}


?>