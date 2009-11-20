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

      // Create a splitpane as the main workspace
      var horizSplit = new qx.ui.splitpane.Pane("horizontal");
      this.getRoot().add(horizSplit, { edge : 0 });

      // Create a VBox for the left pane
      var leftPane = new qx.ui.container.Composite(new qx.ui.layout.VBox());
      horizSplit.add(leftPane, 1);

      // Create a VBox for the right pane
      var rightPane = new qx.ui.container.Composite(new qx.ui.layout.VBox());
      horizSplit.add(rightPane, 2);

      //
      // The right pane shows the generated source code, or the generated page.
      // Add a tabview to select which.
      //
      var tabView = new qx.ui.tabview.TabView();
      rightPane.add(tabView, { flex : 1 } );

      // Create the Live page
      var pageLive = new qx.ui.tabview.Page(this.tr("Live Application View"));
      pageLive.setLayout(new qx.ui.layout.VBox());
      tabView.add(pageLive);

      // Create the WidgetFactory.js page
      var pageWidgetFactory = new qx.ui.tabview.Page("WidgetFactory.js");
      tabView.add(pageWidgetFactory);

      // Create the initialization text
      var initText =
        'qx.Class.define("custom.WidgetFactory",\n' +
        '{\n' +
        '  statics :\n' +
        '  {\n' +
        '  }\n' +
        '});\n';

      var widgetFactorySource =
        {
          page   : pageWidgetFactory,
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

      this.createSourceEditor(widgetFactorySource);

      // Create the Application.js page
      var pageApplication = new qx.ui.tabview.Page("Application.js");
      pageApplication.setLayout(new qx.ui.layout.Canvas()); // simulate root
      tabView.add(pageApplication);

      // Create the initialization text
      initText =
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
        '\n' +
        '        // support additional cross-browser console.\n' +
        '        // Press F7 to toggle visibility\n' +
        '        qx.log.appender.Console;\n' +
        '      }\n' +
        '\n' +
        '    }\n' +
        '  }\n' +
        '});\n';

      var applicationSource =
        {
          page   : pageApplication,
          editor : null,
          text   : initText,
          appear : function(editor)
          {
            // Find the initial insertion point: 3 lines before the end
            editor.insertPoint =
              editor.prevLine(
                editor.prevLine(
                  editor.prevLine(
                    editor.prevLine(
                      editor.lastLine()))));
          }
        };

      this.createSourceEditor(applicationSource);



      //
      // The left pane shows two trees. The top is the available widgets; the
      // bottom is  the hierarchical representation of the application being
      // built.
      //

      // Add a top label
      var label = new qx.ui.basic.Label();
      label.setRich(true);
      label.setValue(this.tr("Available Layouts & Widgets ") +
                     "<span style='color:blue; font-weight:bold;'>" +
                     this.tr("(drag from this tree)") +
                     "</span>");
      leftPane.add(label);

      // Add the available layouts and widgets tree
      var availableTree = new qx.ui.tree.Tree();
      leftPane.add(availableTree, { flex : 2 } );

      // Create the (hidden) root of the available layouts and widgets tree
      var availableRoot = new qx.ui.tree.TreeFolder("Root");
      availableRoot.setOpen(true);
      availableTree.setRoot(availableRoot);
      availableTree.setHideRoot(true);

      // Add a top label
      label = new qx.ui.basic.Label();
      label.setRich(true);
      label.setValue(this.tr("Application Layout & Widget Hierarchy ") +
                     "<span style='color:blue; font-weight:bold;'>" +
                     this.tr("(drag to or within this tree, or right-click)") +
                     "</span>");
      leftPane.add(label);

      // Add the application hierarchy tree
      var applicationTree = new qx.ui.tree.Tree();
      applicationTree.setDroppable(true);

      applicationTree.addListener(
        "drop",
        function(e)
        {
          var classInstance = e.getData("qooxit/available");
          var orig = e.getOriginalTarget();
          var folder = orig.getLayoutParent();
          var related = e.getRelatedTarget();
          var label = related.getLabel();
          var sourceTree = related.getTree();

/*
          this.debug("related=" + related +
                     ", source label=" + related.getLabel() +
                     ", dropTarget=" + e.getTarget() +
                     ", origTarget=" + folder +
                     ", dest label=" + folder.getLabel());
*/
          
          // Get the default options
          var options = {};
          if (classInstance.getDefaultOptions)
          {
            options =
              qx.lang.Function.bind(classInstance.getDefaultOptions,
                                    classInstance)();
          }


          // If there's an options specification provided...
          if (classInstance.getOptionsSpec)
          {
            // Get it for options retrieval
            var spec =
              qx.lang.Function.bind(classInstance.getOptionsSpec,
                                    classInstance)();

            // Determine dropped widget type (used in title of options window)
            var type = related.getLabel();

            // Generate the options window for the user to make selections
            var fOptionsWindow =
              qx.lang.Function.bind(classInstance.optionsWindow,
                                    classInstance);
            var optionsWin = fOptionsWindow(type, spec, options);

            // When the options window closes, retrieve the options, add a node
            // to the Application tree, and use the factory to add the class
            // to the Live Application View
            optionsWin.addListener(
              "close",
              function(e)
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
                               widgetFactorySource,
                               applicationSource);
              },
              this);
          }
          else
          {
            // There's no options spec, so just use the default options
            this.addObject(classInstance,
                           options,
                           label,
                           folder,
                           sourceTree,
                           widgetFactorySource,
                           applicationSource);
          }
        },
        this);

      leftPane.add(applicationTree, { flex : 1 } );

      // Create the root of the application hierarchy tree
      var applicationRoot =
        new qx.ui.tree.TreeFolder(this.tr("Application Root"));
      applicationRoot.setOpen(true);
      applicationTree.setRoot(applicationRoot);

      // Save the root object in the application root node of the tree
      applicationRoot.setUserData("object", pageLive);

      // Add all registered classes to the Available menu
      var list = qooxit.library.Library.getClasses();
      for (var i = 0; i < list.length; i++)
      {
        this.addClass(availableRoot, list[i]);
      }
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

      // Add a node to the Application tree
      var subFolder = new qx.ui.tree.TreeFolder(label)
      subFolder.setOpen(true);
      folder.add(subFolder);

      // Add the new node to its parent's node
      folder.getUserData("object").add(o);

      // Save the object with its node in the Application tree
      subFolder.setUserData("object", o);

      //
      // Generate the WidgetFactory code
      //

      // Create the class name from the class instance. We'll strip off the
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
//      widgetFactorySource.editor.selectLines(startPoint, endPoint);
      widgetFactorySource.editor.selectLines(endPoint, 0);

      // The new insert point is the previous end point, but CodeMirror
      // requires a point on the previous line for the new insert point
      endPoint = widgetFactorySource.editor.nthLine(startLine + lines - 1);
      widgetFactorySource.editor.insertPoint = endPoint;

      //
      // Generate the Application code.
      //

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

      // Assign a call to the factory method to the specified named variable
      text +=
        "var " + options.name + " = " +
        "custom.WidgetFactory." + className + "(\n" +
        "{\n" +
        qx.util.Json.stringify(options, true) +
        "});\n";

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
//      applicationSource.editor.selectLines(startPoint, endPoint);
      applicationSource.editor.selectLines(endPoint, 0);

      // The new insert point is the previous end point, but CodeMirror
      // requires a point on the previous line for the new insert point
      endPoint = applicationSource.editor.nthLine(startLine + lines - 1);
      applicationSource.editor.insertPoint = endPoint;

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
      // this code part uses the CodeMirror library to add a
      // syntax-highlighting editor as an textarea replacement
      source.page.addListenerOnce(
        "appear", function()
        {
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


                var text = "// hello world\n// This is a test";

                (function(text)
                 {
                   // Determine how many lines long the text is including
                   // the extra newline we'll prepend
                   var lines = text.split("\n").length + 1;

                   var startLine = editor.lineNumber(editor.insertPoint);
                   editor.insertIntoLine(editor.insertPoint,
                                         "end",
                                         "\n" + text);
                   var endPoint = editor.nthLine(startLine + lines);

                   editor.selectLines(editor.insertPoint, 0,
                                      endPoint, 0);

                   // Reindent the new text using internal indentRegion()
                   editor.editor.indentRegion(editor.insertPoint, endPoint);

                   // Remove the selection indication
                   editor.selectLines(endPoint, 0);


                 })(text);
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
        this);
    }
  }
});
