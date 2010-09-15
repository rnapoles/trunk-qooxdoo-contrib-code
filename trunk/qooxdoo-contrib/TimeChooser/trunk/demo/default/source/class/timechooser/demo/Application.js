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

qx.Class.define("timechooser.demo.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    main : function()
    {
      this.base(arguments);

      var container = new qx.ui.container.Composite(new qx.ui.layout.VBox(4));
      this.getRoot().add(container,{ top: 100, left:100});

      var d = new Date();
      var chooser = new timechooser.TimeChooser(Math.floor(d.getTime()/1000));
//      var chooser = new timechooser.TimeChooser("12:00:00 am");
//      var chooser = new timechooser.TimeChooser(43620);

      chooser.setLayoutFormat("below/vertical");
      container.add(chooser);

      var label = new qx.ui.basic.Label();
      container.add(label);

      chooser.addListener("changeValue", function(e){
	      label.setValue(this.getValue().toString());
	    });

      var o = new qx.ui.core.Spacer();
      o.setHeight(20);
      container.add(o);

      // Ensure that normal spinners work, since we kludge the transform
      // property of Spinner.
      var o = new qx.ui.form.Spinner(23);
      container.add(o);
    }
  }
});
