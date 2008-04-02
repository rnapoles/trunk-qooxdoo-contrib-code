<?php

/**
 * wrapper around php json-extension to make it compatible with php implementation
 */

class JSON
{
	function encode ( $string )
	{
		return json_encode( $string );
	}
	
	function decode ( $string )
	{
		return json_decode ( $string );
	}
}


?>