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
require_once "qcl/data/model/xmlSchema/DbModel.php";

/**
 * Model that registers the relationship between datasource names
 * and class names
 */
class qcl_data_datasource_registry_Model
  extends qcl_data_model_xmlSchema_DbModel
{
  /**
   * The path of the xml schema definition
   */
  var $schemaXmlPath = "qcl/data/datasource/registry/Model.xml";

  /**
   * Returns singleton instance of this class.
   * @return qcl_data_datasource_registry_Model
   */
  function getInstance()
  {
    return qcl_getInstance(__CLASS__);
  }

  /**
   * Register datasource schema
   * @param string $nameId Name of datasource schema
   * @param string $class Name of datasource model class
   * @param string $title Descriptive title of the datasource
   * @param string $description Long description
   * return void
   */
  function register( $namedId, $class, $title, $description=null )
  {
    if ( ! $namedId or !$class )
    {
      $this->raiseError("Invalid parameters.");
    }

    /*
     * insert new entry if not
     */
    if ( $this->foundNothing() )
    {
      $this->replace( array(
        'namedId'     => $namedId,
        'class'       => $class,
        'title'       => $title,
        'description' => $description
      ) );
    }
  }

  /**
   * Unregister datasource schema
   * @param string $namedId Name of datasource schema
   * return void
   */
  function unregister( $namedId )
  {
    if ( ! $namedId )
    {
      $this->raiseError("Invalid parameters.");
    }

    /*
     * delete entry if exists
     */
    $this->deleteBy("namedId",$namedId);

  }

  /**
   * Returns the schema data. If an
   * string argument is provided, return only information
   * on the specific schema
   *
   * @param string[optional] $namedId
   * @return array
   */
  function getData( $namedId=null )
  {
    if ( $namedId )
    {
      $this->findBy("namedId",$namedId);
      return $this->getRecord();
    }
    else
    {
      $this->findAll();
      return $this->getResult();
    }
  }

  /**
   * Returns class modelling the datasource
   * @param string $name Name of datasource schema
   */
  function getClassFor( $namedId )
  {
    if ( ! $namedId )
    {
      $this->raiseError("No schema name provided.");
    }
    $this->findBy("namedId",$namedId);
    if ( $this->foundSomething() )
    {
      return $this->getProperty("class");
    }
    $this->raiseError("No class registered for schema '$namedId'" );
  }

  /**
   * Returns a list of registered schema names
   *
   * @return array
   */
  function schemaList()
  {
    $this->findWhere(null,"namedId","namedId");
    return $this->values();
  }

}
?>