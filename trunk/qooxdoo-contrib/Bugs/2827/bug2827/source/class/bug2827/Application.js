/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2827/*)
#asset(qx/icon/Tango/16/actions/document-open.png)
#asset(qx/icon/Oxygen/16/actions/document-open.png)

************************************************************************ */

/**
 * This is the main application class of your custom application "bug2827"
 */
qx.Class.define("bug2827.Application",
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
      this.base(arguments);

      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      var button = new qx.ui.form.MenuButton("Open", "bug2827/test.png", this.getMenu());

      var toggle = new qx.ui.form.Button("toggle");
      toggle.addListener("execute", function() {
        this._button.toggleEnabled();
        this._checkBox.toggleEnabled();
        this._radioButton.toggleEnabled();
      }, this);
      
      var doc = this.getRoot();
      doc.add(button, {left: 100, top: 50});
      doc.add(toggle, {left: 200, top: 50});
    },
    
    getMenu : function()
    {
      var menu = new qx.ui.menu.Menu();
      
      this._button = new qx.ui.menu.Button("Panes", "icon/16/actions/document-open.png", null, this.getPanesMenu()).set({enabled: false});
      this._checkBox = new qx.ui.menu.CheckBox("Panes2", this.getPanesMenu()).set({enabled: false}).set({value: true});
      this._radioButton = new qx.ui.menu.RadioButton("Panes", this.getPanesMenu()).set({enabled: false}).set({value: true});
      
      menu.add(this._button);
      menu.add(this._checkBox);
      menu.add(this._radioButton);
      menu.add(new qx.ui.menu.CheckBox("Show ruler"));
      menu.add(new qx.ui.menu.CheckBox("Show line numbers"));
      menu.add(new qx.ui.menu.Button("ASCII table"));

      return menu;
    },
    
    getPanesMenu : function()
    {
      var menu = new qx.ui.menu.Menu();
      menu.add(new qx.ui.menu.CheckBox("Show tabs").set({value: true}));
      menu.add(new qx.ui.menu.CheckBox("Show status bar").set({value: true}));
      menu.add(new qx.ui.menu.CheckBox("Show tree"));
      menu.add(new qx.ui.menu.CheckBox("Show macros").set({value: true}));
      menu.add(new qx.ui.menu.CheckBox("Show tags"));
      menu.add(new qx.ui.menu.CheckBox("Show console"));

      return menu;
    },

    getSyntaxMenu : function()
    {
      var menu = new qx.ui.menu.Menu();

      var htmlButton = new qx.ui.menu.RadioButton("HTML");
      var xmlButton = new qx.ui.menu.RadioButton("XML");
      var jsButton = new qx.ui.menu.RadioButton("JavaScript");
      var cdialectButton = new qx.ui.menu.Button("C Dialect", null, null, this.getSyntaxCMenu());
      var perlButton = new qx.ui.menu.RadioButton("Perl");
      var pythonButton = new qx.ui.menu.RadioButton("Python");

      menu.add(htmlButton);
      menu.add(xmlButton);
      menu.add(jsButton);
      menu.add(cdialectButton);
      menu.add(perlButton);
      menu.add(pythonButton);

      var langGroup = new qx.ui.form.RadioGroup();
      langGroup.add(htmlButton, xmlButton, jsButton, perlButton, pythonButton);
      langGroup.add.apply(langGroup, cdialectButton.getMenu().getChildren());

      return menu;
    },
    
    getSyntaxCMenu : function()
    {
      var menu = new qx.ui.menu.Menu();
      menu.add(new qx.ui.menu.RadioButton("C"));
      menu.add(new qx.ui.menu.RadioButton("C Sharp"));
      menu.add(new qx.ui.menu.RadioButton("Objective C"));
      menu.add(new qx.ui.menu.RadioButton("C Plus Plus"));

      return menu;
    }
  }
});
