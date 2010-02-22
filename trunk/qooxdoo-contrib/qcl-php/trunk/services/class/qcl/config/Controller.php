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
require_once "qcl/access/SessionController.php";
require_once "qcl/config/Db.php";

/**
 * Service class providing methods to get or set configuration
 * values
 */
class qcl_config_Controller
  extends qcl_data_controller_Controller
{

  //-------------------------------------------------------------
  // public rpc methods
  //-------------------------------------------------------------

 /**
  * Service method to load config data
  * @param string|null $params[0] Filter
  * @return qcl_config_LoadResult
  */
 function method_load( $params )
  {
    /*
     * arguments
     */
    list( $filter ) = $params;

    /*
     * response data class
     */
    $this->setResultClass("qcl_config_LoadResult");

    $configModel = qcl_config_Db::getInstance();
    $configMap   = $configModel->getAccessibleKeys( $filter );

    /*
     * response data
     */
    $this->setResult( 'keys',   array_keys( $configMap ) );
    $this->setResult( 'values', array_values( $configMap ) );

    return $this->result();
  }

  /**
   * Service method to set a config value
   * @param string $params[0] Key
   * @param mixed  $params[1] Value
   * @return bool
   */
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
    $configModel = $this->getConfigModel();

    require_once("qcl/data/xml/model.php");
    $path = "../var/tmp/config.xml";
    unlink($path);

    $xmlModel = new qcl_data_xml_model($this);
    $xmlModel->load($path);
    $doc = $xmlModel->getDocument();

    $keysNode = $doc->addChild("keys");
    foreach( $configModel->getAll() as $record )
    {
      $keyNode = $keysNode->addChild("key");
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
    $this->setResult("text", "Log file size: " . byteConvert( filesize( QCL_LOG_FILE) ) );
    return $this->result();
  }

  function method_deleteLogFile()
  {
    unlink( QCL_LOG_FILE );
    touch ( QCL_LOG_FILE );
    return $this->alert($this->tr("Log file deleted."));
  }

}
?>