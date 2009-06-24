<?php

require_once "qcl/core/Object.php";
require_once "qcl/registry/Request.php";

/**
 * Needed to create an initial table for persistent
 * object. This can be removed once qcl_db_SimpleModel does
 * automatic table creation.
 */
class qcl_persistence_db_Setup
  extends qcl_core_Object
{
  /**
   * File with model schema
   */
  var $schemaXmlPath = "qcl/persistence/db/Model.xml";

  /**
   * Flag to prevent caching
   */
  var $doNotCache = true;

  /**
   * Create an instance of this object to create the
   * persistentObject table in the database. Can be called
   * statically.
   */
  function setup()
  {
    /*
     * check once per request if table has been setup.
     */
    if ( ! qcl_registry_Request::has("qcl_persistence_db_Setup") )
    {
      require_once "qcl/db/Manager.php";
      $db =& qcl_db_Manager::createAdapter();
      $db->execute("
        CREATE TABLE IF NOT EXISTS `persistentObjects` (
          `id` int(11) NOT NULL auto_increment,
          `class` varchar(100) NOT NULL,
          `data` longblob,
          `created` timestamp NOT NULL default '0000-00-00 00:00:00',
          `modified` timestamp NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
          `objectId` varchar(100)  default NULL,
          `userId` int(11) default NULL,
          `sessionId` varchar(32) default NULL,
          `instanceId` varchar(100) default NULL,
          PRIMARY KEY  (`id`),
          KEY `class` (`class`),
          KEY `objectId` (`objectId`),
          KEY `instanceId` (`instanceId`)
        )
      ");
      qcl_registry_Request::set("qcl_persistence_db_Setup",true);
    }
  }


}

?>