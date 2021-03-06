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
    },

    /**
     * Whether this object is a container. Objects can only be dropped into
     * containers.
     */
    isContainer :
    {
      check    : "Boolean",
      init     : false
    }
  },

  statics :
  {
    /** The next object name will be "o" concatenated with this number */
    objectNumber : 1
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
     * @param options {Map?}
     *   If provided, this is the options to be applied, without building
     *   a query window to ask the user for options.
     *
     * @return {qx.ui.core.Widget}
     *   The widget created by this factory
     */
    factory : function(options)
    {
      throw new Error("factory() is abstract");
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
      var value;

      // Create a new modal window
      var win = new qx.ui.window.Window("Properties");
      win.set(
        {
          layout    : new qx.ui.layout.VBox(),
          modal     : true
        });

      // Add the window to the root
      qx.core.Init.getApplication().getRoot().add(win);

      // Create a groupbox to hold a form for user input
      var groupBox = new qx.ui.groupbox.GroupBox(widgetType);
      groupBox.setLayout(new qx.ui.layout.VBox(5));
      win.add(groupBox);

      // Create a form
      var form = new qx.ui.form.Form();

      // Create the default field name
      var defaultName = "o" + qooxit.library.ui.Abstract.objectNumber++;

      var o = new qx.ui.form.TextField(defaultName);
      o.setWidth(128);
      form.add(o, "Name", null, "_name_");

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

          // What specific type is requested?
          var o;
          switch(type)
          {
          case "String":
            // Retrieve the value. Prefer one from options, if available.
            value = options[item] || specItem.value;

            // Create a text field for the string
            o = new qx.ui.form.TextField(value);
            break;

          case "Integer":
            // Retrieve the min, value, and max. Prefer ones from options,
            // if they are  available.
            value = options[item] || specItem.value;

            // Create the spinner for this integer value
            o = new qx.ui.form.Spinner(specItem.min, value, specItem.max);
            break;

          case "Boolean":
            o = new qx.ui.form.CheckBox();
            break;

/* Doesn't work yet; needs a subclass of ComboBox that implements
   qx.data.IListData so that qx.util.Serializer.toNativeObject can
   retrieve the entire list rather than only the selected item.

          case "ComboBox":
            // create a combo box
            var o = new qx.ui.form.ComboBox();

            // fill the combo box with the provided items
            for (var i=0; i < specItem.value.length; i++)
            {
              var listItem = new qx.ui.form.ListItem(specItem.value[i]);
              o.add(listItem);

              // Select the first one
              if (i == 0)
              {
                o.getChildControl("list").setSelection([ listItem ]);
              }
            }

            // Allow adding new items
            o.addListener("changeValue",
                          function(e)
                          {
                            comboBox.add(e.getData());
                          });
            break;
*/

          default:
            throw new Error("Unrecognized type '" + type +
                            "' for " + widgetType);
          }

          // Are there any settings specified?
          if (specItem.settings)
          {
            // Yup.
            o.set(specItem.settings);
          }

          // Add it to the form
          form.add(o, prompt, null, item);
        }
        else if (qx.lang.Type.isFunction(type))
        {
          type(item, options);
        }
      }

      // Create the Ok button
      var ok = new qx.ui.form.Button("Ok");
      ok.setWidth(80);
      ok.addListener(
        "execute",
        function(e)
        {
          if (form.validate())
          {
            // Switch to a "wait" cursor
            qx.core.Init.getApplication().getRoot().setGlobalCursor("wait");

            // Convert the options into a native object
            var newOptions = qx.util.Serializer.toNativeObject(model);

            // Merge unmodified original options into the new ones
            for (var item in spec)
            {
              newOptions[item] = newOptions[item] || options[item];
            }

            // Save the new options
            this.setUserData("options", newOptions);

            // Close the window
            this.close();
          }
        },
        win);
      form.addButton(ok);

      // Create the Cancel button
      var cancel = new qx.ui.form.Button("Cancel");
      cancel.setWidth(80);
      cancel.addListener(
        "execute",
        function(e)
        {
          // Set options to null to indicate they cancelled
          this.setUserData("options", null);
          this.close();
        },
        win);
      form.addButton(cancel);

      // Create the view
      var single = new qx.ui.form.renderer.Single(form);
      groupBox.add(single);

      // Create the databinding controller
      var controller = new qx.data.controller.Form(null, form);
      var model = controller.createModel();

      // Allow pressing Enter at any time to simulate clicking the Ok button.
      var command = new qx.ui.core.Command("Enter");
      command.addListener(
        "execute",
        function()
        {
          // Set the focus on the ok button
          ok.focus();

          // Allow the ok button to focus so that the currently-focused
          // field has time to update its data
          var timer = qx.util.TimerManager.getInstance();
          timer.start(ok.execute, 0, ok, null, 10);
        }, this);

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
