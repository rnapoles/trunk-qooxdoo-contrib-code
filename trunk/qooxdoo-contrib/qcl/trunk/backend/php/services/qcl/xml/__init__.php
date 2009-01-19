<?php

/*
 * debugging
 */
$logger =& qcl_get_logger();
if ( ! $logger->isRegistered("persistence") )
{
  $logger->registerFilter("xml","Persistence-related debugging.");
}  

?>