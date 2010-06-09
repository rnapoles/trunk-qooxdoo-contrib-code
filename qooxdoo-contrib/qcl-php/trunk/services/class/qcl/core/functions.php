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

/*
 * @todo rename functions to have a qcl_ prefix
 */


class qcl_FileNotFoundException extends Exception {}
class qcl_ClassNotDefinedException extends Exception {}
class qcl_InvalidClassException extends Exception {}

/**
 * Imports a class file, loading __init__.php package initialization files
 * of the packages that this class is included in.
 * @param string $class Name of the class
 * @param bool $checkDefined If true, check if the class is defined in the
 *   included file. Defaults to false.
 * @return void
 */
function qcl_import( $class, $checkDefined = false )
{

  /*
   * no need to load anything if class is already
   * defined
   */
  if ( class_exists( $class ) ) return;

  /*
   * load __init__ files that belong to a package
   */
  $namespace = explode( "_", $class );
  $path = array();
  for( $i=0; $i<count($namespace)-1; $i++)
  {
    $path[] = $namespace[$i];
    $init_file = implode("/",$path) . "/__init__.php";
    if( qcl_file_exists( $init_file ) )
    {
      require_once $init_file;
    }
  }

  /*
   * load class file
   */
  $class_file = implode( "/", $namespace ) . ".php";
  if( qcl_file_exists( $class_file ) )
  {
    require_once $class_file;
    if ( $checkDefined
    and ! class_exists( $class )
    and ! class_exists( JsonRpcClassPrefix . $class ) )
    {
      throw new qcl_ClassNotDefinedException("Class '$class' is not defined in file '$class_file'.");
    }
  }
  else
  {
    throw new qcl_FileNotFoundException("Class file '$class_file' does not exist.");
  }
}

/**
 * Returns the absolute path to a file that is anywhere on your
 * include_path or system PATH
 * @param string $file
 */
function qcl_realpath( $file )
{
  if ( file_exists( $file ) )
  {
    return realpath( $file );
  }

  // FIXME Windows!
  $paths = explode(":", ini_get('include_path') );

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
 * qcl version of file_exists, checking also files on the include path
 * @param $path
 * @return boolean
 */
function qcl_file_exists( $path )
{
  return file_exists( qcl_realpath( $path) );
}



/**
 * Checks if passed string var is a valid file.
 * assumes that strings over the length of 512 characters are not a filename
 * @param string $arg
 */
function qcl_is_file( $file )
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
  $file = qcl_realpath($file);

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
 * Returns a reference to the singleton instance of the given class
 * @param $clazz Class name
 * @return object
 */
function qcl_getInstance( $clazz )
{
  static $singletons = array();
  if ( ! isset( $singletons[ $clazz ] ) )
  {
    $singletons[ $clazz ] = new $clazz;
  }
  return $singletons[ $clazz ];
}

/**
 * Asserts that argument is of the given type
 * @param mixed $value
 * @param string $type
 * @param string $msg Optional error message
 * @return void
 * @throws InvalidArgumentException
 */
function qcl_assert_type( $value, $type, $msg=null )
{
  if ( gettype( $value ) != $type )
  {
    if ( $msg === null )
    {
      $msg = sprintf(
        "Invalid argument type. Expected '%s', got '%s'",
      $type, gettype( $value )
      );
    }
    throw new InvalidArgumentException( $msg );
  }
}

/**
 * Asserts that argument is boolean
 * @param $value
 * @param string $msg Optional error message
 * @return void
 *
 * @throws InvalidArgumentException
 */
function qcl_assert_boolean( $value, $msg=null )
{
  qcl_assert_type( $value, "boolean", $msg );
}

/**
 * Asserts that argument is a string
 * @param mixed $value
 * @param string $msg Optional error message
 * @return void
 * @throws InvalidArgumentException
 */
function qcl_assert_string( $value, $msg=null )
{
  qcl_assert_type( $value, "string", $msg );
}

/**
 * Asserts that argument is a non-empty string
 * @param mixed $value
 * @param string $msg Optional error message
 * @return void
 * @throws InvalidArgumentException
 */
function qcl_assert_valid_string( $value, $msg=null )
{
  if ( $value === "" )
  {
    throw new InvalidArgumentException(
      "Invalid argument type. Expected valid string, got empty string"
      );
  }
  qcl_assert_string( $value, $msg );
}

/**
 * Asserts that argument is an array
 * @param mixed $value
 * @param string $msg Optional error message
 * @return void
 * @throws InvalidArgumentException
 */
function qcl_assert_array( $value, $msg=null )
{
  qcl_assert_type( $value, "array", $msg );
}

/**
 * Asserts that argument is an integer value
 * @param mixed $value
 * @param string $msg Optional error message
 * @return void
 * @throws InvalidArgumentException
 *
 */
function qcl_assert_integer( $value, $msg=null )
{
  qcl_assert_type( $value, "integer", $msg );
}

/**
 * Asserts that argument is an object
 * @param mixed $value
 * @param string $msg Optional error message
 * @return void
 * @throws InvalidArgumentException
 */
function qcl_assert_object( $value, $msg=null )
{
  qcl_assert_type( $value, "object" );
}

/**
 * Asserts that the given value matches the given regular expression
 * @param $regexp
 * @param $value
 * @param string $msg Optional error message
 * @return void
 * @throws InvalidArgumentException
 */
function qcl_assert_regexp( $regexp, $value, $msg=null )
{
  qcl_assert_string( $value, $msg );
  if( preg_match( $regexp, $value ) == 0 )
  {
    if ( $msg === null )
    {
      $msg = "'$value' does not match $regexp.";
    }
    throw new InvalidArgumentException( $msg );
  }
}

/**
 * Asserts that the given object has the given method.
 *
 * @param object $object
 * @param string $method
 * @return void
 */
function qcl_assert_method_exists( $object, $method )
{
  qcl_assert_object( $object, "First argument must be an object" );
  qcl_assert_valid_string( $method, "Second argument must be a string" );
  if ( ! method_exists( $object, $method ) )
  {
    throw new InvalidArgumentException( sprintf(
      "Object of class %s does not have a method %s",
    get_class( $object ), $method
    ));
  }
}

/**
 * Asserts that the given object is an instance of the given
 * class
 * @param object $object
 * @param string $class
 * @return boolean
 */
function qcl_assert_instanceof( $object, $class )
{
  qcl_assert_object( $object, "First argument must be an object" );
  qcl_assert_valid_string( $class, "Second argument must be a string" );
  if ( ! $object instanceof $class )
  {
    throw new InvalidArgumentException( sprintf(
      "Object of class %s is not an instance of %s",
    get_class( $object ), $class
    ));
  }
}

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
  foreach( $arg_list as $arg)
  {
    if ($arg) return $arg;
  }
  return false;
}

/**
 * Transform an object structure into an associative array.
 * In contrast to array casting with "(array)", this function
 * transverses nested object structures, including nested arrays within
 * this structure.
 *
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
 * Asserts that all keys in the second argument exist in the first argument.
 * @param array $array
 * @param array $keys
 * @return void.
 * @throws InvalidArgumentException
 */
function qcl_array_assert_keys( $array, $keys )
{
  if ( ! is_array( $array ) or ! is_array( $keys ) )
  {
    throw new InvalidArgumentException( "Invalid arguments." );
  }
  if ( count( array_intersect( array_keys( $array ), $keys) ) < count( $keys ) )
  {
    throw new InvalidArgumentException( sprintf(
      "Assertion failed: keys ['%s'] are missing from given array,",
    implode("', '",array_diff( $keys, array_keys( $array ) ) )
    ) );
  }
}


/**
 * Converts a boolean value to a string representation
 * @param bool $value
 * @return string
 */
function boolString($value = false)
{
  return ($value ? 'true' : 'false');
}

/**
 * checks if argument is a qcl_io_filesystem_IFile object
 * @todo rename
 * @return bool
 */
function is_qcl_file( $arg )
{
  return is_a( $arg,"qcl_io_filesystem_Resource" );
}

/**
 * Returns the type of the variable, or its class name, if
 * it is an object
 * @param $var
 * @return string
 */
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
  str_replace( array("<br/>","<br />","<br>","<p>"), "\n", $str )
  )
  );
}

/**
 * Strips a string of all quote characters
 * @param $string
 * @return unknown_type
 */
function stripquotes( $string )
{
  return str_replace("'","",str_replace('"',"",$string));
}

/**
 * Checks whether the input array is a list and not
 * an associative array
 * @param array $var
 * @return bool
 * FIXME rename to qcl_is_list()
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
 * Checks whether the input an associative array
 * @param array $var
 * @return bool
 * FIXME rename to qcl_is_map()
 */
function is_map( $var )
{
  if ( ! is_array( $var ) ) return false;
  return ! is_list( $var );
}

/**
 * Converts to string value
 * @param mixed $value
 * @return string
 */
function qcl_toString( $value )
{
  return (string) $value;
}

/**
 * Converts to integer value
 * @param mixed $value
 * @return integer
 */
function qcl_toInteger( $value )
{
  return (integer) $value;
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

/********************************
 * Retro-support of get_called_class()
 * Tested and works in PHP 5.2.4
 * http://www.sol1.com.au/
 ********************************/
if(!function_exists('get_called_class'))
{
  ini_set("auto_detect_line_endings", 1);
  function get_called_class($bt = false,$l = 1)
  {
    if (!$bt) $bt = debug_backtrace();
    if (!isset($bt[$l])) throw new Exception("Cannot find called class -> stack level too deep.");
    if (!isset($bt[$l]['type'])) {
      throw new Exception ('type not set');
    }
    else switch ($bt[$l]['type']) {
      case '::':
        $lines = file($bt[$l]['file']);
        $i = 0;
        $callerLine = '';
        do {
          $i++;
          $callerLine = $lines[$bt[$l]['line']-$i] . $callerLine;
        } while (stripos($callerLine,$bt[$l]['function']) === false);
        preg_match('/([a-zA-Z0-9\_]+)::'.$bt[$l]['function'].'/',
        $callerLine,
        $matches);
        if (!isset($matches[1])) {
          // must be an edge case.
          throw new Exception ("Could not find caller class: originating method call is obscured.");
        }
        switch ($matches[1]) {
          case 'self':
          case 'parent':
            return get_called_class($bt,$l+1);
          default:
            return $matches[1];
        }
        // won't get here.
          case '->':
            switch ($bt[$l]['function'])
            {
              case '__get':
                // edge case -> get class of calling object
                if (!is_object($bt[$l]['object'])) throw new Exception ("Edge case fail. __get called on non object.");
                return get_class($bt[$l]['object']);
              default: return $bt[$l]['class'];
            }
              default: throw new Exception ("Unknown backtrace method type");
    }
  }
}

/**
 * Encodes as json and pretty-prints the resulting json data.
 * Posted by umbrae at gmail dot com on
 * http://www.php.net/manual/de/function.json-encode.php#80339
 *
 * @param mixed $data
 * @return string
 */
function json_format($data)
{
  $tab = "  ";
  $new_json = "";
  $indent_level = 0;
  $in_string = false;

  $json = json_encode($data);
  $len = strlen($json);

  for($c = 0; $c < $len; $c++)
  {
    $char = $json[$c];
    switch($char)
    {
      case '{':
      case '[':
        if(!$in_string)
        {
          $new_json .= $char . "\n" . str_repeat($tab, $indent_level+1);
          $indent_level++;
        }
        else
        {
          $new_json .= $char;
        }
        break;
      case '}':
      case ']':
        if(!$in_string)
        {
          $indent_level--;
          $new_json .= "\n" . str_repeat($tab, $indent_level) . $char;
        }
        else
        {
          $new_json .= $char;
        }
        break;
      case ',':
        if(!$in_string)
        {
          $new_json .= ",\n" . str_repeat($tab, $indent_level);
        }
        else
        {
          $new_json .= $char;
        }
        break;
      case ':':
        if(!$in_string)
        {
          $new_json .= ": ";
        }
        else
        {
          $new_json .= $char;
        }
        break;
      case '"':
        if($c > 0 && $json[$c-1] != '\\')
        {
          $in_string = !$in_string;
        }
      default:
        $new_json .= $char;
        break;
    }
  }

  return $new_json;
}

?>