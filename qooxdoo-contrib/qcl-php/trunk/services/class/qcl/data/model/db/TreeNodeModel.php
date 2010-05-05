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

qcl_import( "qcl_data_model_db_ActiveRecord" );

/**
 * Behavior class providing methods to model a basic tree structure based on an
 * sql database table.
 */
class qcl_data_model_db_TreeNodeModel
  extends qcl_data_model_db_ActiveRecord
//  implements qcl_data_model_ITreeNodeModel
{

  //-------------------------------------------------------------
  // Model properties
  //-------------------------------------------------------------

  private $properties = array(

    'parentId'  => array(
      'check'     => "integer",
      'sqltype'   => "int(11)"
    ),
    'position'  => array(
      'check'     => "integer",
      'sqltype'   => "int(11) NOT NULL",
      'nullable'  => false,
      'init'      => 0
    ),
    'label'  => array(
      'check'     => "string",
      'sqltype'   => "varchar(100)"
    )
  );

  //-------------------------------------------------------------
  // init
  //-------------------------------------------------------------

  /**
   * Constructor.
   * @param $datasourceModel
   * @return unknown_type
   */
  public function __construct( $datasourceModel )
  {
    parent::__construct( $datasourceModel );
    $this->addProperties( $this->properties );
  }


  //-------------------------------------------------------------
  // Getters
  //-------------------------------------------------------------

  /**
   * Getter for the id of the parent node.
   * @return int
   */
  public function getParentId()
  {
    return $this->get("parentId");
  }

  /**
   * Setter for the id of the parent node.
   * @return int
   */
  public function setParentId( $id )
  {
    return $this->set("parentId", $id);
  }

  //-------------------------------------------------------------
  // API
  //-------------------------------------------------------------

  /**
   * Returns the data of child nodes of a branch ordered by the order field
   * @param string|null $orderBy Optional propert name by which the returned
   *   data should be ordered
   * @return array
   */
	function getChildrenData( $orderBy=null )
	{
	  $query = new qcl_data_db_Query( array(
	   'properties'  => "*", // FIXME
	   'where'       => array( 'parentId' => $this->id() ),
	   'orderBy'     => $orderBy
	  ) );
	  $this->find( $query );
	  return $this->fetchAll();
	}

  /**
   * Returns the ids of the child node ids optionally ordered by a property
   * @param string|null $orderBy Optional propert name by which the returned
   *   data should be ordered
   * @return array
   */
	function getChildIds ( $orderBy=null )
	{
    $query = new qcl_data_db_Query( array(
     'properties'  => null, // FIXME
     'where'       => array( 'parentId' => $this->id() ),
     'orderBy'     => $orderBy
    ) );
    return $this->getQueryBehavior()->fetchValues("id", $query );
	}

  /**
   * Returns the number of children of the given node
   * @return int
   */
	public function getChildCount()
	{
		return $this->countWhere( array( "parentId" => $this->id() ) );
	}


	/**
	 * Returns the current position among the node's siblings
	 * @return int
	 */
  public function getPosition()
	{
	  return $this->get("position");
	}

   /**
    * Change position within folder siblings
    * @param int|string	$position	New position, either absolute (integer)
    *   or relative ("+1", "-3" etc.)
    *
   	*/
  public function changePosition ( $position )
	{
		if ( ! $this->supportsPositioning() )
		{
			throw new JsonRpcException("Setting a position is not supported");
		}

		if ( is_string($position) )
		{
		  if ( $position[0] == "-" or $position[0] == "+" )
		  {
		    $position = $this->getPosition() + (int) substr( $position, 1);
		  }
		  else
		  {
		    throw new InvalidArgumentException("Invalid position");
		  }
		}
		elseif ( ! is_int( $position ) )
		{
		  throw new InvalidArgumentException("Invalid position");
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

			$this->set($data);
			$this->save();
		}
		return true;
	}

   /**
    * Change parent node
    * @param int $parentId  New parent node id
    * @return int Old parent id
    */
	public function changeParent( $parentId )
	{
		$oldParentId = $this->getParentId();
    $this->setParentId( $parentId );
    $this->save();
    return $oldParentId;
	}

  /**
   * Returns the path of a node in the folder hierarchy as a
   * string of the node labels, separated by the a given character
   *
   * @param string $separator Separator character, defaults to "/"
   * @return string
   */
  public function getLabelPath( $separator="/"  )
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
    if ( ! $this->__cachePath and $this->has("path") )
    {
      if ( $path = $this->getPath() )
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
    $parentId = $this->getParentId();

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
  public function getIdPath()
  {
    $this->notImplemented(__METHOD__);
  }

  /**
   * Returns the id of a node given its label path
   * @param string $path
   * @param string $separator Separator character, defaults to "/"
   * @return int|null The id of the node or null if node does not exist
   */
  public function getIdByPath ( $path, $separator="/" )
  {
    $this->notImplemented(__METHOD__);
  }

  /**
   * Creates nodes along the path if they don't exist
   * @param string $path
   * @param string $separator Separator character, defaults to "/"
   * @return int Node id
   */
  public function createPath( $path, $separator="/" )
  {
    $this->notImplemented(__METHOD__);
  }
}
?>