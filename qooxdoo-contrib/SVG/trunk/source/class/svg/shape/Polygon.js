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
 * A closed shape consisting of a set of connected straight line segments.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/shapes.html#PolygonElement</li>
 * </ul>
 */
qx.Class.define("svg.shape.Polygon",
{
  extend : svg.core.Element,
  
  include : [ svg.attributes.MFill,
              svg.attributes.MStroke,
              svg.attributes.MTransform,
              svg.attributes.MMarkerProperties ],

  construct : function() {
    this.base(arguments, "polygon");
  },
  
  properties : {
  	
  	/**
  	 * The points that make up the polygon. All coordinate values are in the
     * user coordinate system.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG/shapes.html#PolygonElementPointsAttribute</li>
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