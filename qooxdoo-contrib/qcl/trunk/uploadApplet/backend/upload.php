<?php
//error_reporting(E_ALL);
if ( count ($_FILES) )
{
  $maxfilesize = 30000; //kByte
  if ( isset ($_FILES['uploadfile'] ) )
  {
    if ($_FILES['uploadfile']['size'] > $maxfilesize*1024)
    {
       die ("<P>File exceeds maximum filesize: $maxfilesize kByte.</P>");
    }
    
    $tmp_name  = $_FILES['uploadfile']['tmp_name'];
    $file_name = $_FILES['uploadfile']['name'];
    $tgt_path  = "./uploads/$file_name";
    if ( file_exists ( $tgt_path) )
    {
      die ("<P>File '$file_name' exists - not uploaded.</P>");
    }
    
    if ( ! move_uploaded_file( $tmp_name, $tgt_path ) )
    {
      die ("<P>Problem during upload.</P>");
    }

    echo "<P>Upload of '$file_name' successful.</P>";
  }
}
else
{
      die ("<P>No file data received.</P>");
}
?>