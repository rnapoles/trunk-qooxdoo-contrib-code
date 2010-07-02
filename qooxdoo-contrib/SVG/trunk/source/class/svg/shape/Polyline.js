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
 * A set of connected straight line segments. Typically, polylines define open shapes.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/shapes.html#PolylineElement</li>
 * </ul>
 */
qx.Class.define("svg.shape.Polyline",
{
  extend : svg.core.Element,
  
  include : [ svg.attributes.MFill,
              svg.attributes.MStroke,
              svg.attributes.MTransform,
              svg.attributes.MMarkerProperties ],

  construct : function() {
    this.base(arguments, "polyline");
  },
  
  properties : {
  	
  	/**
  	 * The points that make up the polyline. All coordinate values are in the
     * user coordinate system.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#PolylineElementPointsAttribute</li>
     *   <li>http://www.w3.org/TR/SVG11/shapes.html#PointsBNF</li>
     * </ul>
  	 */
  	points : {
  	  nullable: true,
  	  init: null,
  	  apply: "_applyPoints",
  	  check: "String"
    }
  },

  members :
  {
  	
  	//applies points
  	_applyPoints: function(value, old) {
	    if (null == value) {
	  	  this.removeAttribute("points");
	    } else {
        this.setAttribute("points", value);
	    }
    }
  }

});