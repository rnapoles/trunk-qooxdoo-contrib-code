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
    $linkNode->addAttribute("localKey",$modelObj->key_id);
    $linkNode->addAttribute("foreignKey",$modelObj->foreignKey);
      
    /*
     * save model schema
     */
    $modelSchemaXml->save();
  }  
  
  
  function method_testSchema()
  {
    require_once ("qcl/xml/model.php");
    require_once ("bibliograph/models/record/default.php"); 
    $recordModel =& new bibliograph_models_record_default(&$this);
    $recordModel->_init("mysql://root:root@localhost/bibliograph_users");
    $recordModel->initialize("test");
  }
  
}
?>