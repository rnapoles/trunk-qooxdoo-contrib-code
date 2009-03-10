qx.Class.define("bug2084.MyWindow",
{
  extend : qx.ui.window.Window,

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  settings :
  {
  },
  
  properties :
  {
  },
  
  statics :
  {
    
  },
  /**
   * @param {String} Window caption
   */
  construct : function(caption, icon)
  {
    this.base(arguments, caption, icon);
    
    // set layout
    this.setLayout(new qx.ui.layout.HBox(2));
    this._createCommands();

    // initialise properties
    this.set({
      allowMinimize: false,
      allowMaximize: false,
      showStatusbar: false,
      showClose: false,
      showMinimize: false,
      showMaximize: false,
      movable: true,
      resizable: false
    });

    // create childControls
    this._createChildControl("textfield");
    this._createChildControl("button-ok");
    this._createChildControl("button-abort");
    
    
    this.addListenerOnce("resize", this.center);
  },
  
  members :
  {
    _createChildControlImpl : function(id)
    {
      var control = null;

      switch(id)
      {
        case "textfield":
          control = new qx.ui.form.TextField();
          this.getChildrenContainer()._add(control);
          break;

        case "button-ok":
          control = new qx.ui.form.Button().set({
            command : this._actionClose
          });
          this.getChildrenContainer()._add(control);
          break;

        case "button-abort":
          control = new qx.ui.form.Button().set({
            command : this._actionClose
          });
          this.getChildrenContainer()._add(control);
          break;
      }

      return control || this.base(arguments, id);
    },

    open : function()
    {
      this.base(arguments);

      this.getChildControl("textfield").focus();
    },

   _createCommands : function()
   {
      this._actionClose = new qx.event.Command("Escape");
      this._actionClose.addListener("execute", function(e) {
        this.close();
      }, this);
   }
  }
});