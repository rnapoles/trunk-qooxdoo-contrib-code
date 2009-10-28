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
  extend : qx.core.Object,

  construct : function()
  {
    this.base(arguments);
  },

  members :
  {
    __snippets : null,
    __snippetNames : null,

    /**
     * Function to instantiate the actual UI element associated with this
     * class. Any default values for the element can/should be set within this
     * function.
     *
     * @param snippets {Array?}
     *   If provided, this is an array of strings, each containing the short
     *   name of a snippet to be included.
     *
     * @return {qx.ui.core.Widget}
     *   The instantiated UI element, ready to be added to a container.
     */
    factory : function(snippets)
    {
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
        if (! this.__snippets)
        {
          throw new Error("Request for snippets, but none defined");
        }

        // ... then for each one...
        for (var snippet in snippets)
        {
          if (! this.__snippets[snippet])
          {
            throw new Error("Request for snippet '" + snippet + "' but " +
                            "that snippet is not found.");
          }

          // ... add its code.
          source.push("(",
                      this.__snippets[snippet].code.toString(),
                      ")(",
                      name,
                      ");");
        }
      }

      // Join it all together and give 'em the result
      return source.join("");
    },

    /**
     * Get the map of snippets which pertain to this UI element.
     *
     * @return {Array}
     *   The names of the available snippets for this UI element
     */
    getSnippetNames : function()
    {
      // if we've already calculated the list of snippet names...
      if (this.__snippetNames)
      {
        // ... then just return it.
        return this.__snippetNames;
      }

      // Otherwise calculate it now
      this.__snippetNames = [];
      for (var snippet in this.__snippets)
      {
        this.__snippetNames.push(snippet);
      }

      // Now we can give 'em what they came for.
      return this.__snippetNames;
    },

    /**
     * Display an options window allowing the user to select or enter any
     * details required for the factory or snippet code.
     */
    getElementOptions : function()
    {
    },

   /**
    * Specify the menu hierarchy for this class
    *
    * @return {Array}
    *   Each component of the array is a hierarchy level in the
    *   Available Widgets menu.
    */
    getMenuHierarchy : function()
    {
      throw new Error("getMenuHierarchy() is abstract");
    }
  }
});
