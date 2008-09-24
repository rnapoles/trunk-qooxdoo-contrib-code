
/*
 * Copyright (c) 2008, Burak Arslan (burak.arslan-qx@arskom.com.tr).
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
 * THIS SOFTWARE IS PROVIDED BY Burak Arslan ''AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL Burak Arslan BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

qx.Class.define("soapdemo.RemoteImpl", { extend : qx.ui.table.model.Remote
    ,construct : function(service_instance, row_count_method_name, row_data_method_name, service_arguments) {
        this.base(arguments);
        this.setRowCountMethodName(row_count_method_name);
        this.setRowDataMethodName(row_data_method_name);
        this.setServiceInstance(service_instance);
        this.setServiceArguments(service_arguments);
    }
    ,properties : {
         rowCountMethodName: { check: "String", nullable: false}
        ,rowDataMethodName:  { check: "String", nullable: false}
        ,serviceInstance:    { check: "soap.client", nullable: false }
        ,serviceArguments:   { check: "soap.parameters", nullable: false }
    }
    ,members : {
        _loadRowCount : function() {
            self=this;

            params = this.getServiceArguments();
            
            var self = this;
			var svc = this.getServiceInstance();
            self.SoapRunning = svc.callAsync( this.getRowCountMethodName(), params, function(r) {
                self.SoapRunning = null;
                if (r instanceof Error) {
                    self.warn("An error has occured!\r\n\r\n" + r.fileName + " line " + r.lineNumber);
                    self._onRowCountLoaded(0);
                }
                else {
                    self._onRowCountLoaded(r);
                }
            });
        }

        ,_loadRowData : function(firstRow, lastRow) {
            self=this;

            params = this.getServiceArguments();
            req=new soapdemo.SOAPRequest();
			req.setFirstrow(firstRow);
			req.setLastrow(lastRow+1);
            params.add("req",req);
            
            var self = this;
			var svc = this.getServiceInstance();
            self.SoapRunning = svc.callAsync( this.getRowDataMethodName(), params, function(r) {
                self.SoapRunning = null;
                if (r instanceof Error) {
                    self.warn("An error has occured!\r\n\r\n" + r.fileName + " line " + r.lineNumber);
                    self._onRowDataLoaded([]);
                }
                else {
                    self._onRowDataLoaded(r);
                }
            });
        }
    }
});
