<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2009 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */

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
 * Transform an object structure into an associative array.
 * In contrast to array casting with "(array)", this function
 * transverses nested object structures, including nested arrays within
 * this structure
 * @param object $var
 * return array
 */
function object2array( $var )
{
  /*
   * if argument is a scalar value ( not array and not object)
   * return it
   */
  if ( ! is_object( $var ) and ! is_array( $var ) ) return $var;

  /*
   * convert objects into an array
   */
  if ( is_object( $var ) )
  {
    $var = get_object_vars( $var );
  }

  /*
   * iterate recursively through this array
   */
  $arr=array();
  foreach ( $var as $key => $val )
  {
    $arr[$key] = object2array( $val );
  }

  /*
   * return the result array
   */
  return $arr;
}

/**
 * Returns the absolute path to a file that is anywhere on your
 * include_path or system PATH
 * @param string $file
 */
function real_file_path( $file )
{
  if ( file_exists( $file ) )
  {
    return realpath( $file );
  }

  $paths = array_merge(
    explode(":", ini_get('include_path') ),
    explode(":", $_ENV["PATH"] )
  );

  foreach($paths as $path)
  {
    $filepath = "$path/$file";
    if ( file_exists( $filepath ) )
    {
      return realpath($filepath);
    }
  }
  return false;
}

/**
 * Checks if passed string var is a valid file.
 * assumes that strings over the length of 512 characters are not a filename
 * @param string $arg
 */
function is_valid_file( $file )
{
  /*
   * qcl file object?
   */
  if ( is_qcl_file($file) )
  {
    return $file->exists();
  }

  /*
   * get real file path
   */
  $file = real_file_path($file);

  /*
   * the following checks work on string arguments
   */
  if ( ! is_string($file) ) return false;
  if ( strlen($file) > 512 ) return false;
  if ( ! @file_exists( $file ) ) return false;
  if ( ! is_readable( $file ) ) return false;
  if ( ! is_file( $file ) ) return false;
  return true;
}

/**
 * checks if argument is a qcl_io_filesystem_IFile object
 * @return bool
 * @todo PHP5
 */
function is_qcl_file( $arg )
{
  return is_a( $arg,"qcl_io_filesystem_Resource" );
}

function get_var_type( $var )
{
  if ( is_object($var) )
  {
    return get_class( $var );
  }
  else
  {
    return gettype($var);
  }
}

function &qcl_get_logger()
{
  $obj = new qcl_core_Object();
  $logger =& $obj->getLogger();
  return $logger;
}

function boolToStr( $value )
{
  if ( ! is_bool($value) )
  {
    trigger_error("Value is not boolean");
  }
  return $value ? "true" : "false";
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

function stripquotes( $string )
{
  return str_replace("'","",str_replace('"',"",$string));
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
 * @param int  $skip Number of calls to skip
 * @param bool $returnAsArray If true, return an array of calls instead of a
 * concatenated string
 */
function debug_get_backtrace( $skip=1, $returnAsArray=false )
{
  /*
   * Get backtrace
   */
  $backtrace = array_reverse( debug_backtrace() );

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
  $strip = $_SERVER["DOCUMENT_ROOT"];

  /*
   * Iterate backtrace
   */
  $calls = array();

  foreach ( $backtrace as $i => $call )
  {
    $location = ( isset( $call['file'] ) and isset($call['line'] ) ) ?
         " -->  " . ( str_replace( $strip, "", $call['file'] ) . ':' . $call['line'] ) :
         "";

    $function = isset( $call['class'] ) ?
    $call['class'] . '->' . $call['function'] :
    $call['function'];

    $params = ( isset( $call['args'] ) and is_array( $call['args'] ) ) ?
    @implode(", ", $call['args'] )  : "";

    $calls[] = sprintf("#%d  %s(%s) %s",
    $i,
    $function,
    $params,
    $location);
  }
  return $returnAsArray ? $calls : implode("\n", $calls);
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
  // -_-_�_-_�_-_�_-_�

  // build a UUID or GUID via PHP
  // may or may not be Microsoft GUID compatible
  // thanks to all the internet code examples!
  //
  // contact me with corrections and changes please,
  // soulhuntre@soulhuntre.com
  //
  // 10/29/2004 - v1.0
  //
  // Do whatever you want with this code, it�s in the public domain

  $rawid = strtoupper(md5(uniqid(rand(), true)));
  $workid = $rawid;

  // hopefully conform to the spec, mark this as a �random" type
  // lets handle the version byte as a number
  $byte = hexdec( substr($workid,12,2) );
  $byte = $byte & hexdec("0f");
  $byte = $byte | hexdec("40");
  $workid = substr_replace($workid, strtoupper(dechex($byte)), 12, 2);

  // hopefully conform to the spec, mark this common variant
  // lets handle the �variant"
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

  // -_-_�_-_�_-_�_-_�
  return $wid;
}

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

function ellipsify( $string, $length, $mode="right" )
{
  if ( $length and strlen( $string ) > $length )
  {
    switch ( $mode )
    {
      case "right":
        return substr( $string, 0, $length-3 ) . "...";

      case "left" :
        return "..." . substr( $string, strlen($string)-$length+3 );

      case "center":
        return substr( $string, 0, floor($length/2) -2 ) . "..." . substr( $string, floor($length/2) + 1 );

      default:
        trigger_error("Invalid ellipsify mode '$mode'. Valid values are 'right|left|center'");
    }
  }
  return $string;
}

/*
 function ellipsify_pixel( $string, $width, $mode="right" )
 {
 $strWidth = get_str_width( $string );

 if ( $width and $strWidth > $width )
 {
 $length = strlen(truncate_str_at_width( $string, $width, "" ));

 switch ( $mode )
 {
 case "right":
 return substr( $string, 0, $length-3 ) . "...";

 case "left" :
 return "..." . substr( $string, strlen($string)-$length+3 );

 case "center":
 return substr( $string, 0, floor($length/2) -2 ) . "..." . substr( $string, floor($length/2) + 1 );

 default:
 trigger_error("Invalid ellipsify mode '$mode'. Valid values are 'right|left|center'");
 }
 }
 return $string;
 }

 // posted by 'sanneschaap' dot $del dot 'gmail dot com'
 // on http://us2.php.net/wordwrap


 //the width of the biggest char @
 $fontwidth = 11;

 //each chargroup has char-ords that have the same proportional displaying width
 $chargroup[0] = array(64);
 $chargroup[1] = array(37,87,119);
 $chargroup[2] = array(65,71,77,79,81,86,89,109);
 $chargroup[3] = array(38,66,67,68,72,75,78,82,83,85,88,90);
 $chargroup[4] = array(35,36,43,48,49,50,51,52,53,54,55,56,57,60,61,62,63, 69,70,76,80,84,95,97,98,99,100,101,103,104,110,111,112, 113,115,117,118,120,121,122,126);
 $chargroup[5] = array(74,94,107);
 $chargroup[6] = array(34,40,41,42,45,96,102,114,123,125);
 $chargroup[7] = array(44,46,47,58,59,91,92,93,116);
 $chargroup[8] = array(33,39,73,105,106,108,124);

 //how the displaying width are compared to the biggest char width
 $chargroup_relwidth[0] = 1; //is char @
 $chargroup_relwidth[1] = 0.909413854;
 $chargroup_relwidth[2] = 0.728241563;
 $chargroup_relwidth[3] = 0.637655417;
 $chargroup_relwidth[4] = 0.547069272;
 $chargroup_relwidth[5] = 0.456483126;
 $chargroup_relwidth[6] = 0.36589698;
 $chargroup_relwidth[7] = 0.275310835;
 $chargroup_relwidth[8] = 0.184724689;

 //build fast array
 $char_relwidth = null;
 for ($i=0;$i<count($chargroup);$i++){
 for ($j=0;$j<count($chargroup[$i]);$j++){
 $char_relwidth[$chargroup[$i][$j]] = $chargroup_relwidth[$i];
 }
 }

 //get the display width (in pixels) of a string
 function get_str_width($str){
 global $fontwidth,$char_relwidth;
 $result = 0;
 for ($i=0;$i<strlen($str);$i++){
 $result += $char_relwidth[ord($str[$i])];
 }
 $result = $result * $fontwidth;
 return $result;
 }

 //truncates a string at a certain displaying pixel width
 function truncate_str_at_width($str, $width, $trunstr='...')
 {
 global $fontwidth,$char_relwidth;
 $trunstr_width = get_str_width($trunstr);
 $width -= $trunstr_width;
 $width = $width/$fontwidth;
 $w = 0;
 for ($i=0;$i<strlen($str);$i++){
 $w += $char_relwidth[ord($str[$i])];
 if ($w > $width)
 break;
 }
 $result = substr($str,0,$i).$trunstr;
 return $result;
 // texas is the reason rules at 10am :)
 }
 */

?>