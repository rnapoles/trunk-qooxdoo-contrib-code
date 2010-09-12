<?php
/*
 * qooxdoo - the new era of web development
 *
 * http://qooxdoo.org
 *
 * Copyright:
 *   2009 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */

/**
 * Class providing a backend for mock authentication
 * @author bibliograph
 *
 */
class class_simple_AuthController
{

  /**
   * Authenticate a user with a password (two parameters),
   * or a valid session id (one parameter).
   * If authenticated, return all permissions the user has.
   */
  function method_authenticate( $params )
  {

    /*
     * authentication with session id (even if null)
     */
    if ( count( $params ) == 1 )
    {
      list( $sessionId ) = $params;

      /*
       * if we have a valid session id, get user id from it
       */
      if ( $sessionId and $_SESSION['usersession']['sessionId'] == $sessionId )
      {
        $userId = $_SESSION['usersession']['userId'];
      }
      /*
       * else, start new anonymous session
       */
      else
      {
        $userId = 4; /* anonymous */
        $sessionId = session_id();
      }
      $username = $this->userdata['users'][$userId]['username'];
    }

    /*
     * authentication with username/password
     */
    elseif ( count( $params ) == 2 )
    {
      list( $username, $password ) = $params;

      $userId = $this->getUserId( $username );
      $sessionId = session_id();
      if ( $userId === false )
      {
        return array(
          'error' => "Unknown user $username",
          'sessionId' => $sessionId
        );
      }

      if ( $this->userdata['users'][$userId]['password'] == $password )
      {
        /*
         * start new user session
         */
        $sessionId = session_id();
      }
      else
      {
        return array(
          'error' => "Wrong password!",
          'sessionId' => $sessionId
        );
      }
    }
    else
    {
      trigger_error( "Wrong parameter count");
    }


    /*
     * permissions
     */
    $permissions = $this->getPermissions( $userId );

    /*
     * save user session
     */
    $_SESSION['usersession'] = array(
      'userId'      => $userId,
      "username"    => $username,
      "fullname"    => $this->userdata['users'][$userId]['fullname'],
      "permissions" => $permissions,
      "editable"    => false,
      "sessionId"   => $sessionId,
      "error"       => false,
      "anonymous"   => ($userId == 4)
    );

    /*
     * return permissions and a session id
     */
    return $_SESSION['usersession'];
  }

  /**
   * Logout current user
   */
  function method_logout()
  {
    return $this->method_authenticate( array( null ) );
  }

  /**
   * Terminate a session completely
   */
  function method_terminate()
  {
    session_destroy();
    return true;
  }

  /**
   * Returns the id of the user name or false if username does not exist
   * @return int|false
   */
  function getUserId( $username )
  {
    foreach( $this->userdata['users'] as $index => $user )
    {
      if ( $user['username'] == $username )
      {
        return $index;
      }
    }
    return false;
  }

  /**
   * Return the permissions of a user
   */
  function getPermissions( $user )
  {
    $userId = is_numeric( $user ) ? $user : $this->getUserId( $user );

    if ( $userId===false) trigger_error("No valid user id.");

    $roleIds = $this->userdata['users_roles'][$userId];

    $permissions = array();
    foreach( $roleIds as $roleId )
    {
      $permIds = $this->userdata['roles_permissions'][$roleId];
      foreach ( $permIds as $permId )
      {
        $permissions[] = $this->userdata['permissions'][$permId];
      }
    }

    return $permissions;
  }

  /**
   * Example userdata
   */
  var $userdata = array(

    'users' => array(
      0 => array(
        'username' => "user1",
        'fullname' => "User 1",
        'password' => "user1"
      ),
      1 => array(
        'username' => "user2",
        'fullname' => "User 2",
        'password' => "user2"
      ),
      2 => array(
        'username' => "user3",
        'fullname' => "User 3",
        'password' => "user3"
      ),
      3 => array(
        'username' => "admin",
        'fullname' => "Administrator",
        'password' => "admin"
      ),
      4 => array(
        'username' => "anonymous",
        'fullname' => "Anonymous User",
      )
    ),

    'roles' => array(
      0 => 'anonymous',
      1 => 'user',
      2 => 'manager',
      3 => 'administrator'
    ),

    'permissions' => array(
      0 => 'viewRecord',
      1 => 'createRecord',
      2 => 'deleteRecord',
      3 => 'manageUsers',
      4 => 'manageConfig',
      5 => 'changeAdminValue'
    ),

    'users_roles' => array(
      0 => array( 1 ),
      1 => array( 1 ),
      2 => array( 1, 2 ),
      3 => array( 1,2,3 ),
      4 => array( 0 )
    ),

    'roles_permissions' => array(
      0 => array( 0 ),
      1 => array( 0, 1, 4 ),
      2 => array( 2 ),
      3 => array( 3, 5 )
    )
  );
}
?>