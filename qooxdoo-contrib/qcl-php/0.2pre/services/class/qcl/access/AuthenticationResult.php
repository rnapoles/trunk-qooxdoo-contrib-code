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
require_once "qcl/data/Result.php";

class qcl_access_AuthenticationResult
  extends qcl_data_Result
{
   /**
    * Authentication error, if any
    * @var false|string
    */
   var $error;

   /**
    * An array of permissions
    * @var array
    */
   var $permissions;

   /**
    * The session id
    * @var string
    */
   var $sessionId;

   /**
    * The login name of the user
    * @var string
    */
   var $username;

   /**
    * The full name of the user
    * @var string
    */
   var $fullname;

   /**
    * The user id
    * @var int
    */
   var $userId;

   /**
    * Whether the user is an unauthenticated guest
    * @var boolean
    */
   var $anonymous;
}
?>