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
 * A straight line segment.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/shapes.html#LineElement</li>
 * </ul>
 *  
 */
qx.Class.define("svg.shape.Line",
{
  extend : svg.core.Element,
  
  include : [ svg.attributes.MFill,
              svg.attributes.MStroke,
              svg.attributes.MTransform,
              svg.attributes.MMarkerProperties ],

  construct : function() {
    this.base(arguments, "line");
  },
  
  properties :
  {
  	/**
  	 * x-coord of the start of the line.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#LineElementX1Attribute</li>
     * </ul>
  	 */
  	x1: {
  	  nullable: true,
  	  init: null,
  	  apply: "_applyX1",
  	  check: "Number"
    },
    
  	/**
  	 * y-coord of the start of the line.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#LineElementY1Attribute</li>
     * </ul>
  	 */
    y1: {
  	  nullable: true,
  	  init: null,
  	  apply: "_applyY1",
  	  check: "Number"
    },
    
  	/**
  	 * x-coord of the end of the line.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#LineElementX2Attribute</li>
     * </ul>
  	 */
    x2: {
  	  nullable: true,
  	  init: null,
  	  apply: "_applyX2",
  	  check: "Number"
    },
    
  	/**
  	 * y-coord of the end of the line.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#LineElementY2Attribute</li>
     * </ul>
  	 */
    y2: {
  	  nullable: true,
  	  init: null,
  	  apply: "_applyY2",
  	  check: "Number"
    },
    
    /**
     * Line start coords (x1,y1).
     */
    start: {
    	group: ["x1", "y1"]
    },
    
    /**
     * Line end coords (x2,y2).
     */
    end: {
    	group: ["x2", "y2"]
    }
    
  },

  members :
  {
    
  	//applies x1
  	_applyX1: function(value, old) {
	    if (null == value) {
	  	  this.removeAttribute("x1");
	    } else {
        this.setAttribute("x1", value);
	    }
    },
  
  	//applies y1
  	_applyY1: function(value, old) {
	    if (null == value) {
	  	  this.removeAttribute("y1");
	    } else {
        this.setAttribute("y1", value);
	    }
    },
  
  	//applies x2
  	_applyX2: function(value, old) {
	    if (null == value) {
	  	  this.removeAttribute("x2");
	    } else {
        this.setAttribute("x2", value);
	    }
    },
  
  	//applies y2
  	_applyY2: function(value, old) {
	    if (null == value) {
	  	  this.removeAttribute("y2");
	    } else {
        this.setAttribute("y2", value);
	    }
    }
  
  }
});