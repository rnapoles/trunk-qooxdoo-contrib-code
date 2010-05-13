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

qcl_import( "qcl_data_controller_Controller" );
qcl_import( "qcl_access_IAccessService" );
qcl_import( "qcl_access_AuthenticationResult" );

/**
 * Service providing methods for authentication and authorization
 *
 */
class qcl_access_Service
  extends qcl_data_controller_Controller
//  implements qcl_access_IAccessService
{

  /**
   * Flag to indicate whether a new user was created during
   * the authentication process
   * @var string
   */
  protected $newUser = null;


  /**
   * Flag to indicate that user was authenticated from LDAP
   * @var bool
   */
  protected $ldapAuth = false;

  /**
   * Actively authenticate the user with session id or with username and password.
   * Returns data for the authentication store. This will also try to authenticate
   * with a remote LDAP store if this is enabled in the application.ini.php file.
   *
   * @param string $first If two arguments, this is the username. If one argument,
   * this is the session id. If no argument, use the session id that has already
   * been established by the access behavior.
   * @param string $password (MD5-encoded) password
   * @return qcl_access_AuthenticationResult
   * @throws qcl_access_AuthenticationException
   */
  public function method_authenticate( $first=null, $password=null )
  {
    $app = $this->getApplication();
    $accessController = $app->getAccessController();
    $activeUserId = $this->getActiveUser()->id();

    /*
     * purge inactive users and sessions
     */
    $accessController->cleanup();

    /*
     * authentication with session id
     */
    if ( is_null( $first )  or is_null( $password ) )
    {
      $sessionId = either( $first, $this->getSessionId() );
      $this->log("Authenticating from existing session '$sessionId'...", QCL_LOG_ACCESS);
      $userId = $accessController->getUserIdFromSession( $sessionId );
    }

    /*
     * username-password-authentication
     */
    else
    {
      $username   = utf8_decode($first);
      $password   = utf8_decode($password);

      /*
       * is ldap authentication enabled? If yes, try to authenticate
       * using LDAP. if this fails, try to authenticate locally
       */
      if( $app->getIniValue("ldap.enabled") )
      {
        try
        {
          $userId = $this->authenticateByLdap( $username, $password );
          $this->ldapAuth = true;
        }
        catch( qcl_access_AuthenticationException $e)
        {
          $this->log("LDAP authentication failed, trying to authenticate locally ...", QCL_LOG_ACCESS);
          $userId = $accessController->authenticate( $username, $password );
        }
      }

      /*
       * otherwise authenticate from local database
       */
      else
      {
        $this->log("Authenticating locally from username/password ...", QCL_LOG_ACCESS);
        $userId = $accessController->authenticate( $username, $password );
      }

      $this->log("Authenticated user: #$userId", QCL_LOG_ACCESS);

      /*
       * authentication successful, logout the accessing user to log in the
       * new one.
       */
      if ( $activeUserId and $userId != $activeUserId )
      {
        $accessController->logout();
        $accessController->createSessionId();
      }
    }

    /*
     * create (new) valid user session
     */
    $accessController->createUserSessionByUserId( $userId );

    /*
     * response data
     */
    $response = new qcl_access_AuthenticationResult();
    $activeUser = $accessController->getActiveUser();
    $permissions = $activeUser->permissions();
    $response->set( "permissions", $permissions );

    /*
     * session id
     */
    $sessionId  = $this->getSessionId();
    $response->set( "sessionId",$sessionId);

    /*
     * user data
     */
    $response->set( "userId", (int) $activeUser->getId() );
    $response->set( "anonymous", $activeUser->isAnonymous() );
    $response->set( "username", $activeUser->username() );
    $response->set( "fullname", $activeUser->get("name") );

    /*
     * user data is editable only if the user is not anonymous
     * and not an ldap-authenticated user.
     */
    $response->set( "editable", ( ! $activeUser->isAnonymous()  and ! $activeUser->getLdap() ) );

    /*
     * no error
     */
    $response->set( "error", false );

    /*
     * return data to client
     */
    return $response;
  }

  /**
   * Authenticate using a remote LDAP server.
   * @param $username
   * @param $password
   * @return int User Id
   */
  protected function authenticateByLdap( $username, $password )
  {
    $this->log("Authenticating against LDAP server...", QCL_LOG_ACCESS);

    $app = $this->getApplication();
    $host = $app->getIniValue( "ldap.host" );
    $port = (int) $app->getIniValue( "ldap.port" );
    $user_base_dn = $app->getIniValue( "ldap.user_base_dn" );

    qcl_assert_valid_string( $host );
    qcl_assert_valid_string( $user_base_dn );

    /*
     * create new LDAP server object
     */
    qcl_import( "qcl_access_LdapServer" );
    $ldap = new qcl_access_LdapServer( $host, $port );

    /*
     * authenticate in remote
     */
    $userdn = "uid=$username,$user_base_dn";
    $this->log("Authenticating $userdn against $host:$port.", QCL_LOG_ACCESS);
    $ldap->authenticate( $userdn, $password );

    /*
     * if LDAP authentication succeeds, assume we have a valid
     * user. if this user does not exist, create it with "user" role
     */
    $userModel = $app->getAccessController()->getUserModel();
    try
    {
      $userModel->load( $username );
      $userId = $userModel->id();
    }
    catch( qcl_data_model_RecordNotFoundException $e)
    {
      $userId = $this->createUserFromLdap( $ldap, $username );
      $this->newUser = $username;
    }
    return $userId;
  }

  /**
   * Creates a new user from an authenticated LDAP connection.
   * Receives as parameter a qcl_access_LdapServer object that
   * has already been successfully bound, and the username. The
   * default behavior is to use the attributes "cn", "sn","givenName"
   * to determine the user's full name and the "mail" attribute to
   * determine the user's email address.
   * Returns the newly created local user id.
   *
   * @param qcl_access_LdapServer $ldap
   * @param string $username
   * @return int User id
   * @throws qcl_access_LdapException in case no information can be
   * retrieved.
   */
  protected function createUserFromLdap( qcl_access_LdapServer $ldap, $username )
  {
    $app = $this->getApplication();
    $userModel = $app->getAccessController()->getUserModel();
    $user_base_dn = $app->getIniValue("ldap.user_base_dn");
    $attributes = array( "cn", "sn","givenName","mail" );
    $filter = "(uid=$username)";

    $this->log("Retrieving user data from LDAP base dn '$user_base_dn' with filter '$filter'", QCL_LOG_ACCESS);
    $ldap->search( $user_base_dn, $filter, $attributes);
    if ( $ldap->countEntries() == 0 )
    {
      throw new qcl_access_LdapException("Failed to retrieve user information from LDAP.");
    }
    $entries = $ldap->getEntries();

    /*
     * Full name of user
     */
    if( isset( $entries[0]['cn'][0] ) )
    {
      $name = $entries[0]['cn'][0];
    }
    elseif ( isset( $entries[0]['sn'][0] ) and isset( $entries[0]['givenName'][0] ) )
    {
      $name = $entries[0]['givenName'][0] . " " . $entries[0]['sn'][0];
    }
    elseif ( isset( $entries[0]['sn'][0] ) )
    {
      $name = $entries[0]['sn'][0];
    }
    else
    {
      $name = $username;
    }

    /*
     * Email address
     */
    if ( isset( $entries[0]['mail'][0] ) )
    {
      $email = $entries[0]['mail'][0];
    }
    else
    {
      $email = "";
    }

    /*
     * create new user
     */
    $userModel->create( $username, array(
      'name'  => $name,
      'email' => $email,
      'ldap'  => true
    ) );
    $roleModel = $app->getAccessController()->getRoleModel();
    $roleModel->load(QCL_ROLE_USER);
    $userModel->linkModel($roleModel);

    return $userModel->id();
  }


  /**
   * Service method to log out the active user. Automatically creates guest
   * access. Override this method if this is not what you want.
   * @return qcl_data_Result
   */
  public function method_logout()
  {
    $accessController = $this->getApplication()->getAccessController();

    /**
     * log out only if the current session id and the requesting session id match
     */
    $requestingSessionId = qcl_server_Request::getInstance()->getServerData("sessionId") ;
    if ( $requestingSessionId and $this->getSessionId() != $requestingSessionId )
    {
      $this->log("Session that requested logout already terminated, no need to log out.",QCL_LOG_ACCESS);
    }
    else
    {
      $accessController->logout();
      $accessController->grantAnonymousAccess();
    }

    /*
     * return authentication data
     */
    return $this->method_authenticate(null);
  }

  /**
   * Service method to terminate a session (remove session and user data).
   * Useful for example when browser window is closed.
   * @return qcl_data_Result
   */
  public function method_terminate()
  {
    $this->getApplication()->getAccessController()->terminate();
    return null;
  }

  public function method_testLdap()
  {
    $username = "YYYYY";
    $password = "XXXX";

    $ldappassword = $this->ssha_encode($password);
    $this->debug("'$ldappassword'",__CLASS__,__LINE__);
    $this->authenticateByLdap($username,$ldappassword);
  }

  public function makeSshaPassword($password)
  {
    mt_srand((double)microtime()*1000000);

    $salt = mhash_keygen_s2k( MHASH_SHA1, $password, substr( pack('h*', md5(mt_rand())), 0, 8), 4);

    $hash = "{SSHA}".base64_encode(mhash(MHASH_SHA1, $password.$salt).$salt);
    return $hash;
  }

  public function validateSshaPassword($password, $hash)
  {
    $hash = base64_decode(substr($hash, 6));
    $original_hash = substr($hash, 0, 20);
    $salt = substr($hash, 20);
    $new_hash = mhash(MHASH_SHA1, $password . $salt);
    return (strcmp($original_hash, $new_hash) == 0);
  }

  function ssha_encode($text)
  {
    mt_srand((double)microtime()*1000000);
    $salt = pack("CCCCCCCC", mt_rand(), mt_rand(), mt_rand(), mt_rand(), mt_rand(), mt_rand(), mt_rand(), mt_rand());
    $sshaPassword = "{SSHA}" . base64_encode( pack("H*", sha1($newpasswd . $salt)) . $salt);
    return $sshaPassword;
  }

  function ssha_check($text,$hash)
  {
    $ohash = base64_decode(substr($hash,6));
    $osalt = substr($ohash,20);
    $ohash = substr($ohash,0,20);
    $nhash = pack("H*",sha1($text.$osalt));
    return $ohash == $nhash;
  }

}
?>