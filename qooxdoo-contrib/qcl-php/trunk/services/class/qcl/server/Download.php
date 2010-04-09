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

/**
 * Download server
 * -- not yet functional --
 *
 */
class qcl_server_Download
  extends qcl_core_Object
{
  /**
   * Not used, only here for compatibility
   * @var array
   */
  public $servicePaths = array();

  /**
   * Download a file, given its datasource
   * @return unknown_type
   */
  public function start()
  {

    //$this->debug("Starting download ...");

    $filename   = $_REQUEST['download'];
    $datasource = $_REQUEST['datasource'];
    $sessionId  = $_REQUEST['sessionId'];

    if ( ! $filename or ! $datasource or ! $sessionId )
    {
      echo "Invalid parameters.";
      exit;
    }

    /*
     * authentication
     */
    $accessController = $this->getUserController();
    if ( ! $sessionId or
         ! $accessController->isValidUserSession( $sessionId ) )
    {
      /*
       * check http basic authentication
       */
      $username = $_SERVER['PHP_AUTH_USER'];
      $password = $_SERVER['PHP_AUTH_PW'];
      if ( ! $username or
           ! $accessController->authenticate( $username, $password ) )
      {
        header('WWW-Authenticate: Basic realm="Download Area"');
        header('HTTP/1.0 401 Unauthorized');
        exit;
      }
    }

    /*
     * Check active user
     * @todo add config key to allow anonymous downloads
     */
    $activeUser  = $accessController->getActiveUser();
    //$configModel = $accessController->getConfigModel();
    if ( $activeUser->isAnonymous() )
    {
      $this->abort( "Anonymous downloads are not permitted.");
    }

    $this->info(
      "Downlaod of '$filename' from '$datasource' authorized for " .
       $activeUser->username() .
      " (Session #" . $accessController->getSessionId() . ")."
    );

    /*
     * get datasource model
     */
    require_once "qcl/data/datasource/Manager.php";
    $dsController = new qcl_data_datasource_Manager( $this );
    $dsModel      = $dsController->getDatasourceModel( $datasource );
    if ( ! $dsModel->isFileStorage() )
    {
      $this->abort( "'$datasource' is not a file storage!");
    }

    /*
     * check access
     */
    if ( ! $dsModel->isActive() or
         ( $dsModel->isHidden() and $dsModel->getOwner() != $activeUser->username() )
    )
    {
      $this->abort( "Access to '$datasource' forbidden." );
    }

    /*
     * get file
     */
    $folder = $dsModel->getFolderObject();
    if ( ! $folder->has( $filename ) )
    {
      $this->abort( "File '$filename' does not exist in storage '$datasource'" );
    }
    $file = $folder->get( $filename );

    /*
     * send headers
     */
    header("Content-Type: application/octet-stream");
    header("Content-Disposition: attachment; filename=\"$filename\"");

    /*
     * stream file content to client
     */
    $file->open("r");
    while ( $data = $file->read(8*1024) )
    {
      echo $data;
    }
    $file->close();
    exit;
  }


}
?>