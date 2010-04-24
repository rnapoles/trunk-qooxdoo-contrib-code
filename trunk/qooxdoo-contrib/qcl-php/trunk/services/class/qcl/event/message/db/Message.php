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

qcl_import( "qcl_data_model_db_ActiveRecord" );

/**
 * model for messages stored in a database
 */
class qcl_event_message_db_Message
  extends qcl_data_model_db_ActiveRecord
{

  /**
   * Name of the table storing the data
   * for this model
   * @var string
   */
  protected $tableName = "data_Messages";

  /**
   * The properties of this model
   * @var array
   */
  private $properties = array(
    'sessionId' => array(
      'check'     => "string",
      'sqltype'   => "varchar(50)"
    ),
    'name' => array(
      'check'     => "string",
      'sqltype'   => "varchar(100)"
    ),
    'data' => array(
      'check'     => "string",
      'sqltype'   => "blob"
    )
  );

  /**
   * Constructor. Adds properties
   */
  function __construct()
  {
    parent::__construct();
    $this->addProperties( $this->properties );
  }

  /**
   * Returns singleton instance.
   * @static
   * @return qcl_event_message_db_Message
   */
  public static function getInstance()
  {
    return qcl_getInstance( __CLASS__ );
  }
}
?>