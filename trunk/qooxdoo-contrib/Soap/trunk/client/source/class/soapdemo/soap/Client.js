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
         __wsdlTypes : null
        ,__wsdl : null

        ,__onSendSoapRequest : function(method, async, callback, req) {
            var o = null;
            if (req.responseXML == null) {
                this.dispatchEvent(new qx.io.remote.Response("failed"));
            }
            else {
                var nd = this.__getElementsByTagName(req.responseXML, method + "Result");

                if(nd.length == 0) {
                    nd = this.__getElementsByTagName(req.responseXML, "return"); // PHP web Service?
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

        ,__node2object : function(node, pType) {
            if(node == null) { // null node
                return null;
            }

            pType = (typeof pType == 'undefined') ? null : pType;

            if(node.nodeType == 3 || node.nodeType == 4) { // text node
                return this.__extractValue(node);
            }

            if (node.childNodes.length == 1
                && (node.childNodes[0].nodeType == 3 || node.childNodes[0].nodeType == 4)) { // leaf node
                return this.__node2object(node.childNodes[0]);
            }

            var parentType = this.__getTypeFromWsdl(node);
            var isarray = parentType.toLowerCase().indexOf("arrayof") != -1;

            var i;

            // object node
            if (! isarray) {
                var obj = null;

                if(node.hasChildNodes()) {
                    obj = new Object();
                }

                for(i = 0; i < node.childNodes.length; i++) {
                    var p = this.__node2object(node.childNodes[i], parentType);
                    obj[node.childNodes[i].nodeName] = p;
                }

                return obj;
            }
            else { // list node
                var l = new Array(); // create node ref

                for(i = 0; i < node.childNodes.length; i++) {
                    l[l.length] = this.__node2object(node.childNodes[i], parentType);
                }

                return l;
            }
 
           return null;
        }

        ,__extractValue : function(node) {
            var value_ = node.nodeValue;
            switch(this.__getTypeFromWsdl(node).toLowerCase()) {
            case soapdemo.soap.Client.DEFAULT_PREFIX+"boolean":
                return value_ + "" == "true";

            case soapdemo.soap.Client.DEFAULT_PREFIX+"int":
            case soapdemo.soap.Client.DEFAULT_PREFIX+"long":
                return (value_ != null) ? parseInt(value_ + "", 10) : 0;

            case soapdemo.soap.Client.DEFAULT_PREFIX+"double":
                return (value_ != null) ? parseFloat(value_ + "") : 0;

            case soapdemo.soap.Client.DEFAULT_PREFIX+"datetime":
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
            default:
            case soapdemo.soap.Client.DEFAULT_PREFIX+"string":
                return (value_ != null) ? value_ + "" : "";
            }
        }

        ,__getTypeFromWsdl : function(node) {
            var key = node.parentNode.parentNode.parentNode.nodeName + ":" + node.parentNode.parentNode.nodeName;
            var type_ = this.__wsdlTypes[key] + "";
            if (type_ + "" == "undefined") {
                key = node.parentNode.parentNode.nodeName + ":" + node.parentNode.nodeName;
                type_ = this.__wsdlTypes[key] + "";
                if (type_ == "undefined") {
                    key = node.parentNode.nodeName + ":" + node.nodeName;
                    type_ = this.__wsdlTypes[key] + "";
                    if (type_ + "" == "undefined") {
                        throw Error("'" + key + "' type not found!");
                    }
                    else {
                        return type_;
                    }
                }
                else {
                    return type_;
                }
            }
            else {
                return type_;
            }
        }

        ,__getTypesFromWsdl : function() {
            this.__wsdlTypes = new Array();

            ell=qx.xml.Element.getElementsByTagNameNS(this.__wsdl, "http://www.w3.org/2001/XMLSchema", "element")
            console.log(ell);
            var key="";
            var value_="";
            for(var i=0; i < ell.length; ++i) {
                key = qx.xml.Element.selectSingleNode(ell[i],"@name");
                value_ = qx.xml.Element.selectSingleNode(ell[i],"@type|@xsi:type");
                if (key == null || value_ == null) {
                    throw Error("incomplete element tag!");
                }
                else {
                    var prefix = qx.xml.Element.selectSingleNode(ell[i],"../../@name");
                    if (prefix != null) {
                        key = prefix.value + ":" + key.value;
                    }
                    else {
                        key = key.value;
                    }
                    this.__wsdlTypes[key] = value_.value;
                    console.log(key);
                }
            }
        }

        ,__getElementsByTagName : function(document, tagName) {
            try {
                // trying to get node omitting any namespaces (latest versions of MSXML.XMLDocument)
                return document.selectNodes(".//*[local-name()=\""+ tagName +"\"]");
            }
            catch (ex) {}
            // old XML parser support
            return document.getElementsByTagName(tagName);
        }

        ,__toBase64 : function(input) {
            var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                }
                else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                Str.charAt(enc3) + keyStr.charAt(enc4);
            } while (i < input.length);

            return output;
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
                this.__getTypesFromWsdl();
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


