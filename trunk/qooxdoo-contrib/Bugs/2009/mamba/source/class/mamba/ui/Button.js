qx.Class.define("mamba.ui.Button",
{
  extend : qx.core.Object,

  statics :
  {
    getButtonForJQ: function(buttonJQ) {
      return this.getButtonForElement(buttonJQ[0]);
    },

    getButtonForElement: function(buttonEl)
    {
      if (buttonEl.__button != null) {
        return buttonEl.__button;
      }
      else
      {
        if(buttonEl.nodeName === "DIV") {
          return new mamba.ui.TextButton(buttonEl);
        } else {
          return new mamba.ui.ImageButton(buttonEl);
        }
      }
    }
  },


  construct : function(buttonEl)
  {
    if (buttonEl.__button != null) {
      throw new Error("This element already has a button instance");
    }

    buttonEl.__button = this;
    this.__buttonEl = buttonEl;
  },


  properties : {
    enabled: { init: true, check: "Boolean", apply : "_applyEnabled" }
  },


  members:
  {
    getButtonElement: function() {
      return this.__buttonEl;
    },

    _applyEnabled: function(value, old){
    }
  }
});