<?php

/**
 * Base class for rpc objects which do database queries
 * relying on PEAR::DB for database access
 */

require_once ("qcl/db/db.php");

class qcl_db_pear extends qcl_db 
{

	//-------------------------------------------------------------
  // internal methods
  //-------------------------------------------------------------

	/**
	 * constructor
	 * @param object 	$controller 	The controller object
	 * @param string	$dsn			    (optional) dsn parameter. If omitted, the default database is used
	 */
	function __construct($controller, $dsn=null)
	{
		parent::__construct(&$controller,$dsn);
	}

	//-------------------------------------------------------------
  // public non-rpc methods
  //-------------------------------------------------------------
	
	/**
	 * connects to database 
	 */
	function &connect($dsn=null)
	{
		require_once ("DB.php"); // load pear DB library
		
		if ( ! $dsn )
		{
			$dsn = $this->getDsn();
		}
    $this->log("Connecting to $dsn.");
    
		$db =& DB::connect( $dsn );
		if (PEAR::isError($db)) 
		{
			$this->raiseError( $db->getMessage() . ": " . $db->getUserInfo() );
		}
		$db->setFetchMode(DB_FETCHMODE_ASSOC);
		
		// set encoding to do: this needs to be a property of the datasource model
		if ( $this->controller )
		{
			$encoding = $this->controller->getIniValue("database.encoding");	
		}
		else
		{
			$encoding = "utf8";
		}
		$db->query("SET NAMES $encoding");
		$db->query("SET CHARACTER_SET $encoding");
		
		$this->db =& $db;
		
 		return $db;
	}
	
	
	/**
	 * queries database
	 * @return PEAR_DB resultset
	 */
	function &query ( $sql )
	{
		global $error;
		$this->log($sql,QCL_LOG_DEBUG);
		$res = $this->db->query( $sql );
		if (PEAR::isError($res)) {
			$this->raiseError( $res->getMessage() . ": " . $res->getUserInfo() );
		}
		return $res;
	}
	
	/**
	 * executes a query, alias of $this->query
	 * @param string $sql
	 * @return array resultset
	 */
	function execute ( $sql )
	{
		return $this->query ( $sql );	
	}

	/**
	 * get first row of result set
	 * @param string 	  $sql 				      sql query
	 * @param boolean  	$withColumnNames	if true (default), map values to column names
	 * @return array
	 */
	function getRow ( $sql, $withColumnNames=true )
	{
		if ( ! is_object($this->db) )
    {
      $this->raiseError ( "qcl_db_pear::getRow : No database connection. Aborting.");
    }
    
    $this->log($sql,QCL_LOG_DEBUG);
		$res = $this->db->getRow( $sql, $withColumnNames ? DB_FETCHMODE_ASSOC : DB_FETCHMODE_ORDERED  );
		if ( PEAR::isError ( $res ) ) {
			$this->raiseError( $res->getMessage() . ": " . $res->getUserInfo() );
		}
		return $res;		
	}	

	/**
	 * gets the value of the first cell of the first row of the result set
	 * useful for example for "SELECT count(*) ... " queries
	 * return mixed
	 */
	function getValue ( $sql ) 
	{
		$row = $this->getRow ( $sql, false );
		return $row[0];
	}

	/**
	 * gets the values of the first cell of each row of the result set
	 * return mixed
	 */
	function getValues ( $sql ) 
	{
		$rows = $this->getAllRows ( $sql, false );
		$result= array();
		foreach($rows as $row) $result[] = $row[0];
		return $result;
	}	
	
	/**
	 * gets full resultset
	 * @param string 	$sql 				sql query
	 * @param boolean  	$withColumnNames	if true (default), map values to column names
	 */
	function getAllRows ( $sql, $withColumnNames=true )
	{
		$this->log($sql,QCL_LOG_DEBUG);
		$res = $this->db->getAll( $sql, $withColumnNames ? DB_FETCHMODE_ASSOC : DB_FETCHMODE_ORDERED );
		if ( PEAR::isError ( $res ) ) 
		{
			$this->raiseError( $res->getMessage() . ": " . $res->getUserInfo() );
		}
		return $res;
	}
	
	/**
	 * inserts a record into a table and returns last_insert_id()
	 * @param string $table table name
	 * @param array $data associative array with the column names as keys and the column data as values
	 * @return int the id of the inserted row (only if auto_incremnt-key)
	 */
	function insert ( $table, $data ) 
	{
		// inserting several rows at once
    if ( is_array($data[0]) )
    {
      $ids = array();
      foreach($data as $row)
      {
        $ids[] = $this->insert($table,$row);
      }
      return $ids;
    }
    
    // construct query
		$columns = array();
    $values	 = array();
    
		foreach ( $data as $key => $value )
		{
			if ( ! trim($key) )
      {
        continue;
      }
      else
      {
        $columns[] = $key;
      }
      
      if ( is_numeric($value) )
			{
				$values[] = $value;
			}	
			else
			{
				$values[] = "'" . $this->escape( $value ) . "'";	
			}
		}
    $columns = implode("`,`", $columns );
		$values  = implode (",", $values );
		
		$this->execute ("
			INSERT IGNORE INTO 
				`$table` (`$columns`) 
			VALUES ($values)
		");
		return $this->getLastInsertId();
	}

	/**
	 * updates a record in a table identified by id
	 * @param string $table table name
	 * @param array $data associative array with the column names as keys and the column data as values
	 * @param string $idColumn name of column containing the record id 
	 */
	function update ( $table, $data, $idColumn="id" )
	{
		$id		 = $data[$idColumn];
		unset($data[$idColumn]);
		$pairs   = array();
		
		foreach ( $data as $key => $value )
		{
			$pairs[] = "`$key` = '" . $this->escape( $value ) . "'";
		}
		$pairs = implode ("," , $pairs );
		
		$this->query ( "
			UPDATE `$table` 
			SET $pairs
			WHERE `$idColumn` = '$id'
		");
	}

	/**
	 * deletes a record in a table identified by id
	 * @param string $table table name
	 * @param mixed $ids (array of) record id(s)
	 * @param string $idColumn name of column containing the record id 
	 */
	function delete ( $table, $ids, $idColumn="id" ) 
	{		
		$id_list = implode(",", (array) $ids );
		$this->query ("
			DELETE FROM `$table` 
			WHERE `$idColumn` IN ($id_list)
		");
	}

	/**
	 * deletes one or more records in a table matching a where condition
	 * @param string 	$where where condition
	 */
	function deleteWhere ( $table, $where )
	{
		$this->query ("
			DELETE FROM `$table` 
			WHERE $where
		");
	} 
	
	/**
	 * escapes strings for use in sql queries
	 */
	function escape ( $string )
	{
		return $this->db->escapeSimple( $string );
	}
	
	/**
	 * gets last inserted primary key
	 * @return int
	 */
	function getLastInsertId()
	{
		$id = $this->getValue( "SELECT last_insert_id()" );
    return $id;
	}
	
	/**
	 * disconnects from database
	 * @return void
	 */
	function disconnect()
	{
		if ( $this->db )
    {
      $this->db->disconnect();
    }
    else
    {
      $this->warn("Trying to close a database handler that is not open.");
    }
	}
  
  /**
   * retrieves information on the structure of a given table
   * @param string $table
   * @return array
   */
  function getColumnMetaData($table)
  {
    $schema = substr($this->dsn,strrpos($this->dsn,"/")+1);
    return $this->getAllRows("
      SELECT 
        COLUMN_NAME as name, 
        COLUMN_DEFAULT as `default`, 
        IS_NULLABLE as nullable, 
        COLUMN_TYPE as `type`, 
        COLUMN_KEY as `key`
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = '$schema' AND TABLE_NAME = '$table'
    ");
  }
  
  /**
   * gets table structure as sql create statement
   * @param string $table table name
   * @return string
   */
  function getCreateTableSql($table)
  {
    $row = $this->db->getRow("SHOW CREATE TABLE $table");
    return $row['Create Table'];
  }
  
  /**
   * extracts column data from a sql create table statemnet
   * @return array
   * @param $sql string sql create table statement
   */
  function extractColumnData($sql)
  {
    $start     = strpos($sql,"(")+1;
    $end       = strrpos($sql,")")-1;
    $columnSql = trim(substr($sql,$start,$end-$start));
    $lines     = preg_split( "/\r?\n/", $columnSql );
    $columns   = array();

    for($i=0;$i<count($lines);$i++)
    {
     $l = trim($lines[$i]);
     if ( substr($l,-1,1) == "," )
     {
       $l= substr($l,0,-1); 
     }
     preg_match("/(`[^`]+`|.*KEY)(.+)$/",$l,$line);
     $columnName = $line[1];
     $columnDef  = $line[2];
     $columns[$columnName] = $columnDef ;
    }
    return $columns;
  }

  /**
   * gets the sql to do a fulltext search. Uses boolean mode
   * @return string
   * @param string $table
   * @param string $indexName
   * @param string $expr
   */
  function getFullTextSql( $table, $indexName, $expr )
  {
    $fullSql = $this->getCreateTableSql( $table );
    preg_match("/FULLTEXT KEY `$indexName` \(([^\)]+)\)/", $fullSql, $matches );
    return "MATCH (" . $matches[1] . ") AGAINST ('" . addslashes ($expr) . "' IN BOOLEAN MODE)" ;
  }

  /**
   * updates table structure to conform with sql create table statement passed
   * @return void
   * @param string $table table name
   * @param string $sql   sql create table statement
   */
  function updateTableStructure($table,$sql)
  {
    $currentColumns   = $this->extractColumnData($this->getCreateTableSql($table));
    $normativeColumns = $this->extractColumnData($sql);
    $after = "FIRST";
    
    foreach($normativeColumns as $columnName => $columnDef )
    {
      $currentDef = $currentColumns[$columnName];
      if ( $currentDef )
      {
        if ( $currentDef != $columnDef )
        {
          if ( strstr( $columnName, " KEY" ) )
          {
             preg_match("/`([^`]+)`/", $columnName, $matches );
             $indexName = $matches[1];
             if ( $indexName)
             {
               $this->execute ("
                ALTER TABLE `$table` DROP INDEX `$indexName` 
              ");           
              $this->execute ("
                ALTER TABLE `$table` ADD FULLTEXT INDEX `$indexName` $columnDef 
              ");                   
             }
             else
             {
               $this->warn("Column name part '$columnName' contains no index name!");
             }
          }
          else
          {         
            $this->execute ("
              ALTER TABLE `$table` MODIFY COLUMN $columnName $columnDef
            ");
          }
          $this->info("Modified $table.$columnName to $columnDef.");
        }
      }
      else
      {
        // was column renamed?
        preg_match("/\/\*was:[\s]*([^\*\/\s]+)[\s]*\*\//", $columnDef,$match);
        $oldColumnName = $match[1];
        if ( $oldColumnName )
        {

          $this->execute ("
            ALTER TABLE `$table` CHANGE COLUMN $oldColumnName $columnName $columnDef $after 
          ");    
          $this->info("Renamed $table.$oldColumnName to $table.$columnName.");
        }
        else
        {
          if ( strstr( $columnName, " KEY" ) )
          {
             preg_match("/`([^`]+)`/", $columnName, $matches );
             $indexName = $matches[1];
             if ( $indexName)
             {
               $this->execute ("
                ALTER TABLE `$table` ADD FULLTEXT INDEX `$indexName` $columnDef 
              ");                    
             }
             else
             {
               $this->warn("Column name part '$columnName' contains no index name!");
             }             
      
          }
          else
          {
            $this->execute ("
              ALTER TABLE `$table` ADD COLUMN $columnName $columnDef $after 
            ");            
          }
          $this->info("Added $table.$columnName."); 
        }     
      }
      $after = "AFTER $columnName"; 
    }   
     
  }
  
  
  /**
   * checks if table exists
   * @return boolean
   * @param $table string
   */
  function tableExists($table)
  {
    $database = $this->getDatabase();
    return $this->getValue("
      SELECT 
        count(*) 
      FROM 
        INFORMATION_SCHEMA.TABLES
      WHERE 
        TABLE_NAME='$table'
      AND
        TABLE_SCHEMA='$database'
    ");
  }
  
  /**
   * checks if a function or stored procedure of this name exists in the database
   * @return 
   * @param $routine 
   */
  function routineExists($routine)
  {
    return $this->getValue("
      SELECT 
        count(*) 
      FROM 
        INFORMATION_SCHEMA.ROUTINES
      WHERE 
        ROUTINE_NAME='$routine'
    ");
  }
  
  /**
   * creates a temporary table and fills it with data
   * @return array of citekeys
   * @param string    $name     name of the table
   * @param array     $columns  map: column name => column definition
   * @param array     $data     map: column name => column value
   */
  function createTemporaryTable ( $name, $columnData, $data )
  {
    
    // create table
    $columnDefinition = array();
    foreach ( $columnData as $columnName => $columnDef )
    {
      $columnDefinition[] = "`$columnName` $columnDef";  
    }
    $columnDefinition = implode(",",$columnDefinition);
    
    $this->db->execute("
      CREATE TEMPORARY TABLE `$name` (
        $columnDefinition
      )
    ");
    
    // insert values
    $columns = array_keys($columnData);
    foreach( $data as $row )
    {
      $values = array();
      foreach( array_values( (array) $row ) as $value )
      {
        $values[] = "'" . addslashes($value) . "'";
      }
      $values = implode("'",$values);
      $this->db->execute("INSERT INTO `$name` ($columns) VALUES($values)");   
    }
  }
}

?>
