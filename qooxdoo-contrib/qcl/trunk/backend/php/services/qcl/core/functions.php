<?php

/**
 * Collection of functions which provide convenient shorthands or 
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
  if ( ! @is_file( $str ) ) return false;
  if ( ! @file_exists( $str ) ) return false; 
  return true;
}


/**
 * function to properly encode string data for use in xml.
 * Provided by snevi at im dot com dot ve
 * at http://www.php.net/htmlentities
 * @param string $string
 * @return string xml-encoded string
 */
function xml_entity_encode($string)
{
  $string = preg_replace('/[^\x09\x0A\x0D\x20-\x7F]/e', '_privateXMLEntities("$0")', htmlspecialchars($string) );
  return $string;
}

function _privateXMLEntities($num)
{
  $chars = array(
    128 => '&#8364;',
    130 => '&#8218;',
    131 => '&#402;',
    132 => '&#8222;',
    133 => '&#8230;',
    134 => '&#8224;',
    135 => '&#8225;',
    136 => '&#710;',
    137 => '&#8240;',
    138 => '&#352;',
    139 => '&#8249;',
    140 => '&#338;',
    142 => '&#381;',
    145 => '&#8216;',
    146 => '&#8217;',
    147 => '&#8220;',
    148 => '&#8221;',
    149 => '&#8226;',
    150 => '&#8211;',
    151 => '&#8212;',
    152 => '&#732;',
    153 => '&#8482;',
    154 => '&#353;',
    155 => '&#8250;',
    156 => '&#339;',
    158 => '&#382;',
    159 => '&#376;');
  $num = ord($num);
  return (($num > 127 && $num < 160) ? $chars[$num] : "&#".$num.";" );
}


/**
 * Converts a string containing xml entities to a string
 * in the given encoding (default utf-8).
 * Taken from http://webworkpro.de/webwork/sonderzeichen-in-unicode/
 * @param string $string
 * @param string $encoding
 * @todo implement other encodings
 * @return string Utf8-encoded string
 */
function xml_entity_decode($string, $encoding="utf-8" )
{
  static $trans_table = null;
  
  if( is_null( $trans_table ) )
  {
    $translation_table = get_html_translation_table(HTML_ENTITIES);
    foreach ($translation_table as $key => $value) 
    {
      $trans_table["&#".ord($key).";"] = $key;
    }
  }
  return strtr($string, $trans_table);
}


/**
 * Converts a string containing html entities to a utf-8 string
 * without touching charactes that are already utf-8. 
 * Needed for PHP4
 * @param string $string
 * @param string $quote_stye
 * @return string Utf8-encoded string
 */
function html_entity_decode_utf8( $string, $quote_style = ENT_COMPAT )
{
  if ( phpversion() < 5 )
  {
    static $trans_table = null;
    
    if( is_null( $trans_table ) )
    {
      $translation_table = get_html_translation_table( HTML_ENTITIES );
      foreach ($translation_table as $key => $value) 
      {
        $trans_table[$value] = utf8_encode($key);
      }
      
      /*
       * html entities that are not converted
       */
      $trans_table["&dash;"] = "-"; 
    }
    return strtr($string, $trans_table);
  }
  return html_entity_decode( $string, $quote_style, "utf-8");
}

/**
 * Converts a utf-8 encoded string into a string.
 * Taken from http://webworkpro.de/webwork/sonderzeichen-in-unicode/
 * that can be used in xml
 * @todo test this
 * @param string $string
 * 
 */
function xmlentities($string) 
{
  static $translation_table = null;
  if ( is_null( $translation_table ) )
  {
    $translation_table = get_html_translation_table(HTML_ENTITIES);
    foreach ($translation_table as $key => $value) 
    {
      $translation_table[$key] = "&#".ord($key).";";
    }
  }
  return strtr($string, $translation_table);
}


/**
 * Converts a html string into utf8, stripping tags and converting
 * hmtl entities into unicode, and <p> and <br> into new line 
 * @param string string
 * @return string
 */
function html2utf8( $str )
{
  return strip_tags(
            html_entity_decode_utf8( 
              str_replace( array("<br/>","<br />","<br>","<p>"), "\n",
                $str 
               )
             )
          );  
}


/**
 * Checks whether the input array is a list and not 
 * an associative array
 * @param array $var
 * @return bool
 */
function is_list( $var )
{
  if ( ! is_array( $var ) ) return false;
  
  /*
   * check only first 100 keys for performance
   */
  $keys = array_slice( array_keys( $var ), 0, 100);
  foreach ( $keys as $key )
  {
    if ( ! is_numeric( $key ) )
    {
      return false;
    }
  }
  return true;
}

/**
 * Modification of debug_print_backtrace() - modified not to
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
function debug_get_backtrace( $skip=1 )
{
  /*
   * Get backtrace
   */
  $backtrace = debug_backtrace();

  /*
   * Skip entries
   */
  for( $i=0; $i<$skip; $i++ )
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
          str_replace( $path, "", $call['file'] ) . ':' . $call['line'] : "(unknown)";
  
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

/**
 * returns file extension, if any
 * @param string $file
 * @return string
 */
function get_file_extension ($file)
{
  $pos = strrpos($file,".");
  
  if ( $pos !== false )
  {
    return substr($file,$pos+1);  
  }
  return "";
}

/**
 * Returns the type of the passed variable. If variable
 * is an object and the second parameter is true, the name
 * of the class is returned.
 * @param mixed $var
 * @param bool[optional] $returnClassname
 * 
 */
function typeof( $var, $returnClassname = false )
{
  $type = gettype( $var );
  if ( is_object( $var) and $returnClassname )
  {
    $type = get_class( $var );
  }
  return $type;
}

/**
 * Build a UUID or GUID
 * taken from http://www.soulhuntre.com/2004/10/29/uuid-guid-in-native-php/
 * @author soulhuntre@soulhuntre.com 
 */
function uuid()
{
    // -_-_Ð_-_Ð_-_Ð_-_Ñ

    // build a UUID or GUID via PHP
    // may or may not be Microsoft GUID compatible
    // thanks to all the internet code examples!
    //
    // contact me with corrections and changes please,
    // soulhuntre@soulhuntre.com
    //
    // 10/29/2004 - v1.0
    //
    // Do whatever you want with this code, itÕs in the public domain

    $rawid = strtoupper(md5(uniqid(rand(), true)));
    $workid = $rawid;

    // hopefully conform to the spec, mark this as a Òrandom" type
    // lets handle the version byte as a number
    $byte = hexdec( substr($workid,12,2) );
    $byte = $byte & hexdec("0f");
    $byte = $byte | hexdec("40");
    $workid = substr_replace($workid, strtoupper(dechex($byte)), 12, 2);

    // hopefully conform to the spec, mark this common variant
    // lets handle the Òvariant"
    $byte = hexdec( substr($workid,16,2) );
    $byte = $byte & hexdec("3f");
    $byte = $byte | hexdec("80");
    $workid = substr_replace($workid, strtoupper(dechex($byte)), 16, 2);

    // build a human readable version
    /*$rid = substr($rawid, 0, 8).'-'
        .substr($rawid, 8, 4).'-'
        .substr($rawid,12, 4).'-'
        .substr($rawid,16, 4).'-'
        .substr($rawid,20,12);
    */

    // build a human readable version
    $wid = substr($workid, 0, 8).'-'
        .substr($workid, 8, 4).'-'
        .substr($workid,12, 4).'-'
        .substr($workid,16, 4).'-'
        .substr($workid,20,12);

    // -_-_Ð_-_Ð_-_Ð_-_Ñ
  return $wid;
}

/**
 * Calculate HMAC-SHA1 according to RFC2104
 * See http://www.faqs.org/rfcs/rfc2104.html
 * @param string $key
 * @param string $data
 *
function hmacsha1($key,$data) {
    $blocksize=64;
    $hashfunc='sha1';
    if (strlen($key)>$blocksize)
        $key=pack('H*', $hashfunc($key));
    $key=str_pad($key,$blocksize,chr(0x00));
    $ipad=str_repeat(chr(0x36),$blocksize);
    $opad=str_repeat(chr(0x5c),$blocksize);
    $hmac = pack(
                'H*',$hashfunc(
                    ($key^$opad).pack(
                        'H*',$hashfunc(
                            ($key^$ipad).$data
                        )
                    )
                )
            );
    return bin2hex($hmac);
}*/

/**
 * Used to encode a field for Amazon Auth
 * (taken from the Amazon S3 PHP example library)
 * @param string $str
 *
function hex2b64($str)
{
    $raw = '';
    for ($i=0; $i < strlen($str); $i+=2)
    {
        $raw .= chr(hexdec(substr($str, $i, 2)));
    }
    return base64_encode($raw);
}*/


/**
 * Function to retrieve the response to a http request
 * Modified from code posted mail at 3v1n0 dot net at
 * http://de2.php.net/manual/en/features.remote-files.php
 * @param string $url
 * @param int $range
 * @return array Array containing the response and the status code
 *
function http_get($url, $range = 0)
{
    $url_stuff = parse_url($url);
    $port = isset($url_stuff['port']) ? $url_stuff['port'] : 80;
   
    $fp = @fsockopen($url_stuff['host'], $port);
   
    if (!$fp)
        return false;
   
    $query  = 'GET '.$url_stuff['path'].'?'.$url_stuff['query']." HTTP/1.1\r\n";
    $query .= 'Host: '.$url_stuff['host']."\r\n";
    $query .= 'Connection: close'."\r\n";
    $query .= 'Cache-Control: no'."\r\n";
    $query .= 'Accept-Ranges: bytes'."\r\n";
    if ($range != 0)
        $query .= 'Range: bytes='.$range.'-'."\r\n"; // -500
    //$query .= 'Referer: http:/...'."\r\n";
    //$query .= 'User-Agent: myphp'."\r\n";
    $query .= "\r\n";
   
    fwrite($fp, $query);
   
    $chunksize = 1*(1024*1024);
    $headersfound = false;

    while (!feof($fp) && !$headersfound) {
        $buffer .= @fread($fp, 1);
        if (preg_match('/HTTP\/[0-9]\.[0-9][ ]+([0-9]{3}).*\r\n/', $buffer, $matches)) {
            $headers['HTTP'] = $matches[1];
            $buffer = '';
        } else if (preg_match('/([^:][A-Za-z_-]+):[ ]+(.*)\r\n/', $buffer, $matches)) {
            $headers[$matches[1]] = $matches[2];
            $buffer = '';
        } else if (preg_match('/^\r\n/', $buffer)) {
            $headersfound = true;
            $buffer = '';
        }

        if (strlen($buffer) >= $chunksize)
            return false;
    }

    if (preg_match('/4[0-9]{2}/', $headers['HTTP']))
        return false;
    else if (preg_match('/3[0-9]{2}/', $headers['HTTP']) && !empty($headers['Location'])) {
        $url = $headers['Location'];
        return http_get($url, $range);
    }

    $response = "";
    while (!feof($fp) && $headersfound) {
        $buffer = @fread($fp, $chunksize);
        $response .= $buffer;
    }

    $status = fclose($fp);

    return array($response,$status);
}
*/

/**
 * Converts an integer in a human-Readable byte size format.
 * Posted by olafurw at gmail.com on http://www.php.net/manual/en/function.filesize.php
 * @param int $bytes
 * return string
 */
function byteConvert($bytes)
{
    $s = array('B', 'Kb', 'MB', 'GB', 'TB', 'PB');
    $e = floor(log($bytes)/log(1024));
    
    return sprintf('%.2f '.$s[$e], ($bytes/pow(1024, floor($e))));
}

/*
 * we can return here if not PHP 4
 */
if ( phpversion() >= 5 ) return;


/**
 * provide PHP5 compatible functions to PHP4
 */


/** 
 * "clone" function
 */
 eval('
  function clone($object) {
    return $object;
  }
 ');
 
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


if (!function_exists('get_headers')) 
{
  /**
   * Replicated PHP5's get_headers function 
   * Posted by info at marc-gutt dot de
   * http://www.php.net/manual/en/function.get-headers.php
   */
  function get_headers($url, $format=0) {
      $headers = array();
      $url = parse_url($url);
      $host = isset($url['host']) ? $url['host'] : '';
      $port = isset($url['port']) ? $url['port'] : 80;
      $path = (isset($url['path']) ? $url['path'] : '/') . (isset($url['query']) ? '?' . $url['query'] : '');
      $fp = fsockopen($host, $port, $errno, $errstr, 3);
      if ($fp)
      {
          $hdr = "GET $path HTTP/1.1\r\n";
          $hdr .= "Host: $host \r\n";
          $hdr .= "Connection: Close\r\n\r\n";
          fwrite($fp, $hdr);
          while (!feof($fp) && $line = trim(fgets($fp, 1024)))
          {
              if ($line == "\r\n") break;
              list($key, $val) = explode(': ', $line, 2);
              if ($format)
                  if ($val) $headers[$key] = $val;
                  else $headers[] = $key;
              else $headers[] = $line;
          }
          fclose($fp);
          return $headers;
      }
      return false;
  }
}


?>