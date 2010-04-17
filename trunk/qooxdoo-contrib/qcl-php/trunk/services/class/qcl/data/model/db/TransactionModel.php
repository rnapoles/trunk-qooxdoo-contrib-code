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
 * Singleton active record that holds a transaction id for each model that
 * is increased whenever a transaction is successful. This allows to determine
 * on the clients if they are up-to-date or if they have to re-sync
 * their model data. Records are identified by the class name of the model.
 */
class qcl_data_model_db_TransactionModel
  extends qcl_data_model_db_NamedActiveRecord
{
  //-------------------------------------------------------------
  // Model properties
  //-------------------------------------------------------------

  protected $tableName = "data_Transaction";

  private $properties = array(

    'transactionId'  => array(
      'check'     => "integer",
      'sqltype'   => "int(11) NOT NULL",
      'nullable'  => false,
      'init'      => 0
    )
  );

  //-------------------------------------------------------------
  // init
  //-------------------------------------------------------------

  function __construct()
  {
    parent::__construct();
    $this->addProperties( $this->properties );
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
  protected function getTransactionId(){}

  /**
   * Overridden to deactive transaction for this model
   */
  protected function incrementTransactionId(){}

  //-------------------------------------------------------------
  // API
  //-------------------------------------------------------------

  /**
   * Getter for the transaction id for a model
   * @param qcl_data_model_AbstractActiveRecord $model
   * @return int The transaction id
   */
  function getTransactionIdFor( qcl_data_model_AbstractActiveRecord $model )
  {
    $className = $model->className();
    try
    {
      $this->load( $className );
    }
    catch ( qcl_data_model_RecordNotFoundException $e)
    {
      $this->create( $className );
    }
    return $this->get("transactionId");
  }

  /**
   * Setter for the id of the parent node.
   * @param qcl_data_model_AbstractActiveRecord $model
   * @return int The new transaction id
   */
  function incrementTransactionIdFor( qcl_data_model_AbstractActiveRecord $model )
  {
    $id = $this->getTransactionIdFor( $model );
    $this->set("transactionId", $id+1);
    $this->save();
  }
}
?>