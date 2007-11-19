/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */

qx.Interface.define("inspector.console.IView", {
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members : {
    
    getComponents: function() {
      return true;
    },  
    
    setMainElementDeltaHeight: function(height) {
      return true;      
    },
    
    focus: function() {
      return true;
    },

    clear: function() {
        return true;
    },
		
		getCaptionMessage: function() {
			return true;
		}
  }
});