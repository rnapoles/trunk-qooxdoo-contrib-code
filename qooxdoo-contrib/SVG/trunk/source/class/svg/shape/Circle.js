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
 * A circle based on a center point and a radius.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/shapes.html#CircleElement</li>
 * </ul>
 */
qx.Class.define("svg.shape.Circle",
{
  extend : svg.core.Element,
  
  include : [ svg.attributes.MFill,
              svg.attributes.MStroke,
              svg.attributes.MTransform ],

  construct : function() {
    this.base(arguments, "circle");
  },
  
  properties :
  {
  	/**
  	 * The x-axis coordinate of the center of the circle.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#CircleElementCXAttribute</li>
     * </ul>
  	 */
  	cx : {
  	  nullable: true,
  	  init: null,
  	  apply: "_applyCx",
  	  check: "Number"
    },
    
  	/**
  	 * The y-axis coordinate of the center of the circle.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#CircleElementCYAttribute</li>
     * </ul>
  	 */
  	cy : {
  	  nullable: true,
  	  init: null,
  	  apply: "_applyCy",
  	  check: "Number"
    },

  	/**
  	 * The radius of the circle. A value of zero disables rendering of the element.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#CircleElementRAttribute</li>
     * </ul>
  	 */
    radius : {
  	  nullable: true,
  	  init: null,
  	  apply: "_applyRadius",
  	  check: "!isNaN(value) && value >= 0"
    }
    
  },

  members :
  {
  	
  	//applies cx
  	_applyCx: function(value, old) {
	    if (null == value) {
	  	  this.removeAttribute("cx");
	    } else {
        this.setAttribute("cx", value);
	    }
    },
    
  	//applies cy
  	_applyCy: function(value, old) {
	    if (null == value) {
	  	  this.removeAttribute("cy");
	    } else {
        this.setAttribute("cy", value);
	    }
    },

  	//applies r
  	_applyRadius: function(value, old) {
	    if (null == value) {
	  	  this.removeAttribute("r");
	    } else {
        this.setAttribute("r", value);
	    }
    }

  }
});