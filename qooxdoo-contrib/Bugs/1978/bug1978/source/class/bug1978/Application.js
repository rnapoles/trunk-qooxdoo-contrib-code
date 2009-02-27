/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug1978/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug1978"
 */
qx.Class.define("bug1978.Application",
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

      var doc = this.getRoot();
      var item;

      var lb = new qx.ui.form.List();
      doc.add(lb,
      {
          left : 100,
          top  : 50
      });


      for (var i = 0; i < 100; i++)
      {
        item = new qx.ui.form.ListItem("Test " + i, null, "" + i);
        lb.add(item);
        
        if (i == 24) {
          testItem = item;
        }
      }

//testItem.getLayoutParent().getLayoutParent().scrollChildIntoView(testItem);
      
      var html = "<div style='overflow:scroll;height:500px;'>";
      
      for (var i=0; i<=100; i++)
      {
        html += "<div ";

        if (i == 99) {
          html += " id = 'foobar' ";
        }

        html += "style='width:100px;height:20px'>"+i+"</div>";
      }

      html += "</div>";

      var container = new qx.ui.embed.Html(html);
      container.set({
        width : 200,
        height : 400,
        decorator : "main"
      });


      doc.add(container,
      {
          left : 250,
          top  : 50
      });

      var button = new qx.ui.form.Button("zeig dich!");
      button.addListener("execute", function(){
        qx.bom.element.Scroll.intoViewY(document.getElementById("foobar"), container.getContentElement().getDomElement(), null);
      }, this)

      doc.add(button,
      {
          left : 100,
          top  : 400
      });



      qx.log.appender.Console.show()
    }
  }
});
