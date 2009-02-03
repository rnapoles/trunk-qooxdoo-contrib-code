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

    this.setCaption("Simulator Shell");
    this.setMaxWidth(450);
    this.setMaxHeight(400);

    // command input
    var gridLayout = new qx.ui.layout.Grid(5,10);
    gridLayout.setColumnAlign(0, "left", "middle");
    gridLayout.setColumnAlign(1, "left", "middle");
    gridLayout.setColumnAlign(2, "left", "middle");
    gridLayout.setColumnAlign(3, "left", "middle");    
    this.setLayout(gridLayout);    
    
    // 1st row
    this.add(new qx.ui.basic.Label("Command:"), {row: 0, column: 0});
    this.w.cmd = new qx.ui.form.TextField();
    this.add(this.w.cmd, {row: 0, column: 1});    
    this.add(new qx.ui.basic.Label(" sessionId:"), {row: 0, column: 2});
    this.w.sessid = new qx.ui.form.TextField();
    this.add(this.w.sessid, {row: 0, column: 3});    
    
    // 2nd row
    this.add(new qx.ui.basic.Label("Param1: "), {row: 1, column: 0});
    var tf3 = new qx.ui.form.TextField();
    this.add(tf3, {row: 1, column: 1, colSpan: 3});
    this.w.parm1 = tf3;
    
    // 3rd row
    this.add(new qx.ui.basic.Label("Param2: "), {row: 2, column: 0});
    var tf4 = new qx.ui.form.TextField();
    this.add(tf4, {row: 2, column: 1, colSpan: 3});
    this.w.parm2 = tf4;
    
    // 4th row    
    this.add(new qx.ui.basic.Label("QuickCommand (hit return):"), {row: 3, column: 0});
    var t1 = new qx.ui.form.TextField();
    this.add(t1, {row: 3, column: 1, colSpan: 3});
    this.w.quickcmd = t1;
    t1.addListener("keydown",this._processCmd,this);
    
    // 5th row
    // command output
    var cmdout = new qx.ui.form.TextArea();
    cmdout.setHeight(100);
    cmdout.setReadOnly(true);
    this.add(cmdout,{row: 4, column: 0, colSpan: 4});
    this.w.cmdout = cmdout;
    
    // 6th row
    // commit button
    var commitb = new qx.ui.form.Button("Send");
    commitb.setAllowGrowX(false);
    commitb.setWidth(60);
    commitb.addListener("execute", this._processSend, this);
    this.add(commitb, {row: 5, column: 1});
    
    // reset button
    var resetb = new qx.ui.form.Button("Reset");
    resetb.setAllowGrowX(false);
    resetb.setWidth(60);
    resetb.addListener("execute", this._resetCmdFields, this);
    this.add(resetb, {row: 5, column: 2});
    
    // 7th row
    this.w.status = new qx.ui.basic.Label();
    var st = this.w.status;
    this.add(st, {row: 6, column: 0, colSpan: 4});

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

