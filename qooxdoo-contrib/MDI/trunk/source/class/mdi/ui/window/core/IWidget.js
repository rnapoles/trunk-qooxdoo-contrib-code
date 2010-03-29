/* ************************************************************************

   Copyright:


   License:

   Authors:
     Simon Bull

************************************************************************ */

/* ************************************************************************

#asset(mdi/*)

************************************************************************ */

/**
 *
 * This is the minimum interface which must be implemented by all widgets
 * which represent logical window Proxies.
 *
 * This interface is implemented by DockItem and DesktopItem, for
 * example.
 */
qx.Interface.define("mdi.ui.window.core.IWidget",
{


  members :
  {


    /**
     * Set the logical window Model which this widget represents.
     *
     * @type member
     * @param model {mdi.ui.window.Model} A Model instance which this
     *        rendered widget represents.
     * @return {void}
     */
    setModel : function(model)
    {
        this.assertInterface(model, mdi.ui.window.Model);
    },


    /**
     * Get the logical window Model which this widget represents.
     *
     * @type member
     * @return {mdi.ui.window.Model} A Model instance which this
     *        rendered widget represents.
     */
    getModel : function() {}

  }
});