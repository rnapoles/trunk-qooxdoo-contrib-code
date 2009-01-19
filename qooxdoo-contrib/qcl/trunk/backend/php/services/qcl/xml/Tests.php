<?php
require_once "qcl/application/controller.php";
require_once "qcl/xml/SimpleXmlStorage.php";

/**
 * Service class containing test methods
 */
class class_qcl_xml_Tests extends qcl_application_controller
{
  function __construct()
  {
    parent::__construct();
    $this->controlAccess();
  }
  
 function method_testSimpleXml()
  {
    $logger =& $this->getLogger();
    
    $logger->setFilterEnabled("xml",true);
    $logger->setFilterEnabled("persistence",false);
    
    $testfile = realpath("../var/tmp/test.xml"); 
    
    $parser =& new qcl_xml_SimpleXmlStorage( &$this, $testfile );
    $parser->setOwnedBySessionId( $this->getSessionId() );
    
    $this->debug("Deleting original xml file...");
    $parser->deleteFile();
    
    $this->debug("Creating new empty xml file...");
    $parser->createFile();
    
    $this->debug("Creating document tree...");
    $doc =& $parser->getDocument();
   
    $record  =& $doc->addChild("record"); 
    $record->setAttribute("id","first record");
    $child   =& $record->addChild("child","boo!");
    $child->setAttribute("id","child or first record"); 
    
    $record2 =& $doc->addChild("record");
    $record2->setAttribute("id","second record");
    $child2  =& $record2->addChild("child");
    $child2->setAttribute("id","child of second record"); 
    
    
    $doc->record[0]->setCDATA("CDATA of first record");
    $doc->record[0]->child->setAttribute("foo","yeah!");
      
    $parser->setData("/record[2]","Oder nicht?");
    $parser->setAttribute("/record[1]/child","visible","false");

    $this->info("Document tree is:");
    $this->info( $doc->asXML() );
    
    $this->debug("Saving to file...");
    $parser->saveToFile();
    
    $this->debug("Retrieving stored document from cache ...");
    $parser2 =& new qcl_xml_SimpleXmlStorage( &$this, $testfile );
    $parser2->setOwnedBySessionId( $this->getSessionId() );
    $parser2->load();
    
    $doc = $parser2->getDocument();
    
    $this->debug("Cached document tree:");
    $this->info($doc->asXML());

    return $this->response();
  }

  function method_testCache()
  {
    
  }
  
}

?>