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

/**
 * The path evironment variable for calls to executables
 */
if ( ! defined("QCL_UTIL_SYSTEM_ENV_PATH") )
{
  define("QCL_UTIL_SYSTEM_ENV_PATH","opt/local/bin:/usr/bin:/bin:/usr/sbin:/sbi");
}
?>