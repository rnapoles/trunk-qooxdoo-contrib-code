<?php

/**
 * collection of functions which provide convenient shorthands or 
 * compatibility between php4 and php5
 */


/**
 * Returns the first non-null argument.
 * Avoids if statements such as if($a) $c=$a; else $c=$b;
 *
 * @argument mixed 
 * @argument mixed ...
 * @return first non-null argument, otherwise false
 */ 
function either()
{
    $arg_list = func_get_args();
    foreach($arg_list as $arg)
    {
      if($arg) return $arg;
    }
    return false;
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
 * function to properly encode string data for use in xml.
 * Currently just a wrapper vor htmlentities()
 * @todo implement
 * @param string $string
 * @return string xml-encoded string
 */
function xml_entity_encode($string)
{
  return htmlentities($string);
}


/**
 * function to decode character data containing xml entities
 * Currently just a wrapper vor htmlentity_decode()
 * @todo implement
 * @param string $string
 * @return string 
 */
function xml_entity_decode($string)
{
  return html_entity_decode($string); 
}

/**
 * modification of debug_print_backtrace() - modified not to
 * echo but instead to return the backtrace and to 
 * skip a variable number of entries
 *
 * @category    PHP
 * @package     PHP_Compat
 * @link        http://php.net/function.debug_print_backtrace
 * @author      Laurent Laville <pear@laurent-laville.org>
 * @author      Aidan Lister <aidan@php.net>
 * @author      Christian Boulanger <c.boulanger@qxtransformer.org>
 * @return      string
 * @require     PHP 4.3.0 (debug_backtrace)
 */
function debug_get_backtrace($skip=1)
{
  /*
   * Get backtrace
   */
  $backtrace = debug_backtrace();

  /*
   * Skip entries
   */
  for($i=0; $i<$skip; $i++)
  {
    array_shift($backtrace);
  }
    
  /*
   * Location of document root in file system
   * (will be stripped in output)
   */
  $path = realpath( SERVICE_PATH );
    
  /*
   * Iterate backtrace
   */
  $calls = array();
  
  foreach ( $backtrace as $i => $call ) 
  {
      $location = ( isset( $call['file'] ) and isset($call['line'] ) ) ?
          str_replace( $path, "", $call['file'] ) . ':' . $call['line'] : "";
  
      $function = isset( $call['class'] ) ?
          $call['class'] . '.' . $call['function'] :
          $call['function'];
           
      $params = ( isset( $call['args'] ) and is_array( $call['args'] ) ) ? 
          @implode(", ", $call['args'] )  : "";

      $calls[] = sprintf("#%d  %s(%s) called at\n--> %s",
          $i,
          $function,
          $params,
          $location); 
  }

  return implode("\n", $calls);
}


/*
 * we can return here if not PHP 4
 */
if ( phpversion() >= 5 ) return;


/**
 * provide PHP5 compatible functions to PHP4
 */

if( ! function_exists("file_put_contents") )
{
  /**
   * PHP5 file_put_contents emulation
   *
   */
  function file_put_contents($file,$data)
  {
      @unlink($file);
      error_log($data,3,$file);
      return file_exists($file);
  }
}

if( ! function_exists( "stream_get_contents" ) )
{
  /**
   * php4 equivalent of stream_get_contents
   * 
   * @param resource $resource resource handle
   */
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


if(!function_exists('scandir')) 
{
  /**
   * php4 equivalent of scandir
   * from http://www.php.net/manual/en/function.scandir.php
   * @return array list of files
   * @param string $dir
   * @param boolean $sortorder 
   */   
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


if( ! function_exists('array_diff_key') ) 
{
  /**
   * php4 equivalent of array_diff_key
   * from http://de3.php.net/manual/en/function.array-diff-key.php
   * @return array 
   */   
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


if ( ! function_exists("json_encode") )
{
  /**
   * php4 equivalent of json_encode
   * @param string $string String to encode
   */  
  function json_encode( $string )
  {
    require_once ("qcl/jsonrpc/JSON.phps");
    $json = new JSON();
    return $json->encode( $string );
  }
}


if ( ! function_exists("json_decode") )
{
  /**
   * php4 equivalent of json_decode
   * @param string $string JSON string to decode
   */
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


if ( ! function_exists("microtime_float" ) )
{
  /**
   * Simple function to replicate PHP5 behaviour
   * from http://www.php.net/manual/de/function.microtime.php
   */
  function microtime_float()
  {
      list($usec, $sec) = explode(" ", microtime());
      return ((float)$usec + (float)$sec);
  }
}

?>