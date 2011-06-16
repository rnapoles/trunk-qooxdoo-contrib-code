/* ************************************************************************

   Copyright:
     2011 Norbert Schröder

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
     * Norbert Schröder (scro34)

************************************************************************ */

/* ************************************************************************

#asset(graydienttheme.demo/*)

#asset(qx/icon/Tango/16/actions/*)
#asset(qx/icon/Tango/16/apps/*)
#asset(qx/icon/Tango/16/categories/*)
#asset(qx/icon/Tango/16/devices/*)
#asset(qx/icon/Tango/16/mimetypes/*)
#asset(qx/icon/Tango/16/places/*)
#asset(qx/icon/Tango/16/status/*)
#asset(qx/icon/Tango/22/actions/*)
#asset(qx/icon/Tango/22/apps/*)
#asset(qx/icon/Tango/22/mimetypes/*)
#asset(qx/icon/Tango/22/places/*)
#asset(qx/icon/Tango/32/actions/*)
#asset(qx/icon/Tango/32/apps/*)
#asset(qx/icon/Tango/32/devices/*)
#asset(qx/icon/Tango/32/status/*)
#asset(qx/icon/Tango/48/actions/*)
#asset(qx/icon/Tango/48/devices/*)
#asset(qx/icon/Tango/48/places/*)

************************************************************************ */

/**
 * This is a demo of the silverbluetheme contribution
 */
qx.Class.define("graydienttheme.demo.Application",
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
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if ((qx.core.Environment.get("qx.debug")))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        ToolBarTop
      -------------------------------------------------------------------------
      */
      var showcaseButton = this.showcaseButton = new qx.ui.form.SelectBox();
      showcaseButton.set({font: "bold"});
      var emptyItem = this.emptyItem = new qx.ui.form.ListItem("<not selected>");
      var calcItem = this.calcItem = new qx.ui.form.ListItem("Calculator");
      var colorItem = this.colorItem = new qx.ui.form.ListItem("Color Selector");
      var formItem = this.formItem = new qx.ui.form.ListItem("Form");
      var editorItem = this.editorItem = new qx.ui.form.ListItem("HTML Editor");
      var tableItem = this.tableItem = new qx.ui.form.ListItem("Table");
      var browserItem = this.browserItem = new qx.ui.form.ListItem("Web Browser");
      
      showcaseButton.add(emptyItem);
      showcaseButton.add(calcItem);
      showcaseButton.add(colorItem);
      showcaseButton.add(formItem);
      showcaseButton.add(editorItem);
      showcaseButton.add(tableItem);
      showcaseButton.add(browserItem);
      
      showcaseButton.addListener("changeSelection", function(e)
      {
        var selItem = this.showcaseButton.getSelection()[0].getLabel();
        switch (selItem)
        {
          case "Calculator":
            this.calcWindow.open();
            break;
        
          case "Color Selector":
            this.colorWindow.open();
            break;
        
          case "Form":
            this.formWindow.open();
            break;
        
          case "Table":
		    this.tableWindow.open();
            break;
        
		  case "HTML Editor":
            this.editorWindow.open();
            break;
			
          case "Web Browser":
            this.browserWindow.open();
            break;
        }
      }, this);
      
      var widgetButton = this.widgetButton = new qx.ui.form.SelectBox();
      widgetButton.set({font: "bold"});
	  this.widgetButtonEmpty = new qx.ui.form.ListItem("<not selected>");
      widgetButton.add(this.widgetButtonEmpty);
      widgetButton.add(new qx.ui.form.ListItem("Button"));
      widgetButton.add(new qx.ui.form.ListItem("Canvas"));
      widgetButton.add(new qx.ui.form.ListItem("CheckBox"));
      widgetButton.add(new qx.ui.form.ListItem("ColorPopup"));
      widgetButton.add(new qx.ui.form.ListItem("ComboBox"));
      widgetButton.add(new qx.ui.form.ListItem("DateChooser"));
      widgetButton.add(new qx.ui.form.ListItem("DateField"));
      widgetButton.add(new qx.ui.form.ListItem("Desktop"));
      widgetButton.add(new qx.ui.form.ListItem("HtmlEmbed"));
      widgetButton.add(new qx.ui.form.ListItem("List"));
      widgetButton.add(new qx.ui.form.ListItem("Menu"));
      widgetButton.add(new qx.ui.form.ListItem("MenuBar"));
      widgetButton.add(new qx.ui.form.ListItem("Popup"));
	  widgetButton.add(new qx.ui.form.ListItem("ProgressBar"));
      widgetButton.add(new qx.ui.form.ListItem("RadioButton"));
      widgetButton.add(new qx.ui.form.ListItem("SelectBox"));
      widgetButton.add(new qx.ui.form.ListItem("SlideBar"));
      widgetButton.add(new qx.ui.form.ListItem("Slider"));
      widgetButton.add(new qx.ui.form.ListItem("Spinner"));
      widgetButton.add(new qx.ui.form.ListItem("SplitPane"));
      widgetButton.add(new qx.ui.form.ListItem("TabView"));
      widgetButton.add(new qx.ui.form.ListItem("TextField"));
      widgetButton.add(new qx.ui.form.ListItem("ToolBar"));
      widgetButton.add(new qx.ui.form.ListItem("ToolTip"));
      widgetButton.add(new qx.ui.form.ListItem("Tree"));
      widgetButton.add(new qx.ui.form.ListItem("TreeVirtual"));
      widgetButton.add(new qx.ui.form.ListItem("Window"));
      
      widgetButton.addListener("changeSelection", function(e)
      {
        this.closeShowcase();
        var selIndex = this.widgetButton.indexOf(this.widgetButton.getSelection()[0]) - 1;
		var selItem = this.stack.getChildren()[selIndex];
		if (selItem)
		{
		  this.stack.setSelection([selItem]);
		} else {
		  this.stack.resetSelection();
		}
      }, this);
      
      /*
      -------------------------------------------------------------------------
        Document
      -------------------------------------------------------------------------
      */
      var doc = this.getRoot();
      doc.set({blockerColor: '#afafaf', blockerOpacity: 0.4});
      
      var mainContainer = this.mainContainer = new qx.ui.container.Composite()
      mainContainer.setLayout(new qx.ui.layout.VBox(0));
      
      /*
      -------------------------------------------------------------------------
        Main GroupBox
      -------------------------------------------------------------------------
      */
      
      mainContainer.add(this.createHeader());
      mainContainer.add(this.getToolbar());
      mainContainer.add(this.getWidgetStack(), {flex: 1});
      
      doc.add(mainContainer, {edge: 0});
      
      /*
      -------------------------------------------------------------------------
        Windows
      -------------------------------------------------------------------------
      */
	  var calcWindow = this.calcWindow = new graydienttheme.demo.CalcWindow();
      calcWindow.addListener("changeActive", this.resetShowcase, this);
	  
	  var colorWindow = this.colorWindow = new graydienttheme.demo.ColorWindow();
      colorWindow.addListener("changeActive", this.resetShowcase, this);
	  
      var formWindow = this.formWindow = new graydienttheme.demo.FormWindow("Form Widgets");
      formWindow.addListener("changeActive", this.resetShowcase, this);
      
      var tableWindow = this.tableWindow = new graydienttheme.demo.TableWindow("Table");
      tableWindow.addListener("changeActive", this.resetShowcase, this);
      
      var editorWindow = this.editorWindow = new graydienttheme.demo.EditorWindow("HTML Editor");
      editorWindow.addListener("changeActive", this.resetShowcase, this);
      
      var browserWindow = this.browserWindow = new graydienttheme.demo.BrowserWindow();
      browserWindow.addListener("changeActive", this.resetShowcase, this);
    },  
      
    createHeader : function()
    {
      var header = this.header = new qx.ui.toolbar.ToolBar();
      header.set({padding: [5, 10, 5, 5], appearance: "app-header"});
      
	  var headerStr = "GraydientTheme Demo";
      var label = new qx.ui.basic.Atom(headerStr);
      label.set({alignY: "middle", font: "bold", rich: true});
      
      var versionButton = new qx.ui.form.Button(qx.core.Environment.get("qx.version"), "graydienttheme.demo/logo.png");
      versionButton.set({font: "bold"});
      versionButton.addListener("execute", function(e)
      {
        this.browserWindow.open();
        this.showcaseButton.setSelection([this.browserItem]);
      }, this);
      
      header.add(label);
      header.addSpacer();
      header.add(versionButton);
    
      return header;
    },
	
	getToolbar: function()
	{
	  var tbTop = this.tbTop = new qx.ui.toolbar.ToolBar();
      tbTop.set({padding: 5, spacing: 5});
      tbTop.add(new qx.ui.basic.Label("Showcase: ").set({alignY: "middle", font: "bold"}));
      tbTop.add(this.showcaseButton);
      tbTop.add(new qx.ui.basic.Label("Widgets: ").set({paddingLeft: 10, alignY: "middle", font: "bold"}));
      tbTop.add(this.widgetButton);
	  
	  return tbTop;
	},
	
	getWidgetStack: function()
    {
	  var stack = this.stack = new qx.ui.container.Stack();
      stack.add(new graydienttheme.demo.Button());
	  stack.add(new graydienttheme.demo.Canvas());
      stack.add(new graydienttheme.demo.CheckBox());
      stack.add(new graydienttheme.demo.ColorPopup());
      stack.add(new graydienttheme.demo.ComboBox());
      stack.add(new graydienttheme.demo.DateChooser());
      stack.add(new graydienttheme.demo.DateField());
      stack.add(new graydienttheme.demo.Desktop());
      stack.add(new graydienttheme.demo.HtmlEmbed());
      stack.add(new graydienttheme.demo.List());
      stack.add(new graydienttheme.demo.Menu());
      stack.add(new graydienttheme.demo.MenuBar());
      stack.add(new graydienttheme.demo.Popup());
	  stack.add(new graydienttheme.demo.ProgressBar());
      stack.add(new graydienttheme.demo.RadioButton());
      stack.add(new graydienttheme.demo.SelectBox());
      stack.add(new graydienttheme.demo.SlideBar());
      stack.add(new graydienttheme.demo.Slider());
      stack.add(new graydienttheme.demo.Spinner());
      stack.add(new graydienttheme.demo.SplitPane());
      stack.add(new graydienttheme.demo.TabView());
      stack.add(new graydienttheme.demo.TextField());
      stack.add(new graydienttheme.demo.ToolBar());
      stack.add(new graydienttheme.demo.Tooltip());
      stack.add(new graydienttheme.demo.Tree());
      stack.add(new graydienttheme.demo.TreeVirtual());
      stack.add(new graydienttheme.demo.Window());
		
	  stack.resetSelection();
		
	  return stack;
	},
    
    resetShowcase: function()
    {
      switch (true)
      {
	    case this.calcWindow.getActive():
          this.showcaseButton.setSelection([this.calcItem]);
          break;
		  
	    case this.colorWindow.getActive():
          this.showcaseButton.setSelection([this.colorItem]);
          break;
		  
        case this.formWindow.getActive():
          this.showcaseButton.setSelection([this.formItem]);
          break;
    
        case this.tableWindow.getActive():
          this.showcaseButton.setSelection([this.tableItem]);
          break;
    
        case this.editorWindow.getActive():
          this.showcaseButton.setSelection([this.editorItem]);
          break;
    
        case this.browserWindow.getActive():
          this.showcaseButton.setSelection([this.browserItem]);
          break;
		  
        default:
          this.showcaseButton.setSelection([this.emptyItem]);
      }
    },
    
    closeShowcase: function()
    {
	  this.calcWindow.close();
      this.colorWindow.close();
      this.formWindow.close();
      this.tableWindow.close();
      this.editorWindow.close();
      this.browserWindow.close();
      this.resetShowcase();
    }
  }
});
