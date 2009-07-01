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
require_once "qcl/data/model/xmlSchema/DbModel.php";

/**
 * Model that stores the available Plugins in a database table
 */
class qcl_application_plugin_DbModel extends qcl_data_model_xmlSchema_DbModel
{

  /**
   * the path to the model schema xml file. ususally automatically resolved.
   * @see qcl_data_model_xmlSchema_DbModel::getSchmemaXmlPath()
   * @var string
   */
  var $schemaXmlPath = "qcl/application/plugin/DbModel.xml";

}
?>