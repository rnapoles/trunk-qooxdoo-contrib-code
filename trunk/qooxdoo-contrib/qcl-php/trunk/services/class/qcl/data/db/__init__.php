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
 * required classes
 */
require_once "qcl/data/db/Manager.php";
require_once "qcl/data/db/Query.php";
require_once "qcl/data/db/Timestamp.php";

/*
 * register log filters
 */
define("QCL_LOG_DB","db");
define("QCL_LOG_TABLE_MAINTENANCE","tableMaintenance");
qcl_log_Logger::getInstance()->registerFilter( QCL_LOG_DB, "Detailed log messages on database connection and queries",false);
qcl_log_Logger::getInstance()->registerFilter( QCL_LOG_TABLE_MAINTENANCE, "Modification of table schemas in an sql database",false);


?>