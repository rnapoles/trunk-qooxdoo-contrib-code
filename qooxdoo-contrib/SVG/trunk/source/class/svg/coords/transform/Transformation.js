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
 * Abstract transformation. Transformations can be supplied to an element's
 * {@link svg.coords.MTransform#transform} property to apply them to that
 * element.
 */
qx.Class.define("svg.coords.transform.Transformation",
{
  extend : qx.core.Object,
  
  type : "abstract",
    
  events :
  {
    /**
     * Fired when the transformation was changed.
     */
    change : "qx.event.type.Event"
  },
  
  /**
   * @param svg {svg.struct.Svg?}
   *   Any instance of SVGElement. Mandatory when using matrix notation.
   *   May be set to _null_ if matrix notation is not used. 
   * 
   */
  construct : function(svg)
  {
    this.__svg = svg || null;
  },
  
  members :
  {
    /**
     * Cached string value.
     * @type {String} 
     */
    _asString : null,
    
    /**
     * Cached matrix value.
     * @type {SVGMatrix}
     */
    _asMatrix : null,
    
    /**
     * Cached matrix string value.
     * @type {String}
     */
    _asMatrixString : null,
    
    /**
     * Whether the cached string value is still up-to-date.
     * @type Boolean
     */
    _cachedString : false,
    
    /**
     * Whether the cached matrix value is still up-to-date.
     * @type Boolean
     */
    _cachedMatrix : false,
    
    /**
     * Whether the cached matrix string value is still up-to-date.
     * @type Boolean
     */
    _cachedMatrixString : false,
    
    /**
     * SVG element.
     * @type {svg.struct.Svg} 
     */
    __svg : null,
    
    /**
     * SVG Element. This will only be used by the transformation when working with
     * matrixes. In such cases, the transformation needs the createMatrix() method
     * of the svg element.
     * 
     * @param svg {svg.struct.Svg | null}
     *   Svg element
     */
    setSvg : function(svg) {
      this.__svg = svg;
    },
    
    /**
     * Gets the SVG element that was set before. 
     * 
     * @return {svg.struct.Svg | null}
     */
    getSvg : function() {
      if (qx.core.Environment.get("qx.debug")) {
        qx.core.Assert.assertNotNull(this.__svg, "Operation requires that the transformation has access to an SVG object.");
      }
      return this.__svg;
    },
    
    /**
     * Returns a string that describes the transformation.
     * This string can be used in the _transform_ attribute
     * of elements.
     * 
     * @return {String}
     */
    toString : function() {
      if (!this._cachedString) {
        this._asString = this._composeString();
        this._cachedString = true;
      }
      return this._asString;
    },

    /**
     * Returns an SVGMatrix that describes this transformation.
     * 
     * @return {SVGMatrix}
     */
    toMatrix : function() {
      if (!this.__cachedMatrix) {
        this._asMatrix = this._composeMatrix();
        this._cachedMatrix = true;
      }
      return this._asMatrix;
    },
    
    /**
     * Returns a string that describes the transformation.
     * The string will use the Matrix notation, i.e. <code>matrix(a,b,c,d,e,f)</code>.
     * 
     * @return {String}
     */
    toMatrixString : function() {
      
      if (!this.__cachedMatrixString) {
        var mx = this.toMatrix();
        this._asMatrixString = "matrix("+ mx.a+","+mx.b+","+mx.c+","+mx.d+","+mx.e+","+mx.f+")";
        this._cachedMatrixString = true;
      }
      return this._asMatrixString;
    },
    
    /**
     * Marks all cached values as invalid.
     */
    _invalidateCache : function() {
      this._cachedString = false;
      this._cachedMatrix = false;
      this._cachedMatrixString = false;
    },
    
    /**
     * Creates a string that describes the transformation.
     * *Must be overridden in child classes.*
     * 
     * @return {String}
     */
    _composeString : function() {
      qx.core.Assert.fail("_composeString must be overridden in child classes.", true);
    },
    
    /**
     * Creates a matrix that represents the transformation.
     * *Must be overridden in child classes.*
     * 
     * @return {SVGMatrix}
     */
    _composeMatrix : function() {
      qx.core.Assert.fail("_composeMatrix must be overridden in child classes.", true);
    }
  }
});