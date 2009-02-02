/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Thomas Herchenroeder (thron7)

************************************************************************ */

/* ************************************************************************

************************************************************************ */

qx.Class.define("custom.simulator.Shell",
{
  extend : qx.ui.window.Window,

  construct : function()
  {
    this.base(arguments);

    this.w = {}; // widget registry

    this.setMaxWidth(450);
    this.setMaxHeight(400);

    // command input
    this.setLayout(new qx.ui.layout.VBox(10));
    
    // 1st row
    var r1 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
    this.add(r1)

    r1.add(new qx.ui.basic.Label("Command: "));
    this.w.cmd = new qx.ui.form.TextField();
    r1.add(this.w.cmd);
    r1.add(new qx.ui.basic.Label(" sessionId: "));
    this.w.sessid = new qx.ui.form.TextField();
    r1.add(this.w.sessid);

    // 3rd row
    var r3 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
    this.add(r3);

    r3.add(new qx.ui.basic.Label("Param1: "));
    var tf3 = new qx.ui.form.TextField();
    r3.add(tf3);
    this.w.parm1 = tf3;

    // 4th row
    var r4 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
    this.add(r4);
    
    r4.add(new qx.ui.basic.Label("Param2: "));
    var tf4 = new qx.ui.form.TextField();
    r4.add(tf4);
    this.w.parm2 = tf4;

    // 2nd row
    var r2 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
    this.add(r2);
    
    r2.add(new qx.ui.basic.Label("QuickCommand (hit return):"));

    var t1 = new qx.ui.form.TextField();
    this.add(t1);
    this.w.quickcmd = t1;
    t1.set({
      liveUpdate : true
    });

    t1.addListener("keydown",this._processCmd,this);

    // command output
    var cmdout = new qx.ui.form.TextArea();
    this.add(cmdout);
    this.w.cmdout = cmdout;
    cmdout.set({
      overflow : "auto",
      height   : 100
    });

    // 5th row
    var r5 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
    this.add(r5);    


    // commit button
    var commitb = new qx.ui.form.Button("Send");
    r5.add(commitb);
    commitb.set({
      horizontalAlign : "left"
      });

    commitb.addListener("execute", this._processSend, this);

    // reset button
    var resetb = new qx.ui.form.Button("Reset");
    r5.add(resetb);
    resetb.set({
      horizontalAlign : "right"
      });

    resetb.addListener("execute", this._resetCmdFields, this);

    // 6th row
    var r6 = new qx.ui.container.Composite(new qx.ui.layout.HBox());
    this.add(r6);
    
    this.w.status = new qx.ui.basic.Label();
    var st = this.w.status;
    r6.add(st);


  }, // construct()

  members : {

    _processCmd : function (e) 
    {
      if (e.getKeyIdentifier() == "Enter") 
      {
        // get cmd text
        var cmd_txt = this.w.quickcmd.getValue();
        this.debug(cmd_txt);
        this._sendCommand(cmd_txt);
      }
    },

    _processResponse : function (e) 
    {
      var cont = e.getContent();
      if (cont != "")
      {
        this.outappend(cont);
      } else {
        this.debug("No response from Selenium RC");
      }
    },

    _processSend : function (e) 
    {
      // construct selenium command
      var cmd = this.w.cmd.getValue();
      if (cmd == "") 
      {
        this.setStatus("Please enter a valid command first.");
        return;
      }
      var sessid = this.w.sessid.getValue();
      if (sessid == "")
      {
        this.setStatus("You have to specify a Selenium Session ID.");
        return;
      }
      var cmd_txt = "cmd="+cmd;
      var parm1 = this.w.parm1.getValue();
      if (parm1 != "") 
      {
        cmd_txt += '&1=' + parm1;
      }
      var parm2 = this.w.parm2.getValue();
      if (parm2 != "") 
      {
        cmd_txt += '&2=' + parm2;
      }
      cmd_txt += '&sessionId=' + sessid;
      // send command
      this._sendCommand(cmd_txt);
    },

    _sendCommand : function (cmd_txt) 
    {
      // create XHR
      var req = new qx.io.remote.Request();
      var url_prefix = "http://localhost:4444/selenium-server/driver?";
      //var url_prefix = "http://localhost/selenium-server/driver?";
      req.set({
        timeout     : 10000,
        crossDomain : true
        });
      var url = url_prefix + cmd_txt;
      this.debug(url);
      req.setUrl(url);

      req.addListener("completed", this._processResponse, this);
      // send command
      this.outappend("Sending:\n"+cmd_txt+"\n");
      req.send();
    },

    _resetCmdFields : function (e) 
    {
      // reset fields
      this.w.cmd.setValue("");
      this.w.parm1.setValue("");
      this.w.parm2.setValue("");
      this.w.quickcmd.setValue('');
    },

    outappend : function (txt)
    {
      this.w.cmdout.setValue(this.w.cmdout.getValue() + txt);
    }

  }
});

