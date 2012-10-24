/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * The menu is a popup like control which supports buttons. It comes
 * with full keyboard navigation and an improved timeout based mouse
 * control behavior.
 *
 * This class is the container for all derived instances of
 * {@link qx.ui.menu.AbstractButton}.
 *
 * @childControl slidebar {qx.ui.menu.MenuSlideBar} shows a slidebar to easily navigate inside the menu (if too little space is left)
 */
qx.Class.define("qx.ui.menu.Menu",
{
  extend : qx.ui.core.Widget,

  include : [
    qx.ui.core.MPlacement,
    qx.ui.core.MRemoteChildrenHandling
  ],


  construct : function()
  {
    this.base(arguments);

    // Use hard coded layout
    this._setLayout(new qx.ui.menu.Layout);

    // Automatically add to application's root
    var root = this.getApplicationRoot();
    root.add(this);

    // Register mouse listeners
    this.addListener("mouseover", this._onMouseOver);
    this.addListener("mouseout", this._onMouseOut);

    // add resize listener
    this.addListener("resize", this._onResize, this);
    root.addListener("resize", this._onResize, this);

    this._blocker = new qx.ui.core.Blocker(root);

    // Initialize properties
    this.initVisibility();
    this.initKeepFocus();
    this.initKeepActive();
  },



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

    /**
    * Default icon column width if no icons are rendered.
    * This property is ignored as soon as an icon is present.
    */
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

    /**
     * Color of the blocker
     */
    blockerColor :
    {
      check : "Color",
      init : null,
      nullable: true,
      apply : "_applyBlockerColor",
      themeable: true
    },

    /**
     * Opacity of the blocker
     */
    blockerOpacity :
    {
      check : "Number",
      init : 1,
      apply : "_applyBlockerOpacity",
      themeable: true
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

    /** Interval in ms after which sub menus should be opened */
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
    },

    /** Blocks the background if value is <code>true<code> */
    blockBackground :
    {
      check : "Boolean",
      themeable : true,
      init : false
    }
  },



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {

    __scheduledOpen : null,
    __onAfterSlideBarAdd : null,

    /** {qx.ui.core.Blocker} blocker for background blocking */
    _blocker : null,

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
      if (this.getOpener() != null)
      {
        this.placeToWidget(this.getOpener());
        this.__updateSlideBar();
        this.show();

        this._placementTarget = this.getOpener();
      } else {
        this.warn("The menu instance needs a configured 'opener' widget!");
      }
    },


    /**
     * Opens the menu at the mouse cursor position
     *
     * @param e {qx.event.type.Mouse}  Mouse event to align to
     */
    openAtMouse : function(e)
    {
      this.placeToMouse(e);
      this.__updateSlideBar();
      this.show();

      this._placementTarget = {
        left: e.getDocumentLeft(),
        top: e.getDocumentTop()
      };
    },


    /**
     * Opens the menu in relation to the given point
     *
     * @param point {Map} Coordinate of any point with the keys <code>left</code>
     *   and <code>top</code>.
     */
    openAtPoint : function(point)
    {
      this.placeToPoint(point);
      this.__updateSlideBar();
      this.show();

      this._placementTarget = point;
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
      return this._getMenuLayout().getColumnSizes();
    },


    /**
     * Return all selectable menu items.
     *
     * @return {qx.ui.core.Widget[]} selectable widgets
     */
    getSelectables : function() {
      var result = [];
      var children = this.getChildren();

      for (var i = 0; i < children.length; i++)
      {
        if (children[i].isEnabled()) {
          result.push(children[i]);
        }
      }

      return result;
    },


    /*
    ---------------------------------------------------------------------------
      PROPERTY APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    // property apply
    _applyIconColumnWidth : function(value, old) {
      this._getMenuLayout().setIconColumnWidth(value);
    },


    // property apply
    _applyArrowColumnWidth : function(value, old) {
      this._getMenuLayout().setArrowColumnWidth(value);
    },


    // property apply
    _applySpacingX : function(value, old) {
      this._getMenuLayout().setColumnSpacing(value);
    },


    // property apply
    _applySpacingY : function(value, old) {
      this._getMenuLayout().setSpacing(value);
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
        var parentMenu = this.getParentMenu();
        if (parentMenu) {
          parentMenu.setOpenedButton(this.getOpener());
        }
      }
      else if (old === "visible")
      {
        // Deregister from manager (zIndex handling etc.)
        mgr.remove(this);

        // Unmark opened in parent menu
        var parentMenu = this.getParentMenu();
        if (parentMenu && parentMenu.getOpenedButton() == this.getOpener()) {
          parentMenu.resetOpenedButton();
        }

        // Clear properties
        this.resetOpenedButton();
        this.resetSelectedButton();
      }

      this.__updateBlockerVisibility();
    },


    /**
     * Updates the blocker's visibility
     */
    __updateBlockerVisibility : function()
    {
      if (this.isVisible())
      {
        if (this.getBlockBackground()) {
          var zIndex = this.getZIndex();
          this._blocker.blockContent(zIndex - 1);
        }
      }
      else
      {
        if (this._blocker.isContentBlocked()) {
          this._blocker.unblockContent();
        }
      }
    },


    /**
     * Get the parent menu. Returns <code>null</code> if the menu doesn't have a
     * parent menu.
     *
     * @return {Menu|null} The parent menu.
     */
    getParentMenu : function()
    {
      var widget = this.getOpener();
      if (!widget || !(widget instanceof qx.ui.menu.AbstractButton)) {
        return null;
      }

      if (widget && widget.getContextMenu() === this) {
        return null;
      }

      while (widget && !(widget instanceof qx.ui.menu.Menu)) {
        widget = widget.getLayoutParent();
      }
      return widget;
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
      if (old && old.getMenu()) {
        old.getMenu().exclude();
      }

      if (value) {
        value.getMenu().open();
      }
    },


    // property apply
    _applyBlockerColor : function(value, old) {
      this._blocker.setColor(value);
    },


    // property apply
    _applyBlockerOpacity : function(value, old) {
      this._blocker.setOpacity(value);
    },


    /*
    ---------------------------------------------------------------------------
    SCROLLING SUPPORT
    ---------------------------------------------------------------------------
    */

    // overridden
    getChildrenContainer : function() {
      return this.getChildControl("slidebar", true) || this;
    },


    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        case "slidebar":
          var control = new qx.ui.menu.MenuSlideBar();

          var layout = this._getLayout();
          this._setLayout(new qx.ui.layout.Grow());

          var slidebarLayout = control.getLayout();
          control.setLayout(layout);
          slidebarLayout.dispose();

          var children = qx.lang.Array.clone(this.getChildren());
          for (var i=0; i<children.length; i++) {
            control.add(children[i]);
          }

          this.removeListener("resize", this._onResize, this);
          control.getChildrenContainer().addListener("resize", this._onResize, this);

          this._add(control);

        break;
      }

      return control || this.base(arguments, id);
    },


    /**
     * Get the menu layout manager
     *
     * @return {Layout} The menu layout manager
     */
    _getMenuLayout : function()
    {
      if (this.hasChildControl("slidebar")) {
        return this.getChildControl("slidebar").getChildrenContainer().getLayout();
      } else {
        return this._getLayout();
      }
    },


    /**
     * Get the menu bounds
     *
     * @return {Map} The menu bounds
     */
    _getMenuBounds : function()
    {
      if (this.hasChildControl("slidebar")) {
        return this.getChildControl("slidebar").getChildrenContainer().getBounds();
      } else {
        return this.getBounds();
      }
    },


    /**
     * Computes the size of the menu. This method is used by the
     * {@link qx.ui.core.MPlacement} mixin.
     */
    _computePlacementSize : function() {
      return this._getMenuBounds();
    },


    /**
     * Updates the visibility of the slidebar based on the menu's current size
     * and position.
     */
    __updateSlideBar : function()
    {
      var menuBounds = this._getMenuBounds();
      if (!menuBounds)
      {
        this.addListenerOnce("resize", this.__updateSlideBar, this)
        return;
      }

      var rootHeight = this.getLayoutParent().getBounds().height;
      var top = this.getLayoutProperties().top;
      var left = this.getLayoutProperties().left;

      // Adding the slidebar must be deferred because this call can happen
      // during the layout flush, which make it impossible to move existing
      // layout to the slidebar
      if (top < 0)
      {
        this._assertSlideBar(function() {
          this.setHeight(menuBounds.height + top);
          this.moveTo(left, 0);
        });
      }
      else if (top + menuBounds.height > rootHeight)
      {
        this._assertSlideBar(function() {
          this.setHeight(rootHeight - top);
        });
      }
      else
      {
        this.setHeight(null);
      }
    },


    /**
     * Schedules the addition of the slidebar and calls the given callback
     * after the slidebar has been added.
     *
     * @param callback {Function} the callback to call
     */
    _assertSlideBar : function(callback)
    {
      if (this.hasChildControl("slidebar")) {
        return callback.call(this);
      }

      this.__onAfterSlideBarAdd = callback;
      qx.ui.core.queue.Widget.add(this);
    },


    // overridden
    syncWidget : function()
    {
      this.getChildControl("slidebar");
      if (this.__onAfterSlideBarAdd)
      {
        this.__onAfterSlideBarAdd.call(this);
        delete this.__onAfterSlideBarAdd;
      }
    },


    /*
    ---------------------------------------------------------------------------
      EVENT HANDLING
    ---------------------------------------------------------------------------
    */

    /**
     * Update position if the menu or the root is resized
     */
    _onResize : function()
    {
      if (this.isVisible())
      {
        var target = this._placementTarget;
        if (!target) {
          return
        } else if (target instanceof qx.ui.core.Widget) {
          this.placeToWidget(target);
        } else if (target.top !== undefined) {
          this.placeToPoint(target);
        } else {
          throw new Error("Unknown target: " + target);
        }
        this.__updateSlideBar();
      }
    },


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
          subMenu.setOpener(target);

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

    this.getApplicationRoot().removeListener("resize", this._onResize, this);
    this._placementTarget = null;
    this._disposeObjects("_blocker");
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * Layouter used by the qooxdoo menu's to render their buttons
 *
 * @internal
 */
qx.Class.define("qx.ui.menu.Layout",
{
  extend : qx.ui.layout.VBox,


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /** Spacing between each cell on the menu buttons */
    columnSpacing :
    {
      check : "Integer",
      init : 0,
      apply : "_applyLayoutChange"
    },

    /**
     * Whether a column and which column should automatically span
     * when the following cell is empty. Spanning may be disabled
     * through setting this property to <code>null</code>.
     */
    spanColumn :
    {
      check : "Integer",
      init : 1,
      nullable : true,
      apply : "_applyLayoutChange"
    },

    /** Default icon column width if no icons are rendered */
    iconColumnWidth :
    {
      check : "Integer",
      init : 0,
      themeable : true,
      apply : "_applyLayoutChange"
    },

    /** Default arrow column width if no sub menus are rendered */
    arrowColumnWidth :
    {
      check : "Integer",
      init : 0,
      themeable : true,
      apply : "_applyLayoutChange"
    }
  },



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __columnSizes : null,

    /*
    ---------------------------------------------------------------------------
      LAYOUT INTERFACE
    ---------------------------------------------------------------------------
    */

    // overridden
    _computeSizeHint : function()
    {
      var children = this._getLayoutChildren();
      var child, sizes, spacing;

      var spanColumn = this.getSpanColumn();
      var columnSizes = this.__columnSizes = [0, 0, 0, 0];
      var columnSpacing = this.getColumnSpacing();
      var spanColumnWidth = 0;
      var maxInset = 0;

      // Compute column sizes and insets
      for (var i=0, l=children.length; i<l; i++)
      {
        child = children[i];

        if (child.isAnonymous()) {
          continue;
        }

        sizes = child.getChildrenSizes();

        for (var column=0; column<sizes.length; column++)
        {
          if (spanColumn != null && column == spanColumn && sizes[spanColumn+1] == 0) {
            spanColumnWidth = Math.max(spanColumnWidth, sizes[column]);
          } else {
            columnSizes[column] = Math.max(columnSizes[column], sizes[column])
          }
        }

        var insets = children[i].getInsets();
        maxInset = Math.max(maxInset, insets.left + insets.right);
      }

      // Fix label column width is cases where the maximum button with no shortcut
      // is larger than the maximum button with a shortcut
      if (spanColumn != null && columnSizes[spanColumn] + columnSpacing + columnSizes[spanColumn+1] < spanColumnWidth) {
        columnSizes[spanColumn] = spanColumnWidth - columnSizes[spanColumn+1] - columnSpacing;
      }

      // When merging the cells for label and shortcut
      // ignore the spacing between them
      if (spanColumnWidth == 0) {
        spacing = columnSpacing * 2;
      } else {
        spacing = columnSpacing * 3;
      }

      // Fix zero size icon column
      if (columnSizes[0] == 0) {
        columnSizes[0] = this.getIconColumnWidth();
      }

      // Fix zero size arrow column
      if (columnSizes[3] == 0) {
        columnSizes[3] = this.getArrowColumnWidth();
      }

      var height = this.base(arguments).height;

      // Build hint
      return {
        minHeight: height,
        height : height,
        width : qx.lang.Array.sum(columnSizes) + maxInset + spacing
      };
    },



    /*
    ---------------------------------------------------------------------------
      CUSTOM ADDONS
    ---------------------------------------------------------------------------
    */

    /**
     * Returns the column sizes detected during the pre-layout phase
     *
     * @return {Array} List of all column widths
     */
    getColumnSizes : function() {
      return this.__columnSizes || null;
    }
  },

  /*
   *****************************************************************************
      DESTRUCT
   *****************************************************************************
   */

  destruct : function() {
    this.__columnSizes = null;
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * This widget draws a separator line between two instances of
 * {@link qx.ui.menu.AbstractButton} and is inserted into the
 * {@link qx.ui.menu.Menu}.
 *
 * For convenience reasons there is also
 * a method {@link qx.ui.menu.Menu#addSeparator} to append instances
 * of this class to the menu.
 */
qx.Class.define("qx.ui.menu.Separator",
{
  extend : qx.ui.core.Widget,




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    // overridden
    appearance :
    {
      refine : true,
      init : "menu-separator"
    },

    // overridden
    anonymous :
    {
      refine : true,
      init : true
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

************************************************************************ */

/**
 * This singleton manages visible menu instances and supports some
 * core features to schedule menu open/close with timeout support.
 *
 * It also manages the whole keyboard support for the currently
 * registered widgets.
 *
 * The zIndex order is also managed by this class.
 */
qx.Class.define("qx.ui.menu.Manager",
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

    // Create data structure
    this.__objects = [];

    var el = document.body;
    var Registration = qx.event.Registration;

    // React on mousedown/mouseup events, but on native, to support inline applications
    Registration.addListener(window.document.documentElement, "mousedown", this._onMouseDown, this, true);

    // React on keypress events
    Registration.addListener(el, "keydown", this._onKeyUpDown, this, true);
    Registration.addListener(el, "keyup", this._onKeyUpDown, this, true);
    Registration.addListener(el, "keypress", this._onKeyPress, this, true);

    // only use the blur event to hide windows on non touch devices [BUG #4033]
    // When the menu is locaed on top of an iFrame, the select will fail
    if (!qx.core.Environment.get("event.touch")) {
      // Hide all when the window is blurred
      qx.bom.Element.addListener(window, "blur", this.hideAll, this);
    }

    // Create open timer
    this.__openTimer = new qx.event.Timer;
    this.__openTimer.addListener("interval", this._onOpenInterval, this);

    // Create close timer
    this.__closeTimer = new qx.event.Timer;
    this.__closeTimer.addListener("interval", this._onCloseInterval, this);
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __scheduleOpen : null,
    __scheduleClose : null,
    __openTimer : null,
    __closeTimer : null,
    __objects : null,




    /*
    ---------------------------------------------------------------------------
      HELPER METHODS
    ---------------------------------------------------------------------------
    */

    /**
     * Query engine for menu children.
     *
     * @param menu {qx.ui.menu.Menu} Any menu instance
     * @param start {Integer} Child index to start with
     * @param iter {Integer} Iteration count, normally <code>+1</code> or <code>-1</code>
     * @param loop {Boolean?false} Whether to wrap when reaching the begin/end of the list
     * @return {qx.ui.menu.Button} Any menu button or <code>null</code>
     */
    _getChild : function(menu, start, iter, loop)
    {
      var children = menu.getChildren();
      var length = children.length;
      var child;

      for (var i=start; i<length && i>=0; i+=iter)
      {
        child = children[i];
        if (child.isEnabled() && !child.isAnonymous() && child.isVisible()) {
          return child;
        }
      }

      if (loop)
      {
        i = i == length ? 0 : length-1;
        for (; i!=start; i+=iter)
        {
          child = children[i];
          if (child.isEnabled() && !child.isAnonymous() && child.isVisible()) {
            return child;
          }
        }
      }

      return null;
    },


    /**
     * Whether the given widget is inside any Menu instance.
     *
     * @param widget {qx.ui.core.Widget} Any widget
     * @return {Boolean} <code>true</code> when the widget is part of any menu
     */
    _isInMenu : function(widget)
    {
      while(widget)
      {
        if (widget instanceof qx.ui.menu.Menu) {
          return true;
        }

        widget = widget.getLayoutParent();
      }

      return false;
    },


    /**
     * Returns an instance of a menu button if the given widget is a child
     *
     * @param widget {qx.ui.core.Widget} any widget
     * @return {qx.ui.menu.Button} Any menu button instance or <code>null</code>
     */
    _getMenuButton : function(widget)
    {
      while(widget)
      {
        if (widget instanceof qx.ui.menu.AbstractButton) {
          return widget;
        }

        widget = widget.getLayoutParent();
      }

      return null;
    },


    /*
    ---------------------------------------------------------------------------
      PUBLIC METHODS
    ---------------------------------------------------------------------------
    */

    /**
     * Adds a menu to the list of visible menus.
     *
     * @param obj {qx.ui.menu.Menu} Any menu instance.
     */
    add : function(obj)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        if (!(obj instanceof qx.ui.menu.Menu)) {
          throw new Error("Object is no menu: " + obj);
        }
      }

      var reg = this.__objects;
      reg.push(obj);
      obj.setZIndex(1e6+reg.length);
    },


    /**
     * Remove a menu from the list of visible menus.
     *
     * @param obj {qx.ui.menu.Menu} Any menu instance.
     */
    remove : function(obj)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        if (!(obj instanceof qx.ui.menu.Menu)) {
          throw new Error("Object is no menu: " + obj);
        }
      }

      var reg = this.__objects;
      if (reg) {
        qx.lang.Array.remove(reg, obj);
      }
    },


    /**
     * Hides all currently opened menus.
     */
    hideAll : function()
    {
      var reg = this.__objects;
      if (reg)
      {
        for (var i=reg.length-1; i>=0; i--) {
          reg[i].exclude();
        }
      }
    },


    /**
     * Returns the menu which was opened at last (which
     * is the active one this way)
     *
     * @return {qx.ui.menu.Menu} The current active menu or <code>null</code>
     */
    getActiveMenu : function()
    {
      var reg = this.__objects;
      return reg.length > 0 ? reg[reg.length-1] : null;
    },




    /*
    ---------------------------------------------------------------------------
      SCHEDULED OPEN/CLOSE SUPPORT
    ---------------------------------------------------------------------------
    */

    /**
     * Schedules the given menu to be opened after the
     * {@link qx.ui.menu.Menu#openInterval} configured by the
     * menu instance itself.
     *
     * @param menu {qx.ui.menu.Menu} The menu to schedule for open
     */
    scheduleOpen : function(menu)
    {
      // Cancel close of given menu first
      this.cancelClose(menu);

      // When the menu is already visible
      if (menu.isVisible())
      {
        // Cancel all other open requests
        if (this.__scheduleOpen) {
          this.cancelOpen(this.__scheduleOpen);
        }
      }

      // When the menu is not visible and not scheduled already
      // then schedule it for opening
      else if (this.__scheduleOpen != menu)
      {
        // menu.debug("Schedule open");
        this.__scheduleOpen = menu;
        this.__openTimer.restartWith(menu.getOpenInterval());
      }
    },


    /**
     * Schedules the given menu to be closed after the
     * {@link qx.ui.menu.Menu#closeInterval} configured by the
     * menu instance itself.
     *
     * @param menu {qx.ui.menu.Menu} The menu to schedule for close
     */
    scheduleClose : function(menu)
    {
      // Cancel open of the menu first
      this.cancelOpen(menu);

      // When the menu is already invisible
      if (!menu.isVisible())
      {
        // Cancel all other close requests
        if (this.__scheduleClose) {
          this.cancelClose(this.__scheduleClose);
        }
      }

      // When the menu is visible and not scheduled already
      // then schedule it for closing
      else if (this.__scheduleClose != menu)
      {
        // menu.debug("Schedule close");
        this.__scheduleClose = menu;
        this.__closeTimer.restartWith(menu.getCloseInterval());
      }
    },


    /**
     * When the given menu is scheduled for open this pending
     * request is canceled.
     *
     * @param menu {qx.ui.menu.Menu} The menu to cancel for open
     */
    cancelOpen : function(menu)
    {
      if (this.__scheduleOpen == menu)
      {
        // menu.debug("Cancel open");
        this.__openTimer.stop();
        this.__scheduleOpen = null;
      }
    },


    /**
     * When the given menu is scheduled for close this pending
     * request is canceled.
     *
     * @param menu {qx.ui.menu.Menu} The menu to cancel for close
     */
    cancelClose : function(menu)
    {
      if (this.__scheduleClose == menu)
      {
        // menu.debug("Cancel close");
        this.__closeTimer.stop();
        this.__scheduleClose = null;
      }
    },




    /*
    ---------------------------------------------------------------------------
      TIMER EVENT HANDLERS
    ---------------------------------------------------------------------------
    */

    /**
     * Event listener for a pending open request. Configured to the interval
     * of the current menu to open.
     *
     * @param e {qx.event.type.Event} Interval event
     */
    _onOpenInterval : function(e)
    {
      // Stop timer
      this.__openTimer.stop();

      // Open menu and reset flag
      this.__scheduleOpen.open();
      this.__scheduleOpen = null;
    },


    /**
     * Event listener for a pending close request. Configured to the interval
     * of the current menu to close.
     *
     * @param e {qx.event.type.Event} Interval event
     */
    _onCloseInterval : function(e)
    {
      // Stop timer, reset scheduling flag
      this.__closeTimer.stop();

      // Close menu and reset flag
      this.__scheduleClose.exclude();
      this.__scheduleClose = null;
    },




    /*
    ---------------------------------------------------------------------------
      MOUSE EVENT HANDLERS
    ---------------------------------------------------------------------------
    */

    /**
     * Event handler for mousedown events
     *
     * @param e {qx.event.type.Mouse} mousedown event
     */
    _onMouseDown : function(e)
    {
      var target = e.getTarget();
      target = qx.ui.core.Widget.getWidgetByElement(target, true);

      // If the target is 'null' the click appears on a DOM element witch is not
      // a widget. This happens normally with an inline application, when the user
      // clicks not in the inline application. In this case all all currently
      // open menus should be closed.
      if (target == null) {
        this.hideAll();
        return;
      }

      // If the target is the one which has opened the current menu
      // we ignore the mousedown to let the button process the event
      // further with toggling or ignoring the click.
      if (target.getMenu && target.getMenu() && target.getMenu().isVisible()) {
        return;
      }

      // All clicks not inside a menu will hide all currently open menus
      if (this.__objects.length > 0 && !this._isInMenu(target)) {
        this.hideAll();
      }
    },


    /*
    ---------------------------------------------------------------------------
      KEY EVENT HANDLING
    ---------------------------------------------------------------------------
    */

    /**
     * {Map} Map of all keys working on an active menu selection
     * @lint ignoreReferenceField(__selectionKeys)
     */
    __selectionKeys :
    {
      "Enter" : 1,
      "Space" : 1
    },


    /**
     * {Map} Map of all keys working without a selection
     * @lint ignoreReferenceField(__navigationKeys)
     */
    __navigationKeys :
    {
      "Escape" : 1,
      "Up" : 1,
      "Down" : 1,
      "Left" : 1,
      "Right" : 1
    },


    /**
     * Event handler for all keyup/keydown events. Stops all events
     * when any menu is opened.
     *
     * @param e {qx.event.type.KeySequence} Keyboard event
     * @return {void}
     */
    _onKeyUpDown : function(e)
    {
      var menu = this.getActiveMenu();
      if (!menu) {
        return;
      }

      // Stop for all supported key combos
      var iden = e.getKeyIdentifier();
      if (this.__navigationKeys[iden] || (this.__selectionKeys[iden] && menu.getSelectedButton())) {
        e.stopPropagation();
      }
    },


    /**
     * Event handler for all keypress events. Delegates the event to the more
     * specific methods defined in this class.
     *
     * Currently processes the keys: <code>Up</code>, <code>Down</code>,
     * <code>Left</code>, <code>Right</code> and <code>Enter</code>.
     *
     * @param e {qx.event.type.KeySequence} Keyboard event
     * @return {void}
     */
    _onKeyPress : function(e)
    {
      var menu = this.getActiveMenu();
      if (!menu) {
        return;
      }

      var iden = e.getKeyIdentifier();
      var navigation = this.__navigationKeys[iden];
      var selection = this.__selectionKeys[iden];

      if (navigation)
      {
        switch(iden)
        {
          case "Up":
            this._onKeyPressUp(menu);
            break;

          case "Down":
            this._onKeyPressDown(menu);
            break;

          case "Left":
            this._onKeyPressLeft(menu);
            break;

          case "Right":
            this._onKeyPressRight(menu);
            break;

          case "Escape":
            this.hideAll();
            break;
        }

        e.stopPropagation();
        e.preventDefault();
      }
      else if (selection)
      {
        // Do not process these events when no item is hovered
        var button = menu.getSelectedButton();
        if (button)
        {
          switch(iden)
          {
            case "Enter":
              this._onKeyPressEnter(menu, button, e);
              break;

            case "Space":
              this._onKeyPressSpace(menu, button, e);
              break;
          }

          e.stopPropagation();
          e.preventDefault();
        }
      }
    },


    /**
     * Event handler for <code>Up</code> key
     *
     * @param menu {qx.ui.menu.Menu} The active menu
     * @return {void}
     */
    _onKeyPressUp : function(menu)
    {
      // Query for previous child
      var selectedButton = menu.getSelectedButton();
      var children = menu.getChildren();
      var start = selectedButton ? menu.indexOf(selectedButton)-1 : children.length-1;
      var nextItem = this._getChild(menu, start, -1, true);

      // Reconfigure property
      if (nextItem) {
        menu.setSelectedButton(nextItem);
      } else {
        menu.resetSelectedButton();
      }
    },


    /**
     * Event handler for <code>Down</code> key
     *
     * @param menu {qx.ui.menu.Menu} The active menu
     * @return {void}
     */
    _onKeyPressDown : function(menu)
    {
      // Query for next child
      var selectedButton = menu.getSelectedButton();
      var start = selectedButton ? menu.indexOf(selectedButton)+1 : 0;
      var nextItem = this._getChild(menu, start, 1, true);

      // Reconfigure property
      if (nextItem) {
        menu.setSelectedButton(nextItem);
      } else {
        menu.resetSelectedButton();
      }
    },


    /**
     * Event handler for <code>Left</code> key
     *
     * @param menu {qx.ui.menu.Menu} The active menu
     * @return {void}
     */
    _onKeyPressLeft : function(menu)
    {
      var menuOpener = menu.getOpener();
      if (!menuOpener) {
        return;
      }

      // Back to the "parent" menu
      if (menuOpener instanceof qx.ui.menu.AbstractButton)
      {
        var parentMenu = menuOpener.getLayoutParent();

        parentMenu.resetOpenedButton();
        parentMenu.setSelectedButton(menuOpener);
      }

      // Goto the previous toolbar button
      else if (menuOpener instanceof qx.ui.menubar.Button)
      {
        var buttons = menuOpener.getMenuBar().getMenuButtons();
        var index = buttons.indexOf(menuOpener);

        // This should not happen, definitely!
        if (index === -1) {
          return;
        }

        // Get previous button, fallback to end if first arrived
        var prevButton = null;
        var length =  buttons.length;
        for (var i = 1; i <= length; i++)
        {
          var button = buttons[(index - i + length) % length];
          if(button.isEnabled() && button.isVisible()) {
            prevButton = button;
            break;
          }
        }

        if (prevButton && prevButton != menuOpener) {
          prevButton.open(true);
        }
      }
    },


    /**
     * Event handler for <code>Right</code> key
     *
     * @param menu {qx.ui.menu.Menu} The active menu
     * @return {void}
     */
    _onKeyPressRight : function(menu)
    {
      var selectedButton = menu.getSelectedButton();

      // Open sub-menu of hovered item and select first child
      if (selectedButton)
      {
        var subMenu = selectedButton.getMenu();

        if (subMenu)
        {
          // Open previously hovered item
          menu.setOpenedButton(selectedButton);

          // Hover first item in new submenu
          var first = this._getChild(subMenu, 0, 1);
          if (first) {
            subMenu.setSelectedButton(first);
          }

          return;
        }
      }

      // No hover and no open item
      // When first button has a menu, open it, otherwise only hover it
      else if (!menu.getOpenedButton())
      {
        var first = this._getChild(menu, 0, 1);

        if (first)
        {
          menu.setSelectedButton(first);

          if (first.getMenu()) {
            menu.setOpenedButton(first);
          }

          return;
        }
      }

      // Jump to the next toolbar button
      var menuOpener = menu.getOpener();

      // Look up opener hierarchy for menu button
      if (menuOpener instanceof qx.ui.menu.Button && selectedButton)
      {
        // From one inner selected button try to find the top level
        // menu button which has opened the whole menu chain.
        while (menuOpener)
        {
          menuOpener = menuOpener.getLayoutParent();
          if (menuOpener instanceof qx.ui.menu.Menu)
          {
            menuOpener = menuOpener.getOpener();
            if (menuOpener instanceof qx.ui.menubar.Button) {
              break;
            }
          }
          else
          {
            break;
          }
        }

        if (!menuOpener) {
          return;
        }
      }

      // Ask the toolbar for the next menu button
      if (menuOpener instanceof qx.ui.menubar.Button)
      {
        var buttons = menuOpener.getMenuBar().getMenuButtons();
        var index = buttons.indexOf(menuOpener);

        // This should not happen, definitely!
        if (index === -1) {
          return;
        }

        // Get next button, fallback to first if end arrived
        var nextButton = null;
        var length =  buttons.length;
        for (var i = 1; i <= length; i++)
        {
          var button = buttons[(index + i) % length];
          if(button.isEnabled() && button.isVisible()) {
            nextButton = button;
            break;
          }
        }

        if (nextButton && nextButton != menuOpener) {
          nextButton.open(true);
        }
      }
    },


    /**
     * Event handler for <code>Enter</code> key
     *
     * @param menu {qx.ui.menu.Menu} The active menu
     * @param button {qx.ui.menu.AbstractButton} The selected button
     * @param e {qx.event.type.KeySequence} The keypress event
     * @return {void}
     */
    _onKeyPressEnter : function(menu, button, e)
    {
      // Route keypress event to the selected button
      if (button.hasListener("keypress"))
      {
        // Clone and reconfigure event
        var clone = e.clone();
        clone.setBubbles(false);
        clone.setTarget(button);

        // Finally dispatch the clone
        button.dispatchEvent(clone);
      }

      // Hide all open menus
      this.hideAll();
    },


    /**
     * Event handler for <code>Space</code> key
     *
     * @param menu {qx.ui.menu.Menu} The active menu
     * @param button {qx.ui.menu.AbstractButton} The selected button
     * @param e {qx.event.type.KeySequence} The keypress event
     * @return {void}
     */
    _onKeyPressSpace : function(menu, button, e)
    {
      // Route keypress event to the selected button
      if (button.hasListener("keypress"))
      {
        // Clone and reconfigure event
        var clone = e.clone();
        clone.setBubbles(false);
        clone.setTarget(button);

        // Finally dispatch the clone
        button.dispatchEvent(clone);
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
    var Registration = qx.event.Registration;
    var el = document.body;

    // React on mousedown/mouseup events
    Registration.removeListener(window.document.documentElement, "mousedown", this._onMouseDown, this, true);

    // React on keypress events
    Registration.removeListener(el, "keydown", this._onKeyUpDown, this, true);
    Registration.removeListener(el, "keyup", this._onKeyUpDown, this, true);
    Registration.removeListener(el, "keypress", this._onKeyPress, this, true);

    this._disposeObjects("__openTimer", "__closeTimer");
    this._disposeArray("__objects");
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * The abstract menu button class is used for all type of menu content
 * for example normal buttons, checkboxes or radiobuttons.
 *
 * @childControl icon {qx.ui.basic.Image} icon of the button
 * @childControl label {qx.ui.basic.Label} label of the button
 * @childControl shortcut {qx.ui.basic.Label} shows if specified the shortcut
 * @childControl arrow {qx.ui.basic.Image} shows the arrow to show an additional widget (e.g. popup or submenu)
 */
qx.Class.define("qx.ui.menu.AbstractButton",
{
  extend : qx.ui.core.Widget,
  include : [qx.ui.core.MExecutable],
  implement : [qx.ui.form.IExecutable],
  type : "abstract",


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    // Use hard coded layout
    this._setLayout(new qx.ui.menu.ButtonLayout);

    // Add listeners
    this.addListener("click", this._onClick);
    this.addListener("keypress", this._onKeyPress);

    // @deprecated since 1.6: Please use _onClick instead.
    qx.log.Logger.deprecateMethodOverriding(this, qx.ui.menu.AbstractButton, "_onMouseUp");

    // Add command listener
    this.addListener("changeCommand", this._onChangeCommand, this);
  },


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    // overridden
    blockToolTip :
    {
      refine : true,
      init : true
    },

    /** The label text of the button */
    label :
    {
      check : "String",
      apply : "_applyLabel",
      nullable : true
    },

    /** Whether a sub menu should be shown and which one */
    menu :
    {
      check : "qx.ui.menu.Menu",
      apply : "_applyMenu",
      nullable : true,
      dereference : true
    },

    /** The icon to use */
    icon :
    {
      check : "String",
      apply : "_applyIcon",
      themeable : true,
      nullable : true
    }
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      WIDGET API
    ---------------------------------------------------------------------------
    */

    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        case "icon":
          control = new qx.ui.basic.Image;
          control.setAnonymous(true);
          this._add(control, {column:0});
          break;

        case "label":
          control = new qx.ui.basic.Label;
          control.setAnonymous(true);
          this._add(control, {column:1});
          break;

        case "shortcut":
          control = new qx.ui.basic.Label;
          control.setAnonymous(true);
          this._add(control, {column:2});
          break;

        case "arrow":
          control = new qx.ui.basic.Image;
          control.setAnonymous(true);
          this._add(control, {column:3});
          break;
      }

      return control || this.base(arguments, id);
    },


    // overridden
    /**
     * @lint ignoreReferenceField(_forwardStates)
     */
    _forwardStates : {
      selected : 1
    },




    /*
    ---------------------------------------------------------------------------
      LAYOUT UTILS
    ---------------------------------------------------------------------------
    */

    /**
     * Returns the dimensions of all children
     *
     * @return {Array} Preferred width of each child
     */
    getChildrenSizes : function()
    {
      var iconWidth=0, labelWidth=0, shortcutWidth=0, arrowWidth=0;

      if (this._isChildControlVisible("icon"))
      {
        var icon = this.getChildControl("icon");
        iconWidth = icon.getMarginLeft() + icon.getSizeHint().width + icon.getMarginRight();
      }

      if (this._isChildControlVisible("label"))
      {
        var label = this.getChildControl("label");
        labelWidth = label.getMarginLeft() + label.getSizeHint().width + label.getMarginRight();
      }

      if (this._isChildControlVisible("shortcut"))
      {
        var shortcut = this.getChildControl("shortcut");
        shortcutWidth = shortcut.getMarginLeft() + shortcut.getSizeHint().width + shortcut.getMarginRight();
      }

      if (this._isChildControlVisible("arrow"))
      {
        var arrow = this.getChildControl("arrow");
        arrowWidth = arrow.getMarginLeft() + arrow.getSizeHint().width + arrow.getMarginRight();
      }

      return [ iconWidth, labelWidth, shortcutWidth, arrowWidth ];
    },


    /*
    ---------------------------------------------------------------------------
      EVENT LISTENERS
    ---------------------------------------------------------------------------
    */

    /**
     * Event listener for mouseup event
     *
     * @deprecated since 1.6: Please use _onClick instead.
     * @param e {qx.event.type.Mouse} mouseup event
     */
    _onMouseUp : function(e) {
      qx.log.Logger.deprecatedMethodWarning(arguments.callee);
    },


    /**
     * Event listener for click
     *
     * @param e {qx.event.type.Mouse} mouseup event
     */
    _onClick : function(e) {
      // pass
    },


    /**
     * Event listener for mouseup event
     *
     * @param e {qx.event.type.KeySequence} keypress event
     */
    _onKeyPress : function(e) {
      // pass
    },


    /**
     * Event listener for command changes. Updates the text of the shortcut.
     *
     * @param e {qx.event.type.Data} Property change event
     */
    _onChangeCommand : function(e)
    {
      var command = e.getData();

      // do nothing if no command is set
      if (command == null) {
        return;
      }

      if (qx.core.Environment.get("qx.dynlocale"))
      {
        var oldCommand = e.getOldData();
        if (!oldCommand) {
          qx.locale.Manager.getInstance().addListener("changeLocale", this._onChangeLocale, this);
        }
        if (!command) {
          qx.locale.Manager.getInstance().removeListener("changeLocale", this._onChangeLocale, this);
        }
      }

      var cmdString = command != null ? command.toString() : "";
      this.getChildControl("shortcut").setValue(cmdString);
    },


    /**
     * Update command string on locale changes
     */
    _onChangeLocale : qx.core.Environment.select("qx.dynlocale",
    {
      "true" : function(e) {
        var command = this.getCommand();
        if (command != null) {
          this.getChildControl("shortcut").setValue(command.toString());
        }
      },

      "false" : null
    }),


    /*
    ---------------------------------------------------------------------------
      PROPERTY APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    // property apply
    _applyIcon : function(value, old)
    {
      if (value) {
        this._showChildControl("icon").setSource(value);
      } else {
        this._excludeChildControl("icon");
      }
    },

    // property apply
    _applyLabel : function(value, old)
    {
      if (value) {
        this._showChildControl("label").setValue(value);
      } else {
        this._excludeChildControl("label");
      }
    },

    // property apply
    _applyMenu : function(value, old)
    {
      if (old)
      {
        old.resetOpener();
        old.removeState("submenu");
      }

      if (value)
      {
        this._showChildControl("arrow");

        value.setOpener(this);
        value.addState("submenu");
      }
      else
      {
        this._excludeChildControl("arrow");
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
    this.removeListener("changeCommand", this._onChangeCommand, this);

    if (this.getMenu())
    {
      if (!qx.core.ObjectRegistry.inShutDown) {
        this.getMenu().destroy();
      }
    }

    if (qx.core.Environment.get("qx.dynlocale")) {
      qx.locale.Manager.getInstance().removeListener("changeLocale", this._onChangeLocale, this);
    }
  }
});

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * Layout used for the menu buttons which may contain four elements. A icon,
 * a label, a shortcut text and an arrow (for a sub menu)
 *
 * @internal
 */
qx.Class.define("qx.ui.menu.ButtonLayout",
{
  extend : qx.ui.layout.Abstract,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // overridden
    verifyLayoutProperty : qx.core.Environment.select("qx.debug",
    {
      "true" : function(item, name, value) {
        this.assert(name=="column", "The property '"+name+"' is not supported by the MenuButton layout!");
      },

      "false" : null
    }),


    // overridden
    renderLayout : function(availWidth, availHeight)
    {
      var children = this._getLayoutChildren();
      var child;
      var column;

      var columnChildren = [];
      for (var i=0, l=children.length; i<l; i++)
      {
        child = children[i];
        column = child.getLayoutProperties().column;
        columnChildren[column] = child;
      }

      var menu = this.__getMenu(children[0]);

      var columns = menu.getColumnSizes();
      var spacing = menu.getSpacingX();

      // stretch label column
      var neededWidth = qx.lang.Array.sum(columns) + spacing * (columns.length - 1);
      if (neededWidth < availWidth) {
        columns[1] += availWidth - neededWidth;
      }


      var left=0, top=0;
      var Util = qx.ui.layout.Util;

      for (var i=0, l=columns.length; i<l; i++)
      {
        child = columnChildren[i];

        if (child)
        {
          var hint = child.getSizeHint();
          var top = Util.computeVerticalAlignOffset(child.getAlignY()||"middle", hint.height, availHeight, 0, 0);
          var offsetLeft = Util.computeHorizontalAlignOffset(child.getAlignX()||"left", hint.width, columns[i], child.getMarginLeft(), child.getMarginRight());
          child.renderLayout(left + offsetLeft, top, hint.width, hint.height);
        }

        left += columns[i] + spacing;
      }
    },


    /**
     * Get the widget's menu
     *
     * @param widget {qx.ui.core.Widget} the widget to get the menu for
     * @return {qx.ui.menu.Menu} the menu
     */
    __getMenu : function(widget)
    {
      while (!(widget instanceof qx.ui.menu.Menu)) {
        widget = widget.getLayoutParent();
      }
      return widget;
    },


    // overridden
    _computeSizeHint : function()
    {
      var children = this._getLayoutChildren();
      var neededHeight = 0;
      var neededWidth = 0;

      for (var i=0, l=children.length; i<l; i++)
      {
        var hint = children[i].getSizeHint();
        neededWidth += hint.width;
        neededHeight = Math.max(neededHeight, hint.height);
      }

      return {
        width : neededWidth,
        height : neededHeight
      }
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

************************************************************************ */

/**
 * A button which opens the connected menu when clicking on it.
 */
qx.Class.define("qx.ui.form.MenuButton",
{
  extend : qx.ui.form.Button,



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param label {String} Initial label
   * @param icon {String?null} Initial icon
   * @param menu {qx.ui.menu.Menu} Connect to menu instance
   */
  construct : function(label, icon, menu)
  {
    this.base(arguments, label, icon);

    // Initialize properties
    if (menu != null) {
      this.setMenu(menu);
    }
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /** The menu instance to show when clicking on the button */
    menu :
    {
      check : "qx.ui.menu.Menu",
      nullable : true,
      apply : "_applyMenu",
      event : "changeMenu"
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      PROPERTY APPLY ROUTINES
    ---------------------------------------------------------------------------
    */
    // overridden
    _applyVisibility : function(value, old) {
      this.base(arguments, value, old);

      // hide the menu too
      var menu = this.getMenu();
      if (value != "visible" && menu) {
        menu.hide();
      }
    },


    // property apply
    _applyMenu : function(value, old)
    {
      if (old)
      {
        old.removeListener("changeVisibility", this._onMenuChange, this);
        old.resetOpener();
      }

      if (value)
      {
        value.addListener("changeVisibility", this._onMenuChange, this);
        value.setOpener(this);

        value.removeState("submenu");
        value.removeState("contextmenu");
      }
    },




    /*
    ---------------------------------------------------------------------------
      HELPER METHODS
    ---------------------------------------------------------------------------
    */

    /**
     * Positions and shows the attached menu widget.
     *
     * @param selectFirst {Boolean?false} Whether the first menu button should be selected
     */
    open : function(selectFirst)
    {
      var menu = this.getMenu();

      if (menu)
      {
        // Hide all menus first
        qx.ui.menu.Manager.getInstance().hideAll();

        // Open the attached menu
        menu.setOpener(this);
        menu.open();

        // Select first item
        if (selectFirst)
        {
          var first = menu.getSelectables()[0];
          if (first) {
            menu.setSelectedButton(first);
          }
        }
      }
    },




    /*
    ---------------------------------------------------------------------------
      EVENT LISTENERS
    ---------------------------------------------------------------------------
    */

    /**
     * Listener for visibility property changes of the attached menu
     *
     * @param e {qx.event.type.Data} Property change event
     */
    _onMenuChange : function(e)
    {
      var menu = this.getMenu();

      if (menu.isVisible()) {
        this.addState("pressed");
      } else {
        this.removeState("pressed");
      }
    },


    // overridden
    _onMouseDown : function(e)
    {
      // call the base function to get into the capture phase [BUG #4340]
      this.base(arguments, e);

      // only open on left clicks [BUG #5125]
      if(e.getButton() != "left") {
        return;
      }

      var menu = this.getMenu();
      if (menu)
      {
        // Toggle sub menu visibility
        if (!menu.isVisible()) {
          this.open();
        } else {
          menu.exclude();
        }

        // Event is processed, stop it for others
        e.stopPropagation();
      }
    },


    // overridden
    _onMouseUp : function(e)
    {
      // call base for firing the execute event
      this.base(arguments, e);

      // Just stop propagation to stop menu manager
      // from getting the event
      e.stopPropagation();
    },


    // overridden
    _onMouseOver : function(e)
    {
      // Add hovered state
      this.addState("hovered");
    },


    // overridden
    _onMouseOut : function(e)
    {
      // Just remove the hover state
      this.removeState("hovered");
    },


    // overridden
    _onKeyDown : function(e)
    {
      switch(e.getKeyIdentifier())
      {
        case "Enter":
          this.removeState("abandoned");
          this.addState("pressed");

          var menu = this.getMenu();
          if (menu)
          {
            // Toggle sub menu visibility
            if (!menu.isVisible()) {
              this.open();
            } else {
              menu.exclude();
            }
          }

          e.stopPropagation();
      }
    },


    // overridden
    _onKeyUp : function(e) {
      // no action required here
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

************************************************************************ */

/**
 * A menubar button
 */
qx.Class.define("qx.ui.menubar.Button",
{
  extend : qx.ui.form.MenuButton,



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(label, icon, menu)
  {
    this.base(arguments, label, icon, menu);

    this.removeListener("keydown", this._onKeyDown);
    this.removeListener("keyup", this._onKeyUp);
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    appearance :
    {
      refine : true,
      init : "menubar-button"
    },

    show :
    {
      refine : true,
      init : "inherit"
    },

    focusable :
    {
      refine : true,
      init : false
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      HELPER METHODS
    ---------------------------------------------------------------------------
    */

    /**
     * Inspects the parent chain to find the MenuBar
     *
     * @return {qx.ui.menubar.MenuBar} MenuBar instance or <code>null</code>.
     */
    getMenuBar : function()
    {
      var parent = this;
      while (parent)
      {
        /* this method is also used by toolbar.MenuButton, so we need to check
           for a ToolBar instance. */
        if (parent instanceof qx.ui.toolbar.ToolBar) {
          return parent;
        }

        parent = parent.getLayoutParent();
      }

      return null;
    },


    // overridden
    open : function(selectFirst) {
      this.base(arguments, selectFirst);

      var menubar = this.getMenuBar();
      menubar._setAllowMenuOpenHover(true);
    },


    /*
    ---------------------------------------------------------------------------
      EVENT LISTENERS
    ---------------------------------------------------------------------------
    */

    /**
     * Listener for visibility property changes of the attached menu
     *
     * @param e {qx.event.type.Data} Property change event
     */
    _onMenuChange : function(e)
    {
      var menu = this.getMenu();
      var menubar = this.getMenuBar();

      if (menu.isVisible())
      {
        this.addState("pressed");

        // Sync with open menu property
        if (menubar) {
          menubar.setOpenMenu(menu);
        }
      }
      else
      {
        this.removeState("pressed");

        // Sync with open menu property
        if (menubar && menubar.getOpenMenu() == menu) {
          menubar.resetOpenMenu();
          menubar._setAllowMenuOpenHover(false);
        }
      }
    },

    // overridden
    _onMouseUp : function(e)
    {
      this.base(arguments, e);

      // Set state 'pressed' to visualize that the menu is open.
      var menu = this.getMenu();
      if (menu && menu.isVisible() && !this.hasState("pressed")) {
        this.addState("pressed");
      }
    },

    /**
     * Event listener for mouseover event
     *
     * @param e {qx.event.type.Mouse} mouseover event object
     */
    _onMouseOver : function(e)
    {
      // Add hovered state
      this.addState("hovered");

      // Open submenu
      if (this.getMenu())
      {
        var menubar = this.getMenuBar();

        if (menubar._isAllowMenuOpenHover())
        {
          // Hide all open menus
          qx.ui.menu.Manager.getInstance().hideAll();

          // Set it again, because hideAll remove it.
          menubar._setAllowMenuOpenHover(true);

          // Then show the attached menu
          if (this.isEnabled()) {
            this.open();
          }
        }
      }
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Martin Wittemann (martinwittemann)
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */

/**
 * The Toolbar class is the main part of the toolbar widget.
 *
 * It can handle added {@link Button}s, {@link CheckBox}es, {@link RadioButton}s
 * and {@link Separator}s in its {@link #add} method. The {@link #addSpacer} method
 * adds a spacer at the current toolbar position. This means that the widgets
 * added after the method call of {@link #addSpacer} are aligned to the right of
 * the toolbar.
 *
 * For more details on the documentation of the toolbar widget, take a look at the
 * documentation of the {@link qx.ui.toolbar}-Package.
 */
qx.Class.define("qx.ui.toolbar.ToolBar",
{
  extend : qx.ui.core.Widget,
  include : qx.ui.core.MChildrenHandling,



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    // add needed layout
    this._setLayout(new qx.ui.layout.HBox());

    // initialize the overflow handling
    this.__removedItems = [];
    this.__removePriority = [];
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /** Appearance of the widget */
    appearance :
    {
      refine : true,
      init : "toolbar"
    },

    /** Holds the currently open menu (when the toolbar is used for menus) */
    openMenu :
    {
      check : "qx.ui.menu.Menu",
      event : "changeOpenMenu",
      nullable : true
    },

    /** Whether icons, labels, both or none should be shown. */
    show :
    {
      init : "both",
      check : [ "both", "label", "icon" ],
      inheritable : true,
      event : "changeShow"
    },

    /** The spacing between every child of the toolbar */
    spacing :
    {
      nullable : true,
      check : "Integer",
      themeable : true,
      apply : "_applySpacing"
    },

    /**
     * Widget which will be shown if at least one toolbar item is hidden.
     * Keep in mind to add this widget to the toolbar before you set it as
     * indicator!
     */
    overflowIndicator :
    {
      check : "qx.ui.core.Widget",
      nullable : true,
      apply : "_applyOverflowIndicator"
    },

    /** Enables the overflow handling which automatically removes items.*/
    overflowHandling :
    {
      init : false,
      check : "Boolean",
      apply : "_applyOverflowHandling"
    }
  },



  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events :
  {
    /** Fired if an item will be hidden by the {@link #overflowHandling}.*/
    "hideItem" : "qx.event.type.Data",

    /** Fired if an item will be show by the {@link #overflowHandling}.*/
    "showItem" : "qx.event.type.Data"
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      OVERFLOW HANDLING
    ---------------------------------------------------------------------------
    */

    __removedItems : null,
    __removePriority : null,


    // overridden
    _computeSizeHint : function()
    {
      // get the original hint
      var hint = this.base(arguments);
      if (true && this.getOverflowHandling()) {
        var minWidth = 0;
        // if an overflow widget is given, use its width + spacing as min width
        var overflowWidget = this.getOverflowIndicator();
        if (overflowWidget) {
          minWidth = overflowWidget.getSizeHint().width + this.getSpacing();
        }
        // reset the minWidth because we reduce the count of elements
        hint.minWidth = minWidth;
      }
      return hint;
    },


    /**
     * Resize event handler.
     *
     * @param e {qx.event.type.Data} The resize event.
     */
    _onResize : function(e) {
      this._recalculateOverflow(e.getData().width);
    },


    /**
     * Responsible for calculation the overflow based on the available width.
     *
     * @param width {Integer?null} The available width.
     * @param requiredWidth {Integer?null} The required width for the widget
     *   if available.
     */
    _recalculateOverflow : function(width, requiredWidth)
    {
      // do nothing if overflow handling is not enabled
      if (!this.getOverflowHandling()) {
        return;
      }

      // get all required sizes
      requiredWidth = requiredWidth || this.getSizeHint().width;
      var overflowWidget = this.getOverflowIndicator();
      var overflowWidgetWidth = 0;
      if (overflowWidget) {
        overflowWidgetWidth = overflowWidget.getSizeHint().width;
      }

      if (width == undefined && this.getBounds() != null) {
        width = this.getBounds().width;
      }

      // if we still don't have a width, than we are not added to a parrent
      if (width == undefined) {
        // we should ignore it in that case
        return;
      }

      // if we have not enough space
      if (width < requiredWidth) {
        do {
          // get the next child
          var childToHide = this._getNextToHide();
          // if there is no child to hide, just do nothing
          if (!childToHide) {
            return;
          }
          // get margins or spacing
          var margins = childToHide.getMarginLeft() + childToHide.getMarginRight();
          margins = Math.max(margins, this.getSpacing());
          var childWidth = childToHide.getSizeHint().width + margins;
          this.__hideChild(childToHide);

          // new width is the requiredWidth - the removed childs width
          requiredWidth -= childWidth;

          // show the overflowWidgetWidth
          if (overflowWidget && overflowWidget.getVisibility() != "visible") {
            overflowWidget.setVisibility("visible");
            // if we need to add the overflow indicator, we need to add its width
            requiredWidth += overflowWidgetWidth;
            // add spacing or margins
            var overflowWidgetMargins =
              overflowWidget.getMarginLeft() +
              overflowWidget.getMarginRight();
            requiredWidth += Math.max(overflowWidgetMargins, this.getSpacing());
          }
        } while (requiredWidth > width);

      // if we can possibly show something
      } else if (this.__removedItems.length > 0) {
        do {
          var removedChild = this.__removedItems[0];
          // if we have something we can show
          if (removedChild) {
            // get the margins or spacing
            var margins = removedChild.getMarginLeft() + removedChild.getMarginRight();
            margins = Math.max(margins, this.getSpacing());

            // check if the element has been rendered before [BUG #4542]
            if (removedChild.getDecoratorElement() == null) {
              // if not, apply the decorator element because it can change the
              // width of the child with padding e.g.
              removedChild.syncAppearance();
              // also invalidate the layout cache to trigger size hint
              // recalculation
              removedChild.invalidateLayoutCache();
            }
            var removedChildWidth = removedChild.getSizeHint().width;

            // check if it fits in in case its the last child to replace
            var fits = false;
            // if we can remove the overflow widget if its available
            if (this.__removedItems.length == 1 && overflowWidgetWidth > 0) {
              var addedMargin = margins - this.getSpacing();
              var wouldRequiredWidth =
                requiredWidth -
                overflowWidgetWidth +
                removedChildWidth +
                addedMargin;
              fits = width > wouldRequiredWidth;
            }

            // if it just fits in || it fits in when we remove the overflow widget
            if (width > requiredWidth + removedChildWidth + margins || fits) {
              this.__showChild(removedChild);
              requiredWidth += removedChildWidth;
              // check if we need to remove the overflow widget
              if (overflowWidget && this.__removedItems.length == 0) {
                overflowWidget.setVisibility("excluded");
              }
            } else {
              return;
            }
          }
        } while (width >= requiredWidth && this.__removedItems.length > 0);
      }
    },


    /**
     * Helper to show a toolbar item.
     *
     * @param child {qx.ui.core.Widget} The widget to show.
     */
    __showChild : function(child)
    {
      child.setVisibility("visible");
      this.__removedItems.shift();
      this.fireDataEvent("showItem", child)
    },


    /**
     * Helper to exclude a toolbar item.
     *
     * @param child {qx.ui.core.Widget} The widget to exclude.
     */
    __hideChild : function(child)
    {
      // ignore the call if no child is given
      if (!child) {
        return;
      }
      this.__removedItems.unshift(child);
      child.setVisibility("excluded");
      this.fireDataEvent("hideItem", child);
    },


    /**
     * Responsible for returning the next item to remove. In It checks the
     * priorities added by {@link #setRemovePriority}. If all priorized widgets
     * already excluded, it takes the widget added at last.
     *
     * @return {qx.ui.core.Widget|null} The widget which should be removed next.
     *   If null is returned, no widget is availablew to remove.
     */
    _getNextToHide : function()
    {
      // get the elements by priority
      for (var i = this.__removePriority.length - 1; i >= 0; i--) {
        var item = this.__removePriority[i];
        // maybe a priority is left out and spacers don't have the visibility
        if (item && item.getVisibility && item.getVisibility() == "visible") {
          return item;
        }
      };

      // if there is non found by priority, check all available widgets
      var children = this._getChildren();
      for (var i = children.length -1; i >= 0; i--) {
        var child = children[i]
        // ignore the overflow widget
        if (child == this.getOverflowIndicator()) {
          continue;
        }
        // spacer don't have the visibility
        if (child.getVisibility && child.getVisibility() == "visible") {
          return child;
        }
      };
    },


    /**
     * The removal of the toolbar items is priority based. You can change these
     * priorities with this method. The higher a priority, the earlier it will
     * be excluded. Remmeber to use every priority only once! If you want
     * override an already set priority, use the override parameter.
     * Keep in mind to only use already added items.
     *
     * @param item {qx.ui.core.Widget} The item to give the priority.
     * @param priority {Integer} The priority, higher means removed earlier.
     * @param override {Boolean} true, if the priority should be overridden.
     */
    setRemovePriority : function(item, priority, override)
    {
      // security check for overriding priorities
      if (!override && this.__removePriority[priority] != undefined) {
        throw new Error("Priority already in use!");
      }
      this.__removePriority[priority] = item;
    },


    // property apply
    _applyOverflowHandling : function(value, old)
    {
      // invalidate the own and the parrents layout cach because the size hint changes
      this.invalidateLayoutCache();
      var parent = this.getLayoutParent();
      if (parent) {
        parent.invalidateLayoutCache();
      }

      // recalculate if possible
      var bounds = this.getBounds()
      if (bounds && bounds.width) {
        this._recalculateOverflow(bounds.width);
      }

      // if the handling has been enabled
      if (value) {
        // add the resize listener
        this.addListener("resize", this._onResize, this);

      // if the handlis has been disabled
      } else {
        this.removeListener("resize", this._onResize, this);

        // set the overflow indicator to excluded
        var overflowIndicator = this.getOverflowIndicator();
        if (overflowIndicator) {
          overflowIndicator.setVisibility("excluded");
        }

        // set all buttons back to visible
        for (var i = 0; i < this.__removedItems.length; i++) {
          this.__removedItems[i].setVisibility("visible");
        };
        // reset the removed items
        this.__removedItems = [];
      }
    },


    // property apply
    _applyOverflowIndicator : function(value, old)
    {
      if (old) {
        this._remove(old);
      }

      if (value) {
        // check if its a child of the toolbar
        if (this._indexOf(value) == -1) {
          throw new Error("Widget must be child of the toolbar.");
        }
        // hide the widget
        value.setVisibility("excluded");
      }
    },


    /*
    ---------------------------------------------------------------------------
      MENU OPEN
    ---------------------------------------------------------------------------
    */

    __allowMenuOpenHover : false,

    /**
     * Indicate if a menu could be opened on hover or not.
     *
     * @internal
     * @param value {Boolean} <code>true</code> if a menu could be opened,
     *    <code>false</code> otherwise.
     */
    _setAllowMenuOpenHover : function(value) {
      this.__allowMenuOpenHover = value
    },

    /**
     * Return if a menu could be opened on hover or not.
     *
     * @internal
     * @return {Boolean} <code>true</code> if a menu could be opened,
     *    <code>false</code> otherwise.
     */
    _isAllowMenuOpenHover : function () {
      return this.__allowMenuOpenHover;
    },


    /*
    ---------------------------------------------------------------------------
      PROPERTY APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    // property apply
    _applySpacing : function(value, old)
    {
      var layout = this._getLayout();
      value == null ? layout.resetSpacing() : layout.setSpacing(value);
    },


    /*
    ---------------------------------------------------------------------------
      CHILD HANDLING
    ---------------------------------------------------------------------------
    */
    // overridden
    _add : function(child, options) {
      this.base(arguments, child, options);
      var newWidth =
        this.getSizeHint().width +
        child.getSizeHint().width +
        2 * this.getSpacing();
      this._recalculateOverflow(null, newWidth);
    },

    // overridden
    _addAt : function(child, index, options) {
      this.base(arguments, child, index, options);
      var newWidth =
        this.getSizeHint().width +
        child.getSizeHint().width +
        2 * this.getSpacing();
      this._recalculateOverflow(null, newWidth);
    },

    // overridden
    _addBefore : function(child, before, options) {
      this.base(arguments, child, before, options);
      var newWidth =
        this.getSizeHint().width +
        child.getSizeHint().width +
        2 * this.getSpacing();
      this._recalculateOverflow(null, newWidth);
    },

    // overridden
    _addAfter : function(child, after, options) {
      this.base(arguments, child, after, options);
      var newWidth =
        this.getSizeHint().width +
        child.getSizeHint().width +
        2 * this.getSpacing();
      this._recalculateOverflow(null, newWidth);
    },

    // overridden
    _remove : function(child) {
      this.base(arguments, child);
      var newWidth =
        this.getSizeHint().width -
        child.getSizeHint().width -
        2 * this.getSpacing();
      this._recalculateOverflow(null, newWidth);
    },

    // overridden
    _removeAt : function(index) {
      var child = this._getChildren()[index];
      this.base(arguments, index);
      var newWidth =
        this.getSizeHint().width -
        child.getSizeHint().width -
        2 * this.getSpacing();
      this._recalculateOverflow(null, newWidth);
    },

    // overridden
    _removeAll : function() {
      this.base(arguments);
      this._recalculateOverflow(null, 0);
    },


    /*
    ---------------------------------------------------------------------------
      UTILITIES
    ---------------------------------------------------------------------------
    */

    /**
     * Add a spacer to the toolbar. The spacer has a flex
     * value of one and will stretch to the available space.
     *
     * @return {qx.ui.core.Spacer} The newly added spacer object. A reference
     *   to the spacer is needed to remove this spacer from the layout.
     */
    addSpacer : function()
    {
      var spacer = new qx.ui.core.Spacer;
      this._add(spacer, {flex:1});
      return spacer;
    },


    /**
     * Adds a separator to the toolbar.
     */
    addSeparator : function() {
      this.add(new qx.ui.toolbar.Separator);
    },


    /**
     * Returns all nested buttons which contains a menu to show. This is mainly
     * used for keyboard support.
     *
     * @return {Array} List of all menu buttons
     */
    getMenuButtons : function()
    {
      var children = this.getChildren();
      var buttons = [];
      var child;

      for (var i=0, l=children.length; i<l; i++)
      {
        child = children[i];

        if (child instanceof qx.ui.menubar.Button) {
          buttons.push(child);
        } else if (child instanceof qx.ui.toolbar.Part) {
          buttons.push.apply(buttons, child.getMenuButtons());
        }
      }

      return buttons;
    }
  },


  destruct : function() {
    if (this.hasListener("resize")) {
      this.removeListener("resize", this._onResize, this);
    }

  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

************************************************************************ */

/**
 * A widget used for decoration proposes to structure a toolbar. Each
 * Separator renders a line between the buttons around.
 */
qx.Class.define("qx.ui.toolbar.Separator",
{
  extend : qx.ui.core.Widget,





  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    // overridden
    appearance :
    {
      refine : true,
      init : "toolbar-separator"
    },

    // overridden
    anonymous :
    {
      refine : true,
      init : true
    },

    // overridden
    width :
    {
      refine : true,
      init : 0
    },

    // overridden
    height :
    {
      refine : true,
      init : 0
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */

/**
 * A part is a container for multiple toolbar buttons. Each part comes
 * with a handle which may be used in later versions to drag the part
 * around and move it to another position. Currently mainly used
 * for structuring large toolbars beyond the capabilities of the
 * {@link Separator}.
 *
 * @childControl handle {qx.ui.basic.Image} prat handle to visualize the separation
 * @childControl container {qx.ui.toolbar.PartContainer} holds the content of the toolbar part
 */
qx.Class.define("qx.ui.toolbar.Part",
{
  extend : qx.ui.core.Widget,
  include : [qx.ui.core.MRemoteChildrenHandling],



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    // Hard coded HBox layout
    this._setLayout(new qx.ui.layout.HBox);

    // Force creation of the handle
    this._createChildControl("handle");
  },



  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    appearance :
    {
      refine : true,
      init : "toolbar/part"
    },

    /** Whether icons, labels, both or none should be shown. */
    show :
    {
      init : "both",
      check : [ "both", "label", "icon" ],
      inheritable : true,
      event : "changeShow"
    },

    /** The spacing between every child of the toolbar */
    spacing :
    {
      nullable : true,
      check : "Integer",
      themeable : true,
      apply : "_applySpacing"
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      WIDGET API
    ---------------------------------------------------------------------------
    */

    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        case "handle":
          control = new qx.ui.basic.Image();
          control.setAlignY("middle");
          this._add(control);
          break;

        case "container":
          control = new qx.ui.toolbar.PartContainer();
          control.addListener("syncAppearance", this.__onSyncAppearance, this);
          this._add(control);
          break;
      }

      return control || this.base(arguments, id);
    },

    // overridden
    getChildrenContainer : function() {
      return this.getChildControl("container");
    },




    /*
    ---------------------------------------------------------------------------
      PROPERTY APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    _applySpacing : function(value, old)
    {
      var layout = this.getChildControl("container").getLayout();
      value == null ? layout.resetSpacing() : layout.setSpacing(value);
    },




    /*
    ---------------------------------------------------------------------------
      UTILITIES
    ---------------------------------------------------------------------------
    */
    /**
     * Helper which applies the left, right and middle states.
     */
    __onSyncAppearance : function() {
      // check every child
      var children = this.getChildrenContainer().getChildren();
      for (var i = 0; i < children.length; i++) {
        // if its the first child
        if (i == 0 && i != children.length - 1) {
          children[i].addState("left");
          children[i].removeState("right");
          children[i].removeState("middle");
        // if its the last child
        } else if (i == children.length - 1 && i != 0) {
          children[i].addState("right");
          children[i].removeState("left");
          children[i].removeState("middle");
        // if there is only one child
        } else if (i == 0 && i == children.length - 1) {
          children[i].removeState("left");
          children[i].removeState("middle");
          children[i].removeState("right");
        } else {
          children[i].addState("middle");
          children[i].removeState("right");
          children[i].removeState("left");
        }
      };
    },


    /**
     * Adds a separator to the toolbar part.
     */
    addSeparator : function() {
      this.add(new qx.ui.toolbar.Separator);
    },


    /**
     * Returns all nested buttons which contains a menu to show. This is mainly
     * used for keyboard support.
     *
     * @return {Array} List of all menu buttons
     */
    getMenuButtons : function()
    {
      var children = this.getChildren();
      var buttons = [];
      var child;

      for (var i=0, l=children.length; i<l; i++)
      {
        child = children[i];

        if (child instanceof qx.ui.menubar.Button) {
          buttons.push(child);
        }
      }

      return buttons;
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */

/**
 * The container used by {@link Part} to insert the buttons.
 *
 * @internal
 */
qx.Class.define("qx.ui.toolbar.PartContainer",
{
  extend : qx.ui.container.Composite,



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);
    this._setLayout(new qx.ui.layout.HBox);
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */
  properties :
  {
    appearance :
    {
      refine : true,
      init : "toolbar/part/container"
    },

    /** Whether icons, labels, both or none should be shown. */
    show :
    {
      init : "both",
      check : [ "both", "label", "icon" ],
      inheritable : true,
      event : "changeShow"
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * The real menu button class which supports a command and an icon. All
 * other features are inherited from the {@link qx.ui.menu.AbstractButton}
 * class.
 */
qx.Class.define("qx.ui.menu.Button",
{
  extend : qx.ui.menu.AbstractButton,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param label {String} Initial label
   * @param icon {String} Initial icon
   * @param command {qx.ui.core.Command} Initial command (shortcut)
   * @param menu {qx.ui.menu.Menu} Initial sub menu
   */
  construct : function(label, icon, command, menu)
  {
    this.base(arguments);

    // Initialize with incoming arguments
    if (label != null) {
      this.setLabel(label);
    }

    if (icon != null) {
      this.setIcon(icon);
    }

    if (command != null) {
      this.setCommand(command);
    }

    if (menu != null) {
      this.setMenu(menu);
    }
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    // overridden
    appearance :
    {
      refine : true,
      init : "menu-button"
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      EVENT HANDLER
    ---------------------------------------------------------------------------
    */


    // overridden
    _onClick : function(e)
    {
      if (e.isLeftPressed())
      {
        this.execute();

        // don't close menus if the button is a sub menu button
        if (this.getMenu()) {
          return;
        }
      } else {
        // don't close menus if the button has a context menu
        if (this.getContextMenu()) {
          return;
        }
      }

      qx.ui.menu.Manager.getInstance().hideAll();
    },


    // overridden
    _onKeyPress : function(e) {
      this.execute();
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * The MenuSlideBar is used to scroll menus if they don't fit on the screen.
 *
 * @childControl button-forward {qx.ui.form.HoverButton} scrolls forward of hovered
 * @childControl button-backward {qx.ui.form.HoverButton} scrolls backward if hovered
 *
 * @internal
 */
qx.Class.define("qx.ui.menu.MenuSlideBar",
{
  extend : qx.ui.container.SlideBar,

  construct : function()
  {
    this.base(arguments, "vertical");
  },

  properties :
  {
    appearance :
    {
      refine : true,
      init : "menu-slidebar"
    }
  },

  members :
  {
    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        case "button-forward":
          control = new qx.ui.form.HoverButton();
          control.addListener("execute", this._onExecuteForward, this);
          this._addAt(control, 2);
          break;

        case "button-backward":
          control = new qx.ui.form.HoverButton();
          control.addListener("execute", this._onExecuteBackward, this);
          this._addAt(control, 0);
          break;
      }

      return control || this.base(arguments, id);
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/**
 * Commands can be used to globally define keyboard shortcuts. They could
 * also be used to assign an execution of a command sequence to multiple
 * widgets. It is possible to use the same Command in a MenuButton and
 * ToolBarButton for example.
 */
qx.Class.define("qx.ui.core.Command",
{
  extend : qx.core.Object,


  /**
   * @param shortcut {String} Shortcuts can be composed of optional modifier
   *    keys Control, Alt, Shift, Meta and a non modifier key.
   *    If no non modifier key is specified, the second paramater is evaluated.
   *    The key must be separated by a <code>+</code> or <code>-</code> character.
   *    Examples: Alt+F1, Control+C, Control+Alt+Delete
   */
  construct : function(shortcut)
  {
    this.base(arguments);
    this._shortcut = new qx.bom.Shortcut(shortcut);

    this._shortcut.addListener("execute", this.execute, this);
  },


  events :
  {
    /**
     * Fired when the command is executed. Sets the "data" property of the
     * event to the object that issued the command.
     */
    "execute" : "qx.event.type.Data"
  },


  properties :
  {
    /** whether the command should be respected/enabled */
    enabled :
    {
      init : true,
      check : "Boolean",
      event : "changeEnabled",
      apply : "_applyEnabled"
    },


    /** The command shortcut as a string */
    shortcut :
    {
      check : "String",
      apply : "_applyShortcut",
      nullable : true
    },


    /** The label, which will be set in all connected widgets (if available) */
    label :
    {
      check : "String",
      nullable : true,
      event : "changeLabel"
    },


    /** The icon, which will be set in all connected widgets (if available) */
    icon :
    {
      check : "String",
      nullable : true,
      event : "changeIcon"
    },


    /**
     * The tooltip text, which will be set in all connected
     * widgets (if available)
     */
    toolTipText :
    {
      check : "String",
      nullable : true,
      event : "changeToolTipText"
    },


    /** The value of the connected widgets */
    value :
    {
      nullable : true,
      event : "changeValue"
    },


    /** The menu, which will be set in all connected widgets (if available) */
    menu :
    {
      check : "qx.ui.menu.Menu",
      nullable : true,
      event : "changeMenu"
    }
  },


  members :
  {
    _shortcut : null,

    // property apply
    _applyEnabled : function(value) {
      this._shortcut.setEnabled(value);
    },


    // property apply
    _applyShortcut : function(value) {
      this._shortcut.setShortcut(value);
    },


    /**
     * Fire the "execute" event on this command.
     *
     * @param target {Object} Object which issued the execute event
     */
    execute : function(target)
    {
      this.fireDataEvent("execute", target);
    },


    /**
     * Returns the used shortcut as string using the currently selected locale.
     *
     * @return {String} shortcut
     */
    toString : function()
    {
      return this._shortcut.toString();
    }
  },


  destruct : function()
  {
    this._disposeObjects("_shortcut");
    this.removeListener("execute", this.execute, this);
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * Shortcuts can be used to globally define keyboard shortcuts.
 */
qx.Class.define("qx.bom.Shortcut",
{
  extend : qx.core.Object,



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Create a new instance of Command
   *
   * @param shortcut {String} shortcuts can be composed of optional modifier
   *    keys Control, Alt, Shift, Meta and a non modifier key.
   *    If no non modifier key is specified, the second paramater is evaluated.
   *    The key must be separated by a <code>+</code> or <code>-</code> character.
   *    Examples: Alt+F1, Control+C, Control+Alt+Delete
   */
  construct : function(shortcut)
  {
    this.base(arguments);

    this.__modifier = {};
    this.__key = null;

    if (shortcut != null) {
      this.setShortcut(shortcut);
    }

    this.initEnabled();
  },


  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events :
  {
    /**
     * Fired when the command is executed. Sets the "data" property of the event to
     * the object that issued the command.
     */
    "execute" : "qx.event.type.Data"
  },



  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /** whether the command should be respected/enabled */
    enabled :
    {
      init : true,
      check : "Boolean",
      event : "changeEnabled",
      apply : "_applyEnabled"
    },


    /** The command shortcut */
    shortcut :
    {
      check : "String",
      apply : "_applyShortcut",
      nullable : true
    },


    /**
     * Whether the execute event should be fired repeatedly if the user keep
     * the keys pressed.
     */
    autoRepeat :
    {
      check : "Boolean",
      init : false
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __modifier : "",
    __key : "",


    /*
    ---------------------------------------------------------------------------
      USER METHODS
    ---------------------------------------------------------------------------
    */

    /**
     * Fire the "execute" event on this shortcut.
     *
     * @param target {Object} Object which issued the execute event
     */
    execute : function(target) {
      this.fireDataEvent("execute", target);
    },


    /**
     * Key down event handler.
     *
     * @param event {qx.event.type.KeySequence} The key event object
     */
    __onKeyDown : function(event)
    {
      if (this.getEnabled() && this.__matchesKeyEvent(event))
      {
        if (!this.isAutoRepeat()) {
          this.execute(event.getTarget());
        }
        event.stop();
      }
    },


    /**
     * Key press event handler.
     *
     * @param event {qx.event.type.KeySequence} The key event object
     */
    __onKeyPress : function(event)
    {
      if (this.getEnabled() && this.__matchesKeyEvent(event))
      {
        if (this.isAutoRepeat()) {
          this.execute(event.getTarget());
        }
        event.stop();
      }
    },



    /*
    ---------------------------------------------------------------------------
      APPLY ROUTINES
    ---------------------------------------------------------------------------
    */


    // property apply
    _applyEnabled : function(value, old)
    {
      if (value) {
        qx.event.Registration.addListener(document.documentElement, "keydown", this.__onKeyDown, this);
        qx.event.Registration.addListener(document.documentElement, "keypress", this.__onKeyPress, this);
      } else {
        qx.event.Registration.removeListener(document.documentElement, "keydown", this.__onKeyDown, this);
        qx.event.Registration.removeListener(document.documentElement, "keypress", this.__onKeyPress, this);
      }
    },


    // property apply
    _applyShortcut : function(value, old)
    {
      if (value)
      {
        // do not allow whitespaces within shortcuts
        if (value.search(/[\s]+/) != -1)
        {
          var msg = "Whitespaces are not allowed within shortcuts";
          this.error(msg);
          throw new Error(msg);
        }

        this.__modifier = { "Control" : false,
                            "Shift"   : false,
                            "Meta"    : false,
                            "Alt"     : false };
        this.__key = null;

        // To support shortcuts with "+" and "-" as keys it is necessary
        // to split the given value in a different way to determine the
        // several keyIdentifiers
        var index;
        var a = [];
        while (value.length > 0 && index != -1)
        {
          // search for delimiters "+" and "-"
          index = value.search(/[-+]+/);

          // add identifiers - take value if no separator was found or
          // only one char is left (second part of shortcut)
          a.push((value.length == 1 || index == -1) ? value : value.substring(0, index));

          // extract the already detected identifier
          value = value.substring(index + 1);
        }
        var al = a.length;

        for (var i=0; i<al; i++)
        {
          var identifier = this.__normalizeKeyIdentifier(a[i]);

          switch(identifier)
          {
            case "Control":
            case "Shift":
            case "Meta":
            case "Alt":
              this.__modifier[identifier] = true;
              break;

            case "Unidentified":
              var msg = "Not a valid key name for a shortcut: " + a[i];
              this.error(msg);
              throw msg;

            default:
              if (this.__key)
              {
                var msg = "You can only specify one non modifier key!";
                this.error(msg);
                throw msg;
              }

              this.__key = identifier;
          }
        }
      }

      return true;
    },




    /*
    --------------------------------------------------------------------------
      INTERNAL MATCHING LOGIC
    ---------------------------------------------------------------------------
    */

    /**
     * Checks whether the given key event matches the shortcut's shortcut
     *
     * @param e {qx.event.type.KeySequence} the key event object
     * @return {Boolean} whether the shortcuts shortcut matches the key event
     */
    __matchesKeyEvent : function(e)
    {
      var key = this.__key;

      if (!key)
      {
        // no shortcut defined.
        return ;
      }

      // for check special keys
      // and check if a shortcut is a single char and special keys are pressed
      if (
        (!this.__modifier.Shift && e.isShiftPressed()) ||
        (this.__modifier.Shift && !e.isShiftPressed()) ||
        (!this.__modifier.Control && e.isCtrlPressed()) ||
        (this.__modifier.Control && !e.isCtrlPressed()) ||
        (!this.__modifier.Meta && e.isMetaPressed()) ||
        (this.__modifier.Meta && !e.isMetaPressed()) ||
        (!this.__modifier.Alt && e.isAltPressed()) ||
        (this.__modifier.Alt && !e.isAltPressed())
      ) {
        return false;
      }

      if (key == e.getKeyIdentifier()) {
        return true;
      }

      return false;
    },


    /*
    ---------------------------------------------------------------------------
      COMPATIBILITY TO COMMAND
    ---------------------------------------------------------------------------
    */

    /**
     * @lint ignoreReferenceField(__oldKeyNameToKeyIdentifierMap)
     */
    __oldKeyNameToKeyIdentifierMap :
    {
      // all other keys are converted by converting the first letter to uppercase
      esc             : "Escape",
      ctrl            : "Control",
      print           : "PrintScreen",
      del             : "Delete",
      pageup          : "PageUp",
      pagedown        : "PageDown",
      numlock         : "NumLock",
      numpad_0        : "0",
      numpad_1        : "1",
      numpad_2        : "2",
      numpad_3        : "3",
      numpad_4        : "4",
      numpad_5        : "5",
      numpad_6        : "6",
      numpad_7        : "7",
      numpad_8        : "8",
      numpad_9        : "9",
      numpad_divide   : "/",
      numpad_multiply : "*",
      numpad_minus    : "-",
      numpad_plus     : "+"
    },


    /**
     * Checks and normalizes the key identifier.
     *
     * @param keyName {String} name of the key.
     * @return {String} normalized keyIdentifier or "Unidentified" if a conversion was not possible
     */
    __normalizeKeyIdentifier : function(keyName)
    {
      var KeyHandler = qx.event.handler.Keyboard;
      var keyIdentifier = "Unidentified";

      if (KeyHandler.isValidKeyIdentifier(keyName)) {
        return keyName;
      }

      if (keyName.length == 1 && keyName >= "a" && keyName <= "z") {
        return keyName.toUpperCase();
      }

      keyName = keyName.toLowerCase();
      var keyIdentifier = this.__oldKeyNameToKeyIdentifierMap[keyName] || qx.lang.String.firstUp(keyName);

      if (KeyHandler.isValidKeyIdentifier(keyIdentifier)) {
        return keyIdentifier;
      } else {
        return "Unidentified";
      }
    },




    /*
    ---------------------------------------------------------------------------
      STRING CONVERSION
    ---------------------------------------------------------------------------
    */

    /**
     * Returns the shortcut as string using the currently selected locale.
     *
     * @return {String} shortcut
     */
    toString : function()
    {
      var key = this.__key;

      var str = [];

      for (var modifier in this.__modifier) {
        // this.__modifier holds a map with shortcut combination keys
        // like "Control", "Alt", "Meta" and "Shift" as keys with
        // Boolean values
        if (this.__modifier[modifier])
        {
          str.push(qx.locale.Key.getKeyName("short", modifier));
        }
      }

      if (key) {
        str.push(qx.locale.Key.getKeyName("short", key));
      }

      return str.join("+");
    }
  },




  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    // this will remove the event listener
    this.setEnabled(false);

    this.__modifier = this.__key = null;
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * Static class, which contains functionality to localize the names of keyboard keys.
 */

qx.Class.define("qx.locale.Key",
{
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /**
     * Return localized name of a key identifier
     * {@link qx.event.type.KeySequence}
     *
     * @param size {String} format of the key identifier.
     *       Possible values: "short", "full"
     * @param keyIdentifier {String} key identifier to translate {@link qx.event.type.KeySequence}
     * @param locale {String} optional locale to be used
     * @return {String} localized key name
     */
    getKeyName : function(size, keyIdentifier, locale)
    {
      if (qx.core.Environment.get("qx.debug")) {
        qx.core.Assert.assertInArray(size, ["short", "full"]);
      }

      var key = "key_" + size + "_" + keyIdentifier;
      // Control is alsways named control on a mac and not Strg in German e.g.
      if (qx.core.Environment.get("os.name") == "osx" && keyIdentifier == "Control") {
        key += "_Mac";
      }
      var localizedKey = qx.locale.Manager.getInstance().translate(key, [], locale);

      if (localizedKey == key) {
        return qx.locale.Key._keyNames[key] || keyIdentifier;
      } else {
        return localizedKey;
      }
    }
  },


  /*
  *****************************************************************************
     DEFER
  *****************************************************************************
  */

  defer : function(statics)
  {
    var keyNames = {};
    var Manager = qx.locale.Manager;

    // TRANSLATION: short representation of key names
    keyNames[Manager.marktr("key_short_Backspace")] = "Backspace";
    keyNames[Manager.marktr("key_short_Tab")] = "Tab";
    keyNames[Manager.marktr("key_short_Space")] = "Space";
    keyNames[Manager.marktr("key_short_Enter")] = "Enter";
    keyNames[Manager.marktr("key_short_Shift")] = "Shift";
    keyNames[Manager.marktr("key_short_Control")] = "Ctrl";
    keyNames[Manager.marktr("key_short_Control_Mac")] = "Ctrl";
    keyNames[Manager.marktr("key_short_Alt")] = "Alt";
    keyNames[Manager.marktr("key_short_CapsLock")] = "Caps";
    keyNames[Manager.marktr("key_short_Meta")] = "Meta";
    keyNames[Manager.marktr("key_short_Escape")] = "Esc";
    keyNames[Manager.marktr("key_short_Left")] = "Left";
    keyNames[Manager.marktr("key_short_Up")] = "Up";
    keyNames[Manager.marktr("key_short_Right")] = "Right";
    keyNames[Manager.marktr("key_short_Down")] = "Down";
    keyNames[Manager.marktr("key_short_PageUp")] = "PgUp";
    keyNames[Manager.marktr("key_short_PageDown")] = "PgDn";
    keyNames[Manager.marktr("key_short_End")] = "End";
    keyNames[Manager.marktr("key_short_Home")] = "Home";
    keyNames[Manager.marktr("key_short_Insert")] = "Ins";
    keyNames[Manager.marktr("key_short_Delete")] = "Del";
    keyNames[Manager.marktr("key_short_NumLock")] = "Num";
    keyNames[Manager.marktr("key_short_PrintScreen")] = "Print";
    keyNames[Manager.marktr("key_short_Scroll")] = "Scroll";
    keyNames[Manager.marktr("key_short_Pause")] = "Pause";
    keyNames[Manager.marktr("key_short_Win")] = "Win";
    keyNames[Manager.marktr("key_short_Apps")] = "Apps";

    // TRANSLATION: full/long representation of key names
    keyNames[Manager.marktr("key_full_Backspace")] = "Backspace";
    keyNames[Manager.marktr("key_full_Tab")] = "Tabulator";
    keyNames[Manager.marktr("key_full_Space")] = "Space";
    keyNames[Manager.marktr("key_full_Enter")] = "Enter";
    keyNames[Manager.marktr("key_full_Shift")] = "Shift";
    keyNames[Manager.marktr("key_full_Control")] = "Control";
    keyNames[Manager.marktr("key_full_Control_Mac")] = "Control";
    keyNames[Manager.marktr("key_full_Alt")] = "Alt";
    keyNames[Manager.marktr("key_full_CapsLock")] = "CapsLock";
    keyNames[Manager.marktr("key_full_Meta")] = "Meta";
    keyNames[Manager.marktr("key_full_Escape")] = "Escape";
    keyNames[Manager.marktr("key_full_Left")] = "Left";
    keyNames[Manager.marktr("key_full_Up")] = "Up";
    keyNames[Manager.marktr("key_full_Right")] = "Right";
    keyNames[Manager.marktr("key_full_Down")] = "Down";
    keyNames[Manager.marktr("key_full_PageUp")] = "PageUp";
    keyNames[Manager.marktr("key_full_PageDown")] = "PageDown";
    keyNames[Manager.marktr("key_full_End")] = "End";
    keyNames[Manager.marktr("key_full_Home")] = "Home";
    keyNames[Manager.marktr("key_full_Insert")] = "Insert";
    keyNames[Manager.marktr("key_full_Delete")] = "Delete";
    keyNames[Manager.marktr("key_full_NumLock")] = "NumLock";
    keyNames[Manager.marktr("key_full_PrintScreen")] = "PrintScreen";
    keyNames[Manager.marktr("key_full_Scroll")] = "Scroll";
    keyNames[Manager.marktr("key_full_Pause")] = "Pause";
    keyNames[Manager.marktr("key_full_Win")] = "Win";
    keyNames[Manager.marktr("key_full_Apps")] = "Apps";

    // Save
    statics._keyNames = keyNames;
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * Renders a special radio button inside a menu. The button behaves like
 * a normal {@link qx.ui.form.RadioButton} and shows a radio icon when
 * checked; normally shows no icon when not checked (depends on the theme).
 */
qx.Class.define("qx.ui.menu.RadioButton",
{
  extend : qx.ui.menu.AbstractButton,
  include : [qx.ui.form.MModelProperty],
  implement : [qx.ui.form.IRadioItem, qx.ui.form.IBooleanForm, qx.ui.form.IModel],



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param label {String} Initial label
   * @param menu {qx.ui.menu.Menu} Initial sub menu
   */
  construct : function(label, menu)
  {
    this.base(arguments);

    // Initialize with incoming arguments
    if (label != null) {
      this.setLabel(label);
    }

    if (menu != null) {
      this.setMenu(menu);
    }

    this.addListener("execute", this._onExecute, this);
  },



  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    // overridden
    appearance :
    {
      refine : true,
      init : "menu-radiobutton"
    },

    /** The value of the widget. True, if the widget is checked. */
    value :
    {
      check : "Boolean",
      nullable : true,
      event : "changeValue",
      apply : "_applyValue",
      init : false
    },

    /** The assigned qx.ui.form.RadioGroup which handles the switching between registered buttons */
    group :
    {
      check  : "qx.ui.form.RadioGroup",
      nullable : true,
      apply : "_applyGroup"
    }
  },





  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // overridden (from MExecutable to keet the icon out of the binding)
    /**
     * @lint ignoreReferenceField(_bindableProperties)
     */
    _bindableProperties :
    [
      "enabled",
      "label",
      "toolTipText",
      "value",
      "menu"
    ],


    // property apply
    _applyValue : function(value, old) {
      value ? this.addState("checked") : this.removeState("checked");
    },


    // property apply
    _applyGroup : function(value, old)
    {
      if (old) {
        old.remove(this);
      }

      if (value) {
        value.add(this);
      }
    },


    /**
     * Handler for the execute event.
     *
     * @param e {qx.event.type.Event} The execute event.
     */
    _onExecute : function(e) {
      var grp = this.getGroup();
      if (grp && grp.getAllowEmptySelection()) {
        this.toggleValue();
      } else {
        this.setValue(true);
      }
    },


    // overridden
    _onClick : function(e)
    {
      if (e.isLeftPressed()) {
        this.execute();
      } else {
        // don't close menus if the button has a context menu
        if (this.getContextMenu()) {
          return;
        }
      }
      qx.ui.menu.Manager.getInstance().hideAll();
    },


    // overridden
    _onKeyPress : function(e) {
      this.execute();
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

************************************************************************ */

/**
 * A button which acts as a normal button and shows a menu on one
 * of the sides to open something like a history list.
 *
 * @childControl button {qx.ui.form.Button} button to execute action
 * @childControl arrow {qx.ui.form.MenuButton} arrow to open the popup
 */
qx.Class.define("qx.ui.form.SplitButton",
{
  extend : qx.ui.core.Widget,
  include : [qx.ui.core.MExecutable],
  implement : [qx.ui.form.IExecutable],



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param label {String} Label to use
   * @param icon {String?null} Icon to use
   * @param menu {qx.ui.menu.Menu} Connect to menu instance
   * @param command {qx.ui.core.Command} Command instance to connect with
   */
  construct : function(label, icon, menu, command)
  {
    this.base(arguments);

    this._setLayout(new qx.ui.layout.HBox);

    // Force arrow creation
    this._createChildControl("arrow");

    // Add mouse listeners
    this.addListener("mouseover", this._onMouseOver, this, true);
    this.addListener("mouseout", this._onMouseOut, this, true);

    // Add key listeners
    this.addListener("keydown", this._onKeyDown);
    this.addListener("keyup", this._onKeyUp);

    // Process incoming arguments
    if (label != null) {
      this.setLabel(label);
    }

    if (icon != null) {
      this.setIcon(icon);
    }

    if (menu != null) {
      this.setMenu(menu);
    }

    if (command != null) {
      this.setCommand(command);
    }
  },



  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    // overridden
    appearance :
    {
      refine : true,
      init : "splitbutton"
    },

    // overridden
    focusable :
    {
      refine : true,
      init : true
    },


    /** The label/caption/text of the qx.ui.basic.Atom instance */
    label :
    {
      apply : "_applyLabel",
      nullable : true,
      check : "String"
    },


    /** Any URI String supported by qx.ui.basic.Image to display an icon */
    icon :
    {
      check : "String",
      apply : "_applyIcon",
      nullable : true,
      themeable : true
    },


    /**
     * Configure the visibility of the sub elements/widgets.
     * Possible values: both, text, icon
     */
    show :
    {
      init : "both",
      check : [ "both", "label", "icon" ],
      themeable : true,
      inheritable : true,
      apply : "_applyShow",
      event : "changeShow"
    },


    /** The menu instance to show when clicking on the button */
    menu :
    {
      check : "qx.ui.menu.Menu",
      nullable : true,
      apply : "_applyMenu",
      event : "changeMenu"
    }
  },



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __cursorIsOut : null,


    /*
    ---------------------------------------------------------------------------
      WIDGET API
    ---------------------------------------------------------------------------
    */

    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        case "button":
          control = new qx.ui.form.Button;
          control.addListener("execute", this._onButtonExecute, this);
          control.setFocusable(false);
          this._addAt(control, 0, {flex: 1});
          break;

        case "arrow":
          control = new qx.ui.form.MenuButton;
          control.setFocusable(false);
          this._addAt(control, 1);
          break;
      }

      return control || this.base(arguments, id);
    },

    // overridden
    /**
     * @lint ignoreReferenceField(_forwardStates)
     */
    _forwardStates :
    {
      hovered : 1,
      focused : 1
    },




    /*
    ---------------------------------------------------------------------------
      PROPERTY APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    // property apply
    _applyLabel : function(value, old)
    {
      var button = this.getChildControl("button");
      value == null ? button.resetLabel() : button.setLabel(value);
    },

    // property apply
    _applyIcon : function(value, old)
    {
      var button = this.getChildControl("button");
      value == null ? button.resetIcon() : button.setIcon(value);
    },

    // property apply
    _applyMenu : function(value, old)
    {
      var arrow = this.getChildControl("arrow");

      if (value)
      {
        arrow.resetEnabled();
        arrow.setMenu(value);
        value.setOpener(this);

        value.addListener("changeVisibility", this._onChangeMenuVisibility, this);
      }
      else
      {
        arrow.setEnabled(false);
        arrow.resetMenu();
      }

      if (old)
      {
        old.removeListener("changeVisibility", this._onChangeMenuVisibility, this);
        old.resetOpener();
      }
    },

    // property apply
    _applyShow : function(value, old) {
      // pass: is already inherited to the button
    },



    /*
    ---------------------------------------------------------------------------
      EVENT LISTENERS
    ---------------------------------------------------------------------------
    */

    /**
     * Listener for <code>mouseover</code> event
     *
     * @param e {qx.event.type.Mouse} mouseover event
     */
    _onMouseOver : function(e)
    {
      // Captured listener
      // Whole stop for event, do not let the
      // inner buttons know about this event.
      e.stopPropagation();

      // Add hover state, is forwarded to the buttons
      this.addState("hovered");

      // Delete cursor out flag
      delete this.__cursorIsOut;
    },


    /**
     * Listener for <code>mouseout</code> event
     *
     * @param e {qx.event.type.Mouse} mouseout event
     */
    _onMouseOut : function(e)
    {
      // Captured listener
      // Whole stop for event, do not let the
      // inner buttons know about this event.
      e.stopPropagation();

      // First simple state check
      if (!this.hasState("hovered")) {
        return;
      }

      // Only when the related target is not part of the button
      var related = e.getRelatedTarget();
      if (qx.ui.core.Widget.contains(this, related)) {
        return;
      }

      // When the menu is visible (cursor moved to the menu)
      // keep the hover state on the whole button
      var menu = this.getMenu();
      if (menu && menu.isVisible())
      {
        this.__cursorIsOut = true;
        return;
      }

      // Finally remove state
      this.removeState("hovered");
    },


    /**
     * Event listener for all keyboard events
     *
     * @param e {qx.event.type.KeySequence} Event object
     */
    _onKeyDown : function(e)
    {
      var button = this.getChildControl("button");
      switch(e.getKeyIdentifier())
      {
        case "Enter":
        case "Space":
          button.removeState("abandoned");
          button.addState("pressed");
      }
    },


    /**
     * Event listener for all keyboard events
     *
     * @param e {qx.event.type.KeySequence} Event object
     */
    _onKeyUp : function(e)
    {
      var button = this.getChildControl("button");
      switch(e.getKeyIdentifier())
      {
        case "Enter":
        case "Space":
          if (button.hasState("pressed"))
          {
            button.removeState("abandoned");
            button.removeState("pressed");
            button.execute();
          }
      }
    },


    /**
     * Event listener for button's execute event.
     *
     * @param e {qx.event.type.Event} execute event of the button
     */
    _onButtonExecute : function(e)
    {
      // forward execute event
      this.execute();
    },


    /**
     * Event listener for visibility changes of the menu
     *
     * @param e {qx.event.type.Data} property change event
     */
    _onChangeMenuVisibility : function(e)
    {
      if (!this.getMenu().isVisible() && this.__cursorIsOut) {
        this.removeState("hovered");
      }
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

************************************************************************ */

/**
 * A button which acts as a normal button and shows a menu on one
 * of the sides to open something like a history list.
 *
 * @childControl button {qx.ui.toolbar.Button} button to interact with
 * @childControl arrow {qx.ui.toolbar.MenuButton} menu button to show the menu connected to the split button
 */
qx.Class.define("qx.ui.toolbar.SplitButton",
{
  extend : qx.ui.form.SplitButton,



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(label, icon, menu, command)
  {
    this.base(arguments, label, icon, menu, command);

    // Toolbar buttons should not support the keyboard events
    this.removeListener("keydown", this._onKeyDown);
    this.removeListener("keyup", this._onKeyUp);
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    // overridden
    appearance :
    {
      refine : true,
      init : "toolbar-splitbutton"
    },


    // overridden
    focusable :
    {
      refine : true,
      init : false
    }
  },



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // overridden
    /**
     * @lint ignoreReferenceField(_forwardStates)
     */
    _forwardStates :
    {
      hovered : true,
      focused : true,
      left : true,
      middle : true,
      right : true
    },

    /*
    ---------------------------------------------------------------------------
      WIDGET API
    ---------------------------------------------------------------------------
    */

    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        case "button":
          control = new qx.ui.toolbar.Button;
          control.addListener("execute", this._onButtonExecute, this);
          this._addAt(control, 0);
          break;

        case "arrow":
          control = new qx.ui.toolbar.MenuButton;
          this._addAt(control, 1);
          break;
      }

      return control || this.base(arguments, id);
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

************************************************************************ */

/**
 * The button to fill the menubar
 *
 * @childControl arrow {qx.ui.basic.Image} arrow widget to show a submenu is available
 */
qx.Class.define("qx.ui.toolbar.MenuButton",
{
  extend : qx.ui.menubar.Button,




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /** Appearance of the widget */
    appearance :
    {
      refine : true,
      init : "toolbar-menubutton"
    },

    /** Whether the button should show an arrow to indicate the menu behind it */
    showArrow :
    {
      check : "Boolean",
      init : false,
      themeable : true,
      apply : "_applyShowArrow"
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // overridden
    _applyVisibility : function(value, old) {
      this.base(arguments, value, old);

      // hide the menu too
      var menu = this.getMenu();
      if (value != "visible" && menu) {
        menu.hide();
      }
    },


    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        case "arrow":
          control = new qx.ui.basic.Image();
          control.setAnonymous(true);
          this._addAt(control, 10);
          break;
      }

      return control || this.base(arguments, id);
    },


    // property apply routine
    _applyShowArrow : function(value, old)
    {
      if (value) {
        this._showChildControl("arrow");
      } else {
        this._excludeChildControl("arrow");
      }
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * Renders a special checkbox button inside a menu. The button behaves like
 * a normal {@link qx.ui.form.CheckBox} and shows a check icon when
 * checked; normally shows no icon when not checked (depends on the theme).
 */
qx.Class.define("qx.ui.menu.CheckBox",
{
  extend : qx.ui.menu.AbstractButton,
  implement : [qx.ui.form.IBooleanForm],



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param label {String} Initial label
   * @param menu {qx.ui.menu.Menu} Initial sub menu
   */
  construct : function(label, menu)
  {
    this.base(arguments);

    // Initialize with incoming arguments
    if (label != null) {
      // try to translate every time you create a checkbox [BUG #2699]
      if (label.translate) {
        this.setLabel(label.translate());
      } else {
        this.setLabel(label);
      }
    }

    if (menu != null) {
      this.setMenu(menu);
    }

    this.addListener("execute", this._onExecute, this);
  },



  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    // overridden
    appearance :
    {
      refine : true,
      init : "menu-checkbox"
    },

    /** Whether the button is checked */
    value :
    {
      check : "Boolean",
      init : false,
      apply : "_applyValue",
      event : "changeValue",
      nullable : true
    }
  },





  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // overridden (from MExecutable to keet the icon out of the binding)
    /**
     * @lint ignoreReferenceField(_bindableProperties)
     */
    _bindableProperties :
    [
      "enabled",
      "label",
      "toolTipText",
      "value",
      "menu"
    ],

    // property apply
    _applyValue : function(value, old)
    {
      value ?
        this.addState("checked") :
        this.removeState("checked");
    },


    /**
     * Handler for the execute event.
     *
     * @param e {qx.event.type.Event} The execute event.
     */
    _onExecute : function(e) {
      this.toggleValue();
    },


    // overridden
    _onClick : function(e)
    {
      if (e.isLeftPressed()) {
        this.execute();
      } else {
        // don't close menus if the button has a context menu
        if (this.getContextMenu()) {
          return;
        }
      }
      qx.ui.menu.Manager.getInstance().hideAll();
    },


    // overridden
    _onKeyPress : function(e) {
      this.execute();
    }
  }
});
