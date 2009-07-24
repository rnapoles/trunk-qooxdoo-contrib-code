/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(formcompiler/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "FormCompiler"
 */
qx.Class.define("formcompiler.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     */
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

      // We'll use these properties for our labels:
      var labelProps = {
	  allowShrinkX: false,
	  allowShrinkY: false,
	  textAlign: "right",
	  paddingTop: 3 // magic top-padding value for labels next to text fields
      };
      var charwidth = 10;

      //
      // Example form.
      //
      // NOTE TO MARTIN: I haven't actually tested this yet; I've been testing from
      // within my own app. So there may be bugs here, but I wanted to give you a 
      // simple example to understand how things are supposed to work.
      //
      var FORM = {
	  /* main dialog window: */
	  widget: new qx.ui.window.Window("Settings", /*icon:*/ null),
	  name: "window",
	  layout: new qx.ui.layout.VBox(10),
	  props: {
	      showStatusbar: false,
	      showMinimize: false,
	      allowMinimize: false,
	      showMaximize: false,
	      allowMaximize: false,
	      modal: true
	  },
	  listeners: {
	      "appear": function () {
		  form.getWidget("window").center();
	      },
	      "resize": function () {
		  form.getWidget("window").center();
	      }
	  },
	  children: {
	      widget: new qx.ui.groupbox.GroupBox(),
	      layout: new qx.ui.layout.VBox(10),
	      children: [
		  /* username / server / password */ {
		      widget: new qx.ui.container.Composite(),
		      layout: new qx.ui.layout.HBox(10),
		      children: [
			  /* username label: */ {
			      widget: new qx.ui.basic.Label("Username:"),
			      props: labelProps,	// map passed to widget.set(...)
			      options: { flex: 1.0 }	// options passed to parent.add(...)
			  },
			  /* username textfield: */ {
			      widget: new qx.ui.form.TextField(),
			      name: "user",
			      binding: {
				  to_widget_options: {
				      converter: function(data) {
					  // Covert data when writing from model to widget
					  return data;
				      }
				  },
				  to_model_options: {
				      converter: function(data) {
					  // Covert data when writing widget to model
					  return data;
				      }
				  }
			      }
			  },
			  /* server label: */ {
			      widget: new qx.ui.basic.Label("Server:"),
			      props: labelProps,
			      options: { flex: 2.0 }
			  },
			  /* server textfield: */ {
			      widget: new qx.ui.form.TextField(),
			      props: { width: 15 * charwidth },
			      name: "server"
			  },
			  /* password label: */ {
			      widget: new qx.ui.basic.Label("Password:"),
			      props: labelProps
			  },
			  /* password textfield: */ {
			      widget: new qx.ui.form.PasswordField(),
			      props: { width: 8 * charwidth },
			      name: "password"
			  }
		      ]
		  },
		  /* checkbox: allow insecure connections? */ {
		      widget: new qx.ui.form.CheckBox("Save password?"),
		      name: "save_password"
		  }
	      ]
	  }
      }

      // Start building the form in the background
      var form = new formcompiler.FormCompiler(FORM, this, /*async:*/ true);

      // (Lots of time passes...)

      // Now finalize the form and display it
      form.finalize(
	  function(form) {
	      var win = form.getRootWidget();
	      this.getRoot().add(win);
	      win.open();
	  },
	  this);
    }
  }
});
