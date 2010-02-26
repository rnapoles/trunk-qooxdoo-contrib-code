<?php
class qcl_lang_Type
{

  function checkType( $type, $var )
  {
    $ntype = gettype($var);
    if ( $ntype != $type )
    {
      throw new Exception("'$var' is of type '$ntype' and not of required type '$type'.");
    }
    else return $var;
  }

  function checkString( $var )
  {
    return self::checkType("string",$var);
  }

  function checkBool( $var )
  {
    return self::checkType("bool",$var);
  }

  function checkInt( $var )
  {
    if ( ! is_numeric($var) ) $var = (int) $var;
    return self::checkType("integer",$var);
  }

  function checkArray( $var )
  {
    return self::checkType("array",$var);
  }

}


?>