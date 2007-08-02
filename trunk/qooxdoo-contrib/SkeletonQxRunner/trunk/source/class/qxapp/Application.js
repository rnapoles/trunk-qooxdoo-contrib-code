/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Thomas Herchenroeder (thron7)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/* ************************************************************************

#module(qxapp)
#resource(qxapp.css:css)
#resource(qxapp.image:image)

#embed(qx.icontheme/16/*)
#embed(qxapp.image/*)
#embed(qxapp.css/*)

************************************************************************ */

/**
 * The main application class. Provides the application's main() function, which
 * instantiates the worker class proper, AppFrame. All application logic is there.
 */
qx.Class.define("qxapp.Application",
{
  extend : qx.application.Gui,




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * TODOC
     *
     * @type member
     * @return {void}
     */
    main : function()
    {
      this.base(arguments);

      // Define alias for custom resource path
      qx.io.Alias.getInstance().add("qxapp", qx.core.Setting.get("qxapp.resourceUri"));

      // Include CSS files
      qx.html.StyleSheet.includeFile(qx.io.Alias.getInstance().resolve("qxapp/css/style.css"));
      qx.html.StyleSheet.includeFile(qx.io.Alias.getInstance().resolve("qxapp/css/sourceview.css"));

      // Initialize the viewer
      this.viewer = new qxapp.AppFrame;
      this.viewer.addToDocument();

      // Load data file
      qx.client.Timer.once(this._load, this, 0);
    },


    /**
     * TODOC
     *
     * @type member
     * @return {void}
     */
    _load : function() {
      this.viewer.dataLoader();
    }
  },




  /*
  *****************************************************************************
     SETTINGS
  *****************************************************************************
  */

  settings : { "qxapp.resourceUri" : "./resource" },




  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function() {
    this._disposeObjects("viewer");
  }
});
