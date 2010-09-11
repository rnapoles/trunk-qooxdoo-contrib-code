/* ************************************************************************
   Copyright: Public Domain
   Author: Tobi Oetiker
************************************************************************ */
qx.Class.define("qxprotovis.demo.Application", {
    extend : qx.application.Standalone,
    members : {
        main : function() {
            this.base(arguments);
            if (qx.core.Variant.isSet("qx.debug", "on")) {
                qx.log.appender.Native;
                qx.log.appender.Console;
            }
            this.addLesMiserable();
            this.addBzr();
            this.addChart();
            this.addStack();
        },
        addLesMiserable: function(){            
            var win = new qx.ui.window.Window("Les Misèrable").set({
                layout: new qx.ui.layout.Grow(),
                width: 300,
                height: 300,
                showMinimize: false,
                showClose: false,
                contentPadding: 0
             });
             win.moveTo(30,30)
             win.open();
            
            var chart = new qxprotovis.Panel();
            win.add(chart);

            var pv = chart.getPv();
            var vis = chart.getPanel()
                .event("mousedown", pv.Behavior.pan())
                .event("mousewheel", pv.Behavior.zoom(3));

            var colors = pv.Colors.category19();
            var force = vis.add(pv.Layout.Force)
                .nodes(miserables.nodes)
                .links(miserables.links); 
           
            force.link.add(pv.Line);

            force.node.add(pv.Dot)
                .size(function(d){ return (d.linkDegree + 4) * Math.pow(this.scale, -1.5)})
                .fillStyle(function(d){return d.fix ? "brown" : colors(d.group)})
                .strokeStyle(function(){return this.fillStyle().darker()})
                .lineWidth(1)
                .title(function(d){return d.nodeName})
                .event("mousedown", pv.Behavior.drag())
                .event("drag", force);
        },
        addBzr: function(){
            var win = new qx.ui.window.Window("Belousov-Zhabotinsky").set({
                layout: new qx.ui.layout.Grow(),
                width: 300,
                height: 300, 
                showMinimize: false,
                showClose: false,
                contentPadding: 0
            });
            win.moveTo(340,30)
            win.open();

            var chart = new qxprotovis.Panel();
            win.add(chart);

            var pv = chart.getPv();
            var trans = new pv.Transform;
        
            var vis = chart.getPanel();
            var visResize = function(){
                vis.transform(trans.scale(Math.max(win.getWidth(),win.getHeight())/100));
            }
            win.addListener('resize',visResize);
            visResize();
            vis.add(pv.Image)
                .def("init", function(){return bzr.update()})
                .imageWidth(bzr.size)
                .imageHeight(bzr.size)
                .image(bzr.color)
                .event("click", function(){return bzr.reset()});

            setInterval(function(){return vis.render()}, 1000);
        },
        addChart: function(){            
            var win = new qx.ui.window.Window("Bar Chart").set({
                layout: new qx.ui.layout.Grow(),
                width: 610,
                height: 300,
                showMinimize: false,
                showClose: false,
                contentPadding: 0
             });
             win.moveTo(30,340)
             win.open();
            
            var chart = new qxprotovis.Panel();
            win.add(chart);

            var pv = chart.getPv();
            var data = pv.range(10).map(function(d) { return Math.random() + .1; });
            var vis = chart.getPanel()
                .bottom(20)
                .left(20)
                .right(10)
                .top(5)
                .def("i", -1);            

            var x = pv.Scale.linear(0, 1.1).range(0, 570);
            var y = pv.Scale.ordinal(pv.range(10)).splitBanded(0, 230, 4/5);
            win.addListener('resize',function(e){
                var s=e.getData();
                x.range(0,s.width-30);
                y.splitBanded(0,s.height-50,4/5);
                vis.render();
            });
            var bar = vis.add(pv.Bar)
               .data(data)
               .top(function(){return y(this.index)})
               .height(function(){return y.range().band})
               .left(0)
               .width(x)
               .fillStyle(function(){return vis.i() == this.index ? "orange" : "steelblue"})
               .event("mouseover", function(){return vis.i(this.index)})
               .event("mouseout", function(){return vis.i(-1)});

            /* The value label. */
            bar.anchor("right").add(pv.Label)
                .textStyle("white")
                .text(function(d){return d.toFixed(2)});

            /* The variable label. */
            bar.anchor("left").add(pv.Label)
                .textMargin(5)
                .textAlign("right")
                .text(function(){return "ABCDEFGHIJK".charAt(this.index)});

            /* X-axis ticks. */
            vis.add(pv.Rule)
                .data(function(){return x.ticks(5)})
                .left(x)
                .strokeStyle(function(d){return d ? "rgba(255,255,255,.3)" : "#000"})
            .add(pv.Rule)
                .bottom(0)
                .height(5)
                .strokeStyle("#000")
            .anchor("bottom").add(pv.Label)
                .text(x.tickFormat);
            
        },
        addStack: function(){
            var win = new qx.ui.window.Window("Bar Chart").set({
                layout: new qx.ui.layout.Grow(),
                width: 300,
                height: 610,
                showMinimize: false,
                showClose: false,
                contentPadding: 0
             });
             win.moveTo(650,30)
             win.open();
            
            var chart = new qxprotovis.Panel();
            win.add(chart);
            var pv = chart.getPv();
            var data = pv.range(4).map(function() {
                return pv.range(0, 10, .1).map(function(x) {
                    return {x: x, y: Math.sin(x) + Math.random() * .5 + 2};
                });
            });

            var vis = chart.getPanel()
                .bottom(20)
                .left(20)
                .right(10)
                .top(15);

            var x = pv.Scale.linear(0, 9.9).range(0, 270);
            var y = pv.Scale.linear(0, 14).range(0, 520);

            win.addListener('resize',function(e){
                var s=e.getData();
                x.range(0,s.width-30);
                y.range(0,s.height-80);
                vis.render();
            });

                

            /* The stack layout. */
            var layer = vis.add(pv.Layout.Stack)
                .layers(data)
                .x(function(d){return x(d.x)})
                .y(function(d){return y(d.y)})
                .layer;
            var area = layer.add(pv.Area);
            

            vis.add(pv.Rule)
                .data(function(){return x.ticks()})
                .left(x)
                .top(-4)
                .bottom(-4)
                .strokeStyle(function(d){ return d ? "rgba(128,128,128,.2)" : "#000"})
             .anchor("bottom").add(pv.Label)
                .text(x.tickFormat);

            /* Y-axis and ticks. */
            vis.add(pv.Rule)
                .data(function(){return y.ticks()})
                .bottom(y)
                .left(-4)
                .right(-4)
                .strokeStyle(function(d){return d ? "rgba(128,128,128,.2)" : "#000"})
              .anchor("left").add(pv.Label)
                .text(y.tickFormat);

            var shiftData = function(){
                data.forEach(function(col){
                    col.shift();
                    var x = col[col.length-1].x + 0.1;   
                    col.push({
                        x: x, 
                        y: Math.sin(x) + Math.random() * .5 + 2
                    });
                });
                x.domain(data[0][0].x,data[0][data[0].length-1].x);                    
                vis.render();
            };
            setInterval(shiftData, 400);
        }
    }
});


/*
 * Simulation of a Belousov-Zhabotinsky reaction using a two-dimensional
 * cellular automaton. This algorithm is based on the work of Nitori Kawashiro;
 * see http://www.nitorijournal.org/?p=2109.
 */

var bzr = {};

bzr.color = function(x, y) {
  var p = y * bzr.size + x;
  return {r: bzr.a[p] * 255, g: bzr.b[p] * 255, b: bzr.c[p] * 255, a: 255};
};

bzr.reset = function(n) {
  if (!arguments.length) n = bzr.size;
  var a = bzr.a = [],
      b = bzr.b = [],
      c = bzr.c = [];
  bzr.size = n;
  for (var y = 0, p = 0; y < n; y++) {
    for (var x = 0; x < n; x++, p++) {
      a[p] = Math.random();
      b[p] = Math.random();
      c[p] = Math.random();
    }
  }
};

bzr.update = function() {
  var a = bzr.a.slice(),
      b = bzr.b.slice(),
      c = bzr.c.slice(),
      n = bzr.size;
  for (var y = 0, p = 0; y < n; y++) {
    for (var x = 0; x < n; x++, p++) {

      /* Compute neighbor averages, with wrap-around. */
      var sa = 0, sb = 0, sc = 0;
      for (var j = y - 1; j < y + 2; j++) {
        for (var i = x - 1; i < x + 2; i++) {
          var q = (j < 0 ? j + n : j >= n ? j - n : j) * n
                + (i < 0 ? i + n : i >= n ? i - n : i);
          sa += a[q];
          sb += b[q];
          sc += c[q];
        }
      }
      sa /= 9;
      sb /= 9;
      sc /= 9;

      var ta = sa + sa * (sb - sc);
      var tb = sb + sb * (sc - sa);
      var tc = sc + sc * (sa - sb);
      bzr.a[p] = ta < 1 ? ta : 1;
      bzr.b[p] = tb < 1 ? tb : 1;
      bzr.c[p] = tc < 1 ? tc : 1;
    }
  }
};

bzr.reset(100);


// This file contains the weighted network of coappearances of characters in
// Victor Hugo's novel "Les Miserables". Nodes represent characters as indicated
// by the labels, and edges connect any pair of characters that appear in the
// same chapter of the book. The values on the edges are the number of such
// coappearances. The data on coappearances were taken from D. E. Knuth, The
// Stanford GraphBase: A Platform for Combinatorial Computing, Addison-Wesley,
// Reading, MA (1993).
//
// The group labels were transcribed from "Finding and evaluating community
// structure in networks" by M. E. J. Newman and M. Girvan.

var miserables = {
  nodes:[
    {nodeName:"Myriel", group:1},
    {nodeName:"Napoleon", group:1},
    {nodeName:"Mlle. Baptistine", group:1},
    {nodeName:"Mme. Magloire", group:1},
    {nodeName:"Countess de Lo", group:1},
    {nodeName:"Geborand", group:1},
    {nodeName:"Champtercier", group:1},
    {nodeName:"Cravatte", group:1},
    {nodeName:"Count", group:1},
    {nodeName:"Old Man", group:1},
    {nodeName:"Labarre", group:2},
    {nodeName:"Valjean", group:2},
    {nodeName:"Marguerite", group:3},
    {nodeName:"Mme. de R", group:2},
    {nodeName:"Isabeau", group:2},
    {nodeName:"Gervais", group:2},
    {nodeName:"Tholomyes", group:3},
    {nodeName:"Listolier", group:3},
    {nodeName:"Fameuil", group:3},
    {nodeName:"Blacheville", group:3},
    {nodeName:"Favourite", group:3},
    {nodeName:"Dahlia", group:3},
    {nodeName:"Zephine", group:3},
    {nodeName:"Fantine", group:3},
    {nodeName:"Mme. Thenardier", group:4},
    {nodeName:"Thenardier", group:4},
    {nodeName:"Cosette", group:5},
    {nodeName:"Javert", group:4},
    {nodeName:"Fauchelevent", group:0},
    {nodeName:"Bamatabois", group:2},
    {nodeName:"Perpetue", group:3},
    {nodeName:"Simplice", group:2},
    {nodeName:"Scaufflaire", group:2},
    {nodeName:"Woman 1", group:2},
    {nodeName:"Judge", group:2},
    {nodeName:"Champmathieu", group:2},
    {nodeName:"Brevet", group:2},
    {nodeName:"Chenildieu", group:2},
    {nodeName:"Cochepaille", group:2},
    {nodeName:"Pontmercy", group:4},
    {nodeName:"Boulatruelle", group:6},
    {nodeName:"Eponine", group:4},
    {nodeName:"Anzelma", group:4},
    {nodeName:"Woman 2", group:5},
    {nodeName:"Mother Innocent", group:0},
    {nodeName:"Gribier", group:0},
    {nodeName:"Jondrette", group:7},
    {nodeName:"Mme. Burgon", group:7},
    {nodeName:"Gavroche", group:8},
    {nodeName:"Gillenormand", group:5},
    {nodeName:"Magnon", group:5},
    {nodeName:"Mlle. Gillenormand", group:5},
    {nodeName:"Mme. Pontmercy", group:5},
    {nodeName:"Mlle. Vaubois", group:5},
    {nodeName:"Lt. Gillenormand", group:5},
    {nodeName:"Marius", group:8},
    {nodeName:"Baroness T", group:5},
    {nodeName:"Mabeuf", group:8},
    {nodeName:"Enjolras", group:8},
    {nodeName:"Combeferre", group:8},
    {nodeName:"Prouvaire", group:8},
    {nodeName:"Feuilly", group:8},
    {nodeName:"Courfeyrac", group:8},
    {nodeName:"Bahorel", group:8},
    {nodeName:"Bossuet", group:8},
    {nodeName:"Joly", group:8},
    {nodeName:"Grantaire", group:8},
    {nodeName:"Mother Plutarch", group:9},
    {nodeName:"Gueulemer", group:4},
    {nodeName:"Babet", group:4},
    {nodeName:"Claquesous", group:4},
    {nodeName:"Montparnasse", group:4},
    {nodeName:"Toussaint", group:5},
    {nodeName:"Child 1", group:10},
    {nodeName:"Child 2", group:10},
    {nodeName:"Brujon", group:4},
    {nodeName:"Mme. Hucheloup", group:8}
  ],
  links:[
    {source:1, target:0, value:1},
    {source:2, target:0, value:8},
    {source:3, target:0, value:10},
    {source:3, target:2, value:6},
    {source:4, target:0, value:1},
    {source:5, target:0, value:1},
    {source:6, target:0, value:1},
    {source:7, target:0, value:1},
    {source:8, target:0, value:2},
    {source:9, target:0, value:1},
    {source:11, target:10, value:1},
    {source:11, target:3, value:3},
    {source:11, target:2, value:3},
    {source:11, target:0, value:5},
    {source:12, target:11, value:1},
    {source:13, target:11, value:1},
    {source:14, target:11, value:1},
    {source:15, target:11, value:1},
    {source:17, target:16, value:4},
    {source:18, target:16, value:4},
    {source:18, target:17, value:4},
    {source:19, target:16, value:4},
    {source:19, target:17, value:4},
    {source:19, target:18, value:4},
    {source:20, target:16, value:3},
    {source:20, target:17, value:3},
    {source:20, target:18, value:3},
    {source:20, target:19, value:4},
    {source:21, target:16, value:3},
    {source:21, target:17, value:3},
    {source:21, target:18, value:3},
    {source:21, target:19, value:3},
    {source:21, target:20, value:5},
    {source:22, target:16, value:3},
    {source:22, target:17, value:3},
    {source:22, target:18, value:3},
    {source:22, target:19, value:3},
    {source:22, target:20, value:4},
    {source:22, target:21, value:4},
    {source:23, target:16, value:3},
    {source:23, target:17, value:3},
    {source:23, target:18, value:3},
    {source:23, target:19, value:3},
    {source:23, target:20, value:4},
    {source:23, target:21, value:4},
    {source:23, target:22, value:4},
    {source:23, target:12, value:2},
    {source:23, target:11, value:9},
    {source:24, target:23, value:2},
    {source:24, target:11, value:7},
    {source:25, target:24, value:13},
    {source:25, target:23, value:1},
    {source:25, target:11, value:12},
    {source:26, target:24, value:4},
    {source:26, target:11, value:31},
    {source:26, target:16, value:1},
    {source:26, target:25, value:1},
    {source:27, target:11, value:17},
    {source:27, target:23, value:5},
    {source:27, target:25, value:5},
    {source:27, target:24, value:1},
    {source:27, target:26, value:1},
    {source:28, target:11, value:8},
    {source:28, target:27, value:1},
    {source:29, target:23, value:1},
    {source:29, target:27, value:1},
    {source:29, target:11, value:2},
    {source:30, target:23, value:1},
    {source:31, target:30, value:2},
    {source:31, target:11, value:3},
    {source:31, target:23, value:2},
    {source:31, target:27, value:1},
    {source:32, target:11, value:1},
    {source:33, target:11, value:2},
    {source:33, target:27, value:1},
    {source:34, target:11, value:3},
    {source:34, target:29, value:2},
    {source:35, target:11, value:3},
    {source:35, target:34, value:3},
    {source:35, target:29, value:2},
    {source:36, target:34, value:2},
    {source:36, target:35, value:2},
    {source:36, target:11, value:2},
    {source:36, target:29, value:1},
    {source:37, target:34, value:2},
    {source:37, target:35, value:2},
    {source:37, target:36, value:2},
    {source:37, target:11, value:2},
    {source:37, target:29, value:1},
    {source:38, target:34, value:2},
    {source:38, target:35, value:2},
    {source:38, target:36, value:2},
    {source:38, target:37, value:2},
    {source:38, target:11, value:2},
    {source:38, target:29, value:1},
    {source:39, target:25, value:1},
    {source:40, target:25, value:1},
    {source:41, target:24, value:2},
    {source:41, target:25, value:3},
    {source:42, target:41, value:2},
    {source:42, target:25, value:2},
    {source:42, target:24, value:1},
    {source:43, target:11, value:3},
    {source:43, target:26, value:1},
    {source:43, target:27, value:1},
    {source:44, target:28, value:3},
    {source:44, target:11, value:1},
    {source:45, target:28, value:2},
    {source:47, target:46, value:1},
    {source:48, target:47, value:2},
    {source:48, target:25, value:1},
    {source:48, target:27, value:1},
    {source:48, target:11, value:1},
    {source:49, target:26, value:3},
    {source:49, target:11, value:2},
    {source:50, target:49, value:1},
    {source:50, target:24, value:1},
    {source:51, target:49, value:9},
    {source:51, target:26, value:2},
    {source:51, target:11, value:2},
    {source:52, target:51, value:1},
    {source:52, target:39, value:1},
    {source:53, target:51, value:1},
    {source:54, target:51, value:2},
    {source:54, target:49, value:1},
    {source:54, target:26, value:1},
    {source:55, target:51, value:6},
    {source:55, target:49, value:12},
    {source:55, target:39, value:1},
    {source:55, target:54, value:1},
    {source:55, target:26, value:21},
    {source:55, target:11, value:19},
    {source:55, target:16, value:1},
    {source:55, target:25, value:2},
    {source:55, target:41, value:5},
    {source:55, target:48, value:4},
    {source:56, target:49, value:1},
    {source:56, target:55, value:1},
    {source:57, target:55, value:1},
    {source:57, target:41, value:1},
    {source:57, target:48, value:1},
    {source:58, target:55, value:7},
    {source:58, target:48, value:7},
    {source:58, target:27, value:6},
    {source:58, target:57, value:1},
    {source:58, target:11, value:4},
    {source:59, target:58, value:15},
    {source:59, target:55, value:5},
    {source:59, target:48, value:6},
    {source:59, target:57, value:2},
    {source:60, target:48, value:1},
    {source:60, target:58, value:4},
    {source:60, target:59, value:2},
    {source:61, target:48, value:2},
    {source:61, target:58, value:6},
    {source:61, target:60, value:2},
    {source:61, target:59, value:5},
    {source:61, target:57, value:1},
    {source:61, target:55, value:1},
    {source:62, target:55, value:9},
    {source:62, target:58, value:17},
    {source:62, target:59, value:13},
    {source:62, target:48, value:7},
    {source:62, target:57, value:2},
    {source:62, target:41, value:1},
    {source:62, target:61, value:6},
    {source:62, target:60, value:3},
    {source:63, target:59, value:5},
    {source:63, target:48, value:5},
    {source:63, target:62, value:6},
    {source:63, target:57, value:2},
    {source:63, target:58, value:4},
    {source:63, target:61, value:3},
    {source:63, target:60, value:2},
    {source:63, target:55, value:1},
    {source:64, target:55, value:5},
    {source:64, target:62, value:12},
    {source:64, target:48, value:5},
    {source:64, target:63, value:4},
    {source:64, target:58, value:10},
    {source:64, target:61, value:6},
    {source:64, target:60, value:2},
    {source:64, target:59, value:9},
    {source:64, target:57, value:1},
    {source:64, target:11, value:1},
    {source:65, target:63, value:5},
    {source:65, target:64, value:7},
    {source:65, target:48, value:3},
    {source:65, target:62, value:5},
    {source:65, target:58, value:5},
    {source:65, target:61, value:5},
    {source:65, target:60, value:2},
    {source:65, target:59, value:5},
    {source:65, target:57, value:1},
    {source:65, target:55, value:2},
    {source:66, target:64, value:3},
    {source:66, target:58, value:3},
    {source:66, target:59, value:1},
    {source:66, target:62, value:2},
    {source:66, target:65, value:2},
    {source:66, target:48, value:1},
    {source:66, target:63, value:1},
    {source:66, target:61, value:1},
    {source:66, target:60, value:1},
    {source:67, target:57, value:3},
    {source:68, target:25, value:5},
    {source:68, target:11, value:1},
    {source:68, target:24, value:1},
    {source:68, target:27, value:1},
    {source:68, target:48, value:1},
    {source:68, target:41, value:1},
    {source:69, target:25, value:6},
    {source:69, target:68, value:6},
    {source:69, target:11, value:1},
    {source:69, target:24, value:1},
    {source:69, target:27, value:2},
    {source:69, target:48, value:1},
    {source:69, target:41, value:1},
    {source:70, target:25, value:4},
    {source:70, target:69, value:4},
    {source:70, target:68, value:4},
    {source:70, target:11, value:1},
    {source:70, target:24, value:1},
    {source:70, target:27, value:1},
    {source:70, target:41, value:1},
    {source:70, target:58, value:1},
    {source:71, target:27, value:1},
    {source:71, target:69, value:2},
    {source:71, target:68, value:2},
    {source:71, target:70, value:2},
    {source:71, target:11, value:1},
    {source:71, target:48, value:1},
    {source:71, target:41, value:1},
    {source:71, target:25, value:1},
    {source:72, target:26, value:2},
    {source:72, target:27, value:1},
    {source:72, target:11, value:1},
    {source:73, target:48, value:2},
    {source:74, target:48, value:2},
    {source:74, target:73, value:3},
    {source:75, target:69, value:3},
    {source:75, target:68, value:3},
    {source:75, target:25, value:3},
    {source:75, target:48, value:1},
    {source:75, target:41, value:1},
    {source:75, target:70, value:1},
    {source:75, target:71, value:1},
    {source:76, target:64, value:1},
    {source:76, target:65, value:1},
    {source:76, target:66, value:1},
    {source:76, target:63, value:1},
    {source:76, target:62, value:1},
    {source:76, target:48, value:1},
    {source:76, target:58, value:1}
  ]
};
