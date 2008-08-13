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
 * A Text shape.
 *
 * The JSON representation has members type="text", x, y, and text.
 */
qx.Class.define("ssvg.shape.Text",
{
  extend : ssvg.shape.Shape,

  /**
   * @param parent {ssvg.IParent}
   *   The parent object.
   *
   * @param x {Integer}
   *   The x coordinate of the top-left corner of the text bounding
   *   rectangle. 
   *
   * @param y {Integer}
   *   The y coordinate of the top-left corner of the text bounding
   *   rectangle. 
   *
   * @param text {String}
   *   The text to be rendered.
   */
  construct : function(parent, x, y, text)
  {
    this.base(parent, "text");
  }
});
