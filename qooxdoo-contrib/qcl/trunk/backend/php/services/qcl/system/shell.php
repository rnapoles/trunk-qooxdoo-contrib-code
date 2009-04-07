<?php


// dependencies
require_once ("qcl/mvc/AbstractModel.php");

/**
 * class to run binaries through the shell from php
 **/

class qcl_system_shell extends qcl_core_object
{
  /**
   * error message
   */
  var $error;
   
  /**
   * warning
   */
  var $warning;	// warning msg

  /**
   * Result of shell command
   */
  var $result;

  /**
   * The last command
   */
  var $command;

  /**
   * File extension for executable files
   */
  var $ext;

  /**
   * return value
   */
  var $return_value;

 	/**
 	 * Constructor
 	 * @param string	working directory
 	 * @return bool true or false depending on whether shell access
 	 * is possible
 	 **/
 	function __construct()
 	{
 	  $this->ext = eregi("win",PHP_OS)? ".exe" : "";
 	}

 	function getReturnValue()
 	{
 	  return $this->return_value;
 	}

 	/**
 	 * tests if PHP has access to the shell, if not leaves
 	 * error msg in error property
 	 *
 	 * @return boolean success
 	 **/
 	function test()
 	{
 	  // can php access the shell?
 	  if( $this->result = @shell_exec("cd") )
 	  {
 	    return true;
 	  }
 	   
 	  // if not, why not?
 	  $this->error="Cannot access the shell: ";

 	  if(strtolower(ini_get("safe_mode"))=="on")
 	  {
 	    $this->error .= "Safe Mode is on. ";
 	  }
 	  else
 	  {
 	    $this->error.="Unknown error. Please check your PHP installation.";
 	  }
 	  return false;
 	}


 	/**
 	 * Executes given command through the shell in working directory. Uses
 	 * proc_open in order to communicate with subprocess throgu
 	 * stdin/stout/stderr streams. If an error occurs, the method returns
 	 * false, the error can be retrieved with getError().
 	 * @param string $command
 	 * @param string $input
 	 * @return string|false False if an error occurred, otherwise string.
 	 * @todo trying to read the stderr crashes PHP4 on MAMP
 	 **/
 	function execute( $command, $input=null )
 	{

 	  /*
 	   * command
 	   */
    $this->command  = $command;
     
    /*
     * streams and pipes
     */
    $descriptorspec = array(
      0 => array("pipe", "r"),  // stdin
      1 => array("pipe", "w"),  // stdout
      2 => array("pipe", "r")   // @todo stderr, should be "w" but this crashes PHP4 on MAMP
    );

    /*
     * create process
     */
    $process = proc_open( $command, $descriptorspec, $pipes );
    if ( ! is_resource($process) )
    {
      $this->raiseError("Cannot create process from command '$command'");
    }

    /*
     * feed input
     */
    if ( $input )
    {
      fwrite( $pipes[0], $input );
      fflush( $pipes[0] );
    }
    fclose( $pipes[0] );
    usleep(1000);

    /*
     * get output
     */
    $output = "";
    while( $s= fgets( $pipes[1], 1024) ) $output .= $s;
    fclose( $pipes[1] );

    /*
     * get error, if any
     */
    $error="";
    while( $s= fgets( $pipes[2], 1024) ) $error .= $s;
    fclose( $pipes[2] );
    
    /*
     * close process and handle error
     */
    $this->return_value = proc_close( $process );
    if ( $error )
    {
      $this->setError($error);
      $this->warn("'$command' resulted in error '$error'.");
      return false;
    }

    return $output;
 	}
}
?>