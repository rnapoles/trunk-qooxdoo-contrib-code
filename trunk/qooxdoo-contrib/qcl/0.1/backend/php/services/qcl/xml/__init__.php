<?php

/*
 * debugging
 */
$logger =& qcl_get_logger();
if ( ! $logger->isRegistered("xml") )
{
  $logger->registerFilter("xml","XML-related debugging.");
}  
$logger->setFilterEnabled("xml",false);

?>