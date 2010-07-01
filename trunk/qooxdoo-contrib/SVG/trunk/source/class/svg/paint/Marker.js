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
 * A marker is a symbol which can be attached to one or more vertices of {@link Path},
 * {@link Line}, {@link Polyline} or {@link Polygon} elements. Typically, markers
 * are used to make arrowheads or polymarkers.
 * 
 * To indicate that a particular ‘marker’ element should be rendered at the
 * vertices of a particular element, set one or more marker properties
 * to reference the marker element.
 * 
 * @see svg.attributes.MMarkerProperties 
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG11/painting.html#Markers</li>
 * </ul>
 */
qx.Class.define("svg.paint.Marker",
{
  extend : svg.core.Element,
  
  include : [ svg.attributes.MFill,
              svg.attributes.MStroke,
              svg.attributes.MTransform,
              svg.attributes.MViewBox,
              svg.attributes.MPreserveAspectRatio ],

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
    this.base(arguments, "marker", styles, attributes);
  },
  
  properties :
  {
  	/**
  	 * Defines the coordinate system used by {@link #markerWidth},
  	 * {@link #markerHeight}, and the contents of the marker.
  	 * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG11/painting.html#MarkerUnitsAttribute</li>
     * </ul>
  	 */
  	markerUnits : {
  	  nullable: true,
  	  init: null,
  	  apply: "_applyMarkerUnits",
  	  check: ["strokeWidth", "userSpaceOnUse"]
    },
    
  	/**
  	 * The x-axis coordinate of the reference point.
  	 * 
  	 * The coordinate is defined in the coordinate system after application
  	 * of the {@link svg.attributes.MViewBox#viewBox} and 
  	 * {@link svg.attributes.MPreserveAspectRatio} attributes.
  	 * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG11/painting.html#MarkerElementRefXAttribute</li>
     * </ul>
  	 */
  	refX : {
  	  nullable: true,
  	  init: null,
  	  apply: "_applyRefX",
  	  check: "Number"
    },
    
  	/**
  	 * The y-axis coordinate of the reference point.
  	 * 
  	 * The coordinate is defined in the coordinate system after application
  	 * of the {@link svg.attributes.MViewBox#viewBox} and 
  	 * {@link svg.attributes.MPreserveAspectRatio} attributes.
  	 * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG11/painting.html#MarkerElementRefYAttribute</li>
     * </ul>
  	 */
  	refY : {
  	  nullable: true,
  	  init: null,
  	  apply: "_applyRefY",
  	  check: "Number"
    },
    
    /**
     * The width of the viewport into which the marker is to be fitted when it is rendered.
     * 
     * A value of zero disables rendering of the element.
     * If unspecified, the effect is as if a value of "3" were specified.
  	 * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG11/painting.html#MarkerWidthAttribute</li>
     * </ul>
     */
    markerWidth : {
  	  nullable: true,
  	  init: null,
  	  apply: "_applyMarkerWidth",
  	  check: "!isNaN(value) && value >= 0"
    },
    
    /**
     * The height of the viewport into which the marker is to be fitted when it is rendered.
     * 
     * A value of zero disables rendering of the element.
     * If unspecified, the effect is as if a value of "3" were specified.
  	 * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG11/painting.html#MarkerHeightAttribute</li>
     * </ul>
     */
    markerHeight : {
  	  nullable: true,
  	  init: null,
  	  apply: "_applyMarkerHeight",
  	  check: "!isNaN(value) && value >= 0"
    },
    
    /**
     * Indicates how the marker is rotated.
  	 * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG11/painting.html#OrientAttribute</li>
     * </ul>
     */
    orient : {
  	  nullable: true,
  	  init: null,
  	  apply: "_applyOrient",
  	  check: "!isNaN(value) || value == 'auto'"
    }
    
  },

  members :
  {
  	
  	//applies markerUnits
  	_applyMarkerUnits: function(value, old) {
		  if (null == value) {
		  	this.removeAttribute("markerUnits");
		  } else {
        this.setAttribute("markerUnits", value);
		  }
		},

  	//applies refX
  	_applyRefX: function(value, old) {
		  if (null == value) {
		  	this.removeAttribute("refX");
		  } else {
        this.setAttribute("refX", value);
		  }
		},

  	//applies refY
  	_applyRefY: function(value, old) {
		  if (null == value) {
		  	this.removeAttribute("refY");
		  } else {
        this.setAttribute("refY", value);
		  }
		},

  	//applies markerWidth
  	_applyMarkerWidth: function(value, old) {
		  if (null == value) {
		  	this.removeAttribute("markerWidth");
		  } else {
        this.setAttribute("markerWidth", value);
		  }
		},

  	//applies markerHeight
  	_applyMarkerHeight: function(value, old) {
		  if (null == value) {
		  	this.removeAttribute("markerHeight");
		  } else {
        this.setAttribute("markerHeight", value);
		  }
		},

  	//applies orient
  	_applyOrient: function(value, old) {
		  if (null == value) {
		  	this.removeAttribute("orient");
		  } else {
        this.setAttribute("orient", value);
		  }
		}
  }
});