/* ************************************************************************

   Copyright:
     2010-2011  Marc Puts

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Marc Puts (marcputs)

************************************************************************ */

/**
 * A container element for grouping together related elements, somewhat
 * similar to {@link Defs}.
 *
 * The differences between groups and defs are:
 * <ul>
 *   <li>The group itself is a rendered element (unlike {@link Defs}).</li>
 *   <li>It can be reused by a {@link Use} element.</li>
 * </ul>
 *
 * Grouping constructs provides information about document structure and semantics.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/struct.html#Groups</li>
 * </ul>
 *
 */
qx.Class.define("svg.struct.Group",
{
  extend : svg.core.Element,

  construct : function() {
    this.base(arguments, "g");
  }
});