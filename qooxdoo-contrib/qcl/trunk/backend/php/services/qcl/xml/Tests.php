<?php
require_once "qcl/datasource/controller.php";

/**
 * Service class containing test methods
 */
class class_qcl_xml_Tests extends qcl_datasource_controller
{
  
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
    
    $doc->recordModel[0]->setCDATA("CDATA of first record");
    $doc->recordModel[0]->child->setAttribute("foo","yeah!");
    
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

  function method_createXmlModel()
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
  
}

?>