<?php
require_once "qcl/mvc/Controller.php";
require_once "qcl/config/Db.php";

/**
 * Service class providing methods to get or set configuration
 * values
 */
class qcl_config_Services extends qcl_mvc_Controller
{

  //-------------------------------------------------------------
  // public rpc methods
  //-------------------------------------------------------------

 function method_load( $params )
  {

    $configModel = qcl_config_Db::getInstance();

    return array(
      'keys'    => array_keys( $configMap ),
      'values'  => array_values( $configMap )
    );
  }

  function method_get( $params )
  {
    list( $key ) = $params;
    return array(
      'value'  => $_SESSION['config'][$key]
    );
  }

  function method_set( $params )
  {
    if ( ! isset( $_SESSION['usersession'] ) )
    {
      trigger_error("No usersession!");
    }
    if ( ! in_array( "manageConfig", $_SESSION['usersession']['permissions'] ) )
    {
      trigger_error("You don't have permission to change the configuration!");
    }

    list( $key, $value ) = $params;
    $_SESSION['config'][$key] = $value;
    return array(
      'result'  => true
    );
  }


  /**
   * export to xml
   */
  function method_exportXML()
  {
    /*
     * models
     */
    $configModel =& $this->getConfigModel();

    require_once("qcl/xml/model.php");
    $path = "../var/tmp/config.xml";
    unlink($path);

    $xmlModel = new qcl_xml_model($this);
    $xmlModel->load($path);
    $doc =& $xmlModel->getDocument();

    $keysNode =& $doc->addChild("keys");
    foreach( $configModel->getAll() as $record )
    {
      $keyNode =& $keysNode->addChild("key");
      foreach( $record as $key => $value )
      {
        if( $key=="id" )
        {
          continue;
        }
        elseif ( $key == "namedId" )
        {
          $keyNode->addAttribute("name",$record['namedId']);
        }
        elseif ( $key != "value" && $value )
        {
          $keyNode->addAttribute($key,$value);
        }
      }
      $keyNode->setCDATA(htmlentities($record['value']));
    }
    $this->Info($doc->asXml());
  }

  function method_logFileSize()
  {
    $this->set("text", "Log file size: " . byteConvert( filesize( QCL_LOG_FILE) ) );
    return $this->response();
  }

  function method_deleteLogFile()
  {
    unlink( QCL_LOG_FILE );
    touch ( QCL_LOG_FILE );
    return $this->alert($this->tr("Log file deleted."));
  }

}
?>