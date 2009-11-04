
/*
 * Javascript "SOAP Client" library
 *
 * @version: 2.4 - 2007.12.21
 * @author: Matteo Casati - http://www.guru4.net/
 *
 */

/*
 * Qooxdoo integration by Burak Arslan (burak.arslan-qx@arskom.com.tr)
 */

qx.Class.define("soapdemo.soap.Parameters", { extend : qx.core.Object
    ,include : [qx.locale.MTranslation]
    ,construct : function() {
        this.__pl=new Object();
    }

    ,members : {
        __pl : null

        ,__serialize : function(o) {
            var s = "";
            switch(typeof(o)) {

            case "string":
                s += o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                break;

            case "number":
            case "boolean":
                s += o.toString();
                break;

            case "object":
                if (o == null) {
                    return "";
                }
                // Date
                else if(o instanceof Date) {
                    var year = o.getFullYear().toString();
                    var month = (o.getMonth() + 1).toString();

                    month = (month.length == 1) ? "0" + month : month;

                    var date = o.getDate().toString();
                    date = (date.length == 1) ? "0" + date : date;

                    var hours = o.getHours().toString();
                    hours = (hours.length == 1) ? "0" + hours : hours;

                    var minutes = o.getMinutes().toString();
                    minutes = (minutes.length == 1) ? "0" + minutes : minutes;

                    var seconds = o.getSeconds().toString();
                    seconds = (seconds.length == 1) ? "0" + seconds : seconds;

                    var milliseconds = o.getMilliseconds().toString();
                    var tzminutes = Math.abs(o.getTimezoneOffset());
                    var tzhours = 0;

                    while(tzminutes >= 60) {
                        tzhours++;
                        tzminutes -= 60;
                    }
                    tzminutes = (tzminutes.toString().length == 1) ? "0" + tzminutes.toString() : tzminutes.toString();
                    tzhours = (tzhours.toString().length == 1) ? "0" + tzhours.toString() : tzhours.toString();
                    var timezone = ((o.getTimezoneOffset() < 0) ? "+" : "-") + tzhours + ":" + tzminutes;
                    s += year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds + "." + milliseconds + timezone;
                }
                else if (o instanceof Number) {
                    s += o.toString();
                }
                // Array
                else if(o instanceof Array) {
                    for(var p in o) {
                        if(!isNaN(p)) { // linear array
                            for (var i = 0; i<o.length; ++i) {                                
                                var type=null;
                                if (o[i].basename) {
                                    type = o[i].basename;
                                }
                                else {
                                    //(/function\s+(\w*)\s*\(/ig).exec(o[i].constructor.toString());
                                    type = Object.prototype.toString.call(o[i]).slice(8, -1);
                                }

                                qx.log.Logger.debug(type + " " + typeof(o[i]) + "\n" + o[i].constructor.toString());
                                switch(type) {
                                case "String":
                                    type = "string";
                                    break;

                                case "Number":
                                    type = "int";
                                    break;

                                case "Boolean":
                                    type = "bool";
                                    break;

                                case "Date":
                                    type = "DateTime";
                                    break;
                                }
                                s += "<" + type + ">" + this.__serialize(o[i]) + "</" + type + ">"
                            }
                            break;
                        }
                        else {   // associative array
                            s += "<" + p + ">" + this.__serialize(o[p]) + "</" + p + ">"
                        }
                    }
                }
                else if (o instanceof XMLDocument) {
                    s+=qx.xml.Element.serialize(o);
                }
                else { // Object or custom function
                    var so=o.simple_object;
                    for(var k in so) {
                        s += "<" + k + ">" + this.__serialize(so[k]) + "</" + k + ">";
                    }
                }
                break;

            case "function":
                break;

            default:
                break;
            }
            return s;
        }

        ,add : function(name, value) {
            this.__pl[name] = value;
            return this;
        }

        ,toXml : function() {
            var xml = "";

            for(var p in this.__pl) {
                switch(typeof(this.__pl[p])) {
                case "string":
                case "number":
                case "boolean":
                case "object":
                    xml += "<" + p + ">" + this.__serialize(this.__pl[p]) + "</" + p + ">";
                    break;

                default:
                    this.warn("variable '" + p + "' with type '"+typeof(this.__pl[p])+"' ignored");
                }
            }

            return xml;
        }
    }
});

