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
 * Implementation of a Canvas layout (in a Composite container)
 */
qx.Class.define("qooxit.library.Library",
{
  extend : qx.core.Object,

  statics :
  {
    __availableClasses :
      [
        {
          clazz         : qooxit.library.ui.layout.Canvas,
          menuHierarchy :
            [ "Layouts", "Canvas (qx.ui.layout.Canvas)" ]
        },
        {
          clazz         : qooxit.library.ui.layout.HBox,
          menuHierarchy :
            [ "Layouts", "Horizontal Box (qx.ui.layout.HBox)" ]
        },
        {
          clazz         : qooxit.library.ui.layout.VBox,
          menuHierarchy :
            [ "Layouts", "Vertical Box (qx.ui.layout.VBox)" ]
        },
        {
          clazz         : qooxit.library.ui.basic.Label,
          menuHierarchy :
            [ "Widget", "Label (qx.ui.basic.Label)" ]
        },
        {
          clazz         : qooxit.library.ui.tree.Tree,
          menuHierarchy :
            [ "Widget", "Tree", "Traditional (qx.ui.tree.Tree)" ]
        },
        {
          clazz         : qooxit.library.ui.treevirtual.TreeVirtual,
          menuHierarchy :
            [ "Widget", "Tree", "Virtual (qx.ui.treevirtual.TreeVirtual)" ]
        },
        {
          clazz         : qooxit.library.ui.table.Table,
          menuHierarchy :
            [ "Widget", "Table (qx.ui.table.Table)" ]
        }
      ],

    __registeredClasses :
      [
      ],


    /**
     * Return the list of registered classes.
     *
     * @return {Array}
     *   The list of registered classes
     */
    getClasses : function()
    {
      return qooxit.library.Library.__registeredClasses;
    }
  },

  defer : function()
  {
    var Library = qooxit.library.Library;
    var avail = Library.__availableClasses;
    var registered = Library.__registeredClasses;

    // For each available class...
    for (var i = 0; i < avail.length; i++)
    {
      // ... register it, ...
      registered.push(avail[i].clazz);

      // ... and give it its initial menu hierarchy
      var instance = avail[i].clazz.getInstance();
      instance.setMenuHierarchy(avail[i].menuHierarchy);
    }
  }
});
