<?php  
/*
 * dependencies
 */
require_once "qcl/db/AbstractModel.php";

/**
 * Model base class for models based on a (mysql) database
 * @todo make this dbms-independent
 * @todo rename methods "getX()" into "x()" if they refer to 
 * the whole model or all records. "getFoo" should only be used for
 * model data.
 */
class qcl_db_model extends qcl_db_AbstractModel
{

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
   * Alias for qcl_db_model::getPropertySchemaName
   * @return string
   * @param string $property Property name
   */
  function getColumnName ( $name )
  {
    return $this->getPropertySchemaName( $name );
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
   * @see qcl_db_model::findWhere()
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
   * @see qcl_db_model::findWhere()
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
   * @param qcl_db_model $model
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
      $table = $this->getLinkTable( $link );
      $this->db->delete ( $table, $ids, $this->getForeignKey() );
    }    
    
    /*
     * delete records
     */
    $this->db->delete ( $this->table, $ids );
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
   * Switches the current database access to administrative rights
   * Works only for the user database and admin database specified
   * in the service.ini.php file
   * @todo catch errors
   * @return void
   */
  function dbAdminAccess()
  {
    
    // FIXME disabled 
    
    return; 
    
    if ( $this->_isAdminAccess )
    {
      return true;
    }
    
    $controller =& $this->getController();
    $db         =& $this->db();
    
    $database   = $db->getDatabase();
    $user       = $db->getUser();
    
    /*
     * admin access exists
     */
    if ( $user == $controller->getIniValue("database.adminname") )
    {
      $this->_isAdminAccess = true;
      return true;
    }

    /*
     * get admin access for user db
     */
    if ( $database == $controller->getIniValue("database.userdb") )
    {
      //$this->debug("Getting admin access to user database");
      $this->connect( $controller->getIniValue("database.admin_userdb") );
    }
    
    /*
     * get admin access for admin db
     */
    else if ( $database == $controller->getIniValue("database.admindb") )
    {
      //$this->debug("Getting admin access to admin database");
      $this->connect( $controller->getIniValue("database.admin_userdb") );
    }
    else
    {
      $this->raiseError("Cannot get admin access for table " . $this->table() . ", DSN:" . $db->getDsn() );
    }
    
    /*
     * success
     */
     
     $this->_isAdminAccess = true;
     return true;
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
    
    $controller =& $this->getController();
    
    /*
     * database connection
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
     * foo.bar.Baz => foo_bar_baz
     */
    $this->class = strtolower(str_replace(".","_", either( (string)$modelAttrs['class'], (string) $modelAttrs['name'] ) ) ); 
    
    /*
     * the type can be provided if class is the implementation
     * of a more generic data type
     */
    $this->type  = (string) $modelAttrs['type'];

    /*
     * whether the setup process should upgrade the schema or just use existing tables in
     * whatever schema they are in
     */
    if ( (string) $modelAttrs['upgradeSchema'] == "no" and ! $forceUpgrade )
    {
      $this->log("Schema document for model name '{$this->name}' is not to be upgraded.","propertyModel");
      return null;
    }    

    /*
     * This model doesn't have a table backend
     */
    if ( (string) $modelAttrs['table']  == "no" )
    {
      $this->log("Model name '{$this->name}' has no table backend.","propertyModel");
      return null;  
    }
    
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
     * Wheter the table for this model exists already
     */
    $tableExists  = $db->tableExists($this->table);
    //$this->debug("Table {$this->table} (" . $this->className(). ")" . ($tableExists ? " exists." : " does not exist." ) );
    
    /*
     * Get the modelTableInfo persistent object to look up if this
     * table has been initialized already. To avoid an indefinitive loop,
     * the qcl_persistence_db_Model used by qcl_db_ModelTableInfo must
     * be especially treated. You can upgrade its schema only be deleting
     * the table.
     */
    $modelTableInfo = null;
    if ( $this->isInstanceOf("qcl_persistence_db_Model") )
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
        require_once "qcl/db/ModelTableInfo.php";
        global $qclDbModelTableInfo;
        if ( ! $qclDbModelTableInfo )
        {
          // pass by reference doesn't work, so two objects will always exist
          $qclDbModelTableInfo = new qcl_db_ModelTableInfo( $this );  
        }
        $this->modelTableInfo =& $qclDbModelTableInfo; 
      }
      $datasourceModel =& $this->getDatasourceModel();
      $isInitialized   = $this->modelTableInfo->isInitialized( 
        &$datasourceModel, 
        $this->table, 
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
     */
    $this->dbAdminAccess();
    $db =& $this->db();    
    
    /*
     * create main data table if necessary
     */
    $table = $this->table;
    if ( ! $db->tableExists($table) )
    {
      $db->createTable($table);
      $this->schemaXml->hasChanged = true;
    }
   
    $this->log("Creating aliases...","propertyModel");
    
    /*
     * create alias table
     */
    $aliases  = $doc->model->definition->aliases;
    if ($aliases)
    {
      $aliasMap = array();
      foreach($aliases->children() as $alias)
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
       * @todo check for <sql type="$sqltype">
       */
      if ( ! is_object( $property->sql ) )
      {
        $this->warn("Model Property '$propName' has no definition matching the sql type.");
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
      if ( ! $descriptiveDef )
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
      $localKey = (string) either($a['localkey'],$a['localKey']); 
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
         * link table internal name
         */
        $name = (string) $a['name'];

        /*
         * create table
         */
        $tbl = (string) $a['table'];
        if ( $tbl )
        {
          $link_table = $this->getTablePrefix() . $tbl;
        }
        else
        {
          $this->raiseError("A table link must have a 'table' attribute.");
        }
        if ( ! $db->tableExists($link_table) )
        {
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
            $modelName = str_replace(".","_", (string) $a['name']);
            if ( ! $modelName )
            {
              $this->raiseError("linkedModel node has no 'name' attribute.");
            }
            
            $this->log("Linking $modelName ...","propertyModel");
            $this->includeClassfile($modelName);

            if ( $shareDatasource != "no" )
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
            $modelTable = $model->table;
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
    }
    
    /*
     * Import initial data if necessary
     */
    $path = $this->getDataPath();
    if ( ! $tableExists and file_exists($path) )
    {
      $this->log("Importing data ...","propertyModel");
      $this->import($path);
      
      $this->log("Importing link data ...","propertyModel");
      $this->importLinkData();
    }
    else
    {
      $this->log("No data to import.","propertyModel");
    }
    
    /*
     * register table initialized for the datasource
     */
    if ( $this->modelTableInfo )
    {
      $this->modelTableInfo->registerInitialized(
        &$datasourceModel, 
        $this->table, 
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
    $attrs= $linkNode->attributes();
    return $this->getTablePrefix() . (string) $attrs['table']; 
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
   * @return qcl_db_model Model instance or false if no model could be found.
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
   * @param qcl_db_model $model
   * @return mixed Array if link(s) ar found, false if not found
   */
  function getLinksByModel( $model )
  {
    $linkNodes = $this->getLinkNodes();
    
    if ( ! is_array( $linkNodes ) or ! count($linkNodes) )
    {
      $this->raiseError("Model has no links.");
    }
    
    if ( ! is_a($model,"qcl_db_model" ) )
    {
      $this->raiseError("Argument needs to be a qcl_db_model or subclass.");
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
   * @see qcl_db_model::unlinkFrom()
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
     */
    $this->dbAdminAccess();
    
    /*
     * database connection
     */
    $db =& $this->db();    
    
    /*
     * context data
     */
    if ( is_a( $first,"qcl_db_model" ) )
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
      if ( is_object( $first ) and $first->isInstanceOf("qcl_db_model") )
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
   * @see qcl_db_model::unlinkFrom()
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
   * @param qcl_db_model $model2 Model
   */
  function linkWith()
  {
    $params =& func_get_args();
    array_unshift( $params, "link" );
    return call_user_func_array( array( &$this, "_modifyLink" ), $params);
  }

  /**
   * Unlink a variable number of models
   * @param qcl_db_model $model2 Model
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
   * @param qcl_db_model $model2 Model
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
   * @param qcl_db_model $model2 Model
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
    $data = call_user_func_array( array( &$this, "_modifyLink" ), $params);
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
   * @param qcl_db_model $model2 Model to link with
   * @param qcl_db_model $model3 Optional model to link with
   * @param qcl_db_model $model4 Optional model to link with
   */
  function _modifyLink()
  {    
    /*
     * admin access
     */
    $this->dbAdminAccess();
    
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
   * @see qcl_db_PropertyModel
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
      $controller =& $this->getController();
      $dataXml =& new qcl_xml_SimpleXmlStorage( &$controller );
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
   * @see qcl_db_model::exportLinkData()
   * @param string $path
   */
  function importLinkData($path=null)
  {
    /*
     * controller
     */
    $controller =& $this->getController();
    
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
      $table     = (string) $attrs['table'];

      /*
       * get file path
       */
      $path = dirname(either($path,$this->getDataPath() ) ) . "/$table.data.xml";
      if ( ! file_exists($path) )
      {
        $this->log("No link data available for link '$linkName' of model '{$this->name}' ","propertyModel");
        continue;
      }
      
      $this->log("Importing link data for link '$linkName' of model '{$this->name}'...","propertyModel");
      
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
      if ( $mdl != $this->name() )
      {
        $this->log( "Origin model in xml ('$mdl') does not fit this model ('" . $this->name() . "'). Skipping...", "propertyModel");
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
          $targetModel =& $controller->getNew( $tModel );
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
            $this->raiseError("Origin record '$oNamedId/$oId' does not exist for model '{$this->name}'");
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
}	
?>