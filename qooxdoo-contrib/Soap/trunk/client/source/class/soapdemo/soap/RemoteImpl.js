
qx.Class.define("soapdemo.soap.RemoteImpl", { extend : qx.ui.table.model.Remote
    ,construct : function(service_instance, row_count_method_name, row_data_method_name, service_arguments, session_id) {
        this.base(arguments);
        this.setRowCountMethodName(row_count_method_name);
        this.setRowDataMethodName(row_data_method_name);
        this.setServiceInstance(service_instance);
        this.setServiceArguments(service_arguments);
        this.setSessionId(session_id)
    }
    ,properties : {
         rowCountMethodName: { check: "String", nullable: false}
        ,rowDataMethodName:  { check: "String", nullable: false}
        ,serviceInstance:    { check: "soapdemo.soap.client", nullable: false }
        ,serviceArguments:   { check: "soapdemo.soap.parameters", nullable: false }
        ,sessionId:          { check: "String", nullable: false}
    }
    ,members : {
        _loadRowCount : function() {
            var ctx = this;

            var params = this.getServiceArguments();
            var req = new soapdemo.soap.Request();

            req.setWho(this.getSessionId());
            params.add("req",req);

            var svc = this.getServiceInstance();
            ctx.SoapRunning = svc.callAsync( this.getRowCountMethodName(), params, function(r) {
                ctx.SoapRunning = null;
                if (r instanceof Error) {
                    ctx.warn("An error has occured!\r\n\r\n" + r.fileName + " line " + r.lineNumber);
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
                    ctx._onRowDataLoaded(r);
                }
            });
        }
    }
});
