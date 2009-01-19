<?php
require_once "qcl/jsonrpc/controller.php";
require_once "qcl/registry/session.php"; // @todo
require_once "qcl/io/filesystem/local/File.php";
require_once "qcl/io/filesystem/local/Folder.php";

/**
 * Service class containing test methods
 */
class class_qcl_io_filesystem_local_Tests extends qcl_jsonrpc_controller
{
  
  function method_testCreate()
  {
    $topDir =& new qcl_io_filesystem_local_Folder( &$this, "file://" . $this->tmpDir() . "test" );
    $topDir->create();
    $file1  =& $topDir->createOrGetFile("file1");  
    $file2  =& $topDir->createOrGetFile("file2");
    $dir1   =& $topDir->createOrGetFolder("dir1");
    $dir1->create();
    
    $file3 =& $dir1->createOrGetFile("file3");
    $file3->rename("file3b");
    
    $file4 =& $dir1->createOrGetFile("file4");
    $file4->delete();
  }
    
  function method_testDirContents()
  {
    $topDir =& new qcl_io_filesystem_local_Folder( &$this, "file://" . $this->tmpDir() . "test" );
    $topDir->open();
    while ( $resource =& $topDir->next() )
    {
      $this->info( $resource->basename() . ": " . $resource->className() );
    }
    $topDir->close();
  }
    
  function method_testAnalysePath()
  {
    $dirObj =& new qcl_io_filesystem_local_Folder( &$this, "file://" . $this->tmpDir() . "test" );
    $this->info ( "Dirname:   " . $dirObj->dirname() );
    $this->info ( "Basename:  " . $dirObj->basename() );  
    $this->info ( "Extension: " . $dirObj->extension() );      
    $this->info ( "Is File? " . ( $dirObj->isFile() ? "Yes." : "No.") );
    $this->info ( "Is Dir? " .  ( $dirObj->isDir() ? "Yes." : "No.") );
    
    $fileObj =& new qcl_io_filesystem_local_File( &$this, "file://" . $this->tmpDir() . "test123.txt" );
    
    $this->info ( "Dirname:   " . $fileObj->dirname() );
    $this->info ( "Basename:  " . $fileObj->basename() );  
    $this->info ( "Extension: " . $fileObj->extension() );  
    $this->info ( "Is File? " . ( $fileObj->isFile() ? "Yes." : "No.") );
    $this->info ( "Is Dir? " . (  $fileObj->isDir() ? "Yes." : "No.") );
  }
  
}

?>