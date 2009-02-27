qx.Class.define("mamba.ui.TextButton",
{
  extend : mamba.ui.Button,

  statics :
  {
    onDown : function(buttonEl, evt)
    {
      mamba.ui.Button.getButtonForElement(buttonEl).onMouseDown(evt);
    },

    onFormClick : function(buttonEl, type)
    {
      var nextTypeInputEl = $(buttonEl).next("input[@type='" + type + "']")[0];
      nextTypeInputEl.click();

      // Show the start blocker in order to block the UI and show a waiting cursor
      $("#ui-blocker").show();
    }
  },


  construct : function(buttonEl)
  {
    this.base(arguments, buttonEl);

    this.__origClassName = buttonEl.className;

    // Handle onclick code using our click event in order to regard the enabled state
    var onclickCode = buttonEl.getAttribute("onclick");
    if (onclickCode != null && onclickCode != "") {
      var onclickHandler = (typeof onclickCode == "function") ? onclickCode // IE
          : this._createEvalListener(onclickCode); // others

      // NOTE: We set the buttonEl as "this" like it would be for real onclick code
      this.addListener("click", onclickHandler, buttonEl);

      // NOTE: We have to use "setAttribute", since "removeAttribute" won't work in IE
      buttonEl.setAttribute("onclick", "");
    }

    // NOTE: We initialize the handlers in an extra method in order to minimize
    //       the closure
    this.__initHandlers();
  },


  events : {
    "click" : "qx.event.type.Event"
  },

  members:
  {
    __initHandlers: function()
    {
      var self = this;
      $(this.getButtonElement()).mouseup(function(evt) {
        self.onMouseUp(evt);
      }).bind("mouseleave", function(evt) {
        self.onMouseUp(evt);
      }).bind("click", function(evt) {
        self.onClick(evt);
      }).bind("selectstart", function(evt) {
        // Prevent text selection in IE
        return false;
      });
    },


    _createEvalListener : function(code) {
      return function() {
        eval(code);
      }
    },

    getLabel: function() {
      return this.__getLabelJQ().text();
    },


    setLabel: function(text) {
      this.__getLabelJQ().text(text);
    },


    __getLabelJQ: function() {
      var divChildrenJQ = $(this.getButtonElement()).find("div");
      return divChildrenJQ.eq(divChildrenJQ.length - 1);
    },


    onMouseDown : function(evt) {
      if (this.getEnabled()) {
        this.getButtonElement().className = this.__origClassName + " text-button-press";
        
        // Prevent text selection in Gecko
        // NOTE: Setting the style "MozUserSelect" to "none" doesn't work when mouse is moved fast
        if (evt.preventDefault && evt.stopPropagation) {
          evt.preventDefault();
          evt.stopPropagation();
        }
      }
    },


    onMouseUp : function(evt) {
      if (this.getEnabled()) {
        this.getButtonElement().className = this.__origClassName;
      }
    },


    onClick : function(evt) {
      if (this.getEnabled()) {
        this.fireEvent("click");
      }
    },


    _applyEnabled: function(value, old){
      this.base(arguments, value, old);

      if (value) {
        this.getButtonElement().className = this.__origClassName;
      } else {
        this.getButtonElement().className = this.__origClassName + " text-button-disabled";
      }
    }

  }
});