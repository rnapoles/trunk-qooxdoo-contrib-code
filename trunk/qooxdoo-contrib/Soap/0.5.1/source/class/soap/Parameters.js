
/*
 * Copyright (c) 2008-2009, Burak Arslan (burak.arslan-qx@arskom.com.tr).
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Arskom Consultancy Ltd. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES,
 * INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
 * OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 */

qx.Class.define("soap.Parameters", { extend : qx.core.Object
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

                    var tz_minutes = Math.abs(o.getTimezoneOffset());
                    var tz_hours = (tz_minutes/60)>>0;
                    tz_minutes -= tz_hours * 60;

                    tz_hours = tz_hours.toString();
                    tz_minutes = tz_minutes.toString();

                    if (tz_minutes.length == 1) {
                        tz_minutes = "0" + tz_minutes;
                    }

                    if (tz_hours.length == 1) {
                        tz_hours = "0" + tz_hours;
                    }

                    var timezone = ((o.getTimezoneOffset() < 0) ? "+" : "-") + tz_hours + ":" + tz_minutes;
                    s += year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds + "." + milliseconds + timezone;
                }
                else if (o instanceof Number) {
                    s += o.toString();
                }
                else if(o instanceof Array) {
                    for (var i = 0; i<o.length; ++i) {
                        var type=null;

                        if (o[i].basename) {
                            type = o[i].basename;
                        }
                        else {
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
                }
                else if (qx.xml.Document.isXmlDocument(o)) {
                    s += qx.xml.Element.serialize(o);
                }
                else { // Object
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

