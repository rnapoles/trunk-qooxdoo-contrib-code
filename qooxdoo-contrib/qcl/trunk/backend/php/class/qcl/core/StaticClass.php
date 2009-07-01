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
require "qcl/core/Object.php";

class qcl_core_StaticClass extends qcl_core_Object
{

  /**
   * If the static class is used as a singleton,
   * it needs to implement its own getInstance()
   * method or call getInstance(__CLASS__)
   */
  function &getInstance($class=null)
  {
    if ( is_null($class) )
    {
      qcl_core_Object::raiseError("Static classes must implement their own getInstance() method or call 'getInstance(__CLASS__)'.");
    }
    return parent::getInstance($class);
  }
}
?>