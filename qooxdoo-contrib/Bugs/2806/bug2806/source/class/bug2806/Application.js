/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(bug2806/*)
#asset(qx/icon/Tango/16/actions/*)
#asset(qx/icon/Tango/16/apps/utilities-help.png)
#asset(qx/icon/Tango/22/apps/preferences-users.png)

************************************************************************ */

qx.Class.define("bug2806.Application",
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

      var button = new qx.ui.form.Button("First Button", "bug2806/test.png");
      button.addListener("execute", function(e) {
        this.__search.toggleEnabled();
        this.__format.toggleEnabled();
      }, this);
      
      var doc = this.getRoot();
      doc.add(button, {left: 100, top: 20});
      doc.add(this.getMenuBar(), {left: 100, top: 100});
    },

    getMenuBar : function()
    {
      var menubar = new qx.ui.menubar.MenuBar();
      menubar.setWidth(600);

      menubar.add(new qx.ui.menubar.Button("File", null, this.getFileMenu()));
      menubar.add(new qx.ui.menubar.Button("Edit", null, this.getEditMenu()));
      this.__search = new qx.ui.menubar.Button("Search", null, this.getSearchMenu()).set({enabled: false});
      menubar.add(this.__search);
      menubar.add(new qx.ui.menubar.Button("View", null, this.getViewMenu()));
      this.__format = new qx.ui.menubar.Button("Format", null, this.getFormatMenu()).set({enabled: false});
      menubar.add(this.__format);
      menubar.add(new qx.ui.menubar.Button("Help", null, this.getHelpMenu()));

      return menubar;
    },

    getFileMenu : function()
    {
      var menu = new qx.ui.menu.Menu();
      menu.add(new qx.ui.menu.Button("New", "icon/16/actions/document-new.png"));
      menu.add(new qx.ui.menu.Button("Open", "icon/16/actions/document-open.png"));
      menu.add(new qx.ui.menu.Button("Close"));
      menu.add(new qx.ui.menu.Button("Save", "icon/16/actions/document-save.png"));
      menu.add(new qx.ui.menu.Button("Save as...", "icon/16/actions/document-save-as.png"));
      menu.add(new qx.ui.menu.Button("Print", "icon/16/actions/document-print.png"));
      menu.add(new qx.ui.menu.Button("Exit", "icon/16/actions/application-exit.png"));

      return menu;
    },

    getEditMenu : function()
    {
      var menu = new qx.ui.menu.Menu();
      menu.add(new qx.ui.menu.Button("Undo", "icon/16/actions/edit-undo.png"));
      menu.add(new qx.ui.menu.Button("Redo", "icon/16/actions/edit-redo.png"));
      menu.add(new qx.ui.menu.Button("Cut", "icon/16/actions/edit-cut.png"));
      menu.add(new qx.ui.menu.Button("Copy", "icon/16/actions/edit-copy.png"));
      menu.add(new qx.ui.menu.Button("Paste", "icon/16/actions/edit-paste.png"));

      return menu;
    },

    getSearchMenu : function()
    {
      var menu = new qx.ui.menu.Menu();
      menu.add(new qx.ui.menu.Button("Search...", "icon/16/actions/system-search.png"));
      menu.add(new qx.ui.menu.Button("Search next..."));
      menu.add(new qx.ui.menu.Button("Search previous...").set({enabled: false}));
      menu.add(new qx.ui.menu.Button("Replace"));
      menu.add(new qx.ui.menu.Button("Search in files", "icon/16/actions/system-search.png"));
      menu.add(new qx.ui.menu.Button("Replace in files"));

      return menu;
    },

    getViewMenu : function()
    {
      var menu = new qx.ui.menu.Menu();
      menu.add(new qx.ui.menu.Button("Panes", null, null, this.getPanesMenu()));
      menu.add(new qx.ui.menu.Button("Syntax", null, null, this.getSyntaxMenu()));
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
    },

    getFormatMenu : function()
    {
      var menu = new qx.ui.menu.Menu();
      menu.add(new qx.ui.menu.Button("Paragraph", null, null, this.getParagraphMenu()));
      menu.add(new qx.ui.menu.Button("Tabs to spaces"));
      menu.add(new qx.ui.menu.Button("Spaces to tabs"));
      menu.add(new qx.ui.menu.Button("Uppercase"));
      menu.add(new qx.ui.menu.Button("Lowercase"));
      menu.add(new qx.ui.menu.Button("Capitals"));
      menu.add(new qx.ui.menu.Button("OEM to ANSI"));
      menu.add(new qx.ui.menu.Button("ANSI to OEM"));

      return menu;
    },

    getParagraphMenu : function()
    {
      var menu = new qx.ui.menu.Menu();
      menu.add(new qx.ui.menu.Button("Left aligned", "icon/16/actions/format-justify-left.png"));
      menu.add(new qx.ui.menu.Button("Right aligned", "icon/16/actions/format-justify-right.png"));
      menu.add(new qx.ui.menu.Button("Centered", "icon/16/actions/format-justify-center.png"));
      menu.add(new qx.ui.menu.Button("Justified", "icon/16/actions/format-justify-fill.png"));

      return menu;
    },

    getHelpMenu : function()
    {
      var menu = new qx.ui.menu.Menu();
      menu.add(new qx.ui.menu.Button("Topics", "icon/16/apps/utilities-help.png"));
      menu.add(new qx.ui.menu.Button("Quickstart"));
      menu.add(new qx.ui.menu.Button("Online Forum"));
      menu.add(new qx.ui.menu.Button("Info..."));

      return menu;
    }
  }
});