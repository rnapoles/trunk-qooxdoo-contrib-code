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
        ,username :         { check : "String",  nullable : true }
        ,password :         { check : "String",  nullable : true }
        ,useBasicHttpAuth : { check : "Boolean", nullable : true }
    }
    
    ,statics : {
    	DEFAULT_PREFIX: 'xs:'
    }

    ,members : {
         __cacheWsdl : undefined

        ,__onSendSoapRequest : function(method, async, callback, wsdl, req) {
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
                    o = this.__soapresult2object(nd[0], wsdl);
                }

                if(callback) {
                    callback(o, req.responseXML);
                }
            }
            if(!async) {
                return null;
            }
        }

        ,__soapresult2object : function(node, wsdl) {
            var wsdlTypes = this.__getTypesFromWsdl(wsdl);
            return this.__node2object(node, wsdlTypes);
        }

        ,__node2object : function(node, wsdlTypes, pType) {
            if(node == null) { // null node
                return null;
            }

            pType = (typeof pType == 'undefined') ? null : pType;

            if(node.nodeType == 3 || node.nodeType == 4) { // text node
                return this.__extractValue(node, wsdlTypes);
            }

            if (node.childNodes.length == 1
                && (node.childNodes[0].nodeType == 3 || node.childNodes[0].nodeType == 4)) { // leaf node
                return this.__node2object(node.childNodes[0], wsdlTypes);
            }

            var key = node.parentNode.nodeName+":"+node.nodeName;
            var parentType = this.__getTypeFromWsdl(key, wsdlTypes);
            if (parentType == "" && pType != null) {
                key = pType.substring(pType.indexOf(":")+1) + ":" + node.nodeName;
                parentType = this.__getTypeFromWsdl(key, wsdlTypes);
            }
            var isarray = parentType.toLowerCase().indexOf("arrayof") != -1;

            var i;

            // object node
            if (! isarray) {
                var obj = null;

                if(node.hasChildNodes()) {
                    obj = new Object();
                }

                for(i = 0; i < node.childNodes.length; i++) {
                    var p = this.__node2object(node.childNodes[i], wsdlTypes, parentType);
                    obj[node.childNodes[i].nodeName] = p;
                }

                return obj;
            }
            else { // list node
                var l = new Array(); // create node ref

                for(i = 0; i < node.childNodes.length; i++) {
                    l[l.length] = this.__node2object(node.childNodes[i], wsdlTypes, parentType);
                }

                return l;
            }
            return null;
        }

        ,__extractValue : function(node, wsdlTypes) {
            var value = node.nodeValue;
            switch(this.__getTypeFromWsdl(node.parentNode.nodeName, wsdlTypes).toLowerCase()) {
            case soapdemo.soap.Client.DEFAULT_PREFIX+"boolean":
                return value + "" == "true";

            case soapdemo.soap.Client.DEFAULT_PREFIX+"int":
            case soapdemo.soap.Client.DEFAULT_PREFIX+"long":
                return (value != null) ? parseInt(value + "", 10) : 0;

            case soapdemo.soap.Client.DEFAULT_PREFIX+"double":
                return (value != null) ? parseFloat(value + "") : 0;

            case soapdemo.soap.Client.DEFAULT_PREFIX+"datetime":
                if(value == null) {
                    return null;
                }
                else {
                    value = value + "";
                    value = value.substring(0, (value.lastIndexOf(".") == -1 ? value.length : value.lastIndexOf(".")));
                    value = value.replace(/T/gi," ");
                    value = value.replace(/-/gi,"/");
                    var d = new Date();
                    d.setTime(Date.parse(value));
                    return d;
                }
            default:
            case soapdemo.soap.Client.DEFAULT_PREFIX+"string":
                return (value != null) ? value + "" : "";
            }
        }

        ,__getTypeFromWsdl : function(elementname, wsdlTypes) {
            var type = wsdlTypes[elementname] + "";
            return (type == "undefined") ? "" : type;
        }

        ,__getTypesFromWsdl : function(wsdl) {
            var wsdlTypes = new Array();

            // IE
            var ell = wsdl.getElementsByTagName(soapdemo.soap.Client.DEFAULT_PREFIX+"element");
            var useNamedItem = true;

            // MOZ
            if(ell.length == 0) {
                ell = wsdl.getElementsByTagName("xs:element");
                useNamedItem = false;
            }

            for(var i = 0; i < ell.length; i++) {
                if(useNamedItem) {
                    if(ell[i].attributes.getNamedItem("name") != null && ell[i].attributes.getNamedItem("type") != null) {
                        wsdlTypes[ell[i].attributes.getNamedItem("name").nodeValue] = ell[i].attributes.getNamedItem("type").nodeValue;
                    }
                }
                else {
                    if(ell[i].attributes["name"] != null && ell[i].attributes["type"] != null) {
                        var key=ell[i].attributes["name"].value;
                        wsdlTypes[key] = ell[i].attributes["type"].value;
                    }
                }
            }

            return wsdlTypes;
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
                keyStr.charAt(enc3) + keyStr.charAt(enc4);
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
            // load from cache?
            var wsdl = this.__cacheWsdl;
            if(wsdl + "" != "" && wsdl + "" != "undefined") {
                return this.__sendSoapRequest(method, parameters, async, callback, wsdl);
            }

            // get wsdl
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

        ,__onLoadWsdl : function(method, parameters, async, callback, req) {
            var wsdl = req.responseXML;
            if (wsdl == null) {
                this.dispatchEvent(new qx.io.remote.Response("wsdl_failed"));
                return null;
            }
            else {
                this.__cacheWsdl = wsdl;
                return this.__sendSoapRequest(method, parameters, async, callback, wsdl);
            }
        }

        ,__sendSoapRequest : function(method, parameters, async, callback, wsdl) {
            var ns; // namespace
            if (wsdl.documentElement.attributes["targetNamespace"] + "" == "undefined") {
                ns = wsdl.documentElement.attributes.getNamedItem("targetNamespace").nodeValue;
            }
            else {
                ns = wsdl.documentElement.attributes["targetNamespace"].value;
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

            if (this.userName && this.password) {
                xmlHttp.open("POST", this.getUrl(), async, this.userName, this.password);
                /* Some WS implementations (i.e. BEA Webic Server 10.0 JAX-WS) do
                 * not support Challenge/Response HTTP BASIC, so we send authorization
                 * headers in the first request
                 */
                xmlHttp.setRequestHeader("Authorization",
                    "Basic " + this.__toBase64(this.userName + ":" + this.password));
            }
            else {
                xmlHttp.open("POST", this.getUrl(), async);
            }

            var soapaction = ((ns.lastIndexOf("/") != ns.length - 1) ? ns + "/" : ns) + method;
            xmlHttp.setRequestHeader("SOAPAction", soapaction);
            xmlHttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");

            if(async) {
                var self = this;
                xmlHttp.onreadystatechange = function() {
                    if(xmlHttp.readyState == 4) { /* FIXME: No magic numbers in the code */
                        self.__onSendSoapRequest(method, async, callback, wsdl, xmlHttp);
                    }
                }
            }

            xmlHttp.send(sr);
            if (!async) {
                return this.__onSendSoapRequest(method, async, callback, wsdl, xmlHttp);
            }
        }
    }
});


