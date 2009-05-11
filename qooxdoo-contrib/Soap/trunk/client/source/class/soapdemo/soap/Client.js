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
        ,NAMESPACES: {
             "a"    : "http://schemas.xmlsoap.org/wsdl/"
            ,"x"    : "http://www.w3.org/2001/XMLSchema"
            ,"plnk" : "http://schemas.xmlsoap.org/ws/2003/05/partner-link/"
            ,"soap" : "http://schemas.xmlsoap.org/wsdl/soap/"
        }
    }

    ,members : {
        __wsdl : null

        ,__onSendSoapRequest : function(method_name, async, callback, req) {
            var o = null;
            var nsmap = soapdemo.soap.Client.NAMESPACES;
            if (req.responseXML == null) {
                this.dispatchEvent(new qx.io.remote.Response("failed"));
            }
            else {
                var tag_name = qx.xml.Element.selectSingleNode(this.__wsdl,"/a:definitions/a:binding/a:operation[@name='"+method_name+"']/a:output/@name",nsmap);
                var nd = req.responseXML.getElementsByTagName(tag_name.nodeValue);

                if(nd == null) {
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
                    o = this.__to_object(nd[0]);
                }

                if(callback) {
                    callback(o, req.responseXML);
                }

            }
            if(!async) {
                return null;
            }
        }

        ,__to_object : function(node) {
            var ssn = qx.xml.Element.selectSingleNode;
            var sn = qx.xml.Element.selectNodes;
            var nsmap = soapdemo.soap.Client.NAMESPACES;

            var retval = null;

            // get return type from wsdl
            var return_type_node = ssn(this.__wsdl,"/a:definitions/a:types/x:schema/x:element[@name='"+node.nodeName+"']", nsmap);
            var return_type_name = return_type_node.getAttribute("type");
            return_type_name = return_type_name.split(":")[1];

            var return_type_definition = ssn(this.__wsdl,"/a:definitions/a:types/x:schema/x:complexType[@name='"+return_type_name+"']", nsmap);
            node = node.childNodes[0];

            var retval_type_node = ssn(return_type_definition, ".//x:element",nsmap);

            if (this.__is_primitive(retval_type_node)) {
                retval = this.__extract_simple(node.childNodes[0],retval_type_node);
            }
            else {
                var retval_type_name = retval_type_node.getAttribute("type");
                retval_type_name = retval_type_name.split(":")[1];

                var retval_type_definition = ssn(this.__wsdl,"/a:definitions/a:types/x:schema/x:complexType[@name='"+retval_type_name+"']", nsmap);
                var elts = sn(retval_type_definition, ".//x:element",nsmap);

                if (elts.length == 1 && elts[0].getAttribute("minOccurs") != null
                                     && elts[0].getAttribute("maxOccurs") != null) { // it's an array
                    retval = new Array();
                    for (var i=0; i < node.childNodes.length; i++) {
                        var child = node.childNodes[i];
                        var child_type_name=child.getAttribute("xsi:type")

                        if (child_type_name != null) {
                            retval[retval.length] = this.__extract_simple(child.childNodes[0],elts[0]);
                        }
                        else {
                            retval[retval.length] = this.__extract_complex(child);
                        }
                    }
                }
                else {
                    retval = this.__extract_complex(node, retval_type_name);
                }
            }

            return retval;
        }

        ,__is_primitive : function(type_node) {
            var type_name = type_node.getAttribute("type");
            if (type_name == null) {
                type_name = type_node.getAttribute("xsi:type");
            }
            type_name = type_name.split(":")[1];

            if (    type_name == "boolean"
                 || type_name == "int"
                 || type_name == "long"
                 || type_name == "double"
                 || type_name == "datetime"
                 || type_name == "string") return true;
            else return false;
        }

        ,__extract_complex : function(node,type_node) {
            var retval = null;

            if(node.hasChildNodes()) {
                retval = new Object();
                var type_node=qx.xml.Element.selectSingleNode(this.__wsdl
                        ,"/a:definitions/a:types/x:schema/x:complexType[@name='"+node.nodeName+"']"
                        , this.self(arguments).NAMESPACES);
                for(var i = 0; i < node.childNodes.length; i++) {
                    var child = node.childNodes[i];
                    var child_type_name=child.getAttribute("xsi:type");
                    var child_type_node=qx.xml.Element.selectSingleNode(type_node
                        ,".//x:element[@name='"+node.childNodes[i].nodeName+"']"
                        , this.self(arguments).NAMESPACES);

                    if (child_type_name != null) {
                        retval[node.childNodes[i].nodeName] = this.__extract_simple(child.childNodes[0],child_type_node);
                    }
                    else {
                        retval[node.childNodes[i].nodeName] = this.__extract_complex(child);
                    }
                }
            }

            return retval;
        }
        ,__extract_simple : function(node, type_node) {
            var value_ = node.nodeValue;
            var type_name = type_node.getAttribute("type");
            if (type_name == null) {
                type_name = type_node.getAttribute("xsi:type");
            }
            type_name = type_name.split(":")[1];

            switch(type_name) {
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
        ,__loadWsdl : function(method_, parameters, async, callback) {
            if(this.__wsdl == null) {
                var xmlHttp = qx.io.remote.transport.XmlHttp.createRequestObject();
                xmlHttp.open("GET", this.getUrl() + "?wsdl", async);
                if(async) {
                    var self=this;
                    xmlHttp.onreadystatechange = function() {
                        if(xmlHttp.readyState == 4) {
                            self.__onLoadWsdl(method_, parameters, async, callback, xmlHttp);
                        }
                    }
                }
    
                xmlHttp.send(null);
                if (!async) {
                    return this.__onLoadWsdl(method_, parameters, async, callback, xmlHttp);
                }
            }
            else {
                return this.__sendSoapRequest(method_, parameters, async, callback);
            }
        }

        ,__onLoadWsdl : function(method_, parameters, async, callback, req) {
            this.__wsdl = req.responseXML;
            if (this.__wsdl == null) {
                this.dispatchEvent(new qx.io.remote.Response("wsdl_failed"));
                return null;
            }
            else {
                return this.__sendSoapRequest(method_, parameters, async, callback);
            }
        }

        ,__sendSoapRequest : function(method_, parameters, async, callback) {
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
                    "<" + method_ + " xmlns=\"" + ns + "\">" +
                    parameters.toXml() +
                    "</" + method_ + "></soap:Body></soap:Envelope>";

            // send request
            var xmlHttp = qx.io.remote.transport.XmlHttp.createRequestObject();
            xmlHttp.open("POST", this.getUrl(), async);

            var soapaction = ((ns.lastIndexOf("/") != ns.length - 1) ? ns + "/" : ns) + method_;
            xmlHttp.setRequestHeader("SOAPAction", soapaction);
            xmlHttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");

            if(async) {
                var self = this;
                xmlHttp.onreadystatechange = function() {
                    if(xmlHttp.readyState == 4) { /* FIXME: No magic numbers in the code */
                        self.__onSendSoapRequest(method_, async, callback, xmlHttp);
                    }
                }
            }

            xmlHttp.send(sr);
            if (!async) {
                return this.__onSendSoapRequest(method_, async, callback, xmlHttp);
            }
        }
    }
});


