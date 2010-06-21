<?php

function logMsg($routine, $msg)
{
	//some vars
	$logFile = "snt_php.log";
	//get current time stamp
	$timestamp = date('d.m.Y H:m:s',time());
	
	//append time stamp
		file_put_contents($logFile, $timestamp, FILE_APPEND);
		file_put_contents($logFile, ' => ' . $routine, FILE_APPEND);
	//append line break
		file_put_contents($logFile, "\n", FILE_APPEND);
	//append msg
		file_put_contents($logFile, $msg, FILE_APPEND);
	//append line break
		file_put_contents($logFile, "\n", FILE_APPEND);
	//append line  & Line break
		file_put_contents($logFile, "------------------------------\n", FILE_APPEND);
	
}

?>
