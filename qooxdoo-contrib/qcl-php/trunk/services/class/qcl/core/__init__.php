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

//
// This file must called at the beginning of the class loading process.
//

/*
 * global functions
 */
require_once "qcl/core/functions.php";

/*
 * core packages
 */
qcl_import("qcl_log_Logger");
qcl_import("qcl_lang_String");
qcl_import("qcl_lang_ArrayList");

/*
 * create filter
 */
qcl_log_Logger::getInstance()->registerFilter("propertyModel","Log messages concerning the setup and initializing of model properties.",false);

/**
 * Use as a a default argument to indicate that argument hasn't been supplied
 */
define("QCL_ARGUMENT_NOT_SET", "QCL_ARGUMENT_NOT_SET");

?>