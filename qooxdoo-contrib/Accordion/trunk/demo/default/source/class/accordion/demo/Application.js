/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(accordion.demo/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "accordion"
 */
qx.Class.define("accordion.demo.Application",
{
  extend : qx.application.Standalone,

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Demo App for accordion contrib
      -------------------------------------------------------------------------
      */
			var winLayout = new qx.ui.layout.VBox();
			
			var win = new qx.ui.window.Window("Accordion Demo").set({
				layout : winLayout,
				showStatusbar : true,
				allowClose: false,
				allowMinimize: false,
				allowShrinkY : true,
				contentPadding: 0
			});
			
			//add splitpane - accordion will be added on the left hand side
			var mainsplit = new qx.ui.splitpane.Pane("horizontal");
			mainsplit.setDecorator("main");
			win.add(mainsplit);
			
			//add something to the left Pane
	  	var leftPane = new qx.ui.container.Composite(new qx.ui.layout.Grow()).set({
        decorator : "main",
        allowShrinkY : true
      });
    	mainsplit.add(leftPane, 1);
    	
    	//add something to the right Pane
	  	var rightPane = new qx.ui.container.Composite(new qx.ui.layout.Grow()).set({
        decorator : "main"
      });
    	mainsplit.add(rightPane, 2);
    	
			//create the accordion
			this._navi = new accordion.Accordion(win);
			
			//clear accordion - just to be sure
			this._navi.clearArray();

			//let's add a button
			this._navi.addBtn(1,"just a label");

			//let's add a widget
			var widgetAccordion1 = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
        decorator : "main",
        allowShrinkY : true
      });
			var  lblDummy= new qx.ui.basic.Label("Just a label widget");
			widgetAccordion1.add(lblDummy);
			this._navi.addObject(1,widgetAccordion1, 1);
			
			//let's add another widget
			this._navi.addBtn(2,"more complex sample");
			var widgetAccordion2 = this.__makeLogin("","");
			this._navi.addObject(2,widgetAccordion2, 1);
			
			//and finaly 2 empty button - all subsequent buttons will stick to this button
			this._navi.addBtn(3,"I am empty", 1);
			
			//add accordion to left pane
			leftPane.add(this._navi);
			
			this._navi.updateAccordion();		
						
			//now add win to root
			this.getRoot().add(win);
			win.moveTo(30, 10);
			//set min heigt - this is used by accordion as initial size!!!
			win.setMinHeight(200);
			win.setMinWidth(400);
			win.open();		
			
			//we need a listener to react on resize events
			win.addListener("resize", function(e) {
				this._navi.updateAccordion();				
			},this);

    },
    
    //*************************************************************************
    __makeLogin : function(user, password)
    //*************************************************************************
    {
    	//Create groupbox
    	var loginLayout = new qx.ui.layout.Canvas();
    	var loginArea = new qx.ui.groupbox.GroupBox("");
  		loginArea.setLayout(loginLayout);

			//add widgets to GroupBox
			//User field
			var txt_user = new qx.ui.basic.Label();
    	txt_user.set({
    		value: this.tr("<b>User</b>"),
    		tabIndex : 1,
    		rich: true,
    		textAlign: "left"
    		});
			loginArea.add(txt_user, {left: 3, top: 0, width: "95%"});

			var fld_user = new qx.ui.form.TextField("");
   		fld_user.set({tabIndex : 101});
			//make sure we have the focus in the field
			fld_user.addListener("appear", function(e){
				 this.selectAllText();
				},fld_user);
			loginArea.add(fld_user, {left: 3, top: 16, width: "95%"});

			//Password field
			var txt_pw = new qx.ui.basic.Label();
   		txt_pw.set({
   			value: this.tr("<b>Password</b>"),
   			tabIndex : 1,
   			rich: true,
   			textAlign: "left"
   		});
			loginArea.add(txt_pw, {left: 3, top: 40, width: "95%"});

			var fld_pw = new qx.ui.form.PasswordField("");
		  // Set location
   		fld_pw.set({tabIndex : 101});
			loginArea.add(fld_pw, {left: 3, top: 56, width: "95%"});

			//Buttons
			var btn_ok = new qx.ui.form.Button(this.tr("Login"));
 			btn_ok.set({tabIndex : 103});
      btn_ok.addListener("execute", function(e){
 			//set statusbar text
   			alert("Logging in...")
   		},this);

  		loginArea.add(btn_ok, {left: 3, top: 85, width: "95%"});

			//"I forgot my password" button
			var btn_sendPW = new qx.ui.form.Button(this.tr("I forgot my password"));
 			btn_sendPW.set({tabIndex : 104});
      btn_sendPW.addListener("execute", function(e){
   			alert("forgot password");
   		},this);

  		loginArea.add(btn_sendPW, {left: 3, top: 115, width: "95%"});

    	//capture enter key
    	loginArea.addListener("keypress", function(e) {
				if( e.getKeyIdentifier() == 'Enter'){
					alert("enter pressed");
			  	};
  			}, this);

    	return loginArea
    }		//*** __makeLogin ***************************************************

  }
});
