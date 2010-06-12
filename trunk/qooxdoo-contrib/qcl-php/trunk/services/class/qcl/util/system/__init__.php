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
 * exceptions
 */
class qcl_util_system_ShellException extends LogicException {}
class qcl_util_system_MailException extends LogicException {}

/*
 * log filters
 */
$logger = qcl_log_Logger::getInstance();
define("QCL_LOG_SHELL","shell");
$logger->registerFilter( QCL_LOG_PROPERTIES, "Shell commands",false);

define("QCL_LOG_MAIL","mail");
$logger->registerFilter( QCL_LOG_PROPERTIES, "Sending mails",true);

/*
 * configure mail
 */
if( ! defined('QCL_MAIL_SMTP_HOST') )
{
  define( 'QCL_MAIL_SMTP_HOST', $_SERVER["SERVER_NAME"] );
}
else
{
  ini_set("SMTP", QCL_MAIL_SMTP_HOST );
}

if( ! defined( 'QCL_MAIL_SENDER' ) )
{
  define( 'QCL_MAIL_SENDER', $_SERVER["SERVER_ADMIN"] );
}
ini_set('sendmail_from', QCL_MAIL_SENDER );
?>