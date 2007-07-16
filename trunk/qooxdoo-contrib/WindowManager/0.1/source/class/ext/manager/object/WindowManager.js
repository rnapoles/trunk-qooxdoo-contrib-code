/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Authors:
     * Simon Bull (sbull)

************************************************************************ */

/* ************************************************************************

#module(ui_window)

************************************************************************ */

/*!
This singleton is intended to manage collections of ext.ui.window.Window
instances.

It recycles pooled Window instances rather than creating new Window instances
in order to reduce the browser's memory footprint when running a long lived,
single paged qoxodoo application.

When (new or recycled) Window instances are returned they are positioned
within a workspace according to an interchangable positioning strategy.  See
ext.manager.position.PositionManager.

Clients (probably Window instances) can send messages to Window TYPES via a
WindowManager's getTopOfType() method, which returns the highest z-order
Window instance of the required type that currently exists within a workspace.
If no such instance exists, a new one (or one from a Pool) will be instantiated
(or recycled).

Note that clients cannot directly message other Window INSTANCES.  This is by
design.  The principle reason for this is that in an asynchronous environment
there is no guarentee that the instance a client wants actually exists.  If
one Window instance must communicate with another Window instance explicitly,
it is likely the two Windows could be refactored into a single Window class,
perhaps with multiple panes.

@param vSupportedTypes {Array} An Array of Objects whose properties describe
                       a single supported Window type.  This Object must be
                       of the form:
                        [
                            {
                              classname    : "ext.ui.window.UsersImageWindow",
                              caption      : "Users Window",
                              icon         : "apps/system-users",
                              minIcon      : "apps/system-users",
                              height       : 300,
                              minHeight    : 128,
                              width        : 300,
                              minWidth     : 128,
                              maxNumber    : 10,
                              modal        : false,
                              clickToFocus : true
                            },
                            {...},
                            {...}
                        ]

@author sbull
*/
qx.OO.defineClass("ext.manager.object.WindowManager", qx.manager.object.WindowManager,
function(vSupportedTypes) {
  qx.manager.object.WindowManager.call(this);


  // ************************************************************************
  //   RESTORED WINDOW MANAGEMENT
  // ************************************************************************

  this._restoredWindows = new ext.manager.object.SupportedTypeMixin(vSupportedTypes);


  // ************************************************************************
  //   MINIMISED WINDOW MANAGEMENT
  // ************************************************************************

  this._minimisedWindows = new ext.manager.object.SupportedTypeMixin(vSupportedTypes);


  // ************************************************************************
  //   WINDOW POOL
  // ************************************************************************

  this._pool = ext.core.Pool.getInstance();
  this._pool.setPoolSizes( this._getPoolSizes() );


  // ************************************************************************
  //   WINDOW POSITION MANAGER
  // ************************************************************************


  // Note the nasty use of the global WORKSPACE identifier here.
  // In this demo WORKSPACE is defined in custom.Application.main()
  // However, it would be nicer if it the PostionManager was passed
  // in as a constructor argument, or set as a property.
  //
  this._positioner = new ext.manager.position.PositionManager(WORKSPACE);

});


/*
---------------------------------------------------------------------------
  SINGLETON INSTANCE
---------------------------------------------------------------------------
*/


qx.Clazz.getInstance = qx.lang.Function.returnInstance;


/*
---------------------------------------------------------------------------
  PROPERTIES
---------------------------------------------------------------------------
*/


/*!
  The workspace is a qx.ui.core.Parent that this WindowManager will manager
  windows within.  New windows will be added to the workspace.  Window will be
  maximised and positioned within the workspace.

qx.OO.addProperty({ name : "workspace", type : "object", instance : "qx.ui.core.Parent", allowsNull : false });
*/

/*!
  This private property is immutable - it can only be set once.

  The FactoryManager is used to provide appropriate Factory classes.

qx.OO.addProperty({ name : "factoryManager", type : "object", instance : "ext.manager.object.FactoryManager", allowsNull : false });
*/

/*!
  This private property is immutable - it can only be set once.

  The PositionManager is used to position window instances.
*/
//qx.OO.addProperty({ name : "positionManager", type : "object", instance : "ext.manager.object.PositionManager", allowsNull : false });


/*
---------------------------------------------------------------------------
  CONSTANTS
---------------------------------------------------------------------------
*/


ext.manager.object.WindowManager.SUPPORTED_TYPE_CLASSNAME      = "classname";
ext.manager.object.WindowManager.SUPPORTED_TYPE_CAPTION        = "caption";
ext.manager.object.WindowManager.SUPPORTED_TYPE_ICON           = "icon";
ext.manager.object.WindowManager.SUPPORTED_TYPE_MIN_ICON       = "minIcon";
ext.manager.object.WindowManager.SUPPORTED_TYPE_MAX_NUMBER     = "maxNumber";
ext.manager.object.WindowManager.SUPPORTED_TYPE_CLICK_TO_FOCUS = "clickToFocus";
ext.manager.object.WindowManager.SUPPORTED_TYPE_MODAL          = "modal";
ext.manager.object.WindowManager.SUPPORTED_TYPE_HEIGHT         = "height";
ext.manager.object.WindowManager.SUPPORTED_TYPE_WIDTH          = "width";
ext.manager.object.WindowManager.SUPPORTED_TYPE_MIN_HEIGHT     = "minHeight";
ext.manager.object.WindowManager.SUPPORTED_TYPE_MIN_WIDTH      = "minWidth";


/*
---------------------------------------------------------------------------
  UTILITIES
---------------------------------------------------------------------------
*/


qx.Proto.getPool = function()
{
  return this._pool;
}


qx.Proto.getWorkspace = function()
{
  return this._workspace;
}


/*
---------------------------------------------------------------------------
  MODIFIERS
---------------------------------------------------------------------------
*/


/*
---------------------------------------------------------------------------
  WINDOW MANAGER API
---------------------------------------------------------------------------

  Delegate all calls to window management API to this._restoredWindows

*/


qx.Proto.add = function(vObject)
{
  this._restoredWindows.add(vObject);

  // Code copied from qx.manager.object.WindowManager.add()
  this.setActiveWindow(vObject);
};


qx.Proto.remove = function(vObject)
{
  // Remove from supported types manager
  this._restoredWindows.remove(vObject);

  // Code copied from qx.manager.object.WindowManager.remove()
  if (this.getActiveWindow() == vObject)
  {
    var a = [];
    for (var i in this._objects) {
      a.push(this._objects[i]);
    }

    var l = a.length;

    if (l==0)
    {
      this.setActiveWindow(null);
    }
    else if (l==1)
    {
      this.setActiveWindow(a[0]);
    }
    else if (l>1)
    {
      a.sort(this.compareWindows);
      this.setActiveWindow(a[l-1]);
    }
  }

};


qx.Proto.has = function(vObject)
{
  return this._restoredWindows.has(vObject);
};


qx.Proto.get = function(vObject)
{
  return this._restoredWindows.get(vObject);
};


/*
  @return An Array of all open or maximised windows.  Does not return minimised
          or pooled window instances.
*/
qx.Proto.getAll = function()
{
  return this._restoredWindows.getAll();
};


/*
  @return An Array of all open or maximised windows.  Does not return minimised
          or pooled window instances.  The Array contains no empty elements, but
          windows are not indexed by their hashcodes.
*/
qx.Proto.getTrimmedAll = function()
{
  return this._restoredWindows.getTrimmedAll();
};


qx.Proto.enableAll = function()
{
  this._restoredWindows.enableAll();
};


qx.Proto.disableAll = function()
{
  this._restoredWindows.disableAll();
};


/*
  @return An Array of all open or maximised windows of type vClassname.  Does
          not return minimised or pooled window instances.
*/
qx.Proto.getAllOfType = function(vClassname)
{
  return this._restoredWindows.getAllOfType(vClassname);
};


/*
  @return An Array of all open or maximised windows of type vClassname.  Does
          not return minimised or pooled window instances.  The Array contains
          no empty elements, but windows are not indexed by their hashcodes.
*/
qx.Proto.getTrimmedAllOfType = function(vClassname)
{
  return this._restoredWindows.getTrimmedAllOfType(vClassname);
};


qx.Proto.supportsType = function(vClassname)
{
  return this._restoredWindows.supportsType(vClassname);
};


/*
  @return The highest z-order window that is not minimised.
          Can return null.
*/
qx.Proto.getTopWindow = function()
{

  var topWindow = null;

  if (this.getActiveWindow() != null)
  {
    topWindow = this.getActiveWindow();
  }
  else
  {
    var a = this.getAll();
    for (var i = 0; i < a.length; i++)
    {
      var w = a[i];
      if (w != null && w.getVisibility() == true) {
        if (topWindow == null) {
          topWindow = w;
        }
        else {
          if (w.getZIndex() > topWindow.getZIndex()) {
            topWindow = w;
          }
        }
      }
    }
  }

  return topWindow;
}


/*
  Count the sum of the number of open, maximised and minimised window
  instances of type vClassname.

  @return {Integer} The number of extant (open, maximised or minimised) window
                instances of type vClassname that currently exist.
*/
qx.Proto.countExtantOfType = function(vClassname)
{
  var n = this.countOpenOfType(vClassname);
  var m = this.countMinimisedOfType(vClassname);
  return n + m;
}


/*
  @return {Integer} The number of minimised windows of type vClassname that exist.
*/
qx.Proto.countMinimisedOfType = function(vClassname)
{
  var n = (this._minimisedWindows.getTrimmedAllOfType(vClassname) != null)
        ? this._minimisedWindows.getTrimmedAllOfType(vClassname).length
        : 0;

  return n;
}


/*
  @return {Integer} The number of open (open or maximised) windows of type
                vClassname that currently exist.
*/
qx.Proto.countOpenOfType = function(vClassname)
{
  var n = (this.getTrimmedAllOfType(vClassname) != null)
        ? this.getTrimmedAllOfType(vClassname).length
        : 0;

  return n;
}


/*
  @return {Integer} The number of pooled windows instances of type vClassname that
                currently exist.
*/
qx.Proto.countPooledOfType = function(vClassname)
{
  return this._pool.countObjectsOfType(vClassname);
}


/*
---------------------------------------------------------------------------
  WINDOW FACTORY API
---------------------------------------------------------------------------
*/


/*
  @return A Map of classname : maxNumber for each window type in vSupportedTypes
          that specifies a maximum number of instances.
*/
qx.Proto._getPoolSizes = function()
{
  var sizes = {};

  var typeDefs = this._restoredWindows.getSupportedTypeDefs();
  for (var i in typeDefs)
  {
    var typeDef = typeDefs[i];
    var classname = typeDef[ext.manager.object.WindowManager.SUPPORTED_TYPE_CLASSNAME];
    var maxNumber = typeDef[ext.manager.object.WindowManager.SUPPORTED_TYPE_MAX_NUMBER];
    if (classname && maxNumber)
    {
      sizes[classname] = maxNumber;
    }
  }

  return sizes;
}


/*
  Create a new window instance of a specified type.

  Add the new window instance to the canvas.

  @param vClassname {String} The classname of the window type we want.

  @return {qx.ui.window.Window} A new window of type classname, or null if
          classname is not a valid window type.
*/
qx.Proto.getNewOfType = function(vClassname)
{
  var vWindow = null;

  if (this._restoredWindows.supportsType(vClassname))
  {
    var typeDef = this._restoredWindows.getTypeDef(vClassname);

    var vExtantInstances = this.countExtantOfType(vClassname);
    var vPooledInstances = this.countPooledOfType(vClassname);

    var vInstances = vExtantInstances + vPooledInstances;
    var vMaxNumber  = typeDef[ext.manager.object.WindowManager.SUPPORTED_TYPE_MAX_NUMBER];
    var isOkayToCreate = (vInstances < vMaxNumber) ? true : false;

    // Ask the pool for an instance
    vWindow = this._pool.getObjectOfType(vClassname);

    if (vWindow == null)
    {
      if (isOkayToCreate)
      {
        var vCaption      = typeDef[ext.manager.object.WindowManager.SUPPORTED_TYPE_CAPTION];
        var vIconSrc      = typeDef[ext.manager.object.WindowManager.SUPPORTED_TYPE_ICON];
        var vMinIconSrc   = typeDef[ext.manager.object.WindowManager.SUPPORTED_TYPE_MIN_ICON];

        var vIcon    = "icon/16/"
                     + vIconSrc
                     + ".png";

        var vMinIcon = "icon/32/"
                     + vMinIconSrc
                     + ".png";

        vWindow = eval("new " + vClassname + "(\""+vCaption+"\", \""+vIcon+"\", \""+vMinIcon+"\", WINDOW_MANAGER)");
      }
    }

    if (vWindow != null)
    {
      with (vWindow) {
        setHeight(      typeDef[ext.manager.object.WindowManager.SUPPORTED_TYPE_HEIGHT]);
        setMinHeight(   typeDef[ext.manager.object.WindowManager.SUPPORTED_TYPE_MIN_HEIGHT]);
        setWidth(       typeDef[ext.manager.object.WindowManager.SUPPORTED_TYPE_WIDTH]);
        setMinWidth(    typeDef[ext.manager.object.WindowManager.SUPPORTED_TYPE_MIN_WIDTH]);
        setModal(       typeDef[ext.manager.object.WindowManager.SUPPORTED_TYPE_MODAL]);
        setClickToFocus(typeDef[ext.manager.object.WindowManager.SUPPORTED_TYPE_CLICK_TO_FOCUS]);
        setShowStatusbar(true);
        //setMoveMethod("frame");
        //setResizeMethod("frame");
      }

      // TODO enforce setUp for all window types
      if (vWindow != null && vWindow.setUp) {
        vWindow.setUp();
      }

      // TODO Should this be in Window.setup()?
      vWindow.addToDocument();
      vWindow.show();

      // Position our new window instance -- modal dialogs should be centered
      if (typeDef.modal == true)
      {
        vWindow.setShowMaximize(false);
        vWindow.setShowMinimize(false);
        vWindow.setResizeable(false);
        vWindow.centerToBrowser();

        // Remove ext.ui.window.Window's custom status bar
        vWindow._layout.remove(vWindow._statusBar);

        // Replace with qx.ui.window.Window's status bar
        var sb = vWindow._statusBar = new qx.ui.layout.HorizontalBoxLayout;
        sb.setAppearance("window-statusbar");
        var st = vWindow._statusText = new qx.ui.basic.Label("Ready");
        st.setAppearance("window-statusbar-text");
        st.setSelectable(false);
        sb.add(st);
        //vWindow._layout.addAtEnd(vWindow._statusBar);

        vWindow.setShowStatusbar(false);

      }
      else {
        this.positionWindow(vWindow);
      }
    }
    else {
      var vCaption = typeDef[ext.manager.object.WindowManager.SUPPORTED_TYPE_CAPTION];
      var windowString = (vMaxNumber == 1) ? "window" : "windows";
      alert("You can only have " + vMaxNumber + " " + vCaption + " " + windowString + " open at a time.");
    }
  }
  else {
    this.warn("Can't getNewOfType for unsupported classname=" + vClassname);
  }


  return vWindow;
}


/*
  Get a reference to the highest z order window instance of a specified type.

  If no window of the desired type exists, create and return a new instance.

  @param vClassname {String} The classname of the window type we want.

  @return {qx.ui.window.Window} A new window of type classname, or null if
          classname is not a valid window type.
*/
qx.Proto.getTopOfType = function(vClassname)
{
  var vWindow = null;

  if (this._restoredWindows.supportsType(vClassname))
  {
    var vAll = this._restoredWindows._objectsOfType[vClassname];
    if (vAll != null) {
      for (var i = 0; i < vAll.length; i++) {
        var vObj = vAll[i];
        if (vObj != null && vObj.classname == vClassname) {
          if (!vWindow) {
            vWindow = vObj;
          }
          else {
            if (vObj.getZIndex && (vObj.getZIndex() > vWindow.getZIndex()) ) {
              vWindow = vObj;
            }
          }
        }
      }
    }

    // If we haven't found a top window, check the minimised windows
    if (vWindow == null)
    {
      vMins = this._minimisedWindows.getTrimmedAllOfType(vClassname);
      if (vMins != null && vMins.length > 0)
      {
        // Get the first minimised window
        vWindow = vMins[0];

        // Restore -- as thou user had double-clicked min atom
        vWindow._handleatomdblclick();
      }

    }

    // If we still haven't found a top window, create one
    if (vWindow == null) {
      vWindow = this.getNewOfType(vClassname);
      vWindow.addToDocument();
      vWindow.show();
    }
  }
  else {
    this.warn("Can't getTopOfType for unsupported classname=" + vClassname);
  }

  // Bring this window to the front
  vWindow.setActive(true);

  return vWindow;
}



/*

*/
qx.Proto.closeWindow = function(vWindow)
{

  if (vWindow.tearDown) {
    vWindow.tearDown();
  }
  else {
    this.warn("closeWindow() " + vWindow.classname + " does not have a tearDown()");
  }

  this._pool.poolObject(vWindow);
}


/*
---------------------------------------------------------------------------
  POSITIONING INTERFACE
---------------------------------------------------------------------------
*/


qx.Proto.positionWindow = function(vWindow)
{
  this._positioner.positionWindow(vWindow);
}


qx.Proto.maximiseWindow = function(vWindow)
{
  this._positioner.maximiseWindow(vWindow);
}


qx.Proto.minimiseWindow = function(vWindow)
{
  // Add the minimised window to this._minimisedWindows
  this._minimisedWindows.add(vWindow);

  // Represent the minimised window in the UI
  this._positioner.minimiseWindow(vWindow);
}


qx.Proto.restoreFromMinimised = function(vWindow)
{
  // Remove the minimised window to this._minimisedWindows
  this._minimisedWindows.remove(vWindow);

  // Represent the resotred window in the UI
  this._positioner.restoreFromMinimised(vWindow);
}


qx.Proto.arrangeWindows = function()
{
  this._positioner.arrangeWindows(this.getAll());
}



/*
---------------------------------------------------------------------------
  DISPOSER
---------------------------------------------------------------------------
*/


qx.Proto.dispose = function()
{
  if (this.getDisposed())
  {
    return true;
  }

  if (this._objectsOfType)
  {
    this._objectsOfType = null;
  }

  if (this._restoredWindows)
  {
    this._restoredWindows.dispose();
  }

  this.warn("Implement me!");

  return qx.manager.object.WindowManager.prototype.dispose.call(this);
}