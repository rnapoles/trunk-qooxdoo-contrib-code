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

#asset(qxpub/*)

************************************************************************ */

/**
 * Qooxdoo OpenAjax Publisher
 * 
 * Demo application that shows how to use qooxdoo to create a web gadget
 * compatible with the OpenAjax Alliance's Sample Mashup Application.
 * 
 * Demonstrates connecting to an existing OpenAjax hub and publishing messages
 * through topics and properties. 
 */
qx.Class.define("qxpub.Application",
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
      
      // the name of the topic we want to publish
      this.__topic = "org.qooxdoo.oaa.testmsg";
      
      // check if the gadget wrapper is ready
      try {
        this.qxwrapper = qxpubwrapper;
        // get the connection handle from the hub        
        this.hubConnection = this.qxwrapper.wrapper.getHubConnectionHandle();
      } catch(e) {
        this.error("Couldn't find qxwrapper object: " + e);
      }
 
      var doc = this.getRoot();
      var container = new qx.ui.container.Composite(new qx.ui.layout.VBox);
      doc.add(container);
      
      // add a text field
      var topicLabel = new qx.ui.basic.Label("Text in this field is published through a topic");
      var topicField = new qx.ui.form.TextField("topic message value");
      
			// add an input event listener to the field
      topicField.addListener("input", this.__publishTopicValue, this)
      
      container.add(topicLabel);
      container.add(topicField);
      
      // add a slider control
      var propLabel = new qx.ui.basic.Label("This slider's value is published through a property");
      var propSlider = new qx.ui.form.Slider;
      
      // set the slider's value range, stepping and initial value      
      propSlider.setMinimum(-100);
      propSlider.setMaximum(100);
      propSlider.setSingleStep(10);
      propSlider.slideTo(0);
      
      // add a changeValue event listener to the slider
      propSlider.addListener("changeValue", this.__publishPropValue, this);
      
      container.add(propLabel);
      container.add(propSlider);      
      
    },
    
    /*
     * Publishes the current value of topicField through the hub connection
     */
    __publishTopicValue: function(e)
    {
      // get the value from the event
      var newTopicMsg = e.getData();
      if (!e.getData()) {
        this.error("no topic message to publish");
      } else {
        this.debug("publishing topic: " +  newTopicMsg);
                
        // broadcast the message over our topic
        this.hubConnection.publish(this.__topic, newTopicMsg);
        
      }
    },
    /*
     * Updates the hub's "propertytest" property
     */
    __publishPropValue: function(e)
    { 
      // get the value from the event's target, i.e. the slider
      var newPropMsg = e.getTarget().getValue();
      if (newPropMsg === null) {
        this.error("no property value message to publish");
      } else {
        this.debug("publishing property: " +  newPropMsg);
        // change the hub's property value
        this.qxwrapper.wrapper.setPropertyValue("propertytest", newPropMsg);
        
      }
    }
  }
});
