<?php
/**
 * Configure paths to the various libraries used by the backend
 */

/**
 * Path to the folder where projects from qooxdoo-contrib are
 * downloaded. If you configure the "CACHE" entry in the "let"
 * section of your config.json file with "cache", this should
 * be "../cache/downloads".
 * @var string
 */
define("QOOXDOO_CONTRIB_PATH", "../cache/downloads/" );


/**
 * Path to the RpcPhp package in qooxdoo-contrib
 * @var string
 */
define("RPCPHP_SERVER_PATH", QOOXDOO_CONTRIB_PATH . "RpcPhp/trunk/");
//define("RPCPHP_SERVER_PATH", "../../../../../../RpcPhp/trunk/" );

/**
 * Path to the qcl php library
 * @var string
 */
//define("QCL_CLASS_PATH", QOOXDOO_CONTRIB_PATH . "qcl/trunk/backend/php/class/");
define("QCL_CLASS_PATH", "../../../../../../qcl-php/class/" );

/**
 * Path to the application backend classes
 * @var string
 */
define("APPLICATION_CLASS_PATH", "./class");

/**
 * Log file
 * @var unknown_type
 */
define("QCL_LOG_FILE_NAME", "application.log");

/*
 * don't touch anything beyong this point
 */
ini_set('include_path', implode(
  PATH_SEPARATOR,
  array(
    RPCPHP_SERVER_PATH,
    QCL_CLASS_PATH,
    APPLICATION_CLASS_PATH,
    ini_get("include_path")
  )
) );
?>