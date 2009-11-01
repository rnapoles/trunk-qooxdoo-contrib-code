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
************************************************************************ */

/**
 * Abstract class for defining a UI element that may be added to an
 * application.
 */
qx.Class.define("qooxit.library.ui.Abstract",
{
  extend : qx.ui.core.Widget,

  properties :
  {
   /**
    * The menu hierarchy for this class.  The value will be an array, where
    * each component of the array is a hierarchy level in the Available
    * Widgets menu.
    */
    menuHierarchy :
    {
      init     : null
    }
  },

  members :
  {
    _snippets      : {},    // reference type ok here since this is a singleton
    __snippetBrief : null,

    /**
     * Function to instantiate the actual UI element associated with this
     * class. Any default values for the element can/should be set within this
     * function.
     *
     * @param parent {qx.ui.core.Widget}
     *   The parent container to which this new widget is to be added. It is
     *   the responsibility of this method to add the new widget to the
     *   parent.
     *
     * @param options {Map?}
     *   If provided, this is the options to be applied, without building
     *   a query window to ask the user for options.
     *
     * @return {Void}
     */
    factory : function(parent, options)
    {
      throw new Error("factory() is abstract");
    },

    /**
     * Generate the source code associated with the instantiation of this
     * UI element. This is used to create the code that's added to the Source
     * View.
     *
     * Currently, we simply call the string version of the factory
     * function. Later, it'd be nice to unwrap the function call to make
     * the generated source code somewhat more readable.
     *
     * @param instance_name {String}
     *   The name that should be used to reference this UI element instance.
     *
     * @param snippets {Array?}
     *   If provided, this is an array of strings, each containing the short
     *   name of a snippet to be included, one after the other, after the code
     *   to instantiate the widget.
     *
     * @return {String}
     *   The string representation of the UI element instantiation, ready to
     *   be inserted into the Source View window.
     *
     */
    toSource : function(name, snippets)
    {
      var source = [];

      source.push("var name = (",
                  this.factory.toString(),
                  ")(",
                  name,
                  ");");

      // If snippets were requested...
      if (snippets)
      {
        // First, ensure that there are some snippets
        if (! this._snippets)
        {
          throw new Error("Request for snippets, but none defined");
        }

        // ... then for each one...
        for (var snippet in snippets)
        {
          if (! this._snippets[snippet])
          {
            throw new Error("Request for snippet '" + snippet + "' but " +
                            "that snippet is not found.");
          }

          // ... add its code.
          source.push("(",
                      this._snippets[snippet].code.toString(),
                      ")(",
                      name,
                      ");");
        }
      }

      // Join it all together and give 'em the result
      return source.join("");
    },

    /**
     * Add a new snippet for this class.
     *
     * @param name {String}
     *   The snippet name, which must be unique. It is used as the name within
     *   the private snippets map.
     *
     * @param snippet {Map}
     *   A map containing the following properties:
     *   <dl>
     *     <dt>brief {String}</dt>
     *     <dd>
     *       A brief summary of the snippet, displayed in the list from which
     *       snippets are selected.
     *     </dd>
     *     <dt>description {String}</dt>
     *     <dd>
     *       A full description of the snippet, for display upon request by
     *       the user.
     *     </dd>
     *     <dt>code {Function}</dt>
     *     <dd>
     *       The function which will be called to apply the snippet. The
     *       function is passed a single parameter, the object on which the
     *       snippet is to be applied.
     *     </dd>
     *   </dl>
     *
     * @param bForce {Boolean}
     *   Whether this snippet should be allowed to overwrite an existing
     *   snippet of the same name.
     *
     * @return {Boolean}
     *   <i>true</i> if the snippet was applied;
     *   <i>false</i> if it would have overwritten an existing snippet but
     *   bForce was false..
     */
    addSnippet : function(name, snippet, bForce)
    {
      // Don't let them overwrite an existing snippet without really meaning to
      if (! bForce && this.snippets[name])
      {
        // Tell 'em that it failed
        return false;
      }

      // Add the provided snippet
      this.snippets[name] = snippet;

      // Tell 'em it succeeded
      return true;
    },

    /**
     * Get the map of snippets which pertain to this UI element.
     *
     * @return {Map}
     *   The names and brief descriptions of the available snippets for
     *   this UI element
     */
    getSnippetBrief : function()
    {
      // if we've already calculated the list of snippets...
      if (this.__snippetBrief)
      {
        // ... then just return it.
        return this.__snippetBrief;
      }

      // Otherwise calculate it now
      this.__snippetBrief = {};
      for (var snippet in this._snippets)
      {
        this.__snippetBrief[snippet] = this._snippets[snippet].brief;
      }

      // Now we can give 'em what they came for.
      return this.__snippetBrief;
    },

    /**
     * Get a snippet's full description
     *
     * @param name {String}
     *   The name of the snippet for which the description is desired
     *
     * @return {String}
     *   The description of the specified snippet
     */
    getSnippetDescription : function(name)
    {
      // Return the requested name
      return this._snippets[name].description;
    },

    /**
     * Get a snippet's code
     *
     * @param name {String}
     *   The name of the snippet for which the code is desired
     *
     * @return {Function}
     *   The function implementing the code of the specified snippet
     */
    getSnippetCode : function(name)
    {
      // Return the requested code
      return this._snippets[name].code;
    },

    /**
     * Display an options window allowing the user to select or enter any
     * details required for the factory or snippet code.
     *
     * @param widgetType {String}
     *   The type of the type of widget being configured.
     *
     * @param spec {Map}
     *   A specification of the options fields to create. The name of each
     *   member of the map is the name of an option in the "options" map. The
     *   value of each member here is either a string indicating a type (one
     *   of "String", "Integer", or "Boolean") or a function which handles the
     *   form element on its own.
     *
     * @param options {Map}
     *   The initial values of each of the options, and also where the options
     *   provided by the user will be stored when the user pressed the Ok
     *   button.
     *
     * @return {qx.ui.window.Window}
     *   The modal window in which options processing occurs, herein referred
     *   to as 'win'. The caller may wait on win's "close" or "beforeClose"
     *   event, at which time it may call win.getUserData("options") to
     *   retrieve a (possibly) modified options map.
     */
    optionsWindow : function(widgetType, spec, options)
    {
      // Create a new modal window
      var win = new qx.ui.window.Window("Properties");
      win.set(
        {
          layout    : new qx.ui.layout.VBox(10),
          modal     : true
        });

      // Add the window to the root
      qx.core.Init.getApplication().getRoot().add(win);


      // Create a groupbox to hold a grid (user input) and hbox (ok/cancel)
      var groupBox = new qx.ui.groupbox.GroupBox(widgetType);
      groupBox.setLayout(new qx.ui.layout.VBox(5));
      win.add(groupBox);

      // Create an HBox in which to place the grid of input queries
      var hBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(16));
      groupBox.add(hBox);

      // Add a left-side spacer
      hBox.add(new qx.ui.core.Widget(), { flex : 1 });

      // Create a grid layout for each of the options
      var gridLayout = new qx.ui.layout.Grid();
      gridLayout.setSpacing(5);
      gridLayout.setColumnAlign(0, "right", "middle");
      var grid = new qx.ui.container.Composite(gridLayout);
      hBox.add(grid);

      // Add a right-side spacer
      hBox.add(new qx.ui.core.Widget(), { flex : 1 });

      // Initialize the row counter for adding to the grid
      var row = 0;

      // Create a map of objects we create, which we'll use for data binding
      var objects = {};

      // Create a map of names used for creating a databinding model
      var modelSkeleton = {};
      
      // For each item in the specification...
      for (var item in spec)
      {
        // Look at its type. 
        var specItem = spec[item];
        var type = specItem.type;

        // Is it a string indicating a standard request?
        if (qx.lang.Type.isString(type))
        {
          // Yup. There must be a prompt method.
          var prompt = specItem.prompt;
          if (! prompt)
          {
            throw new Error("No prompt is specified for " + widgetType);
          }

          // Add this item's prompt to column 0
          var label = new qx.ui.basic.Label(prompt + ":");
          grid.add(label, { row : row, column : 0 });


          // What specific type is requested?
          var o;
          switch(type)
          {
          case "String":
            o = new qx.ui.form.TextField();
            modelSkeleton[item] = null;
            break;

          case "Integer":
            o = new qx.ui.form.Spinner(specItem.min,
                                       specItem.value,
                                       specItem.max);
            modelSkeleton[item] = specItem.value;
            break;

          case "Boolean":
            o = new qx.ui.form.CheckBox();
            modelSkeleton[item] = 0;
            break;

          default:
            throw new Error("Unrecognized type '" + type +
                            "' for " + widgetType);
          }

          // Add the object to the grid
          grid.add(o, { row : row, column : 1 });

          // Track the object for data binding
          objects[item] = o;

          // Increment to next row
          ++row;
        }
        else if (qx.lang.Type.isFunction(type))
        {
          type(item, options);
        }
      }

      // Create a databinding model
      var model = qx.data.marshal.Json.createModel(modelSkeleton);

      // Create the databinding controller
      var controller = new qx.data.controller.Object(model);



      // Create an HBox in which to place the ok and cancel buttons
      hBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(16));
      hBox.setHeight(24);
      groupBox.add(hBox);

      // Add a left-side spacer
      hBox.add(new qx.ui.core.Widget(), { flex : 1 });

      // Create the Ok button
      var ok = new qx.ui.form.Button("Ok");
      ok.setWidth(80);
      ok.addListener("execute",
                     function(e)
                     {
                       // Save the options
                       this.setUserData("options", options);
                       this.close();
                     },
                     win);
      // Add the ok button to the window
      hBox.add(ok);

      // Create the Cancel button
      var cancel = new qx.ui.form.Button("Cancel");
      cancel.setWidth(80);
      cancel.addListener("execute",
                         function(e)
                         {
                           // Set options to null to indicate they cancelled
                           this.setUserData("options", null);
                           this.close();
                         },
                         win);

      // Add the cancel button to the window
      hBox.add(cancel);

      // Add a right-side spacer
      hBox.add(new qx.ui.core.Widget(), { flex : 1 });

      // Center the window
      win.center();

      // Open the window.
      win.open();

      // Return the window so the caller can listen on its "close" or
      // "beforeClose" event
      return win;
    }
  }
});
