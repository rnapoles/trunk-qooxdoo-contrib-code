<?php
require_once "qcl/jsonrpc/controller.php";
require_once "qcl/io/filesystem/remote/File.php";
require_once "qcl/io/filesystem/remote/Folder.php";
require_once "qcl/io/filesystem/remote/s3_keys.php";


/**
 * Service class containing test methods
 */
class class_qcl_io_filesystem_remote_Tests extends qcl_mvc_Controller
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
      $topDir =& new qcl_io_filesystem_remote_Folder( &$this, "s3://fulltext.panya.de/" );
      $topDir->open();
      while ( $resource =& $topDir->next() )
      {
        $this->info( $resource->basename() . ": " . $resource->className() );
      }
      $topDir->close();
    }
    
  function method_testFileDownload ( $params )
  {
    $fileObj =& new qcl_io_filesystem_remote_File(&$this,"s3://fulltext.panya.de/Acker1999.pdf");
    
    $filename=$fileObj->basename();
    header("Content-Type: application/octet-stream");
    header("Content-Disposition: attachment; filename=\"$filename\"");
    $fileObj->open();
    while( $chunk = $fileObj->read(8125) )
    {
      echo $chunk;  
    }
    $fileObj->close();
    exit;
    
  }    
  
}

?>