/*
 *
 * Copyright:
 *   (c) 2009 by Derrell Lipman
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *   Derrell Lipman (derrell)
 *
 */
qx.Class.define("rpcexample.Url",
{
  extend : qx.core.Object,

  properties :
  {
    url :
    {
      init : "/services",
      event : "changeUrl"
    }
  }
});
