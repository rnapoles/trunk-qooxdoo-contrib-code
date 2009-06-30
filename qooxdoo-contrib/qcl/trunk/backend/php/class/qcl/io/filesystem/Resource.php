<?php
/*
 * dependencies
 */
require_once "qcl/data/AbstractModel.php";

/**
 * Methods common to all filesystem resources
 */
class qcl_io_filesystem_Resource extends qcl_data_AbstractModel
{
  /**
   * The file resource path
   *
   * @var string
   * @var access private
   */
  var $_resourcePath;

  /**
   * The supported / allowed protocols
   */
  var $resourceTypes = array();

  /**
   * The currently used protocol
   */
  var $resourceType;

  /**
   * Constructor
   * @param string $resourcePath
   */
  function __construct ( $resourcePath )
  {
    /*
     * parent constructor takes care of controller
     */
    parent::__construct( &$controller );

    /*
     * check resource path
     */
    if ( ! $this->checkResourcePath( $resourcePath ) )
    {
      $this->raiseError("'$resourcePath' is not a valid resource for " . $this->className() );
    }

    /*
     * protocol
     */
    $this->resourceType = $this->getResourceType( $resourcePath );

    /*
     * save resource path
     */
    $this->setResourcePath( $resourcePath );
  }

  /**
   * Default setter for resource path
   * @param string $resourcePath
   * @return void
   */
  function setResourcePath( $resourcePath )
  {
    $this->_resourcePath = $resourcePath;
  }

  /**
   * Factory method which returns the correct class type according to
   * the protocol. Folder paths MUST end with a slash.
   * @static
   * @param string $resourcePath
   * @return qcl_io_filesystem_IResource
   */
  function createInstance( $resourcePath )
  {
    /*
     * check resource path.
     */
    $resourceType = qcl_io_filesystem_Resource::getResourceType( $resourcePath );
    switch ( $resourceType )
    {
      case "file":
        if ( substr($resourcePath,-1) == "/" )
        {
          require_once "qcl/io/filesystem/local/Folder.php";
          return new qcl_io_filesystem_local_Folder( $resourcePath );
        }
        else
        {
          require_once "qcl/io/filesystem/local/File.php";
          return new qcl_io_filesystem_local_File( $resourcePath );
        }
        break;

      default:
        if ( substr($resourcePath,-1) == "/" )
        {
          require_once "qcl/io/filesystem/remote/Folder.php";
          return new qcl_io_filesystem_remote_Folder( $resourcePath );
        }
        else
        {
          require_once "qcl/io/filesystem/remote/File.php";
          return new qcl_io_filesystem_remote_File( $resourcePath );
        }
        break;
    }

  }

  /**
   * Returns the prefix of the resource path as the protocol/ resource
   * type
   */
  function getResourceType( $resourcePath )
  {
    return substr( $resourcePath, 0, strpos($resourcePath,":") );
  }

  /**
   * Checks wether resource path is valid. Local files have to start
   * with "file://", remote files with a valid protocol such as "ftp://"
   * @param string $resourcePath
   * @retrun boolean
   */
  function checkResourcePath( $resourcePath )
  {
    $pos = strpos($resourcePath,":");
    return  in_array( substr($resourcePath, 0, $pos), $this->resourceTypes )
            && substr($resourcePath,$pos,3) == "://";
  }

  /**
   * Gets the file's resource path
   * @return string
   */
  function resourcePath()
  {
    return $this->_resourcePath;
  }

  /**
   * Returns the file path withoug leading protocol "foo://"
   * @param string[optional] $resourcePath The path to the resource, otherwise the one
   * of the current resource object
   * @return string
   */
  function filePath( $resourcePath=null )
  {
    $rp = either( $resourcePath, $this->resourcePath() );
    return substr( $rp, strpos($rp,":") +3 );
  }

  /**
   * Returns the directory in which the (given) resource is located.
   * @param string[optional] $resourcePath
   * @return string
   */
  function dirname( $resourcePath = null)
  {
    $rp  = either ( $resourcePath, $this->resourcePath() );
    return substr( $rp, 0, strrpos($rp, "/" ) );
  }

  /**
   * Returns the name of the (given) resource path without the containing directory
   * @param string[optional] $resourcePath
   * @return string
   */
  function basename( $resourcePath=null )
  {
    $rp  = either ( $resourcePath, $this->resourcePath() );
    $pos = strrpos( $rp, "/" );
    if ( $pos == strlen($rp)-1 )
    {
      $pos = strrpos(substr($rp,0,-1),"/");
    }
    if ( $pos !== false )
    {
      return substr($this->resourcePath(),$pos+1);
    }
    return $rp;
  }

  /**
   * Returns the extension of the (given) resource path, if any.
   * @param string[optional] $resourcePath
   * @return string
   */
  function extension()
  {
    $rp  = either ( $resourcePath, $this->resourcePath() );
    $bn  = $this->basename( $rp );
    $pos = strrpos( $bn, "." );
    if ( $pos !== false )
    {
      return substr($bn,$pos+1);
    }
    return "";
  }

  /**
   * Casting as string, returns the resource path
   * @return string
   */
  function toString()
  {
    return $this->resourcePath();
  }


}

?>