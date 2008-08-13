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
 * The Group pseudo-shape.
 *
 * A group contains other shapes, and can provide a grouping for
 * transformations; i.e. all shapes in the group (including recursively into
 * groups embedded in the group) are transformed as specified for the group.
 * If there are sub-groups, they may have their own transformations, which are
 * applied subsequent to higher level transformations.
 *
 * The JSON representation has members type="path" and 'path' (see the
 * constructor parameter description of the same name).
 */
qx.Class.define("ssvg.shape.Group",
{
  extend : ssvg.shape.Shape,

  implement : [ "ssvg.IParent" ],


  /**
   * @param parent {ssvg.IParent}
   *   The parent object.
   */
  construct : function(parent)
  {
    this.base(parent, "group");
  }
});
