/*
 * Javascript "SOAP Client" library
 *
 * @version: 2.4 - 2007.12.21
 * @author: Matteo Casati - http://www.guru4.net/
 *
 */

/*
 * Qooxdoo integration by Burak Arslan (burak.arslan-qx@soapdemo.com.tr)
 */

qx.Class.define("soapdemo.soap.Client", { extend : qx.core.Object
    ,construct : function(url) {
        this.base(arguments);

        this.setUrl(url)
    }

    ,events : {
        "failed" : "qx.event.type.Event",
        "wsdl_failed" : "qx.event.type.Event"
    }

    ,properties : {
         timeout :          { check : "Integer", nullable : true }
        ,crossDomain :      { check : "Boolean", init : false }
        ,url :              { check : "String",  nullable : true }
    }
    
    ,statics : {
    	DEFAULT_PREFIX: 'xs:'
    }

    ,members : {
        __wsdl : null

        ,__onSendSoapRequest : function(method, async, callback, req) {
            var o = null;
            if (req.responseXML == null) {
                this.dispatchEvent(new qx.io.remote.Response("failed"));
            }
            else {
                var nd = req.responseXML.getElementsByTagName(method + "Result");

                if(nd.length == 0) {
                    nd = req.responseXML.getElementsByTagName("return"); // PHP web Service?
                }

                if(nd.length == 0) {
                    if(req.responseXML.getElementsByTagName("faultcode").length > 0) {
                        if(async || callback) {
                            o = new Error(500, req.responseXML.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue);
                        }
                        else {
                            throw new Error(500, req.responseXML.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue);
                        }
                    }
                }
                else {
                    o = this.__node2object(nd[0]);
                }

                if(callback) {
                    callback(o, req.responseXML);
                }
            }
            if(!async) {
                return null;
            }
        }

        ,__node2object : function(node) {
            var retval = null;

            var type_node = null;
            var type_name = "";
            var type_definition = null;

            var elts = qx.xml.Element.getElementsByTagNameNS(this.__wsdl, "http://www.w3.org/2001/XMLSchema", "element");
            for (var i=0; i<elts.length; ++i) {
                if (elts[i].getAttribute("name") == node.nodeName) {
                    type_node = elts[i];
                    type_name = type_node.getAttribute("type");
                    break;
                }
            }

            type_name=type_name.split(":")[1];

            if (this.__is_primitive(type_name)) {
                retval = this.__extract_simple(node.childNodes[0],type_name);
            }
            else {
                elts = qx.xml.Element.getElementsByTagNameNS(this.__wsdl, "http://www.w3.org/2001/XMLSchema", "complexType");
                for (var i=0; i<elts.length; ++i) {
                    if (elts[i].getAttribute("name") == type_name) {
                        type_definition = elts[i];
                        break;
                    }
                }
    
                if (type_definition == null) { 
                    throw Error("'" + type_name + "' not found.");
                }
                else {
                    elts = qx.xml.Element.getElementsByTagNameNS(type_definition, "http://www.w3.org/2001/XMLSchema", "element");
                    if (elts.length == 1 && elts[0].getAttribute("minOccurs") == "0" 
                                         && elts[0].getAttribute("maxOccurs") == "unbounded") { // it's an array
                        retval = new Array();
                        for(var i = 0; i < node.childNodes.length; i++) {
                            var child = node.childNodes[i];
                            var child_type_name=child.getAttribute("xsi:type")
                            if (child_type_name != null) {
                                child_type_name = child_type_name.split(":")[1];
                                retval[retval.length] = this.__extract_simple(child.childNodes[0],child_type_name);
                            }
                            else {
                                retval[retval.length] = this.__extract_complex(child,child_type_name);
                            }
                        }
                    }
                    else {
                        retval = this.__extract_complex(node, type_name);
                    }
                }
            }

            return retval;
        }

        ,__is_primitive : function(type_) {
            if (    type_ == "boolean"
                 || type_ == "int"
                 || type_ == "long"
                 || type_ == "double"
                 || type_ == "datetime"
                 || type_ == "string") return true;
            else return false;
        }

        ,__extract_complex : function(node) {
            var retval = null;

            if(node.hasChildNodes()) {
                retval = new Object();
                for(var i = 0; i < node.childNodes.length; i++) {
                    var child = node.childNodes[i];
                    var child_type_name=child.getAttribute("xsi:type");
                    if (child_type_name != null) {
                        child_type_name = child_type_name.split(":")[1];
                        retval[node.childNodes[i].nodeName] = this.__extract_simple(child.childNodes[0],child_type_name);
                    }
                    else {
                        retval[node.childNodes[i].nodeName] = this.__extract_complex(child,child_type_name);
                    }
                }
            }

            return retval;
        }
        ,__extract_simple : function(node, type_) {
            var value_ = node.nodeValue;

            switch(type_) {
            case "boolean":
                return value_ + "" == "true";

            case "int":
            case "long":
                return (value_ != null) ? parseInt(value_ + "", 10) : 0;

            case "double":
                return (value_ != null) ? parseFloat(value_ + "") : 0;

            case "datetime":
                if(value_ == null) {
                    return null;
                }
                else {
                    value_ = value_ + "";
                    value_ = value_.substring(0, (value_.lastIndexOf(".") == -1 ? value_.length : value_.lastIndexOf(".")));
                    value_ = value_.replace(/T/gi," ");
                    value_ = value_.replace(/-/gi,"/");
                    var d = new Date();
                    d.setTime(Date.parse(value_));
                    return d;
                }
            case "string":
                return (value_ != null) ? value_ + "" : "";
            }
        }

        ,callSync : function(methodName, args) {
            return this.__invoke(methodName, args, false, null);
        }

        ,callAsync : function(methodName, args, handler) {
            return this.__invoke(methodName, args, true, handler);
        }

        ,__invoke : function(method, parameters, async, callback) {
            if(async) {
                this.__loadWsdl(method, parameters, async, callback);
            }
            else {
                return this.__loadWsdl(method, parameters, async, callback);
            }
        }

        // private: invoke async
        ,__loadWsdl : function(method, parameters, async, callback) {
            if(this.__wsdl == null) {
                var xmlHttp = qx.io.remote.transport.XmlHttp.createRequestObject();
                xmlHttp.open("GET", this.getUrl() + "?wsdl", async);
                if(async) {
                    var self=this;
                    xmlHttp.onreadystatechange = function() {
                        if(xmlHttp.readyState == 4) {
                            self.__onLoadWsdl(method, parameters, async, callback, xmlHttp);
                        }
                    }
                }
    
                xmlHttp.send(null);
                if (!async) {
                    return this.__onLoadWsdl(method, parameters, async, callback, xmlHttp);
                }
            }
            else {
                return this.__sendSoapRequest(method, parameters, async, callback);
            }
        }

        ,__onLoadWsdl : function(method, parameters, async, callback, req) {
            this.__wsdl = req.responseXML;
            if (this.__wsdl == null) {
                this.dispatchEvent(new qx.io.remote.Response("wsdl_failed"));
                return null;
            }
            else {
                return this.__sendSoapRequest(method, parameters, async, callback);
            }
        }

        ,__sendSoapRequest : function(method, parameters, async, callback) {
            var ns; // namespace
            if (this.__wsdl.documentElement.attributes["targetNamespace"] + "" == "undefined") {
                ns = this.__wsdl.documentElement.attributes.getNamedItem("targetNamespace").nodeValue;
            }
            else {
                ns = this.__wsdl.documentElement.attributes["targetNamespace"].value;
            }

            // build SOAP request
            var sr = "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
                    "<soap:Envelope " +
                        "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
                        "xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" " +
                        "xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
                    "<soap:Body>" +
                    "<" + method + " xmlns=\"" + ns + "\">" +
                    parameters.toXml() +
                    "</" + method + "></soap:Body></soap:Envelope>";

            // send request
            var xmlHttp = qx.io.remote.transport.XmlHttp.createRequestObject();
            xmlHttp.open("POST", this.getUrl(), async);

            var soapaction = ((ns.lastIndexOf("/") != ns.length - 1) ? ns + "/" : ns) + method;
            xmlHttp.setRequestHeader("SOAPAction", soapaction);
            xmlHttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");

            if(async) {
                var self = this;
                xmlHttp.onreadystatechange = function() {
                    if(xmlHttp.readyState == 4) { /* FIXME: No magic numbers in the code */
                        self.__onSendSoapRequest(method, async, callback, xmlHttp);
                    }
                }
            }

            xmlHttp.send(sr);
            if (!async) {
                return this.__onSendSoapRequest(method, async, callback, xmlHttp);
            }
        }
    }
});


