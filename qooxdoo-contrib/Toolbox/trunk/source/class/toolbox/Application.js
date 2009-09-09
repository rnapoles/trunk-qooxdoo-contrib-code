/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Yuecel Beser (ybeser)

************************************************************************ */

/* ************************************************************************

#asset(toolbox/*)

************************************************************************ */

/**
 * The main application class.
 */
qx.Class.define("toolbox.Application",
{
  extend : qx.application.Standalone,




  /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

  members :
  {
    // overridden
    /**
     * This class is the start point of the toolbox.
     *
     * @return {void} 
     */
    main : function()
    {
      this.base(arguments);

      // Initialize the toolbox
      this.toolbox = new toolbox.gui.Toolbox;

      this.getRoot().add(this.toolbox, { edge : 0 });
    }
  },




  /*
      *****************************************************************************
         DESTRUCTOR
      *****************************************************************************
    */

  destruct : function() {
    this._disposeObjects("toolbox");
  }
});