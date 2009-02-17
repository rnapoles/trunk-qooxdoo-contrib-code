<?php

class qcl_db_Overload extends qcl_jsonrpc_model
{
 
  /**
   * Method called when called method does not exist. (PHP4)
   * This will check whether method name is 
   * 
   * - getXxx or setXxx and then call getProperty("xxx") 
   *    or setProperty("xxx", $arguments[0]). 
   * - findByXxx to call findBy("xxx",...)
   * 
   * Otherwise, raise an error.
   * @param string $function  Method name
   * @param array  $arguments Array or parameters passed to the method
   */
  function __call( $function, $arguments, &$return) 
  {
    
    /*
     * php4 or no matching mixin methods found.
     * Now we intercept method calls
     */
    $startsWith = strtolower( substr( $function, 0, 3 ) );
    $endsWith   = strtolower( substr( $function, 3 ) );
    
    /*
     * get.. and set... for property access
     * @todo correct calling of method with variable arguments
     */
    if ( $startsWith == "set" )
    {
      //$this->debug("setting $endsWith = " . $arguments[0] . "(" . gettype($arguments[0]) . ")." . print_r($arguments,true));
      $this->setProperty( $endsWith, $arguments[0], $arguments[1], $arguments[2] );
    }
    elseif ( $startsWith == "get" )
    { 
      $return = $this->getProperty( $endsWith, $arguments[0], $arguments[1], $arguments[2] );
      //$this->debug("getting $endsWith = $return");
    }
    
    /*
     * findBy...
     */
    elseif ( strtolower( substr( $function, 0, 6 ) ) == "findby" )
    {
      $propName = strtolower( substr( $function, 6 ) );
      $return = $this->findBy($propName,$arguments[0],$arguments[1],$arguments[2]);
    }
    
    /*
     * method not known, raise error
     */
    else
    {
      $this->raiseError("Unknown method " . get_class($this) . "::$function().");
    }
    
    /*
     * PHP 4: return value is in &$return
     */
    return true; 

  }
}
?>