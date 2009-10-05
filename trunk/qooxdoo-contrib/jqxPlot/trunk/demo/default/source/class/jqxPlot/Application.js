/* ************************************************************************

   Copyright:
       2009 by Fritz Zaucker

   License:
       LGPL: http://www.gnu.org/licenses/lgpl.html
       EPL:  http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
       Fritz Zaucker, Oetiker+Partner AG, CH-4600 Olten, http://www.oetiker.ch

************************************************************************ */

qx.Class.define("jqxPlot.Application",
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
        // Call super class
        this.base(arguments);

        // Enable logging in debug variant
        if (qx.core.Variant.isSet("qx.debug", "on")) {
            // support native logging capabilities, e.g. Firebug for Firefox
            qx.log.appender.Native;
            // support additional cross-browser console. Press F7 to toggle visibility
            qx.log.appender.Console;
	}

        // Document is the application root
        var doc = this.getRoot();

        var graphBox =
        new qx.ui.container.Composite(new qx.ui.layout.VBox(20));
        graphBox.setPadding(20);

        var graphCanvas =
            new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({
                                       padding: 20,
                                       width:500,
                                       height:400});

        var graphSelect = new qx.ui.form.SelectBox();
        graphSelect.setMaxWidth(100);
        graphSelect.add(new qx.ui.form.ListItem('*** Select ***'));
        graphSelect.add(new qx.ui.form.ListItem('Pie chart'));
        graphSelect.add(new qx.ui.form.ListItem('Bar graph'));

        graphBox.add(graphSelect);
        graphBox.add(graphCanvas);
        doc.add(graphBox);

        var myGraph = null;
        graphSelect.addListener("changeSelection", function(e) {
 	    var graphType = e.getData()[0].getLabel();
	    var dom = graphCanvas.getContainerElement().getDomElement();
	    qx.bom.element.Attribute.set(dom, 'id', 'jqxPlotBox');
 	    var title = 'Testing jqPlot with qooxdoo';

            switch (graphType) {
	      case 'Bar graph':
	      var data = [ [500, 350], [200, 300], [800, 800], [900, 650], [400, 100] ];
	      var labels = [ {label: 'frogs'}, {label: 'buzzards'}, {label: 'cows'}, {label: 'deer'}, {label: 'mice'}];
	      var xLabels = ['2005', '2009'];
              myGraph =
                  jQuery.jqplot('jqxPlotBox', data,
                              { title: { text: title, fontSize: '12pt'},
				legend: {show: true, location: 'ne', fontSize: '8pt'},
                                seriesDefaults: {
                                    renderer: jQuery.jqplot.BarRenderer,
                                    rendererOptions: {barPadding: 8, barMargin: 20}
                                },
                                series: labels,
                                axes: {
                                    xaxis: {tickOptions: { enableFontSupport: true,
							   fontFamily: 'Georgia',
							   fontSize: '10pt' },
                                            renderer: jQuery.jqplot.CategoryAxisRenderer,
                                            ticks: xLabels,
                                            enableFontSupport: true,
                                            fontSize: '10pt'
					   },
                                    yaxis: { min: 0, max: 1100, numberTicks: 12,
					     tickOptions: { enableFontSupport: true,
							    fontFamily: 'Georgia',
							    fontSize: '10pt' },
					     labelRenderer: jQuery.jqplot.CanvasAxisLabelRenderer,
                                             labelOptions: { enableFontSupport: true,
							     fontFamily: 'Georgia',
							     fontSize: '12pt' },
					     label: 'y-axis',
                                             fontSize: '10pt'
					   }
                                },
                                cursor: { zoom: true, showTooltip: true,
					  followMouse: true, clickReset: true
					}
                              }
		  );
	        break;

	      case 'Pie chart':
		var data = [ ['frogs', 500], ['buzzards', 200], ['cows', 800], ['deer', 900], ['mice', 400] ];

 	        myGraph =
                  jQuery.jqplot('jqxPlotBox', [data],
                                { title: { text: title, fontSize: '12pt'},
                                  seriesDefaults: {
                                    renderer:        jQuery.jqplot.PieRenderer,
                                    rendererOptions: { sliceMargin: 8 }
                                  },
                                  legend: {show: true, fontSize: '8pt'},
                                  // disable zoom
                                  cursor: {zoom:false, showTooltip:false}
                              });
		break;

	      default:
	        break;
	    }
	    myGraph.redraw();
	}, this);


    }
  }
});
