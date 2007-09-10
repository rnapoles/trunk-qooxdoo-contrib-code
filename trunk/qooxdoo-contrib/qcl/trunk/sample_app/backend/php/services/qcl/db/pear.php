<?php

/**
 * Base class for rpc objects which do database queries
 * relying on PEAR::DB for database access
 */

require_once SERVICE_PATH . "qcl/db/db.php";

class qcl_db_pear extends qcl_db 
{

	/**
	 * constructor
	 */
	function __construct()
	{
		parent::__construct();
	}

	
	/**
	 * connects to database 
	 */
	function &connect()
	{
		require_once "DB.php"; // load pear DB library
		$db =& DB::connect( $this->dsn );
		if (PEAR::isError($db)) 
		{
			$this->raiseError( $res->getMessage() . ": " . $res->getUserInfo() );
		}
		$db->setFetchMode(DB_FETCHMODE_ASSOC);
		
		// set encoding
		$encoding = $this->config['database']['encoding']; 
		if ($encoding)
		{
			$db->query("SET NAMES $encoding");
			$db->query("SET CHARACTER_SET $encoding");
		}
		
 		return $db;
	}
	
	
	/**
	 * queries database
	 */
	function &query ( $sql )
	{
		global $error;
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
	 */
	function &getRow ( $sql )
	{
		$res = $this->db->getRow( $sql );
		if ( PEAR::isError ( $res ) ) {
			$this->raiseError( $res->getMessage() . ": " . $res->getUserInfo() );
		}
		return $res;		
	}	
	
	/**
	 * gets resultset mapped to array
	 */
	function &getAllRows ( $sql )
	{
		$res = $this->db->getAll( $sql );
		if ( PEAR::isError ( $res ) ) {
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
		
		$this->query ( utf8_decode("
			INSERT INTO 
				`$table` (`$columns`) 
			VALUES ($values)
		"));
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
		
		$this->query ( utf8_decode("
			UPDATE `$table` 
			SET $pairs
			WHERE `$idColumn` = $id
		"));
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
