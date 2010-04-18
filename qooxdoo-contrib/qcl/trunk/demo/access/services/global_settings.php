<?php
/*
 * qooxdoo - the new era of web development
 *
 * http://qooxdoo.org
 *
 * Copyright:
 *   2006-2009 Derrell Lipman, Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Derrell Lipman (derrell)
 *  * Christian Boulanger (cboulanger) Error-Handling and OO-style rewrite
 */

//
// Global settings for the JSON-RPC server. They can also be integrated
// with the config.php file or simply omitted if the default values are used.
//

/**
 *  accessibility needed for test.php - change to "domain" before production use.
 *  Defaults to "domain".
 */
define( "defaultAccessibility", "public" );

/**
 * Whether the server should log the request
 * You need this only for debugging
 */
//define("JsonRpcDebug", false );

/**
 * Which file the server should log to
 */
//define( "JsonRpcDebugFile", "log/server.log" );



?>