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

/*
 * Exceptions thrown in this class and subclasses
 */
class qcl_access_AccessDeniedException extends JsonRpcException {}
class qcl_access_AuthenticationException extends qcl_access_AccessDeniedException {}
class qcl_access_InvalidSessionException extends qcl_access_AccessDeniedException {}
class qcl_access_TimeoutException extends qcl_access_InvalidSessionException {}

/*
 * the prefix for the anonymous user
 */
if ( ! defined('QCL_ACCESS_ANONYMOUS_USER_PREFIX') )
{
  define('QCL_ACCESS_ANONYMOUS_USER_PREFIX', "anonymous_");
}

/*
 * the default timeout
 */
if ( ! defined('QCL_ACCESS_TIMEOUT') )
{
  define('QCL_ACCESS_TIMEOUT', 30*60 );
}

/*
 * log filter
 */
define("QCL_LOG_ACCESS", "access");
qcl_log_Logger::getInstance()->registerFilter(QCL_LOG_ACCESS,"Access-related log messages",false);

?>