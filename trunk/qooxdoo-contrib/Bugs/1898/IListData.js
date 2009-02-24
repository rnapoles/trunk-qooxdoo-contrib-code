/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (mwittemann)

************************************************************************ */

/**
 * 
 * EXPERIMENTAL!
 *  
 * This interface defines a data structure compatible with the data binding
 * controllers.
 * It defines a minimum of functionality which the controller need to work.
 */
qx.Interface.define("qx.data.IListData",
{
  events : 
  {
    /**
     * The change event which will be fired if there is a change in the data 
     * structure.The data should contain a map with three key value pairs:
     * <li>start: The start index of the change.</li>
     * <li>end: The end index of the change.</li>
     * <li>type: The type of the change as a String. This can be 'add',  
     * 'remove' or 'order'</li>
     * <li>item: The item which has been changed.</li>
     */
    "change" : "qx.event.type.Data",
    
    /**
     * The changeLength event will be fired every time the length of the
     * data structure changes.
     */
    "changeLength": "qx.event.type.Event"     
  },
  
  
  members :
  {    
    /**
     * Returns the item at the given index
     *
     * @param index {Number} The index requested of the data element.
     *
     * @return {var} The element at the given index.
     */    
    getItem : function(index) {},
    
    
    /**
     * Sets the given item at the given position in the data structure. A 
     * change event has to be fired.
     *
     * @param index {Number} The index of the data element.
     * @param item {var} The new item to set.
     */    
    setItem : function(index, item) {},
    
    
    /**
     * Method to remove and add new element to the data. For every remove or
     * add a change event should be fired.
     *
     * @param varargs {var} The first parameter defines the start index.
     *   The second parameter defines number of element which will be removed
     *   at the given position.
     *   All following parameters will be added at the given position to the
     *   array.
     * @return {var} An data structure of the current type
     *   containing the removed elements.
     */    
    splice : function(varargs) {},
    
    
    /**
     * Check if the given item is in the current data structure.
     * 
     * @param item {var} The item which is possibly in the data structure.
     * @return {boolean} true, if the array contains the given item.
     */
    contains : function(item) {},
    
    
    /**
     * Returns the current length of the data structure. 
     * 
     * @return {Number} The current length of the data structure.
     */
    getLength : function() {}
  }
});