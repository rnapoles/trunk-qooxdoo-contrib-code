<?php
require_once "qcl/application/controller.php";
require_once "qcl/xml/Storage.php";

/**
 * Service class containing test methods
 */
class class_qcl_xml_Tests extends qcl_db_controller
{
  /*
  function __construct()
  {
    parent::__construct();
    //$this->debug("Constructor ...");
    //$this->controlAccess();
  }*/

 function method_testSimpleXml()
 {
    //$this->debug("Testing SimpleXml storage ...");

    $logger =& $this->getLogger();

    $logger->setFilterEnabled("xml",true);
    $logger->setFilterEnabled("persistence",true);

    $testfile = realpath("../var/tmp/test.xml");

    $parser =& new qcl_xml_Storage( $testfile );
    //$parser->setOwnedBySessionId( $this->getSessionId() );

    //$this->debug("Deleting original xml file...");
    $parser->deleteFile();

    //$this->debug("Creating new empty xml file...");
    $parser->createFile();

    //$this->debug("Creating document tree...");
    $doc =& $parser->getDocument();

    $record  =& $doc->addChild("record");
    $record->addAttribute("id","first record");
    $child   =& $record->addChild("child","boo!");
    $child->addAttribute("id","child or first record");

    $record2 =& $doc->addChild("record");
    $record2->addAttribute("id","second record");
    $child2  =& $record2->addChild("child");
    $child2->addAttribute("id","child of second record");


    if ( phpversion() >5 )
      $doc->record[0] = "CDATA of first record (PHP5)";
    else
      $doc->record[0]->setCDATA("CDATA of first record (PHP4)");

    $doc->record[1]->child->addAttribute("foo","yeah!");

    //$parser->setData("/record[2]","Oder nicht?");
    //$parser->setAttribute("/record[1]/child","visible","false");

    $this->info("Document tree is:");
    $this->info( $doc->asXML() );

    //$this->debug("Saving to file...");
    $parser->saveToFile();

    //$this->debug("Retrieving stored document from cache ...");
    $parser2 =& new qcl_xml_Storage( $testfile );
    //$parser2->setOwnedBySessionId( $this->getSessionId() );
    $parser2->load();

    //$this->debug("Cached document tree:");
    $this->info($parser2->asXML());

    $logger->setFilterEnabled("xml",false);
    $logger->setFilterEnabled("persistence",false);

    return $this->result();
  }

  function method_testCache()
  {
    //$this->debug("Not implemented");
    return $this->result();
  }

}

?>