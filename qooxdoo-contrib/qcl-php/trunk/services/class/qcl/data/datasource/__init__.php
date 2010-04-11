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
 * Log filter
 */
if ( defined("QCL_LOG_DATASOURCE") )
{
  define("QCL_LOG_DATASOURCE","datasource");
}
qcl_log_Logger::getInstance()->registerFilter(QCL_LOG_DATASOURCE,"Datasource-related log messages",false);


?>