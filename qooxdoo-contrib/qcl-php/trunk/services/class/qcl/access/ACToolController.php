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
        'label'       => $this->tr("Users"),
        'labelProp'   => "name",
        'icon'        => "icon/16/apps/preferences-users.png"
      ),
      'role'        => array(
        'model'       => $this->getAccessController()->getRoleModel(),
        'label'       => $this->tr("Roles"),
        'labelProp'   => "name",
        'icon'        => "icon/16/apps/internet-feed-reader.png"
      ),
      'group'        => array(
        'model'       => $this->getAccessController()->getGroupModel(),
        'label'       => $this->tr("Groups"),
        'labelProp'   => "name",
        'icon'        => "icon/16/actions/address-book-new.png"
      ),
      'permission'  => array(
        'model'       => $this->getAccessController()->getPermissionModel(),
        'label'       => $this->tr("Permissions"),
        'labelProp'   => "namedId",
        'icon'        => "icon/16/apps/preferences-security.png"
      ),
      'datasource'  => array(
        'model'       => $this->getDatasourceModel(),
        'label'       => $this->tr("Datasources"),
        'labelProp'   => "title",
        'icon'        => "icon/16/apps/internet-transfer.png"
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
    $models = $this->modelMap();
    return array(
      array(
        'icon'    => $models['user']['icon'],
        'label'   => $this->tr("Users"),
        'value'   => "user"
      ),
      array(
        'icon'    => $models['role']['icon'],
        'label'   => $this->tr("Roles"),
        'value'   => "role"
      ),
      array(
        'icon'    => $models['group']['icon'],
        'label'   => $this->tr("Groups"),
        'value'   => "group"
      ),
      array(
        'icon'    => $models['permission']['icon'],
        'label'   => $this->tr("Permissions"),
        'value'   => "permission"
      ),
      array(
        'icon'    => $models['datasource']['icon'],
        'label'   => $this->tr("Datasources"),
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
    $models = $this->modelMap();
    while( $model->loadNext() )
    {
      $value  = $model->namedId();
      $icon   = $models[$type]['icon'];
      $label  = $model->get($labelProp);

      if ( $model->hasProperty("ldap") and $model->getLdap() )
      {
        $label .= " (LDAP)";
      }

      $result[] = array(
        'icon'      => $icon,
        'label'     => $label,
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

  /**
   * Returns the tree of model relationships based on the selected element
   * @param $elementType
   * @param $namedId
   * @return unknown_type
   */
  public function method_getAccessElementTree( $elementType, $namedId )
  {
    $this->requirePermission("manageAccess");

    $models = $this->modelMap();

    /*
     * top node
     */
    $tree = array(
      'icon'      => "icon/16/apps/utilities-network-manager.png",
      'children'  => array(),
      'label'     => $this->tr("Relations"),
      'value'     => null,
      'type'      => null
    );

    /*
     * the edited model element
     */
    $thisModel = $this->getElementModel( $elementType );
    if( ! $thisModel )
    {
      throw new InvalidJsonRpcArgumentException("Invalid type argument $elementType");
    }
    $thisModel->load( $namedId );

    /*
     * iterate through the models and display relations as
     * tree structure
     */
    foreach( $models as $type => $data )
    {

      $model = $data['model'];

      if ( $thisModel->hasRelationWithModel( $model )  )
      {

        $node = array(
          'icon'      => $data['icon'],
          'label'     => $data['label'],
          'value'     => $elementType . "=" . $namedId,
          'type'      => $type,
          'mode'      => "link",
          'children'  => array()
        );

        /*
         * special case role - users: skip, would have to be
         * displayed in dependenc of group, we leave this
         * to user - roles
         */
        if( $thisModel instanceof $models['role']['model']
            and $model instanceof $models['user']['model'] )
        {
          continue;
        }

        /*
         * special case: user - role, which can be dependent on the group
         */
        elseif( $thisModel instanceof $models['user']['model']
            and $model instanceof $models['role']['model'] )
        {
          $userModel  = $thisModel;
          $roleModel  = $model;
          $groupModel = $models['group']['model'];

          /*
           * you cannot link to this node
           */
          $node['mode'] = null;

          /*
           * find all groups that the user is member of
           */
          try
          {
            $groupModel->findLinked( $userModel );

            while( $groupModel->loadNext() )
            {
              $groupNode = array(
                'icon'      => $models['group']['icon'],
                'label'     => $this->tr("in") . " " . $groupModel->get( $models['group']['labelProp'] ),
                'type'      => "role",
                'mode'      => "link",
                'value'     => "group=" . $groupModel->namedId() . ",user=" . $userModel->namedId(),
                'children'  => array()
              );
              try
              {
                $roleModel->findLinked( $userModel, $groupModel );
                while( $roleModel->loadNext() )
                {
                  $roleNode = array(
                    'icon'      => $models['role']['icon'],
                    'label'     => $roleModel->get( $models['role']['labelProp'] ),
                    'type'      => "role",
                    'mode'      => "unlink",
                    'value'     => "group=" . $groupModel->namedId() . ",role=" . $roleModel->namedId(),
                    'children'  => array()
                  );
                  $groupNode['children'][] = $roleNode;
                }
              }
              catch( qcl_data_model_RecordNotFoundException $e) {}

              /*
               * add group node to roles node
               */
              $node['children'][] = $groupNode;
            }
          }
          catch( qcl_data_model_RecordNotFoundException $e ){}

          /*
           * no group dependency
           */
          $groupNode = array(
            'icon'      => $models['group']['icon'],
            'label'     => $this->tr("In all groups"),
            'type'      => "role",
            'value'     => "user=" . $userModel->namedId(),
            'mode'      => "link",
            'children'  => array()
          );

          /*
           * find all roles that are linked to the user
           * but not dendent on a group
           */
          try
          {
            $query = $roleModel->findLinkedNotDepends( $userModel, $groupModel );

            while( $roleModel->loadNext( $query ) )
            {
              $roleNode = array(
                'icon'      => $models['role']['icon'],
                'label'     => $roleModel->get( $models['role']['labelProp'] ),
                'type'      => "role",
                'mode'      => "unlink",
                'value'     => "role=" . $roleModel->namedId(),
                'children'  => array()
              );
              $groupNode['children'][] = $roleNode;
            }
          }
          catch( qcl_data_model_RecordNotFoundException $e) {}

          /*
           * add group node to roles node
           */
          $node['children'][] = $groupNode;
        }

        /*
         * no dependencies
         */
        else
        {
          try
          {
            $model->findLinked( $thisModel );

            while( $model->loadNext() )
            {
              $node['children'][] = array(
                'icon'      => $data['icon'],
                'label'     => $model->get($data['labelProp']),
                'type'      => $type,
                'value'     => $type . "=" . $model->namedId(),
                'mode'      => "unlink",
                'children'  => array()
              );
            }
          }
          catch( qcl_data_model_RecordNotFoundException $e) {}
        }
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
          $this->tr("Do you want to remove only the datasource entry or all associated data?"),
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

  protected function getLinkModels( $treeElement, $type, $namedId )
  {
    $models = $this->modelMap();

    $elementParts = explode( ",", $treeElement );

    if ( count( $elementParts ) > 1 )
    {
      $depModelInfo = explode( "=", $elementParts[0] );
      $depModel = $this->getElementModel( $depModelInfo[0] );
      qcl_assert_valid_string( $depModelInfo[1] );
      $depModel->load( $depModelInfo[1] );
      $modelInfo = explode( "=", $elementParts[1] );
    }
    else
    {
      $depModel = null;
      $modelInfo = explode( "=", $elementParts[0] );
    }

    qcl_assert_valid_string( $modelInfo[0] );
    qcl_assert_valid_string( $modelInfo[1] );

    $model1 = $this->getElementModel( $modelInfo[0] );
    $model1->load( $modelInfo[1] );

    $model2 = $this->getElementModel( $type );
    $model2->load( $namedId );

    return array( $model1, $model2, $depModel );
  }

  /**
   * Link two model records
   * @param $treeElement
   * @param $type
   * @param $namedId
   * @return "OK"
   */
  public function method_linkElements( $treeElement, $type, $namedId )
  {
    $this->requirePermission("manageAccess");

    list( $model1, $model2, $depModel ) =
      $this->getLinkModels( $treeElement, $type, $namedId );

    if( $depModel )
    {
      $model1->linkModel( $model2, $depModel );
    }
    else
    {
      $model1->linkModel( $model2 );
    }

    return "OK";
  }

  /**
   * Unlink two model records
   *
   * @param $treeElement
   * @param $type
   * @param $namedId
   * @return "OK"
   */
  public function method_unlinkElements( $treeElement, $type, $namedId )
  {
    $this->requirePermission("manageAccess");

    list( $model1, $model2, $depModel ) =
      $this->getLinkModels( $treeElement, $type, $namedId );

    if( $depModel )
    {
      $model1->unlinkModel( $model2, $depModel );
    }
    else
    {
      $model1->unlinkModel( $model2 );
    }

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
          $this->serviceName(), "editElement", array( "user", $namedId )
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