<?php

/**
 * QCL PHP backend library for qooxdoo
 * 
 * (c) 2008 Christian Boulanger
 * 
 * Base script file from which all other files are included
 * 
 */

if ( count ( $_FILES ) )
{
  // call upload script
  require ( "uploader.php" );
}
else
{
  // call jsonrpc dispatcher
  require ("qcl/jsonrpc/dispatcher.php");
}

?>
