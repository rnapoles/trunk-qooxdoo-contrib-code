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

#asset(ofc_js/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "ofc_js"
 */
qx.Class.define("ofc_js.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
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
        "Open Flash Chart (OFC). It creates a chart structure with the JavaScript API from OFC. " +
        "Fore more details about the structure, have a look at the <a href='" + 
        "http://teethgrinder.co.uk/open-flash-chart-2/' target='_blank'>" +
        "Open Flash Chart</a> project."));

      var chart = new openflashchart.Chart();
      container.add(chart, {flex: 1});
      
      var bar = new ofc_bar();
      bar.set_values([9,8,7,6,5,4,3,2,1]);

      var title = new ofc_title("Test", "{font-size: 20px; " + 
        "font-family: Times New Roman; font-weight: bold; color: #A2ACBA; text-align: center;}");

      var chartData = new ofc_chart();
      chartData.set_title(title);
      chartData.add_element(bar);
      chart.load(chartData);
    }
  }
});
