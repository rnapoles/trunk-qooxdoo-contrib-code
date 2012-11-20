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
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * Mixin used for the bubbling events. If you want to use this in your own model
 * classes, be sure that every property will call the
 * {@link #_applyEventPropagation} function on every change.
 */
qx.Mixin.define("qx.data.marshal.MEventBubbling",
{

  events :
  {
    /**
     * The change event which will be fired on every change in the model no
     * matter what property changes. This event bubbles so the root model will
     * fire a change event on every change of its children properties too.
     *
     * Note that properties are required to call
     * {@link #_applyEventPropagation} on apply for changes to be tracked as
     * desired. It is already taken care of that properties created with the
     * {@link qx.data.marshal.Json} marshaler call this method.
     *
     * The data will contain a map with the following three keys
     *   <li>value: The new value of the property</li>
     *   <li>old: The old value of the property.</li>
     *   <li>name: The name of the property changed including its parent
     *     properties separated by dots.</li>
     * Due to that, the <code>getOldData</code> method will always return null
     * because the old data is contained in the map.
     */
    "changeBubble": "qx.event.type.Data"
  },


  members :
  {
    /**
     * Apply function for every property created with the
     * {@link qx.data.marshal.Json} marshaler. It fires and
     * {@link #changeBubble} event on every change. It also adds the chaining
     * listener if possible which is necessary for the bubbling of the events.
     *
     * @param value {var} The new value of the property.
     * @param old {var} The old value of the property.
     * @param name {String} The name of the changed property.
     */
    _applyEventPropagation : function(value, old, name)
    {
      this.fireDataEvent("changeBubble", {value: value, name: name, old: old});

      this._registerEventChaining(value, old, name);
    },


    /**
     * Registers for the given parameters the changeBubble listener, if
     * possible. It also removes the old listener, if an old item with
     * a changeBubble event is given.
     *
     * @param value {var} The new value of the property.
     * @param old {var} The old value of the property.
     * @param name {String} The name of the changed property.
     */
    _registerEventChaining : function(value, old, name)
    {
      // if the child supports chaining
      if ((value instanceof qx.core.Object)
        && qx.Class.hasMixin(value.constructor, qx.data.marshal.MEventBubbling)
      ) {
        // create the listener
        var listener = qx.lang.Function.bind(
          this.__changePropertyListener, this, name
        );
        // add the listener
        var id = value.addListener("changeBubble", listener, this);
        value.setUserData("idBubble", id);
      }
      // if an old value is given, remove the old listener if possible
      if (old != null && old.getUserData && old.getUserData("idBubble") != null) {
        old.removeListenerById(old.getUserData("idBubble"));
      }
    },


    /**
     * Listener responsible for formating the name and firing the change event
     * for the changed property.
     *
     * @param name {String} The name of the former properties.
     * @param e {qx.event.type.Data} The date event fired by the property
     *   change.
     */
    __changePropertyListener : function(name, e)
    {
      var data = e.getData();
      var value = data.value;
      var old = data.old;

      // if the target is an array
      if (qx.Class.hasInterface(e.getTarget().constructor, qx.data.IListData)) {

        if (data.name.indexOf) {
          var dotIndex = data.name.indexOf(".") != -1 ? data.name.indexOf(".") : data.name.length;
          var bracketIndex = data.name.indexOf("[") != -1 ? data.name.indexOf("[") : data.name.length;

          if (dotIndex < bracketIndex) {
            var index = data.name.substring(0, dotIndex);
            var rest = data.name.substring(dotIndex + 1, data.name.length);
            if (rest[0] != "[") {
              rest = "." + rest;
            }
            var newName =  name + "[" + index + "]" + rest;
          } else if (bracketIndex < dotIndex) {
            var index = data.name.substring(0, bracketIndex);
            var rest = data.name.substring(bracketIndex, data.name.length);
            var newName =  name + "[" + index + "]" + rest;
          } else {
            var newName =  name + "[" + data.name + "]";
          }
        } else {
          var newName =  name + "[" + data.name + "]";
        }

      // if the target is not an array
      } else {
        var newName =  name + "." + data.name;
      }

      this.fireDataEvent(
        "changeBubble",
        {
          value: value,
          name: newName,
          old: old
        }
      );
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * The data array is a special array used in the data binding context of
 * qooxdoo. It does not extend the native array of JavaScript but its a wrapper
 * for it. All the native methods are included in the implementation and it
 * also fires events if the content or the length of the array changes in
 * any way. Also the <code>.length</code> property is available on the array.
 */
qx.Class.define("qx.data.Array",
{
  extend : qx.core.Object,
  include : qx.data.marshal.MEventBubbling,
  implement : [qx.data.IListData],

  /**
   * Creates a new instance of an array.
   *
   * @param param {var} The parameter can be some types.<br/>
   *   Without a parameter a new blank array will be created.<br/>
   *   If there is more than one parameter is given, the parameter will be
   *   added directly to the new array.<br/>
   *   If the parameter is a number, a new Array with the given length will be
   *   created.<br/>
   *   If the parameter is a JavaScript array, a new array containing the given
   *   elements will be created.
   */
  construct : function(param)
  {
    this.base(arguments);
    // if no argument is given
    if (param == undefined) {
      this.__array = [];

    // check for elements (create the array)
    } else if (arguments.length > 1) {
      // create an empty array and go through every argument and push it
      this.__array = [];
      for (var i = 0; i < arguments.length; i++) {
        this.__array.push(arguments[i]);
      }

    // check for a number (length)
    } else if (typeof param == "number") {
      this.__array = new Array(param);
    // check for an array itself
    } else if (param instanceof Array) {
      this.__array = qx.lang.Array.clone(param);

    // error case
    } else {
      this.__array = [];
      throw new Error("Type of the parameter not supported!");
    }

    // propagate changes
    for (var i=0; i<this.__array.length; i++) {
      this._applyEventPropagation(this.__array[i], null, i);
    }

    // update the length at startup
    this.__updateLength();
  },


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /**
     * Flag to set the dispose behavior of the array. If the property is set to
     * <code>true</code>, the array will dispose its content on dispose, too.
     */
    autoDisposeItems : {
      check : "Boolean",
      init : false
    }
  },

  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events :
  {
    /**
     * The change event which will be fired if there is a change in the array.
     * The data contains a map with three key value pairs:
     * <li>start: The start index of the change.</li>
     * <li>end: The end index of the change.</li>
     * <li>type: The type of the change as a String. This can be 'add',
     * 'remove' or 'order'</li>
     * <li>items: The items which has been changed (as a JavaScript array).</li>
     */
    "change" : "qx.event.type.Data",


    /**
     * The changeLength event will be fired every time the length of the
     * array changes.
     */
    "changeLength": "qx.event.type.Data"
  },


  members :
  {
    // private members
    __array : null,


    /**
     * Concatenates the current and the given array into a new one.
     *
     * @param array {Array} The javaScript array which should be concatenated
     *   to the current array.
     *
     * @return {qx.data.Array} A new array containing the values of both former
     *   arrays.
     */
    concat: function(array) {
      if (array) {
        var newArray = this.__array.concat(array);
      } else {
        var newArray = this.__array.concat();
      }
      return new qx.data.Array(newArray);
    },


    /**
     * Returns the array as a string using the given connector string to
     * connect the values.
     *
     * @param connector {String} the string which should be used to past in
     *  between of the array values.
     *
     * @return {String} The array as a string.
     */
    join: function(connector) {
      return this.__array.join(connector);
    },


    /**
     * Removes and returns the last element of the array.
     * An change event will be fired.
     *
     * @return {var} The last element of the array.
     */
    pop: function() {
      var item = this.__array.pop();
      this.__updateLength();
      // remove the possible added event listener
      this._registerEventChaining(null, item, this.length - 1);
      // fire change bubble event
      this.fireDataEvent("changeBubble", {
        value: [],
        name: this.length,
        old: [item]
      });

      this.fireDataEvent("change",
        {
          start: this.length - 1,
          end: this.length - 1,
          type: "remove",
          items: [item]
        }, null
      );
      return item;
    },


    /**
     * Adds an element at the end of the array.
     *
     * @param varargs {var} Multiple elements. Every element will be added to
     *   the end of the array. An change event will be fired.
     *
     * @return {Number} The new length of the array.
     */
    push: function(varargs) {
      for (var i = 0; i < arguments.length; i++) {
        this.__array.push(arguments[i]);
        this.__updateLength();
        // apply to every pushed item an event listener for the bubbling
        this._registerEventChaining(arguments[i], null, this.length - 1);

        // fire change bubbles event
        this.fireDataEvent("changeBubble", {
          value: [arguments[i]],
          name: this.length - 1,
          old: []
        });

        // fire change event
        this.fireDataEvent("change",
          {
            start: this.length - 1,
            end: this.length - 1,
            type: "add",
            items: [arguments[i]]
          }, null
        );
      }
      return this.length;
    },


    /**
     * Reverses the order of the array. An change event will be fired.
     */
    reverse: function() {
      // ignore on empty arrays
      if (this.length == 0) {
        return;
      }

      var oldArray = this.__array.concat();
      this.__array.reverse();
      this.fireDataEvent("change",
        {start: 0, end: this.length - 1, type: "order", items: null}, null
      );

      // fire change bubbles event
      this.fireDataEvent("changeBubble", {
        value: this.__array,
        name: "0-" + (this.__array.length - 1),
        old: oldArray
      });
    },


    /**
     * Removes the first element of the array and returns it. An change event
     * will be fired.
     *
     * @return {var} the former first element.
     */
    shift: function() {
      // ignore on empty arrays
      if (this.length == 0) {
        return;
      }

      var item = this.__array.shift();
      this.__updateLength();
      // remove the possible added event listener
      this._registerEventChaining(null, item, this.length -1);

      // fire change bubbles event
      this.fireDataEvent("changeBubble", {
        value: [],
        name: "0",
        old: [item]
      });

      // fire change event
      this.fireDataEvent("change",
        {
          start: 0,
          end: this.length -1,
          type: "remove",
          items: [item]
        }, null
      );
      return item;
    },


    /**
     * Returns a new array based on the range specified by the parameters.
     *
     * @param from {Number} The start index.
     * @param to {Number?null} The end index. If omitted, slice extracts to the
     *   end of the array.
     *
     * @return {qx.data.Array} A new array containing the given range of values.
     */
    slice: function(from, to) {
      return new qx.data.Array(this.__array.slice(from, to));
    },


    /**
     * Method to remove and add new elements to the array. For every remove or
     * add an event will be fired.
     *
     * @param startIndex {Integer} The index where the splice should start
     * @param amount {Integer} Defines number of elements which will be removed
     *   at the given position.
     * @param varargs {var} All following parameters will be added at the given
     *   position to the array.
     * @return {qx.data.Array} An data array containing the removed elements.
     *   Keep in to dispose this one, even if you don't use it!
     */
    splice: function(startIndex, amount, varargs) {
      // store the old length
      var oldLength = this.__array.length;

      // invoke the slice on the array
      var returnArray = this.__array.splice.apply(this.__array, arguments);

      // fire a change event for the length
      if (this.__array.length != oldLength) {
        this.__updateLength();
      }
      // fire an event for the change
      var removed = amount > 0;
      var added = arguments.length > 2;
      var items = null;
      if (removed || added) {
        if (this.__array.length > oldLength) {
          var type = "add";
        } else if (this.__array.length < oldLength) {
          var type = "remove";
          items = returnArray;
        } else {
          var type = "order";
        }
        this.fireDataEvent("change",
          {
            start: startIndex,
            end: this.length - 1,
            type: type,
            items: items
          }, null
        );
      }
      // add listeners
      for (var i = 2; i < arguments.length; i++) {
        this._registerEventChaining(arguments[i], null, startIndex + i);
      }
      // fire the changeBubble event
      var value = [];
      for (var i=2; i < arguments.length; i++) {
        value[i-2] = arguments[i];
      };
      var endIndex = (startIndex + Math.max(arguments.length - 3 , amount - 1));
      var name = startIndex == endIndex ? endIndex : startIndex + "-" + endIndex;
      this.fireDataEvent("changeBubble", {
        value: value, name: name, old: returnArray
      });

      // remove the listeners
      for (var i = 0; i < returnArray.length; i++) {
        this._registerEventChaining(null, returnArray[i], i);
      }
      return (new qx.data.Array(returnArray));
    },


    /**
     * Sorts the array. If a sort function is given, this will be used to
     * compare the items.
     *
     * @param func {Function} A compare function comparing two parameters and
     *   should return a number.
     */
    sort: function(func) {
      // ignore if the array is empty
      if (this.length == 0) {
        return;
      }
      var oldArray = this.__array.concat();

      this.__array.sort.apply(this.__array, arguments);
      this.fireDataEvent("change",
        {start: 0, end: this.length - 1, type: "order", items: null}, null
      );

      // fire change bubbles event
      this.fireDataEvent("changeBubble", {
        value: this.__array,
        name: "0-" + (this.length - 1),
        old: oldArray
      });
    },


    /**
     * Adds the given items to the beginning of the array. For every element,
     * a change event will be fired.
     *
     * @param varargs {var} As many elements as you want to add to the beginning.
     */
    unshift: function(varargs) {
      for (var i = arguments.length - 1; i >= 0; i--) {
        this.__array.unshift(arguments[i])
        this.__updateLength();
        // apply to every pushed item an event listener for the bubbling
        this._registerEventChaining(arguments[i], null, 0);

        // fire change bubbles event
        this.fireDataEvent("changeBubble", {
          value: [this.__array[0]],
          name: "0",
          old: [this.__array[1]]
        });

        // fire change event
        this.fireDataEvent("change",
          {
            start: 0,
            end: this.length - 1,
            type: "add",
            items: [arguments[i]]
          }, null
        );
      }
      return this.length;
    },


    // interface implementation
    toArray: function() {
      return this.__array;
    },


    /**
     * Replacement function for the getting of the array value.
     * array[0] should be array.getItem(0).
     *
     * @param index {Number} The index requested of the array element.
     *
     * @return {var} The element at the given index.
     */
    getItem: function(index) {
      return this.__array[index];
    },


    /**
     * Replacement function for the setting of an array value.
     * array[0] = "a" should be array.setItem(0, "a").
     * A change event will be fired if the value changes. Setting the same
     * value again will not lead to a change event.
     *
     * @param index {Number} The index of the array element.
     * @param item {var} The new item to set.
     */
    setItem: function(index, item) {
      var oldItem = this.__array[index];
      // ignore settings of already set items [BUG #4106]
      if (oldItem === item) {
        return;
      }
      this.__array[index] = item;
      // set an event listener for the bubbling
      this._registerEventChaining(item, oldItem, index);
      // only update the length if its changed
      if (this.length != this.__array.length) {
        this.__updateLength();
      }

      // fire change bubbles event
      this.fireDataEvent("changeBubble", {
        value: [item],
        name: index,
        old: [oldItem]
      });

      // fire change event
      this.fireDataEvent("change",
        {
          start: index,
          end: index,
          type: "add",
          items: [item]
        }, null
      );
    },


    /**
     * This method returns the current length stored under .length on each
     * array.
     *
     * @return {Number} The current length of the array.
     */
    getLength: function() {
      return this.length;
    },


    /**
     * Returns the index of the item in the array. If the item is not in the
     * array, -1 will be returned.
     *
     * @param item {var} The item of which the index should be returned.
     * @return {Number} The Index of the given item.
     */
    indexOf: function(item) {
      return this.__array.indexOf(item);
    },


    /**
     * Returns the toString of the original Array
     * @return {String} The array as a string.
     */
    toString: function() {
      if (this.__array != null) {
        return this.__array.toString();
      }
      return "";
    },


    /*
    ---------------------------------------------------------------------------
       IMPLEMENTATION OF THE QX.LANG.ARRAY METHODS
    ---------------------------------------------------------------------------
    */
    /**
     * Check if the given item is in the current array.
     *
     * @param item {var} The item which is possibly in the array.
     * @return {boolean} true, if the array contains the given item.
     */
    contains: function(item) {
      return this.__array.indexOf(item) !== -1;
    },


    /**
     * Return a copy of the given arr
     *
     * @return {qx.data.Array} copy of this
     */
    copy : function() {
      return this.concat();
    },


    /**
     * Insert an element at a given position.
     *
     * @param index {Integer} Position where to insert the item.
     * @param item {var} The element to insert.
     */
    insertAt : function(index, item)
    {
      this.splice(index, 0, item);
    },


    /**
     * Insert an item into the array before a given item.
     *
     * @param before {var} Insert item before this object.
     * @param item {var} The item to be inserted.
     */
    insertBefore : function(before, item)
    {
      var index = this.indexOf(before);

      if (index == -1) {
        this.push(item);
      } else {
        this.splice(index, 0, item);
      }
    },


    /**
     * Insert an element into the array after a given item.
     *
     * @param after {var} Insert item after this object.
     * @param item {var} Object to be inserted.
     */
    insertAfter : function(after, item)
    {
      var index = this.indexOf(after);

      if (index == -1 || index == (this.length - 1)) {
        this.push(item);
      } else {
        this.splice(index + 1, 0, item);
      }
    },


    /**
     * Remove an element from the array at the given index.
     *
     * @param index {Integer} Index of the item to be removed.
     * @return {var} The removed item.
     */
    removeAt : function(index) {
      var returnArray = this.splice(index, 1);
      var item = returnArray.getItem(0);
      returnArray.dispose();
      return item;
    },


    /**
     * Remove all elements from the array.
     *
     * @return {Array} A native array containing the removed elements.
     */
    removeAll : function() {
      // remove all possible added event listeners
      for (var i = 0; i < this.__array.length; i++) {
        this._registerEventChaining(null, this.__array[i], i);
      }

      // ignore if array is empty
      if (this.getLength() == 0) {
        return;
      }

      // store the old data
      var oldLength = this.getLength();
      var items = this.__array.concat();

      // change the length
      this.__array.length = 0;
      this.__updateLength();

      // fire change bubbles event
      this.fireDataEvent("changeBubble", {
        value: [],
        name: "0-" + (oldLength - 1),
        old: items
      });

      // fire the change event
      this.fireDataEvent("change",
        {
          start: 0,
          end: oldLength - 1,
          type: "remove",
          items: items
        }, null
      );
      return items;
    },


    /**
     * Append the items of the given array.
     *
     * @param array {Array|qx.data.IListData} The items of this array will
     * be appended.
     * @throws An exception if the second argument is not an array.
     */
    append : function(array)
    {
      // qooxdoo array support
      if (array instanceof qx.data.Array) {
        array = array.toArray();
      }

      // this check is important because opera throws an uncatchable error if
      // apply is called without an array as argument.
      if (qx.core.Environment.get("qx.debug")) {
        qx.core.Assert.assertArray(array, "The parameter must be an array.");
      }

      Array.prototype.push.apply(this.__array, array);

      // add a listener to the new items
      for (var i = 0; i < array.length; i++) {
        this._registerEventChaining(array[i], null, this.__array.length + i);
      }

      var oldLength = this.length;
      this.__updateLength();

      // fire change bubbles
      this.fireDataEvent("changeBubble", {
        value: array,
        name: oldLength == (this.length-1) ? oldLength : oldLength + "-" + (this.length-1),
        old: []
      });

      // fire the change event
      this.fireDataEvent("change",
        {
          start: oldLength,
          end: this.length - 1,
          type: "add",
          items: array
        }, null
      );
    },


    /**
     * Remove the given item.
     *
     * @param item {var} Item to be removed from the array.
     * @return {var} The removed item.
     */
    remove : function(item)
    {
      var index = this.indexOf(item);

      if (index != -1)
      {
        this.splice(index, 1);
        return item;
      }
    },


    /**
     * Check whether the given array has the same content as this.
     * Checks only the equality of the arrays' content.
     *
     * @param array {Array} The array to check.
     * @return {Boolean} Whether the two arrays are equal.
     */
    equals : function(array)
    {
      if (this.length !== array.length) {
        return false;
      }

      for (var i = 0; i < this.length; i++)
      {
        if (this.getItem(i) !== array.getItem(i)) {
          return false;
        }
      }

      return true;
    },


    /**
     * Returns the sum of all values in the array. Supports
     * numeric values only.
     *
     * @return {Number} The sum of all values.
     */
    sum : function()
    {
      var result = 0;
      for (var i = 0; i < this.length; i++) {
        result += this.getItem(i);
      }

      return result;
    },


    /**
     * Returns the highest value in the given array.
     * Supports numeric values only.
     *
     * @return {Number | null} The highest of all values or undefined if the
     *   array is empty.
     */
    max : function()
    {
      var result = this.getItem(0);

      for (var i = 1; i < this.length; i++)
      {
        if (this.getItem(i) > result) {
          result = this.getItem(i);
        }
      }

      return result === undefined ? null : result;
    },


    /**
     * Returns the lowest value in the array. Supports
     * numeric values only.
     *
     * @return {Number | null} The lowest of all values or undefined
     *   if the array is empty.
     */
    min : function()
    {
      var result = this.getItem(0);

      for (var i = 1; i < this.length; i++)
      {
        if (this.getItem(i) < result) {
          result = this.getItem(i);
        }
      }

      return result === undefined ? null : result;
    },


    /**
     * Invokes the given function for every item in the array.
     *
     * @param callback {Function} The function which will be call for every
     *   item in the array. It will be invoked with three parameters:
     *   the item, the index and the array itself.
     * @param context {var} The context in which the callback will be invoked.
     */
    forEach : function(callback, context)
    {
      for (var i = 0; i < this.__array.length; i++) {
        callback.call(context, this.__array[i], i, this);
      }
    },


    /*
    ---------------------------------------------------------------------------
      INTERNAL HELPERS
    ---------------------------------------------------------------------------
    */
    /**
     * Internal function which updates the length property of the array.
     * Every time the length will be updated, a {@link #changeLength} data
     * event will be fired.
     */
    __updateLength: function() {
      var oldLength = this.length;
      this.length = this.__array.length;
      this.fireDataEvent("changeLength", this.length, oldLength);
    }
  },



  /*
   *****************************************************************************
      DESTRUCTOR
   *****************************************************************************
  */

  destruct : function() {
    for (var i = 0; i < this.__array.length; i++) {
      var item = this.__array[i];
      this._applyEventPropagation(null, item, i);

      // dispose the items on auto dispose
      if (this.isAutoDisposeItems() && item && item instanceof qx.core.Object) {
        item.dispose();
      }
    }

    this.__array = null;
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
     2006 Derrell Lipman

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Derrell Lipman (derrell)

************************************************************************ */

/**
 * This class is used to send HTTP requests to the server.
 *
 * Note: This class will be deprecated in a future release. Instead,
 * classes found in {@link qx.io.request} will offer request handling.
 */
qx.Class.define("qx.io.remote.Request",
{
  extend : qx.core.Object,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param vUrl {String}
   *   Target url to issue the request to.
   *
   * @param vMethod {String}
   *   Determines http method (GET, POST, PUT, etc.) to use. See "method" property
   *   for valid values and default value.
   *
   * @param vResponseType {String}
   *   The mime type of the response. Default is text/plain.
   */
  construct : function(vUrl, vMethod, vResponseType)
  {
    this.base(arguments);

    this.__requestHeaders = {};
    this.__urlParameters = {};
    this.__dataParameters = {};
    this.__formFields = {};

    if (vUrl !== undefined) {
      this.setUrl(vUrl);
    }

    if (vMethod !== undefined) {
      this.setMethod(vMethod);
    }

    if (vResponseType !== undefined) {
      this.setResponseType(vResponseType);
    }

    this.setProhibitCaching(true);

    // Get the next sequence number for this request
    this.__seqNum = ++qx.io.remote.Request.__seqNum;
  },




  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events : {

    /** Fired when the Request object changes its state to 'created' */
    "created" : "qx.event.type.Event",

    /** Fired when the Request object changes its state to 'configured' */
    "configured" : "qx.event.type.Event",

    /** Fired when the Request object changes its state to 'sending' */
    "sending" : "qx.event.type.Event",

    /** Fired when the Request object changes its state to 'receiving' */
    "receiving" : "qx.event.type.Event",

    /**
     * Fired once the request has finished successfully. The event object
     * can be used to read the transferred data.
     */
    "completed" : "qx.io.remote.Response",

    /** Fired when the pending request has been aborted. */
    "aborted" : "qx.event.type.Event",

    /** Fired when the pending request failes. */
    "failed" : "qx.io.remote.Response",

    /** Fired when the pending request times out. */
    "timeout" : "qx.io.remote.Response"
  },



  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /*
    ---------------------------------------------------------------------------
      SEQUENCE NUMBER
    ---------------------------------------------------------------------------
    */

    /**
     * Sequence (id) number of a request, used to associate a response or error
     * with its initiating request.
     */
    __seqNum : 0,

    /**
     * Returns true if the given HTTP method allows a request body being transferred to the server.
     * This is currently POST and PUT. Other methods require their data being encoded into
     * the URL
     *
     * @param httpMethod {String} one of the values of the method property
     * @return {Boolean}
     */
    methodAllowsRequestBody : function(httpMethod) {
      return (httpMethod == "POST") || (httpMethod == "PUT");
    }

  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /**
     * Target url to issue the request to.
     */
    url :
    {
      check : "String",
      init : ""
    },


    /**
     * Determines what type of request to issue (GET or POST).
     */
    method :
    {
      check : [ "GET", "POST", "PUT", "HEAD", "DELETE" ],
      apply : "_applyMethod",
      init : "GET"
    },


    /**
     * Set the request to asynchronous.
     */
    asynchronous :
    {
      check : "Boolean",
      init : true
    },


    /**
     * Set the data to be sent via this request
     */
    data :
    {
      check : "String",
      nullable : true
    },


    /**
     * Username to use for HTTP authentication.
     * Set to NULL if HTTP authentication is not used.
     */
    username :
    {
      check : "String",
      nullable : true
    },


    /**
     * Password to use for HTTP authentication.
     * Set to NULL if HTTP authentication is not used.
     */
    password :
    {
      check : "String",
      nullable : true
    },


    /**
     * The state that the request is in, while being processed.
     */
    state :
    {
      check : [ "configured", "queued", "sending", "receiving", "completed", "aborted", "timeout", "failed" ],
      init : "configured",
      apply : "_applyState",
      event : "changeState"
    },


    /**
     * Response type of request.
     *
     * The response type is a MIME type, default is text/plain. Other supported
     * MIME types are text/javascript, text/html, application/json,
     * application/xml.
     */
    responseType :
    {
      check : [ "text/plain", "text/javascript", "application/json", "application/xml", "text/html" ],
      init : "text/plain",
      apply : "_applyResponseType"
    },


    /**
     * Number of milliseconds before the request is being timed out.
     *
     * If this property is null, the timeout for the request comes is the
     * qx.io.remote.RequestQueue's property defaultTimeout.
     */
    timeout :
    {
      check : "Integer",
      nullable : true
    },


    /**
     * Prohibit request from being cached.
     *
     * Setting the value to <i>true</i> adds a parameter "nocache" to the
     * request URL with a value of the current time, as well as adding request
     * headers Pragma:no-cache and Cache-Control:no-cache.
     *
     * Setting the value to <i>false</i> removes the parameter and request
     * headers.
     *
     * As a special case, this property may be set to the string value
     * "no-url-params-on-post" which will prevent the nocache parameter from
     * being added to the URL if the POST method is used but will still add
     * the Pragma and Cache-Control headers.  This is useful if your backend
     * does nasty things like mixing parameters specified in the URL into
     * form fields in the POST request.  (One example of this nasty behavior
     * is known as "mixed mode" in Oracle, as described here:
     * http://download.oracle.com/docs/cd/B32110_01/web.1013/b28963/concept.htm#i1005684)
     */
    prohibitCaching :
    {
      check : function(v)
      {
        return typeof v == "boolean" || v === "no-url-params-on-post";
      },
      init : true,
      apply : "_applyProhibitCaching"
    },


    /**
     * Indicate that the request is cross domain.
     *
     * A request is cross domain if the request's URL points to a host other than
     * the local host. This switches the concrete implementation that is used for
     * sending the request from qx.io.remote.transport.XmlHttp to
     * qx.io.remote.transport.Script, because only the latter can handle cross
     * domain requests.
     */
    crossDomain :
    {
      check : "Boolean",
      init : false
    },


    /**
     * Indicate that the request will be used for a file upload.
     *
     * The request will be used for a file upload.  This switches the concrete
     * implementation that is used for sending the request from
     * qx.io.remote.transport.XmlHttp to qx.io.remote.IFrameTransport, because only
     * the latter can handle file uploads.
     */
    fileUpload :
    {
      check : "Boolean",
      init : false
    },


    /**
     * The transport instance used for the request.
     *
     * This is necessary to be able to abort an asynchronous request.
     */
    transport :
    {
      check : "qx.io.remote.Exchange",
      nullable : true
    },


    /**
     * Use Basic HTTP Authentication.
     */
    useBasicHttpAuth :
    {
      check : "Boolean",
      init : false
    },

    /**
     * If true and the responseType property is set to "application/json", getContent() will
     * return a Javascript map containing the JSON contents, i. e. the result qx.lang.Json.parse().
     * If false, the raw string data will be returned and the parsing must be done manually.
     * This is usefull for special JSON dialects / extensions which are not supported by
     * qx.lang.Json.
     *
     * Note that this is currently only respected by qx.io.remote.transport.XmlHttp, i. e.
     * if the transport used is the one using XMLHttpRequests. The other transports
     * do not support JSON parsing, so this property has no effect.
     */
    parseJson :
    {
      check : "Boolean",
      init : true
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {

    __requestHeaders : null,
    __urlParameters : null,
    __dataParameters : null,
    __formFields : null,
    __seqNum : null,

    /*
    ---------------------------------------------------------------------------
      CORE METHODS
    ---------------------------------------------------------------------------
    */

    /**
     * Schedule this request for transport to server.
     *
     * The request is added to the singleton class qx.io.remote.RequestQueue's
     * list of pending requests.
     *
     * @return {void}
     */
    send : function() {
      qx.io.remote.RequestQueue.getInstance().add(this);
    },


    /**
     * Abort sending this request.
     *
     * The request is removed from the singleton class qx.io.remote.RequestQueue's
     * list of pending events. If the request haven't been scheduled this
     * method is a noop.
     *
     * @return {void}
     */
    abort : function() {
      qx.io.remote.RequestQueue.getInstance().abort(this);
    },


    /**
     * Abort sending this request if it has not already been aborted.
     *
     * @return {void}
     */
    reset : function()
    {
      switch(this.getState())
      {
        case "sending":
        case "receiving":
          this.error("Aborting already sent request!");

          // no break

        case "queued":
          this.abort();
          break;
      }
    },




    /*
    ---------------------------------------------------------------------------
      STATE ALIASES
    ---------------------------------------------------------------------------
    */

    /**
     * Determine if this request is in the configured state.
     *
     * @return {Boolean} <true> if the request is in the configured state; <false> otherwise.
     */
    isConfigured : function() {
      return this.getState() === "configured";
    },


    /**
     * Determine if this request is in the queued state.
     *
     * @return {Boolean} <true> if the request is in the queued state; <false> otherwise.
     */
    isQueued : function() {
      return this.getState() === "queued";
    },


    /**
     * Determine if this request is in the sending state.
     *
     * @return {Boolean} <true> if the request is in the sending state; <false> otherwise.
     */
    isSending : function() {
      return this.getState() === "sending";
    },


    /**
     * Determine if this request is in the receiving state.
     *
     * @return {Boolean} <true> if the request is in the receiving state; <false> otherwise.
     */
    isReceiving : function() {
      return this.getState() === "receiving";
    },


    /**
     * Determine if this request is in the completed state.
     *
     * @return {Boolean} <true> if the request is in the completed state; <false> otherwise.
     */
    isCompleted : function() {
      return this.getState() === "completed";
    },


    /**
     * Determine if this request is in the aborted state.
     *
     * @return {Boolean} <true> if the request is in the aborted state; <false> otherwise.
     */
    isAborted : function() {
      return this.getState() === "aborted";
    },


    /**
     * Determine if this request is in the timeout state.
     *
     * @return {Boolean} <true> if the request is in the timeout state; <false> otherwise.
     */
    isTimeout : function() {
      return this.getState() === "timeout";
    },


    /**
     * Determine if this request is in the failed state.
     *
     * @return {Boolean} <true> if the request is in the failed state; <false> otherwise.
     */
    isFailed : function() {
      return this.getState() === "failed";
    },




    /*
    ---------------------------------------------------------------------------
      EVENT HANDLER
    ---------------------------------------------------------------------------
    */

    /**
     * Dispatches a clone of the given event on this instance
     *
     * @param e {qx.event.type.Event} The original event
     */
    __forwardEvent : qx.event.GlobalError.observeMethod(function(e)
    {
      var clonedEvent = e.clone();
      clonedEvent.setTarget(this);
      this.dispatchEvent(clonedEvent);
    }),



    /**
     * Event handler called when the request enters the queued state.
     *
     * @param e {qx.event.type.Event} Event indicating state change
     * @return {void}
     */
    _onqueued : function(e)
    {
      // Modify internal state
      this.setState("queued");

      // Bubbling up
      this.__forwardEvent(e);
    },


    /**
     * Event handler called when the request enters the sending state.
     *
     * @param e {qx.event.type.Event} Event indicating state change
     * @return {void}
     */
    _onsending : function(e)
    {
      // Modify internal state
      this.setState("sending");

      // Bubbling up
      this.__forwardEvent(e);
    },


    /**
     * Event handler called when the request enters the receiving state.
     *
     * @param e {qx.event.type.Event} Event indicating state change
     * @return {void}
     */
    _onreceiving : function(e)
    {
      // Modify internal state
      this.setState("receiving");

      // Bubbling up
      this.__forwardEvent(e);
    },


    /**
     * Event handler called when the request enters the completed state.
     *
     * @param e {qx.event.type.Event} Event indicating state change
     * @return {void}
     */
    _oncompleted : function(e)
    {
      // Modify internal state
      this.setState("completed");

      // Bubbling up
      this.__forwardEvent(e);

      // Automatically dispose after event completion
      this.dispose();
    },


    /**
     * Event handler called when the request enters the aborted state.
     *
     * @param e {qx.event.type.Event} Event indicating state change
     * @return {void}
     */
    _onaborted : function(e)
    {
      // Modify internal state
      this.setState("aborted");

      // Bubbling up
      this.__forwardEvent(e);

      // Automatically dispose after event completion
      this.dispose();
    },


    /**
     * Event handler called when the request enters the timeout state.
     *
     * @param e {qx.event.type.Event} Event indicating state change
     * @return {void}
     */
    _ontimeout : function(e)
    {
      /*
        // User's handler can block until timeout.
        switch(this.getState())
        {
          // If we're no longer running...
          case "completed":
          case "timeout":
          case "aborted":
          case "failed":
            // then don't bubble up the timeout event
            return;
        }


    */  // Modify internal state
      this.setState("timeout");

      // Bubbling up
      this.__forwardEvent(e);

      // Automatically dispose after event completion
      this.dispose();
    },


    /**
     * Event handler called when the request enters the failed state.
     *
     * @param e {qx.event.type.Event} Event indicating state change
     * @return {void}
     */
    _onfailed : function(e)
    {
      // Modify internal state
      this.setState("failed");

      // Bubbling up
      this.__forwardEvent(e);

      // Automatically dispose after event completion
      this.dispose();
    },




    /*
    ---------------------------------------------------------------------------
      APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    // property apply
    _applyState : function(value, old)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        if (qx.core.Environment.get("qx.ioRemoteDebug")) {
          this.debug("State: " + value);
        }
      }
    },


    // property apply
    _applyProhibitCaching : function(value, old)
    {
      if (! value)
      {
        this.removeParameter("nocache");
        this.removeRequestHeader("Pragma");
        this.removeRequestHeader("Cache-Control");
        return;
      }

      // If value isn't "no-url-params-on-post" or this isn't a POST request
      if (value !== "no-url-params-on-post" ||
          this.getMethod() != "POST")
      {
        // ... then add a parameter to the URL to make it unique on each
        // request.  The actual id, "nocache" is irrelevant; it's the fact
        // that a (usually) different date is added to the URL on each request
        // that prevents caching.
        this.setParameter("nocache", new Date().valueOf());
      }
      else
      {
        // Otherwise, we don't want the nocache parameer in the URL.
        this.removeParameter("nocache");
      }

      // Add the HTTP 1.0 request to avoid use of a cache
      this.setRequestHeader("Pragma", "no-cache");

      // Add the HTTP 1.1 request to avoid use of a cache
      this.setRequestHeader("Cache-Control", "no-cache");
    },


    // property apply
    _applyMethod : function(value, old)
    {
      if (qx.io.remote.Request.methodAllowsRequestBody(value)) {
        this.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      } else {
        this.removeRequestHeader("Content-Type");
      }

      // Re-test the prohibit caching property.  We may need to add or remove
      // the "nocache" parameter.  We explicitly call the _apply method since
      // it wouldn't be called normally when setting the value to its already
      // existant value.
      var prohibitCaching = this.getProhibitCaching();
      this._applyProhibitCaching(prohibitCaching, prohibitCaching);
    },


    // property apply
    _applyResponseType : function(value, old) {
      this.setRequestHeader("X-Qooxdoo-Response-Type", value);
    },




    /*
    ---------------------------------------------------------------------------
      REQUEST HEADER
    ---------------------------------------------------------------------------
    */

    /**
     * Add a request header to the request.
     *
     * Example: request.setRequestHeader("Content-Type", "text/html")
     *
     * Please note: Some browsers, such as Safari 3 and 4, will capitalize
     * header field names. This is in accordance with RFC 2616[1], which states
     * that HTTP 1.1 header names are case-insensitive, so your server backend
     * should be case-agnostic when dealing with request headers.
     *
     * [1]{@link http://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html#sec4.2}
     *
     * @param vId {String} The identifier to use for this added header
     * @param vValue {String} The value to use for this added header
     * @return {void}
     */
    setRequestHeader : function(vId, vValue) {
      this.__requestHeaders[vId] = vValue;
    },


    /**
     * Remove a previously-added request header
     *
     * @param vId {String} The id of the header to be removed
     * @return {void}
     */
    removeRequestHeader : function(vId) {
      delete this.__requestHeaders[vId];
    },


    /**
     * Retrieve the value of a header which was previously set
     *
     * @param vId {String} The id of the header value being requested
     * @return {String} The value of the header with the specified id
     */
    getRequestHeader : function(vId) {
      return this.__requestHeaders[vId] || null;
    },


    /**
     * Return the object containing all of the headers which have been added.
     *
     * @return {Object} The returned object has as its property names each of the ids of headers
     *     which have been added, and as each property value, the value of the
     *     property corresponding to that id.
     */
    getRequestHeaders : function() {
      return this.__requestHeaders;
    },




    /*
    ---------------------------------------------------------------------------
      PARAMETERS
    ---------------------------------------------------------------------------
    */

    /**
     * Add a parameter to the request.
     *
     * @param vId {String}
     *   String identifier of the parameter to add.
     *
     * @param vValue {var}
     *   Value of parameter. May be a string (for one parameter) or an array
     *   of strings (for setting multiple parameter values with the same
     *   parameter name).
     *
     * @param bAsData {Boolean | false}
     *   If <i>false</i>, add the parameter to the URL.  If <i>true</i> then
     *   instead the parameters added by calls to this method will be combined
     *   into a string added as the request data, as if the entire set of
     *   parameters had been pre-build and passed to setData().
     *
     * Note: Parameters requested to be sent as data will be silently dropped
     *       if data is manually added via a call to setData().
     *
     * Note: Some transports, e.g. Script, do not support passing parameters
     *       as data.
     *
     * @return {void}
     */
    setParameter : function(vId, vValue, bAsData)
    {
      if (bAsData)
      {
        this.__dataParameters[vId] = vValue;
      }
      else
      {
        this.__urlParameters[vId] = vValue;
      }
    },


    /**
     * Remove a parameter from the request.
     *
     * @param vId {String}
     *   Identifier of the parameter to remove.
     *
     * @param bFromData {Boolean}
     *   If <i>false</i> then remove the parameter of the URL parameter list.
     *   If <i>true</i> then remove it from the list of parameters to be sent
     *   as request data.
     *
     * @return {void}
     */
    removeParameter : function(vId, bFromData)
    {
      if (bFromData)
      {
        delete this.__dataParameters[vId];
      }
      else
      {
        delete this.__urlParameters[vId];
      }
    },


    /**
     * Get a parameter in the request.
     *
     * @param vId {String}
     *   Identifier of the parameter to get.
     *
     * @param bFromData {Boolean}
     *   If <i>false</i> then retrieve the parameter from the URL parameter
     *   list. If <i>true</i> then retrieve it from the list of parameters to
     *   be sent as request data.
     *
     * @return {var}
     *   The requested parameter value
     *
     */
    getParameter : function(vId, bFromData)
    {
      if (bFromData)
      {
        return this.__dataParameters[vId] || null;
      }
      else
      {
        return this.__urlParameters[vId] || null;
      }
    },


    /**
     * Returns the object containg all parameters for the request.
     *
     * @param bFromData {Boolean}
     *   If <i>false</i> then retrieve the URL parameter list.
     *   If <i>true</i> then retrieve the data parameter list.
     *
     * @return {Object}
     *   The returned object has as its property names each of the ids of
     *   parameters which have been added, and as each property value, the
     *   value of the property corresponding to that id.
     */
    getParameters : function(bFromData)
    {
      return (bFromData ? this.__dataParameters : this.__urlParameters);
    },




    /*
    ---------------------------------------------------------------------------
      FORM FIELDS
    ---------------------------------------------------------------------------
    */

    /**
     * Add a form field to the POST request.
     *
     * NOTE: Adding any programatic form fields using this method will switch the
     *       Transport implementation to IframeTransport.
     *
     * NOTE: Use of these programatic form fields disallow use of synchronous
     *       requests and cross-domain requests.  Be sure that you do not need
     *       those features when setting these programatic form fields.
     *
     * @param vId {String} String identifier of the form field to add.
     * @param vValue {String} Value of form field
     * @return {void}
     */
    setFormField : function(vId, vValue) {
      this.__formFields[vId] = vValue;
    },


    /**
     * Remove a form field from the POST request.
     *
     * @param vId {String} Identifier of the form field to remove.
     * @return {void}
     */
    removeFormField : function(vId) {
      delete this.__formFields[vId];
    },


    /**
     * Get a form field in the POST request.
     *
     * @param vId {String} Identifier of the form field to get.
     * @return {String|null} Value of form field or <code>null</code> if no value
     *    exists for the passed identifier.
     */
    getFormField : function(vId) {
      return this.__formFields[vId] || null;
    },


    /**
     * Returns the object containg all form fields for the POST request.
     *
     * @return {Object} The returned object has as its property names each of the ids of
     *     form fields which have been added, and as each property value, the value
     *     of the property corresponding to that id.
     */
    getFormFields : function() {
      return this.__formFields;
    },


    /**
     * Obtain the sequence (id) number used for this request
     *
     * @return {Integer} The sequence number of this request
     */
    getSequenceNumber : function() {
      return this.__seqNum;
    }
  },




  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    this.setTransport(null);
    this.__requestHeaders = this.__urlParameters = this.__dataParameters =
      this.__formFields = null;
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
     2006 Derrell Lipman

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Derrell Lipman (derrell)

************************************************************************ */

/**
 * Handles scheduling of requests to be sent to a server.
 *
 * This class is a singleton and is used by qx.io.remote.Request to schedule its
 * requests. It should not be used directly.
 *
 * @internal
 */
qx.Class.define("qx.io.remote.RequestQueue",
{
  type : "singleton",
  extend : qx.core.Object,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    this.__queue = [];
    this.__active = [];

    this.__totalRequests = 0;

    // timeout handling
    this.__timer = new qx.event.Timer(500);
    this.__timer.addListener("interval", this._oninterval, this);
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {

    /**
     * Indicates whether queue is enabled or not.
     */
    enabled :
    {
      init : true,
      check : "Boolean",
      apply : "_applyEnabled"
    },

    /**
     * The maximum number of total requests.
     */
    maxTotalRequests :
    {
      check : "Integer",
      nullable : true
    },


    /**
     * Maximum number of parallel requests.
     */
    maxConcurrentRequests :
    {
      check : "Integer",
      init : qx.core.Environment.get("io.maxrequests")
    },


    /**
     * Default timeout for remote requests in milliseconds.
     */
    defaultTimeout :
    {
      check : "Integer",
      init : 5000
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {

    __queue : null,
    __active : null,
    __totalRequests : null,
    __timer : null,

    /*
    ---------------------------------------------------------------------------
      QUEUE HANDLING
    ---------------------------------------------------------------------------
    */


    /**
     * Get a list of queued requests
     *
     * @return {Request[]} The list of queued requests
     */
    getRequestQueue : function() {
      return this.__queue;
    },


    /**
     * Get a list of active queued requests, each one wrapped in an instance of
     * {@link qx.io.remote.Exchange}
     *
     * @return {Exchange[]} The list of active queued requests, each one
     *   wrapped in an instance of {@link qx.io.remote.Exchange}
     */
    getActiveQueue : function() {
      return this.__active;
    },


    /**
     * Generates debug output
     */
    _debug : function()
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        if (qx.core.Environment.get("qx.ioRemoteDebug"))
        {
          // Debug output
          var vText = this.__active.length + "/" + (this.__queue.length + this.__active.length);

          this.debug("Progress: " + vText);
          window.status = "Request-Queue Progress: " + vText;
        }
      }
    },


    /**
     * Checks the queue if any request is left to send and uses the transport
     * layer to send the open requests.
     * This method calls itself until every request in the queue is send.
     *
     * @return {void}
     */
    _check : function()
    {
      // Debug output
      this._debug();

      // Check queues and stop timer if not needed anymore
      if (this.__active.length == 0 && this.__queue.length == 0) {
        this.__timer.stop();
      }

      // Checking if enabled
      if (!this.getEnabled()) {
        return;
      }

      // Checking active queue fill
      if ( this.__queue.length == 0 ||(this.__queue[0].isAsynchronous() && this.__active.length >= this.getMaxConcurrentRequests())) {
        return;
      }

      // Checking number of total requests
      if (this.getMaxTotalRequests() != null && this.__totalRequests >= this.getMaxTotalRequests()) {
        return;
      }

      var vRequest = this.__queue.shift();
      var vTransport = new qx.io.remote.Exchange(vRequest);

      // Increment counter
      this.__totalRequests++;

      // Add to active queue
      this.__active.push(vTransport);

      // Debug output
      this._debug();

      // Establish event connection between qx.io.remote.Exchange and me.
      vTransport.addListener("sending", this._onsending, this);
      vTransport.addListener("receiving", this._onreceiving, this);
      vTransport.addListener("completed", this._oncompleted, this);
      vTransport.addListener("aborted", this._oncompleted, this);
      vTransport.addListener("timeout", this._oncompleted, this);
      vTransport.addListener("failed", this._oncompleted, this);

      // Store send timestamp
      vTransport._start = (new Date).valueOf();

      // Send
      vTransport.send();

      // Retry
      if (this.__queue.length > 0) {
        this._check();
      }
    },


    /**
     * Removes a transport object from the active queue and disposes the
     * transport object in order stop the request.
     *
     * @param vTransport {qx.io.remote.Exchange} Transport object
     * @return {void}
     */
    _remove : function(vTransport)
    {
      // Remove from active transports
      qx.lang.Array.remove(this.__active, vTransport);

      // Dispose transport object
      vTransport.dispose();

      // Check again
      this._check();
    },




    /*
    ---------------------------------------------------------------------------
      EVENT HANDLING
    ---------------------------------------------------------------------------
    */

    __activeCount : 0,


    /**
     * Listens for the "sending" event of the transport object and increases
     * the counter for active requests.
     *
     * @param e {qx.event.type.Event} event object
     * @return {void}
     */
    _onsending : function(e)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        if (qx.core.Environment.get("qx.ioRemoteDebug"))
        {
          this.__activeCount++;
          e.getTarget()._counted = true;

          this.debug("ActiveCount: " + this.__activeCount);
        }
      }

      e.getTarget().getRequest()._onsending(e);
    },


    /**
     * Listens for the "receiving" event of the transport object and delegate
     * the event to the current request object.
     *
     * @param e {qx.event.type.Event} event object
     * @return {void}
     */
    _onreceiving : function(e) {
      e.getTarget().getRequest()._onreceiving(e);
    },


    /**
     * Listens for the "completed" event of the transport object and decreases
     * the counter for active requests.
     *
     * @param e {qx.event.type.Event} event object
     * @return {void}
     */
    _oncompleted : function(e)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        if (qx.core.Environment.get("qx.ioRemoteDebug"))
        {
          if (e.getTarget()._counted)
          {
            this.__activeCount--;
            this.debug("ActiveCount: " + this.__activeCount);
          }
        }
      }

      // delegate the event to the handler method of the request depending
      // on the current type of the event ( completed|aborted|timeout|failed )
      var request = e.getTarget().getRequest();
      var requestHandler = "_on" + e.getType();

      // remove the request from the queue,
      // keep local reference, see [BUG #4422]
      this._remove(e.getTarget());

      // It's possible that the request handler can fail, possibly due to
      // being sent garbage data. We want to prevent that from crashing
      // the program, but instead display an error.
      try
      {
        if (request[requestHandler])
        {
          request[requestHandler](e);
        }
      }
      catch(ex)
      {
        this.error("Request " + request + " handler " + requestHandler +
          " threw an error: ", ex);

        // Issue an "aborted" event so the application gets notified.
        // If that too fails, or if there's no "aborted" handler, ignore it.
        try
        {
          if (request["_onaborted"])
          {
            var event = qx.event.Registration.createEvent("aborted",
                                                      qx.event.type.Event);
            request["_onaborted"](event);
          }
        }
        catch(ex)
        {
        }
      }
    },




    /*
    ---------------------------------------------------------------------------
      TIMEOUT HANDLING
    ---------------------------------------------------------------------------
    */

    /**
     * Listens for the "interval" event of the transport object and checks
     * if the active requests are timed out.
     *
     * @param e {qx.event.type.Event} event object
     * @return {void}
     */
    _oninterval : function(e)
    {
      var vActive = this.__active;

      if (vActive.length == 0)
      {
        this.__timer.stop();
        return;
      }

      var vCurrent = (new Date).valueOf();
      var vTransport;
      var vRequest;
      var vDefaultTimeout = this.getDefaultTimeout();
      var vTimeout;
      var vTime;

      for (var i=vActive.length-1; i>=0; i--)
      {
        vTransport = vActive[i];
        vRequest = vTransport.getRequest();

        if (vRequest.isAsynchronous())
        {
          vTimeout = vRequest.getTimeout();

          // if timer is disabled...
          if (vTimeout == 0)
          {
            // then ignore it.
            continue;
          }

          if (vTimeout == null) {
            vTimeout = vDefaultTimeout;
          }

          vTime = vCurrent - vTransport._start;

          if (vTime > vTimeout)
          {
            this.warn("Timeout: transport " + vTransport.toHashCode());
            this.warn(vTime + "ms > " + vTimeout + "ms");
            vTransport.timeout();
          }
        }
      }
    },




    /*
    ---------------------------------------------------------------------------
      MODIFIERS
    ---------------------------------------------------------------------------
    */


    // property apply
    _applyEnabled : function(value, old)
    {
      if (value) {
        this._check();
      }

      this.__timer.setEnabled(value);
    },




    /*
    ---------------------------------------------------------------------------
      CORE METHODS
    ---------------------------------------------------------------------------
    */

    /**
     * Add the request to the pending requests queue.
     *
     * @param vRequest {var} The request
     * @return {void}
     */
    add : function(vRequest)
    {
      vRequest.setState("queued");

      if (vRequest.isAsynchronous()) {
        this.__queue.push(vRequest);
      } else {
        this.__queue.unshift(vRequest);
      }

      this._check();

      if (this.getEnabled()) {
        this.__timer.start();
      }
    },


    /**
     * Remove the request from the pending requests queue.
     *
     *  The underlying transport of the request is forced into the aborted
     *  state ("aborted") and listeners of the "aborted"
     *  signal are notified about the event. If the request isn't in the
     *  pending requests queue, this method is a noop.
     *
     * @param vRequest {var} The request
     * @return {void}
     */
    abort : function(vRequest)
    {
      var vTransport = vRequest.getTransport();

      if (vTransport) {
        vTransport.abort();
      } else if (qx.lang.Array.contains(this.__queue, vRequest)) {
        qx.lang.Array.remove(this.__queue, vRequest);
      }
    }
  },




  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    this._disposeArray("__active");
    this._disposeObjects("__timer");
    this.__queue = null;
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
     2006 Derrell Lipman
     2006 STZ-IDA, Germany, http://www.stz-ida.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Derrell Lipman (derrell)
     * Andreas Junghans (lucidcake)

************************************************************************ */

/* ************************************************************************

*#use(qx.io.remote.transport.XmlHttp)
#use(qx.io.remote.transport.Iframe)
#use(qx.io.remote.transport.Script)

************************************************************************ */

/**
 * Transport layer to control which transport class (XmlHttp, Iframe or Script)
 * can be used.
 *
 * @internal
 */
qx.Class.define("qx.io.remote.Exchange",
{
  extend : qx.core.Object,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Constructor method.
   *
   * @param vRequest {qx.io.remote.Request} request object
   */
  construct : function(vRequest)
  {
    this.base(arguments);

    this.setRequest(vRequest);
    vRequest.setTransport(this);
  },




  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events : {
    /** Fired whenever a request is send */
    "sending" : "qx.event.type.Event",

    /** Fired whenever a request is received */
    "receiving" : "qx.event.type.Event",

    /** Fired whenever a request is completed */
    "completed" : "qx.io.remote.Response",

    /** Fired whenever a request is aborted */
    "aborted" : "qx.event.type.Event",

    /** Fired whenever a request has failed */
    "failed" : "qx.io.remote.Response",

    /** Fired whenever a request has timed out */
    "timeout" : "qx.io.remote.Response"
  },



  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /* ************************************************************************
       Class data, properties and methods
    ************************************************************************ */

    /*
    ---------------------------------------------------------------------------
      TRANSPORT TYPE HANDLING
    ---------------------------------------------------------------------------
    */

    /**
     * Predefined order of types.
     *
     * @internal
     */
    typesOrder : [ "qx.io.remote.transport.XmlHttp", "qx.io.remote.transport.Iframe", "qx.io.remote.transport.Script" ],

    /**
     * Marker for initialized types.
     *
     * @internal
     */
    typesReady : false,

    /**
     * Map of all available types.
     *
     * @internal
     */
    typesAvailable : {},

    /**
     * Map of all supported types.
     *
     * @internal
     */
    typesSupported : {},


    /**
     * Registers a transport type.
     * At the moment one out of XmlHttp, Iframe or Script.
     *
     * @param vClass {Object} transport class
     * @param vId {String} unique id
     * @return {void}
     */
    registerType : function(vClass, vId) {
      qx.io.remote.Exchange.typesAvailable[vId] = vClass;
    },


    /**
     * Initializes the available type of transport classes and
     * checks for the supported ones.
     *
     * @return {void}
     * @throws {Error} an error if no supported transport type is available
     */
    initTypes : function()
    {
      if (qx.io.remote.Exchange.typesReady) {
        return;
      }

      for (var vId in qx.io.remote.Exchange.typesAvailable)
      {
        var vTransporterImpl = qx.io.remote.Exchange.typesAvailable[vId];

        if (vTransporterImpl.isSupported()) {
          qx.io.remote.Exchange.typesSupported[vId] = vTransporterImpl;
        }
      }

      qx.io.remote.Exchange.typesReady = true;

      if (qx.lang.Object.isEmpty(qx.io.remote.Exchange.typesSupported)) {
        throw new Error("No supported transport types were found!");
      }
    },


    /**
     * Checks which supported transport class can handle the request with the
     * given content type.
     *
     * @param vImpl {Object} transport implementation
     * @param vNeeds {Map} requirements for the request like e.g. "cross-domain"
     * @param vResponseType {String} content type
     */
    canHandle : function(vImpl, vNeeds, vResponseType)
    {
      if (!qx.lang.Array.contains(vImpl.handles.responseTypes, vResponseType)) {
        return false;
      }

      for (var vKey in vNeeds)
      {
        if (!vImpl.handles[vKey]) {
          return false;
        }
      }

      return true;
    },




    /*
    ---------------------------------------------------------------------------
      MAPPING
    ---------------------------------------------------------------------------
    */

    /**
     *http://msdn.microsoft.com/library/default.asp?url=/library/en-us/xmlsdk/html/0e6a34e4-f90c-489d-acff-cb44242fafc6.asp
     *
     * 0: UNINITIALIZED
     * The object has been created, but not initialized (the open method has not been called).
     *
     * 1: LOADING
     * The object has been created, but the send method has not been called.
     *
     * 2: LOADED
     * The send method has been called, but the status and headers are not yet available.
     *
     * 3: INTERACTIVE
     * Some data has been received. Calling the responseBody and responseText properties at this state to obtain partial results will return an error, because status and response headers are not fully available.
     *
     * 4: COMPLETED
     * All the data has been received, and the complete data is available in the
     *
     * @internal
     */
    _nativeMap :
    {
      0 : "created",
      1 : "configured",
      2 : "sending",
      3 : "receiving",
      4 : "completed"
    },




    /*
    ---------------------------------------------------------------------------
      UTILS
    ---------------------------------------------------------------------------
    */

    /**
     * Called from the transport class when a request was completed.
     *
     * @param vStatusCode {Integer} status code of the request
     * @param vReadyState {String} readystate of the request
     * @param vIsLocal {Boolean} whether the request is a local one
     * @return {Boolean | var} Returns boolean value depending on the status code
     */
    wasSuccessful : function(vStatusCode, vReadyState, vIsLocal)
    {
      if (vIsLocal)
      {
        switch(vStatusCode)
        {
          case null:
          case 0:
            return true;

          case -1:
            // Not Available (OK for readystates: MSXML<4=1-3, MSXML>3=1-2, Gecko=1)
            return vReadyState < 4;

          default:
            // at least older versions of Safari don't set the status code for local file access
            return typeof vStatusCode === "undefined";
        }
      }
      else
      {
        switch(vStatusCode)
        {
          case -1: // Not Available (OK for readystates: MSXML<4=1-3, MSXML>3=1-2, Gecko=1)
            if (qx.core.Environment.get("qx.debug"))
            {
              if (qx.core.Environment.get("qx.ioRemoteDebug") && vReadyState > 3) {
                qx.log.Logger.debug(this, "Failed with statuscode: -1 at readyState " + vReadyState);
              }
            }

            return vReadyState < 4;

          case 200: // OK
          case 304: // Not Modified
            return true;

          case 201: // Created
          case 202: // Accepted
          case 203: // Non-Authoritative Information
          case 204: // No Content
          case 205: // Reset Content
            return true;

          case 206: // Partial Content
            if (qx.core.Environment.get("qx.debug"))
            {
              if (qx.core.Environment.get("qx.ioRemoteDebug") && vReadyState === 4) {
                qx.log.Logger.debug(this, "Failed with statuscode: 206 (Partial content while being complete!)");
              }
            }

            return vReadyState !== 4;

          case 300: // Multiple Choices
          case 301: // Moved Permanently
          case 302: // Moved Temporarily
          case 303: // See Other
          case 305: // Use Proxy
          case 400: // Bad Request
          case 401: // Unauthorized
          case 402: // Payment Required
          case 403: // Forbidden
          case 404: // Not Found
          case 405: // Method Not Allowed
          case 406: // Not Acceptable
          case 407: // Proxy Authentication Required
          case 408: // Request Time-Out
          case 409: // Conflict
          case 410: // Gone
          case 411: // Length Required
          case 412: // Precondition Failed
          case 413: // Request Entity Too Large
          case 414: // Request-URL Too Large
          case 415: // Unsupported Media Type
          case 500: // Server Error
          case 501: // Not Implemented
          case 502: // Bad Gateway
          case 503: // Out of Resources
          case 504: // Gateway Time-Out
          case 505: // HTTP Version not supported
            if (qx.core.Environment.get("qx.debug"))
            {
              if (qx.core.Environment.get("qx.ioRemoteDebug")) {
                qx.log.Logger.debug(this, "Failed with typical HTTP statuscode: " + vStatusCode);
              }
            }

            return false;


            // The following case labels are wininet.dll error codes that may
            // be encountered.

            // Server timeout
          case 12002:
            // Internet Name Not Resolved
          case 12007:
            // 12029 to 12031 correspond to dropped connections.
          case 12029:
          case 12030:
          case 12031:
            // Connection closed by server.
          case 12152:
            // See above comments for variable status.
          case 13030:
            if (qx.core.Environment.get("qx.debug"))
            {
              if (qx.core.Environment.get("qx.ioRemoteDebug")) {
                qx.log.Logger.debug(this, "Failed with MSHTML specific HTTP statuscode: " + vStatusCode);
              }
            }

            return false;

          default:
            // Handle all 20x status codes as OK as defined in the corresponding RFC
            // http://www.w3.org/Protocols/rfc2616/rfc2616.html
            if (vStatusCode > 206 && vStatusCode < 300) {
              return true;
            }

            qx.log.Logger.debug(this, "Unknown status code: " + vStatusCode + " (" + vReadyState + ")");
            return false;
        }
      }
    },


    /**
     * Status code to string conversion
     *
     * @param vStatusCode {Integer} request status code
     * @return {string} String presentation of status code
     */
    statusCodeToString : function(vStatusCode)
    {
      switch(vStatusCode)
      {
        case -1:
          return "Not available";

        case 0:
          // Attempt to generate a potentially meaningful error.
          // Get the current URL
          var url = window.location.href;

          // Are we on a local page obtained via file: protocol?
          if (qx.lang.String.startsWith(url.toLowerCase(), "file:"))
          {
            // Yup. Can't issue remote requests from here.
            return ("Unknown status code. " +
                    "Possibly due to application URL using 'file:' protocol?");
          }
          else
          {
            return ("Unknown status code. " +
                    "Possibly due to a cross-domain request?");
          }
          break;

        case 200:
          return "Ok";

        case 304:
          return "Not modified";

        case 206:
          return "Partial content";

        case 204:
          return "No content";

        case 300:
          return "Multiple choices";

        case 301:
          return "Moved permanently";

        case 302:
          return "Moved temporarily";

        case 303:
          return "See other";

        case 305:
          return "Use proxy";

        case 400:
          return "Bad request";

        case 401:
          return "Unauthorized";

        case 402:
          return "Payment required";

        case 403:
          return "Forbidden";

        case 404:
          return "Not found";

        case 405:
          return "Method not allowed";

        case 406:
          return "Not acceptable";

        case 407:
          return "Proxy authentication required";

        case 408:
          return "Request time-out";

        case 409:
          return "Conflict";

        case 410:
          return "Gone";

        case 411:
          return "Length required";

        case 412:
          return "Precondition failed";

        case 413:
          return "Request entity too large";

        case 414:
          return "Request-URL too large";

        case 415:
          return "Unsupported media type";

        case 500:
          return "Server error";

        case 501:
          return "Not implemented";

        case 502:
          return "Bad gateway";

        case 503:
          return "Out of resources";

        case 504:
          return "Gateway time-out";

        case 505:
          return "HTTP version not supported";

        case 12002:
          return "Server timeout";

        case 12029:
          return "Connection dropped";

        case 12030:
          return "Connection dropped";

        case 12031:
          return "Connection dropped";

        case 12152:
          return "Connection closed by server";

        case 13030:
          return "MSHTML-specific HTTP status code";

        default:
          return "Unknown status code";
      }
    }
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /** Set the request to send with this transport. */
    request :
    {
      check : "qx.io.remote.Request",
      nullable : true
    },


    /**
     * Set the implementation to use to send the request with.
     *
     *  The implementation should be a subclass of qx.io.remote.transport.Abstract and
     *  must implement all methods in the transport API.
     */
    implementation :
    {
      check : "qx.io.remote.transport.Abstract",
      nullable : true,
      apply : "_applyImplementation"
    },

    /** Current state of the transport layer. */
    state :
    {
      check : [ "configured", "sending", "receiving", "completed", "aborted", "timeout", "failed" ],
      init : "configured",
      event : "changeState",
      apply : "_applyState"
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      CORE METHODS
    ---------------------------------------------------------------------------
    */

    /**
     * Sends the request.
     *
     * @return {var | Boolean} Returns true if the request was sent.
     */
    send : function()
    {
      var vRequest = this.getRequest();

      if (!vRequest) {
        return this.error("Please attach a request object first");
      }

      qx.io.remote.Exchange.initTypes();

      var vUsage = qx.io.remote.Exchange.typesOrder;
      var vSupported = qx.io.remote.Exchange.typesSupported;

      // Mapping settings to contenttype and needs to check later
      // if the selected transport implementation can handle
      // fulfill these requirements.
      var vResponseType = vRequest.getResponseType();
      var vNeeds = {};

      if (vRequest.getAsynchronous()) {
        vNeeds.asynchronous = true;
      } else {
        vNeeds.synchronous = true;
      }

      if (vRequest.getCrossDomain()) {
        vNeeds.crossDomain = true;
      }

      if (vRequest.getFileUpload()) {
        vNeeds.fileUpload = true;
      }

      // See if there are any programtic form fields requested
      for (var field in vRequest.getFormFields())
      {
        // There are.
        vNeeds.programaticFormFields = true;

        // No need to search further
        break;
      }

      var vTransportImpl, vTransport;

      for (var i=0, l=vUsage.length; i<l; i++)
      {
        vTransportImpl = vSupported[vUsage[i]];

        if (vTransportImpl)
        {
          if (!qx.io.remote.Exchange.canHandle(vTransportImpl, vNeeds, vResponseType)) {
            continue;
          }

          try
          {
            if (qx.core.Environment.get("qx.debug"))
            {
              if (qx.core.Environment.get("qx.ioRemoteDebug")) {
                this.debug("Using implementation: " + vTransportImpl.classname);
              }
            }

            vTransport = new vTransportImpl;
            this.setImplementation(vTransport);

            vTransport.setUseBasicHttpAuth(vRequest.getUseBasicHttpAuth());

            vTransport.send();
            return true;
          }
          catch(ex)
          {
            this.error("Request handler throws error");
            this.error(ex);
            return;
          }
        }
      }

      this.error("There is no transport implementation available to handle this request: " + vRequest);
    },


    /**
     * Force the transport into the aborted ("aborted")
     *  state.
     *
     * @return {void}
     */
    abort : function()
    {
      var vImplementation = this.getImplementation();

      if (vImplementation)
      {
        if (qx.core.Environment.get("qx.debug"))
        {
          if (qx.core.Environment.get("qx.ioRemoteDebug")) {
            this.debug("Abort: implementation " + vImplementation.toHashCode());
          }
        }

        vImplementation.abort();
      }
      else
      {
        if (qx.core.Environment.get("qx.debug"))
        {
          if (qx.core.Environment.get("qx.ioRemoteDebug")) {
            this.debug("Abort: forcing state to be aborted");
          }
        }

        this.setState("aborted");
      }
    },


    /**
     * Force the transport into the timeout state.
     *
     * @return {void}
     */
    timeout : function()
    {
      var vImplementation = this.getImplementation();

      if (vImplementation)
      {
        var str = "";
        for (var key in vImplementation.getParameters())
        {
          str += "&" + key + "=" + vImplementation.getParameters()[key];
        }
        this.warn("Timeout: implementation " + vImplementation.toHashCode() + ", "
                  + vImplementation.getUrl() + " [" + vImplementation.getMethod() + "], " + str);
        vImplementation.timeout();
      }
      else
      {
        this.warn("Timeout: forcing state to timeout");
        this.setState("timeout");
      }

      // Disable future timeouts in case user handler blocks
      this.__disableRequestTimeout();
    },


    /*
    ---------------------------------------------------------------------------
      PRIVATES
    ---------------------------------------------------------------------------
    */

    /**
     * Disables the timer of the request to prevent that the timer is expiring
     * even if the user handler (e.g. "completed") was already called.
     *
     * @return {void}
     */
    __disableRequestTimeout : function() {
      var vRequest = this.getRequest();
      if (vRequest) {
        vRequest.setTimeout(0);
      }
    },




    /*
    ---------------------------------------------------------------------------
      EVENT HANDLER
    ---------------------------------------------------------------------------
    */

    /**
     * Event listener for "sending" event.
     *
     * @param e {qx.event.type.Event} event object
     * @return {void}
     */
    _onsending : function(e) {
      this.setState("sending");
    },


    /**
     * Event listener for "receiving" event.
     *
     * @param e {qx.event.type.Event} event object
     * @return {void}
     */
    _onreceiving : function(e) {
      this.setState("receiving");
    },


    /**
     * Event listener for "completed" event.
     *
     * @param e {qx.event.type.Event} event object
     * @return {void}
     */
    _oncompleted : function(e) {
      this.setState("completed");
    },


    /**
     * Event listener for "abort" event.
     *
     * @param e {qx.event.type.Event} event object
     * @return {void}
     */
    _onabort : function(e) {
      this.setState("aborted");
    },


    /**
     * Event listener for "failed" event.
     *
     * @param e {qx.event.type.Event} event object
     * @return {void}
     */
    _onfailed : function(e) {
      this.setState("failed");
    },


    /**
     * Event listener for "timeout" event.
     *
     * @param e {qx.event.type.Event} event object
     * @return {void}
     */
    _ontimeout : function(e) {
      this.setState("timeout");
    },




    /*
    ---------------------------------------------------------------------------
      APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    /**
     * Apply method for the implementation property.
     *
     * @param value {var} Current value
     * @param old {var} Previous value
     */
    _applyImplementation : function(value, old)
    {
      if (old)
      {
        old.removeListener("sending", this._onsending, this);
        old.removeListener("receiving", this._onreceiving, this);
        old.removeListener("completed", this._oncompleted, this);
        old.removeListener("aborted", this._onabort, this);
        old.removeListener("timeout", this._ontimeout, this);
        old.removeListener("failed", this._onfailed, this);
      }

      if (value)
      {
        var vRequest = this.getRequest();

        value.setUrl(vRequest.getUrl());
        value.setMethod(vRequest.getMethod());
        value.setAsynchronous(vRequest.getAsynchronous());

        value.setUsername(vRequest.getUsername());
        value.setPassword(vRequest.getPassword());

        value.setParameters(vRequest.getParameters(false));
        value.setFormFields(vRequest.getFormFields());
        value.setRequestHeaders(vRequest.getRequestHeaders());

        // Set the parseJson property which is currently only supported for XmlHttp transport
        // (which is the only transport supporting JSON parsing so far).
        if (value instanceof qx.io.remote.transport.XmlHttp){
          value.setParseJson(vRequest.getParseJson());
        }

        var data = vRequest.getData();
        if (data === null)
        {
          var vParameters = vRequest.getParameters(true);
          var vParametersList = [];

          for (var vId in vParameters)
          {
            var paramValue = vParameters[vId];

            if (paramValue instanceof Array)
            {
              for (var i=0; i<paramValue.length; i++)
              {
                vParametersList.push(encodeURIComponent(vId) +
                                     "=" +
                                     encodeURIComponent(paramValue[i]));
              }
            }
            else
            {
              vParametersList.push(encodeURIComponent(vId) +
                                   "=" +
                                   encodeURIComponent(paramValue));
            }
          }

          if (vParametersList.length > 0)
          {
            value.setData(vParametersList.join("&"));
          }
        }
        else
        {
          value.setData(data);
        }

        value.setResponseType(vRequest.getResponseType());

        value.addListener("sending", this._onsending, this);
        value.addListener("receiving", this._onreceiving, this);
        value.addListener("completed", this._oncompleted, this);
        value.addListener("aborted", this._onabort, this);
        value.addListener("timeout", this._ontimeout, this);
        value.addListener("failed", this._onfailed, this);
      }
    },


    /**
     * Apply method for the state property.
     *
     * @param value {var} Current value
     * @param old {var} Previous value
     */
    _applyState : function(value, old)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        if (qx.core.Environment.get("qx.ioRemoteDebug")) {
          this.debug("State: " + old + " => " + value);
        }
      }

      switch(value)
      {
        case "sending":
          this.fireEvent("sending");
          break;

        case "receiving":
          this.fireEvent("receiving");
          break;

        case "completed":
        case "aborted":
        case "timeout":
        case "failed":
          var vImpl = this.getImplementation();

          if (!vImpl)
          {
            // implementation has already been disposed
            break;
          }


          // Disable future timeouts in case user handler blocks
          this.__disableRequestTimeout();

          if (this.hasListener(value))
          {
            var vResponse = qx.event.Registration.createEvent(value, qx.io.remote.Response);

            if (value == "completed")
            {
              var vContent = vImpl.getResponseContent();
              vResponse.setContent(vContent);

              /*
               * Was there acceptable content?  This might occur, for example, if
               * the web server was shut down unexpectedly and thus the connection
               * closed with no data having been sent.
               */

              if (vContent === null)
              {
                // Nope.  Change COMPLETED to FAILED.
                if (qx.core.Environment.get("qx.debug"))
                {
                  if (qx.core.Environment.get("qx.ioRemoteDebug")) {
                    this.debug("Altered State: " + value + " => failed");
                  }
                }

                value = "failed";
              }
            }
            else if (value == "failed")
            {
              vResponse.setContent(vImpl.getResponseContent());
            }

            vResponse.setStatusCode(vImpl.getStatusCode());
            vResponse.setResponseHeaders(vImpl.getResponseHeaders());

            this.dispatchEvent(vResponse);

          }

          // Disconnect and dispose implementation
          this.setImplementation(null);
          vImpl.dispose();

          // Fire event to listeners
          //this.fireDataEvent(vEventType, vResponse);

          break;
      }
    }
  },




  /*
  *****************************************************************************
     ENVIRONMENT SETTINGS
  *****************************************************************************
  */

  environment : {
    "qx.ioRemoteDebug"       : false,
    "qx.ioRemoteDebugData"   : false
  },




  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    var vImpl = this.getImplementation();

    if (vImpl)
    {
      this.setImplementation(null);
      vImpl.dispose();
    }

    this.setRequest(null);
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

************************************************************************ */

/**
 * Abstract for all transport implementations
 */
qx.Class.define("qx.io.remote.transport.Abstract",
{
  type : "abstract",
  extend : qx.core.Object,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    this.setRequestHeaders({});
    this.setParameters({});
    this.setFormFields({});
  },




  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events : {
    /** Event when a request is created */
    "created" : "qx.event.type.Event",

    /** Event when a request is configured */
    "configured" : "qx.event.type.Event",

    /** Event when a request is send */
    "sending" : "qx.event.type.Event",

    /** Event when a request is received */
    "receiving" : "qx.event.type.Event",

    /** Event when a request is completed */
    "completed" : "qx.event.type.Event",

    /** Event when a request is aborted */
    "aborted" : "qx.event.type.Event",

    /** Event when a request has failed */
    "failed" : "qx.event.type.Event",

    /** Event when a request has timed out */
    "timeout" : "qx.event.type.Event"
  },



  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /** Target url to issue the request to */
    url :
    {
      check : "String",
      nullable : true
    },


    /** Determines what type of request to issue */
    method :
    {
      check : "String",
      nullable : true,
      init : "GET"
    },


    /** Set the request to asynchronous */
    asynchronous :
    {
      check : "Boolean",
      nullable : true,
      init : true
    },


    /** Set the data to be sent via this request */
    data :
    {
      check : "String",
      nullable : true
    },


    /** Username to use for HTTP authentication */
    username :
    {
      check : "String",
      nullable : true
    },


    /** Password to use for HTTP authentication */
    password :
    {
      check : "String",
      nullable : true
    },


    /** The state of the current request */
    state :
    {
      check : [ "created", "configured", "sending", "receiving", "completed", "aborted", "timeout", "failed" ],
      init : "created",
      event : "changeState",
      apply : "_applyState"
    },


    /** Request headers */
    requestHeaders :
    {
      check : "Object",
      nullable : true
    },


    /** Request parameters to send. */
    parameters :
    {
      check : "Object",
      nullable : true
    },


    /** Request form fields to send. */
    formFields :
    {
      check : "Object",
      nullable : true
    },


    /** Response Type */
    responseType :
    {
      check : "String",
      nullable : true
    },


    /** Use Basic HTTP Authentication */
    useBasicHttpAuth :
    {
      check : "Boolean",
      nullable : true
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      USER METHODS
    ---------------------------------------------------------------------------
    */

    /**
     * Sending a request.
     *
     * This method is virtual and concrete subclasses are supposed to
     * implement it.
     *
     * @abstract
     * @return {void}
     * @throws the abstract function warning.
     */
    send : function() {
      throw new Error("send is abstract");
    },


    /**
     * Force the transport into the aborted state ("aborted").
     *
     * Listeners of the "aborted" signal are notified about the event.
     *
     * @return {void}
     */
    abort : function()
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        if (qx.core.Environment.get("qx.ioRemoteDebug")) {
          this.warn("Aborting...");
        }
      }

      this.setState("aborted");
    },


    /**
     * Force the transport into the timeout state ("timeout").
     *
     * Listeners of the "timeout" signal are notified about the event.
     *
     * @return {void}
     */
    timeout : function()
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        if (qx.core.Environment.get("qx.ioRemoteDebug")) {
          this.warn("Timeout...");
        }
      }

      this.setState("timeout");
    },


    /**
     * Force the transport into the failed state ("failed").
     *
     * Listeners of the "failed" signal are notified about the event.
     *
     * @return {void}
     */
    failed : function()
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        if (qx.core.Environment.get("qx.ioRemoteDebug")) {
          this.warn("Failed...");
        }
      }

      this.setState("failed");
    },




    /*
    ---------------------------------------------------------------------------
      REQUEST HEADER SUPPORT
    ---------------------------------------------------------------------------
    */

    /**
     * Add a request header to this transports qx.io.remote.Request.
     *
     * This method is virtual and concrete subclasses are supposed to
     * implement it.
     *
     * @abstract
     * @param vLabel {String} Request header name
     * @param vValue {var} Value for the header
     * @return {void}
     * @throws the abstract function warning.
     */
    setRequestHeader : function(vLabel, vValue) {
      throw new Error("setRequestHeader is abstract");
    },




    /*
    ---------------------------------------------------------------------------
      RESPONSE HEADER SUPPORT
    ---------------------------------------------------------------------------
    */

    /**
     * Returns the request header of the request.
     *
     * This method is virtual and concrete subclasses are supposed to
     * implement it.
     *
     * @abstract
     * @param vLabel {String} Response header name
     * @return {Object}
     * @throws the abstract function warning.
     */
    getResponseHeader : function(vLabel) {
      throw new Error("getResponseHeader is abstract");
    },


    /**
     * Provides an hash of all response headers.
     *
     * This method is virtual and concrete subclasses are supposed to
     * implement it.
     *
     * @abstract
     * @return {Object}
     * @throws the abstract function warning.
     */
    getResponseHeaders : function() {
      throw new Error("getResponseHeaders is abstract");
    },




    /*
    ---------------------------------------------------------------------------
      STATUS SUPPORT
    ---------------------------------------------------------------------------
    */

    /**
     * Returns the current status code of the request if available or -1 if not.
     *
     * This method is virtual and concrete subclasses are supposed to
     * implement it.
     *
     * @abstract
     * @return {Integer}
     * @throws the abstract function warning.
     */
    getStatusCode : function() {
      throw new Error("getStatusCode is abstract");
    },


    /**
     * Provides the status text for the current request if available and null otherwise.
     *
     * This method is virtual and concrete subclasses are supposed to
     * implement it.
     *
     * @abstract
     * @return {String}
     * @throws the abstract function warning.
     */
    getStatusText : function() {
      throw new Error("getStatusText is abstract");
    },




    /*
    ---------------------------------------------------------------------------
      RESPONSE DATA SUPPORT
    ---------------------------------------------------------------------------
    */

    /**
     * Provides the response text from the request when available and null otherwise.
     * By passing true as the "partial" parameter of this method, incomplete data will
     * be made available to the caller.
     *
     * This method is virtual and concrete subclasses are supposed to
     * implement it.
     *
     * @abstract
     * @return {String}
     * @throws the abstract function warning.
     */
    getResponseText : function() {
      throw new Error("getResponseText is abstract");
    },


    /**
     * Provides the XML provided by the response if any and null otherwise.
     * By passing true as the "partial" parameter of this method, incomplete data will
     * be made available to the caller.
     *
     * This method is virtual and concrete subclasses are supposed to
     * implement it.
     *
     * @abstract
     * @return {Object}
     * @throws the abstract function warning.
     */
    getResponseXml : function() {
      throw new Error("getResponseXml is abstract");
    },


    /**
     * Returns the length of the content as fetched thus far.
     *
     * This method is virtual and concrete subclasses are supposed to
     * implement it.
     *
     * @abstract
     * @return {Integer}
     * @throws the abstract function warning.
     */
    getFetchedLength : function() {
      throw new Error("getFetchedLength is abstract");
    },




    /*
    ---------------------------------------------------------------------------
      APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    /**
     * Apply method for "state" property. For each state value a corresponding
     * event is fired to inform the listeners.
     *
     * @param value {var} Current value
     * @param old {var} Previous value
     */
    _applyState : function(value, old)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        if (qx.core.Environment.get("qx.ioRemoteDebug")) {
          this.debug("State: " + value);
        }
      }

      switch(value)
      {
        case "created":
          this.fireEvent("created");
          break;

        case "configured":
          this.fireEvent("configured");
          break;

        case "sending":
          this.fireEvent("sending");
          break;

        case "receiving":
          this.fireEvent("receiving");
          break;

        case "completed":
          this.fireEvent("completed");
          break;

        case "aborted":
          this.fireEvent("aborted");
          break;

        case "failed":
          this.fireEvent("failed");
          break;

        case "timeout":
          this.fireEvent("timeout");
          break;
      }

      return true;
    }
  },


  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    this.setRequestHeaders(null);
    this.setParameters(null);
    this.setFormFields(null);
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
     2006 Derrell Lipman
     2006 STZ-IDA, Germany, http://www.stz-ida.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Derrell Lipman (derrell)
     * Andreas Junghans (lucidcake)

************************************************************************ */

/* ************************************************************************

#asset(qx/static/blank.gif)

************************************************************************ */

/**
 * Transports requests to a server using an IFRAME.
 *
 * This class should not be used directly by client programmers.
 */
qx.Class.define("qx.io.remote.transport.Iframe",
{
  extend : qx.io.remote.transport.Abstract,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    // Unique identifiers for iframe and form
    var vUniqueId = (new Date).valueOf();
    var vFrameName = "frame_" + vUniqueId;
    var vFormName = "form_" + vUniqueId;

    // This is to prevent the "mixed secure and insecure content" warning in IE with https
    var vFrameSource;
    if ((qx.core.Environment.get("engine.name") == "mshtml")) {
      vFrameSource = "javascript:void(0)";
    }

    // Create a hidden iframe.
    // The purpose of the iframe is to receive data coming back from the server (see below).
    this.__frame = qx.bom.Iframe.create({id: vFrameName, name: vFrameName, src: vFrameSource});

    qx.bom.element.Style.set(this.__frame, "display", "none");

    // Create form element with textarea as conduit for request data.
    // The target of the form is the hidden iframe, which means the response
    // coming back from the server is written into the iframe.
    this.__form = qx.bom.Element.create("form", {id: vFormName, name: vFormName, target: vFrameName});
    qx.bom.element.Style.set(this.__form, "display", "none");
    qx.dom.Element.insertEnd(this.__form, qx.dom.Node.getBodyElement(document));

    this.__data = qx.bom.Element.create("textarea", {id: "_data_", name: "_data_"});
    qx.dom.Element.insertEnd(this.__data, this.__form);

    // Finally, attach iframe to DOM and add listeners
    qx.dom.Element.insertEnd(this.__frame, qx.dom.Node.getBodyElement(document));
    qx.event.Registration.addListener(this.__frame, "load", this._onload, this);

    // qx.event.handler.Iframe does not yet support the readystatechange event
    this.__onreadystatechangeWrapper = qx.lang.Function.listener(this._onreadystatechange, this);
    qx.bom.Event.addNativeListener(this.__frame, "readystatechange", this.__onreadystatechangeWrapper);
  },




  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /**
     * Capabilities of this transport type.
     *
     * @internal
     */
    handles :
    {
      synchronous           : false,
      asynchronous          : true,
      crossDomain           : false,
      fileUpload            : true,
      programaticFormFields : true,
      responseTypes         : [ "text/plain", "text/javascript", "application/json", "application/xml", "text/html" ]
    },


    /**
     * Returns always true, because iframe transport is supported by all browsers.
     *
     * @return {Boolean}
     */
    isSupported : function() {
      return true;
    },




    /*
    ---------------------------------------------------------------------------
      EVENT LISTENER
    ---------------------------------------------------------------------------
    */

    /**
     * For reference:
     * http://msdn.microsoft.com/workshop/author/dhtml/reference/properties/readyState_1.asp
     *
     * @internal
     */
    _numericMap :
    {
      "uninitialized" : 1,
      "loading"       : 2,
      "loaded"        : 2,
      "interactive"   : 3,
      "complete"      : 4
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {

    __data : null,
    __lastReadyState : 0,
    __form : null,
    __frame : null,
    __onreadystatechangeWrapper : null,

    /*
    ---------------------------------------------------------------------------
      USER METHODS
    ---------------------------------------------------------------------------
    */

    /**
     * Sends a request with the use of a form.
     *
     * @return {void}
     */
    send : function()
    {
      var vMethod = this.getMethod();
      var vUrl = this.getUrl();

      // --------------------------------------
      //   Adding parameters
      // --------------------------------------
      var vParameters = this.getParameters(false);
      var vParametersList = [];

      for (var vId in vParameters)
      {
        var value = vParameters[vId];

        if (value instanceof Array)
        {
          for (var i=0; i<value.length; i++) {
            vParametersList.push(encodeURIComponent(vId) + "=" + encodeURIComponent(value[i]));
          }
        }
        else
        {
          vParametersList.push(encodeURIComponent(vId) + "=" + encodeURIComponent(value));
        }
      }

      if (vParametersList.length > 0) {
        vUrl += (vUrl.indexOf("?") >= 0 ? "&" : "?") + vParametersList.join("&");
      }

      // --------------------------------------------------------
      //   Adding data parameters (if no data is already present)
      // --------------------------------------------------------
      if (this.getData() === null)
      {
        var vParameters = this.getParameters(true);
        var vParametersList = [];

        for (var vId in vParameters)
        {
          var value = vParameters[vId];

          if (value instanceof Array)
          {
            for (var i=0; i<value.length; i++)
            {
              vParametersList.push(encodeURIComponent(vId) +
                                   "=" +
                                   encodeURIComponent(value[i]));
            }
          }
          else
          {
            vParametersList.push(encodeURIComponent(vId) +
                                 "=" +
                                 encodeURIComponent(value));
          }
        }

        if (vParametersList.length > 0)
        {
          this.setData(vParametersList.join("&"));
        }
      }

      // --------------------------------------
      //   Adding form fields
      // --------------------------------------
      var vFormFields = this.getFormFields();

      for (var vId in vFormFields)
      {
        var vField = document.createElement("textarea");
        vField.name = vId;
        vField.appendChild(document.createTextNode(vFormFields[vId]));
        this.__form.appendChild(vField);
      }

      // --------------------------------------
      //   Preparing form
      // --------------------------------------
      this.__form.action = vUrl;
      this.__form.method = vMethod;

      // --------------------------------------
      //   Sending data
      // --------------------------------------
      this.__data.appendChild(document.createTextNode(this.getData()));
      this.__form.submit();
      this.setState("sending");
    },


    /**
     * Converting complete state to numeric value and update state property
     *
     * @signature function(e)
     * @param e {qx.event.type.Event} event object
     */
    _onload : qx.event.GlobalError.observeMethod(function(e)
    {

      // Timing-issue in Opera
      // Do not switch state to complete in case load event fires before content
      // of iframe was updated
      if (qx.core.Environment.get("engine.name") == "opera" && this.getIframeHtmlContent() == "") {
        return;
      }

      if (this.__form.src) {
        return;
      }

      this._switchReadyState(qx.io.remote.transport.Iframe._numericMap.complete);
    }),


    /**
     * Converting named readyState to numeric value and update state property
     *
     * @signature function(e)
     * @param e {qx.event.type.Event} event object
     */
    _onreadystatechange : qx.event.GlobalError.observeMethod(function(e) {
      this._switchReadyState(qx.io.remote.transport.Iframe._numericMap[this.__frame.readyState]);
    }),


    /**
     * Switches the readystate by setting the internal state.
     *
     * @param vReadyState {String} readystate value
     */
    _switchReadyState : function(vReadyState)
    {
      // Ignoring already stopped requests
      switch(this.getState())
      {
        case "completed":
        case "aborted":
        case "failed":
        case "timeout":
          this.warn("Ignore Ready State Change");
          return;
      }

      // Updating internal state
      while (this.__lastReadyState < vReadyState) {
        this.setState(qx.io.remote.Exchange._nativeMap[++this.__lastReadyState]);
      }
    },




    /*
    ---------------------------------------------------------------------------
      REQUEST HEADER SUPPORT
    ---------------------------------------------------------------------------
    */

    /**
     * Sets a request header with the given value.
     *
     * This method is not implemented at the moment.
     *
     * @param vLabel {String} request header name
     * @param vValue {var} request header value
     * @return {void}
     */
    setRequestHeader : function(vLabel, vValue) {},

    // TODO
    // throw new Error("setRequestHeader is abstract");
    /*
    ---------------------------------------------------------------------------
      RESPONSE HEADER SUPPORT
    ---------------------------------------------------------------------------
    */

    /**
     * Returns the value of the given response header.
     *
     * This method is not implemented at the moment and returns always "null".
     *
     * @param vLabel {String} Response header name
     * @return {null} Returns null
     */
    getResponseHeader : function(vLabel) {
      return null;
    },

    /**
     * Provides an hash of all response headers.
     *
     * This method is not implemented at the moment and returns an empty map.
     *
     * @return {Map} empty map
     */
    getResponseHeaders : function() {
      return {};
    },

    /*
    ---------------------------------------------------------------------------
      STATUS SUPPORT
    ---------------------------------------------------------------------------
    */

    /**
     * Returns the current status code of the request if available or -1 if not.
     * This method needs implementation (returns always 200).
     *
     * @return {Integer} status code
     */
    getStatusCode : function() {
      return 200;
    },

    /**
     * Provides the status text for the current request if available and null otherwise.
     * This method needs implementation (returns always an empty string)
     *
     * @return {String} status code text
     */
    getStatusText : function() {
      return "";
    },

    /*
    ---------------------------------------------------------------------------
      FRAME UTILITIES
    ---------------------------------------------------------------------------
    */

    /**
     * Returns the DOM window object of the used iframe.
     *
     * @return {Object} DOM window object
     */
    getIframeWindow : function() {
      return qx.bom.Iframe.getWindow(this.__frame);
    },


    /**
     * Returns the document node of the used iframe.
     *
     * @return {Object} document node
     */
    getIframeDocument : function() {
      return qx.bom.Iframe.getDocument(this.__frame);
    },


    /**
     * Returns the body node of the used iframe.
     *
     * @return {Object} body node
     */
    getIframeBody : function() {
      return qx.bom.Iframe.getBody(this.__frame);
    },




    /*
    ---------------------------------------------------------------------------
      RESPONSE DATA SUPPORT
    ---------------------------------------------------------------------------
    */

    /**
     * Returns the iframe content (innerHTML) as text.
     *
     * @return {String} iframe content as text
     */
    getIframeTextContent : function()
    {
      var vBody = this.getIframeBody();

      if (!vBody) {
        return null;
      }

      if (!vBody.firstChild) {
        return "";
      }

      // Mshtml returns the content inside a PRE
      // element if we use plain text
      if (vBody.firstChild.tagName &&
          vBody.firstChild.tagName.toLowerCase() == "pre") {
        return vBody.firstChild.innerHTML;
      } else {
        return vBody.innerHTML;
      }
    },


    /**
     * Returns the iframe content as HTML.
     *
     * @return {String} iframe content as HTML
     */
    getIframeHtmlContent : function()
    {
      var vBody = this.getIframeBody();
      return vBody ? vBody.innerHTML : null;
    },


    /**
     * Returns the length of the content as fetched thus far.
     * This method needs implementation (returns always 0).
     *
     * @return {Integer} Returns 0
     */
    getFetchedLength : function() {
      return 0;
    },

    /**
     * Returns the content of the response
     *
     * @return {null | String} null or text of the response (=iframe content).
     */
    getResponseContent : function()
    {
      if (this.getState() !== "completed")
      {
        if (qx.core.Environment.get("qx.debug"))
        {
          if (qx.core.Environment.get("qx.ioRemoteDebug")) {
            this.warn("Transfer not complete, ignoring content!");
          }
        }

        return null;
      }

      if (qx.core.Environment.get("qx.debug"))
      {
        if (qx.core.Environment.get("qx.ioRemoteDebug")) {
          this.debug("Returning content for responseType: " + this.getResponseType());
        }
      }

      var vText = this.getIframeTextContent();

      switch(this.getResponseType())
      {
        case "text/plain":
          if (qx.core.Environment.get("qx.debug"))
          {
            if (qx.core.Environment.get("qx.ioRemoteDebugData"))
            {
              this.debug("Response: " + this._responseContent);
            }
          }
          return vText;
          break;

        case "text/html":
          vText = this.getIframeHtmlContent();
          if (qx.core.Environment.get("qx.debug"))
          {
            if (qx.core.Environment.get("qx.ioRemoteDebugData"))
            {
              this.debug("Response: " + this._responseContent);
            }
          }
          return vText;
          break;

        case "application/json":
          vText = this.getIframeHtmlContent();
          if (qx.core.Environment.get("qx.debug"))
          {
            if (qx.core.Environment.get("qx.ioRemoteDebugData"))
            {
              this.debug("Response: " + this._responseContent);
            }
          }

          try {
            return vText && vText.length > 0 ? qx.lang.Json.parse(vText) : null;
          } catch(ex) {
            return this.error("Could not execute json: (" + vText + ")", ex);
          }

        case "text/javascript":
          vText = this.getIframeHtmlContent();
          if (qx.core.Environment.get("qx.debug"))
          {
            if (qx.core.Environment.get("qx.ioRemoteDebugData"))
            {
              this.debug("Response: " + this._responseContent);
            }
          }

          try {
            return vText && vText.length > 0 ? window.eval(vText) : null;
          } catch(ex) {
            return this.error("Could not execute javascript: (" + vText + ")", ex);
          }

        case "application/xml":
          vText = this.getIframeDocument();
          if (qx.core.Environment.get("qx.debug"))
          {
            if (qx.core.Environment.get("qx.ioRemoteDebugData"))
            {
              this.debug("Response: " + this._responseContent);
            }
          }
          return vText;

        default:
          this.warn("No valid responseType specified (" + this.getResponseType() + ")!");
          return null;
      }
    }
  },



  /*
  *****************************************************************************
     DEFER
  *****************************************************************************
  */

  defer : function()
  {
    // basic registration to qx.io.remote.Exchange
    // the real availability check (activeX stuff and so on) follows at the first real request
    qx.io.remote.Exchange.registerType(qx.io.remote.transport.Iframe, "qx.io.remote.transport.Iframe");
  },




  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    if (this.__frame)
    {
      qx.event.Registration.removeListener(this.__frame, "load", this._onload, this);
      qx.bom.Event.removeNativeListener(this.__frame, "readystatechange", this.__onreadystatechangeWrapper);

      // Reset source to a blank image for gecko
      // Otherwise it will switch into a load-without-end behaviour
      if ((qx.core.Environment.get("engine.name") == "gecko")) {
        this.__frame.src = qx.util.ResourceManager.getInstance().toUri("qx/static/blank.gif");
      }

      // Finally, remove element node
      qx.dom.Element.remove(this.__frame);
    }

    if (this.__form) {
      qx.dom.Element.remove(this.__form);
    }

    this.__frame = this.__form = this.__data = null;
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * This handler provides a "load" event for iframes
 */
qx.Class.define("qx.event.handler.Iframe",
{
  extend : qx.core.Object,
  implement : qx.event.IEventHandler,





  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /** {Integer} Priority of this handler */
    PRIORITY : qx.event.Registration.PRIORITY_NORMAL,

    /** {Map} Supported event types */
    SUPPORTED_TYPES : {
      load: 1,
      navigate: 1
    },

    /** {Integer} Which target check to use */
    TARGET_CHECK : qx.event.IEventHandler.TARGET_DOMNODE,

    /** {Integer} Whether the method "canHandleEvent" must be called */
    IGNORE_CAN_HANDLE : false,

    /**
     * Internal function called by iframes created using {@link qx.bom.Iframe}.
     *
     * @signature function(target)
     * @internal
     * @param target {Element} DOM element which is the target of this event
     */
    onevent : qx.event.GlobalError.observeMethod(function(target) {

      // Fire navigate event when actual URL diverges from stored URL
      var currentUrl = qx.bom.Iframe.queryCurrentUrl(target);

      if (currentUrl !== target.$$url) {
        qx.event.Registration.fireEvent(target, "navigate", qx.event.type.Data, [currentUrl]);
        target.$$url = currentUrl;
      }

      // Always fire load event
      qx.event.Registration.fireEvent(target, "load");
    })
  },





  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      EVENT HANDLER INTERFACE
    ---------------------------------------------------------------------------
    */

    // interface implementation
    canHandleEvent : function(target, type) {
      return target.tagName.toLowerCase() === "iframe"
    },


    // interface implementation
    registerEvent : function(target, type, capture) {
      // Nothing needs to be done here
    },


    // interface implementation
    unregisterEvent : function(target, type, capture) {
      // Nothing needs to be done here
    }


  },





  /*
  *****************************************************************************
     DEFER
  *****************************************************************************
  */

  defer : function(statics) {
    qx.event.Registration.addHandler(statics);
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Jonathan Weiß (jonathan_rass)
     * Christian Hagendorn (Chris_schmidt)

************************************************************************ */

/* ************************************************************************

#require(qx.event.handler.Iframe)

************************************************************************ */

/**
 * Cross browser abstractions to work with iframes.
 */
qx.Class.define("qx.bom.Iframe",
{
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /**
     * {Map} Default attributes for creation {@link #create}.
     */
    DEFAULT_ATTRIBUTES :
    {
      onload : "qx.event.handler.Iframe.onevent(this)",
      frameBorder: 0,
      frameSpacing: 0,
      marginWidth: 0,
      marginHeight: 0,
      hspace: 0,
      vspace: 0,
      border: 0,
      allowTransparency: true
    },

    /**
     * Creates an DOM element.
     *
     * Attributes may be given directly with this call. This is critical
     * for some attributes e.g. name, type, ... in many clients.
     *
     * @param attributes {Map?null} Map of attributes to apply
     * @param win {Window?null} Window to create the element for
     * @return {Element} The created iframe node
     */
    create : function(attributes, win)
    {
      // Work on a copy to not modify given attributes map
      var attributes = attributes ? qx.lang.Object.clone(attributes) : {};
      var initValues = qx.bom.Iframe.DEFAULT_ATTRIBUTES;

      for (var key in initValues)
      {
        if (attributes[key] == null) {
          attributes[key] = initValues[key];
        }
      }

      return qx.bom.Element.create("iframe", attributes, win);
    },


    /**
     * Get the DOM window object of an iframe.
     *
     * @param iframe {Element} DOM element of the iframe.
     * @return {Window?null} The DOM window object of the iframe or null.
     * @signature function(iframe)
     */
    getWindow : function(iframe)
    {
      try {
        return iframe.contentWindow;
      } catch(ex) {
        return null;
      }
    },


    /**
     * Get the DOM document object of an iframe.
     *
     * @param iframe {Element} DOM element of the iframe.
     * @return {Document} The DOM document object of the iframe.
     * @signature function(iframe)
     */
    getDocument : qx.core.Environment.select("engine.name",
    {
      "mshtml" : function(iframe)
      {
        try
        {
          var win = this.getWindow(iframe);
          return win ? win.document : null;
        }
        catch(ex)
        {
          return null;
        }
      },

      "default" : function(iframe)
      {
        try {
          return iframe.contentDocument;
        } catch(ex) {
          return null;
        }
      }
    }),


    /**
     * Get the HTML body element of the iframe.
     *
     * @param iframe {Element} DOM element of the iframe.
     * @return {Element} The DOM node of the <code>body</code> element of the iframe.
     */
    getBody : function(iframe)
    {
      try
      {
        var doc = this.getDocument(iframe);
        return doc ? doc.getElementsByTagName("body")[0] : null;
      }
      catch(ex)
      {
        return null
      }
    },


    /**
     * Sets iframe's source attribute to given value
     *
     * @param iframe {Element} DOM element of the iframe.
     * @param source {String} URL to be set.
     * @signature function(iframe, source)
     */
    setSource : function(iframe, source)
    {
      try
      {
        // the guru says ...
        // it is better to use 'replace' than 'src'-attribute, since 'replace'
        // does not interfere with the history (which is taken care of by the
        // history manager), but there has to be a loaded document
        if (this.getWindow(iframe) && qx.dom.Hierarchy.isRendered(iframe))
        {
          /*
            Some gecko users might have an exception here:
            Exception... "Component returned failure code: 0x805e000a
            [nsIDOMLocation.replace]"  nsresult: "0x805e000a (<unknown>)"
          */
          try
          {
            // Webkit on Mac can't set the source when the iframe is still
            // loading its current page
            if ((qx.core.Environment.get("engine.name") == "webkit") &&
                qx.core.Environment.get("os.name") == "osx")
            {
              var contentWindow = this.getWindow(iframe);
              if (contentWindow) {
                contentWindow.stop();
              }
            }
            this.getWindow(iframe).location.replace(source);
          }
          catch(ex)
          {
            iframe.src = source;
          }
        }
        else
        {
          iframe.src = source;
        }

      // This is a programmer provided source. Remember URL for this source
      // for later comparison with current URL. The current URL can diverge
      // if the end-user navigates in the Iframe.
      this.__rememberUrl(iframe);

      }
      catch(ex) {
        qx.log.Logger.warn("Iframe source could not be set!");
      }
    },


    /**
     * Returns the current (served) URL inside the iframe
     *
     * @param iframe {Element} DOM element of the iframe.
     * @return {String} Returns the location href or null (if a query is not possible/allowed)
     */
    queryCurrentUrl : function(iframe)
    {
      var doc = this.getDocument(iframe);

      try
      {
        if (doc && doc.location) {
          return doc.location.href;
        }
      }
      catch(ex) {};

      return "";
    },


    /**
    * Remember actual URL of iframe.
    *
    * @param iframe {Element} DOM element of the iframe.
    * @return {void}
    */
    __rememberUrl: function(iframe)
    {

      // URL can only be detected after load. Retrieve and store URL once.
      var callback = function() {
        qx.bom.Event.removeNativeListener(iframe, "load", callback);
        iframe.$$url = qx.bom.Iframe.queryCurrentUrl(iframe);
      }

      qx.bom.Event.addNativeListener(iframe, "load", callback);
    }

  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
     2006 Derrell Lipman
     2006 STZ-IDA, Germany, http://www.stz-ida.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Derrell Lipman (derrell)
     * Andreas Junghans (lucidcake)

************************************************************************ */

/**
 * Transports requests to a server using dynamic script tags.
 *
 * This class should not be used directly by client programmers.
 */
qx.Class.define("qx.io.remote.transport.Script",
{
  extend : qx.io.remote.transport.Abstract,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    var vUniqueId = ++qx.io.remote.transport.Script.__uniqueId;

    if (vUniqueId >= 2000000000) {
      qx.io.remote.transport.Script.__uniqueId = vUniqueId = 1;
    }

    this.__element = null;
    this.__uniqueId = vUniqueId;
  },




  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /**
     * Unique identifier for each instance.
     *
     * @internal
     */
    __uniqueId : 0,

    /**
     * Registry for all script transport instances.
     *
     * @internal
     */
    _instanceRegistry : {},

    /**
     * Internal URL parameter prefix.
     *
     * @internal
     */
    ScriptTransport_PREFIX : "_ScriptTransport_",

    /**
     * Internal URL parameter ID.
     *
     * @internal
     */
    ScriptTransport_ID_PARAM : "_ScriptTransport_id",

    /**
     * Internal URL parameter data prefix.
     *
     * @internal
     */
    ScriptTransport_DATA_PARAM : "_ScriptTransport_data",

    /**
     * Capabilities of this transport type.
     *
     * @internal
     */
    handles :
    {
      synchronous           : false,
      asynchronous          : true,
      crossDomain           : true,
      fileUpload            : false,
      programaticFormFields : false,
      responseTypes         : [ "text/plain", "text/javascript", "application/json" ]
    },


    /**
     * Returns always true, because script transport is supported by all browsers.
     *
     */
    isSupported : function() {
      return true;
    },




    /*
    ---------------------------------------------------------------------------
      EVENT LISTENER
    ---------------------------------------------------------------------------
    */

    /**
     * For reference:
     * http://msdn.microsoft.com/workshop/author/dhtml/reference/properties/readyState_1.asp
     *
     * @internal
     */
    _numericMap :
    {
      "uninitialized" : 1,
      "loading"       : 2,
      "loaded"        : 2,
      "interactive"   : 3,
      "complete"      : 4
    },


    /**
     * This method can be called by the script loaded by the ScriptTransport
     * class.
     *
     * @signature function(id, content)
     * @param id {String} Id of the corresponding transport object,
     *     which is passed as an URL parameter to the server an
     * @param content {String} This string is passed to the content property
     *     of the {@link qx.io.remote.Response} object.
     */
    _requestFinished : qx.event.GlobalError.observeMethod(function(id, content)
    {
      var vInstance = qx.io.remote.transport.Script._instanceRegistry[id];

      if (vInstance == null)
      {
        if (qx.core.Environment.get("qx.debug"))
        {
          if (qx.core.Environment.get("qx.ioRemoteDebug")) {
            this.warn("Request finished for an unknown instance (probably aborted or timed out before)");
          }
        }
      }
      else
      {
        vInstance._responseContent = content;
        vInstance._switchReadyState(qx.io.remote.transport.Script._numericMap.complete);
      }
    })
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {

    __lastReadyState : 0,
    __element : null,
    __uniqueId : null,

    /*
    ---------------------------------------------------------------------------
      USER METHODS
    ---------------------------------------------------------------------------
    */

    /**
     * Sends the request using "script" elements
     *
     * @return {void}
     */
    send : function()
    {
      var vUrl = this.getUrl();

      // --------------------------------------
      //   Adding parameters
      // --------------------------------------
      vUrl += (vUrl.indexOf("?") >= 0 ? "&" : "?") + qx.io.remote.transport.Script.ScriptTransport_ID_PARAM + "=" + this.__uniqueId;

      var vParameters = this.getParameters();
      var vParametersList = [];

      for (var vId in vParameters)
      {
        if (vId.indexOf(qx.io.remote.transport.Script.ScriptTransport_PREFIX) == 0) {
          this.error("Illegal parameter name. The following prefix is used internally by qooxdoo): " + qx.io.remote.transport.Script.ScriptTransport_PREFIX);
        }

        var value = vParameters[vId];

        if (value instanceof Array)
        {
          for (var i=0; i<value.length; i++) {
            vParametersList.push(encodeURIComponent(vId) + "=" + encodeURIComponent(value[i]));
          }
        }
        else
        {
          vParametersList.push(encodeURIComponent(vId) + "=" + encodeURIComponent(value));
        }
      }

      if (vParametersList.length > 0) {
        vUrl += "&" + vParametersList.join("&");
      }

      // --------------------------------------
      //   Sending data
      // --------------------------------------
      var vData = this.getData();

      if (vData != null) {
        vUrl += "&" + qx.io.remote.transport.Script.ScriptTransport_DATA_PARAM + "=" + encodeURIComponent(vData);
      }

      qx.io.remote.transport.Script._instanceRegistry[this.__uniqueId] = this;
      this.__element = document.createElement("script");

      // IE needs this (it ignores the
      // encoding from the header sent by the
      // server for dynamic script tags)
      this.__element.charset = "utf-8";
      this.__element.src = vUrl;

      if (qx.core.Environment.get("qx.debug"))
      {
        if (qx.core.Environment.get("qx.ioRemoteDebugData"))
        {
          this.debug("Request: " + vUrl);
        }
      }

      document.body.appendChild(this.__element);
    },


    /**
     * Switches the readystate by setting the internal state.
     *
     * @param vReadyState {String} readystate value
     * @return {void}
     */
    _switchReadyState : function(vReadyState)
    {
      // Ignoring already stopped requests
      switch(this.getState())
      {
        case "completed":
        case "aborted":
        case "failed":
        case "timeout":
          this.warn("Ignore Ready State Change");
          return;
      }

      // Updating internal state
      while (this.__lastReadyState < vReadyState) {
        this.setState(qx.io.remote.Exchange._nativeMap[++this.__lastReadyState]);
      }
    },




    /*
    ---------------------------------------------------------------------------
      REQUEST HEADER SUPPORT
    ---------------------------------------------------------------------------
    */

    /**
     * Sets a request header with the given value.
     *
     * This method is not implemented at the moment.
     *
     * @param vLabel {String} Request header name
     * @param vValue {var} Request header value
     * @return {void}
     */
    setRequestHeader : function(vLabel, vValue) {},

    /*
    ---------------------------------------------------------------------------
      RESPONSE HEADER SUPPORT
    ---------------------------------------------------------------------------
    */

    /**
     * Returns the value of the given response header.
     *
     * This method is not implemented at the moment and returns always "null".
     *
     * @param vLabel {String} Response header name
     * @return {null} Returns null
     */
    getResponseHeader : function(vLabel) {
      return null;
    },

    /**
     * Provides an hash of all response headers.
     *
     * This method is not implemented at the moment and returns an empty map.
     *
     * @return {Map} empty map
     */
    getResponseHeaders : function() {
      return {};
    },

    /*
    ---------------------------------------------------------------------------
      STATUS SUPPORT
    ---------------------------------------------------------------------------
    */

    /**
     * Returns the current status code of the request if available or -1 if not.
     * This method needs implementation (returns always 200).
     *
     * @return {Integer} status code
     */
    getStatusCode : function() {
      return 200;
    },

    /**
     * Provides the status text for the current request if available and null otherwise.
     * This method needs implementation (returns always an empty string)
     *
     * @return {String} always an empty string.
     */
    getStatusText : function() {
      return "";
    },

    /*
    ---------------------------------------------------------------------------
      RESPONSE DATA SUPPORT
    ---------------------------------------------------------------------------
    */

    /**
     * Returns the length of the content as fetched thus far.
     * This method needs implementation (returns always 0).
     *
     * @return {Integer} Returns 0
     */
    getFetchedLength : function() {
      return 0;
    },

    /**
     * Returns the content of the response.
     *
     * @return {null | String} If successful content of response as string.
     */
    getResponseContent : function()
    {
      if (this.getState() !== "completed")
      {
        if (qx.core.Environment.get("qx.debug"))
        {
          if (qx.core.Environment.get("qx.ioRemoteDebug")) {
            this.warn("Transfer not complete, ignoring content!");
          }
        }

        return null;
      }

      if (qx.core.Environment.get("qx.debug"))
      {
        if (qx.core.Environment.get("qx.ioRemoteDebug")) {
          this.debug("Returning content for responseType: " + this.getResponseType());
        }
      }

      switch(this.getResponseType())
      {
        case "text/plain":
          // server is responsible for using a string as the response
        case "application/json":
        case "text/javascript":
          if (qx.core.Environment.get("qx.debug"))
          {
            if (qx.core.Environment.get("qx.ioRemoteDebugData"))
            {
              this.debug("Response: " + this._responseContent);
            }
          }
          var ret = this._responseContent;
          return (ret === 0 ? 0 : (ret || null));

        default:
          this.warn("No valid responseType specified (" + this.getResponseType() + ")!");
          return null;
      }
    }
  },



  /*
  *****************************************************************************
     DEFER
  *****************************************************************************
  */

  defer : function()
  {
    // basic registration to qx.io.remote.Exchange
    // the real availability check (activeX stuff and so on) follows at the first real request
    qx.io.remote.Exchange.registerType(qx.io.remote.transport.Script, "qx.io.remote.transport.Script");
  },




  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    if (this.__element)
    {
      delete qx.io.remote.transport.Script._instanceRegistry[this.__uniqueId];
      document.body.removeChild(this.__element);
    }

    this.__element = this._responseContent = null;
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
     2006 Derrell Lipman

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Derrell Lipman (derrell)

************************************************************************ */

/**
 * Transports requests to a server using the native XmlHttpRequest object.
 *
 * This class should not be used directly by client programmers.
 */
qx.Class.define("qx.io.remote.transport.XmlHttp",
{
  extend : qx.io.remote.transport.Abstract,


  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /**
     * Capabilities of this transport type.
     *
     * @internal
     */
    handles :
    {
      synchronous           : true,
      asynchronous          : true,
      crossDomain           : false,
      fileUpload            : false,
      programaticFormFields : false,
      responseTypes         : [ "text/plain", "text/javascript", "application/json", "application/xml", "text/html" ]
    },


    /**
     * Return a new XMLHttpRequest object suitable for the client browser.
     *
     * @return {Object} native XMLHttpRequest object
     * @signature function()
     */
    createRequestObject : qx.core.Environment.select("engine.name",
    {
      "default" : function() {
        return new XMLHttpRequest;
      },

      // IE7's native XmlHttp does not care about trusted zones. To make this
      // work in the localhost scenario, you can use the following registry setting:
      //
      // [HKEY_CURRENT_USER\Software\Microsoft\Internet Explorer\Main\
      // FeatureControl\FEATURE_XMLHTTP_RESPECT_ZONEPOLICY]
      // "Iexplore.exe"=dword:00000001
      //
      // Generally it seems that the ActiveXObject is more stable. jQuery
      // seems to use it always. We prefer the ActiveXObject for the moment, but allow
      // fallback to XMLHTTP if ActiveX is disabled.
      "mshtml" : function()
      {
        if (window.ActiveXObject && qx.xml.Document.XMLHTTP) {
          return new ActiveXObject(qx.xml.Document.XMLHTTP);
        }

        if (window.XMLHttpRequest) {
          return new XMLHttpRequest;
        }
      }
    }),


    /**
     * Whether the transport type is supported by the client.
     *
     * @return {Boolean} supported or not
     */
    isSupported : function() {
      return !!this.createRequestObject();
    }
  },


  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */

   properties :
   {
    /**
     * If true and the responseType property is set to "application/json", getResponseContent() will
     * return a Javascript map containing the JSON contents, i. e. the result qx.lang.Json.parse().
     * If false, the raw string data will be returned and the parsing must be done manually.
     * This is usefull for special JSON dialects / extensions which are not supported by
     * qx.lang.Json.
     */
    parseJson :
    {
      check : "Boolean",
      init : true
    }
   },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      CORE METHODS
    ---------------------------------------------------------------------------
    */

    __localRequest : false,
    __lastReadyState : 0,
    __request : null,


    /**
     * Returns the native request object
     *
     * @return {Object} native XmlHTTPRequest object
     */
    getRequest : function()
    {
      if (this.__request === null)
      {
        this.__request = qx.io.remote.transport.XmlHttp.createRequestObject();
        this.__request.onreadystatechange = qx.lang.Function.bind(this._onreadystatechange, this);
      }

      return this.__request;
    },




    /*
    ---------------------------------------------------------------------------
      USER METHODS
    ---------------------------------------------------------------------------
    */

    /**
     * Implementation for sending the request
     *
     * @return {void}
     */
    send : function()
    {
      this.__lastReadyState = 0;

      var vRequest = this.getRequest();
      var vMethod = this.getMethod();
      var vAsynchronous = this.getAsynchronous();
      var vUrl = this.getUrl();

      // --------------------------------------
      //   Local handling
      // --------------------------------------
      var vLocalRequest = (window.location.protocol === "file:" && !(/^http(s){0,1}\:/.test(vUrl)));
      this.__localRequest = vLocalRequest;

      // --------------------------------------
      //   Adding URL parameters
      // --------------------------------------
      var vParameters = this.getParameters(false);
      var vParametersList = [];

      for (var vId in vParameters)
      {
        var value = vParameters[vId];

        if (value instanceof Array)
        {
          for (var i=0; i<value.length; i++) {
            vParametersList.push(encodeURIComponent(vId) + "=" + encodeURIComponent(value[i]));
          }
        }
        else
        {
          vParametersList.push(encodeURIComponent(vId) + "=" + encodeURIComponent(value));
        }
      }

      if (vParametersList.length > 0) {
        vUrl += (vUrl.indexOf("?") >= 0 ? "&" : "?") + vParametersList.join("&");
      }

      // --------------------------------------------------------
      //   Adding data parameters (if no data is already present)
      // --------------------------------------------------------
      if (this.getData() === null)
      {
        var vParameters = this.getParameters(true);
        var vParametersList = [];

        for (var vId in vParameters)
        {
          var value = vParameters[vId];

          if (value instanceof Array)
          {
            for (var i=0; i<value.length; i++)
            {
              vParametersList.push(encodeURIComponent(vId) +
                                   "=" +
                                   encodeURIComponent(value[i]));
            }
          }
          else
          {
            vParametersList.push(encodeURIComponent(vId) +
                                 "=" +
                                 encodeURIComponent(value));
          }
        }

        if (vParametersList.length > 0)
        {
          this.setData(vParametersList.join("&"));
        }
      }

      var encode64 = function(input)
      {
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        do
        {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);

          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }

          output += keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }
        while (i < input.length);

        return output;
      };

      // --------------------------------------
      //   Opening connection
      // --------------------------------------
      try
      {
        if (this.getUsername())
        {
          if (this.getUseBasicHttpAuth())
          {
            vRequest.open(vMethod, vUrl, vAsynchronous);
            vRequest.setRequestHeader('Authorization', 'Basic ' + encode64(this.getUsername() + ':' + this.getPassword()));
          }
          else
          {
            vRequest.open(vMethod, vUrl, vAsynchronous, this.getUsername(), this.getPassword());
          }
        }
        else
        {
          vRequest.open(vMethod, vUrl, vAsynchronous);
        }
      }
      catch(ex)
      {
        this.error("Failed with exception: " + ex);
        this.failed();
        return;
      }

      // --------------------------------------
      //   Applying request header
      // --------------------------------------
      // Add a Referer header

      // The Java backend uses the referer header, and Firefox doesn't send one by
      // default (see here:
      // http://www.mercurytide.co.uk/whitepapers/issues-working-with-ajax/ ). Even when
      // not using a backend that evaluates the referrer, it's still useful to have it
      // set correctly, e.g. when looking at server log files.
      if (!(qx.core.Environment.get("engine.name") == "webkit"))
      {
        // avoid "Refused to set unsafe header Referer" in Safari and other Webkit-based browsers
        vRequest.setRequestHeader('Referer', window.location.href);
      }

      var vRequestHeaders = this.getRequestHeaders();

      for (var vId in vRequestHeaders) {
        vRequest.setRequestHeader(vId, vRequestHeaders[vId]);
      }

      // --------------------------------------
      //   Sending data
      // --------------------------------------
      try {
        if (qx.core.Environment.get("qx.debug"))
        {
          if (qx.core.Environment.get("qx.ioRemoteDebugData"))
          {
            this.debug("Request: " + this.getData());
          }
        }

        // IE9 executes the call synchronous when the call is to file protocol
        // See [BUG #4762] for details
        if (
          vLocalRequest && vAsynchronous &&
          qx.core.Environment.get("engine.name") == "mshtml" &&
          qx.core.Environment.get("engine.version") == 9
        ) {
          qx.event.Timer.once(function() {
            vRequest.send(this.getData());
          }, this, 0);
        } else {
          vRequest.send(this.getData());
        }
      }
      catch(ex)
      {
        if (vLocalRequest) {
          this.failedLocally();
        }
        else
        {
          this.error("Failed to send data: " + ex, "send");
          this.failed();
        }

        return;
      }

      // --------------------------------------
      //   Readystate for sync reqeusts
      // --------------------------------------
      if (!vAsynchronous) {
        this._onreadystatechange();
      }
    },


    /**
     * Force the transport into the failed state ("failed").
     *
     * This method should be used only if the requests URI was local
     * access. I.e. it started with "file://".
     *
     * @return {void}
     */
    failedLocally : function()
    {
      if (this.getState() === "failed") {
        return;
      }

      // should only occur on "file://" access
      this.warn("Could not load from file: " + this.getUrl());

      this.failed();
    },




    /*
    ---------------------------------------------------------------------------
      EVENT HANDLER
    ---------------------------------------------------------------------------
    */

    /**
     * Listener method for change of the "readystate".
     * Sets the internal state and informs the transport layer.
     *
     * @signature function(e)
     * @param e {Event} native event
     */
    _onreadystatechange : qx.event.GlobalError.observeMethod(function(e)
    {
      // Ignoring already stopped requests
      switch(this.getState())
      {
        case "completed":
        case "aborted":
        case "failed":
        case "timeout":
          if (qx.core.Environment.get("qx.debug"))
          {
            if (qx.core.Environment.get("qx.ioRemoteDebug")) {
              this.warn("Ignore Ready State Change");
            }
          }

          return;
      }

      // Checking status code
      var vReadyState = this.getReadyState();

      if (vReadyState == 4)
      {
        // The status code is only meaningful when we reach ready state 4.
        // (Important for Opera since it goes through other states before
        // reaching 4, and the status code is not valid before 4 is reached.)
        if (!qx.io.remote.Exchange.wasSuccessful(this.getStatusCode(), vReadyState, this.__localRequest)) {
          // Fix for bug #2272
          // The IE doesn't set the state to 'sending' even though the send method
          // is called. This only occurs if the server (which is called) goes
          // down or a network failure occurs.
          if (this.getState() === "configured") {
            this.setState("sending");
          }

          this.failed();
          return;
        }
      }

      // Sometimes the xhr call skips the send state
      if (vReadyState == 3 && this.__lastReadyState == 1) {
        this.setState(qx.io.remote.Exchange._nativeMap[++this.__lastReadyState]);
      }

      // Updating internal state
      while (this.__lastReadyState < vReadyState) {
        this.setState(qx.io.remote.Exchange._nativeMap[++this.__lastReadyState]);
      }
    }),




    /*
    ---------------------------------------------------------------------------
      READY STATE
    ---------------------------------------------------------------------------
    */

    /**
     * Get the ready state of this transports request.
     *
     * For qx.io.remote.transport.XmlHttp, ready state is a number between 1 to 4.
     *
     * @return {Integer} ready state number
     */
    getReadyState : function()
    {
      var vReadyState = null;

      try {
        vReadyState = this.getRequest().readyState;
      } catch(ex) {}

      return vReadyState;
    },




    /*
    ---------------------------------------------------------------------------
      REQUEST HEADER SUPPORT
    ---------------------------------------------------------------------------
    */

    /**
     * Set a request header to this transports request.
     *
     * @param vLabel {String} Request header name
     * @param vValue {var} Request header value
     * @return {void}
     */
    setRequestHeader : function(vLabel, vValue) {
      this.getRequestHeaders()[vLabel] = vValue;
    },




    /*
    ---------------------------------------------------------------------------
      RESPONSE HEADER SUPPORT
    ---------------------------------------------------------------------------
    */

    /**
     * Returns a specific header provided by the server upon sending a request,
     * with header name determined by the argument headerName.
     *
     * Only available at readyState 3 and 4 universally and in readyState 2
     * in Gecko.
     *
     * Please note: Some servers/proxies (such as Selenium RC) will capitalize
     * response header names. This is in accordance with RFC 2616[1], which
     * states that HTTP 1.1 header names are case-insensitive, so your
     * application should be case-agnostic when dealing with response headers.
     *
     * [1]{@link http://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html#sec4.2}
     *
     * @param vLabel {String} Response header name
     * @return {String|null} Response header value
     */
    getResponseHeader : function(vLabel)
    {
      var vResponseHeader = null;

      try {
        vResponseHeader = this.getRequest().getResponseHeader(vLabel) || null;
      } catch(ex) {}

      return vResponseHeader;
    },


    /**
     * Returns all response headers of the request.
     *
     * @return {var} response headers
     */
    getStringResponseHeaders : function()
    {
      var vSourceHeader = null;

      try
      {
        var vLoadHeader = this.getRequest().getAllResponseHeaders();

        if (vLoadHeader) {
          vSourceHeader = vLoadHeader;
        }
      }
      catch(ex) {}

      return vSourceHeader;
    },


    /**
     * Provides a hash of all response headers.
     *
     * @return {var} hash of all response headers
     */
    getResponseHeaders : function()
    {
      var vSourceHeader = this.getStringResponseHeaders();
      var vHeader = {};

      if (vSourceHeader)
      {
        var vValues = vSourceHeader.split(/[\r\n]+/g);

        for (var i=0, l=vValues.length; i<l; i++)
        {
          var vPair = vValues[i].match(/^([^:]+)\s*:\s*(.+)$/i);

          if (vPair) {
            vHeader[vPair[1]] = vPair[2];
          }
        }
      }

      return vHeader;
    },




    /*
    ---------------------------------------------------------------------------
      STATUS SUPPORT
    ---------------------------------------------------------------------------
    */

    /**
     * Returns the current status code of the request if available or -1 if not.
     *
     * @return {Integer} current status code
     */
    getStatusCode : function()
    {
      var vStatusCode = -1;

      try {
        vStatusCode = this.getRequest().status;

        // [BUG #4476]
        // IE sometimes tells 1223 when it should be 204
        if (vStatusCode === 1223) {
          vStatusCode = 204;
        }

      } catch(ex) {}

      return vStatusCode;
    },


    /**
     * Provides the status text for the current request if available and null
     * otherwise.
     *
     * @return {String} current status code text
     */
    getStatusText : function()
    {
      var vStatusText = "";

      try {
        vStatusText = this.getRequest().statusText;
      } catch(ex) {}

      return vStatusText;
    },




    /*
    ---------------------------------------------------------------------------
      RESPONSE DATA SUPPORT
    ---------------------------------------------------------------------------
    */

    /**
     * Provides the response text from the request when available and null
     * otherwise.  By passing true as the "partial" parameter of this method,
     * incomplete data will be made available to the caller.
     *
     * @return {String} Content of the response as string
     */
    getResponseText : function()
    {
      var vResponseText = null;

      try
      {
        vResponseText = this.getRequest().responseText;
      }
      catch(ex)
      {
        vResponseText = null;
      }

      return vResponseText;
    },


    /**
     * Provides the XML provided by the response if any and null otherwise.  By
     * passing true as the "partial" parameter of this method, incomplete data will
     * be made available to the caller.
     *
     * @return {String} Content of the response as XML
     * @throws {Error} If an error within the response occurs.
     */
    getResponseXml : function()
    {
      var vResponseXML = null;

      var vStatus = this.getStatusCode();
      var vReadyState = this.getReadyState();

      if (qx.io.remote.Exchange.wasSuccessful(vStatus, vReadyState, this.__localRequest))
      {
        try {
          vResponseXML = this.getRequest().responseXML;
        } catch(ex) {}
      }

      // Typical behaviour on file:// on mshtml
      // Could we check this with something like: /^file\:/.test(path); ?
      // No browser check here, because it doesn't seem to break other browsers
      //    * test for this.req.responseXML's objecthood added by *
      //    * FRM, 20050816                                       *
      if (typeof vResponseXML == "object" && vResponseXML != null)
      {
        if (!vResponseXML.documentElement)
        {
          // Clear xml file declaration, this breaks non unicode files (like ones with Umlauts)
          var s = String(this.getRequest().responseText).replace(/<\?xml[^\?]*\?>/, "");
          vResponseXML.loadXML(s);
        }

        // Re-check if fixed...
        if (!vResponseXML.documentElement) {
          throw new Error("Missing Document Element!");
        }

        if (vResponseXML.documentElement.tagName == "parseerror") {
          throw new Error("XML-File is not well-formed!");
        }
      }
      else
      {
        throw new Error("Response was not a valid xml document [" + this.getRequest().responseText + "]");
      }

      return vResponseXML;
    },


    /**
     * Returns the length of the content as fetched thus far
     *
     * @return {Integer} Length of the response text.
     */
    getFetchedLength : function()
    {
      var vText = this.getResponseText();
      return typeof vText == "string" ? vText.length : 0;
    },


    /**
     * Returns the content of the response
     *
     * @return {null | String} Response content if available
     */
    getResponseContent : function()
    {
      var state = this.getState();
      if (state !== "completed" && state != "failed")
      {
        if (qx.core.Environment.get("qx.debug"))
        {
          if (qx.core.Environment.get("qx.ioRemoteDebug")) {
            this.warn("Transfer not complete or failed, ignoring content!");
          }
        }

        return null;
      }

      if (qx.core.Environment.get("qx.debug"))
      {
        if (qx.core.Environment.get("qx.ioRemoteDebug")) {
          this.debug("Returning content for responseType: " + this.getResponseType());
        }
      }

      var vText = this.getResponseText();

      if (state == "failed")
      {
          if (qx.core.Environment.get("qx.debug"))
          {
            if (qx.core.Environment.get("qx.ioRemoteDebugData"))
            {
              this.debug("Failed: " + vText);
            }
          }

          return vText;
      }

      switch(this.getResponseType())
      {
        case "text/plain":
        case "text/html":
          if (qx.core.Environment.get("qx.debug"))
          {
            if (qx.core.Environment.get("qx.ioRemoteDebugData"))
            {
              this.debug("Response: " + vText);
            }
          }

          return vText;

        case "application/json":
          if (qx.core.Environment.get("qx.debug"))
          {
            if (qx.core.Environment.get("qx.ioRemoteDebugData"))
            {
              this.debug("Response: " + vText);
            }
          }

          try {
            if (vText && vText.length > 0)
            {
              var ret;
              if (this.getParseJson()){
                ret = qx.lang.Json.parse(vText);
                ret = (ret === 0 ? 0 : (ret || null));
              } else {
                ret = vText;
              }
              return ret;
            }
            else
            {
              return null;
            }
          }
          catch(ex)
          {
            this.error("Could not execute json: [" + vText + "]", ex);
            return "<pre>Could not execute json: \n" + vText + "\n</pre>";
          }

        case "text/javascript":
          if (qx.core.Environment.get("qx.debug"))
          {
            if (qx.core.Environment.get("qx.ioRemoteDebugData"))
            {
              this.debug("Response: " + vText);
            }
          }

          try {
            if(vText && vText.length > 0)
            {
              var ret = window.eval(vText);
              return (ret === 0 ? 0 : (ret || null));
            }
            else
            {
              return null;
            }
          } catch(ex) {
            this.error("Could not execute javascript: [" + vText + "]", ex);
            return null;
          }

        case "application/xml":
          vText = this.getResponseXml();

          if (qx.core.Environment.get("qx.debug"))
          {
            if (qx.core.Environment.get("qx.ioRemoteDebugData"))
            {
              this.debug("Response: " + vText);
            }
          }

          return (vText === 0 ? 0 : (vText || null));

        default:
          this.warn("No valid responseType specified (" + this.getResponseType() + ")!");
          return null;
      }
    },




    /*
    ---------------------------------------------------------------------------
      APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    /**
     * Apply method for the "state" property.
     * Fires an event for each state value to inform the listeners.
     *
     * @param value {var} Current value
     * @param old {var} Previous value
     * @return {void}
     */
    _applyState : function(value, old)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        if (qx.core.Environment.get("qx.ioRemoteDebug")) {
          this.debug("State: " + value);
        }
      }

      switch(value)
      {
        case "created":
          this.fireEvent("created");
          break;

        case "configured":
          this.fireEvent("configured");
          break;

        case "sending":
          this.fireEvent("sending");
          break;

        case "receiving":
          this.fireEvent("receiving");
          break;

        case "completed":
          this.fireEvent("completed");
          break;

        case "failed":
          this.fireEvent("failed");
          break;

        case "aborted":
          this.getRequest().abort();
          this.fireEvent("aborted");
          break;

        case "timeout":
          this.getRequest().abort();
          this.fireEvent("timeout");
          break;
      }
    }
  },



  /*
  *****************************************************************************
     DEFER
  *****************************************************************************
  */

  defer : function()
  {
    // basic registration to qx.io.remote.Exchange
    // the real availability check (activeX stuff and so on) follows at the first real request
    qx.io.remote.Exchange.registerType(qx.io.remote.transport.XmlHttp, "qx.io.remote.transport.XmlHttp");
  },




  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    var vRequest = this.getRequest();

    if (vRequest)
    {
      // Clean up state change handler
      // Note that for IE the proper way to do this is to set it to a
      // dummy function, not null (Google on "onreadystatechange dummy IE unhook")
      // http://groups.google.com/group/Google-Web-Toolkit-Contributors/browse_thread/thread/7e7ee67c191a6324
      vRequest.onreadystatechange = qx.lang.Function.empty;
      // Aborting
      switch(vRequest.readyState)
      {
        case 1:
        case 2:
        case 3:
          vRequest.abort();
      }
    }

    this.__request = null;
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

************************************************************************ */

/**
 * This class is used to work with the result of a HTTP request.
 */
qx.Class.define("qx.io.remote.Response",
{
  extend : qx.event.type.Event,




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /*
    ---------------------------------------------------------------------------
      PROPERTIES
    ---------------------------------------------------------------------------
    */

    /** State of the response. */
    state :
    {
      check    : "Integer",
      nullable : true
    },

    /** Status code of the response. */
    statusCode :
    {
      check    : "Integer",
      nullable : true
    },

    /** Content of the response. */
    content :
    {
      nullable : true
    },

    /** The headers of the response. */
    responseHeaders :
    {
      check    : "Object",
      nullable : true
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      USER METHODS
    ---------------------------------------------------------------------------
    */

    // overridden
    clone : function(embryo)
    {
      var clone = this.base(arguments, embryo);
      clone.setType(this.getType());
      clone.setState(this.getState());
      clone.setStatusCode(this.getStatusCode());
      clone.setContent(this.getContent());
      clone.setResponseHeaders(this.getResponseHeaders());
      return clone;
    },


    /**
     * Returns a specific response header
     * @param vHeader {String} Response header name
     * @return {Object | null} The header value or null;
     */
    getResponseHeader : function(vHeader)
    {
      var vAll = this.getResponseHeaders();

      if (vAll) {
        return vAll[vHeader] || null;
      }

      return null;
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * This mixin is included by all widgets, which support an 'execute' like
 * buttons or menu entries.
 */
qx.Mixin.define("qx.ui.core.MExecutable",
{
  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events :
  {
    /** Fired if the {@link #execute} method is invoked.*/
    "execute" : "qx.event.type.Event"
  },



  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /**
     * A command called if the {@link #execute} method is called, e.g. on a
     * button click.
     */
    command :
    {
      check : "qx.ui.core.Command",
      apply : "_applyCommand",
      event : "changeCommand",
      nullable : true
    }
  },



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __executableBindingIds : null,
    __semaphore : false,
    __executeListenerId : null,


    /**
     * {Map} Set of properties, which will by synced from the command to the
     *    including widget
     *
     * @lint ignoreReferenceField(_bindableProperties)
     */
    _bindableProperties :
    [
      "enabled",
      "label",
      "icon",
      "toolTipText",
      "value",
      "menu"
    ],


    /**
     * Initiate the execute action.
     */
    execute : function()
    {
      var cmd = this.getCommand();

      if (cmd) {
        if (this.__semaphore) {
          this.__semaphore = false;
        } else {
          this.__semaphore = true;
          cmd.execute(this);
        }
      }

      this.fireEvent("execute");
    },


    /**
     * Handler for the execute event of the command.
     *
     * @param e {qx.event.type.Event} The execute event of the command.
     */
    __onCommandExecute : function(e) {
      if (this.__semaphore) {
        this.__semaphore = false;
        return;
      }
      this.__semaphore = true;
      this.execute();
    },


    // property apply
    _applyCommand : function(value, old)
    {
      // execute forwarding
      if (old != null) {
        old.removeListenerById(this.__executeListenerId);
      }
      if (value != null) {
        this.__executeListenerId = value.addListener(
          "execute", this.__onCommandExecute, this
        );
      }

      // binding stuff
      var ids = this.__executableBindingIds;
      if (ids == null) {
        this.__executableBindingIds = ids = {};
      }

      var selfPropertyValue;
      for (var i = 0; i < this._bindableProperties.length; i++) {
        var property = this._bindableProperties[i];

        // remove the old binding
        if (old != null && !old.isDisposed() && ids[property] != null)
        {
          old.removeBinding(ids[property]);
          ids[property] = null;
        }

        // add the new binding
        if (value != null && qx.Class.hasProperty(this.constructor, property)) {
          // handle the init value (dont sync the initial null)
          var cmdPropertyValue = value.get(property);
          if (cmdPropertyValue == null) {
            selfPropertyValue = this.get(property);
          } else {
            // Reset the self property value [BUG #4534]
            selfPropertyValue = null;
          }
          // set up the binding
          ids[property] = value.bind(property, this, property);
          // reapply the former value
          if (selfPropertyValue) {
            this.set(property, selfPropertyValue);
          }
        }
      }
    }
  },


  destruct : function() {
    this._applyCommand(null, this.getCommand());
    this.__executableBindingIds = null;
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * Form interface for all form widgets which are executable in some way. This
 * could be a button for example.
 */
qx.Interface.define("qx.ui.form.IExecutable",
{
  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events :
  {
    /**
     * Fired when the widget is executed. Sets the "data" property of the
     * event to the object that issued the command.
     */
    "execute" : "qx.event.type.Data"
  },



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      COMMAND PROPERTY
    ---------------------------------------------------------------------------
    */

    /**
     * Set the command of this executable.
     *
     * @param command {qx.ui.core.Command} The command.
     */
    setCommand : function(command) {
      return arguments.length == 1;
    },


    /**
     * Return the current set command of this executable.
     *
     * @return {qx.ui.core.Command} The current set command.
     */
    getCommand : function() {},


    /**
     * Fire the "execute" event on the command.
     */
    execute: function() {}
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * A Button widget which supports various states and allows it to be used
 * via the mouse and the keyboard.
 *
 * If the user presses the button by clicking on it, or the <code>Enter</code> or
 * <code>Space</code> keys, the button fires an {@link qx.ui.core.MExecutable#execute} event.
 *
 * If the {@link qx.ui.core.MExecutable#command} property is set, the
 * command is executed as well.
 *
 * *Example*
 *
 * Here is a little example of how to use the widget.
 *
 * <pre class='javascript'>
 *   var button = new qx.ui.form.Button("Hello World");
 *
 *   button.addListener("execute", function(e) {
 *     alert("Button was clicked");
 *   }, this);
 *
 *   this.getRoot.add(button);
 * </pre>
 *
 * This example creates a button with the label "Hello World" and attaches an
 * event listener to the {@link #execute} event.
 *
 * *External Documentation*
 *
 * <a href='http://manual.qooxdoo.org/1.4/pages/widget/button.html' target='_blank'>
 * Documentation of this widget in the qooxdoo manual.</a>
 */
qx.Class.define("qx.ui.form.Button",
{
  extend : qx.ui.basic.Atom,
  include : [qx.ui.core.MExecutable],
  implement : [qx.ui.form.IExecutable],




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param label {String} label of the atom
   * @param icon {String?null} Icon URL of the atom
   * @param command {qx.ui.core.Command?null} Command instance to connect with
   */
  construct : function(label, icon, command)
  {
    this.base(arguments, label, icon);

    if (command != null) {
      this.setCommand(command);
    }

    // Add listeners
    this.addListener("mouseover", this._onMouseOver);
    this.addListener("mouseout", this._onMouseOut);
    this.addListener("mousedown", this._onMouseDown);
    this.addListener("mouseup", this._onMouseUp);

    this.addListener("keydown", this._onKeyDown);
    this.addListener("keyup", this._onKeyUp);

    // Stop events
    this.addListener("dblclick", this._onStopEvent);
  },



  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    // overridden
    appearance :
    {
      refine : true,
      init : "button"
    },

    // overridden
    focusable :
    {
      refine : true,
      init : true
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // overridden
    /**
     * @lint ignoreReferenceField(_forwardStates)
     */
    _forwardStates :
    {
      focused : true,
      hovered : true,
      pressed : true,
      disabled : true
    },


    /*
    ---------------------------------------------------------------------------
      USER API
    ---------------------------------------------------------------------------
    */

    /**
     * Manually press the button
     */
    press : function()
    {
      if (this.hasState("abandoned")) {
        return;
      }

      this.addState("pressed");
    },


    /**
     * Manually release the button
     */
    release : function()
    {
      if (this.hasState("pressed")) {
        this.removeState("pressed");
      }
    },


    /**
     * Completely reset the button (remove all states)
     */
    reset : function()
    {
      this.removeState("pressed");
      this.removeState("abandoned");
      this.removeState("hovered");
    },



    /*
    ---------------------------------------------------------------------------
      EVENT LISTENERS
    ---------------------------------------------------------------------------
    */

    /**
     * Listener method for "mouseover" event
     * <ul>
     * <li>Adds state "hovered"</li>
     * <li>Removes "abandoned" and adds "pressed" state (if "abandoned" state is set)</li>
     * </ul>
     *
     * @param e {Event} Mouse event
     * @return {void}
     */
    _onMouseOver : function(e)
    {
      if (!this.isEnabled() || e.getTarget() !== this) {
        return;
      }

      if (this.hasState("abandoned"))
      {
        this.removeState("abandoned");
        this.addState("pressed");
      }

      this.addState("hovered");
    },


    /**
     * Listener method for "mouseout" event
     * <ul>
     * <li>Removes "hovered" state</li>
     * <li>Adds "abandoned" and removes "pressed" state (if "pressed" state is set)</li>
     * </ul>
     *
     * @param e {Event} Mouse event
     * @return {void}
     */
    _onMouseOut : function(e)
    {
      if (!this.isEnabled() || e.getTarget() !== this) {
        return;
      }

      this.removeState("hovered");

      if (this.hasState("pressed"))
      {
        this.removeState("pressed");
        this.addState("abandoned");
      }
    },


    /**
     * Listener method for "mousedown" event
     * <ul>
     * <li>Removes "abandoned" state</li>
     * <li>Adds "pressed" state</li>
     * </ul>
     *
     * @param e {Event} Mouse event
     * @return {void}
     */
    _onMouseDown : function(e)
    {
      if (!e.isLeftPressed()) {
        return;
      }

      e.stopPropagation();

      // Activate capturing if the button get a mouseout while
      // the button is pressed.
      this.capture();

      this.removeState("abandoned");
      this.addState("pressed");
    },


    /**
     * Listener method for "mouseup" event
     * <ul>
     * <li>Removes "pressed" state (if set)</li>
     * <li>Removes "abandoned" state (if set)</li>
     * <li>Adds "hovered" state (if "abandoned" state is not set)</li>
     *</ul>
     *
     * @param e {Event} Mouse event
     * @return {void}
     */
    _onMouseUp : function(e)
    {
      this.releaseCapture();

      // We must remove the states before executing the command
      // because in cases were the window lost the focus while
      // executing we get the capture phase back (mouseout).
      var hasPressed = this.hasState("pressed");
      var hasAbandoned = this.hasState("abandoned");

      if (hasPressed) {
        this.removeState("pressed");
      }

      if (hasAbandoned)
      {
        this.removeState("abandoned");
      }
      else
      {
        this.addState("hovered");

        if (hasPressed) {
          this.execute();
        }
      }
      e.stopPropagation();
    },


    /**
     * Listener method for "keydown" event.<br/>
     * Removes "abandoned" and adds "pressed" state
     * for the keys "Enter" or "Space"
     *
     * @param e {Event} Key event
     * @return {void}
     */
    _onKeyDown : function(e)
    {
      switch(e.getKeyIdentifier())
      {
        case "Enter":
        case "Space":
          this.removeState("abandoned");
          this.addState("pressed");
          e.stopPropagation();
      }
    },


    /**
     * Listener method for "keyup" event.<br/>
     * Removes "abandoned" and "pressed" state (if "pressed" state is set)
     * for the keys "Enter" or "Space"
     *
     * @param e {Event} Key event
     * @return {void}
     */
    _onKeyUp : function(e)
    {
      switch(e.getKeyIdentifier())
      {
        case "Enter":
        case "Space":
          if (this.hasState("pressed"))
          {
            this.removeState("abandoned");
            this.removeState("pressed");
            this.execute();
            e.stopPropagation();
          }
      }
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
     2006 STZ-IDA, Germany, http://www.stz-ida.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
   * Sebastian Werner (wpbasti)
   * Andreas Ecker (ecker)
   * Fabian Jakobs (fjakobs)
   * Alexander Steitz (aback)
   * Martin Wittemann (martinwittemann)

************************************************************************* */

/* ************************************************************************

#asset(qx/icon/Tango/16/places/folder-open.png)
#asset(qx/icon/Tango/16/places/folder.png)
#asset(qx/icon/Tango/16/mimetypes/office-document.png)

#asset(qx/icon/Tango/16/actions/window-close.png)

#asset(qx/icon/Tango/22/places/folder-open.png)
#asset(qx/icon/Tango/22/places/folder.png)
#asset(qx/icon/Tango/22/mimetypes/office-document.png)

#asset(qx/icon/Tango/32/places/folder-open.png)
#asset(qx/icon/Tango/32/places/folder.png)
#asset(qx/icon/Tango/32/mimetypes/office-document.png)

#asset(qx/icon/Tango/16/apps/office-calendar.png)
#asset(qx/icon/Tango/16/apps/utilities-color-chooser.png)
#asset(qx/icon/Tango/16/actions/view-refresh.png)

#asset(qx/icon/Tango/16/actions/dialog-cancel.png)
#asset(qx/icon/Tango/16/actions/dialog-ok.png)

#asset(qx/decoration/Modern/*)

************************************************************************* */

/**
 * The modern appearance theme.
 */
qx.Theme.define("qx.theme.modern.Appearance",
{
  appearances :
  {
    /*
    ---------------------------------------------------------------------------
      CORE
    ---------------------------------------------------------------------------
    */

    "widget" : {},

    "root" :
    {
      style : function(states)
      {
        return {
          backgroundColor : "background-application",
          textColor       : "text-label",
          font            : "default"
        };
      }
    },

    "label" :
    {
      style : function(states)
      {
        return {
          textColor : states.disabled ? "text-disabled" : undefined
        };
      }
    },

    "move-frame" :
    {
      style : function(states)
      {
        return {
          decorator : "main"
        };
      }
    },

    "resize-frame" : "move-frame",

    "dragdrop-cursor" :
    {
      style : function(states)
      {
        var icon = "nodrop";

        if (states.copy) {
          icon = "copy";
        } else if (states.move) {
          icon = "move";
        } else if (states.alias) {
          icon = "alias";
        }

        return {
          source : "decoration/cursors/" + icon + ".gif",
          position : "right-top",
          offset : [ 2, 16, 2, 6 ]
        };
      }
    },

    "image" :
    {
      style : function(states)
      {
        return {
          opacity : !states.replacement && states.disabled ? 0.3 : 1
        };
      }
    },

    "atom" : {},
    "atom/label" : "label",
    "atom/icon" : "image",

    "popup" :
    {
      style : function(states)
      {
        var useCSS = qx.core.Environment.get("css.boxshadow");

        return {
          decorator : useCSS ? "popup-css" : "main",
          backgroundColor : "background-light",
          shadow : useCSS ? undefined : "shadow-popup"
        };
      }
    },





    /*
    ---------------------------------------------------------------------------
      BUTTON
    ---------------------------------------------------------------------------
    */

    "button-frame" :
    {
      alias : "atom",

      style : function(states)
      {
        var decorator, textColor;
        var padding = [3, 9]; // default padding css-case

        if (states.checked && states.focused && !states.inner)
        {
          decorator = "button-checked-focused";
          textColor = undefined;
          padding = [1, 7];
        }
        else if (states.disabled)
        {
          decorator = "button-disabled";
          textColor = undefined;
        }
        else if (states.pressed)
        {
          decorator = "button-pressed";
          textColor = "text-hovered";
        }
        else if (states.checked)
        {
          decorator = "button-checked";
          textColor = undefined;
        }
        else if (states.hovered)
        {
          decorator = "button-hovered";
          textColor = "text-hovered";
        }
        else if (states.focused && !states.inner)
        {
          decorator = "button-focused";
          textColor = undefined;
          padding = [1, 7];
        }
        else
        {
          decorator = "button";
          textColor = undefined;
        }

        var shadow;
        // feature detect if we should use the CSS decorators
        if (qx.core.Environment.get("css.borderradius") &&
            qx.core.Environment.get("css.gradients")) {
          if (states.invalid && !states.disabled) {
            decorator += "-invalid-css";
          } else {
            decorator += "-css";
          }
        } else {
          shadow = states.invalid && !states.disabled ? "button-invalid-shadow" : undefined;
          padding = [2, 8];
        }

        return {
          decorator : decorator,
          textColor : textColor,
          shadow : shadow,
          padding : padding,
          margin : [1, 0]
        };
      }
    },

    "button-frame/image" :
    {
      style : function(states)
      {
        return {
          opacity : !states.replacement && states.disabled ? 0.5 : 1
        };
      }
    },

    "button" :
    {
      alias : "button-frame",
      include : "button-frame",

      style : function(states)
      {
        return {
          center : true
        };
      }
    },

    "hover-button" :
    {
      alias : "atom",
      include : "atom",

      style : function(states)
      {
        var decorator = states.hovered ? "selected" : undefined;
        if (decorator && qx.core.Environment.get("css.gradients")) {
          decorator += "-css";
        }
        return {
          decorator : decorator,
          textColor : states.hovered ? "text-selected" : undefined
        };
      }
    },

    "splitbutton" : {},
    "splitbutton/button" : "button",
    "splitbutton/arrow" :
    {
      alias : "button",
      include : "button",

      style : function(states, superStyles)
      {
        return {
          icon : "decoration/arrows/down.png",
          padding : [superStyles.padding[0], superStyles.padding[1] - 6],
          marginLeft : 1
        };
      }
    },





    /*
    ---------------------------------------------------------------------------
      FORM FIELDS
    ---------------------------------------------------------------------------
    */

    "checkbox":
    {
      alias : "atom",

      style : function(states)
      {
        var useCSS = qx.core.Environment.get("css.gradients") &&
          qx.core.Environment.get("css.boxshadow");

        var icon;
        if (useCSS) {
          if (states.checked) {
            icon = "decoration/form/checked.png";
          } else if (states.undetermined) {
            icon = "decoration/form/undetermined.png";
          } else {
            icon = "qx/static/blank.gif";
          }

        } else {
          // The "disabled" icon is set to an icon **without** the -disabled
          // suffix on purpose. This is because the Image widget handles this
          // already by replacing the current image with a disabled version
          // (if available). If no disabled image is found, the opacity style
          // is used.

          // Checked
          if (states.checked) {
            if (states.disabled) {
              icon = "checkbox-checked";
            } else if (states.focused) {
              icon = "checkbox-checked-focused";
            } else if (states.pressed) {
              icon = "checkbox-checked-pressed";
            } else if (states.hovered) {
              icon = "checkbox-checked-hovered";
            } else {
              icon = "checkbox-checked";
            }

          // Undetermined
          } else if (states.undetermined) {
            if (states.disabled) {
              icon = "checkbox-undetermined";
            } else if (states.focused) {
              icon = "checkbox-undetermined-focused";
            } else if (states.hovered) {
              icon = "checkbox-undetermined-hovered";
            } else {
              icon = "checkbox-undetermined";
            }

          // Focused & Pressed & Hovered (when enabled)
          } else if (!states.disabled) {
            if (states.focused) {
              icon = "checkbox-focused";
            } else if (states.pressed) {
              icon = "checkbox-pressed";
            } else if (states.hovered ) {
              icon = "checkbox-hovered";
            }
          }

          // Unchecked
          icon = icon || "checkbox";

          var invalid = states.invalid && !states.disabled ? "-invalid" : "";
          icon = "decoration/form/" + icon + invalid + ".png";
        }

        return {
          icon: icon,
          minWidth : useCSS ? 14 : undefined, // ensure that we have the old padding
          gap: useCSS ? 8 : 6 // use a bigger gap because of the shadow (glow)
        };
      }
    },

    "checkbox/icon" : {
      style : function(states)
      {
        var useCSS = qx.core.Environment.get("css.gradients") &&
          qx.core.Environment.get("css.boxshadow");
        if (!useCSS) {
          // same as image
          return {opacity : !states.replacement && states.disabled ? 0.3 : 1};
        }

        var decorator;

        if (states.disabled) {
          decorator = "checkbox-disabled";
        } else if (states.focused) {
          decorator = "checkbox-focused";
        } else if (states.hovered) {
          decorator = "checkbox-hovered";
        } else {
          decorator = "checkbox";
        }

        decorator += states.invalid && !states.disabled ? "-invalid" : "";

        var padding;
        // Undetermined
        if (states.undetermined) {
          padding = [2, 0];
        }

        return {
          decorator : decorator,
          padding : padding,
          width: 12, // use 12 to allow the inset of the decorator to be applied
          height: 10
        }
      }
    },

    "radiobutton":
    {
      alias : "atom",

      style : function(states)
      {
        var useCSS = qx.core.Environment.get("css.borderradius") &&
          qx.core.Environment.get("css.boxshadow");

        var icon;
        if (useCSS) {
          icon = "qx/static/blank.gif";
        } else {
          // "disabled" state is not handled here with purpose. The image widget
          // does handle this already by replacing the current image with a
          // disabled version (if available). If no disabled image is found the
          // opacity style is used.
          if (states.checked && states.focused) {
            icon = "radiobutton-checked-focused";
          } else if (states.checked && states.disabled) {
            icon = "radiobutton-checked-disabled";
          } else if (states.checked && states.hovered) {
            icon = "radiobutton-checked-hovered";
          } else if (states.checked) {
            icon = "radiobutton-checked";
          } else if (states.focused) {
            icon = "radiobutton-focused";
          } else if (states.hovered) {
            icon = "radiobutton-hovered";
          } else {
            icon = "radiobutton";
          }

          var invalid = states.invalid && !states.disabled ? "-invalid" : "";
          icon = "decoration/form/" + icon + invalid + ".png";
        }
        return {
          icon: icon,
          gap : useCSS ? 8 : 6 // use a bigger gap because of the shadow (glow)
        };
      }
    },

    "radiobutton/icon" : {
      style : function(states)
      {
        var useCSS = qx.core.Environment.get("css.borderradius") &&
          qx.core.Environment.get("css.boxshadow");
        if (!useCSS) {
          // same as image
          return {opacity : !states.replacement && states.disabled ? 0.3 : 1};
        }

        var decorator;

        if (states.disabled && !states.checked) {
          decorator = "radiobutton-disabled";
        } else if (states.checked && states.focused) {
          decorator = "radiobutton-checked-focused";
        } else if (states.checked && states.disabled) {
          decorator = "radiobutton-checked-disabled";
        } else if (states.checked && states.hovered) {
          decorator = "radiobutton-checked-hovered";
        } else if (states.checked) {
          decorator = "radiobutton-checked";
        } else if (states.focused) {
          decorator = "radiobutton-focused";
        } else if (states.hovered) {
          decorator = "radiobutton-hovered";
        } else {
          decorator = "radiobutton";
        }

        decorator += states.invalid && !states.disabled ? "-invalid" : "";

        return {
          decorator : decorator,
          width: 12, // use 12 to allow the inset of the decorator to be applied
          height: 10
        }
      }
    },

    "textfield" :
    {
      style : function(states)
      {
        var decorator;

        var focused = !!states.focused;
        var invalid = !!states.invalid;
        var disabled = !!states.disabled;

        if (focused && invalid && !disabled) {
          decorator = "input-focused-invalid";
        } else if (focused && !invalid && !disabled) {
          decorator = "input-focused";
        } else if (disabled) {
          decorator = "input-disabled";
        } else if (!focused && invalid && !disabled) {
          decorator = "border-invalid";
        } else {
          decorator = "input";
        }

        if (qx.core.Environment.get("css.gradients")) {
          decorator += "-css";
        }

        var textColor;
        if (states.disabled) {
          textColor = "text-disabled";
        } else if (states.showingPlaceholder) {
          textColor = "text-placeholder";
        } else {
          textColor = "text-input";
        }

        return {
          decorator : decorator,
          padding : [ 2, 4, 1 ],
          textColor : textColor
        };
      }
    },

    "textarea" :
    {
      include : "textfield",

      style : function(states)
      {
        return {
          padding   : 4
        };
      }
    },




    /*
    ---------------------------------------------------------------------------
      SPINNER
    ---------------------------------------------------------------------------
    */

    "spinner" :
    {
      style : function(states)
      {
        var decorator;

        var focused = !!states.focused;
        var invalid = !!states.invalid;
        var disabled = !!states.disabled;

        if (focused && invalid && !disabled) {
          decorator = "input-focused-invalid";
        } else if (focused && !invalid && !disabled) {
          decorator = "input-focused";
        } else if (disabled) {
          decorator = "input-disabled";
        } else if (!focused && invalid && !disabled) {
          decorator = "border-invalid";
        } else {
          decorator = "input";
        }

        if (qx.core.Environment.get("css.gradients")) {
          decorator += "-css";
        }

        return {
          decorator : decorator
        };
      }
    },

    "spinner/textfield" :
    {
      style : function(states)
      {
        return {
          marginRight: 2,
          padding: [2, 4, 1],
          textColor: states.disabled ? "text-disabled" : "text-input"
        };
      }
    },

    "spinner/upbutton" :
    {
      alias : "button-frame",
      include : "button-frame",

      style : function(states, superStyles)
      {
        return {
          icon : "decoration/arrows/up-small.png",
          padding : [superStyles.padding[0] - 1, superStyles.padding[1] - 5],
          shadow: undefined,
          margin : 0
        };
      }
    },

    "spinner/downbutton" :
    {
      alias : "button-frame",
      include : "button-frame",

      style : function(states, superStyles)
      {
        return {
          icon : "decoration/arrows/down-small.png",
          padding : [superStyles.padding[0] - 1, superStyles.padding[1] - 5],
          shadow: undefined,
          margin : 0
        };
      }
    },





    /*
    ---------------------------------------------------------------------------
      DATEFIELD
    ---------------------------------------------------------------------------
    */

    "datefield" : "combobox",

    "datefield/button" :
    {
      alias : "combobox/button",
      include : "combobox/button",

      style : function(states)
      {
        return {
          icon : "icon/16/apps/office-calendar.png",
          padding : [0, 3],
          decorator : undefined
        };
      }
    },

    "datefield/textfield" : "combobox/textfield",

    "datefield/list" :
    {
      alias : "datechooser",
      include : "datechooser",

      style : function(states)
      {
        return {
          decorator : undefined
        };
      }
    },





    /*
    ---------------------------------------------------------------------------
      GROUP BOX
    ---------------------------------------------------------------------------
    */

    "groupbox" :
    {
      style : function(states)
      {
        return {
          legendPosition : "top"
        };
      }
    },

    "groupbox/legend" :
    {
      alias : "atom",

      style : function(states)
      {
        return {
          padding   : [1, 0, 1, 4],
          textColor : states.invalid ? "invalid" : "text-title",
          font      : "bold"
        };
      }
    },

    "groupbox/frame" :
    {
      style : function(states)
      {
        var useCSS = qx.core.Environment.get("css.borderradius");
        return {
          padding : useCSS ? 10 : 12,
          margin : useCSS ? 1 : undefined,
          decorator : useCSS ? "group-css" : "group"
        };
      }
    },


    "check-groupbox" : "groupbox",

    "check-groupbox/legend" :
    {
      alias : "checkbox",
      include : "checkbox",

      style : function(states)
      {
        return {
          padding   : [1, 0, 1, 4],
          textColor : states.invalid ? "invalid" : "text-title",
          font      : "bold"
        };
      }
    },

    "radio-groupbox" : "groupbox",

    "radio-groupbox/legend" :
    {
      alias : "radiobutton",
      include : "radiobutton",

      style : function(states)
      {
        return {
          padding   : [1, 0, 1, 4],
          textColor : states.invalid ? "invalid" : "text-title",
          font      : "bold"
        };
      }
    },






    /*
    ---------------------------------------------------------------------------
      SCROLLAREA
    ---------------------------------------------------------------------------
    */

    "scrollarea" :
    {
      style : function(states)
      {
        return {
          // since the scroll container disregards the min size of the scrollbars
          // we have to set the min size of the scroll area to ensure that the
          // scrollbars always have an usable size.
          minWidth : 50,
          minHeight : 50
        };
      }
    },

    "scrollarea/corner" :
    {
      style : function(states)
      {
        return {
          backgroundColor : "background-application"
        };
      }
    },

    "scrollarea/pane" : "widget",
    "scrollarea/scrollbar-x" : "scrollbar",
    "scrollarea/scrollbar-y" : "scrollbar",






    /*
    ---------------------------------------------------------------------------
      SCROLLBAR
    ---------------------------------------------------------------------------
    */

    "scrollbar" :
    {
      style : function(states)
      {
        if (states["native"]) {
          return {};
        }

        var useCSS = qx.core.Environment.get("css.gradients");
        var decorator = states.horizontal ? "scrollbar-horizontal" : "scrollbar-vertical";
        if (useCSS) {
          decorator += "-css";
        }

        return {
          width     : states.horizontal ? undefined : 16,
          height    : states.horizontal ? 16 : undefined,
          decorator : decorator,
          padding   : 1
        };
      }
    },

    "scrollbar/slider" :
    {
      alias : "slider",

      style : function(states)
      {
        return {
          padding : states.horizontal ? [0, 1, 0, 1] : [1, 0, 1, 0]
        };
      }
    },

    "scrollbar/slider/knob" :
    {
      include : "button-frame",

      style : function(states)
      {
        var useCSS = qx.core.Environment.get("css.gradients");

        var decorator = states.horizontal ? "scrollbar-slider-horizontal" :
                                            "scrollbar-slider-vertical";
        if (states.disabled) {
          decorator += "-disabled";
        }
        if (useCSS) {
          decorator += "-css";
        }

        return {
          decorator : decorator,
          minHeight : states.horizontal ? undefined : 9,
          minWidth  : states.horizontal ? 9 : undefined,
          padding : undefined,
          margin : 0
        };
      }
    },

    "scrollbar/button" :
    {
      alias : "button-frame",
      include : "button-frame",

      style : function(states)
      {
        var icon = "decoration/scrollbar/scrollbar-";
        if (states.left) {
          icon += "left.png";
        } else if (states.right) {
          icon += "right.png";
        } else if (states.up) {
          icon += "up.png";
        } else {
          icon += "down.png";
        }

        var useCSS = qx.core.Environment.get("css.gradients");

        if (states.left || states.right)
        {
          var paddingLeft = states.left ? 3 : 4;
          return {
            padding : useCSS ? [3, 0, 3, paddingLeft] : [2, 0, 2, paddingLeft],
            icon : icon,
            width: 15,
            height: 14,
            margin: 0
          };
        }
        else
        {

          return {
            padding : useCSS ? 3 : [3, 2],
            icon : icon,
            width: 14,
            height: 15,
            margin: 0
          };
        }
      }
    },

    "scrollbar/button-begin" : "scrollbar/button",
    "scrollbar/button-end" : "scrollbar/button",





    /*
    ---------------------------------------------------------------------------
      SLIDER
    ---------------------------------------------------------------------------
    */

    "slider" :
    {
      style : function(states)
      {
        var decorator;

        var focused = !!states.focused;
        var invalid = !!states.invalid;
        var disabled = !!states.disabled;

        if (focused && invalid && !disabled) {
          decorator = "input-focused-invalid";
        } else if (focused && !invalid && !disabled) {
          decorator = "input-focused";
        } else if (disabled) {
          decorator = "input-disabled";
        } else if (!focused && invalid && !disabled) {
          decorator = "border-invalid";
        } else {
          decorator = "input";
        }

        if (qx.core.Environment.get("css.gradients")) {
          decorator += "-css";
        }

        return {
          decorator : decorator
        };
      }
    },

    "slider/knob" :
    {
      include : "button-frame",

      style : function(states)
      {
        return {
          decorator : states.disabled ? "scrollbar-slider-horizontal-disabled" :
                                        "scrollbar-slider-horizontal",
          shadow: undefined,
          height : 14,
          width : 14,
          padding: 0
        };
      }
    },





    /*
    ---------------------------------------------------------------------------
      LIST
    ---------------------------------------------------------------------------
    */

    "list" :
    {
      alias : "scrollarea",

      style : function(states)
      {
        var decorator;

        var focused = !!states.focused;
        var invalid = !!states.invalid;
        var disabled = !!states.disabled;

        if (focused && invalid && !disabled) {
          decorator = "input-focused-invalid";
        } else if (focused && !invalid && !disabled) {
          decorator = "input-focused";
        } else if (disabled) {
          decorator = "input-disabled";
        } else if (!focused && invalid && !disabled) {
          decorator = "border-invalid";
        } else {
          decorator = "input";
        }

        if (qx.core.Environment.get("css.gradients")) {
          decorator += "-css";
        }

        return {
          backgroundColor : "background-light",
          decorator : decorator
        };
      }
    },

    "list/pane" : "widget",

    "listitem" :
    {
      alias : "atom",

      style : function(states)
      {
        var decorator;
        if (states.dragover) {
          decorator = states.selected ? "selected-dragover" : "dragover";
        } else {
          decorator = states.selected ? "selected" : undefined;
          if (decorator && qx.core.Environment.get("css.gradients")) {
            decorator += "-css";
          }
        }

        return {
          padding   : states.dragover ? [4, 4, 2, 4] : 4,
          textColor : states.selected ? "text-selected" : undefined,
          decorator : decorator
        };
      }
    },





    /*
    ---------------------------------------------------------------------------
      SLIDEBAR
    ---------------------------------------------------------------------------
    */

    "slidebar" : {},
    "slidebar/scrollpane" : {},
    "slidebar/content" : {},

    "slidebar/button-forward" :
    {
      alias : "button-frame",
      include : "button-frame",

      style : function(states)
      {
        return {
          padding : 5,
          center : true,
          icon : states.vertical ?
            "decoration/arrows/down.png" :
            "decoration/arrows/right.png"
        };
      }
    },

    "slidebar/button-backward" :
    {
      alias : "button-frame",
      include : "button-frame",

      style : function(states)
      {
        return {
          padding : 5,
          center : true,
          icon : states.vertical ?
            "decoration/arrows/up.png" :
            "decoration/arrows/left.png"
        };
      }
    },




    /*
    ---------------------------------------------------------------------------
      TABVIEW
    ---------------------------------------------------------------------------
    */

    "tabview" :
    {
      style : function(states)
      {
        return {
          contentPadding : 16
        };
      }
    },

    "tabview/bar" :
    {
      alias : "slidebar",

      style : function(states)
      {
        var useCSS = qx.core.Environment.get("css.borderradius") &&
          qx.core.Environment.get("css.boxshadow") &&
          qx.core.Environment.get("css.gradients");

        var result =
        {
          marginBottom : states.barTop ? -1 : 0,
          marginTop : states.barBottom ? useCSS ? -4 : -7 : 0,
          marginLeft : states.barRight ? useCSS ? -3 : -5 : 0,
          marginRight : states.barLeft ? -1 : 0,
          paddingTop : 0,
          paddingRight : 0,
          paddingBottom : 0,
          paddingLeft : 0
        };

        if (states.barTop || states.barBottom)
        {
          result.paddingLeft = 5;
          result.paddingRight = 7;
        }
        else
        {
          result.paddingTop = 5;
          result.paddingBottom = 7;
        }

        return result;
      }
    },

    "tabview/bar/button-forward" :
    {
      include : "slidebar/button-forward",
      alias : "slidebar/button-forward",

      style : function(states)
      {
        if (states.barTop || states.barBottom)
        {
          return {
            marginTop : 2,
            marginBottom: 2
          };
        }
        else
        {
          return {
            marginLeft : 2,
            marginRight : 2
          };
        }
      }
    },

    "tabview/bar/button-backward" :
    {
      include : "slidebar/button-backward",
      alias : "slidebar/button-backward",

      style : function(states)
      {
        if (states.barTop || states.barBottom)
        {
          return {
            marginTop : 2,
            marginBottom: 2
          };
        }
        else
        {
          return {
            marginLeft : 2,
            marginRight : 2
          };
        }
      }
    },

    "tabview/bar/scrollpane" : {},

    "tabview/pane" :
    {
      style : function(states)
      {
        var useCSS = qx.core.Environment.get("css.gradients") &&
          qx.core.Environment.get("css.borderradius");
        return {
          decorator : useCSS ? "tabview-pane-css" : "tabview-pane",
          minHeight : 100,

          marginBottom : states.barBottom ? -1 : 0,
          marginTop : states.barTop ? -1 : 0,
          marginLeft : states.barLeft ? -1 : 0,
          marginRight : states.barRight ? -1 : 0
        };
      }
    },

    "tabview-page" : {
      alias : "widget",
      include : "widget",

      style : function(states) {
        // is used for the padding of the pane
        var useCSS = qx.core.Environment.get("css.gradients") &&
          qx.core.Environment.get("css.borderradius");
        return {
          padding : useCSS ? [4, 3] : undefined
        }
      }
    },

    "tabview-page/button" :
    {
      alias : "atom",

      style : function(states)
      {
        var decorator, padding=0;
        var marginTop=0, marginBottom=0, marginLeft=0, marginRight=0;

        var useCSS = qx.core.Environment.get("css.borderradius") &&
          qx.core.Environment.get("css.boxshadow") &&
          qx.core.Environment.get("css.gradients");

        if (states.checked)
        {
          if (states.barTop)
          {
            decorator = "tabview-page-button-top-active";
            padding = useCSS ? [5, 11] : [ 6, 14 ];
            marginLeft = states.firstTab ? 0 : -5;
            marginRight = states.lastTab ? 0 : -5;
          }
          else if (states.barBottom)
          {
            decorator = "tabview-page-button-bottom-active";
            padding = useCSS ? [5, 11] : [ 6, 14 ];
            marginLeft = states.firstTab ? 0 : -5;
            marginRight = states.lastTab ? 0 : -5;
            marginTop = 3;
          }
          else if (states.barRight)
          {
            decorator = "tabview-page-button-right-active";
            padding = useCSS ? [5, 10] : [ 6, 13 ];
            marginTop = states.firstTab ? 0 : -5;
            marginBottom = states.lastTab ? 0 : -5;
            marginLeft = 2;
          }
          else
          {
            decorator = "tabview-page-button-left-active";
            padding = useCSS ? [5, 10] : [ 6, 13 ];
            marginTop = states.firstTab ? 0 : -5;
            marginBottom = states.lastTab ? 0 : -5;
          }
        }
        else
        {
          if (states.barTop)
          {
            decorator = "tabview-page-button-top-inactive";
            padding = useCSS ? [3, 9] : [ 4, 10 ];
            marginTop = 4;
            marginLeft = states.firstTab ? 5 : 1;
            marginRight = 1;
          }
          else if (states.barBottom)
          {
            decorator = "tabview-page-button-bottom-inactive";
            padding = useCSS ? [3, 9] : [ 4, 10 ];
            marginBottom = 4;
            marginLeft = states.firstTab ? 5 : 1;
            marginRight = 1;
            marginTop = 3;
          }
          else if (states.barRight)
          {
            decorator = "tabview-page-button-right-inactive";
            padding = useCSS ? [3, 9] : [ 4, 10 ];
            marginRight = 5;
            marginTop = states.firstTab ? 5 : 1;
            marginBottom = 1;
            marginLeft = 3;
          }
          else
          {
            decorator = "tabview-page-button-left-inactive";
            padding = useCSS ? [3, 9] : [ 4, 10 ];
            marginLeft = 5;
            marginTop = states.firstTab ? 5 : 1;
            marginBottom = 1;
            marginRight = 1;
          }
        }

        if (decorator && useCSS) {
          decorator += "-css";
        }

        return {
          zIndex : states.checked ? 10 : 5,
          decorator : decorator,
          padding   : padding,
          marginTop : marginTop,
          marginBottom : marginBottom,
          marginLeft : marginLeft,
          marginRight : marginRight,
          textColor : states.disabled ? "text-disabled" :
            states.checked ? "text-active" : "text-inactive"
        };
      }
    },

    "tabview-page/button/label" :
    {
      alias : "label",

      style : function(states)
      {
        return {
          padding : [0, 1, 0, 1],
          margin : states.focused ? 0 : 1,
          decorator : states.focused ? "keyboard-focus" : undefined
        };
      }
    },

    "tabview-page/button/close-button" :
    {
      alias : "atom",
      style : function(states)
      {
        return {
          icon : "qx/icon/Tango/16/actions/window-close.png"
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
      TOOLBAR
    ---------------------------------------------------------------------------
    */

    "toolbar" :
    {
      style : function(states)
      {
        var useCSS = qx.core.Environment.get("css.gradients");
        return {
          decorator : useCSS ? "toolbar-css" : "toolbar",
          spacing : 2
        };
      }
    },

    "toolbar/part" :
    {
      style : function(states)
      {
        return {
          decorator : "toolbar-part",
          spacing : 2
        };
      }
    },

    "toolbar/part/container" :
    {
      style : function(states)
      {
        return {
          paddingLeft : 2,
          paddingRight : 2
        };
      }
    },

    "toolbar/part/handle" :
    {
      style : function(states)
      {
        return {
          source : "decoration/toolbar/toolbar-handle-knob.gif",
          marginLeft : 3,
          marginRight : 3
        };
      }
    },

    "toolbar-button" :
    {
      alias : "atom",

      style : function(states)
      {
        var decorator;
        if (
          states.pressed ||
          (states.checked && !states.hovered) ||
          (states.checked && states.disabled))
        {
          decorator = "toolbar-button-checked";
        } else if (states.hovered && !states.disabled) {
          decorator = "toolbar-button-hovered";
        }

        var useCSS = qx.core.Environment.get("css.gradients") &&
          qx.core.Environment.get("css.borderradius");
        if (useCSS && decorator) {
          decorator += "-css";
        }

        return {
          marginTop : 2,
          marginBottom : 2,
          padding : (states.pressed || states.checked || states.hovered) && !states.disabled
                    || (states.disabled && states.checked) ? 3 : 5,
          decorator : decorator
        };
      }
    },

    "toolbar-menubutton" :
    {
      alias : "toolbar-button",
      include : "toolbar-button",

      style : function(states)
      {
        return {
          showArrow : true
        };
      }
    },

    "toolbar-menubutton/arrow" :
    {
      alias : "image",
      include : "image",

      style : function(states)
      {
        return {
          source : "decoration/arrows/down-small.png"
        };
      }
    },

    "toolbar-splitbutton" :
    {
      style : function(states)
      {
        return {
          marginTop : 2,
          marginBottom : 2
        };
      }
    },

    "toolbar-splitbutton/button" :
    {
      alias : "toolbar-button",
      include : "toolbar-button",

      style : function(states)
      {
        return {
          icon : "decoration/arrows/down.png",
          marginTop : undefined,
          marginBottom : undefined
        };
      }
    },

    "toolbar-splitbutton/arrow" :
    {
      alias : "toolbar-button",
      include : "toolbar-button",

      style : function(states)
      {
        if (states.pressed || states.checked || (states.hovered && !states.disabled)) {
          var padding = 1;
        } else {
          var padding = 3;
        }

        return {
          padding : padding,
          icon : "decoration/arrows/down.png",
          marginTop : undefined,
          marginBottom : undefined
        };
      }
    },

    "toolbar-separator" :
    {
      style : function(states)
      {
        return {
          decorator : "toolbar-separator",
          margin    : 7
        };
      }
    },




    /*
    ---------------------------------------------------------------------------
      TREE
    ---------------------------------------------------------------------------
    */

    "tree" : "list",

    "tree-item" :
    {
      style : function(states)
      {
        var decorator = states.selected ? "selected" : undefined;
        if (decorator && qx.core.Environment.get("css.gradients")) {
          decorator += "-css";
        }

        return {
          padding    : [ 2, 6 ],
          textColor  : states.selected ? "text-selected" : undefined,
          decorator  : decorator
        };
      }
    },

    "tree-item/icon" :
    {
      include : "image",

      style : function(states)
      {
        return {
          paddingRight : 5
        };
      }
    },

    "tree-item/label" : "label",

    "tree-item/open" :
    {
      include : "image",

      style : function(states)
      {
        var icon;
        if (states.selected && states.opened)
        {
          icon = "decoration/tree/open-selected.png";
        }
        else if (states.selected && !states.opened)
        {
          icon = "decoration/tree/closed-selected.png";
        }
        else if (states.opened)
        {
          icon = "decoration/tree/open.png";
        }
        else
        {
          icon = "decoration/tree/closed.png";
        }

        return {
          padding : [0, 5, 0, 2],
          source  : icon
        };
      }
    },

    "tree-folder" :
    {
      include : "tree-item",
      alias : "tree-item",

      style : function(states)
      {
        var icon, iconOpened;
        if (states.small) {
          icon = states.opened ? "icon/16/places/folder-open.png" : "icon/16/places/folder.png";
          iconOpened = "icon/16/places/folder-open.png";
        } else if (states.large) {
          icon = states.opened ? "icon/32/places/folder-open.png" : "icon/32/places/folder.png";
          iconOpened = "icon/32/places/folder-open.png";
        } else {
          icon = states.opened ? "icon/22/places/folder-open.png" : "icon/22/places/folder.png";
          iconOpened = "icon/22/places/folder-open.png";
        }

        return {
          icon : icon,
          iconOpened : iconOpened
        };
      }
    },

    "tree-file" :
    {
      include : "tree-item",
      alias : "tree-item",

      style : function(states)
      {
        return {
          icon :
            states.small ? "icon/16/mimetypes/office-document.png" :
            states.large ? "icon/32/mimetypes/office-document.png" :
            "icon/22/mimetypes/office-document.png"
        };
      }
    },





    /*
    ---------------------------------------------------------------------------
      TREEVIRTUAL
    ---------------------------------------------------------------------------
    */

    "treevirtual" : "table",

    "treevirtual-folder" :
    {
      style : function(states)
      {
        return {
          icon : states.opened ?
            "icon/16/places/folder-open.png" :
            "icon/16/places/folder.png"
        };
      }
    },

    "treevirtual-file" :
    {
      include : "treevirtual-folder",
      alias : "treevirtual-folder",

      style : function(states)
      {
        return {
          icon : "icon/16/mimetypes/office-document.png"
        };
      }
    },

    "treevirtual-line" :
    {
      style : function(states)
      {
        return {
          icon : "qx/static/blank.gif"
        };
      }
    },

    "treevirtual-contract" :
    {
      style : function(states)
      {
        return {
          icon : "decoration/tree/open.png",
          paddingLeft : 5,
          paddingTop : 2
        };
      }
    },

    "treevirtual-expand" :
    {
      style : function(states)
      {
        return {
          icon : "decoration/tree/closed.png",
          paddingLeft : 5,
          paddingTop : 2
        };
      }
    },

    "treevirtual-only-contract" : "treevirtual-contract",
    "treevirtual-only-expand" : "treevirtual-expand",
    "treevirtual-start-contract" : "treevirtual-contract",
    "treevirtual-start-expand" : "treevirtual-expand",
    "treevirtual-end-contract" : "treevirtual-contract",
    "treevirtual-end-expand" : "treevirtual-expand",
    "treevirtual-cross-contract" : "treevirtual-contract",
    "treevirtual-cross-expand" : "treevirtual-expand",

    "treevirtual-end" :
    {
      style : function(states)
      {
        return {
          icon : "qx/static/blank.gif"
        };
      }
    },

    "treevirtual-cross" :
    {
      style : function(states)
      {
        return {
          icon : "qx/static/blank.gif"
        };
      }
    },





    /*
    ---------------------------------------------------------------------------
      TOOL TIP
    ---------------------------------------------------------------------------
    */

    "tooltip" :
    {
      include : "popup",

      style : function(states)
      {
        return {
          backgroundColor : "background-tip",
          padding : [ 1, 3, 2, 3 ],
          offset : [ 15, 5, 5, 5 ]
        };
      }
    },

    "tooltip/atom" : "atom",

    "tooltip-error" :
    {
      include : "tooltip",

      style : function(states)
      {
        var useCSS = qx.core.Environment.get("css.borderradius") &&
          qx.core.Environment.get("css.boxshadow");
        return {
          textColor: "text-selected",
          backgroundColor : undefined,
          placeMethod: "widget",
          offset: [0, 0, 0, 14],
          marginTop: -2,
          position: "right-top",
          showTimeout: 100,
          hideTimeout: 10000,
          decorator: useCSS ? "tooltip-error-css" : "tooltip-error",
          shadow: "tooltip-error-arrow",
          font: "bold",
          padding: useCSS ? 3 : undefined
        };
      }
    },

    "tooltip-error/atom" : "atom",

    /*
    ---------------------------------------------------------------------------
      WINDOW
    ---------------------------------------------------------------------------
    */

    "window" :
    {
      style : function(states)
      {
        var useCSS = qx.core.Environment.get("css.borderradius") &&
          qx.core.Environment.get("css.gradients") &&
          qx.core.Environment.get("css.boxshadow");

        var decorator;
        var shadow;

        if (useCSS) {
          if (states.showStatusbar) {
            decorator = "window-incl-statusbar-css";
          } else {
            decorator = "window-css";
          }
        } else {
           shadow = "shadow-window";
        }
        return {
          decorator : decorator,
          shadow : shadow,
          contentPadding : [ 10, 10, 10, 10 ],
          margin : [0, 5, 5, 0]

        };
      }
    },

    "window-resize-frame" :
    {
      style : function(states)
      {
        var useCSS = qx.core.Environment.get("css.borderradius");
        var decorator;

        if (useCSS) {
          if (states.showStatusbar) {
            decorator = "window-resize-frame-incl-statusbar-css";
          } else {
            decorator = "window-resize-frame-css";
          }
        } else {
           decorator = "main";
        }
        return {
          decorator : decorator
        };
      }
    },

    "window/pane" :
    {
      style : function(states)
      {
        var useCSS = qx.core.Environment.get("css.borderradius") &&
          qx.core.Environment.get("css.gradients") &&
          qx.core.Environment.get("css.boxshadow");
        return {
          decorator : useCSS ? "window-pane-css" : "window"
        };
      }
    },

    "window/captionbar" :
    {
      style : function(states)
      {
        var useCSS = qx.core.Environment.get("css.borderradius") &&
          qx.core.Environment.get("css.gradients") &&
          qx.core.Environment.get("css.boxshadow");

        var decorator = states.active ? "window-captionbar-active" : "window-captionbar-inactive";
        if (useCSS) {
          decorator += "-css";
        }

        return {
          decorator    : decorator,
          textColor    : states.active ? "window-caption-active-text" : "text-gray",
          minHeight    : 26,
          paddingRight : 2
        };
      }
    },

    "window/icon" :
    {
      style : function(states)
      {
        return {
          margin : [ 5, 0, 3, 6 ]
        };
      }
    },

    "window/title" :
    {
      style : function(states)
      {
        return {
          alignY      : "middle",
          font        : "bold",
          marginLeft  : 6,
          marginRight : 12
        };
      }
    },

    "window/minimize-button" :
    {
      alias : "atom",

      style : function(states)
      {
        return {
          icon : states.active ? states.hovered ? "decoration/window/minimize-active-hovered.png" :
                                                  "decoration/window/minimize-active.png" :
                                                  "decoration/window/minimize-inactive.png",
          margin : [ 4, 8, 2, 0 ]
        };
      }
    },

    "window/restore-button" :
    {
      alias : "atom",

      style : function(states)
      {
        return {
          icon : states.active ? states.hovered ? "decoration/window/restore-active-hovered.png" :
                                                  "decoration/window/restore-active.png" :
                                                  "decoration/window/restore-inactive.png",
          margin : [ 5, 8, 2, 0 ]
        };
      }
    },

    "window/maximize-button" :
    {
      alias : "atom",

      style : function(states)
      {
        return {
          icon : states.active ? states.hovered ? "decoration/window/maximize-active-hovered.png" :
                                                  "decoration/window/maximize-active.png" :
                                                  "decoration/window/maximize-inactive.png",
          margin : [ 4, 8, 2, 0 ]
        };
      }
    },

    "window/close-button" :
    {
      alias : "atom",

      style : function(states)
      {
        return {
          icon : states.active ? states.hovered ? "decoration/window/close-active-hovered.png" :
                                                  "decoration/window/close-active.png" :
                                                  "decoration/window/close-inactive.png",
          margin : [ 4, 8, 2, 0 ]
        };
      }
    },

    "window/statusbar" :
    {
      style : function(states)
      {
        var useCSS = qx.core.Environment.get("css.borderradius") &&
          qx.core.Environment.get("css.gradients") &&
          qx.core.Environment.get("css.boxshadow");
        return {
          padding   : [ 2, 6 ],
          decorator : useCSS ? "window-statusbar-css" : "window-statusbar",
          minHeight : 18
        };
      }
    },

    "window/statusbar-text" :
    {
      style : function(states)
      {
        return {
          font : "small"
        };
      }
    },







    /*
    ---------------------------------------------------------------------------
      IFRAME
    ---------------------------------------------------------------------------
    */

    "iframe" :
    {
      style : function(states)
      {
        return {
          decorator : "main"
        };
      }
    },






    /*
    ---------------------------------------------------------------------------
      RESIZER
    ---------------------------------------------------------------------------
    */

    "resizer" :
    {
      style : function(states)
      {
        var useCSS = qx.core.Environment.get("css.boxshadow") &&
          qx.core.Environment.get("css.borderradius") &&
          qx.core.Environment.get("css.gradients");

        return {
          decorator : useCSS ? "pane-css" : "pane"
        };
      }
    },





    /*
    ---------------------------------------------------------------------------
      SPLITPANE
    ---------------------------------------------------------------------------
    */

    "splitpane" :
    {
      style : function(states)
      {
        return {
          decorator : "splitpane"
        };
      }
    },

    "splitpane/splitter" :
    {
      style : function(states)
      {
        return {
          width : states.horizontal ? 3 : undefined,
          height : states.vertical ? 3 : undefined,
          backgroundColor : "background-splitpane"
        };
      }
    },

    "splitpane/splitter/knob" :
    {
      style : function(states)
      {
        return {
          source : states.horizontal ? "decoration/splitpane/knob-horizontal.png" : "decoration/splitpane/knob-vertical.png"
        };
      }
    },

    "splitpane/slider" :
    {
      style : function(states)
      {
        return {
          width : states.horizontal ? 3 : undefined,
          height : states.vertical ? 3 : undefined,
          backgroundColor : "background-splitpane"
        };
      }
    },





    /*
    ---------------------------------------------------------------------------
      SELECTBOX
    ---------------------------------------------------------------------------
    */

    "selectbox" : "button-frame",

    "selectbox/atom" : "atom",
    "selectbox/popup" : "popup",

    "selectbox/list" : {
      alias : "list"
    },

    "selectbox/arrow" :
    {
      include : "image",

      style : function(states)
      {
        return {
          source : "decoration/arrows/down.png",
          paddingLeft : 5
        };
      }
    },





    /*
    ---------------------------------------------------------------------------
      DATE CHOOSER
    ---------------------------------------------------------------------------
    */

    "datechooser" :
    {
      style : function(states)
      {
        var decorator;

        var focused = !!states.focused;
        var invalid = !!states.invalid;
        var disabled = !!states.disabled;

        if (focused && invalid && !disabled) {
          decorator = "input-focused-invalid";
        } else if (focused && !invalid && !disabled) {
          decorator = "input-focused";
        } else if (disabled) {
          decorator = "input-disabled";
        } else if (!focused && invalid && !disabled) {
          decorator = "border-invalid";
        } else {
          decorator = "input";
        }

        if (qx.core.Environment.get("css.gradients")) {
          decorator += "-css";
        }

        return {
          padding : 2,
          decorator : decorator,
          backgroundColor : "background-light"
        };
      }
    },

    "datechooser/navigation-bar" : {},

    "datechooser/nav-button"  :
    {
      include : "button-frame",
      alias : "button-frame",

      style : function(states)
      {
        var result = {
          padding : [ 2, 4 ],
          shadow : undefined
        };

        if (states.lastYear) {
          result.icon = "decoration/arrows/rewind.png";
          result.marginRight = 1;
        } else if (states.lastMonth) {
          result.icon = "decoration/arrows/left.png";
        } else if (states.nextYear) {
          result.icon = "decoration/arrows/forward.png";
          result.marginLeft = 1;
        } else if (states.nextMonth) {
          result.icon = "decoration/arrows/right.png";
        }

        return result;
      }
    },

    "datechooser/last-year-button-tooltip" : "tooltip",
    "datechooser/last-month-button-tooltip" : "tooltip",
    "datechooser/next-year-button-tooltip" : "tooltip",
    "datechooser/next-month-button-tooltip" : "tooltip",

    "datechooser/last-year-button" : "datechooser/nav-button",
    "datechooser/last-month-button" : "datechooser/nav-button",
    "datechooser/next-month-button" : "datechooser/nav-button",
    "datechooser/next-year-button" : "datechooser/nav-button",

    "datechooser/month-year-label" :
    {
      style : function(states)
      {
        return {
          font      : "bold",
          textAlign : "center",
          textColor: states.disabled ? "text-disabled" : undefined
        };
      }
    },

    "datechooser/date-pane" :
    {
      style : function(states)
      {
        return {
          textColor: states.disabled ? "text-disabled" : undefined,
          marginTop : 2
        };
      }
    },

    "datechooser/weekday" :
    {
      style : function(states)
      {
        return {
          textColor : states.disabled ? "text-disabled" : states.weekend ? "text-light" : undefined,
          textAlign : "center",
          paddingTop : 2,
          backgroundColor : "background-medium"
        };
      }
    },

    "datechooser/week" :
    {
      style : function(states)
      {
        return {
          textAlign : "center",
          padding   : [ 2, 4 ],
          backgroundColor : "background-medium"
        };
      }
    },

    "datechooser/day" :
    {
      style : function(states)
      {
        var decorator = states.disabled ? undefined : states.selected ? "selected" : undefined;
        if (decorator && qx.core.Environment.get("css.gradients")) {
          decorator += "-css";
        }

        return {
          textAlign : "center",
          decorator : decorator,
          textColor : states.disabled ? "text-disabled" : states.selected ? "text-selected" : states.otherMonth ? "text-light" : undefined,
          font      : states.today ? "bold" : undefined,
          padding   : [ 2, 4 ]
        };
      }
    },







    /*
    ---------------------------------------------------------------------------
      COMBOBOX
    ---------------------------------------------------------------------------
    */

    "combobox" :
    {
      style : function(states)
      {
        var decorator;

        var focused = !!states.focused;
        var invalid = !!states.invalid;
        var disabled = !!states.disabled;

        if (focused && invalid && !disabled) {
          decorator = "input-focused-invalid";
        } else if (focused && !invalid && !disabled) {
          decorator = "input-focused";
        } else if (disabled) {
          decorator = "input-disabled";
        } else if (!focused && invalid && !disabled) {
          decorator = "border-invalid";
        } else {
          decorator = "input";
        }

        if (qx.core.Environment.get("css.gradients")) {
          decorator += "-css";
        }

        return {
          decorator : decorator
        };
      }
    },

    "combobox/popup" : "popup",

    "combobox/list" : {
      alias : "list"
    },

    "combobox/button" :
    {
      include : "button-frame",
      alias   : "button-frame",

      style : function(states, superStyles)
      {
        var ret = {
          icon : "decoration/arrows/down.png",
          padding : [superStyles.padding[0], superStyles.padding[1] - 6],
          shadow : undefined,
          margin : undefined
        };

        if (states.selected) {
          ret.decorator = "button-focused";
        }

        return ret;
      }
    },

    "combobox/textfield" :
    {
      include : "textfield",

      style : function(states)
      {
        return {
          decorator : undefined
        };
      }
    },






    /*
    ---------------------------------------------------------------------------
      MENU
    ---------------------------------------------------------------------------
    */

   "menu" :
    {
      style : function(states)
      {
        var useCSS = qx.core.Environment.get("css.gradients") &&
          qx.core.Environment.get("css.boxshadow");

        var result =
        {
          decorator : useCSS ? "menu-css" : "menu",
          shadow : useCSS ? undefined : "shadow-popup",
          spacingX : 6,
          spacingY : 1,
          iconColumnWidth : 16,
          arrowColumnWidth : 4,
          placementModeY : states.submenu || states.contextmenu ? "best-fit" : "keep-align"
        };

        if (states.submenu)
        {
          result.position = "right-top";
          result.offset = [-2, -3];
        }

        return result;
      }
    },

    "menu/slidebar" : "menu-slidebar",

    "menu-slidebar" : "widget",

    "menu-slidebar-button" :
    {
      style : function(states)
      {
        var decorator = states.hovered  ? "selected" : undefined;
        if (decorator && qx.core.Environment.get("css.gradients")) {
          decorator += "-css";
        }

        return {
          decorator : decorator,
          padding : 7,
          center : true
        };
      }
    },

    "menu-slidebar/button-backward" :
    {
      include : "menu-slidebar-button",

      style : function(states)
      {
        return {
          icon : states.hovered ? "decoration/arrows/up-invert.png" : "decoration/arrows/up.png"
        };
      }
    },

    "menu-slidebar/button-forward" :
    {
      include : "menu-slidebar-button",

      style : function(states)
      {
        return {
          icon : states.hovered ? "decoration/arrows/down-invert.png" : "decoration/arrows/down.png"
        };
      }
    },

    "menu-separator" :
    {
      style : function(states)
      {
        return {
          height : 0,
          decorator : "menu-separator",
          margin    : [ 4, 2 ]
        };
      }
    },

    "menu-button" :
    {
      alias : "atom",

      style : function(states)
      {
        var decorator = states.selected ? "selected" : undefined;
        if (decorator && qx.core.Environment.get("css.gradients")) {
          decorator += "-css";
        }

        return {
          decorator : decorator,
          textColor : states.selected ? "text-selected" : undefined,
          padding   : [ 4, 6 ]
        };
      }
    },

    "menu-button/icon" :
    {
      include : "image",

      style : function(states)
      {
        return {
          alignY : "middle"
        };
      }
    },

    "menu-button/label" :
    {
      include : "label",

      style : function(states)
      {
        return {
          alignY : "middle",
          padding : 1
        };
      }
    },

    "menu-button/shortcut" :
    {
      include : "label",

      style : function(states)
      {
        return {
          alignY : "middle",
          marginLeft : 14,
          padding : 1
        };
      }
    },

    "menu-button/arrow" :
    {
      include : "image",

      style : function(states)
      {
        return {
          source : states.selected ? "decoration/arrows/right-invert.png" : "decoration/arrows/right.png",
          alignY : "middle"
        };
      }
    },

    "menu-checkbox" :
    {
      alias : "menu-button",
      include : "menu-button",

      style : function(states)
      {
        return {
          icon : !states.checked ? undefined :
            states.selected ? "decoration/menu/checkbox-invert.gif" :
              "decoration/menu/checkbox.gif"
        };
      }
    },

    "menu-radiobutton" :
    {
      alias : "menu-button",
      include : "menu-button",

      style : function(states)
      {
        return {
          icon : !states.checked ? undefined :
            states.selected ? "decoration/menu/radiobutton-invert.gif" :
              "decoration/menu/radiobutton.gif"
        };
      }
    },




    /*
    ---------------------------------------------------------------------------
      MENU BAR
    ---------------------------------------------------------------------------
    */

   "menubar" :
   {
     style : function(states)
     {
       var useCSS = qx.core.Environment.get("css.gradients");
       return {
         decorator : useCSS ? "menubar-css" : "menubar"
       };
     }
   },

   "menubar-button" :
   {
     alias : "atom",

     style : function(states)
     {
       var decorator = (states.pressed || states.hovered) && !states.disabled ? "selected" : undefined;
       if (decorator && qx.core.Environment.get("css.gradients")) {
         decorator += "-css";
       }

       return {
         decorator : decorator,
         textColor : states.pressed || states.hovered ? "text-selected" : undefined,
         padding   : [ 3, 8 ]
       };
     }
   },



    /*
    ---------------------------------------------------------------------------
      COLOR SELECTOR
    ---------------------------------------------------------------------------
    */

    "colorselector" : "widget",
    "colorselector/control-bar" : "widget",
    "colorselector/control-pane": "widget",
    "colorselector/visual-pane" : "groupbox",
    "colorselector/preset-grid" : "widget",

    "colorselector/colorbucket":
    {
      style : function(states)
      {
        return {
          decorator : "main",
          width : 16,
          height : 16
        };
      }
    },

    "colorselector/preset-field-set" : "groupbox",
    "colorselector/input-field-set" : "groupbox",
    "colorselector/preview-field-set" : "groupbox",

    "colorselector/hex-field-composite" : "widget",
    "colorselector/hex-field" : "textfield",

    "colorselector/rgb-spinner-composite" : "widget",
    "colorselector/rgb-spinner-red" : "spinner",
    "colorselector/rgb-spinner-green" : "spinner",
    "colorselector/rgb-spinner-blue" : "spinner",

    "colorselector/hsb-spinner-composite" : "widget",
    "colorselector/hsb-spinner-hue" : "spinner",
    "colorselector/hsb-spinner-saturation" : "spinner",
    "colorselector/hsb-spinner-brightness" : "spinner",

    "colorselector/preview-content-old":
    {
      style : function(states)
      {
        return {
          decorator : "main",
          width : 50,
          height : 10
        };
      }
    },

    "colorselector/preview-content-new":
    {
      style : function(states)
      {
        return {
          decorator : "main",
          backgroundColor : "background-light",
          width : 50,
          height : 10
        };
      }
    },


    "colorselector/hue-saturation-field":
    {
      style : function(states)
      {
        return {
          decorator : "main",
          margin : 5
        };
      }
    },

    "colorselector/brightness-field":
    {
      style : function(states)
      {
        return {
          decorator : "main",
          margin : [5, 7]
        };
      }
    },

    "colorselector/hue-saturation-pane": "widget",
    "colorselector/hue-saturation-handle" : "widget",
    "colorselector/brightness-pane": "widget",
    "colorselector/brightness-handle" : "widget",




    /*
    ---------------------------------------------------------------------------
      COLOR POPUP
    ---------------------------------------------------------------------------
    */

    "colorpopup" :
    {
      alias : "popup",
      include : "popup",

      style : function(states)
      {
        return {
          padding : 5,
          backgroundColor : "background-application"
        };
      }
    },

    "colorpopup/field":
    {
      style : function(states)
      {
        return {
          decorator : "main",
          margin : 2,
          width : 14,
          height : 14,
          backgroundColor : "background-light"
        };
      }
    },

    "colorpopup/selector-button" : "button",
    "colorpopup/auto-button" : "button",
    "colorpopup/preview-pane" : "groupbox",

    "colorpopup/current-preview":
    {
      style : function(state)
      {
        return {
          height : 20,
          padding: 4,
          marginLeft : 4,
          decorator : "main",
          allowGrowX : true
        };
      }
    },

    "colorpopup/selected-preview":
    {
      style : function(state)
      {
        return {
          height : 20,
          padding: 4,
          marginRight : 4,
          decorator : "main",
          allowGrowX : true
        };
      }
    },

    "colorpopup/colorselector-okbutton":
    {
      alias : "button",
      include : "button",

      style : function(states)
      {
        return {
          icon : "icon/16/actions/dialog-ok.png"
        };
      }
    },

    "colorpopup/colorselector-cancelbutton":
   {
      alias : "button",
      include : "button",

      style : function(states)
      {
        return {
          icon : "icon/16/actions/dialog-cancel.png"
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
      TABLE
    ---------------------------------------------------------------------------
    */

    "table" :
    {
      alias : "widget",

      style : function(states)
      {
        return {
          decorator : "table"
        };
      }
    },

    "table/statusbar" :
    {
      style : function(states)
      {
        return {
          decorator : "table-statusbar",
          padding   : [ 0, 2 ]
        };
      }
    },

    "table/column-button" :
    {
      alias : "button-frame",

      style : function(states)
      {
        var useCSS = qx.core.Environment.get("css.gradients");
        return {
          decorator : useCSS ? "table-scroller-header-css" : "table-scroller-header",
          padding   : 3,
          icon      : "decoration/table/select-column-order.png"
        };
      }
    },

    "table-column-reset-button" :
    {
      include : "menu-button",
      alias : "menu-button",

      style : function()
      {
        return {
          icon : "icon/16/actions/view-refresh.png"
        };
      }
    },

    "table-scroller" : "widget",

    "table-scroller/scrollbar-x": "scrollbar",
    "table-scroller/scrollbar-y": "scrollbar",

    "table-scroller/header":
    {
      style : function(states)
      {
        var useCSS = qx.core.Environment.get("css.gradients");
        return {
          decorator : useCSS ? "table-scroller-header-css" : "table-scroller-header"
        };
      }
    },

    "table-scroller/pane" :
    {
      style : function(states)
      {
        return {
          backgroundColor : "table-pane"
        };
      }
    },

    "table-scroller/focus-indicator" :
    {
      style : function(states)
      {
        return {
          decorator : "table-scroller-focus-indicator"
        };
      }
    },

    "table-scroller/resize-line" :
    {
      style : function(states)
      {
        return {
          backgroundColor : "border-separator",
          width : 2
        };
      }
    },

    "table-header-cell" :
    {
      alias : "atom",
      style : function(states)
      {
        return {
          minWidth  : 13,
          minHeight : 20,
          padding   : states.hovered ? [ 3, 4, 2, 4 ] : [ 3, 4 ],
          decorator : states.hovered ? "table-header-cell-hovered" : "table-header-cell",
          sortIcon  : states.sorted ?
              (states.sortedAscending ? "decoration/table/ascending.png" : "decoration/table/descending.png")
              : undefined
        };
      }
    },

    "table-header-cell/label" :
    {
      style : function(states)
      {
        return {
          minWidth : 0,
          alignY : "middle",
          paddingRight : 5
        };
      }
    },

    "table-header-cell/sort-icon" :
    {
      style : function(states)
      {
        return {
          alignY : "middle",
          alignX : "right"
        };
      }
    },

    "table-header-cell/icon" :
    {
      style : function(states)
      {
        return {
          minWidth : 0,
          alignY : "middle",
          paddingRight : 5
        };
      }
    },

    "table-editor-textfield" :
    {
      include : "textfield",

      style : function(states)
      {
        return {
          decorator : undefined,
          padding : [ 2, 2 ],
          backgroundColor : "background-light"
        };
      }
    },

    "table-editor-selectbox" :
    {
      include : "selectbox",
      alias : "selectbox",

      style : function(states)
      {
        return {
          padding : [ 0, 2 ],
          backgroundColor : "background-light"
        };
      }
    },

    "table-editor-combobox" :
    {
      include : "combobox",
      alias : "combobox",

      style : function(states)
      {
        return {
          decorator : undefined,
          backgroundColor : "background-light"
        };
      }
    },





    /*
    ---------------------------------------------------------------------------
      PROGRESSIVE
    ---------------------------------------------------------------------------
    */

    "progressive-table-header" :
    {
      alias : "widget",

      style : function(states)
      {
        return {
          decorator : "progressive-table-header"
        };
      }
    },

    "progressive-table-header-cell" :
    {
      alias : "atom",
      style : function(states)
      {
        var useCSS = qx.core.Environment.get("css.gradients");
        return {
          minWidth : 40,
          minHeight : 25,
          paddingLeft : 6,
          decorator : useCSS ? "progressive-table-header-cell-css" : "progressive-table-header-cell"
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
      APPLICATION
    ---------------------------------------------------------------------------
    */

    "app-header" :
    {
      style : function(states)
      {
        return {
          font : "bold",
          textColor : "text-selected",
          padding : [8, 12],
          decorator : "app-header"
        };
      }
    },

    "app-header-label": "label",


    /*
    ---------------------------------------------------------------------------
      VIRTUAL WIDGETS
    ---------------------------------------------------------------------------
    */

    "virtual-list" : "list",
    "virtual-list/row-layer" : "row-layer",

    "row-layer" :
    {
      style : function(states)
      {
        return {
          colorEven : "virtual-row-layer-background-even",
          colorOdd : "virtual-row-layer-background-odd"
        };
      }
    },

    "group-item" :
    {
      include : "label",
      alias : "label",

      style : function(states)
      {
        return {
          padding : 4,
          decorator : qx.core.Environment.get("css.gradients") ? "group-item-css" : "group-item",
          textColor : "groupitem-text",
          font: "bold"
        };
      }
    },

    "virtual-selectbox" : "selectbox",
    "virtual-selectbox/dropdown" : "popup",
    "virtual-selectbox/dropdown/list" : {
      alias : "virtual-list"
    },

    "virtual-combobox" : "combobox",
    "virtual-combobox/dropdown" : "popup",
    "virtual-combobox/dropdown/list" : {
      alias : "virtual-list"
    },

    "virtual-tree" :
    {
      include : "tree",
      alias : "tree",

      style : function(states)
      {
        return {
          itemHeight : 26
        };
      }
    },

    "virtual-tree-folder" : "tree-folder",
    "virtual-tree-file" : "tree-file",

    "column-layer" : "widget",

    "cell" :
    {
      style : function(states)
      {
        return {
          textColor: states.selected ? "text-selected" : "text-label",
          padding: [3, 6],
          font: "default"
        };
      }
    },

    "cell-string" : "cell",
    "cell-number" :
    {
      include : "cell",
      style : function(states)
      {
        return {
          textAlign : "right"
        };
      }
    },
    "cell-image" : "cell",
    "cell-boolean" :
    {
      include : "cell",
      style : function(states)
      {
        return {
          iconTrue : "decoration/table/boolean-true.png",
          iconFalse : "decoration/table/boolean-false.png"
        };
      }
    },
    "cell-atom" : "cell",
    "cell-date" : "cell",
    "cell-html" : "cell",



    /*
    ---------------------------------------------------------------------------
      HTMLAREA
    ---------------------------------------------------------------------------
    */

    "htmlarea" :
    {
      "include" : "widget",

      style : function(states)
      {
        return {
          backgroundColor : "htmlarea-background"
        };
      }
    },


    /*
    ---------------------------------------------------------------------------
      PROGRESSBAR
    ---------------------------------------------------------------------------
    */
    "progressbar":
    {
      style: function(states) {
        return {
          decorator: "progressbar",
          padding: [1],
          backgroundColor: "progressbar-background"
        }
      }
    },

    "progressbar/progress":
    {
      style: function(states)
      {
        var decorator = states.disabled ? "group-item" : "selected";
        if (qx.core.Environment.get("css.gradients")) {
          decorator += "-css";
        }

        return {
          decorator: decorator
        }
      }
    }
  }
});
