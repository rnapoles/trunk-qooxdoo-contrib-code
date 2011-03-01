/* ************************************************************************
   Copyright: Public Domain
   Author: Tobi Oetiker
************************************************************************ */
qx.Class.define("qxextjscharts.demo.Application", {
    extend : qx.application.Standalone,
    members : {
        main : function() {
            this.base(arguments);
            if (qx.core.Variant.isSet("qx.debug", "on")) {
                qx.log.appender.Native;
                qx.log.appender.Console;
            }
            this.addStack();
            this.addSpider();
            this.addBars();

        },
        generateData: function(n){
            var months = ['January','February','March','April','Mai','June','July','August','September','October','November','December'];
            var data = [],
                p = (Math.random() *  11) + 1,
                i;
            for (i = 0; i < (n || 12); i++) {
                data.push({
                    name: months[i % 12],
                    data1: Math.floor(Math.max((Math.random() * 100), 20)),
                    data2: Math.floor(Math.max((Math.random() * 100), 20)),
                    data3: Math.floor(Math.max((Math.random() * 100), 20)),
                    data4: Math.floor(Math.max((Math.random() * 100), 20)),
                    data5: Math.floor(Math.max((Math.random() * 100), 20)),
                    data6: Math.floor(Math.max((Math.random() * 100), 20)),
                    data7: Math.floor(Math.max((Math.random() * 100), 20)),
                    data8: Math.floor(Math.max((Math.random() * 100), 20)),
                    data9: Math.floor(Math.max((Math.random() * 100), 20))
                });
            }
            return data;
        },
        addBars: function(){            
            var win = new qx.ui.window.Window("Grouped Bars").set({
                layout: new qx.ui.layout.Grow(),
                width: 400,
                height: 700,
                showMinimize: false,
                showClose: false,
                contentPadding: 0
             });
             win.moveTo(90,140)
             win.open();
             var data = this.generateData();
             var chart = new qxextjscharts.Chart(function(Ext){ return {
                animate: true,
                store: Ext.create('Ext.data.JsonStore', {
                    fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
                    data: data
                }),
                shadow: true,
                legend: {
                  position: 'right'  
                },
                axes: [{
                    type: 'Numeric',
                    position: 'bottom',
                    fields: ['data1', 'data2', 'data3'],
                    minimum: 0,
                    label: {
                        renderer: Ext.util.Format.numberRenderer('0,0')
                    },
                    grid: true,
                    title: 'Number of Hits'
                }, {
                    type: 'Category',
                    position: 'left',
                    fields: ['name'],
                    title: 'Month of the Year'
                }],
                series: [{
                    type: 'bar',
                    axis: 'bottom',
                    xField: 'name',
                    yField: ['data1', 'data2', 'data3']
                }]
            }});
            win.add(chart);
        },
        addStack: function(){            
            var win = new qx.ui.window.Window("Stacked Areas").set({
                layout: new qx.ui.layout.Grow(),
                width: 600,
                height: 500,
                showMinimize: false,
                showClose: false,
                contentPadding: 0
             });
             win.moveTo(30,30)
             win.open();
             var data = this.generateData();
             var chart = new qxextjscharts.Chart(function(Ext){ return {
                animate: true,
                store: Ext.create('Ext.data.JsonStore', {
                    fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
                    data: data
                }),
                legend: {
                    position: 'bottom'
                },
                axes: [{
                    type: 'Numeric',
                    grid: true,
                    position: 'left',
                    fields: ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7'],
                    title: 'Number of Hits',
                    grid: {
                        odd: {
                            opacity: 1,
                            fill: '#ddd',
                            stroke: '#bbb',
                            'stroke-width': 1
                        }
                    },
                    minimum: 0,
                    adjustMinimumByMajorUnit: 0
                }, {
                    type: 'Category',
                    position: 'bottom',
                    fields: ['name'],
                    title: 'Month of the Year',
                    grid: true,
                    label: {
                        rotate: {
                            degrees: 315
                        }
                    }
                }],
                series: [{
                    type: 'area',
                    highlight: true,
                    axis: 'left',
                    xField: 'name',
                    yField: ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7'],
                    style: {
                        opacity: 0.93
                    }
                 }]
            }});
            win.add(chart);
        },
        addSpider: function(){            
            var win = new qx.ui.window.Window("Spider Chart").set({
                layout: new qx.ui.layout.Grow(),
                width: 700,
                height: 500,
                showMinimize: false,
                showClose: false,
                contentPadding: 0
             });
             win.moveTo(80,80)
             win.open();
             var data = this.generateData();
             var chart = new qxextjscharts.Chart(function(Ext){ return {
                theme: 'Category2',
                animate: true,
                store: Ext.create('Ext.data.JsonStore', {
                    fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
                    data: data
                }),
                insetPadding: 20,
                legend: {
                    position: 'right'
                },
                axes: [{
                    type: 'Radial',
                    position: 'radial',
                    label: {
                        display: true
                    }
                }],
                series: [{
                    type: 'radar',
                    xField: 'name',
                    yField: 'data1',
                    showInLegend: true,
                    showMarkers: true,
                    markerCfg: {
                        radius: 5,
                        size: 5
                    },
                    style: {
                        'stroke-width': 2,
                        fill: 'none'
                    }
                },{
                    type: 'radar',
                    xField: 'name',
                    yField: 'data2',
                    showInLegend: true,
                    showMarkers: true,
                    markerCfg: {
                        radius: 5,
                        size: 5
                    },
                    style: {
                        'stroke-width': 2,
                        fill: 'none'
                    }
                },{ 
                    type: 'radar',
                    xField: 'name',
                    yField: 'data3',
                    showMarkers: true,
                    showInLegend: true,
                    markerCfg: {
                        radius: 5,
                        size: 5
                    },
                    style: {
                        'stroke-width': 2,
                        fill: 'none'
                    }
                }]
            }});
            win.add(chart);
        }
    }
});

