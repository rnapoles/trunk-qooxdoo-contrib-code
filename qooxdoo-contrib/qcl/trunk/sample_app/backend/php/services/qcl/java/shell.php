<?php

/**
 * Component to do call java programs through the command line
 **/
class qcl_java_shell 
{
    var $error;
    var $jarfile;
    
    /**
	 * constructor
	 * @param string 	$jarfile 	path to jarfile to execute 
	 **/
    function __construct( $jarfile )
    {
        $this->jarfile 	= $jarfile;
    }

	/**
	 * executes a java jar through the shell. if an error occurs, false or
	 * am empty string is returned and the error is stored in the "error" property.
	 * @param string 	$cmd 	command to be executed 
	 * @return string result
	 */ 
    function execute($cmd)
	{	 		
		
		$descriptorspec = array (
		   1 => array("pipe", "w"),  // stdout is a pipe that the child will write to
		   2 => array("pipe", "w")   // stderr is a pipe that the child will write to
		);

		// start process
		$javacmd  = "java -jar " . $this->jarfile . " $cmd"; 
		$process  = proc_open($javacmd, $descriptorspec, $pipes);		
		
		// get results from process
		if ( is_resource($process) ) 
		{
		    $stdout = $pipes[1];
		    $stderr = $pipes[2];
		    $result = ""; 
		    $error  = ""; 
		    
		    // output
		    while ( !feof($stdout) ) $result .= fgets($stdout,1024);
			fclose($stdout);
			
			// error
			while ( !feof($stderr) ) $error .= fgets($stderr,1024);
			fclose($stderr);
			
			$this->error = $cmd . "=>" . $error; 
		    
			proc_close($process);
		}
		else
		{
			$this->error ="Could not start process";
			return false;
		}

		// Done!
		return $result;
	}
}