/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug1786/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug1786"
 */
qx.Class.define("bug1786.Application",
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

      // Document is the application root
      var doc = this.getRoot();

      // Create a button
      var label = new qx.ui.basic.Label("foobar?");
      label.setSelectable(true);


      var htmlembed = new qx.ui.embed.Html("<p>foobar!</p>");
      htmlembed.setSelectable(true);


      var box = new qx.ui.container.Composite(new qx.ui.layout.VBox);
      box.set({
        selectable : false,
        decorator : "main"
      });
      
      var htmllabel = new qx.ui.embed.Html("<i>rich label</i>");
      htmllabel.setSelectable(true);
      box.add(htmllabel);

      var label2 = new qx.ui.basic.Label("label");
      label2.setSelectable(true);
      box.add(label2);

			
      doc.add(label, {left: 100, top: 50});
      doc.add(htmlembed, {left: 100, top: 150});
      doc.add(box, {left: 300, top: 50});
      
    }
  }
});
