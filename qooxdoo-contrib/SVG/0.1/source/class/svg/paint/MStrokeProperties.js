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
 * Add stroking properties to elements that can be stroked (which means painting
 * along the outline of the object).
 *
 * With SVG, you can paint (i.e., fill or stroke) with:
 * <ul>
 *   <li>a single color</li>
 *   <li>a solid color with opacity</li>
 *   <li>a gradient (linear or radial)</li>
 *   <li>a pattern (vector or image, possibly tiled)</li>
 *   <li>custom paints available via extensibility</li>
 * </ul>
 *
 * SVG uses the general notion of a paint server. Paint servers are specified
 * using a URI reference on a 'fill' property. Gradients, patterns
 * and solid colors are just specific types of paint servers.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/painting.html#StrokeProperties</li>
 * </ul>
 */
qx.Mixin.define("svg.paint.MStrokeProperties",
{
	
	properties :
	{
	  /**
	   * The paint used when stroking the shape outline.
	   * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/painting.html#StrokeProperty</li>
     * </ul>
   	 */
	  stroke : {
	    nullable: true,
	    init: null,
	    apply: "_applyStroke"
    },
    
    /**
     * The width of the stroke on the current object.
     * The value can either be a _length_ or a _percentage_.
     *
     * If a percentage is used, the value represents a percentage of the current
     * viewport.
     *
     * A zero value causes no stroke to be painted.
	   * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/painting.html#StrokeWidthProperty</li>
     * </ul>
     */
    strokeWidth : {
	    nullable: true,
	    init: null,
	    apply: "_applyStrokeWidth",
	    check: "!isNaN(value) && value >= 0"
    },
    
    /**
     * The opacity of the stroke.
     *
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/painting.html#StrokeOpacityProperty</li>
     * </ul>
     */
    strokeOpacity : {
    	nullable: true,
    	init: null,
    	apply: "_applyStrokeOpacity",
    	check: "!isNaN(value) && value >= 0 && value <= 1"
    },
    
    /**
     * The shape to be used at the end of open subpaths when they are stroked.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/painting.html#StrokeLinecapProperty</li>
     * </ul>
     */
    linecap : {
	    nullable: true,
	    init: null,
	    apply: "_applyLinecap",
	    check: ["butt", "round", "square"]
    },
    
    /**
     * The shape to be used at the corners of paths or basic shapes when they are stroked.
	   * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/painting.html#StrokeLinejoinProperty</li>
     * </ul>
     */
    linejoin : {
	    nullable: true,
	    init: null,
	    apply: "_applyLinejoin",
	    check: ["miter", "round", "bevel"]
    },
    
    /**
     * The limit on the ratio of the miter length to the {@link #strokeWidth}.
     * 
     * When two line segments meet at a sharp angle and miter joins have been
     * specified, it is possible for the miter to extend far beyond the thickness
     * of the line stroking the path.
     *
     * A miterlimit imposes a limit on the ratio of the miter length to the
     * strokeWidth. When the limit is exceeded, the join is converted from a
     * miter to a bevel.
     * 
     * Value must be 1 or greater.
	   * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/painting.html#StrokeMiterlimitProperty</li>
     * </ul>
     */
    miterLimit : {
	    nullable: true,
	    init: null,
	    apply: "_applyMiterLimit",
	    check: "!isNaN(value) && value >= 1"
    },
    
    /**
     * The pattern of dashes and gaps used to stroke paths.
     * 
     * It contains a list of comma and/or white space separated lengths
     * and percentages that specify the lengths of alternating dashes and gaps.
     *
     * If an odd number of values is provided, then the list of values is repeated
     * to yield an even number of values. Thus, stroke-dasharray: 5,3,2 is equivalent
     * to stroke-dasharray: 5,3,2,5,3,2.
	   * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/painting.html#StrokeDasharrayProperty</li>
     * </ul>
     */
    dashArray : {
	    nullable: true,
	    init: null,
	    apply: "_applyDashArray",
	    check: "String"
    },
    
    /**
     * Distance into the dash pattern to start the dash.
     * 
     * If a percentage is used, the value represents a percentage of the current
     * viewport. Values can be negative.
     *  
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/painting.html#StrokeDashoffsetProperty</li>
     * </ul>
     */
    dashOffset : {
	    nullable: true,
	    init: null,
	    apply: "_applyDashOffset"
    }
   
	},
	
  members :
  {
    //applies stroke
		_applyStroke : function(value, old) {
		  if (null == value) {
		  	this.removeAttribute("stroke");
		  	return;
		  }
		  if (value instanceof svg.core.Element) {
		  	value = value.getUri();
		  }
      this.setAttribute("stroke", value);
		  
    },

    //applies stroke-width
		_applyStrokeWidth : function(value, old) {
		  if (null == value) {
		  	this.removeAttribute("stroke-width");
		  } else {
        this.setAttribute("stroke-width", value);
		  }
    },

    //applies stroke-opacity
		_applyStrokeOpacity : function(value, old) {
		  if (null == value) {
		  	this.removeAttribute("stroke-opacity");
		  } else {
        this.setAttribute("stroke-opacity", value);
		  }
    },

    //applies stroke-linecap
		_applyLinecap : function(value, old) {
		  if (null == value) {
		  	this.removeAttribute("stroke-linecap");
		  } else {
        this.setAttribute("stroke-linecap", value);
		  }
    },
    
    //applies stroke-linejoin
		_applyLinejoin : function(value, old) {
		  if (null == value) {
		  	this.removeAttribute("stroke-linejoin");
		  } else {
        this.setAttribute("stroke-linejoin", value);
		  }
    },
    
    //applies stroke-miterlimit
		_applyMiterLimit : function(value, old) {
		  if (null == value) {
		  	this.removeAttribute("stroke-miterlimit");
		  } else {
        this.setAttribute("stroke-miterlimit", value);
		  }
    },

    //applies stroke-dasharray
		_applyDashArray : function(value, old) {
		  if (null == value) {
		  	this.removeAttribute("stroke-dasharray");
		  } else {
        this.setAttribute("stroke-dasharray", value);
		  }
    },

    //applies stroke-dashoffset
		_applyDashOffset : function(value, old) {
		  if (null == value) {
		  	this.removeAttribute("stroke-dashoffset");
		  } else {
        this.setAttribute("stroke-dashoffset", value);
		  }
    }

  }
});