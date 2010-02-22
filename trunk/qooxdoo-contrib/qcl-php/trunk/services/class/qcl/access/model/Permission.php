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
require_once "qcl/access/model/Common.php";

/**
 * Permission class
 */
class qcl_access_model_Permission extends qcl_access_model_Common
{

   var $schemaXmlPath  = "qcl/access/model/Permission.model.xml";


  /**
   * Returns singleton instance.
   * @static
   * @return qcl_access_model_Permission
   */
  function getInstance()
  {
    return qcl_getInstance(__CLASS__);
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
      $roleModel  = qcl_access_model_Role::getInstance();
   	  $roleId	    =  $roleModel->createIfNotExists("qcl.roles.Unassigned");
 		}
 		return parent::create( $namedId, $roleId );
 	}
}
?>