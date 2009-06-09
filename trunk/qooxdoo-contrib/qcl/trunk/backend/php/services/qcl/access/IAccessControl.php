<?php
/*
 * qooxdoo - the new era of web development
 *
 * http://qooxdoo.org
 *
 * Copyright:
 *   2009 Christian Boulanger
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
 * Interface for classes that provide access control
 *
 */
interface qcl_access_IAccessControl
{
 
  /**
   * Main interface method for controlling access.
   * @param string $method 
   * @return bool
   */
  function allowAccess( $method );

}
?>