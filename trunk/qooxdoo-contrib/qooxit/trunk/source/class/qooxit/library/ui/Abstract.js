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
  type   : "singleton",

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
    __snippets     : {},    // reference type ok here since this is a singleton
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
    }

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
    }
  }
});
