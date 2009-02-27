qx.Class.define("mamba.BrowserCheck",
{
  statics :
  {
    CLASS_WINDOWS : "browserWindows",
    CLASS_LINUX   : "browserLinux",
    CLASS_MAC     : "browserMac",
    CLASS_ELSE    : "browserElse",


    __supportedBrowsers :
    {
      firefox : 2,
      msie : 7,
      safari : 3
    },


    init : function(id)
    {
      if(!this.isSupported())
      {
        this.showDownloadLinks();

        mamba.container.Dialog.init(id, { modal: true, toTop: true });
        mamba.container.Dialog.show(id);
      }
    },


    isSupported : function()
    {
      var supported = false;

      if(mamba.BrowserCheck.__supportedBrowsers[$.browser.name])
      {
        var minVersion = mamba.BrowserCheck.__supportedBrowsers[$.browser.name];
        if($.browser.versionX >= minVersion) {
          supported = true;
        }
      }

      return supported;
    },


    showDownloadLinks : function()
    {
      switch($.os.name)
      {
        case "win" :
          $("." +mamba.BrowserCheck.CLASS_WINDOWS).css("display", "block");
          break;
        case "linux" :
          $("." +mamba.BrowserCheck.CLASS_LINUX).css("display", "block");
          break;
        case "mac" :
          $("." +mamba.BrowserCheck.browserMac).css("display", "block");
          break;
        default :
          $("." +mamba.BrowserCheck.CLASS_ELSE).css("display", "block");
          break;
      }
    }
  }
});
