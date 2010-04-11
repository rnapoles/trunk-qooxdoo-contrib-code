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

qcl_import( "qcl_data_model_db_NamedActiveRecord" );

/**
 * Model that registers the relationship between datasource schema name
 * and class name.
 */
class qcl_data_datasource_RegistryModel
  extends qcl_data_model_db_NamedActiveRecord
{

  //-------------------------------------------------------------
  // Model properties
  //-------------------------------------------------------------

  /**
   * The model properties
   */
  private $properties = array(
    'class' => array(
      'check'   => "string",
      'sqltype' => "varchar(100)"
    ),
    'description' => array(
      'check'   => "string",
      'sqltype' => "varchar(255)"
    ),
    'active' => array(
      'check'   => "boolean",
      'sqltype' => "tinyint(1)"
    )
  );

  //-------------------------------------------------------------
  // Initialization
  //-------------------------------------------------------------

  /**
   * Constructor
   */
  function __construct()
  {
    parent::__construct();
    $this->addProperties( $this->properties );
  }


  /**
   * Returns singleton instance of this class.
   * @return qcl_data_datasource_RegistryModel
   */
  public static function getInstance()
  {
    return qcl_getInstance(__CLASS__);
  }

}
?>