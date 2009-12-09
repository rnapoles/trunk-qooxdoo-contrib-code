/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug3196/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug3196"
 */
qx.Class.define("bug3196.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    main : function()
    {
      this.base(arguments);

      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      var doc = this.getRoot();
      var vbox_layout = new qx.ui.layout.VBox().set({
        spacing : 10
      });
      this.vbox = new qx.ui.container.Composite(vbox_layout).set({
        paddingTop  : 10,
        paddingBottom  : 10
      });
      var layout = new qx.ui.layout.VBox().set({
        spacing : 10,
        separator: "separator-vertical"
      });
      this.container = new qx.ui.container.Composite(layout).set({
        paddingTop  : 10,
        paddingBottom  : 10
      });

      this.button = new qx.ui.form.Button("add elements");
      this.button.addListener("execute",function(e){
        for(var i=0;i<5;i++){
          var c = new qx.ui.container.Composite(new qx.ui.layout.VBox());
          c.add(new qx.ui.basic.Label("I'm the " + i + "th label!!!"));
          this.container.add(c);
        }
      },this);
      doc.add(this.button, {top:10, left:10});
      doc.add(this.vbox, {top:50, left:10});
      this.vbox.add(this.container);
    }
  }
});
