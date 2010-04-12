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

/**
 * Use as a a default argument to indicate that argument hasn't been supplied
 */
define("QCL_ARGUMENT_NOT_SET", "QCL_ARGUMENT_NOT_SET");

/*
 * create filters
 */
$logger = qcl_log_Logger::getInstance();

define("QCL_LOG_OBJECT","object");
$logger->registerFilter( QCL_LOG_OBJECT, "Object-related debugging.",false);


define("QCL_LOG_PERSISTENCE","persistence");
$logger->registerFilter( QCL_LOG_PERSISTENCE, "Persistence-related debugging.",false);

define("QCL_LOG_PROPERTIES","properties");
$logger->registerFilter( QCL_LOG_PROPERTIES, "Messages concerning the setup and initializing of model properties.",false);

?>