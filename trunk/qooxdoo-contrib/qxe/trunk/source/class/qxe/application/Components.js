/* ************************************************************************

   Mobile Post - Registration

   Copyright:
     2010-2012 PerEvoTech, http://www.perevotech.com

   License:
     Commercial: http://www.perevotech.com/License.html

   Authors:
     * Kent Olsson (kols)

************************************************************************ */

/**
 *
 */
qx.Mixin.define("qxe.application.Components",
{
  construct : function()
  {
    this.base(arguments);

    this.addListenerOnce("appear", function() {
      this.constructComponent();
      this.layoutComponent();
//      this.loadData();
    }, this);
  }
});

