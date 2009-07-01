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
require_once "qcl/db/model/xmlSchema/Model.php";

/**
 * Model that stores the available Plugins in a database table
 */
class qcl_plugin_DbModel extends qcl_db_model_xmlSchema_Model
{

  /**
   * the path to the model schema xml file. ususally automatically resolved.
   * @see qcl_db_model_xmlSchema_Model::getSchmemaXmlPath()
   * @var string
   */
  var $schemaXmlPath = "qcl/plugin/DbModel.xml";

}
?>