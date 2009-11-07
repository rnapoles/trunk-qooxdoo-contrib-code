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
require_once "qcl/data/model/ITreeNodeModel.php";


/**
 * Behavior class providing methods to model a basic tree structure based on an
 * sql database table.
 */
class qcl_data_db_behavior_Tree
  implements qcl_data_model_ITreeNodeModel
{

  /**
   * Returns the id of the parent node.
   * @return int
   */
  function getParentId()
  {
    return $this->getProperty("parentId");
  }

  /**
   * Returns the data of child nodes of a branch ordered by the order field
   * @param string|null $orderBy Optional propert name by which the returned
   *   data should be ordered
   * @return array
   */
	function getChildren ( $orderBy=null )
	{
	  return $this->findWhere(
		  array( "parentId" => $this->getId() ),
		  either( $orderBy, "position")
		);
	}

  /**
   * Returns the ids of the child node ids optionally ordered by a property
   * @param string|null $orderBy Optional propert name by which the returned
   *   data should be ordered
   * @return array
   */
	function getChildIds ( $orderBy=null )
	{
	  $id = ( $this->foundSomething() ) ? $this->getId() : 0;
	  return $this->findValues("id", array( "parentId" => $id ), $orderBy );
	}

  /**
   * Returns the number of children of the given node
   *
   * @return int
   */
	function getChildCount()
	{
		return $this->countWhere( array( "parentId" => $this->getId() ) );
	}

  /**
   * Reorders the position of the child node. If the tree data in the
   * model does not support reordering, implement as empty stub.
   * @param string|null $orderBy defaults to position column
   * @return void
   */
	function reorder ( $orderBy=null )
	{
		$orderBy  = either ( $orderBy, "position" );
		$childIds = $this->getChildIds ( $this->getId(), $orderBy );
		$index = 1;
		foreach ( $childIds as $id )
		{
			$data=array();
			$data["id"] 		= $id;
			$data["position"] 	= $index++;
			$this->update($data);
		}
		return true;
	}

	/**
	 * Whether tree model supports positioning.
	 * @return bool
	 */
	function supportsPositioning()
	{
		return $this->hasProperty("position") ;
	}

	/**
	 * Returns the current position among the node's siblings
	 * @return int
	 */
	function getPosition()
	{
	  return $this->getProperty("position");
	}

   /**
    * Change position within folder siblings
    * @param int|string	$position	New position, either absolute (integer)
    *   or relative ("+1", "-3" etc.)
    *
   	*/
	function changePosition ( $position )
	{
		if ( ! $this->supportsPositioning() )
		{
			$this->raiseError ("Setting a position is not supported");
		}

		if ( is_string($position) )
		{
		  if ( $position[0] == "-" or $position[0] == "+" )
		  {
		    $position = $this->getPosition() + (int) substr( $position, 1);
		  }
		  else
		  {
		    $this->raiseError("Invalid parameter");
		  }
		}
		elseif ( ! is_int( $position ) )
		{
		  $this->raiseError("Invalid parameter");
		}

		$id = $this->getId();
		$parentId = $this->getParentId();
		$this->load( $parentId );
		$children = $this->getChildren();
		$index = 0;

		foreach ( $children as $child )
		{
			$data = array();
			$data['id'] = $child['id'];

			if ( $child['id'] == $id )
			{
				$data['position'] = $position;
			}
			else
			{
				if ( $index == $position ) $index++; // skip over target position
				$data['position'] = $index++;
			}

			$this->update($data);
		}
		return true;
	}

   /**
    * Change parent node
    * @param int $parentId  New parent node id
    * @return int Old parent id
    */
	function changeParent( $parentId )
	{
		$oldParentId = $this->getProperty("parentId");
    $this->setProperty("parentId", $parentId );
    return $oldParentId;
	}

  /**
   * Returns the path of a node in the folder hierarchy as a
   * string of the node labels, separated by the a given character
   *
   * @param string $separator Separator character, defaults to "/"
   * @return string
   */
  function getLabelPath( $separator="/"  )
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
   * Returns the path of a node in the folder hierarchy,
   * as an array of ids.
   *
   * @return string
   */
  function getIdPath()
  {
    $this->raiseError("Not implemented");
  }

  /**
   * Returns the id of a node given its label path
   * @param string $path
   * @param string $separator Separator character, defaults to "/"
   * @return int|null The id of the node or null if node does not exist
   */
  function getIdByPath ( $path, $separator="/" )
  {
    $this->raiseError("Not implemented.");
    $path = str_replace("\\/","&backslash;",$path);
    $parts = explode("/",$path);
  }

  /**
   * Creates nodes along the path if they don't exist
   * @param string $path
   * @param string $separator Separator character, defaults to "/"
   * @return int Node id
   */
  function createPath( $path, $separator="/" )
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