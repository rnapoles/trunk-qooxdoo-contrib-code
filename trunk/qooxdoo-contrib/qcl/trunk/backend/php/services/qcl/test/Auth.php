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

require_once "qcl/test/AbstractStore.php";
require_once "qcl/access/IAuthentication.php";

/**
 * Class providing a backend for mock authentication
 * @author bibliograph
 *
 */
class class_Auth extends AbstractStore implements qcl_access_IAuthentication
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
      
      if ( $sessionId )
      {
        if ( $_SESSION['usersession']['sessionId'] == $sessionId )
        {
          $userId = $_SESSION['usersession']['userId'];  
        }        
        else
        {
          trigger_error("Wrong session id!");
        }
      }
      else
      {
        /*
         * start anonymous session
         */
        $userId = 4; /* anonymous */
        $sessionId = md5( rand(1,10000) );      
      }
      
    } 
    
    /*
     * authentication with username/password
     */
    elseif ( count( $params ) == 2 )
    {
      list( $username, $password ) = $params;
      
         $userId = $this->getUserId( $username );
      if ( $userId === false )
      {
        return array(
          'error' => "Unknown user $username"
        );      
      }

      if ( $this->userdata['users'][$userId]['password'] == $password )
      {
        /*
         * start new user session
         */
        $sessionId = md5( rand(1,10000) );
      }
      else
      {
        return array(
          'error' => "Wrong password!"
        );    
      }      
    }
    else
    {
      trigger_error( "Wrong parameter count");
    }
    
    /*
     * create new session
     */
    session_destroy();
    session_id( $sessionId );
    session_start();
    
    
    /*
     * save user session
     */
    $_SESSION['usersession'] = array(
      'userId'    => $userId,
      'sessionId' => $sessionId
    );
    
    /*
     * return permissions and a session id
     */
    return array(
      "permissions" => $this->getPermissions( $userId ),
      "sessionId"   => $sessionId 
    );    
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
        'password' => "user1"      
      ),
      1 => array(
        'username' => "user2",
        'password' => "user2"      
      ),
      2 => array(
        'username' => "user3",
        'password' => "user3"      
      ),
      3 => array(
        'username' => "admin",
        'password' => "admin"      
      ),
      4 => array(
        'username' => "anonymous"
      )
    ),
    
    'roles' => array(
      0 => 'anonymous',
      1 => 'user',
      2 => 'manager',
      3 => 'administrator'
    ),
    
    'permissions' => array(
      0 => 'createRecord',
      1 => 'deleteRecord',
      2 => 'manageUsers'
    ),
    
    'users_roles' => array(
      0 => array( 1 ),
      1 => array( 1 ),
      2 => array( 1, 2 ),
      3 => array( 1,2,3 ),
      4 => array( 0 ) 
    ),
    
    'roles_permissions' => array(
      0 => array(), /* guest has no permissions */
      1 => array( 0 ),
      2 => array( 1 ),
      3 => array( 2 )
    )
  );
}
?>