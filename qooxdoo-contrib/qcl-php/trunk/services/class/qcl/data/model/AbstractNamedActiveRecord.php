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

qcl_import( "qcl_data_model_AbstractActiveRecord" );
qcl_import( "qcl_data_model_INamedActiveRecord" );

/**
 * Like qcl_data_model_AbstractActiveRecord, but provides
 * methods that add a "named id" to the model, i.e. a unique
 * string-type name that identifies the model locally or globally,
 * as opposed to the numeric id which is specific to the table.
 */

class qcl_data_model_AbstractNamedActiveRecord
  extends    qcl_data_model_AbstractActiveRecord
//  implements qcl_data_model_INamedActiveRecord
{

  /**
   * Getter for named id
   * @return string
   */
  public function namedId()
  {
    return $this->get("namedId");
  }

  /**
   * Creates a new model record, optionally setting initial
   * property values.
   * @param $namedId
   * @param array|null Optional map of properties to set
   * @return int Id of the record
   */
  public function create( $namedId, $data=null )
  {
    /*
     * initialize model and behaviors
     */
    $this->init();

    /*
     * check named id
     */
    if ( ! is_string( $namedId ) )
    {
      $this->raiseError("Invalid named id '$namedId'" );
    }
    if ( $this->namedIdExists( $namedId) )
    {
      throw new qcl_data_model_RecordExistsException("Named id '$namedId' already exists");
    }

    /*
     * reset properties to default values
     */
    $this->getPropertyBehavior()->initPropertyValues();
    $this->set("namedId", $namedId );
    $this->set("created", new qcl_data_db_Timestamp("now") );

    if( is_array( $data ) )
    {
      $this->set( $data );
    }

    /*
     * insert into database
     */
    $id = $this->getQueryBehavior()->insertRow( $this->data() );

    /*
     * reload the data, in case the database has changed/added something
     */
    $this->load( $id );

    /*
     * log message
     */
    $this->log( sprintf( "Created new model record '%s'.", $this ), QCL_LOG_MODEL );

    /*
     * return the id
     */
    return $id;
  }

  /**
   * Creates a new model record if one with the given named id does
   * not already exist.
   *
   * @param string  $namedId
   * @param array $data The data of the properties that should be set in the model
   * @return int the id of the inserted or existing record
   * @todo this could be optimized to avoid queries
   */
  public function createIfNotExists( $namedId, $data  )
  {
    $id = $this->namedIdExists( $namedId );
    if ( $id === false )
    {
      $id = $this->create( $namedId, $data );
    }
    else
    {
      $this->load( $id );
    }
    return $id;
  }

  /**
   * Checks if a model with the given named id exists.
   * @param $namedId
   * @return int id of record or false if does not exist
   */
  public function namedIdExists( $namedId )
  {
    $bhv = $this->getQueryBehavior();
    $rowCount = $bhv->select( new qcl_data_db_Query( array(
      'select' => "id",
      'where'  => array(
        'namedId' => $namedId
      )
    ) ) );
    if ( $rowCount )
    {
      $result = $bhv->fetch();
      return $result['id'];
    }
    else
    {
      return false;
    }
  }

  /**
   * Loads a model record by numeric id or string-type named id.
   * Returns itself to allow chained method calling.
   * @param string|int $id
   * @return qcl_data_model_db_ActiveRecord
   * @throws qcl_data_model_RecordNotFoundException
   */
  public function load( $id )
  {
    if ( is_string( $id ) )
    {
      $this->getQueryBehavior()->selectWhere( array( "namedId" => $id ) );
      $result = $this->getQueryBehavior()->fetch();
      if ( $result )
      {
        $this->set( $result );
        return $this;
      }
      else
      {
        throw new qcl_data_model_RecordNotFoundException( sprintf(
          "Named model record [%s #%s] does not exist",
          $this->className(), $id
        ) );
      }
    }
    elseif ( is_numeric( $id ) )
    {
      return parent::load( $id );
    }
    $this->raiseError("Invalid parameter.");
  }

  /**
   * Return a string representation of the model
   */
  public function __toString()
  {
    $namedId = $this->getPropertyBehavior()->get("namedId");
    return sprintf( "[%s #%s]", $this->className(), $namedId ? $namedId : "--" );
  }
}
?>