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

qcl_import( "qcl_core_IPropertyAccessors" );

/**
 * Interface for data models
 */
interface qcl_data_model_IModel
  extends qcl_core_IPropertyAccessors
{

  //-------------------------------------------------------------
  // Getters & setters
  //-------------------------------------------------------------

  /**
   * Returns model name. Defaults to the class name.
   * @return string
   */
  public function name();

  /**
   * Returns model type. Defaults to empty string.
   * @return string
   */
  public function type();


  //-------------------------------------------------------------
  // Properties
  //-------------------------------------------------------------

  /**
   * Add a property definition to the model
   * @param array $properties
   * @return void
   */
  public function addProperties( $properties );

}
?>