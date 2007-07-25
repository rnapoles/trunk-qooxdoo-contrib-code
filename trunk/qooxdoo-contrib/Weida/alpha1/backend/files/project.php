<?php

class class_project
{

  function getBaseDir()  
  {
    $configXML = simplexml_load_file('../config/config.xml');
    
    return trim($configXML->backend->projectPath);
  }

  /* ############################################################## */
  
     
  function method_getNews($params, $error)
  {
    $xml = simplexml_load_file('http://feeds.feedburner.com/qooxdoo/news/content?format=xml');  
 
    $content = array();
    foreach ($xml->channel->item as $item)
    {

      $entry = array();
      $entry['title'] = trim($item->title);
      $entry['link']  = trim($item->link);      
      $content[] = $entry;
    }
         
    return $content;
  }

  function method_delete($params, $error)
  {   
    $baseDir = class_project::getBaseDir();
    
    $fullEntryName = $baseDir.$params[0];
    
    if (!file_exists($fullEntryName))
      return false;
    
    if (is_file($fullEntryName))
    {
      @unlink($fullEntryName);
    } else {
      class_project::recursiveDelete($fullEntryName);
    }
    
    if (file_exists($fullEntryName))
      return false;
    
    return true;
  }

  function method_newDirectory($params, $error)
  {
    $baseDir = class_project::getBaseDir();
    
    @mkdir($baseDir.$params[0]);
    
    $strPos  = strpos($params[0], '/');
    $baseDir = substr($params[0], $strPos+1);
    $projectName = substr($params[0], 0, $strPos);
    
    return array("projectName" => $projectName,
                 "fullDirName" => $baseDir, 
                 "dirName"     => dirname($baseDir),                  
                 "dirBaseName" => basename($params[0]));
  }

  function method_newProject($params, $error)
  {
    $baseDir = class_project::getBaseDir();
    
    //@mkdir($baseDir.$params[0]);
    
    class_project::copyFullDir('./newProjectFiles', $baseDir.$params[0]);
    
    return array("projectName" => $params[0]);
  }
  
  function method_getProjectList($params, $error)
  {
    $baseDir = class_project::getBaseDir();
    
    $d = dir($baseDir);

    $projectList = array();

    while (false !== ($entry = $d->read())) 
    {
      if ($entry != '..' && $entry != '.')
        $projectList[] = $entry;
    }
         
    return $projectList;
  }
  
  function method_getFilesOfProject($params, $error)  
  {    
    $baseDir = class_project::getBaseDir();
            
    $fileList = class_project::readDir($baseDir.$params[0], 0);    
    
    return array('path'=>$params[0], "content"=>$fileList);
  }

  function method_getDirsOfProject($params, $error)  
  {    
    $baseDir = class_project::getBaseDir();
            
    $fileList = class_project::readDir($baseDir.$params[0], 0, true);    
    return $fileList;
  }

  function method_getFileContent($params, $error)  
  {    
    $baseDir = class_project::getBaseDir();

    $fileContent = file_get_contents($baseDir.$params[0]);    

    $dotPos = strrpos($params[0], ".");
    $ext = '';
    if ($dotPos !== false)
      $ext = substr($params[0], $dotPos);

    $slashPos = strpos($params[0], "/");
    $projectName = '';
    if ($slashPos !== false)
      $projectName = substr($params[0], 0, $slashPos);
    
    $result = array();
    $result['fullFileName'] = $params[0];
    $result['fileName']     = basename($params[0]);
    $result['projectName']  = $projectName;    
    $result['fileType']     = $ext;
    $result['content']      = $fileContent;
    
    return $result;
  }

  function method_saveFileContent($params, $error)  
  {    
    $baseDir = class_project::getBaseDir();
   
    $fileName = str_replace("..", "_", $params[0]);
    $fileName = str_replace("'", "_", fileName);
    $fileName = str_replace('"', "_", fileName);
    $fullFileName = $baseDir.$params[0];

    $fileContent = file_put_contents($fullFileName, $params[1]);
    return true;
  }

  /* ############################################################## */
  /* ############################################################## */
  /* ############################################################## */  

  function readDir($dir, $level, $dirOnly = false)
  {    
    $dirInfo = array();
    $dirInfo['l'] = '1';
    $dirInfo['c'] = array();
    
    if ($level > 4)
    {
      $dirInfo['l'] = '0';
      return $dirInfo;
    }
        
    $d = dir($dir);
    while (false !== ($entry = $d->read())) 
    { 
      if($entry!='.' && $entry!='..' && $entry[0] != '.')  
      {
        $fullDir = $dir.'/'.$entry;
        if(is_dir($fullDir)) 
        {
          $dirInfo['c'][$entry] = class_project::readDir($fullDir, $level+1, $dirOnly);
        } else {
          $dotPos = strrpos($entry, ".");

          if ($dotPos === false)
          {
            $ext = '';
          } else {
            $ext = substr($entry, $dotPos);
          }
          
          if ($dirOnly === false)
            $dirInfo['c'][$entry] = array("ft"=>$ext);
        }
      }       
    }
    $d->close();
    
    if (count($dirInfo['Children']) > 20)
    {
      $dirInfo['c'] = array();
      $dirInfo['l'] = '0';
    }
    
    return $dirInfo;
  }

  function copyFullDir($sourceDir, $destDir) 
  {
    $num = 0;

    if(!is_dir($destDir)) 
      mkdir($destDir);

    $currentDir = opendir($sourceDir);
    if ($currentDir === false)
      return false;

    while($file = readdir($currentDir)) 
    {
      if($file == '.' || $file == '..') 
        continue;

      $sourceFile = $sourceDir.'/'.$file;
      $destFile = $destDir.'/'.$file;
        
      if(is_dir($sourceFile)) 
      {
        if ($file != 'CVS' && $file != '.svn')           // we don't want them here for now
          class_project::copyFullDir($sourceFile, $destFile);
          
        continue;
      }
        
      $diff = 1;
      if(is_file($destFile)) 
        $diff = filemtime($sourceFile) - filemtime($destFile); 
              
      if($diff > 0) 
        copy($sourceFile, $destFile);
    }

    closedir($currentDir);
  }

  function recursiveDelete($dirName)
  {
    $dirHandle = opendir($dirName);
    
    if ($dirHandle === false)
      return false;
    
    while (false !== ($file = readdir($dirHandle))) 
    {
      if ($file == '.' || $file == '..') 
        continue;
      
      $fullName = $dirName.'/'.$file;
      
      if (is_dir($fullName))
      {
        class_project::recursiveDelete($fullName);          
      } else {
        unlink($fullName) ;
      }
      
      if (file_exists($fullName))       
        return false;
    }

    closedir($dirHandle);

    rmdir($dirName);
        
    if (file_exists($dirName)) 
      return false;

    return true;    
  }   
     
}

?>