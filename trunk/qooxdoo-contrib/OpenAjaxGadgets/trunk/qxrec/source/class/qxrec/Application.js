/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Author:
     * Daniel Wagner (d_wagner)

************************************************************************ */

/* ************************************************************************

#asset(qxrec/*)

************************************************************************ */

/**
 * Qooxdoo OpenAjax Receiver
 * 
 * Demo application that shows how to use qooxdoo to create a web gadget
 * compatible with the OpenAjax Alliance's Sample Mashup Application.
 * 
 * Demonstrates connecting to an existing OpenAjax hub and receiving messages
 * through topics and properties. 
 */
qx.Class.define("qxrec.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }
      
      // the name of the topic we want to subscribe to
      this.__topic = "org.qooxdoo.oaa.testmsg";
      
      // the name of the property change event we want to listen to
      this.__propFuncName = "onPropertytestChange";
      
      // check if the gadget wrapper is ready
      try {
        this.qxwrapper = qxrecwrapper;
        // get connection handle from the hub
        var hubConnection = this.qxwrapper.wrapper.getHubConnectionHandle();
      } catch(e) {
        this.error("Couldn't find qxwrapper object: " + e);
        return
      }      
      
      var doc = this.getRoot();
      var container = new qx.ui.container.Composite(new qx.ui.layout.VBox);
      doc.add(container);
			
      // add an input field
      var topicLabel = new qx.ui.basic.Label("This field listens to a topic");
      this.topicField = new qx.ui.form.TextField("Waiting for message...");
      
      container.add(topicLabel);
      container.add(this.topicField);
      
      // add slider
      var propLabel = new qx.ui.basic.Label("This slider listens to a property");
      this.propSlider = new qx.ui.form.Slider;
      this.propSlider.setSingleStep(10);
      this.propSlider.setMinimum(-100);
      this.propSlider.setMaximum(100);
      this.propSlider.slideTo(0);
      this.propSlider.setEnabled(false);
      
      container.add(propLabel);
      container.add(this.propSlider);                        
      
      // subscribe to message topic       
      hubConnection.subscribe( this.__topic, function(){}, this.attach(this, this.messageHandler) );
      
      // assign a function to the hub's onPropertyNameChange method
      self = this;      
      this.qxwrapper[this.__propFuncName] = function(propertyValue)
      {
        self.propSlider.slideTo(propertyValue); 
      }
      
    },
    
    /**
     * Return a method that is executed in the given scope to make sure callback
     * functions have the proper context
     */ 
    attach : function(scope, method) 
    {      
      return function() 
      { 
        return method.apply(scope, arguments || []); 
      }
    },
    
    /**
     * Callback function: Update the text field with the new property value
     */  
    messageHandler : function(subHandle, topic, data) {
      this.topicField.setValue(data);
    }
  }
});
