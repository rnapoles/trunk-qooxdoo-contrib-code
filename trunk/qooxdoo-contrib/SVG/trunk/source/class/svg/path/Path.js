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
 * Paths represent the outline of a shape which can be filled, stroked, used
 * as a clipping path, or any combination of the three.
 *
 * More info: http://www.w3.org/TR/SVG11/paths.html#Introduction
 */
qx.Class.define("svg.path.Path",
{
  extend : svg.core.Element,
  
  include : [ svg.attributes.MFill,
              svg.attributes.MStroke,
              svg.attributes.MMarkerProperties ],

  construct : function() {
    this.base(arguments, "path");
  },
  
  properties :
  {
  	/**
  	 * The definition of the outline of a shape.
  	 * 
  	 * You can provide an instance of {@link PathData} (recommended!),
  	 * or a string with hand-written path data. 
  	 * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG11/paths.html#PathData</li>
     * </ul>
  	 */
  	pathData: {
  	  nullable: true,
  	  init: null,
  	  apply: "_applyPathData",
  	  check: "value instanceof svg.path.PathData || typeof(value) == 'string'"
    },
    
    /**
     * The author's computation of the total length of the path, in user units.
     * This value is used to calibrate the user agent's own distance-along-a-path
     * calculations with that of the author.
     * 
     * More info:
     * <ul>
     *   <li>http://www.w3.org/TR/SVG11/paths.html#PathLengthAttribute</li>
     * </ul>
     */
    pathLength: {
    	nullable: true,
    	init: null,
    	apply: "_applyPathLength",
    	check: "!isNaN(value) && value >= 0"
    }
  },

  members :
  {
  	
  	//applies path data
  	_applyPathData: function(value, old) {
		  if (null == value) {
		  	this.removeAttribute("d");
		  } else if (value instanceof svg.path.PathData) {
		  	
		  	if (old instanceof svg.path.PathData) {
	  		  old.removeListener("change", this.__changeListener, this);
		  	}
		  	
		  	this.setAttribute("d", value.toString());
		  	value.addListener("change", this.__changeListener, this);
		  	
  	  } else {
        this.setAttribute("d", value);
		  }
    },
    
    //applies path length
    _applyPathLength: function(value, old) {
		  if (null == value) {
		  	this.removeAttribute("pathLength");
  	  } else {
        this.setAttribute("pathLength", value);
		  }
		},
		
		/**
		 * Updates the "d" attribute when PathData has changed.
		 * 
		 * @param ev {qx.event.Data}
		 *   data event fired by PathData
		 */
		__changeListener: function(ev) {
			this._applyPathData(ev.getData());
		}

  }
});