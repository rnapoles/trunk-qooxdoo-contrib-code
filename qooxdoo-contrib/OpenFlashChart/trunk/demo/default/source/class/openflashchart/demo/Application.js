/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2010 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Hagendorn (chris_schmidt)

************************************************************************ */

/* ************************************************************************

#asset(openflashchart/demo/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "openflashchart"
 */
qx.Class.define("openflashchart.demo.Application",
{
  extend : qx.application.Standalone,


  members :
  {
    __label : null,


    __data : null,


    /**
     * This method contains the initial application code and gets called
     * during startup of the application
     *
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      this.base(arguments);

      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      if (location.protocol == "file:")
      {
        alert("This demo can only be used from a web server. Please make sure that "
          + "this HTML page is loaded from a web server and not from the file system.");
        return
      }

      var container = new qx.ui.container.Composite(new qx.ui.layout.VBox(8));
      this.getRoot().add(container, {edge: 20});

      var url = qx.util.ResourceManager.getInstance().toUri("openflashchart/demo/data.json.txt");
      container.add(new qx.ui.embed.Html("This demo shows how to use a qooxdoo based wrapper for " +
        "Open Flash Chart. It loads a <a href='" + url + "' target='_blank'>JSON</a> configuration file " +
        "for Open Flash Chart and configure the chart. Fore more details about the JSON file structure, " +
        "have a look at the <a href='http://teethgrinder.co.uk/open-flash-chart-2/' target='_blank'>" +
        "Open Flash Chart</a> project."));

      this.__label = new qx.ui.basic.Label("Please click on one item.");
      container.add(this.__label);

      var chart = new openflashchart.Chart();
      container.add(chart, {flex: 1});

      url = qx.util.ResourceManager.getInstance().toUri("openflashchart/demo/data.json");
      var request = new qx.io.remote.Request(url, "GET", "application/json");

      request.addListener("completed", function(e) {
        this.__data = e.getContent();
        chart.load(this.__data);
      }, this);

      request.send();
    },


    /**
     * This is the callback method which is configured in the data.json file.
     *
     * @param index {Integer} The clicked index from the data.
     */
    onLineOneClick : function(index) {
      var line = this.__data.elements[0];
      this.__log(line.text, line.values[index]);
    },


    /**
     * This is the callback method which is configured in the data.json file.
     *
     * @param index {Integer} The clicked index from the data.
     */
    onLineTwoClick : function(index) {
      var line = this.__data.elements[1];
      this.__log(line.text, line.values[index]);
    },


    /**
     * Helper method to log the clicked value from a line.
     *
     * @param line {String} The clicked line name.
     * @param value {Number} The clicked value.
     */
    __log : function(line, value) {
      this.__label.setValue(line + " -> " + value + " clicked.");
    }
  }
});
