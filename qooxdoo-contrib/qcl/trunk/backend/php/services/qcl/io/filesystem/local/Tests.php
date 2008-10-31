<?php
require_once "qcl/jsonrpc/controller.php";
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
      $file1  =& $topDir->createOrGetFile("file1");  
      $file2  =& $topDir->createOrGetFile("file2");
      $dir1   =& $topDir->createOrGetFolder("dir1");
      
      $file3 =& $dir1->createOrGetFile("file3");
      $file3->rename("file3b");
      $file3->delete();
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
    
    
  
}

?>