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
   
   /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  
   properties:
   {
      /**  */
      value:
      {
         check          : "Integer",
         init           : 0,
         apply          : "_applyValue",
         event          : "changeValue"
      },
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

   construct: function (value, format)
   {
      this.base(arguments);
      this.initTimeFormat(this._createDateFormat());
      this.setAppearance("textfield");
 
      var layout = new qx.ui.layout.HBox();
      layout.set({alignY: "middle"});
      this.setLayout(layout);
      

      this._createInput();
      
      if (value == undefined) {
         var value = 0;
      }

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
            textAlign   : "center"
            });
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
         this.__sliderPopup.hide();

         var input = e.getTarget();
         var value = e.getData();

         if (value == Number(value) &&
         value >= 0 && value <= input.getUserData("maximumValue")) {
            input.setUserData("oldValue", value)
         } else {
            input.setValue("" + input.getUserData("oldValue"));
         }
      },
      
      /**
       * 
       * @param e {Object} e
       */
      _onChangeValue: function (e)
      {
         var hours = this.__hours;
         var minutes = this.__minutes;
         var seconds = this.__seconds;
         this.setValue(Number(hours.getValue()) * 3600 
            + Number(minutes.getValue()) * 60
            + Number(seconds.getValue()));
      },
      
      /**
       * 
       * @param e {Object} e
       */
      _onMouseUp: function (e)
      {
         this.__slider.setUserData("input", e.getTarget());
         this.__slider.setMaximum(e.getTarget().getUserData("maximumValue"));
         this.__slider.setValue(Number(e.getTarget().getValue()));
         this.__sliderPopup.placeToWidget(e.getTarget());
         this.__sliderPopup.show();
      },
      
      /**
       * 
       * @param value {Number|String} value
       * @return padded value
       */
      __pad2: function (value)
      {
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
