/* ************************************************************************

   Copyright:
     2009 Ian Horst
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors: Ian Horst <ian.horst@googlemail.com>

************************************************************************ */

// jqPlot plugins disabled by default
$.jqplot.config.enablePlugins = false;

/**
 * Draws a plot.
 * 
 * EXPERIMENTAL!
 * 
 * This class depends on jqPlot
 * * http://www.jqplot.com/
 * * http://bitbucket.org/cleonello/jqplot/wiki/Home
 *
 * TODO list
 * * Currently expects jQuery & jqPlot files to be included already.
 *   Lazy loading of jQuery & jqPlot files?
 * * Convert data & options to qooxdoo models by {@link qx.data.marshal.Json}
 * * How easy would be to remove jQuery?
 *  
 */
qx.Class.define("egg.ui.plot.Plot",
{
  extend: qx.ui.container.Composite,
  



  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties:
  {
    /** plot data */
    data:
    {
      init: null,
      nullable: true,
      check: "Object",
      apply: "_applyData"
    },
    /** plot options */
    options:
    {
      init: null,
      nullable: true,
      check: "Object",
      apply: "_applyOptions"
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
   * @param data {map ? null} data map
   * @param options {map ? null} options map 
   */
  construct: function (data, options)
  {
    this.base(arguments);
    this.setLayout(new qx.ui.layout.Dock());
    
    data && this.setData(data);
    options && this.setOptions(options);

    this.addListenerOnce("appear", this.__appearHandler, this);
    this.addListener("resize", this.__plot, this);
  },
  



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members:
  {
    __jqPlot: null,
    
    // property modifier
    _applyData: function (value, old)
    {
      //TODO: not implemented yet
    },
    
    // property modifier
    _applyOptions: function (value, old)
    {
      //TODO: not implemented yet
    },
    
    /**
     * Initializes jqPlot when div container is available
     * 
     * @param e {qx.event.type.Event}
     */
    __appearHandler: function (e)
    {
      var id = "jqplot_" + this.toHashCode();
      var div = this.getContainerElement().getDomElement();
      qx.bom.element.Attribute.set(div, "id", id);
      this.__jqPlot = $.jqplot(id, this.getData(), this.getOptions());
    },
    
    /**
     * Draws a plot
     * 
     * @param e {qx.event.type.Event}
     */
    __plot: function (e)
    {
      if (this.__jqPlot) {
        this.__appearHandler();
      }  
      // wait when dom element is resized and then draw a plot
      var timer = qx.util.TimerManager.getInstance();
      timer.start(function(userData, timerId) {this.__jqPlot && this.__jqPlot.replot();}, 0, this, null, 0);
    }
  }
})
