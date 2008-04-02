<?php

require_once ("qcl/plugin/abstract.php");

/**
 * plugin management class, using a database backend
 * does not inherit from abstract class, but directly from qc_db_model
 * The class cannot be used directly, you need to subclass it in your application
 */

class qcl_plugin_db extends qcl_db_model
{    

	//-------------------------------------------------------------
  // class variables
	//------------------------------------------------------------- 
	
	var $table 					      = "plugins";
	var $key_id 				      = null; // no numeric id
	var $key_type 				    = "type";
	var $key_active 			    = "active";
	var $key_permission 	    = "permissionRead";
  var $key_author           = "author";
  var $key_description      = "description";

	//-------------------------------------------------------------
  // internal methods
	//------------------------------------------------------------- 
   
 	/**
 	 * constructor
 	 * @param object reference $controller
   */
 	function __construct($controller)
 	{
    parent::__construct(&$controller);
    // initialize tables
    $this->initializeTables($this->table); 
	}
	
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
    $this->db->execute("TRUNCATE {$this->table};" );
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