/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Thomas Herchenroeder (thron7)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/* ************************************************************************

#module(buildtool)
#resource(buildtool.css:buildtool/css)
#resource(buildtool.image:buildtool/image)

#embed(qx.icontheme/16/*)
#embed(buildtool.image/*)
#embed(buildtool.css/*)

#asset(qx/icon/Oxygen/16/*)
#asset(buildtool/image/*)
#asset(buildtool/css/*)

************************************************************************ */

/**
 * The main application class.
 */
qx.Class.define("buildtool.Application",
{
  extend : qx.application.Abstract,




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
     * @return {void}
     */
    main : function()
    {
      this.base(arguments);

      // Include CSS files
      qx.html.StyleSheet.includeFile("buildtool/css/style.css");

      // Initialize the viewer
      this.viewer = new buildtool.AppFrame;
      this.viewer.addToDocument();

      // Load data file
      qx.event.Timer.once(this._load, this, 0);
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    _load : function() {
      this.viewer.dataLoader();
    }
  },




  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function() {
    this._disposeObjects("viewer");
  }
});
