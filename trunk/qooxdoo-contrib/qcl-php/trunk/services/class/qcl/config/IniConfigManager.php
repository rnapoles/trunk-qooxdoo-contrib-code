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
 * Manages initial configuration data from the php
 */
class qcl_config_IniConfigManager
  extends qcl_core_Object
{
  /**
   * The intial configuration values, saved in the config.ini.php file
   * @var array
   */
  private $iniConfig = null;


  /**
   * Reads initial configuration. looks for service.ini.php file in the
   * directory of the topmost including script.
   * @todo re-implement old behavior that services can ovverride individual
   * settings by service directory
   **/
  public function getIniConfig()
  {
    /*
     * return config array if already parsed
     */
    if ( is_array( $this->iniConfig ) )
    {
      return $this->iniConfig;
    }

    /*
     * file containing intial configuration
     */
    $app = $this->getApplication();
    $appClass = new String( $app->className() );
    $ini_path = dirname( $appClass->replace("/_/","/") );
    do
    {
      $ini_path = $ini_path.  "/" . QCL_SERVICE_CONFIG_FILE;
      if ( qcl_file_exists( $ini_path) )
      {
        break;
      }
      $ini_path = dirname( dirname( $ini_path ) );
    }
    while( $ini_path );
    if ( ! $ini_path )
    {
      $this->warn( sprintf(
        "No '%s' file found for '%s'",
        QCL_SERVICE_CONFIG_FILE, $this->getApplication()->className()
      ) );
      return array();
    }

    $ini_path = qcl_realpath( $ini_path );

    /*
     * PHP 5.3
     */
    if ( defined("INI_SCANNER_RAW") )
    {
      $this->iniConfig = parse_ini_file ( $ini_path, true, INI_SCANNER_RAW );
    }

    /*
     * PHP < 5.3
     */
    else
    {
      $this->iniConfig = parse_ini_file ( $ini_path, true );
    }

    return $this->iniConfig;
  }


  /**
   * Returns a configuration value of the pattern "foo.bar.baz"
   * This retrieves the values set in the service.ini.php file.
   */
  public function getIniValue( $path )
  {
    /*
     * if called recursively
     */
    if ( is_array($path) )
    {
      $path= $path[1];
    }

    $parts   = explode(".",$path);
    $value   = $this->getIniConfig();

    /*
     * traverse array
     */
    while( is_array($value) and $part = array_shift($parts) )
    {
      $value = $value[$part];
    }

    /*
     * expand strings
     */
    if ( is_string( $value ) )
    {
      $value = trim( preg_replace_callback(
        '/\$\{([^}]+)\}/',
        array($this,"getIniValue"), $value
      ) );
    }

    //$this->debug("Ini value '$path'= '$value'");

    return $value;
  }

  /**
   * Returns an array of values corresponding to the given array of keys from the
   * initialization configuration data.
   * @param array $arr
   * @return array
   */
  public function getIniValues( $arr )
  {
    if ( ! is_array( $arr ) )
    {
      $this->raiseError("Invalid parameter - array expected");
    }
    $ret = array();
    foreach( $arr as $key )
    {
      $ret[] = $this->getIniValue( $key );
    }
    return $ret;
  }

}
?>