/* ************************************************************************

   Copyright:
     2011 OETIKER+PARTNER AG, Tobi Oetiker, http://www.oetiker.ch
     
   License:
     The same as ExtJS see http://www.sencha.com/products/extjs/license/

   Authors:
     * Tobi Oetiker (oetiker)

************************************************************************ */
/*
#asset(qxextjscharts/*)
*/

/**
 * Create a ExtJS Chart 'Widget' providing access to the ExtJS charting functions
 */

/* load the ExtJS scripts */
if (! window.Ext ){
    var todo = [];
    var rm = qx.util.ResourceManager.getInstance();
    var head = document.getElementsByTagName("head")[0];
    var el = document.createElement("link");
    el.type = "text/css";
    el.rel="stylesheet";
    el.href=rm.toUri('qxextjscharts/ext-all.css');
    setTimeout(function() {
        head.appendChild(el);
    }, 0);
    var sl = new qx.io.ScriptLoader();
    sl.load(rm.toUri('qxextjscharts/ext-core-debug.js'),function(status){
        if (status == 'success'){
            var sl2 = new qx.io.ScriptLoader();
            sl2.load(rm.toUri('qxextjscharts/ext-all-debug.js'),function(status){
                if (status == 'success'){
                    // seems not to get initialized when running on chrome
                    Ext.supports.init();
                    for (var i=0;i<todo.length;i++){
                        todo[i]();
                    }
                }
                else {
                    alert("Faild to load ext-all-debug.js");
                }
            });
        }
        else {
            alert("Faild to load ext-core-debug.js");
        }
    });
}    

qx.Class.define("qxextjscharts.Chart",{
    extend : qx.ui.core.Widget,
    construct : function(map) {
        this.base(arguments);
        this.__map = map;
        this.addListener('resize',this.__redraw,this);      
        this.addListenerOnce('appear',this.__draw,this);
    },
    properties: {
        extJsHandle: {
            init: null
        }        
    },
    members: {
        __map: null,
        __dom: null,
        __draw: function(e){
            if (window.Ext){
                var map = this.__map;
                if (qx.lang.Type.isFunction(map)){
                    map = map(Ext);
                }
                var dom = this.__dom = this.getContentElement().getDomElement();
                map.renderTo = dom;
                qx.bom.element.Style.setStyles(dom,{backgroundColor: '#ffffff'},true);
                map.width = qx.bom.element.Dimension.getWidth(dom);
                map.height = qx.bom.element.Dimension.getHeight(dom);
                this.setExtJsHandle(new Ext.chart.Chart(map));
            }
            else {
                todo.push(qx.lang.Function.bind(this.__draw,this));
            }
        },
        __redraw: function(e){
            var hand = this.getExtJsHandle();
            if (hand) {
                qx.html.Element.flush();
                var chart = this.getExtJsHandle();
                var dom = this.__dom;
                var dim = qx.bom.element.Dimension;
                chart.setSize(dim.getWidth(dom),dim.getHeight(dom));
            }
        }
    }
});


