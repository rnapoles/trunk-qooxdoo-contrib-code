/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2109/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2109"
 */
qx.Class.define("bug2109.Application",
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

      // Create some spinners
      var spinner1 = new qx.ui.form.Spinner(0, 0, 2);
      var spinner2 = new qx.ui.form.Spinner(0, 1, 2);
      var spinner3 = new qx.ui.form.Spinner(0, 2, 2);
      var spinner4 = new qx.ui.form.Spinner(0, 0, 1);
      var spinner5 = new qx.ui.form.Spinner(0, 1, 1);

      var spinner6 = new qx.ui.form.Spinner(0, 0, 2);
      spinner6.setWrap(true);
      var spinner7 = new qx.ui.form.Spinner(0, 1, 2);
      spinner7.setWrap(true);
      var spinner8 = new qx.ui.form.Spinner(0, 2, 2);
      spinner8.setWrap(true);
      var spinner9 = new qx.ui.form.Spinner(0, 0, 1);
      spinner9.setWrap(true);
      var spinner10 = new qx.ui.form.Spinner(0, 1, 1);
      spinner10.setWrap(true);

      // Document is the application root
      var doc = this.getRoot();
      var layout = new qx.ui.layout.Grid();
      layout.setRowAlign(0, "center", "middle");
      var panel = new qx.ui.container.Composite(layout);

      // Add spinners to grid in two rows, non-wrapping spinners top row and
      // wrapping spinners bottom row
      panel.add(new qx.ui.basic.Label("----- Min=0, Max=2 -----"), {row:0, column:1, colSpan:3});
      panel.add(new qx.ui.basic.Label("----- Min=0, Max=1 -----"), {row:0, column:4, colSpan:2});
      panel.add(new qx.ui.basic.Label("Non-wrapping spinners"), {row:1, column:0});
      /*panel.add(spinner1, {row:1, column:1});
      panel.add(spinner2, {row:1, column:2});
      panel.add(spinner3, {row:1, column:3});
      panel.add(spinner4, {row:1, column:4});
      panel.add(spinner5, {row:1, column:5});*/

      panel.add(new qx.ui.basic.Label("Wrapping spinners"), {row:2, column:0});
      panel.add(spinner6, {row:2, column:1});
      /*panel.add(spinner7, {row:2, column:2});
      panel.add(spinner8, {row:2, column:3});
      panel.add(spinner9, {row:2, column:4});
      panel.add(spinner10, {row:2, column:5});*/

      var check = new qx.ui.form.CheckBox("Panel enabled");
      check.setChecked(true);
      doc.add(check, {left: 100, top: 50});
      doc.add(panel, {left: 100, top: 80});

      // Add an event listener
      check.addListener("changeChecked", function(e) {
        panel.setEnabled(check.getChecked());
      });
    }
  }
});
