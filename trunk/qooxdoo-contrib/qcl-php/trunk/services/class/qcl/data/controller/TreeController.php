<?php
/* ************************************************************************

   Bibliograph: Collaborative Online Reference Management

   http://www.bibliograph.org

   Copyright:
     2004-2009 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
   *  Christian Boulanger (cboulanger)

************************************************************************ */

qcl_import( "qcl_data_controller_Controller" );

/**
 * Service class for retrieving and manipulating tree data
 */
class qcl_data_controller_TreeController
  extends qcl_data_controller_Controller
//  implements qcl_data_controller_ITreeController
{

  /*
  ---------------------------------------------------------------------------
     INTERFACE ITREECONTROLLER
  ---------------------------------------------------------------------------
  */

  /**
   * Creates a node.
   * @param string $datasource Name of the datasource which will contain
   *   the new record.
   * @param string $modelType The type of the model
   * @param mixed|null $options Optional data that might be
   *   necessary to create the new record
   * @return mixed Id of the newly created record.
   * @override
   */
  function createNode( $datasource, $modelType, $options=null )
  {
    $label            = $options->label;
    $position         = $options->position;
    $parentNodeId     = $options->parentId;

    /*
     * model
     */
    $model = $this->getModel($datasource, $modelType );

    /*
     * create new folder
     */
    $nodeId = $model->create();
    $model->setParentId( $parentNodeId );
    $model->setLabel( $label );
    $model->setPosition( $position );
    $model->save();

    /*
     * reorder parent folder
     */
    $model->load( $parentNodeId );
    $model->reorder();

    /*
     * return client data
     */
    return true;
  }

  /**
   * Returns the data of child nodes of a branch ordered by the order field
   * @param string $datasource Name of the datasource
   * @param int $parentId
   * @param string|null $orderBy Optional propert name by which the returned
   *   data should be ordered
   * @return array
   */
  function getChildren ( $datasource, $parentId, $orderBy=null )
  {
    $model = $this->getModel( $datasource, $parentId );
    return $model->getChildIds( $orderBy );
  }

  /**
   * Returns the ids of the child node ids optionally ordered by a property
   * @param string $datasource Name of the datasource
   * @param int $parentId
   * @param string|null $orderBy Optional propert name by which the returned
   *   data should be ordered.
   * @return array
   */
  function getChildIds ( $datasource, $parentId, $orderBy=null )
  {
    $model = $this->getModel( $datasource, $parentId );
    return $model->getChildIds( $orderBy );
  }

  /**
   * Returns the number of children of the given node
   * @param string $datasource Name of the datasource
   * @param int $parentId
   * @return int
   */
  function getChildCount ( $datasource, $parentId )
  {
    $model = $this->getModel( $datasource, $parentId );
    return $model->getChildCount();
  }

  /**
   * Reorders the position of the child node. If the tree data in the
   * model does not support reordering, implement as empty stub.
   * @param string $datasource Name of the datasource
   * @param int $parentId parent folder id
   * @param string|null $orderBy defaults to position column
   * @return true
   */
  function reorder ( $datasource, $parentId, $orderBy="position" )
  {
    $model = $this->getModel($datasource, $parentId);
    if (! $model->hasProperty( $orderBy ) )
    {
      $this->raiseError("Invalid order field '$orderBy'");
    }
    $model->reorder( $orderBy );
    return true;
  }

   /**
    * Change position the absolute position of the node among
    *   the node siblings
    * @param string $datasource Name of the datasource
    * @param int $nodeId
    * @param int|string $position  New position
    * @return void
    */
  function changePosition ( $datasource, $nodeId, $position )
  {
    /*
     * change folder position in database
     */
    $model = $this->getModel($datasource, $nodeId );
    $model->changePosition( $position );

    // todo: message to clients

    return true;
  }

   /**
    * Change parent node
    * @param string $datasource Name of the datasource
    * @param int $nodeId  Node id
    * @param int $parentId  New parent node id
    * @param int $position Optional position among siblings
    * @return int Old parent id
    */
  function changeParent( $datasource, $nodeId, $parentId, $position=null )
  {

    if ( $nodeId == $parentId )
    {
      $this->raiseError("Node cannot be its own child!");
    }

    $model = $this->getModel( $datasource, $nodeId );
    $oldParentId =  $model->getParentId();
    $model->changeParent($parentId );

    if ( ! is_null( $position ) and $model->supportsPositioning() )
    {
      $model->changePosition( $position );
    }

    /*
     * @todo send message to clients
     */

    /*
     * return response
     */
    return true;
  }

  /**
   * Returns the path of a node in the folder hierarchy as a
   *   string of the node labels, separated by the a given character
   * @param string $datasource Name of the datasource
   * @param int $nodeId
   * @param string $separator
   * @return string
   */
  function getLabelPath( $datasource, $nodeId, $separator="/" )
  {
    $model = $this->getModel( $datasource, $nodeId );
    return  $model->getLabelPath( $separator );
  }

  /**
   * Returns the path of a node in the folder hierarchy
   *   as an array of ids
   * @param string $datasource Name of the datasource
   * @param int $nodeId
   * @param string $separator
   * @return string
   */
  function getIdPath( $datasource, $nodeId )
  {
    $model = $this->getModel( $datasource, $nodeId );
    return $model->getIdPath();
  }

  /**
   * Returns the id of a node given its label path.
   * @param string $datasource Name of the datasource
   * @param string $path
   * @param string $separator Separator character, defaults to "/"
   * @return int|null The id of the node or null if node does not exist
   */
  function getIdByPath( $datasource, $path, $separator="/" )
  {
    $model = $this->getModel( $datasource );
    return $model->getIdByPath( $path, $separator );
  }

  /**
   * Creates nodes along the path if they don't exist.
   * @param string $datasource Name of the datasource
   * @param string $path
   * @param string $separator Separator character, defaults to "/"
   * @return int Node id
   */
  function createPath( $datasource, $path, $separator="/" )
  {
    $model = $this->getModel( $datasource );
    return $model->getIdByPath( $path, $separator );
  }

  /*
  ---------------------------------------------------------------------------
     INTERFACE QCL_DATA_CONTROLLER_IITEMCONTROLLER API
  ---------------------------------------------------------------------------
  */

  /**
   * Deletes a folder permanently.
   * @param string $datasource Name of the datasource that contains
   *   the record.
   * @param mixed $id Id of the record within the datasource
   * @param mixed|null $options Optional data that might be necessary
   *   to delete the record
   * @return boolean True if successful
   * @override
   */
  function delete( $datasource, $nodeId, $options=null )
  {

    $folderModel = $this->getFolderModel($datasource, $nodeId);
    $childIds = $folderModel->getChildIds();

    /*
     *  delete folder and unlink all records
     */
    $folderModel->delete();
    $this->info("Deleted node #$nodeId");

    /*
     * recurse into children
     */
    if ( count($childIds) )
    {
      foreach( $childIds as $index => $childId )
      {
        $this->delete($datasource, $childId, $options );
      }
    }
    return true;
  }

}
?>