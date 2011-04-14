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
 * A pattern is used to fill or stroke an object using a pre-defined graphic
 * object which can be replicated ("tiled") at fixed intervals in x and y to
 * cover the areas to be painted.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/pservers.html#Patterns</li>
 * </ul>
 * 
 */
qx.Class.define("svg.paint.Pattern",
{
  extend : svg.core.Element,
  
  include : [ svg.core.MHref,
              svg.coords.MPreserveAspectRatio,
              svg.coords.MViewBox ],


  construct : function() {
    this.base(arguments, "pattern");
  },
  
  properties :
  {
  	/**
  	 * Coordinate system for attributes {@link #x}, {@link #y},
  	 * {@link #width} and {@link #height}.
  	 * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/pservers.html#PatternElementPatternUnitsAttribute</li>
     * </ul>
  	 */
  	patternUnits : {
  	  nullable: true,
  	  init: null,
  	  apply: "_applyPatternUnits",
  	  check: ["userSpaceOnUse", "objectBoundingBox"]
    },
    
    
  	/**
	   * Coordinate system for the contents of the pattern.
  	 * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/pservers.html#PatternElementPatternContentUnitsAttribute</li>
     * </ul>
	   */
	  contentUnits : {
	    nullable: true,
	    init: null,
	    apply: "_applyContentUnits",
	    check: ["userSpaceOnUse", "objectBoundingBox"]
    },
    
    
  	/**
	   * Additional transformation from the pattern coordinate system onto
     * the target coordinate system. This allows for things such as skewing the
     * pattern tiles.
     * 
     * The available transformation are the same as those in {@link svg.coords.MTransform}.
  	 * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/pservers.html#PatternElementPatternTransformAttribute</li>
     * </ul>
	   */
	  patternTransform : {
	    nullable: true,
	    init: null,
	    apply: "_applyPatternTransform",
	    check: ["userSpaceOnUse", "objectBoundingBox"]
    },
    
  	/**
  	 * See {@link #placement}.
  	 * If x is not specified, the effect is as if a value of zero were specified.
  	 * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/pservers.html#PatternElementXAttribute</li>
     * </ul>
	   */
    x : {
	    nullable: true,
	    init: null,
	    apply: "_applyX",
	    check: "Number"
    },
    
  	/**
  	 * See {@link #placement}.
  	 * If y is not specified, the effect is as if a value of zero were specified.
  	 * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/pservers.html#PatternElementYAttribute</li>
     * </ul>
	   */
    y : {
	    nullable: true,
	    init: null,
	    apply: "_applyY",
	    check: "Number"
    },
    
  	/**
  	 * See {@link #placement}.
  	 * A value of zero disables rendering of the element.
  	 * If width is not specified, the effect is as if a value of zero were specified.
  	 * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/pservers.html#PatternElementWidthAttribute</li>
     * </ul>
	   */
    width : {
	    nullable: true,
	    init: null,
	    apply: "_applyWidth",
	    check: "!isNaN(value) && value >= 0"
    },
    
  	/**
  	 * See {@link #placement}.
  	 * A value of zero disables rendering of the element.
  	 * If height is not specified, the effect is as if a value of zero were specified.
  	 * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/pservers.html#PatternElementHeightAttribute</li>
     * </ul>
	   */
    height : {
	    nullable: true,
	    init: null,
	    apply: "_applyHeight",
	    check: "!isNaN(value) && value >= 0"
    },
    
    /**
  	 * _x_, _y_, _width_ and _height_ indicate how the
  	 * pattern tiles are placed and spaced. These attributes represent coordinates
  	 * and values in the coordinate space specified by the combination of attributes
  	 * {@link #patternUnits} and {@link #patternTransform}.
     */
    placement : {
    	group: ["x", "y", "width", "height"]
    }
        

  },

  members :
  {
  	
  	//applies patternUnits
  	_applyPatternUnits: function(value, old) {
		  if (null == value) {
		  	this.removeAttribute("patternUnits");
		  } else {
        this.setAttribute("patternUnits", value);
		  }
		},
		
		//applies patternContentUnits
		_applyContentUnits: function(value, old) {
		  if (null == value) {
		  	this.removeAttribute("patternContentUnits");
		  } else {
        this.setAttribute("patternContentUnits", value);
		  }
		},
		
		//applies patternTransform
		_applyPatternTransform: function(value, old) {
		  if (null == value) {
		  	this.removeAttribute("patternTransform");
		  } else {
        this.setAttribute("patternTransform", value);
		  }
		},
		
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
		}
		
  }
});