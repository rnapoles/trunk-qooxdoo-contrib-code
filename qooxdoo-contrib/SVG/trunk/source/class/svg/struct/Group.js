/* ************************************************************************

   Copyright:
     2010  Marc Puts

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Marc Puts (marcputs)

************************************************************************ */

/**
 * A container element for grouping together related graphics elements.
 *
 * Grouping constructs provides information about document struct and semantics.
 *
 * A group of elements, as well as individual objects, can be given a name using the id
 * attribute. Named groups are needed for several purposes such as animation and re-usable
 * objects.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG11/struct.html#Groups</li>
 * </ul>
 *
 */
qx.Class.define("svg.struct.Group",
{
  extend : svg.Element,

  /**
   * @param styles {Map?null}
   *   Optional map of CSS styles, where the key is the name
   *   of the style and the value is the value to use.
   *
   * @param attributes {Map?null}
   *   Optional map of element attributes, where the key is
   *   the name of the attribute and the value is the value to use.
   */
  construct : function(styles, attributes) {
    this.base(arguments, "g", styles, attributes);
  }
});