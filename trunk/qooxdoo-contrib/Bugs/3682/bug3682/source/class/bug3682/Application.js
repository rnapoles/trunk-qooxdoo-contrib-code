/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug3682/*)

************************************************************************ */

qx.Class.define("bug3682.Application",
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

      var doc = this.getRoot();
      
      var container = new qx.ui.container.Composite(new qx.ui.layout.HBox(20));
      var textArea1 = new qx.ui.form.TextArea().set({
        maxHeight: 250,
        maxWidth: 200,
        wrap: false,
        value: "works\n\n\n\n\n\n\n\nasdasd\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ghi"
      });
      container.add(textArea1);
      doc.add(container, {edge: 20});
      
      var scroller = new qx.ui.container.Scroll();
      var containerScroll = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
      var textArea2 = new qx.ui.form.TextArea().set({
        height: 250,
        width: 200,
        value: "doesn't work\n\n\n\n\n\n\n\nasdasd\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ghi"
      });
      containerScroll.add(textArea2);
      var textArea3 = new qx.ui.form.TextArea().set({
        height: 250,
        width: 200,
        value: "dosen't work"
      });
      containerScroll.add(textArea3);
      scroller.add(containerScroll, {edge: 0});
      container.add(scroller, {flex : 1});
    }
  }
});
