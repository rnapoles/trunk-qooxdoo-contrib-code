/* ************************************************************************


    Widget class 'qcl.components.login.window.Simple'.
    This file is auto-generated. Do not edit, manual changes will be overwritten.


    qooxdoo v.0.7 code generated by QxTransformer v.

************************************************************************ */


/* ************************************************************************
#embed(qx.icontheme/16/actions/encrypt.png)


************************************************************************ */

/**
 * @todo: add documentation here auto-generated from qxml file
 */
qx.Class.define("qcl.components.login.window.Simple",
{
  extend : qx.ui.window.Window,

  include : [ qcl.components.login.window.MSimple ],

    
  /**
   * widget property, is deprecated and will be removed
   * @deprecated
   */
  properties : {
        widget : { check : "Object" }
  },
    
  /**
   * Constructor
   */
  construct : function(caption, icon)
  {
    // call parent class
    this.base(arguments);

    //call paint method to draw widget
    this.paint(caption, icon);
  },


  members :
  {

    /**
     * Draw widget
     */
    paint: function (caption, icon)
    {
      // Client document object
      var qx_id97167 = qx.ui.core.ClientDocument.getInstance();

/** begin auto-generated gui code **/

this.setWidth(250);
this.setModal(true);
this.setShowMinimize(false);
this.setShowMaximize(false);
this.setShowClose(false);
this.setResizable(false);
this.setDisplay(true);

this.addEventListener("appear",function(event)
{
this.centerToBrowser()
},this);

var qx_id98360 = new qx.ui.groupbox.GroupBox(null,null);
qx_id98360.setDimension("auto" ,"auto");
this.add(qx_id98360);

var qx_id100356 = new qx.ui.layout.VerticalBoxLayout();
qx_id100356.setSpacing(5);
qx_id98360.add(qx_id100356);

var qx_id100360 = new qx.ui.basic.Atom(this.tr("Please log in."),"icon/16/actions/encrypt.png");
qx_id100360.setHeight(20);
qx_id100360.setWidth("auto");
qx_id100360.setIconPosition("left");
qx_id100356.add(qx_id100360);

var qx_id100371 = new qx.ui.layout.GridLayout();
qx_id100371.setDimension("auto" ,"auto");
qx_id100371.setVerticalSpacing(5);
qx_id100371.setHorizontalSpacing(5);
qx_id100356.add(qx_id100371);
qx_id100371.setRowCount(3);
qx_id100371.setColumnCount(2);
qx_id100371.setColumnWidth(0,70);
qx_id100371.setColumnHorizontalAlignment(0,"right");
qx_id100371.setColumnVerticalAlignment(0,"top");
qx_id100371.setColumnWidth(1,180);
qx_id100371.setColumnHorizontalAlignment(1,"right");
qx_id100371.setColumnVerticalAlignment(1,"top");
qx_id100371.setRowHeight(0,20);

var qx_id100397 = new qx.ui.basic.Label(this.tr("User Name"));
qx_id100371.add(qx_id100397,0,0);

this.usernameField = new qx.ui.form.TextField();
this.usernameField.setWidth("100%");
this.usernameField.setHeight(20);
qx_id100371.add(this.usernameField,1,0);
qx_id100371.setRowHeight(1,20);

var qx_id100415 = new qx.ui.basic.Label(this.tr("Password"));
qx_id100371.add(qx_id100415,0,1);

this.passwordField = new qx.ui.form.PasswordField();
this.passwordField.setWidth("100%");
this.passwordField.setHeight(20);
qx_id100371.add(this.passwordField,1,1);
qx_id100371.setRowHeight(2,20);

var qx_id100433 = new qx.ui.layout.HorizontalBoxLayout();
qx_id100433.setSpacing(5);

var qx_id100436 = new qx.ui.form.Button(this.tr("Login"),null);
qx_id100436.setWidth(100);
qx_id100433.add(qx_id100436);

qx_id100436.addEventListener("execute", function(event){this.onSubmit(event,qx_id100436);},this);
qx_id100371.add(qx_id100433,1,2);

qx.event.message.Bus.subscribe("qcl.messages.login.failed",function(message){

			var msg = message.getData();
			if (msg) alert(msg);
		
},this);

qx.event.message.Bus.subscribe("qcl.messages.login.success",function(message){

			this.close();
		
},this);

qx.event.message.Bus.subscribe("qcl.auth.messages.logout",function(message){

			this.show();
		
},this);

/** end auto-generated gui code **/

      // set widget object, deprecated, will be removed
      this.setWidget(this);
    }

  }

});


