/* ************************************************************************

   qooxdoo - the new era of web development
   http://qooxdoo.org

   Copyright:
     2008 CELCAT, http://www.celcat.com

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Matthew Gregory

************************************************************************ */

qx.Theme.define("tileview.theme.Appearance",
{
  title : "TileView appearance theme",

  appearances :
  {
    "tileviewitem" : "listitem",
    "tileviewitem/labelcont" : {},
    "tileviewitem/label" :
    {
      style : function(states)
      {
        return { font : "bold" }
      }
    },
    "tileviewitem/description" : {},

    "tileviewitem/status" :
    {
      style : function(states)
      {
        return { textColor : states.selected ? "text-selected" : "text-disabled" }
      }
    }
  }
});