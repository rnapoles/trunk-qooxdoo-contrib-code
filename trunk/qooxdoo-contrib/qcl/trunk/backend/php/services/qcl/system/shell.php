<?php

 
// dependencies
require_once ("qcl/jsonrpc/model.php");

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
 	 * Constructor
 	 * @param string	working directory
 	 * @return bool true or false depending on whether shell access 
	 * is possible
 	 **/
 	function __construct()
	{
		$this->ext = eregi("win",PHP_OS)? ".exe" : "";
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
	 * executes given command in working directory
	 * @param string $command
	 * @param string $input
	 * @return string result
	 **/
	function execute( $command, $input )
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
      2 => array("pipe", "r")   // stderr 
    );

    /*
     * create process
     */
    $process = proc_open( $command, $descriptorspec, $pipes );
    if ( ! is_resource($process)) 
    {
      $this->raiseError("Cannot create process from command '$command'");
    }

    /*
     * feed input
     */
    fwrite($pipes[0], $input);
    fclose($pipes[0]);

    /*
     * get response
     */
    $response = "";
    while( ! feof($pipes[1]) )
    {
      $response .= fread($pipes[1],1024);
    }
    fclose($pipes[1]);
    
    /*
     * get error
     */
    $error = "";
    while( ! feof($pipes[2]) )
    {
      $error .= fread($pipes[2],1024);
    }
    fclose($pipes[2]);    

    /*
     * close process and set error, if any
     */
    proc_close($process);
    if ( $error )
    {
      $this->setError($error);
      $this->warn("'$command' resulted in error '$error'.");   
    }
    
    return $response;
	}
	
	
 }

?>