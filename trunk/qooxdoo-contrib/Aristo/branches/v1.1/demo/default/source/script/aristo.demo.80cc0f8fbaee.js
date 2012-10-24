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
 * Form interface for all form widgets which have boolean as their primary
 * data type like a colorchooser.
 */
qx.Interface.define("qx.ui.form.IColorForm",
{
  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events :
  {
    /** Fired when the value was modified */
    "changeValue" : "qx.event.type.Data"
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
      VALUE PROPERTY
    ---------------------------------------------------------------------------
    */

    /**
     * Sets the element's value.
     *
     * @param value {Color|null} The new value of the element.
     */
    setValue : function(value) {
      return arguments.length == 1;
    },


    /**
     * Resets the element's value to its initial value.
     */
    resetValue : function() {},


    /**
     * The element's user set value.
     *
     * @return {Color|null} The value.
     */
    getValue : function() {}
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


************************************************************************ */

/**
 * A popup which contains palettes of colors and the possibility to open the
 * Colorselector to choose a color.
 *
 * @childControl field {qx.ui.core.Widget} shows preset colors
 * @childControl auto-button {qx.ui.form.Button} automatic button
 * @childControl selector-button {qx.ui.form.Button} button to open the color selector
 * @childControl preview-pane {qx.ui.groupbox.GroupBox} group box to show the old and the new color
 * @childControl selected-preview {qx.ui.container.Composite} show the selected color
 * @childControl current-preview {qx.ui.container.Composite} show the current color
 * @childControl colorselector-okbutton {qx.ui.form.Button} button of the colorselector
 * @childControl colorselector-cancelbutton {qx.ui.form.Button} button of the colorselector
 */
qx.Class.define("qx.ui.control.ColorPopup",
{
  extend : qx.ui.popup.Popup,
  implement : [qx.ui.form.IColorForm],

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    this.setLayout(new qx.ui.layout.VBox(5));

    this._createChildControl("auto-button");
    this._createBoxes();
    this._createChildControl("preview-pane");
    this._createChildControl("selector-button");

    this.addListener("changeVisibility", this._onChangeVisibility, this);
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
      init : "colorpopup"
    },

    /** The hex value of the selected color. */
    value :
    {
      nullable : true,
      apply : "_applyValue",
      event : "changeValue"
    },

    /** The numeric red value of the selected color. */
    red :
    {
      check : "Number",
      init : null,
      nullable : true,
      event : "changeRed"
    },

    /** The numeric green value of the selected color. */
    green :
    {
      check : "Number",
      init : null,
      nullable : true,
      event : "changeGreen"
    },

    /** The numeric blue value of the selected color. */
    blue :
    {
      check : "Number",
      init : null,
      nullable : true,
      event : "changeBlue"
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __minZIndex : 1e5,
    __boxes : null,
    __colorSelectorWindow : null,
    __colorSelector : null,
    __recentTableId : "recent",
    __fieldNumber : 12,


    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        case "field":
          control = new qx.ui.core.Widget;
          control.addListener("mousedown", this._onFieldMouseDown, this);
          control.addListener("mouseover", this._onFieldMouseOver, this);
          control.addListener("mouseout", this._onFieldMouseOut, this);
          break;

        case "auto-button":
          control = new qx.ui.form.Button(this.tr("Automatic"));
          control.setAllowStretchX(true);
          control.addListener("execute", this._onAutomaticBtnExecute, this);

          this.add(control);
          break;

        case "selector-button":
          control = new qx.ui.form.Button(this.tr("Open ColorSelector"));
          control.addListener("execute", this._onSelectorButtonExecute, this);

          this.add(control);
          break;

        case "preview-pane":
          control = new qx.ui.groupbox.GroupBox(this.tr("Preview (Old/New)"));
          control.setLayout(new qx.ui.layout.HBox);

          control.add(this._createChildControl("selected-preview", true), {flex : 1});
          control.add(this._createChildControl("current-preview", true), {flex : 1});

          this.add(control);
          break;

        case "selected-preview":
          control = new qx.ui.container.Composite(new qx.ui.layout.Basic);
          break;

        case "current-preview":
          control = new qx.ui.container.Composite(new qx.ui.layout.Basic);
          break;

        case "colorselector-okbutton":
          control = new qx.ui.form.Button(this.tr("OK"));
          control.addListener("execute", this._onColorSelectorOk, this);
          break;

        case "colorselector-cancelbutton":
          control = new qx.ui.form.Button(this.tr("Cancel"));
          control.addListener("execute", this._onColorSelectorCancel, this);
          break;
      }

      return control || this.base(arguments, id);
    },




    /*
    ---------------------------------------------------------------------------
      CREATOR SUBS
    ---------------------------------------------------------------------------
    */

    /**
     * Creates the GroupBoxes containing the colored fields.
     */
    _createBoxes : function()
    {
      this.__boxes = {};

      var tables = this._tables;
      var table, box, field;
      var j=0;

      for (var tableId in tables)
      {
        table = tables[tableId];

        box = new qx.ui.groupbox.GroupBox(table.label);
        box.setLayout(new qx.ui.layout.HBox);

        this.__boxes[tableId] = box;
        this.add(box);

        for (var i=0; i<this.__fieldNumber; i++)
        {
          field = this.getChildControl("field#" + (j++));
          field.setBackgroundColor(table.values[i] || null);
          box.add(field);
        }
      }
    },


    /**
     * Creates the ColorSelector and adds buttons.
     */
    _createColorSelector : function()
    {
      if (this.__colorSelector) {
        return;
      }

      var win = new qx.ui.window.Window(this.tr("Color Selector"));
      this.__colorSelectorWindow = win;
      win.setLayout(new qx.ui.layout.VBox(16));
      win.setResizable(false);
      win.moveTo(20, 20);

      this.__colorSelector = new qx.ui.control.ColorSelector;
      win.add(this.__colorSelector);

      var buttonBar = new qx.ui.container.Composite(new qx.ui.layout.HBox(8, "right"));
      win.add(buttonBar);

      var btnCancel = this._createChildControl("colorselector-cancelbutton");
      var btnOk = this._createChildControl("colorselector-okbutton");

      buttonBar.add(btnCancel);
      buttonBar.add(btnOk);
    },





    /*
    ---------------------------------------------------------------------------
      APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    // Property apply
    _applyValue : function(value, old)
    {
      if (value === null)
      {
        this.setRed(null);
        this.setGreen(null);
        this.setBlue(null);
      }
      else
      {
        var rgb = qx.util.ColorUtil.stringToRgb(value);
        this.setRed(rgb[0]);
        this.setGreen(rgb[1]);
        this.setBlue(rgb[2]);
      }

      this.getChildControl("selected-preview").setBackgroundColor(value);
      this._rotatePreviousColors();
    },


    /**
     * Adds the most recent selected color to the "Recent colors" list.
     * If this list is full, the first color will be removed before inserting
     * the new one.
     */
    _rotatePreviousColors : function()
    {
      if(!this._tables){
        return;
      }

      var vRecentTable = this._tables[this.__recentTableId].values;
      var vRecentBox = this.__boxes[this.__recentTableId];

      if (!vRecentTable) {
        return;
      }

      var newValue = this.getValue();

      if (!newValue) {
        return;
      }

      // Modifying incoming table
      var vIndex = vRecentTable.indexOf(newValue);

      if (vIndex != -1) {
        qx.lang.Array.removeAt(vRecentTable, vIndex);
      } else if (vRecentTable.length == this.__fieldNumber) {
        vRecentTable.shift();
      }

      vRecentTable.push(newValue);

      // Sync to visible fields
      var vFields = vRecentBox.getChildren();

      for (var i=0; i<vFields.length; i++) {
        vFields[i].setBackgroundColor(vRecentTable[i] || null);
      }
    },



    /*
    ---------------------------------------------------------------------------
      EVENT HANDLER
    ---------------------------------------------------------------------------
    */

    /**
     * Listener of mousedown event on a color field. Sets the ColorPoup's value
     * to field's color value and paint the preview pane.
     *
     * @param e {qx.event.type.Mouse} Incoming event object
     */
    _onFieldMouseDown : function(e)
    {
      var vValue = this.getChildControl("current-preview").getBackgroundColor();
      this.setValue(vValue);

      if (vValue) {
        this.hide();
      }
    },


    /**
     * Listener of mousemove event on a color field. Sets preview pane's
     * background color to the field's color value.
     *
     * @param e {qx.event.type.Mouse} Incoming event object
     */
    _onFieldMouseOver : function(e) {
      this.getChildControl("current-preview").setBackgroundColor(e.getTarget().getBackgroundColor());
    },

    /**
     * Listener of mouseout event on a color field. Reset the preview pane's
     * background color to the old color value.
     *
     * @param e {qx.event.type.Mouse} Incoming event object
     */
    _onFieldMouseOut : function(e) {
      var red = this.getRed();
      var green = this.getGreen();
      var blue = this.getBlue();
      var color = null;

      if (red !== null || green !== null || blue !== null) {
        var color = qx.util.ColorUtil.rgbToRgbString([red, green, blue]);
      }

      this.getChildControl("current-preview").setBackgroundColor(color);
    },

    /**
     * Listener of execute event on the "cancel" button.
     * Hides the ColorPopup and resets it's color value.
     */
    _onAutomaticBtnExecute : function()
    {
      this.setValue(null);
      this.hide();
    },


    /**
     * Listener of execute event on the "Open ColorSelector" button.
     * Opens a ColorSelector widget and hides the ColorPopup.
     */
    _onSelectorButtonExecute : function()
    {
      this._createColorSelector();

      this.exclude();

      var red = this.getRed();
      var green = this.getGreen();
      var blue = this.getBlue();

      if (red === null || green === null || blue === null)
      {
        red = 255;
        green = 255;
        blue = 255;
      }

      this.__colorSelector.setRed(red);
      this.__colorSelector.setGreen(green);
      this.__colorSelector.setBlue(blue);

      this.__colorSelectorWindow.open();
    },


    /**
     * Listener of execute event on the "OK" button.
     * Hides the ColorPopup and sets it's color value to the selected color.
     */
    _onColorSelectorOk : function()
    {
      var sel = this.__colorSelector;
      this.setValue(qx.util.ColorUtil.rgbToRgbString([sel.getRed(), sel.getGreen(), sel.getBlue()]));
      this.__colorSelectorWindow.close();
    },


    /**
     * Listener of execute event on the "Cancel" button.
     * Hides the ColorPopup.
     */
    _onColorSelectorCancel : function() {
      this.__colorSelectorWindow.close();
    },

    /**
     * Listener for visibility changes.
     * Sets preview pane's background color to the current color,
     * when the popup is visible.
     *
     * @param e {qx.event.type.Data} Incoming event object
     */
    _onChangeVisibility : function(e) {
      if (this.getVisibility() == "visible")
      {
        var red = this.getRed();
        var green = this.getGreen();
        var blue = this.getBlue();
        var color = null;

        if (red !== null || green !== null || blue !== null) {
          var color = qx.util.ColorUtil.rgbToRgbString([red, green, blue]);
        }

        this.getChildControl("selected-preview").setBackgroundColor(color);
        this.getChildControl("current-preview").setBackgroundColor(color);
      }
    },

    /**
     * @lint ignoreReferenceField(_tables)
     */
    _tables :
    {
      core :
      {
        label : "Basic Colors",
        values : [ "#000", "#333", "#666", "#999", "#CCC", "#FFF", "red", "green", "blue", "yellow", "teal", "maroon" ]
      },

      recent :
      {
        label : "Recent Colors",
        values : [ ]
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
    this._disposeObjects("__colorSelectorWindow", "__colorSelector");
    this._tables = this.__boxes = null;
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
 * A basic layout, which supports positioning of child widgets by absolute
 * left/top coordinates. This layout is very simple but should also
 * perform best.
 *
 * *Features*
 *
 * * Basic positioning using <code>left</code> and <code>top</code> properties
 * * Respects minimum and maximum dimensions without skrinking/growing
 * * Margins for top and left side (including negative ones)
 * * Respects right and bottom margins in the size hint
 * * Auto-sizing
 *
 * *Item Properties*
 *
 * <ul>
 * <li><strong>left</strong> <em>(Integer)</em>: The left coordinate in pixel</li>
 * <li><strong>top</strong> <em>(Integer)</em>: The top coordinate in pixel</li>
 * </ul>
 *
 * *Details*
 *
 * The default location of any widget is zero for both
 * <code>left</code> and <code>top</code>.
 *
 * *Example*
 *
 * Here is a little example of how to use the basic layout.
 *
 * <pre class="javascript">
 * var container = new qx.ui.container.Composite(new qx.ui.layout.Basic());
 *
 * // simple positioning
 * container.add(new qx.ui.core.Widget(), {left: 10, top: 10});
 * container.add(new qx.ui.core.Widget(), {left: 100, top: 50});
 * </pre>
 *
 * *External Documentation*
 *
 * <a href='http://manual.qooxdoo.org/${qxversion}/pages/layout/basic.html'>
 * Extended documentation</a> and links to demos of this layout in the qooxdoo manual.
 */
qx.Class.define("qx.ui.layout.Basic",
{
  extend : qx.ui.layout.Abstract,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      LAYOUT INTERFACE
    ---------------------------------------------------------------------------
    */

    // overridden
    verifyLayoutProperty : qx.core.Environment.select("qx.debug",
    {
      "true" : function(item, name, value)
      {
        this.assert(name == "left" || name == "top", "The property '"+name+"' is not supported by the Basic layout!");
        this.assertInteger(value);
      },

      "false" : null
    }),


    // overridden
    renderLayout : function(availWidth, availHeight)
    {
      var children = this._getLayoutChildren();
      var child, size, props, left, top;

      // Render children
      for (var i=0, l=children.length; i<l; i++)
      {
        child = children[i];
        size = child.getSizeHint();
        props = child.getLayoutProperties();

        left = (props.left || 0) + child.getMarginLeft();
        top = (props.top || 0) + child.getMarginTop();

        child.renderLayout(left, top, size.width, size.height);
      }
    },


    // overridden
    _computeSizeHint : function()
    {
      var children = this._getLayoutChildren();
      var child, size, props;
      var neededWidth=0, neededHeight=0;
      var localWidth, localHeight;


      // Iterate over children
      for (var i=0, l=children.length; i<l; i++)
      {
        child = children[i];
        size = child.getSizeHint();
        props = child.getLayoutProperties();

        localWidth = size.width + (props.left || 0) + child.getMarginLeft() + child.getMarginRight();
        localHeight = size.height + (props.top || 0) + child.getMarginTop() + child.getMarginBottom();

        if (localWidth > neededWidth) {
          neededWidth = localWidth;
        }

        if (localHeight > neededHeight) {
          neededHeight = localHeight;
        }
      }


      // Return hint
      return {
        width : neededWidth,
        height : neededHeight
      };
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
     * Matthew Gregory

************************************************************************ */

/**
 * A typical color selector as known from native applications.
 *
 * Includes support for RGB and HSB color areas.
 *
 * @childControl control-bar {qx.ui.container.Composite} container which holds the control-pane and visual-pane
 * @childControl visual-pane {qx.ui.groupbox.GroupBox} pane shows the hue-saturation-pane and the brightness-pane
 * @childControl hue-saturation-pane {qx.ui.container.Composite} shows the hue saturation and the handle to select
 * @childControl hue-saturation-field {qx.ui.basic.Image} hue saturation image which shows all available colors
 * @childControl hue-saturation-handle {qx.ui.basic.Image} handle to select the color using the mouse
 * @childControl brightness-pane {qx.ui.container.Composite} shows the brightness field and the handle to select
 * @childControl brightness-field {qx.ui.basic.Image} brightness image which shows all brightness steps
 * @childControl brightness-handle {qx.ui.basic.Image} brightness handle to select the brightness using the mouse
 * @childControl preset-field-set {qx.ui.groupbox.GroupBox} groupbox holding all preset colors
 * @childControl colorbucket {qx.ui.core.Widget} color bucket
 * @childControl preset-grid {qx.ui.container.Composite} container for all color presets
 * @childControl input-field-set {qx.ui.groupbox.GroupBox} groupbox holding different input elements
 * @childControl preview-field-set {qx.ui.groupbox.GroupBox} groupbox holding the two preview fields
 * @childControl hex-field-composite {qx.ui.container.Composite} container for the hex field
 * @childControl hex-field {qx.ui.form.TextField} textfield to input a hex value
 * @childControl rgb-spinner-composite {qx.ui.container.Composite} container for the rgb spinner
 * @childControl rgb-spinner-red {qx.ui.form.Spinner} spinner control for the red hex value
 * @childControl rgb-spinner-green {qx.ui.form.Spinner} spinner control for the green hex value
 * @childControl rgb-spinner-blue {qx.ui.form.Spinner} spinner control for the blue hex value
 * @childControl hsb-spinner-composite {qx.ui.container.Composite} container for the hsb spinners
 * @childControl hsb-spinner-hue {qx.ui.form.Spinner} spinner control for the huevalue
 * @childControl hsb-spinner-saturation {qx.ui.form.Spinner} spinner control for the saturation value
 * @childControl hsb-spinner-brightness {qx.ui.form.Spinner} spinner control for the brightness value
 * @childControl preview-content-old {qx.ui.core.Widget} preview of the old color
 * @childControl preview-content-new {qx.ui.core.Widget} preview of the new color
 */
qx.Class.define("qx.ui.control.ColorSelector",
{
  extend : qx.ui.core.Widget,
  implement : [qx.ui.form.IColorForm],




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Creates a ColorSelector.
   */
  construct : function()
  {
    this.base(arguments);

    // add the basic layout
    this._setLayout(new qx.ui.layout.VBox());

    this._createChildControl("control-bar");

    this.addListener("appear", this._onAppear, this);
  },




  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events:
  {
    /** Fired when the "OK" button is clicked. */
    "dialogok"     : "qx.event.type.Event",

    /** Fired when the "Cancel" button is clicked. */
    "dialogcancel" : "qx.event.type.Event",

    /** Fired when the value changes */
    "changeValue" : "qx.event.type.Data"
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
      init : "colorselector"
    },

    /** The numeric red value of the selected color. */
    red :
    {
      check : "Integer",
      init : 255,
      apply : "_applyRed"
    },

    /** The numeric green value of the selected color. */
    green :
    {
      check : "Integer",
      init : 255,
      apply : "_applyGreen"
    },

    /** The numeric blue value of the selected color. */
    blue :
    {
      check : "Integer",
      init :  255,
      apply : "_applyBlue"
    },

    /** The numeric hue value. */
    hue :
    {
      check : "Number",
      init : 0,
      apply : "_applyHue"
    },

    /** The numeric saturation value. */
    saturation :
    {
      check : "Number",
      init : 0,
      apply : "_applySaturation"
    },

    /** The numeric brightness value. */
    brightness :
    {
      check : "Number",
      init : 100,
      apply : "_applyBrightness"
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
      CONTEXT HANDLING
    ---------------------------------------------------------------------------
    */

    /**
     * {String} The context in which an update has occurred.
     */
    __updateContext : null,

    /**
     * {Array} Map containing the preset colors.
     * @lint ignoreReferenceField(__presetTable)
     */
    __presetTable : [ "maroon", "red", "orange", "yellow", "olive", "purple",
      "fuchsia", "lime", "green", "navy", "blue", "aqua", "teal", "black",
      "#333", "#666", "#999", "#BBB", "#EEE", "white" ],

    /**
     * {String} Name of child control which is captured.
     */
    __capture : "",

    /**
     * {Number} Numeric brightness value
     */
    __brightnessSubtract : 0,

    /**
     * {Integer} HueSaturation's X coordinate
     */
    __hueSaturationSubtractTop : 0,

    /**
     * {Integer} HueSaturation's Y coordinate
     */
    __hueSaturationSubtractLeft : 0,

    // internal boolean flag to signal, that the value is set to null
    __nullValue : true,

    // internal mutex to prevent the changeValue event to be fired too often
    __preventChangeValueEvent : false,


    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        /*
        ---------------------------------------------------------------------------
          CREATE #1: BASE STRUCTURE
        ---------------------------------------------------------------------------
        */
        case "control-bar":
          control = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));

          control.add(this.getChildControl("control-pane"));
          control.add(this.getChildControl("visual-pane"));

          this._add(control);
          break;

        /*
        ---------------------------------------------------------------------------
          CREATE #2: PANES
        ---------------------------------------------------------------------------
        */

        case "visual-pane":
          control = new qx.ui.groupbox.GroupBox(this.tr("Visual"));
          control.setLayout(new qx.ui.layout.HBox(10));
          control.add(this.getChildControl("hue-saturation-pane"));
          control.add(this.getChildControl("brightness-pane"));
          break;

        case "control-pane":
          control = new qx.ui.container.Composite(new qx.ui.layout.VBox(12));
          control.add(this.getChildControl("preset-field-set"));
          control.add(this.getChildControl("input-field-set"));
          control.add(this.getChildControl("preview-field-set"), {flex: 1});
          break;

        case "hue-saturation-pane":
          control = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
          control.setAllowGrowY(false);
          control.addListener("mousewheel", this._onHueSaturationPaneMouseWheel, this);
          control.add(this.getChildControl("hue-saturation-field"));
          control.add(this.getChildControl("hue-saturation-handle"), {left: 0, top: 256});
          break;

        case "hue-saturation-field":
          control = new qx.ui.basic.Image("decoration/colorselector/huesaturation-field.jpg");
          control.addListener("mousedown", this._onHueSaturationFieldMouseDown, this);
          break;

        case "hue-saturation-handle":
          control = new qx.ui.basic.Image("decoration/colorselector/huesaturation-handle.gif");
          control.addListener("mousedown", this._onHueSaturationFieldMouseDown, this);
          control.addListener("mouseup", this._onHueSaturationHandleMouseUp, this);
          control.addListener("mousemove", this._onHueSaturationHandleMouseMove, this);
          break;

        case "brightness-pane":
          control = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
          control.setAllowGrowY(false);
          control.addListener("mousewheel", this._onBrightnessPaneMouseWheel, this);
          control.add(this.getChildControl("brightness-field"));
          control.add(this.getChildControl("brightness-handle"));
          break;

        case "brightness-field":
          control = new qx.ui.basic.Image("decoration/colorselector/brightness-field.png");
          control.addListener("mousedown", this._onBrightnessFieldMouseDown, this);
          break;

        case "brightness-handle":
          control = new qx.ui.basic.Image("decoration/colorselector/brightness-handle.gif");
          control.addListener("mousedown", this._onBrightnessHandleMouseDown, this);
          control.addListener("mouseup", this._onBrightnessHandleMouseUp, this);
          control.addListener("mousemove", this._onBrightnessHandleMouseMove, this);
          break;


        /*
        ---------------------------------------------------------------------------
          CREATE #3: CONTROL PANE CONTENT
        ---------------------------------------------------------------------------
        */
        case "preset-field-set":
          control = new qx.ui.groupbox.GroupBox(this.tr("Presets"));
          control.setLayout(new qx.ui.layout.Grow());
          control.add(this.getChildControl("preset-grid"));
          break;

        case "colorbucket":
          control = new qx.ui.core.Widget();
          control.addListener("mousedown", this._onColorFieldClick, this);
          break;

        case "preset-grid":
          controlLayout = new qx.ui.layout.Grid(3, 3);
          control = new qx.ui.container.Composite(controlLayout);

          var colorField;
          var colorPos;

          for (var i=0; i<2; i++)
          {
            for (var j=0; j<10; j++)
            {
              colorPos = i * 10 + j;
              colorField = this.getChildControl("colorbucket#" + colorPos);
              colorField.setBackgroundColor(this.__presetTable[colorPos]);

              control.add(colorField, {column: j, row: i});
            }
          }
          break;

        case "input-field-set":
          control = new qx.ui.groupbox.GroupBox(this.tr("Details"));
          var controlLayout = new qx.ui.layout.VBox();
          controlLayout.setSpacing(10);
          control.setLayout(controlLayout);

          control.add(this.getChildControl("hex-field-composite"));
          control.add(this.getChildControl("rgb-spinner-composite"));
          control.add(this.getChildControl("hsb-spinner-composite"));
          break;

        case "preview-field-set":
          control = new qx.ui.groupbox.GroupBox(this.tr("Preview (Old/New)"));
          var controlLayout = new qx.ui.layout.HBox(10);
          control.setLayout(controlLayout);

          control.add(this.getChildControl("preview-content-old"), {flex: 1});
          control.add(this.getChildControl("preview-content-new"), {flex: 1});
          break;

        /*
        ---------------------------------------------------------------------------
          CREATE #4: INPUT FIELDSET CONTENT
        ---------------------------------------------------------------------------
        */
        case "hex-field-composite":
          var layout = new qx.ui.layout.HBox(4);
          layout.setAlignY("middle");
          control = new qx.ui.container.Composite(layout);

          var hexLabel = new qx.ui.basic.Label(this.tr("Hex"));
          hexLabel.setWidth(30);
          control.add(hexLabel);

          var hexHelper = new qx.ui.basic.Label("#");
          control.add(hexHelper);

          control.add(this.getChildControl("hex-field"));
          break;

        case "hex-field":
          control = new qx.ui.form.TextField("FFFFFF");
          control.setMaxLength(6);
          control.setFilter(/[0-9A-Fa-f]/);
          control.setWidth(55);
          control.addListener("changeValue", this._onHexFieldChange, this);
          break;

        case "rgb-spinner-composite":
          var layout = new qx.ui.layout.HBox(4);
          layout.setAlignY("middle");
          control = new qx.ui.container.Composite(layout);

          var rgbSpinLabel = new qx.ui.basic.Label(this.tr("RGB"));
          rgbSpinLabel.setWidth(30);
          control.add(rgbSpinLabel);

          control.add(this.getChildControl("rgb-spinner-red"));
          control.add(this.getChildControl("rgb-spinner-green"));
          control.add(this.getChildControl("rgb-spinner-blue"));
          break;

        case "rgb-spinner-red":
          control = new qx.ui.form.Spinner(0, 255, 255);
          control.setWidth(50);
          control.addListener("changeValue", this._setRedFromSpinner, this);
          break;

        case "rgb-spinner-green":
          control = new qx.ui.form.Spinner(0, 255, 255);
          control.setWidth(50);
          control.addListener("changeValue", this._setGreenFromSpinner, this);
          break;

        case "rgb-spinner-blue":
          control = new qx.ui.form.Spinner(0, 255, 255);
          control.setWidth(50);
          control.addListener("changeValue", this._setBlueFromSpinner, this);
          break;

        case "hsb-spinner-composite":
          var layout = new qx.ui.layout.HBox(4);
          layout.setAlignY("middle");
          control = new qx.ui.container.Composite(layout);

          var hsbSpinLabel = new qx.ui.basic.Label(this.tr("HSB"));
          hsbSpinLabel.setWidth(30);
          control.add(hsbSpinLabel);

          control.add(this.getChildControl("hsb-spinner-hue"));
          control.add(this.getChildControl("hsb-spinner-saturation"));
          control.add(this.getChildControl("hsb-spinner-brightness"));
          break;

        case "hsb-spinner-hue":
          control = new qx.ui.form.Spinner(0, 0, 360);
          control.setWidth(50);
          control.addListener("changeValue", this._setHueFromSpinner, this);
          break;

        case "hsb-spinner-saturation":
          control = new qx.ui.form.Spinner(0, 0, 100);
          control.setWidth(50);
          control.addListener("changeValue", this._setSaturationFromSpinner, this);
          break;

        case "hsb-spinner-brightness":
          control = new qx.ui.form.Spinner(0, 100, 100);
          control.setWidth(50);
          control.addListener("changeValue", this._setBrightnessFromSpinner, this);
          break;


        /*
        ---------------------------------------------------------------------------
          CREATE #5: PREVIEW CONTENT
        ---------------------------------------------------------------------------
        */
        case "preview-content-old":
          control = new qx.ui.core.Widget();
          break;

        case "preview-content-new":
          control = new qx.ui.core.Widget();
          break;
      }

      return control || this.base(arguments, id);
    },


    /**
     * The value of the ColorSelector is a string containing the HEX value of
     * the currently selected color. Take a look at
     * {@link qx.util.ColorUtil#stringToRgb} to see what kind of input the
     * method can handle.
     *
     * @param value {String} The value of a color.
     */
    setValue: function(value)
    {
      var rgb;

      if (value == null)
      {
        this.__nullValue = true;
        rgb = [255, 255, 255];
      }
      else
      {
        rgb = qx.util.ColorUtil.stringToRgb(value);
        this.__nullValue = false;
      }

      // block the first tow events
      this.__preventChangeValueEvent = true;
      this.setRed(rgb[0]);
      this.setGreen(rgb[1]);
      // only allow the final change event
      this.__preventChangeValueEvent = false;
      this.setBlue(rgb[2]);
    },


    /**
     * Returns the currently selected color.
     *
     * @return {String | null} The HEX value of the color of if not color
     *   is set, null.
     */
    getValue: function()
    {
      return this.__nullValue ? null : "#" + qx.util.ColorUtil.rgbToHexString(
        [this.getRed(), this.getGreen(), this.getBlue()]
      );
    },

    /**
     * Resets the color to null.
     */
    resetValue: function()
    {
      this.__nullValue = true;
      this.__preventChangeValueEvent = true;
      this.setRed(255);
      this.setGreen(255);
      this.__preventChangeValueEvent = false;
      this.setBlue(255);
    },


    /**
     * Helper for firing the changeValue event and checking for the mutex.
     */
    __fireChangeValueEvent: function()
    {
      if (!this.__preventChangeValueEvent)
      {
        this.__nullValue = false;
        this.fireDataEvent("changeValue", this.getValue());
      }
    },


    /*
    ---------------------------------------------------------------------------
      RGB MODIFIER
    ---------------------------------------------------------------------------
    */


    // property apply
    _applyRed : function(value, old)
    {
      if (this.__updateContext === null) {
        this.__updateContext = "redModifier";
      }

      if (this.__updateContext !== "rgbSpinner") {
        this.getChildControl("rgb-spinner-red").setValue(value);
      }

      if (this.__updateContext !== "hexField") {
        this._setHexFromRgb();
      }

      switch(this.__updateContext)
      {
        case "rgbSpinner":
        case "hexField":
        case "redModifier":
          this._setHueFromRgb();
      }

      this._setPreviewFromRgb();
      this.__fireChangeValueEvent();

      if (this.__updateContext === "redModifier") {
        this.__updateContext = null;
      }
    },


    // property apply
    _applyGreen : function(value, old)
    {
      if (this.__updateContext === null) {
        this.__updateContext = "greenModifier";
      }

      if (this.__updateContext !== "rgbSpinner") {
        this.getChildControl("rgb-spinner-green").setValue(value);
      }

      if (this.__updateContext !== "hexField") {
        this._setHexFromRgb();
      }

      switch(this.__updateContext)
      {
        case "rgbSpinner":
        case "hexField":
        case "greenModifier":
          this._setHueFromRgb();
      }

      this._setPreviewFromRgb();
      this.__fireChangeValueEvent();

      if (this.__updateContext === "greenModifier") {
        this.__updateContext = null;
      }
    },


    // property apply
    _applyBlue : function(value, old)
    {
      if (this.__updateContext === null) {
        this.__updateContext = "blueModifier";
      }

      if (this.__updateContext !== "rgbSpinner") {
        this.getChildControl("rgb-spinner-blue").setValue(value);
      }

      if (this.__updateContext !== "hexField") {
        this._setHexFromRgb();
      }

      switch(this.__updateContext)
      {
        case "rgbSpinner":
        case "hexField":
        case "blueModifier":
          this._setHueFromRgb();
      }

      this._setPreviewFromRgb();
      this.__fireChangeValueEvent();

      if (this.__updateContext === "blueModifier") {
        this.__updateContext = null;
      }
    },




    /*
    ---------------------------------------------------------------------------
      HSB MODIFIER
    ---------------------------------------------------------------------------
    */

    // property apply
    _applyHue : function(value, old)
    {
      if (this.__updateContext === null) {
        this.__updateContext = "hueModifier";
      }

      if (this.__updateContext !== "hsbSpinner") {
        this.getChildControl("hsb-spinner-hue").setValue(value);
      }

      if (this.__updateContext !== "hueSaturationField")
      {
        if (this.getChildControl("hue-saturation-handle").getBounds()) {
          this.getChildControl("hue-saturation-handle").setDomLeft(Math.round(value / 1.40625) + this.getChildControl("hue-saturation-pane").getPaddingLeft());
        } else {
          this.getChildControl("hue-saturation-handle").setLayoutProperties({ left : Math.round(value / 1.40625) });
        }
      }

      switch(this.__updateContext)
      {
        case "hsbSpinner":
        case "hueSaturationField":
        case "hueModifier":
          this._setRgbFromHue();
      }
      this._setBrightnessGradiant();
      if (this.__updateContext === "hueModifier") {
        this.__updateContext = null;
      }
    },


    // property apply
    _applySaturation : function(value, old)
    {
      if (this.__updateContext === null) {
        this.__updateContext = "saturationModifier";
      }

      if (this.__updateContext !== "hsbSpinner") {
        this.getChildControl("hsb-spinner-saturation").setValue(value);
      }

      if (this.__updateContext !== "hueSaturationField")
      {
        this._setBrightnessGradiant();
        if (this.getChildControl("hue-saturation-handle").getBounds()) {
          this.getChildControl("hue-saturation-handle").setDomTop(256 - Math.round(value * 2.56) + this.getChildControl("hue-saturation-pane").getPaddingTop());
        } else {
          this.getChildControl("hue-saturation-handle").setLayoutProperties({ top : 256 - Math.round(value * 2.56)});
        }
      }

      switch(this.__updateContext)
      {
        case "hsbSpinner":
        case "hueSaturationField":
        case "saturationModifier":
          this._setRgbFromHue();
      }

      if (this.__updateContext === "saturationModifier") {
        this.__updateContext = null;
      }
    },


    // property apply
    _applyBrightness : function(value, old)
    {
      if (this.__updateContext === null) {
        this.__updateContext = "brightnessModifier";
      }

      if (this.__updateContext !== "hsbSpinner") {
        this.getChildControl("hsb-spinner-brightness").setValue(value);
      }

      if (this.__updateContext !== "brightnessField")
      {
        var topValue = 256 - Math.round(value * 2.56);

        if (this.getChildControl("brightness-handle").getBounds()) {
          this.getChildControl("brightness-handle").setDomTop(topValue + this.getChildControl("brightness-pane").getPaddingTop());
        } else {
          this.getChildControl("brightness-handle").setLayoutProperties({ top : topValue });
        }
      }

      switch(this.__updateContext)
      {
        case "hsbSpinner":
        case "brightnessField":
        case "brightnessModifier":
          this._setRgbFromHue();
      }

      if (this.__updateContext === "brightnessModifier") {
        this.__updateContext = null;
      }
    },




    /*
    ---------------------------------------------------------------------------
      BRIGHTNESS IMPLEMENTATION
    ---------------------------------------------------------------------------
    */

    /**
     * Listener of mousedown event on the brightness handle.
     * Adjusts the color by changing the brightness.
     *
     * @param e {qx.event.type.Mouse} Incoming event object
     */
    _onBrightnessHandleMouseDown : function(e)
    {
      // Activate Capturing
      this.getChildControl("brightness-handle").capture();
      this.__capture = "brightness-handle";

      // Calculate subtract: Position of Brightness Field - Current Mouse Offset
      var locationBrightnessField = this.getChildControl("brightness-field").getContainerLocation();
      var locationBrightnessHandle = this.getChildControl("brightness-handle").getContainerLocation();
      var fieldBounds = this.getChildControl("brightness-field").getBounds();

      this.__brightnessSubtract = locationBrightnessField.top +
        (e.getDocumentTop() - locationBrightnessHandle.top) - fieldBounds.top;

      // Block field event handling
      e.stopPropagation();
    },


    /**
     * Listener of mouseup event on the brightness handle.
     * Releases the capture.
     *
     * @param e {qx.event.type.Mouse} Incoming event object
     */
    _onBrightnessHandleMouseUp : function(e)
    {
      // Disabling capturing
      this.getChildControl("brightness-handle").releaseCapture();
      this.__capture = null;
    },


    /**
     * Listener of mousemove event on the brightness handle.
     * Forwards the event to _setBrightnessOnFieldEvent().
     *
     * @param e {qx.event.type.Mouse} Incoming event object
     */
    _onBrightnessHandleMouseMove : function(e)
    {
      // Update if captured currently (through previous mousedown)
      if (this.__capture === "brightness-handle") {
        this._setBrightnessOnFieldEvent(e);
        e.stopPropagation();
      }
    },


    /**
     * Listener of mousedown event on the brightness field.
     * Adjusts the color by changing the brightness.
     *
     * @param e {qx.event.type.Mouse} Incoming event object
     */
    _onBrightnessFieldMouseDown : function(e)
    {
      // Calculate substract: Half height of handler
      var location  = this.getChildControl("brightness-field").getContainerLocation();
      var bounds = this.getChildControl("brightness-handle").getBounds();
      this.__brightnessSubtract = location.top + (bounds.height / 2);

      // Update
      this._setBrightnessOnFieldEvent(e);

      // Afterwards: Activate Capturing for handle
      this.getChildControl("brightness-handle").capture();
      this.__capture = "brightness-handle";
    },


    /**
     * Listener of mousewheel event on the brightness pane.
     * Adjusts the color by changing the brightness.
     *
     * @param e {qx.event.type.Mouse} Incoming event object
     */
    _onBrightnessPaneMouseWheel : function(e)
    {
      this.setBrightness(qx.lang.Number.limit(this.getBrightness() - e.getWheelDelta("y"), 0, 100));
      e.stop();
    },


    /**
     * Sets the brightness and moves the brightness handle.
     *
     * @param e {qx.event.type.Mouse} Incoming event object
     */
    _setBrightnessOnFieldEvent : function(e)
    {
      var value = qx.lang.Number.limit(e.getDocumentTop() - this.__brightnessSubtract, 0, 256);

      this.__updateContext = "brightnessField";

      if (this.getChildControl("brightness-handle").getBounds()) {
        this.getChildControl("brightness-handle").setDomTop(value);
      } else {
        this.getChildControl("brightness-handle").setLayoutProperties({ top : value });
      }

      this.setBrightness(100 - Math.round(value / 2.56));

      this.__updateContext = null;
    },

    /*
    ---------------------------------------------------------------------------
      HUE/SATURATION IMPLEMENTATION
    ---------------------------------------------------------------------------
    */


    /**
     * Listener of mouseup event on the saturation handle.
     * Releases mouse capture.
     *
     * @param e {qx.event.type.Mouse} Incoming event object
     */
    _onHueSaturationHandleMouseUp : function(e)
    {
      // Disabling capturing
      if (this.__capture)
      {
        e.stopPropagation();
        this.getChildControl("hue-saturation-handle").releaseCapture();
        this.__capture = null;
      }
    },


    /**
     * Listener of mousemove event on the saturation handle.
     * Forwards the event to _onHueSaturationHandleMouseMove().
     *
     * @param e {qx.event.type.Mouse} Incoming event object
     */
    _onHueSaturationHandleMouseMove : function(e)
    {

      // Update if captured currently (through previous mousedown)
      if (this.__capture === "hue-saturation-handle")
      {
        this._setHueSaturationOnFieldEvent(e);
        e.stopPropagation();
      }
    },


    /**
     * Listener of mousedown event on the saturation field.
     * Adjusts the color by changing the saturation.
     * Sets mouse capture.
     *
     * @param e {qx.event.type.Mouse} Incoming event object
     */
    _onHueSaturationFieldMouseDown : function(e)
    {
      // Calculate substract: Half width/height of handler
      var location = this.getChildControl("hue-saturation-field").getContainerLocation();
      var handleBounds = this.getChildControl("hue-saturation-handle").getBounds();
      var fieldBounds = this.getChildControl("hue-saturation-field").getBounds();

      this.__hueSaturationSubtractTop = location.top + (handleBounds.height / 2) - fieldBounds.top;
      this.__hueSaturationSubtractLeft = location.left + (handleBounds.width / 2) - fieldBounds.left;

      // Update
      this._setHueSaturationOnFieldEvent(e);

      // Afterwards: Activate Capturing for handle
      this.getChildControl("hue-saturation-handle").capture();
      this.__capture = "hue-saturation-handle";
    },


    /**
     * Listener of mousewheel event on the saturation pane.
     * Adjusts the color by changing the saturation.
     *
     * @param e {qx.event.type.Mouse} Incoming event object
     */
    _onHueSaturationPaneMouseWheel : function(e)
    {
      this.setSaturation(qx.lang.Number.limit(this.getSaturation() - e.getWheelDelta("y"), 0, 100));
      this.setHue(qx.lang.Number.limit(this.getHue() + e.getWheelDelta("x"), 0, 360));
      e.stop();
    },


    /**
     * Sets the saturation and moves the saturation handle.
     *
     * @param e {qx.event.type.Mouse} Incoming event object
     */
    _setHueSaturationOnFieldEvent : function(e)
    {
      var vTop = qx.lang.Number.limit(e.getDocumentTop() - this.__hueSaturationSubtractTop, 0, 256);
      var vLeft = qx.lang.Number.limit(e.getDocumentLeft() - this.__hueSaturationSubtractLeft, 0, 256);

      this.getChildControl("hue-saturation-handle").setDomPosition(vLeft, vTop);

      this.__updateContext = "hueSaturationField";

      this.setSaturation(100 - Math.round(vTop / 2.56));
      this.setHue(Math.round(vLeft * 1.40625));

      this.__updateContext = null;
    },




    /*
    ---------------------------------------------------------------------------
      RGB SPINNER
    ---------------------------------------------------------------------------
    */

    /**
     * Sets widget's red value to spinner's value.
     */
    _setRedFromSpinner : function()
    {
      if (this.__updateContext !== null) {
        return;
      }

      this.__updateContext = "rgbSpinner";
      this.setRed(this.getChildControl("rgb-spinner-red").getValue());
      this.__updateContext = null;
    },


    /**
     * Sets widget's green value to spinner's value.
     */
    _setGreenFromSpinner : function()
    {
      if (this.__updateContext !== null) {
        return;
      }

      this.__updateContext = "rgbSpinner";
      this.setGreen(this.getChildControl("rgb-spinner-green").getValue());
      this.__updateContext = null;
    },


    /**
     * Sets widget's blue value to spinner's value.
     */
    _setBlueFromSpinner : function()
    {
      if (this.__updateContext !== null) {
        return;
      }

      this.__updateContext = "rgbSpinner";
      this.setBlue(this.getChildControl("rgb-spinner-blue").getValue());
      this.__updateContext = null;
    },




    /*
    ---------------------------------------------------------------------------
      HSB SPINNER
    ---------------------------------------------------------------------------
    */

    /**
     * Sets widget's hue value to spinner's value.
     */
    _setHueFromSpinner : function()
    {
      if (this.__updateContext !== null) {
        return;
      }

      this.__updateContext = "hsbSpinner";
      this.setHue(this.getChildControl("hsb-spinner-hue").getValue());
      this.__updateContext = null;
    },


    /**
     * Sets widget's saturation value to spinner's value.
     */
    _setSaturationFromSpinner : function()
    {
      if (this.__updateContext !== null) {
        return;
      }

      this.__updateContext = "hsbSpinner";
      this.setSaturation(this.getChildControl("hsb-spinner-saturation").getValue());
      this.__updateContext = null;
    },


    /**
     * Sets widget's brightness value to spinner's value.
     */
    _setBrightnessFromSpinner : function()
    {
      if (this.__updateContext !== null) {
        return;
      }

      this.__updateContext = "hsbSpinner";
      this.setBrightness(this.getChildControl("hsb-spinner-brightness").getValue());
      this.__updateContext = null;
    },




    /*
    ---------------------------------------------------------------------------
      HEX FIELD
    ---------------------------------------------------------------------------
    */

    /**
     * Changes red, green and blue value to the corresponding hexfield value.
     * @param e {qx.event.type.Data} Incoming event object
     */
    _onHexFieldChange : function(e)
    {
      if (this.__updateContext !== null) {
        return;
      }

      try
      {
        var hexField = this.getChildControl("hex-field");
        var rgb = qx.util.ColorUtil.hexStringToRgb("#" + hexField.getValue());
      } catch(ex) {
        return;
      };

      this.__updateContext = "hexField";
      this.setRed(rgb[0]);
      this.setGreen(rgb[1]);
      this.setBlue(rgb[2]);
      this.__updateContext = null;
    },


    /**
     * Sets hexfield value to it's corresponding red, green and blue value.
     */
    _setHexFromRgb : function()
    {
      var value = qx.util.ColorUtil.rgbToHexString(
        [this.getRed(),this.getGreen(),this.getBlue()]
      );
      this.getChildControl("hex-field").setValue(value);
    },




    /*
    ---------------------------------------------------------------------------
      COLOR FIELD
    ---------------------------------------------------------------------------
    */

    /**
     * Listener of click event on the color field.
     * Sets red, green and blue values to clicked color field's background color.
     *
     * @param e {qx.event.type.Mouse} Incoming event object
     */
    _onColorFieldClick : function(e)
    {
      var vColor = e.getTarget().getBackgroundColor();

      if (!vColor) {
        return this.error("Missing backgroundColor value for field: " + e.getTarget());
      }

      var rgb = qx.util.ColorUtil.stringToRgb(vColor);

      this.setRed(rgb[0]);
      this.setGreen(rgb[1]);
      this.setBlue(rgb[2]);
    },




    /*
    ---------------------------------------------------------------------------
      RGB/HSB SYNC
    ---------------------------------------------------------------------------
    */

    /**
     * Sets hue value to it's corresponding red, green and blue value.
     */
    _setHueFromRgb : function()
    {
      switch(this.__updateContext)
      {
        case "hsbSpinner":
        case "hueSaturationField":
        case "brightnessField":
          break;

        default:
          var hsb = qx.util.ColorUtil.rgbToHsb([this.getRed(), this.getGreen(), this.getBlue()]);

          this.setHue(hsb[0]);
          this.setSaturation(hsb[1]);
          this.setBrightness(hsb[2]);
      }
    },


    /**
     * Sets red, green and blue value to corresponding hue value.
     */
    _setRgbFromHue : function()
    {
      switch(this.__updateContext)
      {
        case "rgbSpinner":
        case "hexField":
          break;

        default:
          var vRgb = qx.util.ColorUtil.hsbToRgb([this.getHue(), this.getSaturation(), this.getBrightness()]);

          this.setRed(vRgb[0]);
          this.setGreen(vRgb[1]);
          this.setBlue(vRgb[2]);
      }
    },




    /*
    ---------------------------------------------------------------------------
      PREVIEW SYNC
    ---------------------------------------------------------------------------
    */

    /**
     * Sets preview pane's background color to corresponding red, green and blue color values.
     */
    _setPreviewFromRgb : function()
    {
      var rgbString = qx.util.ColorUtil.rgbToRgbString([this.getRed(), this.getGreen(), this.getBlue()]);
      this.getChildControl("preview-content-new").setBackgroundColor(rgbString);
    },


    /**
     * Sets previous color's to given values.
     *
     * @param red {Number} Red color value.
     * @param green {Number} Green color value.
     * @param blue {Number} Blue color value.
     */
    setPreviousColor : function(red, green, blue)
    {
      var color = qx.util.ColorUtil.rgbToRgbString([red, green, blue]);
      this.getChildControl("preview-content-old").setBackgroundColor(color);

      this.setRed(red);
      this.setGreen(green);
      this.setBlue(blue);
    },

    /**
     * Updates the background of the brightness field to give a nicer gradient
     */
    _setBrightnessGradiant : function()
    {
      var ColorUtil = qx.util.ColorUtil;
      var helpRgb = ColorUtil.hsbToRgb([this.getHue(), this.getSaturation(), 255]);
      var helpRgbString = ColorUtil.rgbToRgbString(helpRgb)
      this.getChildControl("brightness-field").setBackgroundColor(helpRgbString);
    },

    /**
     * Listener for appear.
     * Sets preview pane's background color to the current color.
     *
     * @param e {qx.event.type.Data} Incoming event object
     */
    _onAppear : function(e)
    {
      var color = qx.util.ColorUtil.rgbToRgbString([this.getRed(),
      this.getGreen(), this.getBlue()]);

      this.getChildControl("preview-content-old").setBackgroundColor(color);
      this.getChildControl("preview-content-new").setBackgroundColor(color);
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
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * This is a basic form field with common functionality for
 * {@link TextArea} and {@link TextField}.
 *
 * On every keystroke the value is synchronized with the
 * value of the textfield. Value changes can be monitored by listening to the
 * {@link #input} or {@link #changeValue} events, respectively.
 */
qx.Class.define("qx.ui.form.AbstractField",
{
  extend : qx.ui.core.Widget,
  implement : [
    qx.ui.form.IStringForm,
    qx.ui.form.IForm
  ],
  include : [
    qx.ui.form.MForm
  ],
  type : "abstract",



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param value {String} initial text value of the input field ({@link #setValue}).
   */
  construct : function(value)
  {
    this.base(arguments);

    // shortcut for placeholder feature detection
    this.__useQxPlaceholder = !qx.core.Environment.get("css.placeholder") ||
      (qx.core.Environment.get("engine.name") == "gecko" &&
       parseFloat(qx.core.Environment.get("engine.version")) >= 2);

    if (value != null) {
      this.setValue(value);
    }

    this.getContentElement().addListener(
      "change", this._onChangeContent, this
    );

    // use qooxdoo placeholder if no native placeholder is supported
    if (this.__useQxPlaceholder) {
      // assign the placeholder text after the appearance has been applied
      this.addListener("syncAppearance", this._syncPlaceholder, this);
    }

    // translation support
    if (qx.core.Environment.get("qx.dynlocale")) {
      qx.locale.Manager.getInstance().addListener(
        "changeLocale", this._onChangeLocale, this
      );
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
     * The event is fired on every keystroke modifying the value of the field.
     *
     * The method {@link qx.event.type.Data#getData} returns the
     * current value of the text field.
     */
    "input" : "qx.event.type.Data",


    /**
     * The event is fired each time the text field looses focus and the
     * text field values has changed.
     *
     * If you change {@link #liveUpdate} to true, the changeValue event will
     * be fired after every keystroke and not only after every focus loss. In
     * that mode, the changeValue event is equal to the {@link #input} event.
     *
     * The method {@link qx.event.type.Data#getData} returns the
     * current text value of the field.
     */
    "changeValue" : "qx.event.type.Data"
  },



  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /**
     * Alignment of the text
     */
    textAlign :
    {
      check : [ "left", "center", "right" ],
      nullable : true,
      themeable : true,
      apply : "_applyTextAlign"
    },


    /** Whether the field is read only */
    readOnly :
    {
      check : "Boolean",
      apply : "_applyReadOnly",
      event : "changeReadOnly",
      init : false
    },


    // overridden
    selectable :
    {
      refine : true,
      init : true
    },


    // overridden
    focusable :
    {
      refine : true,
      init : true
    },

    /** Maximal number of characters that can be entered in the TextArea. */
    maxLength :
    {
      check : "PositiveInteger",
      init : Infinity
    },

    /**
     * Whether the {@link #changeValue} event should be fired on every key
     * input. If set to true, the changeValue event is equal to the
     * {@link #input} event.
     */
    liveUpdate :
    {
      check : "Boolean",
      init : false
    },

    /**
     * String value which will be shown as a hint if the field is all of:
     * unset, unfocused and enabled. Set to null to not show a placeholder
     * text.
     */
    placeholder :
    {
      check : "String",
      nullable : true,
      apply : "_applyPlaceholder"
    },


    /**
     * RegExp responsible for filtering the value of the textfield. the RegExp
     * gives the range of valid values.
     * The following example only allows digits in the textfield.
     * <pre class='javascript'>field.setFilter(/[0-9]/);</pre>
     */
    filter :
    {
      check : "RegExp",
      nullable : true,
      init : null
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __nullValue : true,
    __placeholder : null,
    __oldValue : null,
    __oldInputValue : null,
    __useQxPlaceholder : true,
    __font : null,
    __webfontListenerId : null,


    /*
    ---------------------------------------------------------------------------
      WIDGET API
    ---------------------------------------------------------------------------
    */

    // overridden
    getFocusElement : function() {
      var el = this.getContentElement();
      if (el) {
        return el;
      }
    },


    /**
     * Creates the input element. Derived classes may override this
     * method, to create different input elements.
     *
     * @return {qx.html.Input} a new input element.
     */
    _createInputElement : function() {
      return new qx.html.Input("text");
    },


    // overridden
    renderLayout : function(left, top, width, height)
    {
      var updateInsets = this._updateInsets;
      var changes = this.base(arguments, left, top, width, height);

      // Directly return if superclass has detected that no
      // changes needs to be applied
      if (!changes) {
        return;
      }

      var inner = changes.size || updateInsets;
      var pixel = "px";

      if (inner || changes.local || changes.margin)
      {
        var insets = this.getInsets();
        var innerWidth = width - insets.left - insets.right;
        var innerHeight = height - insets.top - insets.bottom;
        // ensure that the width and height never get negative
        innerWidth = innerWidth < 0 ? 0 : innerWidth;
        innerHeight = innerHeight < 0 ? 0 : innerHeight;
      }

      var input = this.getContentElement();

      // we don't need to update positions on native placeholders
      if (updateInsets && this.__useQxPlaceholder)
      {
        // render the placeholder
        this.__getPlaceholderElement().setStyles({
          "left": insets.left + pixel,
          "top": insets.top + pixel
        });
      }

      if (inner)
      {
        // we don't need to update dimensions on native placeholders
        if (this.__useQxPlaceholder) {
          this.__getPlaceholderElement().setStyles({
            "width": innerWidth + pixel,
            "height": innerHeight + pixel
          });
        }

        input.setStyles({
          "width": innerWidth + pixel,
          "height": innerHeight + pixel
        });

        this._renderContentElement(innerHeight, input);

      }
    },


    /**
     * Hook into {@link qx.ui.form.AbstractField#renderLayout} method.
     * Called after the contentElement has a width and an innerWidth.
     *
     * Note: This was introduced to fix BUG#1585
     *
     * @param innerHeight {Integer} The inner height of the element.
     * @param element {Element} The element.
     */
    _renderContentElement : function(innerHeight, element) {
      //use it in child classes
    },


    // overridden
    _createContentElement : function()
    {
      // create and add the input element
      var el = this._createInputElement();

      // Apply styles
      el.setStyles(
      {
        "border": "none",
        "padding": 0,
        "margin": 0,
        "display" : "block",
        "background" : "transparent",
        "outline": "none",
        "appearance": "none",
        "position": "absolute",
        "autoComplete": "off"
      });

      // initialize the html input
      el.setSelectable(this.getSelectable());
      el.setEnabled(this.getEnabled());

      // Add listener for input event
      el.addListener("input", this._onHtmlInput, this);

      // Disable HTML5 spell checking
      el.setAttribute("spellcheck", "false");

      // Block resize handle
      el.setStyle("resize", "none");

      // IE8 in standard mode needs some extra love here to receive events.
      if ((qx.core.Environment.get("engine.name") == "mshtml"))
      {
        el.setStyles({
          backgroundImage: "url(" + qx.util.ResourceManager.getInstance().toUri("qx/static/blank.gif") + ")"
        });
      }

      return el;
    },


    // overridden
    _applyEnabled : function(value, old)
    {
      this.base(arguments, value, old);

      this.getContentElement().setEnabled(value);

      if (this.__useQxPlaceholder) {
        if (value) {
          this._showPlaceholder();
        } else {
          this._removePlaceholder();
        }
      } else {
        var input = this.getContentElement();
        // remove the placeholder on disabled input elements
        input.setAttribute("placeholder", value ? this.getPlaceholder() : "");
      }
    },


    // default text sizes
    /**
     * @lint ignoreReferenceField(__textSize)
     */
    __textSize :
    {
      width : 16,
      height : 16
    },


    // overridden
    _getContentHint : function()
    {
      return {
        width : this.__textSize.width * 10,
        height : this.__textSize.height || 16
      };
    },


    // overridden
    _applyFont : function(value, old)
    {
      if (old && this.__font && this.__webfontListenerId) {
        this.__font.removeListenerById(this.__webfontListenerId);
        this.__webfontListenerId = null;
      }

      // Apply
      var styles;
      if (value)
      {
        this.__font = qx.theme.manager.Font.getInstance().resolve(value);
        if (this.__font instanceof qx.bom.webfonts.WebFont) {
          this.__webfontListenerId = this.__font.addListener("changeStatus", this._onWebFontStatusChange, this);
        }
        styles = this.__font.getStyles();
      }
      else
      {
        styles = qx.bom.Font.getDefaultStyles();
      }

      // check if text color already set - if so this local value has higher priority
      if (this.getTextColor() != null) {
        delete styles["color"];
      }

      // apply the font to the content element
      this.getContentElement().setStyles(styles);

      // the font will adjust automatically on native placeholders
      if (this.__useQxPlaceholder) {
        // apply the font to the placeholder
        this.__getPlaceholderElement().setStyles(styles);
      }

      // Compute text size
      if (value) {
        this.__textSize = qx.bom.Label.getTextSize("A", styles);
      } else {
        delete this.__textSize;
      }

      // Update layout
      qx.ui.core.queue.Layout.add(this);
    },


    // overridden
    _applyTextColor : function(value, old)
    {
      if (value) {
        this.getContentElement().setStyle(
          "color", qx.theme.manager.Color.getInstance().resolve(value)
        );
      } else {
        this.getContentElement().removeStyle("color");
      }
    },


    // overridden
    tabFocus : function()
    {
      this.base(arguments);

      this.selectAllText();
    },

    /**
     * Returns the text size.
     * @return {Map} The text size.
     */
    _getTextSize : function() {
      return this.__textSize;
    },

    /*
    ---------------------------------------------------------------------------
      EVENTS
    ---------------------------------------------------------------------------
    */

    /**
     * Event listener for native input events. Redirects the event
     * to the widget. Also checks for the filter and max length.
     *
     * @param e {qx.event.type.Data} Input event
     */
    _onHtmlInput : function(e)
    {
      var value = e.getData();
      var fireEvents = true;

      this.__nullValue = false;

      // value unchanged; Firefox fires "input" when pressing ESC [BUG #5309]
      if (this.__oldInputValue && this.__oldInputValue === value) {
        fireEvents = false;
      }

      // check for the filter
      if (this.getFilter() != null)
      {
        var filteredValue = "";
        var index = value.search(this.getFilter());
        var processedValue = value;
        while(index >= 0)
        {
          filteredValue = filteredValue + (processedValue.charAt(index));
          processedValue = processedValue.substring(index + 1, processedValue.length);
          index = processedValue.search(this.getFilter());
        }

        if (filteredValue != value)
        {
          fireEvents = false;
          value = filteredValue;
          this.getContentElement().setValue(value);
        }
      }

      // check for the max length
      if (value.length > this.getMaxLength())
      {
        fireEvents = false;
        this.getContentElement().setValue(
          value.substr(0, this.getMaxLength())
        );
      }

      // fire the events, if necessary
      if (fireEvents)
      {
        // store the old input value
        this.fireDataEvent("input", value, this.__oldInputValue);
        this.__oldInputValue = value;

        // check for the live change event
        if (this.getLiveUpdate()) {
          this.__fireChangeValueEvent(value);
        }
      }
    },

    /**
     * Triggers text size recalculation after a web font was loaded
     *
     * @param ev {qx.event.type.Data} "changeStatus" event
     */
    _onWebFontStatusChange : function(ev)
    {
      if (ev.getData().valid === true) {
        var styles = this.__font.getStyles();
        this.__textSize = qx.bom.Label.getTextSize("A", styles);
        qx.ui.core.queue.Layout.add(this);
      }
    },


    /**
     * Handles the firing of the changeValue event including the local cache
     * for sending the old value in the event.
     *
     * @param value {String} The new value.
     */
    __fireChangeValueEvent : function(value) {
      var old = this.__oldValue;
      this.__oldValue = value;
      if (old != value) {
        this.fireNonBubblingEvent(
          "changeValue", qx.event.type.Data, [value, old]
        );
      }
    },


    /*
    ---------------------------------------------------------------------------
      TEXTFIELD VALUE API
    ---------------------------------------------------------------------------
    */

    /**
     * Sets the value of the textfield to the given value.
     *
     * @param value {String} The new value
     */
    setValue : function(value)
    {
      // handle null values
      if (value === null) {
        // just do nothing if null is already set
        if (this.__nullValue) {
          return value;
        }
        value = "";
        this.__nullValue = true;
      } else {
        this.__nullValue = false;
        // native placeholders will be removed by the browser
        if (this.__useQxPlaceholder) {
          this._removePlaceholder();
        }
      }

      if (qx.lang.Type.isString(value))
      {
        var elem = this.getContentElement();
        if (value.length > this.getMaxLength()) {
          value = value.substr(0, this.getMaxLength());
        }
        if (elem.getValue() != value)
        {
          var oldValue = elem.getValue();
          elem.setValue(value);
          var data = this.__nullValue ? null : value;
          this.__oldValue = oldValue;
          this.__fireChangeValueEvent(data);
        }
        // native placeholders will be shown by the browser
        if (this.__useQxPlaceholder) {
          this._showPlaceholder();
        }
        return value;
      }
      throw new Error("Invalid value type: " + value);
    },


    /**
     * Returns the current value of the textfield.
     *
     * @return {String|null} The current value
     */
    getValue : function() {
      var value = this.getContentElement().getValue();
      return this.__nullValue ? null : value;
    },


    /**
     * Resets the value to the default
     */
    resetValue : function() {
      this.setValue(null);
    },


    /**
     * Event listener for change event of content element
     *
     * @param e {qx.event.type.Data} Incoming change event
     */
    _onChangeContent : function(e)
    {
      this.__nullValue = e.getData() === null;
      this.__fireChangeValueEvent(e.getData());
    },


    /*
    ---------------------------------------------------------------------------
      TEXTFIELD SELECTION API
    ---------------------------------------------------------------------------
    */


    /**
     * Returns the current selection.
     * This method only works if the widget is already created and
     * added to the document.
     *
     * @return {String|null}
     */
    getTextSelection : function() {
      return this.getContentElement().getTextSelection();
    },


    /**
     * Returns the current selection length.
     * This method only works if the widget is already created and
     * added to the document.
     *
     * @return {Integer|null}
     */
    getTextSelectionLength : function() {
      return this.getContentElement().getTextSelectionLength();
    },


    /**
     * Returns the start of the text selection
     *
     * @return {Integer|null} Start of selection or null if not available
     */
    getTextSelectionStart : function() {
      return this.getContentElement().getTextSelectionStart();
    },


    /**
     * Returns the end of the text selection
     *
     * @return {Integer|null} End of selection or null if not available
     */
    getTextSelectionEnd : function() {
      return this.getContentElement().getTextSelectionEnd();
    },


    /**
     * Set the selection to the given start and end (zero-based).
     * If no end value is given the selection will extend to the
     * end of the textfield's content.
     * This method only works if the widget is already created and
     * added to the document.
     *
     * @param start {Integer} start of the selection (zero-based)
     * @param end {Integer} end of the selection
     * @return {void}
     */
    setTextSelection : function(start, end) {
      this.getContentElement().setTextSelection(start, end);
    },


    /**
     * Clears the current selection.
     * This method only works if the widget is already created and
     * added to the document.
     *
     * @return {void}
     */
    clearTextSelection : function() {
      this.getContentElement().clearTextSelection();
    },


    /**
     * Selects the whole content
     *
     * @return {void}
     */
    selectAllText : function() {
      this.setTextSelection(0);
    },


    /*
    ---------------------------------------------------------------------------
      PLACEHOLDER HELPER
    ---------------------------------------------------------------------------
    */

    /**
     * Helper to show the placeholder text in the field. It checks for all
     * states and possible conditions and shows the placeholder only if allowed.
     */
    _showPlaceholder : function()
    {
      var fieldValue = this.getValue() || "";
      var placeholder = this.getPlaceholder();
      if (
        placeholder != null &&
        fieldValue == "" &&
        !this.hasState("focused") &&
        !this.hasState("disabled")
      )
      {
        if (this.hasState("showingPlaceholder"))
        {
          this._syncPlaceholder();
        }
        else
        {
          // the placeholder will be set as soon as the appearance is applied
          this.addState("showingPlaceholder");
        }
      }
    },


    /**
     * Helper to remove the placeholder. Deletes the placeholder text from the
     * field and removes the state.
     */
    _removePlaceholder: function() {
      if (this.hasState("showingPlaceholder")) {
        this.__getPlaceholderElement().setStyle("visibility", "hidden");
        this.removeState("showingPlaceholder");
      }
    },


    /**
     * Updates the placeholder text with the DOM
     */
    _syncPlaceholder : function ()
    {
      if (this.hasState("showingPlaceholder")) {
        this.__getPlaceholderElement().setStyle("visibility", "visible");
      }
    },


    /**
     * Returns the placeholder label and creates it if necessary.
     */
    __getPlaceholderElement : function()
    {
      if (this.__placeholder == null) {
        // create the placeholder
        this.__placeholder = new qx.html.Label();
        var colorManager = qx.theme.manager.Color.getInstance();
        this.__placeholder.setStyles({
          "visibility" : "hidden",
          "zIndex" : 6,
          "position" : "absolute",
          "color" : colorManager.resolve("text-placeholder")
        });
        this.getContainerElement().add(this.__placeholder);
      }
      return this.__placeholder;
    },


    /**
     * Locale change event handler
     *
     * @signature function(e)
     * @param e {Event} the change event
     */
    _onChangeLocale : qx.core.Environment.select("qx.dynlocale",
    {
      "true" : function(e)
      {
        var content = this.getPlaceholder();
        if (content && content.translate) {
          this.setPlaceholder(content.translate());
        }
      },

      "false" : null
    }),


    /*
    ---------------------------------------------------------------------------
      PROPERTY APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    // property apply
    _applyPlaceholder : function(value, old)
    {
      if (this.__useQxPlaceholder) {
        this.__getPlaceholderElement().setValue(value);
        if (value != null) {
          this.addListener("focusin", this._removePlaceholder, this);
          this.addListener("focusout", this._showPlaceholder, this);
          this._showPlaceholder();
        } else {
          this.removeListener("focusin", this._removePlaceholder, this);
          this.removeListener("focusout", this._showPlaceholder, this);
          this._removePlaceholder();
        }
      } else {
        // only apply if the widget is enabled
        if (this.getEnabled()) {
          this.getContentElement().setAttribute("placeholder", value);
        }
      }
    },


    // property apply
    _applyTextAlign : function(value, old) {
      this.getContentElement().setStyle("textAlign", value);
    },


    // property apply
    _applyReadOnly : function(value, old)
    {
      var element = this.getContentElement();

      element.setAttribute("readOnly", value);

      if (value)
      {
        this.addState("readonly");
        this.setFocusable(false);
      }
      else
      {
        this.removeState("readonly");
        this.setFocusable(true);
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
    this.__placeholder = this.__font = null;

    if (qx.core.Environment.get("qx.dynlocale")) {
      qx.locale.Manager.getInstance().removeListener("changeLocale", this._onChangeLocale, this);
    }

    if (this.__font && this.__webfontListenerId) {
      this.__font.removeListenerById(this.__webfontListenerId);
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
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * A Input wrap any valid HTML input element and make it accessible
 * through the normalized qooxdoo element interface.
 */
qx.Class.define("qx.html.Input",
{
  extend : qx.html.Element,



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param type {String} The type of the input field. Valid values are
   *   <code>text</code>, <code>textarea</code>, <code>select</code>,
   *   <code>checkbox</code>, <code>radio</code>, <code>password</code>,
   *   <code>hidden</code>, <code>submit</code>, <code>image</code>,
   *   <code>file</code>, <code>search</code>, <code>reset</code>,
   *   <code>select</code> and <code>textarea</code>.
   * @param styles {Map?null} optional map of CSS styles, where the key is the name
   *    of the style and the value is the value to use.
   * @param attributes {Map?null} optional map of element attributes, where the
   *    key is the name of the attribute and the value is the value to use.
   */
  construct : function(type, styles, attributes)
  {
    // Update node name correctly
    if (type === "select" || type === "textarea") {
      var nodeName = type;
    } else {
      nodeName = "input";
    }

    this.base(arguments, nodeName, styles, attributes);

    this.__type = type;
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {

    __type : null,
    // used for webkit only
    __selectable : null,
    __enabled : null,

    /*
    ---------------------------------------------------------------------------
      ELEMENT API
    ---------------------------------------------------------------------------
    */

    //overridden
    _createDomElement : function() {
      return qx.bom.Input.create(this.__type);
    },


    // overridden
    _applyProperty : function(name, value)
    {
      this.base(arguments, name, value);
      var element = this.getDomElement();

      if (name === "value") {
        qx.bom.Input.setValue(element, value);
      } else if (name === "wrap") {
        qx.bom.Input.setWrap(element, value);

        // qx.bom.Input#setWrap has the side-effect that the CSS property
        // overflow is set via DOM methods, causing queue and DOM to get
        // out of sync. Mirror all overflow properties to handle the case
        // when group and x/y property differ.
        this.setStyle("overflow", element.style.overflow, true);
        this.setStyle("overflowX", element.style.overflowX, true);
        this.setStyle("overflowY", element.style.overflowY, true);
      }
    },


    /**
     * Set the input element enabled / disabled.
     * Webkit needs a special treatment because the set color of the input
     * field changes automatically. Therefore, we use
     * <code>-webkit-user-modify: read-only</code> and
     * <code>-webkit-user-select: none</code>
     * for disabling the fields in webkit. All other browsers use the disabled
     * attribute.
     *
     * @param value {Boolean} true, if the inpout element should be enabled.
     */
    setEnabled : qx.core.Environment.select("engine.name",
    {
      "webkit" : function(value)
      {
        this.__enabled = value;

        if (!value) {
          this.setStyles({
            "userModify": "read-only",
            "userSelect": "none"
          });
        } else {
          this.setStyles({
            "userModify": null,
            "userSelect": this.__selectable ? null : "none"
          });
        }
      },

      "default" : function(value)
      {
        this.setAttribute("disabled", value===false);
      }
    }),


    /**
     * Set whether the element is selectable. It uses the qooxdoo attribute
     * qxSelectable with the values 'on' or 'off'.
     * In webkit, a special css property will be used and checks for the
     * enabled state.
     *
     * @param value {Boolean} True, if the element should be selectable.
     */
    setSelectable : qx.core.Environment.select("engine.name",
    {
      "webkit" : function(value)
      {
        this.__selectable = value;

        // Only apply the value when it is enabled
        this.base(arguments, this.__enabled && value);
      },

      "default" : function(value)
      {
        this.base(arguments, value);
      }
    }),



    /*
    ---------------------------------------------------------------------------
      INPUT API
    ---------------------------------------------------------------------------
    */

    /**
     * Sets the value of the input element.
     *
     * @param value {var} the new value
     * @return {qx.html.Input} This instance for for chaining support.
     */
    setValue : function(value)
    {
      var element = this.getDomElement();

      if (element)
      {
        // Do not overwrite when already correct (on input events)
        // This is needed to keep caret position while typing.
        if (element.value != value) {
          qx.bom.Input.setValue(element, value);
        }
      }
      else
      {
        this._setProperty("value", value);
      }

      return this;
    },


    /**
     * Get the current value.
     *
     * @return {String} The element's current value.
     */
    getValue : function()
    {
      var element = this.getDomElement();

      if (element) {
        return qx.bom.Input.getValue(element);
      }

      return this._getProperty("value") || "";
    },


    /**
     * Sets the text wrap behavior of a text area element.
     *
     * This property uses the style property "wrap" (IE) respectively "whiteSpace"
     *
     * @param wrap {Boolean} Whether to turn text wrap on or off.
     * @param direct {Boolean?false} Whether the execution should be made
     *  directly when possible
     * @return {qx.html.Input} This instance for for chaining support.
     */
    setWrap : function(wrap, direct)
    {
      if (this.__type === "textarea") {
        this._setProperty("wrap", wrap, direct);
      } else {
        throw new Error("Text wrapping is only support by textareas!");
      }

      return this;
    },


    /**
     * Gets the text wrap behavior of a text area element.
     *
     * This property uses the style property "wrap" (IE) respectively "whiteSpace"
     *
     * @return {Boolean} Whether wrapping is enabled or disabled.
     */
    getWrap : function()
    {
      if (this.__type === "textarea") {
        return this._getProperty("wrap");
      } else {
        throw new Error("Text wrapping is only support by textareas!");
      }
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
     * Christian Hagendorn (chris_schmidt)

************************************************************************ */

// Original behavior:
// ================================================================
// Normally a "change" event should occour on blur of the element
// (http://www.w3.org/TR/DOM-Level-2-Events/events.html)

// However this is not true for "file" upload fields

// And this is also not true for checkboxes and radiofields (all non mshtml)
// And this is also not true for select boxes where the selections
// happens in the opened popup (Gecko + Webkit)

// Normalized behavior:
// ================================================================
// Change on blur for textfields, textareas and file
// Instant change event on checkboxes, radiobuttons

// Select field fires on select (when using popup or size>1)
// but differs when using keyboard:
// mshtml+opera=keypress; mozilla+safari=blur

// Input event for textareas does not work in Safari 3 beta (WIN)
// Safari 3 beta (WIN) repeats change event for select box on blur when selected using popup

// Opera fires "change" on radio buttons two times for each change

/**
 * This handler provides an "change" event for all form fields and an
 * "input" event for form fields of type "text" and "textarea".
 *
 * To let these events work it is needed to create the elements using
 * {@link qx.bom.Input}
 */
qx.Class.define("qx.event.handler.Input",
{
  extend : qx.core.Object,
  implement : qx.event.IEventHandler,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    this._onChangeCheckedWrapper = qx.lang.Function.listener(this._onChangeChecked, this);
    this._onChangeValueWrapper = qx.lang.Function.listener(this._onChangeValue, this);
    this._onInputWrapper = qx.lang.Function.listener(this._onInput, this);
    this._onPropertyWrapper = qx.lang.Function.listener(this._onProperty, this);

    // special event handler for opera
    if ((qx.core.Environment.get("engine.name") == "opera")) {
      this._onKeyDownWrapper = qx.lang.Function.listener(this._onKeyDown, this);
      this._onKeyUpWrapper = qx.lang.Function.listener(this._onKeyUp, this);
      this._onBlurWrapper = qx.lang.Function.listener(this._onBlur, this);
    }
  },






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
    SUPPORTED_TYPES :
    {
      input : 1,
      change : 1
    },

    /** {Integer} Which target check to use */
    TARGET_CHECK : qx.event.IEventHandler.TARGET_DOMNODE,

    /** {Integer} Whether the method "canHandleEvent" must be called */
    IGNORE_CAN_HANDLE : false
  },





  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // special handling for opera
    __enter : false,
    __onInputTimeoutId : null,

    // stores the former set value for opera and IE
    __oldValue : null,

    // stores the former set value for IE
    __oldInputValue : null,

    /*
    ---------------------------------------------------------------------------
      EVENT HANDLER INTERFACE
    ---------------------------------------------------------------------------
    */

    // interface implementation
    canHandleEvent : function(target, type)
    {
      var lower = target.tagName.toLowerCase();

      if (type === "input" && (lower === "input" || lower === "textarea")) {
        return true;
      }

      if (type === "change" && (lower === "input" || lower === "textarea" || lower === "select")) {
        return true;
      }

      return false;
    },


    // interface implementation
    registerEvent : function(target, type, capture)
    {
      if (
        qx.core.Environment.get("engine.name") == "mshtml" &&
        (qx.core.Environment.get("engine.version") < 9 ||
        (qx.core.Environment.get("engine.version") >= 9 && qx.core.Environment.get("browser.documentmode") < 9))
      )
      {
        if (!target.__inputHandlerAttached)
        {
          var tag = target.tagName.toLowerCase();
          var elementType = target.type;

          if (elementType === "text" || elementType === "password" || tag === "textarea" || elementType === "checkbox" || elementType === "radio") {
            qx.bom.Event.addNativeListener(target, "propertychange", this._onPropertyWrapper);
          }

          if (elementType !== "checkbox" && elementType !== "radio") {
            qx.bom.Event.addNativeListener(target, "change", this._onChangeValueWrapper);
          }

          if (elementType === "text" || elementType === "password") {
            this._onKeyPressWrapped = qx.lang.Function.listener(this._onKeyPress, this, target);
            qx.bom.Event.addNativeListener(target, "keypress", this._onKeyPressWrapped);
          }

          target.__inputHandlerAttached = true;
        }
      }
      else
      {
        if (type === "input")
        {
          this.__registerInputListener(target);
        }
        else if (type === "change")
        {
          if (target.type === "radio" || target.type === "checkbox") {
            qx.bom.Event.addNativeListener(target, "change", this._onChangeCheckedWrapper);
          } else {
            qx.bom.Event.addNativeListener(target, "change", this._onChangeValueWrapper);
          }

          // special enter bugfix for opera
          if ((qx.core.Environment.get("engine.name") == "opera") || (qx.core.Environment.get("engine.name") == "mshtml")) {
            if (target.type === "text" || target.type === "password") {
              this._onKeyPressWrapped = qx.lang.Function.listener(this._onKeyPress, this, target);
              qx.bom.Event.addNativeListener(target, "keypress", this._onKeyPressWrapped);
            }
          }
        }
      }
    },


    __registerInputListener : qx.core.Environment.select("engine.name",
    {
      "mshtml" : function(target)
      {
        if (
          qx.core.Environment.get("engine.version") >= 9 &&
          qx.core.Environment.get("browser.documentmode") >= 9
        ) {
          qx.bom.Event.addNativeListener(target, "input", this._onInputWrapper);

          if (target.type === "text" || target.type === "password" || target.type === "textarea")
          {
            // Fixed input for delete and backspace key
            this._inputFixWrapper = qx.lang.Function.listener(this._inputFix, this, target);
            qx.bom.Event.addNativeListener(target, "keyup", this._inputFixWrapper);
          }
        }
      },

      "webkit" : function(target)
      {
        // TODO: remove listener
        var tag = target.tagName.toLowerCase();

        // the change event is not fired while typing
        // this has been fixed in the latest nightlies
        if (parseFloat(qx.core.Environment.get("engine.version")) < 532 && tag == "textarea") {
          qx.bom.Event.addNativeListener(target, "keypress", this._onInputWrapper);
        }
        qx.bom.Event.addNativeListener(target, "input", this._onInputWrapper);
      },

      "opera" : function(target) {
        // register key events for filtering "enter" on input events
        qx.bom.Event.addNativeListener(target, "keyup", this._onKeyUpWrapper);
        qx.bom.Event.addNativeListener(target, "keydown", this._onKeyDownWrapper);
        // register an blur event for preventing the input event on blur
        qx.bom.Event.addNativeListener(target, "blur", this._onBlurWrapper);

        qx.bom.Event.addNativeListener(target, "input", this._onInputWrapper);
      },

      "default" : function(target) {
        qx.bom.Event.addNativeListener(target, "input", this._onInputWrapper);
      }
    }),


    // interface implementation
    unregisterEvent : function(target, type)
    {
      if (
        qx.core.Environment.get("engine.name") == "mshtml" &&
        qx.core.Environment.get("engine.version") < 9 &&
        qx.core.Environment.get("browser.documentmode") < 9
      )
      {
        if (target.__inputHandlerAttached)
        {
          var tag = target.tagName.toLowerCase();
          var elementType = target.type;

          if (elementType === "text" || elementType === "password" || tag === "textarea" || elementType === "checkbox" || elementType === "radio") {
            qx.bom.Event.removeNativeListener(target, "propertychange", this._onPropertyWrapper);
          }

          if (elementType !== "checkbox" && elementType !== "radio") {
            qx.bom.Event.removeNativeListener(target, "change", this._onChangeValueWrapper);
          }

          if (elementType === "text" || elementType === "password") {
            qx.bom.Event.removeNativeListener(target, "keypress", this._onKeyPressWrapped);
          }

          try {
            delete target.__inputHandlerAttached;
          } catch(ex) {
            target.__inputHandlerAttached = null;
          }
        }
      }
      else
      {
        if (type === "input")
        {
          this.__unregisterInputListener(target);
        }
        else if (type === "change")
        {
          if (target.type === "radio" || target.type === "checkbox")
          {
            qx.bom.Event.removeNativeListener(target, "change", this._onChangeCheckedWrapper);
          }
          else
          {
            qx.bom.Event.removeNativeListener(target, "change", this._onChangeValueWrapper);
          }
        }

        if ((qx.core.Environment.get("engine.name") == "opera") || (qx.core.Environment.get("engine.name") == "mshtml")) {
          if (target.type === "text" || target.type === "password") {
            qx.bom.Event.removeNativeListener(target, "keypress", this._onKeyPressWrapped);
          }
        }
      }
    },


    __unregisterInputListener : qx.core.Environment.select("engine.name",
    {
      "mshtml" : function(target)
      {
        if (
          qx.core.Environment.get("engine.version") >= 9 &&
          qx.core.Environment.get("browser.documentmode") >= 9
        ) {
          qx.bom.Event.removeNativeListener(target, "input", this._onInputWrapper);

          if (target.type === "text" || target.type === "password" || target.type === "textarea") {
            // Fixed input for delete and backspace key
            qx.bom.Event.removeNativeListener(target, "keyup", this._inputFixWrapper);
          }
        }
      },

      "webkit" : function(target)
      {
        // TODO: remove listener
        var tag = target.tagName.toLowerCase();

        // the change event is not fired while typing
        // this has been fixed in the latest nightlies
        if (parseFloat(qx.core.Environment.get("engine.version")) < 532 && tag == "textarea") {
          qx.bom.Event.removeNativeListener(target, "keypress", this._onInputWrapper);
        }
        qx.bom.Event.removeNativeListener(target, "input", this._onInputWrapper);
      },

      "opera" : function(target) {
        // unregister key events for filtering "enter" on input events
        qx.bom.Event.removeNativeListener(target, "keyup", this._onKeyUpWrapper);
        qx.bom.Event.removeNativeListener(target, "keydown", this._onKeyDownWrapper);
        // unregister the blur event (needed for preventing input event on blur)
        qx.bom.Event.removeNativeListener(target, "blur", this._onBlurWrapper);


        qx.bom.Event.removeNativeListener(target, "input", this._onInputWrapper);
      },

      "default" : function(target) {
        qx.bom.Event.removeNativeListener(target, "input", this._onInputWrapper);
      }
    }),


    /*
    ---------------------------------------------------------------------------
      FOR OPERA AND IE (KEYPRESS TO SIMULATE CHANGE EVENT)
    ---------------------------------------------------------------------------
    */
    /**
     * Handler for fixing the different behavior when pressing the enter key.
     *
     * FF and Safari fire a "change" event if the user presses the enter key.
     * IE and Opera fire the event only if the focus is changed.
     *
     * @signature function(e, target)
     * @param e {Event} DOM event object
     * @param target {Element} The event target
     */
    _onKeyPress : qx.core.Environment.select("engine.name",
    {
      "mshtml|opera" : function(e, target)
      {
        if (e.keyCode === 13) {
          if (target.value !== this.__oldValue) {
            this.__oldValue = target.value;
            qx.event.Registration.fireEvent(target, "change", qx.event.type.Data, [target.value]);
          }
        }
      },

      "default" : null
    }),


    /*
    ---------------------------------------------------------------------------
      FOR IE (KEYUP TO SIMULATE INPUT EVENT)
    ---------------------------------------------------------------------------
    */
    /**
     * Handler for fixing the different behavior when pressing the backspace or
     * delete key.
     *
     * The other browsers fire a "input" event if the user presses the backspace
     * or delete key.
     * IE fire the event only for other keys.
     *
     * @signature function(e, target)
     * @param e {Event} DOM event object
     * @param target {Element} The event target
     */
    _inputFix : qx.core.Environment.select("engine.name",
    {
      "mshtml" : function(e, target)
      {
        if (e.keyCode === 46 || e.keyCode === 8)
        {
          if (target.value !== this.__oldInputValue)
          {
            this.__oldInputValue = target.value;
            qx.event.Registration.fireEvent(target, "input", qx.event.type.Data, [target.value]);
          }
        }
      },

      "default" : null
    }),


    /*
    ---------------------------------------------------------------------------
      FOR OPERA ONLY LISTENER (KEY AND BLUR)
    ---------------------------------------------------------------------------
    */
    /**
     * Key event listener for opera which recognizes if the enter key has been
     * pressed.
     *
     * @signature function(e)
     * @param e {Event} DOM event object
     */
    _onKeyDown : qx.core.Environment.select("engine.name",
    {
      "opera" : function(e)
      {
        // enter is pressed
        if (e.keyCode === 13) {
          this.__enter = true;
        }
      },

      "default" : null
    }),


    /**
     * Key event listener for opera which recognizes if the enter key has been
     * pressed.
     *
     * @signature function(e)
     * @param e {Event} DOM event object
     */
    _onKeyUp : qx.core.Environment.select("engine.name",
    {
      "opera" : function(e)
      {
        // enter is pressed
        if (e.keyCode === 13) {
          this.__enter = false;
        }
      },

      "default" : null
    }),


    /**
     * Blur event listener for opera cancels the timeout of the input event.
     *
     * @signature function(e)
     * @param e {Event} DOM event object
     */
    _onBlur : qx.core.Environment.select("engine.name",
    {
      "opera" : function(e)
      {
        if (this.__onInputTimeoutId && qx.core.Environment.get("browser.version") < 10.6) {
          window.clearTimeout(this.__onInputTimeoutId);
        }
      },

      "default" : null
    }),


    /*
    ---------------------------------------------------------------------------
      NATIVE EVENT HANDLERS
    ---------------------------------------------------------------------------
    */

    /**
     * Internal function called by input elements created using {@link qx.bom.Input}.
     *
     * @signature function(e)
     * @param e {Event} Native DOM event
     */
    _onInput : qx.event.GlobalError.observeMethod(function(e)
    {
      var target = qx.bom.Event.getTarget(e);
      var tag = target.tagName.toLowerCase();
      // ignore native input event when triggered by return in input element
      if (!this.__enter || tag !== "input") {
        // opera lower 10.6 needs a special treatment for input events because
        // they are also fired on blur
        if ((qx.core.Environment.get("engine.name") == "opera") &&
            qx.core.Environment.get("browser.version") < 10.6) {
          this.__onInputTimeoutId = window.setTimeout(function() {
            qx.event.Registration.fireEvent(target, "input", qx.event.type.Data, [target.value]);
          }, 0);
        } else {
          qx.event.Registration.fireEvent(target, "input", qx.event.type.Data, [target.value]);
        }
      }
    }),


    /**
     * Internal function called by input elements created using {@link qx.bom.Input}.
     *
     * @signature function(e)
     * @param e {Event} Native DOM event
     */
    _onChangeValue : qx.event.GlobalError.observeMethod(function(e)
    {
      var target = qx.bom.Event.getTarget(e);
      var data = target.value;

      if (target.type === "select-multiple")
      {
        var data = [];
        for (var i=0, o=target.options, l=o.length; i<l; i++)
        {
          if (o[i].selected) {
            data.push(o[i].value);
          }
        }
      }

      qx.event.Registration.fireEvent(target, "change", qx.event.type.Data, [data]);
    }),


    /**
     * Internal function called by input elements created using {@link qx.bom.Input}.
     *
     * @signature function(e)
     * @param e {Event} Native DOM event
     */
    _onChangeChecked : qx.event.GlobalError.observeMethod(function(e)
    {
      var target = qx.bom.Event.getTarget(e);

      if (target.type === "radio")
      {
        if (target.checked) {
          qx.event.Registration.fireEvent(target, "change", qx.event.type.Data, [target.value]);
        }
      }
      else
      {
        qx.event.Registration.fireEvent(target, "change", qx.event.type.Data, [target.checked]);
      }
    }),


    /**
     * Internal function called by input elements created using {@link qx.bom.Input}.
     *
     * @signature function(e)
     * @param e {Event} Native DOM event
     */
    _onProperty : qx.core.Environment.select("engine.name",
    {
      "mshtml" : qx.event.GlobalError.observeMethod(function(e)
      {
        var target = qx.bom.Event.getTarget(e);
        var prop = e.propertyName;

        if (prop === "value" && (target.type === "text" || target.type === "password" || target.tagName.toLowerCase() === "textarea"))
        {
          if (!target.$$inValueSet) {
            qx.event.Registration.fireEvent(target, "input", qx.event.type.Data, [target.value]);
          }
        }
        else if (prop === "checked")
        {
          if (target.type === "checkbox") {
            qx.event.Registration.fireEvent(target, "change", qx.event.type.Data, [target.checked]);
          } else if (target.checked) {
            qx.event.Registration.fireEvent(target, "change", qx.event.type.Data, [target.value]);
          }
        }
      }),

      "default" : function() {}
    })
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

#require(qx.event.handler.Input)

************************************************************************ */

/**
 * Cross browser abstractions to work with input elements.
 */
qx.Class.define("qx.bom.Input",
{
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /** {Map} Internal data structures with all supported input types */
    __types :
    {
      text : 1,
      textarea : 1,
      select : 1,
      checkbox : 1,
      radio : 1,
      password : 1,
      hidden : 1,
      submit : 1,
      image : 1,
      file : 1,
      search : 1,
      reset : 1,
      button : 1
    },


    /**
     * Creates an DOM input/textarea/select element.
     *
     * Attributes may be given directly with this call. This is critical
     * for some attributes e.g. name, type, ... in many clients.
     *
     * Note: <code>select</code> and <code>textarea</code> elements are created
     * using the identically named <code>type</code>.
     *
     * @param type {String} Any valid type for HTML, <code>select</code>
     *   and <code>textarea</code>
     * @param attributes {Map} Map of attributes to apply
     * @param win {Window} Window to create the element for
     * @return {Element} The created input node
     */
    create : function(type, attributes, win)
    {
      if (qx.core.Environment.get("qx.debug")) {
        qx.core.Assert.assertKeyInMap(type, this.__types, "Unsupported input type.");
      }

      // Work on a copy to not modify given attributes map
      var attributes = attributes ? qx.lang.Object.clone(attributes) : {};

      var tag;

      if (type === "textarea" || type === "select")
      {
        tag = type;
      }
      else
      {
        tag = "input";
        attributes.type = type;
      }

      return qx.bom.Element.create(tag, attributes, win);
    },


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
     * @param element {Element} element to update
     * @param value {String|Number|Array} the value to apply
     */
    setValue : function(element, value)
    {
      var tag = element.nodeName.toLowerCase();
      var type = element.type;
      var Array = qx.lang.Array;
      var Type = qx.lang.Type;

      if (typeof value === "number") {
        value += "";
      }

      if ((type === "checkbox" || type === "radio"))
      {
        if (Type.isArray(value)) {
          element.checked = Array.contains(value, element.value);
        } else {
          element.checked = element.value == value;
        }
      }
      else if (tag === "select")
      {
        var isArray = Type.isArray(value);
        var options = element.options;
        var subel, subval;

        for (var i=0, l=options.length; i<l; i++)
        {
          subel = options[i];
          subval = subel.getAttribute("value");
          if (subval == null) {
            subval = subel.text;
          }

          subel.selected = isArray ?
             Array.contains(value, subval) : value == subval;
        }

        if (isArray && value.length == 0) {
          element.selectedIndex = -1;
        }
      }
      else if ((type === "text" || type === "textarea") &&
        (qx.core.Environment.get("engine.name") == "mshtml"))
      {
        // These flags are required to detect self-made property-change
        // events during value modification. They are used by the Input
        // event handler to filter events.
        element.$$inValueSet = true;
        element.value = value;
        element.$$inValueSet = null;
      }
      else
      {
        element.value = value;
      }
    },


    /**
     * Returns the currently configured value.
     *
     * Works with simple input fields as well as with
     * select boxes or option elements.
     *
     * Returns an array in cases of multi-selection in
     * select boxes but in all other cases a string.
     *
     * @param element {Element} DOM element to query
     * @return {String|Array} The value of the given element
     */
    getValue : function(element)
    {
      var tag = element.nodeName.toLowerCase();

      if (tag === "option") {
        return (element.attributes.value || {}).specified ? element.value : element.text;
      }

      if (tag === "select")
      {
        var index = element.selectedIndex;

        // Nothing was selected
        if (index < 0) {
          return null;
        }

        var values = [];
        var options = element.options;
        var one = element.type == "select-one";
        var clazz = qx.bom.Input;
        var value;

        // Loop through all the selected options
        for (var i=one ? index : 0, max=one ? index+1 : options.length; i<max; i++)
        {
          var option = options[i];

          if (option.selected)
          {
            // Get the specifc value for the option
            value = clazz.getValue(option);

            // We don't need an array for one selects
            if (one) {
              return value;
            }

            // Multi-Selects return an array
            values.push(value);
          }
        }

        return values;
      }
      else
      {
        return (element.value || "").replace(/\r/g, "");
      }
    },


    /**
     * Sets the text wrap behaviour of a text area element.
     * This property uses the attribute "wrap" respectively
     * the style property "whiteSpace"
     *
     * @signature function(element, wrap)
     * @param element {Element} DOM element to modify
     * @param wrap {Boolean} Whether to turn text wrap on or off.
     */
    setWrap : qx.core.Environment.select("engine.name",
    {
      "mshtml" : function(element, wrap) {
        var wrapValue = wrap ? "soft" : "off";

        // Explicitly set overflow-y CSS property to auto when wrapped,
        // allowing the vertical scroll-bar to appear if necessary
        var styleValue = wrap ? "auto" : "";

        element.wrap = wrapValue;
        element.style.overflowY = styleValue;
      },

      "gecko|webkit" : function(element, wrap)
      {
        var wrapValue = wrap ? "soft" : "off";
        var styleValue = wrap ? "" : "auto";

        element.setAttribute("wrap", wrapValue);
        element.style.overflow = styleValue;
      },

      "default" : function(element, wrap) {
        element.style.whiteSpace = wrap ? "normal" : "nowrap";
      }
    })
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
     * Fabian Jakobs (fjakobs)
     * Adrian Olaru (adrianolaru)

************************************************************************ */

/**
 * The TextField is a single-line text input field.
 */
qx.Class.define("qx.ui.form.TextField",
{
  extend : qx.ui.form.AbstractField,


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
      init : "textfield"
    },

    // overridden
    allowGrowY :
    {
      refine : true,
      init : false
    },

    // overridden
    allowShrinkY :
    {
      refine : true,
      init : false
    }
  },

  members : {

    // overridden
    _renderContentElement : function(innerHeight, element) {
     if ((qx.core.Environment.get("engine.name") == "mshtml") &&
         (parseInt(qx.core.Environment.get("engine.version"), 10) < 9
         || qx.core.Environment.get("browser.documentmode") < 9))
     {
       element.setStyles({
         "line-height" : innerHeight + 'px'
       });
     }
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
     * Martin Wittemann (martinwittemann)
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */

/**
 * A *spinner* is a control that allows you to adjust a numerical value,
 * typically within an allowed range. An obvious example would be to specify the
 * month of a year as a number in the range 1 - 12.
 *
 * To do so, a spinner encompasses a field to display the current value (a
 * textfield) and controls such as up and down buttons to change that value. The
 * current value can also be changed by editing the display field directly, or
 * using mouse wheel and cursor keys.
 *
 * An optional {@link #numberFormat} property allows you to control the format of
 * how a value can be entered and will be displayed.
 *
 * A brief, but non-trivial example:
 *
 * <pre class='javascript'>
 * var s = new qx.ui.form.Spinner();
 * s.set({
 *   maximum: 3000,
 *   minimum: -3000
 * });
 * var nf = new qx.util.format.NumberFormat();
 * nf.setMaximumFractionDigits(2);
 * s.setNumberFormat(nf);
 * </pre>
 *
 * A spinner instance without any further properties specified in the
 * constructor or a subsequent *set* command will appear with default
 * values and behaviour.
 *
 * @childControl textfield {qx.ui.form.TextField} holds the current value of the spinner
 * @childControl upbutton {qx.ui.form.Button} button to increase the value
 * @childControl downbutton {qx.ui.form.Button} button to decrease the value
 *
 */
qx.Class.define("qx.ui.form.Spinner",
{
  extend : qx.ui.core.Widget,
  implement : [
    qx.ui.form.INumberForm,
    qx.ui.form.IRange,
    qx.ui.form.IForm
  ],
  include : [
    qx.ui.core.MContentPadding,
    qx.ui.form.MForm
  ],


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param min {Number} Minimum value
   * @param value {Number} Current value
   * @param max {Number} Maximum value
   */
  construct : function(min, value, max)
  {
    this.base(arguments);

    // MAIN LAYOUT
    var layout = new qx.ui.layout.Grid();
    layout.setColumnFlex(0, 1);
    layout.setRowFlex(0,1);
    layout.setRowFlex(1,1);
    this._setLayout(layout);

    // EVENTS
    this.addListener("keydown", this._onKeyDown, this);
    this.addListener("keyup", this._onKeyUp, this);
    this.addListener("mousewheel", this._onMouseWheel, this);

    if (qx.core.Environment.get("qx.dynlocale")) {
      qx.locale.Manager.getInstance().addListener("changeLocale", this._onChangeLocale, this);
    }

    // CREATE CONTROLS
    this._createChildControl("textfield");
    this._createChildControl("upbutton");
    this._createChildControl("downbutton");

    // INITIALIZATION
    if (min != null) {
      this.setMinimum(min);
    }

    if (max != null) {
      this.setMaximum(max);
    }

    if (value !== undefined) {
      this.setValue(value);
    } else {
      this.initValue();
    }
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties:
  {
    // overridden
    appearance:
    {
      refine : true,
      init : "spinner"
    },

    // overridden
    focusable :
    {
      refine : true,
      init : true
    },

    /** The amount to increment on each event (keypress or mousedown) */
    singleStep:
    {
      check : "Number",
      init : 1
    },

    /** The amount to increment on each pageup/pagedown keypress */
    pageStep:
    {
      check : "Number",
      init : 10
    },

    /** minimal value of the Range object */
    minimum:
    {
      check : "Number",
      apply : "_applyMinimum",
      init : 0,
      event: "changeMinimum"
    },

    /** The value of the spinner. */
    value:
    {
      check : "this._checkValue(value)",
      nullable : true,
      apply : "_applyValue",
      init : 0,
      event : "changeValue"
    },

    /** maximal value of the Range object */
    maximum:
    {
      check : "Number",
      apply : "_applyMaximum",
      init : 100,
      event: "changeMaximum"
    },

    /** whether the value should wrap around */
    wrap:
    {
      check : "Boolean",
      init : false,
      apply : "_applyWrap"
    },

    /** Controls whether the textfield of the spinner is editable or not */
    editable :
    {
      check : "Boolean",
      init : true,
      apply : "_applyEditable"
    },

    /** Controls the display of the number in the textfield */
    numberFormat :
    {
      check : "qx.util.format.NumberFormat",
      apply : "_applyNumberFormat",
      nullable : true
    },

    // overridden
    allowShrinkY :
    {
      refine : true,
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
    /** Saved last value in case invalid text is entered */
    __lastValidValue : null,

    /** Whether the page-up button has been pressed */
    __pageUpMode : false,

    /** Whether the page-down button has been pressed */
    __pageDownMode : false,


    /*
    ---------------------------------------------------------------------------
      WIDGET INTERNALS
    ---------------------------------------------------------------------------
    */

    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        case "textfield":
          control = new qx.ui.form.TextField();
          control.setFilter(this._getFilterRegExp());
          control.addState("inner");
          control.setWidth(40);
          control.setFocusable(false);
          control.addListener("changeValue", this._onTextChange, this);

          this._add(control, {column: 0, row: 0, rowSpan: 2});
          break;

        case "upbutton":
          control = new qx.ui.form.RepeatButton();
          control.addState("inner");
          control.setFocusable(false);
          control.addListener("execute", this._countUp, this);
          this._add(control, {column: 1, row: 0});
          break;

        case "downbutton":
          control = new qx.ui.form.RepeatButton();
          control.addState("inner");
          control.setFocusable(false);
          control.addListener("execute", this._countDown, this);
          this._add(control, {column:1, row: 1});
          break;
      }

      return control || this.base(arguments, id);
    },


    /**
     * Returns the regular expression used as the text field's filter
     *
     * @return {RegExp} The filter RegExp.
     */
    _getFilterRegExp : function()
    {
      var decimalSeparator = qx.locale.Number.getDecimalSeparator(
        qx.locale.Manager.getInstance().getLocale()
      );
      var groupSeparator = qx.locale.Number.getGroupSeparator(
        qx.locale.Manager.getInstance().getLocale()
      );

      var prefix = "";
      var postfix = "";
      if (this.getNumberFormat() !== null) {
        prefix = this.getNumberFormat().getPrefix() || "";
        postfix = this.getNumberFormat().getPostfix() || "";
      }

      var filterRegExp = new RegExp("[0-9" +
        qx.lang.String.escapeRegexpChars(decimalSeparator) +
        qx.lang.String.escapeRegexpChars(groupSeparator) +
        qx.lang.String.escapeRegexpChars(prefix) +
        qx.lang.String.escapeRegexpChars(postfix) +
        "\-]"
      );

      return filterRegExp;
    },


    // overridden
    /**
     * @lint ignoreReferenceField(_forwardStates)
     */
    _forwardStates : {
      focused : true,
      invalid : true
    },


    // overridden
    tabFocus : function()
    {
      var field = this.getChildControl("textfield");

      field.getFocusElement().focus();
      field.selectAllText();
    },





    /*
    ---------------------------------------------------------------------------
      APPLY METHODS
    ---------------------------------------------------------------------------
    */

    /**
     * Apply routine for the minimum property.
     *
     * It sets the value of the spinner to the maximum of the current spinner
     * value and the given min property value.
     *
     * @param value {Number} The new value of the min property
     * @param old {Number} The old value of the min property
     */
    _applyMinimum : function(value, old)
    {
      if (this.getMaximum() < value) {
        this.setMaximum(value);
      }

      if (this.getValue() < value) {
        this.setValue(value);
      } else {
        this._updateButtons();
      }
    },


    /**
     * Apply routine for the maximum property.
     *
     * It sets the value of the spinner to the minimum of the current spinner
     * value and the given max property value.
     *
     * @param value {Number} The new value of the max property
     * @param old {Number} The old value of the max property
     */
    _applyMaximum : function(value, old)
    {
      if (this.getMinimum() > value) {
        this.setMinimum(value);
      }

      if (this.getValue() > value) {
        this.setValue(value);
      } else {
        this._updateButtons();
      }
    },


    // overridden
    _applyEnabled : function(value, old)
    {
      this.base(arguments, value, old);

      this._updateButtons();
    },


    /**
     * Check whether the value being applied is allowed.
     *
     * If you override this to change the allowed type, you will also
     * want to override {@link #_applyValue}, {@link #_applyMinimum},
     * {@link #_applyMaximum}, {@link #_countUp}, {@link #_countDown}, and
     * {@link #_onTextChange} methods as those cater specifically to numeric
     * values.
     *
     * @param value {Any}
     *   The value being set
     * @return {Boolean}
     *   <i>true</i> if the value is allowed;
     *   <i>false> otherwise.
     */
    _checkValue : function(value) {
      return typeof value === "number" && value >= this.getMinimum() && value <= this.getMaximum();
    },


    /**
     * Apply routine for the value property.
     *
     * It checks the min and max values, disables / enables the
     * buttons and handles the wrap around.
     *
     * @param value {Number} The new value of the spinner
     * @param old {Number} The former value of the spinner
     */
    _applyValue: function(value, old)
    {
      var textField = this.getChildControl("textfield");

      this._updateButtons();

      // save the last valid value of the spinner
      this.__lastValidValue = value;

      // write the value of the spinner to the textfield
      if (value !== null) {
        if (this.getNumberFormat()) {
          textField.setValue(this.getNumberFormat().format(value));
        } else {
          textField.setValue(value + "");
        }
      } else {
        textField.setValue("");
      }
    },


    /**
     * Apply routine for the editable property.<br/>
     * It sets the textfield of the spinner to not read only.
     *
     * @param value {Boolean} The new value of the editable property
     * @param old {Boolean} The former value of the editable property
     */
    _applyEditable : function(value, old)
    {
      var textField = this.getChildControl("textfield");

      if (textField) {
        textField.setReadOnly(!value);
      }
    },


    /**
     * Apply routine for the wrap property.<br/>
     * Enables all buttons if the wrapping is enabled.
     *
     * @param value {Boolean} The new value of the wrap property
     * @param old {Boolean} The former value of the wrap property
     */
    _applyWrap : function(value, old)
    {
      this._updateButtons();
    },


    /**
     * Apply routine for the numberFormat property.<br/>
     * When setting a number format, the display of the
     * value in the textfield will be changed immediately.
     *
     * @param value {Boolean} The new value of the numberFormat property
     * @param old {Boolean} The former value of the numberFormat property
     */
    _applyNumberFormat : function(value, old) {
      var textfield = this.getChildControl("textfield");
      textfield.setFilter(this._getFilterRegExp());

      this.getNumberFormat().addListener("changeNumberFormat",
        this._onChangeNumberFormat, this);

      this._applyValue(this.__lastValidValue, undefined);
    },

    /**
     * Returns the element, to which the content padding should be applied.
     *
     * @return {qx.ui.core.Widget} The content padding target.
     */
    _getContentPaddingTarget : function() {
      return this.getChildControl("textfield");
    },

    /**
     * Checks the min and max values, disables / enables the
     * buttons and handles the wrap around.
     */
    _updateButtons : function() {
      var upButton = this.getChildControl("upbutton");
      var downButton = this.getChildControl("downbutton");
      var value = this.getValue();

      if (!this.getEnabled())
      {
        // If Spinner is disabled -> disable buttons
        upButton.setEnabled(false);
        downButton.setEnabled(false);
      }
      else
      {
        if (this.getWrap())
        {
          // If wraped -> always enable buttons
          upButton.setEnabled(true);
          downButton.setEnabled(true);
        }
        else
        {
          // check max value
          if (value !== null && value < this.getMaximum()) {
            upButton.setEnabled(true);
          } else {
            upButton.setEnabled(false);
          }

          // check min value
          if (value !== null && value > this.getMinimum()) {
            downButton.setEnabled(true);
          } else {
            downButton.setEnabled(false);
          }
        }
      }
    },

    /*
    ---------------------------------------------------------------------------
      KEY EVENT-HANDLING
    ---------------------------------------------------------------------------
    */

    /**
     * Callback for "keyDown" event.<br/>
     * Controls the interval mode ("single" or "page")
     * and the interval increase by detecting "Up"/"Down"
     * and "PageUp"/"PageDown" keys.<br/>
     * The corresponding button will be pressed.
     *
     * @param e {qx.event.type.KeySequence} keyDown event
     */
    _onKeyDown: function(e)
    {
      switch(e.getKeyIdentifier())
      {
        case "PageUp":
          // mark that the spinner is in page mode and process further
          this.__pageUpMode = true;

        case "Up":
          this.getChildControl("upbutton").press();
          break;

        case "PageDown":
          // mark that the spinner is in page mode and process further
          this.__pageDownMode = true;

        case "Down":
          this.getChildControl("downbutton").press();
          break;

        default:
          // Do not stop unused events
          return;
      }

      e.stopPropagation();
      e.preventDefault();
    },


    /**
     * Callback for "keyUp" event.<br/>
     * Detecting "Up"/"Down" and "PageUp"/"PageDown" keys.<br/>
     * Releases the button and disabled the page mode, if necessary.
     *
     * @param e {qx.event.type.KeySequence} keyUp event
     * @return {void}
     */
    _onKeyUp: function(e)
    {
      switch(e.getKeyIdentifier())
      {
        case "PageUp":
          this.getChildControl("upbutton").release();
          this.__pageUpMode = false;
          break;

        case "Up":
          this.getChildControl("upbutton").release();
          break;

        case "PageDown":
          this.getChildControl("downbutton").release();
          this.__pageDownMode = false;
          break;

        case "Down":
          this.getChildControl("downbutton").release();
          break;
      }
    },




    /*
    ---------------------------------------------------------------------------
      OTHER EVENT HANDLERS
    ---------------------------------------------------------------------------
    */

    /**
     * Callback method for the "mouseWheel" event.<br/>
     * Increments or decrements the value of the spinner.
     *
     * @param e {qx.event.type.Mouse} mouseWheel event
     */
    _onMouseWheel: function(e)
    {
      var delta = e.getWheelDelta("y");
      if (delta > 0) {
        this._countDown();
      } else if (delta < 0) {
        this._countUp();
      }

      e.stop();
    },


    /**
     * Callback method for the "change" event of the textfield.
     *
     * @param e {qx.event.type.Event} text change event or blur event
     */
    _onTextChange : function(e)
    {
      var textField = this.getChildControl("textfield");
      var value;

      // if a number format is set
      if (this.getNumberFormat())
      {
        // try to parse the current number using the number format
        try {
          value = this.getNumberFormat().parse(textField.getValue());
        } catch(ex) {
          // otherwise, process further
        }
      }

      if (value === undefined)
      {
        // try to parse the number as a float
        value = parseFloat(textField.getValue());
      }

      // if the result is a number
      if (!isNaN(value))
      {
        // Fix range
        if (value > this.getMaximum()) {
          textField.setValue(this.getMaximum() + "");
          return;
        } else if (value < this.getMinimum()) {
          textField.setValue(this.getMinimum() + "");
          return;
        }

        // set the value in the spinner
        this.setValue(value);
      }
      else
      {
        // otherwise, reset the last valid value
        this._applyValue(this.__lastValidValue, undefined);
      }
    },


    /**
     * Callback method for the locale Manager's "changeLocale" event.
     *
     * @param ev {qx.event.type.Event} locale change event
     */

    _onChangeLocale : function(ev)
    {
      if (this.getNumberFormat() !== null) {
        this.setNumberFormat(this.getNumberFormat());
        var textfield = this.getChildControl("textfield");
        textfield.setFilter(this._getFilterRegExp());
        textfield.setValue(this.getNumberFormat().format(this.getValue()));
      }
    },


    /**
     * Callback method for the number format's "changeNumberFormat" event.
     *
     * @param ev {qx.event.type.Event} number format change event
     */
    _onChangeNumberFormat : function(ev) {
      var textfield = this.getChildControl("textfield");
      textfield.setFilter(this._getFilterRegExp());
      textfield.setValue(this.getNumberFormat().format(this.getValue()));
    },




    /*
    ---------------------------------------------------------------------------
      INTERVAL HANDLING
    ---------------------------------------------------------------------------
    */

    /**
     * Checks if the spinner is in page mode and counts either the single
     * or page Step up.
     *
     */
    _countUp: function()
    {
      if (this.__pageUpMode) {
        var newValue = this.getValue() + this.getPageStep();
      } else {
        var newValue = this.getValue() + this.getSingleStep();
      }

      // handle the case where wrapping is enabled
      if (this.getWrap())
      {
        if (newValue > this.getMaximum())
        {
          var diff = this.getMaximum() - newValue;
          newValue = this.getMinimum() + diff;
        }
      }

      this.gotoValue(newValue);
    },


    /**
     * Checks if the spinner is in page mode and counts either the single
     * or page Step down.
     *
     */
    _countDown: function()
    {
      if (this.__pageDownMode) {
        var newValue = this.getValue() - this.getPageStep();
      } else {
        var newValue = this.getValue() - this.getSingleStep();
      }

      // handle the case where wrapping is enabled
      if (this.getWrap())
      {
        if (newValue < this.getMinimum())
        {
          var diff = this.getMinimum() + newValue;
          newValue = this.getMaximum() - diff;
        }
      }

      this.gotoValue(newValue);
    },


    /**
     * Normalizes the incoming value to be in the valid range and
     * applies it to the {@link #value} afterwards.
     *
     * @param value {Number} Any number
     * @return {Number} The normalized number
     */
    gotoValue : function(value) {
      return this.setValue(Math.min(this.getMaximum(), Math.max(this.getMinimum(), value)));
    }
  },


  destruct : function()
  {
    if (qx.core.Environment.get("qx.dynlocale")) {
      qx.locale.Manager.getInstance().removeListener("changeLocale", this._onChangeLocale, this);
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
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/*
#cldr
*/

/**
 * Provides information about locale-dependent number formatting (like the decimal
 * separator).
 */

qx.Class.define("qx.locale.Number",
{
  statics :
  {
    /**
     * Get decimal separator for number formatting
     *
     * @param locale {String} optional locale to be used
     * @return {String} decimal separator.
     */
    getDecimalSeparator : function(locale) {
      return qx.locale.Manager.getInstance().localize("cldr_number_decimal_separator", [], locale)
    },


    /**
     * Get thousand grouping separator for number formatting
     *
     * @param locale {String} optional locale to be used
     * @return {String} group separator.
     */
    getGroupSeparator : function(locale) {
      return qx.locale.Manager.getInstance().localize("cldr_number_group_separator", [], locale)
    },


    /**
     * Get percent format string
     *
     * @param locale {String} optional locale to be used
     * @return {String} percent format string.
     */
    getPercentFormat : function(locale) {
      return qx.locale.Manager.getInstance().localize("cldr_number_percent_format", [], locale)
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

************************************************************************ */

/**
 * Helper functions for numbers.
 *
 * The native JavaScript Number is not modified by this class.
 *
 */
qx.Class.define("qx.lang.Number",
{
  statics :
  {
    /**
     * Check whether the number is in a given range
     *
     * @param nr {Number} the number to check
     * @param vmin {Integer} lower bound of the range
     * @param vmax {Integer} upper bound of the range
     * @return {Boolean} whether the number is >= vmin and <= vmax
     */
    isInRange : function(nr, vmin, vmax) {
      return nr >= vmin && nr <= vmax;
    },


    /**
     * Check whether the number is between a given range
     *
     * @param nr {Number} the number to check
     * @param vmin {Integer} lower bound of the range
     * @param vmax {Integer} upper bound of the range
     * @return {Boolean} whether the number is > vmin and < vmax
     */
    isBetweenRange : function(nr, vmin, vmax) {
      return nr > vmin && nr < vmax;
    },


    /**
     * Limit the number to a given range
     *
     * * If the number is greater than the upper bound, the upper bound is returned
     * * If the number is smaller than the lower bound, the lower bound is returned
     * * If the number is in the range, the number is returned
     *
     * @param nr {Number} the number to limit
     * @param vmin {Integer} lower bound of the range
     * @param vmax {Integer} upper bound of the range
     * @return {Integer} the limited number
     */
    limit : function(nr, vmin, vmax)
    {
      if (vmax != null && nr > vmax) {
        return vmax;
      } else if (vmin != null && nr < vmin) {
        return vmin;
      } else {
        return nr;
      }
    }
  }
});
