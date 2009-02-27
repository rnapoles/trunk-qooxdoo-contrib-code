
/**
 * Mamba Header Scripts
 * Contains JS for : Navigation, Customerdata and Contractdata
 */
qx.Class.define("mamba.layout.Header",
{
  statics :
  {
    /**
     * TODOC
     *
     * @return {void}
     */
    init : function()
    {
      var customerPopup = new mamba.container.PopupMenu($("div#customer"), $("div#customerdata"));
      customerPopup.set({
        alignRight: true,
        showTab: true,
        defaultDeltaX: -8
      });
      customerPopup.addHoverTrigger($("span#customername"));

      var contractPopup = new mamba.container.PopupMenu($("div#contract"), $("div#contractdata"));
      contractPopup.set({
        alignRight: true,
        showTab: true,
        defaultDeltaX: -8
      });
      contractPopup.addHoverTrigger($("span#contractname"));

      // Wanted bahaviour see meta concept section 3.8
      var navPopup = new mamba.container.PopupMenu($("div#startbutton"), $("div#startmenu"));
      navPopup.addMouseDownTrigger($("#startbutton-left"), 600);
      navPopup.addHoverTrigger($("#startbutton-right"), 600);
      navPopup.setDefaultDeltaY(mamba.DomUtil.isIE ? -9 : -11);
    }
  }
});

oninit(mamba.layout.Header.init);
