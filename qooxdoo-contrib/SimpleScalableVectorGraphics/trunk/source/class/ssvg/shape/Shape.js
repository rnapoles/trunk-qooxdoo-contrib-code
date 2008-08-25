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
 * The Shape abstract class
 */
qx.Class.define("ssvg.shape.Shape",
{
  extend : qx.core.Object,

  construct : function(parent, type)
  {
    this.base(arguments);
    this.setType(type);
    parent.add(this);
  },

  properties :
  {
    type :
    {
      init : null
    },

    parent :
    {
      init : null
    }
  },

  statics :
  {
    fromJson : function(parent, jsonDescription)
    {
      
    }
  }
});
