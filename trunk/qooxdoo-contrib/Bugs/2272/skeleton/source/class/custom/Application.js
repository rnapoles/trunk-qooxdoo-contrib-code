/* ************************************************************************

#resource(custom.image:image)

#embed(qx.icontheme/32/status/dialog-information.png)
#embed(custom.image/test.png)

************************************************************************ */
qx.Class.define("custom.Application",
{
  extend : qx.application.Gui,

  members :
  {
    main : function()
    {
      this.base(arguments);

      qx.io.Alias.getInstance().add("custom", qx.core.Setting.get("custom.resourceUri"));

      var button = new qx.ui.form.Button("First Button", "custom/image/test.png");
      button.setTop(50);
      button.setLeft(50);

      var req = new qx.io.remote.Request("/test.txt", "GET", "text/plain")
      
      this.debug("req.getAsynchronous(): " + req.getAsynchronous());
      
      req.addEventListener("changeState", function(e) {
        this.debug("State: " + e.getValue());
      }, this);
      
      req.addEventListener("completed", function(e) {
        this.debug(e.getContent());
      }, this);
      
      req.addEventListener("sending", function(e) {
        this.debug("-->sending");
      }, this);
      
      button.addEventListener("execute", function(e) {
        req.send();
      });
      
      button.addToDocument();
    },

    close : function()
    {
      this.base(arguments);
    },

    terminate : function() {
      this.base(arguments);
    }
  },

  settings : {
    "custom.resourceUri" : "./resource"
  }
});
