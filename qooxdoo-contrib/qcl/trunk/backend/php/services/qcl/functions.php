<?php

/**
 * collection of functions which provide convenient shorthands or 
 * compatibility between php4 and php5
 */

/**
 * PHP5 file_put_contents emulation
 *
 */
if(!function_exists("file_put_contents"))
{
    function file_put_contents($file,$data)
    {
        @unlink($file);
        error_log($data,3,$file);
        return file_exists($file);
    }
}

/**
 * avoids if statements such as if($a) $c=$a; else $c=$b;
 *
 * @argument mixed 
 * @argument mixed ...
 * @return first non-null argument, otherwise false
 */ 
if(!function_exists("either")){
    function either()
    {
        $arg_list = func_get_args();
        foreach($arg_list as $arg)
        {
          if($arg) return $arg;
        }
        return false;
    } 
}

/**
 * php4 equivalent of stream_get_contents
 * 
 * @param resource $resource resource handle
 */
if( ! function_exists( "stream_get_contents" ) )
{
  function stream_get_contents($resource)
  {
    $stream = "";
    while ( ! feof ( $resource ) ) 
    { 
      $stream .= fread ( $resource );
    }
    return $stream;
  } 
}

/**
 * php4 equivalent of scandir
 * from http://www.php.net/manual/en/function.scandir.php
 * @return array list of files
 * @param string $dir
 * @param boolean $sortorder 
 */ 
if(!function_exists('scandir')) 
{
  function scandir($dir, $sortorder = 0) 
  {
    if(is_dir($dir) && $dirlist = @opendir($dir)) 
    {
      while(($file = readdir($dirlist)) !== false) 
      {
          $files[] = $file;
      }
      closedir($dirlist);
      ($sortorder == 0) ? asort($files) : rsort($files); // arsort was replaced with rsort
      return $files;
    } 
    else 
    {
      return false;  
    }
  }
}

/**
 * php4 equivalent of array_diff_key
 * from http://de3.php.net/manual/en/function.array-diff-key.php
 * @return array 
 */ 
if(!function_exists('array_diff_key')) 
{
  function array_diff_key()
  {
    $arrs = func_get_args();
    $result = array_shift($arrs);
    foreach ($arrs as $array) 
    {
      foreach ($result as $key => $v) 
      {
        if (array_key_exists($key, $array)) 
        {
          unset($result[$key]);
        }
      }
    }
    return $result;
   }
}

/**
 * php4 equivalent of json_encode
 */
if ( ! function_exists("json_encode") )
{
  function json_encode( $string )
  {
    require_once ("qcl/jsonrpc/JSON.phps");
    $json = new JSON();
    return $json->encode( $string );
  }
}

/**
 * php4 equivalent of json_decode
 */
if ( ! function_exists("json_decode") )
{
  function json_decode( $string, $tranformToArray=false )
  {
    require_once ("qcl/jsonrpc/JSON.phps");
    $json = new JSON();
    $var = $json->decode( $string );
    if ( is_object( $var ) and $tranformToArray );
    {
      return object2array($var);
    }
    return $var;
  }
}

/**
 * transform an object structure into an associative array.
 * In contrast to array casting with "(array)", this function 
 * transverses nested objest structures
 * @param object $obj
 * return array()
 */
function object2array($obj)
{
  if (! is_object($obj)) return (array) $obj;
  $arr=array();
  foreach (get_object_vars($obj) as $key => $val) 
  {
    $arr[$key]= is_object($val) ? object2array($val) : $val;
  }
  return $arr;
}

/**
 * checks if passed string var is a valid file.
 * assumes that strings over the length of 512 characters are not a filename
 * @param string $str
 */
function is_valid_file($str)
{
  if ( ! is_string($str) ) return false;
  if ( strlen($str) > 512 ) return false;
  if ( ! file_exists($str) ) return false;
  if ( ! is_readable( $str ) ) return false;
  if ( ! @is_file($str) ) return false; 
  return true;
}

/**
 * Simple function to replicate PHP5 behaviour
 * from http://www.php.net/manual/de/function.microtime.php
 */
function microtime_float()
{
    list($usec, $sec) = explode(" ", microtime());
    return ((float)$usec + (float)$sec);
}

?>