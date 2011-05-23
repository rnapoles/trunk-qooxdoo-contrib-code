/* ************************************************************************

   Copyright:
     2009 Derrell Lipman

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Derrell Lipman (derrell)

#asset(qooxit/*)
#asset(qx/icon/${qx.icontheme}/16/actions/*)
#asset(qx/icon/${qx.icontheme}/16/apps/utilities-help.png)
#asset(qx/icon/${qx.icontheme}/22/apps/preferences-users.png)
#ignore(CodeMirror)
************************************************************************ */

/**
 * Main application class for qooxit
 */
qx.Class.define("qooxit.Application",
{
  extend  : qx.application.Standalone,

  statics :
  {
    /** Whether to allow any RPC calls. Setting false allows local debugging */
    bAllowRpc : false
  },

  members :
  {
    /** Whether we are displaying widgets with sample data */
    bSampleData : true,

    /** Whether to display the server-generated XML */
    bShowXml    : false,

    /** Whether to display the server-generated JSON */
    bShowJson   : false,

    /** Our reusable JSON-RPC object */
    rpc         : null,

    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Add a bindTo() method to qx.core.Object as a shortcut to constantly
      // having to use qx.lang.Function.bind()
      qx.Class.include(qx.core.Object, qooxit.MObject);

      // We want to use some of the high-level node operation convenience
      // methods rather than manually digging into the TreeVirtual helper
      // classes.  Include the mixin that provides them.
      qx.Class.include(qx.ui.treevirtual.TreeVirtual,
                       qx.ui.treevirtual.MNode);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
      }

      // Instantiate a new RPC object
      this.rpc = new qx.io.remote.Rpc();
      this.rpc.setTimeout(10000);
      this.rpc.setUrl("/~dlipman/web/index.jsp");
      this.rpc.setServiceName("qooxit.application");

      // Only allow a single concurrent request, so we are sure that saving a
      // child to the server has completed before the next child is saved.
      qx.io.remote.RequestQueue.getInstance().setMaxConcurrentRequests(1);

      // Start the progressive loader
      this.progressiveLoader();

      // Create an element to highlight objects during mouseover of
      // the Application tree.
      this.highlighter = new qx.html.Element("div");
      this.highlighter.setStyles(
        {
          position        : "absolute",
          top             : "-9999px",
          left            : "-9999px",
          width           : "20px",
          height          : "20px",
          backgroundColor : "transparent",
          borderStyle     : "solid",
          borderWidth     : "1px",
          borderColor     : "red",
          padding         : "0px",
          margin          : "0px",
          zIndex          : "9999"
        });

      // Add it to the application's root container
      this.getRoot().getContainerElement().add(this.highlighter);

      // If RPC isn't disabled...
      if (qooxit.Application.bAllowRpc)
      {
        // ... then create a recurrent keep-alive timer. Send an otherwise
        // superfluous request to the server periodically solely to keep the
        // session alive.
        var timer = qx.util.TimerManager.getInstance();
        timer.start(
          function(userData, timerId)
          {
            // Empty callback function; method="keepAlive"; no parameters
            this.rpc.callAsync(qx.lang.Function.empty, "keepAlive");
          },
          30000,
          this,
          null,
          30000);
      }
    },

    /**
     * Add an object to the Application tree, the Live view, and the source
     * view.
     *
     * @param classInstance {qooxit.library/ui/Abstract}
     *   The library singleton instance from which the object is created
     *
     * @param options {Map}
     *   Merged default and user-provided options for creating this object
     *
     * @param label {String}
     *   Label to add to the Application tree for this item
     *
     * @param folder {qx.ui.tree.TreeFolder}
     *   The folder in the Application tree into which this item should be
     *   added
     *
     * @param sourceTree {qx.ui.tree.Tree}
     *   The tree from which the item being added was dragged
     *
     * @param bNoRemote {Boolean}
     *  If true, do not add the object remotely. This indicates that we
     *  are adding objects as the result of having received them from the
     *  server.
     *
     * @param applicationSource {Map}
     *   Information about the Application.js source editor
     */
    addObject : function(classInstance,
                         options,
                         label,
                         folder,
                         sourceTree,
                         applicationSource,
                         bNoRemote)
    {
      // Add the node to the specified parent by calling its factory
      var fFactory = classInstance.bindTo(classInstance.factory);
      var o = fFactory(options);

      // If sample data is being requested...
      if (qx.core.Init.getApplication().bSampleData &&
          classInstance._snippets &&
          classInstance._snippets.sampleData &&
          classInstance._snippets.sampleData.code)
      {
        var fSampleData =
          classInstance.bindTo(classInstance._snippets.sampleData.code);
        fSampleData(o);
      }

      // Add a node to the Application tree
      var subItem;
      // If this is a container...
      if (classInstance.getIsContainer())
      {
        // ... then create a tree folder
        subItem = new qx.ui.tree.TreeFolder(label)
        subItem.setOpen(true);
      }
      else
      {
        // ... otherwise create a tree file (for now)
        subItem = new qx.ui.tree.TreeFile(label);
      }
      folder.add(subItem);

      // Add the new node to its parent's node
      folder.getUserData("object").add(o);

      // Save the object with its node in the Application tree
      subItem.setUserData("object", o);

      // Save the options
      subItem.setUserData("options", options);

      // Save the original label
      subItem.setUserData("label", label);

      // Allow the item to be dragged around in the application tree
      subItem.setDraggable(true);

      if (! bNoRemote)
      {
        this.addObjectRemote(folder.getUserData("name"),
                             classInstance.classname,
                             label,
                             options);
      }

      // If this is a container...
      if (classInstance.getIsContainer())
      {
        // ... then handle a drop into it
        subItem.setDroppable(true);
        subItem.addListener("drop", this.handleDrop, this);
      }

      // On mouseover of this item, highlight it in the Live view
      subItem.addListener(
        "mouseover",
        function(e)
        {
          var container = o.getContainerElement().getDomElement();
          var location = qx.bom.element.Location.get(container, "margin");
          this.highlighter.setStyles(
            {
              visibility  : "show",
              borderColor : classInstance.getIsContainer() ? "green" : "red",
              top         : (location.top) + "px",
              left        : (location.left) + "px",
              width       : (location.right - location.left) + "px",
              height      : (location.bottom - location.top) + "px"
            },
            true);
        },
        this);

      // On mouseout of this item, remove the highlight
      subItem.addListener(
        "mouseout",
        function(e)
        {
          this.highlighter.setStyles(
            {
              top    : "-9999px",
              left   : "-9999px",
              width  : "20px",
              height : "20px"
            });
        },
        this);

      // Allow the item to be copied
      subItem.addListener("dragstart",
                            function(e)
                            {
                              e.addAction("move");
                              e.addType("qooxit");
                            });

      // If it is dropped, provide the factory for adding it to the application
      // tree.
      subItem.addListener(
        "droprequest",
        function(e)
        {
          e.addData("qooxit", classInstance);
        });

      //
      // Generate the Application code.
      //

      // Initially there's no text
      var text = "";

      // Clear the selection from the source tree, if one is specified
      sourceTree && sourceTree.resetSelection();

      // Determine the starting line number in the widget factory
      var startLine = applicationSource.editor.lineNumber(
        applicationSource.editor.insertPoint);

      // If there has been anything added previously then add a comma
      var comma = (startLine > 4 ? ",\n\n\n" : "\n");

      // Write the Application code.
      // First, if there's a comment...
      if (options.comment)
      {
        // ... then add it.
        text += "// " + options.comment + "\n";
      }

      // Retrieve the variable name
      var name = options["_name_"];

      // Save this name in the new object
      subItem.setUserData("name", name);

      // Save the factory from which we instantiated this object
      subItem.setUserData("classInstance", classInstance);

      // Temporarily delete the variable name from the options
      delete options["_name_"];

      // Assign a call to the factory method to the specified named variable
      text +=
        "\n\n" +
        "var " + name + " = " +
        "(" + classInstance.factory.toString() + ")(" +
        (qx.lang.Object.isEmpty(options)
         ? ""
         : "\n" + qx.util.Json.stringify(options, true)) +
        ");\n";

      // Reset the tree node to include the variable name
      subItem.setLabel(name + ": " + subItem.getLabel())

      // Add it to the specified container
      text += folder.getUserData("name") + ".add(" + name + ");";

      // Was sample data requested?
      if (qx.core.Init.getApplication().bSampleData &&
          classInstance._snippets &&
          classInstance._snippets.sampleData &&
          classInstance._snippets.sampleData.code)
      {
        // Yup. Add the sample data snippet
        text +=
          "\n\n" +
          "// Add sample data\n" +
          "(" + classInstance._snippets.sampleData.code + ")(" + name + ");";
      }

      // Determine how many lines long the text is including
      // the extra newlines we'll prepend
      var lines = text.split("\n").length;

      // Insert the new text
      applicationSource.editor.insertIntoLine(
        applicationSource.editor.insertPoint,
        "end",
        text);

      // Reindent the new text using internal indentRegion()
      var startPoint = applicationSource.editor.insertPoint;
      var endPoint = applicationSource.editor.nthLine(startLine + lines);
      applicationSource.editor.editor.indentRegion(
        applicationSource.editor.nthLine(3), endPoint);

      // Remove the selection indication
      applicationSource.editor.selectLines(endPoint, 0);

      // The new insert point is the previous end point, but CodeMirror
      // requires a point on the previous line for the new insert point
      endPoint = applicationSource.editor.nthLine(startLine + lines - 1);
      applicationSource.editor.insertPoint = endPoint;

      // Put the variable name back in the options in preparation for saving
      options["_name_"] = name;

      // Give 'em the new object
      return subItem;
    },


    /**
     * Add an object to the remote store.
     *
     * @param parentName
     *   The name of the parent to which the new item is being added
     *
     * @param className
     *   The name of the qooxit factory class which instantiates this new
     *   object
     *
     * @param label
     *   The label in the Application tree
     *
     * @param options
     *   Options to be passed to the qooxit factory class to instantiate this
     *   object.
     */
    addObjectRemote : function(parentName, className, label, options)
    {
      // If we've disabled RPC...
      if (! qooxit.Application.bAllowRpc)
      {
        // ... then there's nothing to do.
        return;
      }

      this.rpc.callAsync(
        this.bindTo(
          function(result, ex, id)
          {
            if (ex == null)
            {
//              alert(result.debug);

              if (this.bShowXml)
              {
                alert(result.xml);
              }
              if (this.bShowJson)
              {
                alert(qx.dev.Debug.debugObjectToString(result.json, "JSON"));
              }

              // If this was adding the root object...
              if (parentName.length == 0 &&
                  result.json[0].children &&
                  result.json[0].children.length > 0)
              {
                // ... then add any children reported by the server
                this.addObjectTree(result.json[0].children,
                                   this.context.applicationRoot);
              }
            }
            else
            {
              alert("Async(" + id + ") exception: " + ex);
            }
          }),
        "addChild",
        parentName,
        className,
        label,
        options);
    },


    /**
     * Add an entire tree of objects. This method is called upon start-up, to
     * re-load the previous application in development.
     *
     * @param widgetDescriptionList {Map}
     *   An array of widget descriptions. Each widget description contains the
     *   widget's class name, the label to be applied to the new node in the
     *   application tree, and an array of child descriptions. This function
     *   is called recursively for child lists.
     *
     * @param folder {qx.ui.tree.TreeFolder}
     *   The parent folder to which the new widget should be added
     */
    addObjectTree : function(widgetDescriptionList, folder)
    {
      for (var i = 0; i < widgetDescriptionList.length; i++)
      {
        // Get a refrence to the descripton of the widget being added
        var widget = widgetDescriptionList[i];

        // Get the qooxit class instance for this widget
        var classInstance =
          qooxit.library.Library.getInstanceByName(widget.className);

        // Create the new object according to the description
        this.warn("Add " + classInstance + " label=" + widget.label);
        var subFolder = this.addObject(classInstance,
                                       widget.options || {},
                                       widget.label,
                                       folder,
                                       null,
                                       this.context.applicationSource,
                                       true);

        // If this widget description shows any children, ...
        if (widget.children && widget.children.length > 0)
        {
          // ... then recursively add them
          this.addObjectTree(widget.children, subFolder);
        }
      }
    },


    /**
     * Add a class to the Containers & Widgets menu.
     *
     * @param root {qx.ui.tree.AbstractTreeItem}
     *   The root of the Containers & Widgets  menu tree
     *
     * @param clazz {qooxit.library.ui.Abstract}
     *   The class being added to the menu.
     */
    addClass : function(root, clazz)
    {
      // Instantiate the specified class
      var classInstance = clazz.getInstance();

      // Ascertain the menu for this class
      var menuHierarchy = classInstance.getMenuHierarchy();

      // Find or create this menu item and get the tree parent to insert our
      // new tree item.
      var treeItem = this.findMenuItem(root, menuHierarchy);

      // This item has to be draggable to be dropped into the application tree
      treeItem.setDraggable(true);

      // Save the class instance for this item
      treeItem.setUserData("classInstance", classInstance);

      // Allow the item to be copied
      treeItem.addListener("dragstart",
                           function(e)
                           {
                             e.addAction("copy");
                             e.addType("qooxit");
                           });

      // If it is dropped, provide the factory for adding it to the application
      // tree.
      treeItem.addListener(
        "droprequest",
        function(e)
        {
          e.addData("qooxit",
                    classInstance);
        });
    },

    /**
     * Recursively find the menu item in the tree which is associated with the
     * provided hierarchy. If the item is not found, it is created.
     *
     * @param root {qx.ui.tree.AbstractTreeItem}
     *   The current node of the tree we are searching
     *
     * @param menuHierarchy {Array}
     *   A list of remaining hierarchy elements to be located.
     *   NOTE: This function is destructive of the array. It shifts items off
     *         the beginning of the array as they are found.
     *
     * @return {qx.ui.tree.AbstractTreeItem}
     *   The found or newly-created folder.
     */
    findMenuItem : function(root, menuHierarchy)
    {
      // Get the non-recursiv elist of items in the tree at this level
      var items = root.getItems(false, true);

      // Get the current name we're looking for.
      var current = menuHierarchy.shift();

      // For each item in the tree...
      for (var item = 0; item < items.length; item++)
      {
        // ... does it match our current item in the hierarchy?
        if (items[item].getLabel() == current)
        {
          // Yup. Are there any more?
          if (menuHierarchy.length == 0)
          {
            // Nope. The requested hierarchy was found and terminates here.
            return items[item];
          }

          // There are more. Call recursively.
          return this.findMenuItem(items[item], menuHierarchy);
        }
      }

      // This item wasn't here. Put it back on the hierarchy array
      menuHierarchy.unshift(current);

      // Recursively create the rest of the hierarchy
      while (menuHierarchy.length > 0)
      {
        // Get the item to be added
        current = menuHierarchy.shift();

        // Create a new folder for this level of the hierarchy
        var folder = new qx.ui.tree.TreeFolder(current);

        // The folder is open by default
        folder.setOpen(true)

        // Add it to its parent
        root.add(folder);

        // The new parent is the just-added folder
        root = folder;
      }

      // The last item we added was the one we were looking for.
      return folder;
    },

    /**
     * Create the source editor.
     *
     * @param source {Map}
     *   A map containing the following:
     *     page   - The qooxdoo tab page in which to add the source editor
     *     text   - Any initial text to be placed in the editor
     *     appear - a function to call when the editor appears
     */
    createSourceEditor : function(source)
    {
      // This code uses the CodeMirror library to add a
      // syntax-highlighting editor
      var height = source.page.getBounds().height;
      var width = source.page.getBounds().width;

      source.editor = new CodeMirror(
        source.page.getContainerElement().getDomElement(),
        {
          content            : source.text,
          parserfile         : [ "tokenizejavascript.js",
                                 "parsejavascript.js" ],
          stylesheet         : "resource/qooxit/css/jscolors.css",
          path               : "resource/qooxit/js/",
          textWrapping       : false,
          continuousScanning : false,
          width              : width + "px",
          height             : height + "px",
          autoMatchParens    : true,
          readOnly           : true,
          initCallback       : function(editor)
          {
            // Set the initial text
            editor.setCode(source.text);

            // Move to the proper insertion point
            source.appear(editor);
          }
        });

      source.editor.frame.style.width =
        source.page.getBounds().width + "px";
      source.editor.frame.style.height =
        source.page.getBounds().height + "px";

      // to achieve auto-resize, the editor sets the size of the
      // container element
      source.page.addListener("resize",
                              function()
                              {
                                source.editor.frame.style.width =
                                  source.page.getBounds().width + "px";
                                source.editor.frame.style.height =
                                  source.page.getBounds().height + "px";
                              },
                              this);


      // The protector blocks the editor, therefore it needs to be
      // removed. This code fragment is a temporary solution, it
      // will be removed once a better solution is found
      var protector = source.page.getContainerElement().getChildren()[0];
            if (protector)
      {
        var parent = protector.getDomElement().parentNode;
        parent.removeChild(protector.getDomElement());
      }
    },

    /**
     * Progressively load the application This allows a somewhat lengthy
     * initialization sequence to be shown with a progress bar and visible
     * indications of widgets being added to the screen.
     */
    progressiveLoader : function()
    {
      // We'll use the progressive table's progress footer.  For that, we
      // need to define column widths as if we were a table.
      var columnWidths = new qx.ui.progressive.renderer.table.Widths(1);
      columnWidths.setWidth(0, "100%");

      // Instantiate a Progressive
      var footer = new qx.ui.progressive.headfoot.Progress(columnWidths);
      var structure = new qx.ui.progressive.structure.Default(null, footer);
      var progressive = new qx.ui.progressive.Progressive(structure);

      // We want to see each progressive increment as we're loading.  Ensure
      // that the widget queue gets flushed
      progressive.setFlushWidgetQueueAfterBatch(true);

      // Create a helper function for adding functions to the data model. We
      // let it bind 'this' to the Application object.
      var _this = this;
      var addFunc = function(func)
      {
        var ret =
        {
          renderer : "func",
          data     : _this.bindTo(func)
        };
        return ret;
      };

      // Create a helper function to add new buttons to the menu
      var addButton =
        this.bindTo(
          function(dest, caption, icon, onExecute, submenu)
          {
            var button = new qx.ui.menu.Button(caption, icon, null, submenu);
            dest.add(button);

            // If there's a function provided to handle execute events...
            if (onExecute)
            {
              // ... then add a listener for it.
              button.addListener("execute", onExecute, this);
            }
            return button;
          });

      // Instantiate a data model and populate it.
      var dataModel = new qx.ui.progressive.model.Default();

      // Instantiate a Function Caller
      var functionCaller = new qx.ui.progressive.renderer.FunctionCaller();

      // Give Progressive the renderer, and assign a name
      progressive.addRenderer("func", functionCaller);

      var qooxdooUrl = "http://resources.qooxdoo.org/images/logo.gif";
      var qooxdoo = new qx.ui.basic.Image(qooxdooUrl, "100%", "100%");
      progressive.add(qooxdoo);

      // Make the Progressive fairly small
      progressive.set(
        {
          height          : 100,
          width           : 272,
          zIndex          : 99999,
          backgroundColor : "gray",
          opacity         : 0.86,
          batchSize       : 1
        });

      // Add the Progressive to the root, initially off-screen
      this.getRoot().add(progressive,
            {
              top             : -1000,
              left            : -1000
            });

      // Wait for execution to start so we can provide a place to store
      // references to objects we add to the application.
      this.context = {};

      progressive.addListener(
        "renderStart",
        function(e)
        {
          // Our event data is an object containing the 'state' object and
          // the number of elements to be rendered.
          var state = e.getData().state;
          var initialNum = e.getData().initial;

          // Center ourself
          var rootBounds = this.getRoot().getBounds();
          var progressive = e.getData().state.getProgressive();
          var progressiveBounds = progressive.getBounds();

          var left =
            Math.floor((rootBounds.width - progressiveBounds.width) / 2);
          var top =
            Math.floor((rootBounds.height - progressiveBounds.height) / 2);

          progressive.setLayoutProperties(
            {
              left : left < 0 ? 0 : left,
              top  : top < 0 ? 0 : top
            });

          // Save our context in the userData field of the state object.
          state.getUserData().context = this.context;

          // Also save the number of elements for our progress bar usage.
          state.getUserData().initialNum = initialNum;

          // We need a longer timeout to let the progress bar appear
          progressive.setInterElementTimeout(500);
        },
        this);

      progressive.addListener(
        "renderEnd",
        function(e)
        {
          // We don't need the Progressive any longer.  Arrange for it to be
          // destroyed.
          qx.event.Timer.once(
            function()
            {
              this.getLayoutParent().remove(this);
              this.dispose();
            },
            this, 0);
        });

      // Create a menu bar at the top of the page
      dataModel.addElement(addFunc(
        function(userData)
        {
          // Get our context
          var context = userData.context;

          // Create a frame for the menu bar and add it at the top of the page
          var frame = new qx.ui.container.Composite(new qx.ui.layout.Grow());
          this.getRoot().add(frame,
                             {
                               top    : 0,
                               left   : 0,
                               right  : 0
                             });

          // Create a menu bar and add it to the frame
          var menuBar = new qx.ui.menubar.MenuBar();
          frame.add(menuBar);

          // Save the menu bar reference
          context.menuBar = menuBar;
        }));


      // Add the File menu
      dataModel.addElement(addFunc(
        function(userData)
        {
          // Get our context
          var context = userData.context;

          // Create a File menu and its button and add to the menu bar
          var menu = new qx.ui.menu.Menu();
          var button = new qx.ui.menubar.Button("File", null, menu);
          context.menuBar.add(button);

          // Add buttons to the File menu
          addButton(menu,
                    "New",
                    "icon/16/actions/document-new.png",
                    function(e)
                    {
                      alert("Beginning a new project. " +
                            "(This needs user confirmation!)");

                      // If RPC isn't disabled...
                      if (qooxit.Application.bAllowRpc)
                      {
                        // Begin a new project
                        this.rpc.callAsync(function(e)
                                           {
                                             window.location.reload();
                                           },
                                           "newProject");
                      }
                    });
          addButton(menu,
                    "Open",
                    "icon/16/actions/document-open.png",
                    function(e)
                    {
                      alert("Not yet implemented");
                    });
          addButton(menu,
                    "Close",
                    null,
                    function(e)
                    {
                      alert("Not yet implemented");
                    });
          addButton(menu,
                    "Save as...",
                    "icon/16/actions/document-save-as.png",
                    function(e)
                    {
                      alert("Not yet implemented");
                    });
          addButton(menu,
                    "Export Project",
                    null,
                    function(e)
                    {
                      alert("Not yet implemented");
                    });
        }));

      // Add the Development menu
      dataModel.addElement(addFunc(
        function(userData)
        {
          // Get our context
          var context = userData.context;

          // Create a Development menu and its button and add to the menu bar
          var menu = new qx.ui.menu.Menu();
          var button = new qx.ui.menubar.Button("Development", null, menu);
          context.menuBar.add(button);

          //
          // Add buttons to the Development menu
          //

          // Add a button for inserting sample data
          var cbSamples = new qx.ui.menu.CheckBox("Include Sample Data");
          cbSamples.setValue(_this.bSampleData);
          cbSamples.addListener("changeValue",
                                function(e)
                                {
                                  this.bSampleData = e.getData();
                                },
                                _this);
          menu.add(cbSamples);

          // If we're not allowing RPC there'll be no XML nor JSON, so
          // don't even ask whether they want those displayed.
          if (qooxit.Application.bAllowRpc)
          {
            // Add a button for displaying server-generated XML
            var cbShowXml = new qx.ui.menu.CheckBox("DEBUG: Server XML");
            cbShowXml.setValue(_this.bShowXml);
            cbShowXml.addListener("changeValue",
                                  function(e)
                                  {
                                    this.bShowXml = e.getData();
                                  },
                                  _this);
            menu.add(cbShowXml);

            // Add a button for displaying server-generated JSON
            var cbShowJson = new qx.ui.menu.CheckBox("DEBUG: Server JSON");
            cbShowJson.setValue(_this.bShowJson);
            cbShowJson.addListener("changeValue",
                                   function(e)
                                   {
                                     this.bShowJson = e.getData();
                                   },
                                   _this);
            menu.add(cbShowJson);
          }
        }));

      // Create a splitpane as the main workspace
      dataModel.addElement(addFunc(
        function(userData)
        {
          // Get our context
          var context = userData.context;

          // Create the splitpane
          var  horizSplit = new qx.ui.splitpane.Pane("horizontal");
          this.getRoot().add(horizSplit,
                             {
                               top    : 20,
                               bottom : 0,
                               left   : 0,
                               right  : 0
                             });

          // Create a VBox for the left pane
          context.leftPane =
            new qx.ui.container.Composite(new qx.ui.layout.VBox());
          horizSplit.add(context.leftPane, 1);

          // Create a VBox for the right pane
          context.rightPane =
            new qx.ui.container.Composite(new qx.ui.layout.VBox());
          horizSplit.add(context.rightPane, 2);
        }));

      //
      // The right pane shows the Live generated page and source views.
      // Add a tabview to select which.
      //
      dataModel.addElement(addFunc(
        function(userData)
        {
          // Get our context
          var context = userData.context;

          // Create the tab view
          context.tabView = new qx.ui.tabview.TabView();

          // Add it to the right pane.
          context.rightPane.add(context.tabView, { flex : 1 } );

          // Restore the default timeout
          progressive.setInterElementTimeout(0);
        }));

      // Create the Live page
      dataModel.addElement(addFunc(
        function(userData)
        {
          // Get our context
          var context = userData.context;

          // Create the page
          context.pageLive =
            new qx.ui.tabview.Page("Live Application View");

          // Give it a vertical box layout
          context.pageLive.setLayout(new qx.ui.layout.VBox());

          // Add it to the tab view
          context.tabView.add(context.pageLive);
        }));

      // Create the Application page
      dataModel.addElement(addFunc(
        function(userData)
        {
          // Get our context
          var context = userData.context;

          // Create the page
          context.pageApplication =
            new qx.ui.tabview.Page("Application.js");

          // Add it to the tab view
          context.tabView.add(context.pageApplication);

          // Cause the Application page to be rendered so the editor
          // has a div to work with
          context.tabView.setSelection([ context.pageApplication ]);
        }));

      // Create the code editor in the Application page
      dataModel.addElement(addFunc(
        function(userData)
        {
          // Get our context
          var context = userData.context;

          // Create the initialization text
          var initText =
            'qx.Class.define("custom.Application",\n' +
            '{\n' +
            '  extend : qx.application.Standalone,\n' +
            '\n' +
            '  members :\n' +
            '  {\n' +
            '    main : function()\n' +
            '    {\n' +
            '      // Call super class\n' +
            '      this.base(arguments);\n' +
            '\n' +
            '      // Enable logging in debug variant\n' +
            '      if (qx.core.Environment.get("qx.debug"))\n' +
            '      {\n' +
            '        // support native logging capabilities,\n' +
            '        // e.g. Firebug for Firefox\n' +
            '        qx.log.appender.Native;\n' +
            '      }\n' +
            '\n' +
            '      // Get a local reference to the root object\n' +
            '      var _root_ = this.getRoot();\n' +
            '    }\n' +
            '  }\n' +
            '});\n';

          context.applicationSource =
            {
              page   : context.pageApplication,
              editor : null,
              text   : initText,
              appear : function(editor)
              {
                // Find the initial insertion point
                editor.insertPoint =
                  editor.prevLine(
                    editor.prevLine(
                      editor.prevLine(
                        editor.prevLine(
                          editor.lastLine()))));
              }
            };

          this.createSourceEditor(context.applicationSource);
        }));

      // Switch back to the Live view
      dataModel.addElement(addFunc(
        function(userData)
        {
          // Get our context
          var context = userData.context;

          // Make the Live view active again
          context.tabView.setSelection([ context.pageLive ]);

          // We can go back to nomal no-delay rendering now
          progressive.setInterElementTimeout(0);
        }));

      //
      // The left pane shows two trees. The top is the Containers & Widgets;
      // the bottom is the hierarchical representation of the application
      // being built.
      //

      // Add the top tree, to display available containers and widgets
      dataModel.addElement(addFunc(
        function(userData)
        {
          // Get our context
          var context = userData.context;

          // Generate a label for this groupbox
          var label =
            "<u>C</u>ontainers & Widgets " +
            "<span style='color:blue; font-weight:bold;'>" +
            "(drag from this tree)" +
            "</span>";

          // Create a Tabview and add it to the left pane
          var tabView = new qx.ui.tabview.TabView();
          tabView.setContentPadding(0);
          context.leftPane.add(tabView, { flex : 2 });

          // Create a  Page and add it to the tabview
          var pg = new qx.ui.tabview.Page(label);
          pg.setLayout(new qx.ui.layout.VBox());
          pg.getChildControl("button").getChildControl("label").setRich(true);
          tabView.add(pg);

          // Add the available containers and widgets tree
          context.availableTree = new qx.ui.tree.Tree();
          pg.add(context.availableTree, { flex : 1 } );

          // Create a command to focus the containers & widgets tree. Apply
          // the same command to Alt and Meta to support both Macs (Meta) and
          // other systems (Alt).
          var command = new qx.ui.core.Command("Alt-C");
          command.addListener("execute",
                              context.availableTree.focus,
                              context.availableTree);

          // Create a command to add the selected container or widget from
          // the Containers & Widgets tree to the selected Application
          // Hierarchy container.
          var command = new qx.ui.core.Command("Enter");
          command.addListener(
            "execute",
            function(e)
            {
              // Ensure that the Available Containers & Widgets tree is focused
              if (! context.availableTree.hasState("focused"))
              {
                // It isn't. Ignore.
                return;
              }

              // Ensure that there's a selected item in the Available
              // Containers & Widgets tree
              var selection = context.availableTree.getSelection();
              if (selection.length == 0)
              {
                // Nope, no selected item. Let 'em know.
                alert("There is no selected item in the Containers & " +
                      "Widgets tree. Please select an item first.");
                return;
              }

              // Save the selected source item
              var source = selection[0];

              // Ensure that there's a selected item in the Application tree
              var selection = context.applicationTree.getSelection();
              if (selection.length == 0)
              {
                // Nope, no selected item. Let 'em know.
                alert("There is no selected container in the Application " +
                      "Hierarchy tree into which this item should be added. " +
                      "Please select a container item in the Application " +
                      "Hierarchy tree first.");
                return;
              }

              // Save the selected destination item
              var destination = selection[0];

              // Ensure that the selected item is a container
              if (destination.getTree().getRoot() != destination &&
                  ! destination.getUserData("classInstance").getIsContainer())
              {
                // It's not. Let 'em know.
                alert("The selected item in the Application Hierarachy " +
                      "tree is not a container. Please select a container " +
                      "item in the Application Hierarchy tree first.");
              }

              // Simulate a drop event
              var Registration = qx.event.Registration;
              var e =
                Registration.createEvent("drop",
                                         qx.event.type.Drag,
                                         [ false, null ]);

              // The target is the destination item
              e.setTarget(destination);

              // The related target is the source item
              e.setRelatedTarget(source);

              // Call the drop handler
              this.handleDrop(e, source.getUserData("classInstance"));
            },
            this);

          // Create the (hidden) root of the available layouts and widgets tree
          context.availableRoot = new qx.ui.tree.TreeFolder("Root");
          context.availableRoot.setOpen(true);
          context.availableTree.setRoot(context.availableRoot);
          context.availableTree.setHideRoot(true);
        }));

      // Create the application hierarchy tree
      dataModel.addElement(addFunc(
        function(userData)
        {
          // Get our context
          var context = userData.context;

          // Generate a label for this groupbox
          var label =
            "<span style='padding-left: 10px;'>" +
            "<u>A</u>pplication Hierarchy " +
            "<span style='color:blue; font-weight:bold;'>" +
            "(drag to or within this tree)" +
            "</span>" +
            "</span>";

          // Create a Tabview and add it to the left pane
          var tabView = new qx.ui.tabview.TabView();
          tabView.setContentPadding(0);
          context.leftPane.add(tabView, { flex : 1 });

          // Create a  Page and add it to the tabview
          var pg = new qx.ui.tabview.Page(label);
          pg.setLayout(new qx.ui.layout.VBox());
          pg.getChildControl("button").getChildControl("label").setRich(true);
          tabView.add(pg);

          // Add the application hierarchy tree
          context.applicationTree = new qx.ui.tree.Tree();
          pg.add(context.applicationTree, { flex : 1 } );

          // Create a command to focus the application hierarchy tree. Apply
          // the same command to Alt and Meta to support both Macs (Meta) and
          // other systems (Alt).
          var command = new qx.ui.core.Command("Alt-A");
          command.addListener("execute",
                              context.applicationTree.focus,
                              context.applicationTree);

          // Create the root of the application hierarchy tree
          context.applicationRoot =
            new qx.ui.tree.TreeFolder("Application Root");
          context.applicationRoot.setOpen(true);
          context.applicationTree.setRoot(context.applicationRoot);

          // Save the root object in the application root node of the tree
          context.applicationRoot.setUserData("object", context.pageLive);

          // Save the name of the root object
          context.applicationRoot.setUserData("name", "_root_");

          // There are no options other than the mandatory name
          context.applicationRoot.setUserData("options",
                                              { "_name_" : "_root_" } );

          // pageLive (and thus applicationRoot) has a VBox layout
          var classInstance = qooxit.library.ui.layout.VBox.getInstance();
          context.applicationRoot.setUserData("classInstance", classInstance);

          // Add the root object at the server
          this.addObjectRemote("",
                               classInstance.classname,
                               "Application Root",
                               context.applicationRoot.getUserData("options"));

          // Handle a drop
          context.applicationRoot.setDroppable(true);
          context.applicationRoot.addListener("drop", this.handleDrop, this);

          // Add all registered classes to the Containers & Widgets menu
          var list = qooxit.library.Library.getClasses();
          for (var i = 0; i < list.length; i++)
          {
            this.addClass(context.availableRoot, list[i]);
          }
        }));


      // Tell Progressive about its data model
      progressive.setDataModel(dataModel);


      // Begin execution
      progressive.render();
    },

    /**
     * Event handler for a drop on the Application Hierarchy tree
     *
     * @param e {qx.event.type.Drag}
     *   The event containing the information about what was dropped and where
     *   it was dropped.
     *
     * @param classInstance {qooxit.library.ui.Abstract?}
     *   If the drop is the result of dragging an item already in the
     *   Application tree to a new position in the Application tree, this is
     *   the instance of the class that initially instantiated the object to
     *   which this tree item is associated. When the drop is due to a new
     *   widget being added, this parameter will not be provided.
     */
    handleDrop : function(e, classInstance)
    {
      var folder = e.getTarget();
      var related = e.getRelatedTarget();
      var label = related.getLabel();
      var sourceTree = related.getTree();
      var options = {};
      var overrides;
      var override;

      if (! classInstance)
      {
          classInstance = e.getData("qooxit");
      }

      this.debug("related=" + related +
                 ", dropTarget=" + e.getTarget() +
                 ", origTarget=" + folder +
                 ", source label=" + related.getLabel() +
                 ", dest label=" + folder.getLabel());

      // Determine if this is a drag within the application tree
      if (related.getTree() == folder.getTree())
      {
        // It is. Remove it from the tree and re-insert it.
        related.getParent().remove(related);

        // Remove it from the Live application view
        var o = related.getUserData("object");
        o.getLayoutParent().remove(o);

        // Re-add it in the new location
        this.addObject(related.getUserData("classInstance"),
                       related.getUserData("options"),
                       related.getUserData("label"),
                       folder,
                       sourceTree,
                       this.context.applicationSource);


        // TODO: handle the source repositioning

        // That's all, folks!
        return;
      }

      // Get the default options
      if (classInstance.getDefaultOptions)
      {
        options =
          qx.lang.Object.clone(
            classInstance.bindTo(classInstance.getDefaultOptions)());
      }

      // See if there are sample data overrides to apply
      if (qx.core.Init.getApplication().bSampleData &&
          classInstance._snippets &&
          classInstance._snippets.sampleData &&
          classInstance._snippets.sampleData.overrides)
      {
        // Yup. Get them and override the default option values
        overrides = classInstance._snippets.sampleData.overrides;
        for (override in overrides)
        {
          options[override] = overrides[override];
        }
      }

      // If there's an options specification provided...
      if (classInstance.getOptionsSpec)
      {
        // Get it for options retrieval
        var spec = classInstance.bindTo(classInstance.getOptionsSpec)();

        // Determine dropped widget type (used in title of options
        // window)
        var type = related.getLabel();

        // Generate the options window for the user to make selections
        var fOptionsWindow = classInstance.bindTo(classInstance.optionsWindow);
        var optionsWin = fOptionsWindow(type, spec, options);

        // When the options window closes, retrieve the options,
        // add a node  to the Application tree, and use the factory
        // to add the class to the Live Application View
        optionsWin.addListener(
          "close",
          function(e)
          {
            // Allow the wait cursor to take effect. Create a slight
            // pause before adding the object
            var timer = qx.util.TimerManager.getInstance();
            timer.start(
              function(userData, timerId)
              {
                // Retrieve the selected options.
                var options = optionsWin.getUserData("options");

                // Were we given any?
                if (! options)
                {
                  // Nope, they cancelled. Get outta here!
                  return;
                }

                // Add the requested object
                this.addObject(classInstance,
                               options,
                               label,
                               folder,
                               sourceTree,
                               this.context.applicationSource);

                // Revert back to the default cursor. The "wait" cursor
                // was set when the Ok button was pressed
                this.getRoot().setGlobalCursor("default");
              },
              0,
              this,
              null,
              10);
          },
          this);
      }
      else
      {
        // Switch to a "wait" cursor
        this.getRoot().setGlobalCursor("wait");

        // Allow the wait cursor to take effect. Create a slight
        // pause before adding the object
        var timer = qx.util.TimerManager.getInstance();
        timer.start(
          function(userData, timerId)
          {
            // Generate a name for this object
            options["_name_"] =
              "o" + qooxit.library.ui.Abstract.objectNumber++;

            // There's no options spec, so just use the default options
            this.addObject(classInstance,
                           options,
                           label,
                           folder,
                           sourceTree,
                           this.context.applicationSource);

            // Revert back to the default cursor.
            this.getRoot().setGlobalCursor("default");
          },
          0,
          this,
          null,
          10);
      }
    }
  }
});
