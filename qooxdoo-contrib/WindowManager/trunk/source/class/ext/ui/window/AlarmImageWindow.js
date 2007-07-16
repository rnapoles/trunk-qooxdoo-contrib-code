/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2006 - 2007

   Authors:
     * Simon Bull (sbull)

************************************************************************ */

/* ************************************************************************

#module(ui_window)

************************************************************************ */

/*
  A trivial window subclass to play with.
*/

qx.Class.define("ext.ui.window.AlarmImageWindow",
{
  extend : ext.ui.window.AbstractImageWindow,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(vCaption, vIcon, vWindowManager, vMinIcon) {
    ext.ui.window.AbstractImageWindow.call(this, vCaption, vIcon, vWindowManager, vMinIcon, "apps/accessories-tip");
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      DISPOSER
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @type member
     * @return {boolean | var} TODOC
     */
    dispose : function()
    {
      if (this.getDisposed()) {
        return true;
      }

      return ext.ui.window.AbstractImageWindow.prototype.dispose.call(this);
    }
  }
});
