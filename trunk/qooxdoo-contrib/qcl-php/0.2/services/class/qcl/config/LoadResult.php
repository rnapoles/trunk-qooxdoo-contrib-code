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
require_once "qcl/data/Result.php";

/**
 * @todo rename to qcl_config_LoadResult
 *
 */
class qcl_config_LoadResult
  extends qcl_data_Result
{
   /**
    * The config keys
    * @var array
    */
   var $keys;

   /**
    * The config values
    * @var array
    */
   var $values;

}
?>