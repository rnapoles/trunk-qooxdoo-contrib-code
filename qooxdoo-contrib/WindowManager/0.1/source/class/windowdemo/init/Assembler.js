/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2006 - 2007

   License:
     LGPL 2.1: http://www.gnu.org/licenses/lgpl.html

   Authors:
     * Simon Bull (sbull)

************************************************************************ */

/* ************************************************************************

************************************************************************ */


/*
  Assembler is a singleton that is used by windowdemo.Application.js to assemble
  the UI.
*/
qx.OO.defineClass("windowdemo.init.Assembler", qx.core.Target,
function()
{
  qx.core.Target.call(this);

  // ************************************************************************
  //   INITIALISE GLOBAL OBJECTS
  // ************************************************************************

  DOC = qx.ui.core.ClientDocument.getInstance();

  // This prevents IE's default behaviour of selecting everything when the
  // user drags the mouse
  //DOC.setSelectable(false);
  //
  // This used to work with Qx 0.5.x, but now it doesn't work anymore?

});


/*
---------------------------------------------------------------------------
  PROPERTIES
---------------------------------------------------------------------------
*/


/*
---------------------------------------------------------------------------
  CONSTANTS
---------------------------------------------------------------------------
*/


/*
---------------------------------------------------------------------------
  MODIFIERS
---------------------------------------------------------------------------
*/


/*
---------------------------------------------------------------------------
  IMPL
---------------------------------------------------------------------------
*/


/*
  This method adds the application titlebar to the document.
*/
qx.Proto.addTitleBar = function()
{
  var tb = new qx.ui.layout.HorizontalBoxLayout;
  with (tb) {
    setTop(2);
    setLeft(0);
    setHeight(19);
    setWidth("100%");
    setPaddingRight(4);
    setHorizontalChildrenAlign("left");
    setVerticalChildrenAlign("middle");
    setBackgroundColor(new qx.renderer.color.ColorObject("activecaption"));
  }

  // Decoration
  var d1 = new qx.ui.basic.Image("icon/16/actions/help-faq.png");
  d1.setMargin(4);

  var d2 = new qx.ui.basic.Label(" Simon's Window Manager Demo");
  d2.setAppearance("titlebar-font");

  tb.add(d1, d2);
  tb.addToDocument();
}


/*
  This method adds the application menubar to the document.
*/
qx.Proto.addMenuBar = function()
{
  // Create the menus
  var mFile    = this._getFileMenu();
  var mOptions = this._getOptionsMenu();
  var mThemes  = this._getThemesMenu();

  // Create the toolbar
  var tb = new qx.ui.toolbar.ToolBar;
  with (tb) {
    setTop(22);
    setLeft(0);
    setRight(0);
    setHeight(24);
    setBorder(qx.renderer.border.BorderPresets.getInstance().groove);
  }
  DOC.add(tb);

  // Create a toolbarpart for menus
  var tbpMenus = new qx.ui.toolbar.Part;

    var tbmbFile = new qx.ui.toolbar.MenuButton("File", mFile);
    tbpMenus.add(tbmbFile);

    var tbmbThemes = new qx.ui.toolbar.MenuButton("Themes", mThemes);
    tbpMenus.add(tbmbThemes);

  // Fill the remaining horizontal toolbar space
  var tbpSpace = new qx.ui.toolbar.Part;
  tbpSpace.add(new qx.ui.basic.HorizontalSpacer);

  // Put it all together
  tb.add(tbpMenus, tbpSpace);
}


/*
  This method adds the workspace to the document.

  The workspace is the screenspace below the titlebar and menubar into which
  all windows are rendered.

  @see    windowdemo.Application.WORKSPACE

  @return A reference to the workspace.
*/
qx.Proto.addWorkspace = function()
{
  var workspace = new qx.ui.layout.CanvasLayout();
  with (workspace)
  {
    setTop(47);
    setBottom(2);
    setLeft(2);
    setRight(2);
    setAppearance("workspace");
  }
  workspace.addToDocument();
  return workspace;
}


/*
---------------------------------------------------------------------------
  IMPL HELPERS
---------------------------------------------------------------------------
*/


/*
  This method builds the File menu and adds it to the document because
  all popups must be added to the document.

  It does NOT add the menu to any parent widget.

  @return qx.ui.menu.Menu.
*/
qx.Proto._getFileMenu = function()
{

  // ************************************************************************
  //   NEW WINDOW SUBMENU
  // ************************************************************************

  var nc1 = this._getNewWindowCommand("ext.ui.window.Window");
  var nc2 = this._getNewWindowCommand("ext.ui.window.UsersImageWindow");
  var nc3 = this._getNewWindowCommand("ext.ui.window.ServicesImageWindow");
  var nc4 = this._getNewWindowCommand("ext.ui.window.AlarmImageWindow");

  var smNew = new qx.ui.menu.Menu;
  var mbNew1 = new qx.ui.menu.Button("Window", null, nc1);
  var mbNew2 = new qx.ui.menu.Button("Users Window", null, nc2);
  var mbNew3 = new qx.ui.menu.Button("Services Window", null, nc3);
  var mbNew4 = new qx.ui.menu.Button("Alarm Window", null, nc4);
  smNew.add(mbNew1, mbNew2, mbNew3, mbNew4);



  // ************************************************************************
  //   FOCUS WINDOW SUBMENU
  // ************************************************************************

  var fc1 = this._focusWindowOfTypeCommand("ext.ui.window.Window");
  var fc2 = this._focusWindowOfTypeCommand("ext.ui.window.UsersImageWindow");
  var fc3 = this._focusWindowOfTypeCommand("ext.ui.window.ServicesImageWindow");
  var fc4 = this._focusWindowOfTypeCommand("ext.ui.window.AlarmImageWindow");

  var smFocus  = new qx.ui.menu.Menu;
  var mbFocus1 = new qx.ui.menu.Button("Window", null, fc1);
  var mbFocus2 = new qx.ui.menu.Button("Users Window", null, fc2);
  var mbFocus3 = new qx.ui.menu.Button("Services Window", null, fc3);
  var mbFocus4 = new qx.ui.menu.Button("Alarm Window", null, fc4);
  smFocus.add(mbFocus1, mbFocus2, mbFocus3, mbFocus4);




  // Create the File menu
  var mFile     = new qx.ui.menu.Menu;
  var sep       = new qx.ui.menu.Separator;
  var itemNew   = new qx.ui.menu.Button("New", null, null, smNew);
  var itemFocus = new qx.ui.menu.Button("Focus", null, null, smFocus);
  var itemExit = new qx.ui.menu.Button("Exit", null, null);
  mFile.add(itemNew, itemFocus, sep, itemExit);

  // Menus must be added to doc before they are added to their parent widget
  // because they extend Popup -- i.e., they are always a child of DOC.
  DOC.add(smNew);
  DOC.add(smFocus);
  DOC.add(mFile);

  return mFile;
}

/*
  This method builds the Options menu and adds it to the document because
  all popups must be added to the document.

  It does NOT add the menu to any parent widget.

  @return qx.ui.menu.Menu.
*/
qx.Proto._getOptionsMenu = function()
{
  // Create the Options menu
  var mOptions = new qx.ui.menu.Menu;

  // Menus must be added to doc before they are added to their parent widget
  // because they extend Popup -- i.e., they are always a child of the doc.
  DOC.add(mOptions);

  return mOptions;
};


/*
  This method builds the Themes menu and adds it to the document because
  all popups must be added to the document.

  It does NOT add the menu to any parent widget.

  @return qx.ui.menu.Menu.
*/
qx.Proto._getThemesMenu = function()
{
  // Create the Options menu
  var mThemes = new qx.ui.menu.Menu;


  // Create the colour theme options
  var colourThemeLabel = new qx.ui.basic.Label("Colour Theme");

  var colourManager = qx.manager.object.ColorManager.getInstance();
  var allThemes = colourManager._colorThemes;
  var themeRadioButtons = [];
  for (var themeId in allThemes) {
    var theme = allThemes[themeId].getInstance();
    var themeRadioButton = new qx.ui.menu.RadioButton(theme.getTitle(), this._getChangeColourThemeCommand(themeId));
    if (colourManager.getColorTheme() == theme) {
      themeRadioButton.setChecked(true);
    }
    mThemes.add(themeRadioButton);
    themeRadioButtons.push(themeRadioButton);
  }
  var rbm1 = new qx.manager.selection.RadioManager("rbm-colour-theme", themeRadioButtons);



  // Create the icon theme options
  mThemes.add(new qx.ui.menu.Separator);
  var iconThemeLabel = new qx.ui.basic.Label("Icon Theme");

  var imageManager = qx.manager.object.ImageManager.getInstance();
  var allIconThemes = imageManager._iconThemes;
  var iconRadioButtons = [];
  for (var iconThemeId in allIconThemes) {
    var iconTheme = allIconThemes[iconThemeId].getInstance();
    var iconRadioButton = new qx.ui.menu.RadioButton(iconTheme.getTitle(), this._getChangeIconThemeCommand(iconThemeId));
    if (imageManager.getIconTheme() == iconTheme) {
      iconRadioButton.setChecked(true);
    }
    mThemes.add(iconRadioButton);
    iconRadioButtons.push(iconRadioButton);
  }
  var rbm2 = new qx.manager.selection.RadioManager("rbm-icon-theme", iconRadioButtons);



  // Create the atom options
  mThemes.add(new qx.ui.menu.Separator);
  var atomThemeLabel = new qx.ui.basic.Label("Show");
  //mOptions.add(iconThemeLabel);

  var radioButton1 = new qx.ui.menu.RadioButton("Labels", this._getToggleAllAtomsCommand("label"));
  var radioButton2 = new qx.ui.menu.RadioButton("Icons", this._getToggleAllAtomsCommand("icon"));
  var radioButton3 = new qx.ui.menu.RadioButton("Both", this._getToggleAllAtomsCommand("both"));
  var atomRadioButtons = [radioButton1, radioButton2, radioButton3];

  var rbm3 = new qx.manager.selection.RadioManager("rbm-atom-theme", atomRadioButtons);
  mThemes.add(radioButton1, radioButton2, radioButton3);



  // Menus must be added to doc before they are added to their parent widget
  // because they extend Popup -- i.e., they are always a child of the doc.
  DOC.add(mThemes);

  return mThemes;
}


/*
---------------------------------------------------------------------------
  COMMAND HELPERS
---------------------------------------------------------------------------
*/


/*
  This method creates a qx.client.Command instance whose execute method creates
  a new window instance of a specified type.

  @param type A String representing the type of window to instantiate. This
              must be one of the window types supported by ext.manager.object
              .WindowManager.

  @return qx.client.Command.
*/
qx.Proto._getNewWindowCommand = function(type)
{
  var c = new qx.client.Command();
  c.setUserData("window-type", type);
  c.addEventListener("execute", function(e)
  {
    var w = WINDOW_MANAGER.getNewOfType( this.getUserData("window-type") );
  });

  return c;
}
/*
  This method creates a qx.client.Command instance whose execute method brings
  the top window of a specified type into focus.

  @param type A String representing the type of window to instantiate. This
              must be one of the window types supported by ext.manager.object
              .WindowManager.

  @return qx.client.Command.
*/
qx.Proto._focusWindowOfTypeCommand = function(type)
{
  var c = new qx.client.Command();
  c.setUserData("window-type", type);
  c.addEventListener("execute", function(e)
  {
    var w = WINDOW_MANAGER.getTopOfType( this.getUserData("window-type") );
    if (w != null) {
      w.setActive(true);
    }
  });

  return c;
}


qx.Proto._getChangeColourThemeCommand = function(themeId)
{
  var c = new qx.client.Command();
  c.setUserData("theme-id", themeId);
  c.addEventListener("execute", function(e)
  {
    var themeId = this.getUserData("theme-id");
    qx.manager.object.ColorManager.getInstance().setColorThemeById(themeId);
  });

  return c;
}


qx.Proto._getChangeIconThemeCommand = function(themeId)
{
  var c = new qx.client.Command();
  c.setUserData("theme-id", themeId);
  c.addEventListener("execute", function(e)
  {
    var themeId = this.getUserData("theme-id");
    qx.manager.object.ImageManager.getInstance().setIconThemeById(themeId);
  });

  return c;
}


qx.Proto._getToggleAllAtomsCommand = function(mode)
{
  var c = new qx.client.Command();
  c.setUserData("mode", mode);
  c.addEventListener("execute", function(e)
  {
    var mode = this.getUserData("mode");

    // TODO include all classnames to be effected
    var classnames = ["qx.ui.basic.Atom"];

    var all = qx.core.Object._db;
    for (var i = 0; i < all.length; i++) {
      var obj = all[i];
      if (obj != null && classnames.contains(obj.classname)) {
        obj.setShow(mode);
      }
    }
  });

  return c;
}




/*
---------------------------------------------------------------------------
  DISPOSER
---------------------------------------------------------------------------
*/


qx.Proto.dispose = function()
{
  if (this.getDisposed()) {
    return true;
  }

  this.warn("dispose() TODO implement me!");

  return qx.core.Target.prototype.dispose.call(this);
}


/*
---------------------------------------------------------------------------
  SINGLETON INSTANCE
---------------------------------------------------------------------------
*/


qx.Clazz.getInstance = qx.lang.Function.returnInstance;
