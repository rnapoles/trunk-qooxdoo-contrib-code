/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(mutablelist/demo/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "mutablelist"
 */
qx.Class.define("mutablelist.demo.Application",
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
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */

      // Create a list, give it the label and name for the list header
      var list = new mutablelist.MutableList("List of Items", "Column Header");
      // Set default values
      list.setData(['Pick up dry cleaning', 'Buy groceries', 'Drop Timmy off at little league practice']);

      // Document is the application root
      var doc = this.getRoot();
			
      // Add list to document at fixed coordinates
      doc.add(list, {left: 100, top: 50});

      var button1 = new qx.ui.form.Button("Save");
      // Add an event listener
      button1.addListener("execute", function(e) {
        var vals = list.getData().toArray();
        alert(vals.join('\n'));
      });
      doc.add(button1, {left: 10, top: 50});
    }
  }
});
