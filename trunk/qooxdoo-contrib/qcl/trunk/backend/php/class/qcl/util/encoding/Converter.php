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
require_once "qcl/data/AbstractModel.php";

/**
 * class to convert from one text encoding to another
 */
class qcl_util_encoding_Converter extends qcl_data_AbstractModel
{
  var $converter_cmd = "";

	//-------------------------------------------------------------
  // API methods
  //-------------------------------------------------------------

  /**
   * converts from one encoding to another one, using available
   * php function
   * @todo extend to allow usage of external libraries
   * @param string $src_encoding
   * @param string $tgt_encoding
   * @param string $string
   * @return string
   */
	function convert ($src_encoding, $tgt_encoding, $string)
	{
    if ( function_exists ( "iconv" ) )
    {
      return iconv($src_encoding, $tgt_encoding, $string);
    }
    elseif ( function_exists ( "mb_convert_encoding" ) )
    {
      return mb_convert_encoding($string, $tgt_encoding, $src_encoding);
    }
    else
    {
      $this->raiseError("No character conversion library found in your PHP installation. Please upgrade.");
    }
	}

}
?>