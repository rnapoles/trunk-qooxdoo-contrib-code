<?php
/*
 * dependencies
 */
require_once "qcl/db/model/AbstractModel.php";
require_once "qcl/db/IModel.php";

/**
 * Model base class for models based on a (mysql) database
 * that are defined by an xml schema definition.
 * @todo rename methods "getX()" into "x()" if they refer to
 * the whole model or all records. "getFoo" should only be used for
 * model data.
 * @todo rename to qcl_db_models_xml_Model
 */
class qcl_db_model_xmlSchema_Model
  extends qcl_db_model_AbstractModel
  implements qcl_db_IModel
{

  /**
   * The schema as an simpleXml object, containing all
   * included xml files. Acces with qcl_db_model_xmlSchema_Model::getSchemaXml();
   * @access private
   * @var qcl_xml_SimpleXml
   */
  var $schemaXml;

  /**
   * The path to the model schema xml file. ususally automatically resolved.
   * @see qcl_db_model_xmlSchema_Model::getSchmemaXmlPath()
   * @var string
   */
  var $schemaXmlPath = null;

  /**
   * The timestamp of the  model schema xml file.
   * @var string
   */
  var $schemaTimestamp = null;

  /**
   * The timestamp of an xml data file
   * @var array
   */
  var $dataTimestamp = array();

  /**
   * Shortcuts to property nodes in schema xml. Access with qcl_db_model_xmlSchema_Model::getPropertyNode($name)
   * @array array of object references
   */
  var $propertyNodes =array();

  /**
   * shortcuts to schema xml nodes with information on table links
   * @var array
   */
  var $linkNodes = array();

  /**
   * An associated array having the names of all alias as
   * keys and the property names as value.
   * @access private
   * @var array
   */
  var $aliases = array();

  /**
   * An associated array, having the name of the property
   * as keys and their alias as value
   * @var unknown_type
   */
  var $aliasMap = array();

  /**
   * Shortcuts to property nodes which belong to metadata
   * @array array of object references
   */
  var $metaDataProperties;

  /**
   * The persistent model table info object
   * @var qcl_db_model_xmlSchema_Registry
   */
  var $modelTableInfo = null;

  /**
   * The path containing data that will imported into the model data
   * when the model is initialized for the first time.
   * @var string
   */
  var $importDataPath;

  /**
   * Flag to prevent caching
   */
  var $doNotCache = false;


  /**
   * Initializes the model.
   * @param mixed $datasourceModel Object reference to
   * the datasource object, or null if model is independent of a datasource
   * @return void
   */
  function initialize( $datasourceModel=null )
  {

    /*
    //$this->debug(
     "Initializing '" . get_class( $this ) . "' with '" . get_class( $datasourceModel ) . "'.",
    );
    */

    /*
     * parent method establishes database connection
     */
    parent::initialize( &$datasourceModel );


    /*
     * skip schema setup if no schema xml path
     */
    if ( $this->getSchmemaXmlPath() )
    {

      /*
       * setup schema. if necessary, create or update tables and import intial data.
       */
      $this->setupSchema();

      /*
       * setup properties
       */
      $this->setupProperties();

      /*
       * setup table links
       */
      $this->setupTableLinks();

      /*
       * error?
       */
      if ( $this->getError() )
      {
        return false;
      }

    }

  }

  /**
   * Rets the name of the column that holds the unique (numeric) id of this table.
   * Usually "id".
   * @return string
   */
  function getIdColumn()
  {
    return $this->getPropertySchemaName("id");
  }

  /**
   * gets the name of the column in other tables that contains a reference to a record in this table (foreign key)
   * @deprecated
   * return string
   */
  function getForeignKeyColumn()
  {
    return $this->getColumnName($this->getForeignKey());
  }

  /**
   * Returns the column name from a property name.
   * Alias for qcl_db_model_xmlSchema_Model::getPropertySchemaName
   * @return string
   * @param string $property Property name
   */
  function getColumnName ( $name )
  {
    return $this->getPropertySchemaName( $name );
  }

  /**
   * Return the names of all properties of this model
   * @return array
   */
  function properties()
  {
    $this->getSchemaXml(); // make sure schema has been initialized
    return array_keys($this->properties);
  }


  /**
   * Checks if property exists
   *
   * @param string $name
   * @return bool
   */
  function hasProperty( $name )
  {
    $this->getSchemaXml(); // make sure schema has been initialized
    return isset( $this->properties[$name] );
  }

  /**
   * Checks if a property has a local alias
   * @param string $propName property name
   */
  function hasAlias($propName)
  {
    $this->getSchemaXml(); // make sure schema has been initialized
    return isset( $this->aliasMap[$propName]  );
  }

  /**
   * Returns the local alias of the property name
   * @param string $propName property name
   */
  function getAlias( $propName )
  {
    if ( ! $this->hasAlias($propName) )
    {
      $this->raiseError("'$propName' has no alias.");
    }
    return $this->aliasMap[$propName];
  }

  /**
   * gets the name the property has in the model schema (i.e. either
   * the unchanged name or a local alias)
   * @param string $name
   * @return string
   */
  function getPropertySchemaName ( $name )
  {
    $this->getSchemaXml(); // make sure schema has been initialized
    return $this->properties[$name];
  }

  /**
   * Gets the node in the schema xml that contains information on
   * the property
   *
   * @param string $name
   * @return SimpleXmlElement
   */
  function &getPropertyNode ( $name )
  {
    $this->getSchemaXml(); // make sure schema has been initialized
    if ( $this->hasAlias($name) )
    {
      $node =& $this->propertyNodes[ $this->getAlias( $name) ];
      if ( ! $node )
      {
        $node =& $this->propertyNodes[ $name ];
      }
    }
    else
    {
      $node =& $this->propertyNodes[ $name ];
    }
    if ( ! $node )
    {
      $this->raiseError("Schema XML for model '{$this->name}' doesn't contain a node for property '$name'.");
    }
    return $node ;
  }

  /**
   * Gets the simple type of the model property (string, int, etc.)
   *
   * @param string $name
   * @return string
   */
  function getPropertyType ( $name )
  {
    $node  =& $this->getPropertyNode( $name );
    $attrs =  $node->attributes();
    return (string) $attrs['type'];
  }

  /**
   * gets the property name corresponding to a column name
   * @return string Field Name
   * @param string $columnName
   */
  function getPropertyName ( $columnName )
  {
    $this->getSchemaXml(); // make sure aliasMap is initialized
    static $reverseAliasMap = null;
    if ( !$reverseAliasMap )
    {
      $reverseAliasMap = array_flip($this->properties);
    }
    return $reverseAliasMap[$columnName];
  }

  /**
   * Checks whether model has 'namedId' property
   * @return string the local name of the property
   */
  function _checkHasNamedId()
  {
    if ( ! $this->hasProperty("namedId") )
    {
      $this->raiseError("Model " . $this->className() . " has no 'namedId' property.");
    }
    return $this->getPropertySchemaName("namedId");
  }


  //-------------------------------------------------------------
  // Record Retrieval (find... methods)
  //-------------------------------------------------------------


  /**
   * Finds all records that are linked to a record in the remote
   * model with the given id.
   *
   * @param int $id
   * @param string $link
   * @param string $orderBy
   * @param mixed $properties
   * @see qcl_db_model_xmlSchema_Model::findWhere()
   *
   */
  function findByLinkedId( $id, $link, $orderBy=null, $properties="*" )
  {
    return $this->findWhere("t2.id=$id", $orderBy, $properties, $link );
  }

  /**
   * Finds all records that are linked to a record in the remote
   * model with the given namedId.
   *
   * @param string $namedId
   * @param string $link
   * @param string $orderBy
   * @param mixed $properties
   * @see qcl_db_model_xmlSchema_Model::findWhere()
   *
   */
  function findByLinkedNamedId( $namedId, $link, $orderBy=null, $properties="*" )
  {
    $linkedModel =& $this->getLinkedModelInstance($link);
    $namedIdCol  =  $linkedModel->getColumnName("namedId");
    return $this->findWhere("t2.`$namedIdCol`='$namedId'", $orderBy, $properties, $link );
  }

 /**
   * Finds all records that are linked to the given model in
   * its current state.
   *
   * @param qcl_db_model_xmlSchema_Model $model
   * @param string $orderBy
   * @param mixed $properties
   * @param bool $distinct
   */
  function findByLinkedModel( $model, $orderBy=null, $properties="*", $distinct=false )
  {
    $links = $this->getLinksByModel( &$model );
    $id    = $model->getId();
    return $this->findWhere("t2.id=$id", $orderBy, $properties, $links[0], null, $distinct );
  }


  /**
   * Returns the record in this table that is referred to by
   * the record from a different table (argument)
   * @return array
   * @param Array   $record  record from a different table that contains a key corresponding to the foreign id of this table
   * @param Boolean $idOnly if true, return only the value of the foreign key column
   * @todo one should be able to pass a model object as argument
   */
  function findByForeignKey( $record, $idOnly = false )
  {
    $id = $record[ $this->getForeignKeyColumn() ];
    if ( $idOnly )
    {
      return $id;
    }
    else
    {
      return $this->findById( $id );
    }
  }


  /**
   * Deletes the currently loaded record or one or more records in a table identified by id
   * @param mixed[optional] $ids (array of) record id(s)
   * @override
   */
  function delete ( $ids=null )
  {
    if ( is_null ($ids) )
    {
      $ids = $this->getId();
      if ( ! $ids )
      {
        $this->raiseError("No record loaded that could be deleted!");
      }
    }

    /*
     * unlink from other models
     */
    foreach( $this->links() as $link )
    {
      /*
       *  // @todo rename "link" into "association"
      switch ( $this->associationType($assocName) )
      {
        case "n:n":
        case "1:1":
        case "1:n":
      }
      */
      $table = $this->getLinkTable( $link );
      $this->db->delete ( $table, $ids, $this->getForeignKey() );
    }

    /*
     * delete records
     */
    $this->db->delete ( $this->table(), $ids );
  }

  //-----------------------------------------------------------------------
  // Deprecated methods, will be slowly replaced by new findBy... methods
  //-----------------------------------------------------------------------


  /**
   * translates column to property names in the array keys
   * @param array $row
   * @return array
   * @deprecated use new findX.. methods
   */
  function columnsToProperties( $row )
  {
    return $this->_columnsToProperties ( $row );
  }

  /**
   * translates column to property names in the array keys (implementation)
   * @param array $row
   * @return array
   * @deprecated use new findX.. methods
   */
  function _columnsToProperties( $row )
  {
    if ( ! $row )
    {
      $row = $this->currentRecord;
    }
    $translatedRow  = array();
    foreach ( $row as $column => $value )
    {
      $field = $this->getPropertyName($column);
      if ( $field and $value )
      {
        $translatedRow[$field]=$value;
      }
    }
    return $translatedRow;
  }

  /**
   * translates property to column names
   * @param array $row
   * @return array
   * @deprecated use new findX.. methods
   */
  function propertiesToColumns( $row=null )
  {
    return $this->_propertiesToColumns ( $row );
  }

  /**
   * translates prperty to column names (implementation)
   * @param array $row
   * @return array
   * @deprecated use new findX.. methods
   */
  function _propertiesToColumns( $row=null )
  {
    $translatedRow = array();
    foreach ( $row as $propName => $value )
    {
      $column = $this->getColumnName($propName);
      if ( $column and $value )
      {
        $translatedRow[$column]=$value;
      }
    }
    return $translatedRow;
  }

  /**
   * Returns values for autocompletion
   * @param string|array $property Name of property from which values are to be drawn
   * @param string $fragment Text fragment to be autocompleted
   * @param string $separator If given, split the field values by this separator (for multi-value fields)
   * @param array $match If given, match these properties
   * @param bool $startsWith If true (default), look only for matching values at the beginning of the field.
   * If false, match fragment anywhere.
   * @todo move sql part into database code
   */
  function autoCompleteValues( $property, $fragment, $separator=null, $match=null, $startsWith = true )
  {
    /*
     * how to match the field values
     */
    if ( $startsWith )
    {
      $searchExpr = "$fragment%";
    }
    else
    {
      $searchExpr = "%$fragment%";
    }

    /*
     * which colums to match
     */
    if ( is_array( $match ) )
    {
      $w = array();
      foreach( $match as $p )
      {
        $c   = $this->getColumnName( $p );
        $w[] = "`$c` LIKE '$searchExpr'";
      }
      $where = implode(" OR ", $w );
    }
    else
    {
      $column = $this->getColumnName( $property );
      $where  = "`$column` LIKE '$searchExpr'";
    }

    /*
     * if several properties where requested, return all results
     */
    if ( is_array($property) )
    {
      $this->findWhere($where, $property, $property);
      return $this->getResult();
    }

    /*
     * if only one property was requested, return list of distinct
     * values, optionally split by separator
     */
    else
    {
      $list = array();
      $values = $this->findDistinctValues($property,$where,$property);
      foreach( $values as $value )
      {
        /*
         * if a separator is given, split values
         */
        if ( $separator )
        {
          foreach( explode( $separator, $value ) as $item)
          {
            if ( strtolower( substr($item, 0, strlen( $fragment ) ) )  == strtolower( $fragment ) )
            {
              $list[] = trim( $item );
            }
          }
        }
        else
        {
          $list[] = trim( $value );
        }
      }
      return array_unique( $list );
    }
  }

  /**
   * Parse xml schema file and, if it has changed, create or update
   * all needed tables and columns. schema document will be available
   * as $this->schemaXml afterwards
   * @param bool $forceUpgrade If true, upgrade schema even if schema xml file hasn't changed
   * @return bool True if tables have been upgraded, null if no upgrade has been attempted, false if there was an error
   */
  function setupSchema( $forceUpgrade=false )
  {

    //$this->debug("Setting up model schema for '" .$this->className() . "' ...", "propertyModel" );

    /*
     * the schema xml object and document
     */
    $modelXml   =& $this->getSchemaXml();
    $doc        =& $modelXml->getDocument();

    //$this->debug($doc->asXml());

    /*
     * model-level attributes
     */
    $modelAttrs  = $doc->model->attributes();

    /*
     * name, should be a dot-separated, java-like class name
     */
    $this->name  = (string) $modelAttrs['name'];

    /*
     * class can be specified separately, defaults
     * to name and converted into PHP-style class name
     * foo.bar.Baz => foo_bar_Baz
     */
    $this->class = str_replace(".","_",
      either(
        (string) $modelAttrs['class'],
        (string) $modelAttrs['name']
      )
    );

    /*
     * the type can be provided if class is the implementation
     * of a more generic data type
     */
    $this->type = (string) $modelAttrs['type'];

    /*
     * whether the setup process should upgrade the schema or just
     * use existing tables in whatever schema they are in
     */
    if ( (string) $modelAttrs['upgradeSchema'] == "no"
       and ! $forceUpgrade )
    {
      $this->log("Schema document for model name '{$this->name}' is not to be upgraded.","propertyModel");
      return null;
    }

    /*
     * Whether the model has a table backend at all
     */
    if ( (string) $modelAttrs['table']  == "no" or (string) $modelAttrs['table']  == "false" )
    {
      $this->log("Model name '{$this->name}' has no table backend.","propertyModel");
      return null;
    }

    /*
     * Now that we know we have a table, we need a database connection
     */
    $db =& $this->db();
    if ( ! $db )
    {
      $this->raiseError("Cannot setup schema - no database connection.");
    }

    /*
     * sql type
     */
    $sqltype =  $db->getType();


    /*
     * The table name is provided as the 'table' property
     * of the class, usually prefixed by the datasource name,
     * if applicable to the model
     */
    if ( ! (string) $modelAttrs['table'] )
    {
      $this->raiseError("Model '{$this->name}': No table name!");
    }
    $prefix = $this->getTablePrefix();
    $this->table = $prefix . (string) $modelAttrs['table'];

    /*
     * Whether the table for this model exists already
     */
    $tableExists  = $db->tableExists( $this->table );
    //$this->debug("Table {$this->table} (" . $this->className(). ")" . ($tableExists ? " exists." : " does not exist." ) );

    /*
     * Get the persistent registry object to look up if this
     * table has been initialized already. To avoid an indefinitive
     * loop, the qcl_data_persistence_db_Model used by
     * qcl_db_model_xmlSchema_Registry must be especially treated.
     * You can upgrade its schema only be deleting the table.
     */
    $modelTableInfo = null;
    if ( $this->isInstanceOf("qcl_data_persistence_db_Model") )
    {
      if ( $tableExists )
      {
        $isInitialized = true;
        $forceUpgrade  = false;
      }
    }
    else
    {
      /*
       * cache object globally and in each object to avoid
       * multiple instantiation of the same object
       */
      if ( ! $this->modelTableInfo )
      {
        require_once "qcl/db/model/xmlSchema/Registry.php";
        if ( phpversion()<5 )
        {
          $this->modelTableInfo =& qcl_db_model_xmlSchema_Registry::getInstance();
        }
        else
        {
          $this->modelTableInfo = qcl_db_model_xmlSchema_Registry::getInstance();
        }
      }
      $datasourceModel =& $this->getDatasourceModel();
      $isInitialized   = $this->modelTableInfo->isInitialized(
        &$datasourceModel,
        $this->table(),
        $this->class,
        $this->schemaTimestamp
      );
    }

    /*
     * Return if table exists and schema hasn't changed for the table
     */
    if ( $tableExists and $isInitialized and ! $forceUpgrade )
    {
      $this->log(
        "Schema document for model name '{$this->name}', ".
        "type '{$this->type}', class '{$this->class}' hasn't changed.",
        "propertyModel"
      );
      return null;
    }

    /*
     * update schema
     */
    $this->info("Creating or updating tables for model name '{$this->name}', type '{$this->type}', class '{$this->class}' ...");

    /*
     * Get admin access
     * FIXME
     */
    $db =& $this->db();

    /*
     * create main data table if necessary
     */
    $table = $this->table();
    if ( ! $db->tableExists($table) )
    {
      $db->createTable($table);
      $modelXml->hasChanged = true;
    }

    $this->log("Creating aliases...","propertyModel");

    /*
     * create alias table
     */
    $aliases  = $doc->model->definition->aliases;
    if ($aliases)
    {
      $aliasMap = array();
      foreach( $aliases->children() as $alias )
      {
        $a = $alias->attributes();
        $aliasMap[ (string) $a['for']] = $modelXml->getData($alias);
      }
    }


    $this->log("Setting up table columns...","propertyModel");

    /*
     * properties as columns
     */
    $properties = $doc->model->definition->properties->children();
    foreach($properties as $property)
    {
      $attr      = $property->attributes();
      $propName  = (string) $attr['name'];
      $colName   = either($aliasMap[$propName],$propName);

      /*
       * save property/alias
       */
      $this->properties[$propName] = $colName;

      /*
       * skip if no column definition available
       */
      if ( qcl_xml_simpleXmlStorage::nodeGetChildCount($property) == 0)
      {
        continue;
      }

      /*
       * @todo get sql definition from sql class
       *
       */
      if ( ! is_object( $property->sql ) )
      {
        $this->warn("Model Property '$propName' has no sql definition.");
        continue;
      }

      /*
       * descriptive definition of the existing table schema,
       */
      $descriptiveDef = $db->getColumnDefinition($table,$colName);

      /*
       * normative definition of how the table schema should look like
       */
      $normativeDef = trim($modelXml->getData($property->sql));

      //$this->debug("Property '$propName', Column '$colName':");
      //$this->debug("Old def: '$descriptiveDef', new def:'$normativeDef'");

      /*
       * Skip column if descriptive and normative column definition are identical.
       * removing "on update" part since this won't be present in the
       * descriptive definition and "default null" since this is the default anyways.
       * @todo check for position and auto-increment
       */
      $sql1 = trim(preg_replace("/on update .+$|default null/", "", strtolower( $normativeDef ) ) );
      $sql2 = trim(preg_replace("/default null/",               "", strtolower( $descriptiveDef ) ) );

      ////$this->debug("'$sql1' == '$sql2'? ");

      /*
       * continue with the next property if nothing has changed
       */
      if ( $sql1 == $sql2 ) continue;

      /*
       * Dropping indexes before changing the schema speeds up things immensely.
       * They will be recreated further dow. This must only be done at
       * the first change of schema and not at all if nothing changes.
       */
      if ( ! $indexes )
      {
        $indexes =& $doc->model->definition->indexes;

        if ( $indexes )
        {
          foreach ( $indexes->children() as $index )
          {
            $attrs   = $index->attributes();
            $name    = (string) $attrs['name'];
            $db->dropIndex($table,$name);
          }
        }
      }

      /*
       * position
       */
      $position  = (string) $attr['position'];
      if ( $position )
      {
        $normativeDef .= " " . $position;
      }

      /*
       * If column does not exist, add it
       */
      if ( ! $descriptiveDef && ! $db->hasColumn( $table, $colName ) )
      {
        $db->addColumn( $table, $colName, $normativeDef );
      }

      /*
       * otherwise, if it exists but is different: modifiy it
       */
      else
      {
        $db->modifyColumn($table,$colName,$normativeDef);
      }

      /*
       * unique column
       */
      if ( (string) $attr['unique'] == "yes" )
      {
        $indexName = $colName . "_unique";
        if ( ! count( $db->getIndexColumns($table,$indexName) ) )
        {
          $db->addIndex("unique", $table, $indexName, $colName );
        }
      }

      /*
       * index
       */
      if ( (string) $attr['index'] == "yes" )
      {
        $indexName = $colName;
        $this->info("Creating index for $colName");
        if ( ! count( $db->getIndexColumns($table,$indexName) ) )
        {
          $db->addIndex("index", $table, $indexName, $colName );
        }
      }

    }

    /*
     * contraints
     */
    $constraints =& $this->schemaXml->getNode("/model/definition/constraints");
    if ( $constraints )
    {

      $this->log("Checking constraints...","propertyModel");

      foreach ( $constraints->children() as $constraint )
      {
        $attrs = $constraint->attributes();

        switch ( (string) $attrs['type'] )
        {
          /*
           * primary key(s)
           */
          case "primary":
            $primaryKeys = array();
            foreach($constraint->children() as $property)
            {
              $a = $property->attributes();
              $propName = ( string )$a['name'];
              $primaryKeys[] =  either($aliasMap[$propName],$propName);
            }

            // analyze existing primary key
            $oldPrimaryKeys = $db->getPrimaryKey($table);

            //$this->debug("Old primary key: " . implode(",",$oldPrimaryKeys) );
            //$this->debug("New primary key: " . implode(",",$primaryKeys) );

            if ( $oldPrimaryKeys != $primaryKeys )
            {
              /*
               * drop old if different from model
               */
              if ( $oldPrimaryKeys)
              {
                $db->dropPrimaryKey($table);
              }

              /*
               * add new primary key
               */
              $db->addPrimaryKey($table,$primaryKeys);
            }
            break;
        }
      }
    }

    /*
     * indexes
     */
    $indexes =& $doc->model->definition->indexes;
    if ( $indexes )
    {
      $this->log("Creating indexes ...","propertyModel");

      foreach ( $indexes->children() as $index )
      {
        $attrs        = $index->attributes();
        $indexType    = strtoupper((string)$attrs['type']);
        switch ($indexType)
        {
          /*
           * fulltext and unique index
           */
          case "FULLTEXT":
          case "UNIQUE":

            $indexProperties = array();
            foreach($index->children() as $property)
            {
              $a        = $property->attributes();
              $propName = (string) $a['name'];
              $indexProperties[] = either($aliasMap[$propName],$propName) ;
            }

            // analyze existing index
            $indexName    = either( (string) $attrs['name'],(string) $indexProperties[0]);
            $db->addIndex($indexType,$table,$indexName,$indexProperties);

            break;
        }
      }
    }

    /*
     * creating link tables
     */
    $links = $doc->model->links;

    $this->log( "Model has " .
      ( is_object( $links ) ?
        qcl_xml_simpleXmlStorage::nodeGetChildCount( $links ) : "no" ) .
      " links.", "propertyModel" );

    if ( is_object( $links ) and qcl_xml_simpleXmlStorage::nodeGetChildCount( $links ) )
    {
      $linksChildren = $links->children();
      $this->log("Creating or updating linked tables...","propertyModel");

      $a = $links->attributes();

      /*
       * get local key column
       */
      $localKey = (string) either($a['localkey'],$a['localKey'],"id");
      if ( $localKey )
      {
        $localKeyColName   = either($aliasMap[$localKey],$localKey);
      }
      else
      {
        $this->raiseError("The <links> node must have a 'localKey' attribute.");
      }

      /*
       * get foreign key column
       */
      $foreignKey = (string) either($a['foreignkey'],$a['foreignKey']);
      if ( $foreignKey )
      {
        $foreignKeyColName = either($aliasMap[$foreignKey],$foreignKey);
      }
      else
      {
        $this->raiseError("The <links> node must have a 'foreignKey' attribute.");
      }


      /*
       * setup each link
       */
      foreach ( $linksChildren as $link )
      {
        $a = $link->attributes();

        /*
         * link table internal name, can be either an arbitrary name
         * or the name of the table that is linked
         */
        $name = (string) either( $a['name'], $a['table']);
        $this->log("Setting up link '$name' ...","propertyModel");

        /*
         * Check if we have a N:N relationship
         * @todo add 1:1 and 1:n associations
         */
        $tbl      = (string) either( $a['jointable'], $a['joinTable'] );
        $linkType = (string) $a['type'];

        if ( $tbl or $linkType=="n:n" )
        {

          if ( $tbl )
          {
            $link_table = $this->getTablePrefix() . $tbl;
            $this->log("Getting join table name '$link_table' from schema ....","propertyModel");
          }
          else
          {
            $link_table = $this->getTablePrefix() . "link_{$table}_{$name}";
            $this->log("Generating join table name '$link_table' ...","propertyModel");
          }

          if ( ! $db->tableExists($link_table) )
          {
            $this->log("Creating table '$link_table'...","propertyModel");
            $db->createTable($link_table);
          }


          /*
           * copy over the column definition from the main table
           */
          $localKeyDef       = $db->getColumnDefinition( $table, $localKeyColName );
          $foreignKeyDef     = $db->getColumnDefinition( $link_table, $foreignKeyColName );

          //$this->debug("Local Key Definition: $localKeyDef");
          //$this->debug("Foreign Key Definition: $foreignKeyDef");

          /*
           * filter unwanted definition parts
           */
          $localKeyDef = trim(preg_replace("/auto_increment/i","",$localKeyDef));

          /*
           * add or modify column if necessary
           */
          if ( ! $foreignKeyDef )
          {
            /*
             * column does not exist, add
             */
            $db->addColumn($link_table,$foreignKeyColName,$localKeyDef);
          }
          elseif ( strtolower($localKeyDef) != strtolower($foreignKeyDef) )
          {
            /*
             * exists but is different: modifiy
             */
            $db->modifyColumn($link_table,$foreignKeyColName,$localKeyDef);
          }

          /*
           * further linked models
           */
          if ( qcl_xml_simpleXmlStorage::nodeGetChildCount( $link ) )
          {

            /*
             * iterate through all the linked models
             */
            $linkChildren = $link->children();
            foreach( $linkChildren as $linkedModel )
            {
              $a = $linkedModel->attributes();

              /*
               * share datasource?
               */
              $shareDatasource = (string) either($a['sharedatasource'],$a['shareDatasource']);

              /*
               * linked model
               */
              $modelName = str_replace(".","_",
                (string) either($a['class'], $a['name'], $a['model'] )
              );

              if ( ! $modelName )
              {
                $this->raiseError("linked model node has no 'name','class' or 'model' attribute.");
              }

              $this->log("Linking $modelName ...","propertyModel");

              /*
               * if you provide a "path" attribute, it will load this file,
               * otherwise the package/subpackage/Class.php pattern will
               * be used
               * @todo document
               */
              if ( strlen( (string) $a['path'] ) )
              {
                require_once $a['path'];
              }
              else
              {
                $this->includeClassfile($modelName);
              }

              /*
               * if the associated model shares the datasource with
               * this model
               * @todo document
               */
              if ( $shareDatasource != "no" and  $shareDatasource != "false" )
              {
                $model =& new $modelName( &$this, &$datasourceModel );
              }
              else
              {
                $model =& new $modelName( &$this );
              }

              /*
               * get foreign key
               */
              $modelTable = $model->table();
              $fkCol      = $model->getForeignKey();
              $fkDef      = $model->db->getColumnDefinition( $modelTable, "id" );
              $fkDef      = trim( str_replace("auto_increment","",$fkDef));

              if ( ! $fkDef )
              {
                $this->raiseError("Cannot get definition for 'id' in table '$modelTable'.");
              }

              /*
               * add or modify column
               */
              $existing = $db->getColumnDefinition($link_table,$fkCol);
              if ( ! $existing )
              {
                $db->addColumn( $link_table, $fkCol, $fkDef );
              }
              elseif ( strtolower($existing) != strtolower($fkDef) )
              {
                $db->modifyColumn( $link_table, $fkCol, $fkDef );
              }

              /*
               * add a backlink in target schema xml if it doesn't exist
               * @todo document
               */
              if ( (string) $a['backlink'] == "true" )
              {

                /*
                 * get <links> node in target model
                 */
                $targetSchemaXml =& $model->getSchemaXml();
                $targetSchemaDoc =& $targetSchemaXml->getDocument();
                $targetLinksNode =& $targetSchemaDoc->model->links;

                if ( ! is_object($targetLinksNode) )
                {
                  $this->raiseError("Linked model must have a <links> node.");
                }

                $found = false;
                foreach( $targetLinksNode->children() as $c )
                {
                  $a = $c->attributes();
                  if ( (string)  $a['name'] == $this->name() )
                  {
                    $found = true;
                  }
                }
                if ( ! $found )
                {
                  $sourceModelNode =& $targetLinksNode->addChild("link");

                  /*
                   * The name of the association is the source table
                   */
                  $sourceModelNode->addAttribute("name", $this->table() );

                  /*
                   * The type of the association
                   */
                  switch( $linkType )
                  {
                    case "n:n":
                    case "1:1":
                      $type = $linkType;
                      break;
                    case "1:n":
                      $type = "1:1";
                      break;
                    default:
                      $type = "n:n";
                  }
                  $sourceModelNode->addAttribute("type", $type );

                  /*
                   * The table
                   */
                  if ( $type == "n:n" )
                  {
                    $sourceModelNode->addAttribute("table", $link_table );
                  }

                  /*
                   * The model class
                   */
                  $sourceModelNode->addAttribute("model", $this->className() );


                  /*
                   * The path of the model class file
                   */
                  $sourceModelNode->addAttribute("path", $this->getClassPath( $this->className() ) );

                  /*
                   * update schema xml
                   */
                  $targetSchemaXml->save();
                }
              }
            }
          }


          /*
           * add to unique index in link table, this works only if the table is
           * empty
           *
           * disabled momentarily because it doesn't seem to work right
           *
          if ( $db->getValue("SELECT COUNT(*) FROM $link_table") == 0 )
          {
            $uniqueIndexCols =  $db->getIndexColumns($link_table,"link");
            if ( ! in_array($foreignKeyColName,$uniqueIndexCols) )
            {
              /*
               * create new unique index including column
               *
              $uniqueIndexCols[] = $foreignKeyColName;
              $db->addIndex("unique",$link_table,"link",$uniqueIndexCols);
            }
          }
          else
          {
            $this->warn("Cannot create unique constraint in $link_table for " . implode(",",$uniqueIndexCols) . ": Table is not empty.");
          }*/
        }
        else
        {
          $this->raiseError("Missing join table. Currently, only n:n associations are implemented.");
        }

      }
    }

    /*
     * Import initial data if necessary
     */
    $path = real_file_path( $this->getDataPath() );
    //$this->debug("Datapath '$path', table '$table' ".  ( $tableExists ? "exists" : "doesn't exist" ),__CLASS__,__LINE__);
    if ( ! $tableExists and $path )
    {
      $this->import($path);
      $this->importLinkData();
    }
    else
    {
      $this->info("No data to import.","propertyModel");
    }

    /*
     * register table initialized for the datasource
     */
    if ( $this->modelTableInfo )
    {
      $this->modelTableInfo->registerInitialized(
        &$datasourceModel,
        $this->table(),
        $this->class,
        $this->schemaTimestamp
      );
    }

    /*
     * model- dependent post-setup actions
     */
    return $this->postSetupSchema();
  }

  /**
   * Model-dependent post-setup stuff. empty stub to be overridden by subclasses if necessary
   * @return bool True if upgrade has been successful, false on error
   */
  function postSetupSchema()
  {
    return true;
  }

  //-------------------------------------------------------------
  // Linked tables
  //-------------------------------------------------------------

  /**
   * Sets up the links to external models
   * @return void
   */
  function setupTableLinks()
  {
    $this->log("Setting up table associations ... ","propertyModel");

    $schemaXml =& $this->getSchemaXml();
    $links     =& $schemaXml->getNode("/model/links");

    //$this->debug( $links );
    if ( is_object($links) )
    {
      $attrs = $links->attributes();
      $this->localKey   = (string) either($attrs['localKey'],$attrs['localkey']);
      $this->foreignKey = (string) either($attrs['foreignKey'],$attrs['foreignkey']);

      $this->linkNodes = array();
      foreach ($links->children() as $linkNode)
      {
        $attrs = $linkNode->attributes();

        /*
         * link table internal name
         */
        $name = (string) $attrs['name'];
        $this->linkNodes[$name] = $linkNode; // don't use copy by reference in PHP4 here, won't work, but $linkNode is a copy anyways because of foreach
      }
    }
  }

  /**
   * Returns an array of SimpleXmlElements that contain
   * link information
   * @return array
   */
  function &getLinkNodes()
  {
    if ( ! $this->linkNodes )
    {
      $this->setupTableLinks();
    }
    return $this->linkNodes;
  }

  /**
   * Return the schema xml node containing information on the given link name
   * @param string $name
   * @return SimpleXmlElement
   */
  function &getLinkNode ( $name=null )
  {
    if ( ! is_array( $this->linkNodes ) )
    {
      $this->setupTableLinks();
    }

    $linkNode = $this->linkNodes[$name];

    if ( ! is_object( $linkNode ) )
    {
      $this->raiseError("No <link> node available for '$name'.");
    }
    return $linkNode;
  }

  /**
   * Gets the name of the table that joins this model to the
   * joined model for the specific link name
   *
   * @param string $name Name of the link
   * @return string Name of the link table
   */
  function getLinkTable( $name )
  {
    $linkNode =& $this->getLinkNode( $name );
    //$this->debug("*** table " . $this->table() . ", link $name *** " . $linkNode->asXml() );
    $attrs = $linkNode->attributes();
    $tbl =  either( (string) $attrs['jointable'], (string) $attrs['joinTable'] );
    if ( ! $tbl )
    {
      $tbl = "link_" . $this->table() . "_" . $name;
    }
    return $this->getTablePrefix() . $tbl;
  }

  /**
   * Gets the class of the model that is joined to this model for the specific link name.
   *
   * @param string $Name of the link
   * @return string Name of the joined model or false if no such name could be found
   */
  function getLinkedModelClass( $name )
  {
    $linkNode =& $this->getLinkNode( $name );
    $attrs = $linkNode->attributes();
    $modelName = (string) $attrs['model'];

    if ( ! $modelName and $linkNode->linkedModel )
    {
      $children  = $linkNode->children();
      $attrs     = $children[0]->attributes();
      $modelName = (string) $attrs['name'];
    }
    if ( $modelName )
    {
      return str_replace(".","_",$modelName);
    }
    return false;
  }

  /**
   * Gets an instance of the model that is joined to this model for the specific link name
   *
   * @param string $Name of the link
   * @return qcl_db_model_xmlSchema_Model Model instance or false if no model could be found.
   */
  function &getLinkedModelInstance( $name )
  {
    $modelClass =  $this->getLinkedModelClass( $name );
    if ( $modelClass )
    {
      $controller =& $this->getController();
      $dsModel    =& $this->getDatasourceModel();

      /*
       * load model code
       */
      $controller->includeClassfile( $modelClass );

      /*
       * create new model instance, passing controller and
       * datasource model to it
       */
      $modelObj =& new $modelClass(&$controller,&$dsModel);
      return $modelObj;
    }
    return false;
  }

  /**
   * Gets the name of the table that is joined to this table for the specific link name
   *
   * @param string $Name of the link
   * @return string Name of the joined table
   */
  function getJoinedTable( $name )
  {
    $joinedModel =& $this->getLinkedModelInstance( $name );
    return $joinedModel->getTableName();
  }

  /**
   * Gets the name of the local key joining the table
   *
   * @return string Name of the local key
   */
  function getLocalKey()
  {
    return $this->localKey;
  }

  /**
   * Gets the name of the local key joining the table
   *
   * @return string Name of the local key
   */
  function getForeignKey()
  {
    return $this->foreignKey;
  }

  /**
   * Returns the name of the link in the schema xml, given a model instance.
   * Throws an error if the model is not linked.
   *
   * @param qcl_db_model_xmlSchema_Model $model
   * @return mixed Array if link(s) ar found, false if not found
   */
  function getLinksByModel( $model )
  {
    $linkNodes = $this->getLinkNodes();

    if ( ! is_array( $linkNodes ) or ! count($linkNodes) )
    {
      $this->raiseError("Model has no links.");
    }

    if ( ! is_a( $model, "qcl_db_model_xmlSchema_Model" ) )
    {
      $this->raiseError("Argument needs to be a qcl_db_model_xmlSchema_Model or subclass.");
    }

    $links = array();

    /*
     * is the other model the main link for this model?
     */
    foreach ( $linkNodes as $linkName => $linkNode )
    {

      $a = $linkNode->attributes();
      if ( $model->isInstanceOf( (string) $a['model'] ) )
      {
        $links[] =  $linkName;
      }

      /*
       * or is it a model which is a secondary link ?
       */
      if ( qcl_xml_simpleXmlStorage::nodeGetChildCount( $linkNode ) )
      {
        foreach ( $linkNode->children() as $linkedModelNode )
        {
          $a = $linkedModelNode->attributes();
          if ( $model->isInstanceOf( (string) $a['name'] ) )
          {
             $links[] = $linkName;
          }
        }
      }
    }
    return count( $links ) ? $links : false;
  }

  /**
   * Return the names of all the links of this model
   * @return array
   */
  function links()
  {
    return array_keys( $this->linkNodes );
  }

  /**
   * Create a link between this model and a different model.
   * This method is for links that connect two models only. For three or more models, use
   * @see qcl_db_model_xmlSchema_Model::unlinkFrom()
   *
   * @param string|object $first Either the object to link to or the name of the link in the schema xml
   * @param int[optional] $linkedId Id of the recordset in the remote model. if not given, the id
   * of the remote model passed as first argument is used.
   * @param int[optional] $localId The id of the local dataset. If not given as an argument,
   * the id of the currently loaded record is used.
   */
  function createLink($first, $linkedId=null, $localId=null, $remove=false)
  {
    /*
     * admin access
     * FIXME
     */

    /*
     * database connection
     */
    $db =& $this->db();

    /*
     * context data
     */
    if ( is_a( $first,"qcl_db_model_xmlSchema_Model" ) )
    {
      $links = $this->getLinksByModel( &$first );
    }
    elseif ( ! $first or ! is_string( $first ) )
    {
      $this->raiseError("Invalid first parameter.");
    }

    /*
     * linked id
     */
    if ( ! $linkedId )
    {
      if ( is_object( $first ) and $first->isInstanceOf("qcl_db_model_xmlSchema_Model") )
      {
        $linkedId = $first->getId();
      }
      else
      {
        $this->raiseError("Invalid linked object or local id.");
      }
    }

    /*
     * local id
     */
    if ( ! $localId )
    {
      $this->info("Local id: '$localId''");
      $localId = $this->getId();
    }
    if ( ! $localId or ! is_numeric($localId) )
    {
      $this->raiseError("Invalid local id '$localId");
    }

    /*
     * linked table
     */
    $linkTable =  $this->getLinkTable( $links[0] );

    /*
     * foreign key of this model
     */
    $foreignkey =  $this->getForeignKey();

    /*
     * the joined model
     */
    if ( is_object($first) )
    {
      $joinedModel =& $first;
    }
    else
    {
      $joinedModel =& $this->getLinkedModelInstance( $links[0] );
    }

    /*
     * the foreign key of the joined model
     */
    $jmForeignKey =  $joinedModel->getForeignKey();

    /*
     * link data
     */
    $data = array();
    $data[$foreignkey]   = $localId;
    $data[$jmForeignKey] = $linkedId;


    if ( $remove )
    {
      /*
       * remove from table
       */
      return $db->deleteWhere($linkTable, "`$foreignkey`=$localId AND `$jmForeignKey`=$linkedId" );
    }
    else
    {
      /*
       * insert into table
       */
      return $db->insert($linkTable, $data);
    }
  }


  /**
   * Removes a link between this model and a different model.
   * This method is for links that connect two models only. For three or more models, use
   * @see qcl_db_model_xmlSchema_Model::unlinkFrom()
   *
   * @param string|object $first Either the object to unlink from or
   * the name of the link in the schema xml.
   * @param int[optional] $linkedId Id of the recordset in the remote model. if not given, the id
   * of the remote model passed as first argument is used.
   * @param int[optional] $localId The id of the local dataset. If not given as an argument,
   * the id of the currently loaded record is used.
   */
  function removeLink( $first, $linkedId, $localId=null )
  {
    return $this->createLink( &$first, $linkedId, $localId, true);
  }

  /**
   * Link a variable number of models
   * @param qcl_db_model_xmlSchema_Model $model2 Model
   */
  function linkWith()
  {
    $params =& func_get_args();
    array_unshift( $params, "link" );
    return call_user_func_array( array( &$this, "_modifyLink" ), $params);
  }

  /**
   * Unlink a variable number of models
   * @param qcl_db_model_xmlSchema_Model $model2 Model
   * @param bool
   */
  function unlinkFrom()
  {
    $params =& func_get_args();
    array_unshift( $params, "unlink" );
    return call_user_func_array( array( &$this, "_modifyLink" ), $params);
  }

  /**
   * Remove all links from the current model instance ta variable number of models
   * @param qcl_db_model_xmlSchema_Model $model2 Model
   * @param bool
   */
  function unlinkFromAll()
  {
    $params =& func_get_args();
    array_unshift( $params, "unlinkFromAll" );
    return call_user_func_array( array( &$this, "_modifyLink" ), $params);
  }

  /**
   * Checks whether models are linked
   * @param qcl_db_model_xmlSchema_Model $model2 Model
   * @param bool
   */
  function isLinkedWith()
  {
    /*
     * database connection
     */
    $db =& $this->db();

    /*
     * parameters
     */
    $params =& func_get_args();
    array_unshift( $params, "data" );

    /*
     * get data from generic method and return false if
     * there is no link
     */
    $data = call_user_func_array( array( &$this, "_modifyLink" ), $params);
    if ( ! is_array($data) ) return false;

    /*
     * check all linked models
     */
    $linked = true;
    foreach( $data as $table => $row )
    {
      /*
       * where query
       */
      $where = array();
      foreach ( $row as $key => $value )
      {
        $where[] = "`$key`=$value";
      }
      $where = implode(" AND ", $where );

      /*
       * check if link exists
       */
      if ( ! $db->exists($table,$where) ) $linked = false;
    }
    return $linked;
  }

  /**
   * Create or delete a link a variable number of models
   * @param qcl_db_model_xmlSchema_Model $model2 Model to link with
   * @param qcl_db_model_xmlSchema_Model $model3 Optional model to link with
   * @param qcl_db_model_xmlSchema_Model $model4 Optional model to link with
   */
  function _modifyLink()
  {
    /*
     * admin access
     * FIXME
     */

    /*
     * database connection
     */
    $db =& $this->db();

    /*
     * action
     */
    $action = $that  =& func_get_arg(0);

    /*
     * this model
     */
    $thisId      =  $this->getId();
    $thisFKey    =  $this->getForeignKey() or $this->raiseError( $this->name(). " has no foreign key!" );;

    /*
     * data to insert into link model
     */
    $data  = array();
    $links = null;

    for( $i=1; $i < func_num_args(); $i++ )
    {

      /*
       * remote model
       */
      $that  =& func_get_arg($i);
      if ( ! is_a( $that, __CLASS__ ) )
      {
        $this->raiseError("Invalid parameter $i. Must be a " . __CLASS__  . " but is a '" . typeof( $that, true ) . "'.'" );
      }

      if( $action != "unlinkFromAll" )
      {
        $thatId   =  $that->getId();
      }
      $thatFKey =  $that->getForeignKey() or $this->raiseError( $that->name(). " has no foreign key!" );

      /*
       * links to this model, defined by the first argument
       */
      if ( ! $links )
      {
        $l =  $this->getLinksByModel( &$that );
        if ( ! $l )
        {
          if ( $action == "data" ) return false;
          $this->raiseError("Model '" . $this->className() . "' is not linked to model '" . $that->className() . "'.");
        }
        $links = $l;
      }


      /*
       * create link entries
       */
      foreach ( $links as $link )
      {
        $linkTable   = $this->getLinkTable( $link );
        $data[$linkTable][$thisFKey] = $thisId;
        $data[$linkTable][$thatFKey] = $thatId;
      }
    }

    /*
     * return data only
     */
    if ( $action == "data" ) return $data;

    /*
     * Insert or delet data.
     */
    foreach ( $data as $table => $row )
    {
      /*
       * where query
       */
      $where = array();
      foreach ( $row as $key => $value )
      {
        $where[] = "`$key`=$value";
      }
      $where = implode(" AND ", $where );

      switch ( $action )
      {
        /*
         * link the models
         */
        case "link":
          /* Since we cannot create unique
           * indexes dynamicall, we check first before
           * inserting
           */
          if ( $db->exists($table, $where) )
          {
            $this->warn("Table $table: $where already exists.");
          }
          else
          {
            $id = $db->insert( $table, $row );
          }
          break;

        /*
         * unlink the models
         */
        case "unlink":
          $db->deleteWhere( $table, $where );
          break;

        /*
         * unlink the models
         */
        case "unlinkFromAll":
          $db->deleteWhere( $table, "`$thisFKey`=$thisId" );
          break;

        /*
         * unknown action
         */
        default:
          $this->raiseError("Unknown link action '$action'");
      }
    }
    return true;

  }

  /**
   * Exports model data to an xml file, creating an extra file with link information
   * <links model="qcl.foo.Model">
   * <!-- links that connect to only one other model -->
   *  <link name="singlelink" model="qcl.bar.Model">
   *    <origin namedId="qcl.foo.Instance1">
   *      <target namedId="qcl.bar.Instance1" />
   *      <target namedId="qcl.bar.Instance2" />
   *    </origin>
   *  </link>
   *  <!-- link that connects several models -->
   *  <link name="multilink">
   *    <origin namedId="qcl.foo.Instance1">
   *      <target>
   *        <model name="qcl.bar.Model" namedId="qcl.bar.Instance123" />
   *        <model name="qcl.boo.Model" namedId="qcl.boo.Instance123" />
   *      </target>
   *    </origin>
   *  </link>
   * </links>
   * @see qcl_db_model_AbstractModel
   * @param string $dir directory path where link data is to be put, defaults to the
   * directory containing the inital data file
   * @param bool $isBackup if true, prepend "backup_" before the filename
   */
  function exportLinkData($dir=null, $isBackup=false)
  {
    /*
     * database connection
     */
    $db =& $this->db();

    /*
     * check dir
     */
    if ( ! is_null($dir) and ! is_dir($dir) )
    {
      $this->raiseError("'$dir' is not a directory.");
    }

    /*
     * links in model schema
     */
    $linkNodes =& $this->getLinkNodes();
    if ( ! count($linkNodes) ) return;

    /*
     * links
     */
    $localKey   = $this->getLocalKey();
    $foreignKey = $this->getForeignKey();

    foreach( $linkNodes as $linkNode )
    {
      $attrs = $linkNode->attributes();
      $name  = (string) $attrs['name'];
      $table = (string) $attrs['table'];

      /*
       * get file path and delete file if it exists
       */
      $path = either( $dir, dirname($this->getDataPath() ) ) . "/" . ( $isBackup ? "backup_" : "") . "$table.data.xml";
      @unlink($path);
      $this->info("Exporting Link data '$name' of {$this->name} data to $path");

      /*
       * create new xml file
       */
      $dataXml =& new qcl_xml_simpleXmlStorage();
      $dataXml->createIfNotExists($path);
      $dataXml->load($path);

      /*
       * create the main nodes
       */
      $doc         =& $dataXml->getDocument();
      $linksNode   =& $doc->addChild("links");
      $linksNode->addAttribute("model", $this->name() );

      /*
       * model names
       */
      $model = (string) $attrs['model'];
      if ( $model )
      {
        $models = array($model);
      }
      else
      {
        $models = array();
        foreach ( $linkNode->children() as $child )
        {
          $attrs = $child->attributes();
          $models[] = (string) $attrs['name'];
        }
      }

      /*
       * instantiate linked models
       */
      $controller =& $this->getController();
      foreach( $models as $modelName )
      {
        $this->_models[$modelName] =& $controller->getNew( $modelName );
      }

      /*
       * link node
       */
      $linkNode =& $linksNode->addChild("link");
      $linkNode->addAttribute("name",$name);

      /*
       * save model name if it is a single link
       */
      if ( count($models) == 1 )
      {
        $linkNode->addAttribute("model",$models[0]);
      }

      /*
       * get all link data
       */
      $linkData = $db->getAllRecords("
        SELECT * FROM " . $this->getTablePrefix() . $table . "
        ORDER BY `$foreignKey`
      ");

      $id = null;

      foreach ( $linkData as $row )
      {
        /*
         * load model data
         */
        $_id = $row[$foreignKey];
        $this->load($_id);
        if ( $this->foundNothing() )
        {
          $this->warn("Invalid entry/entries in $table for $foreignKey = $_id. Deleting...");
          $db->deleteWhere($table,"$foreignKey=$_id");
          continue;
        }

        /*
         * create a link data node foreach data record
         * that has links
         */
        if ( $id != $_id )
        {
          $id = $_id;
          $originNode =& $linkNode->addChild("origin");
          if ( $this->hasProperty("namedId") )
          {
            $originNode->addAttribute("namedId", $this->getNamedId() );
          }
          else
          {
            $originNode->addAttribute("id", $id );
          }
        }

        /*
         * data node, eithe
         */
        $targetNode =& $originNode->addChild("target");


        /*
         * multilinks, syntax is
         * <target>
         *  <model name="model.name" namedId="named.id.of.record" />
         * </target>
         *
         * or
         * <target>
         *  <model name="model.name" id="11" />
         * </target>
         *
         */
        if ( count($models) > 1 )
        {

          /*
           * for each linked model, create taget node
           */
          foreach ( $models as $modelName )
          {
            /*
             * link data
             * @todo share datasource, override getNew method
             */
            $model =& $this->_models[$modelName];
            $modelFk = $model->getForeignKey();
            $modelId = $row[ $modelFk ];
            $model->load( $modelId );
            if ( $model->foundSomething() )
            {
              $modelNode =& $targetNode->addChild("model");
              $modelNode->addAttribute("name", $modelName);
              if ( $model->hasProperty("namedId") )
              {
                $modelNode->addAttribute("namedId", $model->getNamedId() );
              }
              else
              {
                $modelNode->addAttribute("id", $model->getId() );
              }
            }
            else
            {
              $this->warn("Invalid entry in $table for $foreignKey = $id and $modelFk = $modelId");
            }
          }
        }

        /*
         * single link, syntax
         * <target namedId="named.id.of.record"/>
         */
        else
        {
          $model =& $this->_models[ $models[0] ];
          $modelFk = $model->getForeignKey();
          $modelId = $row[ $modelFk ];
          $model->load( $modelId );
          if ( $model->foundSomething() )
          {
            if ( $model->hasProperty("namedId") )
            {
              $targetNode->addAttribute("namedId", $model->getNamedId() );
            }
            else
            {
              $targetNode->addAttribute("id", $model->getId() );
            }
          }
          else
          {
            $this->warn("Invalid entry in $table for $foreignKey = $id and $modelFk = $modelId");
          }
        }
      }

      /*
       * save xml
       */
      $dataXml->save();
    }
  }

  /**
   * Imports initial link data for the model from an xml
   * for the structure,
   * @see qcl_db_model_xmlSchema_Model::exportLinkData()
   * @param string $path
   */
  function importLinkData( $path=null )
  {
    /*
     * links in model schema
     */
    $this->setupTableLinks();
    $linkNodes = $this->getLinkNodes();

    if ( ! count( $linkNodes ) )
    {
      $this->log("Model does not have links. Cannot import link data.","propertyModel");
      return;
    }

    /*
     * links
     */
    $localKey   = $this->getLocalKey();
    $foreignKey = $this->getForeignKey();

    foreach( $linkNodes as $linkNode )
    {
      $attrs     = $linkNode->attributes();
      $linkName  = (string) $attrs['name'];
      $joinTable = (string) $attrs['jointable'];

      /*
       * get file path
       */
      $path = either(
        $path,
        dirname( $this->getDataPath() ) . "/$joinTable.data.xml"
      );
      $path = real_file_path ($path);
      if ( ! file_exists($path) )
      {
        $this->log("No link data available for link '$linkName' of model '{$this->name}' ","propertyModel");
        continue;
      }

      $this->log("Importing link data for link '$linkName' of model '{$this->name}' from '$path'...","propertyModel");

      /*
       * parse xml file
       */
      $dataXml =& $this->parseXmlDataFile($path);
      $dataDoc =& $dataXml->getDocument();

      /*
       * main node
       */
      $linksNode =& $dataDoc->links or $this->raiseError("No links node available.");
      $attrs = $linksNode->attributes();
      $mdl   =  (string) $attrs['model'];

      /*
       * the link data doesn't originate from this model, ignore
       */
      if ( $mdl != $this->name() )
      {
        $this->warn( "Origin model in xml ('$mdl') does not fit this model ('" . $this->name() . "'). Skipping...", "propertyModel");
        return;
      }

      foreach ( $linksNode->children() as $linkNode )
      {

        /*
         * link node attributes
         */
        $attrs  = $linkNode->attributes();
        $tModel = (string) $attrs['model'];
        $tName  = (string) $attrs['name'];

        /*
         * if target link name is not the current link name, skip
         */
        if ( $tName != $linkName ) continue;

        /*
         * target model
         */
        if( $tModel )
        {
          /*
           * @todo check if model name fits with schema xml
           */
          $clazz = str_replace(".","_",$tModel);
          $targetModel =& new $clazz();
        }
        else
        {
          $this->raiseError("Importing multilinks not yet implemented.");
        }

        /*
         * origin nodes
         */
        foreach ( $linkNode->children() as $originNode )
        {

          $attrs    = $originNode->attributes();
          $oNamedId = (string) either($attrs['namedId'],$attrs['namedid']);
          $oId      = (int) $attrs['id'];

          /*
           * load origin record
           */
          if ( $oId )
          {
            $this->load( $oId );
          }
          elseif ( $oNamedId )
          {
            $this->findByNamedId( $oNamedId );
          }
          else
          {
            $this->raiseError("No identifier for origin record.");
          }

          /*
           * does origin record exist?
           */
          if ( $this->foundNothing() )
          {
            $this->warn("Origin record ('$oNamedId') does not exist for model '{$this->name}'. Skipping it...");
            continue;
          }

          foreach ( $originNode->children() as $targetNode )
          {
            $attrs    = $targetNode->attributes();
            $tNamedId = (string) either($attrs['namedId'],$attrs['namedid']);
            $tId      = (int) $attrs['id'];

            /*
             * single links
             */
            if( $tModel )
            {
              /*
               * load target record
               */
              if ( $tNamedId )
              {
                $targetModel->findByNamedId($tNamedId);
              }
              elseif ( $tId )
              {
                $targetModel->load( $tId );
              }
              else
              {
                $this->warn("Missing identifier for target node.");
                continue;
              }

              /*
               * link with target record
               */
              if ( $targetModel->foundSomething() )
              {
                //$this->info("Linking '{$this->name}' #$oNamedId/$oId' with '$tModel' #$tNamedId/$tId.");
                $this->linkWith(&$targetModel);
              }
              else
              {
                $this->raiseError("Target record '$tNamedId/$tId' does not exist for model '$tModel'");
              }
            }

            /*
             * multilinks, not yet implemented
             */
            else
            {
              $this->raiseError("Importing multilinks not yet implemented.");
            }
          }
        }
      }
    }
  }

  //-------------------------------------------------------------
  // Model Setup methods
  //-------------------------------------------------------------

  /**
   * gets the path of the file that contains the initial
   * data for the model
   */
  function getDataPath()
  {
    if ( $this->importDataPath )
    {
      return $this->importDataPath;
    }
    $class = get_class($this);
    $path  = str_replace("_","/",$class) . ".data.xml";
    return $path;
  }

  /**
   * setup model properties
   */
  function setupProperties()
  {

    $this->log("Setting up properties...", "propertyModel" );

    /*
     * defintion node
     */
    $schemaXml  =& $this->getSchemaXml();
    $definition =& $schemaXml->getNode("/model/definition");
    if ( ! $definition )
    {
      $this->raiseError("Model schema xml does not have a 'definition' node.");
    }

    /*
     * properties
     */
    $properties =& $definition->properties;
    if ( ! is_object($properties) )
    {
      $this->raiseError("Model has no properties.");
    }

    $children   =& $properties->children();
    foreach ( $children as $propNode)
    {
      $attrs     = $propNode->attributes();
      $propName  = (string) $attrs['name'];


      //$this->debug("Setting up property '$propName'");

      /*
       * store shorcut object property for easy
       * sql string coding: "SELECT {$this->col_id} ..."
       * @todo remove this eventually, bad style
       */
      $columnVar = "col_$propName";
      $this->$columnVar = $propName;

      /*
       * store property node
       */
      $this->propertyNodes[$propName] = $propNode;

      /*
       * make an alias to all-lowercased property name
       * because overloading doesn't preserve letter
       * cases
       */
      $this->propertyNodes[strtolower($propName)] = $propNode;

      /*
       * store property name as key and value
       */
      $this->properties[$propName] = $propName;
      //$this->debug(gettype($propNode));
    }

//   //$this->debug("Properties:");
//   //$this->debug(array_keys($this->propertyNodes));
//   //$this->debug(array_keys(get_object_vars($this)));

    /*
     * aliases
     */
    $aliases =& $definition->aliases;
    if ( $aliases )
    {

      foreach( $aliases->children() as $alias )
      {

        /*
         * get alias
         */
        $attrs    = $alias->attributes();
        $propName = (string) $attrs['for'];
        $column   = qcl_xml_SimpleXmlStorage::getData(&$alias);

        /*
         * store in alias map
         */
        $this->aliasMap[$propName] = $column;

        /*
         * overwrite object property
         * @todo remove
         */
        $columnVar = "col_$propName";
        $this->$columnVar = $column;

        /*
         * overwrite property name with alias
         */
        $this->properties[$propName] = $column;

        /*
         * store in aliases array
         */
        $this->aliases[$column] = $propName;
      }
    }

    //$this->debug("Alias Map:");
    //$this->debug($aliasMap);

    /*
     * setup metadata array with shortcuts to property nodes
     */
    $propGroups =& $definition->propertyGroups;
    if ( $propGroups )
    {
      $metaDataNode =& qcl_xml_SimpleXmlStorage::getChildNodeByAttribute($propGroups,"name","metaData");
      if ( $metaDataNode )
      {
        foreach ( $metaDataNode->children() as $metaDataPropNode )
        {
          $attrs = $metaDataPropNode->attributes();
          $name  = (string) $attrs['name'];
          //$this->debug("$name => " . gettype($this->propertyNodes[$name]) );
          if ( isset($this->propertyNodes[$name]) )
          {
            $this->metaDataProperties[$name] =& $this->propertyNodes[$name];
          }
        }
      }
      //$this->debug("Metadata properties:");
      //$this->debug( array_keys($this->metaDataProperties));
    }
  }

  /**
   * returns the absolute path of the xml file that
   * is connected by default to this model. It is located
   * in the same directory as the class file
   * path/to/class/classname.xml
   * @return string
   * @todo remove ".model."
   */
  function getSchmemaXmlPath()
  {
    if ( $this->schemaXmlPath or $this->schemaXmlPath === false )
    {
      return $this->schemaXmlPath;
    }
    $class = get_class($this);
    return str_replace("_","/",$class) . ".model.xml";
  }

  /**
   * get the model schema as an simpleXml object
   * @param string $path path of schema xml file or null if default file is used
   * @return qcl_xml_SimpleXmlStorage
   */
  function &getSchemaXml($path=null)
  {

    /*
     * if schema file has already been parsed, return it
     */
    if ( is_object( $this->schemaXml ) )
    {
      return $this->schemaXml;
    }

    /*
     * get schema file location
     */
    $path = either( $path, $this->getSchmemaXmlPath() );

    /*
     * if null, return null
     */
    if ( $path === false )
    {
      return null;
    }

    /*
     * check file
     */
    if ( ! $filepath = real_file_path( $path ) )
    {
      $this->raiseError("No valid file path: '$path'");
    }

    /*
     * get and return schema document
     */
    $this->schemaXml =& $this->parseXmlSchemaFile( $filepath );
    return $this->schemaXml;
  }

  /**
   * Parses an xml schema file, processing includes
   * @param string $file
   * @return qcl_xml_SimpleXmlStorage
   */
  function &parseXmlSchemaFile($file)
  {

    /*
     * include simple xml library (cannot do that in header without
     * creating include order problems)
     */
    require_once "qcl/xml/SimpleXmlStorage.php";

    /*
     * load model schema xml file
     */
    $this->log("Parsing model schema file '$file'...","propertyModel");
    $modelXml =& new qcl_xml_SimpleXmlStorage( $file );
    $modelXml->doNotCache = $this->doNotCache;
    $modelXml->load();

    /*
     * The timestamp of the schema file. When a schema extends
     * another schema, the newest filestamp is used.
     */
    if ( $modelXml->lastModified() > $this->schemaTimestamp )
    {
      $this->schemaTimestamp = $modelXml->lastModified();
    }

    /*
     * The document object
     */
    $doc =& $modelXml->getDocument();

    /*
     * does the model schema inherit from another schema?
     */
    $rootAttrs    = $doc->attributes();
    $includeFiles = (string) $rootAttrs['include'];

    if ( $includeFiles )
    {
      foreach( explode(",",$includeFiles) as $includeFile )
      {
        $this->log("Including '$includeFile' into '$file'...", "propertyModel" );
        $parentXml   =& $this->parseXmlSchemaFile( $includeFile );
        $modelXml->extend($parentXml);
        //$this->debug($modelXml->asXml());
      }
    }

    /*
     * return the aggregated schema object
     */
    return $modelXml;
  }

  /**
   * Parses an xml data file, processing includes
   * @param string $file
   * @return qcl_xml_SimpleXmlStorage
   */
  function &parseXmlDataFile( $file )
  {

    /*
     * include simple xml library (cannot do that in header without
     * creating include order problems
     */
    require_once "qcl/xml/SimpleXmlStorage.php";

    /*
     * load model schema xml file
     */
    $this->log("Parsing model data file '$file'...","propertyModel");
    $dataXml =& new qcl_xml_SimpleXmlStorage( $file );
    $dataXml->load();

    /*
     * The document object
     */
    $doc =& $dataXml->getDocument();

    /*
     * does the  data inherit from another file?
     */
    $rootAttrs    = $doc->attributes();
    $includeFiles = (string) $rootAttrs['include'];
    //$this->debug("Included files: $includeFiles");

    if ( $includeFiles )
    {
      foreach( explode(",",$includeFiles) as $includeFile )
      {
        $this->log("Including '$includeFile' into '$file'...", "propertyModel" );
        $parentXml   =& $this->parseXmlSchemaFile( $includeFile );
        $dataXml->extend($parentXml);
        //$this->debug($dataXml->asXml());
      }
    }

    /*
     * return the aggregated schema object
     */
    return $dataXml;
  }

  //-------------------------------------------------------------
  // Import and export of model data
  //-------------------------------------------------------------

  /**
   * exports model data to an xml file
   *
   * @param string $path file path, defaults to the location of the inital data file
   * @return qcl_xml_SimpleXmlStorage The xml document object
   */
  function &export($path=null)
  {

    /*
     * schema document
     */
    $schemaXml    =& $this->getSchemaXml();
    $schemaXmlDoc =& $schemaXml->getDocument();

    /*
     * path of exported file
     */
    $path = either($path,$this->getDataPath());
    $this->log("Exporting {$this->name} data to $path","propertyModel");

    /*
     * remove old file if it exists
     */
    @unlink($path);

    /*
     * create new xml file
     */
    $dataXml =& new qcl_xml_SimpleXmlStorage( $path );
    $dataXml->createFile();

    /*
     * create the main nodes
     */
    $doc         =& $dataXml->getDocument();
    $dataNode    =& $doc->addChild("data");
    $recordsNode =& $dataNode->addChild("records");

    /*
     * alias node
     */
    $aliasNode =& $schemaXml->getNode("/model/definition/aliases");

    /*
     * property groups in model schema
     */
    $propGrpsNode =& $schemaXml->getNode("/model/definition/propertyGroups");
    //$this->debug($propGrpsNode->asXml());

    /*
     * metatdata property names
     */
    $metaDataProperties = array_keys($this->metaDataProperties);

    /*
     * list of properties minus those which should be
     * skipped
     */
    $propList     =  $this->properties();
    $skipExpNode  =& $schemaXml->getChildNodeByAttribute(&$propGrpsNode,"name","skipExport");

    foreach( $this->propertyNodes as $propNode )
    {
      $attrs = $propNode->attributes();
      $skipExpAttr = (string) either($attrs['skipExport'],$attrs['skipexport']);
      if ( $skipExpAttr == "true" )
      {
        $skipPropList[] = $attrs['name'];
      }
    }

    $skipPropList = array_unique($skipPropList);
    $propList = array_diff($propList,$skipPropList);

    $this->log("Exporting properties " . implode(",",$propList) . ", skipping properties " . implode(",",$skipPropList) . ".","propertyModel");

    /*
     * export all records
     */
    $records = $this->findAll();

    foreach($records as $record)
    {
      $recordNode =& $recordsNode->addChild("record");

      /*
       * dump each column value
       */
      foreach ($propList as $propName )
      {
        /*
         * column data; skip empty columns
         */
        $columnData = $record[$propName];
        if ( empty($columnData) )
        {
          continue;
        }

        $data = xml_entity_encode($columnData);

        if ( in_array($propName,$metaDataProperties) )
        {
          /*
           * if property is part of metadata, use attribute
           */
          $recordNode->addAttribute($propName,$data);
        }
        else
        {
          /*
           * otherwise, create property data node
           */
          $propDataNode =& $recordNode->addChild("property");
          $propDataNode->addAttribute("name",$propName);
          $dataXml->setData(&$propDataNode, $data);
        }
      }
    }

    /*
     * save xml
     */
    $dataXml->saveToFile();
    return $dataXml;
  }



  /**
   * imports initial data for the model from an xml
   * document into the database. The schema of the xml file is the following:
   * <pre>
   * <?xml version="1.0" encoding="utf-8"?>
   * <root>
   *  <data>
   *    <records>
   *      <record col1="a" col2="b">
   *        <property name="col3">c</property>
   *        <property name="col4">d</property>
   *        ...
   *      </record>
   *      <record col1="x" col2="y">
   *        property name="col3">z</property>
   *        ...
   *      </record>
   *      ...
   *    </records>
   *  <data>
   * </root>
   * </pre>
   * In this example, col1 and col2 are metadata columns/properties which allow
   * searching the xml document easily via xpath. both attributes and child nodes of
   * a <record> node will be imported into the database
   */
  function import($path)
  {
    /*
     * check file
     */
    if ( ! is_valid_file( $path ) )
    {
      $this->raiseError("qcl_db_model_xmlSchema_Model::import: '$path' is not a valid file.");
    }

    /*
     * schema document
     */
    $schemaXml    =& $this->getSchemaXml();
    $schemaXmlDoc =& $this->schemaXml->getDocument();

    $this->info("Importing data from '$path' into {$this->name}...", "propertyModel" );

    /*
     * open xml data file and get record node
     */
    $dataXml     =& $this->parseXmlDataFile($path);
    $dataDoc     =  $dataXml->getDocument(); // don't use pass by reference here
    $recordsNode =  $dataXml->getNode("/data/records");

    if ( ! is_object($recordsNode) )
    {
      $this->raiseError("Data document has no records node!");
    }

    /*
     * iterate through all records and import them
     */
    $count = 0;
    $records = $recordsNode->children();
    foreach ( $records as $record )
    {

      /*
       * populate properties with attributes
       */
      $properties = array();
      $attributes = $record->attributes();
      foreach( $attributes as $attrName => $attrVal )
      {
        $properties[$attrName] = (string) $attrVal;
      }

      /*
       * add child node data to properties
       */
      $propChildren = $record->children();
      foreach ( $propChildren as $propNode )
      {
        $propAttrs = $propNode->attributes();
        $propName  = (string) $propAttrs['name'];
        $propData  = $schemaXml->getData( $propNode );
        $properties[$propName] =$propData;
      }

      /*
       * populate columns with de-xml-ized property data, using aliases for property
       * names for column names
       */
      $data = array();
      foreach( $properties as $propName => $propData )
      {
        $data[$propName] = xml_entity_decode($propData);
      }

      /*
       * insert data into database
       * this will not overwrite existing entries which are primary keys or are part
       * of a "unique" index.
       */
       //$this->debug($this->properties);
      $id = $this->insert($data);
      if ($id) $count++;
    }
    $this->log("$count records imported.","propertyModel");
  }

   //-------------------------------------------------------------
  // Fields
  //-------------------------------------------------------------

  /**
   * Return all fields defined in the schema. This needs to be called
   * at least once before field metadata is accessed.
   * Fields are different from properties in the sense that there can
   * be fields that combine several properties for searching, such as
   * a "fulltext" field
   * @return array Array of fields
   */
  function getFields()
  {
    if ( ! count( $this->fields ) )
    {
      /*
       * setup properties
       */
      $this->setupProperties();

      /*
       * setup fields
       */
      $schemaXml  =& $this->getSchemaXml();
      $xmlDoc     =& $schemaXml->getDocument();
      $fieldsNode =& $schemaXml->getNode("/model/dataStructure/fields");

      if ( ! is_object( $fieldsNode ) )
      {
        $this->raiseError("Model schema xml for {$this->name} has no <fields> node");
      }

      $this->fields = array();

      foreach ( $fieldsNode->children() as $node )
      {

        $attrs = $node->attributes();
        $name  = (string) $attrs['name'];
        $type  = (string) $attrs['type'];
        $alias = (string) $attrs['alias'];
        $ftext = (string) $attrs['fulltext'];
        $index = (string) either( $attrs['useIndex'],$attrs['useindex']);
        $sfld  = (string) either( $attrs['searchField'],$attrs['searchfield']);
        $mapTo = (string) either( $attrs['mapTo'],$attrs['mapto']);

        /*
         * using an index as a field
         */
        if ( $index )
        {
           if ( ! $this->hasIndex($index) )
           {
             $this->raiseError("Index $index does not exist.");
           }
        }

        /*
         * fulltext fields
         * @document
         */
        if ( $ftext )
        {
          $this->fullTextFieldNodes[$name] = $node;
        }

        /*
         * if field shouldn't be mapped to a property
         * @todo document
         */
        elseif ( $mapTo !="none" and $sfld != "true" )
        {
          /*
           * check if corresponding property exists
           */
          $prop = either( $mapTo, $name );
          if ( ! $this->hasProperty ( $prop ) )
          {
            $this->raiseError("Model has no property '$prop'.");
          }

          /*
           * check type
           */
          if ( $type and $type != $this->getPropertyType( $prop ) )
          {
            $this->warn ( "Field '$name' doesn't have the same type as the corresponding property '$prop'.");
          }
        }

        /*
         * store the bibliograph field name as the key
         * and a possible alias (field name as called in the schema) or,
         * if there is no alias, the reference type name as the value
         */
        $this->fields[$name] = either( $alias, $name );

        /*
         * store a reference to the field node so that it can be quickly accessed later
         */
        $this->fieldNode[$name] = $node; // do not use copy by reference here (PHP4)

      }
    }
    $fields = array_keys($this->fields);
    //$this->debug( $fields );
    return $fields;
  }

  /**
   * Checks if a field exists
   *
   * @param string $name The bibliograph name of the field
   * @return SimpleXmlElement  or SimpleXmlElement(PHP5)
   */
  function hasField( $name )
  {
    if ( ! is_array( $this->fieldNode) )
    {
      $this->getFields();
    }
    return isset( $this->fieldNode[$name] );
  }

  /**
   * Returns the node of a field in the schema xml
   *
   * @param string $name The bibliograph name of the field
   * @return SimpleXmlElement
   */
  function &getFieldNode( $name )
  {
    if ( ! is_array( $this->fieldNode) )
    {
      $this->getFields();
    }
    $node =& $this->fieldNode[$name];
    if ( ! is_object($node) )
    {
      $this->raiseError("No <field> node exists for '$name'.");
    }
    return $node;
  }

  /**
   * Returns the label (description) of a field
   *
   * @param string $name bibliograph reference type
   * @param strin|null[optional] $reftype The field might have different labels according to the reference type
   * @return string
   */
  function getFieldLabel( $name, $reftype = null )
  {
    $node =& $this->getFieldNode( $name );
    if ( is_object ($node->label ) )
    {
      return qcl_xml_SimpleXmlStorage::getData( $node->label );
    }
    elseif ( is_array ( $node->label) )
    {
      $labels = array();
      foreach ( $node->label as $labelNode )
      {
        $attrs = $labelNode->attributes();
        $type  = (string) $attrs['type'];
        if ( $type )
        {
          $labels[$type] = qcl_xml_SimpleXmlStorage::getData( $labelNode );
        }
        else
        {
          $defaultLabel = qcl_xml_SimpleXmlStorage::getData( $labelNode );
        }
      }
      return either ( $labels[$reftype], $defaultLabel, "*** Error ***" );
    }
    $this->raiseError("Reference type '$name' has no label node.");
  }

  /**
   * get the type of a field
   * @param string $name field name
   * @return string field type
   */
  function getFieldType( $name )
  {
    $node  =& $this->getFieldNode( $name );
    $attrs = $node->attributes();
    return (string) $attrs['type'];
  }

  //-------------------------------------------------------------
  // Queries
  //-------------------------------------------------------------

  /**
   * Return operators of a field for search function
   * @param string $field field name
   * @return array Array of SimpleXmlElement Objects
   */
   function getFieldOperators( $name )
   {
     if ( ! $this->hasQueryOperators() )
     {
      $this->raiseError("Model does not support query operators");
     }
     $type    = $this->getFieldType( $name );
     return $this->getQueryOperatorNodes( $type );
   }

  /**
   * Checks whether model supports query operators
   * @return bool
   */
  function hasQueryOperators()
  {
    $schemaXml =& $this->getSchemaXml();
    $opNodes   =& $this->getNode("/model/queries/operators");
    return is_object($opNodes) && count( $opNodes->operator );
  }

  /**
   * gets all nodes from the schema xml that contain
   * information on query operators for a certain
   * property type (string, int, etc.)
   *
   * @param string $type  Type of property
   * @return array Array of SimpleXmlElement (PH4)  objects
   */
  function getQueryOperatorNodes( $type )
  {
    if ( ! $this->hasQueryOperators() )
    {
      $this->raiseError("Model '{$this->name}'' does not support query operators.");
    }

    /*
     * return cached data if available, otherwise retrieve it from schema xml
     */
    static $queryOperators = array();

    if ( ! is_array( $queryOperators[$type] ) )
    {
      $schemaXml =& $this->getSchemaXml();
      $operators =& $this->getNode("/model/queries/operators/operator");

      foreach ( $operators as $operatorNode )
      {
        $attrs = $operatorNode->attributes();
        if ( (string) $attrs['type'] == $type )
        {
          $queryOperators[$type][] =& $operatorNode;
        }
      }
    }

    /*
     * return result
     */
    return $queryOperators[$type];
  }

}
?>