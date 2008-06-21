<?php

require_once("qcl/mixin.php");

/**
 * mixin class
 */
class qcl_datasource_controller extends qcl_mixin
{

  /**
   * @todo: remove 
   */
  function method_exportSchemas()
  {
    require_once("qcl/xml/model.php");
    require_once("qcl/db/pear.php");
    
    $db =& new qcl_db_pear(&$this->controller,$this->getIniValue("database.dsn"));
    
    $records = $db->getAllRecords("
      SELECT *
      FROM link_types_classes
      ORDER BY `schema`
    ");
    
    $schema = "";
    $path   = "";
    foreach ($records as $record) 
    {
      /*
       * add datasource schema node
       */
      if ($schema != $record['schema'])
      {
        $schema = $record['schema'];
        $path = str_replace("_","/",$record['class']) . ".datasource.xml"; 
        unlink($path);    
        $datasrcSchemaXml = new qcl_xml_model($this);
        $datasrcSchemaXml->load($path);
        $datasrcSchemaDoc =& $datasrcSchemaXml->getDocument();
    
        $datasrcSchemaNode =& $datasrcSchemaDoc->addChild("datasource");
        $datasrcSchemaNode->addAttribute("name",$schema);
      }
      
      /*
       * add models to schema
       */
      $modelNode   =& $datasrcSchemaNode->addChild("model"); 
      $modelSchema = $record['type'];
      $modelNode->addAttribute("schema",$modelSchema);
      $class = str_replace("_",".",$record['class']);
      $pp = strrpos($class,".");
      $class = substr($class,0,$pp+1) . strtoupper(substr($class,$pp+1,1)) . substr($class,$pp+2);
      $modelNode->addAttribute("class",$class);
      
      /*
       * save datasource schema
       */
      $datasrcSchemaXml->save();
      
      /*
       * create schema model 
       */
      $path = str_replace("_","/",$record['class']) . ".model.xml"; 
      unlink($path);   
      $modelSchemaXml = new qcl_xml_model($this);
      $modelSchemaXml->load($path);
      $modelSchemaDoc =& $modelSchemaXml->getDocument();
  
      $modelSchemaNode =& $modelSchemaDoc->addChild("model");
      $modelSchemaNode->addAttribute("type",$modelSchema);
      $modelSchemaNode->addAttribute("class",$class);
      
      /*
       * model object
       */
      $modelObj =& $this->getNew($record['class']);
      
      /*
       * add model definition
       */
      $definitionNode =& $modelSchemaNode->addChild("definition");
      
   
      // properties, aliases 
      $propertiesNode =& $definitionNode->addChild("properties");
      $aliasesNode    =& $definitionNode->addChild("aliases");
      
      /*
       * indexes
       */
      $indexesNode    =& $definitionNode->addChild("indexes");
      $primaryKeyNode =& $indexesNode->addChild("index");
      $primaryKeyNode->addAttribute("type","primary");
      $primKeyPropNode =& $primaryKeyNode->addChild("property");
      $primKeyPropNode->addAttribute("name","id");
      
      // property groups
      $groupsNode     =& $definitionNode->addChild("propertyGroups");
      $metaDataGroup  =& $groupsNode->addChild("propertyGroup");
      $metaDataGroup->addAttribute("name","metadata");
      
      
      
      $columns = null; $column=null;
      
      if ( $modelObj->table and $modelObj->db )
      {
        $column =  $modelObj->db->extractColumnData($modelObj->db->getCreateTableSql($modelObj->table));
        $this->info($schema);
      }
      
      $properties = array_unique(
        array_merge(
          array_keys($modelObj->metaColumns), 
          array_keys($modelObj->fieldMap ),
          array_keys($column)
          )
        ); 
      $indexes = array();
      
      /*
       * add properties
       */
      foreach( $properties as $property )
      {
        $col = either(
          $modelObj->metaColumns[$property],
          $modelObj->fieldMap[$property],
          $property
        );
        
        $propNode =& $propertiesNode->addChild("property");
        $propNode->addAttribute("name",$property);
        
        if ( $modelObj->metaColumns[$property] )
        {
          $metaPropNode =& $metaDataGroup->addChild("property");
          $metaPropNode->setAttribute("name",$property);
        } 
        
        if( $column[$col] )
        {
          $columnData = $column[$col];
        }
        else
        {  
          $c = $db->getAllRecords("
            SELECT
              COLUMN_DEFAULT as `default`,
              IS_NULLABLE    as `nullable`,
              COLUMN_TYPE    as `type`,
              EXTRA          as `extra`
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE COLUMN_NAME = '$col'
          ");
          $c=$c[0];
          $columnData = trim(str_replace("  "," ",implode(" ", array(
            $c['type'],
            ( $c['nullable'=="YES"] ? "NULL":"NOT NULL"), 
            ( $c['default'] ? "DEFAULT " . $c['default'] : "" ),
            $c['extra']
          ))));        
        }
        
        if ( $columnData ) 
        {
          if ( stristr($columnData,"tinyint(1)") )
          {
            $propNode->addAttribute("dataType","boolean");
          }
          elseif ( stristr($columnData,"int") )
          {
            $propNode->addAttribute("dataType","int");
          }
          else
          {
            $propNode->addAttribute("dataType","string");              
          }
          $sqlNode =& $propNode->addChild("mysql",$columnData);

        }
        
        if ( $property != $col)
        {
          $alias =& $aliasesNode->addChild("alias",$col);
          $alias->addAttribute("for",$property);
        }
      }
      
      /*
       * add links
       */
      $linksNode =& $modelSchemaNode->addChild("links");
      $linkNode  =& $linksNode->addChild("link");
      $linkNode->addAttribute("model","foo");
      $linkNode->addAttribute("foreignKey",$modelObj->foreignKey);
      
      /*
       * add data schema
       */
      $dataStructureNode =& $modelSchemaNode->addChild("dataStructure");
      $typesNodes =& $dataStructureNode->addChild("referenceTypes");
      
      /*
       * reference types
       */
      if ($modelObj->referenceTypeFields)
      {
        foreach($modelObj->referenceTypeFields as $type => $fields )
        {
          $typeNode =& $typesNodes->addChild("referenceType");
          $typeNode->addAttribute("name",$type);
          
          /*
           * fields
           */
          $fieldsNode =& $typeNode->addChild("fields");
          foreach($fields as $field)
          {
            $fieldNode =& $fieldsNode->addChild("field");
            $fieldNode->addAttribute("name",$field);
          }
          
          /*
           * metadata
           */    
          $metaData = $modelObj->referenceTypeMetaData[$type];
          $labelNode =& $typeNode->addChild("label",$metaData['label']);
          if ( $metaData['bibtex'] )
            $typeNode->addAttribute("bibtex","true"); 

        }
        
      }
      
      $fieldsNode =& $dataStructureNode->addChild("fields");
      if ( $modelObj->fieldMetaData )
      {
        foreach ( $modelObj->fieldMetaData as $field => $data )
        {
          $fieldNode =& $fieldsNode->addChild("field");
          $fieldNode->addAttribute("name", $field);
          if ($data['bibtex'])
            $fieldNode->addAttribute("bibtex","true");
          foreach( (array) $data['label'] as $refType => $label )
          {
            if ( ! is_numeric($refType) ) 
              $labelNode->addAttribute("referenceType",$refType);
            $labelNode =& $fieldNode->addChild("label",$label);
            
          }
        }  
      }

      /*
       * save model schema
       */
      $modelSchemaXml->save();
    }    
  }

 /**
   * @todo: remove 
   */
  function method_exportTableSchema($params)
  {
    require_once("qcl/xml/model.php");
    require_once("qcl/db/pear.php");
    
    /*
     * parameters
     */
    $table = $params[0];
    $class = $params[1];
    
    /*
     * database object
     */
    $db =& new qcl_db_pear(&$this->controller,$this->getIniValue("database.dsn"));
      
    /*
     * create schema model 
     */
    $path = str_replace("_","/",$class) . ".model.xml"; 
    @unlink($path);   
    $modelSchemaXml = new qcl_xml_model($this);
    $modelSchemaXml->load($path);
    $modelSchemaDoc =& $modelSchemaXml->getDocument();

    $modelSchemaNode =& $modelSchemaDoc->addChild("model");
   
    $modelSchemaNode->addAttribute("class",$class);
      
    /*
     * model object
     */
    $modelObj =& $this->getNew($class);
    
    /*
     * add model definition
     */
    $definitionNode =& $modelSchemaNode->addChild("definition");
    
 
    // properties, aliases 
    $propertiesNode =& $definitionNode->addChild("properties");
    $aliasesNode    =& $definitionNode->addChild("aliases");
    
    /*
     * indexes
     */
    $indexesNode    =& $definitionNode->addChild("indexes");
    $primaryKeyNode =& $indexesNode->addChild("index");
    $primaryKeyNode->addAttribute("type","primary");
    $primKeyPropNode =& $primaryKeyNode->addChild("property");
    $primKeyPropNode->addAttribute("name","id");

    
    
    
    $columns = null; $column=null;
    
    if ( $modelObj->table and $modelObj->db )
    {
      $column =  $modelObj->db->extractColumnData($modelObj->db->getCreateTableSql($modelObj->table));
      $this->info($schema);
    }
    
    $properties = array_unique(
      array_merge(
        array_keys($modelObj->metaColumns), 
        array_keys($modelObj->fieldMap ),
        array_keys($column)
        )
      ); 
    $indexes = array();
    
    /*
     * add properties
     */
    foreach( $properties as $property )
    {
      $col = either(
        $modelObj->metaColumns[$property],
        $modelObj->fieldMap[$property],
        $property
      );
      
      $propNode =& $propertiesNode->addChild("property");
      $propNode->addAttribute("name",$property);
      
      if( $column[$col] )
      {
        $columnData = $column[$col];
      }
      else
      {  
        $c = $db->getAllRecords("
          SELECT
            COLUMN_DEFAULT as `default`,
            IS_NULLABLE    as `nullable`,
            COLUMN_TYPE    as `type`,
            EXTRA          as `extra`
          FROM INFORMATION_SCHEMA.COLUMNS
          WHERE COLUMN_NAME = '$col'
        ");
        $c=$c[0];
        $columnData = trim(str_replace("  "," ",implode(" ", array(
          $c['type'],
          ( $c['nullable'=="YES"] ? "NULL":"NOT NULL"), 
          ( $c['default'] ? "DEFAULT " . $c['default'] : "" ),
          $c['extra']
        ))));        
      }
      
      if ( $columnData ) 
      {
        if ( stristr($columnData,"tinyint(1)") )
        {
          $propNode->addAttribute("dataType","boolean");
        }
        elseif ( stristr($columnData,"int") )
        {
          $propNode->addAttribute("dataType","int");
        }
        else
        {
          $propNode->addAttribute("dataType","string");              
        }
        $sqlNode =& $propNode->addChild("mysql",$columnData);

      }
      
      if ( $property != $col)
      {
        $alias =& $aliasesNode->addChild("alias",$col);
        $alias->addAttribute("for",$property);
      }
    }
    
    /*
     * add links
     */
    $linksNode =& $modelSchemaNode->addChild("links");
    $linkNode  =& $linksNode->addChild("link");
    $linkNode->addAttribute("table","foo");
    $linkNode->addAttribute("localKey",$modelObj->col_id);
    $linkNode->addAttribute("foreignKey",$modelObj->foreignKey);
      
    /*
     * save model schema
     */
    $modelSchemaXml->save();
  }  
  
  
  
  ///
  /// Test functions to be removed
  ///

  function method_testZ3950 ()
  {
    $time_start = microtime_float();
    require_once ("bibliograph/plugins/z3950/datasource.php");
    $dsm =& new bibliograph_plugins_z3950_datasource(&$this);   
    $list = $dsm->getListFromXml();
    $time_end = microtime_float(true);
    $this->info($list[0]); 
    $time = $time_end - $time_start;
    $this->info("Needed $time seconds.");
  }
  
  function method_testSimpleXml()
  {
    require_once("qcl/xml/simpleXML.php");
    
    $testfile = "../var/tmp/test.xml"; 
    unlink($testfile);
    
    $parser = new qcl_xml_simpleXML;
    $parser->createIfNotExists($testfile);
    $parser->load($testfile,true);
    
    $doc =& $parser->getDocument();
   
    $record  =& $doc->addChild("record"); 
    $record->setAttribute("id","first record");
    $child   =& $record->addChild("child","boo!");
    $child->setAttribute("id","child or first record"); 
    
    //$this->info($doc->asXml()); 
    
    $record2 =& $doc->addChild("record");
    $record2->setAttribute("id","second record");
    $child2  =& $record2->addChild("child");
    $child2->setAttribute("id","child of second record"); 
    
    
    //$this->Info($doc->tagChildren);
    
    $doc->record[0]->setCDATA("CDATA of first record");
    $doc->record[0]->child->setAttribute("foo","yeah!");
    
    //$this->info($root->asXML());  
    $parser->setData("/record[2]","Oder nicht?");
    $parser->setAttribute("/record[1]/child","visible","false");
    
    //$this->info($doc->toArray());
    $this->info($doc->asXML());
    
    $parser->save();
    
    $parser2 = new qcl_xml_simpleXML; 
    $parser2->load($testfile,true,array("id"));
    
    $doc = $parser2->getDocument();
    $this->info($doc->toArray());
    $find = $parser2->getNodesByAttributeValue("id","second record");
    
  }
  
  function method_createModel()
  {
    require_once("qcl/xml/model.php");
    $path = "../var/tmp/xml_model.xml"; 
    unlink($path);
    
    $xmlModel = new qcl_xml_model($this);
    
    $xmlModel->load($path);
    $doc =& $xmlModel->getDocument();
    
    $admin =& $doc->addChild("role");
    $admin->addAttribute("name","qcl.roles.admin");
    
    $perm1 =& $admin->addChild("permission");
    $perm1->addAttribute("name","qcl.permissions.doAdminStuff");
    
    $manager =& $doc->addChild("role");
    $manager->addAttribute("name","qcl.role.manager");
    
    $perm2 =& $manager->addChild("permission");
    $perm2->addAttribute("name","qcl.permissions.doManagerStuff");
    
    $user =& $doc->addChild("role");
    $user->addAttribute("name","qcl.role.user");

    $perm3 =& $user->addChild("permission");
    $perm3->addAttribute("name","qcl.permissions.doUserStuff");
    
    $xmlModel->save(); 
    
    
  }

  function method_testXmlModel()
  {
    require_once("qcl/xml/model.php");
    $path = "../var/tmp/xml_model.xml"; 
    
    $xmlModel = new qcl_xml_model($this);
    $xmlModel->load($path);
    
    // query
    $nodes = $xmlModel->getNodesWhere(array(
      'name' => 'qcl.roles.admin'
    ));

      
    $this->info("admin has the following permissions:");
    /*
    foreach($nodes[0]->children() as $child)
    {
      $attr = $child->attributes();
      $this->info("- ". $attr['name']);
    }*/
    
  }
  
  function method_testModel($params)
  {
    $class      = $params[0];
    $datasource = either(trim($params[1]),null);
    
    $model =& $this->getNew($class); 
    $model->_init("mysql://root:root@localhost/test");
    $model->db->connect("mysql://root:root@localhost/test");
    $model->initialize($datasource); 
    $this->info($model->schemaXml->asXml());
  }
  

  function method_testExport($params)
  {
    $class =  $params[0];
    $model =& $this->getNew($class);
    $model->initialize();
    $model->export();
  }  
  
  
  function method_testOverloading($params)
  {
    $obj =& $this->getNew("bibliograph.models.record.Default");
    $obj->setFoo("hello!");
    $this->info("Result is:" .  $obj->getFoo() );
    $obj->foo();
  }
  
  function method_fixBibtex()
  {
    $obj =& $this->getNew("bibliograph.models.schema.Bibtex");
    //$obj->export();
    
  }
  
}
?>