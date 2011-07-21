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
 * access constants
 */
define( "QCL_ACCESS_READ",    "read"  );
define( "QCL_ACCESS_WRITE",   "write" );
define( "QCL_ACCESS_CREATE",  "create" );
define( "QCL_ACCESS_DELETE",  "delete" );
define( "QCL_ACCESS_ALL",     "*" );

/*
 * three default roles.
 */
define( "QCL_ROLE_ANONYMOUS", "anonymous" );
define( "QCL_ROLE_USER", "user" );
define( "QCL_ROLE_ADMIN", "admin" );

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
 * the salt used for storing encrypted passwords
 */
define('QCL_ACCESS_SALT_LENGTH', 9);

/*
 * log filter
 */
define("QCL_LOG_ACCESS", "access");
qcl_log_Logger::getInstance()->registerFilter(QCL_LOG_ACCESS,"Access-related log messages",false);
define("QCL_LOG_LDAP", "ldap");
qcl_log_Logger::getInstance()->registerFilter(QCL_LOG_LDAP,"LDAP-related log messages",false);

?>