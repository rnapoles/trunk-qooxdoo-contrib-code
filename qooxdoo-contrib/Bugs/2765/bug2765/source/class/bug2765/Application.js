/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2765/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2765"
 */
qx.Class.define("bug2765.Application",
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

      var container = new qx.ui.container.Scroll().set({
         width : 400,
         height : 100
       });

      var doc = this.getRoot();
      doc.add(container, {left: 50, top: 10});

      var content = new qx.ui.container.Composite().set({
        minHeight: 310,
        maxHeight: 310,
        minWidth : 400,
        maxWidth : 400
      });
      content.setLayout(new qx.ui.layout.Grow);
      var label = new qx.ui.basic.Label("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,");
      label.setRich(true);
      content.add(label);
      container.add(content);

      var toggleButton = new qx.ui.form.ToggleButton("Change container size");
      
      toggleButton.addListener("changeValue", function(e){
        if (e.getData() === true)
        {
          container.set({
            minWidth: 55,
            maxWidth: 55,
            minHeight: 50,
            maxHeight: 50
          });
        }
        else
        {
          container.set({
            minWidth : 400,
            minHeight : 100,
            maxWidth : 400,
            maxHeight : 100
          });
        }
      }, this);
      
      doc.add(toggleButton, {left: 50, top: 140});

      var spinnerX = new qx.ui.form.Spinner(20, 400, 600);
      var spinnerY = new qx.ui.form.Spinner(20, 100, 200);

      doc.add(spinnerX, {left: 250, top: 140});
      doc.add(spinnerY, {left: 350, top: 140});

      spinnerX.addListener("changeValue", function(e) {
        container.set({
          minWidth : e.getData(),
          maxWidth : e.getData()
        })
      });

      spinnerY.addListener("changeValue", function(e) {
        container.set({
          minHeight : e.getData(),
          maxHeight : e.getData()
        })
      });

    }
  }
});
