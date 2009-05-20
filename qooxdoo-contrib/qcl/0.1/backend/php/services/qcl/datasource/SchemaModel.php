<?php


/**
 * Persistent object storing and managing datasource information 
 */
class qcl_datasource_SchemaModel extends qcl_db_XmlSchemaModel 
{
  /**
   * The path of the xml schema definition
   */
  var $schemaXmlPath = "qcl/datasource/SchemaModel.xml";
    
  /**
   * Register datasource schema
   * @param string $name Name of datasource schema
   * @param string $class Name of datasource model class
   * @param string $title Descriptive title of the datasource
   * @param string $description Long description
   * return void
   */
  function register( $name, $class, $title, $description=null )
  {    
    if ( !$name or !$class )
    {
      $this->raiseError("Invalid parameters.");
    }
    
    /*
     * find entry if exists
     */
    $this->findWhere(array(
      'name'        => $name  
    ));
    
    /*
     * insert new entry if not
     */
    if ( $this->foundNothing() )
    {
      $this->insert( array(
        'name'        => $name,
        'class'       => $class,
        'title'       => $title,
        'description' => $description
      ) );
    }
  }
  
  /**
   * Register datasource schema
   * @param string $name Name of datasource schema
   * return void
   */
  function unregister( $name )
  {    
    if ( !$name )
    {
      $this->raiseError("Invalid parameters.");
    }
    
    /*
     * delete entry if exists
     */
    $this->deleteWhere(array(
      'name'        => $name    
    ));
    
  }  
  
  /**
   * Returns the schema data. If an
   * string argument is provided, return only information
   * on the specific schema
   *
   * @param string[optional] $name
   * @return array
   */
  function getData( $name=null )
  {
    if ( $name )
    {
      $this->findBy("name",$name);
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
  function getClassFor( $name )
  {    
    if ( ! $name )
    {
      $this->raiseError("No schema name provided.");
    }
    $this->findBy("name",$name);
    if ( $this->foundSomething() )
    {
      return $this->getProperty("class");
    }
    $this->raiseError("No class registered for schema '$name'" );
  }
  
  /**
   * Returns a list of registered schema names
   *
   * @return array
   */
  function schemaList()
  {
    $this->findWhere(null,"name","name");
    return $this->values();
  }
    
}
?>