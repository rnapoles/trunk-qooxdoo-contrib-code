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

/**
 * The base class for all classes that are used as the result of a
 * service method. Works as a "marker interface" and contains the
 * serialization method toArray().
 * @todo When fully upgrading to PHP5, use interface rather than
 * base class.
 */
class qcl_data_Result
  extends qcl_core_BaseClass {}
?>