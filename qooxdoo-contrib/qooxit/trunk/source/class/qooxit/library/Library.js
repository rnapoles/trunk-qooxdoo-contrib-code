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
 * The base library of available and registered classes.
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
            [ "Container", "Canvas (qx.ui.layout.Canvas)" ]
        },
        {
          clazz         : qooxit.library.ui.layout.HBox,
          menuHierarchy :
            [ "Container", "Horizontal Box (qx.ui.layout.HBox)" ]
        },
        {
          clazz         : qooxit.library.ui.layout.VBox,
          menuHierarchy :
            [ "Container", "Vertical Box (qx.ui.layout.VBox)" ]
        },
        {
          clazz         : qooxit.library.ui.core.Widget,
          menuHierarchy :
            [ "Widget", "Spacer (qx.ui.core.Widget)" ]
        },
        {
          clazz         : qooxit.library.ui.basic.Label,
          menuHierarchy :
            [ "Widget", "Label (qx.ui.basic.Label)" ]
        },
        {
          clazz         : qooxit.library.ui.basic.Atom,
          menuHierarchy :
            [ "Widget", "Atom (qx.ui.basic.Atom)" ]
        },
        {
          clazz         : qooxit.library.ui.form.Button,
          menuHierarchy :
            [ "Widget", "Button (qx.ui.form.Button)" ]
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
        },
        {
          clazz         : qooxit.library.ui.control.ColorSelector,
          menuHierarchy :
            [ "Widget", "Color Selector (qx.ui.control.ColorSelector)" ]
        },
        {
          clazz         : qooxit.library.ui.control.DateChooser,
          menuHierarchy :
            [ "Widget", "Date Chooser (qx.ui.control.DateChooser)" ]
        },
        {
          clazz         : qooxit.library.ui.form.DateField,
          menuHierarchy :
            [ "Widget", "Date Field (qx.ui.control.DateField)" ]
        }
      ],

    __registeredClasses :
      [
      ],

    __registeredClassesByName :
    {
    },

    /**
     * Return the list of registered classes.
     *
     * @return {Array}
     *   The list of registered classes
     */
    getClasses : function()
    {
      return qooxit.library.Library.__registeredClasses;
    },

    /**
     * Return a class instance given its class name
     *
     * @param name
     *   The fully-qualified name of a class
     *
     * @return {qooxit.library.ui.Abstract}
     *   The class identified by the specified name
     */
    getInstanceByName : function(name)
    {
      var clazz = qooxit.library.Library.__registeredClassesByName[name];
      return clazz.getInstance();
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

      // Allow fast access to this class by its class name
      Library.__registeredClassesByName[instance.classname] = avail[i].clazz;
    }
  }
});
