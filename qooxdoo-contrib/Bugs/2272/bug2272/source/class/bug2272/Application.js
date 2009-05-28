/* ************************************************************************

#asset(bug2272/*)

************************************************************************ */
qx.Class.define("bug2272.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    main : function()
    {
      this.base(arguments);

      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      var button = new qx.ui.form.Button("Send Request", "bug2272/test.png");
      var req = new qx.io.remote.Request("/test.txt", "GET", "text/plain");
      
      this.debug("req.getAsynchronous(): " + req.getAsynchronous());
      
      req.addListener("changeState", function(e) {
        this.debug("State: " + e.getData());
      }, this);
      
      req.addListener("completed", function(e) {
        this.debug(e.getContent());
      }, this);
      
      req.addListener("sending", function(e) {
        this.debug("-->sending");
      }, this);
      
      var doc = this.getRoot();
      doc.add(button, {left: 100, top: 50});

      button.addListener("execute", function(e) {
        req.send();
      }, this);
    }
  }
});
