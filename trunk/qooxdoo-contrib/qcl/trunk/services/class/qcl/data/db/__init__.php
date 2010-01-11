<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2009 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */

/*
 * dependencies
 */
require_once "qcl/data/db/Manager.php";

/*
 * constants
 */
define("QCL_LOG_PROPERTY_MODEL","propertyModel");

/*
 * define property type constants. You can override the
 * values defined here
 */
if ( ! defined("qcl_data_db_PROPERTY") )
{
  define("qcl_data_db_PROPERTY",             "qcl_data_db_property");
  define("qcl_data_db_PROPERTY_VARCHAR_32",  "qcl_data_db_property_Varchar32");
  define("qcl_data_db_PROPERTY_VARCHAR_100", "qcl_data_db_property_Varchar100");
  define("qcl_data_db_PROPERTY_VARCHAR_250", "qcl_data_db_property_Varchar250");
  define("qcl_data_db_PROPERTY_BOOLEAN",     "qcl_data_db_property_Boolean");
  define("qcl_data_db_PROPERTY_INT",         "qcl_data_db_property_Int");
  define("qcl_data_db_PROPERTY_BLOB",        "qcl_data_db_property_Blob");
  define("qcl_data_db_PROPERTY_TIMESTAMP",   "qcl_data_db_property_Timestamp");
}


?>