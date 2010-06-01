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

#asset(openflashchart/open-flash-chart.swf)
#asset(openflashchart/empty.json)

************************************************************************ */
/**
 * qooxdoo based wrapper for the Open Flash Chart (OFC) charting solution.
 *
 * The OFC uses a Flash movie to render the chart. The chart is described in
 * a JSON file structure, the definition is defined from OFC and could be found
 * on the <a href="http://teethgrinder.co.uk/open-flash-chart-2/" target="_blank">
 * project homepage</a>.
 *
 * To {@link #load} method can be used to load the JSON structure into the Flash movie.
 */
qx.Class.define("openflashchart.Chart",
{
  extend : qx.ui.embed.Flash,

  /**
   * Constructs the wrapper class.
   */
  construct : function()
  {
    this.base(arguments, "openflashchart/open-flash-chart.swf");

    var initData = qx.util.ResourceManager.getInstance().toUri("openflashchart/empty.json");
    this.setVariables({"data-file": initData});
  },

  members :
  {
    /**
     * Loads the Flash movie with the passed JSON structure. The chart definition
     * could be found on the Open Flash chart <a href="http://teethgrinder.co.uk/open-flash-chart-2/" target="_blank">
     * project homepage</a>.
     *
     * @param data {Object} Object which describes the chart to draw.
     */
    load : function(data)
    {
      var chart = this.getFlashElement();

      if (chart != null && chart.load != null) {
        chart.load(qx.lang.Json.stringify(data));
      } else {
        this.__deferredLoad(data);
      }
    },

    /**
     * Loads the data deferred this is needed, when the movie is not ready at runtime.
     *
     * @param data {Object} Object which describes the chart to draw.
     */
    __deferredLoad : function(data) {
      qx.event.Timer.once(function() {
        this.load(data);
      }, this, 200);
    }
  }
});