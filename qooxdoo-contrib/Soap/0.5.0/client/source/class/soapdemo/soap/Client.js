
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
 */

qx.Class.define("soapdemo.soap.Client", { extend : qx.core.Object
    ,include : [qx.locale.MTranslation]
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
        NAMESPACES: {
             "a"    : "http://schemas.xmlsoap.org/wsdl/"
            ,"x"    : "http://www.w3.org/2001/XMLSchema"
            ,"plnk" : "http://schemas.xmlsoap.org/ws/2003/05/partner-link/"
            ,"soap" : "http://schemas.xmlsoap.org/wsdl/soap/"
        }
    }

    ,members : {
         __cache : null
        ,__extract_fault : function(method_name, async, callback, req) {
            var retval = null;

            if(req.responseXML.getElementsByTagName("faultcode").length > 0) {
                var fault_string  = req.responseXML.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue;
                fault_string += "\nDetail:\n\n" + req.responseXML.getElementsByTagName("detail")[0].childNodes[0].nodeValue;
                retval = new Error(500, fault_string);
                if (!(async || callback)) {
                    throw retval;
                }
            }
            else {
                retval = new Error("No fautstring was found!");
                if (!(async || callback)) {
                    throw retval;
                }
            }
            return retval;
        }

        ,__on_send_soap_request : function(method_name, async, callback, req) {
            var retval = null;

            if (req.responseXML == null) {
                this.dispatchEvent(new qx.io.remote.Response("failed"));
            }
            else {
                // get the response type for the method named method_name
                var tag_name = this.__cache.methods[method_name].output.name

                if(tag_name == null) {
                    retval = this.__extract_fault(method_name, async, callback, req);
                }
                else {
                    var nd = req.responseXML.getElementsByTagName(tag_name);
                    if(nd == null || nd.length == 0) {
                        var tns = this.__cache.target_namespace;
                        nd = qx.xml.Element.getElementsByTagNameNS(req.responseXML, tns, tag_name);
                    }

                    if(nd == null || nd.length == 0) {
                        retval = this.__extract_fault(method_name, async, callback, req);
                    }
                    else {
                        retval = this.__to_object(nd[0]);
                    }
                }

                if(callback) {
                    callback(retval, req.responseXML);
                }
            }

            return retval;
        }

        ,__to_object : function(node) {
            var retval = null;

            if (this.__cache.schema != null) { // get return type from wsdl
                var type = this.__cache.schema.complex[node.nodeName];

                retval = this.__extract(node.childNodes[0], type);
            }
            else { // no types section so get the type directly from the message part node
                throw new Error("no types section");
            }

            return retval;
        }

        ,__extract : function(node, type) {
            var retval = null;

            var value = null;
            if (node.hasChildNodes()) {
                value = node.childNodes[0].nodeValue;
            }
            else {
                value = node.nodeValue;
            }

            var type_name=null;
            if (type.children) {
                type_name = type.children[node.tagName].type.split(":")[1];
            }
            else {
                type_name = type.type.split(":")[1];
            }
            
            type_name_lower = type_name.toLowerCase();
            
            if (type_name_lower == "boolean") {
                retval = value + "" == "true";
            }
            else if (type_name_lower == "int" || type_name_lower == "long") {
                retval = (value != null) ? parseInt(value + "", 10) : 0;
            }
            else if (type_name_lower == "double" || type_name_lower == "float") {
                retval = (value != null) ? parseFloat(value + "") : 0;
            }
            else if (type_name_lower == "datetime") {
                if(value != null) {
                    value = value + "";
                    value = value.substring(0, (value.lastIndexOf(".") == -1 ? (value.lastIndexOf("+") == -1 ? value.length : value.lastIndexOf("+")) : value.lastIndexOf(".")));
                    value = value.replace(/T/gi," ");
                    value = value.replace(/-/gi,"/");
                    retval = new Date();
                    retval.setTime(Date.parse(value));
                }
            }
            else if (type_name_lower == "string") {
                retval = (value != null) ? value + "" : "";
            }
            else if (type_name_lower == "anytype") {
                retval = node;
            }
            else { // it's a complex type
                var complex_type = this.__cache.schema.complex[type_name];
                if (complex_type.is_array) { // it's an array
                    retval = new Array();

                    for (var i=0; i < node.childNodes.length; i++) {
                        var n=node.childNodes[i];
                        var nn=n.nodeName;
                        retval.push(this.__extract(n,complex_type.children[nn]));
                    }
                }
                else {
                    if (node.hasChildNodes()){
                        retval = new Object();

                        for (var i=0,l=node.childNodes.length; i<l; ++i) {
                            var nn = node.childNodes[i].nodeName;
                            var is_null = node.childNodes[i].getAttribute("xs:null");

                            if (is_null) {
                                retval[nn] = null;
                            }
                            else {
                                retval[nn] = this.__extract(node.childNodes[i], complex_type.children[nn]);
                            }
                        }
                    }
                }
            }

            return retval;
        }

        ,callSync : function(methodName, args) {
            return this.__invoke(methodName, args, false, null);
        }

        ,callAsync : function(methodName, args, handler) {
            return this.__invoke(methodName, args, true, handler);
        }

        ,__invoke : function(method, parameters, async, callback) {
            if(async) {
                this.__load_wsdl(method, parameters, async, callback);
            }
            else {
                return this.__load_wsdl(method, parameters, async, callback);
            }
        }

        // private: invoke async
        ,__load_wsdl : function(method_, parameters, async, callback) {
            if(this.__cache == null) {
                var xmlHttp = qx.io.remote.transport.XmlHttp.createRequestObject();
                xmlHttp.open("GET", this.getUrl() + "?wsdl", async);
                if(async) {
                    var self=this;
                    xmlHttp.onreadystatechange = function() {
                        if(xmlHttp.readyState == 4) {
                            self.__on_load_wsdl(method_, parameters, async, callback, xmlHttp);
                        }
                    }
                }

                xmlHttp.send(null);
                if (!async) {
                    return this.__on_load_wsdl(method_, parameters, async, callback, xmlHttp);
                }
            }
            else {
                return this.__send_soap_request(method_, parameters, async, callback);
            }
        }

        ,__on_load_wsdl : function(method_, parameters, async, callback, req) {
            var wsdl = req.responseXML;
            if (wsdl == null) {
                this.dispatchEvent(new qx.io.remote.Response("wsdl_failed"));
                return null;
            }
            else {
                this.__cache = this.__cache_wsdl(wsdl);
                return this.__send_soap_request(method_, parameters, async, callback);
            }
        }

        ,__cache_wsdl : function(wsdl) {
            var retval = new Object();
            var cn = null;

            retval.methods = new Object();
            retval.messages = new Array();
            retval.schema = new Object();
            retval.target_namespace = wsdl.documentElement.getAttribute("targetNamespace");

            // get porttype
            var port_type_node = null;
            var schema_node = null;

            if (qx.core.Variant.isSet("qx.client", "mshtml")) {
                cn = wsdl.childNodes[1].childNodes;
            }
            else {
                cn = wsdl.childNodes[0].childNodes;
            }

            for (var i=0, l = cn.length; i<l; ++i) {
                var tn = cn[i].tagName;
                if (tn == "portType") {
                    port_type_node = cn[i];
                }
                else if (tn == "message") {

                }
                else if (tn == "types") {
                    schema_node = cn[i].childNodes[0];
                }
            }

            // fill methods
            var methods = retval.methods;

            cn = port_type_node.childNodes;
            for (var i=0, l = cn.length; i<l; ++i) {
                var method_name = cn[i].getAttribute("name");
                methods[method_name] = new Object();

                var method = methods[method_name];
                for (var j=0, m=cn[i].childNodes.length; j<m; ++j) {
                    var method_node = cn[i].childNodes[j];
                    var tn = method_node.tagName;

                    if (tn == "input" || tn == "output") {
                        method[tn] = new Object();
                        method[tn].name = method_node.getAttribute("name");
                        method[tn].message = method_node.getAttribute("message");
                    }
                }
            }

            if (schema_node == null) { // fill schema
                retval.schema = null;
            }
            else {
                var schema = retval.schema;
                schema.simple = new Object();
                schema.complex = new Object();

                cn = schema_node.childNodes;
                for (var i=0, l = cn.length; i<l; ++i) {
                    var tn = cn[i].tagName;

                    var elt = new Object();
                    elt.type = cn[i].getAttribute("type");
                    if (elt.type == null) {
                        elt.type = cn[i].getAttribute("xsi:type");
                    }
                    var elt_name = cn[i].getAttribute("name");

                    if (tn == "xs:element") {
                        schema.simple[elt_name] = elt
                    }
                    else if (tn == "xs:complexType") {
                        elt.children = new Object();
                        var first_node = cn[i].childNodes[0];

                        if (first_node.hasChildNodes()) {
                            first_node = first_node.childNodes[0];

                            if (first_node.nextSibling == null && first_node.getAttribute("minOccurs") != null
                                                               && first_node.getAttribute("maxOccurs") != null) { // it's an array
                                elt.is_array = true;
                                elt.min_occurs = first_node.getAttribute("minOccurs");
                                elt.max_occurs = first_node.getAttribute("maxOccurs");

                                var child = new Object()
                                child.type = first_node.getAttribute("type");
                                if (child.type == null) {
                                    child.type = first_node.getAttribute("xsi:type");
                                }
                                var child_name = first_node.getAttribute("name");

                                elt.children[child_name] = child;
                            }
                            else {
                                for (var node = first_node; node != null; node = node.nextSibling) {
                                    var child = new Object();

                                    var child_name = node.getAttribute("name");
                                    child.type = node.getAttribute("type");
                                    if (child.type == null) {
                                        child.type = node.getAttribute("xsi:type");
                                    }

                                    elt.children[child_name] = child;
                                }
                            }
                        }

                        schema.complex[elt_name] = elt
                    }
                    else {
                        throw new Error("invalid tag name '"+tn+"' encountered under schema node.");
                    }
                }
            }
            return retval;
        }

        ,__send_soap_request : function(method_, parameters, async, callback) {
            var ns = this.__cache.target_namespace;

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
                        self.__on_send_soap_request(method_, async, callback, xmlHttp);
                    }
                }
            }

            xmlHttp.send(sr);
            if (!async) {
                return this.__on_send_soap_request(method_, async, callback, xmlHttp);
            }
        }
    }
});


