qx.Class.define("mamba.ui.ImageButton",
{
  extend : mamba.ui.Button,

  statics :
  {
    HOVER_SUFFIX : "-hover",
    PRESS_SUFFIX : "-press",

    onOver : function(buttonEl, evt) {
      mamba.ui.Button.getButtonForElement(buttonEl).onMouseOver(evt);
    }
  },


  construct : function(buttonEl)
  {
    this.base(arguments, buttonEl);

    this.__imageEl = buttonEl.firstChild;
    this.__sources = this.__getSources(this.__imageEl.src);

    this.__initHandlers();
  },


  members:
  {
    __getSources : function(src)
    {
      var sepIndex = src.lastIndexOf(".");
      var base = src.substring(0, sepIndex);
      var format = src.substring(sepIndex);

      var sources =
      {
        normal : src,
        hover :  base +mamba.ui.ImageButton.HOVER_SUFFIX +format,
        press : base +mamba.ui.ImageButton.PRESS_SUFFIX +format
      }

      return sources;
    },


    __initHandlers : function()
    {
      var self = this;
      $(this.getButtonElement()).mousedown(function(evt) {
        self.__setImage("press");
      }).mouseup(function(evt) {
        self.__setImage("hover");
      }).mouseout(function(evt) {
        self.__setImage("normal");
      });
    },


    onMouseOver : function() {
      this.__setImage("hover");
    },


    __setImage : function(state) {
      this.__imageEl.src = this.__sources[state];
    }
  }
});