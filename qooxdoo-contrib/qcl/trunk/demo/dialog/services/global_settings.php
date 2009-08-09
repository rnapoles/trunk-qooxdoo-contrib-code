<?php
/* ************************************************************************

   qcl - the qooxdoo component library

   http://qooxdoo.org/contrib/project/qcl/

   Copyright:
     2009 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
   * Christian Boulanger (cboulanger)

 ************************************************************************ */
/*
 * set error level
 */
error_reporting(E_ALL ^ E_NOTICE /* ^ E_WARNING */);

/*
 *  accessibility needed for test.php - change to "domain" before production use
 */
define( "defaultAccessibility", "public" );

/*
 * whether the server should log the request
 * You need this only for debugging
 */
define("JsonRpcDebug", false );



?>