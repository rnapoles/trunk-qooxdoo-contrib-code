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

class qcl_test_application_ApplicationCache
  extends qcl_data_model_db_PersistentObject
{
  public $dataImported = false;

  /**
   * @return qcl_test_application_ApplicationCache
   */
  static public function getInstance()
  {
    return qcl_getInstance( __CLASS__ );
  }
}

/**
 * Main application class.
 *
 */
class qcl_test_application_Application
  extends qcl_application_Application
{

  /**
   * Hardcoding the path to the application file so that other
   * test applications can subclass this class and use the ini
   * file.
   * @var string
   */
  protected $iniPath = "qcl/test/application/application.ini.php";

  /**
   * Starts the application, does on-the-fly database setup
   * objects
   */
  public function main()
  {
    $this->getLogger()->setFilterEnabled(QCL_LOG_APPLICATION, true );

    $request = qcl_server_Request::getInstance();
    $params = array();
    foreach( $request->getParams() as $param )
    {
      if ( ! is_scalar( $param ) )
      {
        $param = typeof( $param, true );
      }
      $params[] = $param;
    }
    $this->log( sprintf(
      "Starting qcl test service: %s.%s( %s ) ...",
      $request->getService(), $request->getMethod(), implode(", ", $params )
    ), QCL_LOG_APPLICATION );

    //$this->startLogging();

    /*
     * reset internal caches - only for debugging
     */
    qcl_data_model_db_ActiveRecord::resetBehaviors();

    /*
     * application cache
     */
    $cache = qcl_test_application_ApplicationCache::getInstance();

    /**
     * Register the services provided by this application
     */
    $this->registerServices( array(
      "qcl.test.application.test1" => "qcl.test.application.ApplicationTests",
      "qcl.test.application.test2" => "qcl_test_application_ApplicationTests",
      "qcl.test.application.test3" => "qcl_access_Service"
    ) );

    /*
     * Load initial data into models if that hasn't happened yet
     */
    if ( ! $cache->get("dataImported") )
    {
       $this->log("Importing data ....", QCL_LOG_APPLICATION );
       $this->importInitialData( array(
        'config'      => "qcl/test/application/data/Config.xml",
        'user'        => "qcl/test/application/data/User.xml",
        'permission'  => "qcl/test/application/data/Permission.xml",
        'role'        => "qcl/test/application/data/Role.xml",
       ) );
       $cache->set( "dataImported", true );
    }
    //$this->endLogging();
  }

  protected function startLogging()
  {
    $this->getLogger()->setFilterEnabled( QCL_LOG_APPLICATION, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_CONFIG, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_ACCESS, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_MODEL, true );
    //$this->getLogger()->setFilterEnabled( QCL_LOG_TABLES, true );
    //$this->getLogger()->setFilterEnabled( QCL_LOG_PROPERTIES, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_MODEL_RELATIONS, true );
    //$this->getLogger()->setFilterEnabled( QCL_LOG_DB, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_PERSISTENCE, true );

  }

  protected function endLogging()
  {
    $this->getLogger()->setFilterEnabled( QCL_LOG_DB, false );
    $this->getLogger()->setFilterEnabled( QCL_LOG_TABLES, false );
    $this->getLogger()->setFilterEnabled( QCL_LOG_MODEL, true );
    $this->getLogger()->setFilterEnabled( QCL_LOG_PROPERTIES, false );
    $this->getLogger()->setFilterEnabled( QCL_LOG_MODEL_RELATIONS, false );
    $this->getLogger()->setFilterEnabled( QCL_LOG_APPLICATION, false );
  }
}
?>