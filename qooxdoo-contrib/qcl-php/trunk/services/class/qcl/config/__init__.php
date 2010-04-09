<?php
/* ************************************************************************

   Bibliograph: Collaborative Online Reference Management

   http://www.bibliograph.org

   Copyright:
     2004-2009 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
   *  Christian Boulanger (cboulanger)

************************************************************************ */

qcl_import( "qcl_access_model_User" );
qcl_import( "qcl_config_UserConfigModel" );

/*
 * exceptions
 */
class qcl_config_Exception extends JsonRpcException {}

/*
 * log filters
 */
qcl_log_Logger::getInstance()->registerFilter("config","Configuration-related log messages",false);
?>