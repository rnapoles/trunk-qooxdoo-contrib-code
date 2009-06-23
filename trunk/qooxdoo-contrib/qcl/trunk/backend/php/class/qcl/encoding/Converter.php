<?php

/**
 * class to convert from one text encoding to another
 */

require_once "qcl/mvc/AbstractModel.php";

class qcl_encoding_Converter extends qcl_mvc_AbstractModel 
{
  var $converter_cmd = "";  
  
	//-------------------------------------------------------------
  // API methods
  //-------------------------------------------------------------
  
  /**
   * converts from one encoding to another one, using available
   * php function 
   * @todo extend to allow usage of external libraries
   * @param string $src_encoding
   * @param string $tgt_encoding
   * @param string $string
   * @return string
   */
	function convert ($src_encoding, $tgt_encoding, $string)
	{
    if ( function_exists ( "iconv" ) )
    {
      return iconv($src_encoding, $tgt_encoding, $string);
    }
    elseif ( function_exists ( "mb_convert_encoding" ) )
    {
      return mb_convert_encoding($string, $tgt_encoding, $src_encoding);
    }
    else
    {
      $this->raiseError("No character conversion library found in your PHP installation. Please upgrade.");  
    }
	}
	
}
?>