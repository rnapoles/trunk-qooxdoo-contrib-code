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
 * An mdi.ui.window.Model is a light-weight model of a Window instance.
 * It is not a Widget, only an in-memory object.
 *
 * A single Model instance is referred to by each rendered Widget that
 * represents the logical window which a Model models.  For example, A
 * DesktopItem (the Window widget itself), a DockItem, and all other
 * visualisations of the same logical window will all refer to one Model
 * instance.
 *
 * User interaction with any of the possible representations of a window are
 * always redirected to the WindowManager via the Model.  Thus, invoking any
 * window action via any one window representation will be reflected in all
 * of its rendered representations.
 *
 */
qx.Class.define("mdi.ui.window.Model",
{

    extend : qx.core.Object,

    implement : [mdi.ui.window.core.IBehaviour],


    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */


    construct : function()
    {
      this.base(arguments);
    },


    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */


    properties :
    {

      // The name of a "type" of Windows.  This can be any name the developer
      // chooses, but should be unique for each logical "type" of Window.
      // If it is not unique, WindowManager will not be able to distinguish
      // instances of one type from instances of another.
      type :
      {
          check : "String",
          init : "Untyped"
      },

      // The caption to display.
      caption :
      {
          check : "String",
          init : "Caption"
      },

      // The icon to display.
      icon :
      {
          check : "String",
          init : null
      },

      // True is WindowManager should only allow one instance of this type
      // of Window to exist at a time.  Otherwise false.
      singleton :
      {
          check : "Boolean",
          init : false
      },

      // True if WindowManager should make instances of this type of
      // Window modal.  Otherwise false.
      modal :
      {
          check : "Boolean",
          init : false
      },

      // The initial height of the physical Window widget in pixels.
      initialHeight :
      {
          check : "Number",
          init : 300
      },

      // The initial width of the physical Window widget in pixels.
      initialWidth :
      {
          check : "Number",
          init : 400
      },

      /**
       * The initial top of the physical Window widget in screen pixels.
       * Note that this value will only be used if the Desktop's positioning
       * strategy cannot determine the position.  This will typically be
       * the case in the absence of a positioning strategy.
       */
      initialTop :
      {
          check : "Number",
          init : 100
      },


      /**
       * The initial left of the physical Window widget in screen pixels.
       * Note that this value will only be used if the Desktop's positioning
       * strategy cannot determine the position.  This will typically be
       * the case in the absence of a positioning strategy.
       */
      initialLeft :
      {
          check : "Number",
          init : 100
      }
    },


    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */


    members :
    {

      /**
       * Open all representations of this Model.
       *
       * @type member
       * @return {void}
       */
      open : function()
      {
          this.getWindowManager().open();
      },


      /**
       * Select all representations of this Model.
       *
       * @type member
       * @return {void}
       */
      select : function()
      {
          this.getWindowManager().select();
      },


      /**
       * Minimise all representations of this Model.
       *
       * @type member
       * @return {void}
       */
      minimise : function()
      {
          this.getWindowManager().minimise();
      },


      /**
       * Maximise all representations of this Model.
       *
       * @type member
       * @return {void}
       */
      maximise : function()
      {
          this.getWindowManager().maximise();
      },


      /**
       * Restore all representations of this Model.
       *
       * @type member
       * @return {void}
       */
      restore : function()
      {
          this.getWindowManager().restore();
      },


      /**
       * Close all representations of this Model.
       *
       * @type member
       * @return {void}
       */
      close : function()
      {
          this.info("close()");
          this.getWindowManager().close();
      },


      /*
      *****************************************************************************
         DESTRUCTOR
      *****************************************************************************
      */


      /**
       * Destructor. This is responsible for freeing up all the memory reserved by the object.
       * There are 4 methods to use to dispose memory:
       *
       * _disposeFields:  Supports multiple arguments. Deleting each key name given from the instance.
       *                  This is the fastest of the three methods. It basically does the same as the
       *                  nullify used in qooxdoo 0.6.
       * _disposeObjects: Supports multiple arguments. Dispose the objects (qooxdoo objects) under
       *                  each key and finally delete the key from the instance like _disposeFields.
       * _disposeArray:*   Disposes the array under the given key, but disposes all entries in this
       *                  array first. It must contain instances of qx.core.Object only.
       * _disposeMap:*     Disposes the map under the given key, but disposes all entries in this map
       *                  first. It must contain instances of qx.core.Object only.
       *
       * * Only Qx 0.8+. For Qx 0.7 use _disposeObjectDeep()
       */
      destruct : function()
      {
        //this._disposeObjects("__renderers");
      }

    }

});
