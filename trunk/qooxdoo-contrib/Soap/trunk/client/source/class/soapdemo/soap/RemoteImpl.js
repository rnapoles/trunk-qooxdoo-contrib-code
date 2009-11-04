
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

qx.Class.define("soapdemo.soap.RemoteImpl", { extend : qx.ui.table.model.Remote
    ,include : [qx.locale.MTranslation]
    ,construct : function(service_instance, row_count_method_name, row_data_method_name, service_arguments, session_id, mapper) {
        this.base(arguments);
        this.setRowCountMethodName(row_count_method_name);
        this.setRowDataMethodName(row_data_method_name);
        this.setServiceInstance(service_instance);
        this.setServiceArguments(service_arguments);

        if (session_id + "" != "undefined") {
            this.setSessionId(session_id)
        }
        else {
            this.setSessionId("");
        }
        if (mapper + "" != "undefined") {
            this.__mapper = mapper;
        }
        else {
            this.__mapper = null;
        }
    }

    ,properties : {
         rowCountMethodName: { check: "String", nullable: false}
        ,rowDataMethodName:  { check: "String", nullable: false}
        ,serviceInstance:    { check: "soapdemo.soap.Client", nullable: false }
        ,serviceArguments:   { check: "soapdemo.soap.Parameters", nullable: false }
        ,sessionId:          { check: "String", init: null}
    }

    ,events : {
         "data_loaded": "qx.event.type.Data"
    }

    ,members : {
         __count_request_sent : false
        ,__mapper : null

        ,_loadRowCount : function() {
            var ctx = this;

            if (ctx.__count_request_sent) {
                return;
            }
            else {
                ctx.__count_request_sent = true;
            }

            var params = this.getServiceArguments();
            var req = new soapdemo.soap.Request();

            req.setWho(this.getSessionId());
            params.add("req",req);

            var svc = this.getServiceInstance();
            ctx.SoapRunning = svc.callAsync( this.getRowCountMethodName(), params, function(r) {
                ctx.SoapRunning = null;
                ctx.__count_request_sent = false;
                if (r instanceof Error) {
                    ctx.warn("An error has occured!\n\n" + r.fileName + " line " + r.lineNumber);
                    ctx._onRowCountLoaded(0);
                }
                else {
                    ctx._onRowCountLoaded(r);
                }
            });
        }

        ,_loadRowData : function(firstRow, lastRow) {
            var ctx=this;


            var params = ctx.getServiceArguments();
            var req = new soapdemo.soap.Request();
            req.setStartRow(firstRow);
            req.setWho(this.getSessionId());
            params.add("req",req);

            var svc = this.getServiceInstance();
            ctx.SoapRunning = svc.callAsync( this.getRowDataMethodName(), params, function(r) {
                ctx.SoapRunning = null;
                if (r instanceof Error) {
                    ctx.warn("An error has occured!\r\n\r\n" + r.fileName + " line " + r.lineNumber);
                    ctx._onRowDataLoaded([]);
                }
                else {
                    if (ctx.__mapper != null) {
                        ctx.__mapper(r);
                    }
                    ctx._onRowDataLoaded(r);
                    ctx.fireDataEvent("dataLoaded",r);
                }
            });
        }

        // overridden
        ,getValue : function(columnIndex, rowIndex) {
            var rowData = this.getRowData(rowIndex);

            var retval=null;

            if (rowData != null) {
                var columnId = this.getColumnId(columnIndex);
                if (columnId.constructor == Array) {
                    retval = rowData[columnId[0]];
                    for (var i=1; i< columnId.length; ++i) {
                        retval = retval[columnId[i]];
                    }
                }
                else {
                    retval = rowData[columnId];
                }
            }

            return retval;
        }
    }
});
