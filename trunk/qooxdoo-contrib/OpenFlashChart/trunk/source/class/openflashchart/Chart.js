/* ************************************************************************

   Copyright:
     2009 ACME Corporation -or- Your Name, http://www.example.com
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Your Name (username)

************************************************************************ */

/* ************************************************************************

#asset(openflashchart/open-flash-chart.swf)
#asset(openflashchart/empty.json)

************************************************************************ */
/**
 * This is the main class of contribution "OpenFlashChart"
 * 
 * TODO: Replace the sample code of a custom button with the actual code of 
 * your contribution.
 * 
 */
qx.Class.define("openflashchart.Chart",
{
  extend : qx.ui.embed.Flash,

  construct : function()
  {
    this.base(arguments, "openflashchart/open-flash-chart.swf");
    
    var initData = qx.util.ResourceManager.getInstance().toUri("openflashchart/empty.json");
    this.setVariables({"data-file": initData});
  },

  members :
  {
    load : function(data)
    {
      var chart = this.getFlashElement();
      
      if (chart != null && chart.load != null) {
        chart.load(qx.lang.Json.stringify(data));
      } else {
        this.__deferredLoad(data);
      }
    },
    
    __deferredLoad : function(data) {
      qx.event.Timer.once(function() {
        this.load(data);
      }, this, 200);
    }
  }
});