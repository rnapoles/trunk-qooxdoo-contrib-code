<?php
require_once "qcl/access/model/Common.php";

/**
 * class providing data on permissions
 * providing a backend to the qcl.auth client package
 *
 * Class cannot be used directly, you need to subclass it
 * in your application service class folder
 */

class qcl_access_model_Permission extends qcl_access_model_Common
{

   var $schemaXmlPath  = "qcl/access/model/Permission.model.xml";
   var $importDataPath = "qcl/access/model/Permission.data.xml";

  /**
   * Returns singleton instance.
   * @static
   * @return qcl_access_model_Permission
   */
  function &getInstance( $class=__CLASS__ )
  {
    return parent::getInstance( $class );
  }

  /**
   * Creates a new permission. throws an error if permission already exists
   * @overridden
   * @param string $namedId
   * @param int[optional] $roleId
   */
 	function create( $namedId, $roleId=null )
 	{
 	 	if ( ! $roleId )
 		{
      $roleModel  =& qcl_access_model_Role::getInstance();
   	  $roleId	    =  $roleModel->createIfNotExists("qcl.roles.Unassigned");
 		}
 		return parent::create( $namedId, $roleId );
 	}
}
?>