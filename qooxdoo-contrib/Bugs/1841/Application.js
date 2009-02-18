/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(gui/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "gui"
 */
qx.Class.define("gui.Application",
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

      // Create a button
      //var button1 = new qx.ui.form.Button(this.tr("Вход"), "gui/test.png");
      //var button1 = new qx.ui.form.Button(this.tr("first %1 second %2", "alla", "guud"), "gui/test.png");
      //var button1 = new qx.ui.form.Button(this.trc("test test test test test test test test test test test test test test test test test test test test", "Nagelneu Button"), "gui/test.png");
      var button1 = new qx.ui.form.Button(this.trn("singular message", "pippy plural message",1,"alla", "guud"), "gui/test.png");

      //var k = new qx.locale.Key();

      // Document is the application root
      var doc = this.getRoot();
			
      // Add button to document at fixed coordinates
      doc.add(button1, {left: 100, top: 50});

      // Add an event listener
      button1.addListener("execute", function(e) {
        alert("Hello World!");
      });

      //var a = ;
      //var a = new skeletonapplication.Application();
      var myFn = function(outerMap)
      {
        var arr = outerMap.children;

        for (var i = 0, l = arr.length; i < l; i++)
        {
          var obj = new arr[i].type();
        }
      }
    },

    add : function(o)
    {
        var t = new qx.ui.tree.TreeFolder(o.getLabel());
        var te=o.getMenuTree();

        for (a in te)
        {
            var tf = new qx.ui.tree.TreeFile( te[a][0] );
            tf.setUserData("theobj",undefined);//o);
            tf.setUserData("ownersId",te[a][1]);
            tf.setUserData("ownerObjRef",this.__getObjRef(o));
            t.add( tf );
        }
    }
  }
});
