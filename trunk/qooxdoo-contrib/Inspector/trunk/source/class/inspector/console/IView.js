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
/**
 * This interface declaration defines a set of methods for all views of the console.
 */
qx.Interface.define("inspector.console.IView", {
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members : {
    /**
     * The method should return the components of the implementing view so 
     * that the components do not show up in the widget finders tree.
     * @return {qx.core.Object[]} An array of qooxdoo objects.
     */
    getComponents: function() {
      return true;
    },  
    
    
    /**
     * The method should set the height of the views main element.
     * @param height {Number} The delta of the height in pixel.
     */
    setMainElementDeltaHeight: function(height) {
      return true;      
    },
    
    
    /**
     * This method will be called when the view appears and should therefore 
     * focus its main element.
     */
    focus: function() {
      return true;
    },
    
    
    /**
     * The method should clear the view.
     */
    clear: function() {
        return true;
    },
    
    
    /**
     * The method will be calls by the console and should return a 
     * string containing the message which should be shown in the caption
     * bar of the console window.
     * @return {String} The message.
     */
    getCaptionMessage: function() {
      return true;
    },
    
    
    /**
     * This method should use a RegExp object to filter the data in the 
     * view. This means that only things should be shown which match the
     * filter attribute in some way.
     * @param filter {String} The filter for the search.
     */
    filter: function(filter) {
      return true;
    },
    
    
    /**
     * This method should return the currently used filter string. This 
     * is necessary for restoring the filter value on tab switches.
     * @return {String} The currently used filter.
     */
    getFilter: function() {
      return true;
    },
    
    
    /**
     * This method should return the classname of the current selected 
     * object. In no object is selected, null should be returned.
     * @return {String} The current selected classname.
     */
    getCurrentSelectedClassname: function() {
      return true;
    }
  }
});