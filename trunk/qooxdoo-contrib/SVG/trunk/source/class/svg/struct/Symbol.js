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
 * Defines graphical template objects which can be instantiated by a {@link svg.Use} element.
 *
 * The use of Symbols for graphics that are used multiple times in the same document adds
 * struct and semantics.
 *
 * The key distinctions between a symbol and a {@link svg.Group} are:
 * <ul>
 *   <li>
 *     A symbol itself is not rendered. Only instances of a symbol element are rendered.
 *   </li>
 *   <li>
 *     A symbol can be scaled to fit within a rectangular viewport defined by
 *     the referencing Use element.
 *   </li>
 * </ul>
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/struct.html#SymbolElement</li>
 * </ul>
 */
qx.Class.define("svg.struct.Symbol",
{
  extend : svg.core.Element,
  
  include : [ svg.attributes.MViewBox,
              svg.attributes.MPreserveAspectRatio,
              svg.attributes.MStroke,
              svg.attributes.MTransform ],


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
    this.base(arguments, "symbol", styles, attributes);
  },

  members : {}
});