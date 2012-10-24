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
 * <h2>Object Controller</h2>
 *
 * *General idea*
 *
 * The idea of the object controller is to make the binding of one model object
 * containing one or more properties as easy as possible. Therefore the
 * controller can take a model as property. Every property in that model can be
 * bound to one or more target properties. The binding will be for
 * atomic types only like Numbers, Strings, ...
 *
 * *Features*
 *
 * * Manages the bindings between the model properties and the different targets
 * * No need for the user to take care of the binding ids
 * * Can create an bidirectional binding (read- / write-binding)
 * * Handles the change of the model which means adding the old targets
 *
 * *Usage*
 *
 * The controller only can work if a model is set. If the model property is
 * null, the controller is not working. But it can be null on any time.
 *
 * *Cross reference*
 *
 * * If you want to bind a list like widget, use {@link qx.data.controller.List}
 * * If you want to bind a tree widget, use {@link qx.data.controller.Tree}
 * * If you want to bind a form widget, use {@link qx.data.controller.Form}
 */
qx.Class.define("qx.data.controller.Object",
{
  extend : qx.core.Object,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param model {qx.core.Object?null} The model for the model property.
   */
  construct : function(model)
  {
    this.base(arguments);

    // create a map for all created binding ids
    this.__bindings = {};
    // create an array to store all current targets
    this.__targets = [];

    if (model != null) {
      this.setModel(model);
    }
  },



  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /** The model object which does have the properties for the binding. */
    model :
    {
      check: "qx.core.Object",
      event: "changeModel",
      apply: "_applyModel",
      nullable: true,
      dereference: true
    }
  },



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // private members
    __targets : null,
    __bindings : null,

    /**
     * Apply-method which will be called if a new model has been set.
     * All bindings will be moved to the new model.
     *
     * @param value {qx.core.Object|null} The new model.
     * @param old {qx.core.Object|null} The old model.
     */
    _applyModel: function(value, old) {
      // for every target
      for (var i = 0; i < this.__targets.length; i++) {
        // get the properties
        var targetObject = this.__targets[i][0];
        var targetProperty = this.__targets[i][1];
        var sourceProperty = this.__targets[i][2];
        var bidirectional = this.__targets[i][3];
        var options = this.__targets[i][4];
        var reverseOptions = this.__targets[i][5];

        // remove it from the old if possible
        if (old != undefined && !old.isDisposed()) {
          this.__removeTargetFrom(targetObject, targetProperty, sourceProperty, old);
        }

        // add it to the new if available
        if (value != undefined) {
          this.__addTarget(
            targetObject, targetProperty, sourceProperty, bidirectional,
            options, reverseOptions
          );
        } else {
          // in shutdown situations, it may be that something is already
          // disposed [BUG #4343]
          if (targetObject.isDisposed() || qx.core.ObjectRegistry.inShutDown) {
            continue;
          }
          // if the model is null, reset the current target
          if (targetProperty.indexOf("[") == -1) {
            targetObject["reset" + qx.lang.String.firstUp(targetProperty)]();
          } else {
            var open = targetProperty.indexOf("[");
            var index = parseInt(
              targetProperty.substring(open + 1, targetProperty.length - 1), 10
            );
            targetProperty = targetProperty.substring(0, open);
            var targetArray = targetObject["get" + qx.lang.String.firstUp(targetProperty)]();
            if (index == "last") {
              index = targetArray.length;
            }
            if (targetArray) {
              targetArray.setItem(index, null);
            }
          }
        }
      }
    },


    /**
     * Adds a new target to the controller. After adding the target, the given
     * property of the model will be bound to the targets property.
     *
     * @param targetObject {qx.core.Object} The object on which the property
     *   should be bound.
     *
     * @param targetProperty {String} The property to which the binding should
     *   go.
     *
     * @param sourceProperty {String} The name of the property in the model.
     *
     * @param bidirectional {Boolean?false} Signals if the binding should also work
     *   in the reverse direction, from the target to source.
     *
     * @param options {Map?null} The options Map used by the binding from source
     *   to target. The possible options can be found in the
     *   {@link qx.data.SingleValueBinding} class.
     *
     * @param reverseOptions {Map?null} The options used by the binding in the
     *   reverse direction. The possible options can be found in the
     *   {@link qx.data.SingleValueBinding} class.
     */
    addTarget: function(
      targetObject, targetProperty, sourceProperty,
      bidirectional, options, reverseOptions
    ) {

      // store the added target
      this.__targets.push([
        targetObject, targetProperty, sourceProperty,
        bidirectional, options, reverseOptions
      ]);

      // delegate the adding
      this.__addTarget(
        targetObject, targetProperty, sourceProperty,
        bidirectional, options, reverseOptions
      );
    },


    /**
    * Does the work for {@link #addTarget} but without saving the target
    * to the internal target registry.
    *
    * @param targetObject {qx.core.Object} The object on which the property
    *   should be bound.
    *
    * @param targetProperty {String} The property to which the binding should
    *   go.
    *
    * @param sourceProperty {String} The name of the property in the model.
    *
    * @param bidirectional {Boolean?false} Signals if the binding should also work
    *   in the reverse direction, from the target to source.
    *
    * @param options {Map?null} The options Map used by the binding from source
    *   to target. The possible options can be found in the
    *   {@link qx.data.SingleValueBinding} class.
    *
    * @param reverseOptions {Map?null} The options used by the binding in the
    *   reverse direction. The possible options can be found in the
    *   {@link qx.data.SingleValueBinding} class.
    */
    __addTarget: function(
      targetObject, targetProperty, sourceProperty,
      bidirectional, options, reverseOptions
    ) {

      // do nothing if no model is set
      if (this.getModel() == null) {
        return;
      }

      // create the binding
      var id = this.getModel().bind(
        sourceProperty, targetObject, targetProperty, options
      );
      // create the reverse binding if necessary
      var idReverse = null
      if (bidirectional) {
        idReverse = targetObject.bind(
          targetProperty, this.getModel(), sourceProperty, reverseOptions
        );
      }

      // save the binding
      var targetHash = targetObject.toHashCode();
      if (this.__bindings[targetHash] == undefined) {
        this.__bindings[targetHash] = [];
      }
      this.__bindings[targetHash].push(
        [id, idReverse, targetProperty, sourceProperty, options, reverseOptions]
      );
    },

    /**
     * Removes the target identified by the three properties.
     *
     * @param targetObject {qx.core.Object} The target object on which the
     *   binding exist.
     *
     * @param targetProperty {String} The targets property name used by the
     *   adding of the target.
     *
     * @param sourceProperty {String} The name of the property of the model.
     */
    removeTarget: function(targetObject, targetProperty, sourceProperty) {
      this.__removeTargetFrom(
        targetObject, targetProperty, sourceProperty, this.getModel()
      );

      // delete the target in the targets reference
      for (var i = 0; i < this.__targets.length; i++) {
        if (
          this.__targets[i][0] == targetObject
          && this.__targets[i][1] == targetProperty
          && this.__targets[i][2] == sourceProperty
        ) {
          this.__targets.splice(i, 1);
        }
      }
    },


    /**
     * Does the work for {@link #removeTarget} but without removing the target
     * from the internal registry.
     *
     * @param targetObject {qx.core.Object} The target object on which the
     *   binding exist.
     *
     * @param targetProperty {String} The targets property name used by the
     *   adding of the target.
     *
     * @param sourceProperty {String} The name of the property of the model.
     *
     * @param sourceObject {String} The source object from which the binding
     *   comes.
     */
    __removeTargetFrom: function(
      targetObject, targetProperty, sourceProperty, sourceObject
    ) {
      // check for not fitting targetObjects
      if (!(targetObject instanceof qx.core.Object)) {
        // just do nothing
        return;
      }

      var currentListing = this.__bindings[targetObject.toHashCode()];
      // if no binding is stored
      if (currentListing == undefined || currentListing.length == 0) {
        return;
      }

      // go threw all listings for the object
      for (var i = 0; i < currentListing.length; i++) {
        // if it is the listing
        if (
          currentListing[i][2] == targetProperty &&
          currentListing[i][3] == sourceProperty
        ) {
          // remove the binding
          var id = currentListing[i][0];
          sourceObject.removeBinding(id);
          // check for the reverse binding
          if (currentListing[i][1] != null) {
            targetObject.removeBinding(currentListing[i][1]);
          }
          // delete the entry and return
          currentListing.splice(i, 1);
          return;
        }
      }
    }
  },


  /*
   *****************************************************************************
      DESTRUCT
   *****************************************************************************
   */

  destruct : function() {
    // set the model to null to get the bindings removed
    if (this.getModel() != null && !this.getModel().isDisposed()) {
      this.setModel(null);
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
     * Andreas Ecker (ecker)
     * Jonathan Weiß (jonathan_rass)
     * Tristan Koch (tristankoch)

************************************************************************ */

/**
 * The TextField is a multi-line text input field.
 */
qx.Class.define("qx.ui.form.TextArea",
{
  extend : qx.ui.form.AbstractField,



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param value {String?""} The text area's initial value
   */
  construct : function(value)
  {
    this.base(arguments, value);
    this.initWrap();

    this.addListener("mousewheel", this._onMousewheel, this);
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /** Controls whether text wrap is activated or not. */
    wrap :
    {
      check : "Boolean",
      init : true,
      apply : "_applyWrap"
    },

    // overridden
    appearance :
    {
      refine : true,
      init : "textarea"
    },

    /** Factor for scrolling the <code>TextArea</code> with the mouse wheel. */
    singleStep :
    {
      check : "Integer",
      init : 20
    },

    /** Minimal line height. On default this is set to four lines. */
    minimalLineHeight :
    {
      check : "Integer",
      apply : "_applyMinimalLineHeight",
      init : 4
    },

    /**
    * Whether the <code>TextArea</code> should automatically adjust to
    * the height of the content.
    *
    * To set the initial height, modify {@link #minHeight}. If you wish
    * to set a minHeight below four lines of text, also set
    * {@link #minimalLineHeight}. In order to limit growing to a certain
    * height, set {@link #maxHeight} respectively. Please note that
    * autoSize is ignored when the {@link #height} property is in use.
    */
    autoSize :
    {
      check : "Boolean",
      apply : "_applyAutoSize",
      init : false
    }

  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __areaClone : null,
    __areaHeight : null,
    __originalAreaHeight : null,

    // overridden
    setValue : function(value)
    {
      value = this.base(arguments, value);
      this.__autoSize();

      return value;
    },

    /**
     * Handles the mouse wheel for scrolling the <code>TextArea</code>.
     *
     * @param e {qx.event.type.MouseWheel} mouse wheel event.
     */
    _onMousewheel : function(e) {
      var contentElement = this.getContentElement();
      var scrollY = contentElement.getScrollY();

      contentElement.scrollToY(scrollY + e.getWheelDelta("y") * this.getSingleStep());

      var newScrollY = contentElement.getScrollY();

      if (newScrollY != scrollY) {
        e.stop();
      }
    },

    /*
    ---------------------------------------------------------------------------
      AUTO SIZE
    ---------------------------------------------------------------------------
    */

    /**
    * Adjust height of <code>TextArea</code> so that content fits without scroll bar.
    *
    * @return {void}
    */
    __autoSize: function() {
      if (this.isAutoSize()) {

        var clone = this.__getAreaClone();

        if (clone) {

          // Remember original area height
          this.__originalAreaHeight = this.__originalAreaHeight || this._getAreaHeight();

          var scrolledHeight = this._getScrolledAreaHeight();

          // Show scoll-bar when above maxHeight, if defined
          if (this.getMaxHeight()) {
            var insets = this.getInsets();
            var innerMaxHeight = -insets.top + this.getMaxHeight() - insets.bottom;
            if (scrolledHeight > innerMaxHeight) {
                this.getContentElement().setStyle("overflowY", "auto");
            } else {
                this.getContentElement().setStyle("overflowY", "hidden");
            }
          }

          // Never shrink below original area height
          var desiredHeight = Math.max(scrolledHeight, this.__originalAreaHeight);

          // Set new height
          this._setAreaHeight(desiredHeight);

        // On init, the clone is not yet present. Try again on appear.
        } else {
          this.addListenerOnce("appear", function() {
            this.__autoSize();
          }, this);
        }
      }
    },

    /**
    * Get actual height of <code>TextArea</code>
    *
    * @return {Integer} Height of <code>TextArea</code>
    */
    _getAreaHeight: function() {
      return this.getInnerSize().height;
    },

    /**
    * Set actual height of <code>TextArea</code>
    *
    * @param height {Integer} Desired height of <code>TextArea</code>
    */
    _setAreaHeight: function(height) {
      if (this._getAreaHeight() !== height) {
        this.__areaHeight = height;
        qx.ui.core.queue.Layout.add(this);

        // Apply height directly. This works-around a visual glitch in WebKit
        // browsers where a line-break causes the text to be moved upwards
        // for one line. Since this change appears instantly whereas the queue
        // is computed later, a flicker is visible.
        qx.ui.core.queue.Manager.flush();

        this.__forceRewrap();
      }
    },

    /**
    * Get scrolled area height. Equals the total height of the <code>TextArea</code>,
    * as if no scroll-bar was visible.
    *
    * @return {Integer} Height of scrolled area
    */
    _getScrolledAreaHeight: function() {
      var clone = this.__getAreaClone();
      var cloneDom = clone.getDomElement();

      if (cloneDom) {

        // Clone created but not yet in DOM. Try again.
        if (!cloneDom.parentNode) {
          qx.html.Element.flush();
          return this._getScrolledAreaHeight();
        }

        // In WebKit, "wrap" must have been "soft" on DOM level before setting
        // "off" can disable wrapping. To fix, make sure wrap is toggled.
        // Otherwise, the height of an auto-size text area with wrapping
        // disabled initially is incorrectly computed as if wrapping was enabled.
        if (qx.core.Environment.get("engine.name") === "webkit") {
          clone.setWrap(!this.getWrap(), true);
        }

        clone.setWrap(this.getWrap(), true);

        // Webkit needs overflow "hidden" in order to correctly compute height
        if (qx.core.Environment.get("engine.name") == "webkit") {
          cloneDom.style.overflow = "hidden";
        }

        // IE >= 8 needs overflow "visible" in order to correctly compute height
        if (qx.core.Environment.get("engine.name") == "mshtml" &&
          qx.core.Environment.get("browser.documentmode") >= 8) {
          cloneDom.style.overflow = "visible";
        }

        // Update value
        clone.setValue(this.getValue());

        // Recompute
        this.__scrollCloneToBottom(clone);

        if (qx.core.Environment.get("engine.name") == "mshtml") {
          // Flush required for scrollTop to return correct value
          // when initial value should be taken into consideration
          if (!cloneDom.scrollTop) {
            qx.html.Element.flush();
          }

          // Compensate for slightly off scroll height in IE
          return cloneDom.scrollTop + this._getTextSize().height;
        }

        return cloneDom.scrollTop;
      }
    },

    /**
    * Returns the area clone.
    *
    * @return {Element} DOM Element
    */
    __getAreaClone: function() {
      this.__areaClone = this.__areaClone || this.__createAreaClone();
      return this.__areaClone;
    },

    /**
    * Creates and prepares the area clone.
    *
    * @return {Element} Element
    */
    __createAreaClone: function() {
      var orig,
          clone,
          cloneDom,
          cloneHtml;

      orig = this.getContentElement();

      // An existing DOM element is required
      if (!orig.getDomElement()) {
        return;
      }

      // Create DOM clone
      cloneDom = qx.bom.Collection.create(orig.getDomElement()).clone()[0];

      // Convert to qx.html Element
      cloneHtml = new qx.html.Input("textarea");
      cloneHtml.useElement(cloneDom);
      clone = cloneHtml;

      // Push out of view
      // Zero height (i.e. scrolled area equals height)
      clone.setStyles({
        position: "absolute",
        top: 0,
        left: -9999,
        height: 0,
        overflow: "hidden"
      }, true);

      // Fix attributes
      clone.removeAttribute('id');
      clone.removeAttribute('name');
      clone.setAttribute("tabIndex", "-1");

      // Copy value
      clone.setValue(orig.getValue());

      // Attach to DOM
      clone.insertBefore(orig);

      // Make sure scrollTop is actual height
      this.__scrollCloneToBottom(clone);

      return clone;
    },

    /**
    * Scroll <code>TextArea</code> to bottom. That way, scrollTop reflects the height
    * of the <code>TextArea</code>.
    *
    * @param clone {Element} The <code>TextArea</code> to scroll
    */
    __scrollCloneToBottom: function(clone) {
      clone = clone.getDomElement();
      if (clone) {
        clone.scrollTop = 10000;
      }
    },

    /*
    ---------------------------------------------------------------------------
      FIELD API
    ---------------------------------------------------------------------------
    */

    // overridden
    _createInputElement : function()
    {
      return new qx.html.Input("textarea", {
        overflowX: "auto",
        overflowY: "auto"
      });
    },


    /*
    ---------------------------------------------------------------------------
      APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    // property apply
    _applyWrap : function(value, old) {
      this.getContentElement().setWrap(value);
      this.__autoSize();
    },

    // property apply
    _applyMinimalLineHeight : function() {
      qx.ui.core.queue.Layout.add(this);
    },

    // property apply
    _applyAutoSize: function(value, old) {
      if (qx.core.Environment.get("qx.debug")) {
        this.__warnAutoSizeAndHeight();
      }

      if (value) {
        this.__autoSize();
        this.addListener("input", this.__autoSize, this);

        // This is done asynchronously on purpose. The style given would
        // otherwise be overridden by the DOM changes queued in the
        // property apply for wrap. See [BUG #4493] for more details.
        this.addListenerOnce("appear", function() {
          this.getContentElement().setStyle("overflowY", "hidden");
        });

      } else {
        this.removeListener("input", this.__autoSize);
        this.getContentElement().setStyle("overflowY", "auto");
      }

    },

    // property apply
    _applyDimension : function(value) {
      this.base(arguments);

      if (qx.core.Environment.get("qx.debug")) {
        this.__warnAutoSizeAndHeight();
      }

      if (value === this.getMaxHeight()) {
        this.__autoSize();
      }
    },

    /**
     * Force rewrapping of text.
     *
     * The distribution of characters depends on the space available.
     * Unfortunately, browsers do not reliably (or not at all) rewrap text when
     * the size of the text area changes.
     *
     * This method is called on change of the area's size.
     */
    __forceRewrap : function() {
      var content = this.getContentElement();
      var element = content.getDomElement();

      // Temporarily increase width
      var width = content.getStyle("width");
      content.setStyle("width", parseInt(width, 10) + 1000 + "px", true);

      // Force browser to render
      if (element) {
        qx.bom.element.Dimension.getWidth(element);
      }

      // Restore width
      content.setStyle("width", width, true);
    },

    /**
     * Warn when both autoSize and height property are set.
     *
     * @return {void}
     */
    __warnAutoSizeAndHeight: function() {
      if (this.isAutoSize() && this.getHeight()) {
        this.warn("autoSize is ignored when the height property is set. " +
                  "If you want to set an initial height, use the minHeight " +
                  "property instead.");
      }
    },

    /*
    ---------------------------------------------------------------------------
      LAYOUT
    ---------------------------------------------------------------------------
    */

    // overridden
    _getContentHint : function()
    {
      var hint = this.base(arguments);

      // lines of text
      hint.height = hint.height * this.getMinimalLineHeight();

      // 20 character wide
      hint.width = this._getTextSize().width * 20;

      if (this.isAutoSize()) {
        hint.height = this.__areaHeight || hint.height;
      }

      return hint;
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)

   ======================================================================

   This class uses ideas and code snipplets presented at
   http://webreflection.blogspot.com/2008/05/habemus-array-unlocked-length-in-ie8.html
   http://webreflection.blogspot.com/2008/05/stack-and-arrayobject-how-to-create.html

   Author:
     Andrea Giammarchi

   License:
     MIT: http://www.opensource.org/licenses/mit-license.php

   ======================================================================

   This class uses documentation of the native Array methods from the MDC
   documentation of Mozilla.

   License:
     CC Attribution-Sharealike License:
     http://creativecommons.org/licenses/by-sa/2.5/

************************************************************************ */


/* ************************************************************************

#require(qx.lang.Core)

************************************************************************ */

/**
 * This class is the common superclass for most array classes in
 * qooxdoo. It supports all of the shiny 1.6 JavaScript array features
 * like <code>forEach</code> and <code>map</code>.
 *
 * This class may be instantiated instead of the native Array if
 * one wants to work with a feature-unified Array instead of the native
 * one. This class uses native features whereever possible but fills
 * all missing implementations with custom ones.
 *
 * Through the ability to extend from this class one could add even
 * more utility features on top of it.
 */
qx.Class.define("qx.type.BaseArray",
{
  extend : Array,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Creates a new Array with the given length or the listed elements.
   *
   * <pre class="javascript">
   * var arr1 = new qx.type.BaseArray(arrayLength);
   * var arr2 = new qx.type.BaseArray(item0, item1, ..., itemN);
   * </pre>
   *
   * * <code>arrayLength</code>: The initial length of the array. You can access
   * this value using the length property. If the value specified is not a
   * number, an array of length 1 is created, with the first element having
   * the specified value. The maximum length allowed for an
   * array is 2^32-1, i.e. 4,294,967,295.
   * * <code>itemN</code>:  A value for the element in that position in the
   * array. When this form is used, the array is initialized with the specified
   * values as its elements, and the array's length property is set to the
   * number of arguments.
   *
   * @param length_or_items {Integer|varargs?null} The initial length of the array
   *        OR an argument list of values.
   */
  construct : function(length_or_items) {},


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * Converts a base array to a native Array
     *
     * @signature function()
     * @return {Array} The native array
     */
    toArray : null,

    /**
     * Returns the current number of items stored in the Array
     *
     * @signature function()
     * @return {Integer} number of items
     */
    valueOf : null,

    /**
     * Removes the last element from an array and returns that element.
     *
     * This method modifies the array.
     *
     * @signature function()
     * @return {var} The last element of the array.
     */
    pop : null,

    /**
     * Adds one or more elements to the end of an array and returns the new length of the array.
     *
     * This method modifies the array.
     *
     * @signature function(varargs)
     * @param varargs {var} The elements to add to the end of the array.
     * @return {Integer} The new array's length
     */
    push : null,

    /**
     * Reverses the order of the elements of an array -- the first becomes the last, and the last becomes the first.
     *
     * This method modifies the array.
     *
     * @signature function()
     * @return {Array} Returns the modified array (works in place)
     */
    reverse : null,

    /**
     * Removes the first element from an array and returns that element.
     *
     * This method modifies the array.
     *
     * @signature function()
     * @return {var} The first element of the array.
     */
    shift : null,

    /**
     * Sorts the elements of an array.
     *
     * This method modifies the array.
     *
     * @signature function(compareFunction)
     * @param compareFunction {Function?null} Specifies a function that defines the sort order. If omitted,
     *   the array is sorted lexicographically (in dictionary order) according to the string conversion of each element.
     * @return {Array} Returns the modified array (works in place)
     */
    sort : null,

    /**
     * Adds and/or removes elements from an array.
     *
     * @signature function(index, howMany, varargs)
     * @param index {Integer} Index at which to start changing the array. If negative, will begin
     *   that many elements from the end.
     * @param howMany {Integer} An integer indicating the number of old array elements to remove.
     *   If <code>howMany</code> is 0, no elements are removed. In this case, you should specify
     *   at least one new element.
     * @param varargs {var?null} The elements to add to the array. If you don't specify any elements,
     *   splice simply removes elements from the array.
     * @return {BaseArray} New array with the removed elements.
     */
    splice : null,

    /**
     * Adds one or more elements to the front of an array and returns the new length of the array.
     *
     * This method modifies the array.
     *
     * @signature function(varargs)
     * @param varargs {var} The elements to add to the front of the array.
     * @return {Integer} The new array's length
     */
    unshift : null,

    /**
     * Returns a new array comprised of this array joined with other array(s) and/or value(s).
     *
     * This method does not modify the array and returns a modified copy of the original.
     *
     * @signature function(varargs)
     * @param varargs {Array|var} Arrays and/or values to concatenate to the resulting array.
     * @return {qx.type.BaseArray} New array built of the given arrays or values.
     */
    concat : null,

    /**
     * Joins all elements of an array into a string.
     *
     * @signature function(separator)
     * @param separator {String} Specifies a string to separate each element of the array. The separator is
     *   converted to a string if necessary. If omitted, the array elements are separated with a comma.
     * @return {String} The stringified values of all elements divided by the given separator.
     */
    join : null,

    /**
     * Extracts a section of an array and returns a new array.
     *
     * @signature function(begin, end)
     * @param begin {Integer} Zero-based index at which to begin extraction. As a negative index, start indicates
     *   an offset from the end of the sequence. slice(-2) extracts the second-to-last element and the last element
     *   in the sequence.
     * @param end {Integer?length} Zero-based index at which to end extraction. slice extracts up to but not including end.
     *   <code>slice(1,4)</code> extracts the second element through the fourth element (elements indexed 1, 2, and 3).
     *   As a negative index, end indicates an offset from the end of the sequence. slice(2,-1) extracts the third element through the second-to-last element in the sequence.
     *   If end is omitted, slice extracts to the end of the sequence.
     * @return {BaseArray} An new array which contains a copy of the given region.
     */
    slice : null,

    /**
     * Returns a string representing the array and its elements. Overrides the Object.prototype.toString method.
     *
     * @signature function()
     * @return {String} The string representation of the array.
     */
    toString : null,

    /**
     * Returns the first (least) index of an element within the array equal to the specified value, or -1 if none is found.
     *
     * @signature function(searchElement, fromIndex)
     * @param searchElement {var} Element to locate in the array.
     * @param fromIndex {Integer?0} The index at which to begin the search. Defaults to 0, i.e. the
     *   whole array will be searched. If the index is greater than or equal to the length of the
     *   array, -1 is returned, i.e. the array will not be searched. If negative, it is taken as
     *   the offset from the end of the array. Note that even when the index is negative, the array
     *   is still searched from front to back. If the calculated index is less than 0, the whole
     *   array will be searched.
     * @return {Integer} The index of the given element
     */
    indexOf : null,

    /**
     * Returns the last (greatest) index of an element within the array equal to the specified value, or -1 if none is found.
     *
     * @signature function(searchElement, fromIndex)
     * @param searchElement {var} Element to locate in the array.
     * @param fromIndex {Integer?length} The index at which to start searching backwards. Defaults to
     *   the array's length, i.e. the whole array will be searched. If the index is greater than
     *   or equal to the length of the array, the whole array will be searched. If negative, it
     *   is taken as the offset from the end of the array. Note that even when the index is
     *   negative, the array is still searched from back to front. If the calculated index is
     *   less than 0, -1 is returned, i.e. the array will not be searched.
     * @return {Integer} The index of the given element
     */
    lastIndexOf : null,

    /**
     * Executes a provided function once per array element.
     *
     * <code>forEach</code> executes the provided function (<code>callback</code>) once for each
     * element present in the array.  <code>callback</code> is invoked only for indexes of the array
     * which have assigned values; it is not invoked for indexes which have been deleted or which
     * have never been assigned values.
     *
     * <code>callback</code> is invoked with three arguments: the value of the element, the index
     * of the element, and the Array object being traversed.
     *
     * If a <code>obj</code> parameter is provided to <code>forEach</code>, it will be used
     * as the <code>this</code> for each invocation of the <code>callback</code>.  If it is not
     * provided, or is <code>null</code>, the global object associated with <code>callback</code>
     * is used instead.
     *
     * <code>forEach</code> does not mutate the array on which it is called.
     *
     * The range of elements processed by <code>forEach</code> is set before the first invocation of
     * <code>callback</code>.  Elements which are appended to the array after the call to
     * <code>forEach</code> begins will not be visited by <code>callback</code>. If existing elements
     * of the array are changed, or deleted, their value as passed to <code>callback</code> will be
     * the value at the time <code>forEach</code> visits them; elements that are deleted are not visited.
     *
     * @signature function(callback, obj)
     * @param callback {Function} Function to execute for each element.
     * @param obj {Object} Object to use as this when executing callback.
     */
    forEach : null,

    /**
     * Creates a new array with all elements that pass the test implemented by the provided
     * function.
     *
     * <code>filter</code> calls a provided <code>callback</code> function once for each
     * element in an array, and constructs a new array of all the values for which
     * <code>callback</code> returns a true value.  <code>callback</code> is invoked only
     * for indexes of the array which have assigned values; it is not invoked for indexes
     * which have been deleted or which have never been assigned values.  Array elements which
     * do not pass the <code>callback</code> test are simply skipped, and are not included
     * in the new array.
     *
     * <code>callback</code> is invoked with three arguments: the value of the element, the
     * index of the element, and the Array object being traversed.
     *
     * If a <code>obj</code> parameter is provided to <code>filter</code>, it will
     * be used as the <code>this</code> for each invocation of the <code>callback</code>.
     * If it is not provided, or is <code>null</code>, the global object associated with
     * <code>callback</code> is used instead.
     *
     * <code>filter</code> does not mutate the array on which it is called. The range of
     * elements processed by <code>filter</code> is set before the first invocation of
     * <code>callback</code>. Elements which are appended to the array after the call to
     * <code>filter</code> begins will not be visited by <code>callback</code>. If existing
     * elements of the array are changed, or deleted, their value as passed to <code>callback</code>
     * will be the value at the time <code>filter</code> visits them; elements that are deleted
     * are not visited.
     *
     * @signature function(callback, obj)
     * @param callback {Function} Function to test each element of the array.
     * @param obj {Object} Object to use as <code>this</code> when executing <code>callback</code>.
     * @return {BaseArray} The newly created array with all matching elements
     */
    filter : null,

    /**
     * Creates a new array with the results of calling a provided function on every element in this array.
     *
     * <code>map</code> calls a provided <code>callback</code> function once for each element in an array,
     * in order, and constructs a new array from the results.  <code>callback</code> is invoked only for
     * indexes of the array which have assigned values; it is not invoked for indexes which have been
     * deleted or which have never been assigned values.
     *
     * <code>callback</code> is invoked with three arguments: the value of the element, the index of the
     * element, and the Array object being traversed.
     *
     * If a <code>obj</code> parameter is provided to <code>map</code>, it will be used as the
     * <code>this</code> for each invocation of the <code>callback</code>. If it is not provided, or is
     * <code>null</code>, the global object associated with <code>callback</code> is used instead.
     *
     * <code>map</code> does not mutate the array on which it is called.
     *
     * The range of elements processed by <code>map</code> is set before the first invocation of
     * <code>callback</code>. Elements which are appended to the array after the call to <code>map</code>
     * begins will not be visited by <code>callback</code>.  If existing elements of the array are changed,
     * or deleted, their value as passed to <code>callback</code> will be the value at the time
     * <code>map</code> visits them; elements that are deleted are not visited.
     *
     * @signature function(callback, obj)
     * @param callback {Function} Function produce an element of the new Array from an element of the current one.
     * @param obj {Object} Object to use as <code>this</code> when executing <code>callback</code>.
     * @return {BaseArray} A new array which contains the return values of every item executed through the given function
     */
    map : null,

    /**
     * Tests whether some element in the array passes the test implemented by the provided function.
     *
     * <code>some</code> executes the <code>callback</code> function once for each element present in
     * the array until it finds one where <code>callback</code> returns a true value. If such an element
     * is found, <code>some</code> immediately returns <code>true</code>. Otherwise, <code>some</code>
     * returns <code>false</code>. <code>callback</code> is invoked only for indexes of the array which
     * have assigned values; it is not invoked for indexes which have been deleted or which have never
     * been assigned values.
     *
     * <code>callback</code> is invoked with three arguments: the value of the element, the index of the
     * element, and the Array object being traversed.
     *
     * If a <code>obj</code> parameter is provided to <code>some</code>, it will be used as the
     * <code>this</code> for each invocation of the <code>callback</code>. If it is not provided, or is
     * <code>null</code>, the global object associated with <code>callback</code> is used instead.
     *
     * <code>some</code> does not mutate the array on which it is called.
     *
     * The range of elements processed by <code>some</code> is set before the first invocation of
     * <code>callback</code>.  Elements that are appended to the array after the call to <code>some</code>
     * begins will not be visited by <code>callback</code>. If an existing, unvisited element of the array
     * is changed by <code>callback</code>, its value passed to the visiting <code>callback</code> will
     * be the value at the time that <code>some</code> visits that element's index; elements that are
     * deleted are not visited.
     *
     * @signature function(callback, obj)
     * @param callback {Function} Function to test for each element.
     * @param obj {Object} Object to use as <code>this</code> when executing <code>callback</code>.
     * @return {Boolean} Whether at least one elements passed the test
     */
    some : null,

    /**
     * Tests whether all elements in the array pass the test implemented by the provided function.
     *
     * <code>every</code> executes the provided <code>callback</code> function once for each element
     * present in the array until it finds one where <code>callback</code> returns a false value. If
     * such an element is found, the <code>every</code> method immediately returns <code>false</code>.
     * Otherwise, if <code>callback</code> returned a true value for all elements, <code>every</code>
     * will return <code>true</code>.  <code>callback</code> is invoked only for indexes of the array
     * which have assigned values; it is not invoked for indexes which have been deleted or which have
     * never been assigned values.
     *
     * <code>callback</code> is invoked with three arguments: the value of the element, the index of
     * the element, and the Array object being traversed.
     *
     * If a <code>obj</code> parameter is provided to <code>every</code>, it will be used as
     * the <code>this</code> for each invocation of the <code>callback</code>. If it is not provided,
     * or is <code>null</code>, the global object associated with <code>callback</code> is used instead.
     *
     * <code>every</code> does not mutate the array on which it is called. The range of elements processed
     * by <code>every</code> is set before the first invocation of <code>callback</code>. Elements which
     * are appended to the array after the call to <code>every</code> begins will not be visited by
     * <code>callback</code>.  If existing elements of the array are changed, their value as passed
     * to <code>callback</code> will be the value at the time <code>every</code> visits them; elements
     * that are deleted are not visited.
     *
     * @signature function(callback, obj)
     * @param callback {Function} Function to test for each element.
     * @param obj {Object} Object to use as <code>this</code> when executing <code>callback</code>.
     * @return {Boolean} Whether all elements passed the test
     */
    every : null
  }
});

(function() {

function createStackConstructor(stack)
{
  // In IE don't inherit from Array but use an empty object as prototype
  // and copy the methods from Array
  if ((qx.core.Environment.get("engine.name") == "mshtml"))
  {
    Stack.prototype = {
      length : 0,
      $$isArray : true
    };

    var args = "pop.push.reverse.shift.sort.splice.unshift.join.slice".split(".");

    for (var length = args.length; length;) {
      Stack.prototype[args[--length]] = Array.prototype[args[length]];
    }
  };

  // Remember Array's slice method
  var slice = Array.prototype.slice;

  // Fix "concat" method
  Stack.prototype.concat = function()
  {
    var constructor = this.slice(0);

    for (var i=0, length=arguments.length; i<length; i++)
    {
      var copy;

      if (arguments[i] instanceof Stack) {
        copy = slice.call(arguments[i], 0);
      } else if (arguments[i] instanceof Array) {
        copy = arguments[i];
      } else {
        copy = [arguments[i]];
      }

      constructor.push.apply(constructor, copy);
    }

    return constructor;
  };

  // Fix "toString" method
  Stack.prototype.toString = function(){
    return slice.call(this, 0).toString();
  };

  // Fix "toLocaleString"
  Stack.prototype.toLocaleString = function() {
    return slice.call(this, 0).toLocaleString();
  };

  // Fix constructor
  Stack.prototype.constructor = Stack;


  // Add JS 1.6 Array features
  Stack.prototype.indexOf = qx.lang.Core.arrayIndexOf;
  Stack.prototype.lastIndexOf = qx.lang.Core.arrayLastIndexOf;
  Stack.prototype.forEach = qx.lang.Core.arrayForEach;
  Stack.prototype.some = qx.lang.Core.arraySome;
  Stack.prototype.every = qx.lang.Core.arrayEvery;

  var filter = qx.lang.Core.arrayFilter;
  var map = qx.lang.Core.arrayMap;


  // Fix methods which generates a new instance
  // to return an instance of the same class
  Stack.prototype.filter = function()
  {
    var ret = new this.constructor;
    ret.push.apply(ret, filter.apply(this, arguments));
    return ret;
  };

  Stack.prototype.map = function()
  {
    var ret = new this.constructor;
    ret.push.apply(ret, map.apply(this, arguments));
    return ret;
  };

  Stack.prototype.slice = function()
  {
    var ret = new this.constructor;
    ret.push.apply(ret, Array.prototype.slice.apply(this, arguments));
    return ret;
  };

  Stack.prototype.splice = function()
  {
    var ret = new this.constructor;
    ret.push.apply(ret, Array.prototype.splice.apply(this, arguments));
    return ret;
  };

  // Add new "toArray" method for convert a base array to a native Array
  Stack.prototype.toArray = function() {
    return Array.prototype.slice.call(this, 0);
  };

  // Add valueOf() to return the length
  Stack.prototype.valueOf = function(){
    return this.length;
  };

  // Return final class
  return Stack;
}


function Stack(length)
{
  if(arguments.length === 1 && typeof length === "number") {
    this.length = -1 < length && length === length >> .5 ? length : this.push(length);
  } else if(arguments.length) {
    this.push.apply(this, arguments);
  }
};

function PseudoArray(){};
PseudoArray.prototype = [];
Stack.prototype = new PseudoArray;
Stack.prototype.length = 0;

qx.type.BaseArray = createStackConstructor(Stack);

})();
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

   ======================================================================

   This class contains code based on the following work:

   * Base2
     http://code.google.com/p/base2/
     Version 0.9

     Copyright:
       (c) 2006-2007, Dean Edwards

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

     Authors:
       * Dean Edwards

************************************************************************ */


/**
 * CSS class name support for HTML elements. Supports multiple class names
 * for each element. Can query and apply class names to HTML elements.
 */
qx.Class.define("qx.bom.element.Class",
{
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /** {RegExp} Regular expressions to split class names */
    __splitter : /\s+/g,

    /** {RegExp} String trim regular expression. */
    __trim : /^\s+|\s+$/g,

    /**
     * Adds a className to the given element
     * If successfully added the given className will be returned
     *
     * @signature function(element, name)
     * @param element {Element} The element to modify
     * @param name {String} The class name to add
     * @return {String} The added classname (if so)
     */
    add : qx.lang.Object.select(qx.core.Environment.get("html.classlist") ? "native" : "default",
    {
      "native" : function(element, name)
      {
        element.classList.add(name)
        return name;
      },

      "default" : function(element, name)
      {
        if (!this.has(element, name)) {
          element.className += (element.className ? " " : "") + name;
        }

        return name;
      }
    }),


    /**
     * Adds multiple classes to the given element
     *
     * @signature function(element, classes)
     * @param element {Element} DOM element to modify
     * @param classes {String[]} List of classes to add.
     * @return {String} The resulting class name which was applied
     */
    addClasses : qx.lang.Object.select(qx.core.Environment.get("html.classlist") ? "native" : "default",
    {
      "native" : function(element, classes)
      {
        for (var i=0; i<classes.length; i++) {
          element.classList.add(classes[i])
        }
        return element.className;
      },

      "default" : function(element, classes)
      {
        var keys = {};
        var result;

        var old = element.className;
        if (old)
        {
          result = old.split(this.__splitter);
          for (var i=0, l=result.length; i<l; i++) {
            keys[result[i]] = true;
          }

          for (var i=0, l=classes.length; i<l; i++)
          {
            if (!keys[classes[i]]) {
              result.push(classes[i]);
            }
          }
        }
        else {
          result = classes;
        }

        return element.className = result.join(" ");
      }
    }),


    /**
     * Gets the classname of the given element
     *
     * @param element {Element} The element to query
     * @return {String} The retrieved classname
     */
    get : function(element) {
      var className = element.className;
      if(typeof className.split !== 'function')
      {
        if(typeof className === 'object')
        {
          if(qx.Bootstrap.getClass(className) == 'SVGAnimatedString')
          {
            className = className.baseVal;
          }
          else
          {
            if (qx.core.Environment.get("qx.debug")) {
              qx.log.Logger.warn(this, "className for element " + element + " cannot be determined");
            }
            className = '';
          }
        }
        if(typeof className === 'undefined')
        {
          if (qx.core.Environment.get("qx.debug")) {
            qx.log.Logger.warn(this, "className for element " + element + " is undefined");
          }
          className = '';
        }
      }
      return className;
    },


    /**
     * Whether the given element has the given className.
     *
     * @signature function(element, name)
     * @param element {Element} The DOM element to check
     * @param name {String} The class name to check for
     * @return {Boolean} true when the element has the given classname
     */
    has : qx.lang.Object.select(qx.core.Environment.get("html.classlist") ? "native" : "default",
    {
      "native" : function(element, name) {
        return element.classList.contains(name);
      },

      "default" : function(element, name)
      {
        var regexp = new RegExp("(^|\\s)" + name + "(\\s|$)");
        return regexp.test(element.className);
      }
    }),


    /**
     * Removes a className from the given element
     *
     * @signature function(element, name)
     * @param element {Element} The DOM element to modify
     * @param name {String} The class name to remove
     * @return {String} The removed class name
     */
    remove : qx.lang.Object.select(qx.core.Environment.get("html.classlist") ? "native" : "default",
    {
      "native" : function(element, name)
      {
        element.classList.remove(name);
        return name;
      },

      "default" : function(element, name)
      {
        var regexp = new RegExp("(^|\\s)" + name + "(\\s|$)");
        element.className = element.className.replace(regexp, "$2");

        return name;
      }
    }),


    /**
     * Removes multiple classes from the given element
     *
     * @signature function(element, classes)
     * @param element {Element} DOM element to modify
     * @param classes {String[]} List of classes to remove.
     * @return {String} The resulting class name which was applied
     */
    removeClasses : qx.lang.Object.select(qx.core.Environment.get("html.classlist") ? "native" : "default",
    {
      "native" : function(element, classes)
      {
        for (var i=0; i<classes.length; i++) {
          element.classList.remove(classes[i])
        }
        return element.className;
      },

      "default" : function(element, classes)
      {
        var reg = new RegExp("\\b" + classes.join("\\b|\\b") + "\\b", "g");
        return element.className = element.className.replace(reg, "").replace(this.__trim, "").replace(this.__splitter, " ");
      }
    }),


    /**
     * Replaces the first given class name with the second one
     *
     * @param element {Element} The DOM element to modify
     * @param oldName {String} The class name to remove
     * @param newName {String} The class name to add
     * @return {String} The added class name
     */
    replace : function(element, oldName, newName)
    {
      this.remove(element, oldName);
      return this.add(element, newName);
    },


    /**
     * Toggles a className of the given element
     *
     * @signature function(element, name, toggle)
     * @param element {Element} The DOM element to modify
     * @param name {String} The class name to toggle
     * @param toggle {Boolean?null} Whether to switch class on/off. Without
     *    the parameter an automatic toggling would happen.
     * @return {String} The class name
     */
    toggle : qx.lang.Object.select(qx.core.Environment.get("html.classlist") ? "native" : "default",
    {
      "native" : function(element, name, toggle)
      {
        if (toggle === undefined) {
          element.classList.toggle(name);
        } else {
          toggle ? this.add(element, name) : this.remove(element, name);
        }
        return name;
      },

      "default" : function(element, name, toggle)
      {
        if (toggle == null) {
          toggle = !this.has(element, name);
        }

        toggle ? this.add(element, name) : this.remove(element, name);
        return name;
      }
    })
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2009 Sebastian Werner, http://sebastian-werner.net

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

   ======================================================================

   This class contains code based on the following work:

   * jQuery
     http://jquery.com
     Version 1.3.1

     Copyright:
       2009 John Resig

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

************************************************************************ */

/* ************************************************************************

*#require(qx.type.BaseArray)

#require(qx.bom.Document)
 *#require(qx.bom.Element)
 *#require(qx.bom.Input)
#require(qx.bom.Viewport)
#require(qx.bom.Selector)

 *#require(qx.bom.element.Attribute)
 *#require(qx.bom.element.Class)
 *#require(qx.bom.element.Location)
 *#require(qx.bom.element.Style)

************************************************************************ */

(function()
{
  /**
   * Helper method to create setters for all DOM elements in the collection
   *
   * @param clazz {Class} Static class which contains the given method
   * @param method {String} Name of the method
   * @return {Function} Returns a new function which wraps the given function
   */
  var setter = function(clazz, method)
  {
    return function(arg1, arg2, arg3, arg4, arg5, arg6)
    {
      var length = this.length;
      if (length > 0)
      {
        var ptn = clazz[method];
        for (var i=0; i<length; i++)
        {
          if (this[i].nodeType === 1) {
            ptn.call(clazz, this[i], arg1, arg2, arg3, arg4, arg5, arg6);
          }
        }
      }

      return this;
    };
  };


  /**
   * Helper method to create getters for the first DOM element in the collection.
   *
   * Automatically push the result to the stack if it is an element as well.
   *
   * @param clazz {Class} Static class which contains the given method
   * @param method {String} Name of the method
   * @return {Function} Returns a new function which wraps the given function
   */
  var getter = function(clazz, method)
  {
    return function(arg1, arg2, arg3, arg4, arg5, arg6)
    {
      if (this.length > 0)
      {
        var ret = this[0].nodeType === 1 ?
          clazz[method](this[0], arg1, arg2, arg3, arg4, arg5, arg6) : null;

        if (ret && ret.nodeType) {
          return this.__pushStack([ret]);
        } else {
          return ret;
        }
      }

      return null;
    };
  };


  /**
   * Wraps a set of elements and offers a whole set of features to query or modify them.
   *
   * *Chaining*
   *
   * The collection uses an interesting concept called a "Builder" to make
   * its code short and simple. The Builder pattern is an object-oriented
   * programming design pattern that has been gaining popularity.
   *
   * In a nutshell: Every method on the collection returns the collection object itself,
   * allowing you to 'chain' upon it, for example:
   *
   * <pre class="javascript">
   * qx.bom.Collection.query("a").addClass("test")
   *   .setStyle("visibility", "visible").setAttribute("html", "foo");
   * </pre>
   *
   * *Content Manipulation*
   *
   * Most methods that accept "content" will accept one or more
   * arguments of any of the following:
   *
   * * A DOM node element
   * * An array of DOM node elements
   * * A collection
   * * A string representing HTML
   *
   * Example:
   *
   * <pre class="javascript">
   * qx.bom.Collection.query("#div1").append(
   *   document.createElement("br"),
   *   qx.bom.Collection.query("#div2"),
   *   "<em>after div2</em>"
   * );
   * </pre>
   *
   * Content inserting methods ({@link #append}, {@link #prepend},
   * {@link #before}, {@link #after}, and
   * {@link #replaceWith}) behave differently depending on the number of DOM
   * elements currently selected by the collection. If there is only one
   * element in the collection, the content is inserted to that element;
   * content that was in another location in the DOM tree will be moved by
   * this operation. This is essentially the same as the W3C DOM
   * <code>appendChild</code> method.
   *
   * When multiple elements are selected by a collection, these methods
   * clone the content before inserting it to each element. Since the
   * content can only exist in one location in the document tree, cloning
   * is required in these cases so that the same content can be used in
   * multiple locations.
   *
   * This rule also applies to the selector-insertion methods ({@link #appendTo},
   * {@link #prependTo}, {@link #insertBefore}, {@link #insertAfter},
   * and {@link #replaceAll}), but the auto-cloning occurs if there is more
   * than one element selected by the
   * Selector provided as an argument to the method.
   *
   * When a specific behavior is needed regardless of the number of
   * elements selected, use the {@link #clone} or {@link #remove} methods in
   * conjunction with a selector-insertion method. This example will always
   * clone <code>#Thing</code>, append it to each element with class OneOrMore, and
   * leave the original <code>#Thing</code> unmolested in the document:
   *
   * <pre class="javascript">
   * qx.bom.Collection.query("#Thing").clone().appendTo(".OneOrMore");
   * </pre>
   *
   * This example will always remove <code>#Thing</code> from the document and append it
   * to <code>.OneOrMore</code>:
   *
   * <pre class="javascript">
   * qx.bom.Collection.query("#Thing").remove().appendTo(".OneOrMore");
   * </pre>
   */
  qx.Class.define("qx.bom.Collection",
  {
    extend : qx.type.BaseArray,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Creates a new Collection with the given size or the listed elements.
   *
   * <pre class="javascript">
   * var col1 = new qx.bom.Collection(length);
   * var col2 = new qx.bom.Collection(elem0, elem1, ..., elemN);
   * </pre>
   *
   * * <code>length</code>: The initial size of the collection of elements.
   * * <code>elem1, elem2. .. elemN</code>:  the elements that will compose the newly created collection
   *
   * @param length_or_items {Integer|varargs?null} The initial size of the collection
   *        OR an argument list of elements.
   */
  construct : function(length_or_items) {
    qx.type.BaseArray.apply(this,arguments);
  },



    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics :
    {
      /**
       * Queries the selector engine and returns a new collection
       * for convenient modification and querying.
       *
       * @see qx.bom.Selector#query
       * @param selector {String} CSS Selector String
       * @param context {Element|Document?document} Context element to filter start search in
       * @return {Collection} Collection instance to wrap found elements
       */
      query : function(selector, context)
      {
        var arr = qx.bom.Selector.query(selector, context);
        return qx.lang.Array.cast(arr, qx.bom.Collection);
      },


      /**
       * Queries the DOM for an element matching the given ID. Must not contain
       * the "#" like when using the query engine.
       *
       * This is mainly a wrapper for <code>document.getElementById</code> and
       * returns a collection for easy querying and modification instead of the
       * pure DOM node.
       *
       * @param id {String} Identifier for DOM element to found
       * @return {Collection} Found element wrapped into Collection
       */
      id : function(id)
      {
        var elem = document.getElementById(id);

        // Handle the case where IE and Opera return items
        // by name instead of ID
        if (elem && elem.id != id) {
          return qx.bom.Collection.query("#" + id);
        }

        // check if the element does exist
        if (elem) {
          return new qx.bom.Collection(elem);
        } else {
          return new qx.bom.Collection();
        }
      },


      /**
       * Converts a HTML string into a collection
       *
       * Please make sure you understand the security implications of this
       * method when passing HTML strings from untrusted input. See
       * {@link qx.bom.Html#clean}.
       *
       * @param html {String} String containing one or multiple elements or pure text content
       * @param context {Element|Document?document} Context in which newly DOM elements are created from the markup
       * @return {Collection} Collection containing the create DOM elements
       */
      html : function(html, context)
      {
        // Translate HTML into DOM elements
        var arr = qx.bom.Html.clean([html], context);

        // Translate into Collection
        return qx.lang.Array.cast(arr, qx.bom.Collection);
      },


      /** {RegExp} Test for HTML or ID */
      __expr : /^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,


      /**
       * Processes the input and translates it to a collection instance.
       *
       * Please make sure you understand the security implications of this
       * method when passing HTML strings from untrusted input. See
       * {@link qx.bom.Html#clean}.
       *
       * @see #query
       * @see #id
       * @see #html
       * @param input {Element|String|Element[]} Supports HTML elements, HTML strings and selector strings
       * @param context {Element|Document?document} Where to start looking for the expression or
       *   any element in the document which refers to a valid document to create new elements
       *   (useful when dealing with HTML->Element translation in multi document environments).
       * @return {Collection} Newly created collection
       */
      create : function(input, context)
      {
        // Work with aliases to make it possible to call this
        // method context free e.g for "$" support.
        var Collection = qx.bom.Collection;

        // Element
        if (input.nodeType) {
          return new Collection(input);
        }

        // HTML, ID or Selector
        else if (typeof input === "string")
        {
          var match = Collection.__expr.exec(input);
          if (match) {
            return match[1] ? Collection.html(match[1], context) : Collection.id(match[3]);
          } else {
            return Collection.query(input, context);
          }
        }

        // Element Array
        else {
          return qx.lang.Array.cast(input, qx.bom.Collection);
        }
      }
    },



    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members :
    {
      __prevObject : null,

      /*
      ---------------------------------------------------------------------------
         ATTRIBUTES: CORE
      ---------------------------------------------------------------------------
      */

      /**
       * Modify the given attribute on all selected elements.
       *
       * @signature function(name, value)
       * @param name {String} Name of the attribute
       * @param value {var} New value of the attribute
       * @return {Collection} The collection is returned for chaining proposes
       */
      setAttribute : setter(qx.bom.element.Attribute, "set"),

      /**
       * Reset the given attribute on all selected elements.
       *
       * @signature function(name)
       * @param name {String} Name of the attribute
       * @return {Collection} The collection is returned for chaining proposes
       */
      resetAttribute : setter(qx.bom.element.Attribute, "reset"),

       /**
        * Figures out the value of the given attribute of
        * the first element stored in the collection.
        *
        * @signature function(name)
        * @param name {String} Name of the attribute
        * @return {var} The value of the attribute
        */
      getAttribute : getter(qx.bom.element.Attribute, "get"),



      /*
      ---------------------------------------------------------------------------
         ATTRIBUTES: CLASS
      ---------------------------------------------------------------------------
      */

      /**
       * Adds a className to the given element
       * If successfully added the given className will be returned
       *
       * @signature function(name)
       * @param name {String} The class name to add
       * @return {Collection} The collection is returned for chaining proposes
       */
      addClass : setter(qx.bom.element.Class, "add"),

      /**
       * Gets the classname of the first selected element
       *
       * @signature function()
       * @return {String} The retrieved classname
       */
      getClass : getter(qx.bom.element.Class, "get"),

      /**
       * Whether the first selected element has the given className.
       *
       * @signature function(name)
       * @param name {String} The class name to check for
       * @return {Boolean} true when the element has the given classname
       */
      hasClass : getter(qx.bom.element.Class, "has"),

      /**
       * Removes a className from the given element
       *
       * @signature function(name)
       * @param name {String} The class name to remove
       * @return {Collection} The collection is returned for chaining proposes
       */
      removeClass : setter(qx.bom.element.Class, "remove"),

      /**
       * Replaces the first given class name with the second one
       *
       * @signature function(oldName, newName)
       * @param oldName {String} The class name to remove
       * @param newName {String} The class name to add
       * @return {Collection} The collection is returned for chaining proposes
       */
      replaceClass : setter(qx.bom.element.Class, "replace"),

      /**
       * Toggles a className of the selected elements
       *
       * @signature function(name)
       * @param name {String} The class name to toggle
       * @return {Collection} The collection is returned for chaining proposes
       */
      toggleClass : setter(qx.bom.element.Class, "toggle"),




      /*
      ---------------------------------------------------------------------------
         ATTRIBUTES: VALUE
      ---------------------------------------------------------------------------
      */

      /**
       * Applies the given value to the element.
       *
       * Normally the value is given as a string/number value and applied
       * to the field content (textfield, textarea) or used to
       * detect whether the field is checked (checkbox, radiobutton).
       *
       * Supports array values for selectboxes (multiple-selection)
       * and checkboxes or radiobuttons (for convenience).
       *
       * Please note: To modify the value attribute of a checkbox or
       * radiobutton use {@link qx.bom.element.Attribute#set} instead.
       *
       * @signature function(value)
       * @param value {String|Number|Array} Value to apply to each element
       * @return {Collection} The collection is returned for chaining proposes
       */
      setValue : setter(qx.bom.Input, "setValue"),

      /**
       * Returns the currently configured value of the first
       * element in the collection.
       *
       * Works with simple input fields as well as with
       * select boxes or option elements.
       *
       * Returns an array in cases of multi-selection in
       * select boxes but in all other cases a string.
       *
       * @signature function()
       * @return {String|Array} The value of the first element.
       */
       getValue : getter(qx.bom.Input, "getValue"),






      /*
      ---------------------------------------------------------------------------
         CSS: CORE
      ---------------------------------------------------------------------------
      */

      /**
       * Modify the given style property
       * on all selected elements.
       *
       * @signature function(name, value)
       * @param name {String} Name of the style attribute (JS variant e.g. marginTop, wordSpacing)
       * @param value {var} The value for the given style
       * @return {Collection} The collection is returned for chaining proposes
       */
      setStyle : setter(qx.bom.element.Style, "set"),

      /**
       * Convenience method to modify a set of styles at once.
       *
       * @signature function(styles)
       * @param styles {Map} a map where the key is the name of the property
       *    and the value is the value to use.
       * @return {Collection} The collection is returned for chaining proposes
       */
      setStyles : setter(qx.bom.element.Style, "setStyles"),

      /**
       * Reset the given style property
       * on all selected elements.
       *
       * @signature function(name)
       * @param name {String} Name of the style attribute (JS variant e.g. marginTop, wordSpacing)
       * @return {Collection} The collection is returned for chaining proposes
       */
      resetStyle : setter(qx.bom.element.Style, "reset"),

       /**
        * Figures out the value of the given style property of
        * the first element stored in the collection.
        *
        * @signature function(name, mode)
        * @param name {String} Name of the style attribute (JS variant e.g. marginTop, wordSpacing)
        * @param mode {Number} Choose one of the modes supported by {@link qx.bom.element.Style#get}
        * @return {var} The value of the style property
        */
      getStyle : getter(qx.bom.element.Style, "get"),




      /*
      ---------------------------------------------------------------------------
         CSS: SHEET
      ---------------------------------------------------------------------------
      */

      /**
       * Set the full CSS content of the style attribute for all elements in the
       * collection.
       *
       * @signature function(value)
       * @param value {String} The full CSS string
       * @return {Collection} The collection is returned for chaining proposes
       */
      setCss : setter(qx.bom.element.Style, "setCss"),

      /**
       * Returns the full content of the style attribute of the first element
       * in the collection.
       *
       * @signature function()
       * @return {String} the full CSS string
       */
      getCss : getter(qx.bom.element.Style, "getCss"),




      /*
      ---------------------------------------------------------------------------
         CSS: POSITIONING
      ---------------------------------------------------------------------------
      */

      /**
       * Computes the location of the first element in context of
       * the document dimensions.
       *
       * Supported modes:
       *
       * * <code>margin</code>: Calculate from the margin box of the element (bigger than the visual appearance: including margins of given element)
       * * <code>box</code>: Calculates the offset box of the element (default, uses the same size as visible)
       * * <code>border</code>: Calculate the border box (useful to align to border edges of two elements).
       * * <code>scroll</code>: Calculate the scroll box (relevant for absolute positioned content).
       * * <code>padding</code>: Calculate the padding box (relevant for static/relative positioned content).
       *
       * @signature function(mode)
       * @param mode {String?box} A supported option. See comment above.
       * @return {Map} Returns a map with <code>left</code>, <code>top</code>,
       *   <code>right</code> and <code>bottom</code> which contains the distance
       *   of the element relative to the document.
       */
      getOffset : getter(qx.bom.element.Location, "get"),

      /**
       * Returns the distance between the first element of the collection to its offset parent.
       *
       * @return {Map} Returns a map with <code>left</code> and <code>top</code>
       *   which contains the distance of the elements from each other.
       */
      getPosition : getter(qx.bom.element.Location, "getPosition"),

      /**
       * Detects the offset parent of the first element
       *
       * @signature function()
       * @return {Collection} Detected offset parent encapsulated into a new collection instance
       */
      getOffsetParent : getter(qx.bom.element.Location, "getOffsetParent"),


      /**
       * Scrolls the elements of the collection to the given coordinate.
       *
       * @param value {Integer} Left scroll position
       * @return {Collection} This collection for chaining
       */
      setScrollLeft : function(value)
      {
        var Node = qx.dom.Node;

        for (var i=0, l=this.length, obj; i<l; i++)
        {
          obj = this[i];

          if (Node.isElement(obj)) {
            obj.scrollLeft = value;
          } else if (Node.isWindow(obj)) {
            obj.scrollTo(value, this.getScrollTop(obj));
          } else if (Node.isDocument(obj)) {
            Node.getWindow(obj).scrollTo(value, this.getScrollTop(obj));
          }
        }

        return this;
      },


      /**
       * Scrolls the elements of the collection to the given coordinate.
       *
       * @param value {Integer} Top scroll position
       * @return {Collection} This collection for chaining
       */
      setScrollTop : function(value)
      {
        var Node = qx.dom.Node;

        for (var i=0, l=this.length, obj; i<l; i++)
        {
          obj = this[i];

          if (Node.isElement(obj)) {
            obj.scrollTop = value;
          } else if (Node.isWindow(obj)) {
            obj.scrollTo(this.getScrollLeft(obj), value);
          } else if (Node.isDocument(obj)) {
            Node.getWindow(obj).scrollTo(this.getScrollLeft(obj), value);
          }
        }

        return this;
      },


      /**
       * Returns the left scroll position of the first element in the collection.
       *
       * @return {Integer} Current left scroll position
       */
      getScrollLeft : function()
      {
        var obj = this[0];
        if (!obj) {
          return null;
        }

        var Node = qx.dom.Node;
        if (Node.isWindow(obj) || Node.isDocument(obj)) {
          return qx.bom.Viewport.getScrollLeft();
        }

        return obj.scrollLeft;
      },


      /**
       * Returns the top scroll position of the first element in the collection.
       *
       * @return {Integer} Current top scroll position
       */
      getScrollTop : function()
      {
        var obj = this[0];
        if (!obj) {
          return null;
        }

        var Node = qx.dom.Node;
        if (Node.isWindow(obj) || Node.isDocument(obj)) {
          return qx.bom.Viewport.getScrollTop();
        }

        return obj.scrollTop;
      },




      /*
      ---------------------------------------------------------------------------
         CSS: WIDTH AND HEIGHT
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the width of the first element in the collection.
       *
       * This is the rendered width of the element which includes borders and
       * paddings like the <code>offsetWidth</code> property in plain HTML.
       *
       * @return {Integer} The width of the first element
       */
      getWidth : function()
      {
        var obj = this[0];
        var Node = qx.dom.Node;

        if (obj)
        {
          if (Node.isElement(obj)) {
            return qx.bom.element.Dimension.getWidth(obj);
          } else if (Node.isDocument(obj)) {
            return qx.bom.Document.getWidth(Node.getWindow(obj));
          } else if (Node.isWindow(obj)) {
            return qx.bom.Viewport.getWidth(obj);
          }
        }

        return null;
      },


      /**
       * Returns the content width of the first element in the collection.
       *
       * The content width is basically the maximum
       * width used or the maximum width which can be used by the content. This
       * excludes all kind of styles of the element like borders, paddings, margins,
       * and even scrollbars.
       *
       * Please note that with visible scrollbars the content width returned
       * may be larger than the box width returned via {@link #getWidth}.
       *
       * Only works for DOM elements and not for the window object or the document
       * object!
       *
       * @return {Integer} Computed content width
       */
      getContentWidth : function()
      {
        var obj = this[0];
        if (qx.dom.Node.isElement(obj)) {
          return qx.bom.element.Dimension.getContentWidth(obj);
        }

        return null;
      },


      /**
       * Returns the height of the first element in the collection.
       *
       * This is the rendered height of the element which includes borders and
       * paddings like the <code>offsetHeight</code> property in plain HTML.
       *
       * @return {Integer} The height of the first element
       */
      getHeight : function()
      {
        var obj = this[0];
        var Node = qx.dom.Node;

        if (obj)
        {
          if (Node.isElement(obj)) {
            return qx.bom.element.Dimension.getHeight(obj);
          } else if (Node.isDocument(obj)) {
            return qx.bom.Document.getHeight(Node.getWindow(obj));
          } else if (Node.isWindow(obj)) {
            return qx.bom.Viewport.getHeight(obj);
          }
        }

        return null;
      },


      /**
       * Returns the content height of the first element in the collection.
       *
       * The content height is basically the maximum
       * height used or the maximum height which can be used by the content. This
       * excludes all kind of styles of the element like borders, paddings, margins,
       * and even scrollbars.
       *
       * Please note that with visible scrollbars the content height returned
       * may be larger than the box width returned via {@link #getWidth}.
       *
       * Only works for DOM elements and not for the window object or the document
       * object!
       *
       * @return {Integer} Computed content height
       */
      getContentHeight : function()
      {
        var obj = this[0];
        if (qx.dom.Node.isElement(obj)) {
          return qx.bom.element.Dimension.getContentHeight(obj);
        }

        return null;
      },





      /*
      ---------------------------------------------------------------------------
         EVENTS
      ---------------------------------------------------------------------------
      */

      /**
       * Add an event listener to the selected elements. The event listener is passed an
       * instance of {@link Event} containing all relevant information
       * about the event as parameter.
       *
       * @signature function(type, listener, self, capture)
       * @param type {String} Name of the event e.g. "click", "keydown", ...
       * @param listener {Function} Event listener function
       * @param self {Object ? null} Reference to the 'this' variable inside
       *         the event listener. When not given, the corresponding dispatcher
       *         usually falls back to a default, which is the target
       *         by convention. Note this is not a strict requirement, i.e.
       *         custom dispatchers can follow a different strategy.
       * @param capture {Boolean} Whether to attach the event to the
       *       capturing phase or the bubbling phase of the event. The default is
       *       to attach the event handler to the bubbling phase.
       * @return {Collection} The collection is returned for chaining proposes
       */
      addListener : setter(qx.bom.Element, "addListener"),

      /**
       * Removes an event listener from the selected elements.
       *
       * Note: All registered event listeners will automatically be removed from
       *   the DOM at page unload so it is not necessary to detach events yourself.
       *
       * @signature function(type, listener, self, capture)
       * @param type {String} Name of the event
       * @param listener {Function} The pointer to the event listener
       * @param self {Object ? null} Reference to the 'this' variable inside
       *         the event listener.
       * @param capture {Boolean} Whether to remove the event listener of
       *       the bubbling or of the capturing phase.
       * @return {Collection} The collection is returned for chaining proposes
       */
      removeListener : setter(qx.bom.Element, "removeListener"),






      /*
      ---------------------------------------------------------------------------
         TRAVERSING: FILTERING
      ---------------------------------------------------------------------------
      */

      /**
       * Reduce the set of matched elements to a single element.
       *
       * The position of the element in the collection of matched
       * elements starts at 0 and goes to length - 1.
       *
       * @param index {Integer} The position of the element
       * @return {Collection} The filtered collection
       */
      eq : function(index) {
        return this.slice(index, +index + 1);
      },


      /**
       * Removes all elements from the set of matched elements that
       * do not match the specified expression(s) or be valid
       * after being tested with the given function.
       *
       * A selector function is invoked with three arguments: the value of the element, the
       * index of the element, and the Array object being traversed.
       *
       * @param selector {String|Function} An expression or function to filter
       * @param context {Object?null} Optional context for the function to being executed in.
       * @return {Collection} The filtered collection
       */
      filter : function(selector, context)
      {
        var res;

        if (qx.lang.Type.isFunction(selector)) {
          res = qx.type.BaseArray.prototype.filter.call(this, selector, context);
        } else {
          res = qx.bom.Selector.matches(selector, this);
        }

        return this.__pushStack(res);
      },


      /**
       * Checks the current selection against an expression
       * and returns true, if at least one element of the
       * selection fits the given expression.
       *
       * @param selector {String} Selector to check the content for
       * @return {Boolean} Whether at least one element matches the given selector
       */
      is : function(selector) {
        return !!selector && qx.bom.Selector.matches(selector, this).length > 0;
      },


      /** {RegExp} Test for simple selectors */
      __simple : /^.[^:#\[\.,]*$/,


      /**
       * Removes elements matching the specified expression from the collection.
       *
       * @param selector {String} CSS selector expression
       * @return {Collection} A newly created collection where the matching elements
       *    have been removed.
       */
      not : function(selector)
      {
        // Test special case where just one selector is passed in
        if (this.__simple.test(selector))
        {
          var res = qx.bom.Selector.matches(":not(" + selector + ")", this);
          return this.__pushStack(res);
        }

        // Otherwise do it in a more complicated way
        var res = qx.bom.Selector.matches(selector, this);
        return this.filter(function(value) {
          return res.indexOf(value) === -1;
        });
      },





      /*
      ---------------------------------------------------------------------------
         TRAVERSING: FINDING
      ---------------------------------------------------------------------------
      */

      /**
       * Adds more elements, matched by the given expression,
       * to the set of matched elements.
       *
       * @param selector {String} Valid selector (CSS3 + extensions)
       * @param context {Element} Context element (result elements must be children of this element)
       * @return {qx.bom.Collection} The collection is returned for chaining proposes
       */
      add : function(selector, context)
      {
        var res = qx.bom.Selector.query(selector, context);
        var arr = qx.lang.Array.unique(this.concat(res));

        return this.__pushStack(arr);
      },


      /**
       * Get a set of elements containing all of the unique immediate children
       * of each of the matched set of elements.
       *
       * This set can be filtered with an optional expression that will cause
       * only elements matching the selector to be collected.
       *
       * Also note: while <code>parents()</code> will look at all ancestors,
       * <code>children()</code> will only consider immediate child elements.
       *
       * @param selector {String?null} Optional selector to match
       * @return {Collection} The new collection
       */
      children : function(selector)
      {
        var children = [];
        for (var i=0, l=this.length; i<l; i++) {
          children.push.apply(children, qx.dom.Hierarchy.getChildElements(this[i]));
        }

        if (selector) {
          children = qx.bom.Selector.matches(selector, children);
        }

        return this.__pushStack(children);
      },


      /**
       * Get a set of elements containing the closest parent element
       * that matches the specified selector, the starting element included.
       *
       * Closest works by first looking at the current element to see if
       * it matches the specified expression, if so it just returns the
       * element itself. If it doesn't match then it will continue to
       * traverse up the document, parent by parent, until an element
       * is found that matches the specified expression. If no matching
       * element is found then none will be returned.
       *
       * @param selector {String} Expression to filter the elements with
       * @return {Collection} New collection which contains all interesting parents
       */
      closest : function(selector)
      {
        // Initialize array for reusing it as container for
        // selector match call.
        var arr = new qx.bom.Collection(1);

        // Performance tweak
        var Selector = qx.bom.Selector;

        // Map all children to given selector
        var ret = this.map(function(current)
        {
          while (current && current.ownerDocument)
          {
            arr[0] = current;

            if (Selector.matches(selector, arr).length > 0) {
              return current;
            }

            // Try the next parent
            current = current.parentNode;
          }
        });

        return this.__pushStack(qx.lang.Array.unique(ret));
      },


      /**
       * Find all the child nodes inside the matched elements (including text nodes).
       *
       * @return {Collection} A new collection containing all child nodes of the previous collection.
       */
      contents : function()
      {
        var res = [];
        var lang = qx.lang.Array;

        for (var i=0, l=this.length; i<l; i++) {
          res.push.apply(res, lang.fromCollection(this[i].childNodes));
        }

        return this.__pushStack(res);
      },


      /**
       * Searches for all elements that match the specified expression.
       * This method is a good way to find additional descendant
       * elements with which to process.
       *
       * @param selector {String} Selector for children to find
       * @return {Collection} The found elements in a new collection
       */
      find : function(selector)
      {
        var Selector = qx.bom.Selector;

        // Fast path for single item selector
        if (this.length === 1) {
          return this.__pushStack(Selector.query(selector, this[0]));
        }
        else
        {
          // Let the selector do the work and merge all result arrays.
          var ret = [];
          for (var i=0, l=this.length; i<l; i++) {
            ret.push.apply(ret, Selector.query(selector, this[i]));
          }

          return this.__pushStack(qx.lang.Array.unique(ret));
        }
      },


      /**
       * Get a set of elements containing the unique next siblings of each of the given set of elements.
       *
       * <code>next</code> only returns the very next sibling for each element, not all next siblings
       * (see {@link #nextAll}). Use an optional expression to filter the matched set.
       *
       * @param selector {String?null} Optional selector to filter the result
       * @return {Collection} Collection of all very next siblings of the current collection.
       */
      next : function(selector)
      {
        var Hierarchy = qx.dom.Hierarchy;
        var ret = this.map(Hierarchy.getNextElementSibling, Hierarchy);

        // Post reduce result by selector
        if (selector) {
          ret = qx.bom.Selector.matches(selector, ret);
        }

        return this.__pushStack(ret);
      },


      /**
       * Find all sibling elements after the current element.
       *
       * Use an optional expression to filter the matched set.
       *
       * @param selector {String?null} Optional selector to filter the result
       * @return {Collection} Collection of all siblings following the elements of the current collection.
       */
      nextAll : function(selector) {
        return this.__hierarchyHelper("getNextSiblings", selector);
      },


      /**
       * Get a set of elements containing the unique previous siblings of each of the given set of elements.
       *
       * <code>prev</code> only returns the very previous sibling for each element, not all previous siblings
       * (see {@link #prevAll}). Use an optional expression to filter the matched set.
       *
       * @param selector {String?null} Optional selector to filter the result
       * @return {Collection} Collection of all very previous siblings of the current collection.
       */
      prev : function(selector)
      {
        var Hierarchy = qx.dom.Hierarchy;
        var ret = this.map(Hierarchy.getPreviousElementSibling, Hierarchy);

        // Post reduce result by selector
        if (selector) {
          ret = qx.bom.Selector.matches(selector, ret);
        }

        return this.__pushStack(ret);
      },


      /**
       * Find all sibling elements preceding the current element.
       *
       * Use an optional expression to filter the matched set.
       *
       * @param selector {String?null} Optional selector to filter the result
       * @return {Collection} Collection of all siblings preceding the elements of the current collection.
       */
      prevAll : function(selector) {
        return this.__hierarchyHelper("getPreviousSiblings", selector);
      },


      /**
       * Get a set of elements containing the unique parents of the matched set of elements.
       *
       * @param selector {String?null} Optional selector to filter the result
       * @return {Collection} Collection of all unique parent elements.
       */
      parent : function(selector)
      {
        var Element = qx.dom.Element;
        var ret = qx.lang.Array.unique(this.map(Element.getParentElement, Element));

        // Post reduce result by selector
        if (selector) {
          ret = qx.bom.Selector.matches(selector, ret);
        }

        return this.__pushStack(ret);
      },


      /**
       * Get a set of elements containing the unique ancestors of the matched set of
       * elements (except for the root element).
       *
       * The matched elements can be filtered with an optional expression.
       *
       * @param selector {String?null} Optional selector to filter the result
       * @return {Collection} Collection of all unique parent elements.
       */
      parents : function(selector) {
        return this.__hierarchyHelper("getAncestors", selector);
      },


      /**
       * Get a set of elements containing all of the unique siblings
       * of each of the matched set of elements.
       *
       * Can be filtered with an optional expressions.
       *
       * @param selector {String?null} Optional selector to filter the result
       * @return {Collection} Collection of all unique sibling elements.
       */
      siblings : function(selector) {
        return this.__hierarchyHelper("getSiblings", selector);
      },


      /**
       * Internal helper to work with hierarchy result arrays.
       *
       * @param method {String} Method name to execute
       * @param selector {String} Optional selector to filter the result
       * @return {Collection} Collection from all found elements
       */
      __hierarchyHelper : function(method, selector)
      {
        // Iterate ourself, as we want to directly combine the result
        var all = [];
        var Hierarchy = qx.dom.Hierarchy;
        for (var i=0, l=this.length; i<l; i++) {
          all.push.apply(all, Hierarchy[method](this[i]));
        }

        // Remove duplicates
        var ret = qx.lang.Array.unique(all);

        // Post reduce result by selector
        if (selector) {
          ret = qx.bom.Selector.matches(selector, ret);
        }

        return this.__pushStack(ret);
      },




      /*
      ---------------------------------------------------------------------------
         TRAVERSING: CHAINING
      ---------------------------------------------------------------------------
      */

      /**
       * Extend the chaining with a new collection, while
       * storing the previous collection to make it accessible
       * via <code>end()</code>.
       *
       * @param arr {Array} Array to transform into new collection
       * @return {Collection} The newly created collection
       */
      __pushStack : function(arr)
      {
        var coll = new qx.bom.Collection;

        // Remember previous collection
        coll.__prevObject = this;

        // The "apply" call only accepts real arrays, no extended ones,
        // so we need to convert it first
        arr = Array.prototype.slice.call(arr, 0);

        // Append all elements
        coll.push.apply(coll, arr);

        // Return newly formed collection
        return coll;
      },


      /**
       * Add the previous selection to the current selection.
       *
       * @return {Collection} Newly build collection containing the current and
       *    and the previous collection.
       */
      andSelf : function() {
        return this.add(this.__prevObject);
      },


      /**
       * Undone of the last modification of the collection.
       *
       * These methods change the selection during a chained method call:
       * <code>add</code>, <code>children</code>, <code>eq</code>, <code>filter</code>,
       * <code>find</code>, <code>gt</code>, <code>lt</code>, <code>next</code>,
       * <code>not</code>, <code>parent</code>, <code>parents</code> and <code>siblings</code>
       *
       * @return {Collection} The previous collection
       */
      end : function() {
        return this.__prevObject || new qx.bom.Collection();
      },





      /*
      ---------------------------------------------------------------------------
         MANIPULATION: CORE
      ---------------------------------------------------------------------------
      */

      /**
       * Helper method for all DOM manipulation methods which deal
       * with set of elements or HTML fragments.
       *
       * @param args {Element[]|String[]} Array of DOM elements or HTML strings
       * @param callback {Function} Method to execute for each fragment/element created
       * @return {Collection} The collection is returned for chaining proposes
       */
      __manipulate : function(args, callback)
      {
        var element = this[0];
        var doc = element.ownerDocument || element;

        // Create fragment, cleanup HTML and extract scripts
        var fragment = doc.createDocumentFragment();
        var scripts = qx.bom.Html.clean(args, doc, fragment);
        var first = fragment.firstChild;

        // Process fragment content
        if (first)
        {
          // Clone every fragment except the last one
          var last = this.length-1;
          for (var i=0, l=last; i<l; i++) {
            callback.call(this, this[i], fragment.cloneNode(true));
          }

          callback.call(this, this[last], fragment);
        }

        // Process script elements
        if (scripts)
        {
          var script;
          var Loader = qx.io.ScriptLoader;
          var Func = qx.lang.Function;

          for (var i=0, l=scripts.length; i<l; i++)
          {
            script = scripts[i];

            // Executing script code or loading source depending on element configuration
            if (script.src) {
              (new Loader()).load(script.src);
            } else {
              Func.globalEval(script.text || script.textContent || script.innerHTML || "");
            }

            // Removing element from old parent
            if (script.parentNode) {
              script.parentNode.removeChild(script);
            }
          }
        }

        return this;
      },


      /**
       * Helper for wrapping the methods to insert/replace content
       * so that they can be used in reverse order (selector is
       * given to the target method instead)
       *
       * @param args {String[]} All arguments (selectors) of the original method call
       * @param original {String} Name of the original method to wrap
       * @return {Collection} The collection is returned for chaining proposes
       */
      __manipulateTo : function(args, original)
      {
        var Selector = qx.bom.Selector;
        var Lang = qx.lang.Array;

        // Build a large collection from the individual elements
        var col = [];
        for (var i=0, l=args.length; i<l; i++)
        {
          if (qx.core.Environment.get("qx.debug"))
          {
            if (typeof args[i] !== "string") {
              throw new Error("Invalid argument for selector query: " + args[i]);
            }
          }

          col.push.apply(col, Selector.query(args[i]));
        }

        // Remove duplicates and transform into Collection
        col = Lang.cast(Lang.unique(col), qx.bom.Collection);

        // Process modification
        for (var i=0, il=this.length; i<il; i++) {
          col[original](this[i]);
        }

        return this;
      },




      /*
      ---------------------------------------------------------------------------
         MANIPULATION: INSERTING INSIDE
      ---------------------------------------------------------------------------
      */

      /**
       * Append content to the inside of every matched element.
       *
       * Supports lists of DOM elements or HTML strings through a variable
       * argument list.
       *
       * Please make sure you understand the security implications of this
       * method when passing HTML strings from untrusted input. See
       * {@link qx.bom.Html#clean}.
       *
       * @param varargs {Element|String} A reference to an DOM element or a HTML string
       * @return {Collection} The collection is returned for chaining proposes
       */
      append : function(varargs) {
        return this.__manipulate(arguments, this.__appendCallback);
      },


      /**
       * Prepend content to the inside of every matched element.
       *
       * Supports lists of DOM elements or HTML strings through a variable
       * argument list.
       *
       * Please make sure you understand the security implications of this
       * method when passing HTML strings from untrusted input. See
       * {@link qx.bom.Html#clean}.
       *
       * @param varargs {Element|String} A reference to an DOM element or a HTML string
       * @return {Collection} The collection is returned for chaining proposes
       */
      prepend : function(varargs) {
        return this.__manipulate(arguments, this.__prependCallback);
      },


      /**
       * Callback for {@link #append} to apply the insertion of content
       *
       * @param rel {Element} Relative DOM element (iteration point in selector processing)
       * @param child {Element} Child to insert
       */
      __appendCallback : function(rel, child) {
        rel.appendChild(child);
      },


      /**
       * Callback for {@link #prepend} to apply the insertion of content
       *
       * @param rel {Element} Relative DOM element (iteration point in selector processing)
       * @param child {Element} Child to insert
       */
      __prependCallback : function(rel, child) {
        rel.insertBefore(child, rel.firstChild);
      },


      /**
       * Append all of the matched elements to another, specified, set of elements.
       *
       * This operation is, essentially, the reverse of doing a regular
       * <code>qx.bom.Collection.query(A).append(B)</code>, in that instead
       * of appending B to A, you're appending A to B.
       *
       * @param varargs {String} List of selector expressions
       * @return {Collection} The collection is returned for chaining proposes
       */
      appendTo : function(varargs) {
        return this.__manipulateTo(arguments, "append");
      },


      /**
       * Append all of the matched elements to another, specified, set of elements.
       *
       * This operation is, essentially, the reverse of doing a regular
       * <code>qx.bom.Collection.query(A).prepend(B)</code>,  in that instead
       * of prepending B to A, you're prepending A to B.
       *
       * @param varargs {String} List of selector expressions
       * @return {Collection} The collection is returned for chaining proposes
       */
      prependTo : function(varargs) {
        return this.__manipulateTo(arguments, "prepend");
      },





      /*
      ---------------------------------------------------------------------------
         MANIPULATION: INSERTING OUTSIDE
      ---------------------------------------------------------------------------
      */

      /**
       * Insert content before each of the matched elements.
       *
       * Supports lists of DOM elements or HTML strings through a variable
       * argument list.
       *
       * @param varargs {Element|String} A reference to an DOM element or a HTML string
       * @return {Collection} The collection is returned for chaining proposes
       */
      before : function(varargs) {
        return this.__manipulate(arguments, this.__beforeCallback);
      },


      /**
       * Insert content after each of the matched elements.
       *
       * Supports lists of DOM elements or HTML strings through a variable
       * argument list.
       *
       * @param varargs {Element|String} A reference to an DOM element or a HTML string
       * @return {Collection} The collection is returned for chaining proposes
       */
      after : function(varargs) {
        return this.__manipulate(arguments, this.__afterCallback);
      },


      /**
       * Callback for {@link #before} to apply the insertion of content
       *
       * @param rel {Element} Relative DOM element (iteration point in selector processing)
       * @param child {Element} Child to insert
       */
      __beforeCallback : function(rel, child) {
        rel.parentNode.insertBefore(child, rel);
      },


      /**
       * Callback for {@link #after} to apply the insertion of content
       *
       * @param rel {Element} Relative DOM element (iteration point in selector processing)
       * @param child {Element} Child to insert
       */
      __afterCallback : function(rel, child) {
        rel.parentNode.insertBefore(child, rel.nextSibling);
      },


      /**
       * Insert all of the matched elements after another, specified, set of elements.
       *
       * This operation is, essentially, the reverse of doing a regular
       * <code>qx.bom.Collection.query(A).before(B)</code>, in that instead
       * of inserting B to A, you're inserting A to B.
       *
       * @param varargs {String} List of selector expressions
       * @return {Collection} The collection is returned for chaining proposes
       */
      insertBefore : function(varargs) {
        return this.__manipulateTo(arguments, "before");
      },


      /**
       * Insert all of the matched elements before another, specified, set of elements.
       *
       * This operation is, essentially, the reverse of doing a regular
       * <code>qx.bom.Collection.query(A).after(B)</code>,  in that instead
       * of inserting B to A, you're inserting A to B.
       *
       * @param varargs {String} List of selector expressions
       * @return {Collection} The collection is returned for chaining proposes
       */
      insertAfter : function(varargs) {
        return this.__manipulateTo(arguments, "after");
      },




      /*
      ---------------------------------------------------------------------------
         MANIPULATION: INSERTING AROUND
      ---------------------------------------------------------------------------
      */

      /**
       * Wrap all the elements in the matched set into a single wrapper element.
       *
       * This is different from {@link #wrap} where each element in the matched set
       * would get wrapped with an element.
       *
       * This wrapping process is most useful for injecting additional structure
       * into a document, without ruining the original semantic qualities of
       * a document.
       *
       * This works by going through the first element provided (which is
       * generated, on the fly, from the provided HTML) and finds the deepest
       * descendant element within its structure -- it is that element, which
       * will wrap everything else.
       *
       * @param content {String|Element} Element or HTML markup used for wrapping
       * @return {Collection} The collection is returned for chaining proposes
       */
      wrapAll : function(content)
      {
        var first = this[0];
        if (first)
        {
          // Parse HTML / Clone given content
          var wrap = qx.bom.Collection.create(content, first.ownerDocument).clone();

          // Insert wrapper before first element
          if (first.parentNode) {
            first.parentNode.insertBefore(wrap[0], first);
          }

          // Wrap so that we have the innermost element of every item in the
          // collection. Afterwards append the current items to the wrapper.
          wrap.map(this.__getInnerHelper).append(this);
        }

        return this;
      },


      /**
       * Finds the deepest child inside the given element
       *
       * @param elem {Element} Outer DOM element
       * @return {Element} Inner DOM element
       */
      __getInnerHelper : function(elem)
      {
        while (elem.firstChild) {
          elem = elem.firstChild;
        }

        return elem;
      },


      /**
       * Wrap the inner child contents of each matched element (including
       * text nodes) with an HTML structure.
       *
       * This wrapping process is most useful for injecting additional structure
       * into a document, without ruining the original semantic qualities of a
       * document. This works by going through the first element provided
       * (which is generated, on the fly, from the provided HTML) and finds the
       * deepest ancestor element within its structure -- it is that element
       * that will enwrap everything else.
       *
       * @param content {String|Element} Element or HTML markup used for wrapping
       * @return {Collection} The collection is returned for chaining proposes
       */
      wrapInner : function(content)
      {
        // Fly weight pattern, reuse collection instance for every iteration.
        var helper = new qx.bom.Collection(1);

        for (var i=0, l=this.length; i<l; i++)
        {
          helper[0] = this[i];
          helper.contents().wrapAll(content);
        }

        return this;
      },


      /**
       * Wrap each matched element with the specified HTML content.
       *
       * This wrapping process is most useful for injecting additional structure
       * into a document, without ruining the original semantic qualities of a
       * document. This works by going through the first element provided (which
       * is generated, on the fly, from the provided HTML) and finds the deepest
       * descendant element within its structure -- it is that element, which
       * will wrap everything else.
       *
       * @param content {String|Element} Element or HTML markup used for wrapping
       * @return {Collection} The collection is returned for chaining proposes
       */
      wrap : function(content)
      {
        var helper = new qx.bom.Collection(1);

        /*
        // TODO: The current implementation of forEach() breaks in IE7

        return this.forEach(function(elem)
        {
          qx.log.Logger.debug("forEach " + elem);
          helper[0] = elem;
          helper.wrapAll(content);
        });
        */

        for (var i=0, l=this.length; i<l; i++)
        {
          helper[0] = this[i];
          helper.wrapAll(content);
        }

        return this;
      },





      /*
      ---------------------------------------------------------------------------
         MANIPULATION: REPLACING
      ---------------------------------------------------------------------------
      */

      /**
       * Replaces all matched elements with the specified HTML or DOM elements.
       *
       * This returns the JQuery element that was just replaced, which has been
       * removed from the DOM.
       *
       * @param content {Element|String} A reference to an DOM element or a HTML string
       * @return {Collection} The collection is returned for chaining proposes
       */
      replaceWith : function(content) {
        return this.after(content).remove();
      },


      /**
       * Replaces the elements matched by the specified selector
       * with the matched elements.
       *
       * This function is the complement to {@link #replaceWith} which does
       * the same task with the parameters reversed.
       *
       * @param varargs {String} List of selector expressions
       * @return {Collection} The collection is returned for chaining proposes
       */
      replaceAll : function(varargs) {
        return this.__manipulateTo(arguments, "replaceWith");
      },




      /*
      ---------------------------------------------------------------------------
         MANIPULATION: REMOVING
      ---------------------------------------------------------------------------
      */

      /**
       * Removes all matched elements from the DOM. This does NOT remove them
       * from the collection object, allowing you to use the matched
       * elements further. When a selector is given the list is filtered
       * by the selector and the chaining stack is pushed by the new collection.
       *
       * The Collection content can be pre-filtered with an optional selector
       * expression.
       *
       * @param selector {String?null} Selector to filter current collection
       * @return {Collection} The collection is returned for chaining proposes
       */
      remove : function(selector)
      {
        // Filter by given selector
        var coll = this;
        if (selector)
        {
          coll = this.filter(selector);
          if (coll.length == 0) {
            return this;
          }
        }

        // Remove elements from DOM
        for (var i=0, il=coll.length, current; i<il; i++)
        {
          current = coll[i];
          if (current.parentNode) {
            current.parentNode.removeChild(current);
          }
        }

        // Return filtered collection (or original if no selector given)
        return coll;
      },


      /**
       * Removes all matched elements from their parent elements,
       * cleans up any attached events or data and clears up the Collection
       * to free up memory.
       *
       * The Collection content can be pre-filtered with an optional selector
       * expression.
       *
       * Modifies the current collection (without pushing the stack) as it
       * removes all elements from the collection which where removed from the DOM.
       * This normally means all elements in the collection when no selector is given.
       *
       * @param selector {String?null} Selector to filter current collection
       * @return {Collection} The collection is returned for chaining proposes
       */
      destroy : function(selector)
      {
        if (this.length == 0) {
          return this;
        }

        var Selector = qx.bom.Selector;

        // Filter by given selector
        var coll = this;
        if (selector)
        {
          coll = this.filter(selector);
          if (coll.length == 0) {
            return this;
          }
        }

        // Collect all inner elements to prevent memory leaks
        var Manager = qx.event.Registration.getManager(this[0]);
        for (var i=0, l=coll.length, current, inner; i<l; i++)
        {
          // Cache element
          current = coll[i];

          // Remove from element in collection
          Manager.removeAllListeners(current);

          // Remove events from all children (recursive)
          inner = Selector.query("*", current);
          for (var j=0, jl=inner.length; j<jl; j++) {
            Manager.removeAllListeners(inner[j]);
          }

          // Remove collection element from DOM
          if (current.parentNode) {
            current.parentNode.removeChild(current);
          }
        }

        // Revert filter and reduce size
        if (selector)
        {
          // Exit chaining
          coll.end();

          // Remove all selected elements from current list
          qx.lang.Array.exclude(this, coll);
        }
        else
        {
          this.length = 0;
        }

        return this;
      },


      /**
       * Removes all content from the elements
       *
       * @signature function()
       * @return {Collection} The collection is returned for chaining proposes
       */
      empty : function()
      {
        var Collection = qx.bom.Collection;

        for (var i=0, l=this.length; i<l; i++)
        {
          // Remove element nodes and prevent memory leaks
          Collection.query(">*", this[i]).destroy();

          // Remove any remaining nodes
          while (this.firstChild) {
            this.removeChild(this.firstChild);
          }
        }

        return this;
      },





      /*
      ---------------------------------------------------------------------------
         MANIPULATION: CLONING
      ---------------------------------------------------------------------------
      */

      /**
       * Clone all DOM elements of the collection and return them in a newly
       * created collection.
       *
       * @param events {Boolean?false} Whether events should be copied as well
       * @return {Collection} The copied elements
       */
      clone : function(events)
      {
        var Element = qx.bom.Element;

        return events ?
          this.map(function(elem) { return Element.clone(elem, true); }) :
          this.map(Element.clone, Element);
      }
    },




    /*
    *****************************************************************************
       DEFER
    *****************************************************************************
    */

    defer : function(statics)
    {
      // Define alias as used by jQuery if not already in use.
      if (window.$ == null) {
        window.$ = statics.create;
      }
    }
  });
})();

/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2009 Sebastian Werner, http://sebastian-werner.net

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

   ======================================================================

   This class contains code based on the following work:

   * jQuery
     http://jquery.com
     Version 1.3.1

     Copyright:
       2009 John Resig

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

************************************************************************ */

/**
 * This class is mainly a convenience wrapper for DOM elements to
 * qooxdoo's event system.
 */
qx.Class.define("qx.bom.Html",
{
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /**
     * Helper method for XHTML replacement.
     *
     * @param all {String} Complete string
     * @param front {String} Front of the match
     * @param tag {String} Tag name
     * @return {String} XHTML corrected tag
     */
    __fixNonDirectlyClosableHelper : function(all, front, tag)
    {
      return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i) ?
        all : front + "></" + tag + ">";
    },


    /** {Map} Contains wrap fragments for specific HTML matches */
    __convertMap :
    {
      opt : [ 1, "<select multiple='multiple'>", "</select>" ], // option or optgroup
      leg : [ 1, "<fieldset>", "</fieldset>" ],
      table : [ 1, "<table>", "</table>" ],
      tr : [ 2, "<table><tbody>", "</tbody></table>" ],
      td : [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
      col : [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
      def : qx.core.Environment.select("engine.name",
      {
        "mshtml" : [ 1, "div<div>", "</div>" ],
        "default" : null
      })
    },


    /**
     * Translates a HTML string into an array of elements.
     *
     * @param html {String} HTML string
     * @param context {Document} Context document in which (helper) elements should be created
     * @return {Array} List of resulting elements
     */
    __convertHtmlString : function(html, context)
    {
      var div = context.createElement("div");

      // Fix "XHTML"-style tags in all browsers
      // Replaces tags which are not allowed to be directly closed like
      // <code>div</code> or <code>p</code>. They are patched to use an
      // open and close tag instead e.g. <p> => <p></p>
      html = html.replace(/(<(\w+)[^>]*?)\/>/g, this.__fixNonDirectlyClosableHelper);

      // Trim whitespace, otherwise indexOf won't work as expected
      var tags = html.replace(/^\s+/, "").substring(0, 5).toLowerCase();

      // Auto-wrap content into required DOM structure
      var wrap, map = this.__convertMap;
      if (!tags.indexOf("<opt")) {
        wrap = map.opt;
      } else if (!tags.indexOf("<leg")) {
        wrap = map.leg;
      } else if (tags.match(/^<(thead|tbody|tfoot|colg|cap)/)) {
        wrap = map.table;
      } else if (!tags.indexOf("<tr")) {
        wrap = map.tr;
      } else if (!tags.indexOf("<td") || !tags.indexOf("<th")) {
        wrap = map.td;
      } else if (!tags.indexOf("<col")) {
        wrap = map.col;
      } else {
        wrap = map.def;
      }

      // Omit string concat when no wrapping is needed
      if (wrap)
      {
        // Go to html and back, then peel off extra wrappers
        div.innerHTML = wrap[1] + html + wrap[2];

        // Move to the right depth
        var depth = wrap[0];
        while (depth--) {
          div = div.lastChild;
        }
      }
      else
      {
        div.innerHTML = html;
      }

      // Fix IE specific bugs
      if ((qx.core.Environment.get("engine.name") == "mshtml"))
      {
        // Remove IE's autoinserted <tbody> from table fragments
        // String was a <table>, *may* have spurious <tbody>
        var hasBody = /<tbody/i.test(html);

        // String was a bare <thead> or <tfoot>
        var tbody = !tags.indexOf("<table") && !hasBody ?
          div.firstChild && div.firstChild.childNodes :
          wrap[1] == "<table>" && !hasBody ? div.childNodes :
          [];

        for (var j=tbody.length-1; j>=0 ; --j)
        {
          if (tbody[j].tagName.toLowerCase() === "tbody" && !tbody[j].childNodes.length) {
            tbody[j].parentNode.removeChild(tbody[j]);
          }
        }

        // IE completely kills leading whitespace when innerHTML is used
        if (/^\s/.test(html)) {
          div.insertBefore(context.createTextNode(html.match(/^\s*/)[0]), div.firstChild);
        }
      }

      return qx.lang.Array.fromCollection(div.childNodes);
    },


    /**
     * Cleans-up the given HTML and append it to a fragment
     *
     * When no <code>context</code> is given the global document is used to
     * create new DOM elements.
     *
     * When a <code>fragment</code> is given the nodes are appended to this
     * fragment except the script tags. These are returned in a separate Array.
     *
     * Please note: HTML coming from user input must be validated prior
     * to passing it to this method. HTML is temporarily inserted to the DOM
     * using <code>innerHTML</code>. As a consequence, scripts included in
     * attribute event handlers may be executed.
     *
     * @param objs {Element[]|String[]} Array of DOM elements or HTML strings
     * @param context {Document?document} Context in which the elements should be created
     * @param fragment {Element?null} Document fragment to appends elements to
     * @return {Element[]} Array of elements (when a fragment is given it only contains script elements)
     */
    clean: function(objs, context, fragment)
    {
      context = context || document;

      // !context.createElement fails in IE with an error but returns typeof 'object'
      if (typeof context.createElement === "undefined") {
        context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
      }

      // Fast-Path:
      // If a single string is passed in and it's a single tag
      // just do a createElement and skip the rest
      if (!fragment && objs.length === 1 && typeof objs[0] === "string")
      {
        var match = /^<(\w+)\s*\/?>$/.exec(objs[0]);
        if (match) {
          return [context.createElement(match[1])];
        }
      }

      // Interate through items in incoming array
      var obj, ret=[];
      for (var i=0, l=objs.length; i<l; i++)
      {
        obj = objs[i];

        // Convert HTML string into DOM nodes
        if (typeof obj === "string") {
          obj = this.__convertHtmlString(obj, context);
        }

        // Append or merge depending on type
        if (obj.nodeType) {
          ret.push(obj);
        } else if (obj instanceof qx.type.BaseArray) {
          ret.push.apply(ret, Array.prototype.slice.call(obj, 0));
        } else if (obj.toElement) {
          ret.push(obj.toElement());
        } else {
          ret.push.apply(ret, obj);
        }
      }

      // Append to fragment and filter out scripts... or...
      if (fragment)
      {
        var scripts=[], LArray=qx.lang.Array, elem, temp;
        for (var i=0; ret[i]; i++)
        {
          elem = ret[i];

          if (elem.nodeType == 1 && elem.tagName.toLowerCase() === "script" && (!elem.type || elem.type.toLowerCase() === "text/javascript"))
          {
            // Trying to remove the element from DOM
            if (elem.parentNode) {
              elem.parentNode.removeChild(ret[i]);
            }

            // Store in script list
            scripts.push(elem);
          }
          else
          {
            if (elem.nodeType === 1)
            {
              // Recursively search for scripts and append them to the list of elements to process
              temp = LArray.fromCollection(elem.getElementsByTagName("script"));
              ret.splice.apply(ret, [i+1, 0].concat(temp));
            }

            // Finally append element to fragment
            fragment.appendChild(elem);
          }
        }

        return scripts;
      }

      // Otherwise return the array of all elements
      return ret;
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

************************************************************************ */

/**
 * EXPERIMENTAL - NOT READY FOR PRODUCTION
 *
 * Loading of local or remote scripts.
 *
 * * Supports cross-domain communication
 * * Automatically "embeds" script so when the loaded event occurs the new features are usable as well
 */
qx.Bootstrap.define("qx.io.ScriptLoader",
{
  construct : function()
  {
    this.__oneventWrapped = qx.Bootstrap.bind(this.__onevent, this);
    this.__elem = document.createElement("script");
  },

  statics :
  {
    /**
     * {Number} Timeout limit in seconds that applies to browsers not supporting
     * the error handler. Default is 15 seconds. 0 means no timeout.
     */
    TIMEOUT: 15
  },

  members :
  {
    /** {Boolean} Whether the request is running */
    __running : null,

    /** {Boolean} Whether the current loader is disposed */
    __disposed : null,

    /** {Function} Callback method to execute */
    __callback : null,

    /** {Object} Context to execute the callback in */
    __context : null,

    /** {Function} This function is a wrapper for the DOM listener */
    __oneventWrapped : null,

    /** {Element} Stores the DOM element of the script tag */
    __elem : null,


    /**
     * Loads the script from the given URL. It is possible to define
     * a callback and a context in which the callback is executed.
     *
     * The callback is executed when the process is done with any
     * of these status messages: success, fail or abort.
     *
     * Note that browsers not supporting the native "error" event detect
     * network errors as soon as the timeout limit is reached.
     *
     * @param url {String} URL of the script
     * @param callback {Function} Callback to execute
     * @param context {Object?window} Context in which the function should be executed
     * @return {void}
     */
    load : function(url, callback, context)
    {
      if (this.__running) {
        throw new Error("Another request is still running!");
      }

      // Since load can be invoked more than one time on the same instance,
      // reset internal status
      this.__running = true;
      this.__disposed = false;

      // Place script element into head
      var head = document.getElementsByTagName("head")[0];

      // Create script element
      var script = this.__elem;

      // Store user data
      this.__callback = callback || null;
      this.__context = context || window;

      // Define mimetype
      script.type = "text/javascript";

      // Attach handlers for all browsers
      script.onerror = script.onload = script.onreadystatechange = this.__oneventWrapped;

      // BUGFIX: Browsers not supporting error handler
      //
      // Note: Because of another browser bug (fires load even though a
      // network error occured), it is virtually useless to work-around
      // for IE < 8. Therefore, only work around for Opera.
      var self = this;
      // no dependency to Environemnt to keep the minimal boot package [BUG #5068]
      if (qx.bom.client.Engine.getName() === "opera" && this._getTimeout() > 0) {
        // No need to clear timeout since on success the callback is called
        // and the loader disposed, meaning the callback is called only once
        setTimeout(function() {
          self.dispose("fail");
        }, this._getTimeout() * 1000);
      }

      // Setup URL
      script.src = url;

      // Finally append child
      // This will execute the script content
      setTimeout(function() {
        // This has to be wrapped in a timeout because under some circumstances
        // the script is evaluated synchronously. (e.g. in IE8 if the script is cached)
        head.appendChild(script);
      }, 0);
    },


    /**
     * Aborts a currently running process.
     *
     * @return {void}
     */
    abort : function()
    {
      if (this.__running) {
        this.dispose("abort");
      }
    },


    /**
     * Internal cleanup method used after every successful
     * or failed loading attempt.
     *
     * @param status {String} Any of success, fail or abort.
     * @return {void}
     */
    dispose : function(status)
    {
      if (this.__disposed) {
        return;
      }
      this.__disposed = true;

      // Get script
      var script = this.__elem;

      // Clear out listeners
      script.onerror = script.onload = script.onreadystatechange = null;

      // Remove script from head
      var scriptParent = script.parentNode;
      if (scriptParent) {
        scriptParent.removeChild(script);
      }

      // Free object
      delete this.__running;

      // Execute user callback
      if (this.__callback)
      {
        // Important to use engine detection directly to keep the minimal
        // package size small [BUG #5068]
        var engineName = qx.bom.client.Engine.getName();
        if (engineName == "mshtml" || engineName == "webkit") {
          // Safari fails with an "maximum recursion depth exceeded" error if
          // many files are loaded

          // IE may call the callback before the content is evaluated if the
          // script is served directly from the browser cache

          var self = this;
          setTimeout(qx.event.GlobalError.observeMethod(function()
          {
            self.__callback.call(self.__context, status);
            delete self.__callback;
          }), 0);
        }
        else
        {
          this.__callback.call(this.__context, status);
          delete this.__callback;
        }
      }
    },


    /**
     * Override to customize timeout limit.
     *
     * Note: Only affects browsers not supporting the error handler (Opera).
     *
     * @return {Number} Timeout limit in seconds
     */
    _getTimeout: function() {
      return qx.io.ScriptLoader.TIMEOUT;
    },


    /**
     * Internal event listener for load and error events.
     *
     * @signature function(e)
     * @param e {Event} Native event object
     */
    __onevent : qx.event.GlobalError.observeMethod(function(e) {
      // Important to use engine detection directly to keep the minimal
      // package size small [BUG #5068]
      var engineName = qx.bom.client.Engine.getName();

      // IE only
      if (engineName == "mshtml") {
        var state = this.__elem.readyState;

        if (state == "loaded") {
          this.dispose("success");
        } else if (state == "complete") {
         this.dispose("success");
        } else {
          return;
        }

      // opera only
      } else if (engineName == "opera") {
        if (qx.Bootstrap.isString(e) || e.type === "error") {
          return this.dispose("fail");
        } else if (e.type === "load") {
          return this.dispose("success");
        } else {
          return;
        }

      /// all other browsers
      } else {
        if (qx.Bootstrap.isString(e) || e.type === "error") {
          this.dispose("fail");
        } else if (e.type === "load") {
          this.dispose("success");
        } else if (e.type === "readystatechange" && (e.target.readyState === "complete" || e.target.readyState === "loaded")) {
          this.dispose("success");
        } else {
          return;
        }
      }
    })
  }
});
