qx.Class.define("mamba.ui.ContextHelp",
{
  statics :
  {
    BUTTON_OFFSET_PLUS_X : 5,
    // Because of the shadow we need a smaller offset if popup gets shown left
    // of the toggle. Else the offset would appear to big.
    BUTTON_OFFSET_MINUS_X : 0,

    BUTTON_SRC_DEFAULT    : "img-mamba/buttons/help/context.png",
    BUTTON_SRC_OVER       : "img-mamba/buttons/help/context-over.png",
    BUTTON_SRC_ACTIVE     : "img-mamba/buttons/help/context-pressed.png",

    BUTTON_CLOSE_DEFAULT  : "img-mamba/buttons/help/close.png",
    BUTTON_CLOSE_OVER     : "img-mamba/buttons/help/close-over.png",
    BUTTON_CLOSE_ACTIVE   : "img-mamba/buttons/help/close-pressed.png",


    init : function()
    {
      this.__reg = {};
      $("div.contexthelp").appendTo($("body"));

      $("div.contexthelp .titlebar img").mouseover(function(e) {
        this.src = mamba.ui.ContextHelp.BUTTON_CLOSE_OVER;
      }).mouseout(function(e) {
        this.src = mamba.ui.ContextHelp.BUTTON_CLOSE_DEFAULT;
      }).mousedown(function(e) {
        this.src = mamba.ui.ContextHelp.BUTTON_CLOSE_ACTIVE;
      });


      $("img.contexthelp").mouseover(function(e) {
        if($(this).attr("active") != "true") {
          this.src = mamba.ui.ContextHelp.BUTTON_SRC_OVER;
        }
      }).mouseout(function(e) {
        if($(this).attr("active") != "true") {
          this.src = mamba.ui.ContextHelp.BUTTON_SRC_DEFAULT;
        }
      });
    },


    toggle : function(popupId, buttonEl, event)
    {
      var popupJQ = $("#"+popupId);

      if(popupJQ.length == 1)
      {
        if(popupJQ.css("display") == "block") {
          this.close();
        }
        else
        {
          this.close();
          this.__position(popupId, buttonEl);
          this.__setActiveData(popupId, buttonEl);
          popupJQ.css("display", "block");
          this.__toggleButton(buttonEl, true);
        }
      }
      else if(popupJQ.length == 0) {
        throw "Missing contextmenu help popup with ID '" +popupId +"'";
      }
      else {
        throw "Contextmenu help popup with ID '" +popupId +"' has been defined "
              +popupJQ.length +" times";
      }

      // Stopping propagation. Needed in otable where the button is child of a
      // TH element with its own click handler which should not be called.
      if(!event) var event = window.event
      event.cancelBubble = true;
      if (event.stopPropagation) event.stopPropagation();
    },


    close : function()
    {
      var activeData = this.__getActiveData();

      if(activeData)
      {
        $("#"+activeData.id).css("display", "none");
        this.__toggleButton(activeData.element, false);
      }
    },


    __toggleButton : function(buttonEl, showPopup)
    {
      buttonEl.src = showPopup ? mamba.ui.ContextHelp.BUTTON_SRC_ACTIVE : mamba.ui.ContextHelp.BUTTON_SRC_DEFAULT;
      $(buttonEl).attr("active", showPopup);
    },


    __position : function(popupId, buttonEl)
    {
      var popupJQ = $("#"+popupId);
      var dim = { width : popupJQ.width(), height : popupJQ.height() };
      var max = { x : $("body").get(0).scrollWidth,  y : $("body").get(0).scrollHeight };

      var buttonJQ = $(buttonEl);
      var x = mamba.DomUtil.elemAbsRight(buttonJQ);
      var y = mamba.DomUtil.elemAbsTop(buttonJQ);

      if( max.x >= (x + dim.width + mamba.ui.ContextHelp.BUTTON_OFFSET_PLUS_X) ) {
        x = x + mamba.ui.ContextHelp.BUTTON_OFFSET_PLUS_X;
      } else {
        x = mamba.DomUtil.elemAbsLeft(buttonJQ) - dim.width - mamba.ui.ContextHelp.BUTTON_OFFSET_MINUS_X;
      }

      if( max.y < (y + dim.height) ) {
        y = mamba.DomUtil.elemAbsBottom(buttonJQ) - dim.height;
      }

      popupJQ.css({ "left" : x, "top" : y });
    },


    __setActiveData : function(popupId, buttonEl)
    {
      this.__active = {
        id : popupId,
        element : buttonEl
      }
    },


    __getActiveData : function() {
      return this.__active;
    }
  }

});


oninit(function() {
  mamba.ui.ContextHelp.init();
});
