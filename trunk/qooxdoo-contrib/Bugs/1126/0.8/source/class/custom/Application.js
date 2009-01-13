/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(custom/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "1126"
 */
qx.Class.define("custom.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */

      var scroll = new qx.ui.container.Scroll().set({
        height: 200,
        width: 400,
        scrollbarX: "off"
      });      
      this.getRoot().add(scroll, {left: 10, top: 10});
      
      var container = new qx.ui.container.Composite();
      scroll.add(container);
      container.setLayout(new qx.ui.layout.VBox());
      container.add(this.create_a_table());
      container.add(this.create_a_table());
    },
    
    create_a_table : function()
    {
      var model = new qx.ui.table.model.Simple ();
      model.setColumns([ "Column 1", "Column 2", "Column 3" ]);

      var custom = {
        tableColumnModel : function(obj) {
          return new qx.ui.table.columnmodel.Resize (obj);
        }
      };

      var table = new qx.ui.table.Table (model, custom).set ({
        height:150
      });

      table.setColumnVisibilityButtonVisible (false);
      table.setStatusBarVisible (false);

      data = [ ];
      for (var i = 1; i <= 50; i++) {
        data[i-1] = ([ ""+i, ""+(i*i), ""+(i*i*i) ]);
      }
      model.setData (data);

      return table;
    }    
  }
});
