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
   * Creates a new model record, optionally setting initial
   * property values.
   * @param $namedId
   * @param array|null Optional map of properties to set
   * @return int Id of the record
   */
  public function create( $namedId, $data )
  {
    /*
     * check named id
     */
    if ( ! is_string($namedId) )
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
    $this->init();
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
     * return the id
     */
    return $id;
  }

  /**
   * Creates a new model record if one with the given named id does
   * not already exist.
   * @param string  $namedId
   * @return int the id of the inserted or existing record
   */
  public function createIfNotExists( $namedId  )
  {
    $id = $this->namedIdExists( $namedId );
    if ( $id === false )
    {
     $id = $this->create( $namedId );
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
   * @param string|int $id
   * @return array|false Record data or false if no record was found.
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
        return $result;
      }
      else
      {
        throw new qcl_data_model_RecordNotFoundException( sprintf(
          "Named model instance [%s#%s] does not exist",
          $this->className(), $id
        ) );
      }
    }
    elseif ( is_numeric( $id ) )
    {
      return parent::load( $id );
    }
    else
    {
      $this->raiseError("Invalid parameter.");
    }
  }
}
?>