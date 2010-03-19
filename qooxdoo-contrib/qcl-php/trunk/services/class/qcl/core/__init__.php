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
 * This file is called at the beginning of the class loading process.
 */

require_once "qcl/core/functions.php";      // global functions
require_once "qcl/log/Logger.php";
require_once "qcl/lang/String.php";         // String object similar to java
//require_once "qcl/lang/Utf8String.php";     // Class with methods to deal with Utf8 Strings
require_once "qcl/lang/ArrayList.php";      // ArrayList object similar to java

/*
 * create filter
 */
qcl_log_Logger::getInstance()->registerFilter("propertyModel","Log messages concerning the setup and initializing of model properties.",false);

/**
 * Use as a a default argument to indicate that argument hasn't been supplied
 */
define("QCL_ARGUMENT_NOT_SET", "QCL_ARGUMENT_NOT_SET");

?>