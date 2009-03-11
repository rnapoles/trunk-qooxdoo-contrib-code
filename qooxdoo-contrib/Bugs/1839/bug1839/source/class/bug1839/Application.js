/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug1839/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug1839"
 */
qx.Class.define("bug1839.Application",
{
  extend : qx.application.Standalone,

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
    
      var scrollContainer = new qx.ui.container.Scroll();
      scrollContainer.set({
        width: 200,
        height: 200
      });
    
      var container = new qx.ui.container.Composite(new qx.ui.layout.VBox(8));
      scrollContainer.add(container);
    
      container.add(this.generateBox());
    
      var selectBox = new qx.ui.form.SelectBox();
      container.add(selectBox);
          
      for (var i = 0; i < 30; i++)
      {
        var item = new qx.ui.form.ListItem("Item " + i);
        selectBox.add(item);
      }
          
      container.add(this.generateBox());
                
      var doc = this.getRoot();
      doc.add(scrollContainer, {left: 100, top: 50});
    },
    
    generateBox : function()
    {
      var box = new qx.ui.basic.Label("Content size: 300x300").set({
        width: 150,
        height: 300,
        allowShrinkX: false,
        allowShrinkY: false,
        backgroundColor: "brown",
        textColor: "white",
        padding: 10
      });
      return box;
    }
  }
});
