/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#resource(custom.image:image)

#require(qx.log.appender.Console)
#require(qx.log.appender.Native)

#require(timechooser.*)
************************************************************************ */

qx.Class.define("custom.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    main : function()
    {
      this.base(arguments);

      var container = new qx.ui.container.Composite(new qx.ui.layout.VBox(4));
      this.getRoot().add(container);

      var d = new Date();
//      var chooser = new timechooser.TimeChooser(Math.floor(d.getTime()/1000));
      var chooser = new timechooser.TimeChooser("12:31:20");
      chooser.setLayoutFormat("below/vertical");
      container.add(chooser);

      var label = new qx.ui.basic.Label();
      container.add(label);

      chooser.addListener("changeValue",
                          function(e)
                          {
                            label.setContent(e.getData().toString());
                          });
    }
  },

  settings :
  {
    "custom.resourceUri" : "./resource"
  }
});
