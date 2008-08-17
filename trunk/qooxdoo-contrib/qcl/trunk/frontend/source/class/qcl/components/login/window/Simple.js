/* ************************************************************************

    Widget class definition qcl.components.login.window.Simple

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

  include : [ qcl.components.login.window.SimpleHandlers ],

    
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
    this.paint();
  },

  members :
  {

    /**
     * Draw widget
     */
    paint: function ()
    {

      // parent object to which child objects will be added: this object or dummy stub, depends on setToClientDocument property
      var qx_id96159= this;

/** begin auto-generated gui code **/

var qx_id99946 = new qx.ui.groupbox.GroupBox(null,null);
qx_id99946.setDimension("auto" ,"auto");
qx_id96159.add(qx_id99946);

var qx_id99950 = new qx.ui.layout.VerticalBoxLayout();
qx_id99950.setSpacing(5);
qx_id99946.add(qx_id99950);

var qx_id99954 = new qx.ui.basic.Atom(this.tr("Please log in."),"icon/16/actions/encrypt.png");
qx_id99954.setHeight(20);
qx_id99954.setWidth("auto");
qx_id99954.setIconPosition("left");
qx_id99950.add(qx_id99954);

var qx_id99965 = new qx.ui.layout.GridLayout();
qx_id99965.setDimension("auto" ,"auto");
qx_id99965.setVerticalSpacing(5);
qx_id99965.setHorizontalSpacing(5);
qx_id99950.add(qx_id99965);
qx_id99965.setRowCount(3);
qx_id99965.setColumnCount(2);
qx_id99965.setColumnWidth(0,70);
qx_id99965.setColumnHorizontalAlignment(0,"right");
qx_id99965.setColumnVerticalAlignment(0,"top");
qx_id99965.setColumnWidth(1,180);
qx_id99965.setColumnHorizontalAlignment(1,"right");
qx_id99965.setColumnVerticalAlignment(1,"top");
qx_id99965.setRowHeight(0,20);

var qx_id99991 = new qx.ui.basic.Label(this.tr("User Name"));
qx_id99965.add(qx_id99991,0,0);

this.usernameField = new qx.ui.form.TextField();
this.usernameField.setWidth("100%");
this.usernameField.setHeight(20);
qx_id99965.add(this.usernameField,1,0);
qx_id99965.setRowHeight(1,20);

var qx_id100009 = new qx.ui.basic.Label(this.tr("Password"));
qx_id99965.add(qx_id100009,0,1);

this.passwordField = new qx.ui.form.PasswordField();
this.passwordField.setWidth("100%");
this.passwordField.setHeight(20);
qx_id99965.add(this.passwordField,1,1);
qx_id99965.setRowHeight(2,20);

var qx_id100028 = new qx.ui.layout.HorizontalBoxLayout();
qx_id100028.setSpacing(5);

var qx_id100030 = new qx.ui.form.Button(this.tr("Login"),null);
qx_id100030.setWidth(100);
qx_id100028.add(qx_id100030);

qx_id100030.addEventListener("execute", function(event){this.onSubmit(event,qx_id100030);},this);
qx_id99965.add(qx_id100028,1,2);

qx.event.message.Bus.subscribe("qcl.auth.messages.loginFailed",function(message){

			var msg = message.getData();
			if (msg) alert(msg);
		
},qx_id96159);

qx.event.message.Bus.subscribe("qcl.auth.messages.loginSuccess",function(message){

			this.close();
		
},qx_id96159);

qx.event.message.Bus.subscribe("qcl.auth.messages.logout",function(message){

			this.show();
		
},qx_id96159);

/** end auto-generated gui code **/

      // set widget object, deprecated, will be removed
      this.setWidget(this);
    }

  }

});


