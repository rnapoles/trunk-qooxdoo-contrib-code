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
 * A rectangle. Rounded rectangles can be achieved by setting appropriate values
 * for attributes rx and ry.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/shapes.html#RectElement</li>
 * </ul>
 */
qx.Class.define("svg.shape.Rect",
{
  extend : svg.core.Element,
  
  include : [ svg.attributes.MFill,
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
    this.base(arguments, "rect", styles, attributes);
  },
  
  properties :
  {
  	/**
  	 * x-coord of the rectangle.
  	 * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#RectElementXAttribute</li>
     * </ul>
  	 */
  	x : {
  	  nullable: true,
  	  init: null,
  	  apply: "_applyX",
  	  check: "Number"
    },
    
  	/**
  	 * y-coord of the rectangle.
  	 * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#RectElementYAttribute</li>
     * </ul>
  	 */
  	y : {
  	  nullable: true,
  	  init: null,
  	  apply: "_applyY",
  	  check: "Number"
    },
    
  	/**
  	 * Width of the rectangle.
  	 * A value of zero disables rendering of the element.
  	 * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#RectElementWidthAttribute</li>
     * </ul>
  	 */
    width : {
  	  nullable: true,
  	  init: null,
  	  apply: "_applyWidth",
  	  check: "svg.core.Types.isLength(value)"
    },
    
  	/**
  	 * Height of the rectangle.
  	 * A value of zero disables rendering of the element.
  	 * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#RectElementHeightAttribute</li>
     * </ul>
  	 */
    height : {
  	  nullable: true,
  	  init: null,
  	  apply: "_applyHeight",
  	  check: "svg.core.Types.isLength(value)"
    },
    
    /**
     * For rounded rectangles, the x-axis radius of the ellipse used
     * to round off the corners of the rectangle.
  	 * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#RectElementRXAttribute</li>
     * </ul>
     */
    roundX : {
  	  nullable: true,
  	  init: null,
  	  apply: "_applyRoundX",
  	  check: "svg.core.Types.isLength(value)"
    },
    
    /**
     * For rounded rectangles, the y-axis radius of the ellipse used
     * to round off the corners of the rectangle.
  	 * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#RectElementRYAttribute</li>
     * </ul>
     */
    roundY : {
  	  nullable: true,
  	  init: null,
  	  apply: "_applyRoundY",
  	  check: "svg.core.Types.isLength(value)"
    }
    
    
  },

  members :
  {
  	
  	//applies x
  	_applyX: function(value, old) {
	    if (null == value) {
	  	  this.removeAttribute("x");
	    } else {
        this.setAttribute("x", value);
	    }
    },
  
  	//applies y
  	_applyY: function(value, old) {
	    if (null == value) {
	  	  this.removeAttribute("y");
	    } else {
        this.setAttribute("y", value);
	    }
    },
  
  	//applies width
  	_applyWidth: function(value, old) {
	    if (null == value) {
	  	  this.removeAttribute("width");
	    } else {
        this.setAttribute("width", value);
	    }
    },
  
  	//applies height
  	_applyHeight: function(value, old) {
	    if (null == value) {
	  	  this.removeAttribute("height");
	    } else {
        this.setAttribute("height", value);
	    }
    },
  
  	//applies rx
  	_applyRoundX: function(value, old) {
	    if (null == value) {
	  	  this.removeAttribute("rx");
	    } else {
        this.setAttribute("rx", value);
	    }
    },
  
  	//applies ry
  	_applyRoundY: function(value, old) {
	    if (null == value) {
	  	  this.removeAttribute("ry");
	    } else {
        this.setAttribute("ry", value);
	    }
    }

  }
});