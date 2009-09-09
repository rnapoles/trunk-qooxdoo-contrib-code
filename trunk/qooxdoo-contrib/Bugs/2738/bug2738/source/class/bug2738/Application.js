/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2738/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2738"
 */
qx.Class.define("bug2738.Application",
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
      this.base(arguments);

      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      var container = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
      this.getRoot().add(container, {edge:10});
      
      var decorator = new qx.ui.decoration.Background();
      decorator.setBackgroundColor("blue");
      var header = new qx.ui.container.Composite(new qx.ui.layout.HBox());
      header.set({
        height : 100,
        width  : 600,
        decorator : decorator
      });
      
      var scroller = new qx.ui.container.Scroll();
      var vBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
      vBox.set({
        height: 800
      });
      
      var iframe = new qx.ui.embed.Iframe("http://qooxdoo.org");
      iframe.set({
        height : 600
      })
      vBox.add(iframe);
      
      var dummyBox = new qx.ui.container.Composite(new qx.ui.layout.HBox());
      dummyBox.set({
        height: 600,
        decorator : decorator
      });
      vBox.add(dummyBox);
      
      scroller.add(vBox);
      
      container.add(header);
      container.add(scroller);
    }
  }
});
