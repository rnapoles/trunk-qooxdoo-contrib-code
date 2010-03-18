<?php

/*
 * qooxdoo - the new era of web development
 *
 * http://qooxdoo.org
 *
 * Copyright:
 *   2009 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */
require_once "qcl/test/AbstractTestController.php";

/**
 * Service class containing test methods
 */
class class_qcl_test_data_db_Tests
  extends qcl_test_AbstractTestController
{

  // rest is not migrated

  function method_runTests()
  {
    require_once "qcl/data/db/test/TestModel1.php";
    require_once "qcl/data/db/test/TestModel2.php";

    $logger = $this->getLogger();
    $logger->setFilterEnabled("propertyModel",true);

    $model1 = new TestModel1($this);
    $model1->create("foo");

    $model2 = new TestModel2($this);
    $model2->create("bar");

    $this->debug($model->linkNodes);

    $model1->linkWith($model2);


    $this->debug($model2->schemaXml->asXml() );

    $this->debug("Model2 is linked with Model1: " . boolToStr( $model2->isLinkedWith($model1)) );


    $logger->setFilterEnabled("propertyModel",false);

    $this->dispatchMessage("infoMessage","See log file for results.");
    return $this->result();
  }



  function method_testExport($params)
  {
    list($modelName) = $params;
    $model = $this->getNew($modelName);
    $model->export();
  }

  function method_testExportLinkData($params)
  {
    list($modelName) = $params;
    $model = $this->getNew($modelName);
    $model->exportLinkData();
  }

  function method_testImportLinkData($params)
  {
    list($modelName) = $params;
    $model = $this->getNew($modelName);
    $model->importLinkData();
  }


}

?>