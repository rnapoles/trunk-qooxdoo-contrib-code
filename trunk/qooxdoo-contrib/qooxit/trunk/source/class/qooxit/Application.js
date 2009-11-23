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
  extend : qx.application.Standalone,

  members :
  {
    /** Whether we are displaying widgets with sample data */
    bSampleData : true,

    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // We want to use some of the high-level node operation convenience
      // methods rather than manually digging into the TreeVirtual helper
      // classes.  Include the mixin that provides them.
      qx.Class.include(qx.ui.treevirtual.TreeVirtual,
                       qx.ui.treevirtual.MNode);

      // Enable logging in debug variant
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;

        // support additional cross-browser console. Press F7 to toggle
        // visibility
        qx.log.appender.Console;
      }

      // Start the progressive loader
      this.progressiveLoader();
    },

    addObject : function(classInstance,
                         options,
                         label,
                         folder,
                         sourceTree,
                         widgetFactorySource,
                         applicationSource)
    {
      // Add the node to the specified parent by calling its factory
      var fFactory =
        qx.lang.Function.bind(classInstance.factory, classInstance);
      var o = fFactory(options);

      // If sample data is being requested...
      if (qx.core.Init.getApplication().bSampleData &&
          classInstance._snippets &&
          classInstance._snippets.sampleData &&
          classInstance._snippets.sampleData.code)
      {
        var fSampleData =
          qx.lang.Function.bind(classInstance._snippets.sampleData.code,
                                classInstance);
        fSampleData(o);
      }

      // Add a node to the Application tree
      var subFolder = new qx.ui.tree.TreeFolder(label)
      subFolder.setOpen(true);
      folder.add(subFolder);

      // Add the new node to its parent's node
      folder.getUserData("object").add(o);

      // Save the object with its node in the Application tree
      subFolder.setUserData("object", o);

      //
      // See if we need to generate the WidgetFactory code entry
      //
      // NOTE: Using a property of the factory method is (a) somewhat of a
      // kludge, and (b) will have to be changed anyway when we need
      // persistence of this knowledge.
      //
      if (! classInstance.factory.className)
      {
        //
        // Generate the WidgetFactory code
        //

        // Create the class name from the class instance. We'll strip off
        // everything that's not generic (the first few components) and then
        // create camelcase with a leading lower-case letter.
        var classNameParts = classInstance.classname.split(".");
        classNameParts.shift();   // remove qooxit
        classNameParts.shift();   // remove library
        classNameParts[0] = qx.lang.String.firstLow(classNameParts[0]);
        for (var i = 1; i < classNameParts.length; i++)
        {
          classNameParts[i] = qx.lang.String.firstUp(classNameParts[i]);
        }
        var className = classNameParts.join("");

        // Determine the starting line number in the widget factory
        var startLine = widgetFactorySource.editor.lineNumber(
          widgetFactorySource.editor.insertPoint);

        // If there has been anything added previously then add a comma
        var comma = (startLine > 4 ? ",\n\n\n" : "\n");

        // Write the Application code
        var text =
          comma +
          className + " : " +
          classInstance.factory.toString();

        // Determine how many lines long the text is including
        // the extra newlines we'll prepend
        var lines = text.split("\n").length;

        // Insert the new text
        widgetFactorySource.editor.insertIntoLine(
          widgetFactorySource.editor.insertPoint,
          "end",
          text);

        // Reindent the new text using internal indentRegion()
        var startPoint = widgetFactorySource.editor.insertPoint;
        var endPoint = widgetFactorySource.editor.nthLine(startLine + lines);
        widgetFactorySource.editor.editor.indentRegion(
          widgetFactorySource.editor.nthLine(3), endPoint);

        // Remove the selection indication
        widgetFactorySource.editor.selectLines(endPoint, 0);

        // The new insert point is the previous end point, but CodeMirror
        // requires a point on the previous line for the new insert point
        endPoint = widgetFactorySource.editor.nthLine(startLine + lines - 1);
        widgetFactorySource.editor.insertPoint = endPoint;

        // Mark this factory as having been written to the WidgetFactory
        classInstance.factory.className = className;
      }

      //
      // Generate the Application code.
      //

      // Initially there's no text
      text = "";

      // Clear the selection from the source tree
      sourceTree.resetSelection();

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
      var name = options.__name__;

      // Save this name in the new object
      subFolder.setUserData("name", name);

      // Temporarily delete the variable name from the options
      delete options.__name__;

      // Assign a call to the factory method to the specified named variable
      text +=
        "\n\n" +
        "var " + name + " = " +
        "custom.WidgetFactory." + classInstance.factory.className + "(\n" +
        qx.util.Json.stringify(options, true) +
        ");\n";

      // Reset the tree node to include the variable name
      subFolder.setLabel(name + ": " + subFolder.getLabel())

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
      options.__name__ = name;
    },

    /**
     * Add a class to the Available menu.
     *
     * @param root {qx.ui.tree.AbstractTreeItem}
     *   The root of the AVailable menu tree
     *
     * @param clazz {qooxit.library.ui.Abstract}
     *   The class being added to the menu.
     *
     * @return {Void}
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

      // This item has to be draggable to be dropped into the applciation view
      treeItem.setDraggable(true);

      // Allow the item to be copied
      treeItem.addListener("dragstart",
                           function(e)
                           {
                             e.addAction("copy");
                             e.addType("qooxit/available");
                           });

      // If it is dropped, provide the factory for adding it to the application
      // tree.
      treeItem.addListener(
        "droprequest",
        function(e)
        {
          e.addData("qooxit/available",
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
      // Get the non-recursive list of items in the tree at this level
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
          data     : qx.lang.Function.bind(func, _this)
        };
        return ret;
      };

      // Create a helper function to add new buttons to the menu
      var addButton = function(dest, caption, icon, submenu)
      {
        var button = new qx.ui.menu.Button(caption, icon, null, submenu);
        dest.add(button);
        return button;
      }

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
          addButton(menu, "New", "icon/16/actions/document-new.png");
          addButton(menu, "Open", "icon/16/actions/document-open.png");
          addButton(menu, "Close");
          addButton(menu, "Save", "icon/16/actions/document-save.png");
          addButton(menu, "Save as...","icon/16/actions/document-save-as.png");
          addButton(menu, "Export Project");
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

          // Add buttons to the Development menu
          var cbSamples = new qx.ui.menu.CheckBox("Sample Data");
          cbSamples.setValue(_this.bSampleData);
          cbSamples.addListener("changeValue",
                                function(e)
                                {
                                  this.bSampleData = e.getData();
                                },
                                _this);
          menu.add(cbSamples);
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
            new qx.ui.tabview.Page(this.tr("Live Application View"));

          // Give it a vertical box layout
          context.pageLive.setLayout(new qx.ui.layout.VBox());

          // Add it to the tab view
          context.tabView.add(context.pageLive);
        }));

      // Create the WidgetFactory page
      dataModel.addElement(addFunc(
        function(userData)
        {
          // Get our context
          var context = userData.context;

          // Create the page
          context.pageWidgetFactory =
            new qx.ui.tabview.Page("WidgetFactory.js");

          // Add it to the tab view
          context.tabView.add(context.pageWidgetFactory);

          // Cause the WidgetFactory page to be rendered so the editor
          // has a div to work with
          context.tabView.setSelection([ context.pageWidgetFactory ]);

          // We need a longer timeout before creating the code editor
          progressive.setInterElementTimeout(1000);
        }));

      // Create the code editor in the WidgetFactory page
      dataModel.addElement(addFunc(
        function(userData)
        {
          // Get our context
          var context = userData.context;

          // Create the initialization text
          var initText =
            'qx.Class.define("custom.WidgetFactory",\n' +
            '{\n' +
            '  statics :\n' +
            '  {\n' +
            '  }\n' +
            '});\n';

          context.widgetFactorySource =
            {
              page   : context.pageWidgetFactory,
              editor : null,
              text   : initText,
              appear : function(editor)
              {
                // Find the initial insertion point: 3 lines before the end
                editor.insertPoint =
                  editor.prevLine(
                    editor.prevLine(
                      editor.prevLine(
                        editor.lastLine())));
              }
            };

          // Create the source editor
          this.createSourceEditor(context.widgetFactorySource);
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
            '      if (qx.core.Variant.isSet("qx.debug", "on"))\n' +
            '      {\n' +
            '        // support native logging capabilities,\n' +
            '        // e.g. Firebug for Firefox\n' +
            '        qx.log.appender.Native;\n' +
            '      }\n' +
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
      // The left pane shows two trees. The top is the available widgets; the
      // bottom is  the hierarchical representation of the application being
      // built.
      //

      // Add the top tree, to display available layouts and widgets
      dataModel.addElement(addFunc(
        function(userData)
        {
          // Get our context
          var context = userData.context;

          // Add a top label
          var label = new qx.ui.basic.Label();
          label.setRich(true);
          label.setValue(this.tr("Available Layouts & Widgets ") +
                         "<span style='color:blue; font-weight:bold;'>" +
                         this.tr("(drag from this tree)") +
                         "</span>");
          context.leftPane.add(label);

          // Add the available layouts and widgets tree
          var availableTree = new qx.ui.tree.Tree();
          context.leftPane.add(availableTree, { flex : 2 } );

          // Create the (hidden) root of the available layouts and widgets tree
          context.availableRoot = new qx.ui.tree.TreeFolder("Root");
          context.availableRoot.setOpen(true);
          availableTree.setRoot(context.availableRoot);
          availableTree.setHideRoot(true);

          // Add a top label
          label = new qx.ui.basic.Label();
          label.setRich(true);
          label.setValue(
            this.tr("Application Layout & Widget Hierarchy ") +
              "<span style='color:blue; font-weight:bold;'>" +
//              this.tr("(drag to or within this tree, or right-click)") +
              this.tr("(drag to or within this tree)") +
              "</span>");
          context.leftPane.add(label);

          // Add the application hierarchy tree
          context.applicationTree = new qx.ui.tree.Tree();
          context.applicationTree.setDroppable(true);

          context.applicationTree.addListener(
            "drop",
            function(e)
            {
              var classInstance = e.getData("qooxit/available");
              var orig = e.getOriginalTarget();
              var folder = orig.getLayoutParent();
              var related = e.getRelatedTarget();
              var label = related.getLabel();
              var sourceTree = related.getTree();
              var options = {};
              var overrides;
              var override;

/*
              this.debug("related=" + related +
                         ", source label=" + related.getLabel() +
                         ", dropTarget=" + e.getTarget() +
                         ", origTarget=" + folder +
                         ", dest label=" + folder.getLabel());
*/

              // Get the default options
              if (classInstance.getDefaultOptions)
              {
                options =
                  qx.lang.Object.clone(
                    qx.lang.Function.bind(classInstance.getDefaultOptions,
                                          classInstance)());
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
                var spec =
                  qx.lang.Function.bind(classInstance.getOptionsSpec,
                                        classInstance)();

                // Determine dropped widget type (used in title of options
                // window)
                var type = related.getLabel();

                // Generate the options window for the user to make selections
                var fOptionsWindow =
                  qx.lang.Function.bind(classInstance.optionsWindow,
                                        classInstance);
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
                                       context.widgetFactorySource,
                                       context.applicationSource);

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
                    options.__name__ =
                      "o" + qooxit.library.ui.Abstract.objectNumber++;

                    // There's no options spec, so just use the default options
                    this.addObject(classInstance,
                                   options,
                                   label,
                                   folder,
                                   sourceTree,
                                   context.widgetFactorySource,
                                   context.applicationSource);

                    // Revert back to the default cursor.
                    this.getRoot().setGlobalCursor("default");
                  },
                  0,
                  this,
                  null,
                  10);
              }
            },
            this);

          context.leftPane.add(context.applicationTree, { flex : 1 } );
        }));

      // Create the application hierarchy tree
      dataModel.addElement(addFunc(
        function(userData)
        {
          // Get our context
          var context = userData.context;

          // Create the root of the application hierarchy tree
          var applicationRoot =
            new qx.ui.tree.TreeFolder(this.tr("Application Root"));
          applicationRoot.setOpen(true);
          context.applicationTree.setRoot(applicationRoot);

          // Save the root object in the application root node of the tree
          applicationRoot.setUserData("object", context.pageLive);

          // Save the name of the root object
          applicationRoot.setUserData("name", "_root_");

          // Add all registered classes to the Available menu
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
    }
  }
});
