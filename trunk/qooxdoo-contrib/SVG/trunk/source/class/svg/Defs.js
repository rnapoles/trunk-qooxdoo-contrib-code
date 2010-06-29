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
 * A container element for referenced elements. For
 * understandability and accessibility reasons, it is recommended that,
 * whenever possible, referenced elements be defined inside of a ‘defs’.
 *
 * More info: http://www.w3.org/TR/SVG11/struct.html#DefsElement
 */
qx.Class.define("svg.Defs",
{
  extend : svg.Element,


  /**
   * Constructs a new 'defs' container.
   */
  construct : function() {
    this.base(arguments, "defs", null, null);
  }
});