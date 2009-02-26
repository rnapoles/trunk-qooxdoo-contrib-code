<?php

/**
 * Behavior class providing methods to model a basic tree structure based on an 
 * sql database table. Can only be used with a model that inherits from
 * qcl_db_model.
 */

class qcl_db_behavior_Tree 
{


	/**
	 * gets child nodes of a branch ordered by the order field
	 * @param int $parentId
	 */
	function getChildren ( $parentId )
	{
		$parentId = (int) $parentId;
		return $this->findWhere("{$this->col_parentId} = $parentId", $this->col_position );
	}
	
	/**
	 * gets child node ids of a branch ordered by the order field
	 * @param int $parentId
	 * @param string|null $orderBy
	 */
	function getChildIds ( $parentId, $orderBy=null )
	{
    $orderBy     = either( $orderBy, "position" );
    $parentIdCol = $this->getColumnName("parentId");
		return $this->findValues("id", "$parentIdCol=" . (int) $parentId, $orderBy );
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
			WHERE `{$this->col_parentId}` = $parentId
		"); 
		return (int) $count;
	}
	
	/**
	 * reorders childrens positions
	 * @param int $parentId parent folder id
	 * @param string|null $orderBy defaults to position column
	 */
	function reorder ( $parentId, $orderBy=null )
	{
		$parentId = (int) $parentId;
		$orderBy  = either ( $orderBy, $this->col_position );
		$childIds = $this->getChildIds ( $parentId, $orderBy );
		$index = 1;
		foreach ( $childIds as $id )
		{
			$data=array();
			$data[$this->col_id] 		= $id;
			$data[$this->col_position] 	= $index++;
			$this->update($data);
		}
		return true;
	}
	
	/**
	 * whether tree model supports positioning
	 */	
	function supportsPositioning()
	{
		return ( $this->col_position != null);
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
			$data[$this->col_id] = $child[$this->col_id];
			
			if ( $child[$this->col_id] == $folderId )
			{
				$data[$this->col_position] = $position;
			}
			else
			{
				if ( $index == $position ) $index++; // skip over target position
				$data[$this->col_position] = $index++;
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
		$oldParentId  = $this->getProperty("parentId",$folderId);
    $this->setProperty("parentId",$parentFolderId,$folderId);
    return $oldParentId;
	}
	
  /**
   * Returns the path of a folder in the folder hierarchy,
   * separated by the pipe character
   * @return 
   */
  function getPath( $id=null )
  {
    
    /*
     * return when top node has been reached
     */
    if ( $id === 0 )
    {
      return "";
    }     

    /*
     * if not given, use current record
     */    
    elseif ( $id === null )
    {
      $id = $this->getId();
    }

    /*
     * otherwise load data for current node
     */  
    else
    { 
      $this->load( $id );  
    }

    /*
     * if the tree path is cached, return it
     */
    if ( ! $this->__cachePath and $this->hasProperty("path") )
    {
      if ( $path = $this->getProperty("path") )
      {
        return $path;
      }
      else
      {
        $this->__cachePath = $id;
      }
    }         


    /*
     * get path of parent if any
     */
    $label    =  trim( str_replace( "/", "\\/", $this->getLabel() ) );
    $parentId = $this->get("parentId");
    
    if ( $parentId )
    {
      /*
       * get parent path
       */
      $parentPath = $this->getPath( $parentId );
      $path .= $parentPath . "|" . $label;
      
      /*
       * cache path
       */
      if ( $id == $this->__cachePath )
      {
        $this->update(array(
          'id'    => $id,
          'path'  => $path
        ));
        $this->__cachePath = null;
      }            
    }
    else
    {
      $path = $label;
    }

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
      /*
       * top folder
       */
      return array();
    }
    $this->load($id);  
    
    $parentId = $this->get("parentId");
    $hierarchyIds = $this->getNodeIdHierarchy( $parentId );
    
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
      $folder = $this->load($id);  
    }
    else
    {
      $id = $this->currentRecord[$this->col_id];
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
      
      $hierarchyIds = $this->getHierarchyIds( $folder[$this->col_parentId] );
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
    $this->raiseError("Not implemented.");
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
    $this->raiseError("Not implemented.");
    $path = str_replace("\\/","&backslash;",$path);
    $parts = explode("/",$path);
    foreach ( $parts as $part )
    {
      // to do: implement
    }
  }
  
  
}

?>