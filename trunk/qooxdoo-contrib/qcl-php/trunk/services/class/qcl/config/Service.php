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

/**
 * Service class providing methods to get or set configuration
 * values
 */
class qcl_config_Service
  extends qcl_data_controller_Controller
{

  //-------------------------------------------------------------
  // API methods
  //-------------------------------------------------------------

 /**
  * Service method to load config data
  * @param string|null $filter Filter
  * @return qcl_config_LoadResult
  */
 function method_load( $filter=null )
  {

    /*
     * response data class
     */
    $this->setResultClass("qcl_config_LoadResult");

    $configModel = $this->getApplication()->getConfigModel();
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
   * @param string $key Key
   * @param mixed  $value Value
   * @return bool
   */
  function method_set( $key, $value )
  {

    /*
     * set key
     */
    $configModel = $this->getApplication()->getConfigModel();
    $configModel->setKey( $key, $value );

    /*
     * result
     */
    return true;
  }


  /**
   * export to xml
   */
  function exportXML()
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
      $keyNode->setCDATA( htmlentities($record['value']) );
    }
    $this->Info($doc->asXml());
  }

  function logFileSize()
  {
    $this->setResult("text", "Log file size: " . byteConvert( filesize( QCL_LOG_FILE) ) );
    return $this->result();
  }

  function deleteLogFile()
  {
    unlink( QCL_LOG_FILE );
    touch ( QCL_LOG_FILE );
    return $this->alert($this->tr("Log file deleted."));
  }

}
?>