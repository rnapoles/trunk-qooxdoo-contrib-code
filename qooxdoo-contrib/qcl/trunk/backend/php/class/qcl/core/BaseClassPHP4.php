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
 * Base class for PHP4, providing
 * - __construct() and __destruct() support
 * - method overloading for get, set and findBy
 * - mixin support
 * @author Christian Boulanger (cboulanger)
 */
class qcl_core_BaseClass
{

  /**
   * PHP4 __construct()
   * taken from https://trac.cakephp.org/browser/trunk/cake/1.2.x.x/cake/libs/object.php
   *
   * A hack to support __construct() on PHP 4
   * Hint: descendant classes have no PHP4 class_name() constructors,
   * so this constructor gets called first and calls the top-layer __construct()
   * which (if present) should call parent::__construct()
   *
   */
  function qcl_core_BaseClass()
  {
    /*
     * call top-level __construct() method
     */
    $args = func_get_args();
    if ( method_exists( $this, '__destruct') )
    {
      register_shutdown_function (array(&$this, '__destruct'));
    }
    if (method_exists($this, '__construct'))
    {
      call_user_func_array(array(&$this, '__construct'), $args);
    }

    /**
     * internal cache for classes that have been mixed in.
     * Only needed if aggregate_info function does not exist. Is not
     * declared as class variable so it doesn't show up when serialized
     */
    $this->_mixinlookup = array();

    /*
     * turn on overloading
     */
    overload( get_class($this) );
  }

  /**
   * class destructor.  This is the top-most __destruct method, currently
   * just an empty stub
   */
  function __destruct() {}

  /**
   * Checks if class has this property
   * @param $property
   * @return unknown_type
   */
  function has( $property )
  {
    return in_array( $property, array_keys( get_object_vars( $this ) ) );
  }

  /**
   * Checks if property exists and throws an error if not
   * @param $property
   * @return unknown_type
   */
  function check( $property )
  {
    if ( ! $this->has( $property) )
    {
      trigger_error("Class " . get_class($this) . " has no property '$property'" );
    }
  }

  /**
   * Generic getter for properties
   * @param $property
   * @return unknown_type
   */
  function get( $property )
  {
    $this->check( $property );
    return $this->$property;
  }

  /**
   * Generic setter for properties. Behaves like qooxdoo setter.
   * @param string|array $property If string, set the corresponding property to $value.
   *   If array, assume it is a map and set each key-value pair.
   * @param mixed $value
   * @return unknown_type
   * @todo type check
   */
  function set( $property, $value=null )
  {
    if ( is_array($property) )
    {
      foreach ( $property as $key => $value )
      {
        $this->set( $key, $value );
      }
      return;
    }
    $this->check( $property );
    $this->$property = $value;
  }

  /**
   * Method called when called method does not exist. (PHP4)
   * This will check whether method name is
   *
   * - getXxx or setXxx and then call getProperty("xxx")
   *    or setProperty("xxx", $arguments[0]).
   * - findByXxx to call findBy("xxx",...)
   *
   * Otherwise, raise an error.
   * @param string $method  Method name
   * @param array  $arguments Array or parameters passed to the method
   */
  function __call( $method, $arguments, &$result)
  {

    $accessorMethodExists = false;

    $accessor = strtolower( substr( $method, 0, 3 ) );
    $property = strtolower( substr( $method, 3 ) );

    if ( $accessor == "set" and method_exists( $this,"set" ) )
    {
      array_unshift( $arguments, $property);
      $result = call_user_func_array(array(&$this, "set" ), $arguments);
      $accessorMethodExists = true;
    }
    elseif ( $accessor == "get" and method_exists( $this,"get" ))
    {
      array_unshift( $arguments, $property);
      $result = call_user_func_array(array(&$this, "get" ), $arguments);
      $accessorMethodExists = true;
    }

    $accessor = strtolower( substr( $method, 0, 6 ) );
    $property = strtolower( substr( $method, 6 ) );

    /*
     * findBy...
     */
    if ( $accessor == "findby" and method_exists( $this,"findBy" ) )
    {
      array_unshift( $arguments, $property);
      $result = call_user_func_array(array(&$this, "findBy" ), $arguments);
      $accessorMethodExists = true;
    }

    /*
     * raise error if method does not exist
     */
    if ( ! $accessorMethodExists )
    {
      trigger_error("Overload error: Unknown method " . get_class($this) . "::$method().");
    }

    /*
     * PHP 4: return value is in &$result
     */
    return true;

  }


  /**
   * include mixin methods from other classes.
   * @return void
   * @param $classname class name
   */
  function mixin ( $classname )
  {
    /*
     * load class file
     */
    if ( ! class_exists( $classname ) )
    {
      $this->includeClassfile($classname);
    }

    /*
     * check class
     */
    if ( ! class_exists ( $classname ) )
    {
      $this->raiseError("Class $classname does not exist and cannot be loaded.");
    }


    /*
     * if aggregate_info function does not exist
     * in the php installation, maintain manual cache
     */
    if ( ! function_exists("aggregate_info") )
    {
      /*
       * get methods of class
       */
      $methods = get_class_methods( $classname );
      if ( ! count( $methods) )
      {
        $this->raiseError("Class $classname has no methods.");
      }

      /*
       * register class methods
       */
      foreach( $methods as $method )
      {
        if ( ! method_exists( $this, $method ) )
        {
          $this->_mixinlookup[ strtolower($method) ] = strtolower($classname);
        }
      }
    }

    /*
     * aggregate methods
     */
    aggregate( $this, $classname);
  }

  /**
   * Checks whether a class has been included as mixin
   * @param string $classname
   * @return bool
   */
  function hasMixin ( $classname )
  {
    if ( function_exists("aggregate_info")  )
    {
      $aggregateInfo = aggregate_info($this);
      return isset( $aggregateInfo[strtolower($classname)] );
    }
    return in_array( strtolower($classname), $this->_mixinlookup );
  }

  /**
   * Checks whether a method exists from a mixin
   * @param $method
   * @return bool
   */
  function hasMixinMethod( $method )
  {
    if ( function_exists("aggregate_info")  )
    {
      $aggregateInfo = aggregate_info($this);
      foreach ( $aggregateInfo as $classname => $info )
      {
        if ( in_array(strtolower($method), $aggregateInfo[strtolower($classname)]['methods'] ) ) return true;
      }
      return false;
    }
    return isset( $this->_mixinlookup[strtolower($method)] );
  }

}

/**
 * "clone" function put into eval to avoid errors
 * in PHP 5-editors.
 */
eval('
function clone($object)
{
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


  /**
   * Serializes the object to an array
   * @return array
   * @todo deep serialization, i.e. convert objects in member variables
   */
  function toArray()
  {
    $result = array();
    foreach( get_object_vars( $this ) as $property => $value )
    {
      if ( $property[0] != "_" )
      {
        $result[$property] = $value;
      }
    }
    return $result;
  }
}

if ( !function_exists('sys_get_temp_dir'))
{
  function sys_get_temp_dir() {
    if (!empty($_ENV['TMP'])) { return realpath($_ENV['TMP']); }
    if (!empty($_ENV['TMPDIR'])) { return realpath( $_ENV['TMPDIR']); }
    if (!empty($_ENV['TEMP'])) { return realpath( $_ENV['TEMP']); }
    $tempfile=tempnam(uniqid(rand(),TRUE),'');
    if (file_exists($tempfile)) {
    unlink($tempfile);
    return realpath(dirname($tempfile));
    }
    else
    {
      trigger_error("Cannot find system temporary directory.");
    }
  }
}
?>