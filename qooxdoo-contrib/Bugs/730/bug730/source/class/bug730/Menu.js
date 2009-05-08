qx.Class.define("bug730.Menu",
{
  extend : qx.ui.core.Widget,
  include : [ qx.ui.core.MPlacement, qx.ui.core.MRemoteChildrenHandling ],


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    this._setLayout(new qx.ui.layout.Grow)

    this.__slideBar = new qx.ui.container.SlideBar;

    this.__slideBar._setLayout(new qx.ui.menu.Layout);

    this.add(this.__slideBar);

    // Automatically add to application's root
    this.getApplicationRoot().add(this);

    // Register mouse listeners
    this.addListener("mouseover", this._onMouseOver);
    this.addListener("mouseout", this._onMouseOut);

    // Initialize properties
    this.initVisibility();
    this.initKeepFocus();
    this.initKeepActive();
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /*
    ---------------------------------------------------------------------------
      WIDGET PROPERTIES
    ---------------------------------------------------------------------------
    */

    // overridden
    appearance :
    {
      refine : true,
      init : "menu"
    },

    // overridden
    allowGrowX :
    {
      refine : true,
      init: false
    },

    // overridden
    allowGrowY :
    {
      refine : true,
      init: false
    },

    // overridden
    visibility :
    {
      refine : true,
      init : "excluded"
    },

    // overridden
    keepFocus :
    {
      refine : true,
      init : true
    },

    // overridden
    keepActive :
    {
      refine : true,
      init : true
    },



    /*
    ---------------------------------------------------------------------------
      STYLE OPTIONS
    ---------------------------------------------------------------------------
    */

    /** The spacing between each cell of the menu buttons */
    spacingX :
    {
      check : "Integer",
      apply : "_applySpacingX",
      init : 0,
      themeable : true
    },

    /** The spacing between each menu button */
    spacingY :
    {
      check : "Integer",
      apply : "_applySpacingY",
      init : 0,
      themeable : true
    },

    /** Default icon column width if no icons are rendered */
    iconColumnWidth :
    {
      check : "Integer",
      init : 0,
      themeable : true,
      apply : "_applyIconColumnWidth"
    },

    /** Default arrow column width if no sub menus are rendered */
    arrowColumnWidth :
    {
      check : "Integer",
      init : 0,
      themeable : true,
      apply : "_applyArrowColumnWidth"
    },




    /*
    ---------------------------------------------------------------------------
      FUNCTIONALITY PROPERTIES
    ---------------------------------------------------------------------------
    */

    /** The currently selected button */
    selectedButton :
    {
      check : "qx.ui.core.Widget",
      nullable : true,
      apply : "_applySelectedButton"
    },

    /** The currently opened button (sub menu is visible) */
    openedButton :
    {
      check : "qx.ui.core.Widget",
      nullable : true,
      apply : "_applyOpenedButton"
    },

    /** Widget that opened the menu */
    opener :
    {
      check : "qx.ui.core.Widget",
      nullable : true
    },




    /*
    ---------------------------------------------------------------------------
      BEHAVIOR PROPERTIES
    ---------------------------------------------------------------------------
    */

    /** Interval in ms after which sub menus should be openend */
    openInterval :
    {
      check : "Integer",
      themeable : true,
      init : 250,
      apply : "_applyOpenInterval"
    },

    /** Interval in ms after which sub menus should be closed  */
    closeInterval :
    {
      check : "Integer",
      themeable : true,
      init : 250,
      apply : "_applyCloseInterval"
    }
  },



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {

    __slideBar : null,
    __scheduledOpen : null,

    getChildrenContainer : function()
    {
      return this.__slideBar;
    },

    /*
    ---------------------------------------------------------------------------
      PUBLIC API
    ---------------------------------------------------------------------------
    */

    /**
     * Opens the menu and configures the opener
     */
    open : function()
    {
      this.placeToWidget(this.getOpener());
      this.show();
    },


    /**
     * Convenience method to add a separator to the menu
     */
    addSeparator : function() {
      this.add(new qx.ui.menu.Separator);
    },


    /**
     * Returns the column sizes detected during the pre-layout phase
     *
     * @return {Array} List of all column widths
     */
    getColumnSizes : function() {
      return this.__slideBar._getLayout().getColumnSizes();
    },




    /*
    ---------------------------------------------------------------------------
      PROPERTY APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    // property apply
    _applyIconColumnWidth : function(value, old) {
      this.__slideBar._getLayout().setIconColumnWidth(value);
    },


    // property apply
    _applyArrowColumnWidth : function(value, old) {
      this.__slideBar._getLayout().setArrowColumnWidth(value);
    },


    // property apply
    _applySpacingX : function(value, old) {
      this.__slideBar._getLayout().setColumnSpacing(value);
    },


    // property apply
    _applySpacingY : function(value, old) {
      this.__slideBar._getLayout().setSpacing(value);
    },


    // overridden
    _applyVisibility : function(value, old)
    {
      this.base(arguments, value, old);

      var mgr = qx.ui.menu.Manager.getInstance();

      if (value === "visible")
      {
        // Register to manager (zIndex handling etc.)
        mgr.add(this);

        // Mark opened in parent menu
        var opener = this.getOpener();
        var parentMenu = opener.getLayoutParent();
        if (parentMenu && parentMenu instanceof qx.ui.menu.Menu) {
          parentMenu.setOpenedButton(opener);
        }
      }
      else if (old === "visible")
      {
        // Deregister from manager (zIndex handling etc.)
        mgr.remove(this);

        // Unmark opened in parent menu
        var opener = this.getOpener();
        var parentMenu = opener.getLayoutParent();
        if (parentMenu && parentMenu instanceof qx.ui.menu.Menu && parentMenu.getOpenedButton() == opener) {
          parentMenu.resetOpenedButton();
        }

        // Clear properties
        this.resetOpenedButton();
        this.resetSelectedButton();
      }
    },


    // property apply
    _applySelectedButton : function(value, old)
    {
      if (old) {
        old.removeState("selected");
      }

      if (value) {
        value.addState("selected");
      }
    },


    // property apply
    _applyOpenedButton : function(value, old)
    {
      if (old) {
        old.getMenu().exclude();
      }

      if (value) {
        value.getMenu().open();
      }
    },




    /*
    ---------------------------------------------------------------------------
      MOUSE EVENT HANDLING
    ---------------------------------------------------------------------------
    */

    /**
     * Event listener for mouseover event.
     *
     * @param e {qx.event.type.Mouse} mouseover event
     * @return {void}
     */
    _onMouseOver : function(e)
    {
      // Cache manager
      var mgr = qx.ui.menu.Manager.getInstance();

      // Be sure this menu is kept
      mgr.cancelClose(this);

      // Change selection
      var target = e.getTarget();
      if (target.isEnabled() && target instanceof qx.ui.menu.AbstractButton)
      {
        // Select button directly
        this.setSelectedButton(target);

        var subMenu = target.getMenu && target.getMenu();
        if (subMenu)
        {
          // Finally schedule for opening
          mgr.scheduleOpen(subMenu);

          // Remember scheduled menu for opening
          this.__scheduledOpen = subMenu;
        }
        else
        {
          var opened = this.getOpenedButton();
          if (opened) {
            mgr.scheduleClose(opened.getMenu());
          }

          if (this.__scheduledOpen)
          {
            mgr.cancelOpen(this.__scheduledOpen);
            this.__scheduledOpen = null;
          }
        }
      }
      else if (!this.getOpenedButton())
      {
        // When no button is opened reset the selection
        // Otherwise keep it
        this.resetSelectedButton();
      }
    },


    /**
     * Event listener for mouseout event.
     *
     * @param e {qx.event.type.Mouse} mouseout event
     * @return {void}
     */
    _onMouseOut : function(e)
    {
      // Cache manager
      var mgr = qx.ui.menu.Manager.getInstance();

      // Detect whether the related target is out of the menu
      if (!qx.ui.core.Widget.contains(this, e.getRelatedTarget()))
      {
        // Update selected property
        // Force it to the open sub menu in cases where that is opened
        // Otherwise reset it. Menus which are left by the cursor should
        // not show any selection.
        var opened = this.getOpenedButton();
        opened ? this.setSelectedButton(opened) : this.resetSelectedButton();

        // Cancel a pending close request for the currently
        // opened sub menu
        if (opened) {
          mgr.cancelClose(opened.getMenu());
        }

        // When leaving this menu to the outside, stop
        // all pending requests to open any other sub menu
        if (this.__scheduledOpen) {
          mgr.cancelOpen(this.__scheduledOpen);
        }
      }
    }
  },

  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    if (!qx.core.ObjectRegistry.inShutDown) {
      qx.ui.menu.Manager.getInstance().remove(this);
    }
  }
});








/*
      qx.Class.define("bug730.Menu",
      {
        extend : qx.ui.core.Widget,
        // include : [ qx.ui.core.MPlacement, qx.ui.core.MRemoteChildrenHandling ],
        include : [ qx.ui.core.MPlacement, qx.ui.core.MChildrenHandling ],

        construct : function()
        {
          this.base(arguments);

          // Use hard coded layout
          this._setLayout(new qx.ui.menu.Layout);

          // Automatically add to application's root
          this.getApplicationRoot().add(this);

          // Register mouse listeners
          // this.addListener("mouseover", this._onMouseOver);
          // this.addListener("mouseout", this._onMouseOut);

          // Initialize properties
          this.initVisibility();
          this.initKeepFocus();
          this.initKeepActive();

          // this.base();
          // 
          // this._setLayout(new qx.ui.layout.Grow)
          // 
          // this.__slideBar = new qx.ui.container.SlideBar;
          // 
          // // Use hard coded layout
          // this.__slideBar._setLayout(new qx.ui.menu.Layout);
          // 
          // this.add(this.__slideBar, {flex: 1});
          // 
          // // Automatically add to application's root
          // this.getApplicationRoot().add(this);
          // 
          // // Register mouse listeners
          // this.addListener("mouseover", this._onMouseOver);
          // this.addListener("mouseout", this._onMouseOut);
          // 
          // // Initialize properties
          // this.initVisibility();
          // this.initKeepFocus();
          // this.initKeepActive();
          // console.warn("now")
        },

        members :
        {
          __dimensions : null,


          getChildrenContainer : function()
          {
            return this.__slideBar;
          },

          measureHeight : function()
          {
            //Hack: Show menu so real height is computed
            var oldHeight = this.getHeight();
//            this.setHeight("auto");

//            var oldRestrictValue = this.getRestrictToPageOnOpen();
//            this.setRestrictToPageOnOpen(false);

            //Move out of view so it is not rendered on screen
            //Method stolen from qooxdoo/Popup.js
            var hideOffsetLeft = 10000;
            var oldLeftValue = this.getLeft();
            this.setLeft(hideOffsetLeft);

            if (this.getElement() != null)
            {
              // The popup was already visible once before
              // -> Move it immediately before it gets visible again
              this.getElement().style.left = hideOffsetLeft;
            }

            this.show();

            //Flush queue so it is layouted
            qx.ui.core.Widget.flushGlobalQueues();

            var height = this.getHeightValue();

            //Hide again, on next open it will have correct size
            this.hide();
//            this.setRestrictToPageOnOpen(oldRestrictValue);
            this.setLeft(oldLeftValue);
            this.setHeight(oldHeight);

            this._measuredHeight = height;
          },

          __correctSizes : function(availableWidth, availableHeight)
          {
            
            var location = this.getContentLocation();
            var dimensions = qx.bom.element.Dimension.getSize(this.getContainerElement().getDomElement());
            
            availableHeight -= location.top;
            availableWidth -= location.left;
            
            if (dimensions.height > availableHeight)
            {
              this.__oldHeight = dimensions.height;
              // this.setOverflowY("scroll");
              this.setHeight(availableHeight);
            }
            else
            {
              this.setHeight(this.__oldHeight);
              // this.setOverflowY("hidden");
            }

          },

          // overridden
          // show vertical scroll bars if needed
          open : function()
          {
            this.base(arguments);
            
            var availableHeight = qx.bom.Viewport.getHeight();
            var availableWidth = qx.bom.Viewport.getWidth();
            
            var timer = qx.util.TimerManager.getInstance();

            timer.start(
              function(){
                this.__correctSizes(availableWidth, availableHeight);
              },
              0,
              this
            );

            this.base(arguments);
          }

        }
      });
*/