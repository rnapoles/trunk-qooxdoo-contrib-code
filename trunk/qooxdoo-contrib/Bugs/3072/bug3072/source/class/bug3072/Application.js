/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug3072/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug3072"
 */
qx.Class.define("bug3072.Application",
{
  extend : qx.application.Inline,



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
      this.base(arguments);

      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      var htmlElement = document.getElementById("isle");
      var inlineIsle = new qx.ui.root.Inline(htmlElement, true, true);
      inlineIsle.setLayout(new qx.ui.layout.VBox);
      
      var container = new qx.ui.container.Composite(new qx.ui.layout.HBox);

      // Create a button
      var button1 = new qx.ui.form.Button("First Button", "bug3072/test.png");
      button1.setAllowStretchY(false);
      button1.setToolTipText("ToolTip text");
      container.add(button1);
      
      // spacer
      var spacer = new qx.ui.core.Spacer();
      container.add(spacer, { flex: 1 });
      
      // create a date chooser component
      var dateChooser = new qx.ui.control.DateChooser;
      container.add(dateChooser);
      
      inlineIsle.add(container);

      // Add an event listener
      button1.addListener("execute", function(e) {
        alert("I'm a button inside an inline root widget!\n " + 
              "I nicely fit into the page flow.");
      });
      
      
      /*
      -------------------------------------------------------------------------
        ADD THE WIDGETS WITH ABSOLUTE POSITIONING
      -------------------------------------------------------------------------
      */
      
      // Create a button
      var button2 = new qx.ui.form.Button("First Button", "bug3072/test.png");
      button2.setToolTipText("ToolTip text");
      
      // Add button to document at fixed coordinates
      this.getRoot().add(button2, {left: 150, top: 350});
      
      // Add an event listener
      button2.addListener("execute", function(e) {
        alert("I'm an absolute positioned button!\n " + 
              "I overlay existing content.");
      });
    }
  }
});
