<?php
/* ************************************************************************

   Bibliograph: Collaborative Online Reference Management

   http://www.bibliograph.org

   Copyright:
     2004-2010 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
   *  Christian Boulanger (cboulanger)

************************************************************************ */

qcl_import( "qcl_access_model_User2" );
qcl_import( "qcl_access_model_Role2" );
qcl_import( "qcl_access_model_Permission2" );
qcl_import( "qcl_access_model_Session2" );
qcl_import( "qcl_config_ConfigModel" );
qcl_import( "qcl_config_UserConfigModel" );

/*
 * log filter
 */
define("QCL_LOG_ACCESS", "access");
qcl_log_Logger::getInstance()->registerFilter(QCL_LOG_ACCESS,"Access-related log messages",false);

?>