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
require_once "qcl/core/Object.php";

/**
 * Base class for mixins. Makes sure this is not used as a
 * standard class.
 */
class qcl_core_Mixin extends qcl_core_Object
{

  /**
   * constructor. Serves only to throw an error if called, since
   * mixins cannot not have constructors in php
   */
  function __construct()
  {
    trigger_error(get_class($this) . " is a mixin and cannot be used as a standard class.");
  }

}

?>