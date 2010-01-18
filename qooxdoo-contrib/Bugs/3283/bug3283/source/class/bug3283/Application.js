/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug3283/*)
#asset(qx/icon/${qx.icontheme}/16/places/folder.png)
#asset(qx/icon/${qx.icontheme}/48/places/folder.png)
#asset(qx/icon/${qx.icontheme}/48/devices/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug3283"
 */
qx.Class.define("bug3283.Application",
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
      // Document is the application root
      var doc = this.getRoot();

      var content = '<div style="width:400px;height:300px;overflow:auto;border:1px #dfdfdf solid;">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<pre>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</pre></div>';
      var nativeHtml = new qx.ui.embed.Html(content);

      var container = new qx.ui.container.Composite(new qx.ui.layout.Grow);
      container.set({
        width : 400,
        height : 300
      });
      
        var list = new qx.ui.form.List(true);
        var item;

        list.set({ maxHeight : 40, maxWidth: 200, selectionMode : "multi", height : null });

        var listl = [ "audio-card.png","audio-input-microphone.png","battery.png",
        "camera-photo.png","camera-web.png","computer.png","display.png",
        "drive-harddisk.png","drive-optical.png","input-keyboard.png",
        "input-mouse.png","media-flash.png","media-optical.png","multimedia-player.png",
        "network-wired.png","network-wireless.png","pda.png","phone.png","printer.png" ];

        var listpre = "icon/48/devices/"

        for (var i=0; i<listl.length; i++)
        {
          item = new qx.ui.form.ListItem(null, listpre + listl[i]);
          list.add(item);
        };      

      doc.add(new qx.ui.basic.Label("Native HTML"), {left: 100, top: 30});
      doc.add(nativeHtml, {left: 100, top: 50});

      doc.add(new qx.ui.basic.Label("qooxdoo list"), {left: 350, top: 30});
      doc.add(list, {left: 350, top: 50});


    }
  }
});
