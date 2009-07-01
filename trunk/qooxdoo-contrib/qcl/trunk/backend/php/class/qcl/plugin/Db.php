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
require_once "qcl/plugin/Abstract.php";

/**
 * Plugin management class, using a database backend
 * does not inherit from abstract class, but directly from qc_db_model
 * The class cannot be used directly, you need to subclass it in your application
 */

class qcl_plugin_Db extends qcl_data_model_xmlSchema_DbModel
{

  /**
   * the path to the model schema xml file. ususally automatically resolved.
   * @see qcl_data_model_xmlSchema_DbModel::getSchmemaXmlPath()
   * @var string
   */
  var $schemaXmlPath = "qcl/plugin/Db.model.xml";

	//-------------------------------------------------------------
  // public methods
  //-------------------------------------------------------------

  /**
   * initializes the plugins in the filesystem
   * @return
   */
  function initializeAll()
  {
    $this->info("*** Initializing plugins." );

    $controller   =& $this->getController();
    $plugin_path  =  $controller->getIniValue("service.plugin_path");

    // repopulate plugins table
    // @todo
    $table = $this->table();
    $this->db->execute("TRUNCATE `$table`;" );

    foreach ( scandir($plugin_path) as $dir )
    {
      $file = "$plugin_path/$dir/plugin.php";
      if ( $file != ".." and $file != "." and is_file( $file ) )
      {
        require_once ($file);
        $class  = "{$dir}_plugin";
        $plugin = new $class ( &$controller );
        $active = $plugin->initialize();
        $error  = $plugin->getError();

        $row = array();
        $row['namedId']     = (string)  $plugin->getNamedId();
        $row['description'] = (string)  $plugin->getDescription();
        $row['active']      = (int)     $active;
        $row['status']      = $active ? "OK" : $error;
        $row['author']      = (string)  $plugin->getAuthor();
        $row['permission']  = (string)  $plugin->getPermission();

        $this->insert($row);
        if ( $active )
        {
          $this->info("Plugin '$dir' initialized." );
        }
        else
        {
          $this->info("Could not initialize plugin '$dir': $error" );
        }
      }
    }
    return true;
  }

}
?>