<?php
/*
 * create filter
 */
$logger =& qcl_get_logger();
if ( ! $logger->isRegistered("propertyModel") )
{
  $logger->registerFilter("propertyModel","Log messages concerning the setup and initializing of model properties.");
}
$logger->setFilterEnabled("propertyModel",false);

?>