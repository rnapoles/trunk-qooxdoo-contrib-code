/* ************************************************************************

   qcl - the qooxdoo component library
  
   http://qooxdoo.org/contrib/project/qcl/
  
   Copyright:
     2007-2009 Christian Boulanger
  
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
  
   Authors:
   *  Christian Boulanger (cboulanger)
  
************************************************************************ */

/**
 * This interface defines what an module class has to implement. See
 * http://developer.yahoo.com/yui/theater/video.php?v=zakas-architecture
 * http://www.slideshare.net/nzakas/scalable-javascript-application-architecture
 */
qx.Interface.define("qcl.application.IModule",
{
  members :
  {
    /**
     * Initializes the module. The module gets a sandbox instance which
     * interfaces with the main application.
     * 
     * @param sandbox {qcl.application.Sandbox}
     * @return {void}
     */
    init : function( sandbox ) {},
    
    
    /**
     * Starts the module. This might involve creating the UI, starting server
     * communication etc. 
     * 
     * @param sandbox {qcl.application.Sandbox}
     * @return {void}
     */
    start : function() {},
    
    
    /**
     * Stops the module. This might involve hiding the UI, stopping server
     * communication etc. 
     * 
     * @param sandbox {qcl.application.Sandbox}
     * @return {void}
     */
    stop : function() {}
    
  }
});