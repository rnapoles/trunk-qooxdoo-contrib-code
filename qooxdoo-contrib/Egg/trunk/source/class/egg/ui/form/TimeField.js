/* ************************************************************************

   Copyright:
     2009 Ian Horst
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors: Ian Horst <ian.horst@googlemail.com>

************************************************************************ */

/**
 * 
 */
qx.Class.define("egg.ui.form.TimeField",
{
  extend      : qx.ui.container.Composite,
  implement   : [qx.ui.form.IDateForm],
  
  
  
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */
  
  properties:
  {
    /** 
    value:
    {
      check          : Date,
      apply          : "_applyValue",
      event          : "changeValue"
    },
    */
    /**  */
    format:
    {
      init           : "medium",
      check          : ["short", "medium", "long", "full"],
      nullable       : false
    },
    /**  */
    timeFormat:
    {
      check          : "qx.util.format.DateFormat",
      deferredInit   : true,
      nullable       : false
    }
  },
  
  
  
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Constructor
   * 
   * @param value {Date} 
   * @param format {String}
   */
  construct: function (value, format)
  {
    this.base(arguments);
    this.initTimeFormat(this._createDateFormat());
    this.setAppearance("textfield");

    var layout = new qx.ui.layout.HBox();
    layout.set({alignY: "middle"});
    this.setLayout(layout);
     

    this._createInput();
    
    this.setValue(value);
  },

  
  
  
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
   
  members:
  {
    __hours        : null,
    __minutes      : null,
    __seconds      : null,
    
    __sliderPopup  : null,
    __slider       : null,
      
    // property apply routine
    _applyValue: function (value, old)
    {
	  console.log("_applyValue", value);
      var hours = Math.floor(value / 3600);
      this.__hours.setValue(this.__pad2(hours));
      this.__hours.setUserData("oldValue", Number(hours));
         
      var minutes = Math.floor(value / 60) % 60;
      this.__minutes.setValue(this.__pad2(minutes));
      this.__minutes.setUserData("oldValue", Number(minutes));
      
      var seconds = value % 60;
      this.__seconds.setValue(this.__pad2(seconds));
      this.__seconds.setUserData("oldValue", Number(seconds));
    },
    
    setValue: function (value)
    {
    
    },
    
    getValue: function ()
    {
    	
    },
    
    resetValue: function ()
    {
    	
    },
    
    /**
     * 
     */
    _createInput: function ()
    {
      var slider = new qx.ui.form.Slider("horizontal");
      this.__slider = slider;
      slider.setWidth(240);
      slider.setMinimum(0);
      slider.addListener("changeValue", this._onChangeSliderValue, this);
      
      var sliderPopup = new qx.ui.popup.Popup(new qx.ui.layout.HBox());
      this.__sliderPopup = sliderPopup;
      sliderPopup.add(slider);
      
      this.__hours = this.__createInput(23);
      this.add(new qx.ui.basic.Label(":"));
      this.__minutes = this.__createInput(59);
      this.add(new qx.ui.basic.Label(":"));
      this.__seconds = this.__createInput(59);
    },
    
    /**
     * 
     * @param maximumValue {Number} maximum value
     */
    __createInput: function (maximumValue)
    {
      var input = new qx.ui.form.TextField("00");
      input.set({
        width       : 25,
        appearance  : "widget",
        textAlign   : "center",
        liveUpdate  : true
        });
      input.setFilter(/[0-9]/);
      input.setUserData("maximumValue", maximumValue);
      input.setUserData("oldValue", 0);
      input.addListener("changeValue", this._onChangeValue, this);
      input.addListener("mouseup", this._onMouseUp, this);
      input.addListener("input", this._onInput, this);
      this.add(input);
      return input;
    },
    
    /**
     * 
     * @param e {qx.event.type.Data} e
     */
    _onInput: function (e)
    {
      console.info('_onInput', e.getData(), e.getTarget().getValue());
      this.__sliderPopup.hide();
    
      var input = e.getTarget();
      var value = e.getData();
      if (value == Number(value) && value >= 0 && value <= input.getUserData("maximumValue")) {
        console.debug("valid value");
        input.setUserData("oldValue", value);
      } else {
        console.debug("invalid value", value, input.getUserData("oldValue"));
        input.setValue("" + input.getUserData("oldValue"));
      }
    },
      
    /**
     * 
     * @param e {Object} e
     */
    _onChangeValue: function (e)
    {
      console.info('_onChangeValue', e);
      var input = e.getTarget();
      var newValue = e.getData();
      var oldValue = e.getOldData();
      if (newValue >= 0 && newValue <= input.getUserData("maximumValue")) {
      } else {
        console.log("set old value", oldValue);
        input.setValue(oldValue);
        return;
      }
      
      this.setValue(Number(this.__hours.getValue()) * 3600 
        + Number(this.__minutes.getValue()) * 60
        + Number(this.__seconds.getValue()));
    },
      
    /**
     * 
     * @param e {Object} e
     */
    _onMouseUp: function (e)
    {
      var slider = this.__slider;
      var sliderPopup = this.__sliderPopup;
      
      slider.setUserData("input", e.getTarget());
      slider.setMaximum(e.getTarget().getUserData("maximumValue"));
      slider.setValue(Number(e.getTarget().getValue()));
      sliderPopup.placeToWidget(e.getTarget());
      sliderPopup.show();
    },
      
    /**
     * 
     * @param value {Number|String} value
     * @return padded value
     */
    __pad2: function (value)
    {
      value = Number(value);
      return (value < 10)
        ? "0" + value
        : "" + value;
    },
      
    /**
     * 
     * @param e {Object} e
     */
    _onChangeSliderValue: function (e)
    {
      var input = e.getTarget().getUserData("input");
      input.setValue(this.__pad2(e.getData()));
      input.setUserData("oldValue", e.getData());
    },
      
    /**
     * 
     */
    _createDateFormat: function ()
    {
      var format = this.getFormat();
      return new qx.util.format.DateFormat(
        qx.locale.Date.getTimeFormat(format).toString());
    }
  }
});
