<?php

 
// dependencies
require_once ("qcl/jsonrpc/model.php");

/**
 * class to run binaries through the shell from php
 **/
 	
 class qcl_system_shell extends qcl_core_object
 {
	var $error; 	// error msg
	var $warning;	// warning msg
	var $result;	// result of shell query
	
	var $slash;		// os-dependent slash char
	var $ext;		// os-dependent binary extension
	var $command;	// the last command executed on the shell
	
	var $hasPython;	// python version if available or false
	var $pythonCmd;	// name of python executable
	
 	/**
 	 * Constructor
 	 * @param string	working directory
 	 * @return bool true or false depending on whether shell access 
	 * is possible
 	 **/
 	function __construct ($dir)
	{
		$this->dir		= realpath($dir);
		$this->slash 	= eregi("win",PHP_OS)? "\\"   : "/";
		$this->ext		= eregi("win",PHP_OS)? ".exe" : "";
		$this->checkPython();
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
	 * Check for python and return version or false
	 * @return mixed string version 
	 **/
	function checkPython()
	{
		$pyVersions = array('python','python2.2','python2.3',"python2.4","python2.5" );
		$version = false;
		
		foreach($pyVersions as $python)
		{
			$result = $this->execute ( $python, "-V", true );
			if(ereg("Python",$result))
			{
				$version = $python;
				break;
			} 
		}
		
		$this->pythonVersion	= $version ? $result : false;
		$this->pythonCmd		= $python;
		
		return $version;
	}
	
	
	/**
	 * Executes python script
	 * @param string $parameters
	 * @param boolean $stderr return stderr instead of stdout
	 * @return 
	 **/
	 
	function python($parameters,$stderr)
	{
		if( ! $this->pythonVersion ) 
		{
			$this->error = "Python is not available!";
			return false;
		}
		return $this->execute($this->pythonCmd, $parameters, $stderr);
	}
	
	
	/**
	 * executes given command in working directory
	 * @param string 	$command
	 * @param string 	$parameters
	 * @param boolean 	$stderr 		if set, stderr is redirected to stdout
	 * @return string result
	 **/
	function execute( $command, $parameters="", $stderr=false)
	{
		$dir = chdir($this->dir);
		$this->command 	=	$command .
							$this->ext . " " .
							$parameters .
							($stderr ? " 2>&1" : "");
		$result = @shell_exec($this->command);
		chdir($dir);        
		return $result;
	}
 }

?>