qx.Class.define("mamba.ui.WelcomeSplash",
{
  statics :
  {
    COOKIE_FLAG : "mamba_standard=true",
    BROWSER_WARNING_ID : "browserWarning",

    init : function(id)
    {
      // We don't want to bother the user with the splash everytime he visits
      // the CC, just because he disabled cookies.
      if (!navigator.cookieEnabled) {
        return;
      }

      if(document.cookie.indexOf(mamba.ui.WelcomeSplash.COOKIE_FLAG) == -1)
      {
        this.__checkBrowser();
        mamba.container.Dialog.init(id, { modal: true, toTop: true });
        mamba.container.Dialog.show(id);

        document.cookie = mamba.ui.WelcomeSplash.COOKIE_FLAG + "; expires=" + (new Date(2099, 0, 0)).toGMTString();
      }
      else
      {
        mamba.BrowserCheck.init("browsercheck");
      }

      // For debugging
      if(document.cookie.indexOf(mamba.ui.WelcomeSplash.COOKIE_FLAG) != -1 && $("#triggerSplash").length > 0)
      {
        this.__checkBrowser();
        mamba.container.Dialog.init(id, { modal: true, trigger: '#triggerSplash', toTop: true });
      }
    },

    __checkBrowser : function()
    {
      if(!mamba.BrowserCheck.isSupported())
      {
        mamba.BrowserCheck.showDownloadLinks();
        $("#" +mamba.ui.WelcomeSplash.BROWSER_WARNING_ID).css("display", "block");
      }
    }
  }
});
