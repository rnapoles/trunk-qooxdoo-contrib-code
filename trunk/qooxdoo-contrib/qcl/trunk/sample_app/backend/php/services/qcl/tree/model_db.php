<?php

// dependencies
require_once ("qcl/db/model.php");
require_once ("qcl/locale/manager.php");

/**
 * class implementing a basic tree structure based on an sql database table
 */

class qcl_tree_model_db extends qcl_db_model
{

   //-------------------------------------------------------------
   // class variables 
   //-------------------------------------------------------------

	var $table;
	var $key_id;
	var $key_parentId;
	var $key_label;
	var $key_position;
	var $icon;
	var $foreignKey;

	//-------------------------------------------------------------
    // internal methods
    //-------------------------------------------------------------

   /**
    * constructor 
    * @param object reference $controller
    */
	function __construct($controller)
   	{
		parent::__construct(&$controller);
	}   
	
	//-------------------------------------------------------------
   	// public non-rpc methods 
	//-------------------------------------------------------------   
   
	/**
	 * gets child nodes of a branch ordered by the order field
	 * @param int $parentId
	 */
	function getChildren ( $parentId )
	{
		return $this->getAll("{$this->key_parentId} = $parentId", $this->key_position );
	}
	
	/**
	 * gets child node ids of a branch ordered by the order field
	 * @param int $parentId
	 */
	function getChildIds ( $parentId )
	{
		return $this->getValues($this->key_id, "{$this->key_parentId} = $parentId", $this->key_position );
	}	
	
	/**
	 * gets number of child nodes of a branch
	 * @param int $parentId
	 */
	function getChildCount ( $parentId )
	{
		$count = $this->db->getRow("
			SELECT COUNT(*) 
			FROM {$this->table}
			WHERE {$this->key_parentId} = $parentId
		");
		$count =  array_values($count); 
		return (int) $count[0];
	}
	
	/**
	 * reorders childrens positions
	 * @param int $parentId parent folder id
	 */
	function reorder ( $parentId )
	{
		$children = $this->getChildren ( $parentId );
		$index = 0;
		foreach ( $children as $data )
		{
			$data[$this->key_position] = $index++;
			$this->update($data);
		}
		return true;
	}
	
   /**
    * change position within folder siblings
    * @param int 	$folderId	folder id
    * @param int	$parentId 	parent folder id
    * @param int	$position	new position 
   	*/
	function changePosition ( $folderId, $parentId, $position )
	{
		$children = $this->getChildren ( $parentId );
		$index = 0;
		foreach ( $children as $data )
		{
			if ( $data[$this->key_id] == $folderId )
			{
				$data[$this->key_position] = $position;
			}
			else
			{
				if ( $index == $position ) $index++; // skip over target position
				$data[$this->key_position] = $index++;
			}
			$this->update($data);
		}
		return true;		
	}	

   /**
    * change parent folder and position 
    * @param int 	$folderId	folder id
    * @param int	$parentId 	parent folder id 
   	*/
	function changeParent ( $folderId, $parentId )
	{
		$this->db->execute("
			UPDATE {$this->table}
			SET `{$this->key_parentId}` = $parentId
			WHERE `{$this->key_id}` = $folderId
		");
		return true;		
	}	
	
	/**
	 * set parent folder id of current record
	 * @param int		$parentId
	 * @param boolean	$forceUpdate 	whether to update the database (default:false)
	 */
	function setParentId($parentId,$forceUpdate=false)
	{
		$this->setField("parentId",$parentId,$forceUpdate);
	}
}

?>