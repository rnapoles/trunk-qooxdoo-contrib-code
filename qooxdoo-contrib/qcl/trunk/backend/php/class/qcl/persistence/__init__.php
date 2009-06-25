<?php

/*
 * debugging
 */
require_once "qcl/log/Logger.php";
qcl_log_Logger::registerFilter("persistence","Persistence-related debugging.",false);

?>