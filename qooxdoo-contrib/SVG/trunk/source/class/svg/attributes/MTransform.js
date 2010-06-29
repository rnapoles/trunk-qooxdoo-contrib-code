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
 * The value of the ‘transform’ attribute is a <transform-list>, which is defined
 * as a list of transform definitions, which are applied in the order provided.
 * The individual transform definitions are separated by whitespace and/or a comma.
 *
 * The available types of transform definitions include:
 *
 * <ul>
 *   <li><b>matrix(&lt;a&gt; &lt;b&gt; &lt;c&gt; &lt;d&gt; &lt;e&gt; &lt;f&gt;)</b>,
 *     which specifies a transformation in the form of a transformation matrix of
 *     six values. matrix(a,b,c,d,e,f) is equivalent to applying the transformation
 *     matrix [a b c d e f].
 *   </li>
 *
 *   <li><b>translate(&lt;tx&gt;, [&lt;ty&gt;])</b>,
 *     which specifies a translation by tx and ty. If &lt;ty&gt; is not provided,
 *     it is assumed to be zero.
 *   </li>
 *
 *   <li><b>scale(&lt;sx&gt; [&lt;sy&gt;])</b>,
 *     which specifies a scale operation by sx and sy. If &lt;sy&gt; is not provided,
 *     it is assumed to be equal to &lt;sx&gt;.
 *   </li>
 *
 *   <li><b>rotate(&lt;rotate-angle&gt; [&lt;cx&gt; &lt;cy&gt;])</b>,
 *     which specifies a rotation by &lt;rotate-angle&gt; degrees about a given point.
 *     If optional parameters &lt;cx&gt; and &lt;cy&gt; are not supplied, the rotate is about the
 *     origin of the current user coordinate system. If optional parameters &lt;cx&gt; and &lt;cy&gt;
 *     are supplied, the rotate is about the point (cx, cy).
 *   </li>
 *
 *   <li><b>skewX(&lt;skew-angle&gt;)</b>,
 *     which specifies a skew transformation along the x-axis.
 *   </li>
 *
 *   <li><b>skewY(&lt;skew-angle&gt;)</b>,
 *     which specifies a skew transformation along the y-axis.
 *   </li>
 * </ul>
 *
 * More info: http://www.w3.org/TR/SVG11/coords.html#TransformAttribute
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