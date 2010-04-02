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
qcl_import( "qcl_core_PersistentObject" );
qcl_import( "qcl_data_model_IModel" );
qcl_import( "qcl_data_model_PropertyBehavior" );

/**
 * Abstract class for all classes that implement a persistent data model.
 * As opposed to qcl_core_Object, the properties of this object
 * are defined in a qooxdoo-style pattern. This class is persisted in
 * the session only. For persistence using a database, use
 * qcl_data_model_db_PersistentModel
 *
 * @see qcl_data_model_PropertyBehavior
 */
class qcl_data_model_PersistentModel
  extends     qcl_core_PersistentObject
  implements  qcl_data_model_IModel,
              qcl_core_IPersistable
{

  /**
   * The name of the model. Defaults to the name of the class
   * but can be anything.
   *
   * @var string
   */
  protected $name;

  /**
   * The type of the model, if the model implements a generic type in a specific
   * way.
   *
   * @var string
   */
  protected $type;

  /**
   * The property behavior object. Access with getPropertyBehavior()
   */
  private $propertyBehavior = null;

  //-------------------------------------------------------------
  // Constructor & initialization
  //-------------------------------------------------------------

  /**
   * Constructor, calls the init() method
   */
  function __construct()
  {
    parent::__construct();
  }

  /**
   * Model initialization. If you define an overriding method, make sure
   * to call the parent method, otherwise the properties will not be initialized.
   */
  protected function init()
  {
    if ( $this->isNew() )
    {
      $this->getPropertyBehavior()->init();
    }
  }

  //-------------------------------------------------------------
  // Getters & setters
  //-------------------------------------------------------------

  /**
   * Returns model name
   * @return string
   */
  public function name()
  {
    return $this->name;
  }

  /**
   * Returns model type
   * @return string
   */
  public function type()
  {
    return $this->type;
  }

  //-------------------------------------------------------------
  // Properties
  //-------------------------------------------------------------

  /**
   * Returns the behavior object responsible for maintaining the object
   * properties and providing access to them. By default, use
   * qooxdoo-style property system.
   * @override
   * @return qcl_data_model_PropertyBehavior
   */
  public function getPropertyBehavior()
  {
    if ( $this->propertyBehavior === null )
    {
      $this->propertyBehavior = new qcl_data_model_PropertyBehavior( $this );
    }
    return $this->propertyBehavior;
  }

  /**
   * Add a property definition to the model
   * @param array $properties
   * @return void
   */
  public function addProperties( $properties )
  {
    $this->getPropertyBehavior()->add( $properties );
  }

}
?>