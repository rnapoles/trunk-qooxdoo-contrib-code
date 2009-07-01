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

require_once "qcl/data/model/Abstract.php";

/**
 * abstract class for classes that implement a plugin
 *
 */

class qcl_plugin_Abstract extends qcl_data_model_Abstract
{
	//-------------------------------------------------------------
  // properties
	//-------------------------------------------------------------

  var $name;
  var $description;
  var $permission;
  var $author;

	//-------------------------------------------------------------

	function getNamedId()
  {
    return $this->namedId;
  }

	function getDescription()
  {
    return $this->description;
  }

	function getPermission()
  {
    return $this->permissionModel;
  }

  function getAuthor()
  {
    return $this->author;
  }


 	/**
	 * checks whether plugin works (i.e., if dependencies are met)
	 * if an error occurs, it can be retrieved with the getEror method.
	 * @return boolean if plugin was initialized without error
	 */
	function initialize() {}



}

