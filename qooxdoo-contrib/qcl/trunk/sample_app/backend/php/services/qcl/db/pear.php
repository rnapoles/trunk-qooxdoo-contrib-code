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
	 * @param object reference	$master 	The instantiating object, either a model or a controller
	 * @param string			$dsn			(optional) dsn parameter. If omitted, the default database is used
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

		$db =& DB::connect( $dsn );
		if (PEAR::isError($db)) 
		{
			$this->raiseError( $db->getMessage() . ": " . $db->getUserInfo() );
		}
		$db->setFetchMode(DB_FETCHMODE_ASSOC);
		
		// set encoding to do: this needs to be a property of the datasource model
		if ( $this->controller )
		{
			$encoding = $this->controller->getConfigValue("database.encoding");	
		}
		else
		{
			$encoding = "utf8";
		}
		$db->query("SET NAMES $encoding");
		$db->query("SET CHARACTER_SET $encoding");
		
		$this->db = &$db;
		
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
	 */
	function &execute ( $sql )
	{
		return $this->query ( $sql );	
	}

	/**
	 * get first row of result set
	 * @param string 	$sql 				sql query
	 * @param boolean  	$withColumnNames	if true (default), map values to column names 
	 */
	function &getRow ( $sql, $withColumnNames=true )
	{
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
	function &getAllRows ( $sql, $withColumnNames=true )
	{
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
		$columns = implode("`,`", array_keys($data) );
		$values	 = array();
		
		foreach ( array_values($data) as $value )
		{
			if ( is_numeric($value) )
			{
				$values[] = $value;
			}	
			else
			{
				$values[] = "'" . $this->escape( $value ) . "'";	
			}
		}
		$values = implode (",", $values );
		
		$this->query ("
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
			WHERE `$idColumn` = $id
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
	 */
	function getLastInsertId()
	{
		$res = $this->db->getRow("SELECT last_insert_id()", DB_FETCHMODE_ORDERED );
		return $res[0];
	}
	
	/**
	 * disconnects from database
	 */
	function disconnect()
	{
		$this->db->disconnect();
	}
}

?>
