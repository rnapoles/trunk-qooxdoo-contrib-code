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
require_once "qcl/core/Object.php";

/**
 * Abstract class for all classes that implement a data model.
 * As opposed to qcl_core_Object, the properties of this object
 * are defined in a qooxdoo-style pattern.
 * @see qcl_data_model_PropertyBehavior
 */
class qcl_data_model_Model
  extends qcl_core_Object
{

  /**
   * The name of the model. Should be a java-like class name such as
   * "namespace.package.ClassName"
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

  //-------------------------------------------------------------
  // Constructor & initialization
  //-------------------------------------------------------------

  /**
   * Constructor, calls the init() method
   */
  function __construct()
  {
    parent::__construct();
    $this->init();
  }

  /**
   * Model initialization. Empty stub to be overridden
   */
  protected function init(){}

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
    static $propertyBehavior = null;
    if ( $propertyBehavior === null )
    {
      require_once "qcl/data/model/PropertyBehavior.php";
      $propertyBehavior = new qcl_data_model_PropertyBehavior( $this );
    }
    return $propertyBehavior;
  }

}
?>