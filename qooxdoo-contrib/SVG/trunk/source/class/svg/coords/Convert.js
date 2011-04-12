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
 * Utility class to convert coordinate systems.
 */
qx.Class.define("svg.coords.Convert",
{
  statics :
  {
    /**
     * Converts client (document) coordinates to svg userspace coordinates,
     * using the coordinate system of the specified element.
     * 
     * @param el {svg.core.Element}
     *   Element whose coordinate system to use.
     *  
     * @param clientx {Integer}
     *   x coordinate in client
     * 
     * @param clienty {Integer}
     *   y coordinate in client
     * 
     * @return {SVGPoint}
     *   An object containing the keys <code>x</code> and <code>y</code>. 
     *   
     */
    clientToUserspace : function(el, clientx, clienty) {
      var vp = el.getNearestViewport() || el;
      var m = vp.getScreenCTM();
      var p = vp.createPoint();
      p.x = clientx;
      p.y = clienty;
      p = p.matrixTransform(m.inverse());
      return p;
    }

  }
  
});