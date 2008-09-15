/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2008 Derrell Lipman

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Derrell Lipman

************************************************************************ */

/**
 * A mixin to add a "transform" key to Spinner's "value" property.
 */
qx.Mixin.define("timechooser.spinner.MAddTransform",
{
  construct : function()
  {
    // KLUDGE: Add a 'transform' key
    //
    // Since there's currently no way for subclasses to add to a property of
    // the superclass using legitimate code, kludge it by futzing with
    // internals of the Class and Property systems.  This is *not* a good
    // long-term solution!
    if (! qx.ui.form.Spinner.$$properties["value"].transform)
    {
      qx.ui.form.Spinner.$$properties["value"].transform = "_transformValue";
    }
  },

  members :
  {
    _transformValue : function(value)
    {
      return value;
    }
  }
});
