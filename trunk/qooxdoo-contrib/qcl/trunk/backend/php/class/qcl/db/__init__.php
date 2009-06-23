<?php
/*
 * @todo rename this package: activeRecord? model?
 */

/*
 * dependencies
 */
require_once "qcl/db/Manager.php";

/*
 * constants
 */
define("QCL_LOG_PROPERTY_MODEL","propertyModel");

/*
 * define property type constants. You can override the
 * values defined here
 */
if ( ! defined("QCL_DB_PROPERTY") )
{
  define("QCL_DB_PROPERTY",             "qcl_db_property");
  define("QCL_DB_PROPERTY_VARCHAR_32",  "qcl_db_property_Varchar32");
  define("QCL_DB_PROPERTY_VARCHAR_100", "qcl_db_property_Varchar100");
  define("QCL_DB_PROPERTY_VARCHAR_250", "qcl_db_property_Varchar250");
  define("QCL_DB_PROPERTY_BOOLEAN",     "qcl_db_property_Boolean");
  define("QCL_DB_PROPERTY_INT",         "qcl_db_property_Int");
  define("QCL_DB_PROPERTY_BLOB",        "qcl_db_property_Blob");
  define("QCL_DB_PROPERTY_TIMESTAMP",   "qcl_db_property_Timestamp");
}


?>