/* ************************************************************************

   Copyright:


   License:

   Authors:
     Simon Bull

************************************************************************ */

/* ************************************************************************

#asset(mdi/*)

#asset(qx/icon/${qx.icontheme}/16/apps/office-database.png)
#asset(qx/icon/${qx.icontheme}/16/actions/help-contents.png)
#asset(qx/icon/${qx.icontheme}/16/status/mail-unread.png)
#asset(qx/icon/${qx.icontheme}/16/actions/help-about.png)
#asset(qx/icon/${qx.icontheme}/16/categories/internet.png)
#asset(qx/icon/${qx.icontheme}/16/categories/system.png)
#asset(qx/icon/${qx.icontheme}/16/categories/science.png)
#asset(qx/icon/${qx.icontheme}/16/status/dialog-information.png)
#asset(qx/icon/${qx.icontheme}/16/devices/camera-photo.png)
#asset(qx/icon/${qx.icontheme}/16/mimetypes/office-spreadsheet.png)
#asset(qx/icon/${qx.icontheme}/16/mimetypes/media-image.png)
#asset(qx/icon/${qx.icontheme}/16/mimetypes/media-video.png)
#asset(qx/icon/${qx.icontheme}/16/mimetypes/text-plain.png)
#asset(qx/icon/${qx.icontheme}/16/mimetypes/archive.png)



************************************************************************ */


/**
 * This class is responsible for building the GUI components of the startup
 * screen.  It is largely about assembling GUI components from out of the
 * box Qooxdoo widgets.
 */
qx.Class.define("mdi.demo.Builder",
{
  type : "singleton",
  extend : qx.core.Object,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
      this.base(arguments);
  },



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {

    //  -----  PUBLIC API  -----


    /**
     * @type member
     * @return {qx.ui.toolbar.ToolBar} The top level application toolbar.
     */
    getTitlebar : function()
    {
        var LabelApp = new qx.ui.basic.Label(" My Application");
            LabelApp.set({padding : 2, textColor : "white"});

        var LabelDiv = new qx.ui.basic.Label(" My Division   ");
            LabelDiv.set({padding : 2, textColor : "white"});

        var LabelOrg = new qx.ui.basic.Label(" My Organisation ");
            LabelOrg.set({padding : 2, textColor : "white"});

        var iconOrg = new qx.ui.basic.Image("icon/16/categories/science.png");
            iconOrg.set({padding : 1});

        var LabelQuip = new qx.ui.basic.Label(" A Clever Quip ");
            LabelQuip.set({padding : 2, textColor : "white"});


        var left  = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({alignX : "left"}));
            left.add(LabelApp);

        var right = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({alignX : "right"}));
            right.add(LabelDiv);
            right.add(LabelOrg);
            right.add(iconOrg);
            right.add(LabelQuip);

        var titlebar = new qx.ui.container.Composite(new qx.ui.layout.HBox());
            titlebar.set({decorator : "app-header"});
            titlebar.add(left, {flex : 1});
            titlebar.add(right, {flex : 1});

        return titlebar;
    },


    /**
     * @type member
     * @return {qx.ui.toolbar.ToolBar} The top level application toolbar.
     */
    getToolbar : function()
    {
        var toolbar = this.__tb = new qx.ui.toolbar.ToolBar();

        var menuPart = this.__getMenuPart();
            toolbar.add(menuPart);

        var searchPart = this.__getSearchPart();
            toolbar.add(searchPart);

        return toolbar;
    },


    //  -----  PRIVATE HELPERS  -----


    //  -----  Toolbar Menu Parts  -----


    /**
     * @type member
     * @return {qx.ui.toolbar.Part} A toolbar part which contains all of the
     *         application menus.
     */
    __getMenuPart : function()
    {
      var fileMenu  = this.__getFileMenu();
      var helpMenu  = this.__getHelpMenu();

      var fileMenuButton  = new qx.ui.toolbar.MenuButton("File",  null, fileMenu);
      var helpMenuButton  = new qx.ui.toolbar.MenuButton("Help",  null, helpMenu);

      var menuPart = new qx.ui.toolbar.Part;
          menuPart.add(fileMenuButton);
          menuPart.add(helpMenuButton);

      return menuPart;
    },



    /**
     * @type member
     * @return {qx.ui.toolbar.Part} A toolbar part which contains the
     *         advanced search tool part.
     */
    __getSearchPart : function()
    {
        var command = this.__getNewWindowCommand("Search",
                                                 "Ctrl+S",
                                                 "icon/16/apps/office-database.png");

        var button = new qx.ui.toolbar.Button("Search",
                                              "icon/16/apps/office-database.png",
                                              command);

        var part = new qx.ui.toolbar.Part;
            part.add(button);

        return part;
    },


    //  -----  Toolbar Menus  -----


    /**
     * Build the File menu
     *
     * @type member
     * @return {qx.ui.menu.Menu} The application File menu
     */
    __getFileMenu : function()
    {

      // Create commands
      var closeAllCommand = null; // TODO
      var exitCommand   = null; //this.__getExitCommand();


      // Create the "New items" submenu
      var submenu = new qx.ui.menu.Menu();
      submenu.add( new qx.ui.menu.Button("Navigator",
                                         "icon/16/categories/internet.png",
                                         this.__getNewWindowCommand("navigator", "Ctrl+N", "icon/16/categories/internet.png")) );
      submenu.add( new qx.ui.menu.Button("Explorer",
                                         "icon/16/mimetypes/office-spreadsheet.png",
                                         this.__getNewWindowCommand("Explorer", "Ctrl+E", "icon/16/mimetypes/office-spreadsheet.png")) );
      submenu.add( new qx.ui.menu.Button("Viewer",
                                         "icon/16/devices/camera-photo.png",
                                         this.__getNewWindowCommand("Viewer", "Ctrl+V", "icon/16/devices/camera-photo.png")) );

      // Create the File menu
      var menu = new qx.ui.menu.Menu();
          menu.add( new qx.ui.menu.Button("New", null, null, submenu) );
          menu.add( new qx.ui.menu.Button("Close All", null, closeAllCommand) );
          menu.add( new qx.ui.menu.Separator() );
          menu.add( new qx.ui.menu.Button("Exit", null, exitCommand) );

      return menu;
    },


    /**
     * Build the Help menu
     *
     * @type member
     * @return {qx.ui.menu.Menu} The application Help menu
     */
    __getHelpMenu : function()
    {

      // Create commands
      var contactUsCommand          = null; //this.__getContactUsCommand();
      var noticesCommand            = null; //this.__getNoticesCommand();
      var helpCommand               = null; //this.__getHelpCommand();
      var aboutTheDataCommand       = null; //this.__getAboutTheDataCommand();
      var termsAndConditionsCommand = null; //this.__getTermsAndCondsCommand();
      var aboutCommand              = null; //this.__getAboutCommand();

      // Create the Help menu
      var menu = new qx.ui.menu.Menu();
          menu.add( new qx.ui.menu.Button("Help", "icon/16/actions/help-contents.png", helpCommand) );
          menu.add( new qx.ui.menu.Separator() );
          menu.add( new qx.ui.menu.Button("View Notices", null, noticesCommand) );
          menu.add( new qx.ui.menu.Separator() );
          menu.add( new qx.ui.menu.Button("About the Data", "icon/16/status/dialog-information.png", aboutTheDataCommand) );
          menu.add( new qx.ui.menu.Button("About My Application",
                                         "icon/16/actions/help-about.png",
                                         this.__getNewWindowCommand("About My Application",
                                                                    "Ctrl+B",
                                                                    "icon/16/actions/help-about.png")) );
          menu.add( new qx.ui.menu.Button("Contact Us", "icon/16/status/mail-unread.png", contactUsCommand) );
          menu.add( new qx.ui.menu.Separator() );
          menu.add( new qx.ui.menu.Button("Terms and Conditions", null, termsAndConditionsCommand) );

      return menu;
    },


    //  -----  Text Search Widget  -----


    /**
     * Build the Help menu
     *
     * @type member
     * @return {qx.ui.menu.Menu} The application Help menu
     */
    __getNewWindowCommand : function(caption, shortcut, icon)
    {
      var command = new qx.event.Command(shortcut);
          command.setUserData("caption", caption);
          command.setUserData("icon", icon);
          command.addListener("execute", this.__createWindowModel, command);

      return command;
    },


    /**
     * TODO migrate this into a Command subclass; and also support undo.
     *
     * Construct a new logical window Model instance, and add it to the
     * WindowManager.
     *
     * @type member
     * @param e {Event}
     * @return {void}
     */
    __createWindowModel : function(e)
    {
        var caption = this.getUserData("caption");
        var icon    = this.getUserData("icon");

        var model = new mdi.ui.window.Model();
            model.set({
                "type"          : caption,
                "caption"       : caption,
                "icon"          : icon,
                "singleton"     : false,
                "modal"         : false,
                "initialHeight" : 300,
                "initialWidth"  : 400,
                "initialTop"    : 100,
                "initialLeft"   : 100
            });

        qx.core.Init.getApplication().getWindowManager().addWindow(model);

        //return win;
    }

  }

});
