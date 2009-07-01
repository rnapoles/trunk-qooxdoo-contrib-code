<?php
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