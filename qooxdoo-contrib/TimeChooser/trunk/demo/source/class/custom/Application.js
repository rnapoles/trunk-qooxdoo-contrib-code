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

      var chooser = new timechooser.TimeChooser();
      container.add(chooser);
    }
  },

  settings :
  {
    "custom.resourceUri" : "./resource"
  }
});
