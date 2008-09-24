
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

qx.Class.define("soapdemo.scr.basic.simple", { extend : qx.core.Object
    ,properties : {
        widget : { check : "Object" }
    }
    ,construct : function () {    	
        var cnt = new qx.ui.layout.BoxLayout;
        cnt.setWidth("100%");
        cnt.setHeight("100%");
        cnt.setHorizontalChildrenAlign("center");
        cnt.setVerticalChildrenAlign("middle");
        this.setWidget(cnt);
        
        var gbLogin = new qx.ui.groupbox.GroupBox("Demo");
        gbLogin.setDimension("auto", "auto");
        cnt.add(gbLogin);
        
        groupWidth = 300;

        var gl = new qx.ui.layout.GridLayout;
        gbLogin.add(gl);

        gl.setDimension(groupWidth - 26, "auto");
        gl.setColumnCount(2);
        gl.setRowCount(4);
        gl.setVerticalSpacing(4);
        gl.setHorizontalSpacing(6);

        gl.setColumnWidth(0, 70);
        gl.setColumnWidth(1, 190);
        gl.setColumnVerticalAlignment(0, "middle");
        gl.setRowHeight(0, 22);
        gl.setRowHeight(1, 22);
        gl.setRowHeight(2, 22);
        gl.setRowHeight(3, 22);

        gl.add(new qx.ui.basic.Label("Name:"), 0, 0);
        gl.add(new qx.ui.basic.Label("Times:"), 0, 1);
        
        txtName = new qx.ui.form.TextField("Qooxdoo Skywalker");
        txtTimes = new qx.ui.form.TextField("5");
        gl.add(txtName, 1, 0);
        gl.add(txtTimes, 1, 1);

        btnSubmit1Hello = new qx.ui.form.Button("Hello 1");
        gl.add(btnSubmit1Hello,0,2);
        btnSubmit2Hello = new qx.ui.form.Button("Hello 2");
        gl.add(btnSubmit2Hello,1,2);

        btnSubmit1Name = new qx.ui.form.Button("Name 1");
        gl.add(btnSubmit1Name,0,3);
        btnSubmit2Name = new qx.ui.form.Button("Name 2");
        gl.add(btnSubmit2Name,1,3);

        btnSubmit1Name.addEventListener("execute", function(e) {
            var params = new soap.parameters();
    
            var self = this;
            self.SoapRunning = soapdemo.Application.cliSvc1.callAsync( "name", params, function(r) {
                self.SoapRunning = null;
                if (r instanceof Error) {
                    alert("An error has occured!\r\n\r\n" + r.fileName + " line " + r.lineNumber);
                }
                else {
                    alert(r);
                }
            });		
        });

        btnSubmit2Name.addEventListener("execute", function(e) {
            var params = new soap.parameters();
    
            var self = this;
            self.SoapRunning = soapdemo.Application.cliSvc2.callAsync( "name", params, function(r) {
                self.SoapRunning = null;
                if (r instanceof Error) {
                    alert("An error has occured!\r\n\r\n" + r.fileName + " line " + r.lineNumber);
                }
                else {
                    alert(r);
                }
            });		
        });

        btnSubmit1Hello.addEventListener("execute", function(e) {
            var params = new soap.parameters();
            params.add("name", txtName.getValue());
            params.add("times", txtTimes.getValue());

            var self = this;
            self.SoapRunning = soapdemo.Application.cliSvc1.callAsync( "say_hello", params, function(r) {
                self.SoapRunning = null;
                if (r instanceof Error) {
                    alert("An error has occured!\r\n\r\n" + r.fileName + " line " + r.lineNumber);
                }
                else {
                    var i;
                    var retval="";
                    for (i=0;i<r.length;i++){
                        retval += i + " : " + r[i] + "\r\n";
                    }
                    alert(retval);
                }
            });		
        });

        btnSubmit2Hello.addEventListener("execute", function(e) {
            var params = new soap.parameters();
            params.add("name", txtName.getValue());
            params.add("times", txtTimes.getValue());

            var self = this;
            self.SoapRunning = soapdemo.Application.cliSvc1.callAsync( "say_hello", params, function(r) {
                self.SoapRunning = null;
                if (r instanceof Error) {
                    alert("An error has occured!\r\n\r\n" + r.fileName + " line " + r.lineNumber);
                }
                else {
                    var i;
                    var retval="";
                    for (i=0;i<r.length;i++){
                        retval += i + " : " + r[i] + "\r\n";
                    }
                    alert(retval);
                }
            });		
        });
    }
});