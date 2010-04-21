<?php
/* ************************************************************************

   qcl - the qooxdoo component library

   http://qooxdoo.org/contrib/project/qcl/

   Copyright:
     2007-2009 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Chritian Boulanger (cboulanger)

************************************************************************ */

qcl_import( "qcl_application_Application" );
qcl_import( "qcl_data_model_db_PersistentObject" );

class access_ApplicationCache
  extends qcl_data_model_db_PersistentObject
{
  public $dataImported = false;
}

/**
 * Main application class
 *
 */
class access_Application
  extends qcl_application_Application
{

 /**
   * The path to the application ini-file
   * Can be omitted, the framework will automatically find it.
   * @var string
   */
  protected $iniPath = "access/application.ini.php";

  /**
   * Starts the application, does on-the-fly database setup
   * objects
   */
  public function main()
  {
    /**
     * Clear internal caches. This is only necessary during development
     * As long as you modify the properties of models.
     */
    qcl_data_model_db_ActiveRecord::resetBehaviors();


    /**
     * Register the services provided by this application
     */
    $this->registerServices( array(
      "access.auth"       => "qcl_access_Service",
      "access.config"     => "qcl_config_Service",
    ) );

    /*
     * Load initial data into models if that hasn't happened yet
     */
    $cache = access_ApplicationCache::getInstance();
    if (  ! $cache->get("dataImported") )
    {
       $this->log("Importing data ....", QCL_LOG_APPLICATION );
       $this->importInitialData( array(
        'config'      => "access/data/Config.xml",
        'user'        => "access/data/User.xml",
        'permission'  => "access/data/Permission.xml",
        'role'        => "access/data/Role.xml",
       ) );
       $cache->set( "dataImported", true );
    }
  }
}
?>