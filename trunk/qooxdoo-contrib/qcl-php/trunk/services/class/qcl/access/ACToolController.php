<?php
/* ************************************************************************

   Bibliograph: Collaborative Online Reference Management

   http://www.bibliograph.org

   Copyright:
     2007-2010 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Chritian Boulanger (cboulanger)

************************************************************************ */

qcl_import("qcl_data_controller_Controller");

/**
 * Backend service class for the access control tool widget
 */
class qcl_access_ACToolController
  extends qcl_data_controller_Controller
{

  /*
  --------------------------------------------------------------------
    Editing access object data
  --------------------------------------------------------------------
   */

  /**
   * Returns a map of data on the models that are used for the various xxxElement
   * methods
   * FIXME Use 'access' datasource!
   * @return array
   */
  protected function modelMap()
  {
    return  array(
      'user'        => array(
        'model'       => $this->getAccessController()->getUserModel(),
        'label'       => "Users",
        'labelProp'   => "name"
      ),
      'role'        => array(
        'model'       => $this->getAccessController()->getRoleModel(),
        'label'       => "Roles",
        'labelProp'   => "name"
      ),
      'group'        => array(
        'model'       => $this->getAccessController()->getGroupModel(),
        'label'       => "Groups",
        'labelProp'   => "name"
      ),
      'permission'  => array(
        'model'       => $this->getAccessController()->getPermissionModel(),
        'label'       => "Permissions",
        'labelProp'   => "namedId"
      ),
      'datasource'  => array(
        'model'       => $this->getDatasourceModel(),
        'label'       => "Datasources",
        'labelProp'   => "title",

      )
    );
  }


  /**
   * Retuns ListItem data for the types of access models
   *
   * @return array
   */
  public function method_getAccessElementTypes()
  {
    $this->requirePermission("manageAccess");

    return array(
      array(
        'icon'    => null,
        'label'   => "Users",
        'value'   => "user"
      ),
      array(
        'icon'    => null,
        'label'   => "Roles",
        'value'   => "role"
      ),
      array(
        'icon'    => null,
        'label'   => "Groups",
        'value'   => "group"
      ),
      array(
        'icon'    => null,
        'label'   => "Permissions",
        'value'   => "permission"
      ),
      array(
        'icon'    => null,
        'label'   => "Datasources",
        'value'   => "datasource"
      ),
    );
  }

  /**
   * Return ListItem data for access models
   *
   * @param $type
   * @return array
   */
  public function method_getAccessElements( $type )
  {
    $this->requirePermission("manageAccess");

    switch ( $type )
    {
      case "user":
        $model = $this->getAccessController()->getUserModel();
        $labelProp = "name";
        $model->findWhere( array( 'anonymous' => false ),"name" );
        break;
      case "role":
        $model = $this->getAccessController()->getRoleModel();
        $labelProp = "name";
        $model->findAllOrderBy( $labelProp );
        break;
      case "group":
        $model = $this->getAccessController()->getGroupModel();
        $labelProp = "name";
        $model->findAllOrderBy( $labelProp );
        break;
      case "permission":
        $model = $this->getAccessController()->getPermissionModel();
        $labelProp = "namedId";
        $model->findAllOrderBy( $labelProp );
        break;
      case "datasource":
        $model = $this->getDatasourceModel();
        $labelProp = "title";
        $model->findAllOrderBy( $labelProp );
        break;
      default:
        throw new InvalidJsonRpcArgumentException("Invalid type $type");
    }

    $result = array();
    while( $model->loadNext() )
    {
      $value = $model->namedId();
      $result[] = array(
        'icon'      => null,
        'label'     => $model->get($labelProp),
        'params'    => $type . "," . $value,
        'type'      => $type,
        'value'     => $value
      );
    }

    return $result;
  }

  /**
   * Returns the model of a given element type
   * @param string $type
   * @return qcl_data_model_AbstractActiveRecord
   */
  protected function getElementModel( $type )
  {
    $models = $this->modelMap();
    if ( isset( $models[$type] ) )
    {
      return $models[$type]['model'];
    }
    throw new InvalidJsonRpcArgumentException( "Invalid type '$type'" );
  }

  public function method_getAccessElementTree( $type, $namedId )
  {
    $this->requirePermission("manageAccess");
    $models = $this->modelMap();

    $tree = array(
      'icon'      => "icon/16/actions/address-book-new.png",
      'children'  => array(),
      'label'     => "Relations",
      'value'     => null,
      'type'      => null
    );

    $thisModel = $this->getElementModel( $type );
    if( ! $thisModel )
    {
      throw new InvalidJsonRpcArgumentException("Invalid type argument $type");
    }
    $thisModel->load( $namedId );

    foreach( $models as $type => $data )
    {

      $model = $data['model'];

      if ( $thisModel->hasRelationWithModel( $model)  )
      {

        $node = array(
          'icon'      => "icon/16/actions/address-book-new.png",
          'label'     => $data['label'],
          'value'     => null,
          'type'      => $type,
          'children'  => array()
        );

        try
        {
          $model->findLinked( $thisModel );

          while( $model->loadNext() )
          {
            $node['children'][] = array(
              'icon'      => "icon/16/actions/address-book-new.png",
              'label'     => $model->get($data['labelProp']),
              'type'      => $type,
              'value'     => $model->namedId(),
              'children'  => array()
            );
          }

        }
        catch( qcl_data_model_Exception $e) {}

        $tree['children'][] = $node;
      }
    }

    return $tree;
  }

  /**
   * Add a model record
   *
   * @param $type
   * @param $namedId
   * @return "OK"
   */
  public function method_addElement( $type, $namedId )
  {
    $this->requirePermission("manageAccess");
    $models = $this->modelMap();

    if ( $type == "datasource" )
    {
      qcl_import( "qcl_data_datasource_Manager" );
      $mgr = qcl_data_datasource_Manager::getInstance();
      $mgr->createDatasource( $namedId, "bibliograph" );
      $model = $mgr->getDatasourceModelByName( $namedId );
      $model->set("title", $namedId );
      $model->save();
      $this->dispatchClientMessage("reloadDatasources");
    }
    else
    {
      $model = $this->getElementModel( $type );
      $model->create($namedId,array(
        $models[$type]['labelProp'] => $namedId
      ));
    }
    return "OK";
  }



  /**
   * Delete a model record
   * @param $type
   * @param $ids
   * @return "OK"
   */
  public function method_deleteElement( $type, $ids )
  {
    $this->requirePermission("manageAccess");
    switch( $type )
    {
      case "datasource":
        qcl_import("qcl_ui_dialog_Confirm");
        return new qcl_ui_dialog_Confirm(
          "Do you want to remove only the datasource entry or all associated data?",
          array( "All data", "Entry only", true),
          $this->serviceName(), "deleteDatasource", array($ids)
        );

      default:
        foreach ( (array) $ids as $namedId )
        {
          $models = $this->modelMap();
          $model = $this->getElementModel( $type );
          $model->load( $namedId );
          $model->delete();
        }
    }


    return "OK";
  }

  /**
   * Delete a datasource
   *
   * @param $doDeleteModelData
   * @param $namedId
   * @return qcl_ui_dialog_Alert
   */
  public function method_deleteDatasource( $doDeleteModelData, $namedId )
  {
    if ( $doDeleteModelData === null )
    {
      return "ABORTED";
    }

    $this->requirePermission("manageAccess");
    qcl_import("qcl_ui_dialog_Alert");

    try
    {
      qcl_assert_boolean( $doDeleteModelData );
      qcl_import( "qcl_data_datasource_Manager" );
      qcl_data_datasource_Manager::getInstance()->deleteDatasource( $namedId, $doDeleteModelData );
      $this->broadcastClientMessage("accessControlTool.reloadLeftList");
    }
    catch ( PDOException $e )
    {
      $this->warn(  $e->getMessage() );
      return new  qcl_ui_dialog_Alert("Deleting datasource '$namedId' failed... ");
    }

    return new  qcl_ui_dialog_Alert("Datasource '$namedId' successfully deleted ... ");
  }

  /**
   * Link two model records
   * @param $type1
   * @param $namedId1
   * @param $type2
   * @param $namedId2
   * @return "OK"
   */
  public function method_linkElements( $type1, $namedId1, $type2, $namedId2 )
  {
    $this->requirePermission("manageAccess");
    $models = $this->modelMap();

    $model1 = $this->getElementModel( $type1 );
    $model1->load( $namedId1 );

    $model2 = $this->getElementModel( $type2 );
    $model2->load( $namedId2 );

    $model1->linkModel( $model2 );

    return "OK";
  }

  /**
   * Unlink two model records
   *
   * @param $type1
   * @param $namedId1
   * @param $type2
   * @param $namedId2
   * @return "OK"
   */
  public function method_unlinkElements( $type1, $namedId1, $type2, $namedId2 )
  {
    $this->requirePermission("manageAccess");

    $models = $this->modelMap();

    $model1 = $this->getElementModel( $type1 );
    $model1->load( $namedId1 );

    $model2 = $this->getElementModel( $type2 );
    $model2->load( $namedId2 );

    $model1->unlinkModel( $model2 );

    return "OK";
  }

  /**
   * Edit the element data by returning a form to the user
   * @param $type
   * @param $namedId
   * @return array
   */
  public function method_editElement( $first, $second, $third=null )
  {
    /*
     * if first argument is boolean true, this is the call from a
     * dialog
     */
    if ( $first === true )
    {
      $type     = $second;
      $namedId  = $third;
    }

    /*
     * otherwise, normal call
     */
    else
    {
      $type     = $first;
      $namedId  = $second;
    }

    if( $type != "user" or $namedId != $this->getActiveUser()->namedId() )
    {
      $this->requirePermission("manageAccess");
    }

    $model = $this->getElementModel( $type );
    $model->load( $namedId );
    $formData = $this->createFormData( $model );
    $message = "<h3>" . ucfirst( $type ) . " '" . $namedId . "'</h3>";
    qcl_import("qcl_ui_dialog_Form");
    return new qcl_ui_dialog_Form(
      $message, $formData, true,
      $this->serviceName(), "saveFormData",
      array( $type, $namedId )
    );
  }

  /**
   * Save the form produced by editElement()
   * @param $data
   * @param $type
   * @param $namedId
   * @return "OK"
   */
  public function method_saveFormData( $data, $type, $namedId )
  {

    if ( $data === null )
    {
      return "ABORTED";
    }

    if( $type != "user" or $namedId != $this->getActiveUser()->namedId() )
    {
      $this->requirePermission("manageAccess");
      $this->dispatchClientMessage("accessControlTool.reloadLeftList");
    }

    /**
     * if we have a password field, we expect to have a password2 field
     * as well to match. return to dialog if passwords do not match.
     */
    if ( isset( $data->password ) and ! empty($data->password) )
    {
      if ( ! isset($data->password2) or $data->password != $data->password2 )
      {
        qcl_import("qcl_ui_dialog_Alert");
        return new qcl_ui_dialog_Alert(
          "Passwords do not match. Please try again",
          "bibliograph.model", "editElement", array( "user", $namedId )
        );
      }
    }

    $model = $this->getElementModel( $type );
    $model->load( $namedId );
    $data = $this->parseFormData( $model, $data );
    $model->set( $data );
    $model->save();

    return "OK";
  }


}
?>