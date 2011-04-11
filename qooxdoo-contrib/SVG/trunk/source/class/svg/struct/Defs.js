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
 * A container element for referenced elements. For
 * understandability and accessibility reasons, it is recommended that,
 * whenever possible, referenced elements be defined inside of a Defs.
 *
 * More info: http://www.w3.org/TR/SVG/struct.html#DefsElement
 */
qx.Class.define("svg.struct.Defs",
{
  extend : svg.core.Element,

  construct : function() {
    this.base(arguments, "defs");
  }
});