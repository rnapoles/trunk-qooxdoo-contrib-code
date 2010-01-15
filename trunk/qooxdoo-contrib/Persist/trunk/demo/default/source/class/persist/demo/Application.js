/* ************************************************************************

   Copyright:
     2007-2010 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

#asset(persist.demo/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "persist"
 */
qx.Class.define("persist.demo.Application",
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

      var store = new persist.Store("test");
      var text = new qx.ui.form.TextArea();
      text.set({
        width : 300,
        height : 50,
        placeholder :"Enter a string to store locally in the broser."
      });
      this.getRoot().add(text,{top:50,left:50});
      text.addListener("appear", function(){
        store.get("text",function(value){
          if (value)
          {
            text.setValue(value);
          }
        })
      },this);
      text.addListener("changeValue",function(value){
        store.set("text",value);
      },this);
      this.getRoot().add(new qx.ui.basic.Label("Enter a value and reload the browser"), {
        top: 110, left: 50
      });
    }
  }
});
