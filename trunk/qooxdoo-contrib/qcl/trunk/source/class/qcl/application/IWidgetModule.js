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
 * An interface for modules that are ui widgets that can be shown or hidden
 */
qx.Interface.define("qcl.application.IWidgetModule",
{
  members :
  {
    
    /**
     * Builds the widget
     * @return {void}
     */
    build : function() {},
    
    /**
     * Shows the widget
     * @return {void}
     */
    show : function() {},
    
    
    /**
     * Hides the widget
     * @return {void}
     */
    hide : function() {}
    
  }
});