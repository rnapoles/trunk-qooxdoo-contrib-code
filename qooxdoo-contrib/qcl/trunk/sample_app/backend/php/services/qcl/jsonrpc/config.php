<?php

// configuration storage class



class qcl_jsonrpc_config_db extends qcl_jsonrpc_db_pear
{    
   
   	/**
   	 * constructor calls parent constructor for database intiatization
     */
   	function __construct()
   	{
		parent::__construct();
	}
 
	/**
	 * sets config property
	 */
	function set($name,$value)
	{
		$res = $this->db->getAllRows("SELECT id FROM config WHERE name = '$name'");
		$id  = $res[0]['id'];
		if ( $id )
		{
			$this->execute("UPDATE config SET value = '$value' WHERE id = $id ");
		}
		else
		{
			$this->execute("INSERT INTO config (name,value) VALUES ('$name','$value')");
			return $this->getLastInsertId();
		}
	} 	  
}

