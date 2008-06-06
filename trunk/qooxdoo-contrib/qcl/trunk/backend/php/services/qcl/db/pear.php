<?php

/**
 * Base class for rpc objects which do database queries
 * relying on PEAR::DB for database access
 * currently, only MySQL is supported
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
	 * @param mixed	$dsn (optional) dsn parameter. If omitted, the default database is used
	 */
	function __construct($controller, $dsn=null)
	{
		parent::__construct(&$controller,$dsn);
	}

	//-------------------------------------------------------------
  // API methods
  //-------------------------------------------------------------

	/**
	 * connects to database
	 * @param string|array $dsn DSN connection parameter
	 * @param bool $abortQuietly if true, do not throw an error if no connection can be made
	 * @return mixed DB object on success, false on error
	 */
	function &connect($dsn=null,$abortQuietly=false)
	{
		require_once ("DB.php"); // load pear DB library

		if ( ! $dsn )
		{
			$dsn = $this->getDsn();
		}
    $this->log("Connecting to $dsn.");

		if ( is_string ( $dsn ) or is_array ( $dsn ) )
    {
      $db =& DB::connect( $dsn );
    }
		else
    {
      $this->raiseError("Invalid DSN $dsn");
    }

    if (PEAR::isError($db))
		{
			$this->error = $db->getMessage() . ": " . $db->getUserInfo();
			if ( $abortQuietly )
			{
			  return false;
			}
			else
			{
			 $this->raiseError( $this->error );  
			}
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
	 * @param string $sql
	 * @param bool $abortOnError if true (default), raise a JSONRPC error and abort, else return false
	 * @return PEAR_DB resultset
	 */
	function &query ( $sql, $abortOnError=true )
	{
		global $error;
		$this->log($sql,QCL_LOG_DEBUG);
		$res = $this->db->query( $sql );
		if ( PEAR::isError($res) )
    {
			$this->error = $res->getMessage() . ": " . $res->getUserInfo();
      if ( $abortOnError )
      {
        $this->raiseError( $this->error );
      }
      return false;
		}
		return $res;
	}

	/**
	 * executes a query, alias of $this->query
	 * @param string $sql
	 * @param bool $abortOnError if true (default), raise a JSONRPC error and abort, else return false
	 * @return array resultset
	 */
	function execute ( $sql, $abortOnError=true )
	{
		return $this->query ( $sql, $abortOnError );
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
		$rows = $this->getAllRecords( $sql, false );
		$result= array();
		foreach($rows as $row) $result[] = $row[0];
		return $result;
	}

	/**
	 * gets full resultset
	 * @param string 	$sql 				sql query
	 * @param boolean  	$withColumnNames	if true (default), map values to column names
	 */
	function getAllRecords( $sql, $withColumnNames=true )
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
			if ( is_null ( $value ) )
      {
        $pairs[] = "`$key` = NULL";
      }
      elseif ( is_numeric ( $value ) )
      {
        $pairs[] = "`$key` = $value";
      }
      else
      {
        $pairs[] = "`$key` = '" . $this->escape( $value ) . "'";
      }
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
   * gets the sql to do a fulltext search. Uses boolean mode
   * @return string
   * @param string $table
   * @param string $indexName
   * @param string $expr
   */
  function getFullTextSql( $table, $indexName, $expr )
  {
    $fullSql = $this->getCreateTableSql( $table );

    // add a plus sign ( AND operator) to each search word
    $searchWords = explode(" ",$expr);
    foreach($searchWords as $index => $word)
    {
      if ( $word{0} != "-" )
      {
        $searchWords[$index] = "+" . $word;
      }
    }

    // remove dupliate plus signs (in case the user has added them)
    $expr = str_replace("++","+", implode(" ",$searchWords) );

    preg_match("/FULLTEXT KEY `$indexName` \(([^\)]+)\)/", $fullSql, $matches );
    return "MATCH (" . $matches[1] . ") AGAINST ('" . addslashes ( $expr ) . "' IN BOOLEAN MODE)" ;
  }	
	
	
  //-------------------------------------------------------------
  // database introspection
  //-------------------------------------------------------------
	
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
   * retrieves information on the columns contained in a given table
   * in the currently selected database
   * @param string $table
   * @return array Associated array with the keys name, default, nullable, type and key.
   */
  function getColumnMetaData($table)
  {
    return $this->getAllRecords("
      SELECT
        COLUMN_NAME    as `name`,
        COLUMN_DEFAULT as `default`,
        IS_NULLABLE    as `nullable`,
        COLUMN_TYPE    as `type`,
        COLUMN_KEY     as `key`,
        EXTRA          as `extra`
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = '{$this->database}' AND TABLE_NAME = '$table'
      ORDER BY ORDINAL_POSITION
    ");
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

  
  function createTable($table)
  {
    $this->execute("
     CREATE TABLE IF NOT EXISTS `$table` ( `dummy` tinyint(1) ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
    ");
  }
  
  /**
   * checks if a column exists in the database
   * @param string $table
   * @param string $column
   * @return boolean  
   */
  function columnExists($table, $column)
  {
    $database = $this->getDatabase();
    return (bool) $this->getValue("
      SELECT
        count(*)
      FROM
        INFORMATION_SCHEMA.COLUMNS
      WHERE
        TABLE_SCHEMA='$database' AND
        TABLE_NAME='$table' AND
        COLUMN_NAME='$column';
    ");
  }

  /**
   * gets the definition of a column as in 
   * a column defintion in a CREATE TABLE statement
   * @param string $table
   * @param string $column
   * @return mixed string defintion or null if column does not exist
   */
  function getColumnDefinition($table,$column)
  {
    $database = $this->getDatabase(); 
    $c = $this->getRow("
      SELECT
        COLUMN_DEFAULT as `default`,
        IS_NULLABLE    as `nullable`,
        COLUMN_TYPE    as `type`,
        EXTRA          as `extra`
      FROM 
        INFORMATION_SCHEMA.COLUMNS
      WHERE
        TABLE_SCHEMA='$database' AND
        TABLE_NAME='$table' AND
        COLUMN_NAME='$column';
    "); 
    if ( count($c) )
    {
      $definition = trim(str_replace("  "," ",implode(" ", array(
        $c['type'],
        ( $c['nullable'=="YES"] ? "NULL":"NOT NULL"), 
        ( $c['default'] ? "DEFAULT " . (
          in_array($c['default'], array("NULL","CURRENT_TIMESTAMP") ) ?
             $c['default'] : "'" . addslashes($c['default']) . "'" 
        ) : "" ),
        $c['extra']
      ))));         
      return $definition;
    }
    return null;
  }
  
  /**
   * adds a column 
   * @param string $table
   * @param string $column
   * @param string $definition
   * @param string $after [optional] "FIRST|AFTER xxx|LAST"
   */
  function addColumn($table,$column,$definition,$after="")
  {
    $this->execute ("
      ALTER TABLE `$table` ADD COLUMN `$column` $definition $after;
    ");    
    $this->info("Added $table.$column with definition '$definition'.");   
  }  
  
  /**
   * mofify a column 
   * @param string $table
   * @param string $column
   * @param string $definition
   * @param string $after [optional] "FIRST|AFTER xxx|LAST"
   */  
  function modifyColumn($table,$column,$definition,$after="")
  {
    $this->execute ("
      ALTER TABLE `$table` MODIFY COLUMN `$column` $definition $after;
    ");
    $this->info("Modified $table.$column to '$definition'.");    
  }    

  /**
   * rename a column 
   * @param string $table
   * @param string $oldColumn old column name
   * @param string $newColumn new column name
   * @param string $definition (required)
   * @param string $after [optional] "FIRST|AFTER xxx|LAST"
   */    
  function renameColumn($table,$oldColumn,$newColumn,$definition,$after)
  {
   $this->execute ("
      ALTER TABLE `$table` CHANGE COLUMN `$oldColumn` `$newColumn` $definition $after
    ");
    $this->info("Renamed $table.$oldColumn to $table.$newColumn.");
  }
  
  /**
   * gets primary key from table
   * @param string $table table name
   * @return array array of columns 
   */
  function getPrimaryKey($table)
  {
    $database = $this->getDatabase(); 
    return $this->getValues("
      SELECT
        COLUMN_NAME
      FROM 
        INFORMATION_SCHEMA.KEY_COLUMN_USAGE
      WHERE
        TABLE_SCHEMA='$database' AND
        TABLE_NAME='$table' AND
        CONSTRAINT_NAME='PRIMARY'
    ");
  }
  
  /**
   * set the primary key for the table
   * @param string $table table name
   * @param string|array $columns column(s) for the primary key
   */
  function addPrimaryKey($table,$columns)
  {
    $columns = (array) $columns;
    $this->execute("
      ALTER TABLE `$table` 
      ADD PRIMARY KEY  (`" . implode("`,`", $columns) . "`);
    ");
    $this->info("Added primary key to table '$table'." );
  }
  
  /**
   * drops primary key of a table
   * @param string $table
   */
  function dropPrimaryKey($table)
  {
    $this->execute("
      ALTER TABLE `$table` DROP PRIMARY KEY;
    ");   
    $this->info("Removed primary key from table '$table'." ); 
  }
  
  /**
   * removes an index
   * @param string $table table name
   * @param string $index index name
   * @return void
   */
  function dropIndex($table,$index)
  {
     $this->execute ("
      ALTER TABLE `$table` DROP INDEX `$index`
    ");
     $this->info("Removed index '$index' from table '$table'." );
  }
  
  /**
   * get columns in index
   * @param string $table
   * @param string $index 
   */
  function getIndexColumns($table, $index)
  {
    $records = $this->getAllRecords("
      SHOW KEYS FROM $table
      WHERE `Key_name`='$index'
    ");
    $result = array();
    foreach($records as $record)
    {
      $result[] = $record['Column_name'];
    }
    return $result;
  }
  
  /**
   * adds a an index
   * @param string $type FULLTEXT|UNIQUE
   * @param string $table
   * @param string $index index name
   * @param array  $columns column names in the index
   */
  function addIndex($type, $table, $index, $columns)
  {
    $this->execute ("
      ALTER TABLE `$table` ADD $type `$index` (`" . implode("`,`", $columns) . "`);
    ");
    $this->info("Added $type index '$index' to table '$table' indexing columns " . implode(",",$columns) . ".");
  }
  
  
  /**
   * updates table structure to conform with sql create table statement passed
   * @deprecated Use new xml-based table creation / update
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
  
  
}

?>

