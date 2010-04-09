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
   * Starts the application, does on-the-fly database setup
   * objects
   */
  public function main()
  {
    $this->startLogging();
    qcl_data_model_db_ActiveRecord::resetBehaviors();

    /*
     * Load initial data into models if that hasn't happened yet
     */
    $cache = qcl_test_application_ApplicationCache::getInstance();
    if (  ! $cache->get("dataImported") )
    {
       $this->log("Importing data ....", QCL_LOG_APPLICATION );
       $this->importInitialData( array(
        'config'      => "qcl/test/application/data/Config.xml",
        'user'        => "qcl/test/application/data/User.xml",
        'permission'  => "qcl/test/application/data/Permission.xml",
        'role'        => "qcl/test/application/data/Role.xml",
       ) );
       $cache->set( "dataImported", true );
       $cache->savePersistenceData();
    }
    else
    {
      $this->log("Data has already been imported.", QCL_LOG_APPLICATION );
    }
    $this->endLogging();
  }

  protected function startLogging()
  {
    $this->getLogger()->setFilterEnabled( QCL_LOG_APPLICATION, true );
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