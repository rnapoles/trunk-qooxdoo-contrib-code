<?php
//error_reporting(E_ALL);
if ( count ($_FILES) )
{
  $maxfilesize = 30000; //kByte
  if ( isset ($_FILES['uploadfile'] ) )
  {
    if ($_FILES['uploadfile']['size'] > $maxfilesize*1024)
    {
       die ("<P><FONT COLOR=RED>File exceeds maximum filesize: $maxfilesize kByte.</FONT></P>");
    }
    
    $tmp_name  = $_FILES['uploadfile']['tmp_name'];
    $file_name = $_FILES['uploadfile']['name'];
    $tgt_path  = "./uploads/$file_name";
    if ( file_exists ( $tgt_path) )
    {
      die ("<P><FONT COLOR=RED>File '$file_name' exists - not uploaded.</FONT></P>");
    }
    
    if ( ! move_uploaded_file( $tmp_name, $tgt_path ) )
    {
      die ("<P><FONT COLOR=RED>Problem during upload.</FONT></P>");
    }

    echo "<P><FONT COLOR=GREEN>Upload of '$file_name' successful.</FONT></P>";
  }
}
else
{
      die ("<P><FONT COLOR=RED>No file data received.</FONT></P>");
}
?>