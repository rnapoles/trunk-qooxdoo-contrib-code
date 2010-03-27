<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2010 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */

/**
 * Abstract class serving as marker interface for classes
 * that import data into active record models
 */
abstract class qcl_data_model_AbstractImporter
{

  /**
   * Constructor. Takes the data to be imported as argument.
   * @param mixed $data. The data to import. Type depends on the
   *  importer.
   */
  abstract public function __construct( $data );

  /**
   * Imports the data into the model. Takes the model as argument.
   * @param qcl_data_model_AbstractActiveRecord $model
   * @return void
   */
  abstract public function importInto( qcl_data_model_AbstractActiveRecord $model );

}
?>