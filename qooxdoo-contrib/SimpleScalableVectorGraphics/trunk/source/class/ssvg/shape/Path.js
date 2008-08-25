/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2008 Derrell Lipman

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Derrell Lipman (derrell)

************************************************************************ */

/**
 * The Path shape which can produce any shape desired.
 *
 * The JSON representation has members type="path" and 'path' (see the
 * constructor parameter description of the same name).
 */
qx.Class.define("ssvg.shape.Path",
{
  extend : ssvg.shape.Shape,

  /**
   * @param parent {ssvg.IParent}
   *   The parent object.
   *
   * @param path {String}
   *   A path is described using the
   *   <a href="http://www.w3.org/TR/SVG/paths.html#PathData">
   *   SVG path language</a>.
   */
  construct : function(parent, path)
  {
    this.base(arguments, parent, "path");

    // Parse the path
  }
});
