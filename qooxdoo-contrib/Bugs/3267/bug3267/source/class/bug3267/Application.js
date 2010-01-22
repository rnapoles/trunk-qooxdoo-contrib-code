/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug3267/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug3267"
 */
qx.Class.define("bug3267.Application",
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

      var doc = this.getRoot();      

      var container = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
      doc.add(container, {left: 0, top: 0, bottom: 0, right: 0});

      var cbPsq = new qx.ui.form.SelectBox();
      with (cbPsq) {
        set({width: 110});
        setLayoutProperties({top: 40, left: 0});
        add(new qx.ui.form.ListItem("Code"));
        add(new qx.ui.form.ListItem("Name"));
      };
      container.add(cbPsq);      

      var eArg = new qx.ui.form.TextField();
      with (eArg) {
        set({height: 23,width: 400});
        setLayoutProperties({top:40,left:115});
      };
      container.add(eArg);

      var btn_i = new qx.ui.form.Button('ok');
      with(btn_i) {
        set({width: 160, padding: 3});
        setLayoutProperties({top: 70, left: 200});
        addListener("execute", function(e) {
          this.debug("execute");
          cbPsq.focus();
        }, this);
      }
      container.add(btn_i);
      
      cbPsq.addListener("focus", function(e) {
        this.debug("focus");
      }, this);
      
      cbPsq.addListener("blur", function(e) {
        this.debug("blur");
      }, this);
    }
  }
});
