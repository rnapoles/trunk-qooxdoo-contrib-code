/* ************************************************************************

   qxe - qooxdoo extension framework

   Copyright:
     2010-2011 Cost Savers, http://www.cost-savers.net

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Stefan Andersson (sand)

************************************************************************ */

/**
 *
 */
qx.Mixin.define("qxe.application.Components",
{
  construct : function()
  {
    this.addListenerOnce("appear", function() {
      this.constructComponent();
      this.layoutComponent();
      this.loadData();
    }, this);
  }
});

