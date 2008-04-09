<?php

// dependencies
require_once ("qcl/db/model.php");

/**
 * class implementing a basic tree structure based on an sql database table
 */

class qcl_db_tree extends qcl_db_model
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
  // public methods 
	//-------------------------------------------------------------   


	/**
	 * gets child nodes of a branch ordered by the order field
	 * @param int $parentId
	 */
	function getChildren ( $parentId )
	{
		$parentId = (int) $parentId;
		return $this->getRowsWhere("{$this->key_parentId} = $parentId", $this->key_position );
	}
	
	/**
	 * gets child node ids of a branch ordered by the order field
	 * @param int $parentId
	 * @param string|null $orderBy
	 */
	function getChildIds ( $parentId, $orderBy=null )
	{
		$parentId = (int) $parentId;
    $orderBy  = either( $orderBy, $this->key_position );
		return $this->getValues($this->key_id, "{$this->key_parentId} = $parentId", $orderBy );
	}	
	
	/**
	 * gets number of child nodes of a branch
	 * @param int $parentId
	 */
	function getChildCount ( $parentId )
	{
		$parentId = (int) $parentId;
		$count = $this->db->getValue("
			SELECT COUNT(*) 
			FROM `{$this->table}`
			WHERE `{$this->key_parentId}` = $parentId
		"); 
		return (int) $count;
	}
	
	/**
	 * reorders childrens positions
	 * @param int $parentId parent folder id
	 * @param string|null $orderBy
	 */
	function reorder ( $parentId, $orderBy=null )
	{
		$parentId = (int) $parentId;
		$childIds = $this->getChildIds ( $parentId, $orderBy );
		$index = 0;
		foreach ( $childIds as $id )
		{
			$data=array();
			$data[$this->key_id] 		= $id;
			$data[$this->key_position] 	= $index++;
			$this->update($data);
		}
		return true;
	}
	
	/**
	 * whether tree model supports positioning
	 */	
	function supportsPositioning()
	{
		return ( $this->key_position != null);
	}
	
   /**
    * change position within folder siblings
    * @param int 	$folderId	folder id
    * @param int	$parentId 	parent folder id
    * @param int	$position	new position 
   	*/
	function changePosition ( $folderId, $parentId, $position )
	{
		if ( ! $this->supportsPositioning() )
		{
			$this->raiseError ("Setting a position is not supported");
		}
		$parentId = (int) $parentId;
		$children = $this->getChildren ( $parentId );
		$index = 0;
		foreach ( $children as $child )
		{
			$data = array();
			$data[$this->key_id] = $child[$this->key_id];
			
			if ( $child[$this->key_id] == $folderId )
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
    * change parent folder
    * @param int 	$folderId	  folder id
    * @param int	$parentId 	new parent folder id 
    * @return int             old parent id
   	*/
	function changeParent( $folderId, $parentFolderId )
	{
		$oldParentId  = $this->getFieldValue("parentId",$folderId);
    $this->setFieldValue("parentId",$parentFolderId,$folderId);
    return $oldParentId;
	}
		
	/**
	 * set parent folder id of current or specified record
	 * @param int		$parentId
	 * @param int[optional] $folderId
	 * @return void
	 */
	function setParentId($parentId,$folderId=null)
	{
		$parentId = (int) $parentId;
		$this->setFieldValue("parentId",$parentId,$folderId);
    if ( !$folderId )
    {
		  $this->update();
    }
	}

	/**
	 * get parent folder id of current or specified record
	 * @param int		$folderId
	 * @return int parent id
	 */
	function getParentId($folderId=null)
	{
		return $this->getFieldValue("parentId",$folderId);
	}	
	
  /**
   * gets the path of a folder in the folder hierarchy
   * @return 
   */
  function getPath( $id=null )
  {
    if ( $id !== null )
    {
      $folder = $this->getById($id);  
    }
    else
    {
      $id = $this->currentRecord[$this->key_id];
      $folder = $this->currentRecord;
    }
    
    if ( ! $id )
    {
      return "";
    }
    
    //if ( $this->__hasHierarchyFunc or $this->db->routineExists("{$this->table}_getHierarchyPath") )
    //{
    //  $this->__hasHierarchyFunc = true;
    //  $path = $this->db->getValue( "SELECT {$this->table}_getHierarchyPath($id)");
    //}
    //else
    //{
      $label =  trim( str_replace( "/", "\\/", $folder[$this->key_label] ) );
      $path = $this->getPath( $folder[$this->key_parentId] ) . "/" . $label;
    //}
    return $path;
  }
  
  /**
   * gets the ids in the path of a folder in the folder hierarchy,
   * starting from the top node to the node
   * @return array
   */
  function getNodeIdHierarchy( $id )
  {
    if ( (int) $id == 0 )
    {
      // top folder
      return array();
    }
    $folder = $this->getById($id);  
    $hierarchyIds = $this->getNodeIdHierarchy( $folder[$this->key_parentId] );
    array_push($hierarchyIds,$id);
    return $hierarchyIds;
  }
  
  /**
   * gets the ids in the path of a folder in the folder hierarchy,
   * starting from the node to the top node. Deprecated, use
   * getNodeIdHierarchy instead.
   * @deprecated 
   * @return array
   */
  function getHierarchyIds( $id )
  {
    if ( $id !== null )
    {
      $folder = $this->getById($id);  
    }
    else
    {
      $id = $this->currentRecord[$this->key_id];
      $folder = $this->currentRecord;
    }
    
    if ( ! $id )
    {
      return array();
    }
    
    //if ( $this->__hasHierarchyFunc or $this->db->routineExists("{$this->table}_getHierarchyPath") )
    //{
    //  $this->__hasHierarchyFunc = true;
    //  $path = $this->db->getValue( "SELECT {$this->table}_getHierarchyPath($id)");
    //}
    //else
    //{
      
      $hierarchyIds = $this->getHierarchyIds( $folder[$this->key_parentId] );
      array_push($hierarchyIds,$id);
      
    //}
    return $hierarchyIds;
  }
  
  /**
   * gets the id of a folder given its label path
   * @todo to be implemented
   * @return int 
   * @param string $path
   */
  function getIdByPath ( $path )
  {
    $path = str_replace("\\/","&backslash;",$path);
    $parts = explode("/",$path);
    foreach ( $parts as $part )
    {
      $this->db->getValue("SELECT {}"); /// todo: implement
    }
  }
  
  /**
   * creates folders along the path 
   * @todo to be implemented
   * @return int 
   * @param string $path
   */
  function createPath( $path )
  {
    $path = str_replace("\\/","&backslash;",$path);
    $parts = explode("/",$path);
    foreach ( $parts as $part )
    {
      // to do: implement
    }
  }
  
  
}

?>