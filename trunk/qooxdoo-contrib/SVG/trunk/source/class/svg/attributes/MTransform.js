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
 * Set a list of transform definitions, which are applied in the order provided.
 *
 * The available types of transform definitions include:
 * 
 * <ul>
 *   <li><em>matrix(a, b, c, d, e, f)</em>,
 *     which specifies a transformation in the form of a transformation matrix of
 *     six values. It is equivalent to applying the transformation
 *     matrix [a b c d e f].
 *   </li>
 *
 *   <li><em>translate(tx, [ty])</em>,
 *     which specifies a translation by tx and ty. If ty is not provided,
 *     it is assumed to be zero.
 *   </li>
 *
 *   <li><em>scale(sx, [sy])</em>,
 *     which specifies a scale operation by sx and sy. If sy is not provided,
 *     it is assumed to be equal to sx.
 *   </li>
 *
 *   <li><em>rotate(rotate-angle, cx, cy)</em>,
 *     which specifies a rotation by rotate-angle degrees about a given point.
 *     If optional parameters cx and cy are not supplied, the rotate is about the
 *     origin of the current user coordinate system. If optional parameters
 *     cx, cy are supplied, the rotate is about the point (cx, cy).
 *   </li>
 *
 *   <li><em>skewX(skew-angle)</em>,
 *     which specifies a skew transformation along the x-axis.
 *   </li>
 *
 *   <li><em>skewY(skew-angle)</em>,
 *     which specifies a skew transformation along the y-axis.
 *   </li>
 * </ul>
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG11/coords.html#TransformAttribute</li>
 * </ul>
 */
qx.Mixin.define("svg.attributes.MTransform",
{
  members :
  {
    /**
     * Specifies one or more transforms which are applied in order. Possible transforms are
     *  matrix, translate, scale, rotate, skewX and skewY.
     *
     *  More info: http://www.w3.org/TR/SVG11/coords.html#TransformAttribute
     *
     * @param transformlist {String} value to set
     * @return {void}
     */
    setTransform : function(transformlist) {
      this.setAttribute("transform", transformlist);
    },


    /**
     * Gets the transform property of this element.
     *
     * @return {String} TODOC
     * @see #setTransform
     */
    getTransform : function() {
      return this.getAttribute("transform");
    }
  }
});