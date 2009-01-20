<?php

/*
 * debugging
 */
$logger =& qcl_get_logger();
if ( ! $logger->isRegistered("persistence") )
{
  $logger->registerFilter("persistence","Persistence-related debugging.");
}  
$logger->setFilterEnabled("persistence",false);




?>