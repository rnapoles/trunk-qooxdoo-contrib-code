<?php
require_once "qcl/session/Controller.php";
require_once "qcl/config/Db.php";

/**
 * Service class providing methods to get or set configuration
 * values
 */
class qcl_config_Controller
  extends qcl_session_Controller
{

  //-------------------------------------------------------------
  // public rpc methods
  //-------------------------------------------------------------

 function method_load( $params )
  {
    /*
     * arguments
     */
    list( $mask ) = $params;

    /*
     * response data class
     */
    $this->setResponseDataClass("qcl_config_LoadResponse");

    $configModel = qcl_config_Db::getInstance();
    $configMap   = $configModel->getAccessibleKeys( $mask );

    /*
     * response data
     */
    $this->set( 'keys',   array_keys( $configMap ) );
    $this->set( 'values', array_values( $configMap ) );

    return $this->response();
  }

  function method_set( $params )
  {


    /*
     * arguments
     */
    list( $key, $value ) = $params;

    /*
     * set key
     */
    $configModel = qcl_config_Db::getInstance();
    $configModel->set( $key, $value );

    /*
     * result
     */
    return true;
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