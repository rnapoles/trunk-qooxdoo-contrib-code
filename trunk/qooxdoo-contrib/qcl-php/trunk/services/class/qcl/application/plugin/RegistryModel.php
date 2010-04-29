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

qcl_import("qcl_data_model_db_ActiveRecord");

class qcl_application_plugin_RegistryModel
  extends qcl_data_model_db_NamedActiveRecord
{
  private $properties = array(
    'name'  => array(
      'check'   => "string",
      'sqltype' => "varchar(255)"
    ),
    'decription'  => array(
      'check'   => "string",
      'sqltype' => "varchar(50)"
    )
  );

  /**
   * Constructor, adds properties
   * @return unknown_type
   */
  function __construct()
  {
    parent::__construct();
    $this->addProperties( $this->properties );
  }
}
?>