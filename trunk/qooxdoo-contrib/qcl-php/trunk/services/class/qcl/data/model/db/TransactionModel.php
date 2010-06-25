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
 * Singleton active record that holds a transaction id for each model that
 * is increased whenever a transaction is successful. This allows to determine
 * on the clients if they are up-to-date or if they have to re-sync
 * their model data. Records are identified by the class name of the model.
 */
class qcl_data_model_db_TransactionModel
  extends qcl_data_model_db_ActiveRecord
{
  //-------------------------------------------------------------
  // Model properties
  //-------------------------------------------------------------

  protected $tableName = "data_Transaction";

  private $properties = array(
    'datasource'  => array(
      'check'     => "string",
      'sqltype'   => "varchar(50)"
    ),
    'class'  => array(
      'check'     => "string",
      'sqltype'   => "varchar(100)"
    ),
    'transactionId'  => array(
      'check'     => "integer",
      'sqltype'   => "int(11) default 0",
      'nullable'  => false,
      'init'      => 0 // FIXME init-->default
    )
  );

  private $indexes = array(
    "datasource_class_index" => array(
      "type"        => "unique",
      "properties"  => array("datasource","class")
    )
  );

  //-------------------------------------------------------------
  // init
  //-------------------------------------------------------------

  function __construct()
  {
    parent::__construct();
    $this->addProperties( $this->properties );
    $this->addIndexes( $this->indexes );
  }

  /**
   * Returns singleton instance of this class
   * @return qcl_data_model_db_TransactionModel
   */
  static function getInstance()
  {
    return qcl_getInstance(__CLASS__);
  }

  /**
   * Overridden to deactive transaction for this model
   */
  public function getTransactionId()
  {
    return 0;
  }

  /**
   * Overridden to deactive transaction for this model
   */
  public function incrementTransactionId(){}

  //-------------------------------------------------------------
  // API
  //-------------------------------------------------------------

  /**
   * Getter for the transaction id for a model
   * @param qcl_data_model_AbstractActiveRecord $model
   * @return int The transaction id
   */
  public function getTransactionIdFor( qcl_data_model_AbstractActiveRecord $model )
  {
    $class      = $model->className();
    $datasource = $model->datasourceModel() ? $model->datasourceModel()->namedId() : null;
    try
    {
      $this->loadWhere( array(
        'class'       => $class,
        'datasource'  => $datasource
      ) );
    }
    catch ( qcl_data_model_RecordNotFoundException $e)
    {
      $this->create( array(
        'class'         => $class,
        'datasource'    => $datasource,
        'transactionId' => 0
      ) );
    }

    return $this->_get("transactionId");
  }

  /**
   * Setter for the id of the parent node.
   * @param qcl_data_model_AbstractActiveRecord $model
   * @return int The new transaction id
   */
  public function incrementTransactionIdFor( qcl_data_model_AbstractActiveRecord $model )
  {
    $id = $this->getTransactionIdFor( $model );
    $this->_set("transactionId", ++$id);
    $this->save();
    return $id;
  }

  /**
   * Resets the transaction id
   * @param qcl_data_model_AbstractActiveRecord $model
   * @return void
   */
  public function resetTransactionIdFor( qcl_data_model_AbstractActiveRecord $model )
  {
    $this->getTransactionIdFor( $model );
    $this->_set("transactionId", 0);
    $this->save();
  }
}
?>