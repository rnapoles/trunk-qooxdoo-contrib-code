<?php
/*
 * dependencies
 */
require_once "qcl/core/PropertyModel.php";

/**
 * Class containing all the methods shared by the qcl_db_model and qcl_db_SimpleModel
 * @todo define interface
 */
class qcl_db_AbstractModel extends qcl_core_PropertyModel
{

  
  /**
   * Inserts a record into a table and returns last_insert_id()
   * @param array|stdClass $data associative array with the column names as keys and the column data as values
   * @return int the id of the inserted row or 0 if the insert was not successful 
   */
  function insert( $data )
  {
    /*
     * check arguments
     */
    $data = $this->_getArrayData($data);
    
    /*
     * convert property names to local aliases
     */
    $data = $this->unschematize($data);   
    
    /*
     * created timestamp by setting it to null
     * @todo is this compatible with all dbms?
     */
    $col_created = $this->getColumnName("created");
    if ( $this->hasProperty("created") and ! isset ( $data[$col_created] ) ) 
    {
      $data[$col_created] = null;
    }
    
    /*
     * insert into database
     */
    //$this->debug($data);
    $id = $this->db->insert( $this->table, $data );
    
    //$this->debug("Created new record #$id in {$this->table} with data: " . print_r($data,true) );
     
    /*
     * retrive record data (which might contain additional values inserted by the database)
     * if the model has an id column and a new id was returned
     */
    if ( $id ) 
    {
      $this->findById($id);
    }
    
    /*
     * return id or 0 if the insert was not successful 
     */
    return $id;
  }
  
  
  /**
   * updates a record in a table identified by id
   * @param array       $data   associative array with the column names as keys and the column data as values
   * @param int|string  $id   if the id key is not provided in the $data paramenter, provide it here (optional)
   * @param bool        $keepTimestamp If true, do not overwrite the 'modified' timestamp
   * @return boolean success 
   */
  function update ( $data=null, $id=null, $keepTimestamp= false )    
  {    
    /*
     * use cached record data?
     */
    if ($data === null)
    { 
      $data = $this->currentRecord;
    }
    elseif ( $id !== null )
    {
      $data['id'] = $id;
    }

    /*
     * set modified timestamp to null to set it to the current database update time
     * unless requested (i.e. in sync operations)
     */
    if ( ! $keepTimestamp and $this->hasProperty("modified") )
    {
      $data['modified'] = null;
    }      
    
    /*
     * convert property names to local aliases
     */
    $data = $this->unschematize($data);
    
    //$this->debug($data);
    
    return $this->db->update( $this->table, $data, $this->getColumnName("id") );
  }

  /**
   * Update the records matching the where condition with the key-value pairs
   * @param array $data
   * @param string|array $where
   * @return result
   */
  function updateWhere( $data, $where )
  {
    return $this->db->updateWhere( $this->table, $data, $this->toSql($where) );
  }
  
  /**
   * Checks wheter a record exists that matches a query
   * @param $where Where query
   */  
  function exists( $where )
  {
    return $this->db->exists( $this->table(), $where );
  }
  
  /**
   * Inserts data or updates a record according to the following rules: 
   * a) If id property is provided, look for the record with this primary key and 
   * update all the other values. If the record does not exist, throw an error.
   * b) If no id is provided, check if a record matching the
   * given key-value pairs exist. If yes, update its 'modified' property. If not,
   * insert the data.
   *
   * @param array $data
   * @return int The id of the existing or newly created record
   */
  function insertOrUpdate( $data )
  {
    /*
     * search for record based on id or row data
     */
    if ( $data['id'] )
    {
      $this->load( $data['id'] );
      if ( $this->foundNothing() )
      {
        $this->raiseError("Record #{$data['id']} does not exist");
      }
      else
      {
        $this->update($data);
      }
    }
    else
    {
      $this->findWhere( $data );
    
      /*
       * if nothing was found, insert data
       */
      if ( $this->foundNothing() )
      {
        $this->insert( $data );
      }
      /*
       * else, update timestamp
       */
      else
      {
        $this->updateTimestamp();
      }
    }
    
    /*
     * return record id
     */
    return $this->getId();
  }  
}
?>