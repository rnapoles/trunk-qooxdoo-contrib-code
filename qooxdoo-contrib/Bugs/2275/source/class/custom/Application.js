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

/* ************************************************************************

#asset(qx/icon/${qx.icontheme}/48/devices/*)

************************************************************************ */

qx.Class.define("custom.Application",
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
      
      var scroller = this.getWidgetCellSpanScroller();
      this.getRoot().add(scroller, {row: edge: 0});   
    }   
    
    
    getWidgetCellSpanScroller : function()
    {
      var scroller = new qx.ui.virtual.core.Scroller(1000, 100, 50, 120);
      var pane = scroller.getPane();
      
      var spanLayer = new qx.ui.virtual.layer.WidgetCellSpan(
        this,
        pane.getRowConfig(),
        pane.getColumnConfig()
      );      
      spanLayer.setCellSpan(1, 1, 2, 2);
      spanLayer.setCellSpan(1, 5, 3, 3);
      spanLayer.setCellSpan(7, 4, 2, 4);
      spanLayer.setCellSpan(6, 0, 10, 2);
      spanLayer.setCellSpan(10, 9, 10, 5);
      spanLayer.setCellSpan(11, 3, 6, 3);
      
      scroller.getPane().addLayer(spanLayer);
      
      this._pool = [];
      
      return scroller;      
    },
    
    getCellWidget : function(row, column)
    {  
      var widget = this._pool.pop() || new qx.ui.basic.Atom().set({
        allowGrowX: true
      });
      widget.set({
        //backgroundColor: (row + column) % 2 == 0 ? "yellow" : "green",
        label: row + "x" + column,
        icon: "icon/48/devices/camera-web.png",
        padding: 3,
        decorator: "table-scroller-header"
      });
      return widget;
    },
    
    poolCellWidget : function(widget) {
      this._pool.push(widget);
    }
  }
});
