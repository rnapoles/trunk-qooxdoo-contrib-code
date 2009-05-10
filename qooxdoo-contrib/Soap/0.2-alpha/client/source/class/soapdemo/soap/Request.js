qx.Class.define("soapdemo.soap.Request", { extend : qx.core.Object,
    construct : function() { },
    properties : {
         simple_object : { check : "Object" }
        ,startRow : { check : "Integer", init: null, apply: "apply_startrow" }
        ,who : { check : "String", init: null, apply: "apply_who" }
        ,startId : { check : "Integer", init: null, apply: "apply_startid" }
    },
    members : {
         simple_object : new Object()
        ,apply_startrow : function (value,old) { this.simple_object.startrow = value; }
        ,apply_who : function (value,old) { this.simple_object.who = value; }
        ,apply_startid : function (value,old) { this.simple_object.startid = value; }
    }
});

