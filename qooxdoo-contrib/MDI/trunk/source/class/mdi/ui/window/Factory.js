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
 * A window Factory is a singleton which contains a collection of factory
 * methods which return various pre-configued "types" of mdi.ui.window.Model.
 *
 * This is the correct place to defined new "types" of window Model.
 */
qx.Class.define("mdi.ui.window.Factory",
{
  extend : qx.core.Object,

  type : "singleton",


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {


    /**
     * Get a Model for a named type of window Model.
     *
     * This is a convenience method which delegates to other factory methods.
     *
     * @type member
     * @param type {String} The desired type of Model.
     * @return {mdi.ui.window.Model} A Model of the desired type if this
     *         factory is capable of constructing such a Model, else throw
     *         an error if it cannot.
     */
    getWindowModel : function(type)
    {
        switch (type)
        {
            case "explorer" :
                return this.getExplorerWindowModel();
                break;

            case "navigator" :
                return this.getNavigatorWindowModel();
                break;

            case "viewer" :
                return this.getViewerWindowModel();
                break;

            default :
                throw new Error("No factory method for type=" + type);
                break;
        }
    },


    /**
     * Get a new navigator window Model.
     *
     * @type member
     * @return {mdi.ui.window.Model} A navigator window Model.
     */
    getNavigatorWindowModel : function()
    {
        return new mdi.ui.window.Model().set(
            {
                "type"          : "navigator",
                "caption"       : "Navigator",
                "icon"          : "icon/16/categories/internet.png",
                "shortcut"      : "Ctrl+N",
                "singleton"     : false,
                "modal"         : false,
                "initialHeight" : 300,
                "initialWidth"  : 400,
                "initialTop"    : 100,
                "initialLeft"   : 100
            });
    },


    /**
     * Get a new viewer window Model.
     *
     * @type member
     * @return {mdi.ui.window.Model} A viewer window Model.
     */
    getViewerWindowModel : function()
    {
        return new mdi.ui.window.Model().set(
            {
                "type"          : "viewer",
                "caption"       : "Viewer",
                "icon"          : "icon/16/devices/camera-photo.png",
                "shortcut"      : "Ctrl+V",
                "singleton"     : false,
                "modal"         : false,
                "initialHeight" : 300,
                "initialWidth"  : 400,
                "initialTop"    : 100,
                "initialLeft"   : 100
            });
    },


    /**
     * Get a new explorer window Model.
     *
     * @type member
     * @return {mdi.ui.window.Model} A explorer window Model.
     */
    getExplorerWindowModel : function()
    {
        return new mdi.ui.window.Model().set(
            {
                "type"          : "explorer",
                "caption"       : "Explorer",
                "icon"          : "icon/16/mimetypes/office-spreadsheet.png",
                "shortcut"      : "Ctrl+E",
                "singleton"     : false,
                "modal"         : false,
                "initialHeight" : 300,
                "initialWidth"  : 400,
                "initialTop"    : 100,
                "initialLeft"   : 100
            });
    }

  }
});
